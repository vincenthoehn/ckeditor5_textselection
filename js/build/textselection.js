!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.textselection=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/ui.js")},"ckeditor5/src/utils.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/utils.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";o.d(r,{default:()=>s});var e=o("ckeditor5/src/core.js"),t=o("ckeditor5/src/ui.js");o("ckeditor5/src/utils.js");class i extends e.Plugin{constructor(e){super(e),this.pinPosition=null}init(){const e=this.editor;e.ui.componentFactory.add("textselection",(o=>{const r=new t.ButtonView(o);return r.set({label:"📌",withText:!0,tooltip:!0}),r.on("execute",(()=>{e.model.change((t=>{if(this.pinPosition){const e=this.pinPosition;t.setSelection(e),t.deleteSelection(),this.pinPosition=null}else{const o=e.model.document.selection.getFirstPosition();t.insertText("📌",o),this.pinPosition=e.model.createRange(o,o.getShiftedBy(2))}}))})),r}))}}const s={Textselection:i}})(),r=r.default})()));