!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.textselection=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.textselection=t())}(window,(function(){return function(e){var t={};function o(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(r,n,function(t){return e[t]}.bind(null,n));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s="./js/ckeditor5_plugins/textselection/src/index.js")}({"./js/ckeditor5_plugins/textselection/src/index.js":function(e,t,o){"use strict";o.r(t);var r=o("ckeditor5/src/core.js");class n extends r.Plugin{static get requires(){return["SourceEditing"]}static get pluginName(){return"TextSelection"}init(){const e=this.editor;this.listenTo(e,"change",()=>{e.model.document.on("change",()=>{console.log("The Document has changed!")})}),this.listenTo(e.plugins.get("SourceEditing"),"change:isSourceEditingMode",(e,t,o)=>{o||this.saveCursorPosition(),o?this.saveCursorPosition():this.restoreCursorPosition()})}saveCursorPosition(){const e=this.editor.model.document.selection,t=e.getFirstRange(),o=e.getFirstPosition();for(const e of t.getItems())console.log("Selected Text: ",e.data);o?this.sourceEditingCursorPosition=o:console.error("Position empty")}restoreCursorPosition(){const e=this.editor.model;this.sourceEditingCursorPosition&&e.change(e=>{e.insertText("Test",this.sourceEditingCursorPosition)})}}t.default={Textselection:n}},"ckeditor5/src/core.js":function(e,t,o){e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"dll-reference CKEditor5.dll":function(e,t){e.exports=CKEditor5.dll}}).default}));