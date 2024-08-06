import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, createDropdown, addListToDropdown, ViewModel } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class Textselection extends Plugin {

    init() {
        const editor = this.editor;

        const pinSymbol = '📍';
    
        editor.ui.componentFactory.add("textselection", () => {
          // The button will be an instance of ButtonView.
          const button = new ButtonView();
    
          button.set({
            label: "Insert Pin",
            withText: true,
          });
    
          //Execute a callback function when the button is clicked
          button.on("execute", () => {
    
            //Change the model using the model writer
            editor.model.change((writer) => {
              //Insert the text at the user's current position
              editor.model.insertContent(writer.createText(pinSymbol));
            });
          });
    
          return button;
        });
      }
}
