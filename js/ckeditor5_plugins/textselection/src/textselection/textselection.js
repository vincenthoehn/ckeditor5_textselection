import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, addListToDropdown, ViewModel } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class Textselection extends Plugin {

    /**
	 * @inheritDoc
	 */
	static get requires() {
		return [ 'SourceEditing' ];
	}

    /**
	 * @inheritDoc
	 */
	static get pluginName() {
		return 'TextSelection';
	}

    constructor(...args){
        super(...args)
        this.sourceEditingCursorPosition = -1;
        console.log('Textselection created.');
    }


    init() {
        const editor = this.editor;

        // Definiere ein Symbol, das eingefügt werden soll, z.B. eine Pinnadel
        const pinSymbol = '📍';

        // Kontextmenü hinzufügen
        editor.ui.componentFactory.add( 'textselection', locale => {
            const dropdownView = createDropdown( locale );
            addListToDropdown( dropdownView, [
                {
                    type: 'button',
                    model: new ViewModel( {
                        label: 'Insert Pin',
                        withText: true,
                        tooltip: true
                    } )
                }
            ] );

            dropdownView.on( 'execute', () => {
                const viewFragment = editor.data.processor.toView( pinSymbol );
                const modelFragment = editor.data.toModel( viewFragment );
                editor.model.insertContent( modelFragment );
            } );

            return dropdownView;
        } );
    }
}