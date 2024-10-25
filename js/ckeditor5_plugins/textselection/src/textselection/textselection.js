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
            if (sourceEditing) {
                this.listenTo(sourceEditing, 'change:isSourceEditingMode', (evt, propertyName, isSourceEditingMode) => {
                    view.isEnabled = !isSourceEditingMode;  // Disable in SourceEditing mode
                    if (!isSourceEditingMode) {
                        // Only attempt scroll when back in WYSIWYG mode
                        this.scrollToCursorPosition();
                    }
                });
            }

            return view;
        });
    }

    scrollToCursorPosition() {
        // Check if the editor is in WYSIWYG mode before proceeding
        const isInWYSIWYG = !this.editor.plugins.get('SourceEditing').isSourceEditingMode;

        if (isInWYSIWYG) {
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
}
