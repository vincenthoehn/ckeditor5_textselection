!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.textselection=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var i in t)o.o(t,i)&&!o.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var i={};return(()=>{"use strict";o.d(i,{default:()=>r});var e=o("ckeditor5/src/core.js");class t extends e.Plugin{static get requires(){return["SourceEditing"]}static get pluginName(){return"TextSelection"}init(){const e=this.editor;e.model.document.on("change",(()=>{this.saveCursorPosition(),console.log("NM: ","The Document has changed!")})),this.listenTo(e.plugins.get("SourceEditing"),"change:isSourceEditingMode",((t,o,i)=>{i&&this.sourceEditingCursorPosition&&(e.model.change((e=>{e.setSelection(this.sourceEditingCursorPosition)})),e.model.document.selection.getFirstRange()!=this.sourceEditingCursorPosition&&console.error("Position stimmt nicht überein!"),console.log("SetSelection",this.sourceEditingCursorPosition))}))}saveCursorPosition(){const e=this.editor.model.document.selection.getFirstRange();e?this.sourceEditingCursorPosition=e:console.error("Position empty")}restoreCursorPosition(){const e=this.editor.model;this.sourceEditingCursorPosition&&e.change((t=>{e.document.selection._setTo(t.createPositionAt(this.sourceEditingCursorPosition)),t.insertText("Test",this.sourceEditingCursorPosition)}))}}const r={Textselection:t}})(),i=i.default})()));