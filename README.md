# Drupal CKEditor5 (Keep) Textselection

This project provides a CKEditor5 plugin for Drupal. If you switch between Sourceediting and Normal-Mode, the plugin remembers the cursor postion.

# Installation
* Enable ckeditor5 
* Clone the repo into your modules directory:
  `git clone git@github.com:vincenthoehn/ckeditor5_textselection.git`.
* Install as you would normally install a contributed Drupal module.
  See https://www.drupal.org/docs/extending-drupal/installing-modules for more
  information.

# How to build the file (if you would like to use this plugin to build your own plugin)
* Navigate in the folder and run `npm install` to install the dependencies.
* Build bundle-file with `npm run build`. This creates the `bundle.js` in the `dist`-folder.

https://github.com/sirtet/ckeditor-dev/tree/master/plugins/textselection
