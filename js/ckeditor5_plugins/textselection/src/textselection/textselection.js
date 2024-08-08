import { Plugin } from 'ckeditor5/src/core';
import { ButtonView} from 'ckeditor5/src/ui';

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
                    // Insert text at the current cursor position
                    const insertPosition = editor.model.document.selection.getFirstPosition();
                    writer.insertText(pinSymbol, insertPosition);
                    copyToClipboard(pinSymbol);
                });
            });

            return view;
        });

        this.listenTo(editor.plugins.get('SourceEditing'), 'change:isSourceEditingMode', (evt, name, isSourceEditingMode) => {
            // Umschalten zwischen den Modi
            if (isSourceEditingMode) {
                // Switched to WYSIWYG mode
                view.set({isEnabled:false});
                
            }else{
                view.set({isEnabled:true});
            }
        });

         // Copy to clipboard
         const copyToClipboard = text => {
            navigator.clipboard.writeText(text).then(
                () => {
                    console.log('Copy to clipboard successful!');
                },
                err => {
                    console.error('Error on copy to clipboard: ', err);
                }
            );
        };
    }
}
