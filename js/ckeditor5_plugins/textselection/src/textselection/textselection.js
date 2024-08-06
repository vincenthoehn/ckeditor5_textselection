import { Plugin } from 'ckeditor5/src/core';
import { ButtonView, createDropdown, addListToDropdown, ViewModel } from 'ckeditor5/src/ui';
import { Collection } from 'ckeditor5/src/utils';

export default class Textselection extends Plugin {
    init() {
        const editor = this.editor;
        const pinSymbol = '📌';

        // Add a button to the editor UI
        editor.ui.componentFactory.add('textselection', locale => {
            const view = new ButtonView(locale);
            const buttonStates = new Collection();

            view.set({
                label: '📌',
                withText: true,
                tooltip: true
            });

            // Check if the pin symbol exists in the document
            const checkForPinSymbol = () => {
                const modelRoot = editor.model.document.getRoot();
                for (const range of editor.model.createRangeIn(modelRoot)) {
                    for (const item of range.getItems()) {
                        if (item.is('textProxy') && item.data.includes(pinSymbol)) {
                            return true;
                        }
                    }
                }
                return false;
            };

            // Update button state based on the presence of the pin symbol
            const updateButtonState = () => {
                view.isOn = checkForPinSymbol();
                view.isEnabled = true;
            };

            // Update button state initially and on document changes
            updateButtonState();
            editor.model.document.on('change:data', updateButtonState);

            // Execute a command when the button is clicked
            view.on('execute', () => {
                editor.model.change(writer => {
                    const isPinPresent = checkForPinSymbol();

                    if (isPinPresent) {
                        // Remove existing pin symbol
                        const modelRoot = editor.model.document.getRoot();
                        for (const range of editor.model.createRangeIn(modelRoot)) {
                            for (const item of range.getItems()) {
                                if (item.is('textProxy') && item.data.includes(pinSymbol)) {
                                    const pinRange = editor.model.createRange(
                                        editor.model.createPositionBefore(item),
                                        editor.model.createPositionAfter(item)
                                    );
                                    writer.remove(pinRange);
                                    break;
                                }
                            }
                            if (!checkForPinSymbol()) break;
                        }
                    } else {
                        // Insert new pin symbol at the current cursor position
                        const insertPosition = editor.model.document.selection.getFirstPosition();
                        writer.insertText(pinSymbol, insertPosition);
                    }

                    // Update button state after execution
                    updateButtonState();
                });
            });

            return view;
        });
    }
}