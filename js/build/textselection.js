!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.textselection=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";o.d(r,{default:()=>i});var e=o("ckeditor5/src/core.js");class t extends e.Plugin{static get requires(){return["SourceEditing"]}static get pluginName(){return"TextSelection"}init(){const e=this.editor;e.model.document.on("change",(()=>{this.saveCursorPosition(),console.log("NM: ","The Document has changed!")})),this.listenTo(e.plugins.get("SourceEditing"),"change:isSourceEditingMode",((e,t,o)=>{o&&this.sourceEditingCursorPosition&&this.restoreCursorPosition()}))}saveCursorPosition(){const e=this.editor.model.document.selection.getLastPosition();e?this.sourceEditingCursorPosition=e:console.error("Position empty")}restoreCursorPosition(){const e=this.editor,t=e.model;this.sourceEditingCursorPosition&&t.change((t=>{const o=e.plugins.get("SourceEditing");if(o&&o.isSourceEditingMode){const e=document.querySelector(".ck-source-editing-area textarea");e&&e.setSelectionRange(0,this.sourceEditingCursorPosition)}}))}}const i={Textselection:t}})(),r=r.default})()));