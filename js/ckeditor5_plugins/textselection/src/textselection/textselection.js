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

        editor.model.document.on( 'change', () => {
			this.saveCursorPosition();
			console.log('NM: ', 'The Document has changed!');
		} );

        // Event listener for source editing mode change
        this.listenTo(editor.plugins.get('SourceEditing'), 'change:isSourceEditingMode', (evt, name, isSourceEditingMode) => {
            // Umschalten zwischen den Modi
            if (isSourceEditingMode && this.sourceEditingCursorPosition) {
                editor.model.change(writer => {
                    writer.setSelection(this.sourceEditingCursorPosition);
                });
                if (editor.model.document.selection.getFirstRange() != this.sourceEditingCursorPosition){
                    console.error('Position stimmt nicht überein!');
                }
                console.log('SetSelection', this.sourceEditingCursorPosition);
                // Switched to WYSIWYG mode
                //this.restoreCursorPosition();
            }
        });
    }

    saveCursorPosition() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;
        const position = selection.getFirstRange();
		//const position = selection.getFirstPosition();
		
        if (position) {
            // Save the cursor position (range) in source editing mode
            this.sourceEditingCursorPosition = position;
			//console.log('Position: ',position);
			//console.log('Cursor: ', this.sourceEditingCursorPosition);
        }else {
			console.error('Position empty');
		}
		
		
		
    }

    restoreCursorPosition() {
        const editor = this.editor;
        const model = editor.model;

		//console.log('Restore cursor');
		
        if (this.sourceEditingCursorPosition) {
            // Restore the cursor position in WYSIWYG mode
            model.change(writer => {
                //model.document.selection.setTo(this.sourceEditingCursorPosition);
				model.document.selection._setTo(writer.createPositionAt(this.sourceEditingCursorPosition));
				writer.insertText('Test', this.sourceEditingCursorPosition);
            });
        }
		
	}

}