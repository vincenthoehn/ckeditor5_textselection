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

        if (this.sourceEditingCursorPosition) {
            // Restore the cursor position in WYSIWYG mode
            model.change(writer => {
                const sourceEditingPlugin = editor.plugins.get('SourceEditing');
                if (sourceEditingPlugin && sourceEditingPlugin.isSourceEditingMode) {
                    // We are in source editing mode, try to access the textarea element directly
                    const textareaElement = document.querySelector('.ck-source-editing-area textarea');
                    //console.log(sourceEditingCursorPosition);
                    if (textareaElement) {
                        // Set the cursor position using standard DOM methods
                        textareaElement.setSelectionRange(0, this.sourceEditingCursorPosition);
                    }
                }
            });
        }
    }
}