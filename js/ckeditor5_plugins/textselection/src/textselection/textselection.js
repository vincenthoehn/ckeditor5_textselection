import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

export default class Textselection extends Plugin {
    init() {
        const editor = this.editor;
        const pinSymbol = '📌';
        const sourceEditing = editor.plugins.get('SourceEditing');

        // Add a button to the editor UI
        editor.ui.componentFactory.add('textselection', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: '📌',
                withText: true,
                tooltip: true
            });

            // Execute a command when the button is clicked
            view.on('execute', () => {
                editor.model.change(writer => {
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText(pinSymbol, insertPosition);
                });
            });

            // Handle enabling/disabling the button based on SourceEditing mode
            this.listenTo(sourceEditing, 'change:isSourceEditingMode', (evt, propertyName, isSourceEditingMode) => {
                view.isEnabled = !isSourceEditingMode;  // Disable in SourceEditing mode
            });

            return view;
        });

        // Listen for the mode switch and scroll to cursor when switching back to WYSIWYG
        this.listenTo(sourceEditing, 'change:isSourceEditingMode', (evt, propertyName, isSourceEditingMode) => {
            if (!isSourceEditingMode) {
                // Switch back to WYSIWYG - Scroll to the cursor
                this.scrollToCursorPosition();
            }
        });
    }

    scrollToCursorPosition() {
        const domConverter = this.editor.editing.view.domConverter;
        const viewSelection = this.editor.editing.view.document.selection;
        const domRange = domConverter.viewRangeToDom(viewSelection.getFirstRange());

        if (domRange) {
            const scrollTarget = domRange.startContainer;
            if (scrollTarget && scrollTarget.nodeType === Node.ELEMENT_NODE) {
                scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }
}
