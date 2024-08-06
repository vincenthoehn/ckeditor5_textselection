import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, createDropdown, addListToDropdown, ViewModel } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class Textselection extends Plugin {

    constructor(editor) {
        super(editor);
        // Speichert die Position der eingefügten Pinnadel
        this.pinPosition = null;
    }
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
                    if (this.pinPosition) {
                        // Remove existing pin symbol using deleteContent
                        const range = this.pinPosition;
                        writer.setSelection(range);
                        writer.deleteContent(writer.selection);
                        this.pinPosition = null;  // Reset pin position
                    } else {
                        // Insert new pin symbol at the current cursor position
                        const insertPosition = editor.model.document.selection.getFirstPosition();
                        writer.insertText(pinSymbol, insertPosition);

                        // Nach dem Einfügen der Pinnadel die Position korrekt setzen
                        this.pinPosition = editor.model.createRange(
                            insertPosition,
                            insertPosition.getShiftedBy(pinSymbol.length)
                        );
                    }

                    // Update button state after execution
                    //updateButtonState();
                });
            });

            return view;
        });
    }
}