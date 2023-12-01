import { Plugin } from 'ckeditor5/src/core';
import { global } from 'ckeditor5/src/utils';
import { ButtonView } from 'ckeditor5/src/ui';
import { createDropdown, addListToDropdown, Model } from 'ckeditor5/src/ui';
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

    init() {
		const editor = this.editor;

		this.listenTo( editor.plugins.get( 'SourceEditing' ), 'change:isSourceEditingMode', ( evt, name, isSourceEditingMode ) => {
            if(!isSourceEditingMode){
                var position = editor.model.document.selection.getFirstPosition();
                console.log(position);
                console.log("isSourceEditingMode: ",isSourceEditingMode);
            }else{
                editor.model.document.selection.setTo(position);
                //console.log(`isSourceEditingMode: ${isSourceEditingMode}, set back to old postion`);
            }
            
		} );
	}
}