!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.textselection=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/core.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function r(o){var i=t[o];if(void 0!==i)return i.exports;var c=t[o]={exports:{}};return e[o](c,c.exports,r),c.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};return(()=>{"use strict";r.d(o,{default:()=>i});var e=r("ckeditor5/src/core.js");class t extends e.Plugin{static get requires(){return["SourceEditing"]}static get pluginName(){return"TextSelection"}constructor(...e){super(...e),this.sourceEditingCursorPosition=-1,console.log("Textselection created.")}init(){this.editor.model.document.on("change",(()=>{this.createAnchor()}))}createAnchor(){const e=this.editor;let t=String(e.getData());t=t.replaceAll("📌",""),e.setData(t),e.model.change((t=>{e.model.insertContent(t.createText("📌"))}))}}const i={Textselection:t}})(),o=o.default})()));