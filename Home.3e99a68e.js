!function(e,r,t,o,n){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof s[o]&&s[o],c=i.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(r,t){if(!c[r]){if(!e[r]){var n="function"==typeof s[o]&&s[o];if(!t&&n)return n(r,!0);if(i)return i(r,!0);if(a&&"string"==typeof r)return a(r);var u=Error("Cannot find module '"+r+"'");throw u.code="MODULE_NOT_FOUND",u}f.resolve=function(t){var o=e[r][1][t];return null!=o?o:t},f.cache={};var d=c[r]=new l.Module(r);e[r][0].call(d.exports,f,d,d.exports,this)}return c[r].exports;function f(e){var r=f.resolve(e);return!1===r?{}:l(r)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=c,l.parent=i,l.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},Object.defineProperty(l,"root",{get:function(){return s[o]}}),s[o]=l;for(var u=0;u<r.length;u++)l(r[u])}({"5QvtN":[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(t);var n=e("react/jsx-runtime"),s=e("react");o.interopDefault(s);var i=e("src/assets/porticoVertical.webm"),c=o.interopDefault(i),a=e("src/assets/porticoVertical.mp4"),l=o.interopDefault(a),u=e("src/assets/porticoHorizontal.webm"),d=o.interopDefault(u),f=e("src/assets/porticoHorizontal.mp4"),p=o.interopDefault(f),m=e("src/utils/useWindowSize"),h=e("react-router-dom");e("./styles.scss"),t.default=()=>{let e=(0,h.useNavigate)(),{height:r,width:t}=(0,m.useWindowSize)(),o=t>r;return(0,s.useEffect)(()=>{let r=setTimeout(()=>{e("/store")},5e3);return()=>{clearTimeout(r)}},[]),(0,n.jsx)("div",{className:"home",children:(0,n.jsx)("div",{className:"video-background",children:(0,n.jsx)("div",{className:"video-background-container",children:(0,n.jsxs)("video",{autoPlay:!0,muted:!0,playsInline:!0,onEnded:()=>{e("/store")},children:[(0,n.jsx)("source",{src:o?d.default:c.default,type:"video/webm"}),(0,n.jsx)("source",{src:o?p.default:l.default,type:"video/mp4"}),"Loading..."]},o?"HH":"VV")})})})}},{"react/jsx-runtime":"gaGEj",react:"6uln9","src/assets/porticoVertical.webm":"5rr24","src/assets/porticoVertical.mp4":"duMNr","src/assets/porticoHorizontal.webm":"6zyFm","src/assets/porticoHorizontal.mp4":"eDJ1F","src/utils/useWindowSize":"1VIKF","react-router-dom":"l6ORY","./styles.scss":"7PK0N","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"5rr24":[function(e,r,t){r.exports=e("14699173df3becff").getBundleURL("kdAlD")+"porticoVertical.1d6aec70.webm"},{"14699173df3becff":"c7Tr5"}],duMNr:[function(e,r,t){r.exports=e("c12ba6326d234c54").getBundleURL("kdAlD")+"porticoVertical.71510129.mp4"},{c12ba6326d234c54:"c7Tr5"}],"6zyFm":[function(e,r,t){r.exports=e("5b2f146824348310").getBundleURL("kdAlD")+"porticoHorizontal.d734ef96.webm"},{"5b2f146824348310":"c7Tr5"}],eDJ1F:[function(e,r,t){r.exports=e("114a97cfc46c0923").getBundleURL("kdAlD")+"porticoHorizontal.259cf579.mp4"},{"114a97cfc46c0923":"c7Tr5"}],"1VIKF":[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(t),o.export(t,"useWindowSize",()=>s);var n=e("react");function s(){let[e,r]=(0,n.useState)({width:screen.width||0,height:screen.height||0});return(0,n.useEffect)(()=>{let e=()=>{r({width:window.innerWidth,height:window.innerHeight})};return window.addEventListener("resize",e),e(),()=>window.removeEventListener("resize",e)},[]),e}},{react:"6uln9","@parcel/transformer-js/src/esmodule-helpers.js":"k3151"}],"7PK0N":[function(){},{}]},[],0,"parcelRequireddb1");
//# sourceMappingURL=Home.3e99a68e.js.map