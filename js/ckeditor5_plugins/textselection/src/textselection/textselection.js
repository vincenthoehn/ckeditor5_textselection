import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, createDropdown, addListToDropdown, ViewModel } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class Textselection extends Plugin {
    init() {
        const editor = this.editor;

        const pinSymbol = '📌';

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
                    const { found, item } = checkForPinSymbol();

                    if (found) {
                        // Remove existing pin symbol using deleteContent
                        const range = editor.model.createRange(
                            editor.model.createPositionBefore(item),
                            editor.model.createPositionAfter(item)
                        );
                        writer.setSelection(range);
                        writer.deleteContent(writer.selection);
                    } else {
                        // Insert new pin symbol at the current cursor position
                        const insertPosition = editor.model.document.selection.getFirstPosition();
                        writer.insertText(pinSymbol, insertPosition);
                    }

                    // Update button state after execution
                    updateButtonState();
                });
            });

            return view;
        });
    }
}