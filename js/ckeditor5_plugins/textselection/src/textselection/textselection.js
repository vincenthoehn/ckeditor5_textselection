import { Plugin } from 'ckeditor5/src/core';

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
        let cursorPosition = -1;

        editor.model.document.on( 'change', () => {
            //this.saveCursorPosition();
            this.createAnchor();
        //cursorPosition = this.editor.model.document.selection.getLastPosition()
		} );

    }


    createAnchor() {
        const editor = this.editor;
        let data = String(editor.getData());
        data = data.replaceAll('📌','');
        //editor.setData(data);
        editor.model.change(writer => {
            editor.model.insertContent(writer.createText( '📌' ) );
        });
    }
}