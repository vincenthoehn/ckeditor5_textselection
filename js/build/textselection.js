!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.textselection=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":(e,t,r)=>{e.exports=r("dll-reference CKEditor5.dll")("./src/utils.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function r(o){var s=t[o];if(void 0!==s)return s.exports;var i=t[o]={exports:{}};return e[o](i,i.exports,r),i.exports}r.d=(e,t)=>{for(var o in t)r.o(t,o)&&!r.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var o={};return(()=>{"use strict";r.d(o,{default:()=>i});var e=r("ckeditor5/src/core.js"),t=r("ckeditor5/src/ui.js");r("ckeditor5/src/utils.js");class s extends e.Plugin{init(){const e=this.editor;e.ui.componentFactory.add("textselection",(r=>{const o=new t.ButtonView(r);return o.set({label:"Text einfügen",withText:!0,tooltip:!0}),o.on("execute",(()=>{e.model.change((t=>{const r=e.model.document.selection.getFirstPosition();t.insertText("📍",r)}))})),o}))}}const i={Textselection:s}})(),o=o.default})()));