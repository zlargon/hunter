(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(5),o=n.n(c),i=n(1),l=n(2),s=n(3),u=function(e){try{var t=e.split(":").map(parseFloat);return 24*t[0]+60*t[1]+t[2]}catch(n){return null}},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"begin",t=s[e];return Object(l.a)({},s.default,{name:e},t,{start_time:u(t.start_time),end_time:u(t.end_time),select_time:t.next?0:t.select_time})},d=function(e){return function(e){console.group("\ud83c\udfac",e.name),console.log("start_time:",e.start_time),console.log("end_time:",e.end_time),console.log("select_time:",e.select_time),console.log("prepare_time:",e.end_time-e.select_time),console.log("next:",e.next),console.log("options:",e.options),console.groupEnd()}(e),{currentSource:e,nextSource:e.next?m(e.next):{}}},E=Object(a.createContext)({}),_=Object(l.a)({stage:0,allowControls:!0,showDecisionBox:!1,selectedOption:0},d(m())),f=function(e,t){var n=Object(i.a)(t,2),a=n[0],r=n[1];switch(console.log("%c \ud83d\ude80 ".concat(a," "),"background: black; color: yellow; font-weight : bold"),a){case"DECISION_PREPARE":return Object(l.a)({},e,{stage:1,allowControls:!1});case"DECISION_START":return Object(l.a)({},e,{stage:2,showDecisionBox:!0});case"DECISION_SELECTED":return Object(l.a)({},e,{stage:3,selectedOption:r});case"DECISION_PREPARE_END":var c=e.selectedOption,o=e.currentSource.options[c];return Object(l.a)({},e,{stage:4,nextSource:m(o)});case"NEXT_PLOT":return Object(l.a)({},e,{stage:0,selectedOption:0,allowControls:!0,showDecisionBox:!1},d(e.nextSource));case"VIDEO_END":return _;default:throw new Error("Unknown Action Type: ".concat(a))}},p=function(e){var t=e.children,n=Object(a.useReducer)(f,_),c=Object(i.a)(n,2),o=c[0],l=c[1];return r.a.createElement(E.Provider,{value:[o,l]},t)},v=function(e){var t=e.visible,n=void 0===t?1:t,a=e.selectable,c=void 0===a?1:a,o=["option"];return n&&o.push("visible"),c&&o.push("selectable"),r.a.createElement("div",Object.assign({className:o.join(" ")},e),r.a.createElement("div",null,e.children),r.a.createElement("div",{className:"underline effect"}))},h=function(e){var t=e.duration,n=void 0===t?10:t,a=e.color,c=void 0===a?"white":a,o=r.a.useState(0),l=Object(i.a)(o,2),s=l[0],u=l[1];r.a.useEffect(function(){var e=0,t=setInterval(function(){u((e+=20)/(1e3*n))},20);return function(){clearInterval(t)}},[n]);var m={backgroundColor:c,width:100*s+"%"};return r.a.createElement("div",{className:"loading-bar"},r.a.createElement("div",{style:m}))},g=function(){var e=r.a.useContext(E),t=Object(i.a)(e,2),n=t[0],a=t[1],c=n.stage,o=n.selectedOption,l=n.currentSource,s=n.nextSource,u=r.a.useRef(null),m=r.a.useRef(null),d=r.a.useState(!1),_=Object(i.a)(d,2),f=_[0],p=_[1],g=r.a.useState(document.fullscreen),b=Object(i.a)(g,2),w=b[0],O=b[1],x=r.a.useState("0.00"),N=Object(i.a)(x,2),T=N[0],C=N[1];r.a.useEffect(function(){var e=function(){O(document.fullscreen)};return document.addEventListener("fullscreenchange",e),function(){document.removeEventListener("fullscreenchange",e)}},[]);var S=function(){var e=u.current;e.paused?e.play():e.pause()},j=r.a.useCallback(function(e){var t=u.current,n=l.start_time,a=l.end_time-l.select_time;e>0&&t.currentTime+e>a?t.currentTime=a:e<0&&t.currentTime+e<n?t.currentTime=n:t.currentTime+=e},[l]);r.a.useEffect(function(){var e=function(e){var t=e.keyCode;0===n.stage&&(32===t&&S(),37===t&&j(-10),39===t&&j(10))};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}},[n.stage,j]);var k=["controls"];n.allowControls&&k.push("allow"),f||k.push("show");var D=["decision-box"];n.showDecisionBox&&D.push("show");return r.a.createElement("div",{className:"app"},r.a.createElement("main",{ref:m},r.a.createElement("video",{ref:u,src:l.video,onTimeUpdate:function(e){var t=e.target;if(C(t.currentTime.toFixed(2)),null!==l.end_time){if(l.next){if(t.currentTime<l.end_time)return;return Math.abs(t.currentTime-s.start_time)>2&&(t.currentTime=s.start_time),a(["NEXT_PLOT"])}var n=l.end_time,r=l.select_time,o=n-r;return 0===c&&t.currentTime>=o?a(["DECISION_PREPARE"]):1===c&&t.currentTime>=o+1*r/7?a(["DECISION_START"]):(2===c||3===c)&&t.currentTime>=o+6*r/7?a(["DECISION_PREPARE_END"]):4===c&&t.currentTime>=n?(Math.abs(t.currentTime-s.start_time)>2&&(t.currentTime=s.start_time),a(["NEXT_PLOT"])):void 0}},onPlay:function(){return p(!0)},onPause:function(){return p(!1)},onEnded:function(){return a(["VIDEO_END"])}}),r.a.createElement("div",{className:"debug-bar"},r.a.createElement("div",null,T),r.a.createElement("div",null,function(e){var t=new Date(1e3*e),n=("00"+t.getSeconds()).slice(-2),a=("00"+t.getMinutes()).slice(-2);return"".concat(a,":").concat(n)}(T)),r.a.createElement("div",null,l.name)),r.a.createElement("div",{className:"control-section"},r.a.createElement("div",{className:k.join(" ")},r.a.createElement("div",null,r.a.createElement("div",{onClick:S},f?r.a.createElement("i",{className:"fas fa-pause"}):r.a.createElement("i",{className:"fas fa-play"})),r.a.createElement("div",{onClick:function(){return j(-10)}},r.a.createElement("i",{className:"fas fa-undo-alt"})),r.a.createElement("div",{onClick:function(){return j(10)}},r.a.createElement("i",{className:"fas fa-redo-alt"}))),r.a.createElement("pre",null,l.video.split("/").pop()),r.a.createElement("div",null,r.a.createElement("div",{onClick:function(){document.fullscreen?document.exitFullscreen():m.current.requestFullscreen()}},w?r.a.createElement("i",{className:"fas fa-compress"}):r.a.createElement("i",{className:"fas fa-expand"}))))),r.a.createElement("div",{className:D.join(" ")},(2===c||3===c)&&r.a.createElement(h,{duration:5*l.select_time/7,color:3===c?"grey":"white"}),l.options&&l.options.map(function(e,t){var n=2===c||c>=3&&t===o?1:0,i=3===c||4===c?0:1;return r.a.createElement(v,{key:t,visible:n,selectable:i,onClick:function(){return a(["DECISION_SELECTED",t])}},e)}))))};n(12),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(p,null,r.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},3:function(e){e.exports={default:{video:"https://github.com/zlargon/res/releases/download/hunter/hunter_0623.mp4",select_time:15},begin:{start_time:"00:00:00.00",end_time:"00:00:00.00",next:"part 1"},"part 1":{start_time:"00:00:00.00",end_time:"00:04:31.55",select_time:10,options:["let sam quite","let sam talk"]},"let sam quite":{start_time:"00:04:55.56",end_time:"00:06:30.10",next:"part 2"},"let sam talk":{start_time:"00:06:40.43",end_time:"00:06:56.41",next:"part 2"},"part 2":{start_time:"00:06:56.42",end_time:"00:09:30.37",select_time:13,options:["put towel into sam's mouth","put cloth into sam's mouth"]},"put towel into sam's mouth":{start_time:"00:09:47.53",end_time:"00:13:55.21",next:"part 3"},"put cloth into sam's mouth":{start_time:"00:14:16.40",end_time:"00:14:34.31",next:"part 3"},"part 3":{start_time:"00:14:34.32",end_time:"00:15:38.25",select_time:16,options:["help ashley","help jake","help corey","help sam"]},"help ashley":{start_time:"00:15:56.28",end_time:"00:22:39.14",next:"ending"},"help jake":{start_time:"00:22:49.42",end_time:"00:32:42.20",next:"ending"},"help corey":{start_time:"00:32:46.36",end_time:"00:38:08.17",next:"ending"},"help sam":{start_time:"00:38:41.33",end_time:"00:44:12.10",next:"ending"},ending:{start_time:"00:44:12.10",end_time:null}}},6:function(e,t,n){e.exports=n(13)}},[[6,1,2]]]);
//# sourceMappingURL=main.02fa090d.chunk.js.map