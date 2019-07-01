(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(5),o=n.n(c),i=n(1),l=n(2),s=n(3),u=function(e){try{var t=e.split(":").map(parseFloat);return 24*t[0]+60*t[1]+t[2]}catch(n){return null}},m=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"begin",t=Object(l.a)({name:e},s.default,s[e]);return t.start_time=u(t.start_time),t.end_time=u(t.end_time),t.select_time=t.next.length>1?t.select_time:0,t},d=function(e){return function(e){console.group("\ud83c\udfac",e.name),console.log("start_time:",e.start_time),console.log("end_time:",e.end_time),console.log("select_time:",e.select_time),console.log("prepare_time:",e.end_time-e.select_time),console.log("next:",e.next),console.groupEnd()}(e),{currentSource:e,nextSource:e.next.length>0?m(e.next[0]):null}},_=Object(a.createContext)({}),E=Object(l.a)({stage:0,allowControls:!0,showDecisionBox:!1,selectedOption:0},d(m())),f=function(e,t){var n=Object(i.a)(t,2),a=n[0],r=n[1];switch(console.log("%c \ud83d\ude80 ".concat(a," "),"background: black; color: yellow; font-weight : bold"),a){case"DECISION_PREPARE":return Object(l.a)({},e,{stage:1,allowControls:!1});case"DECISION_START":return Object(l.a)({},e,{stage:2,showDecisionBox:!0});case"DECISION_SELECTED":return Object(l.a)({},e,{stage:3,selectedOption:r});case"DECISION_PREPARE_END":var c=e.selectedOption,o=e.currentSource.next[c];return Object(l.a)({},e,{stage:4,nextSource:m(o)});case"NEXT_PLOT":return Object(l.a)({},e,{stage:0,selectedOption:0,allowControls:!0,showDecisionBox:!1},d(e.nextSource));case"VIDEO_END":return E;default:throw new Error("Unknown Action Type: ".concat(a))}},v=function(e){var t=e.children,n=Object(a.useReducer)(f,E),c=Object(i.a)(n,2),o=c[0],l=c[1];return r.a.createElement(_.Provider,{value:[o,l]},t)},p=function(e){var t=e.visible,n=void 0===t?1:t,a=e.selectable,c=void 0===a?1:a,o=["option"];return n&&o.push("visible"),c&&o.push("selectable"),r.a.createElement("div",Object.assign({className:o.join(" ")},e),r.a.createElement("div",null,e.children),r.a.createElement("div",{className:"underline effect"}))},h=function(e){var t=e.duration,n=void 0===t?10:t,a=e.color,c=void 0===a?"white":a,o=r.a.useState(0),l=Object(i.a)(o,2),s=l[0],u=l[1];r.a.useEffect(function(){var e=0,t=setInterval(function(){u((e+=20)/(1e3*n))},20);return function(){clearInterval(t)}},[n]);var m={backgroundColor:c,width:100*s+"%"};return r.a.createElement("div",{className:"loading-bar"},r.a.createElement("div",{style:m}))},g=function(){var e=r.a.useContext(_),t=Object(i.a)(e,2),n=t[0],a=t[1],c=n.stage,o=n.selectedOption,l=n.currentSource,s=n.nextSource,u=r.a.useRef(null),m=r.a.useRef(null),d=r.a.useState(!1),E=Object(i.a)(d,2),f=E[0],v=E[1],g=r.a.useState(document.fullscreen),b=Object(i.a)(g,2),w=b[0],O=b[1],x=r.a.useState("0.00"),T=Object(i.a)(x,2),N=(T[0],T[1]);r.a.useEffect(function(){var e=function(){O(document.fullscreen)};return document.addEventListener("fullscreenchange",e),function(){document.removeEventListener("fullscreenchange",e)}},[]);var C=function(){var e=u.current;e.paused?e.play():e.pause()},S=r.a.useCallback(function(e){var t=u.current,n=l.start_time,a=l.end_time-l.select_time;e>0&&t.currentTime+e>a?t.currentTime=a:e<0&&t.currentTime+e<n?t.currentTime=n:t.currentTime+=e},[l]);r.a.useEffect(function(){var e=function(e){var t=e.keyCode;0===c&&(32===t&&C(),37===t&&S(-10),39===t&&S(10))};return document.addEventListener("keydown",e),function(){document.removeEventListener("keydown",e)}},[c,S]);var j=["controls"];n.allowControls&&j.push("allow"),f||j.push("show");var k=["decision-box"];n.showDecisionBox&&k.push("show");return r.a.createElement("div",{className:"app"},r.a.createElement("main",{ref:m},r.a.createElement("video",{ref:u,src:l.video,autoPlay:!0,onTimeUpdate:function(e){var t=e.target;if(N(t.currentTime.toFixed(2)),0===l.next.length||null===l.end_time)return t.currentTime>=l.end_time?(t.pause(),a(["VIDEO_END"])):void 0;if(1===l.next.length){if(t.currentTime<l.end_time)return;return Math.abs(t.currentTime-s.start_time)>2&&(t.currentTime=s.start_time),a(["NEXT_PLOT"])}var n=l.end_time,r=l.select_time,o=n-r;return 0===c&&t.currentTime>=o?(t.play(),a(["DECISION_PREPARE"])):1===c&&t.currentTime>=o+1*r/7?a(["DECISION_START"]):(2===c||3===c)&&t.currentTime>=o+6*r/7?a(["DECISION_PREPARE_END"]):4===c&&t.currentTime>=n?(Math.abs(t.currentTime-s.start_time)>2&&(t.currentTime=s.start_time),a(["NEXT_PLOT"])):void 0},onPlay:function(){return v(!0)},onPause:function(){return v(!1)},onError:function(e){console.log("onerror"),console.log(e)},onEnded:function(){return a(["VIDEO_END"])}}),!1,r.a.createElement("div",{className:"control-section"},r.a.createElement("div",{className:j.join(" ")},r.a.createElement("div",null,r.a.createElement("div",{onClick:C},f?r.a.createElement("i",{className:"fas fa-pause"}):r.a.createElement("i",{className:"fas fa-play"})),r.a.createElement("div",{onClick:function(){return S(-10)}},r.a.createElement("i",{className:"fas fa-undo-alt"})),r.a.createElement("div",{onClick:function(){return S(10)}},r.a.createElement("i",{className:"fas fa-redo-alt"}))),r.a.createElement("pre",null,!1),r.a.createElement("div",null,r.a.createElement("div",{onClick:function(){document.fullscreen?document.exitFullscreen():m.current.requestFullscreen()}},w?r.a.createElement("i",{className:"fas fa-compress"}):r.a.createElement("i",{className:"fas fa-expand"}))))),r.a.createElement("div",{className:k.join(" ")},(2===c||3===c)&&r.a.createElement(h,{duration:5*l.select_time/7,color:3===c?"grey":"white"}),l.next.length>1&&l.next.map(function(e,t){var n=2===c||c>=3&&t===o?1:0,i=3===c||4===c?0:1;return r.a.createElement(p,{key:t,visible:n,selectable:i,onClick:function(){return a(["DECISION_SELECTED",t])}},e)}))))};n(12),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(v,null,r.a.createElement(g,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},3:function(e){e.exports={default:{video:"https://github.com/zlargon/res/releases/download/hunter/hunter_final_no_subtitles.mp4",start_time:null,end_time:null,select_time:15,next:[]},begin:{start_time:"00:00:00.00",end_time:"00:00:00.00",next:["part 1"]},"part 1":{start_time:"00:00:00.00",end_time:"00:04:41.32",select_time:9,next:["let sam quite","let sam talk"]},"let sam quite":{start_time:"00:05:05.12",end_time:"00:06:39.24",next:["part 2"]},"let sam talk":{start_time:"00:06:50.20",end_time:"00:07:06.22",next:["part 2"]},"part 2":{start_time:"00:07:06.23",end_time:"00:09:40.23",select_time:17,next:["put towel into sam's mouth","put cloth into sam's mouth"]},"put towel into sam's mouth":{start_time:"00:09:57.39",end_time:"00:13:55.29",next:["part 3"]},"put cloth into sam's mouth":{start_time:"00:14:25.51",end_time:"00:14:43.42",next:["part 3"]},"part 3":{start_time:"00:14:43.43",end_time:"00:15:39.20",select_time:15,next:["help ashley","help jake","help corey","help sam"]},"help ashley":{start_time:"00:15:52.45",end_time:"00:21:05.17"},"help jake":{start_time:"00:21:09.04",end_time:"00:31:19.25"},"help corey":{start_time:"00:31:20.09",end_time:"00:36:56.00"},"help sam":{start_time:"00:37:01.15",end_time:"00:41:16.48"}}},6:function(e,t,n){e.exports=n(13)}},[[6,1,2]]]);
//# sourceMappingURL=main.20b2eaa6.chunk.js.map