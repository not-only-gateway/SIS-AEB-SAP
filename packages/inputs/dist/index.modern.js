import e,{useState as l,useEffect as t}from"react";import a from"prop-types";import n from"react-input-mask";import{VisibilityOffRounded as i,VisibilityRounded as r,CloseRounded as o,CloudUploadRounded as s,ArrowDropDownRounded as d,DeleteForeverRounded as c,ListRounded as u,AddRounded as m}from"@material-ui/icons";import{Modal as h}from"@material-ui/core";function p(l){return e.createElement("div",{style:{width:l.width,height:"100px",display:"grid",alignItems:l.value?"unset":"flex-start",gap:"4px"}},e.createElement("label",{htmlFor:"input-"+l.label+"-date",className:".labelContainer"},l.label),e.createElement("div",{className:"fieldsContainer"},e.createElement("input",{disabled:l.disabled,id:"input-"+l.label+"-date",style:{height:"56px",fontWeight:500,fontSize:"1rem",fontFamily:"'Source Sans Pro', sans-serif",cursor:l.disabled?"initial":"text"},className:"inputContainer",value:l.value,type:"date",onChange:l.handleChange,maxLength:l.maxLength})),e.createElement("label",{htmlFor:"input-"+l.label+"-date",className:".alertLabel",style:{color:null!==l.value&&l.value?"#262626":"#ff5555",visibility:l.required?"visible":"hidden"}},"Este campo é obrigatório."))}function b(t){var a,o=l(!1),s=o[0],d=o[1];return e.createElement("div",{style:{width:t.width,height:"small"===t.variant?"86px":"100px",display:"grid",alignItems:t.value?"unset":"flex-start",gap:"4px"}},e.createElement("label",{htmlFor:t.label+"text_field",className:".labelContainer",style:{visibility:null!=t.value&&t.value.length>0||"time"===t.type?"visible":"hidden",opacity:null!=t.value&&t.value.length>0||"time"===t.type?"1":"0",transition:"visibility 0.2s ease,opacity 0.2s ease"}},t.label),t.phoneMask?e.createElement(n,{mask:"(99) 9999-9999",value:t.value,onChange:t.handleChange},function(l){return e.createElement("input",{disabled:t.disabled,id:t.label+"text_field",placeholder:t.placeholder,style:{height:"small"===t.variant?"40px":"56px",borderRadius:"5px",border:"#ecedf2 1px solid",boxShadow:"unset",transition:" 250ms ease-in-out",background:"#f4f5fa",width:"100%",outline:"none",padding:"5px",fontSize:"1rem",color:" #555555"},value:l.value,onChange:l.onChange,maxLength:t.maxLength})}):e.createElement("div",{className:".fieldsContainer"},e.createElement("input",{disabled:t.disabled,id:t.label+"text_field",placeholder:t.placeholder,value:t.value,style:{height:"small"===t.variant?"40px":"56px",borderRadius:"5px",border:"#ecedf2 1px solid",boxShadow:"unset",transition:" 250ms ease-in-out",background:"#f4f5fa",width:"100%",outline:"none",padding:"5px",fontSize:"1rem",color:" #555555"},type:t.passwordMask&&!s?"password":t.type?t.type:"text",onChange:t.handleChange,maxLength:t.maxLength}),t.passwordMask?s?e.createElement(r,{htmlFor:t.label+"text_field",style:{transition:"300ms ease-in-out"},className:".visibilityContainer",onClick:function(){return d(!1)}}):e.createElement(i,{htmlFor:t.label+"text_field",style:{transition:"300ms ease-in-out"},onClick:function(){return d(!0)},className:".visibilityContainer"}):null),e.createElement("label",{htmlFor:t.label+"text_field",className:".alertLabel",style:{color:null!==t.value&&t.value&&0!==t.value.length?"#262626":"#ff5555",visibility:t.required?"visible":"hidden"}},(a="This field is required.","pt"===t.locale&&(a="Este campo é obrigatório."),a)))}function g(l){return e.createElement("div",{style:{width:l.width,marginBottom:"auto",height:"100px",display:"grid",gap:"4px",alignItems:l.initialImage?"unset":"flex-end"}},e.createElement("label",{htmlFor:"upload-image",className:".labelContainer",style:{visibility:l.initialImage&&l.initialImage.name?"visible":"hidden",opacity:l.initialImage?"1":"0",transition:"visibility 0.2s ease,opacity 0.2s ease"}},l.label),e.createElement("form",{className:".imageFieldContainer, .highlight"},l.initialImage&&l.initialImage.name?e.createElement("p",{className:".labelContainer",style:{color:"#262626",margin:"unset",overflowX:"hidden",width:"75%",wordBreak:"keep-all",whiteSpace:"nowrap"}},l.initialImage.name):e.createElement("p",{className:".labelContainer",style:{color:"#555555",margin:"unset"}}," ",l.label),l.initialImage?e.createElement("div",{className:".uploadFormContainer",style:{cursor:"pointer"},onClick:function(){l.setImage(null),l.setChanged(!0)}},e.createElement(o,null)):e.createElement("label",{htmlFor:"upload-image",className:".uploadFormContainer",onChange:function(e){l.setImage(e),l.setChanged(!0)}},e.createElement(s,null)),e.createElement("input",{id:"upload-image",type:"file",style:{display:"none"},disabled:l.disabled,onChange:function(e){l.setImage(e),l.setChanged(!0)}})),e.createElement("label",{htmlFor:"input",className:".alertLabel",style:{color:null!==l.value&&l.value&&0!==l.value.length?"#262626":"#ff5555",visibility:l.required?"visible":"hidden"}},(t="This field is required.","pt"===l.locale&&(t="Este campo é obrigatório."),t)));var t}function v(t){var a=l(!1)[1],n=l(!1),i=n[1];return e.createElement("button",{onMouseDown:function(){return a(!0)},onMouseUp:function(){return a(!1)},onMouseEnter:function(){return i(!0)},onMouseLeave:function(){a(!1),i(!1)},key:t.buttonKey,style:{width:t.width,backgroundColor:t.backgroundColor&&!t.disabled?t.backgroundColor:t.disabled?"rgba(0,0,0,0.1)":"unset",color:t.disabled?"#555555":t.hoverHighlight&&n[0]?"secondary"===t.colorVariant?"#ff4940":"#0095ff":t.fontColor,borderRadius:function(){var e="5px";switch(t.variant){case"rounded":e="32px";break;case"circular":e="50%";break;case"custom":e=t.borderRadius}return e}(),boxShadow:t.boxShadow,padding:t.padding?t.padding:"8px",height:"auto",fontFamily:"'Roboto' !important",outline:"none",border:t.border,transition:"200ms ease-in-out",cursor:t.disabled?"initial":"pointer",display:"flex",justifyContent:t.justification?t.justification:"center"},disabled:t.disabled,onClick:function(){void 0!==t.handleClick&&t.handleClick()}},t.content)}function y(a){var n,i=l(!1),r=i[0],o=i[1],s=l(void 0),c=s[0],u=s[1];return t(function(){var e=a.choices.filter(function(e){if(e.key===a.value)return e});e.length>0&&u(e[0].value)},[a.value]),e.createElement("div",{style:{width:a.width,height:"100px",display:"grid",alignItems:a.value?"unset":"flex-start",gap:"4px"}},e.createElement("label",{htmlFor:"dropdown-"+a.label,className:"_qVpd1",style:{visibility:null!=a.value?"visible":"hidden",opacity:null!=a.value?"1":"0",transition:"visibility 0.2s ease,opacity 0.2s ease"}},a.label),e.createElement("div",{className:"_2F1kW",onBlur:function(e){e.currentTarget.contains(e.relatedTarget)||o(!1)}},e.createElement("button",{id:"dropdown-"+a.label,disabled:a.disabled,style:{height:"56px",borderRadius:"5px"},className:"_2WZ9k",onClick:function(){return o(!r)}},c||a.placeholder,e.createElement(d,{style:{transform:r?"unset":"rotate(180deg)"}})),e.createElement("div",{className:"_3wZGJ",style:{display:r?"initial":"none"}},r?a.choices.map(function(l,t){return e.createElement(v,{key:t+"-choice-button",width:"100%",paddingType:"default",justification:"flex-start",handleClick:function(){a.handleChange(l.key),o(!1)},content:l.value,backgroundColor:l.key===a.value?"#0095ff":"transparent",fontColor:l.key===a.value?"white":"#262626",border:"transparent 1px solid",elevation:!1,hoverHighlight:l.key!==a.value})}):null)),e.createElement("label",{htmlFor:"dropdown-"+a.label,className:"_24t0v",style:{color:null==a.value?"#ff5555":"#262626",visibility:a.required&&!r?"visible":"hidden"}},(n="This field is required.","pt"===a.locale&&(n="Este campo é obrigatório."),n)))}p.propTypes={width:a.string,label:a.string,handleChange:a.func,value:a.number,required:a.bool,locale:a.string,disabled:a.bool,dark:a.bool},b.propTypes={width:a.string,placeholder:a.string,label:a.string,handleChange:a.func,value:a.string,required:a.bool,locale:a.string,passwordMask:a.bool,phoneMask:a.bool,maxLength:a.number,disabled:a.bool,variant:a.oneOf(["default","small"]),type:a.string},g.propTypes={setImage:a.func,initialImage:a.any,size:a.string,label:a.string,base64:a.bool,setChanged:a.func,width:a.string,required:a.bool,disabled:a.bool},v.propTypes={handleClick:a.func,disabled:a.bool,content:a.any,backgroundColor:a.any,fontColor:a.any,padding:a.string,variant:a.oneOf(["rounded","default","circle","custom"]),border:a.string,boxShadow:a.any,width:a.string,hoverHighlight:a.bool,justification:a.string,colorVariant:a.oneOf(["default","secondary"]),borderRadius:a.any,buttonKey:a.any},y.propTypes={width:a.string,placeholder:a.string,label:a.string,choices:a.array,handleChange:a.func,value:a.any,required:a.bool,locale:a.string,disabled:a.bool,dark:a.bool};var f={close:"Fechar",search:"Pesquisar",required:"Este campo é obrigatório."};function C(t){var a,n,i=l(!1),r=i[0],o=i[1],s=l(""),d=s[0],p=s[1],g=f;return e.createElement(Fragment,null,e.createElement(h,{open:r,onClose:function(){return o(!1)},style:{display:"flex",alignItems:"center",justifyContent:"center"}},e.createElement("div",{className:".modalContainer",style:{height:"clamp(500px, 75%, 1000px",alignContent:"flex-start"}},e.createElement("div",{className:".modalContent"},e.createElement("h3",{style:{marginTop:0,marginBottom:"16px"}},t.label),null!=t.selected&&null!=t.selected.key?e.createElement(v,{content:t.required?e.createElement("div",null,e.createElement("h5",{style:{marginTop:0,marginBottom:0}},t.selected.value)):e.createElement("div",{style:{display:"flex",gap:"32px",alignItems:"center"}},e.createElement("h5",{style:{marginTop:0,marginBottom:0}},t.selected.value),e.createElement(c,null)),hoverHighlight:!0,colorVariant:"secondary",variant:"default",border:"unset",width:"fit-content",backgroundColor:"#f4f5fa",handleClick:function(){t.setChanged&&t.setChanged(!0),t.handleChange(void 0)},padding:t.required?"8px 32px 8px 32px":"8px",disabled:t.required,fontColor:"#555555"}):null,e.createElement(b,{variant:"small",placeholder:g.search,label:g.search,handleChange:function(e){p(e.target.value)},locale:t.locale,value:d,required:!1,width:"100%",maxLength:void 0}),e.createElement("div",{style:{display:"grid",gap:"8px"}},t.data.map(function(l){var a,n;return 0===d.length||d.length>0&&l.value.toLowerCase().match(d.toLowerCase())?e.createElement("div",{key:l.key+"-"+l.value},e.createElement("button",{onClick:function(){var e;(null===(e=t.selected)||void 0===e?void 0:e.key)===l.key?t.handleChange(void 0):(t.setChanged&&t.setChanged(!0),t.handleChange(l),o(!1))},className:".rowContainer",style:{backgroundColor:l.key===(null===(a=t.selected)||void 0===a?void 0:a.key)?"#0095ff":void 0,color:l.key===(null===(n=t.selected)||void 0===n?void 0:n.key)?"white":void 0,outline:"none"}},l.value)):null}))),e.createElement("div",{className:".modalFooter"},e.createElement(v,{width:"fit-content",border:"#ecedf2 .7px solid",variant:"rounded",content:g.close,handleClick:function(){return o(!1)},backgroundColor:"white",hoverHighlight:!0,colorVariant:"secondary",elevation:!0,fontColor:"#262626",padding:"8px 32px 8px 32px"})))),e.createElement("div",{key:t.label+"-selector",style:{width:t.width,height:"100px",display:"grid",alignItems:t.value?"unset":"flex-start",gap:"4px"}},e.createElement("label",{htmlFor:"select-"+t.label,className:".labelContainer",style:{visibility:null!=t.selected&&null!=t.selected.key?"visible":"hidden",opacity:null!=t.selected&&null!=t.selected.key?"1":"0",transition:"visibility 0.2s ease,opacity 0.2s ease"}},t.label),e.createElement("div",{className:".dropDownContainer"},e.createElement("button",{id:"select-"+t.label,disabled:t.disabled,style:{height:"56px",borderRadius:"5px",cursor:t.disabled?"unset":"pointer"},className:".selectContainer",onClick:function(){return o(!0)}},null!=t.selected&&null!=t.selected.key?e.createElement(Fragment,null,t.selected.value,e.createElement(u,{style:{color:"rgba(0,0,0,.6)"}})):e.createElement(Fragment,null,e.createElement("p",{style:{color:"rgba(0,0,0,.55)"}},t.label),e.createElement(m,{style:{visibility:t.disabled?"hidden":"visible",color:"rgba(0,0,0,.6)"}})))),e.createElement("label",{htmlFor:"select-"+t.label,className:".alertLabel",style:{color:null!==(null===(a=t.selected)||void 0===a?void 0:a.key)&&null!==(n=t.selected)&&void 0!==n&&n.key?"#262626":"#ff5555",visibility:t.required?"visible":"hidden"}},g.required)))}C.propTypes={data:a.array,handleChange:a.func,selected:a.any,label:a.string,width:a.string,required:a.bool,setChanged:a.func,disabled:a.bool,dark:a.bool};export{v as Button,p as DateField,y as DropDownField,g as ImageField,C as Selector,b as TextField};
//# sourceMappingURL=index.modern.js.map
