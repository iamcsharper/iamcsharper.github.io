(function(e){function webpackJsonpCallback(t){for(var o,r,a=t[0],c=t[1],l=t[2],u=0,p=[];u<a.length;u++)r=a[u],Object.prototype.hasOwnProperty.call(n,r)&&n[r]&&p.push(n[r][0]),n[r]=0;for(o in c)Object.prototype.hasOwnProperty.call(c,o)&&(e[o]=c[o]);s&&s(t);while(p.length)p.shift()();return i.push.apply(i,l||[]),checkDeferredModules()}function checkDeferredModules(){for(var e,t=0;t<i.length;t++){for(var o=i[t],r=!0,a=1;a<o.length;a++){var s=o[a];0!==n[s]&&(r=!1)}r&&(i.splice(t--,1),e=__webpack_require__(__webpack_require__.s=o[0]))}return e}var t={},n={app:0},i=[];function __webpack_require__(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,__webpack_require__),i.l=!0,i.exports}__webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,n){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},__webpack_require__.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(__webpack_require__.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)__webpack_require__.d(n,i,function(t){return e[t]}.bind(null,i));return n},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e["default"]}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="/dist/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],r=o.push.bind(o);o.push=webpackJsonpCallback,o=o.slice();for(var a=0;a<o.length;a++)webpackJsonpCallback(o[a]);var s=r;i.push([0,"chunk-vendors"]),checkDeferredModules()})({0:function(e,t,n){e.exports=n("cd49")},1:function(e,t){},2:function(e,t){},3821:function(e,t,n){},"4b93":function(e,t,n){"use strict";n("b902")},"57db":function(e,t,n){},"66c6":function(e,t,n){"use strict";n("57db")},"908a":function(e,t,n){},a1a3:function(e,t,n){},b902:function(e,t,n){},c1af:function(e,t,n){"use strict";n("ca8a")},ca8a:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("98db");var i,o,r=n("d4ec"),a=n("262e"),s=n("2caf"),c=n("2b0e"),l=(c["a"],c["a"]),u=l,Appvue_type_template_id_ec5dcb60_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e.errors.length?n("div",{staticStyle:{"padding-top":"50px"}},[n("div",{staticClass:"errors"},e._l(e.errors,(function(t,i){return n("pre",{key:i,attrs:{"data-caption":t.name}},[e._v(e._s("string"===typeof t.stack?t.stack.replace(t.name+": ",""):""))])})),0)]):e._e(),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isLoading,expression:"isLoading"}],staticStyle:{position:"fixed","z-index":"1000",left:"0",right:"0",top:"0",bottom:"0","background-color":"#000",opacity:"0.8"}},[e._m(0)]),e.isProjectLoaded?n("tabs",{attrs:{tabs:["Периферия","Clock","Настройки проекта"]}},[n("template",{slot:"Периферия"},[n("split-pane",{attrs:{"min-percent":20,"default-percent":40,split:"vertical"}},[n("template",{slot:"paneL"},[n("split-pane",{attrs:{"min-percent":30,"default-percent":30,split:"vertical"}},[n("template",{slot:"paneL"},[n("PeripheryList")],1),n("template",{slot:"paneR"},[n("PeripheryProperties")],1)],2)],1),n("template",{slot:"paneR"},[n("aside",{staticClass:"chipview__container"},[n("ChipView")],1)])],2)],1),n("template",{slot:"Clock"},[e._v("WIP")]),n("template",{slot:"Настройки проекта"},[n("ProjectSettingsView")],1)],2):n("div",{staticClass:"project-loader"},[n("div",{staticClass:"project-loader__container"},[n("h4",[e._v("Выберите способ загрузки проекта:")]),n("div",{staticClass:"project-loader__container-buttons"},[n("button",{staticClass:"button button-lg",on:{click:e.loadFromSketch}},[e._v("Новый")]),n("button",{staticClass:"button button-lg",attrs:{disabled:""}},[e._v("Из файла")]),n("button",{staticClass:"button button-lg",attrs:{disabled:!e.hasLocalStorage},on:{click:e.loadFromLocalStorage}},[e._v("Из localstorage")])])])])],1)},p=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticStyle:{display:"flex",width:"100%",height:"100%","align-items":"center","justify-content":"center"}},[i("img",{attrs:{src:n("dfc1")}})])}],d=n("bee2"),_=(n("d3b7"),n("9ab4")),h=n("1b40"),Chipviewvue_type_template_id_5360213b_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.onClickOutside,expression:"onClickOutside"}],ref:"chipview_container_borders"},[n("dropbox",{attrs:{mode:e.DropboxMode.Fixed,pos:e.dropboxPos,pivot:e.pivot,is_hidden:e.dropbox_hidden,options:e.dropbox_options,selected:e.selected_options,onOptionSelected:e.onOptionSelected}}),n("div",{staticClass:"zoom_picker__container"},[n("aside",{staticClass:"zoom_picker__container-info"},[n("span",[e._v(e._s(e.projectName))]),n("span",[e._v("MIK32")]),n("span",[e._v("QFP64")]),e.shouldSaySaved?n("span",[e._v("СОХРАНЕНО😊")]):e._e(),n("button",{staticClass:"button",on:{click:function(t){return e.saveProject()}}},[e._v("Сохранить проект")]),n("button",{staticClass:"button"},[e._v("Экспорт")])]),n("input",{directives:[{name:"model",rawName:"v-model",value:e.zoom,expression:"zoom"}],attrs:{type:"range",min:"0.3",max:"1.7",step:"0.05"},domProps:{value:e.zoom},on:{__r:function(t){e.zoom=t.target.value}}}),n("button",{staticClass:"button button-danger",on:{click:e.resetView}},[e._v("Сброс")])]),n("div",{staticClass:"chipview__holder",style:{transform:"translate("+e.offset.x+"px, "+e.offset.y+"px) scale("+e.zoom+")"}},[n("div",{directives:[{name:"drag",rawName:"v-drag",value:this.onDragged,expression:"this.onDragged"}],staticClass:"chipview__holder-body",style:{width:2*e.footprint.packageWidth(0)+"px",height:2*e.footprint.packageWidth(1)+"px",left:"-"+e.footprint.packageWidth(0)+"px",top:"-"+e.footprint.packageWidth(1)+"px"}},[e._v("MIK32"),n("br"),e._v(e._s(e.footprint.name))]),e._l(e.cols,(function(t,i){return n("pin-column",{key:i,attrs:{col_id:i,pins:t.pins,param_left:t.left,param_top:t.top,rotation:t.rotation,pin_width:e.footprint.btnWidth,pin_height:e.footprint.btnHeight}})}))],2)],1)},f=[],b=(n("d81d"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"container",staticClass:"dropbox",class:{"dropbox--fixed":e.mode===e.DropboxMode.Fixed,"dropbox--hidden":e.is_hidden},style:e.style},e._l(e.options,(function(t,i){return n("div",{key:i,staticClass:"dropbox__option",class:{"dropbox__option--selected":e.selected.includes(i)},attrs:{value:t.value},on:{click:function(n){return e.onOptionSelected(i,t)}}},[e._v(" "+e._s(t.text)+" ")])})),0)}),v=[];(function(e){e[e["Normal"]=0]="Normal",e[e["Fixed"]=1]="Fixed"})(i||(i={})),function(e){e[e["TopRight"]=0]="TopRight",e[e["TopLeft"]=1]="TopLeft",e[e["BottomRight"]=2]="BottomRight",e[e["BottomLeft"]=3]="BottomLeft"}(o||(o={}));var m=function(e){Object(a["a"])(Dropbox,e);var t=Object(s["a"])(Dropbox);function Dropbox(){var e;return Object(r["a"])(this,Dropbox),e=t.call(this),e.DropboxMode=i,e.isMounted=!1,e.w=0,e.h=0,e}return Object(d["a"])(Dropbox,[{key:"mounted",value:function mounted(){this.isMounted=!0}},{key:"updated",value:function updated(){if(this.mode!==i.Normal){var e=window.getComputedStyle(this.container),t=parseInt(e.width),n=parseInt(e.height);this.w==t&&this.h==n||(this.w=t,this.h=n)}}},{key:"style",get:function get(){if(this.mode===i.Normal)return{};var e=0,t=0;if(this.isMounted){var n=window.getComputedStyle(this.container);this.w=parseInt(n.width),this.h=parseInt(n.height),this.pivot!==o.TopRight&&this.pivot!==o.BottomRight||(e-=this.w),this.pivot!==o.BottomRight&&this.pivot!==o.BottomLeft||(t-=this.h)}return{left:this.pos.x+e+"px",top:this.pos.y+t+"px"}}}]),Dropbox}(u);Object(_["a"])([Object(h["c"])({required:!0})],m.prototype,"mode",void 0),Object(_["a"])([Object(h["c"])({required:!0})],m.prototype,"pivot",void 0),Object(_["a"])([Object(h["c"])({required:!0})],m.prototype,"pos",void 0),Object(_["a"])([Object(h["c"])({required:!0})],m.prototype,"options",void 0),Object(_["a"])([Object(h["e"])("container")],m.prototype,"container",void 0),Object(_["a"])([Object(h["c"])()],m.prototype,"is_hidden",void 0),Object(_["a"])([Object(h["c"])({default:function _default(){return[]}})],m.prototype,"selected",void 0),Object(_["a"])([Object(h["c"])({default:function _default(e,t){}})],m.prototype,"onOptionSelected",void 0),m=Object(_["a"])([h["a"]],m);var g=m,O=g,j=(n("d203"),n("2877")),y=Object(j["a"])(O,b,v,!1,null,"6f9fbe8d",null),E=y.exports,PinColumnvue_type_template_id_cb97d376_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"chipview__absolute",style:{left:e.param_left+"px",top:e.param_top+"px",transform:"rotate("+e.rotation+"deg)",width:e.pin_width+"px"}},[n("div",{staticClass:"chipview__pincolumn"},e._l(e.pins,(function(t,i){return n("pin",{key:i,attrs:{col_id:e.col_id,pin:t,height:e.pin_height,rotation:e.rotation}})})),1)])},P=[],Pinvue_type_template_id_a62f3602_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"chipview__pin"},[n("button",{staticClass:"btn",class:{active:null!==e.storePin.selectedMode,open:e.pin.is_open},staticStyle:{width:"100%"},style:{height:e.height+"px"},attrs:{disabled:e.storePin.modes.length<=1},on:{click:function(t){return e.pin_click_handler(t,e.pin.id,e.col_id)}}},[n("span",[e._v(e._s(e.storePin.name))]),n("div",{directives:[{name:"show",rawName:"v-show",value:null!==e.storePin.selectedMode,expression:"storePin.selectedMode !== null"}],staticClass:"badges",class:{"badges--opposite":2===e.col_id&&0===e.rotation||3===e.col_id}},[e._v(" "+e._s(null!==e.storePin.selectedMode?e.storePin.modes[e.storePin.selectedMode].sign:"")+" ")])])])},w=[],k=function(e){Object(a["a"])(ChipView,e);var t=Object(s["a"])(ChipView);function ChipView(){return Object(r["a"])(this,ChipView),t.apply(this,arguments)}return Object(d["a"])(ChipView,[{key:"storePin",get:function get(){return this.$store.state.pinout[this.pin.id]}}]),ChipView}(u);Object(_["a"])([Object(h["c"])()],k.prototype,"pin",void 0),Object(_["a"])([Object(h["c"])()],k.prototype,"height",void 0),Object(_["a"])([Object(h["c"])()],k.prototype,"col_id",void 0),Object(_["a"])([Object(h["c"])()],k.prototype,"rotation",void 0),Object(_["a"])([Object(h["b"])("pin_click_handler")],k.prototype,"pin_click_handler",void 0),k=Object(_["a"])([h["a"]],k);var x=k,I=x,C=(n("f333"),Object(j["a"])(I,Pinvue_type_template_id_a62f3602_scoped_true_render,w,!1,null,"a62f3602",null)),S=C.exports,L=function(e){Object(a["a"])(PinColumn,e);var t=Object(s["a"])(PinColumn);function PinColumn(){return Object(r["a"])(this,PinColumn),t.call(this)}return PinColumn}(u);Object(_["a"])([Object(h["c"])()],L.prototype,"pins",void 0),Object(_["a"])([Object(h["c"])()],L.prototype,"col_id",void 0),Object(_["a"])([Object(h["c"])()],L.prototype,"pin_width",void 0),Object(_["a"])([Object(h["c"])()],L.prototype,"pin_height",void 0),Object(_["a"])([Object(h["c"])()],L.prototype,"param_left",void 0),Object(_["a"])([Object(h["c"])()],L.prototype,"param_top",void 0),Object(_["a"])([Object(h["c"])()],L.prototype,"rotation",void 0),L=Object(_["a"])([Object(h["a"])({components:{Pin:S}})],L);var T,R=L,D=R,N=(n("66c6"),Object(j["a"])(D,PinColumnvue_type_template_id_cb97d376_scoped_true_render,P,!1,null,"cb97d376",null)),A=N.exports;n("07ac");(function(e){e["IO"]="IO",e["GND"]="GND",e["Input"]="Input",e["Output"]="Output",e["Power"]="Power",e["OSC"]="OSC"})(T||(T={}));var M,H,G=Object.values(T);(function(e){e["SET_PROJECT_NAME"]="SET_PROJECT_NAME",e["SET_SELECTED_PERIPHERAL"]="SET_SELECTED_PERIPHERAL",e["INCREMENT_VERSION"]="INCREMENT_VERSION",e["SET_LOADED_STATE"]="SET_LOADED_STATE",e["SET_IS_LOADING"]="SET_IS_LOADING",e["ADD_ERROR"]="ADD_ERROR",e["PUSH_PIN"]="PUSH_PIN",e["CHANGE_PIN_DATA"]="CHANGE_PIN_DATA"})(M||(M={})),function(e){e["LOAD_GITHUB"]="LOAD_GITHUB",e["SAVE_PROJECT"]="SAVE_PROJECT",e["LOAD_PROJECT"]="LOAD_PROJECT"}(H||(H={}));var W={name:"QFP64",isSquare:!0,perCol:16,btnWidth:95,btnHeight:24,colHeight:function colHeight(e){return this.btnHeight*this.perCol},packageWidth:function packageWidth(e){return this.colHeight(e)/2}},V=function generateCols(e){if(e.isSquare){for(var t=[{left:-e.btnWidth-e.packageWidth(0),top:-e.packageWidth(0),pins:null,rotation:0},{left:-e.btnWidth/2,top:e.btnWidth/2,pins:null,rotation:-90},{left:e.packageWidth(2),top:-e.packageWidth(2),pins:null,rotation:0},{left:-e.btnWidth/2,top:2*-e.packageWidth(3)-e.btnWidth/2,pins:null,rotation:-90}],n=0;n<4;++n){for(var i=[],o=0;o<e.perCol;++o){var r=(n<2?o:e.perCol-1-o)+n*e.perCol;i.push({id:r,name:"Pin"+(r+1),x:0,y:0,is_open:!1})}t[n].pins=i}return t}for(var a=[{left:-e.btnWidth-e.packageWidth(0),top:-e.packageWidth(0),pins:null,rotation:0},{left:e.packageWidth(0),top:-e.packageWidth(0),pins:null,rotation:0}],s=0;s<2;++s){for(var c=[],l=0;l<e.perCol;++l){var u=(s<2?l:e.perCol-1-l)+s*e.perCol;c.push({id:u,name:"Pin"+(u+1),x:0,y:0,is_open:!1})}a[s].pins=c}return a},$=function(e){Object(a["a"])(ChipView,e);var t=Object(s["a"])(ChipView);function ChipView(){var e;return Object(r["a"])(this,ChipView),e=t.call(this),e.DropboxMode=i,e.dropboxPos={x:-100,y:-100},e.pivot=o.TopLeft,e.dropbox_hidden=!0,e.selected_pin_id=-1,e.dropbox_options=[],e.footprint=W,e.isMounted=!1,e.zoom=1,e.offset={x:0,y:0},e.wheelHandler=function(t){return e.onWheel(t)},e.shouldSaySaved=!1,e.savedInfoTimer=null,e.isDragging=!1,e}return Object(d["a"])(ChipView,[{key:"selected_options",get:function get(){if(-1===this.selected_pin_id)return[];var e=this.$store.state.pinout[this.selected_pin_id].selectedMode;return null===e?[]:[e]}},{key:"cols",get:function get(){return V(this.footprint)}},{key:"projectName",get:function get(){return this.$store.state.projectName}},{key:"resetView",value:function resetView(){this.offset.x=0,this.offset.y=0,this.zoom=1}},{key:"saveProject",value:function saveProject(){this.$store.dispatch(H.SAVE_PROJECT,"localstorage")}},{key:"onOptionSelected",value:function onOptionSelected(e,t){var n=this.$store.state.pinout[this.selected_pin_id];n.selectedMode==t.value?n.selectedMode=null:n.selectedMode=t.value,this.$store.commit(M.CHANGE_PIN_DATA,n)}},{key:"pinClickHandler",value:function pinClickHandler(e,t,n){var i=this.$store.state.pinout[t];this.selected_pin_id=t;var r=e.target;r.classList.contains("btn")||(r=r.parentElement);var a=r.getBoundingClientRect(),s=a.left,c=a.top,l=a.width,u=a.height;0===n?this.pivot=o.TopRight:1===n?(this.pivot=o.TopLeft,c+=u):2===n?(this.pivot=o.TopLeft,s+=l):3===n&&(this.pivot=o.BottomLeft),this.dropbox_hidden=!1,this.dropboxPos.x=s,this.dropboxPos.y=c;var p=i.modes;this.dropbox_options=p.map((function(e,t){return{text:e.sign,value:t}}))}},{key:"onClickOutside",value:function onClickOutside(){this.dropbox_hidden=!0}},{key:"mounted",value:function mounted(){var e=this;this.isMounted=!0,this.zoom=1,window.addEventListener("mousewheel",this.wheelHandler),this.$store.subscribe((function(t,n){t.type===M.INCREMENT_VERSION&&(console.log(t.type,t.payload,n),e.shouldSaySaved=!0,e.savedInfoTimer&&clearTimeout(e.savedInfoTimer),e.savedInfoTimer=setTimeout((function(){e.shouldSaySaved=!1}),2e3))}))}},{key:"onWheel",value:function onWheel(e){if(this.$el.parentElement){var t=this.$el.parentElement.getBoundingClientRect(),n=t.x,i=t.y,o=t.width,r=t.height;e.pageX<n||e.pageX>n+o||e.pageY<i||e.pageY>i+r||(this.zoom-=e.deltaY/125*.05,this.zoom>1.7&&(this.zoom=1.7),this.zoom<.3&&(this.zoom=.3),this.dropbox_hidden=!0)}}},{key:"destroyed",value:function destroyed(){window.removeEventListener("mousewheel",this.wheelHandler)}},{key:"onDragged",value:function onDragged(e){e.el;var t=e.hasMoved,n=e.isDragging,i=e.deltaX,o=e.deltaY;this.isDragging=n,t&&(this.offset.x+=i,this.offset.y+=o,this.dropbox_hidden=!0)}}]),ChipView}(u);Object(_["a"])([Object(h["e"])("chipview_container_borders")],$.prototype,"borders",void 0),Object(_["a"])([Object(h["d"])("pin_click_handler")],$.prototype,"pinClickHandler",null),$=Object(_["a"])([Object(h["a"])({components:{PinColumn:A,Dropbox:E}})],$);var B,z=$,J=z,Y=(n("e681"),Object(j["a"])(J,Chipviewvue_type_template_id_5360213b_scoped_true_render,f,!1,null,"5360213b",null)),F=Y.exports,PeripheryListvue_type_template_id_5e1e4af2_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h4",[e._v("Список периферии:")]),n("ul",e._l(e.Peripherals,(function(t){return n("li",{key:t,class:{active:e.getIsActive(t)},on:{click:function(n){return e.selectPeriphery(t)}}},[e._v(e._s(t))])})),0)])},X=[];(function(e){e["GPIO"]="GPIO",e["TIMER32"]="TIMER32",e["TIMER16"]="TIMER16"})(B||(B={}));var Z=function(e){Object(a["a"])(PeripheryList,e);var t=Object(s["a"])(PeripheryList);function PeripheryList(){var e;return Object(r["a"])(this,PeripheryList),e=t.apply(this,arguments),e.Peripherals=B,e}return Object(d["a"])(PeripheryList,[{key:"selectPeriphery",value:function selectPeriphery(e){this.$store.commit(M.SET_SELECTED_PERIPHERAL,e)}},{key:"getIsActive",value:function getIsActive(e){return this.$store.state.selectedPeripheral===e}}]),PeripheryList}(u);Z=Object(_["a"])([Object(h["a"])({components:{}})],Z);var U=Z,q=U,Q=(n("c1af"),Object(j["a"])(q,PeripheryListvue_type_template_id_5e1e4af2_scoped_true_render,X,!1,null,"5e1e4af2",null)),K=Q.exports,ProjectSettingsViewvue_type_template_id_ca1c95c2_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",[e._v("Настройки проекта")]),n("p",[e._v("Текущая версия: "),n("b",[e._v(e._s(e.currentVersion))])]),e._v(" Название проекта: "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.projectName,expression:"projectName"}],domProps:{value:e.projectName},on:{input:function(t){t.target.composing||(e.projectName=t.target.value)}}})])},ee=[],te=function(e){Object(a["a"])(ProjectSettingsView,e);var t=Object(s["a"])(ProjectSettingsView);function ProjectSettingsView(){return Object(r["a"])(this,ProjectSettingsView),t.apply(this,arguments)}return Object(d["a"])(ProjectSettingsView,[{key:"projectName",get:function get(){return this.$store.state.projectName},set:function set(e){this.$store.commit(M.SET_PROJECT_NAME,e)}},{key:"currentVersion",get:function get(){return this.$store.state.counter+""}}]),ProjectSettingsView}(u);te=Object(_["a"])([h["a"]],te);var ne,ie,oe,re,ae=te,se=ae,ce=Object(j["a"])(se,ProjectSettingsViewvue_type_template_id_ca1c95c2_scoped_true_render,ee,!1,null,"ca1c95c2",null),le=ce.exports,PeripheryPropertiesvue_type_template_id_b5db2dd0_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h4",[e._v("Настройки периферии")]),e.selectedPeripheral===e.Peripherals.GPIO?n("gpio"):e._e(),e.selectedPeripheral===e.Peripherals.TIMER32?n("timer-32"):e._e()],1)},ue=[],GpioPropertiesvue_type_template_id_47199d66_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap-table100"},[n("main",{staticClass:"table"},[e._m(0),e._l(e.configs,(function(t){return n("aside",{key:t.name,staticClass:"row"},[n("div",{staticClass:"cell",attrs:{"data-title":"Name"}},[e._v(e._s(t.name))]),n("div",{staticClass:"cell",attrs:{"data-title":"Direction"}},[e._v(e._s(t.direction))]),n("div",{staticClass:"cell",attrs:{"data-title":"IntMode"}},[e._v(e._s(t.intMode))]),n("div",{staticClass:"cell",attrs:{"data-title":"Line"}},[e._v(e._s(t.line))])])}))],2)])},pe=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("aside",{staticClass:"row header"},[n("div",{staticClass:"cell"},[e._v("Name")]),n("div",{staticClass:"cell"},[e._v("Direction")]),n("div",{staticClass:"cell"},[e._v("IntMode")]),n("div",{staticClass:"cell"},[e._v("Line")])])}];(function(e){e["Input"]="Input",e["Output"]="Output"})(ne||(ne={})),function(e){e["None"]="None",e["Int_Low"]="Int_Low",e["Int_High"]="Int_High",e["Int_Falling"]="Int_Falling",e["Int_Rising"]="Int_Rising",e["Int_Change"]="Int_Change",e["Event_Low"]="Event_Low",e["Event_High"]="Event_High",e["Event_Falling"]="Event_Falling",e["Event_Rising"]="Event_Rising",e["Event_Change"]="Event_Change"}(ie||(ie={})),function(e){e["None"]="None",e["Line_0"]="Line_0",e["Line_1"]="Line_1",e["Line_2"]="Line_2",e["Line_3"]="Line_3",e["Line_4"]="Line_4",e["Line_5"]="Line_5",e["Line_6"]="Line_6",e["Line_7"]="Line_7"}(oe||(oe={})),function(e){e["PUSH_CONFIG"]="PUSH_CONFIG",e["CHANGE_CONFIG_DATA"]="CHANGE_CONFIG_DATA"}(re||(re={}));var de=function(e){Object(a["a"])(GpioProperties,e);var t=Object(s["a"])(GpioProperties);function GpioProperties(){return Object(r["a"])(this,GpioProperties),t.call(this)}return Object(d["a"])(GpioProperties,[{key:"mounted",value:function mounted(){var e=this.$store.state;console.log(this.$store,e.gpio),this.$store.commit(re.PUSH_CONFIG,{name:"test",direction:ne.Input,intMode:ie.Event_Low,line:oe.Line_5})}},{key:"configs",get:function get(){var e=this.$store.state;return e.gpio.configs}}]),GpioProperties}(u);de=Object(_["a"])([Object(h["a"])({components:{}})],de);var _e=de,he=_e,fe=Object(j["a"])(he,GpioPropertiesvue_type_template_id_47199d66_render,pe,!1,null,null,null),be=fe.exports,Timer32Propertiesvue_type_template_id_4d5bd238_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e._v(" TIMER32 properties ")])},ve=[],me=function(e){Object(a["a"])(Timer32Properties,e);var t=Object(s["a"])(Timer32Properties);function Timer32Properties(){return Object(r["a"])(this,Timer32Properties),t.call(this)}return Timer32Properties}(u);me=Object(_["a"])([Object(h["a"])({components:{}})],me);var ge=me,Oe=ge,je=Object(j["a"])(Oe,Timer32Propertiesvue_type_template_id_4d5bd238_render,ve,!1,null,null,null),ye=je.exports,Ee=function(e){Object(a["a"])(PeripheryList,e);var t=Object(s["a"])(PeripheryList);function PeripheryList(){var e;return Object(r["a"])(this,PeripheryList),e=t.call(this),e.Peripherals=B,e}return Object(d["a"])(PeripheryList,[{key:"selectedPeripheral",get:function get(){return this.$store.state.selectedPeripheral}}]),PeripheryList}(u);Ee=Object(_["a"])([Object(h["a"])({components:{Gpio:be,Timer32:ye}})],Ee);var Pe=Ee,we=Pe,ke=Object(j["a"])(we,PeripheryPropertiesvue_type_template_id_b5db2dd0_scoped_true_render,ue,!1,null,"b5db2dd0",null),xe=ke.exports,Tabsvue_type_template_id_0dc3c14f_scoped_true_render=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tabs__light"},[e.tabs.length?n("ul",{staticClass:"tabs__header"},e._l(e.tabs,(function(t,i){return n("li",{key:t,class:{nav__selected:i==e.selectedIndex},on:{click:function(t){return e.selectTab(i)}}},[e._v(" "+e._s(t)+" ")])})),0):e._e(),e._l(e.tabs,(function(t,i){return n("div",{key:t,ref:"tab-"+i,refInFor:!0,staticClass:"tab"},[e._t(t)],2)}))],2)},Ie=[],Ce=function(e){Object(a["a"])(Tabs,e);var t=Object(s["a"])(Tabs);function Tabs(){var e;return Object(r["a"])(this,Tabs),e=t.apply(this,arguments),e.selectedIndex=0,e}return Object(d["a"])(Tabs,[{key:"mounted",value:function mounted(){this.selectTab(0)}},{key:"selectTab",value:function selectTab(e){this.selectedIndex=e;for(var t=0;t<this.tabs.length;t++){var n=this.$refs["tab-".concat(t)];n[0].style.display=t===e?"block":"none"}}}]),Tabs}(u);Object(_["a"])([Object(h["c"])(Array)],Ce.prototype,"tabs",void 0),Ce=Object(_["a"])([Object(h["a"])({components:{}})],Ce);var Se=Ce,Le=Se,Te=(n("4b93"),Object(j["a"])(Le,Tabsvue_type_template_id_0dc3c14f_scoped_true_render,Ie,!1,null,"0dc3c14f",null)),Re=Te.exports,De=n("bc3a"),Ne=n.n(De),Ae=function(e){Object(a["a"])(App,e);var t=Object(s["a"])(App);function App(){return Object(r["a"])(this,App),t.apply(this,arguments)}return Object(d["a"])(App,[{key:"mounted",value:function mounted(){var e=this;Ne.a.interceptors.request.use((function(t){return e.$store.commit(M.SET_IS_LOADING,!0),t}),(function(e){return Promise.reject(e)})),Ne.a.interceptors.response.use((function(t){return e.$store.commit(M.SET_IS_LOADING,!1),t}),(function(e){return Promise.reject(e)})),this.$store.dispatch(H.LOAD_GITHUB)}},{key:"loadFromSketch",value:function loadFromSketch(){this.$store.dispatch(H.LOAD_PROJECT,"none")}},{key:"loadFromLocalStorage",value:function loadFromLocalStorage(){this.$store.dispatch(H.LOAD_PROJECT,"localstorage")}},{key:"isProjectLoaded",get:function get(){return this.$store.state.isProjectLoaded}},{key:"isLoading",get:function get(){return this.$store.state.isLoading}},{key:"errors",get:function get(){return this.$store.state.errors}},{key:"hasLocalStorage",get:function get(){return null!==window.localStorage.getItem("project")}}]),App}(u);Ae=Object(_["a"])([Object(h["a"])({components:{ChipView:F,PeripheryList:K,PeripheryProperties:xe,Tabs:Re,ProjectSettingsView:le}})],Ae);var Me,He,Ge,We=Ae,Ve=We,$e=(n("e23a"),Object(j["a"])(Ve,Appvue_type_template_id_ec5dcb60_scoped_true_render,p,!1,null,"ec5dcb60",null)),Be=$e.exports,ze=n("19ab"),Je=n.n(ze),Ye=n("2f62"),Fe=n("ade3"),Xe=n("2909"),Ze=(n("c740"),Me={},Object(Fe["a"])(Me,M.SET_PROJECT_NAME,(function(e,t){e.projectName=t})),Object(Fe["a"])(Me,M.SET_SELECTED_PERIPHERAL,(function(e,t){e.selectedPeripheral=t})),Object(Fe["a"])(Me,M.INCREMENT_VERSION,(function(e){e.counter++})),Object(Fe["a"])(Me,M.SET_LOADED_STATE,(function(e,t){e.isProjectLoaded=t})),Object(Fe["a"])(Me,M.SET_IS_LOADING,(function(e,t){e.isLoading=t})),Object(Fe["a"])(Me,M.ADD_ERROR,(function(e,t){console.error(t),e.errors.push(t),e.isLoading&&(e.isLoading=!1)})),Object(Fe["a"])(Me,M.PUSH_PIN,(function(e,t){e.pinout.push(t),e.pinout=Object(Xe["a"])(e.pinout)})),Object(Fe["a"])(Me,M.CHANGE_PIN_DATA,(function(e,t){var n=e.pinout.findIndex((function(e){return e.id===t.id}));-1!==n&&(e.pinout[n]=t,e.pinout=Object(Xe["a"])(e.pinout))})),Me),Ue={doubledCounter:function doubledCounter(e){return 2*e.counter},getSelectedPeripheral:function getSelectedPeripheral(e){return e.selectedPeripheral},getIsLoading:function getIsLoading(e){return e.isLoading}},qe=n("b85c"),Qe=n("1da1"),Ke=(n("96cf"),n("b0c0"),n("99af"),n("caad"),n("2532"),n("a15b"),n("c51a")),et=n.n(Ke),tt="https://raw.githubusercontent.com/sh-sergey/mcu32-hal/main/templates/mik32_pinout.xml",nt=(He={},Object(Fe["a"])(He,H.LOAD_GITHUB,(function(e){return Object(Qe["a"])(regeneratorRuntime.mark((function _callee(){var t,n,i,o,r,a,s,c,l,u,p,d,_,h,f,b,v,m,g,O,j,y,E;return regeneratorRuntime.wrap((function _callee$(P){while(1)switch(P.prev=P.next){case 0:return t=e.commit,P.next=3,Ne.a.get(tt);case 3:if(n=P.sent,i=et.a.xml2js(n.data),o=i.elements[1],o&&o.elements){P.next=9;break}return t(M.ADD_ERROR,new Error("Bad xml data: no root element")),P.abrupt("return");case 9:if(r=o.elements[0].elements,r){P.next=13;break}return t(M.ADD_ERROR,new Error("Bad xml data: no pin elements")),P.abrupt("return");case 13:a=Object(qe["a"])(r),P.prev=14,a.s();case 16:if((s=a.n()).done){P.next=63;break}if(l=s.value,u=l.attributes,p=l.elements,u&&p){P.next=22;break}return t(M.ADD_ERROR,new Error("Bad xml data: pin ".concat(JSON.stringify(l.text)," \n          has no attrs or elements"))),P.abrupt("return");case 22:if(d=u.id,_=u.name,h="string"===typeof u.analog?u.analog:"","string"===typeof d&&"string"===typeof _){P.next=27;break}return t(M.ADD_ERROR,new Error("Bad xml data: pin ".concat(JSON.stringify(l)," has \n          at least one wrong attr (id, name) = (").concat(d,", ").concat(_,")"))),P.abrupt("return");case 27:if(null!==(c=l.elements)&&void 0!==c&&c.length){P.next=30;break}return t(M.ADD_ERROR,new Error("Bad xml data: pin ".concat(JSON.stringify(l)," \n          has no mode elements"))),P.abrupt("return");case 30:f=l.elements,b=[],v=Object(qe["a"])(f),P.prev=33,v.s();case 35:if((m=v.n()).done){P.next=52;break}if(g=m.value,O=g.attributes,j=g.elements,O&&j&&"string"===typeof j[0].text){P.next=42;break}return t(M.ADD_ERROR,new Error("Bad xml data: pin ".concat(JSON.stringify(l),"\n            mode ").concat(JSON.stringify(g)," has no attrs or text content"))),P.abrupt("return");case 42:if(y=O.sign,E=O.type,"string"===typeof y&&"string"===typeof E){P.next=46;break}return t(M.ADD_ERROR,new Error("Bad xml data: pin ".concat(JSON.stringify(l)," mode \n            ").concat(JSON.stringify(g)," has at least one\n            attr null or missing(sign, type)"))),P.abrupt("return");case 46:if(G.includes(E)){P.next=49;break}return t(M.ADD_ERROR,new Error("Bad xml data: pin ".concat(JSON.stringify(l)," mode \n            ").concat(JSON.stringify(g)," has unknown mode ").concat(E,", \n            expected any of ").concat(G.join(", ")))),P.abrupt("return");case 49:b.push({sign:y,text:j[0].text,type:E});case 50:P.next=35;break;case 52:P.next=57;break;case 54:P.prev=54,P.t0=P["catch"](33),v.e(P.t0);case 57:return P.prev=57,v.f(),P.finish(57);case 60:t(M.PUSH_PIN,{selectedMode:null,id:parseInt(d),name:_,modes:b,analog:h});case 61:P.next=16;break;case 63:P.next=68;break;case 65:P.prev=65,P.t1=P["catch"](14),a.e(P.t1);case 68:return P.prev=68,a.f(),P.finish(68);case 71:case"end":return P.stop()}}),_callee,null,[[14,65,68,71],[33,54,57,60]])})))()})),Object(Fe["a"])(He,H.SAVE_PROJECT,(function(e,t){return Object(Qe["a"])(regeneratorRuntime.mark((function _callee2(){var n,i;return regeneratorRuntime.wrap((function _callee2$(o){while(1)switch(o.prev=o.next){case 0:if(n=e.commit,i=e.state,"localstorage"!==t){o.next=6;break}n(M.INCREMENT_VERSION),window.localStorage.setItem("project",JSON.stringify(i)),o.next=8;break;case 6:return n(M.ADD_ERROR,new Error("Unsupported save method")),o.abrupt("return");case 8:case"end":return o.stop()}}),_callee2)})))()})),Object(Fe["a"])(He,H.LOAD_PROJECT,(function(e,t){return Object(Qe["a"])(regeneratorRuntime.mark((function _callee3(){var n,i,o;return regeneratorRuntime.wrap((function _callee3$(r){while(1)switch(r.prev=r.next){case 0:if(n=e.commit,"none"!==t){r.next=5;break}n(M.SET_LOADED_STATE,!0),r.next=21;break;case 5:if("localstorage"!==t){r.next=19;break}if(n(M.SET_IS_LOADING,!0),i=window.localStorage.getItem("project"),o=i?JSON.parse(i):null,!o){r.next=15;break}resetStoreState(o),n(M.SET_LOADED_STATE,!0),n(M.SET_IS_LOADING,!1),r.next=17;break;case 15:return n(M.ADD_ERROR,new Error("Could not load state from localstorage: no key")),r.abrupt("return");case 17:r.next=21;break;case 19:return n(M.ADD_ERROR,new Error("Unsupported save method")),r.abrupt("return");case 21:case"end":return r.stop()}}),_callee3)})))()})),He),it=(Ge={},Object(Fe["a"])(Ge,re.PUSH_CONFIG,(function(e,t){e.configs.push(t),e.configs=Object(Xe["a"])(e.configs)})),Object(Fe["a"])(Ge,re.CHANGE_CONFIG_DATA,(function(e,t){var n=e.configs.findIndex((function(e){return e.name===t.name}));-1!==n&&(e.configs[n]=t,e.configs=Object(Xe["a"])(e.configs))})),Ge),ot={foo:"bar",configs:[]},rt={state:ot,mutations:it},at={gpio:rt},st={isLoading:!1,counter:0,projectName:"Project#0",selectedPeripheral:B.GPIO,isProjectLoaded:!1,isProjectSaved:!1,errors:[],pinout:[]},ct=st;c["a"].use(Ye["b"]);var lt={state:ct,mutations:Ze,getters:Ue,actions:nt,modules:at},ut=new Ye["a"](lt);function resetStoreState(e){ut.replaceState(e)}var pt=ut,dt=function addEventListeners(e,t,n){for(var i=0,o=t.length;i<o;i++)e.addEventListener(t[i],n)},_t=function removeEventListeners(e,t,n){for(var i=0,o=t.length;i<o;i++)e.removeEventListener(t[i],n)},ht=["mousedown","touchstart"],ft=["mousemove","touchmove"],bt=["mouseup","touchend"],vt=null,mt=null,gt=null;function onPointerStart(e){if(mt&&gt){mt.firstCoords=mt.lastCoords={x:e.clientX,y:e.clientY},mt.hasLast=!0;var t={el:mt,isDragging:!0,hasMoved:!1,clientX:e.clientX,clientY:e.clientY,deltaX:0,deltaY:0};gt.value(t),vt=mt}}function onPointerEnd(e){if(mt&&gt&&mt===vt){e.preventDefault(),mt.hasLast=!1;var t={el:mt,isDragging:!1,hasMoved:!1,clientX:e.clientX,clientY:e.clientY,deltaX:0,deltaY:0};gt.value(t),vt=null}}function onPointerMove(e){if(mt&&gt&&mt===vt&&(e.preventDefault(),mt.hasLast)){var t=e.clientX-mt.lastCoords.x,n=e.clientY-mt.lastCoords.y,i=e.clientX-mt.firstCoords.x,o=e.clientY-mt.firstCoords.y,r=e.clientX,a=e.clientY,s={el:mt,hasMoved:!0,deltaX:t,deltaY:n,offsetX:i,offsetY:o,clientX:r,clientY:a,isDragging:!0};gt.value(s),mt.lastCoords={x:e.clientX,y:e.clientY},mt.hasLast=!0}}var Ot,jt={inserted:function inserted(e,t){document&&(mt=e,gt=t,dt(e,ht,onPointerStart),dt(document.documentElement,bt,onPointerEnd),dt(document.documentElement,ft,onPointerMove),console.log("v-drag registered all mouse handlers"))},unbind:function unbind(e){_t(e,ht,onPointerStart),_t(document.documentElement,bt,onPointerEnd),_t(document.documentElement,ft,onPointerMove),console.log("v-drag disposed all mouse handlers")}},yt=jt,Et=["mousedown","touchstart"],Pt=null,wt=function onPointerEnd(e){var t=e.target;if(Pt){var n=t;do{if(n==Ot)return;n=n?n.parentElement:null}while(n);Pt.value()}},kt={inserted:function inserted(e,t){document&&(Ot=e,Pt=t,dt(document.documentElement,Et,wt),console.log("v-click-outside registered all mouse handlers"))},unbind:function unbind(e){_t(document.documentElement,Et,wt),console.log("v-click-outside disposed all mouse handlers")}},xt=kt;n("a1a3");u.directive("drag",yt),u.directive("click-outside",xt),u.config.productionTip=!1,u.config.errorHandler=function(e,t,n){t.$store.commit(M.ADD_ERROR,e)},u.component("split-pane",Je.a),new u({store:pt,render:function render(e){return e(Be)},renderError:function renderError(e,t){return e("pre",{style:{color:"red"}},t.stack)}}).$mount("#app")},cf94:function(e,t,n){},d203:function(e,t,n){"use strict";n("cf94")},d8a1:function(e,t,n){},dfc1:function(e,t){e.exports="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiBzdHlsZT0ibWFyZ2luOiBhdXRvOyBiYWNrZ3JvdW5kOiBub25lOyBkaXNwbGF5OiBibG9jazsgc2hhcGUtcmVuZGVyaW5nOiBhdXRvOyIgd2lkdGg9IjIwMHB4IiBoZWlnaHQ9IjIwMHB4IiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiPgo8Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiBmaWxsPSJub25lIiBzdHJva2U9IiM3OTUyYjMiIHN0cm9rZS13aWR0aD0iMTAiIHI9IjM1IiBzdHJva2UtZGFzaGFycmF5PSIxNjQuOTMzNjE0MzEzNDY0MTUgNTYuOTc3ODcxNDM3ODIxMzgiPgogIDxhbmltYXRlVHJhbnNmb3JtIGF0dHJpYnV0ZU5hbWU9InRyYW5zZm9ybSIgdHlwZT0icm90YXRlIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSIgZHVyPSIwLjgyNjQ0NjI4MDk5MTczNTZzIiB2YWx1ZXM9IjAgNTAgNTA7MzYwIDUwIDUwIiBrZXlUaW1lcz0iMDsxIj48L2FuaW1hdGVUcmFuc2Zvcm0+CjwvY2lyY2xlPgo8IS0tIFtsZGlvXSBnZW5lcmF0ZWQgYnkgaHR0cHM6Ly9sb2FkaW5nLmlvLyAtLT48L3N2Zz4="},e23a:function(e,t,n){"use strict";n("908a")},e681:function(e,t,n){"use strict";n("d8a1")},f333:function(e,t,n){"use strict";n("3821")}});
//# sourceMappingURL=app.93454735.js.map