import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, createDropdown, addListToDropdown, ViewModel } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class Textselection extends Plugin {
    init() {
        const editor = this.editor;

        const pinSymbol = '📍';

        // Add a button to the editor UI
        editor.ui.componentFactory.add('textselection', locale => {
            const view = new ButtonView(locale);

            view.set({
                label: 'Text einfügen',
                withText: true,
                tooltip: true
            });

            // Execute a command when the button is clicked
            view.on('execute', () => {
                editor.model.change(writer => {
                    // Insert text at the current cursor position
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText(pinSymbol, insertPosition);
                });
            });

            return view;
        });
    }
}