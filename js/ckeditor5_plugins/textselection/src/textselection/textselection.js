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

    setCursorPos(cursorPos) {
        console.log("Set cursorPos to:",cursorPos)
        if(cursorPos.path[1] !== 0)
            this.sourceEditingCursorPosition = cursorPos;
        else console.log("Skipped ...")
    }

    getCursorPos(){
        return this.cursorPos;
    }

    init() {
        const editor = this.editor;
        let cursorPosition = -1;

        editor.model.document.on( 'change', () => {
			this.saveCursorPosition();
        //cursorPosition = this.editor.model.document.selection.getLastPosition()
		} );

        // Event listener for source editing mode change
        this.listenTo(editor.plugins.get('SourceEditing'), 'change:isSourceEditingMode', (evt, name, isSourceEditingMode) => {
            // Umschalten zwischen den Modi
            if (isSourceEditingMode && this.sourceEditingCursorPosition) {
                // Switched to WYSIWYG mode
                this.restoreCursorPosition();
            }
        });
    }

    saveCursorPosition() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;
        //const position = selection.getFirstRange();

        const position = selection.getLastPosition();
        if (position) {
            // Save the cursor position (range) in source editing mode
           this.setCursorPos(position);
			console.log('Position: ',position);
			//console.log('Cursor: ', this.sourceEditingCursorPosition);
        }else {
			console.error('Position empty');
		}
		
		
		
    }

    restoreCursorPosition() {
        const editor = this.editor;
        const model = editor.model;

        if (this.sourceEditingCursorPosition) {
            // Restore the cursor position in WYSIWYG mode
            model.change(writer => {
                const sourceEditingPlugin = editor.plugins.get('SourceEditing');
                if (sourceEditingPlugin && sourceEditingPlugin.isSourceEditingMode) {
                    // We are in source editing mode, try to access the textarea element directly
                    const textareaElement = document.querySelector('.ck-source-editing-area textarea');
                    console.log(this.sourceEditingCursorPosition.path);
                    const pos = this.sourceEditingCursorPosition.path[1];
                    if (textareaElement) {
                        // Set the cursor position using standard DOM methods
                        textareaElement.setSelectionRange(pos, pos+1);
                    }
                }
            });
        }
    }
}