(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(4),o=n.n(c),i=n(1),s=n(2),l={default:{source:"video.mp4",description:""},begin:{start_time:"00:00:00.00",end_time:"00:00:00.00",next:"part 1"},"part 1":{start_time:"00:00:00.00",end_time:"00:04:18.44",options:["let sam quite","let sam talk"]},"let sam quite":{start_time:"00:04:45.42",end_time:"00:06:11.41",next:"part 2"},"let sam talk":{start_time:"00:06:27.10",end_time:"00:06:41.36",next:"part 2"},"part 2":{start_time:"00:06:41.36",end_time:"00:09:20.54",options:["put left cloth into sam's mouth","put right cloth into sam's mouth"]},"put left cloth into sam's mouth":{start_time:"00:09:41.06",end_time:"00:14:01.58",next:"part 3"},"put right cloth into sam's mouth":{start_time:"00:14:23.54",end_time:"00:14:41.46",next:"part 3"},"part 3":{start_time:"00:14:41.46",end_time:"00:15:40.41",options:["help ashley","help jake","help corey","help sam"]},"help ashley":{start_time:"00:16:09.53",end_time:"00:21:56.17",next:"ending"},"help jake":{start_time:"00:22:20.00",end_time:"00:31:54.47",next:"ending"},"help corey":{start_time:"00:32:04.31",end_time:"00:36:32.07",next:"ending"},"help sam":{start_time:"00:36:35.59",end_time:"00:41:02.05",next:"ending"},ending:{start_time:"00:41:02.05",end_time:null}},u=function(e){try{var t=e.split(":").map(parseFloat);return 24*t[0]+60*t[1]+t[2]}catch(n){return null}},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"begin",t=l[e];return Object(s.a)({name:e},t,{start_time:u(t.start_time),end_time:u(t.end_time)})},d=function(e){console.group(e.name),console.log("start_time:",e.start_time),console.log("end_time:",e.end_time),console.log("next:",e.next),console.log("options:",e.options),console.groupEnd()},p=function(e){return d(e),{currentSource:e,nextSource:e.next?m(e.next):{}}},E=Object(a.createContext)({}),f=Object(s.a)({stage:0,allowControls:!0,showDecisionBox:!1,selectedOption:0},p(m()));d(f.currentSource);var v=function(e,t){var n=Object(i.a)(t,2),a=n[0],r=n[1];switch(console.log(a),a){case"DECISION_PREPARE":return Object(s.a)({},e,{stage:1,allowControls:!1});case"DECISION_START":return Object(s.a)({},e,{stage:2,showDecisionBox:!0});case"DECISION_SELECTED":return Object(s.a)({},e,{stage:3,selectedOption:r});case"DECISION_PREPARE_END":var c=e.selectedOption,o=e.currentSource.options[c];return Object(s.a)({},e,{stage:4,nextSource:m(o)});case"NEXT_PLOT":return Object(s.a)({},e,{stage:0,selectedOption:0,allowControls:!0,showDecisionBox:!1},p(e.nextSource));case"VIDEO_END":return f;default:throw new Error("Unknown Action Type: ".concat(a))}},_=function(e){var t=e.children,n=Object(a.useReducer)(v,f),c=Object(i.a)(n,2),o=c[0],s=c[1];return r.a.createElement(E.Provider,{value:[o,s]},t)},h=function(e){var t=e.visible,n=void 0===t?1:t,a=e.selectable,c=void 0===a?1:a,o=["option"];return n&&o.push("visible"),c&&o.push("selectable"),r.a.createElement("div",Object.assign({className:o.join(" ")},e),r.a.createElement("div",null,e.children),r.a.createElement("div",{className:"underline effect"}))},g=function(e){var t=e.color,n=void 0===t?"white":t,a=r.a.useState(0),c=Object(i.a)(a,2),o=c[0],s=c[1];r.a.useEffect(function(){var e=0,t=setInterval(function(){s((e+=50)/1e4)},50);return function(){clearInterval(t)}},[]);var l={backgroundColor:n,width:100*o+"%"};return r.a.createElement("div",{className:"loading-bar"},r.a.createElement("div",{style:l}))},O=function(){var e=r.a.useContext(E),t=Object(i.a)(e,2),n=t[0],a=t[1],c=n.stage,o=n.selectedOption,s=n.currentSource,l=n.nextSource,u="https://github.com/zlargon/res/releases/download/hunter/all-1080p.mp4",m=r.a.createRef(),d=r.a.createRef(),p=r.a.useState(!1),f=Object(i.a)(p,2),v=f[0],_=f[1],O=r.a.useState(document.fullscreen),b=Object(i.a)(O,2),w=b[0],N=b[1],x=r.a.useState("00.00"),S=Object(i.a)(x,2),T=S[0],j=S[1];r.a.useEffect(function(){document.addEventListener("fullscreenchange",function(e){N(document.fullscreen)})},[]);var C=function(e){m.current.currentTime+=e},D=["controls"];n.allowControls&&D.push("allow"),v||D.push("show");var I=["decision-box"];n.showDecisionBox&&I.push("show");return r.a.createElement("div",{className:"container"},r.a.createElement("div",{ref:d,className:"app-video-section"},r.a.createElement("video",{ref:m,src:u,onTimeUpdate:function(e){var t=e.target;if(j(t.currentTime.toFixed(2)),null!==s.end_time){if(s.next){if(t.currentTime<s.end_time)return;return Math.abs(t.currentTime-l.start_time)>2&&(t.currentTime=l.start_time),a(["NEXT_PLOT"])}var n=s.end_time-15;return 0===c&&t.currentTime>=n?a(["DECISION_PREPARE"]):1===c&&t.currentTime>=n+3?a(["DECISION_START"]):(2===c||3===c)&&t.currentTime>=n+13?a(["DECISION_PREPARE_END"]):4===c&&t.currentTime>=n+15?(Math.abs(t.currentTime-l.start_time)>2&&(t.currentTime=l.start_time),a(["NEXT_PLOT"])):void 0}},onPlay:function(){return _(!0)},onPause:function(){return _(!1)},onEnded:function(){return a(["VIDEO_END"])}}),r.a.createElement("div",{className:"top-bar"},r.a.createElement("div",null,T),r.a.createElement("div",null,function(e){var t=new Date(1e3*e),n=("00"+t.getSeconds()).slice(-2),a=("00"+t.getMinutes()).slice(-2);return"".concat(a,":").concat(n)}(T)),r.a.createElement("div",null,s.name)),r.a.createElement("div",{className:"control-section"},r.a.createElement("div",{className:D.join(" ")},r.a.createElement("div",null,r.a.createElement("div",{onClick:function(){var e=m.current;e.paused?e.play():e.pause()}},v?r.a.createElement("i",{className:"fas fa-pause"}):r.a.createElement("i",{className:"fas fa-play"})),r.a.createElement("div",{onClick:function(){return C(-10)}},r.a.createElement("i",{className:"fas fa-undo-alt"})),r.a.createElement("div",{onClick:function(){return C(10)}},r.a.createElement("i",{className:"fas fa-redo-alt"}))),r.a.createElement("div",null,u.split("/").pop()),r.a.createElement("div",null,r.a.createElement("div",{onClick:function(){document.fullscreen?document.exitFullscreen():d.current.requestFullscreen()}},w?r.a.createElement("i",{className:"fas fa-compress"}):r.a.createElement("i",{className:"fas fa-expand"}))))),r.a.createElement("div",{className:I.join(" ")},(2===c||3===c)&&r.a.createElement(g,{color:3===c?"grey":"white"}),s.options&&s.options.map(function(e,t){var n=2===c||c>=3&&t===o?1:0,i=3===c||4===c?0:1;return r.a.createElement(h,{key:t,visible:n,selectable:i,onClick:function(){return a(["DECISION_SELECTED",t])}},e)}))))};n(11),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(_,null,r.a.createElement(O,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},5:function(e,t,n){e.exports=n(12)}},[[5,1,2]]]);
//# sourceMappingURL=main.11b9d071.chunk.js.map