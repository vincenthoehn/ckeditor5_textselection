
# Drupal CKEditor5 (Keep) Textselection

This project provides a CKEditor5 plugin for Drupal. Before you switch in Sourceediting-Mode, you are able to set a pin. This can help to find the exact position.
With version 2.0, the position of the cursor is saved before switching to SourceEditing mode and the old position is set when switching back to WYSIWYG mode.

## Installation
* Enable ckeditor5 
* Clone the repo into your modules directory:
  `git clone git@github.com:vincenthoehn/ckeditor5_textselection.git`.
* Install as you would normally install a contributed Drupal module.
  See https://www.drupal.org/docs/extending-drupal/installing-modules for more
  information.

## Releases

* 1.0 
* 2.0

## ToDo

- Make the plugin better

### How to build the file (if you would like to use this plugin to build your own plugin)
* Navigate in the folder and run `npm install` to install the dependencies.
* Build bundle-file with `npm run build`. This creates the `bundle.js` in the `dist`-folder.

### Predecessor plugin in CKEditor4

https://github.com/sirtet/ckeditor-dev/tree/master/plugins/textselection

