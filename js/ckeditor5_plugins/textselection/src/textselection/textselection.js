import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

export default class Textselection extends Plugin {
    constructor(editor) {
        super(editor);
        this.pinSymbol = '📌';  // Define the pin symbol
        this.savedRange = null;  // To store the range before switching modes
    }

    init() {
        const editor = this.editor;
        const sourceEditing = editor.plugins.get('SourceEditing');

        // Add a button to the editor UI
        editor.ui.componentFactory.add('textselection', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: this.pinSymbol,
                withText: true,
                tooltip: true
            });

            // Execute a command when the button is clicked
            view.on('execute', () => {
                editor.model.change(writer => {
                    // First, check if a pin already exists and remove it
                    this.removeExistingPin(writer);

                    // Insert a new pin symbol at the current cursor position
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText(this.pinSymbol, insertPosition);
                });
            });

            // Handle enabling/disabling the button based on SourceEditing mode
            this.listenTo(sourceEditing, 'change:isSourceEditingMode', (evt, propertyName, isSourceEditingMode) => {
                view.isEnabled = !isSourceEditingMode;  // Disable in SourceEditing mode
            });

            return view;
        });

        // Save the cursor position when switching to SourceEditing mode
        this.listenTo(sourceEditing, 'change:isSourceEditingMode', (evt, propertyName, isSourceEditingMode) => {
            if (isSourceEditingMode) {
                // Save the current selection (cursor) before switching to SourceEditing mode
                this.saveCursorPosition();
            } else {
                // Restore the cursor position after switching back to WYSIWYG mode
                this.restoreCursorPosition();
            }
        });
    }

    // Function to remove the existing pin symbol from the editor content
    removeExistingPin(writer) {
        const editor = this.editor;
        const root = editor.model.document.getRoot();

        // Iterate through all the nodes in the editor
        for (const range of editor.model.createRangeIn(root)) {
            for (const item of range.getItems()) {
                // Check if the text node contains the pin symbol
                if (item.is('$text') && item.data.includes(this.pinSymbol)) {
                    // Remove the pin symbol
                    const start = editor.model.createPositionAt(item, 0);
                    const end = editor.model.createPositionAt(item, item.data.length);
                    const rangeToRemove = editor.model.createRange(start, end);
                    writer.remove(rangeToRemove);
                    break;  // Stop after removing the first pin found
                }
            }
        }
    }

    saveCursorPosition() {
        const editor = this.editor;
        const view = editor.editing.view;

        // Get the current selection in the view
        const viewSelection = view.document.selection;
        this.savedRange = viewSelection.getFirstRange();  // Save the range
    }

    restoreCursorPosition() {
        const editor = this.editor;
        const model = editor.model;
        const view = editor.editing.view;

        // Make sure we have a saved range before attempting to restore
        if (this.savedRange) {
            // Restore the saved range in the model
            model.change(writer => {
                const newRange = writer.createRange(
                    model.createPositionFromPath(model.document.getRoot(), this.savedRange.start.path),
                    model.createPositionFromPath(model.document.getRoot(), this.savedRange.end.path)
                );

                // Set the restored selection in the model
                writer.setSelection(newRange);

                // Scroll the view to the restored selection
                view.scrollToTheSelection();
            });
        }
    }
}
