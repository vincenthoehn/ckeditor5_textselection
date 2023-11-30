import { Plugin } from 'ckeditor5/src/core';
import { createDropdown, addListToDropdown, Model } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class Textselection extends Plugin {
    init() {
		const editor = this.editor
        const data = editor.getData();
		console.log("Textselection plugin initialized.");
        console.log(data);
	}
}