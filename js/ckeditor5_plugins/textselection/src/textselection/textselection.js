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
                    // Insert the pin symbol at the current cursor position
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText(this.pinSymbol, insertPosition);
                });
            });

            // Handle enabling/disabling the button based on SourceEditing mode
            this.listenTo(sourceEditing, 'change:isSourceEditingMode', (evt, propertyName, isSourceEditingMode) => {
                view.isEnabled = !isSourceEditingMode;  // Disable the button in SourceEditing mode
            });

            return view;
        });

        // Save the cursor position when switching to SourceEditing mode
        this.listenTo(sourceEditing, 'change:isSourceEditingMode', (evt, propertyName, isSourceEditingMode) => {
            if (isSourceEditingMode) {
                // Save the current model selection (cursor) before switching to SourceEditing mode
                this.saveCursorPosition();
            } else {
                // Restore the cursor position after switching back to WYSIWYG mode
                this.restoreCursorPosition();
            }
        });
    }

    // Save the model cursor position (selection range)
    saveCursorPosition() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;

        // Save the current range from the model selection
        if (selection.rangeCount > 0) {
            this.savedRange = selection.getFirstRange().clone();
        }
    }

    // Restore the model cursor position
    restoreCursorPosition() {
        const editor = this.editor;
        const model = editor.model;

        // Make sure we have a saved range before attempting to restore
        if (this.savedRange) {
            model.change(writer => {
                // Restore the saved selection range
                writer.setSelection(this.savedRange);

                // Scroll the view to the restored selection
                editor.editing.view.scrollToTheSelection();
            });
        }
    }
}
