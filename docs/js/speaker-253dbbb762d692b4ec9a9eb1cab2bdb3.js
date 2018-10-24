"use strict";if(void 0===self)var self=this;if(void 0===global)var global=self;var $req,$m=self.$m=self.$m||{};if(void 0===process)var process={browser:!0,env:{NODE_ENV:"production"}};self.require=self.require||function(e){if($m[e])return"function"==typeof $m[e]&&$m[e](),$m[e].exports},function(e){var t=e.babelHelpers;t||(t=e.babelHelpers={}),t.interopRequireDefault=function(e){return e&&e.__esModule?e:{default:e}}}(void 0===global?self:global),function(){$m["uuid/lib/bytesToUuid"]={exports:{}};for(var e=[],t=0;t<256;++t)e[t]=(t+256).toString(16).substr(1);$m["uuid/lib/bytesToUuid"].exports=function(t,o){var r=o||0,n=e;return[n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],"-",n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]],n[t[r++]]].join("")},$m["uuid/lib/rng-browser"]={exports:{}};var o="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(o){var r=new Uint8Array(16);$m["uuid/lib/rng-browser"].exports=function(){return o(r),r}}else{var n=new Array(16);$m["uuid/lib/rng-browser"].exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255;return n}}$m["src/js/menu_button"]={exports:{}},$m["src/js/menu_button"].exports.__esModule=!0,$m["src/js/menu_button"].exports.default=function(){var e=document.getElementById("menuToggler"),t=document.getElementsByClassName("c-navigation")[0],o=function(o){e.classList.toggle("show--menu"),t.classList.toggle("show--menu")};e.onclick=o;for(var r=t.getElementsByTagName("a"),n=Array.isArray(r),s=0,r=n?r:r[Symbol.iterator]();;){var i;if(n){if(s>=r.length)break;i=r[s++]}else{if((s=r.next()).done)break;i=s.value}i.onclick=o}},$m["src/js/logo"]={exports:{}},$m["src/js/logo"].exports.__esModule=!0,$m["src/js/logo"].exports.default=function(){var e=!1;window.addEventListener("scroll",function(t){e||(window.requestAnimationFrame(function(){!function(e){var t=i.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&t.right<=(window.innerWidth||document.documentElement.clientWidth)}()?s.classList.add("c-header__logo--in-menu"):s.classList.remove("c-header__logo--in-menu"),e=!1}),e=!0)})};var s=document.getElementById("tdclogo"),i=document.getElementById("name");$m["uuid/v4"]={exports:{}};var a=$m["uuid/lib/rng-browser"].exports,l=$m["uuid/lib/bytesToUuid"].exports;$m["uuid/v4"].exports=function(e,t,o){var r=t&&o||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var n=(e=e||{}).random||(e.rng||a)();if(n[6]=15&n[6]|64,n[8]=63&n[8]|128,t)for(var s=0;s<16;++s)t[r+s]=n[s];return t||l(n)},$m["uuid/v1"]={exports:{}};var u,c,d=$m["uuid/lib/rng-browser"].exports,m=$m["uuid/lib/bytesToUuid"].exports,g=0,f=0;$m["uuid/v1"].exports=function(e,t,o){var r=t&&o||0,n=t||[],s=(e=e||{}).node||u,i=void 0!==e.clockseq?e.clockseq:c;if(null==s||null==i){var a=d();null==s&&(s=u=[1|a[0],a[1],a[2],a[3],a[4],a[5]]),null==i&&(i=c=16383&(a[6]<<8|a[7]))}var l=void 0!==e.msecs?e.msecs:(new Date).getTime(),p=void 0!==e.nsecs?e.nsecs:f+1,v=l-g+(p-f)/1e4;if(v<0&&void 0===e.clockseq&&(i=i+1&16383),(v<0||l>g)&&void 0===e.nsecs&&(p=0),p>=1e4)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=l,f=p,c=i;var b=(1e4*(268435455&(l+=122192928e5))+p)%4294967296;n[r++]=b>>>24&255,n[r++]=b>>>16&255,n[r++]=b>>>8&255,n[r++]=255&b;var $=l/4294967296*1e4&268435455;n[r++]=$>>>8&255,n[r++]=255&$,n[r++]=$>>>24&15|16,n[r++]=$>>>16&255,n[r++]=i>>>8|128,n[r++]=255&i;for(var x=0;x<6;++x)n[r+x]=s[x];return t||m(n)},$m.uuid={exports:{}};var p=$m["uuid/v1"].exports,v=$m["uuid/v4"].exports,b=v;b.v1=p,b.v4=v,$m.uuid.exports=b,$m["src/js/ga"]={exports:{}},$m["src/js/ga"].exports.__esModule=!0,$m["src/js/ga"].exports.default=function(){try{var e=location.hash;if(e.length>2&&-1!==e.indexOf("clientid=")){var t=e.substring(e.indexOf("clientid=")+"clientid=".length,e.indexOf("&favs"));console.log("Got clientid "+t+" from hash"),localStorage.setItem("tdc-client-uuid",t)}if(function(e,t,o,r,n,s){e.GoogleAnalyticsObject=r,e.ga||(e.ga=function(){(e.ga.q=e.ga.q||[]).push(arguments)}),e.ga.l=+new Date,n=t.createElement(o),s=t.getElementsByTagName(o)[0],n.src="//www.google-analytics.com/analytics.js",s.parentNode.insertBefore(n,s)}(window,document,"script","ga"),ga(function(e){var t=e.get("clientId");console.log("Got GA id "+t),localStorage.setItem("tdc-client-uuid",t)}),ga("set","anonymizeIp",!0),localStorage){var o=localStorage.getItem("tdc-client-uuid");o||(o=x.default.v4(),console.log("Creating client id "+o),localStorage.setItem("tdc-client-uuid",o)),ga("create","UA-98174789-3",{storage:"none",storeGac:!1,clientId:o})}else ga("create","UA-98174789-1","auto");ga("send","pageview")}catch(e){console.error(e)}};var $=$m.uuid.exports,x=babelHelpers.interopRequireDefault($);$m["src/js/speaker"]={exports:{}};var y=$m["src/js/logo"].exports,w=babelHelpers.interopRequireDefault(y),h=$m["src/js/menu_button"].exports,_=babelHelpers.interopRequireDefault(h),j=$m["src/js/ga"].exports;babelHelpers.interopRequireDefault(j);(0,w.default)(),(0,_.default)()}();//# sourceMappingURL=speaker-253dbbb762d692b4ec9a9eb1cab2bdb3.js.map