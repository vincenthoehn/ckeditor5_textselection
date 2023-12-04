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

        // Event listener for source editing mode change
        this.listenTo(editor.plugins.get('SourceEditing'), 'change:isSourceEditingMode', (evt, name, isSourceEditingMode) => {
            if (!isSourceEditingMode) {
                // Switched to WYSIWYG mode
                this.restoreCursorPosition();
            } else {
                // Switched to source editing mode
                this.saveCursorPosition();
            }
        });
    }

    saveCursorPosition() {
        const editor = this.editor;
        const model = editor.model;
        const selection = model.document.selection;
        const range = selection.getFirstRange();

		
		
        if (range) {
            // Save the cursor position (range) in source editing mode
            this.sourceEditingCursorPosition = range.start;
        }
		
		console.log('Range: ',range);
		console.log('Cursor: ', this.sourceEditingCursorPosition);
		
    }

    restoreCursorPosition() {
        const editor = this.editor;
        const model = editor.model;

		console.log('Restore cursor');
		
        if (this.sourceEditingCursorPosition) {
            // Restore the cursor position in WYSIWYG mode
            model.change(writer => {
                model.document.selection.set(writer.createPositionAt(this.sourceEditingCursorPosition));
            });
        }
		
	}

}