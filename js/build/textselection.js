!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.CKEditor5=t():(e.CKEditor5=e.CKEditor5||{},e.CKEditor5.textselection=t())}(self,(()=>(()=>{var e={"ckeditor5/src/core.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/core.js")},"ckeditor5/src/ui.js":(e,t,o)=>{e.exports=o("dll-reference CKEditor5.dll")("./src/ui.js")},"dll-reference CKEditor5.dll":e=>{"use strict";e.exports=CKEditor5.dll}},t={};function o(r){var i=t[r];if(void 0!==i)return i.exports;var s=t[r]={exports:{}};return e[r](s,s.exports,o),s.exports}o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t);var r={};return(()=>{"use strict";o.d(r,{default:()=>s});var e=o("ckeditor5/src/core.js"),t=o("ckeditor5/src/ui.js");class i extends e.Plugin{init(){const e=this.editor;e.ui.componentFactory.add("textselection",(r=>{const i=new t.ButtonView(r);return i.set({label:"📌",withText:!0,tooltip:!0}),i.on("execute",(()=>{e.model.change((t=>{const r=e.model.document.selection.getFirstPosition();t.insertText("📌",r),o("📌")}))})),i})),this.listenTo(e.plugins.get("SourceEditing"),"change:isSourceEditingMode",((e,t,o)=>{o?view.set({isEnabled:!1}):view.set({isEnabled:!0})}));const o=e=>{navigator.clipboard.writeText(e).then((()=>{console.log("Copy to clipboard successful!")}),(e=>{console.error("Error on copy to clipboard: ",e)}))}}}const s={Textselection:i}})(),r=r.default})()));