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

    init() {
		const editor = this.editor;

		this.listenTo( editor.plugins.get( 'SourceEditing' ), 'change:isSourceEditingMode', ( evt, name, isSourceEditingMode, writer ) => {
            if(!isSourceEditingMode){
                var position = editor.model.document.selection.getFirstPosition();
                console.log(position);
                console.log("isSourceEditingMode: ",isSourceEditingMode);
            }else{
                //editor.model.document.selection.setTo(position);
				writer.insertText('Test',position);
                console.log(`isSourceEditingMode: ${isSourceEditingMode}, set back to old position`);
            }
			
            
		} );
	}
}