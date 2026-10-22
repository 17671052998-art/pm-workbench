(()=>{var CI=Object.create;var Ba=Object.defineProperty;var OI=Object.getOwnPropertyDescriptor;var RI=Object.getOwnPropertyNames;var DI=Object.getPrototypeOf,MI=Object.prototype.hasOwnProperty;var PI=(e,t,n)=>t in e?Ba(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ua=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var ln=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var wI=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of RI(t))!MI.call(e,i)&&i!==n&&Ba(e,i,{get:()=>t[i],enumerable:!(r=OI(t,i))||r.enumerable});return e};var yo=(e,t,n)=>(n=e!=null?CI(DI(e)):{},wI(t||!e||!e.__esModule?Ba(n,"default",{value:e,enumerable:!0}):n,e));var se=(e,t,n)=>PI(e,typeof t!="symbol"?t+"":t,n);var kd=ln((xD,wd)=>{"use strict";var So={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},QI=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function eT(e){return e===10||e===13||e===8232||e===8233||e===32||e===9||e===11||e===12||e===160||e>=5760&&QI.indexOf(e)>=0}function tT(e){switch(e|32){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}function nT(e){return(e|32)===97}function rr(e){return e>=48&&e<=57}function rT(e){return e>=48&&e<=57||e===43||e===45||e===46}function iT(e){this.index=0,this.path=e,this.max=e.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function bo(e){for(;e.index<e.max&&eT(e.path.charCodeAt(e.index));)e.index++}function oT(e){var t=e.path.charCodeAt(e.index);if(t===48){e.param=0,e.index++;return}if(t===49){e.param=1,e.index++;return}e.err="SvgPath: arc flag can be 0 or 1 only (at pos "+e.index+")"}function sT(e){var t=e.index,n=t,r=e.max,i=!1,o=!1,s=!1,a=!1,l;if(n>=r){e.err="SvgPath: missed param (at pos "+n+")";return}if(l=e.path.charCodeAt(n),(l===43||l===45)&&(n++,l=n<r?e.path.charCodeAt(n):0),!rr(l)&&l!==46){e.err="SvgPath: param should start with 0..9 or `.` (at pos "+n+")";return}if(l!==46){if(i=l===48,n++,l=n<r?e.path.charCodeAt(n):0,i&&n<r&&l&&rr(l)){e.err="SvgPath: numbers started with `0` such as `09` are illegal (at pos "+t+")";return}for(;n<r&&rr(e.path.charCodeAt(n));)n++,o=!0;l=n<r?e.path.charCodeAt(n):0}if(l===46){for(a=!0,n++;rr(e.path.charCodeAt(n));)n++,s=!0;l=n<r?e.path.charCodeAt(n):0}if(l===101||l===69){if(a&&!o&&!s){e.err="SvgPath: invalid float exponent (at pos "+n+")";return}if(n++,l=n<r?e.path.charCodeAt(n):0,(l===43||l===45)&&n++,n<r&&rr(e.path.charCodeAt(n)))for(;n<r&&rr(e.path.charCodeAt(n));)n++;else{e.err="SvgPath: invalid float exponent (at pos "+n+")";return}}e.index=n,e.param=parseFloat(e.path.slice(t,n))+0}function tl(e){var t,n;t=e.path[e.segmentStart],n=t.toLowerCase();var r=e.data;if(n==="m"&&r.length>2&&(e.result.push([t,r[0],r[1]]),r=r.slice(2),n="l",t=t==="m"?"l":"L"),n==="r")e.result.push([t].concat(r));else for(;r.length>=So[n]&&(e.result.push([t].concat(r.splice(0,So[n]))),!!So[n]););}function aT(e){var t=e.max,n,r,i,o,s;if(e.segmentStart=e.index,n=e.path.charCodeAt(e.index),r=nT(n),!tT(n)){e.err="SvgPath: bad command "+e.path[e.index]+" (at pos "+e.index+")";return}if(o=So[e.path[e.index].toLowerCase()],e.index++,bo(e),e.data=[],!o){tl(e);return}for(i=!1;;){for(s=o;s>0;s--){if(r&&(s===3||s===4)?oT(e):sT(e),e.err.length){tl(e);return}e.data.push(e.param),bo(e),i=!1,e.index<t&&e.path.charCodeAt(e.index)===44&&(e.index++,bo(e),i=!0)}if(!i&&(e.index>=e.max||!rT(e.path.charCodeAt(e.index))))break}tl(e)}wd.exports=function(t){var n=new iT(t),r=n.max;for(bo(n);n.index<r&&!n.err.length;)aT(n);return n.result.length&&("mM".indexOf(n.result[0][0])<0?(n.err="SvgPath: string should start with `M` or `m`",n.result=[]):n.result[0][0]="M"),{err:n.err,segments:n.result}}});var nl=ln((ND,_d)=>{"use strict";function lT(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]}function Et(){if(!(this instanceof Et))return new Et;this.queue=[],this.cache=null}Et.prototype.matrix=function(e){return e[0]===1&&e[1]===0&&e[2]===0&&e[3]===1&&e[4]===0&&e[5]===0?this:(this.cache=null,this.queue.push(e),this)};Et.prototype.translate=function(e,t){return(e!==0||t!==0)&&(this.cache=null,this.queue.push([1,0,0,1,e,t])),this};Et.prototype.scale=function(e,t){return(e!==1||t!==1)&&(this.cache=null,this.queue.push([e,0,0,t,0,0])),this};Et.prototype.rotate=function(e,t,n){var r,i,o;return e!==0&&(this.translate(t,n),r=e*Math.PI/180,i=Math.cos(r),o=Math.sin(r),this.queue.push([i,o,-o,i,0,0]),this.cache=null,this.translate(-t,-n)),this};Et.prototype.skewX=function(e){return e!==0&&(this.cache=null,this.queue.push([1,0,Math.tan(e*Math.PI/180),1,0,0])),this};Et.prototype.skewY=function(e){return e!==0&&(this.cache=null,this.queue.push([1,Math.tan(e*Math.PI/180),0,1,0,0])),this};Et.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],this.queue.length===1)return this.cache;for(var e=1;e<this.queue.length;e++)this.cache=lT(this.cache,this.queue[e]);return this.cache};Et.prototype.calc=function(e,t,n){var r;return this.queue.length?(this.cache||(this.cache=this.toArray()),r=this.cache,[e*r[0]+t*r[2]+(n?0:r[4]),e*r[1]+t*r[3]+(n?0:r[5])]):[e,t]};_d.exports=Et});var Vd=ln((CD,Ld)=>{"use strict";var uT=nl(),cT={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},fT=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,dT=/[\s,]+/;Ld.exports=function(t){var n=new uT,r,i;return t.split(fT).forEach(function(o){if(o.length){if(typeof cT[o]<"u"){r=o;return}switch(i=o.split(dT).map(function(s){return+s||0}),r){case"matrix":i.length===6&&n.matrix(i);return;case"scale":i.length===1?n.scale(i[0],i[0]):i.length===2&&n.scale(i[0],i[1]);return;case"rotate":i.length===1?n.rotate(i[0],0,0):i.length===3&&n.rotate(i[0],i[1],i[2]);return;case"translate":i.length===1?n.translate(i[0],0):i.length===2&&n.translate(i[0],i[1]);return;case"skewX":i.length===1&&n.skewX(i[0]);return;case"skewY":i.length===1&&n.skewY(i[0]);return}}}),n}});var Bd=ln((OD,Gd)=>{"use strict";var qr=Math.PI*2;function Fd(e,t,n,r){var i=e*r-t*n<0?-1:1,o=e*n+t*r;return o>1&&(o=1),o<-1&&(o=-1),i*Math.acos(o)}function pT(e,t,n,r,i,o,s,a,l,u){var c=u*(e-n)/2+l*(t-r)/2,f=-l*(e-n)/2+u*(t-r)/2,g=s*s,h=a*a,d=c*c,v=f*f,T=g*h-g*v-h*d;T<0&&(T=0),T/=g*v+h*d,T=Math.sqrt(T)*(i===o?-1:1);var E=T*s/a*f,S=T*-a/s*c,C=u*E-l*S+(e+n)/2,A=l*E+u*S+(t+r)/2,_=(c-E)/s,O=(f-S)/a,k=(-c-E)/s,V=(-f-S)/a,F=Fd(1,0,_,O),Q=Fd(_,O,k,V);return o===0&&Q>0&&(Q-=qr),o===1&&Q<0&&(Q+=qr),[C,A,F,Q]}function mT(e,t){var n=1.3333333333333333*Math.tan(t/4),r=Math.cos(e),i=Math.sin(e),o=Math.cos(e+t),s=Math.sin(e+t);return[r,i,r-i*n,i+r*n,o+s*n,s-o*n,o,s]}Gd.exports=function(t,n,r,i,o,s,a,l,u){var c=Math.sin(u*qr/360),f=Math.cos(u*qr/360),g=f*(t-r)/2+c*(n-i)/2,h=-c*(t-r)/2+f*(n-i)/2;if(g===0&&h===0)return[];if(a===0||l===0)return[];a=Math.abs(a),l=Math.abs(l);var d=g*g/(a*a)+h*h/(l*l);d>1&&(a*=Math.sqrt(d),l*=Math.sqrt(d));var v=pT(t,n,r,i,o,s,a,l,c,f),T=[],E=v[2],S=v[3],C=Math.max(Math.ceil(Math.abs(S)/(qr/4)),1);S/=C;for(var A=0;A<C;A++)T.push(mT(E,S)),E+=S;return T.map(function(_){for(var O=0;O<_.length;O+=2){var k=_[O+0],V=_[O+1];k*=a,V*=l;var F=f*k-c*V,Q=c*k+f*V;_[O+0]=F+v[0],_[O+1]=Q+v[1]}return _})}});var Hd=ln((RD,zd)=>{"use strict";var Zr=1e-10,Ud=Math.PI/180;function Jr(e,t,n){if(!(this instanceof Jr))return new Jr(e,t,n);this.rx=e,this.ry=t,this.ax=n}Jr.prototype.transform=function(e){var t=Math.cos(this.ax*Ud),n=Math.sin(this.ax*Ud),r=[this.rx*(e[0]*t+e[2]*n),this.rx*(e[1]*t+e[3]*n),this.ry*(-e[0]*n+e[2]*t),this.ry*(-e[1]*n+e[3]*t)],i=r[0]*r[0]+r[2]*r[2],o=r[1]*r[1]+r[3]*r[3],s=((r[0]-r[3])*(r[0]-r[3])+(r[2]+r[1])*(r[2]+r[1]))*((r[0]+r[3])*(r[0]+r[3])+(r[2]-r[1])*(r[2]-r[1])),a=(i+o)/2;if(s<Zr*a)return this.rx=this.ry=Math.sqrt(a),this.ax=0,this;var l=r[0]*r[1]+r[2]*r[3];s=Math.sqrt(s);var u=a+s/2,c=a-s/2;return this.ax=Math.abs(l)<Zr&&Math.abs(u-o)<Zr?90:Math.atan(Math.abs(l)>Math.abs(u-o)?(u-i)/l:l/(u-o))*180/Math.PI,this.ax>=0?(this.rx=Math.sqrt(u),this.ry=Math.sqrt(c)):(this.ax+=90,this.rx=Math.sqrt(c),this.ry=Math.sqrt(u)),this};Jr.prototype.isDegenerate=function(){return this.rx<Zr*this.ry||this.ry<Zr*this.rx};zd.exports=Jr});var jd=ln((DD,Wd)=>{"use strict";var hT=kd(),gT=Vd(),cn=nl(),yT=Bd(),vT=Hd();function Oe(e){if(!(this instanceof Oe))return new Oe(e);var t=hT(e);this.segments=t.segments,this.err=t.err,this.__stack=[]}Oe.from=function(e){if(typeof e=="string")return new Oe(e);if(e instanceof Oe){var t=new Oe("");return t.err=e.err,t.segments=e.segments.map(function(n){return n.slice()}),t.__stack=e.__stack.map(function(n){return cn().matrix(n.toArray())}),t}throw new Error("SvgPath.from: invalid param type "+e)};Oe.prototype.__matrix=function(e){var t=this,n;e.queue.length&&this.iterate(function(r,i,o,s){var a,l,u,c;switch(r[0]){case"v":a=e.calc(0,r[1],!0),l=a[0]===0?["v",a[1]]:["l",a[0],a[1]];break;case"V":a=e.calc(o,r[1],!1),l=a[0]===e.calc(o,s,!1)[0]?["V",a[1]]:["L",a[0],a[1]];break;case"h":a=e.calc(r[1],0,!0),l=a[1]===0?["h",a[0]]:["l",a[0],a[1]];break;case"H":a=e.calc(r[1],s,!1),l=a[1]===e.calc(o,s,!1)[1]?["H",a[0]]:["L",a[0],a[1]];break;case"a":case"A":var f=e.toArray(),g=vT(r[1],r[2],r[3]).transform(f);if(f[0]*f[3]-f[1]*f[2]<0&&(r[5]=r[5]?"0":"1"),a=e.calc(r[6],r[7],r[0]==="a"),r[0]==="A"&&r[6]===o&&r[7]===s||r[0]==="a"&&r[6]===0&&r[7]===0){l=[r[0]==="a"?"l":"L",a[0],a[1]];break}g.isDegenerate()?l=[r[0]==="a"?"l":"L",a[0],a[1]]:l=[r[0],g.rx,g.ry,g.ax,r[4],r[5],a[0],a[1]];break;case"m":c=i>0,a=e.calc(r[1],r[2],c),l=["m",a[0],a[1]];break;default:for(u=r[0],l=[u],c=u.toLowerCase()===u,n=1;n<r.length;n+=2)a=e.calc(r[n],r[n+1],c),l.push(a[0],a[1])}t.segments[i]=l},!0)};Oe.prototype.__evaluateStack=function(){var e,t;if(this.__stack.length){if(this.__stack.length===1){this.__matrix(this.__stack[0]),this.__stack=[];return}for(e=cn(),t=this.__stack.length;--t>=0;)e.matrix(this.__stack[t].toArray());this.__matrix(e),this.__stack=[]}};Oe.prototype.toString=function(){var e="",t="",n=!1;this.__evaluateStack();for(var r=0,i=this.segments.length;r<i;r++){var o=this.segments[r],s=o[0];s!==t||s==="m"||s==="M"?(s==="m"&&t==="z"&&(e+=" "),e+=s,n=!1):n=!0;for(var a=1;a<o.length;a++){var l=o[a];a===1?n&&l>=0&&(e+=" "):l>=0&&(e+=" "),e+=l}t=s}return e};Oe.prototype.translate=function(e,t){return this.__stack.push(cn().translate(e,t||0)),this};Oe.prototype.scale=function(e,t){return this.__stack.push(cn().scale(e,!t&&t!==0?e:t)),this};Oe.prototype.rotate=function(e,t,n){return this.__stack.push(cn().rotate(e,t||0,n||0)),this};Oe.prototype.skewX=function(e){return this.__stack.push(cn().skewX(e)),this};Oe.prototype.skewY=function(e){return this.__stack.push(cn().skewY(e)),this};Oe.prototype.matrix=function(e){return this.__stack.push(cn().matrix(e)),this};Oe.prototype.transform=function(e){return e.trim()?(this.__stack.push(gT(e)),this):this};Oe.prototype.round=function(e){var t=0,n=0,r=0,i=0,o;return e=e||0,this.__evaluateStack(),this.segments.forEach(function(s){var a=s[0].toLowerCase()===s[0];switch(s[0]){case"H":case"h":a&&(s[1]+=r),r=s[1]-s[1].toFixed(e),s[1]=+s[1].toFixed(e);return;case"V":case"v":a&&(s[1]+=i),i=s[1]-s[1].toFixed(e),s[1]=+s[1].toFixed(e);return;case"Z":case"z":r=t,i=n;return;case"M":case"m":a&&(s[1]+=r,s[2]+=i),r=s[1]-s[1].toFixed(e),i=s[2]-s[2].toFixed(e),t=r,n=i,s[1]=+s[1].toFixed(e),s[2]=+s[2].toFixed(e);return;case"A":case"a":a&&(s[6]+=r,s[7]+=i),r=s[6]-s[6].toFixed(e),i=s[7]-s[7].toFixed(e),s[1]=+s[1].toFixed(e),s[2]=+s[2].toFixed(e),s[3]=+s[3].toFixed(e+2),s[6]=+s[6].toFixed(e),s[7]=+s[7].toFixed(e);return;default:o=s.length,a&&(s[o-2]+=r,s[o-1]+=i),r=s[o-2]-s[o-2].toFixed(e),i=s[o-1]-s[o-1].toFixed(e),s.forEach(function(l,u){u&&(s[u]=+s[u].toFixed(e))});return}}),this};Oe.prototype.iterate=function(e,t){var n=this.segments,r={},i=!1,o=0,s=0,a=0,l=0,u,c,f;if(t||this.__evaluateStack(),n.forEach(function(g,h){var d=e(g,h,o,s);Array.isArray(d)&&(r[h]=d,i=!0);var v=g[0]===g[0].toLowerCase();switch(g[0]){case"m":case"M":o=g[1]+(v?o:0),s=g[2]+(v?s:0),a=o,l=s;return;case"h":case"H":o=g[1]+(v?o:0);return;case"v":case"V":s=g[1]+(v?s:0);return;case"z":case"Z":o=a,s=l;return;default:o=g[g.length-2]+(v?o:0),s=g[g.length-1]+(v?s:0)}}),!i)return this;for(f=[],u=0;u<n.length;u++)if(typeof r[u]<"u")for(c=0;c<r[u].length;c++)f.push(r[u][c]);else f.push(n[u]);return this.segments=f,this};Oe.prototype.abs=function(){return this.iterate(function(e,t,n,r){var i=e[0],o=i.toUpperCase(),s;if(i!==o)switch(e[0]=o,i){case"v":e[1]+=r;return;case"a":e[6]+=n,e[7]+=r;return;default:for(s=1;s<e.length;s++)e[s]+=s%2?n:r}},!0),this};Oe.prototype.rel=function(){return this.iterate(function(e,t,n,r){var i=e[0],o=i.toLowerCase(),s;if(i!==o&&!(t===0&&i==="M"))switch(e[0]=o,i){case"V":e[1]-=r;return;case"A":e[6]-=n,e[7]-=r;return;default:for(s=1;s<e.length;s++)e[s]-=s%2?n:r}},!0),this};Oe.prototype.unarc=function(){return this.iterate(function(e,t,n,r){var i,o,s,a=[],l=e[0];return l!=="A"&&l!=="a"?null:(l==="a"?(o=n+e[6],s=r+e[7]):(o=e[6],s=e[7]),i=yT(n,r,o,s,e[4],e[5],e[1],e[2],e[3]),i.length===0?[[e[0]==="a"?"l":"L",e[6],e[7]]]:(i.forEach(function(u){a.push(["C",u[2],u[3],u[4],u[5],u[6],u[7]])}),a))}),this};Oe.prototype.unshort=function(){var e=this.segments,t,n,r,i,o;return this.iterate(function(s,a,l,u){var c=s[0],f=c.toUpperCase(),g;a&&(f==="T"?(g=c==="t",r=e[a-1],r[0]==="Q"?(t=r[1]-l,n=r[2]-u):r[0]==="q"?(t=r[1]-r[3],n=r[2]-r[4]):(t=0,n=0),i=-t,o=-n,g||(i+=l,o+=u),e[a]=[g?"q":"Q",i,o,s[1],s[2]]):f==="S"&&(g=c==="s",r=e[a-1],r[0]==="C"?(t=r[3]-l,n=r[4]-u):r[0]==="c"?(t=r[3]-r[5],n=r[4]-r[6]):(t=0,n=0),i=-t,o=-n,g||(i+=l,o+=u),e[a]=[g?"c":"C",i,o,s[1],s[2],s[3],s[4]]))}),this};Wd.exports=Oe});var Eo=ln((MD,$d)=>{"use strict";$d.exports=jd()});var eI=ln((va,Kf)=>{var Xf=(()=>{var e=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(e=e||__filename),(function(t){t=t||{};var n;n||(n=typeof t<"u"?t:{});var r=Object.assign,i,o;n.ready=new Promise(function(m,p){i=m,o=p}),(function(m){var p={};m.loadCmdsTypedArray=function(L){for(var H=0,K=0;K<L.length;K++)H+=L[K].length;if(p[H])var J=p[H];else J=new Float32Array(H),p[H]=J;var re=0;for(K=0;K<L.length;K++)for(var me=0;me<L[K].length;me++){var Se=L[K][me];typeof Se=="string"&&(Se=m.SkBits2FloatUnsigned(parseInt(Se))),J[re]=Se,re++}return L=m._malloc(J.length*J.BYTES_PER_ELEMENT),m.HEAPF32.set(J,L/J.BYTES_PER_ELEMENT),[L,H]},m.FromCmds=function(L){L=m.loadCmdsTypedArray(L);var H=m._FromCmds(L[0],L[1]);return m._free(L[0]),H};var y,b,N,M,z;m.cubicYFromX=function(L,H,K,J,re){return y&&b===L&&N===H&&M===K&&z===J||(y&&y.delete(),y=new m._SkCubicMap([L,H],[K,J]),b=L,N=H,M=K,z=J),y.computeYFromX(re)},m.cubicPtFromT=function(L,H,K,J,re){return y&&b===L&&N===H&&M===K&&z===J||(y&&y.delete(),y=new m._SkCubicMap([L,H],[K,J]),b=L,N=H,M=K,z=J),y.computePtFromT(re)}})(n),(function(m){m.onRuntimeInitialized=function(){m.SkPath.prototype.addPath=function(){var p=arguments[0];if(arguments.length===1)this._addPath(p,1,0,0,0,1,0,0,0,1);else if(arguments.length===2){var y=arguments[1];this._addPath(p,y.a,y.c,y.e,y.b,y.d,y.f,0,0,1)}else if(arguments.length===7)y=arguments,this._addPath(p,y[1],y[3],y[5],y[2],y[4],y[6],0,0,1);else if(arguments.length===10)y=arguments,this._addPath(p,y[1],y[2],y[3],y[4],y[5],y[6],y[7],y[8],y[9]);else return console.Ma("addPath expected to take 1, 2, 7, or 10 args. Got "+arguments.length),null;return this},m.SkPath.prototype.arc=function(p,y,b,N,M,z){return this._arc(p,y,b,N,M,!!z),this},m.SkPath.prototype.arcTo=function(p,y,b,N,M){return this._arcTo(p,y,b,N,M),this},m.SkPath.prototype.bezierCurveTo=function(p,y,b,N,M,z){return this._cubicTo(p,y,b,N,M,z),this},m.SkPath.prototype.close=function(){return this._close(),this},m.SkPath.prototype.closePath=function(){return this._close(),this},m.SkPath.prototype.conicTo=function(p,y,b,N,M){return this._conicTo(p,y,b,N,M),this},m.SkPath.prototype.cubicTo=function(p,y,b,N,M,z){return this._cubicTo(p,y,b,N,M,z),this},m.SkPath.prototype.dash=function(p,y,b){return this._dash(p,y,b)?this:null},m.SkPath.prototype.ellipse=function(p,y,b,N,M,z,L,H){return this._ellipse(p,y,b,N,M,z,L,!!H),this},m.SkPath.prototype.lineTo=function(p,y){return this._lineTo(p,y),this},m.SkPath.prototype.moveTo=function(p,y){return this._moveTo(p,y),this},m.SkPath.prototype.op=function(p,y){return this._op(p,y)?this:null},m.SkPath.prototype.quadraticCurveTo=function(p,y,b,N){return this._quadTo(p,y,b,N),this},m.SkPath.prototype.quadTo=function(p,y,b,N){return this._quadTo(p,y,b,N),this},m.SkPath.prototype.rect=function(p,y,b,N){return this._rect(p,y,b,N),this},m.SkPath.prototype.simplify=function(){return this._simplify()?this:null},m.SkPath.prototype.stroke=function(p){return p=p||{},p.width=p.width||1,p.miter_limit=p.miter_limit||4,p.cap=p.cap||m.StrokeCap.BUTT,p.join=p.join||m.StrokeJoin.MITER,this._stroke(p)?this:null},m.SkPath.prototype.transform=function(){if(arguments.length===1)this._transform(arguments[0]);else if(arguments.length===9){var p=arguments;this._transform(p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8])}else return console.Ma("transform expected to take 1 or 9 arguments. Got "+arguments.length),null;return this},m.SkPath.prototype.trim=function(p,y,b){return this._trim(p,y,!!b)?this:null}}})(n);var s=r({},n),a=typeof window=="object",l=typeof importScripts=="function",u="",c,f,g,h,d,v;typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"?(u=l?Ua("path").dirname(u)+"/":__dirname+"/",v=()=>{d||(h=Ua("fs"),d=Ua("path"))},c=function(m,p){return v(),m=d.normalize(m),h.readFileSync(m,p?null:"utf8")},g=m=>(m=c(m,!0),m.buffer||(m=new Uint8Array(m)),m),f=(m,p,y)=>{v(),m=d.normalize(m),h.readFile(m,function(b,N){b?y(b):p(N.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(m){throw m}),process.on("unhandledRejection",function(m){throw m}),n.inspect=function(){return"[Emscripten Module object]"}):(a||l)&&(l?u=self.location.href:typeof document<"u"&&document.currentScript&&(u=document.currentScript.src),e&&(u=e),u.indexOf("blob:")!==0?u=u.substr(0,u.replace(/[?#].*/,"").lastIndexOf("/")+1):u="",c=m=>{var p=new XMLHttpRequest;return p.open("GET",m,!1),p.send(null),p.responseText},l&&(g=m=>{var p=new XMLHttpRequest;return p.open("GET",m,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),f=(m,p,y)=>{var b=new XMLHttpRequest;b.open("GET",m,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):y()},b.onerror=y,b.send(null)});var T=n.print||console.log.bind(console),E=n.printErr||console.warn.bind(console);r(n,s),s=null;var S;n.wasmBinary&&(S=n.wasmBinary);var C=n.noExitRuntime||!0;typeof WebAssembly!="object"&&zt("no native wasm support detected");var A,_=!1,O=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function k(m,p,y){var b=p+y;for(y=p;m[y]&&!(y>=b);)++y;if(16<y-p&&m.subarray&&O)return O.decode(m.subarray(p,y));for(b="";p<y;){var N=m[p++];if(N&128){var M=m[p++]&63;if((N&224)==192)b+=String.fromCharCode((N&31)<<6|M);else{var z=m[p++]&63;N=(N&240)==224?(N&15)<<12|M<<6|z:(N&7)<<18|M<<12|z<<6|m[p++]&63,65536>N?b+=String.fromCharCode(N):(N-=65536,b+=String.fromCharCode(55296|N>>10,56320|N&1023))}}else b+=String.fromCharCode(N)}return b}function V(m,p,y){var b=D;if(0<y){y=p+y-1;for(var N=0;N<m.length;++N){var M=m.charCodeAt(N);if(55296<=M&&57343>=M){var z=m.charCodeAt(++N);M=65536+((M&1023)<<10)|z&1023}if(127>=M){if(p>=y)break;b[p++]=M}else{if(2047>=M){if(p+1>=y)break;b[p++]=192|M>>6}else{if(65535>=M){if(p+2>=y)break;b[p++]=224|M>>12}else{if(p+3>=y)break;b[p++]=240|M>>18,b[p++]=128|M>>12&63}b[p++]=128|M>>6&63}b[p++]=128|M&63}}b[p]=0}}var F=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0;function Q(m,p){for(var y=m>>1,b=y+p/2;!(y>=b)&&q[y];)++y;if(y<<=1,32<y-m&&F)return F.decode(D.subarray(m,y));for(y="",b=0;!(b>=p/2);++b){var N=w[m+2*b>>1];if(N==0)break;y+=String.fromCharCode(N)}return y}function ne(m,p,y){if(y===void 0&&(y=2147483647),2>y)return 0;y-=2;var b=p;y=y<2*m.length?y/2:m.length;for(var N=0;N<y;++N)w[p>>1]=m.charCodeAt(N),p+=2;return w[p>>1]=0,p-b}function Y(m){return 2*m.length}function I(m,p){for(var y=0,b="";!(y>=p/4);){var N=Z[m+4*y>>2];if(N==0)break;++y,65536<=N?(N-=65536,b+=String.fromCharCode(55296|N>>10,56320|N&1023)):b+=String.fromCharCode(N)}return b}function R(m,p,y){if(y===void 0&&(y=2147483647),4>y)return 0;var b=p;y=b+y-4;for(var N=0;N<m.length;++N){var M=m.charCodeAt(N);if(55296<=M&&57343>=M){var z=m.charCodeAt(++N);M=65536+((M&1023)<<10)|z&1023}if(Z[p>>2]=M,p+=4,p+4>y)break}return Z[p>>2]=0,p-b}function x(m){for(var p=0,y=0;y<m.length;++y){var b=m.charCodeAt(y);55296<=b&&57343>=b&&++y,p+=4}return p}var P,G,D,w,q,Z,X,j,ee;function $(){var m=A.buffer;P=m,n.HEAP8=G=new Int8Array(m),n.HEAP16=w=new Int16Array(m),n.HEAP32=Z=new Int32Array(m),n.HEAPU8=D=new Uint8Array(m),n.HEAPU16=q=new Uint16Array(m),n.HEAPU32=X=new Uint32Array(m),n.HEAPF32=j=new Float32Array(m),n.HEAPF64=ee=new Float64Array(m)}var le,B=[],te=[],ae=[];function ve(){var m=n.preRun.shift();B.unshift(m)}var Ce=0,je=null,Qe=null;n.preloadedImages={},n.preloadedAudios={};function zt(m){throw n.onAbort&&n.onAbort(m),m="Aborted("+m+")",E(m),_=!0,m=new WebAssembly.RuntimeError(m+". Build with -s ASSERTIONS=1 for more info."),o(m),m}function Jf(){return ft.startsWith("data:application/octet-stream;base64,")}var ft;if(ft="pathkit.wasm",!Jf()){var Qf=ft;ft=n.locateFile?n.locateFile(Qf,u):u+Qf}function ed(){var m=ft;try{if(m==ft&&S)return new Uint8Array(S);if(g)return g(m);throw"both async and sync fetching of the wasm failed"}catch(p){zt(p)}}function fI(){if(!S&&(a||l)){if(typeof fetch=="function"&&!ft.startsWith("file://"))return fetch(ft,{credentials:"same-origin"}).then(function(m){if(!m.ok)throw"failed to load wasm binary file at '"+ft+"'";return m.arrayBuffer()}).catch(function(){return ed()});if(f)return new Promise(function(m,p){f(ft,function(y){m(new Uint8Array(y))},p)})}return Promise.resolve().then(function(){return ed()})}function ba(m){for(;0<m.length;){var p=m.shift();if(typeof p=="function")p(n);else{var y=p.Wa;typeof y=="number"?p.xa===void 0?le.get(y)():le.get(y)(p.xa):y(p.xa===void 0?null:p.xa)}}}var so={};function Ea(m){for(;m.length;){var p=m.pop();m.pop()(p)}}function Zn(m){return this.fromWireType(X[m>>2])}var Jn={},Nn={},ao={};function td(m){if(m===void 0)return"_unknown";m=m.replace(/[^a-zA-Z0-9_]/g,"$");var p=m.charCodeAt(0);return 48<=p&&57>=p?"_"+m:m}function Aa(m,p){return m=td(m),function(){return p.apply(this,arguments)}}function xa(m){var p=Error,y=Aa(m,function(b){this.name=m,this.message=b,b=Error(b).stack,b!==void 0&&(this.stack=this.toString()+`
`+b.replace(/^Error(:[^\n]*)?\n/,""))});return y.prototype=Object.create(p.prototype),y.prototype.constructor=y,y.prototype.toString=function(){return this.message===void 0?this.name:this.name+": "+this.message},y}var nd=void 0;function lo(m){throw new nd(m)}function Ht(m,p,y){function b(L){L=y(L),L.length!==m.length&&lo("Mismatched type converter count");for(var H=0;H<m.length;++H)Mt(m[H],L[H])}m.forEach(function(L){ao[L]=p});var N=Array(p.length),M=[],z=0;p.forEach(function(L,H){Nn.hasOwnProperty(L)?N[H]=Nn[L]:(M.push(L),Jn.hasOwnProperty(L)||(Jn[L]=[]),Jn[L].push(function(){N[H]=Nn[L],++z,z===M.length&&b(N)}))}),M.length===0&&b(N)}var uo={};function co(m){switch(m){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+m)}}var rd=void 0;function we(m){for(var p="";D[m];)p+=rd[D[m++]];return p}var Qn=void 0;function de(m){throw new Qn(m)}function Mt(m,p,y={}){if(!("argPackAdvance"in p))throw new TypeError("registerType registeredInstance requires argPackAdvance");var b=p.name;if(m||de('type "'+b+'" must have a positive integer typeid pointer'),Nn.hasOwnProperty(m)){if(y.Qa)return;de("Cannot register type '"+b+"' twice")}Nn[m]=p,delete ao[m],Jn.hasOwnProperty(m)&&(p=Jn[m],delete Jn[m],p.forEach(function(N){N()}))}function Na(m){de(m.ea.ha.fa.name+" instance already deleted")}var Ca=!1;function id(){}function od(m){--m.count.value,m.count.value===0&&(m.ka?m.ma.la(m.ka):m.ha.fa.la(m.ga))}function Ur(m){return typeof FinalizationGroup>"u"?(Ur=p=>p,m):(Ca=new FinalizationGroup(function(p){for(var y=p.next();!y.done;y=p.next())y=y.value,y.ga?od(y):console.warn("object already deleted: "+y.ga)}),Ur=p=>(Ca.register(p,p.ea,p.ea),p),id=p=>{Ca.unregister(p.ea)},Ur(m))}var zr=void 0,Hr=[];function Oa(){for(;Hr.length;){var m=Hr.pop();m.ea.pa=!1,m.delete()}}function sn(){}var sd={};function ad(m,p,y){if(m[p].ia===void 0){var b=m[p];m[p]=function(){return m[p].ia.hasOwnProperty(arguments.length)||de("Function '"+y+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+m[p].ia+")!"),m[p].ia[arguments.length].apply(this,arguments)},m[p].ia=[],m[p].ia[b.ua]=b}}function Ra(m,p,y){n.hasOwnProperty(m)?((y===void 0||n[m].ia!==void 0&&n[m].ia[y]!==void 0)&&de("Cannot register public name '"+m+"' twice"),ad(n,m,m),n.hasOwnProperty(y)&&de("Cannot register multiple overloads of a function with the same number of arguments ("+y+")!"),n[m].ia[y]=p):(n[m]=p,y!==void 0&&(n[m].Xa=y))}function dI(m,p,y,b,N,M,z,L){this.name=m,this.constructor=p,this.qa=y,this.la=b,this.na=N,this.Oa=M,this.ta=z,this.La=L,this.Ta=[]}function Da(m,p,y){for(;p!==y;)p.ta||de("Expected null or instance of "+y.name+", got an instance of "+p.name),m=p.ta(m),p=p.na;return m}function pI(m,p){return p===null?(this.Ba&&de("null is not a valid "+this.name),0):(p.ea||de('Cannot pass "'+_a(p)+'" as a '+this.name),p.ea.ga||de("Cannot pass deleted object as a pointer of type "+this.name),Da(p.ea.ga,p.ea.ha.fa,this.fa))}function mI(m,p){if(p===null){if(this.Ba&&de("null is not a valid "+this.name),this.wa){var y=this.sa();return m!==null&&m.push(this.la,y),y}return 0}if(p.ea||de('Cannot pass "'+_a(p)+'" as a '+this.name),p.ea.ga||de("Cannot pass deleted object as a pointer of type "+this.name),!this.va&&p.ea.ha.va&&de("Cannot convert argument of type "+(p.ea.ma?p.ea.ma.name:p.ea.ha.name)+" to parameter type "+this.name),y=Da(p.ea.ga,p.ea.ha.fa,this.fa),this.wa)switch(p.ea.ka===void 0&&de("Passing raw pointer to smart pointer is illegal"),this.Va){case 0:p.ea.ma===this?y=p.ea.ka:de("Cannot convert argument of type "+(p.ea.ma?p.ea.ma.name:p.ea.ha.name)+" to parameter type "+this.name);break;case 1:y=p.ea.ka;break;case 2:if(p.ea.ma===this)y=p.ea.ka;else{var b=p.clone();y=this.Ua(y,an(function(){b.delete()})),m!==null&&m.push(this.la,y)}break;default:de("Unsupporting sharing policy")}return y}function hI(m,p){return p===null?(this.Ba&&de("null is not a valid "+this.name),0):(p.ea||de('Cannot pass "'+_a(p)+'" as a '+this.name),p.ea.ga||de("Cannot pass deleted object as a pointer of type "+this.name),p.ea.ha.va&&de("Cannot convert argument of type "+p.ea.ha.name+" to parameter type "+this.name),Da(p.ea.ga,p.ea.ha.fa,this.fa))}function ld(m,p,y){return p===y?m:y.na===void 0?null:(m=ld(m,p,y.na),m===null?null:y.La(m))}var Wr={};function gI(m,p){for(p===void 0&&de("ptr should not be undefined");m.na;)p=m.ta(p),m=m.na;return Wr[p]}function fo(m,p){return p.ha&&p.ga||lo("makeClassHandle requires ptr and ptrType"),!!p.ma!=!!p.ka&&lo("Both smartPtrType and smartPtr must be specified"),p.count={value:1},Ur(Object.create(m,{ea:{value:p}}))}function Wt(m,p,y,b){this.name=m,this.fa=p,this.Ba=y,this.va=b,this.wa=!1,this.la=this.Ua=this.sa=this.Ia=this.Va=this.Sa=void 0,p.na!==void 0?this.toWireType=mI:(this.toWireType=b?pI:hI,this.ja=null)}function ud(m,p,y){n.hasOwnProperty(m)||lo("Replacing nonexistant public symbol"),n[m].ia!==void 0&&y!==void 0?n[m].ia[y]=p:(n[m]=p,n[m].ua=y)}function yI(m,p){var y=[];return function(){y.length=arguments.length;for(var b=0;b<arguments.length;b++)y[b]=arguments[b];return m.includes("j")?(b=n["dynCall_"+m],b=y&&y.length?b.apply(null,[p].concat(y)):b.call(null,p)):b=le.get(p).apply(null,y),b}}function $e(m,p){m=we(m);var y=m.includes("j")?yI(m,p):le.get(p);return typeof y!="function"&&de("unknown function pointer with signature "+m+": "+p),y}var cd=void 0;function fd(m){m=yd(m);var p=we(m);return jt(m),p}function po(m,p){function y(M){N[M]||Nn[M]||(ao[M]?ao[M].forEach(y):(b.push(M),N[M]=!0))}var b=[],N={};throw p.forEach(y),new cd(m+": "+b.map(fd).join([", "]))}function Ma(m,p){for(var y=[],b=0;b<m;b++)y.push(Z[(p>>2)+b]);return y}function Pa(m,p,y,b,N){var M=p.length;2>M&&de("argTypes array size mismatch! Must at least get return value and 'this' types!");var z=p[1]!==null&&y!==null,L=!1;for(y=1;y<p.length;++y)if(p[y]!==null&&p[y].ja===void 0){L=!0;break}var H=p[0].name!=="void",K=M-2,J=Array(K),re=[],me=[];return function(){if(arguments.length!==K&&de("function "+m+" called with "+arguments.length+" arguments, expected "+K+" args!"),me.length=0,re.length=z?2:1,re[0]=N,z){var Se=p[1].toWireType(me,this);re[1]=Se}for(var he=0;he<K;++he)J[he]=p[he+2].toWireType(me,arguments[he]),re.push(J[he]);if(he=b.apply(null,re),L)Ea(me);else for(var Xe=z?1:2;Xe<p.length;Xe++){var Ke=Xe===1?Se:J[Xe-2];p[Xe].ja!==null&&p[Xe].ja(Ke)}return Se=H?p[0].fromWireType(he):void 0,Se}}var wa=[],St=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function dd(m){4<m&&--St[m].Ca===0&&(St[m]=void 0,wa.push(m))}function ka(m){return m||de("Cannot use deleted val. handle = "+m),St[m].value}function an(m){switch(m){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var p=wa.length?wa.pop():St.length;return St[p]={Ca:1,value:m},p}}function vI(m,p,y){switch(p){case 0:return function(b){return this.fromWireType((y?G:D)[b])};case 1:return function(b){return this.fromWireType((y?w:q)[b>>1])};case 2:return function(b){return this.fromWireType((y?Z:X)[b>>2])};default:throw new TypeError("Unknown integer type: "+m)}}function mo(m,p){var y=Nn[m];return y===void 0&&de(p+" has unknown type "+fd(m)),y}function _a(m){if(m===null)return"null";var p=typeof m;return p==="object"||p==="array"||p==="function"?m.toString():""+m}function II(m,p){switch(p){case 2:return function(y){return this.fromWireType(j[y>>2])};case 3:return function(y){return this.fromWireType(ee[y>>3])};default:throw new TypeError("Unknown float type: "+m)}}function TI(m,p,y){switch(p){case 0:return y?function(b){return G[b]}:function(b){return D[b]};case 1:return y?function(b){return w[b>>1]}:function(b){return q[b>>1]};case 2:return y?function(b){return Z[b>>2]}:function(b){return X[b>>2]};default:throw new TypeError("Unknown integer type: "+m)}}var SI={};function La(m){var p=SI[m];return p===void 0?we(m):p}var Va=[];function pd(){function m(p){p.$$$embind_global$$$=p;var y=typeof $$$embind_global$$$=="object"&&p.$$$embind_global$$$===p;return y||delete p.$$$embind_global$$$,y}if(typeof globalThis=="object")return globalThis;if(typeof $$$embind_global$$$=="object"||(typeof global=="object"&&m(global)?$$$embind_global$$$=global:typeof self=="object"&&m(self)&&($$$embind_global$$$=self),typeof $$$embind_global$$$=="object"))return $$$embind_global$$$;throw Error("unable to get global object.")}function bI(m){var p=Va.length;return Va.push(m),p}function EI(m,p){for(var y=Array(m),b=0;b<m;++b)y[b]=mo(Z[(p>>2)+b],"parameter "+b);return y}var md=[];function AI(m){var p=Array(m+1);return function(y,b,N){p[0]=y;for(var M=0;M<m;++M){var z=mo(Z[(b>>2)+M],"parameter "+M);p[M+1]=z.readValueFromPointer(N),N+=z.argPackAdvance}return y=new(y.bind.apply(y,p)),an(y)}}var hd={},xI=[null,[],[]];nd=n.InternalError=xa("InternalError");for(var gd=Array(256),ho=0;256>ho;++ho)gd[ho]=String.fromCharCode(ho);rd=gd,Qn=n.BindingError=xa("BindingError"),sn.prototype.isAliasOf=function(m){if(!(this instanceof sn&&m instanceof sn))return!1;var p=this.ea.ha.fa,y=this.ea.ga,b=m.ea.ha.fa;for(m=m.ea.ga;p.na;)y=p.ta(y),p=p.na;for(;b.na;)m=b.ta(m),b=b.na;return p===b&&y===m},sn.prototype.clone=function(){if(this.ea.ga||Na(this),this.ea.ra)return this.ea.count.value+=1,this;var m=Ur,p=Object,y=p.create,b=Object.getPrototypeOf(this),N=this.ea;return m=m(y.call(p,b,{ea:{value:{count:N.count,pa:N.pa,ra:N.ra,ga:N.ga,ha:N.ha,ka:N.ka,ma:N.ma}}})),m.ea.count.value+=1,m.ea.pa=!1,m},sn.prototype.delete=function(){this.ea.ga||Na(this),this.ea.pa&&!this.ea.ra&&de("Object already scheduled for deletion"),id(this),od(this.ea),this.ea.ra||(this.ea.ka=void 0,this.ea.ga=void 0)},sn.prototype.isDeleted=function(){return!this.ea.ga},sn.prototype.deleteLater=function(){return this.ea.ga||Na(this),this.ea.pa&&!this.ea.ra&&de("Object already scheduled for deletion"),Hr.push(this),Hr.length===1&&zr&&zr(Oa),this.ea.pa=!0,this},Wt.prototype.Pa=function(m){return this.Ia&&(m=this.Ia(m)),m},Wt.prototype.Ga=function(m){this.la&&this.la(m)},Wt.prototype.argPackAdvance=8,Wt.prototype.readValueFromPointer=Zn,Wt.prototype.deleteObject=function(m){m!==null&&m.delete()},Wt.prototype.fromWireType=function(m){function p(){return this.wa?fo(this.fa.qa,{ha:this.Sa,ga:y,ma:this,ka:m}):fo(this.fa.qa,{ha:this,ga:m})}var y=this.Pa(m);if(!y)return this.Ga(m),null;var b=gI(this.fa,y);if(b!==void 0)return b.ea.count.value===0?(b.ea.ga=y,b.ea.ka=m,b.clone()):(b=b.clone(),this.Ga(m),b);if(b=this.fa.Oa(y),b=sd[b],!b)return p.call(this);b=this.va?b.Ja:b.pointerType;var N=ld(y,this.fa,b.fa);return N===null?p.call(this):this.wa?fo(b.fa.qa,{ha:b,ga:N,ma:this,ka:m}):fo(b.fa.qa,{ha:b,ga:N})},n.getInheritedInstanceCount=function(){return Object.keys(Wr).length},n.getLiveInheritedInstances=function(){var m=[],p;for(p in Wr)Wr.hasOwnProperty(p)&&m.push(Wr[p]);return m},n.flushPendingDeletes=Oa,n.setDelayFunction=function(m){zr=m,Hr.length&&zr&&zr(Oa)},cd=n.UnboundTypeError=xa("UnboundTypeError"),n.count_emval_handles=function(){for(var m=0,p=5;p<St.length;++p)St[p]!==void 0&&++m;return m},n.get_first_emval=function(){for(var m=5;m<St.length;++m)if(St[m]!==void 0)return St[m];return null};var NI={r:function(m){var p=so[m];delete so[m];var y=p.elements,b=y.length,N=y.map(function(L){return L.Aa}).concat(y.map(function(L){return L.Ea})),M=p.sa,z=p.la;Ht([m],N,function(L){return y.forEach(function(H,K){var J=L[K],re=H.ya,me=H.za,Se=L[K+b],he=H.Da,Xe=H.Fa;H.read=Ke=>J.fromWireType(re(me,Ke)),H.write=(Ke,Cn)=>{var dt=[];he(Xe,Ke,Se.toWireType(dt,Cn)),Ea(dt)}}),[{name:p.name,fromWireType:function(H){for(var K=Array(b),J=0;J<b;++J)K[J]=y[J].read(H);return z(H),K},toWireType:function(H,K){if(b!==K.length)throw new TypeError("Incorrect number of tuple elements for "+p.name+": expected="+b+", actual="+K.length);for(var J=M(),re=0;re<b;++re)y[re].write(J,K[re]);return H!==null&&H.push(z,J),J},argPackAdvance:8,readValueFromPointer:Zn,ja:z}]})},u:function(m){var p=uo[m];delete uo[m];var y=p.sa,b=p.la,N=p.Ha,M=N.map(function(z){return z.Aa}).concat(N.map(function(z){return z.Ea}));Ht([m],M,function(z){var L={};return N.forEach(function(H,K){var J=z[K],re=H.ya,me=H.za,Se=z[K+N.length],he=H.Da,Xe=H.Fa;L[H.Na]={read:function(Ke){return J.fromWireType(re(me,Ke))},write:function(Ke,Cn){var dt=[];he(Xe,Ke,Se.toWireType(dt,Cn)),Ea(dt)}}}),[{name:p.name,fromWireType:function(H){var K={},J;for(J in L)K[J]=L[J].read(H);return b(H),K},toWireType:function(H,K){for(var J in L)if(!(J in K))throw new TypeError('Missing field:  "'+J+'"');var re=y();for(J in L)L[J].write(re,K[J]);return H!==null&&H.push(b,re),re},argPackAdvance:8,readValueFromPointer:Zn,ja:b}]})},z:function(){},F:function(m,p,y,b,N){var M=co(y);p=we(p),Mt(m,{name:p,fromWireType:function(z){return!!z},toWireType:function(z,L){return L?b:N},argPackAdvance:8,readValueFromPointer:function(z){if(y===1)var L=G;else if(y===2)L=w;else if(y===4)L=Z;else throw new TypeError("Unknown boolean type size: "+p);return this.fromWireType(L[z>>M])},ja:null})},l:function(m,p,y,b,N,M,z,L,H,K,J,re,me){J=we(J),M=$e(N,M),L&&(L=$e(z,L)),K&&(K=$e(H,K)),me=$e(re,me);var Se=td(J);Ra(Se,function(){po("Cannot construct "+J+" due to unbound types",[b])}),Ht([m,p,y],b?[b]:[],function(he){if(he=he[0],b)var Xe=he.fa,Ke=Xe.qa;else Ke=sn.prototype;he=Aa(Se,function(){if(Object.getPrototypeOf(this)!==Cn)throw new Qn("Use 'new' to construct "+J);if(dt.oa===void 0)throw new Qn(J+" has no accessible constructor");var Id=dt.oa[arguments.length];if(Id===void 0)throw new Qn("Tried to invoke ctor of "+J+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(dt.oa).toString()+") parameters instead!");return Id.apply(this,arguments)});var Cn=Object.create(Ke,{constructor:{value:he}});he.prototype=Cn;var dt=new dI(J,he,Cn,me,Xe,M,L,K);Xe=new Wt(J,dt,!0,!1),Ke=new Wt(J+"*",dt,!1,!1);var vd=new Wt(J+" const*",dt,!1,!0);return sd[m]={pointerType:Ke,Ja:vd},ud(Se,he),[Xe,Ke,vd]})},i:function(m,p,y,b,N,M){0<p||zt(void 0);var z=Ma(p,y);N=$e(b,N),Ht([],[m],function(L){L=L[0];var H="constructor "+L.name;if(L.fa.oa===void 0&&(L.fa.oa=[]),L.fa.oa[p-1]!==void 0)throw new Qn("Cannot register multiple constructors with identical number of parameters ("+(p-1)+") for class '"+L.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return L.fa.oa[p-1]=()=>{po("Cannot construct "+L.name+" due to unbound types",z)},Ht([],z,function(K){return K.splice(1,0,null),L.fa.oa[p-1]=Pa(H,K,null,N,M),[]}),[]})},a:function(m,p,y,b,N,M,z,L){var H=Ma(y,b);p=we(p),M=$e(N,M),Ht([],[m],function(K){function J(){po("Cannot call "+re+" due to unbound types",H)}K=K[0];var re=K.name+"."+p;p.startsWith("@@")&&(p=Symbol[p.substring(2)]),L&&K.fa.Ta.push(p);var me=K.fa.qa,Se=me[p];return Se===void 0||Se.ia===void 0&&Se.className!==K.name&&Se.ua===y-2?(J.ua=y-2,J.className=K.name,me[p]=J):(ad(me,p,re),me[p].ia[y-2]=J),Ht([],H,function(he){return he=Pa(re,he,K,M,z),me[p].ia===void 0?(he.ua=y-2,me[p]=he):me[p].ia[y-2]=he,[]}),[]})},I:function(m,p,y){m=we(m),Ht([],[p],function(b){return b=b[0],n[m]=b.fromWireType(y),[]})},E:function(m,p){p=we(p),Mt(m,{name:p,fromWireType:function(y){var b=ka(y);return dd(y),b},toWireType:function(y,b){return an(b)},argPackAdvance:8,readValueFromPointer:Zn,ja:null})},h:function(m,p,y,b){function N(){}y=co(y),p=we(p),N.values={},Mt(m,{name:p,constructor:N,fromWireType:function(M){return this.constructor.values[M]},toWireType:function(M,z){return z.value},argPackAdvance:8,readValueFromPointer:vI(p,y,b),ja:null}),Ra(p,N)},k:function(m,p,y){var b=mo(m,"enum");p=we(p),m=b.constructor,b=Object.create(b.constructor.prototype,{value:{value:y},constructor:{value:Aa(b.name+"_"+p,function(){})}}),m.values[y]=b,m[p]=b},q:function(m,p,y){y=co(y),p=we(p),Mt(m,{name:p,fromWireType:function(b){return b},toWireType:function(b,N){return N},argPackAdvance:8,readValueFromPointer:II(p,y),ja:null})},f:function(m,p,y,b,N,M){var z=Ma(p,y);m=we(m),N=$e(b,N),Ra(m,function(){po("Cannot call "+m+" due to unbound types",z)},p-1),Ht([],z,function(L){return L=[L[0],null].concat(L.slice(1)),ud(m,Pa(m,L,null,N,M),p-1),[]})},e:function(m,p,y,b,N){p=we(p),N===-1&&(N=4294967295),N=co(y);var M=L=>L;if(b===0){var z=32-8*y;M=L=>L<<z>>>z}y=p.includes("unsigned")?function(L,H){return H>>>0}:function(L,H){return H},Mt(m,{name:p,fromWireType:M,toWireType:y,argPackAdvance:8,readValueFromPointer:TI(p,N,b!==0),ja:null})},b:function(m,p,y){function b(M){M>>=2;var z=X;return new N(P,z[M+1],z[M])}var N=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][p];y=we(y),Mt(m,{name:y,fromWireType:b,argPackAdvance:8,readValueFromPointer:b},{Qa:!0})},p:function(m,p){p=we(p);var y=p==="std::string";Mt(m,{name:p,fromWireType:function(b){var N=X[b>>2];if(y)for(var M=b+4,z=0;z<=N;++z){var L=b+4+z;if(z==N||D[L]==0){if(M=M?k(D,M,L-M):"",H===void 0)var H=M;else H+="\0",H+=M;M=L+1}}else{for(H=Array(N),z=0;z<N;++z)H[z]=String.fromCharCode(D[b+4+z]);H=H.join("")}return jt(b),H},toWireType:function(b,N){N instanceof ArrayBuffer&&(N=new Uint8Array(N));var M=typeof N=="string";M||N instanceof Uint8Array||N instanceof Uint8ClampedArray||N instanceof Int8Array||de("Cannot pass non-string to std::string");var z=(y&&M?()=>{for(var K=0,J=0;J<N.length;++J){var re=N.charCodeAt(J);55296<=re&&57343>=re&&(re=65536+((re&1023)<<10)|N.charCodeAt(++J)&1023),127>=re?++K:K=2047>=re?K+2:65535>=re?K+3:K+4}return K}:()=>N.length)(),L=Fa(4+z+1);if(X[L>>2]=z,y&&M)V(N,L+4,z+1);else if(M)for(M=0;M<z;++M){var H=N.charCodeAt(M);255<H&&(jt(L),de("String has UTF-16 code units that do not fit in 8 bits")),D[L+4+M]=H}else for(M=0;M<z;++M)D[L+4+M]=N[M];return b!==null&&b.push(jt,L),L},argPackAdvance:8,readValueFromPointer:Zn,ja:function(b){jt(b)}})},m:function(m,p,y){if(y=we(y),p===2)var b=Q,N=ne,M=Y,z=()=>q,L=1;else p===4&&(b=I,N=R,M=x,z=()=>X,L=2);Mt(m,{name:y,fromWireType:function(H){for(var K=X[H>>2],J=z(),re,me=H+4,Se=0;Se<=K;++Se){var he=H+4+Se*p;(Se==K||J[he>>L]==0)&&(me=b(me,he-me),re===void 0?re=me:(re+="\0",re+=me),me=he+p)}return jt(H),re},toWireType:function(H,K){typeof K!="string"&&de("Cannot pass non-string to C++ string type "+y);var J=M(K),re=Fa(4+J+p);return X[re>>2]=J>>L,N(K,re+4,J+p),H!==null&&H.push(jt,re),re},argPackAdvance:8,readValueFromPointer:Zn,ja:function(H){jt(H)}})},t:function(m,p,y,b,N,M){so[m]={name:we(p),sa:$e(y,b),la:$e(N,M),elements:[]}},s:function(m,p,y,b,N,M,z,L,H){so[m].elements.push({Aa:p,ya:$e(y,b),za:N,Ea:M,Da:$e(z,L),Fa:H})},v:function(m,p,y,b,N,M){uo[m]={name:we(p),sa:$e(y,b),la:$e(N,M),Ha:[]}},j:function(m,p,y,b,N,M,z,L,H,K){uo[m].Ha.push({Na:we(p),Aa:y,ya:$e(b,N),za:M,Ea:z,Da:$e(L,H),Fa:K})},G:function(m,p){p=we(p),Mt(m,{Ra:!0,name:p,argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},d:function(m,p,y,b){m=Va[m],p=ka(p),y=La(y),m(p,y,null,b)},J:dd,x:function(m){return m===0?an(pd()):(m=La(m),an(pd()[m]))},c:function(m,p){var y=EI(m,p),b=y[0];p=b.name+"_$"+y.slice(1).map(function(z){return z.name}).join("_")+"$";var N=md[p];if(N!==void 0)return N;var M=Array(m-1);return N=bI((z,L,H,K)=>{for(var J=0,re=0;re<m-1;++re)M[re]=y[re+1].readValueFromPointer(K+J),J+=y[re+1].argPackAdvance;for(z=z[L].apply(z,M),re=0;re<m-1;++re)y[re+1].Ka&&y[re+1].Ka(M[re]);if(!b.Ra)return b.toWireType(H,z)}),md[p]=N},n:function(m){4<m&&(St[m].Ca+=1)},w:function(m,p,y,b){m=ka(m);var N=hd[p];return N||(N=AI(p),hd[p]=N),N(m,y,b)},K:function(){return an([])},D:function(m){return an(La(m))},H:function(m,p){return m=mo(m,"_emval_take_value"),m=m.readValueFromPointer(p),an(m)},g:function(){zt("")},B:function(m){var p=D.length;if(m>>>=0,2147483648<m)return!1;for(var y=1;4>=y;y*=2){var b=p*(1+.2/y);b=Math.min(b,m+100663296),b=Math.max(m,b),0<b%65536&&(b+=65536-b%65536);e:{try{A.grow(Math.min(2147483648,b)-P.byteLength+65535>>>16),$();var N=1;break e}catch{}N=void 0}if(N)return!0}return!1},C:function(){return 0},y:function(){},o:function(m,p,y,b){for(var N=0,M=0;M<y;M++){var z=Z[p>>2],L=Z[p+4>>2];p+=8;for(var H=0;H<L;H++){var K=D[z+H],J=xI[m];K===0||K===10?((m===1?T:E)(k(J,0)),J.length=0):J.push(K)}N+=L}return Z[b>>2]=N,0},A:function(){}};(function(){function m(N){n.asm=N.exports,A=n.asm.L,$(),le=n.asm._,te.unshift(n.asm.M),Ce--,n.monitorRunDependencies&&n.monitorRunDependencies(Ce),Ce==0&&(je!==null&&(clearInterval(je),je=null),Qe&&(N=Qe,Qe=null,N()))}function p(N){m(N.instance)}function y(N){return fI().then(function(M){return WebAssembly.instantiate(M,b)}).then(function(M){return M}).then(N,function(M){E("failed to asynchronously prepare wasm: "+M),zt(M)})}var b={a:NI};if(Ce++,n.monitorRunDependencies&&n.monitorRunDependencies(Ce),n.instantiateWasm)try{return n.instantiateWasm(b,m)}catch(N){return E("Module.instantiateWasm callback failed with error: "+N),!1}return(function(){return S||typeof WebAssembly.instantiateStreaming!="function"||Jf()||ft.startsWith("file://")||typeof fetch!="function"?y(p):fetch(ft,{credentials:"same-origin"}).then(function(N){return WebAssembly.instantiateStreaming(N,b).then(p,function(M){return E("wasm streaming compile failed: "+M),E("falling back to ArrayBuffer instantiation"),y(p)})})})().catch(o),{}})(),n.___wasm_call_ctors=function(){return(n.___wasm_call_ctors=n.asm.M).apply(null,arguments)},n.__Z6ToCmdsRK6SkPath=function(){return(n.__Z6ToCmdsRK6SkPath=n.asm.N).apply(null,arguments)},n.__Z8FromCmdsmi=function(){return(n.__Z8FromCmdsmi=n.asm.O).apply(null,arguments)},n.__Z7NewPathv=function(){return(n.__Z7NewPathv=n.asm.P).apply(null,arguments)},n.__Z8CopyPathRK6SkPath=function(){return(n.__Z8CopyPathRK6SkPath=n.asm.Q).apply(null,arguments)},n.__Z6EqualsRK6SkPathS1_=function(){return(n.__Z6EqualsRK6SkPathS1_=n.asm.R).apply(null,arguments)},n.__Z11ToSVGStringRK6SkPath=function(){return(n.__Z11ToSVGStringRK6SkPath=n.asm.S).apply(null,arguments)},n.__Z13FromSVGStringNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE=function(){return(n.__Z13FromSVGStringNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE=n.asm.T).apply(null,arguments)},n.__Z13ApplySimplifyR6SkPath=function(){return(n.__Z13ApplySimplifyR6SkPath=n.asm.U).apply(null,arguments)},n.__Z11ApplyPathOpR6SkPathRKS_8SkPathOp=function(){return(n.__Z11ApplyPathOpR6SkPathRKS_8SkPathOp=n.asm.V).apply(null,arguments)},n.__Z10MakeFromOpRK6SkPathS1_8SkPathOp=function(){return(n.__Z10MakeFromOpRK6SkPathS1_8SkPathOp=n.asm.W).apply(null,arguments)},n.__Z14ResolveBuilderR11SkOpBuilder=function(){return(n.__Z14ResolveBuilderR11SkOpBuilder=n.asm.X).apply(null,arguments)},n.__Z8ToCanvasRK6SkPathN10emscripten3valE=function(){return(n.__Z8ToCanvasRK6SkPathN10emscripten3valE=n.asm.Y).apply(null,arguments)},n.__Z8ToPath2DRK6SkPath=function(){return(n.__Z8ToPath2DRK6SkPath=n.asm.Z).apply(null,arguments)};var jt=n._free=function(){return(jt=n._free=n.asm.$).apply(null,arguments)},Fa=n._malloc=function(){return(Fa=n._malloc=n.asm.aa).apply(null,arguments)},yd=n.___getTypeName=function(){return(yd=n.___getTypeName=n.asm.ba).apply(null,arguments)};n.___embind_register_native_and_builtin_types=function(){return(n.___embind_register_native_and_builtin_types=n.asm.ca).apply(null,arguments)},n.dynCall_jiji=function(){return(n.dynCall_jiji=n.asm.da).apply(null,arguments)};var go;Qe=function m(){go||Ga(),go||(Qe=m)};function Ga(){function m(){if(!go&&(go=!0,n.calledRun=!0,!_)){if(ba(te),i(n),n.onRuntimeInitialized&&n.onRuntimeInitialized(),n.postRun)for(typeof n.postRun=="function"&&(n.postRun=[n.postRun]);n.postRun.length;){var p=n.postRun.shift();ae.unshift(p)}ba(ae)}}if(!(0<Ce)){if(n.preRun)for(typeof n.preRun=="function"&&(n.preRun=[n.preRun]);n.preRun.length;)ve();ba(B),0<Ce||(n.setStatus?(n.setStatus("Running..."),setTimeout(function(){setTimeout(function(){n.setStatus("")},1),m()},1)):m())}}if(n.run=Ga,n.preInit)for(typeof n.preInit=="function"&&(n.preInit=[n.preInit]);0<n.preInit.length;)n.preInit.pop()();return Ga(),t.ready})})();typeof va=="object"&&typeof Kf=="object"?Kf.exports=Xf:typeof define=="function"&&define.amd?define([],function(){return Xf}):typeof va=="object"&&(va.PathKitInit=Xf)});var kI={toSorted(e){"use strict";if(e!==void 0&&typeof e!="function")throw new TypeError("Array comparator must be a function.");if(this==null)throw new TypeError("Cannot sort a null or undefined value.");return Array.from({length:this.length},(t,n)=>this[n]).sort(e)},toReversed(){"use strict";if(this==null)throw new TypeError("Cannot reverse a null or undefined value.");let e=Array.from({length:this.length});for(let t=0;t<e.length;t++)e[t]=this[e.length-t-1];return e}};for(let[e,t]of Object.entries(kI))typeof Array.prototype[e]!="function"&&Object.defineProperty(Array.prototype,e,{value:t,configurable:!0,writable:!0});var Re=Uint8Array,it=Uint16Array,Ja=Int32Array,Io=new Re([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),To=new Re([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),$a=new Re([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),xd=function(e,t){for(var n=new it(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new Ja(n[30]),r=1;r<30;++r)for(var o=n[r];o<n[r+1];++o)i[o]=o-n[r]<<5|r;return{b:n,r:i}},Nd=xd(Io,2),Cd=Nd.b,Xa=Nd.r;Cd[28]=258,Xa[258]=28;var Od=xd(To,0),_I=Od.b,Td=Od.r,Ka=new it(32768);for(ge=0;ge<32768;++ge)$t=(ge&43690)>>1|(ge&21845)<<1,$t=($t&52428)>>2|($t&13107)<<2,$t=($t&61680)>>4|($t&3855)<<4,Ka[ge]=(($t&65280)>>8|($t&255)<<8)>>1;var $t,ge,wt=(function(e,t,n){for(var r=e.length,i=0,o=new it(t);i<r;++i)e[i]&&++o[e[i]-1];var s=new it(t);for(i=1;i<t;++i)s[i]=s[i-1]+o[i-1]<<1;var a;if(n){a=new it(1<<t);var l=15-t;for(i=0;i<r;++i)if(e[i])for(var u=i<<4|e[i],c=t-e[i],f=s[e[i]-1]++<<c,g=f|(1<<c)-1;f<=g;++f)a[Ka[f]>>l]=u}else for(a=new it(r),i=0;i<r;++i)e[i]&&(a[i]=Ka[s[e[i]-1]++]>>15-e[i]);return a}),un=new Re(288);for(ge=0;ge<144;++ge)un[ge]=8;var ge;for(ge=144;ge<256;++ge)un[ge]=9;var ge;for(ge=256;ge<280;++ge)un[ge]=7;var ge;for(ge=280;ge<288;++ge)un[ge]=8;var ge,Xr=new Re(32);for(ge=0;ge<32;++ge)Xr[ge]=5;var ge,LI=wt(un,9,0),VI=wt(un,9,1),FI=wt(Xr,5,0),GI=wt(Xr,5,1),za=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},bt=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Ha=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Qa=function(e){return(e+7)/8|0},Kr=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new Re(e.subarray(t,n))};var BI=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],ze=function(e,t,n){var r=new Error(t||BI[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,ze),!n)throw r;return r},UI=function(e,t,n,r){var i=e.length,o=r?r.length:0;if(!i||t.f&&!t.l)return n||new Re(0);var s=!n,a=s||t.i!=2,l=t.i;s&&(n=new Re(i*3));var u=function(Ce){var je=n.length;if(Ce>je){var Qe=new Re(Math.max(je*2,Ce));Qe.set(n),n=Qe}},c=t.f||0,f=t.p||0,g=t.b||0,h=t.l,d=t.d,v=t.m,T=t.n,E=i*8;do{if(!h){c=bt(e,f,1);var S=bt(e,f+1,3);if(f+=3,S)if(S==1)h=VI,d=GI,v=9,T=5;else if(S==2){var O=bt(e,f,31)+257,k=bt(e,f+10,15)+4,V=O+bt(e,f+5,31)+1;f+=14;for(var F=new Re(V),Q=new Re(19),ne=0;ne<k;++ne)Q[$a[ne]]=bt(e,f+ne*3,7);f+=k*3;for(var Y=za(Q),I=(1<<Y)-1,R=wt(Q,Y,1),ne=0;ne<V;){var x=R[bt(e,f,I)];f+=x&15;var C=x>>4;if(C<16)F[ne++]=C;else{var P=0,G=0;for(C==16?(G=3+bt(e,f,3),f+=2,P=F[ne-1]):C==17?(G=3+bt(e,f,7),f+=3):C==18&&(G=11+bt(e,f,127),f+=7);G--;)F[ne++]=P}}var D=F.subarray(0,O),w=F.subarray(O);v=za(D),T=za(w),h=wt(D,v,1),d=wt(w,T,1)}else ze(1);else{var C=Qa(f)+4,A=e[C-4]|e[C-3]<<8,_=C+A;if(_>i){l&&ze(0);break}a&&u(g+A),n.set(e.subarray(C,_),g),t.b=g+=A,t.p=f=_*8,t.f=c;continue}if(f>E){l&&ze(0);break}}a&&u(g+131072);for(var q=(1<<v)-1,Z=(1<<T)-1,X=f;;X=f){var P=h[Ha(e,f)&q],j=P>>4;if(f+=P&15,f>E){l&&ze(0);break}if(P||ze(2),j<256)n[g++]=j;else if(j==256){X=f,h=null;break}else{var ee=j-254;if(j>264){var ne=j-257,$=Io[ne];ee=bt(e,f,(1<<$)-1)+Cd[ne],f+=$}var le=d[Ha(e,f)&Z],B=le>>4;le||ze(3),f+=le&15;var w=_I[B];if(B>3){var $=To[B];w+=Ha(e,f)&(1<<$)-1,f+=$}if(f>E){l&&ze(0);break}a&&u(g+131072);var te=g+ee;if(g<w){var ae=o-w,ve=Math.min(w,te);for(ae+g<0&&ze(3);g<ve;++g)n[g]=r[ae+g]}for(;g<te;++g)n[g]=n[g-w]}}t.l=h,t.p=X,t.b=g,t.f=c,h&&(c=1,t.m=v,t.d=d,t.n=T)}while(!c);return g!=n.length&&s?Kr(n,0,g):n.subarray(0,g)},Xt=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},jr=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},Wa=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,o=n.slice();if(!i)return{t:Dd,l:0};if(i==1){var s=new Re(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(_,O){return _.f-O.f}),n.push({s:-1,f:25001});var a=n[0],l=n[1],u=0,c=1,f=2;for(n[0]={s:-1,f:a.f+l.f,l:a,r:l};c!=i-1;)a=n[n[u].f<n[f].f?u++:f++],l=n[u!=c&&n[u].f<n[f].f?u++:f++],n[c++]={s:-1,f:a.f+l.f,l:a,r:l};for(var g=o[0].s,r=1;r<i;++r)o[r].s>g&&(g=o[r].s);var h=new it(g+1),d=Ya(n[c-1],h,0);if(d>t){var r=0,v=0,T=d-t,E=1<<T;for(o.sort(function(O,k){return h[k.s]-h[O.s]||O.f-k.f});r<i;++r){var S=o[r].s;if(h[S]>t)v+=E-(1<<d-h[S]),h[S]=t;else break}for(v>>=T;v>0;){var C=o[r].s;h[C]<t?v-=1<<t-h[C]++-1:++r}for(;r>=0&&v;--r){var A=o[r].s;h[A]==t&&(--h[A],++v)}d=t}return{t:new Re(h),l:d}},Ya=function(e,t,n){return e.s==-1?Math.max(Ya(e.l,t,n+1),Ya(e.r,t,n+1)):t[e.s]=n},Sd=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new it(++t),r=0,i=e[0],o=1,s=function(l){n[r++]=l},a=1;a<=t;++a)if(e[a]==i&&a!=t)++o;else{if(!i&&o>2){for(;o>138;o-=138)s(32754);o>2&&(s(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(s(i),--o;o>6;o-=6)s(8304);o>2&&(s(o-3<<5|8208),o=0)}for(;o--;)s(i);o=1,i=e[a]}return{c:n.subarray(0,r),n:t}},$r=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},Rd=function(e,t,n){var r=n.length,i=Qa(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var o=0;o<r;++o)e[i+o+4]=n[o];return(i+4+r)*8},bd=function(e,t,n,r,i,o,s,a,l,u,c){Xt(t,c++,n),++i[256];for(var f=Wa(i,15),g=f.t,h=f.l,d=Wa(o,15),v=d.t,T=d.l,E=Sd(g),S=E.c,C=E.n,A=Sd(v),_=A.c,O=A.n,k=new it(19),V=0;V<S.length;++V)++k[S[V]&31];for(var V=0;V<_.length;++V)++k[_[V]&31];for(var F=Wa(k,7),Q=F.t,ne=F.l,Y=19;Y>4&&!Q[$a[Y-1]];--Y);var I=u+5<<3,R=$r(i,un)+$r(o,Xr)+s,x=$r(i,g)+$r(o,v)+s+14+3*Y+$r(k,Q)+2*k[16]+3*k[17]+7*k[18];if(l>=0&&I<=R&&I<=x)return Rd(t,c,e.subarray(l,l+u));var P,G,D,w;if(Xt(t,c,1+(x<R)),c+=2,x<R){P=wt(g,h,0),G=g,D=wt(v,T,0),w=v;var q=wt(Q,ne,0);Xt(t,c,C-257),Xt(t,c+5,O-1),Xt(t,c+10,Y-4),c+=14;for(var V=0;V<Y;++V)Xt(t,c+3*V,Q[$a[V]]);c+=3*Y;for(var Z=[S,_],X=0;X<2;++X)for(var j=Z[X],V=0;V<j.length;++V){var ee=j[V]&31;Xt(t,c,q[ee]),c+=Q[ee],ee>15&&(Xt(t,c,j[V]>>5&127),c+=j[V]>>12)}}else P=LI,G=un,D=FI,w=Xr;for(var V=0;V<a;++V){var $=r[V];if($>255){var ee=$>>18&31;jr(t,c,P[ee+257]),c+=G[ee+257],ee>7&&(Xt(t,c,$>>23&31),c+=Io[ee]);var le=$&31;jr(t,c,D[le]),c+=w[le],le>3&&(jr(t,c,$>>5&8191),c+=To[le])}else jr(t,c,P[$]),c+=G[$]}return jr(t,c,P[256]),c+G[256]},zI=new Ja([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Dd=new Re(0),HI=function(e,t,n,r,i,o){var s=o.z||e.length,a=new Re(r+s+5*(1+Math.ceil(s/7e3))+i),l=a.subarray(r,a.length-i),u=o.l,c=(o.r||0)&7;if(t){c&&(l[0]=o.r>>3);for(var f=zI[t-1],g=f>>13,h=f&8191,d=(1<<n)-1,v=o.p||new it(32768),T=o.h||new it(d+1),E=Math.ceil(n/3),S=2*E,C=function(zt){return(e[zt]^e[zt+1]<<E^e[zt+2]<<S)&d},A=new Ja(25e3),_=new it(288),O=new it(32),k=0,V=0,F=o.i||0,Q=0,ne=o.w||0,Y=0;F+2<s;++F){var I=C(F),R=F&32767,x=T[I];if(v[R]=x,T[I]=R,ne<=F){var P=s-F;if((k>7e3||Q>24576)&&(P>423||!u)){c=bd(e,l,0,A,_,O,V,Q,Y,F-Y,c),Q=k=V=0,Y=F;for(var G=0;G<286;++G)_[G]=0;for(var G=0;G<30;++G)O[G]=0}var D=2,w=0,q=h,Z=R-x&32767;if(P>2&&I==C(F-Z))for(var X=Math.min(g,P)-1,j=Math.min(32767,F),ee=Math.min(258,P);Z<=j&&--q&&R!=x;){if(e[F+D]==e[F+D-Z]){for(var $=0;$<ee&&e[F+$]==e[F+$-Z];++$);if($>D){if(D=$,w=Z,$>X)break;for(var le=Math.min(Z,$-2),B=0,G=0;G<le;++G){var te=F-Z+G&32767,ae=v[te],ve=te-ae&32767;ve>B&&(B=ve,x=te)}}}R=x,x=v[R],Z+=R-x&32767}if(w){A[Q++]=268435456|Xa[D]<<18|Td[w];var Ce=Xa[D]&31,je=Td[w]&31;V+=Io[Ce]+To[je],++_[257+Ce],++O[je],ne=F+D,++k}else A[Q++]=e[F],++_[e[F]]}}for(F=Math.max(F,ne);F<s;++F)A[Q++]=e[F],++_[e[F]];c=bd(e,l,u,A,_,O,V,Q,Y,F-Y,c),u||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=T,o.p=v,o.i=F,o.w=ne)}else{for(var F=o.w||0;F<s+u;F+=65535){var Qe=F+65535;Qe>=s&&(l[c/8|0]=u,Qe=s),c=Rd(l,c+1,e.subarray(F,Qe))}o.i=s}return Kr(a,0,r+Qa(c)+i)},WI=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),jI=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=WI[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var $I=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var o=t.dictionary.subarray(-32768),s=new Re(o.length+e.length);s.set(o),s.set(e,o.length),e=s,i.w=o.length}return HI(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)},Md=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n};var Pt=function(e,t){return e[t]|e[t+1]<<8},pt=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},ja=function(e,t){return pt(e,t)+pt(e,t+4)*4294967296},Ue=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function Yr(e,t){return $I(e,t||{},0,0)}function er(e,t){return UI(e,{i:2},t&&t.out,t&&t.dictionary)}var Pd=function(e,t,n,r){for(var i in e){var o=e[i],s=t+i,a=r;Array.isArray(o)&&(a=Md(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?n[s]=[o,a]:(n[s+="/"]=[new Re(0),a],Pd(o,s,n,r))}},Ed=typeof TextEncoder<"u"&&new TextEncoder,qa=typeof TextDecoder<"u"&&new TextDecoder,XI=0;try{qa.decode(Dd,{stream:!0}),XI=1}catch{}var KI=function(e){for(var t="",n=0;;){var r=e[n++],i=(r>127)+(r>223)+(r>239);if(n+i>e.length)return{s:t,r:Kr(e,n-1)};i?i==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function vo(e,t){if(t){for(var n=new Re(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(Ed)return Ed.encode(e);for(var i=e.length,o=new Re(e.length+(e.length>>1)),s=0,a=function(c){o[s++]=c},r=0;r<i;++r){if(s+5>o.length){var l=new Re(s+8+(i-r<<1));l.set(o),o=l}var u=e.charCodeAt(r);u<128||t?a(u):u<2048?(a(192|u>>6),a(128|u&63)):u>55295&&u<57344?(u=65536+(u&1047552)|e.charCodeAt(++r)&1023,a(240|u>>18),a(128|u>>12&63),a(128|u>>6&63),a(128|u&63)):(a(224|u>>12),a(128|u>>6&63),a(128|u&63))}return Kr(o,0,s)}function el(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(qa)return qa.decode(e);var i=KI(e),o=i.s,n=i.r;return n.length&&ze(8),o}}var YI=function(e,t){return t+30+Pt(e,t+26)+Pt(e,t+28)},qI=function(e,t,n){var r=Pt(e,t+28),i=Pt(e,t+30),o=el(e.subarray(t+46,t+46+r),!(Pt(e,t+8)&2048)),s=t+46+r,a=ZI(e,s,i,n,pt(e,t+20),pt(e,t+24),pt(e,t+42)),l=a[0],u=a[1],c=a[2];return[Pt(e,t+10),l,u,o,s+i+Pt(e,t+32),c]},ZI=function(e,t,n,r,i,o,s){var a=i==4294967295,l=o==4294967295,u=s==4294967295,c=t+n,f=a+l+u;if(r&&f){for(;t+4<c;t+=4+Pt(e,t+2))if(Pt(e,t)==1)return[a?ja(e,t+4+8*l):i,l?ja(e,t+4):o,u?ja(e,t+4+8*(l+a)):s,1];r<2&&ze(13)}return[i,o,s,0]},Za=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&ze(9),t+=r+4}return t},Ad=function(e,t,n,r,i,o,s,a){var l=r.length,u=n.extra,c=a&&a.length,f=Za(u);Ue(e,t,s!=null?33639248:67324752),t+=4,s!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(o<0&&8),e[t++]=i&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var g=new Date(n.mtime==null?Date.now():n.mtime),h=g.getFullYear()-1980;if((h<0||h>119)&&ze(10),Ue(e,t,h<<25|g.getMonth()+1<<21|g.getDate()<<16|g.getHours()<<11|g.getMinutes()<<5|g.getSeconds()>>1),t+=4,o!=-1&&(Ue(e,t,n.crc),Ue(e,t+4,o<0?-o-2:o),Ue(e,t+8,n.size)),Ue(e,t+12,l),Ue(e,t+14,f),t+=16,s!=null&&(Ue(e,t,c),Ue(e,t+6,n.attrs),Ue(e,t+10,s),t+=14),e.set(r,t),t+=l,f)for(var d in u){var v=u[d],T=v.length;Ue(e,t,+d),Ue(e,t+2,T),e.set(v,t+4),t+=4+T}return c&&(e.set(a,t),t+=c),t},JI=function(e,t,n,r,i){Ue(e,t,101010256),Ue(e,t+8,n),Ue(e,t+10,n),Ue(e,t+12,r),Ue(e,t+16,i)};function tr(e,t){t||(t={});var n={},r=[];Pd(e,"",n,t);var i=0,o=0;for(var s in n){var a=n[s],l=a[0],u=a[1],c=u.level==0?0:8,f=vo(s),g=f.length,h=u.comment,d=h&&vo(h),v=d&&d.length,T=Za(u.extra);g>65535&&ze(11);var E=c?Yr(l,u):l,S=E.length,C=jI();C.p(l),r.push(Md(u,{size:l.length,crc:C.d(),c:E,f,m:d,u:g!=s.length||d&&h.length!=v,o:i,compression:c})),i+=30+g+T+S,o+=76+2*(g+T)+(v||0)+S}for(var A=new Re(o+22),_=i,O=o-i,k=0;k<r.length;++k){var f=r[k];Ad(A,f.o,f,f.f,f.u,f.c.length);var V=30+f.f.length+Za(f.extra);A.set(f.c,f.o+V),Ad(A,i,f,f.f,f.u,f.c.length,f.o,f.m),i+=16+V+(f.m?f.m.length:0)}return JI(A,i,r.length,O,_),A}function nr(e,t){for(var n={},r=e.length-22;pt(e,r)!=101010256;--r)(!r||e.length-r>65558)&&ze(13);var i=Pt(e,r+8);if(!i)return{};var o=pt(e,r+16),s=pt(e,r-20)==117853008;if(s){var a=pt(e,r-12);s=pt(e,a)==101075792,s&&(i=pt(e,a+32),o=pt(e,a+48))}for(var l=t&&t.filter,u=0;u<i;++u){var c=qI(e,o,s),f=c[0],g=c[1],h=c[2],d=c[3],v=c[4],T=c[5],E=YI(e,T);o=v,(!l||l({name:d,size:g,originalSize:h,compression:f}))&&(f?f==8?n[d]=er(e.subarray(E,E+g),{out:new Re(h)}):ze(14,"unknown compression type "+f):n[d]=Kr(e,E,E+g))}return n}var gf=yo(Eo(),1);var IT=(e,t)=>{if(typeof e=="number"){if(t===3)return{mode:"rgb",r:(e>>8&15|e>>4&240)/255,g:(e>>4&15|e&240)/255,b:(e&15|e<<4&240)/255};if(t===4)return{mode:"rgb",r:(e>>12&15|e>>8&240)/255,g:(e>>8&15|e>>4&240)/255,b:(e>>4&15|e&240)/255,alpha:(e&15|e<<4&240)/255};if(t===6)return{mode:"rgb",r:(e>>16&255)/255,g:(e>>8&255)/255,b:(e&255)/255};if(t===8)return{mode:"rgb",r:(e>>24&255)/255,g:(e>>16&255)/255,b:(e>>8&255)/255,alpha:(e&255)/255}}},Ao=IT;var TT={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xd=TT;var ST=e=>Ao(Xd[e.toLowerCase()],6),Kd=ST;var bT=/^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i,ET=e=>{let t;return(t=e.match(bT))?Ao(parseInt(t[1],16),t[1].length):void 0},Yd=ET;var Ye="([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)",GD=`(?:${Ye}|none)`,On=`${Ye}%`,BD=`(?:${Ye}%|none)`,Qr=`(?:${Ye}%|${Ye})`,AT=`(?:${Ye}%|${Ye}|none)`,qd=`(?:${Ye}(deg|grad|rad|turn)|${Ye})`,UD=`(?:${Ye}(deg|grad|rad|turn)|${Ye}|none)`,fn="\\s*,\\s*";var zD=new RegExp("^"+AT+"$");var xT=new RegExp(`^rgba?\\(\\s*${Ye}${fn}${Ye}${fn}${Ye}\\s*(?:,\\s*${Qr}\\s*)?\\)$`),NT=new RegExp(`^rgba?\\(\\s*${On}${fn}${On}${fn}${On}\\s*(?:,\\s*${Qr}\\s*)?\\)$`),CT=e=>{let t={mode:"rgb"},n;if(n=e.match(xT))n[1]!==void 0&&(t.r=n[1]/255),n[2]!==void 0&&(t.g=n[2]/255),n[3]!==void 0&&(t.b=n[3]/255);else if(n=e.match(NT))n[1]!==void 0&&(t.r=n[1]/100),n[2]!==void 0&&(t.g=n[2]/100),n[3]!==void 0&&(t.b=n[3]/100);else return;return n[4]!==void 0?t.alpha=Math.max(0,Math.min(1,n[4]/100)):n[5]!==void 0&&(t.alpha=Math.max(0,Math.min(1,+n[5]))),t},Zd=CT;var OT=(e,t)=>e===void 0?void 0:typeof e!="object"?rl(e):e.mode!==void 0?e:t?{...e,mode:t}:void 0,ir=OT;var RT=(e="rgb")=>t=>(t=ir(t,e))!==void 0?t.mode===e?t:At[t.mode][e]?At[t.mode][e](t):e==="rgb"?At[t.mode].rgb(t):At.rgb[e](At[t.mode].rgb(t)):void 0,Ve=RT;var At={},Jd={},ei=[],il={},DT=e=>e,ye=e=>(At[e.mode]={...At[e.mode],...e.toMode},Object.keys(e.fromMode||{}).forEach(t=>{At[t]||(At[t]={}),At[t][e.mode]=e.fromMode[t]}),e.ranges||(e.ranges={}),e.difference||(e.difference={}),e.channels.forEach(t=>{if(e.ranges[t]===void 0&&(e.ranges[t]=[0,1]),!e.interpolate[t])throw new Error(`Missing interpolator for: ${t}`);typeof e.interpolate[t]=="function"&&(e.interpolate[t]={use:e.interpolate[t]}),e.interpolate[t].fixup||(e.interpolate[t].fixup=DT)}),Jd[e.mode]=e,(e.parse||[]).forEach(t=>{MT(t,e.mode)}),Ve(e.mode)),Kt=e=>Jd[e],MT=(e,t)=>{if(typeof e=="string"){if(!t)throw new Error("'mode' required when 'parser' is a string");il[e]=t}else typeof e=="function"&&ei.indexOf(e)<0&&ei.push(e)};var ol=/[^\x00-\x7F]|[a-zA-Z_]/,PT=/[^\x00-\x7F]|[-\w]/,U={Function:"function",Ident:"ident",Number:"number",Percentage:"percentage",ParenClose:")",None:"none",Hue:"hue",Alpha:"alpha"},ue=0;function xo(e){let t=e[ue],n=e[ue+1];return t==="-"||t==="+"?/\d/.test(n)||n==="."&&/\d/.test(e[ue+2]):t==="."?/\d/.test(n):/\d/.test(t)}function sl(e){if(ue>=e.length)return!1;let t=e[ue];if(ol.test(t))return!0;if(t==="-"){if(e.length-ue<2)return!1;let n=e[ue+1];return!!(n==="-"||ol.test(n))}return!1}var wT={deg:1,rad:180/Math.PI,grad:9/10,turn:360};function ti(e){let t="";if((e[ue]==="-"||e[ue]==="+")&&(t+=e[ue++]),t+=No(e),e[ue]==="."&&/\d/.test(e[ue+1])&&(t+=e[ue++]+No(e)),(e[ue]==="e"||e[ue]==="E")&&((e[ue+1]==="-"||e[ue+1]==="+")&&/\d/.test(e[ue+2])?t+=e[ue++]+e[ue++]+No(e):/\d/.test(e[ue+1])&&(t+=e[ue++]+No(e))),sl(e)){let n=Co(e);return n==="deg"||n==="rad"||n==="turn"||n==="grad"?{type:U.Hue,value:t*wT[n]}:void 0}return e[ue]==="%"?(ue++,{type:U.Percentage,value:+t}):{type:U.Number,value:+t}}function No(e){let t="";for(;/\d/.test(e[ue]);)t+=e[ue++];return t}function Co(e){let t="";for(;ue<e.length&&PT.test(e[ue]);)t+=e[ue++];return t}function kT(e){let t=Co(e);return e[ue]==="("?(ue++,{type:U.Function,value:t}):t==="none"?{type:U.None,value:void 0}:{type:U.Ident,value:t}}function _T(e=""){let t=e.trim(),n=[],r;for(ue=0;ue<t.length;){if(r=t[ue++],r===`
`||r==="	"||r===" "){for(;ue<t.length&&(t[ue]===`
`||t[ue]==="	"||t[ue]===" ");)ue++;continue}if(r===",")return;if(r===")"){n.push({type:U.ParenClose});continue}if(r==="+"){if(ue--,xo(t)){n.push(ti(t));continue}return}if(r==="-"){if(ue--,xo(t)){n.push(ti(t));continue}if(sl(t)){n.push({type:U.Ident,value:Co(t)});continue}return}if(r==="."){if(ue--,xo(t)){n.push(ti(t));continue}return}if(r==="/"){for(;ue<t.length&&(t[ue]===`
`||t[ue]==="	"||t[ue]===" ");)ue++;let i;if(xo(t)&&(i=ti(t),i.type!==U.Hue)){n.push({type:U.Alpha,value:i});continue}if(sl(t)&&Co(t)==="none"){n.push({type:U.Alpha,value:{type:U.None,value:void 0}});continue}return}if(/\d/.test(r)){ue--,n.push(ti(t));continue}if(ol.test(r)){ue--,n.push(kT(t));continue}return}return n}function LT(e){e._i=0;let t=e[e._i++];if(!t||t.type!==U.Function||t.value!=="color"||(t=e[e._i++],t.type!==U.Ident))return;let n=il[t.value];if(!n)return;let r={mode:n},i=Qd(e,!1);if(!i)return;let o=Kt(n).channels;for(let s=0,a,l;s<o.length;s++)a=i[s],l=o[s],a.type!==U.None&&(r[l]=a.type===U.Number?a.value:a.value/100,l==="alpha"&&(r[l]=Math.max(0,Math.min(1,r[l]))));return r}function Qd(e,t){let n=[],r;for(;e._i<e.length;){if(r=e[e._i++],r.type===U.None||r.type===U.Number||r.type===U.Alpha||r.type===U.Percentage||t&&r.type===U.Hue){n.push(r);continue}if(r.type===U.ParenClose){if(e._i<e.length)return;continue}return}if(!(n.length<3||n.length>4)){if(n.length===4){if(n[3].type!==U.Alpha)return;n[3]=n[3].value}return n.length===3&&n.push({type:U.None,value:void 0}),n.every(i=>i.type!==U.Alpha)?n:void 0}}function VT(e,t){e._i=0;let n=e[e._i++];if(!n||n.type!==U.Function)return;let r=Qd(e,t);if(r)return r.unshift(n.value),r}var FT=e=>{if(typeof e!="string")return;let t=_T(e),n=t?VT(t,!0):void 0,r,i=0,o=ei.length;for(;i<o;)if((r=ei[i++](e,n))!==void 0)return r;return t?LT(t):void 0},rl=FT;function GT(e,t){if(!t||t[0]!=="rgb"&&t[0]!=="rgba")return;let n={mode:"rgb"},[,r,i,o,s]=t;if(!(r.type===U.Hue||i.type===U.Hue||o.type===U.Hue))return r.type!==U.None&&(n.r=r.type===U.Number?r.value/255:r.value/100),i.type!==U.None&&(n.g=i.type===U.Number?i.value/255:i.value/100),o.type!==U.None&&(n.b=o.type===U.Number?o.value/255:o.value/100),s.type!==U.None&&(n.alpha=Math.min(1,Math.max(0,s.type===U.Number?s.value:s.value/100))),n}var ep=GT;var BT=e=>e==="transparent"?{mode:"rgb",r:0,g:0,b:0,alpha:0}:void 0,tp=BT;var np=(e,t,n)=>e+n*(t-e);var UT=e=>{let t=[];for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1];r===void 0&&i===void 0?t.push(void 0):r!==void 0&&i!==void 0?t.push([r,i]):t.push(r!==void 0?[r,r]:[i,i])}return t},rp=e=>t=>{let n=UT(t);return r=>{let i=r*n.length,o=r>=1?n.length-1:Math.max(Math.floor(i),0),s=n[o];return s===void 0?void 0:e(s[0],s[1],i-o)}};var W=rp(np);var fe=e=>{let t=!1,n=e.map(r=>r!==void 0?(t=!0,r):1);return t?n:e};var zT={mode:"rgb",channels:["r","g","b","alpha"],parse:[ep,Yd,Zd,Kd,tp,"srgb"],serialize:"srgb",interpolate:{r:W,g:W,b:W,alpha:{use:W,fixup:fe}},gamut:!0,white:{r:1,g:1,b:1},black:{r:0,g:0,b:0}},mt=zT;var al=(e=0)=>Math.pow(Math.abs(e),2.19921875)*Math.sign(e),HT=e=>{let t=al(e.r),n=al(e.g),r=al(e.b),i={mode:"xyz65",x:.5766690429101305*t+.1855582379065463*n+.1882286462349947*r,y:.297344975250536*t+.6273635662554661*n+.0752914584939979*r,z:.0270313613864123*t+.0706888525358272*n+.9913375368376386*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},ll=HT;var ul=e=>Math.pow(Math.abs(e),.4547069271758437)*Math.sign(e),WT=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"a98",r:ul(e*2.0415879038107465-t*.5650069742788597-.3447313507783297*n),g:ul(e*-.9692436362808798+t*1.8759675015077206+.0415550574071756*n),b:ul(e*.0134442806320312-t*.1183623922310184+1.0151749943912058*n)};return r!==void 0&&(i.alpha=r),i},cl=WT;var fl=(e=0)=>{let t=Math.abs(e);return t<=.04045?e/12.92:(Math.sign(e)||1)*Math.pow((t+.055)/1.055,2.4)},jT=({r:e,g:t,b:n,alpha:r})=>{let i={mode:"lrgb",r:fl(e),g:fl(t),b:fl(n)};return r!==void 0&&(i.alpha=r),i},ht=jT;var $T=e=>{let{r:t,g:n,b:r,alpha:i}=ht(e),o={mode:"xyz65",x:.4123907992659593*t+.357584339383878*n+.1804807884018343*r,y:.2126390058715102*t+.715168678767756*n+.0721923153607337*r,z:.0193308187155918*t+.119194779794626*n+.9505321522496607*r};return i!==void 0&&(o.alpha=i),o},et=$T;var dl=(e=0)=>{let t=Math.abs(e);return t>.0031308?(Math.sign(e)||1)*(1.055*Math.pow(t,.4166666666666667)-.055):e*12.92},XT=({r:e,g:t,b:n,alpha:r},i="rgb")=>{let o={mode:i,r:dl(e),g:dl(t),b:dl(n)};return r!==void 0&&(o.alpha=r),o},gt=XT;var KT=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=gt({r:e*3.2409699419045226-t*1.537383177570094-.4986107602930034*n,g:e*-.9692436362808796+t*1.8759675015077204+.0415550574071756*n,b:e*.0556300796969936-t*.2039769588889765+1.0569715142428784*n});return r!==void 0&&(i.alpha=r),i},tt=KT;var YT={...mt,mode:"a98",parse:["a98-rgb"],serialize:"a98-rgb",fromMode:{rgb:e=>cl(et(e)),xyz65:cl},toMode:{rgb:e=>tt(ll(e)),xyz65:ll}},ip=YT;var qT=e=>(e=e%360)<0?e+360:e,Ie=qT;var ZT=(e,t)=>e.map((n,r,i)=>{if(n===void 0)return n;let o=Ie(n);return r===0||e[r-1]===void 0?o:t(o-Ie(i[r-1]))}).reduce((n,r)=>!n.length||r===void 0||n[n.length-1]===void 0?(n.push(r),n):(n.push(r+n[n.length-1]),n),[]),Fe=e=>ZT(e,t=>Math.abs(t)<=180?t:t-360*Math.sign(t));var ke=[-.14861,1.78277,-.29227,-.90649,1.97294,0],op=Math.PI/180,sp=180/Math.PI;var ap=ke[3]*ke[4],lp=ke[1]*ke[4],up=ke[1]*ke[2]-ke[0]*ke[3],JT=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(up*n+e*ap-t*lp)/(up+ap-lp),o=n-i,s=(ke[4]*(t-i)-ke[2]*o)/ke[3],a={mode:"cubehelix",l:i,s:i===0||i===1?void 0:Math.sqrt(o*o+s*s)/(ke[4]*i*(1-i))};return a.s&&(a.h=Math.atan2(s,o)*sp-120),r!==void 0&&(a.alpha=r),a},cp=JT;var QT=({h:e,s:t,l:n,alpha:r})=>{let i={mode:"rgb"};e=(e===void 0?0:e+120)*op,n===void 0&&(n=0);let o=t===void 0?0:t*n*(1-n),s=Math.cos(e),a=Math.sin(e);return i.r=n+o*(ke[0]*s+ke[1]*a),i.g=n+o*(ke[2]*s+ke[3]*a),i.b=n+o*(ke[4]*s+ke[5]*a),r!==void 0&&(i.alpha=r),i},fp=QT;var Yt=(e,t)=>{if(e.h===void 0||t.h===void 0||!e.s||!t.s)return 0;let n=Ie(e.h),r=Ie(t.h),i=Math.sin((r-n+360)/2*Math.PI/180);return 2*Math.sqrt(e.s*t.s)*i},pl=(e,t)=>{if(e.h===void 0||t.h===void 0)return 0;let n=Ie(e.h),r=Ie(t.h);return Math.abs(r-n)>180?n-(r-360*Math.sign(r-n)):r-n},qt=(e,t)=>{if(e.h===void 0||t.h===void 0||!e.c||!t.c)return 0;let n=Ie(e.h),r=Ie(t.h),i=Math.sin((r-n+360)/2*Math.PI/180);return 2*Math.sqrt(e.c*t.c)*i},ni=(e="rgb",t=[1,1,1,0])=>{let n=Kt(e),r=n.channels,i=n.difference,o=Ve(e);return(s,a)=>{let l=o(s),u=o(a);return Math.sqrt(r.reduce((c,f,g)=>{let h=i[f]?i[f](l,u):l[f]-u[f];return c+(t[g]||0)*Math.pow(isNaN(h)?0:h,2)},0))}};var Ge=e=>{let t=e.reduce((r,i)=>{if(i!==void 0){let o=i*Math.PI/180;r.sin+=Math.sin(o),r.cos+=Math.cos(o)}return r},{sin:0,cos:0}),n=Math.atan2(t.sin,t.cos)*180/Math.PI;return n<0?360+n:n};var eS={mode:"cubehelix",channels:["h","s","l","alpha"],parse:["--cubehelix"],serialize:"--cubehelix",ranges:{h:[0,360],s:[0,4.614],l:[0,1]},fromMode:{rgb:cp},toMode:{rgb:fp},interpolate:{h:{use:W,fixup:Fe},s:W,l:W,alpha:{use:W,fixup:fe}},difference:{h:Yt},average:{h:Ge}},dp=eS;var tS=({l:e,a:t,b:n,alpha:r},i="lch")=>{t===void 0&&(t=0),n===void 0&&(n=0);let o=Math.sqrt(t*t+n*n),s={mode:i,l:e,c:o};return o&&(s.h=Ie(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(s.alpha=r),s},ot=tS;var nS=({l:e,c:t,h:n,alpha:r},i="lab")=>{n===void 0&&(n=0);let o={mode:i,l:e,a:t?t*Math.cos(n/180*Math.PI):0,b:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(o.alpha=r),o},st=nS;var Oo=Math.pow(29,3)/Math.pow(3,3),Ro=Math.pow(6,3)/Math.pow(29,3);var xe={X:.9642956764295677,Y:1,Z:.8251046025104602},dn={X:.3127/.329,Y:1,Z:(1-.3127-.329)/.329},rM=Math.pow(29,3)/Math.pow(3,3),iM=Math.pow(6,3)/Math.pow(29,3);var ml=e=>Math.pow(e,3)>Ro?Math.pow(e,3):(116*e-16)/Oo,rS=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+16)/116,o=t/500+i,s=i-n/200,a={mode:"xyz65",x:ml(o)*dn.X,y:ml(i)*dn.Y,z:ml(s)*dn.Z};return r!==void 0&&(a.alpha=r),a},Do=rS;var iS=e=>tt(Do(e)),pn=iS;var hl=e=>e>Ro?Math.cbrt(e):(Oo*e+16)/116,oS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=hl(e/dn.X),o=hl(t/dn.Y),s=hl(n/dn.Z),a={mode:"lab65",l:116*o-16,a:500*(i-o),b:200*(o-s)};return r!==void 0&&(a.alpha=r),a},Mo=oS;var sS=e=>{let t=Mo(et(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},mn=sS;var Rn=.14444444444444443*Math.PI,or=Math.cos(Rn),sr=Math.sin(Rn),Po=100/Math.log(139/100);var aS=({l:e,c:t,h:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"lab65",l:(Math.exp(e*1/Po)-1)/.0039},o=(Math.exp(.0435*t*1*1)-1)/.075,s=o*Math.cos(n/180*Math.PI-Rn),a=o*Math.sin(n/180*Math.PI-Rn);return i.a=s*or-a/.83*sr,i.b=s*sr+a/.83*or,r!==void 0&&(i.alpha=r),i},ii=aS;var lS=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=t*or+n*sr,o=.83*(n*or-t*sr),s=Math.sqrt(i*i+o*o),a={mode:"dlch",l:Po/1*Math.log(1+.0039*e),c:Math.log(1+.075*s)/(.0435*1*1)};return a.c&&(a.h=Ie((Math.atan2(o,i)+Rn)/Math.PI*180)),r!==void 0&&(a.alpha=r),a},oi=lS;var pp=e=>ii(ot(e,"dlch")),mp=e=>st(oi(e),"dlab"),uS={mode:"dlab",parse:["--din99o-lab"],serialize:"--din99o-lab",toMode:{lab65:pp,rgb:e=>pn(pp(e))},fromMode:{lab65:mp,rgb:e=>mp(mn(e))},channels:["l","a","b","alpha"],ranges:{l:[0,100],a:[-40.09,45.501],b:[-40.469,44.344]},interpolate:{l:W,a:W,b:W,alpha:{use:W,fixup:fe}}},hp=uS;var cS={mode:"dlch",parse:["--din99o-lch"],serialize:"--din99o-lch",toMode:{lab65:ii,dlab:e=>st(e,"dlab"),rgb:e=>pn(ii(e))},fromMode:{lab65:oi,dlab:e=>ot(e,"dlch"),rgb:e=>oi(mn(e))},channels:["l","c","h","alpha"],ranges:{l:[0,100],c:[0,51.484],h:[0,360]},interpolate:{l:W,c:W,h:{use:W,fixup:Fe},alpha:{use:W,fixup:fe}},difference:{h:qt},average:{h:Ge}},gp=cS;function yl({h:e,s:t,i:n,alpha:r}){e=Ie(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o={r:n*(1+t*(3/(2-i)-1)),g:n*(1+t*(3*(1-i)/(2-i)-1)),b:n*(1-t)};break;case 1:o={r:n*(1+t*(3*(1-i)/(2-i)-1)),g:n*(1+t*(3/(2-i)-1)),b:n*(1-t)};break;case 2:o={r:n*(1-t),g:n*(1+t*(3/(2-i)-1)),b:n*(1+t*(3*(1-i)/(2-i)-1))};break;case 3:o={r:n*(1-t),g:n*(1+t*(3*(1-i)/(2-i)-1)),b:n*(1+t*(3/(2-i)-1))};break;case 4:o={r:n*(1+t*(3*(1-i)/(2-i)-1)),g:n*(1-t),b:n*(1+t*(3/(2-i)-1))};break;case 5:o={r:n*(1+t*(3/(2-i)-1)),g:n*(1-t),b:n*(1+t*(3*(1-i)/(2-i)-1))};break;default:o={r:n*(1-t),g:n*(1-t),b:n*(1-t)}}return o.mode="rgb",r!==void 0&&(o.alpha=r),o}function vl({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsi",s:e+t+n===0?0:1-3*o/(e+t+n),i:(e+t+n)/3};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var fS={mode:"hsi",toMode:{rgb:yl},parse:["--hsi"],serialize:"--hsi",fromMode:{rgb:vl},channels:["h","s","i","alpha"],ranges:{h:[0,360]},gamut:"rgb",interpolate:{h:{use:W,fixup:Fe},s:W,i:W,alpha:{use:W,fixup:fe}},difference:{h:Yt},average:{h:Ge}},yp=fS;function Il({h:e,s:t,l:n,alpha:r}){e=Ie(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=n+t*(n<.5?n:1-n),o=i-(i-n)*2*Math.abs(e/60%2-1),s;switch(Math.floor(e/60)){case 0:s={r:i,g:o,b:2*n-i};break;case 1:s={r:o,g:i,b:2*n-i};break;case 2:s={r:2*n-i,g:i,b:o};break;case 3:s={r:2*n-i,g:o,b:i};break;case 4:s={r:o,g:2*n-i,b:i};break;case 5:s={r:i,g:2*n-i,b:o};break;default:s={r:2*n-i,g:2*n-i,b:2*n-i}}return s.mode="rgb",r!==void 0&&(s.alpha=r),s}function Tl({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsl",s:i===o?0:(i-o)/(1-Math.abs(i+o-1)),l:.5*(i+o)};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var dS=(e,t)=>{switch(t){case"deg":return+e;case"rad":return e/Math.PI*180;case"grad":return e/10*9;case"turn":return e*360}},vp=dS;var pS=new RegExp(`^hsla?\\(\\s*${qd}${fn}${On}${fn}${On}\\s*(?:,\\s*${Qr}\\s*)?\\)$`),mS=e=>{let t=e.match(pS);if(!t)return;let n={mode:"hsl"};return t[3]!==void 0?n.h=+t[3]:t[1]!==void 0&&t[2]!==void 0&&(n.h=vp(t[1],t[2])),t[4]!==void 0&&(n.s=Math.min(Math.max(0,t[4]/100),1)),t[5]!==void 0&&(n.l=Math.min(Math.max(0,t[5]/100),1)),t[6]!==void 0?n.alpha=Math.max(0,Math.min(1,t[6]/100)):t[7]!==void 0&&(n.alpha=Math.max(0,Math.min(1,+t[7]))),n},Ip=mS;function hS(e,t){if(!t||t[0]!=="hsl"&&t[0]!=="hsla")return;let n={mode:"hsl"},[,r,i,o,s]=t;if(r.type!==U.None){if(r.type===U.Percentage)return;n.h=r.value}if(i.type!==U.None){if(i.type===U.Hue)return;n.s=i.value/100}if(o.type!==U.None){if(o.type===U.Hue)return;n.l=o.value/100}return s.type!==U.None&&(n.alpha=Math.min(1,Math.max(0,s.type===U.Number?s.value:s.value/100))),n}var Tp=hS;var gS={mode:"hsl",toMode:{rgb:Il},fromMode:{rgb:Tl},channels:["h","s","l","alpha"],ranges:{h:[0,360]},gamut:"rgb",parse:[Tp,Ip],serialize:e=>`hsl(${e.h!==void 0?e.h:"none"} ${e.s!==void 0?e.s*100+"%":"none"} ${e.l!==void 0?e.l*100+"%":"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:W,fixup:Fe},s:W,l:W,alpha:{use:W,fixup:fe}},difference:{h:Yt},average:{h:Ge}},wo=gS;function si({h:e,s:t,v:n,alpha:r}){e=Ie(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o={r:n,g:n*(1-t*i),b:n*(1-t)};break;case 1:o={r:n*(1-t*i),g:n,b:n*(1-t)};break;case 2:o={r:n*(1-t),g:n,b:n*(1-t*i)};break;case 3:o={r:n*(1-t),g:n*(1-t*i),b:n};break;case 4:o={r:n*(1-t*i),g:n*(1-t),b:n};break;case 5:o={r:n,g:n*(1-t),b:n*(1-t*i)};break;default:o={r:n*(1-t),g:n*(1-t),b:n*(1-t)}}return o.mode="rgb",r!==void 0&&(o.alpha=r),o}function ai({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsv",s:i===0?0:1-o/i,v:i};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var yS={mode:"hsv",toMode:{rgb:si},parse:["--hsv"],serialize:"--hsv",fromMode:{rgb:ai},channels:["h","s","v","alpha"],ranges:{h:[0,360]},gamut:"rgb",interpolate:{h:{use:W,fixup:Fe},s:W,v:W,alpha:{use:W,fixup:fe}},difference:{h:Yt},average:{h:Ge}},ko=yS;function Sl({h:e,w:t,b:n,alpha:r}){if(t===void 0&&(t=0),n===void 0&&(n=0),t+n>1){let i=t+n;t/=i,n/=i}return si({h:e,s:n===1?1:1-t/(1-n),v:1-n,alpha:r})}function bl(e){let t=ai(e);if(t===void 0)return;let n=t.s!==void 0?t.s:0,r=t.v!==void 0?t.v:0,i={mode:"hwb",w:(1-n)*r,b:1-r};return t.h!==void 0&&(i.h=t.h),t.alpha!==void 0&&(i.alpha=t.alpha),i}function vS(e,t){if(!t||t[0]!=="hwb")return;let n={mode:"hwb"},[,r,i,o,s]=t;if(r.type!==U.None){if(r.type===U.Percentage)return;n.h=r.value}if(i.type!==U.None){if(i.type===U.Hue)return;n.w=i.value/100}if(o.type!==U.None){if(o.type===U.Hue)return;n.b=o.value/100}return s.type!==U.None&&(n.alpha=Math.min(1,Math.max(0,s.type===U.Number?s.value:s.value/100))),n}var Sp=vS;var IS={mode:"hwb",toMode:{rgb:Sl},fromMode:{rgb:bl},channels:["h","w","b","alpha"],ranges:{h:[0,360]},gamut:"rgb",parse:[Sp],serialize:e=>`hwb(${e.h!==void 0?e.h:"none"} ${e.w!==void 0?e.w*100+"%":"none"} ${e.b!==void 0?e.b*100+"%":"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:W,fixup:Fe},w:W,b:W,alpha:{use:W,fixup:fe}},difference:{h:pl},average:{h:Ge}},bp=IS;var ar=.1593017578125,Ep=78.84375,lr=.8359375,ur=18.8515625,cr=18.6875;function _o(e){if(e<0)return 0;let t=Math.pow(e,1/Ep);return 1e4*Math.pow(Math.max(0,t-lr)/(ur-cr*t),1/ar)}function Lo(e){if(e<0)return 0;let t=Math.pow(e/1e4,ar);return Math.pow((lr+ur*t)/(1+cr*t),Ep)}var El=e=>Math.max(e/203,0),SS=({i:e,t,p:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=_o(e+.008609037037932761*t+.11102962500302593*n),o=_o(e-.00860903703793275*t-.11102962500302599*n),s=_o(e+.5600313357106791*t-.32062717498731885*n),a={mode:"xyz65",x:El(2.070152218389422*i-1.3263473389671556*o+.2066510476294051*s),y:El(.3647385209748074*i+.680566024947227*o-.0453045459220346*s),z:El(-.049747207535812*i-.0492609666966138*o+1.1880659249923042*s)};return r!==void 0&&(a.alpha=r),a},Al=SS;var xl=(e=0)=>Math.max(e*203,0),bS=({x:e,y:t,z:n,alpha:r})=>{let i=xl(e),o=xl(t),s=xl(n),a=Lo(.3592832590121217*i+.6976051147779502*o-.0358915932320289*s),l=Lo(-.1920808463704995*i+1.1004767970374323*o+.0753748658519118*s),u=Lo(.0070797844607477*i+.0748396662186366*o+.8433265453898765*s),c=.5*a+.5*l,f=1.61376953125*a-3.323486328125*l+1.709716796875*u,g=4.378173828125*a-4.24560546875*l-.132568359375*u,h={mode:"itp",i:c,t:f,p:g};return r!==void 0&&(h.alpha=r),h},Nl=bS;var ES={mode:"itp",channels:["i","t","p","alpha"],parse:["--ictcp"],serialize:"--ictcp",toMode:{xyz65:Al,rgb:e=>tt(Al(e))},fromMode:{xyz65:Nl,rgb:e=>Nl(et(e))},ranges:{i:[0,.581],t:[-.369,.272],p:[-.164,.331]},interpolate:{i:W,t:W,p:W,alpha:{use:W,fixup:fe}}},Ap=ES;var AS=134.03437499999998,xS=16295499532821565e-27,Cl=e=>{if(e<0)return 0;let t=Math.pow(e/1e4,ar);return Math.pow((lr+ur*t)/(1+cr*t),AS)},Ol=(e=0)=>Math.max(e*203,0),NS=({x:e,y:t,z:n,alpha:r})=>{e=Ol(e),t=Ol(t),n=Ol(n);let i=1.15*e-.15*n,o=.66*t+.34*e,s=Cl(.41478972*i+.579999*o+.014648*n),a=Cl(-.20151*i+1.120649*o+.0531008*n),l=Cl(-.0166008*i+.2648*o+.6684799*n),u=(s+a)/2,c={mode:"jab",j:.44*u/(1-.56*u)-xS,a:3.524*s-4.066708*a+.542708*l,b:.199076*s+1.096799*a-1.295875*l};return r!==void 0&&(c.alpha=r),c},Vo=NS;var CS=134.03437499999998,xp=16295499532821565e-27,Rl=e=>{if(e<0)return 0;let t=Math.pow(e,1/CS);return 1e4*Math.pow((lr-t)/(cr*t-ur),1/ar)},Dl=e=>e/203,OS=({j:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+xp)/(.44+.56*(e+xp)),o=Rl(i+.13860504*t+.058047316*n),s=Rl(i-.13860504*t-.058047316*n),a=Rl(i-.096019242*t-.8118919*n),l={mode:"xyz65",x:Dl(1.661373024652174*o-.914523081304348*s+.23136208173913045*a),y:Dl(-.3250758611844533*o+1.571847026732543*s-.21825383453227928*a),z:Dl(-.090982811*o-.31272829*s+1.5227666*a)};return r!==void 0&&(l.alpha=r),l},Fo=OS;var RS=e=>{let t=Vo(et(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},Go=RS;var DS=e=>tt(Fo(e)),Bo=DS;var MS={mode:"jab",channels:["j","a","b","alpha"],parse:["--jzazbz"],serialize:"--jzazbz",fromMode:{rgb:Go,xyz65:Vo},toMode:{rgb:Bo,xyz65:Fo},ranges:{j:[0,.222],a:[-.109,.129],b:[-.185,.134]},interpolate:{j:W,a:W,b:W,alpha:{use:W,fixup:fe}}},Np=MS;var PS=({j:e,a:t,b:n,alpha:r})=>{t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.sqrt(t*t+n*n),o={mode:"jch",j:e,c:i};return i&&(o.h=Ie(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(o.alpha=r),o},Ml=PS;var wS=({j:e,c:t,h:n,alpha:r})=>{n===void 0&&(n=0);let i={mode:"jab",j:e,a:t?t*Math.cos(n/180*Math.PI):0,b:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(i.alpha=r),i},Pl=wS;var kS={mode:"jch",parse:["--jzczhz"],serialize:"--jzczhz",toMode:{jab:Pl,rgb:e=>Bo(Pl(e))},fromMode:{rgb:e=>Ml(Go(e)),jab:Ml},channels:["j","c","h","alpha"],ranges:{j:[0,.221],c:[0,.19],h:[0,360]},interpolate:{h:{use:W,fixup:Fe},c:W,j:W,alpha:{use:W,fixup:fe}},difference:{h:qt},average:{h:Ge}},Cp=kS;var hn=Math.pow(29,3)/Math.pow(3,3),fr=Math.pow(6,3)/Math.pow(29,3);var wl=e=>Math.pow(e,3)>fr?Math.pow(e,3):(116*e-16)/hn,_S=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+16)/116,o=t/500+i,s=i-n/200,a={mode:"xyz50",x:wl(o)*xe.X,y:wl(i)*xe.Y,z:wl(s)*xe.Z};return r!==void 0&&(a.alpha=r),a},dr=_S;var LS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=gt({r:e*3.1341359569958707-t*1.6173863321612538-.4906619460083532*n,g:e*-.978795502912089+t*1.916254567259524+.03344273116131949*n,b:e*.07195537988411677-t*.2289768264158322+1.405386058324125*n});return r!==void 0&&(i.alpha=r),i},kt=LS;var VS=e=>kt(dr(e)),Uo=VS;var FS=e=>{let{r:t,g:n,b:r,alpha:i}=ht(e),o={mode:"xyz50",x:.436065742824811*t+.3851514688337912*n+.14307845442264197*r,y:.22249319175623702*t+.7168870538238823*n+.06061979053616537*r,z:.013923904500943465*t+.09708128566574634*n+.7140993584005155*r};return i!==void 0&&(o.alpha=i),o},_t=FS;var kl=e=>e>fr?Math.cbrt(e):(hn*e+16)/116,GS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=kl(e/xe.X),o=kl(t/xe.Y),s=kl(n/xe.Z),a={mode:"lab",l:116*o-16,a:500*(i-o),b:200*(o-s)};return r!==void 0&&(a.alpha=r),a},pr=GS;var BS=e=>{let t=pr(_t(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},zo=BS;function US(e,t){if(!t||t[0]!=="lab")return;let n={mode:"lab"},[,r,i,o,s]=t;if(!(r.type===U.Hue||i.type===U.Hue||o.type===U.Hue))return r.type!==U.None&&(n.l=Math.min(Math.max(0,r.value),100)),i.type!==U.None&&(n.a=i.type===U.Number?i.value:i.value*125/100),o.type!==U.None&&(n.b=o.type===U.Number?o.value:o.value*125/100),s.type!==U.None&&(n.alpha=Math.min(1,Math.max(0,s.type===U.Number?s.value:s.value/100))),n}var Op=US;var zS={mode:"lab",toMode:{xyz50:dr,rgb:Uo},fromMode:{xyz50:pr,rgb:zo},channels:["l","a","b","alpha"],ranges:{l:[0,100],a:[-125,125],b:[-125,125]},parse:[Op],serialize:e=>`lab(${e.l!==void 0?e.l:"none"} ${e.a!==void 0?e.a:"none"} ${e.b!==void 0?e.b:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{l:W,a:W,b:W,alpha:{use:W,fixup:fe}}},mr=zS;var HS={...mr,mode:"lab65",parse:["--lab-d65"],serialize:"--lab-d65",toMode:{xyz65:Do,rgb:pn},fromMode:{xyz65:Mo,rgb:mn},ranges:{l:[0,100],a:[-125,125],b:[-125,125]}},Rp=HS;function WS(e,t){if(!t||t[0]!=="lch")return;let n={mode:"lch"},[,r,i,o,s]=t;if(r.type!==U.None){if(r.type===U.Hue)return;n.l=Math.min(Math.max(0,r.value),100)}if(i.type!==U.None&&(n.c=Math.max(0,i.type===U.Number?i.value:i.value*150/100)),o.type!==U.None){if(o.type===U.Percentage)return;n.h=o.value}return s.type!==U.None&&(n.alpha=Math.min(1,Math.max(0,s.type===U.Number?s.value:s.value/100))),n}var Dp=WS;var jS={mode:"lch",toMode:{lab:st,rgb:e=>Uo(st(e))},fromMode:{rgb:e=>ot(zo(e)),lab:ot},channels:["l","c","h","alpha"],ranges:{l:[0,100],c:[0,150],h:[0,360]},parse:[Dp],serialize:e=>`lch(${e.l!==void 0?e.l:"none"} ${e.c!==void 0?e.c:"none"} ${e.h!==void 0?e.h:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:W,fixup:Fe},c:W,l:W,alpha:{use:W,fixup:fe}},difference:{h:qt},average:{h:Ge}},hr=jS;var $S={...hr,mode:"lch65",parse:["--lch-d65"],serialize:"--lch-d65",toMode:{lab65:e=>st(e,"lab65"),rgb:e=>pn(st(e,"lab65"))},fromMode:{rgb:e=>ot(mn(e),"lch65"),lab65:e=>ot(e,"lch65")},ranges:{l:[0,100],c:[0,150],h:[0,360]}},Mp=$S;var XS=({l:e,u:t,v:n,alpha:r})=>{t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.sqrt(t*t+n*n),o={mode:"lchuv",l:e,c:i};return i&&(o.h=Ie(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(o.alpha=r),o},_l=XS;var KS=({l:e,c:t,h:n,alpha:r})=>{n===void 0&&(n=0);let i={mode:"luv",l:e,u:t?t*Math.cos(n/180*Math.PI):0,v:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(i.alpha=r),i},Ll=KS;var Pp=(e,t,n)=>4*e/(e+15*t+3*n),wp=(e,t,n)=>9*t/(e+15*t+3*n),YS=Pp(xe.X,xe.Y,xe.Z),qS=wp(xe.X,xe.Y,xe.Z),ZS=e=>e<=fr?hn*e:116*Math.cbrt(e)-16,JS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=ZS(t/xe.Y),o=Pp(e,t,n),s=wp(e,t,n);!isFinite(o)||!isFinite(s)?i=o=s=0:(o=13*i*(o-YS),s=13*i*(s-qS));let a={mode:"luv",l:i,u:o,v:s};return r!==void 0&&(a.alpha=r),a},li=JS;var QS=(e,t,n)=>4*e/(e+15*t+3*n),e1=(e,t,n)=>9*t/(e+15*t+3*n),t1=QS(xe.X,xe.Y,xe.Z),n1=e1(xe.X,xe.Y,xe.Z),r1=({l:e,u:t,v:n,alpha:r})=>{if(e===void 0&&(e=0),e===0)return{mode:"xyz50",x:0,y:0,z:0};t===void 0&&(t=0),n===void 0&&(n=0);let i=t/(13*e)+t1,o=n/(13*e)+n1,s=xe.Y*(e<=8?e/hn:Math.pow((e+16)/116,3)),a=s*(9*i)/(4*o),l=s*(12-3*i-20*o)/(4*o),u={mode:"xyz50",x:a,y:s,z:l};return r!==void 0&&(u.alpha=r),u},ui=r1;var i1=e=>_l(li(_t(e))),o1=e=>kt(ui(Ll(e))),s1={mode:"lchuv",toMode:{luv:Ll,rgb:o1},fromMode:{rgb:i1,luv:_l},channels:["l","c","h","alpha"],parse:["--lchuv"],serialize:"--lchuv",ranges:{l:[0,100],c:[0,176.956],h:[0,360]},interpolate:{h:{use:W,fixup:Fe},c:W,l:W,alpha:{use:W,fixup:fe}},difference:{h:qt},average:{h:Ge}},kp=s1;var a1={...mt,mode:"lrgb",toMode:{rgb:gt},fromMode:{rgb:ht},parse:["srgb-linear"],serialize:"srgb-linear"},_p=a1;var l1={mode:"luv",toMode:{xyz50:ui,rgb:e=>kt(ui(e))},fromMode:{xyz50:li,rgb:e=>li(_t(e))},channels:["l","u","v","alpha"],parse:["--luv"],serialize:"--luv",ranges:{l:[0,100],u:[-84.936,175.042],v:[-125.882,87.243]},interpolate:{l:W,u:W,v:W,alpha:{use:W,fixup:fe}}},Lp=l1;var u1=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.cbrt(.412221469470763*e+.5363325372617348*t+.0514459932675022*n),o=Math.cbrt(.2119034958178252*e+.6806995506452344*t+.1073969535369406*n),s=Math.cbrt(.0883024591900564*e+.2817188391361215*t+.6299787016738222*n),a={mode:"oklab",l:.210454268309314*i+.7936177747023054*o-.0040720430116193*s,a:1.9779985324311684*i-2.42859224204858*o+.450593709617411*s,b:.0259040424655478*i+.7827717124575296*o-.8086757549230774*s};return r!==void 0&&(a.alpha=r),a},Ho=u1;var c1=e=>{let t=Ho(ht(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},gn=c1;var f1=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.pow(e+.3963377773761749*t+.2158037573099136*n,3),o=Math.pow(e-.1055613458156586*t-.0638541728258133*n,3),s=Math.pow(e-.0894841775298119*t-1.2914855480194092*n,3),a={mode:"lrgb",r:4.076741636075957*i-3.3077115392580616*o+.2309699031821044*s,g:-1.2684379732850317*i+2.6097573492876887*o-.3413193760026573*s,b:-.0041960761386756*i-.7034186179359362*o+1.7076146940746117*s};return r!==void 0&&(a.alpha=r),a},Lt=f1;var d1=e=>gt(Lt(e)),yn=d1;function ci(e){let r=1.170873786407767;return .5*(r*e-.206+Math.sqrt((r*e-.206)*(r*e-.206)+4*.03*r*e))}function Dn(e){return(e*e+.206*e)/(1.170873786407767*(e+.03))}function p1(e,t){let n,r,i,o,s,a,l,u;-1.88170328*e-.80936493*t>1?(n=1.19086277,r=1.76576728,i=.59662641,o=.75515197,s=.56771245,a=4.0767416621,l=-3.3077115913,u=.2309699292):1.81444104*e-1.19445276*t>1?(n=.73956515,r=-.45954404,i=.08285427,o=.1254107,s=.14503204,a=-1.2684380046,l=2.6097574011,u=-.3413193965):(n=1.35733652,r=-.00915799,i=-1.1513021,o=-.50559606,s=.00692167,a=-.0041960863,l=-.7034186147,u=1.707614701);let c=n+r*e+i*t+o*e*e+s*e*t,f=.3963377774*e+.2158037573*t,g=-.1055613458*e-.0638541728*t,h=-.0894841775*e-1.291485548*t;{let d=1+c*f,v=1+c*g,T=1+c*h,E=d*d*d,S=v*v*v,C=T*T*T,A=3*f*d*d,_=3*g*v*v,O=3*h*T*T,k=6*f*f*d,V=6*g*g*v,F=6*h*h*T,Q=a*E+l*S+u*C,ne=a*A+l*_+u*O,Y=a*k+l*V+u*F;c=c-Q*ne/(ne*ne-.5*Q*Y)}return c}function Vl(e,t){let n=p1(e,t),r=Lt({l:1,a:n*e,b:n*t}),i=Math.cbrt(1/Math.max(r.r,r.g,r.b)),o=i*n;return[i,o]}function m1(e,t,n,r,i,o=null){o||(o=Vl(e,t));let s;if((n-i)*o[1]-(o[0]-i)*r<=0)s=o[1]*i/(r*o[0]+o[1]*(i-n));else{s=o[1]*(i-1)/(r*(o[0]-1)+o[1]*(i-n));{let a=n-i,l=r,u=.3963377774*e+.2158037573*t,c=-.1055613458*e-.0638541728*t,f=-.0894841775*e-1.291485548*t,g=a+l*u,h=a+l*c,d=a+l*f;{let v=i*(1-s)+s*n,T=s*r,E=v+T*u,S=v+T*c,C=v+T*f,A=E*E*E,_=S*S*S,O=C*C*C,k=3*g*E*E,V=3*h*S*S,F=3*d*C*C,Q=6*g*g*E,ne=6*h*h*S,Y=6*d*d*C,I=4.0767416621*A-3.3077115913*_+.2309699292*O-1,R=4.0767416621*k-3.3077115913*V+.2309699292*F,x=4.0767416621*Q-3.3077115913*ne+.2309699292*Y,P=R/(R*R-.5*I*x),G=-I*P,D=-1.2684380046*A+2.6097574011*_-.3413193965*O-1,w=-1.2684380046*k+2.6097574011*V-.3413193965*F,q=-1.2684380046*Q+2.6097574011*ne-.3413193965*Y,Z=w/(w*w-.5*D*q),X=-D*Z,j=-.0041960863*A-.7034186147*_+1.707614701*O-1,ee=-.0041960863*k-.7034186147*V+1.707614701*F,$=-.0041960863*Q-.7034186147*ne+1.707614701*Y,le=ee/(ee*ee-.5*j*$),B=-j*le;G=P>=0?G:1e6,X=Z>=0?X:1e6,B=le>=0?B:1e6,s+=Math.min(G,Math.min(X,B))}}}return s}function fi(e,t,n=null){n||(n=Vl(e,t));let r=n[0],i=n[1];return[i/r,i/(1-r)]}function Wo(e,t,n){let r=Vl(t,n),i=m1(t,n,e,1,e,r),o=fi(t,n,r),s=.11516993+1/(7.4477897+4.1590124*n+t*(-2.19557347+1.75198401*n+t*(-2.13704948-10.02301043*n+t*(-4.24894561+5.38770819*n+4.69891013*t)))),a=.11239642+1/(1.6132032-.68124379*n+t*(.40370612+.90148123*n+t*(-.27087943+.6122399*n+t*(.00299215-.45399568*n-.14661872*t)))),l=i/Math.min(e*o[0],(1-e)*o[1]),u=e*s,c=(1-e)*a,f=.9*l*Math.sqrt(Math.sqrt(1/(1/(u*u*u*u)+1/(c*c*c*c))));return u=e*.4,c=(1-e)*.8,[Math.sqrt(1/(1/(u*u)+1/(c*c))),f,i]}function jo(e){let t=e.l!==void 0?e.l:0,n=e.a!==void 0?e.a:0,r=e.b!==void 0?e.b:0,i={mode:"okhsl",l:ci(t)};e.alpha!==void 0&&(i.alpha=e.alpha);let o=Math.sqrt(n*n+r*r);if(!o)return i.s=0,i;let[s,a,l]=Wo(t,n/o,r/o),u;if(o<a){let c=0,f=.8*s,g=1-f/a;u=(o-c)/(f+g*(o-c))*.8}else{let c=a,f=.2*a*a*1.25*1.25/s,g=1-f/(l-a);u=.8+.2*((o-c)/(f+g*(o-c)))}return u&&(i.s=u,i.h=Ie(Math.atan2(r,n)*180/Math.PI)),i}function $o(e){let t=e.h!==void 0?e.h:0,n=e.s!==void 0?e.s:0,r=e.l!==void 0?e.l:0,i={mode:"oklab",l:Dn(r)};if(e.alpha!==void 0&&(i.alpha=e.alpha),!n||r===1)return i.a=i.b=0,i;let o=Math.cos(t/180*Math.PI),s=Math.sin(t/180*Math.PI),[a,l,u]=Wo(i.l,o,s),c,f,g,h;n<.8?(c=1.25*n,f=0,g=.8*a,h=1-g/l):(c=5*(n-.8),f=l,g=.2*l*l*1.25*1.25/a,h=1-g/(u-l));let d=f+c*g/(1-h*c);return i.a=d*o,i.b=d*s,i}var h1={...wo,mode:"okhsl",channels:["h","s","l","alpha"],parse:["--okhsl"],serialize:"--okhsl",fromMode:{oklab:jo,rgb:e=>jo(gn(e))},toMode:{oklab:$o,rgb:e=>yn($o(e))}},Vp=h1;function Xo(e){let t=e.l!==void 0?e.l:0,n=e.a!==void 0?e.a:0,r=e.b!==void 0?e.b:0,i=Math.sqrt(n*n+r*r),o=i?n/i:1,s=i?r/i:1,[a,l]=fi(o,s),u=.5,c=1-u/a,f=l/(i+t*l),g=f*t,h=f*i,d=Dn(g),v=h*d/g,T=Lt({l:d,a:o*v,b:s*v}),E=Math.cbrt(1/Math.max(T.r,T.g,T.b,0));t=t/E,i=i/E*ci(t)/t,t=ci(t);let S={mode:"okhsv",s:i?(u+l)*h/(l*u+l*c*h):0,v:t?t/g:0};return S.s&&(S.h=Ie(Math.atan2(r,n)*180/Math.PI)),e.alpha!==void 0&&(S.alpha=e.alpha),S}function Ko(e){let t={mode:"oklab"};e.alpha!==void 0&&(t.alpha=e.alpha);let n=e.h!==void 0?e.h:0,r=e.s!==void 0?e.s:0,i=e.v!==void 0?e.v:0,o=Math.cos(n/180*Math.PI),s=Math.sin(n/180*Math.PI),[a,l]=fi(o,s),u=.5,c=1-u/a,f=1-r*u/(u+l-l*c*r),g=r*l*u/(u+l-l*c*r),h=Dn(f),d=g*h/f,v=Lt({l:h,a:o*d,b:s*d}),T=Math.cbrt(1/Math.max(v.r,v.g,v.b,0)),E=Dn(i*f),S=g*E/f;return t.l=E*T,t.a=S*o*T,t.b=S*s*T,t}var g1={...ko,mode:"okhsv",channels:["h","s","v","alpha"],parse:["--okhsv"],serialize:"--okhsv",fromMode:{oklab:Xo,rgb:e=>Xo(gn(e))},toMode:{oklab:Ko,rgb:e=>yn(Ko(e))}},Fp=g1;function y1(e,t){if(!t||t[0]!=="oklab")return;let n={mode:"oklab"},[,r,i,o,s]=t;if(!(r.type===U.Hue||i.type===U.Hue||o.type===U.Hue))return r.type!==U.None&&(n.l=Math.min(Math.max(0,r.type===U.Number?r.value:r.value/100),1)),i.type!==U.None&&(n.a=i.type===U.Number?i.value:i.value*.4/100),o.type!==U.None&&(n.b=o.type===U.Number?o.value:o.value*.4/100),s.type!==U.None&&(n.alpha=Math.min(1,Math.max(0,s.type===U.Number?s.value:s.value/100))),n}var Gp=y1;var v1={...mr,mode:"oklab",toMode:{lrgb:Lt,rgb:yn},fromMode:{lrgb:Ho,rgb:gn},ranges:{l:[0,1],a:[-.4,.4],b:[-.4,.4]},parse:[Gp],serialize:e=>`oklab(${e.l!==void 0?e.l:"none"} ${e.a!==void 0?e.a:"none"} ${e.b!==void 0?e.b:"none"}${e.alpha<1?` / ${e.alpha}`:""})`},Bp=v1;function I1(e,t){if(!t||t[0]!=="oklch")return;let n={mode:"oklch"},[,r,i,o,s]=t;if(r.type!==U.None){if(r.type===U.Hue)return;n.l=Math.min(Math.max(0,r.type===U.Number?r.value:r.value/100),1)}if(i.type!==U.None&&(n.c=Math.max(0,i.type===U.Number?i.value:i.value*.4/100)),o.type!==U.None){if(o.type===U.Percentage)return;n.h=o.value}return s.type!==U.None&&(n.alpha=Math.min(1,Math.max(0,s.type===U.Number?s.value:s.value/100))),n}var Up=I1;var T1={...hr,mode:"oklch",toMode:{oklab:e=>st(e,"oklab"),rgb:e=>yn(st(e,"oklab"))},fromMode:{rgb:e=>ot(gn(e),"oklch"),oklab:e=>ot(e,"oklch")},parse:[Up],serialize:e=>`oklch(${e.l!==void 0?e.l:"none"} ${e.c!==void 0?e.c:"none"} ${e.h!==void 0?e.h:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,ranges:{l:[0,1],c:[0,.4],h:[0,360]}},zp=T1;var S1=e=>{let{r:t,g:n,b:r,alpha:i}=ht(e),o={mode:"xyz65",x:.486570948648216*t+.265667693169093*n+.1982172852343625*r,y:.2289745640697487*t+.6917385218365062*n+.079286914093745*r,z:0*t+.0451133818589026*n+1.043944368900976*r};return i!==void 0&&(o.alpha=i),o},Fl=S1;var b1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=gt({r:e*2.4934969119414263-t*.9313836179191242-.402710784450717*n,g:e*-.8294889695615749+t*1.7626640603183465+.0236246858419436*n,b:e*.0358458302437845-t*.0761723892680418+.9568845240076871*n},"p3");return r!==void 0&&(i.alpha=r),i},Gl=b1;var E1={...mt,mode:"p3",parse:["display-p3"],serialize:"display-p3",fromMode:{rgb:e=>Gl(et(e)),xyz65:Gl},toMode:{rgb:e=>tt(Fl(e)),xyz65:Fl}},Hp=E1;var Bl=e=>{let t=Math.abs(e);return t>=.001953125?Math.sign(e)*Math.pow(t,.5555555555555556):16*e},A1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"prophoto",r:Bl(e*1.3457868816471585-t*.2555720873797946-.0511018649755453*n),g:Bl(e*-.5446307051249019+t*1.5082477428451466+.0205274474364214*n),b:Bl(e*0+t*0+1.2119675456389452*n)};return r!==void 0&&(i.alpha=r),i},Ul=A1;var zl=(e=0)=>{let t=Math.abs(e);return t>=.03125?Math.sign(e)*Math.pow(t,1.8):e/16},x1=e=>{let t=zl(e.r),n=zl(e.g),r=zl(e.b),i={mode:"xyz50",x:.7977666449006423*t+.1351812974005331*n+.0313477341283922*r,y:.2880748288194013*t+.7118352342418731*n+899369387256e-16*r,z:0*t+0*n+.8251046025104602*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},Hl=x1;var N1={...mt,mode:"prophoto",parse:["prophoto-rgb"],serialize:"prophoto-rgb",fromMode:{xyz50:Ul,rgb:e=>Ul(_t(e))},toMode:{xyz50:Hl,rgb:e=>kt(Hl(e))}},Wp=N1;var jp=1.09929682680944,C1=.018053968510807,Wl=e=>{let t=Math.abs(e);return t>C1?(Math.sign(e)||1)*(jp*Math.pow(t,.45)-(jp-1)):4.5*e},O1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"rec2020",r:Wl(e*1.7166511879712683-t*.3556707837763925-.2533662813736599*n),g:Wl(e*-.6666843518324893+t*1.6164812366349395+.0157685458139111*n),b:Wl(e*.0176398574453108-t*.0427706132578085+.9421031212354739*n)};return r!==void 0&&(i.alpha=r),i},jl=O1;var $p=1.09929682680944,R1=.018053968510807,$l=(e=0)=>{let t=Math.abs(e);return t<R1*4.5?e/4.5:(Math.sign(e)||1)*Math.pow((t+$p-1)/$p,1/.45)},D1=e=>{let t=$l(e.r),n=$l(e.g),r=$l(e.b),i={mode:"xyz65",x:.6369580483012911*t+.1446169035862083*n+.1688809751641721*r,y:.262700212011267*t+.6779980715188708*n+.059301716469862*r,z:0*t+.0280726930490874*n+1.0609850577107909*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},Xl=D1;var M1={...mt,mode:"rec2020",fromMode:{xyz65:jl,rgb:e=>jl(et(e))},toMode:{xyz65:Xl,rgb:e=>tt(Xl(e))},parse:["rec2020"],serialize:"rec2020"},Xp=M1;var Zt=.0037930732552754493,Yo=Math.cbrt(Zt);var Kl=e=>Math.cbrt(e)-Yo,P1=e=>{let{r:t,g:n,b:r,alpha:i}=ht(e),o=Kl(.3*t+.622*n+.078*r+Zt),s=Kl(.23*t+.692*n+.078*r+Zt),a=Kl(.2434226892454782*t+.2047674442449682*n+.5518098665095535*r+Zt),l={mode:"xyb",x:(o-s)/2,y:(o+s)/2,b:a-(o+s)/2};return i!==void 0&&(l.alpha=i),l},Kp=P1;var Yl=e=>Math.pow(e+Yo,3),w1=({x:e,y:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Yl(e+t)-Zt,o=Yl(t-e)-Zt,s=Yl(n+t)-Zt,a=gt({r:11.031566904639861*i-9.866943908131562*o-.16462299650829934*s,g:-3.2541473810744237*i+4.418770377582723*o-.16462299650829934*s,b:-3.6588512867136815*i+2.7129230459360922*o+1.9459282407775895*s});return r!==void 0&&(a.alpha=r),a},Yp=w1;var k1={mode:"xyb",channels:["x","y","b","alpha"],parse:["--xyb"],serialize:"--xyb",toMode:{rgb:Yp},fromMode:{rgb:Kp},ranges:{x:[-.0154,.0281],y:[0,.8453],b:[-.2778,.388]},interpolate:{x:W,y:W,b:W,alpha:{use:W,fixup:fe}}},qp=k1;var _1={mode:"xyz50",parse:["xyz-d50"],serialize:"xyz-d50",toMode:{rgb:kt,lab:pr},fromMode:{rgb:_t,lab:dr},channels:["x","y","z","alpha"],ranges:{x:[0,.964],y:[0,.999],z:[0,.825]},interpolate:{x:W,y:W,z:W,alpha:{use:W,fixup:fe}}},Zp=_1;var L1=e=>{let{x:t,y:n,z:r,alpha:i}=e;t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=0);let o={mode:"xyz50",x:1.0479298208405488*t+.0229467933410191*n-.0501922295431356*r,y:.0296278156881593*t+.990434484573249*n-.0170738250293851*r,z:-.0092430581525912*t+.0150551448965779*n+.7518742899580008*r};return i!==void 0&&(o.alpha=i),o},Jp=L1;var V1=e=>{let{x:t,y:n,z:r,alpha:i}=e;t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=0);let o={mode:"xyz65",x:.9554734527042182*t-.0230985368742614*n+.0632593086610217*r,y:-.0283697069632081*t+1.0099954580058226*n+.021041398966943*r,z:.0123140016883199*t-.0205076964334779*n+1.3303659366080753*r};return i!==void 0&&(o.alpha=i),o},Qp=V1;var F1={mode:"xyz65",toMode:{rgb:tt,xyz50:Jp},fromMode:{rgb:et,xyz50:Qp},ranges:{x:[0,.95],y:[0,1],z:[0,1.088]},channels:["x","y","z","alpha"],parse:["xyz","xyz-d65"],serialize:"xyz-d65",interpolate:{x:W,y:W,z:W,alpha:{use:W,fixup:fe}}},em=F1;var G1=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"yiq",y:.29889531*e+.58662247*t+.11448223*n,i:.59597799*e-.2741761*t-.32180189*n,q:.21147017*e-.52261711*t+.31114694*n};return r!==void 0&&(i.alpha=r),i},tm=G1;var B1=({y:e,i:t,q:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"rgb",r:e+.95608445*t+.6208885*n,g:e-.27137664*t-.6486059*n,b:e-1.10561724*t+1.70250126*n};return r!==void 0&&(i.alpha=r),i},nm=B1;var U1={mode:"yiq",toMode:{rgb:nm},fromMode:{rgb:tm},channels:["y","i","q","alpha"],parse:["--yiq"],serialize:"--yiq",ranges:{i:[-.595,.595],q:[-.522,.522]},interpolate:{y:W,i:W,q:W,alpha:{use:W,fixup:fe}}},rm=U1;var T3=Ve("rgb"),z1=e=>{let t={mode:e.mode,r:Math.max(0,Math.min(e.r!==void 0?e.r:0,1)),g:Math.max(0,Math.min(e.g!==void 0?e.g:0,1)),b:Math.max(0,Math.min(e.b!==void 0?e.b:0,1))};return e.alpha!==void 0&&(t.alpha=e.alpha),t};var H1=e=>e!==void 0&&(e.r===void 0||e.r>=0&&e.r<=1)&&(e.g===void 0||e.g>=0&&e.g<=1)&&(e.b===void 0||e.b>=0&&e.b<=1);function gr(e="rgb"){let{gamut:t}=Kt(e);if(!t)return r=>!0;let n=Ve(typeof t=="string"?t:e);return r=>H1(n(r))}function im(e="rgb"){let{gamut:t}=Kt(e);if(!t)return o=>ir(o);let n=typeof t=="string"?t:e,r=Ve(n),i=gr(n);return o=>{let s=ir(o);if(!s)return;let a=r(s);if(i(a))return s;let l=z1(a);return s.mode===l.mode?l:Ve(s.mode)(l)}}function yr(e="rgb",t="oklch",n=ni("oklch"),r=.02){let i=Ve(e),o=Kt(e);if(!o.gamut)return c=>i(c);let s=gr(e),a=im(e),l=Ve(t),{ranges:u}=Kt(t);if(!u.l||!u.c)throw new Error("LCH-like space expected");return c=>{if(c=ir(c),c===void 0)return;let f={...l(c)};if(f.l===void 0&&(f.l=0),f.c===void 0&&(f.c=0),f.l>=u.l[1]){let T={...o.white,mode:e};return c.alpha!==void 0&&(T.alpha=c.alpha),T}if(f.l<=u.l[0]){let T={...o.black,mode:e};return c.alpha!==void 0&&(T.alpha=c.alpha),T}if(s(f))return i(f);let g=0,h=f.c,d=(u.c[1]-u.c[0])/4e3,v=a(f);for(;h-g>d;)f.c=(g+h)*.5,v=a(f),s(f)||n&&r>0&&n(f,v)<=r?g=f.c:h=f.c;return i(s(f)?f:v)}}var u5=ye(ip),c5=ye(dp),f5=ye(hp),d5=ye(gp),p5=ye(yp),m5=ye(wo),h5=ye(ko),g5=ye(bp),y5=ye(Ap),v5=ye(Np),I5=ye(Cp),T5=ye(mr),S5=ye(Rp),b5=ye(hr),E5=ye(Mp),A5=ye(kp),x5=ye(_p),N5=ye(Lp),C5=ye(Vp),O5=ye(Fp),R5=ye(Bp),D5=ye(zp),M5=ye(Hp),P5=ye(Wp),w5=ye(Xp),k5=ye(mt),_5=ye(qp),L5=ye(Zp),V5=ye(em),F5=ye(rm);var vn={r:0,g:0,b:0,a:1};var vr="Inter",di=4,Mn=1;var om=["button","textField","textarea","numberField","toggle","switch","checkbox","radio","radioGroup","toggleGroup","slider","progress","tabs","collapsible","accordion"];var qo,W1={lang:void 0,message:void 0,abortEarly:void 0,abortPipeEarly:void 0};function sm(e){return!e&&!qo?W1:{lang:e?.lang??qo?.lang,message:e?.message,abortEarly:e?.abortEarly??qo?.abortEarly,abortPipeEarly:e?.abortPipeEarly??qo?.abortPipeEarly}}var j1;function $1(e){return j1?.get(e)}var X1;function K1(e){return X1?.get(e)}var Y1;function q1(e,t){return Y1?.get(e)?.get(t)}function pi(e){let t=typeof e;return t==="string"?`"${e}"`:t==="number"||t==="bigint"||t==="boolean"?`${e}`:t==="object"||t==="function"?(e&&Object.getPrototypeOf(e)?.constructor?.name)??"null":t}function Be(e,t,n,r,i){let o=i&&"input"in i?i.input:n.value,s=i?.expected??e.expects??null,a=i?.received??pi(o),l={kind:e.kind,type:e.type,input:o,expected:s,received:a,message:`Invalid ${t}: ${s?`Expected ${s} but r`:"R"}eceived ${a}`,requirement:e.requirement,path:i?.path,issues:i?.issues,lang:r.lang,abortEarly:r.abortEarly,abortPipeEarly:r.abortPipeEarly},u=e.kind==="schema",c=i?.message??e.message??q1(e.reference,l.lang)??(u?K1(l.lang):null)??r.message??$1(l.lang);c!==void 0&&(l.message=typeof c=="function"?c(l):c),u&&(n.typed=!1),n.issues?n.issues.push(l):n.issues=[l]}function Z1(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function J1(e,t){return Object.prototype.hasOwnProperty.call(e,t)&&t!=="__proto__"&&t!=="prototype"&&t!=="constructor"}function Q1(e,t){let n=[...new Set(e)];return n.length>1?`(${n.join(` ${t} `)})`:n[0]??"never"}function qe(e){return e["~standard"]={version:1,vendor:"valibot",validate:t=>e["~run"]({value:t},sm())},e}function Zo(e,t){return{kind:"validation",type:"check",reference:Zo,async:!1,expects:null,requirement:e,message:t,"~run"(n,r){return n.typed&&!this.requirement(n.value)&&Be(this,"input",n,r),n}}}function Vt(e){return{kind:"validation",type:"finite",reference:Vt,async:!1,expects:null,requirement:Number.isFinite,message:e,"~run"(t,n){return t.typed&&!this.requirement(t.value)&&Be(this,"finite",t,n),t}}}function mi(e,t){return{kind:"validation",type:"max_length",reference:mi,async:!1,expects:`<=${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&n.value.length>this.requirement&&Be(this,"length",n,r,{received:`${n.value.length}`}),n}}}function Jo(e,t){return{kind:"validation",type:"min_length",reference:Jo,async:!1,expects:`>=${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&n.value.length<this.requirement&&Be(this,"length",n,r,{received:`${n.value.length}`}),n}}}function Qo(e,t){return{kind:"validation",type:"min_value",reference:Qo,async:!1,expects:`>=${e instanceof Date?e.toJSON():pi(e)}`,requirement:e,message:t,"~run"(n,r){return n.typed&&!(n.value>=this.requirement)&&Be(this,"value",n,r,{received:n.value instanceof Date?n.value.toJSON():pi(n.value)}),n}}}function Ir(e){return{kind:"validation",type:"non_empty",reference:Ir,async:!1,expects:"!0",message:e,"~run"(t,n){return t.typed&&t.value.length===0&&Be(this,"length",t,n,{received:"0"}),t}}}function ql(e,t){return{kind:"transformation",type:"parse_json",reference:ql,config:e,message:t,async:!1,"~run"(n,r){try{n.value=JSON.parse(n.value,this.config?.reviver)}catch(i){if(i instanceof Error)Be(this,"JSON",n,r,{received:`"${i.message}"`}),n.typed=!1;else throw i}return n}}}function es(e,t){return{kind:"validation",type:"regex",reference:es,async:!1,expects:`${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&!this.requirement.test(n.value)&&Be(this,"format",n,r),n}}}function Pn(e){return{kind:"transformation",type:"transform",reference:Pn,async:!1,operation:e,"~run"(t){return t.value=this.operation(t.value),t}}}function ts(){return{kind:"transformation",type:"trim",reference:ts,async:!1,"~run"(e){return e.value=e.value.trim(),e}}}function am(e,t,n){return typeof e.fallback=="function"?e.fallback(t,n):e.fallback}function xt(e,t){return qe({...e,fallback:t,"~run"(n,r){let i=e["~run"](n,r);return i.issues?{typed:!0,value:am(this,i,r)}:i}})}function Zl(e,t,n){return typeof e.default=="function"?e.default(t,n):e.default}function Jt(e,t){return qe({kind:"schema",type:"array",reference:Jt,expects:"Array",async:!1,item:e,message:t,"~run"(n,r){let i=n.value;if(Array.isArray(i)){n.typed=!0,n.value=[];for(let o=0;o<i.length;o++){let s=i[o],a=this.item["~run"]({value:s},r);if(a.issues){let l={type:"array",origin:"value",input:i,key:o,value:s};for(let u of a.issues)u.path?u.path.unshift(l):u.path=[l],n.issues?.push(u);if(n.issues||(n.issues=a.issues),r.abortEarly){n.typed=!1;break}}a.typed||(n.typed=!1),n.value.push(a.value)}}else Be(this,"type",n,r);return n}})}function ns(e){return qe({kind:"schema",type:"boolean",reference:ns,expects:"boolean",async:!1,message:e,"~run"(t,n){return typeof t.value=="boolean"?t.typed=!0:Be(this,"type",t,n),t}})}function rs(e,t){return qe({kind:"schema",type:"custom",reference:rs,expects:"unknown",async:!1,check:e,message:t,"~run"(n,r){return this.check(n.value)?n.typed=!0:Be(this,"type",n,r),n}})}function Jl(e){return qe({kind:"schema",type:"lazy",reference:Jl,expects:"unknown",async:!1,getter:e,"~run"(t,n){return this.getter(t.value)["~run"](t,n)}})}function Ql(e,t){return qe({kind:"schema",type:"literal",reference:Ql,expects:pi(e),async:!1,literal:e,message:t,"~run"(n,r){return Z1(n.value,this.literal)?n.typed=!0:Be(this,"type",n,r),n}})}function hi(e,t){return qe({kind:"schema",type:"nullable",reference:hi,expects:`(${e.expects} | null)`,async:!1,wrapped:e,default:t,"~run"(n,r){return n.value===null&&(this.default!==void 0&&(n.value=Zl(this,n,r)),n.value===null)?(n.typed=!0,n):this.wrapped["~run"](n,r)}})}function Te(e){return qe({kind:"schema",type:"number",reference:Te,expects:"number",async:!1,message:e,"~run"(t,n){return typeof t.value=="number"&&!isNaN(t.value)?t.typed=!0:Be(this,"type",t,n),t}})}function Ee(e,t){return qe({kind:"schema",type:"object",reference:Ee,expects:"Object",async:!1,entries:e,message:t,"~run"(n,r){let i=n.value;if(i&&typeof i=="object"){n.typed=!0,n.value={};for(let o in this.entries){let s=this.entries[o];if(o in i||(s.type==="exact_optional"||s.type==="optional"||s.type==="nullish")&&s.default!==void 0){let a=o in i?i[o]:Zl(s),l=s["~run"]({value:a},r);if(l.issues){let u={type:"object",origin:"value",input:i,key:o,value:a};for(let c of l.issues)c.path?c.path.unshift(u):c.path=[u],n.issues?.push(c);if(n.issues||(n.issues=l.issues),r.abortEarly){n.typed=!1;break}}l.typed||(n.typed=!1),n.value[o]=l.value}else if(s.fallback!==void 0)n.value[o]=am(s);else if(s.type!=="exact_optional"&&s.type!=="optional"&&s.type!=="nullish"&&(Be(this,"key",n,r,{input:void 0,expected:`"${o}"`,path:[{type:"object",origin:"key",input:i,key:o,value:i[o]}]}),r.abortEarly))break}}else Be(this,"type",n,r);return n}})}function pe(e,t){return qe({kind:"schema",type:"optional",reference:pe,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:t,"~run"(n,r){return n.value===void 0&&(this.default!==void 0&&(n.value=Zl(this,n,r)),n.value===void 0)?(n.typed=!0,n):this.wrapped["~run"](n,r)}})}function wn(e,t){return qe({kind:"schema",type:"picklist",reference:wn,expects:Q1(e.map(pi),"|"),async:!1,options:e,message:t,"~run"(n,r){return this.options.includes(n.value)?n.typed=!0:Be(this,"type",n,r),n}})}function Qt(e,t,n){return qe({kind:"schema",type:"record",reference:Qt,expects:"Object",async:!1,key:e,value:t,message:n,"~run"(r,i){let o=r.value;if(o&&typeof o=="object"){r.typed=!0,r.value={};for(let s in o)if(J1(o,s)){let a=o[s],l=this.key["~run"]({value:s},i);if(l.issues){let c={type:"object",origin:"key",input:o,key:s,value:a};for(let f of l.issues)f.path=[c],r.issues?.push(f);if(r.issues||(r.issues=l.issues),i.abortEarly){r.typed=!1;break}}let u=this.value["~run"]({value:a},i);if(u.issues){let c={type:"object",origin:"value",input:o,key:s,value:a};for(let f of u.issues)f.path?f.path.unshift(c):f.path=[c],r.issues?.push(f);if(r.issues||(r.issues=u.issues),i.abortEarly){r.typed=!1;break}}(!l.typed||!u.typed)&&(r.typed=!1),l.typed&&(r.value[l.value]=u.value)}}else Be(this,"type",r,i);return r}})}function ce(e){return qe({kind:"schema",type:"string",reference:ce,expects:"string",async:!1,message:e,"~run"(t,n){return typeof t.value=="string"?t.typed=!0:Be(this,"type",t,n),t}})}function In(){return qe({kind:"schema",type:"unknown",reference:In,expects:"unknown",async:!1,"~run"(e){return e.typed=!0,e}})}function Ae(...e){return qe({...e[0],pipe:e,"~run"(t,n){for(let r of e)if(r.kind!=="metadata"){if(t.issues&&(r.kind==="schema"||r.kind==="transformation")){t.typed=!1;break}(!t.issues||!n.abortEarly&&!n.abortPipeEarly)&&(t=r["~run"](t,n))}return t}})}function gi(e,t,n){let r=e["~run"]({value:t},sm(n));return{typed:r.typed,success:!r.issues,output:r.value,issues:r.issues}}var yi="open-pencil";function He(e,t,n){let r=Ae(ce(),ql(),n);return{key:e,role:t,decode(i){let o=gi(r,i);return o.success?o.output:void 0},encode:i=>JSON.stringify(i)}}function is(e,t,n){let r=wn(n);return{key:e,role:t,decode(i){let o=gi(r,i);return o.success?o.output:void 0},encode:i=>i}}function eu(e,t){return e.pluginId==="open-pencil"&&e.key===t.key}function tu(e,t){return e?.some(n=>eu(n,t))??!1}function nu(e,t){return{pluginId:yi,key:e.key,value:e.encode(t)}}function os(e,t){return e.filter(n=>!t.some(r=>eu(n,r)))}function en(e,t,n){return um(e,t,n===void 0?[]:[n])}function um(e,t,n){return[...os(e,[t]),...n.map(r=>nu(t,r))]}var tb=Ee({propertyId:ce(),on:pe(ce()),off:pe(ce())});function cm(e){return e.max>e.min&&e.step>0}var nb=Ae(Ee({min:Ae(Te(),Vt()),max:Ae(Te(),Vt()),step:Ae(Te(),Vt()),default:Ae(Te(),Vt())}),Zo(e=>cm(e),"A number value needs max above min and a positive step")),rb={rest:pe(ce()),hover:pe(ce()),pressed:pe(ce()),focus:pe(ce()),disabled:pe(ce())},ib=Ee({propertyId:ce(),...rb}),ob=Ee({kind:wn(om),booleans:Qt(ce(),tb),texts:pe(Qt(ce(),Ee({propertyId:ce()})),{}),numbers:Qt(ce(),nb),parts:Qt(ce(),ce()),states:pe(ib)}),fm=["png","jpg","webp","svg","pdf","pptx"];function dm(e){return fm.some(t=>t===e)}var pm=.01,mm=1024;function ss(e){return Math.min(mm,Math.max(pm,e))}var hm=/^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:[-_][a-z0-9]+)*$/,gm=Ee({name:Ae(ce(),es(hm)),glyph:pe(ce())}),ym=["fill","stroke"],vm=Ae(Jt(wn(ym)),Jo(1)),Im=Ee({type:Ae(ce(),Ir(),mi(100)),id:pe(ce()),props:pe(Qt(ce(),In())),children:pe(Jt(Jl(()=>Im)))}),Tm=Ee({components:Ae(Jt(Im),Jo(1)),structureVersion:pe(Te())}),Sm=Ee({image:Ae(ce(),Ir()),preset:Tm,frame:pe(Ee({width:Ae(Te(),Vt(),Qo(0)),height:Ae(Te(),Vt(),Qo(0)),preset:Ae(ce(),Ir())}))});var ru=["ALL_SCOPES","TEXT_CONTENT","CORNER_RADIUS","WIDTH_HEIGHT","GAP","ALL_FILLS","FRAME_FILL","SHAPE_FILL","TEXT_FILL","STROKE","STROKE_FLOAT","EFFECT_FLOAT","EFFECT_COLOR","OPACITY","FONT_STYLE","FONT_FAMILY","FONT_SIZE","LINE_HEIGHT","LETTER_SPACING","PARAGRAPH_SPACING","PARAGRAPH_INDENT","FONT_VARIATIONS","TRANSFORM"],iu=["WEB","ANDROID","iOS"],bm=["none","px","rem","%","ms","s","deg"];var Em=/^[A-Za-z_][\w-]*$/;var lm=["AUTO","LTR","RTL"],sb=Ae(Ee({x:Te(),y:Te(),width:Te(),height:Te()}),Zo(({x:e,y:t,width:n,height:r})=>Number.isFinite(e+t+n+r)&&n>0&&r>0)),ab=Ae(rs(e=>typeof e=="object"&&e!==null&&!Array.isArray(e)),Pn(e=>Object.fromEntries(Object.entries(e).filter(t=>typeof t[1]=="string")))),lb=Jt(Ae(Ee({scale:Ae(Te(),Vt()),format:rs(dm)}),Pn(({scale:e,format:t})=>({scale:ss(e),format:t})))),ub=Ae(Ee({identity:Ee({libraryId:ce(),assetKey:ce(),revisionId:ce()}),sourceNodeId:pe(In()),readOnly:pe(In())}),Pn(({identity:e,sourceNodeId:t,readOnly:n})=>({identity:e,sourceNodeId:typeof t=="string"?t:null,readOnly:n===!0}))),cb=Ee({libraryId:ce(),revisionId:ce(),enabled:pe(In())}),fb=Ae(Jt(In()),Pn(e=>e.flatMap(t=>{let n=gi(cb,t);if(!n.success)return[];let{libraryId:r,revisionId:i,enabled:o}=n.output;return[{libraryId:r,revisionId:i,enabled:o===!0}]}))),Am=Ae(ce(),ts(),Ir(),mi(1e3)),db=Ee({unit:pe(wn(bm)),expressions:pe(Qt(ce(),Ee({css:Am,resolved:Ae(Te(),Vt())})))}),pb=Ee({version:Ql(1),kind:wn(["fill","stroke"]),index:Te(),color:Ee({h:Te(),c:Te(),l:Te(),a:xt(pe(Te()),void 0)})}),mb=Ee({libraryId:ce(),revisionId:ce(),name:ce(),catalogSource:pe(ce())}),hb=xt(pe(Ee({r:Te(),g:Te(),b:Te(),a:Te()})),void 0),xm={author:xt(ce(),""),authorColor:hb,text:xt(ce(),""),createdAt:xt(ce(),""),deleted:pe(ns())},gb=Ee({id:ce(),...xm}),yb=Ee({id:ce(),pageId:ce(),pageName:pe(ce()),nodeId:pe(hi(ce())),nodeName:pe(hi(ce())),offsetX:pe(Te()),offsetY:pe(Te()),x:xt(Te(),0),y:xt(Te(),0),...xm,updatedAt:xt(ce(),""),resolved:xt(ns(),!1),resolvedAt:pe(hi(ce())),replies:xt(Jt(gb),[])}),vb=Ae(Jt(In()),Pn(e=>e.flatMap(t=>{let n=gi(yb,t);if(!n.success)return[];let r=n.output;return[{...r,updatedAt:r.updatedAt||r.createdAt}]}))),Ze={textDirection:is("textDirection","format",lm),layoutDirection:is("layoutDirection","format",lm),nodeType:is("nodeType","format",["COMPONENT_SET"]),boundVariables:He("boundVariables","format",ab),exportSettings:He("exportSettings","format",lb),textPathBox:He("textPathBox","format",sb),librarySource:He("librarySource","bookkeeping",ub),enabledLibraries:He("enabledLibraries","bookkeeping",fb),sourceLibraryPublication:He("sourceLibraryPublication","bookkeeping",mb),comments:He("comments","bookkeeping",vb),token:He("token","format",db),modeConditions:He("modeConditions","format",Qt(ce(),Am)),modeAttribute:He("modeAttribute","format",Ae(ce(),ts(),mi(100),es(Em))),okhcl:He("okhcl","content",pb),behaviour:He("behaviour","content",ob),icon:He("icon","content",gm),iconTint:He("iconTint","content",vm),shader:He("shader","content",Sm)},q5=Object.values(Ze).filter(e=>e.role!=="content");var ou=typeof globalThis=="object"&&globalThis||typeof window=="object"&&window||typeof self=="object"&&self||typeof global=="object"&&global||(function(){return this})();function su(e){return typeof ou.Buffer<"u"&&ou.Buffer.isBuffer(e)}function vi(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Ii(e){return vi(e)&&Object.keys(e).length===0}function au(e){return Object.getOwnPropertySymbols(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}function lu(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}var Nm="[object RegExp]",Cm="[object String]",Om="[object Number]",Rm="[object Boolean]";var Dm="[object Symbol]",Mm="[object Date]",Pm="[object Map]",wm="[object Set]",km="[object Array]",_m="[object Function]",Lm="[object ArrayBuffer]",as="[object Object]",Vm="[object Error]",Fm="[object DataView]",Gm="[object Uint8Array]",Bm="[object Uint8ClampedArray]",Um="[object Uint16Array]",zm="[object Uint32Array]",Hm="[object BigUint64Array]",Wm="[object Int8Array]",jm="[object Int16Array]",$m="[object Int32Array]",Xm="[object BigInt64Array]",Km="[object Float32Array]",Ym="[object Float64Array]";function qm(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function Zm(e,t,n){return Ti(e,t,void 0,void 0,void 0,void 0,n)}function Ti(e,t,n,r,i,o,s){let a=s(e,t,n,r,i,o);if(a!==void 0)return a;if(typeof e==typeof t)switch(typeof e){case"bigint":case"string":case"boolean":case"symbol":case"undefined":return e===t;case"number":return e===t||Object.is(e,t);case"function":return e===t;case"object":return Si(e,t,o,s)}return Si(e,t,o,s)}function Si(e,t,n,r){if(Object.is(e,t))return!0;let i=lu(e),o=lu(t);if(i==="[object Arguments]"&&(i=as),o==="[object Arguments]"&&(o=as),i!==o)return!1;switch(i){case Cm:return e.toString()===t.toString();case Om:return qm(e.valueOf(),t.valueOf());case Rm:case Mm:case Dm:return Object.is(e.valueOf(),t.valueOf());case Nm:return e.source===t.source&&e.flags===t.flags;case _m:return e===t}n=n??new Map;let s=n.get(e),a=n.get(t);if(s!=null&&a!=null)return s===t;n.set(e,t),n.set(t,e);try{switch(i){case Pm:if(e.size!==t.size)return!1;for(let[l,u]of e.entries())if(!t.has(l)||!Ti(u,t.get(l),l,e,t,n,r))return!1;return!0;case wm:{if(e.size!==t.size)return!1;let l=Array.from(e.values()),u=Array.from(t.values());for(let c=0;c<l.length;c++){let f=l[c],g=u.findIndex(h=>Ti(f,h,void 0,e,t,n,r));if(g===-1)return!1;u.splice(g,1)}return!0}case km:case Gm:case Bm:case Um:case zm:case Hm:case Wm:case jm:case $m:case Xm:case Km:case Ym:if(su(e)!==su(t)||e.length!==t.length)return!1;for(let l=0;l<e.length;l++)if(!Ti(e[l],t[l],l,e,t,n,r))return!1;return!0;case Lm:return e.byteLength!==t.byteLength?!1:Si(new Uint8Array(e),new Uint8Array(t),n,r);case Fm:return e.byteLength!==t.byteLength||e.byteOffset!==t.byteOffset?!1:Si(new Uint8Array(e),new Uint8Array(t),n,r);case Vm:return e.name===t.name&&e.message===t.message;case as:{if(!(Si(e.constructor,t.constructor,n,r)||vi(e)&&vi(t)))return!1;let l=[...Object.keys(e),...au(e)],u=[...Object.keys(t),...au(t)];if(l.length!==u.length)return!1;for(let c=0;c<l.length;c++){let f=l[c],g=e[f];if(!Object.hasOwn(t,f))return!1;let h=t[f];if(!Ti(g,h,f,e,t,n,r))return!1}return!0}default:return!1}}finally{n.delete(e),n.delete(t)}}function Jm(){}function nt(e,t){return Zm(e,t,Jm)}function Ib(){return{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function Tb(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function Sb(e){return e.minX===1/0?{x:0,y:0,width:0,height:0}:{x:e.minX,y:e.minY,width:e.maxX-e.minX,height:e.maxY-e.minY}}function ls(e){return e===0?0:e===1||e===2?1:e===3?2:e===4?3:null}function us(e){let t=Ib();for(let n of e){let r=n.commandsBlob,i=new DataView(r.buffer,r.byteOffset,r.byteLength),o=0;for(;o<r.length;){let s=r[o++],a=ls(s);if(a==null)break;for(let l=0;l<a&&!(o+8>r.length);l++)Tb(t,i.getFloat32(o,!0),i.getFloat32(o+4,!0)),o+=8}}return t.minX===1/0?null:Sb(t)}function eh(){return{self:new Map,descendants:new Map}}function uu(e){return{self:new Map([...e.self].map(([t,n])=>[t,structuredClone(n)])),descendants:new Map([...e.descendants].map(([t,n])=>[t,new Map([...n].map(([r,i])=>[r,structuredClone(i)]))]))}}function Ct(e,t,n,r){return n===t?e.self.get(r):e.descendants.get(n)?.get(r)}function bi(e,t,n,r){return(n===t?e.self:e.descendants.get(n))?.has(r)??!1}function Me(e,t,n,r,i=!0){if(n===t){e.self.set(r,i);return}let o=e.descendants.get(n)??new Map;o.set(r,i),e.descendants.set(n,o)}function cu(e){e.self.clear(),e.descendants.clear()}function Ei(e,t){for(let[n,r]of e.self)t("",n,r);for(let[n,r]of e.descendants)for(let[i,o]of r)t(n,i,o)}function Sn(){return{format:null,id:null,orderKey:null,editedFields:[],fig:{rawSize:null,rawTransform:null,rawNodeFields:{},layout:null,symbolOverrides:[],componentPropAssignments:[],derivedSymbolData:[],derivedSymbolDataLayoutVersion:null,uniformScaleFactor:null}}}function fu(e){return e==="LINE"||e==="VECTOR"?"CENTER":e==="TEXT"?"OUTSIDE":"INSIDE"}function Sr(e,t,n={}){return{id:e(),type:t,name:t.charAt(0)+t.slice(1).toLowerCase(),parentId:null,childIds:[],x:0,y:0,width:100,height:100,rotation:0,source:Sn(),derivedLayout:null,fills:t==="TEXT"?[{type:"SOLID",color:vn,opacity:1,visible:!0}]:[],strokes:[],effects:[],layoutGrids:[],guides:[],fillStyleId:null,strokeStyleId:null,textStyleId:null,effectStyleId:null,gridStyleId:null,sharedStyleType:null,opacity:1,cornerRadius:0,topLeftRadius:0,topRightRadius:0,bottomRightRadius:0,bottomLeftRadius:0,independentCorners:!1,cornerSmoothing:0,visible:!0,locked:!1,clipsContent:!1,text:"",fontSize:14,fontFamily:vr,fontWeight:400,italic:!1,textAlignHorizontal:"LEFT",textDirection:"AUTO",textLanguage:null,leadingTrim:"NONE",lineHeight:null,letterSpacing:0,layoutMode:"NONE",layoutDirection:"AUTO",layoutWrap:"NO_WRAP",primaryAxisAlign:"MIN",counterAxisAlign:"MIN",primaryAxisSizing:"FIXED",counterAxisSizing:"FIXED",itemSpacing:0,counterAxisSpacing:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0,blendMode:"PASS_THROUGH",layoutPositioning:"AUTO",layoutGrow:0,layoutAlignSelf:"AUTO",vectorNetwork:null,handleMirroring:"NONE",fillGeometry:[],strokeGeometry:[],arcData:null,textAlignVertical:"TOP",textAutoResize:"NONE",textCase:"ORIGINAL",textDecoration:"NONE",textDecorationStyle:"SOLID",textDecorationThickness:null,textDecorationFills:[],textDecorationSkipInk:!0,textUnderlineOffset:null,maxLines:null,textParagraphs:[],listSpacing:0,paragraphSpacing:0,paragraphIndent:0,hangingList:!1,styleRuns:[],fontVariations:[],fontFeatures:[],horizontalConstraint:"MIN",verticalConstraint:"MIN",strokeCap:"NONE",strokeJoin:"MITER",dashPattern:[],borderTopWeight:0,borderRightWeight:0,borderBottomWeight:0,borderLeftWeight:0,independentStrokeWeights:!1,strokeWeight:1,strokeAlign:fu(t),strokeMiterLimit:4,minWidth:null,maxWidth:null,minHeight:null,maxHeight:null,targetAspectRatio:null,isMask:!1,maskType:"ALPHA",maskIsOutline:!1,gridTemplateColumns:[],gridTemplateRows:[],gridColumnGap:0,gridRowGap:0,gridPosition:null,counterAxisAlignContent:"AUTO",itemReverseZIndex:!1,strokesIncludedInLayout:!1,expanded:!0,textTruncation:"DISABLED",autoRename:!0,pointCount:5,starInnerRadius:.38,componentId:null,instanceOverrides:eh(),componentPropertyDefinitions:[],componentPropertyReferences:[],componentPropertyAssignments:{},componentPropertyValues:{},componentKey:null,sourceLibraryKey:null,publishId:null,overrideKey:null,sharedSymbolVersion:null,publishedVersion:null,librarySource:null,isPublishable:!1,isSymbolPublishable:!1,isExposedInstance:!1,symbolDescription:"",symbolLinks:[],variantPropSpecs:[],boundVariables:{},variableBindingScales:{},variableAssignmentScales:{},componentScale:1,variableModes:{},exportSettings:[],pluginData:[],pluginRelaunchData:[],internalOnly:!1,flipX:!1,flipY:!1,textPicture:null,derivedTextGlyphs:null,textPathData:null,textPathBox:null,booleanOperation:void 0,...n}}var du=new Set(["CANVAS","FRAME","GROUP","BOOLEAN_OPERATION","SECTION","COMPONENT","COMPONENT_SET","INSTANCE"]);function pu(e,t){let n=r=>({x:e[0]*r.x+e[1]*r.y,y:e[3]*r.x+e[4]*r.y});return{vertices:t.vertices.map(r=>({...r,x:e[0]*r.x+e[1]*r.y+e[2],y:e[3]*r.x+e[4]*r.y+e[5]})),segments:t.segments.map(r=>({...r,tangentStart:n(r.tangentStart),tangentEnd:n(r.tangentEnd)})),regions:t.regions.map(r=>({windingRule:r.windingRule,loops:r.loops.map(i=>[...i])}))}}function Ai(e){return{vertices:e.vertices.map(t=>({...t})),segments:e.segments.map(t=>({...t,tangentStart:{...t.tangentStart},tangentEnd:{...t.tangentEnd}})),regions:e.regions.map(t=>({windingRule:t.windingRule,loops:t.loops.map(n=>[...n])}))}}function cs(e){let t={x:0,y:0};return{vertices:e.vertices,segments:e.segments.map(n=>({start:n.start,end:n.end,tangentStart:n.tangentStart??{...t},tangentEnd:n.tangentEnd??{...t}})),regions:e.regions??[]}}function Tr(e){let t={...e,color:{...e.color}};return e.gradientStops&&(t.gradientStops=e.gradientStops.map(bb)),e.gradientTransform&&(t.gradientTransform={...e.gradientTransform}),e.imageTransform&&(t.imageTransform={...e.imageTransform}),e.patternSpacing&&(t.patternSpacing={...e.patternSpacing}),e.noiseSize&&(t.noiseSize={...e.noiseSize}),t}function fs(e){let t=Tr(e);return e.dashPattern&&(t.dashPattern=[...e.dashPattern]),t}function mu(e){return{...e,color:{...e.color},offset:{...e.offset}}}function hu(e){let t={...e,style:{...e.style,fills:e.style.fills?e.style.fills.map(Tr):void 0,textDecorationFills:e.style.textDecorationFills?e.style.textDecorationFills.map(Tr):void 0,fontVariations:e.style.fontVariations?e.style.fontVariations.map(n=>({...n})):void 0,fontFeatures:e.style.fontFeatures?e.style.fontFeatures.map(n=>({...n})):void 0}};return e.style.hyperlink&&(t.style.hyperlink={...e.style.hyperlink}),e.style.boundVariables&&(t.style.boundVariables={...e.style.boundVariables}),t}var Qm=new WeakMap;function kn(e,t){return Qm.set(t,Qm.get(e)??e),t}function Nt(e){return e.map(Tr)}function Ln(e){return e.map(fs)}function xi(e){return e.map(mu)}function gu(e){return e.map(t=>({...t,color:t.color?{...t.color}:void 0}))}function Ni(e){return e.map(hu)}function th(e,t){return{windingRule:e.windingRule,commandsBlob:t,...e.fills?{fills:Nt(e.fills)}:{}}}function _n(e){return e.map(t=>th(t,t.commandsBlob.slice()))}function Ci(e,t,n,r,i,o=0,s=0){let a=e.slice(),l=new DataView(a.buffer,a.byteOffset,a.byteLength),u=0;for(;u<a.length;){let c=a[u++],f=ls(c);if(f==null)break;for(let g=0;g<f&&!(u+8>a.length);g++){let h=l.getFloat32(u,!0),d=l.getFloat32(u+4,!0);l.setFloat32(u,t*h+n*d+o,!0),l.setFloat32(u+4,r*h+i*d+s,!0),u+=8}}return a}function Oi(e,t,n,r,i,o=0,s=0){return e.map(a=>th(a,Ci(a.commandsBlob,t,n,r,i,o,s)))}function br(e,t,n){return t===1&&n===1?_n(e):Oi(e,t,0,0,n)}function at(e,t){if(e!==void 0)return e.length>0?t(e):[]}function bb(e){return{color:{...e.color},position:e.position}}function Tn(e){return e?.map(t=>({...t}))??[]}function Eb(e){return e?.map(t=>({...t,variantOptions:t.variantOptions?[...t.variantOptions]:void 0,preferredValues:t.preferredValues?[...t.preferredValues]:void 0,slotSettings:t.slotSettings?{...t.slotSettings}:void 0}))??[]}function ds(e){return e?e.map(t=>({...t,commandsBlob:new Uint8Array(t.commandsBlob)})):null}function Ab(e){return{startingAngle:e.startingAngle,endingAngle:e.endingAngle,innerRadius:e.innerRadius}}function Er(e,t,n="deep"){let{id:r,parentId:i,childIds:o,...s}=e;return n==="fig-import"?{...s,...t!==null?{componentId:t}:{},source:Sn(),boundVariables:{...e.boundVariables},variableBindingScales:{...e.variableBindingScales},variableAssignmentScales:{...e.variableAssignmentScales},variableModes:{...e.variableModes},instanceOverrides:uu(e.instanceOverrides),componentPropertyAssignments:{...e.componentPropertyAssignments},componentPropertyValues:{...e.componentPropertyValues}}:{...s,...t!==null?{componentId:t}:{},boundVariables:{...e.boundVariables},variableBindingScales:{...e.variableBindingScales},variableAssignmentScales:{...e.variableAssignmentScales},variableModes:{...e.variableModes},instanceOverrides:uu(e.instanceOverrides),fills:at(e.fills,a=>kn(a,Nt(a))),strokes:at(e.strokes,a=>kn(a,Ln(a))),effects:at(e.effects,a=>kn(a,xi(a))),layoutGrids:at(e.layoutGrids,gu),guides:at(e.guides,a=>a.map(l=>({...l}))),styleRuns:at(e.styleRuns,a=>kn(a,Ni(a))),source:t===null?structuredClone(e.source):Sn(),dashPattern:at(e.dashPattern,a=>[...a]),fontVariations:at(e.fontVariations,a=>a.map(l=>({...l}))),fontFeatures:at(e.fontFeatures,a=>a.map(l=>({...l}))),textParagraphs:at(e.textParagraphs,a=>a.map(l=>({...l}))),textDecorationFills:at(e.textDecorationFills,Nt),fillGeometry:at(e.fillGeometry,_n),strokeGeometry:at(e.strokeGeometry,_n),gridTemplateColumns:Tn(e.gridTemplateColumns),gridTemplateRows:Tn(e.gridTemplateRows),componentPropertyDefinitions:Eb(e.componentPropertyDefinitions),componentPropertyReferences:Tn(e.componentPropertyReferences),componentPropertyAssignments:{...e.componentPropertyAssignments},symbolLinks:Tn(e.symbolLinks),variantPropSpecs:Tn(e.variantPropSpecs),pluginData:Tn(e.pluginData),pluginRelaunchData:Tn(e.pluginRelaunchData),exportSettings:Tn(e.exportSettings),componentPropertyValues:{...e.componentPropertyValues},derivedLayout:e.derivedLayout?{...e.derivedLayout}:null,arcData:e.arcData?Ab(e.arcData):null,vectorNetwork:e.vectorNetwork?Ai(e.vectorNetwork):null,textPicture:e.textPicture?new Uint8Array(e.textPicture):null,derivedTextGlyphs:e.derivedTextGlyphs?kn(e.derivedTextGlyphs,ds(e.derivedTextGlyphs)??[]):null,textPathData:e.textPathData?structuredClone(e.textPathData):null,textPathBox:e.textPathBox?{...e.textPathBox}:null,gridPosition:e.gridPosition?{...e.gridPosition}:null,targetAspectRatio:e.targetAspectRatio?{...e.targetAspectRatio}:null}}var O4=Ve("rgb"),R4=Ve("p3"),D4=Ve("oklch"),M4=yr("rgb","oklch"),P4=yr("p3","oklch");var w4=Ve("rgb"),k4=Ve("p3"),_4=yr("rgb","oklch"),L4=yr("p3","oklch"),V4=gr("rgb"),F4=gr("p3");var G4=Ve("rgb");var B4=ni("rgb");function nh(e){if(!Number.isInteger(e)||e<=0)throw new RangeError("length must be a positive integer");let t=4294967296,n=t-t%e,r=new Uint32Array(1);do crypto.getRandomValues(r);while(r[0]>=n);return r[0]%e}var vu=["text","fontSize","fontFamily","fontWeight","italic","letterSpacing","styleRuns","fontVariations","fontFeatures","textParagraphs","listSpacing","paragraphSpacing","paragraphIndent","hangingList"],Ri=[...vu,"lineHeight","textCase","textDirection","textAlignHorizontal","textAlignVertical"],Iu=["width","height","textAutoResize","maxLines"];function uh(e){return e==="VERTICAL"?"VERTICAL":"HORIZONTAL"}function xb(e,t){if(!(!e||e.layoutMode==="NONE"||t.layoutPositioning==="ABSOLUTE"))return e}function Nb(e,t){return t.parentId?e.getNode(t.parentId):void 0}function Cb(e,t,n){return e.layoutMode==="NONE"?!1:n===uh(e.layoutMode)?t.layoutGrow>0:t.layoutAlignSelf==="STRETCH"?!0:t.layoutAlignSelf==="AUTO"&&e.layoutMode!=="GRID"&&e.counterAxisAlign==="STRETCH"}function Ob(e,t){if(e.layoutMode!=="NONE")return t===uh(e.layoutMode)?"primaryAxisSizing":"counterAxisSizing"}function Rb(e,t){return e==="WIDTH_AND_HEIGHT"?!0:t==="VERTICAL"&&e==="HEIGHT"}function Db(e,t){if(e.type==="TEXT")return Rb(e.textAutoResize,t);let n=Ob(e,t);return n!==void 0&&e[n]==="HUG"}function ps(e,t,n){return ch(Nb(e,t),t,n)}function ch(e,t,n){let r=xb(e,t);return r&&Cb(r,t,n)?"FILL":Db(t,n)&&(r||t.layoutMode!=="NONE")?"HUG":"FIXED"}var Mb=new Set(vu);function Pb(e,t,n,r){let i={...t,...r};if(i.type==="TEXT"){if(Ri.every(a=>nt(i[a],n[a])))return{width:!1,height:!1};let s=i.textAutoResize;return{width:s==="WIDTH_AND_HEIGHT",height:s==="WIDTH_AND_HEIGHT"||s==="HEIGHT"}}let o=s=>{let a=ps(e,i,s);return a==="FILL"||a==="HUG"&&i.layoutMode!=="NONE"};return{width:o("HORIZONTAL"),height:o("VERTICAL")}}function fh(e,t,n,r){let i=Pb(e,n,r,t);i.width&&Reflect.deleteProperty(t,"width"),i.height&&Reflect.deleteProperty(t,"height")}function wb(e,t){t.type!=="TEXT"||!t.derivedLayout||Object.keys(e).some(n=>Mb.has(n))&&(e.derivedLayout=null)}function Tu(e,t){let n=new Set,r=t.componentId?e.getNode(t.componentId):void 0;for(;r?.type==="INSTANCE"&&r.componentId&&!n.has(r.id);)n.add(r.id),r=e.getNode(r.componentId);return r?.type==="COMPONENT"?r:void 0}function yt(e){return e.componentPropertyReferences.find(t=>t.field==="SLOT_CONTENT")?.propertyId}function bn(e,t,n=yt(t)){if(!n)return!1;let r=t.parentId?e.nodes.get(t.parentId):void 0;for(;r&&r.type!=="INSTANCE";)r=r.parentId?e.nodes.get(r.parentId):void 0;return!!r&&Object.hasOwn(r.componentPropertyAssignments,n)}function dh(e,t,n){let r=Tu(e,t);return[r,r?.parentId?e.nodes.get(r.parentId):void 0].flatMap(i=>i?.componentPropertyDefinitions??[]).find(i=>i.id===n&&i.type==="SLOT")?.name}function Su(e,t){let n=[],r=i=>{for(let o of i.childIds){let s=e.nodes.get(o);s&&(yt(s)?n.push(s):s.type!=="INSTANCE"&&r(s))}};return r(t),n}function ph(e,t){let n=[],r=i=>{for(let o of i.childIds){let s=e.nodes.get(o);!s||yt(s)||(s.type==="INSTANCE"?n.push(s):r(s))}};return r(t),n}function kb(e,t,n){let r=t;for(let i of n)r=r&&ph(e,r).find(o=>o.name===i);return r}function mh(e,t){let n={slots:[],propertyIds:[]},r=(i,o)=>{for(let s of ph(e,i))r(s,[...o,s.name]);for(let s of Su(e,i)){let a=yt(s);if(!a||!Object.hasOwn(i.componentPropertyAssignments,a))continue;i.id===t.id&&n.propertyIds.push(a);let l=dh(e,i,a),u=[...o,l].join("\0");if(!l||n.slots.some(f=>[...f.path,f.name].join("\0")===u))continue;let c=[...s.childIds];for(let f of c)e.reorderChild(f,t.id,t.childIds.length);n.slots.push({path:o,name:l,content:c})}};return r(t,[]),n}function hh(e,t,n){if(!(n.slots.length===0&&n.propertyIds.length===0)){e.updateNode(t.id,{componentPropertyAssignments:Object.fromEntries(Object.entries(t.componentPropertyAssignments).filter(([r])=>!n.propertyIds.includes(r)))});for(let r of n.slots){let i=kb(e,t,r.path),o=i&&Su(e,i).find(a=>{let l=yt(a);return!!l&&dh(e,i,l)===r.name}),s=o&&yt(o);if(!i||!o||!s||Object.hasOwn(i.componentPropertyAssignments,s)){for(let a of r.content)e.deleteNode(a);continue}for(let a of Array.from(o.childIds))e.deleteNode(a);for(let[a,l]of r.content.entries())e.reorderChild(l,o.id,a);e.updateNode(i.id,{componentPropertyAssignments:{...i.componentPropertyAssignments,[s]:""}})}}}function gh(e,t){return{instanceId:e,overrides:t,matched:new Set,leftovers:new Set}}function yh(e,t){let n=e.type==="INSTANCE"?Ct(t.overrides,t.instanceId,e.id,"sourceComponentId"):void 0;return typeof n=="string"?n:e.componentId??void 0}function _b(e,t,n){if(t.type==="INSTANCE"||bi(n.overrides,n.instanceId,t.id,"componentId"))return!1;let r=t.componentId?e.nodes.get(t.componentId):void 0;return!r||!bn(e,t,yt(r))}function vh(e,t){if(t.copies)return t.copies;let n=new Map,r=o=>{for(let s of o.childIds){let a=e.nodes.get(s);if(!a)continue;let l=yh(a,t);l&&n.set(l,[...n.get(l)??[],a]),_b(e,a,t)&&r(a)}},i=e.nodes.get(t.instanceId);return i&&r(i),t.copies=n,n}function Lb(e,t,n,r){return vh(e,t).get(n)?.find(i=>!t.matched.has(i.id)&&e.nodes.has(i.id)&&i.id!==r&&!e.isDescendant(r,i.id))}function Ih(e,t,n){let r=vh(e,t);return r.size===0?!1:(e.nodes.get(n)?.childIds??[]).some(i=>r.get(i)?.some(o=>!t.matched.has(o.id))||Ih(e,t,i))}var rh=new WeakMap;function bu(e){let t=rh.get(e);return t||(t={byInstance:new Map,removals:[]},rh.set(e,t)),t}function Vb(e,t){if(t.keys.length===0)return;let n=bu(e);for(n.removals.push(t);n.removals.length>200;){let r=n.removals.shift();for(let[i,o]of r?.keys??[]){let s=n.byInstance.get(i);!s||s.get(o)?.removals!==r||(s.delete(o),s.size===0&&n.byInstance.delete(i))}}}var yu=new WeakMap;function Th(e,t){let n=yu.get(e);if(n)return t(n);let r={keys:[]};yu.set(e,r);try{return t(r)}finally{yu.delete(e),Vb(e,r)}}function Fb(e,t,n,r){let i=bu(e),o=i.byInstance.get(t.instanceId),s=o?.get(n);if(!o||!s)return;o.delete(n),o.size===0&&i.byInstance.delete(t.instanceId);let a=s.nodes.at(0);if(!(!a||s.nodes.some(l=>e.nodes.has(l.id)))){for(let l of s.nodes){let{id:u,type:c,parentId:f,childIds:g,...h}=structuredClone(l);e.createNodeWithId(u,c,u===a.id?r:f,h)}for(let[l,u]of s.overrides)t.overrides.descendants.set(l,new Map(u));return e.nodes.get(a.id)}}function Gb(e,t,n){let r=bu(e);for(let i of t.leftovers){let o=e.nodes.get(i),s=o?yh(o,t):void 0;if(!o||!s||t.matched.has(i))continue;let a=[],l=f=>{a.push(structuredClone(f));for(let g of f.childIds){let h=e.nodes.get(g);h&&l(h)}};l(o);let u=new Map;for(let f of a){let g=t.overrides.descendants.get(f.id);g&&u.set(f.id,new Map(g)),t.overrides.descendants.delete(f.id)}let c=r.byInstance.get(t.instanceId);c||(c=new Map,r.byInstance.set(t.instanceId,c)),c.set(s,{nodes:a,overrides:u,removals:n}),n.keys.push([t.instanceId,s]),e.deleteNode(i)}t.leftovers.clear()}function Bb(e,t){let n=new Set;return e.closest(t,r=>{if(r.type==="COMPONENT"&&n.add(r.id),r.type==="INSTANCE"){let i=Tu(e,r);i&&n.add(i.id)}return!1}),n}function Sh(e,t,n){let r=Bb(e,n);if(r.size===0)return!1;let i=new Set;function o(s){if(r.has(s))return!0;if(i.has(s))return!1;i.add(s);let a=e.getNode(s);return a?a.type==="INSTANCE"&&a.componentId&&o(a.componentId)?!0:a.childIds.some(o):!1}return o(t)}function Eu(e,t,n){return e.getNode(t)?.type!=="COMPONENT"?!1:!Sh(e,t,n)}var bh=["name","text","fontSize","fontWeight","fontFamily","italic","textDirection","letterSpacing","lineHeight","textCase","textDecoration","textDecorationStyle","textDecorationThickness","textUnderlineOffset","textDecorationFills","textDecorationSkipInk","textAlignHorizontal","textAlignVertical","textAutoResize","textTruncation","maxLines","leadingTrim","paragraphSpacing","paragraphIndent","listSpacing","hangingList","fontVariations","fontFeatures","styleRuns","textParagraphs"],Ub={styleRuns:"text",textParagraphs:"text"},Di=["width","height","minWidth","maxWidth","minHeight","maxHeight","targetAspectRatio","fills","strokes","effects","opacity","cornerRadius","topLeftRadius","topRightRadius","bottomRightRadius","bottomLeftRadius","independentCorners","layoutMode","layoutDirection","layoutWrap","primaryAxisAlign","counterAxisAlign","primaryAxisSizing","counterAxisSizing","itemSpacing","counterAxisSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","gridTemplateColumns","gridTemplateRows","gridColumnGap","gridRowGap","gridPosition","clipsContent","itemReverseZIndex","strokesIncludedInLayout","layoutGrids","blendMode","cornerSmoothing","strokeWeight","strokeAlign","strokeCap","strokeJoin","strokeMiterLimit","dashPattern","independentStrokeWeights","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight","boundVariables","variableModes","fillStyleId","strokeStyleId","textStyleId","effectStyleId","gridStyleId"],zb=["layoutGrow","layoutAlignSelf","locked"],Eh=["x","y","rotation","flipX","flipY","horizontalConstraint","verticalConstraint","layoutPositioning","counterAxisAlignContent","isMask","maskType","arcData","pointCount","starInnerRadius"],Ah=[...Di,...bh,...zb,"visible"],ms=[...Ah,...Eh],xh=Object.freeze({listType:"NONE",indentation:0});function xr(e){let t=[],n=0;for(let r=e.indexOf(`
`);r!==-1;r=e.indexOf(`
`,n))t.push({start:n,end:r}),n=r+1;return t.push({start:n,end:e.length}),t}function Au(e,t){let n=0,r=Math.min(t,e.length);for(let i=e.indexOf(`
`);i!==-1&&i<r;i=e.indexOf(`
`,i+1))n++;return n}function Mi(e,t){return e[t]??xh}var Nr=["listSpacing","paragraphSpacing","paragraphIndent"];function Nh(e){return Nr.some(t=>e[t]!==void 0)}function xu(e,t,n){let{[t]:r,...i}=e;return n===void 0?i:{...i,[t]:n}}function Nu(e){return e.textParagraphs.some(t=>t.listType!=="NONE")}function Cu(e,t){let n=e.slice(0,t).map(r=>({...r}));for(;n.length>0;){let r=n[n.length-1];if(r.listType!=="NONE"||r.indentation!==0||Nh(r))break;n.pop()}return n}function Ou(e,t){return e.listType==="NONE"?{...e,indentation:Math.max(0,Math.min(5,Math.round(t)))}:{...e,indentation:Hb(t)}}function Hb(e){return Math.max(1,Math.min(5,Math.round(e)))}function Gt(e,t){return e==null?null:e*t}function Wb(e,t){return e.map(n=>({...structuredClone(n),weight:n.weight*t,dashPattern:n.dashPattern?.map(r=>r*t)}))}function jb(e,t){return e.map(n=>({...structuredClone(n),offset:{x:n.offset.x*t,y:n.offset.y*t},radius:n.radius*t,spread:n.spread*t}))}function $b(e,t){return e.map(n=>({...structuredClone(n),scale:n.scale==null?void 0:n.scale*t,spacing:n.spacing==null?void 0:n.spacing*t,patternSpacing:n.patternSpacing?{x:n.patternSpacing.x*t,y:n.patternSpacing.y*t}:void 0,noiseSize:n.noiseSize?{x:n.noiseSize.x*t,y:n.noiseSize.y*t}:void 0}))}function Xb(e,t){return e.map(n=>({...structuredClone(n),style:{...structuredClone(n.style),fontSize:n.style.fontSize==null?void 0:n.style.fontSize*t,letterSpacing:n.style.letterSpacing==null?void 0:n.style.letterSpacing*t,lineHeight:Gt(n.style.lineHeight??null,t),textDecorationThickness:Gt(n.style.textDecorationThickness??null,t),textUnderlineOffset:Gt(n.style.textUnderlineOffset??null,t)}}))}function Kb(e,t){return e.map(n=>{let r={...n};for(let i of Nr){let o=n[i];o!==void 0&&(r[i]=o*t)}return r})}function Yb(e,t){return e.map(n=>({...structuredClone(n),offset:n.offset==null?void 0:n.offset*t,sectionSize:n.sectionSize==null?void 0:n.sectionSize*t,gutterSize:n.gutterSize==null?void 0:n.gutterSize*t}))}function ih(e,t){return e.map(n=>({...n,value:n.sizing==="FIXED"?n.value*t:n.value}))}function qb(e,t){if(!e.vectorNetwork)return null;let n=Ai(e.vectorNetwork);for(let r of n.vertices)r.x*=t,r.y*=t;for(let r of n.segments)r.tangentStart.x*=t,r.tangentStart.y*=t,r.tangentEnd.x*=t,r.tangentEnd.y*=t;return n}function Pi(e,t,n){return{x:n?e.x*t:e.x,y:n?e.y*t:e.y,width:e.width*t,height:e.height*t,minWidth:Gt(e.minWidth,t),maxWidth:Gt(e.maxWidth,t),minHeight:Gt(e.minHeight,t),maxHeight:Gt(e.maxHeight,t),cornerRadius:e.cornerRadius*t,topLeftRadius:e.topLeftRadius*t,topRightRadius:e.topRightRadius*t,bottomRightRadius:e.bottomRightRadius*t,bottomLeftRadius:e.bottomLeftRadius*t,fontSize:e.fontSize*t,letterSpacing:e.letterSpacing*t,lineHeight:Gt(e.lineHeight,t),textDecorationThickness:Gt(e.textDecorationThickness,t),textUnderlineOffset:Gt(e.textUnderlineOffset,t),styleRuns:Xb(e.styleRuns,t),listSpacing:e.listSpacing*t,paragraphSpacing:e.paragraphSpacing*t,paragraphIndent:e.paragraphIndent*t,textParagraphs:Kb(e.textParagraphs,t),itemSpacing:e.itemSpacing*t,counterAxisSpacing:e.counterAxisSpacing*t,paddingTop:e.paddingTop*t,paddingRight:e.paddingRight*t,paddingBottom:e.paddingBottom*t,paddingLeft:e.paddingLeft*t,gridColumnGap:e.gridColumnGap*t,gridRowGap:e.gridRowGap*t,gridTemplateColumns:ih(e.gridTemplateColumns,t),gridTemplateRows:ih(e.gridTemplateRows,t),strokes:Wb(e.strokes,t),strokeWeight:e.strokeWeight*t,dashPattern:e.dashPattern.map(r=>r*t),borderTopWeight:e.borderTopWeight*t,borderRightWeight:e.borderRightWeight*t,borderBottomWeight:e.borderBottomWeight*t,borderLeftWeight:e.borderLeftWeight*t,strokeMiterLimit:e.strokeMiterLimit,effects:jb(e.effects,t),fills:$b(e.fills,t),layoutGrids:Yb(e.layoutGrids,t),vectorNetwork:qb(e,t),fillGeometry:br(e.fillGeometry,t,t),strokeGeometry:br(e.strokeGeometry,t,t)}}var hs=new Set(["opacity","width","height","minWidth","maxWidth","minHeight","maxHeight","x","y","rotation","cornerRadius","topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius","strokeWeight","borderTopWeight","borderBottomWeight","borderLeftWeight","borderRightWeight","fontSize","letterSpacing","lineHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","counterAxisSpacing","gridRowGap","gridColumnGap"]);function tn(e){return hs.has(e)}var Ru=new Set(["text","fontFamily"]),Du=new Set(["visible"]);function Ch(e,t){let n={...e.variableBindingScales},r={...e.variableAssignmentScales};for(let i of hs)i==="opacity"||i==="rotation"||(i in e.boundVariables&&(n[i]=(n[i]??1)*t),e.type==="INSTANCE"&&(r[i]=(r[i]??1)*t));return{variableBindingScales:n,variableAssignmentScales:r}}function Oh(e){let t=e.targetAspectRatio;return!t||!(t.x>0)||!(t.y>0)||e.type==="TEXT"&&e.textAutoResize!=="NONE"?null:t.x/t.y}var oh=new Set(["STRETCH","SCALE"]);function sh(e,t,n){return n==="MAX"?{position:e.position+e.size-t,size:t}:n==="CENTER"?{position:e.position+(e.size-t)/2,size:t}:{position:e.position,size:t}}function Zb(e,t,n,r,i){let o=oh.has(n);return i===null||o===oh.has(r)?{x:e,y:t}:o?{x:e,y:sh(t,e.size/i,r)}:{x:sh(e,t.size*i,n),y:t}}function ah(e,t,n,r,i){let o=Math.round(r)-Math.round(n);if(i==="MAX")return{position:e+o,size:t};if(i==="CENTER")return{position:e+Math.round(r/2)-Math.round(n/2),size:t};if(i==="STRETCH")return{position:e,size:Math.abs(t+o)};if(i==="SCALE"&&n>0){let s=r/n;return{position:Math.round(e*s*128)/128,size:t*s}}return{position:e,size:t}}function Jb(e,t,n,r,i,o=null){let s=Zb(ah(e.x,e.width,t.width,n.width,r),ah(e.y,e.height,t.height,n.height,i),r,i,o);return{x:s.x.position,y:s.y.position,width:s.x.size,height:s.y.size}}var Qb=new Set(["x","y","width","height"]);function eE(e,t,n,r){let i={width:t.width*r,height:t.height*r};if(i.width===n.width&&i.height===n.height)return e;let o=Jb(e,i,n,e.horizontalConstraint,e.verticalConstraint,Oh(e));return{...e,...o}}var tE=.001,nE=["strokes","strokeWeight","strokeAlign","strokeCap","strokeJoin","strokeMiterLimit","dashPattern"],Ar=(e,t)=>Math.abs(e-t)<=tE;function rE(e,t){if(!e||!t)return e===t;if(e.vertices.length!==t.vertices.length||e.segments.length!==t.segments.length)return!1;let n=e.vertices.every((i,o)=>{let{x:s,y:a,...l}=i,{x:u,y:c,...f}=t.vertices[o];return Ar(s,u)&&Ar(a,c)&&nt(l,f)}),r=e.segments.every((i,o)=>{let s=t.segments[o];return i.start===s.start&&i.end===s.end&&Ar(i.tangentStart.x,s.tangentStart.x)&&Ar(i.tangentStart.y,s.tangentStart.y)&&Ar(i.tangentEnd.x,s.tangentEnd.x)&&Ar(i.tangentEnd.y,s.tangentEnd.y)});return n&&r&&nt(e.regions,t.regions)}function iE(e,t,n){if(n.type!=="VECTOR")return;let r=e.width??t.width,i=e.height??t.height,o=n.width>0?r/n.width:1,s=n.height>0?i/n.height:1,a=o!==1||s!==1,l=g=>a?pu([o,0,0,0,s,0,0,0,1],g):Ai(g),u=n.vectorNetwork?l(n.vectorNetwork):null;if(rE(t.vectorNetwork,u))return;let c=g=>a?br(g,o,s):_n(g),f=nE.every(g=>nt(e[g]??t[g],n[g]));e.vectorNetwork=u,e.fillGeometry=c(n.fillGeometry),e.strokeGeometry=f?c(n.strokeGeometry):[]}function Ft(e,t,n){e[t]=n}function gs(e,t,n){if(n==="fills")Ft(e,n,Nt(t.fills));else if(n==="strokes")Ft(e,n,Ln(t.strokes));else if(n==="effects")Ft(e,n,xi(t.effects));else if(n==="styleRuns")Ft(e,n,Ni(t.styleRuns));else if(n==="boundVariables")Ft(e,n,{...t.boundVariables}),Ft(e,"variableBindingScales",{...t.variableBindingScales});else if(n==="variableModes")Ft(e,n,{...t.variableModes});else if(n==="gridPosition")Ft(e,n,t.gridPosition?{...t.gridPosition}:null);else if(n==="targetAspectRatio")Ft(e,n,t.targetAspectRatio?{...t.targetAspectRatio}:null);else{let r=t[n];Ft(e,n,Array.isArray(r)?structuredClone(r):r)}}function Rh(e){let t=new Set;for(let n of e){let r=[...n].some(i=>i.startsWith("boundVariables/"));for(let i of n)(i!=="boundVariables"||!r)&&t.add(i)}return n=>t.has(n)}function Dh(e,t,n,r){if(r("boundVariables"))return;let i={...t.boundVariables},o={...t.variableBindingScales};for(let s of new Set([...Object.keys(t.boundVariables),...Object.keys(e.boundVariables),...Object.keys(e.variableBindingScales)]))r(`boundVariables/${s}`)&&(Object.hasOwn(e.boundVariables,s)?i[s]=e.boundVariables[s]:Reflect.deleteProperty(i,s),e.variableBindingScales[s]===void 0?Reflect.deleteProperty(o,s):o[s]=e.variableBindingScales[s]);n.boundVariables=i,n.variableBindingScales=o}function Mh(e,t,n){return n(t)||t in e.boundVariables&&(n("boundVariables")||n(`boundVariables/${t}`))}function ys(e,t){let n=t/e.componentScale;if(!Number.isFinite(n)||n<=0)throw new Error("Invalid component coordinate scale");return n===1?e:{...e,...Pi(e,n,!0),...Ch(e,n)}}function oE(e,t,n,{compParent:r,instParent:i,factor:o,skip:s}){let a=i.layoutMode!=="NONE"&&n.layoutPositioning!=="ABSOLUTE",l=a?n:eE(n,r,i,o);for(let u of ms){if(u==="boundVariables"||a&&(u==="x"||u==="y")||s(u))continue;let c=Ub[u];if(c&&s(c))continue;let f=Qb.has(u)?l:n;nt(t[u],f[u])||gs(e,f,u)}iE(e,t,n),wb(e,t)}function Ph(e,t,n){let r=Object.fromEntries(Object.entries(n).filter(([i,o])=>!nt(t[i],o)));Object.keys(r).length&&e.updateNode(t.id,r)}function wh(e,t,n,r,i="deep"){let o=t.componentScale*r.componentScale/n.componentScale;return e.createNode(t.type,r.id,{...Er(ys(t,o),t.id,i),componentScale:o})}function Cr(e,t,n,r="deep"){if(t===n||e.isDescendant(n,t))return;let i=e.nodes.get(t),o=e.nodes.get(n);if(!(!i||!o))for(let s of i.childIds){let a=e.nodes.get(s);if(!a)continue;let l=wh(e,a,i,o,r);a.childIds.length>0&&Cr(e,s,l.id,r)}}function kh(e,t){let n=[],r=t.parentId?e.nodes.get(t.parentId):void 0;for(;r;)r.type==="INSTANCE"&&n.push(new Set(r.instanceOverrides.descendants.get(t.id)?.keys())),r=r.parentId?e.nodes.get(r.parentId):void 0;return n}var _h={VISIBLE:"visible",TEXT:"text",INSTANCE_SWAP:"componentId"},sE=16;function aE(e,t,n){let r=t.componentId?e.nodes.get(t.componentId):void 0;for(let s=0;r?.type==="INSTANCE"&&s<sE;s++)r=r.componentId?e.nodes.get(r.componentId):void 0;let i=r?.parentId?e.nodes.get(r.parentId):void 0,o=i?.type==="COMPONENT_SET"?i:void 0;return[r,o].flatMap(s=>s?.componentPropertyDefinitions??[]).some(s=>s.id===n)}function Mu(e,t,n){let r=t;for(;r;){if(r.type==="INSTANCE"){if(Object.hasOwn(r.componentPropertyAssignments,n))return r.componentPropertyAssignments[n];if(aE(e,r,n))return}r=r.parentId?e.nodes.get(r.parentId):void 0}}function lE(e,t,n){return Mu(e,t,n)!==void 0}function Lh(e,t){for(let n of t.componentPropertyReferences){let r=_h[n.field];if(!r)continue;let i=Mu(e,t,n.propertyId);i!==void 0&&(r==="visible"?e.updateNode(t.id,{visible:i==="true"}):r==="text"?e.updateNode(t.id,{text:i}):r==="componentId"&&t.type==="INSTANCE"&&e.nodes.has(i)&&e.swapInstanceComponent(t.id,i))}for(let n of e.getChildren(t.id))Lh(e,n)}function uE(e,t,n){let r=new Set;for(let i of n.componentPropertyReferences){let o=_h[i.field];o&&lE(e,t,i.propertyId)&&r.add(o)}return r}function cE(e,t,n){let r={};for(let i of n.componentPropertyReferences){let o=Mu(e,t,i.propertyId);o!==void 0&&(i.field==="TEXT"&&t.type==="TEXT"?r.text=o:i.field==="VISIBLE"&&(r.visible=o==="true"))}return r}function fE(e,t,n){let r=kh(e,t);return r.push(new Set(n.descendants.get(t.id)?.keys())),Rh(r)}function dE(e,t,n,r){n.type==="INSTANCE"?Me(e,t,n.id,"sourceComponentId",r):n.componentId=r}function pE(e,t,n,r,i,o,s){let a=new Map,l=new Map,u=new Map;for(let c of t.childIds){if(o.has(c))continue;let f=e.nodes.get(c);f&&u.set(f.type,(u.get(f.type)??0)+1)}for(let c of n.childIds){let f=e.nodes.get(c);if(!f||s.has(f.id))continue;l.set(f.type,(l.get(f.type)??0)+1);let g=a.get(f.type);g||(g=new Map,a.set(f.type,g));let h=g.get(f.name);h?h.push(f):g.set(f.name,[f])}for(let c of t.childIds){if(o.has(c))continue;let f=e.nodes.get(c);if(!f)continue;let g=a.get(f.type),h=l.get(f.type)??0;if(h>(u.get(f.type)??0))continue;let d=g?.get(f.name)?.shift();d&&(l.set(f.type,h-1),o.set(c,d),s.add(d.id),dE(i,r,d,c))}}function mE(e,t,n,r,i){let o=new Map;for(let a=0;a<r.length;a++)o.set(r[a],a);let s=new Map;for(let a=0;a<t.childIds.length;a++){let l=t.childIds[a],u=e.nodes.get(l),c=u?Ct(i,n,u.id,"sourceComponentId"):void 0,f=typeof c=="string"?c:u?.componentId,g=f?o.get(f):void 0;s.set(l,g??r.length+a)}t.childIds.toSorted((a,l)=>(s.get(a)??0)-(s.get(l)??0)).forEach((a,l)=>{t.childIds[l]!==a&&e.insertChildAt(a,n,l)})}function hE(e,t,n){return t===n||e.isDescendant(n,t)}function gE(e,t,n,r,i,o,s){for(let a of t.childIds){let l=e.nodes.get(a);if(!l)continue;let u=Ct(r,n,l.id,"sourceComponentId"),c=typeof u=="string"?u:l.componentId;c&&i.has(c)&&(o.set(c,l),s.add(l.id))}}function yE(e,t,n,r,i,o){for(let s of r.values())o.matched.add(s.id);for(let s of t.childIds){if(r.has(s))continue;let a=Lb(e,o,s,n.id)??Fb(e,o,s,n.id);if(a){e.insertChildAt(a.id,n.id,n.childIds.length),r.set(s,a),i.add(a.id),o.matched.add(a.id);continue}let l=e.nodes.get(s);if(!l)continue;let u=wh(e,l,t,n);l.childIds.length>0&&!Ih(e,o,s)&&Cr(e,s,u.id),Lh(e,u),r.set(s,u),i.add(u.id),o.matched.add(u.id)}for(let s of n.childIds)i.has(s)||o.leftovers.add(s)}function Vh(e,t,n,r,i=gh(n,r)){if(hE(e,t,n))return;let o=e.nodes.get(t),s=e.nodes.get(n);if(!o||!s)return;let a=new Map,l=new Set;gE(e,s,n,r,new Set(o.childIds),a,l),pE(e,o,s,n,r,a,l),yE(e,o,s,a,l,i);for(let u of o.childIds){let c=e.nodes.get(u),f=a.get(u);if(!c||!f)continue;let g=fE(e,f,r),h=uE(e,f,c),d=c.componentScale*s.componentScale/o.componentScale,v=ys(c,d),T={componentScale:d,componentPropertyReferences:structuredClone(c.componentPropertyReferences)};Dh(f,v,T,g),oE(T,f,v,{compParent:o,instParent:s,factor:d/c.componentScale,skip:E=>h.has(E)||Mh(f,E,g)}),Object.assign(T,cE(e,f,c)),fh(e,T,f,v),Ph(e,f,T),c.childIds.length>0&&!bi(r,n,f.id,"componentId")&&!bn(e,f,yt(c))&&Vh(e,u,f.id,r,i)}mE(e,s,n,o.childIds,r)}function Fh(e){let t={};for(let n of Di)gs(t,e,n);return t}function Gh(e,t,n,r={}){let i=e.nodes.get(t);if(i?.type!=="COMPONENT"||!Eu(e,t,n))return null;let o={...Fh(i),name:i.name},s=e.createNode("INSTANCE",n,{...o,...r,componentId:t});return Cr(e,i.id,s.id),s}function Bh(e,t,n,r="deep"){let i=e.nodes.get(t),o=e.nodes.get(n);!i||!o||i.type!=="INSTANCE"||Cr(e,n,t,r)}function vE(e,t,n){let r=t.parentId?Vn(e,t.parentId):void 0;r&&(typeof Ct(r.instanceOverrides,r.id,t.id,"sourceComponentId")!="string"&&t.componentId&&Me(r.instanceOverrides,r.id,t.id,"sourceComponentId",t.componentId),Me(r.instanceOverrides,r.id,t.id,"componentId",n),e.updateNode(r.id,{instanceOverrides:r.instanceOverrides}))}function Uh(e,t,n,{keepName:r=!1}={}){let i=e.nodes.get(t),o=e.nodes.get(n);if(!i||o?.type!=="COMPONENT"||i.type!=="INSTANCE"||i.parentId&&!Eu(e,n,i.parentId))return;let s=i.componentId?e.nodes.get(i.componentId):void 0;vE(e,i,n);let a={componentId:n},l=ys(o,i.componentScale);for(let f of Di)bi(i.instanceOverrides,i.id,i.id,f)||gs(a,l,f);!r&&(!s||i.name===s.name)&&(a.name=o.name);let u=Array.from(i.childIds),c=mh(e,i);for(let f of u)e.deleteNode(f);e.updateNode(t,a),Cr(e,n,t),hh(e,i,c)}var lh=new WeakMap;function Pu(e,t){Wh(e,t,wu(e,t))}function zh(e,t){Th(e,()=>{for(let n of t)Pu(e,n)})}function Hh(e,t){let n=e.nodes.get(t);n?.type!=="INSTANCE"||!n.componentId||Wh(e,n.componentId,[n])}function Wh(e,t,n){let r=e.nodes.get(t);if(r?.type!=="COMPONENT")return;let i=lh.get(e);if(i||(i=new Set,lh.set(e,i)),!i.has(t)){i.add(t);try{Th(e,o=>{for(let s of n){let a=kh(e,s);a.push(new Set(s.instanceOverrides.self.keys()));let l=Rh(a),u=ys(r,s.componentScale),c={};Dh(s,u,c,l);for(let g of Di)g!=="boundVariables"&&(Mh(s,g,l)||gs(c,u,g));fh(e,c,s,u),Ph(e,s,c);let f=gh(s.id,s.instanceOverrides);Vh(e,r.id,s.id,s.instanceOverrides,f),Gb(e,f,o)}})}finally{i.delete(t)}}}function jh(e,t){let n=e.nodes.get(t);n?.type==="INSTANCE"&&(n.componentId&&e.instanceIndex.get(n.componentId)?.delete(t),n.type="FRAME",n.componentId=null,cu(n.instanceOverrides))}function $h(e,t){let n=e.nodes.get(t);if(n?.componentId)return e.nodes.get(n.componentId)}function wu(e,t){let n=e.instanceIndex.get(t);if(!n)return[];let r=[];for(let i of n){let o=e.nodes.get(i);o&&r.push(o)}return r}function Vn(e,t){let n=e.nodes.get(t);for(;n;){if(n.type==="INSTANCE")return n;n=n.parentId?e.nodes.get(n.parentId):void 0}}function vs(e,t,n){let r=Vn(e,t);return r?bi(r.instanceOverrides,r.id,t,n):!1}var Xh=["x","y","rotation","flipX","flipY"],Kh=["width","height"];var Yh=()=>[1,0,0,0,1,0,0,0,1],IE=(e,t)=>[e[0]*t[0]+e[1]*t[3]+e[2]*t[6],e[0]*t[1]+e[1]*t[4]+e[2]*t[7],e[0]*t[2]+e[1]*t[5]+e[2]*t[8],e[3]*t[0]+e[4]*t[3]+e[5]*t[6],e[3]*t[1]+e[4]*t[4]+e[5]*t[7],e[3]*t[2]+e[4]*t[5]+e[5]*t[8],e[6]*t[0]+e[7]*t[3]+e[8]*t[6],e[6]*t[1]+e[7]*t[4]+e[8]*t[7],e[6]*t[2]+e[7]*t[5]+e[8]*t[8]],TE=(...e)=>{if(e.length===0)return Yh();let t=e[0].slice();for(let n=1;n<e.length;n++)t=IE(t,e[n]);return t},SE=(e,t)=>[1,0,e,0,1,t,0,0,1],bE=(e,t=0,n=0)=>{let r=Math.sin(e),i=Math.cos(e);return[i,-r,r*n+(1-i)*t,r,i,-r*t+(1-i)*n,0,0,1]},EE=(e,t,n=0,r=0)=>[e,0,n-e*n,0,t,r-t*r,0,0,1],AE=e=>{let t=e[0]*e[4]*e[8]+e[1]*e[5]*e[6]+e[2]*e[3]*e[7]-e[2]*e[4]*e[6]-e[1]*e[3]*e[8]-e[0]*e[5]*e[7];return t?[(e[4]*e[8]-e[5]*e[7])/t,(e[2]*e[7]-e[1]*e[8])/t,(e[1]*e[5]-e[2]*e[4])/t,(e[5]*e[6]-e[3]*e[8])/t,(e[0]*e[8]-e[2]*e[6])/t,(e[2]*e[3]-e[0]*e[5])/t,(e[3]*e[7]-e[4]*e[6])/t,(e[1]*e[6]-e[0]*e[7])/t,(e[0]*e[4]-e[1]*e[3])/t]:null},qh=(e,t)=>{if(t.length%2)throw new Error("mapPoints requires even length [x,y,...].");let n=t.slice();for(let r=0;r<n.length;r+=2){let i=n[r],o=n[r+1],s=e[6]*i+e[7]*o+e[8],a=e[0]*i+e[1]*o+e[2],l=e[3]*i+e[4]*o+e[5];n[r]=a/s,n[r+1]=l/s}return n},xE=(e,t)=>{let n=qh(e,[t.x,t.y]);return{x:n[0],y:n[1]}},We={identity:Yh,multiply:TE,translated:SE,rotated:bE,scaled:EE,invert:AE,mapPoints:qh,mapPoint:xE};function Is(e,t){let n=[],r=e;for(;r&&(n.unshift(r),!!r.parentId);)r=t.getNode(r.parentId);let i=We.identity();for(let o of n){let s=Ts(o);i=We.multiply(i,s)}return i}function Zh(e,t){return!e||e.id===t.rootId?We.identity():Is(e,t)}function Jh(e,t){let n=Is(e,t),r=We.mapPoints(n,[0,0]);return{x:r[0],y:r[1]}}function NE(e){return e.type==="LINE"?{x:0,y:0}:{x:e.width/2,y:e.height/2}}function Ts(e,t=e){let n=We.translated(t.x,t.y);if((e.flipX||e.flipY)&&(n=We.multiply(n,We.scaled(e.flipX?-1:1,e.flipY?-1:1,e.width/2,e.height/2))),e.rotation){let r=NE(e);n=We.multiply(n,We.rotated(e.rotation*Math.PI/180,r.x,r.y))}return n}function Qh(e,t,n){let r=We.invert(n);if(!r)return null;let i=We.multiply(r,t),[o,s,,a,l]=i,u=e.flipX?-1:1,c=o*l-s*a<0?-u:u,f=Math.atan2(c*a,u*o)*180/Math.PI;Math.abs(f)<1e-9&&(f=0);let g={rotation:f,flipX:u<0,flipY:c<0},h=Ts({...e,...g},{x:0,y:0});return{...g,x:i[2]-h[2],y:i[5]-h[5]}}function ku(e){return e[0]===1&&e[1]===0&&e[3]===0&&e[4]===1}function _u(e){let t={},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],o=e[i];t[o]=i}return t}function Lu(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let o=r[i],s=e[o];n[o]=t(s,o,e)}return n}function vt(e,t){let n={...e};for(let r=0;r<t.length;r++){let i=t[r];delete n[i]}return n}function Ss(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let o=r[i],s=o,a=e[s];t(a,o)||(n[s]=a)}return n}function Vu(e,t,n){let r=e[t].length,i=Object.keys(e.boundVariables).filter(o=>{if(o===t)return!0;if(!o.startsWith(`${t}/`))return!1;let s=Number.parseInt(o.split("/")[1]??"",10);return Number.isNaN(s)||s<0||s>=r});i.length!==0&&(e.boundVariables=vt(e.boundVariables,i),n.boundVariables={...e.boundVariables})}var eg=()=>({emit(e,...t){for(let n=this.events[e]||[],r=0,i=n.length;r<i;r++)n[r](...t)},events:{},on(e,t){var n;return((n=this.events)[e]||(n[e]=[])).push(t),()=>{this.events[e]=this.events[e]?.filter(r=>t!==r)}}});var CE=class extends AggregateError{constructor(t){super(t,"Committed graph event delivery failed");se(this,"committed",!0);this.name="CommittedGraphEventError"}},tg=class{constructor(){se(this,"delegate",eg());se(this,"buffers",[])}get events(){return this.delegate.events}set events(e){this.delegate.events=e}on(e,t){return this.delegate.on(e,t)}emit(e,...t){let n=this.buffers.at(-1);n?n.push(()=>this.delegate.emit(e,...t)):this.delegate.emit(e,...t)}batch(e){let t=[];this.buffers.push(t);let n;try{n=e()}catch(i){throw this.buffers.pop(),i}this.buffers.pop();let r=this.buffers.at(-1);if(r)r.push(...t);else{let i=[];for(let o of t)try{o()}catch(s){i.push(s)}if(i.length)throw new CE(i)}return n}};function ng(e,t){let n=[t.created?e.on("node:created",t.created):null,t.updated?e.on("node:updated",t.updated):null,t.previewUpdated?e.on("node:previewUpdated",t.previewUpdated):null,t.deleted?e.on("node:deleted",t.deleted):null,t.reparented?e.on("node:reparented",t.reparented):null,t.reordered?e.on("node:reordered",t.reordered):null].filter(r=>!!r);return()=>{for(let r of n)r()}}var OE=new Set(["CANVAS","FRAME","GROUP","SECTION","COMPONENT","COMPONENT_SET","INSTANCE"]),RE=new Set(["COMPONENT","INSTANCE"]);function ig(e){return e.fills.some(t=>t.visible)||e.strokes.some(t=>t.visible)}function og(e,t){let n=t.parentId?e.nodes.get(t.parentId):void 0;return n?.type==="CANVAS"||n?.type==="SECTION"}function bs(e,t){return t.type==="FRAME"&&t.layoutMode!=="NONE"&&og(e,t)}function sg(e,t,n){let r=n.get(e.id);if(r!==void 0)return r;let i=e.parentId?t.getNode(e.parentId):void 0,o=e.rotation!==0||e.flipX||e.flipY||(i?sg(i,t,n):!1);return n.set(e.id,o),o}function Bt(e,t,n,r,i,o=0){if(!sg(n,r,i)){let c=r.getAbsolutePosition(n.id);return e>=c.x-o&&e<=c.x+n.width+o&&t>=c.y-o&&t<=c.y+n.height+o}let s=Is(n,r),a=We.invert(s);if(!a)return!1;let[l,u]=We.mapPoints(a,[e,t]);return l>=-o&&l<=n.width+o&&u>=-o&&u<=n.height+o}function DE(e,t,n,r,i,o,s,a){return Bt(t,n,r,e,s)&&(Fn(e,t,n,i,o,s,a)||ig(r))?r:null}function ME(e,t,n,r,i,o,s,a){if(r.type==="GROUP"){if(!Bt(t,n,r,e,s,a))return null;let u=Fn(e,t,n,i,o,s,a);return u?o?u:r:Bt(t,n,r,e,s)?r:null}let l=Fn(e,t,n,i,o,s,a);return l?r.locked?r:l:Bt(t,n,r,e,s)&&(ig(r)||bs(e,r))?r:null}function Fn(e,t,n,r,i=!1,o=new Map,s=0){let a=e.nodes.get(r);if(!a||a.clipsContent&&!Bt(t,n,a,e,o))return null;for(let l=a.childIds.length-1;l>=0;l--){let u=a.childIds[l],c=e.nodes.get(u);if(!(!c||c.internalOnly||!c.visible)){if(OE.has(c.type)){if(RE.has(c.type)&&!i){let g=DE(e,t,n,c,u,i,o,s);if(g)return g;continue}let f=ME(e,t,n,c,u,i,o,s);if(f)return f;continue}if(Bt(t,n,c,e,o,s))return c}}return null}function ag(e,t,n,r){return Fn(e,t,n,r??e.rootId,!1)}function lg(e,t,n,r,i=0){return Fn(e,t,n,r??e.rootId,!0,new Map,i)}function wi(e,t){return t.type==="COMPONENT_SET"?!0:t.childIds.length===0?!1:t.type==="SECTION"?!0:t.type==="FRAME"&&og(e,t)}function rg(e,t,n,r){let i=new Map;for(let o=t.childIds.length-1;o>=0;o--){let s=e.nodes.get(t.childIds[o]);if(!(!s||s.internalOnly||!s.visible||s.type!=="FRAME")&&!(wi(e,s)&&!bs(e,s))&&Bt(n,r,s,e,i))return s}return null}function PE(e,t,n){let r=new Set;for(let i of t){let o=e.nodes.get(i);o&&o.childIds.length>0&&o.type!=="GROUP"&&o.type!=="BOOLEAN_OPERATION"&&r.add(i);let s=o?.parentId;for(;s&&s!==n&&!r.has(s);)r.add(s),s=e.nodes.get(s)?.parentId}return r}function ug(e,t,n,r,i,o=0){let s=Fn(e,t,n,r,!0,new Map,o);if(!s){let f=e.nodes.get(r);return f?rg(e,f,t,n):null}let a=[];for(let f=s;f&&f.id!==r;)a.unshift(f),f=f.parentId?e.nodes.get(f.parentId):void 0;let l=PE(e,i,r);for(let f of a)if(f.locked||!l.has(f.id)&&!wi(e,f))return f;let u=a.at(-1);if(!u)return null;let c=rg(e,u,t,n);return c||(bs(e,u)||l.has(u.id)&&!wi(e,u)?u:null)}function cg(e,t){let n=e.nodes.get(t);return n!==void 0&&wi(e,n)}function fg(e,t,n,r){let i=Fn(e,t,n,r,!0);for(let o=i??void 0;o&&o.id!==r;){if(!wi(e,o)||bs(e,o))return null;o=o.parentId?e.nodes.get(o.parentId):void 0}return i}function dg(e,t,n,r){let i=e.nodes.get(t);return i!==void 0&&Bt(n,r,i,e,new Map)}var wE=new Set(["FRAME","SECTION","COMPONENT","INSTANCE"]),kE=new Set(["FRAME","SECTION","INSTANCE"]);function _E(e){let{componentSetIds:t}=e;return t?{takes:n=>kE.has(n.type)||n.type==="COMPONENT_SET"&&t.has(n.id),passThrough:new Set(["GROUP"])}:{takes:n=>wE.has(n.type),passThrough:new Set(["GROUP","COMPONENT_SET"])}}function pg(e,t,n,r,i,o,s){if(r.type!=="CANVAS"&&r.clipsContent&&!Bt(t,n,r,e,s))return null;for(let a=r.childIds.length-1;a>=0;a--){let l=r.childIds[a];if(i.has(l))continue;let u=e.nodes.get(l);if(!u||u.internalOnly||!u.visible||u.locked)continue;let c=o.takes(u);if(!c&&!o.passThrough.has(u.type))continue;let f=pg(e,t,n,u,i,o,s);if(f)return f;if(c&&Bt(t,n,u,e,s))return u}return null}function mg(e,t,n,r,i,o={}){let s=e.nodes.get(i??e.rootId);return s?pg(e,t,n,s,r,_E(o),new Map):null}function Fu(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n];r&&t.push(r)}return t}function Gn(e,t){let n={};for(let r=0;r<e.length;r++){let i=e[r],o=t(i,r,e);Object.hasOwn(n,o)||(n[o]=[]),n[o].push(i)}return n}function Gu(e,t){let n=[],r=[];for(let i=0;i<e.length;i++){let o=e[i];t(o,i,e)?n.push(o):r.push(o)}return[n,r]}var LE=e=>e/2**32|0,VE=e=>e>>>0;function hg(e,t,n,r){let i=LE(n),o=VE(n);e.setUint32(t,r?o:i,r),e.setUint32(t+4,r?i:o,r)}function gg(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in e&&e.BYTES_PER_ELEMENT===1}var Bu=e=>e?`"${e}" `:"";function FE(e,t=""){if(typeof e!="number")throw new TypeError(Bu(t)+"expected number, got "+typeof e);if(!Number.isSafeInteger(e)||e<0)throw new RangeError(Bu(t)+"expected integer >= 0, got "+e);return e}function Es(e,t,n=""){if(gg(e)&&(t===void 0||e.length===t))return e;t!==void 0&&FE(t,"length");let r=gg(e),i=t!==void 0?` of length ${t}`:"",o=r?`length=${e.length}`:`type=${typeof e}`,s=Bu(n)+"expected Uint8Array"+i+", got "+o;throw r?new RangeError(s):new TypeError(s)}var GE=(e,t)=>{if(e===null||typeof e!="object"||Array.isArray(e))throw new TypeError((t==="object"?"":`"${t}" `)+"expected object, got type="+typeof e)},yg=(e,t)=>{GE(e,t);let n=Object.getPrototypeOf(e);if(n!==Object.prototype&&n!==null)throw new TypeError(`"${t}" expected plain object`);if(Object.hasOwn(e,"__proto__"))throw new TypeError(`"${t}.__proto__" is not allowed`)};function Uu(e,t=!0){if(e.destroyed)throw new Error("hash was destroyed");if(t&&e.finished)throw new Error("digest() was already called")}function vg(e,t){Es(e,void 0,"output");let n=t.outputLen;if(!(e.length>=n))throw new RangeError('"output" expected length >= '+n)}function zu(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function As(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function xs(e,t){return e<<t|e>>>32-t>>>0}var BE=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",UE=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function Ig(e){if(Es(e),BE)return e.toHex();let t="";for(let n=0;n<e.length;n++)t+=UE[e[n]];return t}function zE(e,t,n="opts"){return yg(e,"defaults"),t!==void 0&&yg(t,n),Object.assign(Object.create(null),e,t)}function Tg(e,t={}){if(typeof e!="function")throw new TypeError('"hashCons" expected function, got type='+typeof e);t=zE({},t,"info");let n=(i,o)=>e(o).update(i).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=i=>e(i),Object.assign(n,t),Object.freeze(n)}function Sg(e,t,n){return e&t^~e&n}function bg(e,t,n){return e&t^e&n^t&n}var Ns=class{constructor(t,n,r,i){se(this,"blockLen");se(this,"outputLen");se(this,"canXOF",!1);se(this,"padOffset");se(this,"isLE");se(this,"buffer");se(this,"view");se(this,"finished",!1);se(this,"length",0);se(this,"pos",0);se(this,"destroyed",!1);this.blockLen=t,this.outputLen=n,this.padOffset=r,this.isLE=i,this.buffer=new Uint8Array(t),this.view=As(this.buffer)}update(t){Uu(this),Es(t);let{view:n,buffer:r,blockLen:i}=this,o=t.length,s=!1;for(let a=0;a<o;){let l=Math.min(i-this.pos,o-a);if(l===i){let u=As(t);for(;i<=o-a;a+=i)this.process(u,a);s=!0;continue}r.set(a===0&&l===o?t:t.subarray(a,a+l),this.pos),this.pos+=l,a+=l,this.pos===i&&(this.process(n,0),this.pos=0,s=!0)}return this.length+=t.length,s&&this.roundClean(),this}digestInto(t){Uu(this),vg(t,this),this.finished=!0;let{buffer:n,view:r,blockLen:i,isLE:o}=this,{pos:s}=this;n[s++]=128,n.fill(0,s),this.padOffset>i-s&&(this.process(r,0),n.fill(0)),hg(r,i-8,this.length*8,o),this.process(r,0),this.roundClean();let a=t===n?r:As(t),l=this.outputLen,u=l/4,c=this.get();if(l%4||u>c.length)throw new Error("invalid outputLen");for(let f=0;f<u;f++)a.setUint32(4*f,c[f],o)}digest(){let{buffer:t,outputLen:n}=this;this.digestInto(t);let r=t.slice(0,n);return this.destroy(),r}_cloneIntoMeta(t){let{buffer:n,length:r,finished:i,destroyed:o,pos:s}=this;return t.destroyed=o,t.finished=i,t.length=r,t.pos=s,s&&t.buffer.set(n),t}clone(){return this._cloneInto()}};var ki=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),En=new Uint32Array(80),Hu=class extends Ns{constructor(){super(64,20,8,!1);se(this,"A",ki[0]|0);se(this,"B",ki[1]|0);se(this,"C",ki[2]|0);se(this,"D",ki[3]|0);se(this,"E",ki[4]|0)}get(){let{A:n,B:r,C:i,D:o,E:s}=this;return[n,r,i,o,s]}set(n,r,i,o,s){this.A=n|0,this.B=r|0,this.C=i|0,this.D=o|0,this.E=s|0}_cloneInto(n){return(n||(n=new this.constructor)).set(...this.get()),this._cloneIntoMeta(n)}process(n,r){for(let u=0;u<16;u++,r+=4)En[u]=n.getUint32(r,!1);for(let u=16;u<80;u++)En[u]=xs(En[u-3]^En[u-8]^En[u-14]^En[u-16],1);let{A:i,B:o,C:s,D:a,E:l}=this;for(let u=0;u<80;u++){let c,f;u<20?(c=Sg(o,s,a),f=1518500249):u<40?(c=o^s^a,f=1859775393):u<60?(c=bg(o,s,a),f=2400959708):(c=o^s^a,f=3395469782);let g=xs(i,5)+c+l+f+En[u]|0;l=a,a=s,s=xs(o,30),o=i,i=g}i=i+this.A|0,o=o+this.B|0,s=s+this.C|0,a=a+this.D|0,l=l+this.E|0,this.set(i,o,s,a,l)}roundClean(){zu(En)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0),zu(this.buffer)}},Eg=Tg(()=>new Hu);function Wu(e,t){let n=t,r=t;for(;r&&!(r.type==="COMPONENT"||r.type==="COMPONENT_SET");)r.type==="INSTANCE"&&(n=r),r=r.parentId?e.getNode(r.parentId):void 0;return n}function Rg(e,t,n){if(!tn(n))return;let r=Wu(e,t);t.variableBindingScales={...t.variableBindingScales,[n]:r.variableAssignmentScales[n]??1}}function ju(e,t,n="active"){let r={};for(let[i,o]of Object.entries(t.boundVariables)){if(!hs.has(i)||(i==="width"||i==="height")&&vs(e,t.id,i))continue;let s=e.resolveNumberVariableForNode(t.id,o,n);if(s===void 0||!Number.isFinite(s))continue;let a=s*(t.variableBindingScales[i]??1);if(!Number.isFinite(a))continue;let l=i==="opacity"?Math.max(0,Math.min(1,a)):a;t[i]!==l&&Object.assign(r,{[i]:l})}return r}function Cs(e){if(typeof e=="string")return e;if(typeof e=="boolean")return String(e);if(typeof e=="number"&&Number.isFinite(e))return XE(e)}var WE=-2147483648,jE=2147483647,$E=1e-6;function XE(e){let t=Math.round(e);if(Math.abs(e-t)<$E)return String(Math.min(jE,Math.max(WE,t))||0);let n=Math.abs(e)*100,r=Math.floor(n),i=n-r===.5?r+r%2:Math.round(n);return`${e<0?"-":""}${Math.floor(i/100)}.${String(i%100).padStart(2,"0")}`}function $u(e,t,n="active"){let r={},i=a=>{let l=t.boundVariables[a];if(!(!l||vs(e,t.id,a)))return e.resolveVariableForNode(t.id,l,n)},o=t.type==="TEXT"?Cs(i("text")):void 0;o!==void 0&&o!==t.text&&(r.text=o);let s=i("visible");return typeof s=="boolean"&&s!==t.visible&&(r.visible=s),r}var KE=["fontSize","fontWeight","letterSpacing","lineHeight"];function Xu(e,t,n="active"){let r=t.styleRuns.map(i=>{let o=i.style.boundVariables;if(!o)return i;let s=i.style;for(let a of KE){let l=o[a];if(!l)continue;let u=e.resolveNumberVariableForNode(t.id,l,n);u===void 0||!Number.isFinite(u)||s[a]===u||(s={...s,[a]:u})}return s===i.style?i:{...i,style:s}});return r.some((i,o)=>i!==t.styleRuns[o])?{styleRuns:r}:{}}function Ag(e,t){e.color={...t,a:1},e.opacity=t.a}function _i(e,t,n="active"){let r={};for(let i in t.boundVariables){if(!i.endsWith("/color"))continue;let o=/^(fills|strokes)\/(\d+)\/color$/.exec(i);if(!o)continue;let s=e.resolveColorVariableForNode(t.id,t.boundVariables[i],n),a=Number(o[2]);if(s)if(o[1]==="fills"){if(!t.fills[a])continue;r.fills??(r.fills=Nt(t.fills)),Ag(r.fills[a],s)}else{if(!t.strokes[a])continue;r.strokes??(r.strokes=Ln(t.strokes)),Ag(r.strokes[a],s)}}return r}function Dg(e,t){e.variables.set(t.id,t);let n=e.variableCollections.get(t.collectionId);n&&!n.variableIds.includes(t.id)&&n.variableIds.push(t.id)}function Mg(e,t){let n=e.variables.get(t);if(!n)return;e.variables.delete(t);let r=e.variableCollections.get(n.collectionId);r&&(r.variableIds=r.variableIds.filter(i=>i!==t));for(let i of e.nodes.values())Object.values(i.boundVariables).includes(t)&&(e.willChangeNode(i),i.boundVariables=Ss(i.boundVariables,o=>o===t),i.variableBindingScales=Ss(i.variableBindingScales,(o,s)=>!(s in i.boundVariables)),e.emitter.emit("node:updated",i.id,{boundVariables:{...i.boundVariables},variableBindingScales:{...i.variableBindingScales}}),Yu(e,i.id))}function Pg(e,t){e.variableCollections.set(t.id,t),e.activeMode.has(t.id)||e.activeMode.set(t.id,t.defaultModeId)}function YE(e,t){return t!==void 0?t:e==="COLOR"?{...vn}:e==="FLOAT"?0:e==="BOOLEAN"?!1:""}function qE(e,t,n,r,i,o){let s=e.variableCollections.get(i);if(!s)throw new Error(`Collection "${i}" not found`);let a=t(),l=YE(r,o),u={};for(let f of s.modes)u[f.modeId]=structuredClone(l);let c={id:a,name:n,type:r,collectionId:i,valuesByMode:u,description:"",hiddenFromPublishing:!1};return Dg(e,c),c}function ZE(e,t,n){let r=t(),i=t(),o={id:r,name:n,modes:[{modeId:i,name:"Mode 1"}],defaultModeId:i,variableIds:[]};return Pg(e,o),o}function JE(e,t){let n=e.variableCollections.get(t);if(n)for(let r of Array.from(n.variableIds))Mg(e,r);e.variableCollections.delete(t),e.activeMode.delete(t)}function Ku(e,t){let n=e.activeMode.get(t);return n||(e.variableCollections.get(t)?.defaultModeId??"")}function Os(e,t,n,r="active"){let i=e.nodes.get(t);for(;i;){let o=i.variableModes[n];if(o)return o;i=i.parentId?e.nodes.get(i.parentId):void 0}return r==="default"?e.variableCollections.get(n)?.defaultModeId??"":Ku(e,n)}function QE(e,t,n){e.activeMode.set(t,n)}function wg(e,t,n,r,i){let o=e.variableCollections.get(t);if(!o)return;o.modes.push({modeId:n,name:r});let s=i??o.defaultModeId;for(let a of o.variableIds){let l=e.variables.get(a);l&&(l.valuesByMode[n]=structuredClone(l.valuesByMode[s]??Object.values(l.valuesByMode)[0]))}}function eA(e,t,n,r,i){if(!e.variableCollections.has(n))return;let o=t();return wg(e,n,o,r,i),o}function tA(e,t,n){let r=e.variableCollections.get(t);if(!(!r||r.modes.length<=1)){r.modes=r.modes.filter(i=>i.modeId!==n),r.defaultModeId===n&&(r.defaultModeId=r.modes[0].modeId);for(let i of r.variableIds){let o=e.variables.get(i);o&&(o.valuesByMode=vt(o.valuesByMode,[n]))}e.activeMode.get(t)===n&&e.activeMode.set(t,r.defaultModeId)}}function nA(e,t,n,r){let i=e.variableCollections.get(t);if(!i)return;let o=i.modes.find(s=>s.modeId===n);o&&(o.name=r)}function rA(e,t,n){let r=e.variableCollections.get(t);r&&r.modes.some(i=>i.modeId===n)&&(r.defaultModeId=n,r.modes=kg(r))}function kg(e){let[t,n]=Gu(e.modes,r=>r.modeId===e.defaultModeId);return[...t,...n]}function Bn(e,t,n,r){if(r?.has(t))return;let i=e.variables.get(t);if(!i)return;let o=e.variableCollections.get(i.collectionId),s=n??Ku(e,i.collectionId),a=o?.defaultModeId,l=Object.hasOwn(i.valuesByMode,s)?i.valuesByMode[s]:void 0;if(l===void 0&&a&&Object.hasOwn(i.valuesByMode,a)&&(l=i.valuesByMode[a]),l??(l=Object.values(i.valuesByMode)[0]),l&&typeof l=="object"&&"aliasId"in l){let u=r??new Set;return u.add(t),Bn(e,l.aliasId,s,u)}return l}function iA(e,t){let n=Bn(e,t);if(n&&typeof n=="object"&&"r"in n)return n}function oA(e,t){let n=Bn(e,t);return typeof n=="number"?n:void 0}function sA(e,t,n,r="active"){let i=e.variables.get(n);if(!i)return;let o=Bn(e,n,Os(e,t,i.collectionId,r));if(o&&typeof o=="object"&&"r"in o)return o}function aA(e,t,n,r="active"){let i=e.variables.get(n);if(!i)return;let o=Bn(e,n,Os(e,t,i.collectionId,r));return typeof o=="number"?o:void 0}function _g(e,t,n,r="active"){let i=e.variables.get(n);if(i)return Bn(e,n,Os(e,t,i.collectionId,r))}function lA(e,t,n,r="active"){let i=_g(e,t,n,r);return typeof i=="string"?i:void 0}function uA(e,t){let n=e.variableCollections.get(t);return n?n.variableIds.map(r=>e.variables.get(r)).filter(r=>r!==void 0):[]}function cA(e,t){return[...e.variables.values()].filter(n=>n.type===t)}function fA(e,t,n,r){let i=e.nodes.get(t);if(!i)return;let o=e.variables.get(r);if(!o)throw new Error(`Variable "${r}" not found`);let s=n.match(/^(fills|strokes)\/(\d+)\/color$/);if(s){if(o.type!=="COLOR")throw new Error(`Cannot bind ${o.type} variable to color field "${n}"`);let a=s[1],l=Number.parseInt(s[2],10),u=i[a]?.length??0;if(l>=u)throw new Error(`Index ${l} out of range for ${a} (length ${u})`);let c=s[1];c in i.boundVariables&&(i.boundVariables=vt(i.boundVariables,[c]))}if(tn(n)&&o.type!=="FLOAT")throw new Error(`Cannot bind ${o.type} variable to scalar field "${n}"`);if(Ru.has(n)&&o.type!=="STRING")throw new Error(`Cannot bind ${o.type} variable to string field "${n}"`);if(Du.has(n)&&o.type!=="BOOLEAN")throw new Error(`Cannot bind ${o.type} variable to boolean field "${n}"`);if(!(tn(n)||Ru.has(n)||Du.has(n)||s))throw new Error(`Unknown binding field "${n}"`);e.willChangeNode(i),i.boundVariables={...i.boundVariables,[n]:r},Rg(e,i,n),Yu(e,t,n),e.emitter.emit("node:updated",t,{boundVariables:{...i.boundVariables},variableBindingScales:{...i.variableBindingScales}})}function dA(e,t,n){let r=e.nodes.get(t);r&&n in r.boundVariables&&(e.willChangeNode(r),r.boundVariables=vt(r.boundVariables,[n]),r.variableBindingScales=vt(r.variableBindingScales,[n]),Yu(e,t,n),e.emitter.emit("node:updated",t,{boundVariables:{...r.boundVariables},variableBindingScales:{...r.variableBindingScales}}))}function Yu(e,t,n){let r=e.nodes.get(t);if(!r)return;let i=Wu(e,r);if(i.type!=="INSTANCE")return;let o=Vn(e,t);o&&Me(o.instanceOverrides,o.id,t,"boundVariables"),Me(i.instanceOverrides,i.id,t,"boundVariables"),n&&Me(i.instanceOverrides,i.id,t,`boundVariables/${n}`,r.boundVariables[n]??null)}function qu(e,t){return e.map(n=>{let{boundVariables:r,textStyleId:i,fillStyleId:o,hyperlink:s}=n.style,a=s?.type==="NODE"&&t.node!==void 0;if(!r&&!i&&!o&&!a)return n;let l={...n.style};return s?.type==="NODE"&&t.node&&(l.hyperlink={type:"NODE",value:t.node(s.value)}),r&&(l.boundVariables=Lu(r,u=>u&&t.variable(u))),i&&(l.textStyleId=t.style(i)),o&&(l.fillStyleId=t.style(o)),{...n,style:l}})}var Zu=2147483647;function Ju(e){return e===null||e===1/0||(e??0)>=2147483647}function Rs(e){let t=e.count===void 0?e.numSections:e.count;return Ju(t)?Zu:t??1}var xg=["DECIMAL","LOWER_ALPHA","LOWER_ROMAN"];function Lg(e){return xg[(Math.max(1,e)-1)%xg.length]}function pA(e){let t="";for(let n=e;n>0;n=Math.floor((n-1)/26))t=String.fromCharCode(97+(n-1)%26)+t;return t}var mA=[[1e3,"m"],[900,"cm"],[500,"d"],[400,"cd"],[100,"c"],[90,"xc"],[50,"l"],[40,"xl"],[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]];function hA(e){let t=e,n="";for(let[r,i]of mA)for(;t>=r;t-=r)n+=i;return n}function Vg(e,t){return t==="LOWER_ALPHA"?pA(e):t==="LOWER_ROMAN"?hA(e):String(e)}function Qu(e,t){if(!t.some(o=>o.listType!=="NONE"))return[];let n=[],r=[],i=-1;for(let[o,s]of xr(e).entries()){let a=Mi(t,o);if(a.listType==="NONE"){r.length=0,i=-1;continue}let l=Math.max(1,a.indentation);r.length=Math.min(r.length,l);let u=r[l-1],c=u?.listType===a.listType,f=c?u.count+1:1;r[l-1]={listType:a.listType,count:f};let g=r.slice(0,l-1).some(d=>d!==void 0);(i===-1||!c&&!g)&&(i=o);let h=a.listType==="UNORDERED"?"\u2022":`${Vg(f,Lg(l))}.`;n.push({...s,paragraph:o,listType:a.listType,level:l,ordinal:f,marker:h,startsList:!c,groupStart:i})}return n}var Fg=["fontFamily","fontWeight","italic","fontSize","lineHeight","letterSpacing","textDecoration","textCase","fontFeatures"],gA=new Set(Fg);function Gg(e,t){let n={...t};return"fills"in t&&!("fillStyleId"in t)&&e.fillStyleId&&(n.fillStyleId=null),"strokes"in t&&!("strokeStyleId"in t)&&e.strokeStyleId&&(n.strokeStyleId=null),"effects"in t&&!("effectStyleId"in t)&&e.effectStyleId&&(n.effectStyleId=null),"layoutGrids"in t&&!("gridStyleId"in t)&&e.gridStyleId&&(n.gridStyleId=null),Object.keys(t).some(r=>gA.has(r))&&!("textStyleId"in t)&&e.textStyleId&&(n.textStyleId=null),n}var Bg=new Set([...Ri,"textDecoration","fills","width","height"]),Ug=new Set(Ri);function zg(e,t){let n={},r=Object.keys(t).filter(o=>!nt(e[o],t[o]));e.textPicture&&r.some(o=>Bg.has(o))&&(n.textPicture=null);let i=r.some(o=>Ug.has(o))||Iu.some(o=>r.includes(o));return i&&!("derivedLayout"in t)&&(n.derivedLayout=null),e.derivedTextGlyphs&&i&&!t.derivedTextGlyphs&&(e.textPathData&&r.every(o=>o==="width"||o==="height")||(n.derivedTextGlyphs=null,n.textPathData=null)),n}function yA(e,t){Object.assign(e,zg(e,t))}var vA=new Set(["x","y","width","height","rotation","flipX","flipY","parentId","childIds","layoutMode","layoutDirection","layoutWrap","primaryAxisSizing","counterAxisSizing","itemSpacing","counterAxisSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","layoutGrow","layoutAlignSelf","layoutPositioning","minWidth","maxWidth","minHeight","maxHeight","visible","text","fontSize","lineHeight","letterSpacing","styleRuns","textAutoResize"]);function IA(e,t,n,r){let i=e.nodes.get(t);if(!i||(n=Object.fromEntries(Object.entries(n).filter(([,s])=>s!==void 0)),Object.keys(n).every(s=>i[s]===n[s])))return null;Object.keys(n).some(s=>vA.has(s))&&e.clearAbsPosCache();let o=n;return i.type==="TEXT"&&(o={...zg(i,n),...n}),n.vectorNetwork&&(o={...o,vectorNetwork:cs(n.vectorNetwork)}),r?.(i,o),e.positionPreviewVersion++,Object.assign(i,o),o}function TA(e,t){if(t.length===0)return;let n=new Set(e.source.editedFields);for(let r of t)n.add(r);e.source.editedFields=[...n]}var SA=2;function bA(){return SA+nh(2147483646)}var EA=bA(),AA=1;function Ds(){return`${EA}:${AA++}`}function Ng(e){let t={};for(let n of Object.keys(e)){let r=e[n];r!==void 0&&(t[n]=r)}return t}var nn,Li=(nn=class{constructor(t=Ds){se(this,"idGenerator");se(this,"nodes",new Map);se(this,"images",new Map);se(this,"variables",new Map);se(this,"variableCollections",new Map);se(this,"activeMode",new Map);se(this,"rootId");se(this,"figKiwiVersion",null);se(this,"figSchemaDeflated",null);se(this,"documentColorSpace","srgb");se(this,"enabledLibraries",new Map);se(this,"emitter",new tg);se(this,"absPosCache",new Map);se(this,"previewMutationDepth",0);se(this,"previewObservers",[]);se(this,"changeObservers",new Set);se(this,"sourceMetadataPreservationDepth",0);se(this,"importedStateApplicationDepth",0);se(this,"importedIdGenerator");se(this,"layoutMutationDepth",0);se(this,"derivedLayoutDepth",0);se(this,"positionPreviewVersion",0);se(this,"instanceIndex",new Map);this.idGenerator=t;let n=Sr(this.idGenerator,"FRAME",{name:"Document",width:0,height:0});this.rootId=n.id,this.nodes.set(n.id,n),this.addPage("Page 1")}addPage(t){return this.createNode("CANVAS",this.rootId,{name:t,width:0,height:0})}getPages(t=!1){return this.getChildren(this.rootId).filter(n=>n.type==="CANVAS"&&(t||!n.internalOnly))}getAllNodes(){return this.nodes.values()}getNode(t){return this.nodes.get(t)}onNodeEvents(t){return ng(this.emitter,t)}observeNodeChanges(t){return this.changeObservers.add(t),()=>this.changeObservers.delete(t)}willChangeNode(t){if(t)for(let n of this.changeObservers)n.before(t)}countDescendants(t){let n=this.nodes.get(t);if(!n)return 0;let r=0,i=[...n.childIds];for(;i.length>0;){let o=i.pop();if(o===void 0)break;r++;let s=this.nodes.get(o);if(s)for(let a of s.childIds)i.push(a)}return r}addVariable(t){Dg(this,t)}removeVariable(t){Mg(this,t)}addCollection(t){Pg(this,t)}createVariable(t,n,r,i){return qE(this,()=>this.generateEntityId(),t,n,r,i)}createCollection(t){let n=new Set;return ZE(this,()=>this.generateEntityId(n),t)}createMode(t,n,r){return eA(this,()=>this.generateEntityId(),t,n,r)}removeCollection(t){JE(this,t)}getActiveModeId(t){return Ku(this,t)}getNodeVariableModeId(t,n){return Os(this,t,n)}setActiveMode(t,n){QE(this,t,n)}addMode(t,n,r,i){wg(this,t,n,r,i)}removeMode(t,n){tA(this,t,n)}renameMode(t,n,r){nA(this,t,n,r)}setDefaultMode(t,n){rA(this,t,n)}resolveVariable(t,n,r){return Bn(this,t,n,r)}resolveColorVariable(t){return iA(this,t)}resolveNumberVariable(t){return oA(this,t)}resolveColorVariableForNode(t,n,r){return sA(this,t,n,r)}resolveNumberVariableForNode(t,n,r){return aA(this,t,n,r)}resolveVariableForNode(t,n,r){return _g(this,t,n,r)}resolveStringVariableForNode(t,n,r){return lA(this,t,n,r)}getVariablesForCollection(t){return uA(this,t)}getVariablesByType(t){return cA(this,t)}bindVariable(t,n,r){fA(this,t,n,r)}unbindVariable(t,n){dA(this,t,n)}getChildren(t){let n=this.nodes.get(t);return n?n.childIds.map(r=>this.nodes.get(r)).filter(r=>r!==void 0):[]}isContainer(t){let n=this.nodes.get(t);return n?du.has(n.type):!1}isDescendant(t,n){return this.closest(t,r=>r.id===n)!==void 0}closest(t,n){let r=this.nodes.get(t);for(let i=0;r&&i<this.nodes.size;i++){if(n(r))return r;r=r.parentId?this.nodes.get(r.parentId):void 0}}pageOf(t){return this.closest(t,n=>n.type==="CANVAS")?.id??null}clearAbsPosCache(){this.absPosCache.clear()}getAbsolutePosition(t){let n=this.absPosCache.get(t);if(n)return n;let r=this.getNode(t);if(!r)return{x:0,y:0};let i=Jh(r,this);return this.absPosCache.set(t,i),i}getAbsoluteBounds(t){let n=this.getAbsolutePosition(t),r=this.nodes.get(t);return{x:n.x,y:n.y,width:r?.width??0,height:r?.height??0}}generateEntityId(t){let n=1/0;for(let r=0;r<n;r++){let i=(this.importedIdGenerator??this.idGenerator)();if(this.isEntityIdTaken(i)||t?.has(i)){n===1/0&&(n=this.entityIdCount()+(t?.size??0)+1);continue}return t?.add(i),i}throw new Error("The ID generator only returned IDs that are in use")}entityIdCount(){let t=this.nodes.size+this.variables.size+this.variableCollections.size;for(let n of this.variableCollections.values())t+=n.modes.length;return t}isEntityIdTaken(t){if(this.nodes.has(t)||this.variables.has(t)||this.variableCollections.has(t))return!0;for(let n of this.variableCollections.values())for(let r of n.modes)if(r.modeId===t)return!0;return!1}registerNode(t,n){t.parentId=n,this.nodes.set(t.id,t);for(let r of this.changeObservers)r.created(t);if(t.type==="INSTANCE"&&t.componentId){let r=this.instanceIndex.get(t.componentId);r||(r=new Set,this.instanceIndex.set(t.componentId,r)),r.add(t.id)}return this.emitter.emit("node:created",t),t}withBufferedEvents(t){return this.emitter.batch(t)}createNode(t,n,r={}){let i=Sr(()=>this.generateEntityId(),t,r),o=this.nodes.get(n);return this.willChangeNode(o),o?.childIds.push(i.id),this.registerNode(i,n)}createNodeWithId(t,n,r,i={}){let o=Sr(()=>t,n,i);o.id=t;let s=r?this.nodes.get(r):void 0;return s&&!s.childIds.includes(t)&&(this.willChangeNode(s),s.childIds.push(t)),this.registerNode(o,r)}runPreviewUpdates(t,n){this.previewMutationDepth++,n&&this.previewObservers.push(n);try{t()}finally{n&&this.previewObservers.pop(),this.previewMutationDepth--}}preserveSourceMetadataDuring(t){this.sourceMetadataPreservationDepth++;try{return t()}finally{this.sourceMetadataPreservationDepth--}}get isPreservingSourceMetadata(){return this.sourceMetadataPreservationDepth>0}applyImportedStateDuring(t,n){let r=this.importedIdGenerator;this.importedIdGenerator=n??r,this.importedStateApplicationDepth++;try{return this.preserveSourceMetadataDuring(t)}finally{this.importedStateApplicationDepth--,this.importedIdGenerator=r}}get isApplyingImportedState(){return this.importedStateApplicationDepth>0}applyDerivedLayoutDuring(t){this.derivedLayoutDepth++;try{t()}finally{this.derivedLayoutDepth--}}get isApplyingDerivedLayout(){return this.derivedLayoutDepth>0}withLayoutMutations(t){this.layoutMutationDepth++;try{t()}finally{this.layoutMutationDepth--}}get isApplyingLayout(){return this.layoutMutationDepth>0}updateNodePositionPreview(t,n,r){this.updateNodePreview(t,{x:n,y:r})}updateNodePreview(t,n){let r=IA(this,t,n,(i,o)=>{for(let s of this.previewObservers)s(i,o)});r&&this.emitter.emit("node:previewUpdated",t,r)}updateNode(t,n){if(this.previewMutationDepth>0){this.updateNodePreview(t,n);return}let r=this.nodes.get(t);r&&(n=Ng(Gg(r,Ng(n))),this.applyNodeChanges(r,n))}restoreNodeProperties(t,n,r){let i=this.nodes.get(t);i&&this.applyNodeChanges(i,n,r)}applyNodeChanges(t,n,r=[]){let{id:i}=t;if(this.willChangeNode(t),r.length){n={...n};for(let o of r)Reflect.set(n,o,void 0)}if(Object.keys(n).some(o=>nn.LAYOUT_AFFECTING_KEYS.has(o))&&this.absPosCache.clear(),t.type==="INSTANCE"&&"componentId"in n&&n.componentId!==t.componentId&&(t.componentId&&this.instanceIndex.get(t.componentId)?.delete(i),n.componentId)){let o=this.instanceIndex.get(n.componentId);o||(o=new Set,this.instanceIndex.set(n.componentId,o)),o.add(i)}t.type==="TEXT"&&yA(t,n),this.sourceMetadataPreservationDepth===0&&!this.isApplyingLayout&&TA(t,Object.keys(n)),n.vectorNetwork&&(n={...n,vectorNetwork:cs(n.vectorNetwork)}),Object.assign(t,n),n.fills&&Vu(t,"fills",n),n.strokes&&Vu(t,"strokes",n);for(let o of r)Reflect.deleteProperty(t,o);this.emitter.emit("node:updated",i,n)}reparentNode(t,n){let r=this.nodes.get(t);if(!r||t===this.rootId||this.isDescendant(n,t))return;let i=r.parentId?this.nodes.get(r.parentId):void 0,o=this.nodes.get(n);if(!o||r.parentId===n)return;let s=r.parentId;this.willChangeNode(r),this.willChangeNode(i),this.willChangeNode(o),this.absPosCache.clear();let a=this.parentWorldMatrix(i),l=this.parentWorldMatrix(o);if(i&&(i.childIds=i.childIds.filter(u=>u!==t)),r.parentId=n,o.childIds.push(t),ku(a)&&ku(l))r.x+=a[2]-l[2],r.y+=a[5]-l[5];else{let u=We.multiply(a,Ts(r)),c=Qh(r,u,l);c&&Object.assign(r,c)}this.emitter.emit("node:reparented",t,s,n)}parentWorldMatrix(t){return Zh(t,this)}reorderChild(t,n,r){let i=this.nodes.get(t);if(!i)return;let o=i.parentId,s=o?this.nodes.get(o):void 0,a=this.nodes.get(n);if(!a||this.isDescendant(n,t))return;this.willChangeNode(i),this.willChangeNode(s),this.willChangeNode(a),s&&(s.childIds=s.childIds.filter(u=>u!==t));let l=r;s===a&&l>(s.childIds.includes(t)?s.childIds.length:l),i.parentId=n,this.absPosCache.clear(),l=Math.min(l,a.childIds.length),a.childIds.splice(l,0,t),this.emitter.emit("node:reordered",t,n,l,o)}insertChildAt(t,n,r){let i=this.getNode(t),o=this.getNode(n);if(!i||!o||t===n||this.isDescendant(n,t))return;let s=i.parentId,a=s?this.getNode(s):void 0;this.willChangeNode(i),this.willChangeNode(a),this.willChangeNode(o),a&&(a.childIds=a.childIds.filter(l=>l!==t)),o.childIds=o.childIds.filter(l=>l!==t),o.childIds.splice(r,0,t),i.parentId=n,this.clearAbsPosCache(),this.emitter.emit("node:reordered",t,n,r,s)}deleteNode(t){let n=this.nodes.get(t);if(!(!n||t===this.rootId)){if(this.willChangeNode(n),n.parentId){let r=this.nodes.get(n.parentId);this.willChangeNode(r),r&&(r.childIds=r.childIds.filter(i=>i!==t))}for(let r of Array.from(n.childIds))this.deleteNode(r);n.type==="INSTANCE"&&n.componentId&&this.instanceIndex.get(n.componentId)?.delete(t),this.nodes.delete(t),this.emitter.emit("node:deleted",t,n.parentId)}}hitTest(t,n,r){return ag(this,t,n,r)}hitTestDeep(t,n,r,i=0){return lg(this,t,n,r,i)}hitTestSelectable(t,n,r,i,o=0){return ug(this,t,n,r,i,o)}hitTestOpenContainer(t,n,r){return fg(this,t,n,r)}isOpenContainer(t){return cg(this,t)}isPointInNode(t,n,r){return dg(this,t,n,r)}hitTestDropTarget(t,n,r,i,o){return mg(this,t,n,r,i,o)}cloneTree(t,n,r={}){let i=this.nodes.get(t);if(!i)return null;let o=Er(i,null);o.source={...o.source,id:null,orderKey:null};let s=this.createNode(i.type,n,{...o,...r});for(let a of i.childIds)this.cloneTree(a,s.id);return s}createInstance(t,n,r={}){return Gh(this,t,n,r)}populateInstanceChildren(t,n,r="deep"){Bh(this,t,n,r)}swapInstanceComponent(t,n,r){Uh(this,t,n,r)}syncInstances(t){Pu(this,t)}syncInstancesTogether(t){zh(this,t)}syncInstance(t){Hh(this,t)}detachInstance(t){jh(this,t)}getMainComponent(t){return $h(this,t)}getInstances(t){return wu(this,t)}flattenTree(t,n=0){let r=t??this.rootId,i=this.nodes.get(r);if(!i)return[];let o=[];for(let s of i.childIds){let a=this.nodes.get(s);a&&(o.push({node:a,depth:n}),a.childIds.length>0&&o.push(...this.flattenTree(s,n+1)))}return o}},se(nn,"TEXT_PICTURE_KEYS",Bg),se(nn,"GLYPH_AFFECTING_KEYS",Ug),se(nn,"LAYOUT_AFFECTING_KEYS",new Set([...Xh,...Kh,"layoutMode","layoutDirection","itemSpacing","counterAxisSpacing","paddingLeft","paddingRight","paddingTop","paddingBottom","primaryAxisAlign","counterAxisAlign","counterAxisAlignContent","layoutWrap","primaryAxisSizing","counterAxisSizing","layoutPositioning","layoutGrow","layoutAlignSelf","strokesIncludedInLayout","horizontalConstraint","verticalConstraint","gridTemplateColumns","gridTemplateRows","gridColumnGap","gridRowGap","gridPosition","minWidth","maxWidth","minHeight","maxHeight","targetAspectRatio"])),nn);function Ms(e){return Ig(Eg(e))}function Ps(e,t,n){return n==null?Math.min(e,t):Math.min(Math.max(e,t),n)}var ws={100:"Thin",200:"Extra Light",300:"Light",400:"Regular",500:"Medium",600:"Semi Bold",700:"Bold",800:"Extra Bold",900:"Black"},xA=new Map([{weight:100,names:["thin","hairline","extrathin","ultrathin"]},{weight:200,names:["extralight","ultralight"]},{weight:300,names:["light"]},{weight:400,names:["regular","normal","book","roman","plain"]},{weight:500,names:["medium"]},{weight:600,names:["semibold","demibold"]},{weight:700,names:["bold"]},{weight:800,names:["extrabold","ultrabold"]},{weight:900,names:["black","heavy"]}].flatMap(({names:e,weight:t})=>e.map(n=>[n,t])));function Hg(e){return e.toLowerCase().replace(/italic|oblique/u,"").replace(/[^a-z0-9]+/gu,"")}function Wg(e){let t=e??"",n=/(?:italic|oblique)/iu.test(t),r=Hg(t),i=r.match(/(?:^|[^0-9])([1-9]00)(?:[^0-9]|$)/u)?.[1];return{weight:i?Number(i):xA.get(r)??400,italic:n}}function ks(e){return Wg(e).weight}function Vi(e){return e.replace(/\s+(Variable|\d+(?:pt|px|em))$/i,"")}function ec(e,t=!1){let n=Math.round(e/100)*100,r=(ws[n]??"Regular").replace(/ /g,"");return t?`${r} Italic`:r}var jg=yo(Eo(),1);function $g(e,t="NONZERO",n={}){let r=KA(e,t,{includeOpenRegions:n.includeOpenRegions??!1,strictCommands:!1});return r.ok?r.network:{vertices:[],segments:[],regions:[]}}function KA(e,t,n){let r=[],i=[],o=[],s=null,a=0,l=0,u=new Map;function c(S,C){let A=`${S},${C}`,_=u.get(A);if(_!==void 0)return _;let O=r.length;return r.push({x:S,y:C}),u.set(A,O),O}function f(S,C,A,_,O,k,V,F){let Q=c(S,C),ne=c(A,_),Y=i.length;i.push({start:Q,end:ne,tangentStart:{x:O-S,y:k-C},tangentEnd:{x:V-A,y:F-_}}),s&&s.segmentIndices.push(Y)}function g(S,C,A,_){f(S,C,A,_,S,C,A,_)}function h(S,C,A,_,O,k,V,F){f(S,C,V,F,A,_,O,k)}let d=(0,jg.default)(e),v="err"in d&&typeof d.err=="string"?d.err:null;if(v)return{ok:!1,error:v};if(n.strictCommands){let S=new Set;d.iterate(A=>{["M","L","Q","C","Z"].includes(A[0])||S.add(A[0])});let C=S.values().next().value;if(C!==void 0)return{ok:!1,error:`Unsupported path command ${C}`}}d.abs().unshort().unarc().iterate(S=>{let C=S[0];if(C==="M")a=S[1],l=S[2],s={startVertexIndex:c(a,l),segmentIndices:[],closed:!1},o.push(s);else if(C==="L")g(a,l,S[1],S[2]),a=S[1],l=S[2];else if(C==="H")g(a,l,S[1],l),a=S[1];else if(C==="V")g(a,l,a,S[1]),l=S[1];else if(C==="C")h(a,l,S[1],S[2],S[3],S[4],S[5],S[6]),a=S[5],l=S[6];else if(C==="Q"){let A=S[1],_=S[2],O=S[3],k=S[4],V=a+2/3*(A-a),F=l+2/3*(_-l),Q=O+2/3*(A-O),ne=k+2/3*(_-k);h(a,l,V,F,Q,ne,O,k),a=O,l=k}else if((C==="Z"||C==="z")&&s){let A=r[s.startVertexIndex];(Math.abs(a-A.x)>.001||Math.abs(l-A.y)>.001)&&g(a,l,A.x,A.y),s.closed=!0,a=A.x,l=A.y}});let T=[],E=o.filter(S=>t!=="NONE"&&S.segmentIndices.length>0&&(S.closed||n.includeOpenRegions));return E.length>0&&t!=="NONE"&&T.push({windingRule:t,loops:E.map(S=>S.segmentIndices)}),{ok:!0,network:{vertices:r,segments:i,regions:T}}}var Un={sessionID:4294967295,localID:4294967295};function zn(e){return e.sessionID===Un.sessionID&&e.localID===Un.localID}function ie(e){return`${e.sessionID}:${e.localID}`}function lt(e){let t=e.match(/^(?:VariableID:|VariableCollectionId:)?(\d+):(\d+)$/);if(t)return{sessionID:Number.parseInt(t[1],10),localID:Number.parseInt(t[2],10)};let[n,r]=e.split(":");return{sessionID:Number.parseInt(n,10),localID:Number.parseInt(r,10)}}var tc={min:3,max:60};function Xg(e){let t={};for(let n of e.split(",").map(r=>r.trim())){let r=n.indexOf("=");r!==-1&&(t[n.slice(0,r).trim()]=n.slice(r+1).trim())}return t}var YA=ArrayBuffer,Pe=Uint8Array,_s=Uint16Array,qA=Int16Array;var Ls=Int32Array,nc=function(e,t,n){if(Pe.prototype.slice)return Pe.prototype.slice.call(e,t,n);(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length);var r=new Pe(n-t);return r.set(e.subarray(t,n)),r},Gi=function(e,t,n,r){if(Pe.prototype.fill)return Pe.prototype.fill.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;++n)e[n]=t;return e},ZA=function(e,t,n,r){if(Pe.prototype.copyWithin)return Pe.prototype.copyWithin.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;)e[t++]=e[n++]};var JA=["invalid zstd data","window size too large (>2046MB)","invalid block type","FSE accuracy too high","match distance too far back","unexpected EOF"],_e=function(e,t,n){var r=new Error(t||JA[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,_e),!n)throw r;return r},Kg=function(e,t,n){for(var r=0,i=0;r<n;++r)i|=e[t++]<<(r<<3);return i},QA=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},ex=function(e,t){var n=e[0]|e[1]<<8|e[2]<<16;if(n==3126568&&e[3]==253){var r=e[4],i=r>>5&1,o=r>>2&1,s=r&3,a=r>>6;r&8&&_e(0);var l=6-i,u=s==3?4:s,c=Kg(e,l,u);l+=u;var f=a?1<<a:i,g=Kg(e,l,f)+(a==1&&256),h=g;if(!i){var d=1<<10+(e[5]>>3);h=d+(d>>3)*(e[5]&7)}h>2145386496&&_e(1);var v=new Pe((t==1?g||h:t?0:h)+12);return v[0]=1,v[4]=4,v[8]=8,{b:l+f,y:0,l:0,d:c,w:t&&t!=1?t:v.subarray(12),e:h,o:new Ls(v.buffer,0,3),u:g,c:o,m:Math.min(131072,h)}}else if((n>>4|e[3]<<20)==25481893)return QA(e,4)+8;_e(0)},Hn=function(e){for(var t=0;1<<t<=e;++t);return t-1},Bi=function(e,t,n){var r=(t<<3)+4,i=(e[t]&15)+5;i>n&&_e(3);for(var o=1<<i,s=o,a=-1,l=-1,u=-1,c=o,f=new YA(512+(o<<2)),g=new qA(f,0,256),h=new _s(f,0,256),d=new _s(f,512,o),v=512+(o<<1),T=new Pe(f,v,o),E=new Pe(f,v+o);a<255&&s>0;){var S=Hn(s+1),C=r>>3,A=(1<<S+1)-1,_=(e[C]|e[C+1]<<8|e[C+2]<<16)>>(r&7)&A,O=(1<<S)-1,k=A-s-1,V=_&O;if(V<k?(r+=S,_=V):(r+=S+1,_>O&&(_-=k)),g[++a]=--_,_==-1?(s+=_,T[--c]=a):s-=_,!_)do{var F=r>>3;l=(e[F]|e[F+1]<<8)>>(r&7)&3,r+=2,a+=l}while(l==3)}(a>255||s)&&_e(0);for(var Q=0,ne=(o>>1)+(o>>3)+3,Y=o-1,I=0;I<=a;++I){var R=g[I];if(R<1){h[I]=-R;continue}for(u=0;u<R;++u){T[Q]=I;do Q=Q+ne&Y;while(Q>=c)}}for(Q&&_e(0),u=0;u<o;++u){var x=h[T[u]]++,P=E[u]=i-Hn(x);d[u]=(x<<P)-o}return[r+7>>3,{b:i,s:T,n:E,t:d}]},tx=function(e,t){var n=0,r=-1,i=new Pe(292),o=e[t],s=i.subarray(0,256),a=i.subarray(256,268),l=new _s(i.buffer,268);if(o<128){var u=Bi(e,t+1,6),c=u[0],f=u[1];t+=o;var g=c<<3,h=e[t];h||_e(0);for(var d=0,v=0,T=f.b,E=T,S=(++t<<3)-8+Hn(h);S-=T,!(S<g);){var C=S>>3;if(d+=(e[C]|e[C+1]<<8)>>(S&7)&(1<<T)-1,s[++r]=f.s[d],S-=E,S<g)break;C=S>>3,v+=(e[C]|e[C+1]<<8)>>(S&7)&(1<<E)-1,s[++r]=f.s[v],T=f.n[d],d=f.t[d],E=f.n[v],v=f.t[v]}++r>255&&_e(0)}else{for(r=o-127;n<r;n+=2){var A=e[++t];s[n]=A>>4,s[n+1]=A&15}++t}var _=0;for(n=0;n<r;++n){var O=s[n];O>11&&_e(0),_+=O&&1<<O-1}var k=Hn(_)+1,V=1<<k,F=V-_;for(F&F-1&&_e(0),s[r++]=Hn(F)+1,n=0;n<r;++n){var O=s[n];++a[s[n]=O&&k+1-O]}var Q=new Pe(V<<1),ne=Q.subarray(0,V),Y=Q.subarray(V);for(l[k]=0,n=k;n>0;--n){var I=l[n];Gi(Y,n,I,l[n-1]=I+a[n]*(1<<k-n))}for(l[0]!=V&&_e(0),n=0;n<r;++n){var R=s[n];if(R){var x=l[R];Gi(ne,n,x,l[R]=x+(1<<k-R))}}return[t,{n:Y,b:k,s:ne}]},nx=Bi(new Pe([81,16,99,140,49,198,24,99,12,33,196,24,99,102,102,134,70,146,4]),0,6)[1],rx=Bi(new Pe([33,20,196,24,99,140,33,132,16,66,8,33,132,16,66,8,33,68,68,68,68,68,68,68,68,36,9]),0,6)[1],ix=Bi(new Pe([32,132,16,66,102,70,68,68,68,68,36,73,2]),0,5)[1],Yg=function(e,t){for(var n=e.length,r=new Ls(n),i=0;i<n;++i)r[i]=t,t+=1<<e[i];return r},rc=new Pe(new Ls([0,0,0,0,16843009,50528770,134678020,202050057,269422093]).buffer,0,36),ox=Yg(rc,0),ic=new Pe(new Ls([0,0,0,0,0,0,0,0,16843009,50528770,117769220,185207048,252579084,16]).buffer,0,53),sx=Yg(ic,3),Fi=function(e,t,n){var r=e.length,i=t.length,o=e[r-1],s=(1<<n.b)-1,a=-n.b;o||_e(0);for(var l=0,u=n.b,c=(r<<3)-8+Hn(o)-u,f=-1;c>a&&f<i;){var g=c>>3,h=(e[g]|e[g+1]<<8|e[g+2]<<16)>>(c&7);l=(l<<u|h)&s,t[++f]=n.s[l],c-=u=n.n[l]}(c!=a||f+1!=i)&&_e(0)},ax=function(e,t,n){var r=6,i=t.length,o=i+3>>2,s=o<<1,a=o+s;Fi(e.subarray(r,r+=e[0]|e[1]<<8),t.subarray(0,o),n),Fi(e.subarray(r,r+=e[2]|e[3]<<8),t.subarray(o,s),n),Fi(e.subarray(r,r+=e[4]|e[5]<<8),t.subarray(s,a),n),Fi(e.subarray(r),t.subarray(a),n)},lx=function(e,t,n){var r,i=t.b,o=e[i],s=o>>1&3;t.l=o&1;var a=o>>3|e[i+1]<<5|e[i+2]<<13,l=(i+=3)+a;if(s==1)return i>=e.length?void 0:(t.b=i+1,n?(Gi(n,e[i],t.y,t.y+=a),n):Gi(new Pe(a),e[i]));if(!(l>e.length)){if(s==0)return t.b=l,n?(n.set(e.subarray(i,l),t.y),t.y+=a,n):nc(e,i,l);if(s==2){var u=e[i],c=u&3,f=u>>2&3,g=u>>4,h=0,d=0;c<2?f&1?g|=e[++i]<<4|(f&2&&e[++i]<<12):g=u>>3:(d=f,f<2?(g|=(e[++i]&63)<<4,h=e[i]>>6|e[++i]<<2):f==2?(g|=e[++i]<<4|(e[++i]&3)<<12,h=e[i]>>2|e[++i]<<6):(g|=e[++i]<<4|(e[++i]&63)<<12,h=e[i]>>6|e[++i]<<2|e[++i]<<10)),++i;var v=n?n.subarray(t.y,t.y+t.m):new Pe(t.m),T=v.length-g;if(c==0)v.set(e.subarray(i,i+=g),T);else if(c==1)Gi(v,e[i++],T);else{var E=t.h;if(c==2){var S=tx(e,i);h+=i-(i=S[0]),t.h=E=S[1]}else E||_e(0);(d?ax:Fi)(e.subarray(i,i+=h),v.subarray(T),E)}var C=e[i++];if(C){C==255?C=(e[i++]|e[i++]<<8)+32512:C>127&&(C=C-128<<8|e[i++]);var A=e[i++];A&3&&_e(0);for(var _=[rx,ix,nx],O=2;O>-1;--O){var k=A>>(O<<1)+2&3;if(k==1){var V=new Pe([0,0,e[i++]]);_[O]={s:V.subarray(2,3),n:V.subarray(0,1),t:new _s(V.buffer,0,1),b:0}}else k==2?(r=Bi(e,i,9-(O&1)),i=r[0],_[O]=r[1]):k==3&&(t.t||_e(0),_[O]=t.t[O])}var F=t.t=_,Q=F[0],ne=F[1],Y=F[2],I=e[l-1];I||_e(0);var R=(l<<3)-8+Hn(I)-Y.b,x=R>>3,P=0,G=(e[x]|e[x+1]<<8)>>(R&7)&(1<<Y.b)-1;x=(R-=ne.b)>>3;var D=(e[x]|e[x+1]<<8)>>(R&7)&(1<<ne.b)-1;x=(R-=Q.b)>>3;var w=(e[x]|e[x+1]<<8)>>(R&7)&(1<<Q.b)-1;for(++C;--C;){var q=Y.s[G],Z=Y.n[G],X=Q.s[w],j=Q.n[w],ee=ne.s[D],$=ne.n[D];x=(R-=ee)>>3;var le=1<<ee,B=le+((e[x]|e[x+1]<<8|e[x+2]<<16|e[x+3]<<24)>>>(R&7)&le-1);x=(R-=ic[X])>>3;var te=sx[X]+((e[x]|e[x+1]<<8|e[x+2]<<16)>>(R&7)&(1<<ic[X])-1);x=(R-=rc[q])>>3;var ae=ox[q]+((e[x]|e[x+1]<<8|e[x+2]<<16)>>(R&7)&(1<<rc[q])-1);if(x=(R-=Z)>>3,G=Y.t[G]+((e[x]|e[x+1]<<8)>>(R&7)&(1<<Z)-1),x=(R-=j)>>3,w=Q.t[w]+((e[x]|e[x+1]<<8)>>(R&7)&(1<<j)-1),x=(R-=$)>>3,D=ne.t[D]+((e[x]|e[x+1]<<8)>>(R&7)&(1<<$)-1),B>3)t.o[2]=t.o[1],t.o[1]=t.o[0],t.o[0]=B-=3;else{var ve=B-(ae!=0);ve?(B=ve==3?t.o[0]-1:t.o[ve],ve>1&&(t.o[2]=t.o[1]),t.o[1]=t.o[0],t.o[0]=B):B=t.o[0]}for(var O=0;O<ae;++O)v[P+O]=v[T+O];P+=ae,T+=ae;var Ce=P-B;if(Ce<0){var je=-Ce,Qe=t.e+Ce;je>te&&(je=te);for(var O=0;O<je;++O)v[P+O]=t.w[Qe+O];P+=je,te-=je,Ce=0}for(var O=0;O<te;++O)v[P+O]=v[Ce+O];P+=te}if(P!=T)for(;T<v.length;)v[P++]=v[T++];else P=v.length;n?t.y+=P:v=nc(v,0,P)}else if(n){if(t.y+=g,T)for(var O=0;O<g;++O)v[O]=v[T+O]}else T&&(v=nc(v,T));return t.b=l,v}_e(2)}},ux=function(e,t){if(e.length==1)return e[0];for(var n=new Pe(t),r=0,i=0;r<e.length;++r){var o=e[r];n.set(o,i),i+=o.length}return n};function qg(e,t){for(var n=[],r=+!t,i=0,o=0;e.length;){var s=ex(e,r||t);if(typeof s=="object"){for(r?(t=null,s.w.length==s.u&&(n.push(t=s.w),o+=s.u)):(n.push(t),s.e=0);!s.l;){var a=lx(e,s,t);a||_e(5),t?s.e=s.y:(n.push(a),o+=a.length,ZA(s.w,0,a.length),s.w.set(a,s.w.length-a.length))}i=s.b+s.c*4}else i=s;e=e.subarray(i)}return ux(n,o)}var sc=new Int32Array(1),Zg=new Float32Array(sc.buffer),cx=new TextDecoder,Ot=class{constructor(e){se(this,"_data");se(this,"_index");se(this,"length");if(e&&!(e instanceof Uint8Array))throw new Error("Must initialize a ByteBuffer with a Uint8Array");this._data=e||new Uint8Array(256),this._index=0,this.length=e?e.length:0}get offset(){return this._index}set offset(e){this._index=e}get bytes(){return this._data}toUint8Array(){return this._data.subarray(0,this.length)}readByte(){return this._data[this._index++]}readByteArray(){let e=this.readVarUint(),t=this._index;return this._index=t+e,this._data.slice(t,t+e)}skipByteArray(){let e=this.readVarUint();this._index+=e}readVarFloat(){let e=this._index,t=this._data,n=t[e];if(n===0)return this._index=e+1,0;let r=n|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24;return this._index=e+4,r=r<<23|r>>>9,sc[0]=r,Zg[0]}readVarUint(){let e=this._data,t=this._index,n=e[t++],r=n&127;return n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<7,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<14,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<21,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<28,this._index=t,r>>>0))))}readVarInt(){let e=this.readVarUint()|0;return e&1?~(e>>>1):e>>>1}readVarUint64(){let e=BigInt(0),t=BigInt(0),n=BigInt(7),r=this.readByte();for(;r&128&&t<56;)e|=BigInt(r&127)<<t,t+=n,r=this.readByte();return e|=BigInt(r)<<t,e}readVarInt64(){let e=this.readVarUint64(),t=BigInt(1),n=e&t;return e>>=t,n?~e:e}readString(){let e=this._index,t=this.findStringTerminator(e);return this._index=t+1,cx.decode(this._data.subarray(e,t))}skipString(){this._index=this.findStringTerminator(this._index)+1}findStringTerminator(e){let t=this._data,n=e;for(;n<t.length&&t[n]!==0;)n++;if(n>=t.length)throw new Error("Unterminated string in Kiwi message");return n}_growBy(e){if(this.length+e>this._data.length){let t=new Uint8Array(this.length+e<<1);t.set(this._data),this._data=t}this.length+=e}writeByte(e){let t=this.length;this._growBy(1),this._data[t]=e}writeByteArray(e){if(!(e instanceof Uint8Array)&&!Array.isArray(e))throw new Error("Expected byte array");this.writeVarUint(e.length);let t=this.length;this._growBy(e.length),this._data.set(e,t)}writeVarFloat(e){let t=this.length;Zg[0]=e;let n=sc[0];if(n=n>>>23|n<<9,(n&255)===0){this.writeByte(0);return}this._growBy(4);let r=this._data;r[t]=n,r[t+1]=n>>8,r[t+2]=n>>16,r[t+3]=n>>24}writeVarUint(e){if(e<0||e>4294967295)throw new Error("Outside uint range: "+e);do{let t=e&127;e>>>=7,this.writeByte(e?t|128:t)}while(e)}writeVarInt(e){if(e<-2147483648||e>2147483647)throw new Error("Outside int range: "+e);this.writeVarUint((e<<1^e>>31)>>>0)}writeVarUint64(e){if(typeof e=="string")e=BigInt(e);else if(typeof e!="bigint")throw new Error(`Expected bigint but got ${typeof e}: ${String(e)}`);if(e<0||e>BigInt("0xFFFFFFFFFFFFFFFF"))throw new Error("Outside uint64 range: "+e);let t=BigInt(127),n=BigInt(7);for(let r=0;e>t&&r<8;r++)this.writeByte(Number(e&t)|128),e>>=n;this.writeByte(Number(e))}writeVarInt64(e){if(typeof e=="string")e=BigInt(e);else if(typeof e!="bigint")throw new Error(`Expected bigint but got ${typeof e}: ${String(e)}`);if(e<-BigInt("0x8000000000000000")||e>BigInt("0x7FFFFFFFFFFFFFFF"))throw new Error("Outside int64 range: "+e);let t=BigInt(1);this.writeVarUint64(e<0?~(e<<t):e<<t)}writeString(e){let t;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(n+1===e.length||r<55296||r>=56320)t=r;else{let i=e.charCodeAt(++n);t=(r<<10)+i+-56613888}if(t===0)throw new Error("Cannot encode a string containing the null character");t<128?this.writeByte(t):(t<2048?this.writeByte(t>>6&31|192):(t<65536?this.writeByte(t>>12&15|224):(this.writeByte(t>>18&7|240),this.writeByte(t>>12&63|128)),this.writeByte(t>>6&63|128)),this.writeByte(t&63|128))}this.writeByte(0)}};function be(e){return JSON.stringify(e)}function De(e,t,n){var r=new Error(e);throw r.line=t,r.column=n,r}var ny=["bool","byte","float","int","int64","string","uint","uint64"],fx=["ByteBuffer","package"],dx=/((?:-|\b)\d+\b|[=;{}]|\[\]|\[deprecated\]|\b[A-Za-z_][A-Za-z0-9_]*\b|\/\/.*|\s+)/g,Vs=/^[A-Za-z_][A-Za-z0-9_]*$/,px=/^\/\/.*|\s+$/,mx=/^=$/,hx=/^$/,Jg=/^;$/,gx=/^-?\d+$/,yx=/^\{$/,vx=/^\}$/,Ix=/^\[\]$/,Tx=/^enum$/,Sx=/^struct$/,bx=/^message$/,Ex=/^package$/,Ax=/^\[deprecated\]$/;function xx(e){let t=e.split(dx),n=[],r=0,i=0;for(let o=0;o<t.length;o++){let s=t[o];o&1?px.test(s)||n.push({text:s,line:i+1,column:r+1}):s!==""&&De("Syntax error "+be(s),i+1,r+1);let a=s.split(`
`);a.length>1&&(r=0),i+=a.length-1,r+=a[a.length-1].length}return n.push({text:"",line:i,column:r}),n}function Nx(e){function t(){return e[a]}function n(l){return l.test(t().text)?(a++,!0):!1}function r(l,u){if(!n(l)){let c=t();De("Expected "+u+" but found "+be(c.text),c.line,c.column)}}function i(){let l=t();De("Unexpected token "+be(l.text),l.line,l.column)}let o=[],s=null,a=0;for(n(Ex)&&(s=t().text,r(Vs,"identifier"),r(Jg,'";"'));a<e.length&&!n(hx);){let l=[],u;n(Tx)?u="ENUM":n(Sx)?u="STRUCT":n(bx)?u="MESSAGE":i();let c=t();for(r(Vs,"identifier"),r(yx,'"{"');!n(vx);){let f=null,g=!1,h=!1;u!=="ENUM"&&(f=t().text,r(Vs,"identifier"),g=n(Ix));let d=t();r(Vs,"identifier");let v=null;u!=="STRUCT"&&(r(mx,'"="'),v=t(),r(gx,"integer"),(+v.text|0)+""!==v.text&&De("Invalid integer "+be(v.text),v.line,v.column));let T=t();n(Ax)&&(u!=="MESSAGE"&&De("Cannot deprecate this field",T.line,T.column),h=!0),r(Jg,'";"'),l.push({name:d.text,line:d.line,column:d.column,type:f,isArray:g,isDeprecated:h,value:v!==null?+v.text|0:l.length+1})}o.push({name:c.text,line:c.line,column:c.column,kind:u,fields:l})}return{package:s,definitions:o}}function Cx(e){let t=ny.slice(),n={};for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o];t.includes(s.name)&&De("The type "+be(s.name)+" is defined twice",s.line,s.column),fx.includes(s.name)&&De("The type name "+be(s.name)+" is reserved",s.line,s.column),t.push(s.name),n[s.name]=s}for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o],a=s.fields;if(s.kind==="ENUM"||a.length===0)continue;for(let u=0;u<a.length;u++){let c=a[u];t.includes(c.type)||De("The type "+be(c.type)+" is not defined for field "+be(c.name),c.line,c.column)}let l=[];for(let u=0;u<a.length;u++){let c=a[u];l.includes(c.value)&&De("The id for field "+be(c.name)+" is used twice",c.line,c.column),c.value<=0&&De("The id for field "+be(c.name)+" must be positive",c.line,c.column),l.push(c.value)}}let r={},i=o=>{let s=n[o];if(s&&s.kind==="STRUCT"&&(r[o]===1&&De("Recursive nesting of "+be(o)+" is not allowed",s.line,s.column),r[o]!==2&&s)){r[o]=1;let a=s.fields;for(let l=0;l<a.length;l++){let u=a[l];u.isArray||i(u.type)}r[o]=2}return!0};for(let o=0;o<e.definitions.length;o++)i(e.definitions[o].name)}function ry(e){let t=Nx(xx(e));return Cx(t),t}function cc(e){let t=new Map(e.definitions.map(a=>[a.name,a])),n=new Map,r=a=>{let l=t.get(a);return l||De("Invalid type "+be(a),0,0),l},i=a=>{let l=n.get(a.name);return l||(l=new Map(a.fields.map(u=>[u.value,u])),n.set(a.name,l)),l},o=(a,l)=>{switch(a){case"bool":case"byte":l.readByte();return;case"int":case"uint":l.readVarUint();return;case"float":l.readVarFloat();return;case"string":l.skipString();return;case"int64":case"uint64":l.readVarUint64();return}let u=r(a);if(u.kind==="ENUM"){l.readVarUint();return}if(u.kind==="STRUCT"){for(let f of u.fields)s(f,l);return}let c=i(u);for(let f=l.readVarUint();f!==0;f=l.readVarUint()){let g=c.get(f);if(!g)throw new Error("Attempted to parse invalid message");s(g,l)}},s=(a,l)=>{let u=a.type;if(u===null&&De("Invalid type null for field "+be(a.name),a.line,a.column),!a.isArray){o(u,l);return}if(u==="byte"){l.skipByteArray();return}for(let c=l.readVarUint();c>0;c--)o(u,l)};return{definition:r,fieldsById:a=>i(r(a)),skipField:s,skipValue:o}}var iy=Symbol("header bytes"),oy=Symbol("header start"),sy=Symbol("header whole decoder"),ac=0;function fc(e){let t=Reflect.get(e,iy),n=Reflect.get(e,oy),r=Reflect.get(e,sy);if(!(t instanceof Uint8Array)||typeof n!="number"||typeof r!="function")return;let i=new Ot(t);return i.offset=n,r(i)}function oc(e,t,n){Reflect.defineProperty(e,t,{value:n,enumerable:!1})}function Ox(e){return t=>{ac++;try{return e(t)}finally{ac--}}}function Rx(e,t){return Object.hasOwn(e,t)}function Dx(e){let t=Object.values(e);for(let n=0;n<t.length;n++){let r=t[n];if(r.kind!=="ENUM")for(let i=0;i<r.fields.length;i++){let o=r.fields[i],s=o.type;s===null&&De("Invalid type null for field "+be(o.name),o.line,o.column),!ny.includes(s)&&!Rx(e,s)&&De("Invalid type "+be(s)+" for field "+be(o.name),o.line,o.column)}}}function Fs(e,t,n,r){switch(n){case"bool":return!!r.readByte();case"byte":return r.readByte();case"int":return r.readVarInt();case"uint":return r.readVarUint();case"float":return r.readVarFloat();case"string":return r.readString();case"int64":return r.readVarInt64();case"uint64":return r.readVarUint64();default:{let i=t[n];return i||De("Invalid type "+be(n),0,0),i.kind==="ENUM"?e[i.name][r.readVarUint()]:(0,e["decode"+i.name])(r)}}}function Qg(e,t,n,r,i){switch(n){case"bool":case"byte":i.writeByte(r);return;case"int":i.writeVarInt(r);return;case"uint":i.writeVarUint(r);return;case"float":i.writeVarFloat(r);return;case"string":i.writeString(r);return;case"int64":i.writeVarInt64(r);return;case"uint64":i.writeVarUint64(r);return;default:{let o=t[n];if(o||De("Invalid type "+be(n),0,0),o.kind==="ENUM"){let s=e[o.name][r];if(s===void 0)throw new Error("Invalid value "+JSON.stringify(r)+" for enum "+be(o.name));i.writeVarUint(s)}else(0,e["encode"+o.name])(r,i)}}}function ey(e,t,n,r,i){let o=n.type;if(o===null&&De("Invalid type null for field "+be(n.name),n.line,n.column),n.isArray){if(n.isDeprecated){if(o==="byte")r.readByteArray();else{let l=r.readVarUint();for(;l-- >0;)Fs(e,t,o,r)}return}if(o==="byte"){i[n.name]=r.readByteArray();return}let s=r.readVarUint(),a=Array.from({length:s});i[n.name]=a;for(let l=0;l<s;l++)a[l]=Fs(e,t,o,r);return}if(n.isDeprecated){Fs(e,t,o,r);return}i[n.name]=Fs(e,t,o,r)}function Mx(e,t,n,r,i){let o=n.type;if(o===null&&De("Invalid type null for field "+be(n.name),n.line,n.column),n.isArray){if(o==="byte"){i.writeByteArray(r);return}let s=r;i.writeVarUint(s.length);for(let a=0;a<s.length;a++)Qg(e,t,o,s[a],i);return}Qg(e,t,o,r,i)}function ty(e,t,n,r){let i=new Map;for(let o=0;o<n.fields.length;o++)i.set(n.fields[o].value,n.fields[o]);return function(o){let s=o instanceof e.ByteBuffer?o:new e.ByteBuffer(o),a={};if(n.kind==="MESSAGE"){let l=r&&ac===0?r:void 0;for(l&&(oc(a,iy,s.bytes),oc(a,oy,s.offset),oc(a,sy,l.whole));;){let u=s.readVarUint();if(u===0)return a;let c=i.get(u);if(!c)throw new Error("Attempted to parse invalid message");l&&!l.keep.has(c.name)?l.skipper.skipField(c,s):ey(e,t,c,s,a)}}else{for(let l=0;l<n.fields.length;l++)ey(e,t,n.fields[l],s,a);return a}}}function Px(e,t,n){return function(r,i){let o=!i,s=i||new e.ByteBuffer;for(let a=0;a<n.fields.length;a++){let l=n.fields[a];if(l.isDeprecated)continue;let u=r[l.name];if(u!=null)n.kind==="MESSAGE"&&s.writeVarUint(l.value),Mx(e,t,l,u,s);else if(n.kind==="STRUCT")throw new Error("Missing required field "+be(l.name))}if(n.kind==="MESSAGE"&&s.writeVarUint(0),o)return s.toUint8Array()}}function Ui(e,t){let n=Object.create(null);for(let o=0;o<e.definitions.length;o++)n[e.definitions[o].name]=e.definitions[o];Dx(n);let r={ByteBuffer:Ot},i;for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o];switch(s.kind){case"ENUM":{let a={};for(let l=0;l<s.fields.length;l++){let u=s.fields[l];a[u.name]=u.value,a[u.value]=u.name}r[s.name]=a;break}case"STRUCT":case"MESSAGE":{let a=s.kind==="MESSAGE"?t?.[s.name]:void 0,l=a&&{keep:new Set(a),skipper:i??(i=cc(e)),whole:Ox(ty(r,n,s))};r["decode"+s.name]=ty(r,n,s,l),r["encode"+s.name]=Px(r,n,s);break}default:De("Invalid definition kind "+be(s.kind),s.line,s.column)}}return r}var lc=["bool","byte","int","uint","float","string","int64","uint64"],uc=["ENUM","STRUCT","MESSAGE"];function Bs(e){let t=e instanceof Ot?e:new Ot(e),n=t.readVarUint(),r=[];for(let i=0;i<n;i++){let o=t.readString(),s=t.readByte(),a=t.readVarUint(),l=[];for(let u=0;u<a;u++){let c=t.readString(),f=t.readVarInt(),g=!!(t.readByte()&1),h=t.readVarUint();l.push({name:c,line:0,column:0,type:uc[s]==="ENUM"?null:f,isArray:g,isDeprecated:!1,value:h})}r.push({name:o,line:0,column:0,kind:uc[s],fields:l})}for(let i=0;i<n;i++){let o=r[i].fields;for(let s=0;s<o.length;s++){let a=o[s],l=a.type;if(l!==null&&l<0){if(~l>=lc.length)throw new Error("Invalid type "+l);a.type=lc[~l]}else{if(l!==null&&l>=r.length)throw new Error("Invalid type "+l);a.type=l===null?null:r[l].name}}}return{package:null,definitions:r}}function ay(e){let t=new Ot,n=e.definitions,r={};t.writeVarUint(n.length);for(let i=0;i<n.length;i++)r[n[i].name]=i;for(let i=0;i<n.length;i++){let o=n[i];t.writeString(o.name),t.writeByte(uc.indexOf(o.kind)),t.writeVarUint(o.fields.length);for(let s=0;s<o.fields.length;s++){let a=o.fields[s],l=lc.indexOf(a.type);t.writeString(a.name),t.writeVarInt(l===-1?r[a.type]:~l),t.writeByte(a.isArray?1:0),t.writeVarUint(a.value)}}return t.toUint8Array()}function ly(e){for(let t of e.definitions)wx(t),t.kind==="ENUM"&&kx(t)}function wx(e){let t=new Set;for(let n of e.fields)t.has(n.name)&&De(`The field ${be(n.name)} is defined twice in ${be(e.name)}`,n.line,n.column),t.add(n.name)}function kx(e){let t=new Set;for(let n of e.fields)t.has(n.value)&&De(`The enum value ${n.value} is used twice in ${be(e.name)}`,n.line,n.column),t.add(n.value)}var Or=ry(`enum MessageType {
  JOIN_START = 0;
  NODE_CHANGES = 1;
  USER_CHANGES = 2;
  JOIN_END = 3;
  SIGNAL = 4;
  STYLE = 5;
  STYLE_SET = 6;
  JOIN_START_SKIP_RELOAD = 7;
  NOTIFY_SHOULD_UPGRADE = 8;
  UPGRADE_DONE = 9;
  UPGRADE_REFRESH = 10;
  SCENE_GRAPH_QUERY = 11;
  SCENE_GRAPH_REPLY = 12;
  DIFF = 13;
  CLIENT_BROADCAST = 14;
  JOIN_START_JOURNALED = 15;
  STREAM_START = 16;
  STREAM_END = 17;
  INTERACTIVE_SLIDE_CHANGE = 18;
  RECONNECT_SCENE_GRAPH_QUERY = 19;
  RECONNECT_SCENE_GRAPH_REPLY = 20;
  JOIN_END_INCREMENTAL_RECONNECT = 21;
  NODE_STATUS_CHANGE = 22;
  CLIENT_RENDERED = 23;
  BUZZ_APPROVAL_CHANGE = 24;
}

enum Axis {
  X = 0;
  Y = 1;
}

enum Access {
  READ_ONLY = 0;
  READ_WRITE = 1;
}

enum NodePhase {
  CREATED = 0;
  REMOVED = 1;
}

enum WindingRule {
  NONZERO = 0;
  ODD = 1;
}

enum NodeType {
  NONE = 0;
  DOCUMENT = 1;
  CANVAS = 2;
  GROUP = 3;
  FRAME = 4;
  BOOLEAN_OPERATION = 5;
  VECTOR = 6;
  STAR = 7;
  LINE = 8;
  ELLIPSE = 9;
  RECTANGLE = 10;
  REGULAR_POLYGON = 11;
  ROUNDED_RECTANGLE = 12;
  TEXT = 13;
  SLICE = 14;
  SYMBOL = 15;
  INSTANCE = 16;
  STICKY = 17;
  SHAPE_WITH_TEXT = 18;
  CONNECTOR = 19;
  CODE_BLOCK = 20;
  WIDGET = 21;
  STAMP = 22;
  MEDIA = 23;
  HIGHLIGHT = 24;
  SECTION = 25;
  SECTION_OVERLAY = 26;
  WASHI_TAPE = 27;
  VARIABLE = 28;
  TABLE = 29;
  TABLE_CELL = 30;
  VARIABLE_SET = 31;
  SLIDE = 32;
  ASSISTED_LAYOUT = 33;
  INTERACTIVE_SLIDE_ELEMENT = 34;
  VARIABLE_OVERRIDE = 35;
  MODULE = 36;
  SLIDE_GRID = 37;
  SLIDE_ROW = 38;
  RESPONSIVE_SET = 39;
  CODE_COMPONENT = 40;
  TEXT_PATH = 41;
  CODE_INSTANCE = 42;
  CODE_LIBRARY = 43;
  CODE_FILE = 44;
  CODE_LAYER = 45;
  BRUSH = 46;
  MANAGED_STRING = 47;
  TRANSFORM = 48;
  CMS_RICH_TEXT = 49;
  REPEATER = 50;
  JSX = 51;
  EMBEDDED_PROTOTYPE = 52;
  REACT_FIBER = 53;
  RESPONSIVE_NODE_SET = 54;
  WEBPAGE = 55;
  KEYFRAME = 56;
  KEYFRAME_TRACK = 57;
  ANIMATION_PRESET_INSTANCE = 58;
  CODE_EMBED = 59;
  BINARY_FILE = 60;
  SPEC_BLOCK = 61;
  TOOL_INSTANCE = 62;
  CUSTOM_EFFECT_INSTANCE = 63;
  NATIVE_CODE_LAYER_INSTANCE = 64;
}

enum ShapeWithTextType {
  SQUARE = 0;
  ELLIPSE = 1;
  DIAMOND = 2;
  TRIANGLE_UP = 3;
  TRIANGLE_DOWN = 4;
  ROUNDED_RECTANGLE = 5;
  PARALLELOGRAM_RIGHT = 6;
  PARALLELOGRAM_LEFT = 7;
  ENG_DATABASE = 8;
  ENG_QUEUE = 9;
  ENG_FILE = 10;
  ENG_FOLDER = 11;
  TRAPEZOID = 12;
  PREDEFINED_PROCESS = 13;
  SHIELD = 14;
  DOCUMENT_SINGLE = 15;
  DOCUMENT_MULTIPLE = 16;
  MANUAL_INPUT = 17;
  HEXAGON = 18;
  CHEVRON = 19;
  PENTAGON = 20;
  OCTAGON = 21;
  STAR = 22;
  PLUS = 23;
  ARROW_LEFT = 24;
  ARROW_RIGHT = 25;
  SUMMING_JUNCTION = 26;
  OR = 27;
  SPEECH_BUBBLE = 28;
  INTERNAL_STORAGE = 29;
}

enum BlendMode {
  PASS_THROUGH = 0;
  NORMAL = 1;
  DARKEN = 2;
  MULTIPLY = 3;
  LINEAR_BURN = 4;
  COLOR_BURN = 5;
  LIGHTEN = 6;
  SCREEN = 7;
  LINEAR_DODGE = 8;
  COLOR_DODGE = 9;
  OVERLAY = 10;
  SOFT_LIGHT = 11;
  HARD_LIGHT = 12;
  DIFFERENCE = 13;
  EXCLUSION = 14;
  HUE = 15;
  SATURATION = 16;
  COLOR = 17;
  LUMINOSITY = 18;
}

enum PaintType {
  SOLID = 0;
  GRADIENT_LINEAR = 1;
  GRADIENT_RADIAL = 2;
  GRADIENT_ANGULAR = 3;
  GRADIENT_DIAMOND = 4;
  IMAGE = 5;
  EMOJI = 6;
  VIDEO = 7;
  PATTERN = 8;
  NOISE = 9;
  CUSTOM = 10;
}

enum ImageScaleMode {
  STRETCH = 0;
  FIT = 1;
  FILL = 2;
  TILE = 3;
}

enum EffectType {
  INNER_SHADOW = 0;
  DROP_SHADOW = 1;
  FOREGROUND_BLUR = 2;
  BACKGROUND_BLUR = 3;
  REPEAT = 4;
  SYMMETRY = 5;
  GRAIN = 6;
  NOISE = 7;
  GLASS = 8;
  CUSTOM = 9;
}

enum TextCase {
  ORIGINAL = 0;
  UPPER = 1;
  LOWER = 2;
  TITLE = 3;
  SMALL_CAPS = 4;
  SMALL_CAPS_FORCED = 5;
}

enum TextDecoration {
  NONE = 0;
  UNDERLINE = 1;
  STRIKETHROUGH = 2;
}

enum TextDecorationStyle {
  SOLID = 0;
  DOTTED = 1;
  WAVY = 2;
}

enum LeadingTrim {
  NONE = 0;
  CAP_HEIGHT = 1;
}

enum NumberUnits {
  RAW = 0;
  PIXELS = 1;
  PERCENT = 2;
}

enum ConstraintType {
  MIN = 0;
  CENTER = 1;
  MAX = 2;
  STRETCH = 3;
  SCALE = 4;
  FIXED_MIN = 5;
  FIXED_MAX = 6;
}

enum StrokeAlign {
  CENTER = 0;
  INSIDE = 1;
  OUTSIDE = 2;
  OFFSET = 3;
}

enum StrokeCap {
  NONE = 0;
  ROUND = 1;
  SQUARE = 2;
  ARROW_LINES = 3;
  ARROW_EQUILATERAL = 4;
  DIAMOND_FILLED = 5;
  TRIANGLE_FILLED = 6;
  HIGHLIGHT = 7;
  WASHI_TAPE_1 = 8;
  WASHI_TAPE_2 = 9;
  WASHI_TAPE_3 = 10;
  WASHI_TAPE_4 = 11;
  WASHI_TAPE_5 = 12;
  WASHI_TAPE_6 = 13;
  CIRCLE_FILLED = 14;
  ERD_ZERO_OR_ONE = 15;
  ERD_EXACTLY_ONE = 16;
  ERD_ZERO_OR_MORE = 17;
  ERD_ONE_OR_MORE = 18;
  ERD_ONE = 19;
  ERD_MANY = 20;
}

enum StrokeJoin {
  MITER = 0;
  BEVEL = 1;
  ROUND = 2;
}

enum BooleanOperation {
  UNION = 0;
  INTERSECT = 1;
  SUBTRACT = 2;
  XOR = 3;
}

enum TextAlignHorizontal {
  LEFT = 0;
  CENTER = 1;
  RIGHT = 2;
  JUSTIFIED = 3;
}

enum TextAlignVertical {
  TOP = 0;
  CENTER = 1;
  BOTTOM = 2;
}

enum MouseCursor {
  DEFAULT = 0;
  CROSSHAIR = 1;
  EYEDROPPER = 2;
  HAND = 3;
  PAINT_BUCKET = 4;
  PEN = 5;
  PENCIL = 6;
  MARKER = 7;
  ERASER = 8;
  HIGHLIGHTER = 9;
  LASSO = 10;
}

enum VectorMirror {
  NONE = 0;
  ANGLE = 1;
  ANGLE_AND_LENGTH = 2;
}

enum DashMode {
  CLIP = 0;
  STRETCH = 1;
}

enum ImageType {
  PNG = 0;
  JPEG = 1;
  SVG = 2;
  PDF = 3;
  MP4 = 4;
  GIF = 5;
}

enum ExportConstraintType {
  CONTENT_SCALE = 0;
  CONTENT_WIDTH = 1;
  CONTENT_HEIGHT = 2;
}

enum LayoutGridType {
  MIN = 0;
  CENTER = 1;
  STRETCH = 2;
  MAX = 3;
}

enum LayoutGridPattern {
  STRIPES = 0;
  GRID = 1;
}

enum TextAutoResize {
  NONE = 0;
  WIDTH_AND_HEIGHT = 1;
  HEIGHT = 2;
}

enum TextTruncation {
  DISABLED = 0;
  ENDING = 1;
}

enum StyleSetType {
  PERSONAL = 0;
  TEAM = 1;
  CUSTOM = 2;
  FREQUENCY = 3;
  TEMPORARY = 4;
}

enum StyleSetContentType {
  SOLID = 0;
  GRADIENT = 1;
  IMAGE = 2;
}

enum StackMode {
  NONE = 0;
  HORIZONTAL = 1;
  VERTICAL = 2;
  GRID = 3;
}

enum StackAlign {
  MIN = 0;
  CENTER = 1;
  MAX = 2;
  BASELINE = 3;
}

enum StackCounterAlign {
  MIN = 0;
  CENTER = 1;
  MAX = 2;
  STRETCH = 3;
  AUTO = 4;
  BASELINE = 5;
}

enum StackJustify {
  MIN = 0;
  CENTER = 1;
  MAX = 2;
  SPACE_EVENLY = 3;
  SPACE_BETWEEN = 4;
}

enum GridChildAlign {
  AUTO = 0;
  MIN = 1;
  CENTER = 2;
  MAX = 3;
}

enum GridAutoTracks {
  NONE = 0;
  ROWS = 1;
}

enum StackSize {
  FIXED = 0;
  RESIZE_TO_FIT = 1;
  RESIZE_TO_FIT_WITH_IMPLICIT_SIZE = 2;
}

enum StackPositioning {
  AUTO = 0;
  ABSOLUTE = 1;
}

enum StackWrap {
  NO_WRAP = 0;
  WRAP = 1;
}

enum StackCounterAlignContent {
  AUTO = 0;
  SPACE_BETWEEN = 1;
}

enum ConnectionType {
  NONE = 0;
  INTERNAL_NODE = 1;
  URL = 2;
  BACK = 3;
  CLOSE = 4;
  SET_VARIABLE = 5;
  UPDATE_MEDIA_RUNTIME = 6;
  CONDITIONAL = 7;
  SET_VARIABLE_MODE = 8;
  OBJECT_ANIMATION = 9;
  UPDATE_ANIMATION_TIMELINE_STATE = 10;
}

enum InteractionType {
  ON_CLICK = 0;
  AFTER_TIMEOUT = 1;
  MOUSE_IN = 2;
  MOUSE_OUT = 3;
  ON_HOVER = 4;
  MOUSE_DOWN = 5;
  MOUSE_UP = 6;
  ON_PRESS = 7;
  NONE = 8;
  DRAG = 9;
  ON_KEY_DOWN = 10;
  ON_VOICE = 11;
  ON_MEDIA_HIT = 12;
  ON_MEDIA_END = 13;
  MOUSE_ENTER = 14;
  MOUSE_LEAVE = 15;
}

enum TransitionType {
  INSTANT_TRANSITION = 0;
  DISSOLVE = 1;
  FADE = 2;
  SLIDE_FROM_LEFT = 3;
  SLIDE_FROM_RIGHT = 4;
  SLIDE_FROM_TOP = 5;
  SLIDE_FROM_BOTTOM = 6;
  PUSH_FROM_LEFT = 7;
  PUSH_FROM_RIGHT = 8;
  PUSH_FROM_TOP = 9;
  PUSH_FROM_BOTTOM = 10;
  MOVE_FROM_LEFT = 11;
  MOVE_FROM_RIGHT = 12;
  MOVE_FROM_TOP = 13;
  MOVE_FROM_BOTTOM = 14;
  SLIDE_OUT_TO_LEFT = 15;
  SLIDE_OUT_TO_RIGHT = 16;
  SLIDE_OUT_TO_TOP = 17;
  SLIDE_OUT_TO_BOTTOM = 18;
  MOVE_OUT_TO_LEFT = 19;
  MOVE_OUT_TO_RIGHT = 20;
  MOVE_OUT_TO_TOP = 21;
  MOVE_OUT_TO_BOTTOM = 22;
  MAGIC_MOVE = 23;
  SMART_ANIMATE = 24;
  SCROLL_ANIMATE = 25;
}

enum EasingType {
  IN_CUBIC = 0;
  OUT_CUBIC = 1;
  INOUT_CUBIC = 2;
  LINEAR = 3;
  IN_BACK_CUBIC = 4;
  OUT_BACK_CUBIC = 5;
  INOUT_BACK_CUBIC = 6;
  CUSTOM_CUBIC = 7;
  SPRING = 8;
  GENTLE_SPRING = 9;
  CUSTOM_SPRING = 10;
  SPRING_PRESET_ONE = 11;
  SPRING_PRESET_TWO = 12;
  SPRING_PRESET_THREE = 13;
  HOLD = 14;
}

enum ScrollDirection {
  NONE = 0;
  HORIZONTAL = 1;
  VERTICAL = 2;
  BOTH = 3;
}

enum ScrollContractedState {
  EXPANDED = 0;
  CONTRACTED = 1;
}

struct GUID {
  uint sessionID;
  uint localID;
}

struct Color {
  float r;
  float g;
  float b;
  float a;
}

struct Vector {
  float x;
  float y;
}

struct Rect {
  float x;
  float y;
  float w;
  float h;
}

struct ColorStop {
  Color color;
  float position;
}

message ColorStopVar {
  Color color = 1;
  VariableData colorVar = 2;
  float position = 3;
}

struct Matrix {
  float m00;
  float m01;
  float m02;
  float m10;
  float m11;
  float m12;
}

struct ParentIndex {
  GUID guid;
  string position;
}

struct Number {
  float value;
  NumberUnits units;
}

struct FontName {
  string family;
  string style;
  string postscript;
}

enum FontVariantNumericFigure {
  NORMAL = 0;
  LINING = 1;
  OLDSTYLE = 2;
}

enum FontVariantNumericSpacing {
  NORMAL = 0;
  PROPORTIONAL = 1;
  TABULAR = 2;
}

enum FontVariantNumericFraction {
  NORMAL = 0;
  DIAGONAL = 1;
  STACKED = 2;
}

enum FontVariantCaps {
  NORMAL = 0;
  SMALL = 1;
  ALL_SMALL = 2;
  PETITE = 3;
  ALL_PETITE = 4;
  UNICASE = 5;
  TITLING = 6;
}

enum FontVariantPosition {
  NORMAL = 0;
  SUB = 1;
  SUPER = 2;
}

enum FontStyle {
  NORMAL = 0;
  ITALIC = 1;
}

enum SemanticWeight {
  NORMAL = 0;
  BOLD = 1;
}

enum SemanticItalic {
  NORMAL = 0;
  ITALIC = 1;
}

enum CodeSnapshotState {
  INITIAL = 0;
  SNAPSHOTTING = 1;
  OK = 2;
  SNAPSHOT_ERROR = 3;
  LLM_IN_PROGRESS = 4;
}

enum SnapshotCaptureMode {
  FULL = 0;
  PARTIAL = 1;
}

message CodeSourceInfo {
  string originReferenceId = 1;
  GUID originNodeId = 2;
  GUID linkedSnapshotId = 3;
  SnapshotCaptureMode captureMode = 4;
  string sourceBlobRef = 5;
  string sourceElementId = 6;
}

enum CodeObjectType {
  WEB_LAYER = 0;
  WEB_INTERACTION = 1;
  NATIVE_LAYER = 2;
  ANIMATION_PRESET = 3;
  TOOL = 4;
  CUSTOM_EFFECT = 5;
  PLUGIN = 6;
  WEB_LAYER_GENERIC = 7;
  CUSTOM_FILL = 8;
}

message CustomToolArtifactRef {
  string customToolId = 1;
  string customToolVersion = 2;
  string publishedCustomToolId = 3;
  string publishedCustomToolVersionId = 4;
}

enum LockMode {
  NONE = 0;
  ALL = 1;
  BACKGROUND_ONLY = 2;
}

enum OpenTypeFeature {
  PCAP = 0;
  C2PC = 1;
  CASE = 2;
  CPSP = 3;
  TITL = 4;
  UNIC = 5;
  ZERO = 6;
  SINF = 7;
  ORDN = 8;
  AFRC = 9;
  DNOM = 10;
  NUMR = 11;
  LIGA = 12;
  CLIG = 13;
  DLIG = 14;
  HLIG = 15;
  RLIG = 16;
  AALT = 17;
  CALT = 18;
  RCLT = 19;
  SALT = 20;
  RVRN = 21;
  VERT = 22;
  SWSH = 23;
  CSWH = 24;
  NALT = 25;
  CCMP = 26;
  STCH = 27;
  HIST = 28;
  SIZE = 29;
  ORNM = 30;
  ITAL = 31;
  RAND = 32;
  DTLS = 33;
  FLAC = 34;
  MGRK = 35;
  SSTY = 36;
  KERN = 37;
  FWID = 38;
  HWID = 39;
  HALT = 40;
  TWID = 41;
  QWID = 42;
  PWID = 43;
  JUST = 44;
  LFBD = 45;
  OPBD = 46;
  RTBD = 47;
  PALT = 48;
  PKNA = 49;
  LTRA = 50;
  LTRM = 51;
  RTLA = 52;
  RTLM = 53;
  ABRV = 54;
  ABVM = 55;
  ABVS = 56;
  VALT = 57;
  VHAL = 58;
  BLWF = 59;
  BLWM = 60;
  BLWS = 61;
  AKHN = 62;
  CJCT = 63;
  CFAR = 64;
  CPCT = 65;
  CURS = 66;
  DIST = 67;
  EXPT = 68;
  FALT = 69;
  FINA = 70;
  FIN2 = 71;
  FIN3 = 72;
  HALF = 73;
  HALN = 74;
  HKNA = 75;
  HNGL = 76;
  HOJO = 77;
  INIT = 78;
  ISOL = 79;
  JP78 = 80;
  JP83 = 81;
  JP90 = 82;
  JP04 = 83;
  LJMO = 84;
  LOCL = 85;
  MARK = 86;
  MEDI = 87;
  MED2 = 88;
  MKMK = 89;
  NLCK = 90;
  NUKT = 91;
  PREF = 92;
  PRES = 93;
  VPAL = 94;
  PSTF = 95;
  PSTS = 96;
  RKRF = 97;
  RPHF = 98;
  RUBY = 99;
  SMPL = 100;
  TJMO = 101;
  TNAM = 102;
  TRAD = 103;
  VATU = 104;
  VJMO = 105;
  VKNA = 106;
  VKRN = 107;
  VRTR = 108;
  VRT2 = 109;
  SS01 = 110;
  SS02 = 111;
  SS03 = 112;
  SS04 = 113;
  SS05 = 114;
  SS06 = 115;
  SS07 = 116;
  SS08 = 117;
  SS09 = 118;
  SS10 = 119;
  SS11 = 120;
  SS12 = 121;
  SS13 = 122;
  SS14 = 123;
  SS15 = 124;
  SS16 = 125;
  SS17 = 126;
  SS18 = 127;
  SS19 = 128;
  SS20 = 129;
  CV01 = 130;
  CV02 = 131;
  CV03 = 132;
  CV04 = 133;
  CV05 = 134;
  CV06 = 135;
  CV07 = 136;
  CV08 = 137;
  CV09 = 138;
  CV10 = 139;
  CV11 = 140;
  CV12 = 141;
  CV13 = 142;
  CV14 = 143;
  CV15 = 144;
  CV16 = 145;
  CV17 = 146;
  CV18 = 147;
  CV19 = 148;
  CV20 = 149;
  CV21 = 150;
  CV22 = 151;
  CV23 = 152;
  CV24 = 153;
  CV25 = 154;
  CV26 = 155;
  CV27 = 156;
  CV28 = 157;
  CV29 = 158;
  CV30 = 159;
  CV31 = 160;
  CV32 = 161;
  CV33 = 162;
  CV34 = 163;
  CV35 = 164;
  CV36 = 165;
  CV37 = 166;
  CV38 = 167;
  CV39 = 168;
  CV40 = 169;
  CV41 = 170;
  CV42 = 171;
  CV43 = 172;
  CV44 = 173;
  CV45 = 174;
  CV46 = 175;
  CV47 = 176;
  CV48 = 177;
  CV49 = 178;
  CV50 = 179;
  CV51 = 180;
  CV52 = 181;
  CV53 = 182;
  CV54 = 183;
  CV55 = 184;
  CV56 = 185;
  CV57 = 186;
  CV58 = 187;
  CV59 = 188;
  CV60 = 189;
  CV61 = 190;
  CV62 = 191;
  CV63 = 192;
  CV64 = 193;
  CV65 = 194;
  CV66 = 195;
  CV67 = 196;
  CV68 = 197;
  CV69 = 198;
  CV70 = 199;
  CV71 = 200;
  CV72 = 201;
  CV73 = 202;
  CV74 = 203;
  CV75 = 204;
  CV76 = 205;
  CV77 = 206;
  CV78 = 207;
  CV79 = 208;
  CV80 = 209;
  CV81 = 210;
  CV82 = 211;
  CV83 = 212;
  CV84 = 213;
  CV85 = 214;
  CV86 = 215;
  CV87 = 216;
  CV88 = 217;
  CV89 = 218;
  CV90 = 219;
  CV91 = 220;
  CV92 = 221;
  CV93 = 222;
  CV94 = 223;
  CV95 = 224;
  CV96 = 225;
  CV97 = 226;
  CV98 = 227;
  CV99 = 228;
}

struct ExportConstraint {
  ExportConstraintType type;
  float value;
}

struct GUIDMapping {
  GUID from;
  GUID to;
}

struct Blob {
  byte[] bytes;
}

message Image {
  byte[] hash = 1;
  string name = 2;
  uint dataBlob = 3;
}

message Video {
  byte[] hash = 1;
  string s3Url = 2;
}

message PasteSource {
  string srcFile = 1;
  GUID srcNode = 2;
}

struct FilterColorAdjust {
  float tint;
  float shadows;
  float highlights;
  float detail;
  float exposure;
  float vignette;
  float temperature;
  float vibrance;
}

message PaintFilterMessage {
  float tint = 1;
  float shadows = 2;
  float highlights = 3;
  float detail = 4;
  float exposure = 5;
  float vignette = 6;
  float temperature = 7;
  float vibrance = 8;
  float contrast = 9;
  float brightness = 10;
}

message Paint {
  PaintType type = 1;
  Color color = 2;
  float opacity = 3;
  bool visible = 4;
  BlendMode blendMode = 5;
  ColorStop[] stops = 6;
  Matrix transform = 7;
  Image image = 8;
  Image imageThumbnail = 9;
  Image animatedImage = 16;
  uint animationFrame = 17;
  ImageScaleMode imageScaleMode = 10;
  bool imageShouldColorManage = 22;
  float rotation = 11;
  float scale = 12;
  FilterColorAdjust filterColorAdjust = 13;
  PaintFilterMessage paintFilter = 14;
  uint[] emojiCodePoints = 15;
  Video video = 18;
  uint originalImageWidth = 19;
  uint originalImageHeight = 20;
  VariableData opacityVar = 38;
  VariableData colorVar = 21;
  VariableData imageVar = 31;
  ColorStopVar[] stopsVar = 23;
  string thumbHashBase64 = 24;
  byte[] thumbHash = 25;
  GUID sourceNodeId = 26;
  float spacing = 27;
  Vector patternSpacing = 37;
  PatternTileType patternTileType = 28;
  PatternAlignment verticalAlignment = 29;
  PatternAlignment horizontalAlignment = 30;
  GUID id = 32;
  string altText = 33;
  NoiseType noiseType = 34;
  float density = 35;
  Vector noiseSize = 36;
  CodeComponentId customEffectId = 39;
  ComponentPropAssignment[] componentPropAssignments = 40;
}

enum NoiseType {
  MULTITONE = 0;
  MONOTONE = 1;
  DUOTONE = 2;
}

enum PatternTileType {
  RECTANGULAR = 0;
  HORIZONTAL_HEXAGONAL = 1;
  VERTICAL_HEXAGONAL = 2;
}

enum PatternAlignment {
  START = 0;
  CENTER = 1;
  END = 2;
}

message FontMetaData {
  FontName key = 1;
  float fontLineHeight = 2;
  byte[] fontDigest = 3;
  FontStyle fontStyle = 4;
  int fontWeight = 5;
}

message FontVariation {
  uint axisTag = 1;
  string axisName = 2;
  float value = 3;
}

message TextData {
  string characters = 1;
  uint[] characterStyleIDs = 2;
  NodeChange[] styleOverrideTable = 3;
  TextLineData[] lines = 12;
  uint layoutVersion = 8;
  FontName[] fallbackFonts = 10;
  float minContentHeight = 17;
  Vector layoutSize = 4;
  Baseline[] baselines = 5;
  Glyph[] glyphs = 6;
  Decoration[] decorations = 7;
  Blockquote[] blockquotes = 16;
  FontMetaData[] fontMetaData = 9;
  HyperlinkBox[] hyperlinkBoxes = 11;
  int truncationStartIndex = 13;
  float truncatedHeight = 14;
  float[] logicalIndexToCharacterOffsetMap = 15;
  MentionBox[] mentionBoxes = 18;
  DerivedTextLineData[] derivedLines = 19;
}

message DerivedTextData {
  Vector layoutSize = 1;
  Baseline[] baselines = 2;
  Glyph[] glyphs = 3;
  Decoration[] decorations = 4;
  Blockquote[] blockquotes = 5;
  FontMetaData[] fontMetaData = 6;
  HyperlinkBox[] hyperlinkBoxes = 7;
  int truncationStartIndex = 8;
  float truncatedHeight = 9;
  float[] logicalIndexToCharacterOffsetMap = 10;
  MentionBox[] mentionBoxes = 11;
  DerivedTextLineData[] derivedLines = 12;
}

message HyperlinkBox {
  Rect bounds = 1;
  string url = 2;
  GUID guid = 3;
  CMSItemPageTarget cmsTarget = 5;
  bool openInNewTab = 6;
  int hyperlinkID = 4;
}

message MentionBox {
  Rect bounds = 1;
  uint startIndex = 2;
  uint endIndex = 3;
  bool isValid = 4;
  uint mentionKey = 5;
}

message Baseline {
  Vector position = 1;
  float width = 2;
  float lineY = 3;
  float lineHeight = 4;
  float lineAscent = 7;
  float ignoreLeadingTrim = 8;
  uint firstCharacter = 5;
  uint endCharacter = 6;
}

message Glyph {
  uint commandsBlob = 1;
  Vector position = 2;
  uint styleID = 3;
  float fontSize = 4;
  uint firstCharacter = 5;
  float advance = 6;
  uint[] emojiCodePoints = 7;
  EmojiImageSet emojiImageSet = 8;
  float rotation = 9;
}

message Decoration {
  Rect[] rects = 1;
  uint styleID = 2;
}

message Blockquote {
  Rect verticalBar = 1;
  Rect quoteMarkBounds = 2;
  uint styleID = 3;
}

message VectorData {
  uint vectorNetworkBlob = 1;
  Vector normalizedSize = 2;
  NodeChange[] styleOverrideTable = 3;
}

message TextPathStart {
  float tValue = 1;
  bool forward = 2;
}

message GUIDPath {
  GUID[] guids = 1;
}

message SymbolData {
  GUID symbolID = 1;
  NodeChange[] symbolOverrides = 2;
  float uniformScaleFactor = 3;
}

message GUIDPathMapping {
  GUID id = 1;
  GUIDPath path = 2;
}

message DerivedBreakpointData {
  NodeChange[] overrides = 1;
}

message NodeGenerationData {
  NodeChange[] overrides = 1;
  bool useFineGrainedSyncing = 2;
  NodeChange[] diffOnlyRemovals = 3;
}

message DerivedImmutableFrameData {
  NodeChange[] overrides = 1;
  uint version = 2;
}

message JsxData {
  NodeChange[] overrides = 1;
}

message DerivedJsxData {
  NodeChange[] overrides = 1;
}

message AssetIdMap {
  AssetIdEntry[] entries = 1;
}

message AssetIdEntry {
  string assetKey = 1;
  AssetId assetId = 2;
}

message AssetRef {
  string key = 1;
  string version = 2;
}

message AssetId {
  GUID guid = 1;
  AssetRef assetRef = 2;
  StateGroupId stateGroupId = 3;
  StyleId styleId = 4;
  SymbolId symbolId = 5;
  VariableID variableId = 6;
  VariableSetID variableSetId = 7;
}

message StateGroupId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message StyleId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message SymbolId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message VariableID {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message VariableOverrideId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message VariableSetID {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message ModuleId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message ResponsiveSetId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message WebpageId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message ThemeID {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message CodeLibraryId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message CodeFileId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message CodeComponentId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message CanvasNodeId {
  GUID guid = 1;
  SymbolId symbolId = 2;
  StateGroupId stateGroupId = 3;
}

struct IndexRange {
  uint startIndex;
  uint endIndexExclusive;
}

struct CollaborativeTextOpID {
  uint sessionID;
  uint counterID;
}

enum CollaborativeTextOpType {
  INSERT = 0;
  DELETE = 1;
}

message CollaborativeTextStrippedOpRunWithIDs {
  CollaborativeTextOpID firstId = 1;
  uint runLength = 2;
  CollaborativeTextOpID[] parentIds = 3;
  CollaborativeTextOpID[] rebasedOnOpIds = 4;
}

message CollaborativeTextStrippedOpRunWithLoc {
  CollaborativeTextOpType type = 1;
  IndexRange range = 2;
  bool rangeShouldBeIteratedInReverse = 3;
  IndexRange contentBytesInBuffer = 4;
  IndexRange rebasedRange = 5;
}

message CollaborativeTextOpRun {
  CollaborativeTextOpID id = 1;
  CollaborativeTextOpID[] parentIds = 2;
  CollaborativeTextOpType type = 3;
  IndexRange range = 4;
  bool rangeShouldBeIteratedInReverse = 5;
  string content = 6;
  CollaborativeTextOpID[] rebasedOnOpIds = 7;
  IndexRange rebasedRange = 8;
}

message CollaborativePlainText {
  CollaborativeTextStrippedOpRunWithIDs[] historyOpsWithIds = 1;
  CollaborativeTextStrippedOpRunWithLoc[] historyOpsWithLoc = 2;
  byte[] historyStringContentBuffer = 3;
  CollaborativeTextOpRun[] changesToAppend = 4;
}

message CollaborativeTextSelection {
  GUID node = 1;
  uint field = 2;
  IndexRange selectedRange = 3;
  bool caretAtFront = 4;
  CollaborativeTextOpID[] textVersion = 5;
}

message ResponsiveTextStyleVariant {
  float minWidth = 1;
  NodeChange fields = 2;
  VariableData variableFontSize = 3;
  VariableData variableLineHeight = 4;
  VariableData variableLetterSpacing = 5;
  VariableData variableParagraphSpacing = 6;
  string name = 7;
}

enum FlappType {
  POLL = 0;
  EMBED = 1;
  FACEPILE = 2;
  ALIGNMENT = 3;
  YOUTUBE = 4;
}

message SlideThemeProps {
  string themeVersion = 1;
  VariableSetID variableSetId = 2;
  StyleId[] textStyleIds = 3;
  bool isTextColorManuallySelected = 4;
  bool isBorderColorManuallySelected = 5;
  AssetRef subscribedThemeRef = 6;
  uint schemaVersion = 7;
  bool isGeneratedFromDesign = 8;
}

message SlideThemeMap {
  SlideThemeMapEntry[] entries = 1;
}

message SlideThemeMapEntry {
  ThemeID themeId = 1;
  SlideThemeProps themeProps = 2;
}

message SharedSymbolReference {
  string fileKey = 1;
  GUID symbolID = 2;
  string versionHash = 3;
  GUIDPathMapping[] guidPathMappings = 4;
  byte[] bytes = 5;
  GUIDMapping[] libraryGUIDToSubscribingGUID = 6;
  string componentKey = 7;
  GUIDPathMapping[] unflatteningMappings = 8;
  bool isUnflattened = 9;
}

message SharedComponentMasterData {
  string componentKey = 1;
  GUIDPathMapping[] publishingGUIDPathToTeamLibraryGUID = 2;
  bool isUnflattened = 3;
}

message InstanceOverrideStash {
  GUIDPath overridePathOfSwappedInstance = 1;
  string componentKey = 2;
  NodeChange[] overrides = 3;
}

message InstanceOverrideStashV2 {
  GUIDPath overridePathOfSwappedInstance = 1;
  GUID localSymbolID = 2;
  NodeChange[] overrides = 3;
}

message ImportedCodeFileEntry {
  CodeFileId codeFileId = 1;
}

message ImportedCodeFiles {
  ImportedCodeFileEntry[] entries = 1;
}

enum BlurOpType {
  NORMAL = 0;
  PROGRESSIVE = 1;
}

enum RepeatType {
  LINEAR = 0;
  RADIAL = 1;
}

enum UnitType {
  PIXELS = 0;
  RELATIVE = 1;
}

enum RepeatOrder {
  FORWARD = 0;
  REVERSE = 1;
}

enum EffectAxis {
  X = 0;
  Y = 1;
  X_AND_Y = 2;
}

message Effect {
  EffectType type = 1;
  Vector offset = 3;
  float radius = 4;
  bool visible = 5;
  BlendMode blendMode = 6;
  float spread = 7;
  bool showShadowBehindNode = 8;
  VariableData radiusVar = 9;
  VariableData colorVar = 10;
  VariableData spreadVar = 11;
  VariableData xVar = 12;
  VariableData yVar = 13;
  uint count = 14;
  RepeatType repeatType = 15;
  EffectAxis axis = 16;
  UnitType unitType = 17;
  RepeatOrder order = 18;
  BlurOpType blurOpType = 19;
  Vector startOffset = 20;
  Vector endOffset = 28;
  float startRadius = 21;
  Color color = 2;
  Color secondaryColor = 24;
  Vector noiseSize = 22;
  uint seed = 29;
  bool clipToShape = 23;
  float density = 25;
  NoiseType noiseType = 26;
  float opacity = 27;
  float refractionRadius = 30;
  float specularAngle = 31;
  float specularIntensity = 32;
  float bevelSize = 33;
  float chromaticAberration = 34;
  float reflectionDistance = 35;
  float refractionIntensity = 36;
  VariableData refractionRadiusVar = 37;
  VariableData specularAngleVar = 38;
  VariableData specularIntensityVar = 39;
  VariableData chromaticAberrationVar = 40;
  VariableData splayVar = 41;
  VariableData refractionIntensityVar = 42;
  CodeComponentId customEffectId = 43;
  ComponentPropAssignment[] componentPropAssignments = 44;
  VariableData startRadiusVar = 45;
  VariableData startOffsetXVar = 46;
  VariableData startOffsetYVar = 47;
  VariableData endOffsetXVar = 48;
  VariableData endOffsetYVar = 49;
  VariableData noiseSizeXVar = 50;
  VariableData noiseSizeYVar = 51;
  VariableData densityVar = 52;
  VariableData effectOpacityVar = 53;
  VariableData secondaryColorVar = 54;
  GUID id = 55;
}

enum TransformModifierType {
  REPEAT = 0;
  SYMMETRY = 1;
  SKEW = 2;
}

message TransformModifier {
  TransformModifierType type = 1;
  Vector offset = 2;
  bool visible = 3;
  uint count = 4;
  RepeatType repeatType = 5;
  EffectAxis axis = 6;
  UnitType unitType = 7;
  RepeatOrder order = 8;
  float skewX = 9;
  float skewY = 10;
}

enum TransformSchemaType {
  NONE = 0;
  FIXED_ORDER = 1;
  FREEFORM = 2;
}

struct Matrix4f {
  float m00;
  float m01;
  float m02;
  float m03;
  float m10;
  float m11;
  float m12;
  float m13;
  float m20;
  float m21;
  float m22;
  float m23;
  float m30;
  float m31;
  float m32;
  float m33;
}

message FixedOrderTransform3d {
  float perspective = 1;
  float translateZ = 2;
  float rotateX = 3;
  float rotateY = 4;
  float rotateZ = 5;
}

enum TransformFnType {
  NONE = 0;
  MATRIX_3D = 1;
  PERSPECTIVE = 2;
  TRANSLATE_Z = 3;
  ROTATE_X = 4;
  ROTATE_Y = 5;
  ROTATE_Z = 6;
}

message TransformFnValue {
  Matrix4f matrix3d = 1;
  float perspective = 2;
  float rotateAngle = 3;
  float translateValue = 4;
}

message TransformFn {
  TransformFnType type = 1;
  TransformFnValue value = 2;
}

message TransformSchemaValue {
  FixedOrderTransform3d fixedOrderTransform3d = 1;
  TransformFn[] transformFunctions = 2;
}

message Transform3d {
  TransformSchemaType type = 1;
  TransformSchemaValue value = 2;
  bool backfaceHidden = 3;
}

struct NumberVector2D {
  Number x;
  Number y;
}

message Scene3d {
  float perspective = 1;
  NumberVector2D perspectiveOrigin = 2;
  bool preserve3d = 3;
}

message TransformOrigin {
  Number x = 1;
  Number y = 2;
}

message TransitionInfo {
  TransitionType type = 1;
  float duration = 2;
}

enum PrototypeDeviceType {
  NONE = 0;
  PRESET = 1;
  CUSTOM = 2;
  PRESENTATION = 3;
}

enum DeviceRotation {
  NONE = 0;
  CCW_90 = 1;
}

message PrototypeDevice {
  PrototypeDeviceType type = 1;
  Vector size = 2;
  string presetIdentifier = 3;
  DeviceRotation rotation = 4;
}

enum OverlayPositionType {
  CENTER = 0;
  TOP_LEFT = 1;
  TOP_CENTER = 2;
  TOP_RIGHT = 3;
  BOTTOM_LEFT = 4;
  BOTTOM_CENTER = 5;
  BOTTOM_RIGHT = 6;
  MANUAL = 7;
}

enum OverlayBackgroundInteraction {
  NONE = 0;
  CLOSE_ON_CLICK_OUTSIDE = 1;
}

enum OverlayBackgroundType {
  NONE = 0;
  SOLID_COLOR = 1;
}

message OverlayBackgroundAppearance {
  OverlayBackgroundType backgroundType = 1;
  Color backgroundColor = 2;
}

enum NavigationType {
  NAVIGATE = 0;
  OVERLAY = 1;
  SWAP = 2;
  SWAP_STATE = 3;
  SCROLL_TO = 4;
}

enum ExportColorProfile {
  DOCUMENT = 0;
  SRGB = 1;
  DISPLAY_P3_V4 = 2;
  CMYK = 3;
}

enum ExportBackgroundType {
  SOLID = 0;
  TRANSPARENT = 1;
  GRID = 2;
}

message ExportSettings {
  string suffix = 1;
  ImageType imageType = 2;
  ExportConstraint constraint = 3;
  bool svgDataName = 4;
  ExportSVGIDMode svgIDMode = 5;
  bool svgOutlineText = 6;
  bool contentsOnly = 7;
  bool svgForceStrokeMasks = 8;
  bool useAbsoluteBounds = 9;
  ExportColorProfile colorProfile = 10;
  float quality = 11;
  bool useBicubicSampler = 12;
  int frameRate = 13;
  int loopCount = 14;
  ExportBackgroundType backgroundType = 15;
}

enum ExportSVGIDMode {
  IF_NEEDED = 0;
  ALWAYS = 1;
}

message LayoutGrid {
  LayoutGridType type = 1;
  Axis axis = 2;
  bool visible = 3;
  int numSections = 4;
  float offset = 5;
  float sectionSize = 6;
  float gutterSize = 7;
  Color color = 8;
  LayoutGridPattern pattern = 9;
  VariableData numSectionsVar = 10;
  VariableData offsetVar = 11;
  VariableData sectionSizeVar = 12;
  VariableData gutterSizeVar = 13;
}

message Guide {
  Axis axis = 1;
  float offset = 2;
  GUID guid = 3;
}

message Path {
  WindingRule windingRule = 1;
  uint commandsBlob = 2;
  uint styleID = 3;
}

enum StyleType {
  NONE = 0;
  FILL = 1;
  STROKE = 2;
  TEXT = 3;
  EFFECT = 4;
  EXPORT = 5;
  GRID = 6;
  ANIMATION = 7;
}

enum BrushOrientation {
  FORWARD = 0;
  REVERSE = 1;
}

enum BrushType {
  STRETCH = 0;
  SCATTER = 1;
}

message DynamicStrokeSettings {
  float frequency = 1;
  float wiggle = 2;
  float smoothen = 3;
}

message ScatterStrokeSettings {
  float gap = 1;
  float wiggle = 2;
  float angularJitter = 3;
  float rotation = 4;
  float sizeJitter = 5;
}

message StretchStrokeSettings {
  BrushOrientation orientation = 1;
}

message StrokeData {
  Stroke[] strokes = 1;
  uint version = 2;
}

message Stroke {
  int strokeId = 1;
  float strokeWeight = 2;
  VariableData strokeWeightVar = 3;
  Paint[] strokePaint = 4;
  StyleId styleIdForStrokeFill = 5;
  StrokeAlign strokeAlign = 6;
  StrokeCap strokeCap = 7;
  Number strokeCapSize = 8;
  StrokeJoin strokeJoin = 9;
  float miterLimit = 10;
  float[] dashPattern = 11;
  OptionalVector pathTrim = 12;
  float strokeOffset = 13;
  bool isDeleted = 14;
}

message VariableWidthPoint {
  float position = 1;
  float ascent = 2;
  float descent = 3;
  int segmentId = 4;
}

message SharedStyleReference {
  string styleKey = 1;
  string versionHash = 2;
}

message SharedStyleMasterData {
  string styleKey = 1;
  string sortPosition = 2;
  string fileKey = 3;
}

enum ScrollBehavior {
  SCROLLS = 0;
  FIXED_WHEN_CHILD_OF_SCROLLING_FRAME = 1;
  STICKY_SCROLLS = 2;
}

message ArcData {
  float startingAngle = 1;
  float endingAngle = 2;
  float innerRadius = 3;
}

message SymbolLink {
  string uri = 1;
  string displayName = 2;
  string displayText = 3;
}

message PluginData {
  string pluginID = 1;
  string value = 2;
  string key = 3;
}

message PluginRelaunchData {
  string pluginID = 1;
  string message = 2;
  string command = 3;
  bool isDeleted = 4;
  CodeComponentId customToolId = 5;
}

message MultiplayerFieldVersion {
  uint counter = 1;
  uint sessionID = 2;
}

enum ConnectorMagnet {
  NONE = 0;
  AUTO = 1;
  TOP = 2;
  LEFT = 3;
  BOTTOM = 4;
  RIGHT = 5;
  CENTER = 6;
  AUTO_HORIZONTAL = 7;
  EDGE = 8;
  ABSOLUTE = 9;
}

message ConnectorEndpoint {
  GUID endpointNodeID = 1;
  Vector position = 2;
  ConnectorMagnet magnet = 3;
  Vector relativePosition = 4;
}

message ConnectorControlPoint {
  Vector position = 1;
  Vector axis = 2;
}

enum ConnectorTextSection {
  MIDDLE_TO_START = 0;
  MIDDLE_TO_END = 1;
}

enum ConnectorOffAxisOffset {
  NONE = 0;
  ABOVE = 1;
  BELOW = 2;
}

message ConnectorTextMidpoint {
  ConnectorTextSection section = 1;
  float offset = 2;
  ConnectorOffAxisOffset offAxisOffset = 3;
}

enum ConnectorLineStyle {
  ELBOWED = 0;
  STRAIGHT = 1;
  CURVED = 2;
}

enum ConnectorType {
  MANUAL = 0;
  DIAGRAM = 1;
}

enum AnnotationPropertyType {
  FILL = 0;
  STROKE = 1;
  WIDTH = 2;
  HEIGHT = 3;
  MIN_WIDTH = 4;
  MIN_HEIGHT = 5;
  MAX_WIDTH = 6;
  MAX_HEIGHT = 7;
  STROKE_WIDTH = 8;
  CORNER_RADIUS = 9;
  EFFECT = 10;
  TEXT_STYLE = 11;
  TEXT_ALIGN_HORIZONTAL = 12;
  FONT_FAMILY = 13;
  FONT_SIZE = 14;
  FONT_WEIGHT = 15;
  LINE_HEIGHT = 16;
  LETTER_SPACING = 17;
  STACK_SPACING = 18;
  STACK_PADDING = 19;
  STACK_MODE = 20;
  STACK_ALIGNMENT = 21;
  OPACITY = 22;
  COMPONENT = 23;
  FONT_STYLE = 24;
  GRID_ROW_GAP = 25;
  GRID_COLUMN_GAP = 26;
  GRID_ROW_COUNT = 27;
  GRID_COLUMN_COUNT = 28;
  GRID_ROW_ANCHOR_INDEX = 29;
  GRID_COLUMN_ANCHOR_INDEX = 30;
  GRID_ROW_SPAN = 31;
  GRID_COLUMN_SPAN = 32;
}

message AnnotationProperty {
  AnnotationPropertyType type = 1;
}

enum AnnotationCategoryPreset {
  NONE = 0;
  ACCESSIBILITY = 1;
  BEHAVIOR = 2;
  CONTENT = 3;
  DEVELOPMENT = 4;
  INTERACTION = 5;
}

enum AnnotationCategoryColor {
  YELLOW = 0;
  ORANGE = 1;
  RED = 2;
  PINK = 3;
  VIOLET = 4;
  BLUE = 5;
  TEAL = 6;
  GREEN = 7;
}

message AnnotationCategoryCustom {
  AnnotationCategoryColor color = 1;
  Color customColor = 2;
  string label = 3;
}

message AnnotationCategory {
  GUID id = 1;
  AnnotationCategoryPreset preset = 2;
  AnnotationCategoryCustom custom = 3;
}

message AnnotationCategories {
  uint version = 1;
  AnnotationCategory[] items = 2;
}

message Annotation {
  string label = 1;
  AnnotationProperty[] properties = 2;
  string labelV2 = 3;
  GUID categoryId = 4;
}

enum AnnotationMeasurementNodeSide {
  TOP = 0;
  BOTTOM = 1;
  LEFT = 2;
  RIGHT = 3;
}

message AnnotationMeasurement {
  GUID id = 1;
  GUID fromNode = 2;
  GUID toNode = 3;
  AnnotationMeasurementNodeSide fromNodeSide = 4;
  bool toSameSide = 5;
  float innerOffsetRelative = 6;
  float outerOffsetFixed = 7;
  GUIDPath toNodeStablePath = 8;
  string freeText = 9;
}

message LibraryMoveInfo {
  string oldKey = 1;
  string pasteFileKey = 2;
}

message LibraryMoveHistoryItem {
  GUID sourceNodeId = 1;
  string sourceComponentKey = 2;
}

message DeveloperRelatedLink {
  string nodeId = 1;
  string fileKey = 2;
  string linkName = 3;
  string linkUrl = 4;
}

message WidgetPointer {
  GUID nodeId = 1;
}

message EditInfo {
  string timestampIso8601 = 1;
  string userId = 2;
  uint lastEditedAt = 3;
  uint createdAt = 4;
}

enum EditorType {
  DESIGN = 0;
  WHITEBOARD = 1;
  SLIDES = 2;
  DEV_HANDOFF = 3;
  SITES = 4;
  COOPER = 5;
  ILLUSTRATION = 6;
  FIGMAKE = 7;
  FIGSPEC = 8;
}

enum MaskType {
  ALPHA = 0;
  OUTLINE = 1;
  LUMINANCE = 2;
}

enum ModuleType {
  NONE = 0;
  SINGLE_NODE = 1;
  MULTI_NODE = 2;
}

enum SectionStatus {
  NONE = 0;
  BUILD = 1;
  COMPLETED = 2;
}

message SectionStatusInfo {
  SectionStatus status = 1;
  uint lastUpdateUnixTimestamp = 2;
  string description = 3;
  string userId = 4;
  SectionStatus prevStatus = 5;
}

message BuzzApprovalRequestInfo {
  string requestId = 1;
  string requesterUserId = 2;
  uint requestedAt = 3;
  string[] reviewerUserIds = 4;
  string title = 5;
  string note = 6;
  GUID[] assetsInRequest = 7;
}

message BuzzApprovalRequests {
  BuzzApprovalRequestInfo[] requests = 1;
}

enum BuzzApprovalNodeStatus {
  NONE = 0;
  IN_REVIEW = 1;
  APPROVED = 2;
  CHANGES_REQUESTED = 3;
}

message BuzzApprovalNodeStatusInfo {
  BuzzApprovalNodeStatus currentStatus = 1;
  bool wasPreviouslyApproved = 2;
  uint[] approvalRevokedAtHistory = 3;
}

message CodeEmbedInfo {
  string url = 1;
  string srcUrl = 2;
  string title = 3;
  string thumbnailImageHash = 4;
  bool isPublishedSite = 5;
}

enum VariableTimingDisplayUnit {
  MILLISECONDS = 0;
  SECONDS = 1;
}

message NodeChange {
  GUID guid = 1;
  uint guidTag = 53;
  NodePhase phase = 2;
  uint phaseTag = 54;
  ParentIndex parentIndex = 3;
  uint parentIndexTag = 55;
  NodeType type = 4;
  uint typeTag = 56;
  string name = 5;
  uint nameTag = 57;
  bool isPublishable = 174;
  string description = 318;
  LibraryMoveInfo libraryMoveInfo = 256;
  LibraryMoveHistoryItem[] libraryMoveHistory = 281;
  string key = 319;
  AssetIdMap fileAssetIds = 383;
  uint styleID = 49;
  uint styleIDTag = 101;
  bool isFillStyle = 157;
  bool isStrokeStyle = 161;
  bool isOverrideOverTextStyle = 376;
  StyleType styleType = 163;
  string styleDescription = 191;
  string version = 171;
  string userFacingVersion = 399;
  string sortPosition = 320;
  SharedStyleMasterData ojansSuperSecretNodeField = 345;
  SharedStyleMasterData sevMoonlitLilyData = 348;
  bool isSoftDeletedStyle = 176;
  bool isNonUpdateable = 177;
  SharedStyleMasterData sharedStyleMasterData = 172;
  SharedStyleReference sharedStyleReference = 173;
  GUID inheritFillStyleID = 158;
  GUID inheritStrokeStyleID = 162;
  GUID inheritTextStyleID = 167;
  GUID inheritExportStyleID = 168;
  GUID inheritEffectStyleID = 169;
  GUID inheritGridStyleID = 170;
  GUID inheritFillStyleIDForStroke = 185;
  StyleId styleIdForFill = 332;
  StyleId styleIdForStrokeFill = 333;
  StyleId styleIdForText = 334;
  StyleId styleIdForEffect = 335;
  StyleId styleIdForGrid = 336;
  StyleAnimation[] styleAnimations = 580;
  Paint[] backgroundPaints = 193;
  GUID inheritFillStyleIDForBackground = 194;
  bool isStateGroup = 225;
  StateGroupPropertyValueOrder[] stateGroupPropertyValueOrders = 238;
  PartialPasteAnnotation partialPasteAnnotation = 581;
  SharedSymbolReference sharedSymbolReference = 122;
  bool isSymbolPublishable = 123;
  GUIDPathMapping[] sharedSymbolMappings = 124;
  string sharedSymbolVersion = 126;
  SharedComponentMasterData sharedComponentMasterData = 152;
  string symbolDescription = 144;
  GUIDPathMapping[] unflatteningMappings = 164;
  GUIDPathMapping[] forceUnflatteningMappings = 228;
  string publishFile = 214;
  string sourceLibraryKey = 395;
  GUID publishID = 215;
  string componentKey = 216;
  bool isC2 = 217;
  string publishedVersion = 218;
  string originComponentKey = 252;
  ComponentPropDef[] componentPropDefs = 266;
  ComponentPropRef[] componentPropRefs = 267;
  VariantPropSpec[] variantPropSpecs = 483;
  SymbolData symbolData = 113;
  uint symbolDataTag = 114;
  NodeChange[] derivedSymbolData = 125;
  bool nestedInstanceResizeEnabled = 394;
  GUID overriddenSymbolID = 143;
  ComponentPropAssignment[] componentPropAssignments = 268;
  bool propsAreBubbled = 305;
  InstanceOverrideStash[] overrideStash = 248;
  InstanceOverrideStashV2[] overrideStashV2 = 250;
  GUIDPath guidPath = 111;
  uint guidPathTag = 112;
  int overrideLevel = 321;
  ModuleType moduleType = 382;
  bool isSlot = 463;
  bool isSlotContent = 495;
  float fontSize = 21;
  uint fontSizeTag = 73;
  float paragraphIndent = 22;
  uint paragraphIndentTag = 74;
  float paragraphSpacing = 23;
  uint paragraphSpacingTag = 75;
  TextAlignHorizontal textAlignHorizontal = 32;
  uint textAlignHorizontalTag = 84;
  TextAlignVertical textAlignVertical = 33;
  uint textAlignVerticalTag = 85;
  TextCase textCase = 34;
  uint textCaseTag = 86;
  TextDecoration textDecoration = 35;
  uint textDecorationTag = 87;
  Number lineHeight = 40;
  uint lineHeightTag = 92;
  FontName fontName = 41;
  uint fontNameTag = 93;
  TextData textData = 42;
  uint textDataTag = 94;
  DerivedTextData derivedTextData = 359;
  bool fontVariantCommonLigatures = 127;
  bool fontVariantContextualLigatures = 128;
  bool fontVariantDiscretionaryLigatures = 129;
  bool fontVariantHistoricalLigatures = 130;
  bool fontVariantOrdinal = 131;
  bool fontVariantSlashedZero = 132;
  FontVariantNumericFigure fontVariantNumericFigure = 133;
  FontVariantNumericSpacing fontVariantNumericSpacing = 134;
  FontVariantNumericFraction fontVariantNumericFraction = 135;
  FontVariantCaps fontVariantCaps = 136;
  FontVariantPosition fontVariantPosition = 137;
  Number letterSpacing = 165;
  string fontVersion = 202;
  LeadingTrim leadingTrim = 322;
  bool hangingPunctuation = 337;
  bool hangingList = 339;
  bool fallbackGlyphs = 550;
  int maxLines = 351;
  ResponsiveTextStyleVariant[] responsiveTextStyleVariants = 417;
  SectionStatus sectionStatus = 352;
  SectionStatusInfo sectionStatusInfo = 355;
  uint textUserLayoutVersion = 203;
  uint textExplicitLayoutVersion = 396;
  OpenTypeFeature[] toggledOnOTFeatures = 205;
  OpenTypeFeature[] toggledOffOTFeatures = 206;
  Hyperlink hyperlink = 223;
  Mention mention = 340;
  FontVariation[] fontVariations = 260;
  uint textBidiVersion = 279;
  TextTruncation textTruncation = 280;
  bool hasHadRTLText = 292;
  EmojiImageSet emojiImageSet = 391;
  string slideThumbnailHash = 392;
  bool visible = 6;
  uint visibleTag = 58;
  bool locked = 7;
  uint lockedTag = 59;
  LockMode lockMode = 434;
  float opacity = 8;
  uint opacityTag = 60;
  BlendMode blendMode = 9;
  uint blendModeTag = 61;
  Vector size = 11;
  uint sizeTag = 63;
  Matrix transform = 12;
  uint transformTag = 64;
  float[] dashPattern = 13;
  uint dashPatternTag = 65;
  bool mask = 16;
  uint maskTag = 68;
  Vector rotationOrigin = 424;
  bool maskIsOutline = 18;
  uint maskIsOutlineTag = 70;
  MaskType maskType = 317;
  float backgroundOpacity = 19;
  uint backgroundOpacityTag = 71;
  float cornerRadius = 20;
  uint cornerRadiusTag = 72;
  float strokeWeight = 26;
  uint strokeWeightTag = 78;
  StrokeAlign strokeAlign = 29;
  uint strokeAlignTag = 81;
  StrokeCap strokeCap = 30;
  uint strokeCapTag = 82;
  Number strokeCapSize = 497;
  StrokeJoin strokeJoin = 31;
  uint strokeJoinTag = 83;
  Paint[] fillPaints = 38;
  uint fillPaintsTag = 90;
  Paint[] strokePaints = 39;
  uint strokePaintsTag = 91;
  Effect[] effects = 43;
  uint effectsTag = 95;
  Color backgroundColor = 50;
  uint backgroundColorTag = 102;
  Path[] fillGeometry = 51;
  uint fillGeometryTag = 103;
  Path[] strokeGeometry = 52;
  uint strokeGeometryTag = 104;
  Path[] offsetFillMaskGeometry = 564;
  Paint[] textDecorationFillPaints = 411;
  bool textDecorationSkipInk = 412;
  Number textUnderlineOffset = 413;
  Number textDecorationThickness = 415;
  TextDecorationStyle textDecorationStyle = 416;
  TransformModifier[] transformModifiers = 455;
  Transform3d transform3d = 570;
  StrokeData strokeData = 571;
  Scene3d scene3d = 572;
  TransformOrigin transformOrigin = 587;
  float rectangleTopLeftCornerRadius = 145;
  float rectangleTopRightCornerRadius = 146;
  float rectangleBottomLeftCornerRadius = 147;
  float rectangleBottomRightCornerRadius = 148;
  bool rectangleCornerRadiiIndependent = 149;
  bool rectangleCornerToolIndependent = 150;
  bool proportionsConstrained = 151;
  OptionalVector targetAspectRatio = 423;
  bool useAbsoluteBounds = 258;
  bool borderTopHidden = 287;
  bool borderBottomHidden = 288;
  bool borderLeftHidden = 289;
  bool borderRightHidden = 290;
  bool bordersTakeSpace = 294;
  float borderTopWeight = 295;
  float borderBottomWeight = 296;
  float borderLeftWeight = 297;
  float borderRightWeight = 298;
  bool borderStrokeWeightsIndependent = 299;
  ConstraintType horizontalConstraint = 28;
  uint horizontalConstraintTag = 80;
  StackMode stackMode = 105;
  uint stackModeTag = 106;
  float stackSpacing = 107;
  uint stackSpacingTag = 108;
  float stackPadding = 109;
  uint stackPaddingTag = 110;
  StackCounterAlign stackCounterAlign = 120;
  StackJustify stackJustify = 121;
  StackAlign stackAlign = 208;
  float stackHorizontalPadding = 209;
  float stackVerticalPadding = 210;
  StackSize stackWidth = 211;
  StackSize stackHeight = 212;
  StackSize stackPrimarySizing = 229;
  StackJustify stackPrimaryAlignItems = 230;
  StackAlign stackCounterAlignItems = 231;
  float stackChildPrimaryGrow = 232;
  float stackPaddingRight = 233;
  float stackPaddingBottom = 234;
  StackCounterAlign stackChildAlignSelf = 236;
  StackPositioning stackPositioning = 269;
  bool stackReverseZIndex = 271;
  StackWrap stackWrap = 323;
  float stackCounterSpacing = 324;
  OptionalVector minSize = 325;
  OptionalVector maxSize = 326;
  StackCounterAlignContent stackCounterAlignContent = 343;
  int[] sortedMovingChildIndices = 406;
  uint stackLayoutVersion = 574;
  GUIDPositionMap gridRows = 435;
  GUIDPositionMap gridColumns = 436;
  float gridRowGap = 437;
  float gridColumnGap = 438;
  GUID gridRowAnchor = 439;
  GUID gridColumnAnchor = 440;
  uint gridRowSpan = 441;
  uint gridColumnSpan = 442;
  GUIDGridTrackSizeMap gridColumnsSizing = 474;
  GUIDGridTrackSizeMap gridRowsSizing = 475;
  GridChildAlign gridChildVerticalAlign = 476;
  GridChildAlign gridChildHorizontalAlign = 477;
  GridAutoTracks gridAutoTracks = 555;
  bool gridReflowEnabled = 556;
  bool isSnakeGameBoard = 344;
  GUID transitionNodeID = 139;
  GUID prototypeStartNodeID = 140;
  Color prototypeBackgroundColor = 141;
  TransitionInfo transitionInfo = 153;
  TransitionType transitionType = 154;
  float transitionDuration = 155;
  EasingType easingType = 156;
  bool transitionPreserveScroll = 181;
  ConnectionType connectionType = 182;
  string connectionURL = 183;
  PrototypeDevice prototypeDevice = 184;
  InteractionType interactionType = 187;
  float transitionTimeout = 188;
  bool interactionMaintained = 189;
  float interactionDuration = 190;
  bool destinationIsOverlay = 192;
  bool transitionShouldSmartAnimate = 207;
  PrototypeInteraction[] prototypeInteractions = 226;
  PrototypeInteraction[] objectAnimations = 426;
  PrototypeStartingPoint prototypeStartingPoint = 249;
  PluginData[] pluginData = 204;
  PluginRelaunchData[] pluginRelaunchData = 219;
  ConnectorEndpoint connectorStart = 242;
  ConnectorEndpoint connectorEnd = 243;
  ConnectorLineStyle connectorLineStyle = 244;
  StrokeCap connectorStartCap = 245;
  StrokeCap connectorEndCap = 246;
  ConnectorControlPoint[] connectorControlPoints = 253;
  ConnectorControlPoint[] connectorBezierControlPoints = 479;
  ConnectorTextMidpoint connectorTextMidpoint = 255;
  ConnectorType connectorType = 373;
  int connectorVersion = 533;
  Annotation[] annotations = 369;
  AnnotationMeasurement[] measurements = 384;
  AnnotationCategories annotationCategories = 453;
  ShapeWithTextType shapeWithTextType = 241;
  float shapeUserHeight = 247;
  bool isStrokePaintDerived = 530;
  DerivedImmutableFrameData derivedImmutableFrameData = 254;
  MultiplayerFieldVersion derivedImmutableFrameDataVersion = 338;
  NodeGenerationData nodeGenerationData = 240;
  JsxData jsxData = 491;
  DerivedJsxData derivedJsxData = 492;
  string stableKey = 493;
  CodeBlockLanguage codeBlockLanguage = 259;
  CodeBlockTheme codeBlockTheme = 433;
  LinkPreviewData linkPreviewData = 278;
  bool shapeTruncates = 282;
  bool sectionContentsHidden = 283;
  VideoPlayback videoPlayback = 300;
  StampData stampData = 301;
  SectionPresetInfo sectionPresetInfo = 370;
  PlatformShapeDefinition platformShapeDefinition = 409;
  MultiplayerMap widgetSyncedState = 273;
  uint widgetSyncCursor = 274;
  WidgetDerivedSubtreeCursor widgetDerivedSubtreeCursor = 275;
  WidgetPointer widgetCachedAncestor = 276;
  WidgetInputBehavior widgetInputBehavior = 285;
  string widgetTooltip = 286;
  WidgetHoverStyle widgetHoverStyle = 291;
  bool isWidgetStickable = 293;
  bool shouldHideCursorsOnWidgetHover = 360;
  WidgetMetadata widgetMetadata = 262;
  WidgetEvent[] widgetEvents = 263;
  WidgetPropertyMenuItem[] widgetPropertyMenuItems = 265;
  WidgetInputTextNodeType widgetInputTextNodeType = 401;
  MultiplayerMap jsxProps = 489;
  TableRowColumnPositionMap tableRowPositions = 308;
  TableRowColumnPositionMap tableColumnPositions = 309;
  TableRowColumnSizeMap tableRowHeights = 310;
  TableRowColumnSizeMap tableColumnWidths = 311;
  TableMergedCellMap tableMergedCells = 538;
  MultiplayerMap interactiveSlideConfigData = 371;
  MultiplayerMap interactiveSlideParticipantData = 372;
  FlappType flappType = 402;
  bool isEmbeddedPrototype = 486;
  string slideSpeakerNotes = 389;
  bool isSkippedSlide = 410;
  MultiplayerMap presentationOutlines = 573;
  ThemeID themeID = 379;
  SlideThemeData slideThemeData = 381;
  SlideThemeMap slideThemeMap = 390;
  string slideTemplateFileKey = 393;
  SlideNumber slideNumber = 443;
  string slideNumberSeparator = 456;
  GUID diagramParentId = 363;
  GUID layoutRoot = 362;
  string layoutPosition = 364;
  DiagramLayoutRuleType diagramLayoutRuleType = 366;
  DiagramParentIndex diagramParentIndex = 367;
  DiagramLayoutPaused diagramLayoutPaused = 368;
  bool isPageDivider = 380;
  InternalEnumForTest internalEnumForTest = 251;
  InternalDataForTest internalDataForTest = 257;
  bool autoRename = 14;
  uint autoRenameTag = 66;
  bool backgroundEnabled = 15;
  uint backgroundEnabledTag = 67;
  bool exportContentsOnly = 17;
  uint exportContentsOnlyTag = 69;
  float miterLimit = 25;
  uint miterLimitTag = 77;
  float textTracking = 27;
  uint textTrackingTag = 79;
  ConstraintType verticalConstraint = 37;
  uint verticalConstraintTag = 89;
  ExportSettings[] exportSettings = 45;
  uint exportSettingsTag = 97;
  TextAutoResize textAutoResize = 46;
  uint textAutoResizeTag = 98;
  LayoutGrid[] layoutGrids = 47;
  uint layoutGridsTag = 99;
  bool frameMaskDisabled = 115;
  uint frameMaskDisabledTag = 116;
  bool resizeToFit = 117;
  uint resizeToFitTag = 118;
  BooleanOperation booleanOperation = 36;
  uint booleanOperationTag = 88;
  VectorMirror handleMirroring = 44;
  uint handleMirroringTag = 96;
  uint count = 10;
  uint countTag = 62;
  float starInnerScale = 24;
  uint starInnerScaleTag = 76;
  ArcData arcData = 195;
  VectorData vectorData = 48;
  uint vectorDataTag = 100;
  uint vectorOperationVersion = 425;
  TextPathStart textPathStart = 432;
  bool exportBackgroundDisabled = 119;
  Guide[] guides = 138;
  bool internalOnly = 142;
  ScrollDirection scrollDirection = 159;
  float cornerSmoothing = 160;
  Vector scrollOffset = 166;
  bool exportTextAsSVGText = 175;
  ScrollContractedState scrollContractedState = 178;
  Vector contractedSize = 179;
  string fixedChildrenDivider = 180;
  ScrollBehavior scrollBehavior = 186;
  int derivedSymbolDataLayoutVersion = 196;
  NavigationType navigationType = 197;
  OverlayPositionType overlayPositionType = 198;
  Vector overlayRelativePosition = 199;
  OverlayBackgroundInteraction overlayBackgroundInteraction = 200;
  OverlayBackgroundAppearance overlayBackgroundAppearance = 201;
  GUID overrideKey = 213;
  bool containerSupportsFillStrokeAndCorners = 220;
  StackSize stackCounterSizing = 221;
  bool containersSupportFillStrokeAndCorners = 222;
  KeyTrigger keyTrigger = 224;
  string voiceEventPhrase = 227;
  GUID[] ancestorPathBeforeDeletion = 235;
  SymbolLink[] symbolLinks = 237;
  TextListData textListData = 239;
  bool detachOpticalSizeFromFontSize = 261;
  float listSpacing = 264;
  EmbedData embedData = 270;
  RichMediaData richMediaData = 272;
  MultiplayerMap renderedSyncedState = 277;
  bool simplifyInstancePanels = 284;
  HTMLTag accessibleHTMLTag = 302;
  ARIARole ariaRole = 303;
  ARIAAttributesMap ariaAttributes = 357;
  string accessibleLabel = 304;
  bool isDecorativeImage = 490;
  VariableData variableData = 306;
  VariableDataMap variableConsumptionMap = 307;
  VariableModeBySetMap variableModeBySetMap = 316;
  VariableSetMode[] variableSetModes = 312;
  VariableSetID variableSetID = 313;
  VariableResolvedDataType variableResolvedType = 314;
  VariableDataValues variableDataValues = 315;
  string variableTokenName = 350;
  VariableTimingDisplayUnit timingDisplayUnit = 566;
  VariableScope[] variableScopes = 353;
  VariableDataMap parameterConsumptionMap = 445;
  CodeSyntaxMap codeSyntax = 358;
  PasteSource pasteSource = 388;
  EditorType pageType = 397;
  GUID strokeBrushGuid = 446;
  uint64 strokeSeed = 482;
  VariableWidthPoint[] variableWidthPoints = 447;
  DynamicStrokeSettings dynamicStrokeSettings = 448;
  ScatterStrokeSettings scatterStrokeSettings = 449;
  StretchStrokeSettings stretchStrokeSettings = 450;
  Matrix[] scatterBrushTransforms = 488;
  BrushType brushType = 452;
  OptionalVector pathTrim = 542;
  float strokeOffset = 554;
  VariableSetID backingVariableSetId = 377;
  VariableID overriddenVariableId = 464;
  VariableIdOrVariableOverrideId backingVariableId = 378;
  bool isCollectionExtendable = 385;
  string rootVariableKey = 386;
  InheritedVariablesData inheritedVariableIds = 517;
  HandoffStatusMap handoffStatusMap = 361;
  AgendaPositionMap agendaPositionMap = 327;
  AgendaMetadataMap agendaMetadataMap = 328;
  MigrationStatus migrationStatus = 329;
  bool isSoftDeleted = 330;
  EditInfo editInfo = 331;
  ColorProfile colorProfile = 341;
  SymbolId detachedSymbolId = 342;
  ChildReadingDirection childReadingDirection = 346;
  string readingIndex = 347;
  DocumentColorProfile documentColorProfile = 349;
  DeveloperRelatedLink[] developerRelatedLinks = 354;
  string slideActiveThemeLibKey = 356;
  EditScopeInfo editScopeInfo = 365;
  SemanticWeight semanticWeight = 374;
  SemanticItalic semanticItalic = 375;
  bool areSlidesManuallyIndented = 403;
  bool isResponsiveSet = 387;
  DerivedBreakpointData derivedBreakpointData = 500;
  GUID defaultResponsiveSetId = 398;
  bool isPrimaryBreakpoint = 458;
  GUID primaryResponsiveNodeId = 457;
  GUID multiEditGlueId = 462;
  float breakpointMinWidth = 501;
  bool isBreakpointInFocus = 522;
  ResponsiveSetSettings responsiveSetSettings = 400;
  NodeBehaviors behaviors = 404;
  string sourceCode = 414;
  CollaborativeTextOpID[] sourceCodeCollaborativeTextVersion = 534;
  CollaborativePlainText collaborativeSourceCode = 444;
  CodeLibraryId belongsToCodeLibraryId = 427;
  ImportedCodeFiles importedCodeFiles = 467;
  CanvasNodeId codeFileCanvasNodeId = 468;
  bool isEntrypointCodeFile = 498;
  string componentOrStateGroupKey = 502;
  uint componentOrStateGroupVersion = 503;
  string sourceCodeLibraryKey = 504;
  string[] sourceCodeLibraryKeys = 515;
  UsedMakeLibrary[] usedMakeLibraries = 524;
  string makeLibraryComponentId = 518;
  bool shouldHidePreviewForMakeKitCreation = 520;
  bool isMakeKit = 551;
  PrototypeDevice codePreviewSettings = 531;
  CodeExample[] codeExamples = 525;
  CodeFileId exportedFromCodeFileId = 428;
  string codeExportName = 430;
  string codeComponentDescription = 547;
  CodeComponentId backingCodeComponentId = 429;
  bool isMainCodeComponent = 487;
  CodeSnapshotState codeSnapshotState = 431;
  NodeChatMessage[] chatMessages = 451;
  NodeChatCompressionState chatCompressionState = 485;
  AIChatThread aiChatThread = 496;
  string codeChatMessagesKey = 484;
  CodeSnapshot codeSnapshot = 459;
  CodeSnapshotLayers codeSnapshotLayers = 589;
  uint codeSnapshotInvalidatedAt = 480;
  bool isCodeBehavior = 465;
  bool autoForkCode = 469;
  bool hasBeenManuallyRenamed = 470;
  bool codeCreatedFromDesign = 471;
  CanvasNodeId codeCreatedFromDesignNodeId = 481;
  ImageImportMap imageImports = 473;
  CodeObjectType codeObjectType = 516;
  string codeFilePath = 472;
  CodeBehaviorData codeBehaviorData = 478;
  uint codeLibraryFormat = 519;
  bool isCodePreviewPlayingOnCanvas = 527;
  CodeEmbedInfo codeEmbedInfo = 532;
  bool isEmbedCodeLayer = 546;
  CodeSourceInfo codeSourceInfo = 558;
  string mimeType = 536;
  byte[] blobRef = 537;
  CMSSelector cmsSelector = 419;
  CMSConsumptionMap cmsConsumptionMap = 420;
  CMSRichTextStyleMap cmsRichTextStyleMap = 460;
  SymbolId repeaterSymbolId = 539;
  RepeaterCmsOverrideData repeaterCmsOverrideData = 540;
  RepeaterSymbolOverrideData repeaterSymbolOverrideData = 549;
  RepeaterOverrideData repeaterOverrideData = 541;
  uint[] aiEditedNodeChangeFieldNumbers = 405;
  string aiEditScopeLabel = 408;
  FirstDraftData firstDraftData = 407;
  FirstDraftKitElementData firstDraftKitElementData = 418;
  CooperRevertData cooperRevertData = 421;
  CooperTemplateData cooperTemplateData = 461;
  BuzzApprovalRequests buzzApprovalRequests = 528;
  BuzzApprovalNodeStatusInfo buzzApprovalNodeStatusInfo = 529;
  HubFileAttribution hubFileAttribution = 422;
  ManagedStringData managedStringData = 454;
  ThumbnailInfo thumbnailInfo = 466;
  AiCanvasPrompt aiCanvasPrompt = 494;
  CanvasNodeId backingNodeId = 499;
  string pageStatus = 548;
  TRSSTransform2D motionTransform = 523;
  int64 timelinePosition = 506;
  KeyframeValueData keyframeValue = 507;
  VariableData keyframeValueRef = 586;
  InterpolationType interpolationType = 505;
  BezierHandles bezierHandles = 508;
  EasingData easingData = 535;
  KeyframeOperation keyframeOperation = 509;
  TimelinePositionType timelinePositionType = 510;
  bool isClip = 545;
  GUID clipId = 511;
  uint64 timelineDuration = 512;
  int64 timelineOffset = 513;
  bool timelineDisabled = 543;
  PlaybackStyle playbackStyle = 514;
  TimelineDefinitionsMap timelineDefinitions = 552;
  TimelineAssignmentsMap timelineAssignments = 553;
  AnimationPresets animationPresets = 521;
  StyleIdForAnimation[] styleIdsForAnimation = 582;
  AnimationPresetId backingAnimationPresetId = 583;
  Tools tools = 568;
  CustomEffects customEffects = 569;
  TransitionOverrideData transitionOverrides = 526;
  bool useLegacySmartAnimate = 544;
  SourceControlConfig sourceControlConfig = 557;
  SpecBlockType specBlockType = 559;
  CollaborativePlainText specBlockContent = 560;
  string specCodeBlockLanguage = 561;
  string specBlockTableAlignment = 562;
  int specBlockIndentLevel = 563;
  string specImageHash = 575;
  int specWidth = 576;
  int specHeight = 577;
  TableRowColumnSizeMap specBlockTableRowHeights = 578;
  TableRowColumnSizeMap specBlockTableColumnWidths = 579;
  string specEmbedUrl = 590;
  bool placeholder = 565;
  string placeholderClientLifecycleId = 584;
  int placeholderInvalidateAt = 585;
  bool disableJitDst = 567;
  CustomToolArtifactRef customToolArtifactRef = 588;
}

enum GitRepoRefProvider {
  UGIT = 0;
  GITHUB = 1;
  OTHER = 2;
}

message GitRepoRef {
  GitRepoRefProvider provider = 1;
  string gitRepo = 2;
  string gitRef = 3;
}

message SourceControlConfig {
  GitRepoRef origin = 1;
  GitRepoRef upstream = 2;
}

message CodeSnapshot {
  CodeSnapshotState state = 6;
  uint invalidatedAt = 7;
  Paint[] paints = 1;
  Vector offset = 2;
  Vector layoutSize = 3;
  Vector canvasSize = 5;
  uint devicePixelRatio = 4;
}

message CodeOutputLayer {
  NodeChange node = 1;
}

message CodeSnapshotLayers {
  CodeSnapshotState state = 1;
  uint invalidatedAt = 2;
  CodeOutputLayer[] layers = 3;
}

message CodeBehaviorData {
  string name = 1;
  string icon = 2;
  string[] nodeTypes = 3;
  string category = 4;
  uint apiVersion = 5;
}

message CodeExample {
  string exampleName = 1;
  string codeExportName = 2;
}

message UsedMakeLibrary {
  string makeLibraryId = 1;
}

message CookieBannerText {
  string bannerHeader = 1;
  string bannerDisclaimerExplicit = 2;
  string bannerDisclaimerImplicit = 3;
  string policyLabel = 4;
  string acceptText = 5;
  string acknowledgeText = 6;
  string manageText = 7;
  string rejectText = 8;
  string necessaryText = 9;
  string necessaryDescription = 10;
  string analyticsText = 11;
  string analyticsDescription = 12;
  string preferencesText = 13;
  string preferencesDescription = 14;
  string marketingText = 15;
  string marketingDescription = 16;
  string saveLabel = 17;
  string triggerLabel = 18;
}

message CookieBannerSettings {
  bool enabled = 1;
  CookieBannerComponentType componentType = 2;
  CookieXAlignment xAlignment = 3;
  CookieYAlignment yAlignment = 4;
  CookieXAlignment triggerXAlignment = 5;
  CookieYAlignment triggerYAlignment = 6;
  TriggerComponentType triggerComponentType = 7;
  string policyUrl = 8;
  CookieBannerText text = 9;
  GUID policyLink = 10;
  string locale = 11;
}

enum CookieBannerComponentType {
  BANNER = 0;
  MODAL = 1;
}

enum TriggerComponentType {
  BANNER = 0;
  TAG = 1;
}

enum CookieXAlignment {
  LEFT = 0;
  CENTER = 1;
  RIGHT = 2;
}

enum CookieYAlignment {
  TOP = 0;
  CENTER = 1;
  BOTTOM = 2;
}

message ResponsiveSetSettings {
  string title = 1;
  string description = 2;
  ResponsiveScalingMode scalingMode = 3;
  float scalingMinFontSize = 4;
  float scalingMaxFontSize = 5;
  float scalingMinLayoutWidth = 6;
  float scalingMaxLayoutWidth = 7;
  string lang = 8;
  string faviconHash = 9;
  string socialImageHash = 10;
  string googleAnalyticsID = 11;
  bool blockSearchIndexing = 12;
  string customCodeHeadStart = 13;
  string customCodeHeadEnd = 14;
  string customCodeBodyStart = 15;
  string customCodeBodyEnd = 16;
  GUID faviconID = 17;
  GUID socialImageID = 18;
  bool addBypassLinks = 19;
  bool ignoreReducedMotion = 20;
  CookieBannerSettings cookieBanner = 21;
}

enum ResponsiveScalingMode {
  REFLOW = 0;
  SCALE = 1;
}

message CMSSelector {
  string cmsCollectionId = 1;
  CMSFilterCritera filterCriteria = 2;
  CMSSelectorSort[] sorts = 3;
  uint limit = 4;
}

message CMSFilterCritera {
  CMSFilterCriteriaMatchType matchType = 1;
  CMSSelectorFilter[] filters = 2;
}

enum CMSFilterCriteriaMatchType {
  MATCH_ALL = 0;
  MATCH_ANY = 1;
}

message CMSSelectorFilter {
  string cmsFieldId = 1;
  CMSSelectorFilterOperator op = 2;
  string comparisonValue = 3;
}

enum CMSSelectorFilterOperator {
  EQUALS = 0;
}

message CMSSelectorSort {
  string cmsFieldId = 1;
  CMSFieldOrderBy orderBy = 2;
}

enum CMSFieldOrderBy {
  ASCENDING = 0;
  DESCENDING = 1;
}

message CMSConsumptionMap {
  CMSConsumptionMapEntry[] entries = 1;
}

message CMSConsumptionMapEntry {
  CMSConsumptionField consumptionField = 1;
  string cmsFieldId = 2;
}

enum CMSConsumptionField {
  MISSING = 0;
  TEXT_DATA = 1;
}

message CMSRichTextStyleMap {
  CMSRichTextStyleEntry[] entries = 1;
}

message CMSRichTextStyleEntry {
  CMSRichTextStyleClass styleClass = 1;
  CMSRichTextDescriptor textDescriptor = 2;
}

enum CMSRichTextStyleClass {
  HEADING1 = 0;
  HEADING2 = 1;
  HEADING3 = 2;
  HEADING4 = 3;
  HEADING5 = 4;
  HEADING6 = 5;
  PARAGRAPH = 6;
  LINK = 7;
  BLOCKQUOTE = 8;
}

message CMSRichTextDescriptor {
  StyleId textStyleId = 1;
  FontName[] fontNameVariants = 2;
}

message RepeaterCmsOverrideData {
  NodeChange[] overrides = 1;
}

message RepeaterOverrideData {
  NodeChange[] parentIndexOverrides = 1;
}

message RepeaterSymbolOverrideData {
  RepeaterPositionOverrides[] overridesByPosition = 1;
}

message RepeaterPositionOverrides {
  ParentIndex position = 1;
  NodeChange[] overrides = 2;
}

message InheritedVariablesData {
  InheritedVariableEntry[] variableIds = 1;
}

message InheritedVariableEntry {
  VariableID variableId = 1;
}

message HubFileAttribution {
  string hubFileId = 1;
  string hubFileName = 2;
}

message ManagedStringData {
  string key = 1;
  string context = 2;
  string locale = 3;
  ManagedStringNode content = 4;
  ManagedStringContentSchema contentSchema = 5;
}

enum ManagedStringContentSchema {
  V0 = 0;
}

enum ManagedStringNodeType {
  TEXT = 0;
  CONCATENATE = 1;
  PLURAL = 2;
  PLACEHOLDER = 3;
}

message ManagedStringNode {
  ManagedStringNodeType type = 1;
  ManagedStringTextNodeData textNodeData = 2;
  ManagedStringConcatenateAstNodeData concatenateNodeData = 3;
  ManagedStringPluralAstNodeData pluralNodeData = 4;
  ManagedStringPlaceholderAstNodeData placeholderNodeData = 5;
}

message ManagedStringTextNodeData {
  string value = 1;
}

message ManagedStringConcatenateAstNodeData {
  ManagedStringNode[] values = 1;
}

enum ManagedStringPluralType {
  ZERO = 0;
  ONE = 1;
  TWO = 2;
  FEW = 3;
  MANY = 4;
  OTHER = 5;
}

message ManagedStringPluralAstNodeData {
  string identifier = 1;
  ManagedStringPluralTypeMapEntry[] conditions = 2;
}

message ManagedStringPluralTypeMapEntry {
  ManagedStringPluralType key = 1;
  ManagedStringNode value = 2;
}

enum ManagedStringFormatType {
  TEXT = 0;
  DATE = 1;
  TIME = 2;
  NUMBER = 3;
}

message ManagedStringPlaceholderAstNodeData {
  string identifier = 1;
  ManagedStringFormatType formatType = 2;
  string formatPattern = 3;
}

message CooperRevertData {
  NodeChange originalValues = 1;
}

message VideoPlayback {
  bool autoplay = 1;
  bool mediaLoop = 2;
  bool muted = 3;
  bool showControls = 4;
  uint startTimeMs = 5;
  uint endTimeMs = 6;
}

enum MediaAction {
  PLAY = 0;
  PAUSE = 1;
  TOGGLE_PLAY_PAUSE = 2;
  MUTE = 3;
  UNMUTE = 4;
  TOGGLE_MUTE_UNMUTE = 5;
  SKIP_FORWARD = 6;
  SKIP_BACKWARD = 7;
  SKIP_TO = 8;
  SET_PLAYBACK_RATE = 9;
}

enum AnimationTimelineAction {
  PLAY = 0;
  PAUSE = 1;
  TOGGLE_PLAY_PAUSE = 2;
  SET_PLAYHEAD = 3;
}

message WidgetHoverStyle {
  Paint[] fillPaints = 1;
  Paint[] strokePaints = 2;
  float opacity = 3;
  bool areFillPaintsSet = 4;
  bool areStrokePaintsSet = 5;
  bool isOpacitySet = 6;
}

message WidgetDerivedSubtreeCursor {
  uint sessionID = 1;
  uint counter = 2;
}

message MultiplayerMap {
  MultiplayerMapEntry[] entries = 1;
}

message MultiplayerMapEntry {
  string key = 1;
  string value = 2;
}

message VariableDataMap {
  VariableDataMapEntry[] entries = 1;
}

message VariableDataMapEntry {
  uint nodeField = 1;
  VariableData variableData = 2;
  VariableField variableField = 3;
}

enum VariableField {
  MISSING = 0;
  CORNER_RADIUS = 1;
  PARAGRAPH_SPACING = 2;
  PARAGRAPH_INDENT = 3;
  STROKE_WEIGHT = 4;
  STACK_SPACING = 5;
  STACK_PADDING_LEFT = 6;
  STACK_PADDING_TOP = 7;
  STACK_PADDING_RIGHT = 8;
  STACK_PADDING_BOTTOM = 9;
  VISIBLE = 10;
  TEXT_DATA = 11;
  WIDTH = 12;
  HEIGHT = 13;
  RECTANGLE_TOP_LEFT_CORNER_RADIUS = 14;
  RECTANGLE_TOP_RIGHT_CORNER_RADIUS = 15;
  RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS = 16;
  RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS = 17;
  BORDER_TOP_WEIGHT = 18;
  BORDER_BOTTOM_WEIGHT = 19;
  BORDER_LEFT_WEIGHT = 20;
  BORDER_RIGHT_WEIGHT = 21;
  VARIANT_PROPERTIES = 22;
  STACK_COUNTER_SPACING = 23;
  MIN_WIDTH = 24;
  MAX_WIDTH = 25;
  MIN_HEIGHT = 26;
  MAX_HEIGHT = 27;
  FONT_FAMILY = 28;
  FONT_STYLE = 29;
  FONT_VARIATIONS = 30;
  OPACITY = 31;
  FONT_SIZE = 32;
  LETTER_SPACING = 34;
  LINE_HEIGHT = 36;
  OVERRIDDEN_SYMBOL_ID = 37;
  HYPERLINK = 38;
  CMS_SERIALIZED_RICH_TEXT_DATA = 39;
  SLOT_CONTENT_ID = 40;
  GRID_ROW_GAP = 41;
  GRID_COLUMN_GAP = 42;
  X_POSITION = 43;
  Y_POSITION = 44;
  ROTATION = 45;
  MOTION_TRANSLATION_X = 46;
  MOTION_TRANSLATION_Y = 47;
  MOTION_ROTATION = 48;
  MOTION_SCALE_X = 49;
  MOTION_SCALE_Y = 50;
  MOTION_SHEAR = 51;
  SCROLL_OFFSET_X = 52;
  SCROLL_OFFSET_Y = 53;
  PATH_TRIM_START = 54;
  PATH_TRIM_END = 55;
  DISSOLVE_PROGRESS = 56;
  EASING_DATA = 57;
  MEDIA_CURRENT_TIME = 58;
  TRANSFORM_3D_PERSPECTIVE = 59;
  TRANSFORM_3D_TRANSLATION_Z = 60;
  TRANSFORM_3D_ROTATION_X = 61;
  TRANSFORM_3D_ROTATION_Y = 62;
  TRANSFORM_3D_ROTATION_Z = 63;
  POLYGON_COUNT = 64;
  ARC_DATA_STARTING_ANGLE = 65;
  ARC_DATA_ENDING_ANGLE = 66;
  ARC_DATA_INNER_RADIUS = 67;
}

message VariableModeBySetMap {
  VariableModeBySetMapEntry[] entries = 1;
}

message VariableModeBySetMapEntry {
  VariableSetID variableSetID = 1;
  GUID variableModeID = 2;
  VariableSetID variableSetExtensionID = 3;
}

message CodeSyntaxMap {
  CodeSyntaxMapEntry[] entries = 1;
}

message CodeSyntaxMapEntry {
  CodeSyntaxPlatform platform = 1;
  string value = 2;
}

message TableMergedCellMap {
  TableMergedCellMapEntry[] entries = 1;
}

message TableMergedCellMapEntry {
  GUID rowId = 1;
  GUID colId = 2;
  int rowSpan = 3;
  int colSpan = 4;
}

message TableRowColumnPositionMap {
  TableRowColumnPositionMapEntry[] entries = 1;
}

message TableRowColumnPositionMapEntry {
  GUID id = 1;
  string position = 2;
}

message GUIDPositionMap {
  GUIDPositionMapEntry[] entries = 1;
}

message GUIDPositionMapEntry {
  GUID id = 1;
  string position = 2;
}

message GUIDGridTrackSizeMap {
  GUIDGridTrackSizeMapEntry[] entries = 1;
}

message GUIDGridTrackSizeMapEntry {
  GUID id = 1;
  GridTrackSize trackSize = 2;
}

message ObjectAnimationList {
  ObjectAnimationListItem[] entries = 1;
}

message ObjectAnimationListItem {
  GUID targetNodeId = 1;
  PrototypeAction animation = 2;
}

message GridTrackSize {
  GridTrackSizingFunction minSizing = 1;
  GridTrackSizingFunction maxSizing = 2;
}

message GridTrackSizingFunction {
  GridTrackSizingType type = 1;
  float value = 2;
}

enum GridTrackSizingType {
  FLEX = 0;
  FIXED = 1;
  HUG = 2;
}

message TableRowColumnSizeMap {
  TableRowColumnSizeMapEntry[] entries = 1;
}

message TableRowColumnSizeMapEntry {
  GUID id = 1;
  float size = 2;
}

message AgendaPositionMap {
  AgendaPositionMapEntry[] entries = 1;
}

message AgendaPositionMapEntry {
  GUID id = 1;
  string position = 2;
}

enum AgendaItemType {
  NODE = 0;
  BLOCK = 1;
}

message AgendaMetadataMap {
  AgendaMetadataMapEntry[] entries = 1;
}

message AgendaMetadataMapEntry {
  GUID id = 1;
  AgendaMetadata data = 2;
}

message AgendaMetadata {
  string name = 1;
  AgendaItemType type = 2;
  GUID targetNodeID = 3;
  AgendaTimerInfo timerInfo = 4;
  AgendaVoteInfo voteInfo = 5;
  AgendaMusicInfo musicInfo = 6;
}

message AgendaTimerInfo {
  uint timerLength = 1;
}

message AgendaVoteInfo {
  uint voteCount = 1;
}

message AgendaMusicInfo {
  string songID = 1;
  uint startTimeMs = 2;
}

enum DiagramLayoutRuleType {
  NONE = 0;
  TREE = 1;
}

struct DiagramParentIndex {
  GUID guid;
  string position;
}

enum DiagramLayoutPaused {
  NO = 0;
  YES = 1;
}

message ComponentPropRef {
  uint nodeField = 1;
  GUID defID = 2;
  string zombieFallbackName = 3;
  ComponentPropNodeField componentPropNodeField = 4;
  bool isDeleted = 5;
}

enum ComponentPropNodeField {
  VISIBLE = 0;
  TEXT_DATA = 1;
  OVERRIDDEN_SYMBOL_ID = 2;
  INHERIT_FILL_STYLE_ID = 3;
  SLOT_CONTENT_ID = 4;
}

message ComponentPropAssignment {
  GUID defID = 1;
  ComponentPropValue value = 2;
  VariableData varValue = 3;
  DerivedTextData legacyDerivedTextData = 4;
}

message ComponentPropDef {
  GUID id = 1;
  string name = 2;
  ComponentPropValue initialValue = 3;
  string sortPosition = 4;
  GUID parentPropDefId = 5;
  ComponentPropType type = 6;
  bool isDeleted = 7;
  ComponentPropPreferredValues preferredValues = 8;
  VariableData varValue = 9;
  ParameterConfig parameterConfig = 10;
  string description = 11;
  SlotPropConfig slotPropConfig = 12;
  ColorArrayConfig colorArrayConfig = 13;
}

message ComponentPropValue {
  bool boolValue = 1;
  TextData textValue = 2;
  GUID guidValue = 3;
  float floatValue = 4;
  EasingData easingData = 5;
  Vector vectorValue = 6;
  Line lineValue = 7;
  Circle circleValue = 8;
  Rotation3D rotation3DValue = 9;
  CirclePoint circlePointValue = 10;
  Gradient gradientValue = 11;
  ColorPoint colorPointValue = 12;
}

message TimelineData {
  uint64 durationUs = 1;
  bool defaultTimeline = 2;
  GUID parentTimelineDefId = 3;
  PlaybackStyle playbackStyle = 4;
}

message TimelineDefinitionsMap {
  TimelineDefinitionsMapEntry[] entries = 1;
}

message TimelineDefinitionsMapEntry {
  GUID id = 1;
  TimelineData data = 2;
}

message TimelineAssignmentKey {
  GUID assignedTimelineId = 1;
  GUID containingTimelineId = 2;
}

message TimelineBindingData {
  int64 offsetUs = 1;
  bool disabled = 2;
}

message TimelineAssignmentsMap {
  TimelineAssignmentsMapEntry[] entries = 1;
}

message TimelineAssignmentsMapEntry {
  TimelineAssignmentKey key = 1;
  TimelineBindingData value = 2;
}

enum ComponentPropType {
  BOOL = 0;
  TEXT = 1;
  COLOR = 2;
  INSTANCE_SWAP = 3;
  VARIANT = 4;
  NUMBER = 5;
  IMAGE = 6;
  SLOT = 7;
  EASING = 8;
  COLOR_ARRAY = 9;
  VECTOR = 10;
  LINE = 11;
  CIRCLE = 12;
  ROTATION_3D = 13;
  CIRCLE_POINT = 14;
  GRADIENT = 15;
  COLOR_POINT = 16;
}

message ComponentPropPreferredValues {
  string[] stringValues = 1;
  InstanceSwapPreferredValue[] instanceSwapValues = 2;
}

message ParameterConfig {
  NumberPropConfig numberPropConfig = 1;
  ParameterConfigControl control = 2;
  SliderConfig sliderConfig = 3;
  VariableData label = 4;
  InputConfig inputConfig = 5;
  SelectConfig selectConfig = 6;
  PointConfig pointConfig = 7;
  LineConfig lineConfig = 8;
  PointRadiusConfig pointRadiusConfig = 9;
  Rotation3DConfig rotation3DConfig = 10;
  CirclePointConfig circlePointConfig = 11;
  ColorPointConfig colorPointConfig = 12;
  bool showDividerAbove = 13;
}

enum ParameterConfigControl {
  DEFAULT = 0;
  SLIDER = 1;
  INPUT = 2;
  SELECT = 3;
}

message InputConfig {
  VariableData unit = 1;
  VariableData min = 2;
  VariableData max = 3;
}

message SliderConfig {
  VariableData min = 1;
  VariableData max = 2;
  VariableData step = 3;
  VariableData unit = 4;
}

enum PointMode {
  CANVAS_AND_UI = 0;
  CANVAS = 1;
  UI = 2;
}

message PointConfig {
  PointMode mode = 1;
  NumberUnits unit = 2;
}

message Line {
  Vector a = 1;
  Vector b = 2;
}

message LineConfig {
  PointMode mode = 1;
  NumberUnits unit = 2;
}

message Circle {
  Vector center = 1;
  float radius = 2;
}

message PointRadiusConfig {
  PointMode mode = 1;
  NumberUnits positionUnit = 2;
  NumberUnits radiusUnit = 3;
  float minRadius = 4;
  float maxRadius = 5;
}

message Rotation3D {
  float x = 1;
  float y = 2;
  float z = 3;
  float translateZ = 4;
}

message Rotation3DConfig {
  PointMode mode = 1;
}

message CirclePoint {
  Vector center = 1;
  float radius = 2;
  float angle = 3;
}

message CirclePointConfig {
  PointMode mode = 1;
  NumberUnits positionUnit = 2;
  NumberUnits radiusUnit = 3;
  float minRadius = 4;
  float maxRadius = 5;
}

message ColorPoint {
  Vector point = 1;
  VariableData color = 2;
}

message ColorPointConfig {
  PointMode mode = 1;
  NumberUnits unit = 2;
}

message Gradient {
  GradientStop[] stops = 1;
}

message GradientStop {
  float position = 1;
  VariableData color = 2;
}

message SelectOption {
  VariableData value = 1;
  string label = 2;
}

message SelectConfig {
  SelectOption[] options = 1;
}

message ColorArrayConfig {
  uint minLength = 1;
  uint maxLength = 2;
}

message SlotPropConfig {
  bool stretchChildOnInsert = 1;
  bool displayByDefault = 2;
  uint minChildren = 3;
  uint maxChildren = 4;
  bool allowPreferredValuesOnly = 5;
}

message NumberPropConfig {
  ParameterConfigControl control = 1;
  VariableData min = 2;
  VariableData max = 3;
  VariableData step = 4;
}

message InstanceSwapPreferredValue {
  InstanceSwapPreferredValueType type = 1;
  string key = 2;
}

enum InstanceSwapPreferredValueType {
  COMPONENT = 0;
  STATE_GROUP = 1;
}

enum WidgetEvent {
  MOUSE_DOWN = 0;
  CLICK = 1;
  TEXT_EDIT_END = 2;
  ATTACHED_STICKABLES_CHANGED = 3;
  STUCK_STATUS_CHANGED = 4;
}

enum WidgetInputBehavior {
  WRAP = 0;
  TRUNCATE = 1;
  MULTILINE = 2;
}

message WidgetMetadata {
  string pluginID = 1;
  string pluginVersionID = 2;
  string widgetName = 3;
  bool isResizable = 4;
  bool isRotatable = 5;
}

enum WidgetPropertyMenuItemType {
  ACTION = 0;
  SEPARATOR = 1;
  COLOR = 2;
  DROPDOWN = 3;
  COLOR_SELECTOR = 4;
  TOGGLE = 5;
  LINK = 6;
}

message WidgetPropertyMenuSelectorOption {
  string option = 1;
  string tooltip = 2;
}

enum WidgetInputTextNodeType {
  WIDGET_CONTROLLED = 0;
  RICH_TEXT = 1;
}

message WidgetPropertyMenuItem {
  string propertyName = 1;
  string tooltip = 2;
  WidgetPropertyMenuItemType itemType = 3;
  string icon = 4;
  WidgetPropertyMenuSelectorOption[] options = 5;
  string selectedOption = 6;
  bool isToggled = 7;
  string href = 8;
  bool allowCustomColor = 9;
}

enum CodeBlockLanguage {
  TYPESCRIPT = 0;
  CPP = 1;
  RUBY = 2;
  CSS = 3;
  JAVASCRIPT = 4;
  HTML = 5;
  JSON = 6;
  GRAPHQL = 7;
  PYTHON = 8;
  GO = 9;
  SQL = 10;
  SWIFT = 11;
  KOTLIN = 12;
  RUST = 13;
  BASH = 14;
  PLAINTEXT = 15;
  MARKDOWN = 16;
}

enum CodeBlockTheme {
  FIGJAM_DARK = 0;
  DRACULA = 1;
  DUOTONE_SEA = 2;
  DUOTONE_SPACE = 3;
  DUOTONE_EARTH = 4;
  DUOTONE_FOREST = 5;
  DUOTONE_LIGHT = 6;
}

enum SpecBlockType {
  DEFAULT = 0;
  PARAGRAPH = 1;
  HEADING_1 = 2;
  HEADING_2 = 3;
  HEADING_3 = 4;
  HEADING_4 = 5;
  HEADING_5 = 6;
  HEADING_6 = 7;
  CODE_BLOCK = 8;
  BLOCK_QUOTE = 9;
  HORIZONTAL_RULE = 10;
  ORDERED_LIST_ITEM = 11;
  UNORDERED_LIST_ITEM = 12;
  DOCUMENT = 13;
  TABLE = 14;
  TABLE_ROW = 15;
  TABLE_CELL = 16;
  TODO_LIST_ITEM_UNCHECKED = 17;
  TODO_LIST_ITEM_CHECKED = 18;
  IMAGE = 19;
  EMBED = 20;
}

enum InternalEnumForTest {
  OLD = 1;
}

message InternalDataForTest {
  int testFieldA = 1;
}

message StateGroupPropertyValueOrder {
  string property = 1;
  string[] values = 2;
}

enum BackfillError {
  NONE = 0;
  TRANSIENT_RETRYING = 1;
  PERMANENTLY_FAILED = 2;
  PASTE_FAILED = 3;
}

message PartialPasteAnnotation {
  bool isPartial = 1;
  uint64 annotatedAt = 2;
  BackfillError errorState = 3;
}

message VariantPropSpec {
  GUID propDefId = 1;
  string value = 2;
}

message TextListData {
  int listID = 1;
  BulletType bulletType = 2;
  int indentationLevel = 3;
  int lineNumber = 4;
}

enum BulletType {
  ORDERED = 0;
  UNORDERED = 1;
  INDENT = 2;
  NO_LIST = 3;
}

message TextLineData {
  LineType lineType = 1;
  int styleId = 10;
  int indentationLevel = 2;
  SourceDirectionality sourceDirectionality = 9;
  Directionality directionality = 3;
  DirectionalityIntent directionalityIntent = 4;
  int downgradeStyleId = 5;
  int consistencyStyleId = 6;
  int listStartOffset = 7;
  bool isFirstLineOfList = 8;
}

message DerivedTextLineData {
  Directionality directionality = 1;
}

enum LineType {
  PLAIN = 0;
  ORDERED_LIST = 1;
  UNORDERED_LIST = 2;
  BLOCKQUOTE = 3;
  HEADER = 4;
}

enum SourceDirectionality {
  AUTO = 0;
  LTR = 1;
  RTL = 2;
}

enum Directionality {
  LTR = 0;
  RTL = 1;
}

enum DirectionalityIntent {
  IMPLICIT = 0;
  EXPLICIT = 1;
}

message PrototypeInteraction {
  GUID id = 1;
  PrototypeEvent event = 2;
  PrototypeAction[] actions = 3;
  bool isDeleted = 4;
  int stateManagementVersion = 5;
}

message PrototypeEvent {
  InteractionType interactionType = 1;
  bool interactionMaintained = 2;
  float interactionDuration = 3;
  KeyTrigger keyTrigger = 4;
  string voiceEventPhrase = 5;
  float transitionTimeout = 6;
  float mediaHitTime = 7;
}

message PrototypeVariableTarget {
  VariableID id = 1;
  NodeFieldAlias nodeFieldAlias = 2;
}

message ConditionalActions {
  PrototypeAction[] actions = 1;
  VariableData condition = 2;
}

message PrototypeAction {
  GUID transitionNodeID = 1;
  TransitionType transitionType = 2;
  float transitionDuration = 3;
  EasingType easingType = 4;
  float transitionTimeout = 5;
  bool transitionShouldSmartAnimate = 6;
  ConnectionType connectionType = 7;
  Vector overlayRelativePosition = 9;
  NavigationType navigationType = 10;
  bool transitionPreserveScroll = 11;
  float[] easingFunction = 12;
  Vector extraScrollOffset = 13;
  bool transitionResetScrollPosition = 25;
  bool transitionResetInteractiveComponents = 26;
  bool transitionOverridesEnabled = 42;
  string connectionURL = 8;
  bool openUrlInNewTab = 18;
  VariableData linkParam = 34;
  CMSItemPageTarget cmsTarget = 35;
  GUID targetVariableID = 14;
  VariableAnyValue targetVariableValue = 15;
  PrototypeVariableTarget targetVariable = 19;
  VariableData targetVariableData = 20;
  MediaAction mediaAction = 16;
  bool transitionResetVideoPosition = 17;
  float mediaSkipToTime = 21;
  float mediaSkipByAmount = 22;
  float mediaPlaybackRate = 36;
  VariableData[] conditions = 23;
  ConditionalActions[] conditionalActions = 24;
  VariableSetID targetVariableSetID = 27;
  GUID targetVariableModeID = 28;
  string targetVariableSetKey = 29;
  VariableSetID variableSetTargetExtensionId = 38;
  AnimationType animationType = 30;
  GUID animationTargetId = 31;
  AnimationPhase animationPhase = 32;
  AnimationState animationState = 33;
  bool simpleLink = 37;
  AnimationTimelineAction animationTimelineAction = 39;
  GUID animationTimelineDefId = 41;
  float animationSkipToTime = 40;
}

enum AnimationPhase {
  IN = 0;
  OUT = 1;
}

enum AnimationType {
  NONE = 0;
  FADE = 1;
  SLIDE_FROM_LEFT = 2;
  SLIDE_FROM_RIGHT = 3;
  SLIDE_FROM_TOP = 4;
  SLIDE_FROM_BOTTOM = 5;
}

message AnimationState {
  float opacity = 1;
  Matrix transform = 2;
}

message PrototypeStartingPoint {
  string name = 1;
  string description = 2;
  string position = 3;
}

enum TriggerDevice {
  KEYBOARD = 0;
  UNKNOWN_CONTROLLER = 1;
  XBOX_ONE = 2;
  PS4 = 3;
  SWITCH_PRO = 4;
}

message KeyTrigger {
  int[] keyCodes = 1;
  TriggerDevice triggerDevice = 2;
}

message Hyperlink {
  string url = 1;
  GUID guid = 2;
  CMSItemPageTarget cmsTarget = 4;
  bool openInNewTab = 3;
}

message CMSItemPageTarget {
  GUID nodeId = 1;
  string cmsItemId = 2;
  string fieldSchemaId = 3;
}

enum MentionSource {
  DEFAULT = 0;
  COPY_DUPLICATE = 1;
  SILENT_INSERT = 2;
}

message Mention {
  GUID id = 1;
  string mentionedUserId = 2;
  string mentionedByUserId = 3;
  string fileKey = 4;
  MentionSource source = 5;
  uint64 mentionedUserIdInt = 6;
  uint64 mentionedByUserIdInt = 7;
  string mentionedUserGroupId = 8;
}

message EmbedData {
  string url = 1;
  string srcUrl = 2;
  string title = 3;
  string thumbnailUrl = 4;
  float width = 5;
  float height = 6;
  string embedType = 7;
  string thumbnailImageHash = 8;
  string faviconImageHash = 9;
  string provider = 10;
  string originalText = 11;
  string description = 12;
  string embedVersionId = 13;
  bool isPublishedSite = 14;
}

message StampData {
  string userId = 1;
  string votingSessionId = 2;
  string stampedByUserId = 3;
}

message LinkPreviewData {
  string url = 1;
  string title = 2;
  string provider = 3;
  string description = 4;
  string thumbnailImageHash = 5;
  string faviconImageHash = 6;
  float thumbnailImageWidth = 7;
  float thumbnailImageHeight = 8;
}

message Viewport {
  Rect canvasSpaceBounds = 1;
  bool pixelPreview = 2;
  float pixelDensity = 3;
  GUID canvasGuid = 4;
}

message Mouse {
  MouseCursor cursor = 1;
  Vector canvasSpaceLocation = 2;
  Rect canvasSpaceSelectionBox = 3;
  GUID canvasGuid = 4;
  uint cursorHiddenReason = 5;
}

struct Click {
  uint id;
  Vector point;
}

struct ScrollPosition {
  GUID node;
  Vector scrollOffset;
}

struct TriggeredOverlay {
  GUID overlayGuid;
  GUID hotspotGuid;
  GUID swapGuid;
}

message TriggeredOverlayData {
  GUID overlayGuid = 1;
  GUID hotspotGuid = 2;
  GUID swapGuid = 3;
  GUID prototypeInteractionGuid = 4;
  GUIDPath hotspotBlueprintId = 5;
}

message TriggeredSetVariableActionData {
  GUID nodeForFindingTopmostScreenId = 1;
  string targetVariableId = 2;
  string targetVariableData = 3;
  string resolvedVariableModes = 4;
}

message TriggeredSetVariableModeActionData {
  GUID nodeForFindingTopmostScreenId = 1;
  string targetVariableSetKey = 2;
  string targetVariableModeId = 3;
  VariableSetID targetVariableSetId = 4;
}

message VideoStateChangeData {
  GUID targetNodeId = 1;
  bool isPlaying = 2;
  bool isPlayingSound = 3;
  uint[] currentTimes = 4;
  uint actionTakenTimestamp = 5;
}

message EmbeddedPrototypeData {
  GUID nodeId = 1;
  uint sessionId = 2;
}

message PresentedState {
  GUID baseScreenID = 1;
  TriggeredOverlayData[] overlays = 2;
}

enum TransitionDirection {
  FORWARD = 0;
  REVERSE = 1;
}

message TopLevelPlaybackChange {
  PresentedState oldState = 1;
  PresentedState newState = 2;
  GUIDPath hotspotBlueprintID = 3;
  GUID interactionID = 4;
  bool isHotspotInNewPresentedState = 5;
  TransitionDirection direction = 6;
  GUIDPath instanceStablePath = 7;
}

message InstanceStateChange {
  GUID stateID = 1;
  GUID interactionID = 2;
  GUIDPath hotspotStablePath = 3;
  GUIDPath instanceStablePath = 4;
  PlaybackChangePhase phase = 5;
}

message TextCursor {
  Rect selectionBox = 1;
  GUID canvasGuid = 2;
  GUID textNodeGuid = 3;
}

message TextSelection {
  Rect[] selectionBoxes = 1;
  GUID canvasGuid = 2;
  GUID textNodeGuid = 3;
  Vector textSelectionRange = 4;
  GUID textNodeOrContainingIfGuid = 5;
  GUID tableCellRowId = 6;
  GUID tableCellColId = 7;
}

enum PlaybackChangePhase {
  INITIATED = 0;
  ABORTED = 1;
  COMMITTED = 2;
}

message PlaybackChangeKeyframe {
  PlaybackChangePhase phase = 1;
  float progress = 2;
  float timestamp = 3;
}

message StateMapping {
  GUIDPath stablePath = 1;
  TopLevelPlaybackChange lastTopLevelChange = 2;
  PlaybackChangeKeyframe lastTopLevelChangeStatus = 3;
  float timestamp = 4;
}

message ScrollMapping {
  GUIDPath blueprintID = 1;
  uint overlayIndex = 2;
  Vector scrollOffset = 3;
}

message PlaybackUpdate {
  TopLevelPlaybackChange lastTopLevelChange = 1;
  PlaybackChangeKeyframe lastTopLevelChangeStatus = 2;
  ScrollMapping[] scrollMappings = 3;
  float timestamp = 4;
  Vector pointerLocation = 5;
  bool isTopLevelFrameChange = 6;
  StateMapping[] stateMappings = 7;
}

message ChatMessage {
  string text = 1;
  string previousText = 2;
}

message VoiceMetadata {
  string connectedCallId = 1;
}

message AprilFunCursor {
  string id = 1;
  bool trailEnabled = 2;
}

message AprilFunFigPal {
  string customization = 1;
  string name = 2;
}

enum Heartbeat {
  FOREGROUND = 0;
  BACKGROUND = 1;
}

enum SitesViewState {
  FILE = 0;
  CODE = 1;
  DAKOTA = 2;
  SETTINGS = 3;
  INSERT = 4;
  VARIABLES = 5;
}

enum DesignFullPageViewState {
  NONE = 0;
  DESIGN_SYSTEM = 1;
  VARIABLES = 2;
}

message AgentInfo {
  string name = 1;
  string logo = 2;
  string oauthClientId = 3;
}

message UserChange {
  uint sessionID = 1;
  string stableSessionID = 44;
  bool connected = 2;
  string name = 3;
  Color color = 4;
  string imageURL = 5;
  Viewport viewport = 6;
  Mouse mouse = 7;
  GUID[] selection = 8;
  uint[] observing = 9;
  string deviceName = 10;
  Click[] recentClicks = 11;
  ScrollPosition[] scrollPositions = 12;
  TriggeredOverlay[] triggeredOverlays = 13;
  string userID = 14;
  GUID lastTriggeredHotspot = 15;
  GUID lastTriggeredPrototypeInteractionID = 16;
  uint lastTriggeredObjectAnimationIndex = 38;
  TriggeredOverlayData[] triggeredOverlaysData = 17;
  PlaybackUpdate[] playbackUpdates = 18;
  ChatMessage chatMessage = 19;
  VoiceMetadata voiceMetadata = 20;
  bool canWrite = 21;
  bool highFiveStatus = 22;
  InstanceStateChange[] instanceStateChanges = 23;
  TextCursor textCursor = 24;
  TextSelection textSelection = 25;
  uint connectedAtTimeS = 26;
  bool focusOnTextCursor = 27;
  Heartbeat heartbeat = 28;
  TriggeredSetVariableActionData[] triggeredSetVariableActionData = 29;
  VideoStateChangeData[] videoStateChangeData = 30;
  string clientID = 31;
  GUID focusedSlideId = 32;
  TriggeredSetVariableModeActionData[] triggeredSetVariableModeActionData = 33;
  AprilFunCursor aprilFunCursor = 34;
  EmbeddedPrototypeData[] embeddedPrototypeData = 35;
  GUID activeSlidesEmbeddablePrototype = 36;
  GUID[] activeEmbeddedPrototypes = 43;
  GUID activeCodeComponentId = 37;
  AprilFunFigPal aprilFunFigPal = 39;
  CollaborativeTextSelection collaborativeTextSelection = 40;
  SitesViewState sitesViewState = 41;
  NodeChatExchange[] nodeChatExchanges = 42;
  DesignFullPageViewState designFullPageViewState = 45;
  AgentInfo agentInfo = 46;
}

message InteractiveSlideElementChange {
  string userID = 1;
  string anonymousUserID = 2;
  GUID nodeID = 3;
  string responseData = 4;
}

message NodeStatusChange {
  GUID[] nodeIds = 1;
  SectionStatusInfo statusInfo = 2;
}

message BuzzApprovalAssetEntry {
  GUID assetNodeId = 1;
  bool approved = 2;
}

message BuzzApprovalChange {
  BuzzApprovalAssetEntry[] assetEntries = 1;
  GUID canvasGridNodeId = 2;
  string requestId = 3;
}

enum SceneGraphQueryBehavior {
  DEFAULT = 0;
  CONTAINING_PAGE = 1;
  PLUGIN = 2;
}

enum SceneGraphQueryMode {
  ADD = 0;
  SET = 1;
}

message SceneGraphQuery {
  GUID startingNode = 1;
  uint depth = 2;
  SceneGraphQueryBehavior behavior = 3;
}

message NodeChangesMetadata {
  uint blobsFieldOffset = 1;
}

message CursorReaction {
  string imageUrl = 1;
}

message TimerInfo {
  bool isPaused = 1;
  uint timeRemainingMs = 2;
  uint totalTimeMs = 3;
  uint timerID = 4;
  string setBy = 5;
  uint songID = 6;
  uint lastReceivedSongTimestampMs = 7;
  string songUUID = 8;
}

message MusicInfo {
  bool isPaused = 1;
  uint messageID = 2;
  string songID = 3;
  uint lastReceivedSongTimestampMs = 4;
  bool isStopped = 5;
}

message PresenterNomination {
  uint sessionID = 1;
  bool isCancelled = 2;
}

message PresenterInfo {
  uint sessionID = 1;
  PresenterNomination nomination = 2;
  bool isReconnected = 3;
}

message ClientBroadcast {
  uint sessionID = 1;
  CursorReaction cursorReaction = 2;
  TimerInfo timer = 3;
  PresenterInfo presenter = 4;
  PresenterInfo prototypePresenter = 5;
  MusicInfo music = 6;
}

enum PasteAssetType {
  UNKNOWN = 0;
  VARIABLE = 1;
}

message Message {
  MessageType type = 1;
  uint sessionID = 2;
  string stableSessionID = 42;
  uint ackID = 3;
  bool isRetransmission = 37;
  NodeChange[] nodeChanges = 4;
  UserChange[] userChanges = 5;
  InteractiveSlideElementChange interactiveSlideElementChange = 32;
  NodeStatusChange nodeStatusChange = 36;
  BuzzApprovalChange buzzApprovalChange = 44;
  Blob[] blobs = 6;
  uint blobBaseIndex = 30;
  string signalName = 7;
  Access access = 8;
  string styleSetName = 9;
  StyleSetType styleSetType = 10;
  StyleSetContentType styleSetContentType = 11;
  int pasteID = 12;
  Vector pasteOffset = 13;
  string pasteFileKey = 14;
  string signalPayload = 15;
  SceneGraphQuery[] sceneGraphQueries = 16;
  NodeChangesMetadata nodeChangesMetadata = 17;
  uint fileVersion = 18;
  bool pasteIsPartiallyOutsideEnclosingFrame = 19;
  GUID pastePageId = 20;
  bool isCut = 21;
  Message[] localUndoStack = 22;
  Message[] localRedoStack = 23;
  ClientBroadcast[] broadcasts = 24;
  uint reconnectSequenceNumber = 25;
  string pasteBranchSourceFileKey = 26;
  EditorType pasteEditorType = 27;
  string postSyncActions = 28;
  GUID[] publishedAssetGuids = 29;
  bool dirtyFromInitialLoad = 31;
  ClipboardSelectionRegion[] clipboardSelectionRegions = 33;
  EncodedOffsetsIndex encodedOffsetsIndex = 34;
  bool hasRepeatingContent = 35;
  uint64 sentTimestamp = 38;
  AnnotationCategory[] annotationCategories = 39;
  ClientRenderedMetadata clientRenderedMetadata = 40;
  PasteAssetType pasteAssetType = 41;
  ObjectAnimationList objectAnimations = 43;
  SceneGraphQueryMode sceneGraphQueryMode = 45;
}

message EncodedOffsetsIndex {
  uint nodeChangesFieldOffset = 1;
  uint nodeChangesFieldLength = 2;
  uint blobsFieldOffset = 3;
  GUIDAndEncodedOffset[] nodeChangeOffsets = 4;
}

struct GUIDAndEncodedOffset {
  GUID guid;
  uint offset;
}

message DiffChunk {
  uint[] nodeChanges = 1;
  NodePhase phase = 2;
  NodeChange displayNode = 3;
  GUID canvasId = 4;
  string canvasName = 5;
  bool canvasIsInternal = 6;
  uint[] chunksAffectingThisChunk = 7;
  NodeChange[] basisParentHierarchy = 8;
  NodeChange[] parentHierarchy = 9;
  GUID[] basisParentHierarchyGuids = 10;
  GUID[] parentHierarchyGuids = 11;
}

enum DiffType {
  BRANCHING = 0;
  NODE_CHANGES_ONLY = 1;
}

message DiffPayload {
  NodeChange[] nodeChanges = 1;
  Blob[] blobs = 2;
  DiffChunk[] diffChunks = 3;
  NodeChange[] diffBasis = 4;
  NodeChange[] basisParentNodeChanges = 5;
  NodeChange[] parentNodeChanges = 6;
  DiffType diffType = 7;
}

enum RichMediaType {
  ANIMATED_IMAGE = 0;
  VIDEO = 1;
}

message RichMediaData {
  string mediaHash = 1;
  RichMediaType richMediaType = 2;
}

enum VariableDataType {
  BOOLEAN = 0;
  FLOAT = 1;
  STRING = 2;
  ALIAS = 3;
  COLOR = 4;
  EXPRESSION = 5;
  MAP = 6;
  SYMBOL_ID = 7;
  FONT_STYLE = 8;
  TEXT_DATA = 9;
  INVALID = 10;
  NODE_FIELD_ALIAS = 11;
  CMS_ALIAS = 12;
  PROP_REF = 13;
  IMAGE = 14;
  MANAGED_STRING_ALIAS = 15;
  LINK = 16;
  JS_RUNTIME_ALIAS = 17;
  SLOT_CONTENT_ID = 18;
  DATE = 19;
  KEYFRAME_TRACK_ID = 20;
  KEYFRAME_TRACK_PARAMETER_DATA = 21;
  EASING = 22;
  TIMING = 23;
  VECTOR = 24;
  COLOR_ARRAY = 25;
  LINE = 26;
  CIRCLE = 27;
  ROTATION_3D = 28;
  CIRCLE_POINT = 29;
  GRADIENT = 30;
  COLOR_POINT = 31;
}

enum VariableResolvedDataType {
  BOOLEAN = 0;
  FLOAT = 1;
  STRING = 2;
  COLOR = 4;
  MAP = 5;
  SYMBOL_ID = 6;
  FONT_STYLE = 7;
  TEXT_DATA = 8;
  IMAGE = 9;
  LINK = 10;
  JS_RUNTIME_ALIAS = 11;
  SLOT_CONTENT_ID = 12;
  KEYFRAME_TRACK_ID = 13;
  KEYFRAME_TRACK_PARAMETER_DATA = 14;
  EASING = 15;
  TIMING = 16;
  VECTOR = 17;
  COLOR_ARRAY = 18;
  LINE = 19;
  CIRCLE = 20;
  ROTATION_3D = 21;
  CIRCLE_POINT = 22;
  GRADIENT = 23;
  COLOR_POINT = 24;
}

message VariableAnyValue {
  bool boolValue = 1;
  string textValue = 2;
  float floatValue = 3;
  VariableID alias = 4;
  Color colorValue = 5;
  Expression expressionValue = 6;
  VariableMap mapValue = 7;
  SymbolId symbolIdValue = 8;
  VariableFontStyle fontStyleValue = 9;
  TextData textDataValue = 10;
  NodeFieldAlias nodeFieldAliasValue = 11;
  CMSAlias cmsAliasValue = 12;
  PropRefValue propRefValue = 13;
  ImageParameterValue imageValue = 14;
  ManagedStringAlias managedStringAliasValue = 15;
  Hyperlink linkValue = 16;
  JsRuntimeAlias jsRuntimeAliasValue = 17;
  SlotContentId slotContentIdValue = 18;
  KeyframeTrackId keyframeTrackIdValue = 19;
  KeyframeTrackParameterValue keyframeTrackParameterValue = 20;
  EasingData easingValue = 21;
  Vector vectorValue = 22;
  ColorArray colorArrayValue = 23;
  Line lineValue = 24;
  Circle circleValue = 25;
  Rotation3D rotation3DValue = 26;
  CirclePoint circlePointValue = 27;
  Gradient gradientValue = 28;
  ColorPoint colorPointValue = 29;
}

enum ExpressionFunction {
  ADDITION = 0;
  SUBTRACTION = 1;
  RESOLVE_VARIANT = 2;
  MULTIPLY = 3;
  DIVIDE = 4;
  EQUALS = 5;
  NOT_EQUAL = 6;
  LESS_THAN = 7;
  LESS_THAN_OR_EQUAL = 8;
  GREATER_THAN = 9;
  GREATER_THAN_OR_EQUAL = 10;
  AND = 11;
  OR = 12;
  NOT = 13;
  STRINGIFY = 14;
  TERNARY = 15;
  VAR_MODE_LOOKUP = 16;
  NEGATE = 17;
  IS_TRUTHY = 18;
  KEYFRAME = 19;
}

message Expression {
  ExpressionFunction expressionFunction = 1;
  VariableData[] expressionArguments = 2;
}

message VariableMapValue {
  string key = 1;
  VariableData value = 2;
  GUID guidKey = 3;
}

message VariableMap {
  VariableMapValue[] values = 1;
}

message ColorArray {
  VariableData[] colors = 1;
}

message VariableFontStyle {
  VariableData asString = 1;
  VariableData asFloat = 2;
  VariableData asVariations = 3;
}

message ImageParameterValue {
  Image image = 1;
  Image imageThumbnail = 2;
  Image animatedImage = 6;
  string altText = 3;
  uint originalImageHeight = 4;
  uint originalImageWidth = 5;
  uint animationFrame = 7;
}

message ThumbnailInfo {
  GUID nodeID = 1;
  string thumbnailVersion = 2;
}

message AiCanvasPrompt {
  string userPrompt = 1;
  string authorId = 2;
  GUID[] parentNodeIds = 3;
}

message NodeFieldAlias {
  GUIDPath stablePathToNode = 1;
  NodeFieldAliasType nodeField = 2;
  string indexOrKey = 3;
}

enum NodeFieldAliasType {
  MISSING = 0;
  COMPONENT_PROP_ASSIGNMENTS = 1;
}

message CMSAlias {
  string collectionId = 1;
  string itemId = 2;
  string fieldId = 3;
  VariableDataType type = 4;
}

message JsRuntimeAlias {
  string lookupKey = 1;
}

message PropRefValue {
  GUID defId = 1;
}

message ManagedStringId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message ManagedStringPlaceholderMapEntry {
  string key = 1;
  string value = 2;
}

message SlotContentId {
  GUID guid = 1;
}

message ManagedStringAlias {
  ManagedStringId managedStringId = 1;
  ManagedStringPlaceholderMapEntry[] placeholderValues = 2;
}

message KeyframeTrackId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message AnimationPresetId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message ToolId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message CustomEffectId {
  GUID guid = 1;
  AssetRef assetRef = 2;
}

message TRSSTransform2D {
  Vector translation = 1;
  float rotation = 2;
  Vector scale = 3;
  float shearX = 4;
}

message VariableData {
  VariableAnyValue value = 1;
  VariableDataType dataType = 2;
  VariableResolvedDataType resolvedDataType = 3;
}

message VariableSetMode {
  GUID id = 1;
  string name = 2;
  string sortPosition = 3;
  VariableSetID parentVariableSetId = 4;
  GUID parentModeId = 5;
}

message VariableDataValues {
  VariableDataValuesEntry[] entries = 1;
}

message VariableDataValuesEntry {
  GUID modeID = 1;
  VariableData variableData = 2;
}

enum VariableScope {
  ALL_SCOPES = 0;
  TEXT_CONTENT = 1;
  CORNER_RADIUS = 2;
  WIDTH_HEIGHT = 3;
  GAP = 4;
  ALL_FILLS = 5;
  FRAME_FILL = 6;
  SHAPE_FILL = 7;
  TEXT_FILL = 8;
  STROKE = 9;
  STROKE_FLOAT = 10;
  EFFECT_FLOAT = 11;
  EFFECT_COLOR = 12;
  OPACITY = 13;
  FONT_STYLE = 14;
  FONT_FAMILY = 15;
  FONT_SIZE = 16;
  LINE_HEIGHT = 17;
  LETTER_SPACING = 18;
  PARAGRAPH_SPACING = 19;
  PARAGRAPH_INDENT = 20;
  FONT_VARIATIONS = 21;
  TRANSFORM = 22;
}

message KeyframeAnyValue {
  float floatValue = 1;
  Color colorValue = 2;
  TextData textDataValue = 3;
  Vector vectorValue = 4;
}

enum KeyframeValueType {
  FLOAT = 0;
  INVALID = 1;
  COLOR = 2;
  TEXT_DATA = 3;
  VECTOR = 4;
}

message KeyframeValueData {
  KeyframeAnyValue value = 1;
  KeyframeValueType valueType = 2;
}

enum KeyframeTrackParameterType {
  INVALID = 0;
  MANUAL = 1;
  ANIMATION_PRESET = 2;
}

message ManualKeyframeTrackParameter {
  KeyframeTrackId keyframeTrackId = 1;
  GUID timelineDefId = 2;
}

message AnimationPresetKeyframeTrackParameter {
  AnimationPresetId animationPresetId = 1;
  KeyframeTrackId keyframeTrackId = 2;
  GUID timelineDefId = 3;
}

message KeyframeTrackAnyParameter {
  ManualKeyframeTrackParameter manual = 1;
  AnimationPresetKeyframeTrackParameter animationPreset = 2;
  GUID animationStyleBindingId = 3;
}

message KeyframeTrackParameter {
  KeyframeTrackAnyParameter value = 1;
  KeyframeTrackParameterType type = 2;
}

message KeyframeTrackParameterValue {
  KeyframeTrackParameter[] parameters = 1;
}

message AnimationPresets {
  AnimationPresetData[] presets = 1;
}

message AnimationPresetData {
  AnimationPresetId animationPresetId = 1;
  GUID timelineDefId = 2;
}

message StyleAnimation {
  AnimationPresetId animationPresetId = 1;
}

message StyleIdForAnimation {
  GUID id = 1;
  GUID timelineDefId = 2;
  StyleId animationStyleId = 3;
  int64 timelineOffset = 4;
}

message Tools {
  ToolData[] tools = 1;
}

message ToolData {
  ToolId toolId = 1;
  CodeComponentId backingCodeComponentId = 2;
  ComponentPropAssignment[] componentPropAssignments = 3;
}

message CustomEffects {
  CustomEffectData[] customEffects = 1;
}

message CustomEffectData {
  CustomEffectId customEffectId = 1;
}

message SpringParams {
  float stiffness = 1;
  float damping = 2;
  float mass = 3;
}

message TransitionEasingAnyValue {
  SpringParams springEasing = 1;
  BezierHandles bezierEasing = 2;
}

message EasingData {
  EasingType easingType = 1;
  TransitionEasingAnyValue easingValue = 2;
}

message TransitionOverride {
  GUID id = 1;
  float duration = 2;
  VariableData durationVar = 3;
  float delay = 4;
  VariableData delayVar = 5;
  EasingData easing = 6;
  VariableData easingVar = 7;
  uint64 createdAtMs = 8;
  GUID[] interactionIDs = 9;
  bool disabled = 10;
}

message TransitionOverrideData {
  TransitionOverride[] all = 1;
  TransitionOverridePropMap propertyOverrides = 2;
}

enum TransitionOverrideProp {
  ALL = 0;
  OPACITY = 1;
  TRANSLATION = 2;
  ROTATION = 3;
  SCALE = 4;
}

enum TransitionOverrideBindingTopLevelField {
  MISSING = 0;
  PARAMETER_CONSUMPTION_MAP = 1;
  EFFECT_DATA = 2;
  FILL_PAINT_DATA = 3;
  STROKE_PAINT_DATA = 4;
}

message TransitionOverrideBindingLocation {
  TransitionOverrideBindingTopLevelField topLevelField = 1;
  int parameterFieldValue = 2;
  int index = 3;
  int effectParametrizedFieldValue = 4;
}

enum KeyframeBindingEffectParametrizedField {
  MISSING = 0;
  OFFSET_X = 1;
  OFFSET_Y = 2;
  RADIUS = 3;
  SPREAD = 4;
  COLOR = 5;
  REFRACTION_RADIUS = 6;
  SPECULAR_ANGLE = 7;
  SPECULAR_INTENSITY = 8;
  CHROMATIC_ABERRATION = 9;
  SPLAY = 10;
  REFRACTION_INTENSITY = 11;
  START_RADIUS = 12;
  START_OFFSET_X = 13;
  START_OFFSET_Y = 14;
  END_OFFSET_X = 15;
  END_OFFSET_Y = 16;
  NOISE_SIZE_X = 17;
  NOISE_SIZE_Y = 18;
  DENSITY = 19;
  EFFECT_OPACITY = 20;
  SECONDARY_COLOR = 21;
}

message NodeContentsKeyframeBindingLocation {
  TransitionOverrideBindingTopLevelField topLevelField = 1;
  VariableField parameterFieldValue = 2;
  int index = 3;
  KeyframeBindingEffectParametrizedField effectParametrizedFieldValue = 4;
}

message TransitionOverridePropMap {
  TransitionOverridePropMapEntry[] entries = 1;
}

message TransitionOverridePropMapEntry {
  TransitionOverrideProp prop = 1;
  TransitionOverride[] overrides = 2;
  TransitionOverrideBindingLocation bindingLocation = 3;
  NodeContentsKeyframeBindingLocation nodeContentsBindingLocation = 4;
}

enum CodeSyntaxPlatform {
  WEB = 0;
  ANDROID = 1;
  iOS = 2;
}

message OptionalVector {
  Vector value = 1;
}

enum HTMLTag {
  AUTO = 0;
  ARTICLE = 1;
  SECTION = 2;
  NAV = 3;
  ASIDE = 4;
  H1 = 5;
  H2 = 6;
  H3 = 7;
  H4 = 8;
  H5 = 9;
  H6 = 10;
  HGROUP = 11;
  HEADER = 12;
  FOOTER = 13;
  ADDRESS = 14;
  P = 15;
  HR = 16;
  PRE = 17;
  BLOCKQUOTE = 18;
  OL = 19;
  UL = 20;
  MENU = 21;
  LI = 22;
  DL = 23;
  DT = 24;
  DD = 25;
  FIGURE = 26;
  FIGCAPTION = 27;
  MAIN = 28;
  DIV = 29;
  A = 30;
  EM = 31;
  STRONG = 32;
  SMALL = 33;
  S = 34;
  CITE = 35;
  Q = 36;
  DFN = 37;
  ABBR = 38;
  RUBY = 39;
  RT = 40;
  RP = 41;
  DATA = 42;
  TIME = 43;
  CODE = 44;
  VAR = 45;
  SAMP = 46;
  KBD = 47;
  SUB = 48;
  SUP = 49;
  I = 50;
  B = 51;
  U = 52;
  MARK = 53;
  BDI = 54;
  BDO = 55;
  SPAN = 56;
  BR = 57;
  WBR = 58;
  PICTURE = 59;
  SOURCE = 60;
  IMG = 61;
  FORM = 62;
  LABEL = 63;
  INPUT = 64;
  BUTTON = 65;
  SELECT = 66;
  DATALIST = 67;
  OPTGROUP = 68;
  OPTION = 69;
  TEXTAREA = 70;
  OUTPUT = 71;
  PROGRESS = 72;
  METER = 73;
  FIELDSET = 74;
  LEGEND = 75;
  VIDEO = 76;
}

enum ARIARole {
  AUTO = 0;
  NONE = 52;
  APPLICATION = 30;
  BANNER = 67;
  COMPLEMENTARY = 68;
  CONTENTINFO = 69;
  FORM = 70;
  MAIN = 71;
  NAVIGATION = 72;
  REGION = 73;
  SEARCH = 74;
  SEPARATOR = 13;
  ARTICLE = 31;
  COLUMNHEADER = 35;
  DEFINITION = 36;
  DIRECTORY = 38;
  DOCUMENT = 39;
  GROUP = 44;
  HEADING = 45;
  IMG = 46;
  LIST = 48;
  LISTITEM = 49;
  MATH = 50;
  NOTE = 53;
  PRESENTATION = 55;
  ROW = 56;
  ROWGROUP = 57;
  ROWHEADER = 58;
  TABLE = 62;
  TOOLBAR = 65;
  BUTTON = 1;
  CHECKBOX = 2;
  GRIDCELL = 3;
  LINK = 4;
  MENUITEM = 5;
  MENUITEMCHECKBOX = 6;
  MENUITEMRADIO = 7;
  OPTION = 8;
  PROGRESSBAR = 9;
  RADIO = 10;
  SCROLLBAR = 11;
  SLIDER = 14;
  SPINBUTTON = 15;
  TAB = 17;
  TABPANEL = 18;
  TEXTBOX = 19;
  TREEITEM = 20;
  COMBOBOX = 21;
  GRID = 22;
  LISTBOX = 23;
  MENU = 24;
  MENUBAR = 25;
  RADIOGROUP = 26;
  TABLIST = 27;
  TREE = 28;
  TREEGRID = 29;
  TOOLTIP = 66;
  ALERT = 75;
  LOG = 76;
  MARQUEE = 77;
  STATUS = 78;
  TIMER = 79;
  ALERTDIALOG = 80;
  DIALOG = 81;
  SEARCHBOX = 12;
  SWITCH = 16;
  BLOCKQUOTE = 32;
  CAPTION = 33;
  CELL = 34;
  DELETION = 37;
  EMPHASIS = 40;
  FEED = 41;
  FIGURE = 42;
  GENERIC = 43;
  INSERTION = 47;
  METER = 51;
  PARAGRAPH = 54;
  STRONG = 59;
  SUBSCRIPT = 60;
  SUPERSCRIPT = 61;
  TERM = 63;
  TIME = 64;
  IMAGE = 82;
  HEADING_1 = 83;
  HEADING_2 = 84;
  HEADING_3 = 85;
  HEADING_4 = 86;
  HEADING_5 = 87;
  HEADING_6 = 88;
  HEADER = 89;
  FOOTER = 90;
  SIDEBAR = 91;
  SECTION = 92;
  MAINCONTENT = 93;
  TABLE_CELL = 94;
  WIDGET = 95;
}

message MigrationStatus {
  bool dsdCleanup = 1;
}

message NodeFieldMap {
  NodeFieldMapEntry[] entries = 1;
}

message NodeFieldMapEntry {
  GUID guid = 1;
  uint field = 2;
  uint lastModifiedSequenceNumber = 3;
}

enum ColorProfile {
  SRGB = 0;
  DISPLAY_P3 = 1;
}

enum DocumentColorProfile {
  LEGACY = 0;
  SRGB = 1;
  DISPLAY_P3 = 2;
}

enum ChildReadingDirection {
  NONE = 0;
  LEFT_TO_RIGHT = 1;
  RIGHT_TO_LEFT = 2;
}

message ARIAAttributeAnyValue {
  bool boolValue = 1;
  string stringValue = 2;
  float floatValue = 3;
  int intValue = 4;
  string[] stringArrayValue = 5;
}

enum ARIAAttributeDataType {
  BOOLEAN = 0;
  STRING = 1;
  FLOAT = 2;
  INT = 3;
  STRING_LIST = 4;
}

message ARIAAttributeData {
  ARIAAttributeDataType type = 1;
  ARIAAttributeAnyValue value = 2;
}

message ARIAAttributesMap {
  ARIAAttributesMapEntry[] entries = 1;
}

message ARIAAttributesMapEntry {
  string attribute = 1;
  ARIAAttributeData value = 2;
}

message HandoffStatusMapEntry {
  GUID guid = 1;
  SectionStatusInfo handoffStatus = 2;
}

message HandoffStatusMap {
  HandoffStatusMapEntry[] entries = 1;
}

message EditScopeInfo {
  EditScopeStack[] editScopeStacks = 1;
  EditScopeSnapshot[] snapshots = 2;
}

message EditScopeSnapshot {
  EditScopeStack[] frames = 1;
  uint[] nodeChangeFieldNumbers = 2;
}

message EditScopeStack {
  EditScope[] stack = 1;
}

message EditScope {
  EditScopeType type = 1;
  string label = 2;
  EditorType editorType = 3;
}

enum EditScopeType {
  INVALID = 0;
  TEST_SETUP = 1;
  USER = 2;
  PLUGIN = 3;
  SYSTEM = 4;
  REST_API = 5;
  ONBOARDING = 6;
  AUTOSAVE = 7;
  AI = 8;
}

enum SectionPresetState {
  INSERTED = 0;
  USER_EDITED = 1;
}

enum EmojiImageSet {
  APPLE = 0;
  NOTO = 1;
}

enum SelectionRegionFocusType {
  NONE = 0;
  PRIMARY = 1;
  SECONDARY = 2;
}

message SectionPresetInfo {
  uint64 shelfId = 1;
  uint64 templateId = 2;
  string templateName = 3;
  SectionPresetState state = 4;
}

message ClipboardSelectionRegion {
  GUID parent = 1;
  GUID[] nodes = 2;
  Vector enclosingFrameOffset = 3;
  bool pasteIsPartiallyOutsideEnclosingFrame = 4;
  SelectionRegionFocusType focusType = 5;
}

enum FirstDraftKitType {
  LOCAL = 0;
  LIBRARY = 1;
  NONE = 2;
}

message FirstDraftKit {
  string key = 1;
  FirstDraftKitType type = 2;
}

message FirstDraftData {
  string generationId = 1;
  FirstDraftKit kit = 2;
}

enum FirstDraftKitElementType {
  NONE = 0;
  BUILDING_BLOCK = 1;
  GROUPED_COMPONENT = 2;
}

message FirstDraftKitElementData {
  FirstDraftKitElementType type = 1;
}

enum PlatformShapeProperty {
  FILL = 0;
  STROKE = 1;
  TEXT = 2;
  STROKE_COLOR = 3;
}

enum PlatformShapeBehaviorType {
  SHAPE = 0;
  CONTAINER = 1;
  ADVANCED_CONTAINER = 2;
}

message PlatformShapePropertyMapEntry {
  PlatformShapeProperty property = 1;
  GUIDPath[] nodePaths = 2;
}

message PlatformShapeDefinition {
  PlatformShapePropertyMapEntry[] propertyMapEntries = 1;
  PlatformShapeBehaviorType behaviorType = 2;
  GUIDPath thumbnailNode = 3;
}

message NodeBehaviors {
  LinkBehavior link = 1;
  AppearBehavior appear = 2;
  HoverBehavior hover = 3;
  PressBehavior press = 4;
  FocusBehavior focus = 5;
  ScrollParallaxBehavior scrollParallax = 6;
  ScrollTransformBehavior scrollTransform = 7;
  CursorBehavior cursor = 8;
  MarqueeBehavior marquee = 9;
  CodeBehavior[] code = 10;
}

message BehaviorTransition {
  EasingType easingType = 1;
  float[] easingFunction = 2;
  float transitionDuration = 3;
  float delay = 4;
  VariableData transitionDurationVar = 5;
  VariableData delayVar = 6;
}

enum AppearBehaviorTrigger {
  PAGE_LOAD = 1;
  THIS_LAYER_IN_VIEW = 2;
  OTHER_LAYER_IN_VIEW = 3;
  SCROLL_DIRECTION = 4;
}

enum RelativeDirection {
  UP = 1;
  DOWN = 2;
  LEFT = 3;
  RIGHT = 4;
}

message AppearBehavior {
  AppearBehaviorTrigger trigger = 1;
  RelativeDirection direction = 2;
  GUID otherLayer = 3;
  BehaviorTransition enterTransition = 4;
  NodeChange enterState = 5;
  BehaviorTransition exitTransition = 6;
  NodeChange exitState = 7;
  bool playsOnce = 8;
  VariableData playsOnceVar = 9;
  bool isDeleted = 10;
}

message HoverBehavior {
  BehaviorTransition transition = 1;
  NodeChange state = 2;
  bool isDeleted = 3;
}

message PressBehavior {
  BehaviorTransition transition = 1;
  NodeChange state = 2;
  bool isDeleted = 3;
}

message FocusBehavior {
  BehaviorTransition transition = 1;
  NodeChange state = 2;
  bool isDeleted = 3;
}

message ScrollParallaxBehavior {
  ScrollDirection axis = 1;
  float speed = 2;
  bool relativeToPage = 3;
  VariableData speedVar = 4;
  bool isDeleted = 5;
}

enum ScrollTransformBehaviorTrigger {
  PAGE_HEIGHT = 1;
  THIS_LAYER_IN_VIEW = 2;
  OTHER_LAYER_IN_VIEW = 3;
}

message ScrollTransformBehavior {
  ScrollTransformBehaviorTrigger trigger = 1;
  GUID otherLayer = 2;
  BehaviorTransition transition = 3;
  NodeChange fromState = 4;
  NodeChange toState = 5;
  bool playsOnce = 6;
  bool playsOnceVar = 7;
  VariableData playsOnceVar2 = 8;
  bool isDeleted = 9;
}

message CursorBehavior {
  float hotspotX = 1;
  float hotspotY = 2;
  GUID cursorGuid = 3;
  bool isDeleted = 4;
}

message MarqueeBehavior {
  RelativeDirection direction = 1;
  float speed = 2;
  bool shouldLoopInfinitely = 3;
  VariableData speedVar = 4;
  VariableData shouldLoopInfinitelyVar = 5;
  VariableData pauseOnHover = 6;
  bool isDeleted = 7;
}

message CodeBehavior {
  CodeComponentId codeComponentId = 1;
  ComponentPropAssignment[] componentPropAssignments = 2;
  bool isDeleted = 3;
}

message ClientRenderedMetadata {
  string loadID = 1;
  string trackingSessionId = 2;
  uint trackingSessionSequenceId = 3;
  string reconnectID = 4;
}

enum LinkBehaviorType {
  URL = 1;
  PAGE = 2;
}

message LinkBehavior {
  LinkBehaviorType type = 1;
  string url = 2;
  GUID page = 3;
  bool openInNewWindow = 4;
}

message VariableIdOrVariableOverrideId {
  VariableID variableId = 1;
  VariableOverrideId variableOverrideId = 2;
}

struct IndexFontVariationAxis {
  string tag;
  string name;
  float min;
  float max;
  float defaultValue;
}

struct IndexFontVariationAxisValue {
  string tag;
  float value;
}

message IndexFontStyle {
  string name = 1;
  string postscript = 2;
  float weight = 3;
  bool italic = 4;
  float stretch = 5;
  IndexFontVariationAxisValue[] variationAxisValues = 6;
}

message IndexFontFile {
  string filename = 1;
  uint version = 2;
  string family = 3;
  IndexFontStyle[] styles = 4;
  IndexFontVariationAxis[] variationAxes = 5;
  bool useFontOpticalSize = 6;
}

struct IndexFamilyRename {
  string oldFamily;
  string newFamily;
}

struct IndexStyleRename {
  string oldStyle;
  string newStyle;
}

struct IndexFamilyStylesRename {
  string familyName;
  IndexStyleRename[] styleRenames;
}

struct IndexRenames {
  IndexFamilyRename[] family;
  IndexFamilyStylesRename[] style;
}

struct IndexEmojiSequence {
  uint[] codepoints;
}

struct IndexEmojis {
  uint revision;
  uint[] sizes;
  IndexEmojiSequence[] sequences;
}

message FontIndex {
  uint schemaVersion = 1;
  IndexFontFile[] files = 2;
  IndexRenames renames = 3;
  IndexEmojis emojis = 4;
}

message SlideThemeData {
  ThemeID themeID = 1;
  string version = 2;
}

enum SlideNumber {
  NONE = 0;
  SLIDE = 1;
  SECTION = 2;
  SUBSECTION = 3;
  TOTAL_WITHIN_DECK = 4;
  TOTAL_WITHIN_SECTION = 5;
}

enum NodeChatMessageType {
  USER_MESSAGE = 0;
  ASSISTANT_MESSAGE = 1;
  TOOL_MESSAGE = 2;
  SYSTEM_MESSAGE = 3;
}

message NodeChatMessage {
  GUID id = 1;
  NodeChatMessageType type = 2;
  string userId = 3;
  string textContent = 4;
  uint sentAt = 5;
  NodeChatToolCall[] toolCalls = 6;
  NodeChatToolResult[] toolResults = 7;
  uint64 sentAt64 = 8;
}

message NodeChatToolCall {
  string toolCallId = 1;
  string toolName = 2;
  string argsJson = 3;
}

message NodeChatToolResult {
  string toolCallId = 1;
  string toolName = 2;
  string resultJson = 3;
}

message NodeChatExchange {
  GUID node = 1;
  NodeChatMessage[] messages = 2;
  bool isTyping = 3;
  FileUpdate[] fileUpdates = 4;
}

message NodeChatCompressionState {
  uint startIndex = 1;
  string summary = 2;
}

message FileUpdate {
  string name = 1;
  string contents = 2;
  bool isDeleted = 3;
}

message AIChatContentPart {
  AIChatContentPartType type = 1;
  AIChatContentPartAnyValue value = 2;
}

enum AIChatContentPartType {
  INVALID = 0;
  TEXT = 1;
  SELECTED_NODE_IDS = 2;
}

message AIChatContentPartAnyValue {
  string textValue = 1;
  string[] selectedNodeIds = 2;
}

enum AIChatMessageRole {
  USER = 0;
  ASSISTANT = 1;
  TOOL = 2;
  SYSTEM = 3;
}

message AIChatMessage {
  uint createdAtMs = 1;
  AIChatMessageRole role = 2;
  AIChatContentPart[] content = 3;
  string clientId = 4;
  uint64 createdAtMs64 = 5;
}

message AIChatThread {
  AIChatMessage[] messages = 1;
}

enum CooperTemplateType {
  CUSTOM = 0;
  TWITTER_POST = 1;
  LINKEDIN_POST = 2;
  INSTA_POST_SQUARE = 3;
  INSTA_POST_PORTRAIT = 4;
  INSTA_STORY = 5;
  INSTA_AD = 6;
  FACEBOOK_POST = 7;
  FACEBOOK_COVER_PHOTO = 8;
  FACEBOOK_EVENT_COVER = 9;
  FACEBOOK_AD_PORTRAIT = 10;
  FACEBOOK_AD_SQUARE = 11;
  PINTEREST_AD_PIN = 12;
  TWITTER_BANNER = 13;
  LINKEDIN_POST_SQUARE = 15;
  LINKEDIN_POST_PORTRAIT = 16;
  LINKEDIN_POST_LANDSCAPE = 17;
  LINKEDIN_PROFILE_BANNER = 18;
  LINKEDIN_ARTICLE_BANNER = 19;
  LINKEDIN_AD_LANDSCAPE = 20;
  LINKEDIN_AD_SQUARE = 21;
  LINKEDIN_AD_VERTICAL = 22;
  YOUTUBE_THUMBNAIL = 23;
  YOUTUBE_BANNER = 24;
  YOUTUBE_AD = 25;
  TWITCH_BANNER = 26;
  GOOGLE_LEADERBOARD_AD = 27;
  GOOGLE_LARGE_AD = 28;
  GOOGLE_MED_AD = 29;
  GOOGLE_MOBILE_BANNER_AD = 30;
  GOOGLE_SKYSCRAPER_AD = 31;
  CARD_HORIZONTAL = 32;
  CARD_VERTICAL = 33;
  PRINT_US_LETTER = 34;
  POSTER = 35;
  BANNER_STANDARD = 36;
  BANNER_WIDE = 37;
  BANNER_ULTRAWIDE = 38;
  NAME_TAG_PORTRAIT = 39;
  NAME_TAG_LANDSCAPE = 40;
  INSTA_REEL_COVER = 41;
  ZOOM_BACKGROUND = 42;
  TIKTOK_POST = 43;
  INSTA_AD_PORTRAIT = 44;
  INSTA_POST_TALL_PORTRAIT = 45;
  TWITTER_POST_SQUARE = 46;
  FACEBOOK_POST_SQUARE = 47;
  FACEBOOK_POST_PORTRAIT = 48;
  FACEBOOK_STORY = 49;
  GOOGLE_SQUARE_AD = 50;
  GOOGLE_SMALL_SQUARE_AD = 51;
  GOOGLE_NARROW_SKYSCRAPER_AD = 52;
  GOOGLE_HALF_PAGE_AD = 53;
  GOOGLE_LARGE_LEADERBOARD_AD = 54;
  GOOGLE_BILLBOARD_AD = 55;
  GOOGLE_BANNER_LEADERBOARD_AD = 56;
  GOOGLE_TOP_BANNER_AD = 57;
  GOOGLE_MOBILE_LEADERBOARD_BANNER_AD = 58;
  GOOGLE_LARGE_MOBILE_BANNER_AD = 59;
  GOOGLE_MOBILE_INTERSTITIAL_AD = 60;
  GOOGLE_MOBILE_MED_RECTANGLE_AD = 61;
  PINTEREST_PIN_STANDARD = 62;
  PINTEREST_PIN_SQUARE = 63;
  PINTEREST_AD_SQUARE = 64;
  PRINT_A4 = 65;
}

message CooperTemplateData {
  CooperTemplateType type = 1;
}

message ImageImportMap {
  ImageImport[] imports = 1;
}

message ImageImport {
  string name = 1;
  Image image = 2;
}

enum InterpolationType {
  HOLD = 0;
  BEZIER = 1;
  SPRING = 2;
}

message BezierHandles {
  float p1x = 1;
  float p1y = 2;
  float p2x = 3;
  float p2y = 4;
}

enum KeyframeOperation {
  SET = 0;
  SCALE = 1;
  OFFSET = 2;
}

enum TimelinePositionType {
  ABSOLUTE = 0;
  RELATIVE = 1;
}

enum PlaybackStyle {
  ONCE = 0;
  LOOP = 1;
  BOOMERANG = 2;
}
`);ly(Or);var _x=new Uint8Array([40,181,47,253]);function dc(e){return e.length>=4&&e[0]===40&&e[1]===181&&e[2]===47&&e[3]===253}var Gs=null;async function pc(){Gs||(Gs=Ui(Or))}function mc(){return ay(Or)}function hc(e){if(!Gs)throw new Error("Codec not initialized. Call initCodec() first.");return Gs.encodeMessage(e)}function Vx(e){return new Map(e.fields.map(t=>[t.value,t]))}function gc(e,t){let n=e.fields.get(t.name);return n||(n=Vx(t),e.fields.set(t.name,n)),n}function uy(e,t,n){switch(t.type){case"bool":case"byte":e.readByte();return;case"int":e.readVarInt();return;case"uint":e.readVarUint();return;case"float":e.readVarFloat();return;case"string":e.skipString();return;case"int64":e.readVarInt64();return;case"uint64":e.readVarUint64();return}let r=t.type?n.definitions.get(t.type):void 0;if(!r)throw new Error(`Invalid Kiwi field type: ${String(t.type)}`);if(r.kind==="ENUM"){e.readVarUint();return}Fx(e,r,n)}function Us(e,t,n){if(!t.isArray){uy(e,t,n);return}if(t.type==="byte"){e.skipByteArray();return}let r=e.readVarUint();for(;r-- >0;)uy(e,t,n)}function Fx(e,t,n){if(t.kind==="STRUCT"){for(let i of t.fields)Us(e,i,n);return}let r=gc(n,t);for(;;){let i=e.readVarUint();if(i===0)return;let o=r.get(i);if(!o)throw new Error(`Invalid field ${i} in Kiwi ${t.name}`);Us(e,o,n)}}function cy(e,t,n){let r=e.readVarUint(),i=t.type?n.definitions.get(t.type):void 0;return i?.kind==="ENUM"?i.fields.find(o=>o.value===r)?.name??null:null}function Gx(e,t,n){let r=gc(n,t),i=null,o=null,s=null,a=null,l=null,u=null,c=null,f=null,g=!1;for(;;){let v=e.readVarUint();if(v===0)break;let T=r.get(v);if(!T)throw new Error(`Invalid field ${v} in Kiwi NodeChange`);switch(T.name){case"guid":i=e.readVarUint(),o=e.readVarUint();break;case"parentIndex":s=e.readVarUint(),a=e.readVarUint(),l=e.offset,e.skipString();break;case"phase":u=cy(e,T,n);break;case"type":c=cy(e,T,n);break;case"name":c==="DOCUMENT"||c==="CANVAS"?f=e.readString():e.skipString();break;case"internalOnly":g=!!e.readByte();break;default:Us(e,T,n)}}if(c!=="DOCUMENT"&&c!=="CANVAS"||i===null||o===null)return null;let h=null;if(l!==null){let v=e.offset;e.offset=l,h=e.readString(),e.offset=v}let d=s===null||a===null?null:`${s}:${a}`;return{sourceId:`${i}:${o}`,parentId:d,position:h,phase:u,type:c,name:f??"Page",internalOnly:g}}function fy(e,t){let n=new Map(e.definitions.map(c=>[c.name,c])),r={definitions:n,fields:new Map},i=n.get("Message"),o=n.get("NodeChange");if(i?.kind!=="MESSAGE"||o?.kind!=="MESSAGE")return[];let s=new Ot(t),a=gc(r,i),l=[];for(;;){let c=s.readVarUint();if(c===0)break;let f=a.get(c);if(!f)throw new Error(`Invalid field ${c} in Kiwi Message`);if(f.name!=="nodeChanges"||!f.isArray){Us(s,f,r);continue}let g=s.readVarUint();for(;g-- >0;){let h=Gx(s,o,r);h&&l.push(h)}break}let u=l.find(c=>c.type==="DOCUMENT"&&c.phase!=="REMOVED")?.sourceId;return l.filter(c=>c.type==="CANVAS"&&c.phase!=="REMOVED"&&(!u||c.parentId===u)).sort((c,f)=>{let g=c.position??"",h=f.position??"";return g<h?-1:g>h?1:0}).map(({sourceId:c,name:f,position:g,internalOnly:h})=>({sourceId:c,name:f,position:g,internalOnly:h}))}function yc(e){let t=Math.floor(e/94),n=String.fromCharCode(33+e%94);return"~".repeat(t)+n}function An(e,t){if(e!==null&&t!==null&&e>=t)return null;let n=e??"",r=t??"",i=0;for(;i<n.length&&i<r.length&&n[i]===r[i];)i++;let o=i<n.length?n.charCodeAt(i):32,s=t!==null&&i<t.length?t.charCodeAt(i):127;if(s-o>1)return n.slice(0,i)+String.fromCharCode(Math.floor((o+s)/2));if(i<n.length)return n.slice(0,i+1)+(An(n.slice(i+1),null)??"O");let a=t?.slice(i+1)??"";return!t||a===""?null:t.slice(0,i+1)+(An(null,a)??"")}function Bx(e,t,n){for(let r=An(e,t);r!==null;r=An(r,t)){if(r+n<t)return r+n;if(!t.startsWith(r))return null}return null}function Ux(e,t,n=""){let r=An(e,t);return r===null?(An(e,null)??"O")+n:n?t===null?r+n:Bx(e,t,n)??r:r}function zx(e,t){return An(e,t)!==null}function Hx(e){let t=[],n=new Map;for(let i=0;i<e.length;i++){let o=e[i];if(!o)continue;let s=0,a=t.length;for(;s<a;){let l=s+a>>1;(e[t[l]]??"")<o?s=l+1:a=l}s===0&&i>0&&!zx(null,o)||(s>0&&n.set(i,t[s-1]),t[s]=i)}let r=new Set;for(let i=t.at(-1);i!==void 0;i=n.get(i))r.add(i);return r}function dy(e,t={}){let n=[],r=null,i=[],o=(u,c,f)=>{if(t.suffix){let h=Ux(c,f,t.suffix());return f===null||h<f?h:null}let g=yc(u);return(c===null||g>c)&&(f===null||g<f)?g:An(c,f)},s=u=>{let c=[],f=r;for(let g of i){let h=o(g,f,u);if(h===null)return null;c.push(h),f=h}return c},a=Hx(e);for(let u=0;u<e.length;u++){let c=e[u],f=c&&a.has(u)?s(c):null;c&&f?(i.forEach((g,h)=>n[g]=f[h]),n[u]=c,r=c,i=[]):i.push(u)}let l=s(null)??[];return i.forEach((u,c)=>n[u]=l[c]),n}function vc(e){if(new TextDecoder().decode(e.slice(0,8))!=="fig-kiwi")return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=12,r=[];for(;n<e.length;){let i=t.getUint32(n,!0);n+=4,r.push(e.slice(n,n+i)),n+=i}return r.length>=2?r:null}function Ic(e,t,n=101){let r,i=globalThis.Bun?.zstdCompressSync;i?r=i(t):r=Yr(t);let o=16+e.length+4+r.length,s=new Uint8Array(o),a=new DataView(s.buffer);s.set(new TextEncoder().encode("fig-kiwi"),0),a.setUint32(8,n,!0);let l=12;return a.setUint32(l,e.length,!0),l+=4,s.set(e,l),l+=e.length,a.setUint32(l,r.length,!0),l+=4,s.set(r,l),s}function Py(e){switch(e){case"FRAME":return"FRAME";case"RECTANGLE":return"RECTANGLE";case"ROUNDED_RECTANGLE":return"ROUNDED_RECTANGLE";case"ELLIPSE":return"ELLIPSE";case"TEXT":return"TEXT";case"LINE":return"LINE";case"STAR":return"STAR";case"POLYGON":return"REGULAR_POLYGON";case"VECTOR":return"VECTOR";case"BOOLEAN_OPERATION":return"BOOLEAN_OPERATION";case"GROUP":return"FRAME";case"SECTION":return"SECTION";case"COMPONENT":return"SYMBOL";case"COMPONENT_SET":return"FRAME";case"INSTANCE":return"INSTANCE";case"CONNECTOR":return"CONNECTOR";case"SHAPE_WITH_TEXT":return"SHAPE_WITH_TEXT";default:return"RECTANGLE"}}function wy(e){let t=e.flipX?-1:1,n=Math.cos(e.rotation*Math.PI/180),r=Math.sin(e.rotation*Math.PI/180),i=n*t,o=-r*t,s=r,a=n,l=e.width/2,u=e.height/2;return{m00:i,m01:o,m02:e.x+l-i*l-o*u,m10:s,m11:a,m12:e.y+u-s*l-a*u}}function Wx(e){if(!e||typeof e!="object")return!1;let t=e;return Number.isFinite(t.sessionID)&&Number.isFinite(t.localID)}function py(e,t){return e?`fig-guide:${e.sessionID}:${e.localID}`:`guide:${t}`}function ky(e){if(!Array.isArray(e))return[];let t=[];for(let[n,r]of e.entries()){if(!r||typeof r!="object")continue;let i=r;if(typeof i.offset!="number"||!Number.isFinite(i.offset))continue;let o=Wx(i.guid)?i.guid:void 0;i.axis==="X"?t.push({id:py(o,n),axis:"x",position:i.offset,...o?{figGuid:o}:{}}):i.axis==="Y"&&t.push({id:py(o,n),axis:"y",position:i.offset,...o?{figGuid:o}:{}})}return t}function _y(e){return e.map(t=>({axis:t.axis==="x"?"X":"Y",offset:t.position,...t.figGuid?{guid:t.figGuid}:{}}))}function jx(e,t){let n=e.baselines??[];if(e.logicalIndexToCharacterOffsetMap?.length!==t.length+1||n.length!==1)return!1;let r=n[0].position.y;return(e.glyphs??[]).every(i=>(i.rotation??0)===0&&i.position.y===r)}function Ly(e,t,n){if(!e||jx(e,n))return[];let r=[],i=e.truncationStartIndex??-1,o=e.glyphs??[];for(let s of i>=0?o.slice(0,i):o){let a=s.commandsBlob===void 0?void 0:t[s.commandsBlob];if(!a)return[];let l=s.advance*s.fontSize;r.push({commandsBlob:a,x:s.position.x,y:s.position.y,fontSize:s.fontSize,firstCharacter:s.firstCharacter,rotation:s.rotation,advance:Number.isFinite(l)?l:void 0})}return r}var $x=new Set((Or.definitions.find(e=>e.name==="OpenTypeFeature")?.fields??[]).map(e=>e.name)),Vy=[["fontVariantCommonLigatures","LIGA"],["fontVariantContextualLigatures","CALT"],["fontVariantDiscretionaryLigatures","DLIG"],["fontVariantHistoricalLigatures","HLIG"],["fontVariantOrdinal","ORDN"],["fontVariantSlashedZero","ZERO"]],Xx=[["fontVariantNumericFigure",{LINING:"LNUM",OLDSTYLE:"ONUM"}],["fontVariantNumericSpacing",{PROPORTIONAL:"PNUM",TABULAR:"TNUM"}],["fontVariantNumericFraction",{DIAGONAL:"FRAC",STACKED:"AFRC"}],["fontVariantCaps",{SMALL:"SMCP",PETITE:"PCAP",ALL_SMALL:["SMCP","C2SC"],ALL_PETITE:["PCAP","C2PC"],UNICASE:"UNIC",TITLING:"TITL"}]],Kx=Object.fromEntries(Vy.map(([e,t])=>[t,e])),Yx={LNUM:{field:"fontVariantNumericFigure",value:"LINING"},ONUM:{field:"fontVariantNumericFigure",value:"OLDSTYLE"},PNUM:{field:"fontVariantNumericSpacing",value:"PROPORTIONAL"},TNUM:{field:"fontVariantNumericSpacing",value:"TABULAR"},FRAC:{field:"fontVariantNumericFraction",value:"DIAGONAL"},AFRC:{field:"fontVariantNumericFraction",value:"STACKED"},SMCP:{field:"fontVariantCaps",value:"SMALL"},PCAP:{field:"fontVariantCaps",value:"PETITE"},C2SC:{field:"fontVariantCaps",value:"ALL_SMALL"},C2PC:{field:"fontVariantCaps",value:"ALL_PETITE"},UNIC:{field:"fontVariantCaps",value:"UNICASE"},TITL:{field:"fontVariantCaps",value:"TITLING"}};function zi(e,t,n){let r=t.toUpperCase();e.some(i=>i.tag===r)||e.push({tag:r,enabled:n})}function wc(e){let t=[];for(let[n,r]of Vy){let i=e[n];i!==void 0&&zi(t,r,i)}for(let[n,r]of Xx){let i=r[String(e[n])];if(Array.isArray(i))for(let o of i)zi(t,o,!0);else i&&zi(t,i,!0)}for(let n of e.toggledOnOTFeatures??[])zi(t,n,!0);for(let n of e.toggledOffOTFeatures??[])zi(t,n,!1);return t}function qx(e,t,n,r,i,o){let s=Kx[t];if(s){e[s]=n;return}let a=Yx[t];if(a){n?(e[a.field]=a.value,o.delete(a.field)):e[a.field]===void 0&&o.set(a.field,"NORMAL");return}$x.has(t)&&(n?r.push(t):i.push(t))}function kc(e,t){let n=[],r=[],i=new Map;for(let o of t)qx(e,o.tag.toUpperCase(),o.enabled,n,r,i);for(let o of i.keys())e[o]="NORMAL";n.length>0&&(e.toggledOnOTFeatures=n),r.length>0&&(e.toggledOffOTFeatures=r)}function Fy(e){return String.fromCharCode(e>>24&255,e>>16&255,e>>8&255,e&255)}function Gy(e){if(e.length===4)return(e.charCodeAt(0)<<24|e.charCodeAt(1)<<16|e.charCodeAt(2)<<8|e.charCodeAt(3))>>>0}function _c(e){let t=[];for(let n of e.fontVariations??[]){if(typeof n.value!="number")continue;let r=typeof n.axisTag=="number"?Fy(n.axisTag):n.axisName||"";r&&t.push({axis:r,value:n.value})}return t}function By(e){if(e.length%2!==0)throw new Error("Hex string must contain an even number of characters");let t=new Uint8Array(e.length/2);for(let n=0;n<t.length;n++){let r=Number.parseInt(e.slice(n*2,n*2+2),16);if(Number.isNaN(r))throw new Error("Hex string contains invalid characters");t[n]=r}return t}var Zx=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function Lc(e){if(typeof e.toHex=="function")return e.toHex();let t=Array.from({length:e.length},()=>"");for(let n=0;n<e.length;n++)t[n]=Zx[e[n]];return t.join("")}function Xs(e){return{r:e.r,g:e.g,b:e.b,a:"a"in e?e.a:1}}function Wi(e){let t={type:e.type,color:Xs(e.color),opacity:e.opacity,visible:e.visible,blendMode:e.blendMode??"NORMAL"};return e.gradientStops&&(t.stops=e.gradientStops.map(n=>({color:Xs(n.color),position:n.position}))),e.gradientTransform&&(t.transform=e.gradientTransform),e.imageHash&&(t.image={hash:By(e.imageHash)}),e.imageScaleMode&&(t.imageScaleMode=e.imageScaleMode),e.imageTransform&&(t.transform=e.imageTransform),e.sourceNodeId&&(t.sourceNodeId=lt(e.sourceNodeId)),e.scale&&(t.scale=e.scale),e.spacing&&(t.spacing=e.spacing),e.patternSpacing&&(t.patternSpacing=e.patternSpacing),e.patternTileType&&(t.patternTileType=e.patternTileType),e.verticalAlignment&&(t.verticalAlignment=e.verticalAlignment),e.horizontalAlignment&&(t.horizontalAlignment=e.horizontalAlignment),e.noiseType&&(t.noiseType=e.noiseType),e.density!==void 0&&(t.density=e.density),e.noiseSize&&(t.noiseSize=e.noiseSize),e.customEffectId&&(t.customEffectId={guid:lt(e.customEffectId)}),t}function Vc(e){return e?{r:e.r??0,g:e.g??0,b:e.b??0,a:e.a??1}:{...vn}}function Jx(e){return Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>e[Number(t)]).map(t=>t.toString(16).padStart(2,"0")).join("")}function Uy(e){if(e)return{m00:e.m00,m01:e.m01,m02:e.m02,m10:e.m10,m11:e.m11,m12:e.m12}}var my=null;function Qx(e){let t=e.colorVar?.value?.alias;if(!(!t||!my))return my(t)??void 0}function eN(e){let t=Qx(e);return t?{color:{...t,a:e.color?.a??1},opacity:e.opacity??t.a}:{color:Vc(e.color),opacity:e.opacity??1}}function tN(e){let{color:t,opacity:n}=eN(e);return{type:e.type,color:t,opacity:n,visible:e.visible??!0,blendMode:e.blendMode??"NORMAL"}}function nN(e,t){!t.type.startsWith("GRADIENT")||!t.stops||(e.gradientStops=t.stops.map(n=>({color:Vc(n.color),position:n.position})),t.transform&&(e.gradientTransform=Uy(t.transform)))}function rN(e,t){if(t.type==="IMAGE"){if(t.image&&typeof t.image=="object"){let n=t.image;typeof n.hash=="object"?e.imageHash=Jx(n.hash):typeof n.hash=="string"&&(e.imageHash=n.hash)}e.imageScaleMode=t.imageScaleMode??"FILL",t.transform&&(e.imageTransform=Uy(t.transform))}}function iN(e,t){t.sourceNodeId&&(e.sourceNodeId=ie(t.sourceNodeId)),t.scale&&(e.scale=t.scale),t.spacing&&(e.spacing=t.spacing),t.patternSpacing&&(e.patternSpacing=t.patternSpacing),t.patternTileType&&(e.patternTileType=t.patternTileType),t.verticalAlignment&&(e.verticalAlignment=t.verticalAlignment),t.horizontalAlignment&&(e.horizontalAlignment=t.horizontalAlignment),t.noiseType&&(e.noiseType=t.noiseType),t.density!==void 0&&(e.density=t.density),t.noiseSize&&(e.noiseSize=t.noiseSize),t.customEffectId?.guid&&(e.customEffectId=ie(t.customEffectId.guid))}function zy(e){let t=tN(e);return nN(t,e),rN(t,e),iN(t,e),t}function Dr(e){return e?e.map(zy):[]}function Fc(e){return e==="INSIDE"||e==="OUTSIDE"?e:"CENTER"}function Hy(e,t,n,r,i,o){if(!e)return[];let s=Fc(n);return e.map(a=>({...zy(a),weight:t??1,align:s,cap:r??"NONE",join:i??"MITER",dashPattern:o??[]}))}function Wy(e){return e?e.map(t=>({type:t.type,color:Vc(t.color),offset:t.offset??{x:0,y:0},radius:t.radius??0,spread:t.spread??0,visible:t.visible??!0,blendMode:t.blendMode??"NORMAL",showShadowBehindNode:t.showShadowBehindNode??!0})):[]}function hy(e,t,n){return t===0&&n===0?e:Oi(e,1,0,0,1,t,n)}function oN(e,t,n){let r=[...e.fillGeometry??[],...e.strokeGeometry??[]],i=r.length>0?us(r):null,o=i?.x??0,s=i?.y??0,a=i?i.x+i.width:t,l=i?i.y+i.height:n;for(let c of e.derivedTextGlyphs??[]){let f=c.fontSize||0;o=Math.min(o,c.x-f*.25),s=Math.min(s,c.y-f),a=Math.max(a,c.x+f),l=Math.max(l,c.y+f*.35)}let u=1;return{left:Math.max(0,-o+(o<0?u:0)),top:Math.max(0,-s+(s<0?u:0)),right:Math.max(0,a-t+(a>t?u:0)),bottom:Math.max(0,l-n+(l>n?u:0))}}function sN(e,t,n){e.strokeGeometry&&e.strokeGeometry.length>0&&(e.strokeGeometry=hy(e.strokeGeometry,t,n)),e.fillGeometry&&e.fillGeometry.length>0&&(e.fillGeometry=hy(e.fillGeometry,t,n)),e.derivedTextGlyphs?.length&&(e.derivedTextGlyphs=e.derivedTextGlyphs.map(r=>({...r,x:r.x+t,y:r.y+n})))}function aN(e,t){if(e.nodeType!=="TEXT"||!t)return;e.textPathData=t;let n=e.width??0,r=e.height??0;e.textPathBox={x:0,y:0,width:n,height:r};let i=oN(e,n,r);if(i.left===0&&i.top===0&&i.right===0&&i.bottom===0)return;let o=i.left,s=i.top;e.x=(e.x??0)-o,e.y=(e.y??0)-s,e.width=n+i.left+i.right,e.height=r+i.top+i.bottom,(o!==0||s!==0)&&(e.textPathBox={x:o,y:s,width:n,height:r},sN(e,o,s))}var lN=new Set(["width","height"]),uN=new Set(["x","y","rotation","flipX","flipY"]),Ne=["textData","derivedTextData","textUserLayoutVersion","textExplicitLayoutVersion"],Rt=["strokeGeometry","vectorData"],cN={fillStyleId:["styleIdForFill"],strokeStyleId:["styleIdForStrokeFill"],textStyleId:["styleIdForText"],effectStyleId:["styleIdForEffect"],gridStyleId:["styleIdForGrid"],fills:["fillPaints","backgroundPaints","backgroundColor"],strokes:["strokePaints"],effects:["effects"],blendMode:["blendMode"],layoutGrids:["layoutGrids"],guides:["guides"],exportSettings:["exportSettings"],cornerRadius:["cornerRadius"],independentCorners:["rectangleCornerRadiiIndependent"],topLeftRadius:["rectangleTopLeftCornerRadius","rectangleCornerRadiiIndependent"],topRightRadius:["rectangleTopRightCornerRadius","rectangleCornerRadiiIndependent"],bottomLeftRadius:["rectangleBottomLeftCornerRadius","rectangleCornerRadiiIndependent"],bottomRightRadius:["rectangleBottomRightCornerRadius","rectangleCornerRadiiIndependent"],cornerSmoothing:["cornerSmoothing"],borderTopWeight:["borderTopWeight",...Rt],borderRightWeight:["borderRightWeight",...Rt],borderBottomWeight:["borderBottomWeight",...Rt],borderLeftWeight:["borderLeftWeight",...Rt],independentStrokeWeights:["borderStrokeWeightsIndependent","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight",...Rt],strokeWeight:["strokeWeight",...Rt],strokeAlign:["strokeAlign",...Rt],strokeJoin:["strokeJoin",...Rt],strokeMiterLimit:["miterLimit",...Rt],strokeCap:[...Rt],dashPattern:[...Rt],text:[...Ne],styleRuns:[...Ne],fontSize:["fontSize",...Ne],fontFamily:["fontName","fontVersion",...Ne],fontWeight:["semanticWeight",...Ne],italic:["semanticItalic",...Ne],textAlignHorizontal:["textAlignHorizontal",...Ne],textAlignVertical:["textAlignVertical",...Ne],lineHeight:["lineHeight",...Ne],letterSpacing:["letterSpacing","textTracking",...Ne],textAutoResize:["textAutoResize",...Ne],textDecorationStyle:["textDecorationStyle",...Ne],textDecorationThickness:["textDecorationThickness",...Ne],textDecorationFills:["textDecorationFillPaints",...Ne],textUnderlineOffset:["textUnderlineOffset",...Ne],leadingTrim:["leadingTrim",...Ne],maxLines:["maxLines",...Ne],textParagraphs:[...Ne],listSpacing:["listSpacing",...Ne],paragraphSpacing:["paragraphSpacing",...Ne],paragraphIndent:["paragraphIndent",...Ne],hangingList:["hangingList",...Ne],fontVariations:["fontVariations",...Ne],fontFeatures:["fontVariantCommonLigatures","fontVariantContextualLigatures","toggledOnOTFeatures","toggledOffOTFeatures",...Ne],minWidth:["minSize"],minHeight:["minSize"],maxWidth:["maxSize"],maxHeight:["maxSize"],vectorNetwork:["vectorData","fillGeometry","strokeGeometry"],fillGeometry:["fillGeometry","vectorData"],strokeGeometry:["strokeGeometry","vectorData"],isMask:["mask"],maskType:["maskType"],maskIsOutline:["maskIsOutline"],componentPropertyDefinitions:["componentPropDefs"],componentPropertyReferences:["componentPropRefs"],componentPropertyAssignments:["componentPropAssignments"],variantPropSpecs:["variantPropSpecs"]};function Gc(e=[]){return new Set(e.flatMap(t=>cN[t]??[]))}function Je(e){let t=Gc(e.source.editedFields??[]);return t.size===0?e.source.fig.rawNodeFields:Object.fromEntries(Object.entries(e.source.fig.rawNodeFields).filter(([n])=>!t.has(n)))}function qs(e){let t=e.source.editedFields??[];return{...e.source.fig,rawNodeFields:Je(e),rawSize:t.some(n=>lN.has(n))?null:e.source.fig.rawSize,rawTransform:t.some(n=>uN.has(n))?null:e.source.fig.rawTransform}}function jy(e,t){if(!Gc(e.source.editedFields??[]).has(t))return e.source.fig.rawNodeFields[t]}function fN(e){return Object.getPrototypeOf(e)===Object.prototype}function Ec(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>Ec(n));if(!fN(e))return structuredClone(e);let t={};for(let n of Object.keys(e))t[n]=Ec(e[n]);return t}function ji(e){return Ec(e)}var $y=64;function Ki(e,t=0){if(t>$y)throw new Error("Variable expression exceeds maximum depth");let n=e?.value;if(e?.dataType==="EXPRESSION"&&!n?.expressionValue)throw new Error("Missing variable expression value");if(!n)return;if(n.alias)return{multiplier:1,reference:n.alias};if(typeof n.floatValue=="number"&&Number.isFinite(n.floatValue))return{multiplier:n.floatValue};let r=n.expressionValue;if(r){if(r.expressionFunction==="STRINGIFY")return dN(r);if(r.expressionFunction!=="MULTIPLY"||!r.expressionArguments?.length)throw new Error(`Unsupported variable expression ${r.expressionFunction}`);return pN(r.expressionArguments,t)}}function dN(e){let t=e.expressionArguments??[],n=t.length===1?t[0].value?.alias:void 0;if(!n)throw new Error("Variable expression STRINGIFY must wrap one alias");return{multiplier:1,reference:n}}function pN(e,t){let n={multiplier:1};for(let r of e){let i=Ki(r,t+1);if(!i||n.reference&&i.reference)throw new Error("Variable expression is not a constant multiplied by one alias");n.multiplier*=i.multiplier,i.reference&&(n.reference=i.reference)}if(!Number.isFinite(n.multiplier))throw new Error("Variable expression has a non-finite multiplier");return n}function Bc(e,t,n=0){if(n>$y)throw new Error("Variable expression exceeds maximum depth");e?.value?.alias&&t(e.value.alias);for(let r of e?.value?.expressionValue?.expressionArguments??[])Bc(r,t,n+1)}var Zs={cornerRadius:"CORNER_RADIUS",topLeftRadius:"RECTANGLE_TOP_LEFT_CORNER_RADIUS",topRightRadius:"RECTANGLE_TOP_RIGHT_CORNER_RADIUS",bottomLeftRadius:"RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS",bottomRightRadius:"RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS",strokeWeight:"STROKE_WEIGHT",borderTopWeight:"BORDER_TOP_WEIGHT",borderBottomWeight:"BORDER_BOTTOM_WEIGHT",borderLeftWeight:"BORDER_LEFT_WEIGHT",borderRightWeight:"BORDER_RIGHT_WEIGHT",itemSpacing:"STACK_SPACING",paddingLeft:"STACK_PADDING_LEFT",paddingTop:"STACK_PADDING_TOP",paddingRight:"STACK_PADDING_RIGHT",paddingBottom:"STACK_PADDING_BOTTOM",counterAxisSpacing:"STACK_COUNTER_SPACING",gridRowGap:"GRID_ROW_GAP",gridColumnGap:"GRID_COLUMN_GAP",text:"TEXT_DATA",visible:"VISIBLE",opacity:"OPACITY",width:"WIDTH",height:"HEIGHT",minWidth:"MIN_WIDTH",maxWidth:"MAX_WIDTH",minHeight:"MIN_HEIGHT",maxHeight:"MAX_HEIGHT",x:"X_POSITION",y:"Y_POSITION",rotation:"ROTATION",fontSize:"FONT_SIZE",letterSpacing:"LETTER_SPACING",lineHeight:"LINE_HEIGHT",fontFamily:"FONT_FAMILY"},$n=Object.fromEntries(Object.entries(Zs).map(([e,t])=>[t,e])),Js=.01;function Uc(e){return e==="ALIAS"||e==="EXPRESSION"}function It(e){let t=e.parameterConsumptionMap,n=new Map,r=[];for(let i of[...e.variableConsumptionMap?.entries??[],...t?.entries??[]])i.variableField?n.set(i.variableField,i):r.push(i);return[...r,...n.values()]}function jn(e,t){let n=It(t);if(n.length===0)return{};let r=[];for(let i of[...It(e),...n]){let o=i.variableField?r.findIndex(s=>s.variableField===i.variableField):-1;o<0?r.push(ji(i)):r[o]=ji(i)}return{parameterConsumptionMap:{entries:r}}}function zc(e,t,n,r,i=1,o=!1){let s=Zs[e];if(s)return Yy(s,t,n,r,i,o)}var Hc={fontFamily:"FONT_FAMILY",fontStyle:"FONT_STYLE",fontSize:"FONT_SIZE",letterSpacing:"LETTER_SPACING",lineHeight:"LINE_HEIGHT",paragraphSpacing:"PARAGRAPH_SPACING",paragraphIndent:"PARAGRAPH_INDENT"},mN=_u(Hc);function Xy(e,t,n){return Object.entries(e).flatMap(([r,i])=>{let o=Hc[r];return!o||!i||!t.variables.has(i)?[]:[Yy(o,i,t,n)]})}function Ky(e){let t={};for(let n of It(e)){let r=n.variableField&&mN[n.variableField],i=r?Ki(n.variableData)?.reference?.guid:void 0;r&&i&&(t[r]=ie(i))}return t}function Wc(e,t,n){let r=e.variables.get(t);return r?.key?{assetRef:{key:r.key,...r.version?{version:r.version}:{}}}:{guid:n?.get(t)??lt(t)}}function Yy(e,t,n,r,i=1,o=!1){if(!t)return{variableField:e};let s=n.variables.get(t);if(!s)throw new Error(`Missing bound variable ${t}`);if(!Number.isFinite(i))throw new Error("Non-finite variable binding multiplier");let a={dataType:"ALIAS",resolvedDataType:s.type,value:{alias:Wc(n,t,r)}};return e==="TEXT_DATA"&&s.type!=="STRING"?{variableField:e,variableData:{dataType:"EXPRESSION",resolvedDataType:"STRING",value:{expressionValue:{expressionFunction:"STRINGIFY",expressionArguments:[a]}}}}:s.type!=="FLOAT"||!o&&i===1?{variableField:e,variableData:a}:{variableField:e,variableData:{dataType:"EXPRESSION",resolvedDataType:"FLOAT",value:{expressionValue:{expressionFunction:"MULTIPLY",expressionArguments:[{dataType:"FLOAT",resolvedDataType:"FLOAT",value:{floatValue:i}},a]}}}}}function qy(e,t){return e==="opacity"?Js:e==="rotation"?1:t}function Zy(e,t,n,r,i){let o=qy(e,n.componentScale),s=t.variableBindingScales[e]===void 0?1:t.variableBindingScales[e]/o;return zc(e,t.boundVariables[e],r,i,s)}function Jy(e,t,n){let r=new Set(Object.keys(e.boundVariables));for(let i of It(Je(e))){if(!Uc(i.variableData?.dataType))continue;let o=i.variableField&&$n[i.variableField];o&&r.add(o)}return[...r].flatMap(i=>{let o=(e.variableBindingScales[i]??1)/(i==="opacity"?Js:1),s=zc(i,e.boundVariables[i],t,n,o,e.type==="INSTANCE"&&e.componentScale!==1);return s?[s]:[]})}function jc(e){let t=e.variableField?$n[e.variableField]:void 0;if(!t)return;let n=Ki(e.variableData);if(e.variableData?.value?.expressionValue&&!n?.reference)throw new Error("Variable expression must contain one alias");let r=n?.reference?.guid;return r?{field:t,variableId:ie(r),multiplier:n.multiplier}:void 0}function Qy(e){let t={};for(let n of It(e)){let r=jc(n);r&&tn(r.field)&&(t[r.field]=r.multiplier*(r.field==="opacity"?Js:1))}return t}function Qs(e=1){return e===1?{}:Object.fromEntries(Object.entries(Mr(Zs,e)).filter(([,t])=>t!==1))}function Mr(e,t,n={}){let r={};for(let i of Object.keys(e))tn(i)&&(r[i]=n[i]??qy(i,t));return r}function $c(e,t){return e==="opacity"?{opacity:Math.max(0,Math.min(1,t*Js))}:tn(e)?{[e]:t}:void 0}var{boundVariables:hN,exportSettings:Ac,librarySource:e0,textPathBox:t0}=Ze,gN={PNG:"png",JPEG:"jpg",SVG:"svg",PDF:"pdf"};function ut(e,t){return t.decode(e.pluginData?.find(n=>n.pluginID===yi&&n.key===t.key)?.value)}function n0(e){e.exportSettings.length!==0&&(!tu(e.pluginData,Ac)&&Array.isArray(jy(e,"exportSettings"))||(e.pluginData=en(e.pluginData,Ac,e.exportSettings)))}function r0(e){e.textPathBox&&(e.pluginData=en(e.pluginData,t0,e.textPathBox))}function i0(e){return ut(e,t0)??null}function o0(e){let t=ut(e,hN)??{};for(let n of It(e)){let r=jc(n);if(r)t[r.field]=r.variableId;else if(n.variableField&&!Uc(n.variableData?.dataType)){let i=$n[n.variableField];i&&(t=vt(t,[i]))}}return e.fillPaints?.forEach((n,r)=>{let i=n.colorVar?.value?.alias?.guid;i&&(t[`fills/${r}/color`]=ie(i))}),e.strokePaints?.forEach((n,r)=>{let i=n.colorVar?.value?.alias?.guid;i&&(t[`strokes/${r}/color`]=ie(i))}),t}function yN(e){return typeof e=="string"?gN[e]??null:e===0?"png":e===1?"jpg":e===2?"svg":e===3?"pdf":null}function vN(e){if(!e||typeof e!="object"||Array.isArray(e))return 1;let t=e.type;if(t!=="CONTENT_SCALE"&&t!==0)return 1;let n=e.value;return typeof n=="number"&&Number.isFinite(n)?ss(n):1}function s0(e){let t=ut(e,Ac);return t||(e.exportSettings??[]).flatMap(n=>{if(!n||typeof n!="object"||Array.isArray(n))return[];let r=yN(n.imageType);return r?[{scale:vN(n.constraint),format:r}]:[]})}function Yi(e){return(e.pluginData??[]).map(t=>({pluginId:t.pluginID,key:t.key,value:t.value}))}function a0(e){return ut(e,e0)??null}function l0(e){e.pluginData=en(e.pluginData,e0,e.librarySource??void 0)}function u0(e){return(e.pluginRelaunchData??[]).map(t=>({pluginId:t.pluginID,command:t.command,message:t.message,isDeleted:t.isDeleted}))}function c0(e){return e.map(t=>({pluginID:t.pluginId,key:t.key,value:t.value}))}function f0(e){return e.map(t=>({pluginID:t.pluginId,command:t.command,message:t.message,isDeleted:t.isDeleted}))}var IN=["fontSize","fontName","lineHeight","letterSpacing","textDecoration","textCase"];function $i(e,t,n){if(t?.guid)return e.get(ie(t.guid));if(!t?.assetRef||!n)return;let{key:r,version:i}=t.assetRef,o=(i?n.get(`${r}@${i}`):void 0)??n.get(r);return o?e.get(o):void 0}function TN(e,t,n){let r=$i(e,t.styleIdForFill,n);r?.styleType==="FILL"&&r.fillPaints&&(t.fillPaints=r.fillPaints);let i=$i(e,t.styleIdForStrokeFill,n);i?.styleType==="FILL"&&i.fillPaints&&(t.strokePaints=i.fillPaints)}function SN(e,t,n){let r=$i(e,t.styleIdForEffect,n);r?.styleType==="EFFECT"&&r.effects&&(t.effects=r.effects);let i=$i(e,t.styleIdForGrid,n);i?.styleType==="GRID"&&i.layoutGrids&&(t.layoutGrids=i.layoutGrids)}function bN(e,t,n){let r=$i(e,t.styleIdForText,n);if(!(r?.type!=="TEXT"||r.styleType!=="TEXT"))for(let i of IN)i==="textDecoration"?t.textDecoration=r.textDecoration:r[i]!==void 0&&Object.assign(t,{[i]:r[i]})}function Xc(e,t,n){TN(e,t,n),SN(e,t,n),bN(e,t,n)}function xn(e){if(!e||typeof e!="object"||!("guid"in e))return null;let t=e.guid;return!t||typeof t!="object"||zn(t)?null:ie(t)}function Kc(e){switch(e){case"UNDERLINE":return"UNDERLINE";case"STRIKETHROUGH":return"STRIKETHROUGH";default:return"NONE"}}var Xi={value:100,units:"PERCENT"};function Yc(e){return e?.units===Xi.units&&e.value===Xi.value}function qc(e,t){return!e||Yc(e)?null:e.units==="PIXELS"?e.value:e.units==="PERCENT"?e.value/100*(t??14):e.units==="RAW"?e.value*(t??14):null}function Zc(e,t){return e?e.units==="PIXELS"?e.value:e.units==="PERCENT"?e.value/100*(t??14):e.value:0}var EN=new Set(["ORIGINAL","UPPER","LOWER","TITLE"]);function Jc(e){if(!e||typeof e!="object")return;let t=e;if(typeof t.url=="string"&&t.url!=="")return{type:"URL",value:t.url};if(t.guid&&!zn(t.guid))return{type:"NODE",value:ie(t.guid)}}function AN(e,t,n){EN.has(t.textCase)&&(e.textCase=t.textCase);let r=Jc(t.hyperlink);r&&(e.hyperlink=r);for(let[o,s]of[["textStyleId","styleIdForText"],["fillStyleId","styleIdForFill"]]){if(t[s]===void 0)continue;let a=xn(t[s]);a!==xn(n[s])&&(e[o]=a)}let i=Ky(t);Ii(i)||(e.boundVariables=i)}function xN(e,t){let n=t.textDecoration;if(n&&(e.textDecoration=Kc(n)),t.textDecorationStyle&&(e.textDecorationStyle=t.textDecorationStyle),t.textDecorationThickness&&(e.textDecorationThickness=t.textDecorationThickness.value??null),t.textDecorationSkipInk!==void 0&&(e.textDecorationSkipInk=t.textDecorationSkipInk),t.textUnderlineOffset&&(e.textUnderlineOffset=t.textUnderlineOffset.value??null),t.textDecorationFillPaints){let r=Dr(t.textDecorationFillPaints);r.length>0&&(e.textDecorationFills=r)}}function NN(e,t){let n=t.fontSize,r={};e.fontName&&(r.fontFamily=e.fontName.family,r.fontWeight=ks(e.fontName.style),r.italic=e.fontName.style.toLowerCase().includes("italic")),e.fontSize!==void 0&&(r.fontSize=e.fontSize);let i=_c(e);i.length>0&&(r.fontVariations=i);let o=wc(e);if(o.length>0&&(r.fontFeatures=o),e.letterSpacing&&(r.letterSpacing=Zc(e.letterSpacing,e.fontSize??n)),e.lineHeight&&(r.lineHeight=qc(e.lineHeight,e.fontSize??n)),xN(r,e),e.fillPaints){let s=Dr(e.fillPaints);s.length>0&&(r.fills=s)}return AN(r,e,t),r}function CN(e,t){let n=new Map;for(let r of e){let i=r.styleID;if(i===void 0||i===0)continue;let o=NN(r,t);Object.keys(o).length>0&&n.set(i,o)}return n}function ON(e,t){let n=[],r=e[0],i=0;for(let o=1;o<=e.length;o++)if(o===e.length||e[o]!==r){let s=t.get(r);s&&n.push({start:i,length:o-i,style:s}),o<e.length&&(r=e[o],i=o)}return n}function RN(e,t,n,r){for(let i of n.values())i.hyperlink??(i.hyperlink=r);return n.set(0,{hyperlink:r}),Array.from({length:t},(i,o)=>e[o]??0)}function d0(e){let t=e.textData,n=Jc(e.hyperlink),r=t?.characters.length??0,i=CN(t?.styleOverrideTable??[],e),o=n?RN(t?.characterStyleIDs??[],r,i,n):t?.characterStyleIDs??[];return o.length===0||i.size===0?[]:ON(o,i)}var DN={NONE:"PLAIN",ORDERED:"ORDERED_LIST",UNORDERED:"UNORDERED_LIST"};function MN(e){return e.lineType==="ORDERED_LIST"?"ORDERED":e.lineType==="UNORDERED_LIST"?"UNORDERED":"NONE"}function PN(e,t=[]){if(!e)return[];let n=new Map(t.map(i=>[i.styleID,i])),r=e.map(i=>{let o={listType:MN(i),indentation:i.indentationLevel??0};o.listType!=="NONE"&&(o=Ou(o,o.indentation));let s=i.styleId?n.get(i.styleId):void 0;for(let a of Nr){let l=s?.[a];l!==void 0&&(o=xu(o,a,l))}return o});return Cu(r,r.length)}function wN(e,t=1){let n=new Set(Qu(e.text,e.textParagraphs).filter(s=>s.startsList).map(s=>s.paragraph)),r=[],i=new Map,o=s=>{let a={};for(let c of Nr){let f=s[c];f!==void 0&&(a[c]=f)}if(Ii(a))return 0;let l=JSON.stringify(a),u=i.get(l);return u===void 0&&(u=t+r.length,i.set(l,u),r.push({styleID:u,...a})),u};return{lines:xr(e.text).map((s,a)=>{let l=Mi(e.textParagraphs,a);return{lineType:DN[l.listType],styleId:o(l),indentationLevel:l.indentation,sourceDirectionality:"AUTO",listStartOffset:0,isFirstLineOfList:n.has(a)}}),overrides:r}}function Qc(e,t){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),r=0,i=n.getUint32(r,!0);r+=4;let o=n.getUint32(r,!0);r+=4;let s=n.getUint32(r,!0);r+=4;let a=new Map;for(let f of t??[])a.set(f.styleID,f);let l=[];for(let f=0;f<i;f++){let g=n.getUint32(r,!0);r+=4;let h=n.getFloat32(r,!0);r+=4;let d=n.getFloat32(r,!0);r+=4;let v=a.get(g),T={x:h,y:d,handleMirroring:v?.handleMirroring??"NONE"};v?.strokeCap&&(T.strokeCap=v.strokeCap),v?.strokeJoin&&(T.strokeJoin=v.strokeJoin),v?.cornerRadius!==void 0&&(T.cornerRadius=v.cornerRadius),l.push(T)}let u=[];for(let f=0;f<o;f++){r+=4;let g=n.getUint32(r,!0);r+=4;let h=n.getFloat32(r,!0);r+=4;let d=n.getFloat32(r,!0);r+=4;let v=n.getUint32(r,!0);r+=4;let T=n.getFloat32(r,!0);r+=4;let E=n.getFloat32(r,!0);r+=4,u.push({start:g,end:v,tangentStart:{x:h,y:d},tangentEnd:{x:T,y:E}})}let c=[];for(let f=0;f<s;f++){let g=(n.getUint32(r,!0)&1)===1?"NONZERO":"EVENODD";r+=4;let h=n.getUint32(r,!0);r+=4;let d=[];for(let v=0;v<h;v++){let T=n.getUint32(r,!0);r+=4;let E=[];for(let S=0;S<T;S++)E.push(n.getUint32(r,!0)),r+=4;d.push(E)}c.push({windingRule:g,loops:d})}return{vertices:l,segments:u,regions:c}}function p0(e){return[e.handleMirroring??"NONE",e.strokeCap??"",e.strokeJoin??"",e.cornerRadius??""].join("|")}function m0(e){let t=new Map,n=[],r=1;for(let i of e.vertices){let o=i.handleMirroring??"NONE";if(o==="NONE"&&!i.strokeCap&&!i.strokeJoin&&i.cornerRadius===void 0)continue;let s=p0(i);if(t.has(s))continue;t.set(s,r);let a={styleID:r};o!=="NONE"&&(a.handleMirroring=o),i.strokeCap&&(a.strokeCap=i.strokeCap),i.strokeJoin&&(a.strokeJoin=i.strokeJoin),i.cornerRadius!==void 0&&(a.cornerRadius=i.cornerRadius),n.push(a),r++}return{table:n,styleToId:t}}function h0(e,t){let n=0;for(let s of e.regions){n+=8;for(let a of s.loops)n+=4+a.length*4}let r=new ArrayBuffer(12+e.vertices.length*12+e.segments.length*28+n),i=new DataView(r),o=0;i.setUint32(o,e.vertices.length,!0),o+=4,i.setUint32(o,e.segments.length,!0),o+=4,i.setUint32(o,e.regions.length,!0),o+=4;for(let s of e.vertices)i.setUint32(o,t?.get(p0(s))??0,!0),o+=4,i.setFloat32(o,s.x,!0),o+=4,i.setFloat32(o,s.y,!0),o+=4;for(let s of e.segments)i.setUint32(o,0,!0),o+=4,i.setUint32(o,s.start,!0),o+=4,i.setFloat32(o,s.tangentStart.x,!0),o+=4,i.setFloat32(o,s.tangentStart.y,!0),o+=4,i.setUint32(o,s.end,!0),o+=4,i.setFloat32(o,s.tangentEnd.x,!0),o+=4,i.setFloat32(o,s.tangentEnd.y,!0),o+=4;for(let s of e.regions){i.setUint32(o,s.windingRule==="EVENODD"?0:1,!0),o+=4,i.setUint32(o,s.loops.length,!0),o+=4;for(let a of s.loops){i.setUint32(o,a.length,!0),o+=4;for(let l of a)i.setUint32(o,l,!0),o+=4}}return new Uint8Array(r)}function Ws(e){return e==="EVENODD"?"ODD":"NONZERO"}function g0(e){return e==="ODD"||e==="EVENODD"?"EVENODD":"NONZERO"}function y0(e,t){let n=t?.regions??[];return e.length===n.length?e.map((r,i)=>({...r,windingRule:n[i].windingRule})):e.length===1&&n.length>0&&n.every(r=>r.windingRule===n[0].windingRule)?[{...e[0],windingRule:n[0].windingRule}]:e}function v0(e,t){let n=e.vectorData;if(n?.vectorNetworkBlob===void 0)return null;let r=n.vectorNetworkBlob;if(r<0||r>=t.length)return null;try{let i=Qc(t[r],n.styleOverrideTable),o=n.normalizedSize,s=e.size?.x??0,a=e.size?.y??0,l=o&&o.x>0&&s>0?s/o.x:1,u=o&&o.y>0&&a>0?a/o.y:1;if(l!==1||u!==1){for(let c of i.vertices)c.x*=l,c.y*=u;for(let c of i.segments)c.tangentStart={x:c.tangentStart.x*l,y:c.tangentStart.y*u},c.tangentEnd={x:c.tangentEnd.x*l,y:c.tangentEnd.y*u}}return i}catch{return null}}function I0(e){let t=new Map;for(let n of e??[])n.fillPaints&&n.fillPaints.length>0&&t.set(n.styleID,Dr(n.fillPaints));return t}function T0(e){let t=e.vectorData;return I0(t?.styleOverrideTable)}function xc(e,t,n){if(!e||e.length===0)return[];let r=[];for(let i of e){if(i.commandsBlob===void 0||i.commandsBlob<0||i.commandsBlob>=t.length)continue;let o=t[i.commandsBlob];if(o.length===0)continue;let s=i.styleID?n?.get(i.styleID):void 0;r.push({windingRule:g0(i.windingRule),commandsBlob:o,fills:s&&s.length>0?Nt(s):void 0})}return r}function kN(e){let t={},n=e.variableModeBySetMap;for(let r of n?.entries??[]){let i=r.variableSetID?.guid,o=r.variableModeID;!i||!o||(t[ie(i)]=ie(o))}return t}var _N={DOCUMENT:"DOCUMENT",VARIABLE:"VARIABLE",CANVAS:"CANVAS",FRAME:"FRAME",RECTANGLE:"RECTANGLE",ROUNDED_RECTANGLE:"ROUNDED_RECTANGLE",ELLIPSE:"ELLIPSE",TEXT:"TEXT",LINE:"LINE",STAR:"STAR",REGULAR_POLYGON:"POLYGON",VECTOR:"VECTOR",BOOLEAN_OPERATION:"BOOLEAN_OPERATION",GROUP:"GROUP",SECTION:"SECTION",COMPONENT:"COMPONENT",COMPONENT_SET:"COMPONENT_SET",INSTANCE:"INSTANCE",SYMBOL:"COMPONENT",CONNECTOR:"CONNECTOR",SHAPE_WITH_TEXT:"SHAPE_WITH_TEXT",TEXT_PATH:"TEXT"};function LN(e){return e?_N[e]??"RECTANGLE":"RECTANGLE"}function VN(e){if(e.type!=="BOOLEAN_OPERATION")return;let t=e.booleanOperation;switch(t){case"SUBTRACT":case"INTERSECT":return t;case"EXCLUDE":case"XOR":return"EXCLUDE";default:return"UNION"}}function FN(e){switch(e){case"HORIZONTAL":return"HORIZONTAL";case"VERTICAL":return"VERTICAL";default:return"NONE"}}function Nc(e){switch(e){case"RESIZE_TO_FIT":case"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":return"HUG";default:return"FIXED"}}function S0(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"SPACE_BETWEEN":case"SPACE_EVENLY":return"SPACE_BETWEEN";default:return"MIN"}}function b0(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"BASELINE":return"BASELINE";default:return"MIN"}}function E0(e){switch(e){case"MIN":return"MIN";case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"BASELINE":return"BASELINE";default:return"AUTO"}}function gy(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"SCALE":return"SCALE";default:return"MIN"}}function A0(e){return e?{startingAngle:e.startingAngle??0,endingAngle:e.endingAngle??2*Math.PI,innerRadius:e.innerRadius??0}:null}function x0(e){let t=e.size?.x??100,n=e.size?.y??100,r=e.transform?.m02??0,i=e.transform?.m12??0,o=0,s=!1;if(e.transform){let a=e.transform;a.m00*a.m11-a.m01*a.m10<0&&(s=!0),o=Math.atan2(a.m10,s?a.m11:a.m00)*(180/Math.PI);let l=o*Math.PI/180,u=Math.cos(l),c=Math.sin(l),f=t/2,g=n/2,h=s?-u:u,d=s?c:-c,v=c,T=u;r=a.m02-f+h*f+d*g,i=a.m12-g+v*f+T*g}return{x:r,y:i,width:t,height:n,rotation:o,flipX:s,flipY:!1}}function GN(e){return{cornerRadius:e.cornerRadius??0,topLeftRadius:e.rectangleTopLeftCornerRadius??e.cornerRadius??0,topRightRadius:e.rectangleTopRightCornerRadius??e.cornerRadius??0,bottomRightRadius:e.rectangleBottomRightCornerRadius??e.cornerRadius??0,bottomLeftRadius:e.rectangleBottomLeftCornerRadius??e.cornerRadius??0,independentCorners:e.rectangleCornerRadiiIndependent??!1,cornerSmoothing:e.cornerSmoothing??0}}function BN(e){let t={};return e.count!==void 0&&(t.pointCount=Ps(e.count,tc.min,tc.max)),e.starInnerScale!==void 0&&Number.isFinite(e.starInnerScale)&&(t.starInnerRadius=Ps(e.starInnerScale,0,1)),t}function UN(e){if(!e.lineHeight||Yc(e.lineHeight))return null;let t=e.derivedTextData?.baselines?.[0]?.lineHeight;return e.lineHeight.units==="PIXELS"&&t!==void 0&&Number.isFinite(t)&&t<e.lineHeight.value?t:qc(e.lineHeight,e.fontSize)}function zN(e){return{textDecoration:Kc(e.textDecoration),textDecorationStyle:e.textDecorationStyle??"SOLID",textDecorationThickness:e.textDecorationThickness?.value??null,textDecorationFills:Dr(e.textDecorationFillPaints),textDecorationSkipInk:e.textDecorationSkipInk??!0,textUnderlineOffset:e.textUnderlineOffset?.value??null}}function HN(e){return{textParagraphs:PN(e.textData?.lines,e.textData?.styleOverrideTable),listSpacing:e.listSpacing??0,paragraphSpacing:e.paragraphSpacing??0,paragraphIndent:e.paragraphIndent??0,hangingList:e.hangingList??!1}}function WN(e,t){return{text:e.textData?.characters??"",fontSize:e.fontSize??14,fontFamily:e.fontName?.family??vr,fontWeight:ks(e.fontName?.style??""),italic:e.fontName?.style.toLowerCase().includes("italic")??!1,textAlignHorizontal:e.textAlignHorizontal??"LEFT",textAlignVertical:e.textAlignVertical??"TOP",textAutoResize:e.textAutoResize??"NONE",textCase:e.textCase??"ORIGINAL",...zN(e),leadingTrim:e.leadingTrim??"NONE",lineHeight:UN(e),letterSpacing:Zc(e.letterSpacing,e.fontSize),maxLines:e.maxLines??null,...HN(e),styleRuns:d0(e),fontVariations:_c(e),fontFeatures:wc(e),textTruncation:e.textTruncation==="ENDING"?"ENDING":"DISABLED",textDirection:ut(e,Ze.textDirection)??"AUTO",...jN(e,t)}}function jN(e,t){let n=e.derivedTextData?.layoutSize;return{derivedLayout:n?{width:n.x,height:n.y}:null,derivedTextGlyphs:Ly(e.derivedTextData,t,e.textData?.characters??"")}}function $N(e){let t=e.stackPadding??0;return{paddingTop:e.stackVerticalPadding??t,paddingBottom:e.stackPaddingBottom??t,paddingLeft:e.stackHorizontalPadding??t,paddingRight:e.stackPaddingRight??t}}function XN(e,t,n,r){let i=n==="HUG"||r==="HUG",o=(e.fillPaints?.some(s=>s.visible!==!1)??!1)||(e.strokePaints?.some(s=>s.visible!==!1)??!1);if(!(t==="NONE"||!i||!o))return{x:e.transform?.m02??0,y:e.transform?.m12??0,width:e.size?.x??100,height:e.size?.y??100}}function yy(e,t){let n=e?.value?.[t];return typeof n=="number"&&Number.isFinite(n)&&n>0?n:null}function vy(e,t){let n=e?.value?.[t];return typeof n=="number"&&Number.isFinite(n)&&n>=0?n:null}function KN(e){let t=e.targetAspectRatio?.value;return!t||!Number.isFinite(t.x)||!Number.isFinite(t.y)?null:{x:t.x,y:t.y}}function YN(e){let t=FN(e.stackMode),n=e.stackPrimarySizing===void 0&&(t==="HORIZONTAL"||t==="VERTICAL")?"HUG":Nc(e.stackPrimarySizing),r=Nc(e.stackCounterSizing),i=XN(e,t,n,r);return{layoutMode:t,itemSpacing:e.stackSpacing??0,...$N(e),primaryAxisSizing:n,counterAxisSizing:r,primaryAxisAlign:S0(e.stackPrimaryAlignItems??e.stackJustify),counterAxisAlign:b0(e.stackCounterAlignItems??e.stackCounterAlign),layoutWrap:e.stackWrap==="WRAP"?"WRAP":"NO_WRAP",counterAxisSpacing:e.stackCounterSpacing??0,layoutPositioning:e.stackPositioning==="ABSOLUTE"?"ABSOLUTE":"AUTO",layoutGrow:e.stackChildPrimaryGrow??0,layoutAlignSelf:E0(e.stackChildAlignSelf),counterAxisAlignContent:e.stackCounterAlignContent==="SPACE_BETWEEN"?"SPACE_BETWEEN":"AUTO",itemReverseZIndex:e.stackReverseZIndex??!1,strokesIncludedInLayout:e.strokesIncludedInLayout??!1,layoutDirection:ut(e,Ze.layoutDirection)??"AUTO",...i?{derivedLayout:i}:{}}}function qN(e){return e.strokeCap??"NONE"}function ZN(e,t){return e.strokeJoin??t?.vertices.find(n=>n.strokeJoin)?.strokeJoin??"MITER"}function Iy(e){return e==="FILL"||e==="TEXT"||e==="EFFECT"||e==="GRID"?e:null}function JN(e){return Array.isArray(e)?structuredClone(e):[]}function QN(e,t){if(e.type!=="TEXT_PATH")return null;let n=e.vectorData,r=n?.vectorNetworkBlob,i=n?.normalizedSize;if(typeof r!="number"||!i||i.x<=0||i.y<=0)return null;let o=t[r],s=e.textPathStart;try{return{network:Qc(o,n.styleOverrideTable),normalizedSize:{x:i.x,y:i.y},tValue:s?.tValue??0,forward:s?.forward??!0}}catch{return null}}function eC(e,t){let n=v0(e,t),r=qN(e),i=ZN(e,n);return{vectorNetwork:n,fillGeometry:y0(xc(e.fillGeometry,t,T0(e)),n),strokeGeometry:xc(e.strokeGeometry,t),arcData:A0(e.arcData),strokeCap:r,strokeJoin:i,dashPattern:e.dashPattern??[],borderTopWeight:e.borderTopWeight??0,borderRightWeight:e.borderRightWeight??0,borderBottomWeight:e.borderBottomWeight??0,borderLeftWeight:e.borderLeftWeight??0,independentStrokeWeights:e.borderStrokeWeightsIndependent??!1,strokeMiterLimit:e.miterLimit??di}}function tC(e){let t=LN(e.type);return t==="FRAME"&&cC(e)||ut(e,Ze.nodeType)==="COMPONENT_SET"?"COMPONENT_SET":t==="FRAME"&&e.resizeToFit===!0&&(e.stackMode===void 0||e.stackMode==="NONE")?"GROUP":t}function qi(e,t,n="source"){let r=tC(e),i=eC(e,t),o=QN(e,t),s={nodeType:r,name:e.name??r,source:n==="source"?dC(e,t):fC(e),...x0(e),opacity:e.opacity??1,visible:e.visible??!0,locked:e.locked??!1,internalOnly:e.internalOnly===!0||Iy(e.styleType)!==null,blendMode:e.blendMode??"PASS_THROUGH",booleanOperation:VN(e),fills:Dr(e.fillPaints),strokes:Hy(e.strokePaints,e.strokeWeight,e.strokeAlign,i.strokeCap,i.strokeJoin,e.dashPattern??[]),strokeWeight:e.strokeWeight??Mn,strokeAlign:Fc(e.strokeAlign),effects:Wy(e.effects),layoutGrids:JN(e.layoutGrids),guides:ky(e.guides),fillStyleId:xn(e.styleIdForFill),strokeStyleId:xn(e.styleIdForStrokeFill),textStyleId:xn(e.styleIdForText),effectStyleId:xn(e.styleIdForEffect),gridStyleId:xn(e.styleIdForGrid),sharedStyleType:Iy(e.styleType),...GN(e),...BN(e),...WN(e,t),horizontalConstraint:gy(e.horizontalConstraint),verticalConstraint:gy(e.verticalConstraint),...YN(e),...i,minWidth:yy(e.minSize,"x"),maxWidth:vy(e.maxSize,"x"),minHeight:yy(e.minSize,"y"),maxHeight:vy(e.maxSize,"y"),targetAspectRatio:KN(e),isMask:e.mask??!1,maskType:e.maskType??"ALPHA",maskIsOutline:e.maskIsOutline??!1,expanded:!0,autoRename:e.autoRename??!0,boundVariables:o0(e),variableAssignmentScales:Qs(),variableBindingScales:Qy(e),variableModes:kN(e),exportSettings:s0(e),pluginData:Yi(e),librarySource:a0(e),pluginRelaunchData:u0(e),clipsContent:e.frameMaskDisabled===!1&&e.resizeToFit!==!0,componentId:hC(e),componentPropertyDefinitions:r==="INSTANCE"?[]:C0(e),componentPropertyReferences:iC(e),componentPropertyAssignments:sC(e),componentPropertyValues:aC(e),...uC(e)};aN(s,o);let a=i0(e);return a&&s.textPathBox&&(s.textPathBox={x:a.x+s.textPathBox.x,y:a.y+s.textPathBox.y,width:a.width,height:a.height}),s}var nC={VARIANT:"VARIANT",TEXT:"TEXT",BOOL:"BOOLEAN",BOOLEAN:"BOOLEAN",INSTANCE_SWAP:"INSTANCE_SWAP",SLOT:"SLOT"};function N0(e){if(!e||typeof e!="object")return"";let t=e;return typeof t.boolValue=="boolean"?String(t.boolValue):typeof t.textValue=="string"?t.textValue:t.textValue&&typeof t.textValue=="object"?t.textValue.characters??"":t.guidValue?ie(t.guidValue):""}function rC(e){let t={allowPreferredValuesOnly:e.allowPreferredValuesOnly??!1,displayEmptyByDefault:e.displayByDefault??!1,stretchChildOnInsert:e.stretchChildOnInsert??!1};return e.minChildren!==void 0&&(t.minChildren=e.minChildren),e.maxChildren!==void 0&&(t.maxChildren=e.maxChildren),t}function C0(e){let t=e.componentPropDefs;if(!t?.length)return[];let n=[];for(let r of t){if(!r.id||!r.name)continue;let i=nC[r.type??""]??"VARIANT",o={id:ie(r.id),name:r.name,type:i,defaultValue:N0(r.initialValue),variantOptions:i==="VARIANT"?r.preferredValues?.stringValues:void 0,preferredValues:i==="INSTANCE_SWAP"||i==="SLOT"?r.preferredValues?.instanceSwapValues?.map(s=>s.key).filter(s=>s!==void 0):void 0};r.description&&(o.description=r.description),i==="SLOT"&&r.slotPropConfig&&(o.slotSettings=rC(r.slotPropConfig)),n.push(o)}return n}function iC(e){let t=e.componentPropRefs;if(!t?.length)return[];let n={0:"VISIBLE",1:"TEXT",2:"INSTANCE_SWAP",4:"SLOT_CONTENT",VISIBLE:"VISIBLE",TEXT_DATA:"TEXT",OVERRIDDEN_SYMBOL_ID:"INSTANCE_SWAP",SLOT_CONTENT_ID:"SLOT_CONTENT"};return t.flatMap(r=>{let i=n[String(r.componentPropNodeField)];return r.defID&&i&&!r.isDeleted?[{propertyId:ie(r.defID),field:i}]:[]})}function oC(e){if(e.value&&(e.value.boolValue!==void 0||e.value.textValue!==void 0||e.value.guidValue!==void 0))return N0(e.value);let t=e.varValue?.value;return t?.symbolIdValue?.guid?ie(t.symbolIdValue.guid):t?.boolValue!==void 0?String(t.boolValue):t?.textValue!==void 0?t.textValue:t?.textDataValue?.characters??""}function sC(e){let t=e.componentPropAssignments;return t?.length?Object.fromEntries(t.flatMap(n=>n.defID?[[ie(n.defID),oC(n)]]:[])):{}}function O0(e){let t=e.variantPropSpecs;return t?.length?t.filter(n=>!!n.propDefId).map(n=>({propDefId:ie(n.propDefId),value:n.value??""})):[]}function aC(e){let t=O0(e),n=new Map(C0(e).map(i=>[i.id,i.name]));if(t.length>0&&n.size>0){let i={};for(let o of t)i[n.get(o.propDefId)??o.propDefId]=o.value;return i}let r=e.name;return r?.includes("=")?Xg(r):{}}function Ty(e){if(!e||typeof e!="object")return null;let t=e;if(typeof t.sessionID!="number"||typeof t.localID!="number")return null;let n={sessionID:t.sessionID,localID:t.localID};return zn(n)?null:ie(n)}function zs(e){return typeof e=="string"?e:null}function lC(e){return typeof e=="string"?e:""}function Tc(e){return typeof e=="boolean"?e:!1}function uC(e){let t=e.symbolLinks??[];return{componentKey:zs(e.componentKey),sourceLibraryKey:zs(e.sourceLibraryKey),publishId:Ty(e.publishID),overrideKey:Ty(e.overrideKey),sharedSymbolVersion:zs(e.sharedSymbolVersion),publishedVersion:zs(e.publishedVersion),isPublishable:Tc(e.isPublishable),isSymbolPublishable:Tc(e.isSymbolPublishable),isExposedInstance:Tc(e.propsAreBubbled),symbolDescription:lC(e.symbolDescription),symbolLinks:t.filter(n=>typeof n.uri=="string").map(n=>({uri:n.uri,displayName:n.displayName,displayText:n.displayText})),variantPropSpecs:O0(e)}}function cC(e){let t=e.componentPropDefs;return t?.length?t.some(n=>n.type==="VARIANT"):!1}function R0(e){return{stackMode:e.stackMode,stackSpacing:e.stackSpacing,stackPadding:e.stackPadding,stackPaddingRight:e.stackPaddingRight,stackPaddingBottom:e.stackPaddingBottom,stackCounterAlign:e.stackCounterAlign,stackJustify:e.stackJustify,stackCounterAlignItems:e.stackCounterAlignItems,stackPrimaryAlignItems:e.stackPrimaryAlignItems,stackPrimarySizing:e.stackPrimarySizing,stackCounterSizing:e.stackCounterSizing,stackVerticalPadding:e.stackVerticalPadding,stackHorizontalPadding:e.stackHorizontalPadding,stackWrap:e.stackWrap,stackPositioning:e.stackPositioning,stackChildPrimaryGrow:e.stackChildPrimaryGrow,stackChildAlignSelf:e.stackChildAlignSelf,stackCounterSpacing:e.stackCounterSpacing,bordersTakeSpace:e.bordersTakeSpace,stackReverseZIndex:e.stackReverseZIndex}}function fC(e){let t=Sn();return t.fig.layout=R0(e),t}function dC(e,t){return{format:"fig",id:e.guid?ie(e.guid):null,orderKey:e.parentIndex?.position??null,editedFields:[],fig:{...pC(e,t),...mC(e,t),layout:R0(e)}}}function Rr(e,t){if(e instanceof Uint8Array)return e;if(Array.isArray(e))return e.map(r=>Rr(r,t));if(!e||typeof e!="object")return e;let n={};for(let[r,i]of Object.entries(e))if((r==="commandsBlob"||r==="vectorNetworkBlob")&&typeof i=="number"){let o=t[i];o==null?n[r]=i:n[r]={__openPencilFigmaBlob:o instanceof Uint8Array?o:new Uint8Array(Object.values(o))}}else n[r]=Rr(i,t);return n}var D0=["styleIdForFill","styleIdForStrokeFill","styleIdForText","styleIdForEffect","styleIdForGrid","styleType","componentPropAssignments","backgroundPaints","layoutGrids","exportSettings","componentPropDefs","componentPropRefs","variantPropSpecs","stateGroupPropertyValueOrders","isStateGroup","version","sourceLibraryKey","userFacingVersion","description","key","sortPosition","detachedSymbolId","documentColorProfile","variableConsumptionMap","variableModeBySetMap","parameterConsumptionMap","editInfo","backgroundColor","blendMode","pageType","isPageDivider","guides","handoffStatusMap","annotationCategories","miterLimit","mask","maskType","maskIsOutline","strokeWeight","strokeJoin","borderStrokeWeightsIndependent","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight","minSize","maxSize","gridRows","gridColumns","gridRowAnchor","gridColumnAnchor","gridColumnsSizing","gridRowsSizing","gridChildVerticalAlign","gridChildHorizontalAlign","textAutoResize","textAlignHorizontal","textAlignVertical","textData","lineHeight","fontName","fontSize","letterSpacing","textTracking","fontVersion","textUserLayoutVersion","textExplicitLayoutVersion","fontVariations","fontVariantCommonLigatures","fontVariantContextualLigatures","toggledOnOTFeatures","toggledOffOTFeatures","leadingTrim","textDecorationFillPaints","textUnderlineOffset","textDecorationThickness","textDecorationStyle","semanticWeight","semanticItalic","maxLines","textPathStart","derivedTextData","fillPaints","strokePaints","effects","sectionStatusInfo","prototypeStartNodeID","prototypeInteractions","transitionInfo","codeSyntax","lockMode","slideThemeMap","isSoftDeleted","brushType","scatterStrokeSettings","vectorOperationVersion","vectorData","fillGeometry","strokeGeometry"];function pC(e,t){let n={};for(let r of D0){let i=e[r];i!==void 0&&(n[r]=Rr(i,t))}return{rawSize:e.size?{...e.size}:null,rawTransform:e.transform?{...e.transform}:null,rawNodeFields:n}}function mC(e,t){let n=e.symbolData;return{symbolOverrides:Rr(n?.symbolOverrides??[],t),componentPropAssignments:Rr(e.componentPropAssignments??[],t),derivedSymbolData:Rr(e.derivedSymbolData??[],t),derivedSymbolDataLayoutVersion:typeof e.derivedSymbolDataLayoutVersion=="number"?e.derivedSymbolDataLayoutVersion:null,uniformScaleFactor:typeof n?.uniformScaleFactor=="number"?n.uniformScaleFactor:null}}function hC(e){let t=e.symbolData;return t?.symbolID?ie(t.symbolID):""}function ea(e,t=!1){let n=Math.round(e/100)*100,r=ws[n]??"Regular";return t?`${r} Italic`:r}var gC=0,yC=1,vC=2,Sy=4;function IC(e){switch(e){case"M":case"L":return 1+2*Float32Array.BYTES_PER_ELEMENT;case"C":case"Q":return 1+6*Float32Array.BYTES_PER_ELEMENT;case"Z":return 1;default:return 0}}function ta(e,t=1){let n=e.reduce((c,f)=>c+IC(f.type),0),r=new Uint8Array(n),i=new DataView(r.buffer),o=0,s=c=>{i.setFloat32(o,(c??0)/t,!0),o+=Float32Array.BYTES_PER_ELEMENT},a=c=>c===void 0?void 0:-c,l=0,u=0;for(let c of e)switch(c.type){case"M":r[o++]=yC,s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"L":r[o++]=vC,s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"C":r[o++]=Sy,s(c.x1),s(a(c.y1)),s(c.x2),s(a(c.y2)),s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"Q":{let f=c.x1??0,g=c.y1??0,h=c.x??0,d=c.y??0;r[o++]=Sy,s(l+2/3*(f-l)),s(a(u+2/3*(g-u))),s(h+2/3*(f-h)),s(a(d+2/3*(g-d))),s(h),s(a(d)),l=h,u=d;break}case"Z":r[o++]=gC}return r}function M0(e,t,n,r){if(t===1&&n===1)return e;let i=Math.cos(r),o=Math.sin(r),s=t*i*i+n*o*o,a=(n-t)*o*i,l=t*o*o+n*i*i;return Ci(e,s,a,a,l)}function ef(e){let t=Gy(e.axis);return t===void 0?{axisName:e.axis,value:e.value}:{axisTag:t,axisName:e.axis,value:e.value}}function TC(e,t,n){t.textDecoration&&(e.textDecoration=t.textDecoration),t.textDecorationStyle&&(e.textDecorationStyle=t.textDecorationStyle),t.textDecorationThickness!=null&&(e.textDecorationThickness={value:t.textDecorationThickness,units:"PIXELS"}),t.textDecorationSkipInk!==void 0&&(e.textDecorationSkipInk=t.textDecorationSkipInk),t.textUnderlineOffset!=null&&(e.textUnderlineOffset={value:t.textUnderlineOffset,units:"PIXELS"}),t.textDecorationFills&&t.textDecorationFills.length>0&&(e.textDecorationFillPaints=t.textDecorationFills.map(n))}function SC(e,t,n,r){let i={styleID:e},o=t.fontWeight??n.fontWeight,s=t.italic??n.italic;return i.fontName={family:Vi(t.fontFamily??n.fontFamily),style:ea(o,s),postscript:""},t.fontSize!==void 0&&(i.fontSize=t.fontSize),t.fontVariations&&t.fontVariations.length>0&&(i.fontVariations=t.fontVariations.map(ef)),t.fontFeatures&&t.fontFeatures.length>0&&kc(i,t.fontFeatures),t.letterSpacing!==void 0&&(i.letterSpacing={value:t.letterSpacing,units:"PIXELS"}),t.lineHeight!==void 0&&(i.lineHeight=t.lineHeight===null?{...Xi}:{value:t.lineHeight,units:"PIXELS"}),TC(i,t,r),t.textCase&&(i.textCase=t.textCase),t.fills&&t.fills.length>0&&(i.fillPaints=t.fills.map(r)),i}function tf(e){let t=Array.from({length:e.text.length}).fill(0),n=new Map,r=1;for(let i of e.styleRuns){let o=JSON.stringify(i.style),s=n.get(o);s||(s={id:r++,style:i.style},n.set(o,s));for(let a=i.start;a<i.start+i.length&&a<t.length;a++)t[a]=s.id}return{charIds:t,styleMap:n}}function P0(e){return[...tf(e).styleMap.values()]}function w0(e){return tf(e).charIds}function k0(e,t){let{charIds:n,styleMap:r}=tf(e),i=[...r.values()].map(({id:l,style:u})=>SC(l,u,e,t)),o=wN(e,r.size+1),s=[...i,...o.overrides],a={characters:e.text,lines:o.lines};return e.styleRuns.length>0&&(a.characterStyleIDs=n),s.length>0&&(a.styleOverrideTable=s),a}function Cc(e){return{layoutSize:{x:e.node.width,y:e.node.height},baselines:e.baselines,glyphs:e.glyphs,...e.decorations?{decorations:e.decorations}:{},fontMetaData:e.fontMetaData,logicalIndexToCharacterOffsetMap:e.logicalIndexToCharacterOffsetMap,derivedLines:[{directionality:"LTR"}],truncationStartIndex:-1,truncatedHeight:-1}}var bC=[{type:"Z"}];function _0(e,t){let n=Lc(t),r=e.glyphBlobMap.get(n);if(r!==void 0)return r;let i=e.blobs.push(t)-1;return e.glyphBlobMap.set(n,i),i}function EC(e,t){let n=[],r=new Set,i=(o,s,a)=>{let l=Vi(o),u=`${l}|${ec(s,a)}`;r.has(u)||(r.add(u),n.push({key:{family:l,style:ea(s,a),postscript:""},fontLineHeight:1.2,fontDigest:t.get(u),fontStyle:a?"ITALIC":"NORMAL",fontWeight:s}))};i(e.fontFamily,e.fontWeight,e.italic);for(let o of e.styleRuns)i(o.style.fontFamily??e.fontFamily,o.style.fontWeight??e.fontWeight,o.style.italic??e.italic);return n}function AC(e,t){return e.glyphs.map(n=>({commandsBlob:n.commands?_0(t,ta(n.commands.length>0?n.commands:bC,n.fontSize)):void 0,position:{x:n.x,y:n.y},fontSize:n.fontSize,firstCharacter:n.firstCharacter,advance:n.fontSize>0?n.advance/n.fontSize:0,rotation:0}))}function xC(e){return e.some(({glyph:t})=>(t.rotation??0)!==0)?[e]:Object.values(Gn(e,({glyph:t})=>String(t.y))).sort((t,n)=>t[0].glyph.y-n[0].glyph.y)}function L0(e,t){let n=Nu(e)||t.some(r=>r.firstCharacter!==void 0);return t.map((r,i)=>r.firstCharacter??(n?void 0:i))}function NC(e,t,n){let r=t.flatMap(({character:i})=>i===void 0?[]:[i]);return r.length>0?Math.min(...r):n===void 0?0:xr(e.text)[Au(e.text,n)+1]?.start??e.text.length}function CC(e,t){let n=e.lineHeight??Math.ceil(e.fontSize*1.2),r=Array.from({length:e.text.length},()=>0),i=L0(e,t),o=xC(t.map((l,u)=>({glyph:l,character:i[u]}))),s=[],a;for(let l of o){s.push(NC(e,l,a));for(let{character:u}of l)u!==void 0&&(a=Math.max(a??0,u));l.every(({character:u})=>u===void 0)&&(a=s.at(-1))}return{baselines:o.map((l,u)=>{let c=l.filter(({character:g})=>g!==void 0),f=c.length?Math.min(...c.map(({glyph:g})=>g.x)):Math.max(...l.map(({glyph:g})=>g.x+(g.advance??0)));for(let{glyph:g,character:h}of c)h!==void 0&&h<r.length&&(r[h]=g.x-f);return{firstCharacter:s[u],endCharacter:s[u+1]??e.text.length,position:{x:f,y:l[0].glyph.y},width:e.width,lineY:u*n,lineHeight:n,lineAscent:Math.max(n-e.fontSize*.2,0)}}),logicalIndexToCharacterOffsetMap:r}}function OC(e,t){return e.fontSize<=0?0:e.advance!==void 0?e.advance*(e.scaleX??1)/e.fontSize:t?Math.max(t.x-e.x,0)/e.fontSize:0}function RC(e,t,n){let r=L0(e,t);return t.map((i,o)=>{let s=t[o+1],a=o+1<t.length&&s.y===i.y&&(s.rotation??0)===(i.rotation??0);return{commandsBlob:_0(n,M0(i.commandsBlob,i.scaleX??1,i.scaleY??1,i.rotation??0)),position:{x:i.x,y:i.y},fontSize:i.fontSize,firstCharacter:r[o],advance:OC(i,a?s:void 0),rotation:i.rotation??0}})}function by(e,t,n){let r=n.textDecorations(e,t);if(r.length===0)return;let i=w0(e),o=Gn(r,s=>String(i[s.firstCharacter]??0));return Object.entries(o).map(([s,a])=>({rects:a.map(({x:l,y:u,width:c,height:f})=>({x:l,y:u,w:c,h:f})),styleID:Number(s)}))}function DC(e,t){try{return t.shapeText(e)}catch(n){return console.warn(`Writing "${e.name}" without glyphs; text shaping failed:`,n),null}}function V0(e,t){let n=EC(e,t.digestMap),r=e.derivedTextGlyphs??[];if(r.length>0)return Cc({node:e,glyphs:RC(e,r,t),decorations:e.textPathData?void 0:by(e,r,t),fontMetaData:n,...CC(e,r)});let i=e.textPathData?null:DC(e,t);return Cc({node:e,glyphs:i?AC(i,t):[],decorations:i?by(e,i.glyphs,t):void 0,fontMetaData:n,baselines:i?.baselines??[],logicalIndexToCharacterOffsetMap:i?.logicalIndexToCharacterOffsetMap??[]})}function MC(e){let t=new Map;for(let n of e.getAllNodes()){if(n.sharedStyleType===null||!n.source.id)continue;let r=Je(n);typeof r.key=="string"&&t.set(n.source.id,{assetRef:{key:r.key,...typeof r.version=="string"?{version:r.version}:{}}})}return t}function PC(e,t){if(!e.styleNodeIds){let r=new Map;for(let i of e.graph.getAllNodes())i.sharedStyleType!==null&&i.source.id&&r.set(i.source.id,i.id);e.styleNodeIds=r}let n=e.styleNodeIds.get(t);return(n?e.nodeIdToGuid?.get(n):void 0)??e.nodeIdToGuid?.get(t)??lt(t)}function Ks(e,t){return e.styleReferences??(e.styleReferences=MC(e.graph)),e.styleReferences.get(t)??{guid:PC(e,t)}}var Ey=2147483647;function rn(e){if(!/^\d+:\d+$/.test(e))return null;let t=lt(e);return t.sessionID<=Ey&&t.localID<=Ey?t:null}function wC(e,t){let n=new Set,r=t;for(;!n.has(r);){n.add(r);let i=e.graph.getNode(r);if(i?.type!=="INSTANCE"||!i.componentId)return r;r=i.componentId}return t}function Zi(e,t,n){let r=e.graph.getNode(t);if(!r)return;let i=e.nodeIdToGuid?.get(t);if(i)return i;let o=!r.source.id||!e.recordOwners||e.recordOwners.get(r.source.id)===t,s=r.source.id&&o?rn(r.source.id):null;if(s&&e.assignedGuidValues){let l=`${s.sessionID}:${s.localID}`;if(e.assignedGuidValues.has(l)){let u={sessionID:1,localID:n.value++};return e.nodeIdToGuid?.set(t,u),e.assignedGuidValues.add(`${u.sessionID}:${u.localID}`),u}}let a=s??{sessionID:1,localID:n.value++};return e.nodeIdToGuid?.set(t,a),e.assignedGuidValues?.add(`${a.sessionID}:${a.localID}`),a}function Hi(e,t,n){let r=e.propertyIdToGuid.get(t);if(r)return r;let i=rn(t);if(i)return i;let o={sessionID:1,localID:n.value++};return e.propertyIdToGuid.set(t,o),e.assignedGuidValues?.add(`${o.sessionID}:${o.localID}`),o}function kC(e,t,n){let r=e.graph.getNode(t);for(;r?.parentId;){if(r.parentId===n)return!0;r=e.graph.getNode(r.parentId)}return!1}function nf(e,t,n,r){let i=t.boundVariables[r];if(!i){if(!n.colorVar)return n;let{colorVar:o,...s}=n;return s}return{...n,colorVar:{dataType:"ALIAS",resolvedDataType:"COLOR",value:{alias:Wc(e.graph,i,e.varIdToGuid)}}}}function rf(e,t){return t.fills.map((n,r)=>nf(e,t,e.fillToKiwiPaint(n),`fills/${r}/color`))}function of(e,t){return t.strokes.map((n,r)=>nf(e,t,e.fillToKiwiPaint(n),`strokes/${r}/color`))}function F0(e,t){return n=>{let r=e.graph.getNode(n);return(r?.overrideKey?rn(r.overrideKey):null)??Zi(e,n,t)}}function G0(e,t,n,r){if(n.id===t.id&&t.componentId){let l=r(t.componentId);return l?[l]:void 0}let i=[],o=n.parentId?e.getNode(n.parentId):void 0;for(;o&&o.id!==t.id;)o.type==="INSTANCE"&&i.unshift(o),o=o.parentId?e.getNode(o.parentId):void 0;if(!o)return;let s=[],a=t;for(let l of[...i,n]){let u=_C(e,B0(a,l));if(!u)return;let c=r(u);if(!c)return;s.push(c),a=l}return s}function B0(e,t){let n=Ct(e.instanceOverrides,e.id,t.id,"sourceComponentId");return typeof n=="string"?n:t.componentId}function _C(e,t){let n=new Set,r=t?e.getNode(t):void 0;for(;r;){let i=r.parentId?Vn(e,r.parentId):void 0;if(!i)return r.id;if(n.has(r.id))return;n.add(r.id);let o=B0(i,r);r=o?e.getNode(o):void 0}}function LC(e,t,n,r,i){let o=c=>c.map(f=>`${f.sessionID}:${f.localID}`).join("/"),s=new Map,a=[];for(let c of r){if(!c.guidPath?.guids?.length){a.push(c);continue}let f=o(c.guidPath.guids);s.set(f,{...s.get(f),...c})}let l=new Set,u=c=>{for(let f of e.getChildren(c.id)){let g=G0(e,t,f,n);if(!g)throw new Error(`Missing instance geometry address for ${f.id} under ${t.id}`);let h=o(g);if(l.has(h))throw new Error(`Ambiguous instance geometry address ${h} under ${t.id}`);l.add(h),s.set(h,{...s.get(h),guidPath:{guids:g},...i(f)}),bn(e,f)||u(f)}};return u(t),[...a,...s.values()]}function VC(e,t,n){let r=s=>e.nodeIdToGuid?.get(s)??lt(s),i=n.hyperlink;i&&(t.hyperlink=i.type==="URL"?{url:i.value}:{guid:r(i.value)}),n.textStyleId!==void 0&&(t.styleIdForText=n.textStyleId?Ks(e,n.textStyleId):{guid:{...Un}}),n.fillStyleId!==void 0&&(t.styleIdForFill=n.fillStyleId?Ks(e,n.fillStyleId):{guid:{...Un}});let o=Xy(n.boundVariables??{},e.graph,e.varIdToGuid);o.length>0&&(t.parameterConsumptionMap={entries:o})}function FC(e,t,n){let r=n.styleOverrideTable;if(!r)return;let i=new Map(P0(t).map(({id:o,style:s})=>[o,s]));for(let o of r){let s=i.get(o.styleID);s&&VC(e,o,s)}}var js={guid:{...Un}},Ji={name:{scene:["name"],kind:"scalar"},opacity:{scene:["opacity"],kind:"scalar"},fontSize:{scene:["fontSize"],kind:"scalar",length:!0},visible:{scene:["visible"],kind:"visible"},textData:{scene:["text","styleRuns","textParagraphs"],kind:"text"},styleIdForText:{scene:["textStyleId"],kind:"text-style"},fillPaints:{scene:["fills"],kind:"paint"},strokePaints:{scene:["strokes"],kind:"paint"},size:{scene:["width","height"],kind:"size",length:!0},stackSpacing:{scene:["itemSpacing"],kind:"layout-distance",length:!0},stackCounterSpacing:{scene:["counterAxisSpacing"],kind:"layout-distance",length:!0},stackHorizontalPadding:{scene:["paddingLeft"],kind:"layout-distance",length:!0},stackVerticalPadding:{scene:["paddingTop"],kind:"layout-distance",length:!0},stackPaddingRight:{scene:["paddingRight"],kind:"layout-distance",length:!0},stackPaddingBottom:{scene:["paddingBottom"],kind:"layout-distance",length:!0},textAutoResize:{scene:["textAutoResize"],kind:"layout-mode"},stackChildPrimaryGrow:{scene:["layoutGrow"],kind:"layout-mode"},stackPrimarySizing:{scene:["primaryAxisSizing"],kind:"layout-mode"},stackCounterSizing:{scene:["counterAxisSizing"],kind:"layout-mode"},stackChildAlignSelf:{scene:["layoutAlignSelf"],kind:"layout-mode"},cornerRadius:{scene:["cornerRadius"],kind:"node",length:!0,absent:0},rectangleTopLeftCornerRadius:{scene:["topLeftRadius"],kind:"node",length:!0,absent:0},rectangleTopRightCornerRadius:{scene:["topRightRadius"],kind:"node",length:!0,absent:0},rectangleBottomRightCornerRadius:{scene:["bottomRightRadius"],kind:"node",length:!0,absent:0},rectangleBottomLeftCornerRadius:{scene:["bottomLeftRadius"],kind:"node",length:!0,absent:0},rectangleCornerRadiiIndependent:{scene:["independentCorners"],kind:"node",absent:!1},cornerSmoothing:{scene:["cornerSmoothing"],kind:"node",absent:0},strokeWeight:{scene:["strokeWeight"],kind:"node",length:!0},strokeAlign:{scene:["strokeAlign"],kind:"node",absent:"CENTER"},borderTopWeight:{scene:["borderTopWeight"],kind:"node",length:!0},borderRightWeight:{scene:["borderRightWeight"],kind:"node",length:!0},borderBottomWeight:{scene:["borderBottomWeight"],kind:"node",length:!0},borderLeftWeight:{scene:["borderLeftWeight"],kind:"node",length:!0},borderStrokeWeightsIndependent:{scene:["independentStrokeWeights"],kind:"node",absent:!1},strokeCap:{scene:["strokeCap"],kind:"node",absent:"NONE"},strokeJoin:{scene:["strokeJoin"],kind:"node",absent:"MITER"},miterLimit:{scene:["strokeMiterLimit"],kind:"node"},dashPattern:{scene:["dashPattern"],kind:"node",length:!0,absent:[]},blendMode:{scene:["blendMode"],kind:"node",absent:"PASS_THROUGH"},effects:{scene:["effects"],kind:"node",absent:[]},locked:{scene:["locked"],kind:"node",absent:!1},layoutGrids:{scene:["layoutGrids"],kind:"node",absent:[]},styleIdForFill:{scene:["fillStyleId"],kind:"node",absent:js},styleIdForStrokeFill:{scene:["strokeStyleId"],kind:"node",absent:js},styleIdForEffect:{scene:["effectStyleId"],kind:"node",absent:js},stackPrimaryAlignItems:{scene:["primaryAxisAlign"],kind:"node"},stackCounterAlignItems:{scene:["counterAxisAlign"],kind:"node"},stackPositioning:{scene:["layoutPositioning"],kind:"node"},fontName:{scene:["fontFamily","fontWeight","italic"],kind:"node"},fontVariations:{scene:["fontVariations"],kind:"node",absent:[]},lineHeight:{scene:["lineHeight"],kind:"node",absent:{value:100,units:"PERCENT"}},letterSpacing:{scene:["letterSpacing"],kind:"node"},paragraphSpacing:{scene:["paragraphSpacing"],kind:"node",length:!0,absent:0},textCase:{scene:["textCase"],kind:"node",absent:"ORIGINAL"},textDecoration:{scene:["textDecoration"],kind:"node",absent:"NONE"},textAlignHorizontal:{scene:["textAlignHorizontal"],kind:"node"},textAlignVertical:{scene:["textAlignVertical"],kind:"node"},textTruncation:{scene:["textTruncation"],kind:"node",absent:"DISABLED"},maxLines:{scene:["maxLines"],kind:"node"}},U0=Object.entries(Ji),GC=new Map(Object.entries(Gn(U0.flatMap(([e,t])=>t.scene.map(n=>({scene:n,raw:e,field:t}))),e=>e.scene)).map(([e,t])=>[e,t.map(({raw:n,field:r})=>({raw:n,field:r}))]));function z0(e){return U0.flatMap(([t,n])=>n.kind===e?[t]:[])}z0("scalar");var H0=Object.fromEntries(z0("layout-distance").map(e=>[Ji[e].scene[0],e])),W0=["componentKey","sourceLibraryKey","publishID","publishedVersion","sharedSymbolVersion","isSymbolPublishable","variantPropSpecs","componentPropDefs","overrideKey"];function Oc(e,t,n){if(t.layoutMode!=="HORIZONTAL"&&t.layoutMode!=="VERTICAL")return!1;let r=t.layoutMode==="HORIZONTAL"?"VERTICAL":"HORIZONTAL",i=n==="stackPrimarySizing"?t.layoutMode:r;return ps(e,t,i)==="FILL"}function BC(e,t){let n={...ju(e,t,"default"),..._i(e,t,"default"),...$u(e,t,"default"),...Xu(e,t,"default")};return Object.keys(n).length>0?{...t,...n}:t}function j0(e,t){e.resolvedNodes??(e.resolvedNodes=new WeakMap);let n=e.resolvedNodes.get(t);return n||(n=BC(e.graph,t),e.resolvedNodes.set(t,n)),n}function UC(e,t){let n=e.componentScale;if(!Number.isFinite(n)||n<=0)throw new Error("Invalid instance uniform scale");return{x:t.width/n,y:t.height/n}}function zC(e,t,n,r){if(!n||t.type!=="INSTANCE"||!t.componentId)return;let i=Zi(e,t.componentId,r);return i?{guidPath:{guids:n},overriddenSymbolID:i}:void 0}function HC(e,t,n,r){if(!(typeof t!="string"&&typeof t!="number")){if(e==="stackPrimarySizing"||e==="stackCounterSizing"){let i=t==="HUG"&&!Oc(n,r,e);return{[e]:i?"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":"FIXED"}}return{[e]:t}}}function WC(e,t,n){if(typeof t!="number")return;let r=n.componentScale;if(!Number.isFinite(r)||r<=0)throw new Error("Invalid instance uniform scale");return{[e]:t/r}}function jC(e,t){let n=GC.get(e);if(!n)return;let r=Fu(n.map(({raw:i,field:o})=>XC(i,o,e,t)));return r.length>0?Object.assign({},...r):void 0}function $C(e,t,n){let r=t.componentScale;if(!Number.isFinite(r)||r<=0)throw new Error("Invalid instance uniform scale");return e(r===1?n:{...n,...Pi(n,1/r,!1)})}function XC(e,t,n,{context:r,instance:i,target:o,value:s,nodeFields:a}){switch(t.kind){case"node":{let l=a(),u=e in l?l[e]:t.absent;return u===void 0?void 0:{[e]:u}}case"scalar":return{[e]:o[n]};case"visible":return{visible:o.visible};case"text":{let l=n==="text"&&typeof s=="string"?s:o.text;return{textData:{...a().textData,characters:l}}}case"text-style":return{styleIdForText:o.textStyleId?Ks(r,o.textStyleId):structuredClone(js)};case"paint":return e==="fillPaints"?{fillPaints:rf(r,o)}:{strokePaints:of(r,o)};case"size":return{size:UC(i,o)};case"layout-distance":return WC(e,o[n],i);case"layout-mode":return HC(e,o[n],r.graph,o);default:return}}function KC(e,t,n){if(/^fills\/\d+\/color$/.test(n))return{fillPaints:rf(e,t)};if(/^strokes\/\d+\/color$/.test(n))return{strokePaints:of(e,t)}}function YC({context:e,instance:t,target:n},r){let i=r.slice(15),o=KC(e,n,i);if(o)return o;let s=Zy(i,n,t,e.graph,e.varIdToGuid);return s?{parameterConsumptionMap:{entries:[s]}}:void 0}function qC(e,t,n,r){let i=j0(e.context,e.target),s={...e,target:i,nodeFields:()=>{let l=e.records.get(i.id);return l||(l=$C(e.writeNodeFields,e.instance,i),e.records.set(i.id,l)),l}};if(t==="componentId")return zC(s.context,s.target,n,r);let a=t.startsWith("boundVariables/")?YC(s,t):jC(t,s);return a&&{guidPath:{guids:n},...a}}function ZC(e,t,n,r){let i=[],o=F0(e,n),s=new Map,a=new Map,l=f=>{let g=e.graph.getNode(f);if(!g||g.id!==t.id&&!kC(e,f,t.id))return;let h=G0(e.graph,t,g,o);return h?{target:g,path:h}:void 0},u=(f,g)=>{let h=g||f.id;s.has(h)||s.set(h,l(h));let d=s.get(h);return d&&{target:d.target,path:[...d.path]}},c=f=>{if(f.type==="INSTANCE"&&Ei(f.instanceOverrides,(g,h,d)=>{let v=u(f,g);if(!v)return;let T=qC({context:e,instance:t,target:v.target,value:d,records:a,writeNodeFields:r},h,v.path,n);T&&i.push(T)}),!bn(e.graph,f))for(let g of e.graph.getChildren(f.id))c(g)};return c(t),i}function Ay(e){let t=e.guidPath?.guids;return t?.length?t.map(({sessionID:n,localID:r})=>`${n}:${r}`).join("/"):null}function JC(e,t){let n=new Map;e.forEach((r,i)=>{let o=Ay(r);o&&n.set(o,i)});for(let r of t){let i=Ay(r),o=i?n.get(i)??-1:-1;o<0?(i&&n.set(i,e.length),e.push(r)):e[o]={...e[o],...r,...jn(e[o],r)}}}function Pr(e){return e.symbolData}function wr(e){return Pr(e)?.symbolOverrides??[]}function na(e){return Pr(e)?.uniformScaleFactor??1}function kr(e,t,n){t(e,n);for(let r of wr(e))kr(r,t,r)}var $0=Un;function ra(e){let t=e?.slotContentIdValue?.guid;if(t)return zn(t)?void 0:t}function X0(e){return{value:{slotContentIdValue:{guid:e}},dataType:"SLOT_CONTENT_ID",resolvedDataType:"SLOT_CONTENT_ID"}}function QC(e){let t={varValue:X0({...$0})},n=e.slotSettings;if(!n)return t;let r={stretchChildOnInsert:n.stretchChildOnInsert,displayByDefault:n.displayEmptyByDefault,allowPreferredValuesOnly:n.allowPreferredValuesOnly};return n.minChildren!==void 0&&(r.minChildren=n.minChildren),n.maxChildren!==void 0&&(r.maxChildren=n.maxChildren),t.slotPropConfig=r,t}function eO(e,t,n){let r=i=>{for(let o of e.graph.getChildren(i.id)){if(yt(o)===n&&bn(e.graph,o))return o;if(o.type==="INSTANCE")continue;let s=r(o);if(s)return s}};return r(t)}function tO(e,t,n,r,i){let o=e.slotContentRecords,s=eO(e,t,n);if(!o||!s)return null;let a=e.sceneNodeToKiwi(s,{...$0},0,i,e),l=a.at(0);return l?.guid?(nO(l),o.push(...a),{defID:r,varValue:X0(l.guid)}):null}function nO(e){e.isSlotContent=!0,Reflect.deleteProperty(e,"componentPropRefs");let t=e.parameterConsumptionMap?.entries?.filter(n=>n.variableField!=="SLOT_CONTENT_ID");t?.length?e.parameterConsumptionMap={entries:t}:Reflect.deleteProperty(e,"parameterConsumptionMap")}var xy=new WeakMap;function rO(e,t,n){let r=e.orderKeys?.get(t.id);if(r)return r;let i=t.parentId;if(!i)return e.fractionalPosition(n);let o=e.graph.getNode(i);if(!o||o.type==="CANVAS")return e.fractionalPosition(n);let s=xy.get(e);s||(s=new Map,xy.set(e,s));let a=s.get(i);if(!a){let l=e.graph.getChildren(i).filter(c=>!c.internalOnly),u=dy(l.map(c=>c.source.orderKey));a={keyById:new Map(l.map((c,f)=>[c.id,u[f]]))},s.set(i,a)}return a.keyById.get(t.id)??e.fractionalPosition(n)}function iO(e){return e==="EXCLUDE"?"XOR":e??"UNION"}function K0(e,t){let n=new Map;for(let[r,i]of e.variables){if(!i.key)continue;let o=t.get(r)??lt(r);n.set(i.key,o),i.version&&n.set(`${i.key}@${i.version}`,o)}return n}function oO(e){return e==="BOOLEAN"?"BOOL":e}function Rc(e,t,n,r){if(e==="BOOLEAN")return{boolValue:t==="true"};if(e==="INSTANCE_SWAP"){let i=n.graph.getNode(t),o=i?Zi(n,i.id,r):rn(t);return o?{guidValue:o}:{textValue:{characters:t}}}return{textValue:{characters:t}}}function Ny(e,t,n,r){let i=Rc(e,t,n,r);return e==="BOOLEAN"?{value:{boolValue:t==="true"},dataType:"BOOLEAN",resolvedDataType:"BOOLEAN"}:e==="INSTANCE_SWAP"&&"guidValue"in i?{value:{symbolIdValue:{guid:i.guidValue}},dataType:"SYMBOL_ID",resolvedDataType:"SYMBOL_ID"}:{value:{textValue:t},dataType:"STRING",resolvedDataType:"STRING"}}function sO(e,t,n){let r=Object.entries(e.variableModes).flatMap(([i,o])=>{let s=t?.get(i)??rn(i),a=n?.get(o)??rn(o);return!s||!a?[]:[{variableSetID:{guid:s},variableModeID:a}]});return r.length>0?{entries:r}:void 0}var aO=new Set(["variableConsumptionMap","parameterConsumptionMap"]),lO=new Set(["colorVar","opacityVar"]),uO=new Set(["BOOLEAN","FLOAT","STRING","ALIAS","COLOR","SYMBOL_ID","TEXT_DATA","PROP_REF"]);function cO(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&"entries"in e}function Y0(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function fO(e){if(!Y0(e))return!1;let t=e,n=t.variableData?.dataType;return typeof n=="string"&&uO.has(n)||!!t.variableData?.value?.propRefValue}function dO(e){if(!Y0(e))return!1;let t=e;return t.variableData?.dataType==="PROP_REF"||!!t.variableData?.value?.propRefValue}function pO(e,t,n,r){if(!cO(e))return;let i=e.entries?.filter(r)??[];if(i.length!==0)return{entries:i.map(o=>Wn(o,t,n))}}function mO(e,t,n){let r=e.__openPencilFigmaBlob,i=r instanceof Uint8Array?r:new Uint8Array(Object.values(r??{})),o=Lc(i),s=n.blobIndexByHex?.get(o);if(s!==void 0)return s;let a=t.length;return t.push(i),n.blobIndexByHex?.set(o,a),a}function hO(e,t){return e==="stackCounterAlignItems"&&t==="STRETCH"?"MIN":(e==="stackJustify"||e==="stackPrimaryAlignItems"||e==="stackCounterAlign"||e==="stackCounterAlignItems")&&t==="SPACE_EVENLY"?"SPACE_BETWEEN":t}function Wn(e,t,n={}){if(e instanceof Uint8Array)return e;if(Array.isArray(e))return e.map(i=>Wn(i,t,n));if(!e||typeof e!="object")return e;if("__openPencilFigmaBlob"in e)return mO(e,t,n);let r={};for(let[i,o]of Object.entries(e))if(!(lO.has(i)&&!n.includePaintVariables)){if(aO.has(i)){let s=pO(o,t,n,n.includeVariableMaps?fO:dO);s!==void 0&&(r[i]=s);continue}r[i]=hO(i,Wn(o,t,n))}return r}var gO=new Set(["pageType","derivedSymbolData","derivedSymbolDataLayoutVersion","sourceLibraryKey","minSize","maxSize","variableConsumptionMap","parameterConsumptionMap"]);function yO(e){return e.type!=="TEXT"||e.textPathData===null||(e.derivedTextGlyphs?.length??0)===0||e.textPathBox===null||e.strokeGeometry.length!==0?!1:e.strokes.length>0}function vO(e){return e.type==="TEXT"&&e.textPathData!==null&&qs(e).rawTransform===null&&(e.derivedTextGlyphs?.length??0)>0}function IO(e,t,n){let r=Je(t);(yO(t)||vO(t))&&(r={...r},delete r.strokeGeometry,delete r.derivedTextData);let i=Wn(r,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0});for(let o of Object.keys(i))if(!gO.has(String(o))){if((o==="fillPaints"||o==="strokePaints")&&t.source.id){let s=i[o],a=o==="fillPaints"?t.fills:t.strokes;n[o]=s?.map((l,u)=>{let c=`${o==="fillPaints"?"fills":"strokes"}/${u}/color`,f=nf(e,t,l,c),g=t.boundVariables[c]?a[u]:void 0;return g?{...f,color:e.safeColor(g.color),opacity:g.opacity}:f});continue}if(o==="effects"&&t.source.id&&e.assetRefToVarGuid&&e.assetRefToVarGuid.size>0){n[o]=TO(i[o],e.assetRefToVarGuid);continue}if(o==="derivedTextData"&&t.source.id){n.derivedTextData=i.derivedTextData;continue}if(o==="textDecorationFillPaints"&&t.source.id){n.textDecorationFillPaints=i.textDecorationFillPaints;continue}o in n||(n[o]=i[o])}}function TO(e,t){if(!Array.isArray(e))return e;let n=e.map(r=>{let i=r.colorVar,o=i?.value?.alias;if(!i||!o||o.guid||!o.assetRef?.key)return r;let s=o.assetRef,a=s.version?`${s.key}@${s.version}`:s.key,l=t.get(a)??t.get(s.key);return l?{...r,colorVar:{...i,value:{...i.value,alias:{guid:l}}}}:r});return n.some((r,i)=>r!==e[i])?n:e}function SO(e,t,n,r){if(t.type!=="INSTANCE"||!t.componentId)return;let i=Zi(e,wC(e,t.componentId),r);if(i){let s={symbolID:i},a=[];if(t.source.fig.symbolOverrides.length>0&&a.push(...Wn(t.source.fig.symbolOverrides,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0})),JC(a,ZC(e,t,r,l=>nv(e,l))),a.length>0&&(s.symbolOverrides=a),!Number.isFinite(t.componentScale)||t.componentScale<=0)throw new Error("Invalid instance uniform scale");(t.componentScale!==1||t.source.fig.uniformScaleFactor!=null)&&(s.uniformScaleFactor=t.componentScale),n.symbolData=s}t.source.fig.componentPropAssignments.length>0&&!t.source.editedFields.includes("componentPropertyAssignments")&&(n.componentPropAssignments=Wn(t.source.fig.componentPropAssignments,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0}));let o=Wn(t.source.fig.derivedSymbolData,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0});n.derivedSymbolData=LC(e.graph,t,F0(e,r),o,s=>({size:Z0(s),transform:J0(e,s)})),t.source.fig.derivedSymbolDataLayoutVersion!=null&&(n.derivedSymbolDataLayoutVersion=t.source.fig.derivedSymbolDataLayoutVersion)}function bO(e,t){if((e.type==="INSTANCE_SWAP"||e.type==="SLOT")&&e.preferredValues?.length)return{instanceSwapValues:e.preferredValues.map(n=>{let r=t.graph.getNode(n);return{type:"COMPONENT",key:r?.componentKey||r?.sourceLibraryKey||n}})};if(e.type==="VARIANT"&&e.variantOptions?.length)return{stringValues:[...e.variantOptions]}}function EO(e){return e==="TEXT"?"TEXT_DATA":e==="INSTANCE_SWAP"?"OVERRIDDEN_SYMBOL_ID":e==="SLOT_CONTENT"?"SLOT_CONTENT_ID":"VISIBLE"}function q0(e){let t=new Map;for(let n of e.getAllNodes())for(let r of n.componentPropertyDefinitions)t.has(r.id)||t.set(r.id,r);return t}function Hs(e,t,n,r=!1){return n&&!(t in Je(e))&&!r}function AO(e){let t=e.parameterConsumptionMap?.entries??[],n=new Set(t.map(i=>i.variableField)),r=e.variableConsumptionMap?.entries??[];r.length&&(e.parameterConsumptionMap={entries:[...r.filter(i=>!n.has(i.variableField)),...t]})}function xO(e,t){if(!t.length)return;let n=e.parameterConsumptionMap,r=new Set(t.map(s=>s.componentPropNodeField)),i=(n?.entries??[]).filter(s=>!r.has(s.variableField??"")),o={VISIBLE:"BOOLEAN",TEXT_DATA:"STRING",OVERRIDDEN_SYMBOL_ID:"SYMBOL_ID",SLOT_CONTENT_ID:"SLOT_CONTENT_ID"};for(let s of t)i.push({variableField:s.componentPropNodeField,variableData:{value:{propRefValue:{defId:s.defID}},dataType:"PROP_REF",resolvedDataType:o[s.componentPropNodeField]}});e.parameterConsumptionMap={entries:i}}function NO(e,t,n,r){t.componentKey&&(n.componentKey=t.componentKey),t.sourceLibraryKey&&(n.sourceLibraryKey=t.sourceLibraryKey);let i=t.publishId?rn(t.publishId):null,o=t.overrideKey?rn(t.overrideKey):null;i&&(n.publishID=i),o&&(n.overrideKey=o),t.sharedSymbolVersion&&(n.sharedSymbolVersion=t.sharedSymbolVersion),t.publishedVersion&&(n.publishedVersion=t.publishedVersion),(t.type==="COMPONENT_SET"||t.isPublishable)&&(n.isPublishable=t.isPublishable),(t.type==="COMPONENT"||t.isSymbolPublishable)&&(n.isSymbolPublishable=t.isSymbolPublishable),t.isExposedInstance&&(n.propsAreBubbled=!0),t.symbolDescription&&(n.symbolDescription=t.symbolDescription),t.symbolLinks.length>0&&(n.symbolLinks=structuredClone(t.symbolLinks));let s=t.componentPropertyDefinitions.map(f=>{let g={id:Hi(e,f.id,r),name:f.name,type:oO(f.type),preferredValues:bO(f,e)};return f.type==="SLOT"?Object.assign(g,QC(f)):(g.initialValue=Rc(f.type,f.defaultValue,e,r),g.varValue=Ny(f.type,f.defaultValue,e,r)),f.description&&(g.description=f.description),g});Hs(t,"componentPropDefs",s.length>0)&&(n.componentPropDefs=s);let a=t.componentPropertyReferences.map(f=>({defID:Hi(e,f.propertyId,r),componentPropNodeField:EO(f.field)})),l=a.filter(f=>f.componentPropNodeField!=="SLOT_CONTENT_ID");Hs(t,"componentPropRefs",l.length>0)&&(n.componentPropRefs=l),xO(n,a);let u=Object.entries(t.componentPropertyAssignments).map(([f,g])=>{let h=e.componentPropertyDefinitionsById.get(f);return h?h.type==="SLOT"?tO(e,t,f,Hi(e,f,r),r):{defID:Hi(e,f,r),value:Rc(h.type,g,e,r),varValue:Ny(h.type,g,e,r)}:null}).filter(f=>f!==null);Hs(t,"componentPropAssignments",u.length>0,!!n.componentPropAssignments)&&(n.componentPropAssignments=u);let c=t.variantPropSpecs.map(f=>({propDefId:Hi(e,f.propDefId,r),value:f.value}));Hs(t,"variantPropSpecs",c.length>0)&&(n.variantPropSpecs=c)}function Z0(e){let t=qs(e);return t.rawSize&&t.rawTransform?{...t.rawSize}:{x:e.width,y:e.height}}function J0(e,t){let n=qs(t).rawTransform;return n?{...n}:e.computeExportTransform(t)}function Sc(e){let t=Je(e);return"fillGeometry"in t||"strokeGeometry"in t}function Cy(e){return"vectorData"in Je(e)}var CO=new Set(["DROP_SHADOW","INNER_SHADOW","LAYER_BLUR","BACKGROUND_BLUR","FOREGROUND_BLUR"]);function OO(e){let t=Je(e).effects;return Array.isArray(t)&&t.some(n=>n&&typeof n=="object"&&"type"in n&&!CO.has(String(n.type)))}function RO(e){return!Sc(e)&&!Cy(e)?e:{...e,fillGeometry:Sc(e)?[]:e.fillGeometry,strokeGeometry:Sc(e)?[]:e.strokeGeometry,vectorNetwork:Cy(e)?null:e.vectorNetwork}}function DO(e){let t=e.pattern==="ROWS"||e.pattern!=="COLUMNS"&&e.axis==="Y";return{type:e.type??e.alignment??"STRETCH",axis:t?"Y":"X",visible:e.visible??!0,numSections:Rs(e),offset:e.offset??0,sectionSize:e.sectionSize??(e.pattern==="GRID"?10:0),gutterSize:e.gutterSize??0,color:e.color??{r:1,g:0,b:0,a:.1},pattern:e.pattern==="GRID"?"GRID":"STRIPES"}}function MO(e,t,n){let r=i=>Ks(e,i);t.fillStyleId&&(n.styleIdForFill=r(t.fillStyleId)),t.strokeStyleId&&(n.styleIdForStrokeFill=r(t.strokeStyleId)),t.textStyleId&&(n.styleIdForText=r(t.textStyleId)),t.effectStyleId&&(n.styleIdForEffect=r(t.effectStyleId)),t.gridStyleId&&(n.styleIdForGrid=r(t.gridStyleId)),t.layoutGrids.length>0&&(n.layoutGrids=t.layoutGrids.map(DO)),t.guides.length>0&&(n.guides=_y(t.guides))}function PO(e,t,n){e.serializeTextProps(t,n,e.graph,e.fontDigestMap,e.blobs,e.glyphBlobMap),n.textData&&FC(e,t,n.textData)}function Q0(e,t,n){t.independentStrokeWeights&&(n.borderStrokeWeightsIndependent=!0,n.borderTopWeight=t.borderTopWeight,n.borderRightWeight=t.borderRightWeight,n.borderBottomWeight=t.borderBottomWeight,n.borderLeftWeight=t.borderLeftWeight),t.fills.length>0&&(n.fillPaints=rf(e,t)),e.serializeCornerRadii(t,n),(t.type==="POLYGON"||t.type==="STAR")&&(n.count=t.pointCount),t.type==="STAR"&&(n.starInnerScale=t.starInnerRadius),t.effects.length>0&&!OO(t)&&(n.effects=t.effects.map(i=>({type:i.type==="LAYER_BLUR"?"FOREGROUND_BLUR":i.type,color:e.safeColor(i.color),offset:i.offset,radius:i.radius,spread:i.spread,visible:i.visible,blendMode:i.blendMode??"NORMAL",showShadowBehindNode:i.showShadowBehindNode}))),t.type==="TEXT"&&PO(e,t,n),t.type!=="VECTOR"&&(n.frameMaskDisabled=!t.clipsContent),MO(e,t,n),t.horizontalConstraint!=="MIN"&&(n.horizontalConstraint=t.horizontalConstraint),t.verticalConstraint!=="MIN"&&(n.verticalConstraint=t.verticalConstraint),t.strokeCap!=="NONE"&&(n.strokeCap=t.strokeCap);let r=Je(t);(t.strokeJoin!=="MITER"||"strokeJoin"in r)&&(n.strokeJoin=t.strokeJoin),(t.strokeMiterLimit!==di||"miterLimit"in r)&&(n.miterLimit=t.strokeMiterLimit),t.dashPattern.length>0&&(n.dashPattern=t.dashPattern),t.arcData&&(n.arcData={startingAngle:t.arcData.startingAngle,endingAngle:t.arcData.endingAngle,innerRadius:t.arcData.innerRadius}),t.autoRename||(n.autoRename=!1)}function wO(e,t){return e.textPathData!==null&&e.type==="TEXT"&&(e.derivedTextGlyphs?.length??0)>0?"TEXT_PATH":t.mapToFigmaType(e.type)}function ev(e,t){let n=j0(e,t);return{...n,pluginData:e.pluginDataOverrides?.get(t.id)??n.pluginData}}function kO(e,t){return e.type==="INSTANCE"||t.writeChildren===!1?[]:t.graph.getChildren(e.id).filter(n=>!n.internalOnly&&n.sharedStyleType===null)}function tv(e,t){if(e.strokes.length>0)t.strokeWeight=e.strokes[0].weight,t.strokeAlign=e.strokes[0].align;else{let n=Je(e);(e.strokeWeight!==Mn||"strokeWeight"in n)&&(t.strokeWeight=e.strokeWeight),(e.strokeAlign!=="CENTER"||"strokeAlign"in n)&&(t.strokeAlign=e.strokeAlign)}e.locked&&(t.locked=!0)}function nv(e,t){let n=ev(e,t),r={};return n.blendMode!=="PASS_THROUGH"&&(r.blendMode=n.blendMode),tv(n,r),Q0({...e,fontDigestMap:void 0},n,r),e.serializeLayoutProps(n,r),r}function Dc(e,t,n,r,i){let o=ev(i,e),s=Zi(i,o.id,r)??{sessionID:1,localID:r.value++},a=of(i,o),l=wO(o,i),u={guid:s,parentIndex:{guid:t,position:rO(i,o,n)},type:l,name:o.name,visible:o.visible,opacity:o.opacity,phase:"CREATED",size:Z0(o),transform:J0(i,o)};o.sharedStyleType&&(u.styleType=o.sharedStyleType),o.blendMode!=="PASS_THROUGH"&&(u.blendMode=o.blendMode),o.type==="GROUP"&&(u.resizeToFit=!0),tv(o,u),Q0(i,o,u),NO(i,o,u,r),SO(i,o,u,r),o.type==="COMPONENT_SET"&&(o.pluginData=en(o.pluginData,Ze.nodeType,o.type)),u.type==="CANVAS"&&(u.pageType="DESIGN"),o.type==="BOOLEAN_OPERATION"&&(u.booleanOperation=iO(o.booleanOperation)),a.length>0&&(u.strokePaints=a),i.serializeLayoutProps(o,u),i.serializeGeometry(RO(o),u,i.blobs),i.serializeVariableBindings(o,u,i.graph,i.varIdToGuid),AO(u),IO(i,o,u);let c=sO(o,i.varIdToGuid,i.modeIdToGuid);c&&(u.variableModeBySetMap=c),n0(o),l0(o),r0(o);let f=c0(o.pluginData);f.length>0&&(u.pluginData=f),o.pluginRelaunchData.length>0&&(u.pluginRelaunchData=f0(o.pluginRelaunchData));let g=[u],h=kO(o,i);for(let d=0;d<h.length;d++)g.push(...i.sceneNodeToKiwi(h[d],s,d,r,i));return g}var rv={shapeText:()=>null,textDecorations:()=>[]},_O=["image","imageThumbnail","animatedImage"],{shader:bc}=Ze;function sf(e){return typeof e=="object"&&e!==null&&!ArrayBuffer.isView(e)}function LO(e){return sf(e)&&"hash"in e}function VO(e){return sf(e)&&"pluginID"in e&&"key"in e}function Mc(e,t){if(Array.isArray(e)){for(let n of e)Mc(n,t);return}if(sf(e)){if(VO(e)){t.pluginData(e);return}for(let n of _O){let r=e[n];LO(r)&&t.image(r)}for(let n of Object.values(e))Mc(n,t)}}function FO(e){return e.hash===void 0?null:typeof e.hash=="string"?e.hash:Lc(e.hash)}function af(e,t){let n=new Map,r=i=>{let o=n.get(i);if(o)return o;let s=t.get(i);if(!s)return null;let a=Ms(s);return n.set(i,a),a};return Mc(e,{image(i){let o=FO(i),s=o?r(o):null;!s||s===o||(i.hash=typeof i.hash=="string"?s:By(s))},pluginData(i){if(i.pluginID!==yi||i.key!==bc.key)return;let o=bc.decode(i.value),s=o?r(o.image):null;!o||!s||s===o.image||(i.value=bc.encode({...o,image:s}))}}),n}function lf(e,t){let n=new Map;for(let[r,i]of e)n.set(t.get(r)??Ms(i),i);return[...n].map(([r,i])=>({name:`images/${r}`,data:i}))}function GO(e,t){let n=e.topLeftRadius>0||e.topRightRadius>0||e.bottomLeftRadius>0||e.bottomRightRadius>0;if(e.cornerRadius>0&&(t.cornerRadius=e.cornerRadius),n||e.independentCorners){let r=e.source.id?Je(e)?.rectangleCornerRadiiIndependent:void 0;t.rectangleCornerRadiiIndependent=typeof r=="boolean"?r:e.independentCorners,t.rectangleTopLeftCornerRadius=e.topLeftRadius,t.rectangleTopRightCornerRadius=e.topRightRadius,t.rectangleBottomLeftCornerRadius=e.bottomLeftRadius,t.rectangleBottomRightCornerRadius=e.bottomRightRadius}(e.cornerSmoothing>0||"cornerSmoothing"in Je(e))&&(t.cornerSmoothing=e.cornerSmoothing)}function BO(e,t){e.paragraphSpacing!==0&&(t.paragraphSpacing=e.paragraphSpacing),e.paragraphIndent!==0&&(t.paragraphIndent=e.paragraphIndent),e.listSpacing!==0&&(t.listSpacing=e.listSpacing),e.hangingList&&(t.hangingList=!0)}function UO(e,t,n,r,i,o,s){e.pluginData=en(e.pluginData,Ze.textDirection,e.textDirection),t.fontSize=e.fontSize,t.fontName={family:Vi(e.fontFamily),style:ea(e.fontWeight,e.italic),postscript:""},t.textData=k0(e,Wi),e.fontVariations.length>0&&(t.fontVariations=e.fontVariations.map(ef));let a=e.textAutoResize,l=Je(e);(!e.source.id||a!=="NONE"||"textAutoResize"in l)&&(t.textAutoResize=a),t.textAlignHorizontal=e.textAlignHorizontal,t.textAlignVertical=e.textAlignVertical,t.textUserLayoutVersion=4,t.textExplicitLayoutVersion=1,t.textBidiVersion=1,t.textDecorationSkipInk=e.textDecorationSkipInk,t.fontVariantCommonLigatures=!0,t.fontVariantContextualLigatures=!0,kc(t,e.fontFeatures),t.fontVersion="",t.emojiImageSet="APPLE",e.textCase!=="ORIGINAL"&&(t.textCase=e.textCase),e.textTruncation==="ENDING"&&(t.textTruncation="ENDING"),e.maxLines!=null&&(t.maxLines=e.maxLines),BO(e,t),r&&(t.derivedTextData=V0(e,{digestMap:r,blobs:i,glyphBlobMap:o??new Map,shapeText:u=>s.shapeText(u),textDecorations:(u,c)=>s.textDecorations(u,c)})),e.leadingTrim!=="NONE"&&(t.leadingTrim=e.leadingTrim),t.lineHeight=e.lineHeight===null?{...Xi}:{value:e.lineHeight,units:"PIXELS"},t.letterSpacing={value:e.letterSpacing,units:"PIXELS"},e.textDecoration!=="NONE"&&(t.textDecoration=e.textDecoration==="UNDERLINE"?"UNDERLINE":"STRIKETHROUGH"),e.textDecorationStyle!=="SOLID"&&(t.textDecorationStyle=e.textDecorationStyle),e.textDecorationThickness!=null&&(t.textDecorationThickness={value:e.textDecorationThickness,units:"PIXELS"}),e.textUnderlineOffset!=null&&(t.textUnderlineOffset={value:e.textUnderlineOffset,units:"PIXELS"}),e.textDecorationFills.length>0&&(t.textDecorationFillPaints=e.textDecorationFills.map(Wi))}function iv(e){return e==="HORIZONTAL"||e==="VERTICAL"||e==="NONE"?e:void 0}function Oy(e){return e==="FIXED"||e==="RESIZE_TO_FIT"||e==="RESIZE_TO_FIT_WITH_IMPLICIT_SIZE"?e:void 0}function $s(e){return e==="SPACE_EVENLY"?"SPACE_BETWEEN":e}function ov(e){return e==="SPACE_EVENLY"?"SPACE_BETWEEN":e}function Pc(e){let t=ov(e);return t==="STRETCH"?"MIN":t}function Ry(e,t,n){if(!e.parentId||e.layoutAlignSelf!=="AUTO"||e.layoutPositioning==="ABSOLUTE")return;let r=n.getNode(e.parentId);r?.counterAxisAlign==="STRETCH"&&(r.layoutMode==="HORIZONTAL"||r.layoutMode==="VERTICAL")&&(t.stackChildAlignSelf="STRETCH")}function Dy(e,t,n,r){return e!==void 0?e:r!==(t??n??r)?r:void 0}function zO(e,t){e.targetAspectRatio&&(t.targetAspectRatio={value:{...e.targetAspectRatio}}),(e.minWidth!=null||e.minHeight!=null)&&(t.minSize={value:{x:e.minWidth??0,y:e.minHeight??0}}),(e.maxWidth!=null||e.maxHeight!=null)&&(t.maxSize={value:{x:e.maxWidth??Number.POSITIVE_INFINITY,y:e.maxHeight??Number.POSITIVE_INFINITY}})}function Ys(e){return e==="HUG"?"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":"FIXED"}var HO=new Set(["layoutMode","primaryAxisSizing","counterAxisSizing","layoutGrow","layoutAlignSelf","layoutPositioning"]);function My(e,t,n){e.source.fig.layout&&!e.source.editedFields.some(r=>HO.has(r))||(Oc(n,e,"stackPrimarySizing")&&(t.stackPrimarySizing="FIXED"),Oc(n,e,"stackCounterSizing")&&(t.stackCounterSizing="FIXED"))}function WO(e,t){let n={layoutMode:{stackMode:iv(e.layoutMode)},itemSpacing:{stackSpacing:e.itemSpacing},paddingLeft:{stackHorizontalPadding:e.paddingLeft},paddingRight:{stackPaddingRight:e.paddingRight},paddingTop:{stackVerticalPadding:e.paddingTop},paddingBottom:{stackPaddingBottom:e.paddingBottom},primaryAxisSizing:{stackPrimarySizing:Ys(e.primaryAxisSizing)},counterAxisSizing:{stackCounterSizing:Ys(e.counterAxisSizing)},primaryAxisAlign:{stackPrimaryAlignItems:$s(e.primaryAxisAlign)},counterAxisAlign:{stackCounterAlignItems:Pc(e.counterAxisAlign)},layoutGrow:{stackChildPrimaryGrow:e.layoutGrow},layoutAlignSelf:{stackChildAlignSelf:e.layoutAlignSelf},layoutPositioning:{stackPositioning:e.layoutPositioning},layoutWrap:{stackWrap:e.layoutWrap},counterAxisSpacing:{stackCounterSpacing:e.counterAxisSpacing},strokesIncludedInLayout:{bordersTakeSpace:e.strokesIncludedInLayout},itemReverseZIndex:{stackReverseZIndex:e.itemReverseZIndex}};for(let r of e.source.editedFields)r in n&&Object.assign(t,n[r]);e.source.editedFields.includes("layoutDirection")&&sv(e)}function sv(e){e.pluginData=en(e.pluginData,Ze.layoutDirection,e.layoutDirection)}function jO(e,t,n){e.source.id||sv(e),zO(e,t);let r=e.source.fig.layout;if(r){t.stackMode=iv(r.stackMode),t.stackSpacing=r.stackSpacing,t.stackPadding=r.stackPadding,t.stackPaddingRight=Dy(r.stackPaddingRight,r.stackHorizontalPadding,r.stackPadding,e.paddingRight),t.stackPaddingBottom=Dy(r.stackPaddingBottom,r.stackVerticalPadding,r.stackPadding,e.paddingBottom),t.stackCounterAlign=ov(r.stackCounterAlign),t.stackJustify=$s(r.stackJustify),t.stackCounterAlignItems=Pc(r.stackCounterAlignItems),t.stackPrimaryAlignItems=$s(r.stackPrimaryAlignItems);let i=Oy(r.stackPrimarySizing);i&&(t.stackPrimarySizing=i);let o=Oy(r.stackCounterSizing);o&&(t.stackCounterSizing=o),t.stackVerticalPadding=r.stackVerticalPadding,t.stackHorizontalPadding=r.stackHorizontalPadding,t.stackWrap=r.stackWrap,t.stackPositioning=r.stackPositioning,t.stackChildPrimaryGrow=r.stackChildPrimaryGrow,t.stackChildAlignSelf=r.stackChildAlignSelf,t.stackCounterSpacing=r.stackCounterSpacing,t.bordersTakeSpace=r.bordersTakeSpace,r.stackReverseZIndex&&(t.stackReverseZIndex=!0),Ry(e,t,n),WO(e,t),My(e,t,n);return}e.layoutMode!=="NONE"&&e.layoutMode!=="GRID"&&(t.stackMode=e.layoutMode,t.stackSpacing=e.itemSpacing,t.stackVerticalPadding=e.paddingTop,t.stackHorizontalPadding=e.paddingLeft,t.stackPaddingBottom=e.paddingBottom,t.stackPaddingRight=e.paddingRight,t.stackPrimarySizing=Ys(e.primaryAxisSizing),t.stackCounterSizing=Ys(e.counterAxisSizing),t.stackPrimaryAlignItems=$s(e.primaryAxisAlign),t.stackCounterAlignItems=Pc(e.counterAxisAlign),e.layoutWrap==="WRAP"&&(t.stackWrap="WRAP"),e.counterAxisSpacing>0&&(t.stackCounterSpacing=e.counterAxisSpacing),t.bordersTakeSpace=e.strokesIncludedInLayout),e.itemReverseZIndex&&(t.stackReverseZIndex=!0),e.layoutPositioning==="ABSOLUTE"&&(t.stackPositioning="ABSOLUTE"),e.layoutGrow>0&&(t.stackChildPrimaryGrow=e.layoutGrow),e.layoutAlignSelf!=="AUTO"?t.stackChildAlignSelf=e.layoutAlignSelf:Ry(e,t,n),My(e,t,n)}function $O(e,t,n){e.isMask&&(t.mask=!0,t.maskType=e.maskType,e.maskIsOutline&&(t.maskIsOutline=!0));let r=[],i={};if(e.vectorNetwork&&e.type==="VECTOR"){let{table:o,styleToId:s}=m0(e.vectorNetwork);r=o;let a=n.length;n.push(h0(e.vectorNetwork,s)),i.vectorNetworkBlob=a,i.normalizedSize={x:e.width,y:e.height}}e.fillGeometry.length>0&&(t.fillGeometry=e.fillGeometry.map(o=>{let s=n.length;if(n.push(o.commandsBlob),!o.fills||o.fills.length===0)return{windingRule:Ws(o.windingRule),commandsBlob:s};let a=r.length+1;return r.push({styleID:a,fillPaints:o.fills.map(Wi)}),{windingRule:Ws(o.windingRule),commandsBlob:s,styleID:a}})),r.length>0&&(i.styleOverrideTable=r),Object.keys(i).length>0&&(t.vectorData=i),e.strokeGeometry.length>0&&(t.strokeGeometry=e.strokeGeometry.map(o=>{let s=n.length;return n.push(o.commandsBlob),{windingRule:Ws(o.windingRule),commandsBlob:s}}))}function XO(e,t,n,r){let i=Jy(e,n,r),o={};for(let[s,a]of Object.entries(e.boundVariables)){if(!n.variables.get(a))continue;let l=r?.get(a)??lt(a);o[s]=ie(l)}if(e.pluginData=en(e.pluginData,Ze.boundVariables,Object.keys(o).length>0?o:void 0),i.length>0){t.variableConsumptionMap={entries:i};let s=jn(Je(e),{parameterConsumptionMap:{entries:i}}),a=t.parameterConsumptionMap;Object.assign(t,a?jn(s,{parameterConsumptionMap:a}):s)}}function uf(e,t,n,r,i,o,s={}){let{nodeIdToGuid:a,fontDigestMap:l,varIdToGuid:u,glyphBlobMap:c=new Map,blobIndexByHex:f,assignedGuidValues:g,runtime:h=rv,componentPropertyDefinitionsById:d=q0(i),modeIdToGuid:v,propertyIdToGuid:T=new Map,slotContentRecords:E,pluginDataOverrides:S,recordOwners:C,orderKeys:A,writeChildren:_}=s;return Dc(e,t,n,r,{graph:i,blobs:o,blobIndexByHex:f,nodeIdToGuid:a,assignedGuidValues:g,fontDigestMap:l,glyphBlobMap:c,varIdToGuid:u,modeIdToGuid:v,assetRefToVarGuid:u?K0(i,u):void 0,componentPropertyDefinitionsById:d,propertyIdToGuid:T,slotContentRecords:E,pluginDataOverrides:S,recordOwners:C,orderKeys:A,writeChildren:_,fractionalPosition:yc,mapToFigmaType:Py,fillToKiwiPaint:Wi,safeColor:Xs,computeExportTransform:wy,serializeCornerRadii:GO,serializeTextProps:(O,k,V,F,Q,ne)=>UO(O,k,V,F,Q,ne,h),serializeLayoutProps:(O,k)=>jO(O,k,i),serializeGeometry:$O,serializeVariableBindings:XO,sceneNodeToKiwi:Dc})}var av={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0};function cf(e,t="display-p3"){return{guid:e,type:"DOCUMENT",name:"Document",visible:!0,opacity:1,phase:"CREATED",transform:{...av},strokeWeight:Mn,strokeAlign:"CENTER",strokeJoin:"MITER",documentColorProfile:t==="display-p3"?"DISPLAY_P3":"SRGB"}}function ff(e,t,n,r,i){return{guid:e,parentIndex:{guid:t,position:n},type:"CANVAS",name:r,visible:!0,opacity:1,phase:"CREATED",transform:{...av},strokeWeight:Mn,strokeAlign:"CENTER",strokeJoin:"MITER",pageType:"DESIGN",...i}}var{token:lv,modeConditions:uv,modeAttribute:cv}=Ze;function ia(e){return os(e,[lv,uv,cv])}function KO(e){return Ii(e)?void 0:e}function YO(e,t){return typeof e=="number"&&Math.fround(e)===Math.fround(t)}function df(e,t){let n=ut(e,lv)??{},r=Object.entries(n.expressions??{}).filter(([i,o])=>YO(t[i],o.resolved));return{unit:n.unit,expressions:KO(Object.fromEntries(r))}}function pf(e){return ut(e,uv)??{}}function mf(e){return ut(e,cv)}var qO=e=>ru.includes(e),ZO=e=>iu.includes(e);function JO(e){let t=(e.codeSyntax?.entries??[]).flatMap(({platform:n,value:r})=>ZO(n)&&r?[[n,r]]:[]);return t.length>0?Object.fromEntries(t):void 0}function hf(e){let t=e.variableScopes?.filter(qO),n=ia(Yi(e)),r={description:e.description??e.symbolDescription??"",hiddenFromPublishing:e.isPublishable===!1,scopes:t?.length?t:void 0,codeSyntax:JO(e),pluginData:n.length>0?n:void 0};return typeof e.key=="string"&&(r.key=e.key),typeof e.version=="string"&&(r.version=e.version),r}var eR=400*1024*1024,yf=5e4,rt=vo,fv=el,Le=()=>crypto.randomUUID().toUpperCase(),oe=(e,t=0)=>Number.isFinite(Number(e))?Number(e):t,Qi=(e,t=0,n=1)=>Math.max(t,Math.min(n,oe(e))),Xn=(e,t=[0,0])=>{let n=typeof e=="string"?e.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number):null;return n?.length>=2?n:t},ct=(e=0,t=0,n=0,r=1)=>({r:Qi(e),g:Qi(t),b:Qi(n),a:Qi(r)}),Ut=(e,t=1)=>({type:"SOLID",color:e,opacity:Qi(t),visible:!0}),Kn=Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="),e=>e.charCodeAt(0));function _r(e){let t=0,n=0;return nr(e,{filter(r){if(t+=r.originalSize,++n>5e4||t>eR)throw new Error("\u89E3\u538B\u540E\u5185\u5BB9\u8FC7\u5927\uFF0C\u8BF7\u62C6\u5206\u8BBE\u8BA1\u6587\u4EF6\u3002");return!0}})}function Lr(e,t,n){let r=e[t];if(!r){if(n!==void 0)return n;throw new Error(`\u6587\u4EF6\u7F3A\u5C11\u5FC5\u8981\u5185\u5BB9\uFF1A${t}`)}try{return JSON.parse(fv(r))}catch{throw new Error(`\u8BBE\u8BA1\u6570\u636E\u635F\u574F\uFF1A${t}`)}}function oa(){let e=new Li;return e.getPages().forEach(t=>e.deleteNode(t.id)),e}function vf(){let e=new Map;return{add(t,n,r="",i="warning",o="implementation"){let s=`${t}:${o}`,a=e.get(s)||{code:t,message:n,count:0,examples:[],severity:i,category:o};i!=="info"&&(a.severity=i),a.count++,r&&a.examples.length<3&&!a.examples.includes(r)&&a.examples.push(r.slice(0,100)),e.set(s,a)},list(){return[...e.values()]}}}function Vr(e,t,n){for(let r of e.nodes.values())r.type!=="CANVAS"&&r.id!==e.rootId&&!t.has(r.id)&&n.add("missing-layer","\u5BFC\u51FA\u5668\u672A\u80FD\u5199\u5165\u6B64\u6E90\u56FE\u5C42\uFF0C\u4E0D\u80FD\u4F5C\u4E3A\u5B8C\u6574\u7ED3\u679C\u4F7F\u7528\u3002",r.name)}function tR(e){let t=new Set(["fontFamily","fontSize","fontWeight","italic","letterSpacing","textDecoration","textCase","fills"]);return e.styleRuns.every(n=>Object.entries(n.style).every(([r,i])=>i===void 0||JSON.stringify(i)===JSON.stringify(e[r])?!0:t.has(r)?r==="fills"?e.fills.length===1&&e.fills[0].opacity===1&&i.length===1&&i[0].type==="SOLID"&&i[0].visible!==!1&&(!i[0].blendMode||i[0].blendMode==="NORMAL"):r==="textCase"?["ORIGINAL","UPPER","LOWER","TITLE"].includes(i):r!=="textDecoration"||["NONE","UNDERLINE","STRIKETHROUGH"].includes(i):!1))}function sa(e,t,n,r={}){if(e.nodes.size>yf)throw new Error("\u56FE\u5C42\u8D85\u8FC7 50,000 \u4E2A\uFF0C\u8BF7\u6309\u9875\u9762\u62C6\u5206\u540E\u8F6C\u6362\u3002");return e.createNode(t,n,r)}function dv(e){let t=[...e.nodes.values()].filter(n=>n.id!==e.rootId&&n.type!=="CANVAS");return{pages:e.getPages().length,layers:t.length,images:e.images.size,text:t.filter(n=>n.type==="TEXT").length,artboards:t.filter(n=>n.type==="FRAME"&&e.getNode(n.parentId)?.type==="CANVAS").length}}async function aa(e,t){let n=[...new Uint8Array(await crypto.subtle.digest("SHA-1",t))].map(r=>r.toString(16).padStart(2,"0")).join("");return e.images.set(n,t),n}function If(e){return e?.[0]===137&&e[1]===80?"png":e?.[0]===255&&e[1]===216?"jpg":e?.[0]===71&&e[1]===73?"gif":e?.[8]===87&&e[9]===69?"webp":"bin"}function Tf(e){if(!e)return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=If(e),r=0,i=0;if(n==="png"&&e.length>=24)r=t.getUint32(16),i=t.getUint32(20);else if(n==="gif"&&e.length>=10)r=t.getUint16(6,!0),i=t.getUint16(8,!0);else if(n==="jpg"){let o=2;for(;o<e.length&&e[o++]===255;){for(;o<e.length&&e[o]===255;)o++;let s=e[o++];if(s===217||s===218)break;if(s===1||s>=208&&s<=216)continue;if(o+2>e.length)break;let a=t.getUint16(o);if(a<2||o+a>e.length)break;if(s>=192&&s<=207&&![196,200,204].includes(s)&&a>=8){i=t.getUint16(o+3),r=t.getUint16(o+5);break}o+=a}}else if(n==="webp"&&e.length>=30){let o=fv(e.subarray(12,16));if(o==="VP8X")r=1+(t.getUint32(24,!0)&16777215),i=1+(t.getUint32(26,!0)>>>8);else if(o==="VP8 "&&e[23]===157&&e[24]===1&&e[25]===42)r=t.getUint16(26,!0)&16383,i=t.getUint16(28,!0)&16383;else if(o==="VP8L"&&e[20]===47){let s=t.getUint32(21,!0);r=1+(s&16383),i=1+(s>>>14&16383)}}return r>0&&i>0?{width:r,height:i}:null}function Sf(e){let t=e.imageTransform;return t&&Object.entries({m00:1,m01:0,m02:0,m10:0,m11:1,m12:0}).some(([n,r])=>Math.abs(oe(t[n],r)-r)>1e-6)}function bf(e,t,n){if(!n||!["RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE","VECTOR","BOOLEAN_OPERATION","STAR","POLYGON"].includes(e.type))return null;let r={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0,...t.imageTransform},i=r.m00*r.m11-r.m01*r.m10;return!Object.values(r).every(Number.isFinite)||Math.abs(i)<1e-12?null:{a:e.width*r.m11/i/n.width,b:-e.height*r.m10/i/n.width,c:-e.width*r.m01/i/n.height,d:e.height*r.m00/i/n.height,tx:e.width*(r.m01*r.m12-r.m11*r.m02)/i,ty:e.height*(r.m10*r.m02-r.m00*r.m12)/i}}function Ef(e,t){if(t.type!=="FRAME"||!["HORIZONTAL","VERTICAL"].includes(t.layoutMode)||t.layoutWrap!=="NO_WRAP"||t.primaryAxisAlign!=="SPACE_BETWEEN"||t.counterAxisAlign!=="CENTER"||t.primaryAxisSizing!=="FIXED"||t.counterAxisSizing!=="FIXED"||t.clipsContent||t.fills.length||t.strokes.length||t.effects.length||t.rotation||t.flipX||t.flipY||[t.paddingTop,t.paddingRight,t.paddingBottom,t.paddingLeft].some(Boolean))return null;let n=e.getChildren(t.id);if(n.length!==2||n.some(u=>!u.visible||u.isMask||u.rotation||u.flipX||u.flipY||u.layoutGrow||u.layoutAlignSelf!=="AUTO"||u.layoutPositioning!=="AUTO"))return null;let r=t.layoutMode==="HORIZONTAL",i=r?"x":"y",o=r?"width":"height",s=r?"y":"x",a=r?"height":"width",l=(u,c)=>Math.abs(u-c)<.01;return!l(n[0][i],0)||!l(n[1][i]+n[1][o],t[o])||n.some(u=>!l(u[s]+u[a]/2,t[a]/2))?null:{horizontal:r,children:n}}function la(e,t){if(t.type!=="COMPONENT"||e.getNode(t.parentId)?.type!=="CANVAS"||t.componentPropertyDefinitions?.length)return!1;for(let r of e.nodes.values())if(r.type==="INSTANCE"&&r.componentId===t.id)return!1;function n(r){return r!==t&&["COMPONENT","COMPONENT_SET","INSTANCE"].includes(r.type)||r.isMask||r.layoutMode!=="NONE"||r.effects.length?!1:e.getChildren(r.id).every(n)}return n(t)}function Af(e,t,n=t.maskType){if(xf(e,t,n))return!0;if(!t.visible||t.opacity!==1||t.effects.some(i=>i.visible)||t.fills.length>1||t.strokes.length>1||[...t.fills,...t.strokes].some(i=>!i.visible||i.opacity!==1||i.blendMode&&!["NORMAL","PASS_THROUGH"].includes(i.blendMode))||["GROUP","FRAME"].includes(t.type)||!["RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE","VECTOR","BOOLEAN_OPERATION","STAR","POLYGON"].includes(t.type)||["VECTOR","BOOLEAN_OPERATION"].includes(t.type)&&!Dt(t))return!1;if(n==="VECTOR")return!0;if(t.strokes.some(i=>i.visible))return!1;let r=t.fills.filter(i=>i.visible);return r.length>0&&r.every(i=>{let o=i.type==="SOLID"?[i.color]:i.type.startsWith("GRADIENT")?(i.gradientStops||[]).map(s=>s.color):[];return i.opacity===1&&o.length>0&&o.every(s=>s.a===1&&(n!=="LUMINANCE"||s.r===1&&s.g===1&&s.b===1))})}function xf(e,t,n=t.maskType){if(!["ALPHA","LUMINANCE"].includes(n)||!t.visible)return null;let r=[];function i(o,s){if(!o.visible)return!0;if(o.opacity!==1||o.effects.some(u=>u.visible)||o.isMask&&o!==t||!["NORMAL","PASS_THROUGH"].includes(o.blendMode))return!1;let a=o===t?{a:1,b:0,c:0,d:1,tx:0,ty:0}:Gr(o),l={a:s.a*a.a+s.c*a.b,b:s.b*a.a+s.d*a.b,c:s.a*a.c+s.c*a.d,d:s.b*a.c+s.d*a.d,tx:s.a*a.tx+s.c*a.ty+s.tx,ty:s.b*a.tx+s.d*a.ty+s.ty};if(o.type==="GROUP")return!o.fills.length&&!o.strokes.length&&e.getChildren(o.id).every(u=>i(u,l));if(!["VECTOR","RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE","LINE","STAR","POLYGON"].includes(o.type)||o.type==="VECTOR"&&(!Dt(o)||o.fillGeometry.some(u=>u.windingRule!==(o.fillGeometry[0]?.windingRule||"NONZERO"))))return!1;for(let[u,c]of[[!1,o.fills],[!0,o.strokes]])for(let f of c.filter(g=>g.visible)){if(f.opacity!==1||f.blendMode&&!["NORMAL","PASS_THROUGH"].includes(f.blendMode))return!1;let g=f.type==="SOLID"?[f.color]:f.type.startsWith("GRADIENT")?f.gradientStops?.map(d=>d.color)||[]:[];if(!g.length||g.some(d=>d.a!==1))return!1;let h=g.map(d=>n==="ALPHA"||d.r===1&&d.g===1&&d.b===1?1:d.r===0&&d.g===0&&d.b===0?0:-1);if(h.some(d=>d<0||d!==h[0])||u&&((f.dashPattern||o.dashPattern).length||!["NONE","ROUND","SQUARE"].includes(f.cap||o.strokeCap)||!["MITER","ROUND","BEVEL"].includes(f.join||o.strokeJoin)||!["CENTER","INSIDE","OUTSIDE"].includes(f.align)))return!1;r.push({node:o,matrix:l,stroke:u?f:null,include:h[0]===1})}return e.getChildren(o.id).length===0}return i(t,{a:1,b:0,c:0,d:1,tx:0,ty:0})&&r.length?r:null}function pv(e,t,n=t.maskType){if(t.opacity<1)return!0;let r=t.type==="GROUP"?[]:[...t.fills,...t.strokes].filter(i=>i.visible);for(let i of r){if(i.opacity<1)return!0;let o=i.type==="SOLID"?[i.color]:i.gradientStops?.map(s=>s.color)||[];if(o.some(s=>s.a<1))return!0;if(n==="LUMINANCE"){let s=o.map(a=>.2126*a.r+.7152*a.g+.0722*a.b);if(s.some(a=>a>1e-6&&a<1-1e-6)||i.type.startsWith("GRADIENT")&&s.some(a=>Math.abs(a-s[0])>1e-6))return!0}}return e.getChildren(t.id).filter(i=>i.visible).some(i=>pv(e,i,n))}function Fr(e){let t=(0,gf.default)(e).abs().unshort().unarc();if(t.err)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u77E2\u91CF\u8DEF\u5F84\u3002");let n=0,r=0,i=[];return t.iterate(o=>{o[0]==="H"&&(o=["L",o[1],r]),o[0]==="V"&&(o=["L",n,o[1]]);let s=o[0].toUpperCase();s==="M"||s==="L"?(n=o[1],r=o[2],i.push({type:s,x:n,y:r})):s==="C"?(n=o[5],r=o[6],i.push({type:s,x1:o[1],y1:o[2],x2:o[3],y2:o[4],x:n,y:r})):s==="Q"?(n=o[3],r=o[4],i.push({type:s,x1:o[1],y1:o[2],x:n,y:r})):s==="Z"&&i.push({type:"Z"})}),i}function mv(e){let t=Fr(e).flatMap(i=>[[i.x,i.y],[i.x1,i.y1],[i.x2,i.y2]].filter(o=>o.every(Number.isFinite)));if(!t.length)return{x:0,y:0,width:0,height:0};let n=t.map(i=>i[0]),r=t.map(i=>i[1]);return{x:Math.min(...n),y:Math.min(...r),width:Math.max(...n)-Math.min(...n),height:Math.max(...r)-Math.min(...r)}}function eo(e,t="NONZERO"){return{vectorNetwork:$g(e,t,{includeOpenRegions:!0}),fillGeometry:[{windingRule:t,commandsBlob:ta(Fr(e))}]}}function nR(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=0,r=[];for(;n<e.length;){let i=e[n++];if(i===0){r.push("Z");continue}let o={1:2,2:2,3:4,4:6}[i];if(!o||n+o*4>e.length)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u77E2\u91CF\u8F6E\u5ED3\u3002");let s=Array.from({length:o},(a,l)=>t.getFloat32(n+l*4,!0)*(l%2?-1:1));n+=o*4,r.push({1:"M",2:"L",3:"Q",4:"C"}[i]+s.join(" "))}return r.join(" ")}function Dt(e){if(e.fillGeometry.length)return e.fillGeometry.map(s=>nR(s.commandsBlob)).join(" ");if(e.type==="STAR"||e.type==="POLYGON"){let s=Math.max(3,Math.min(1e3,e.pointCount||5)),a=e.type==="STAR"?s*2:s;return`M${Array.from({length:a},(u,c)=>{let f=-Math.PI/2+c*Math.PI*2/a,g=e.type==="STAR"&&c%2?e.starInnerRadius||.5:1;return`${e.width/2+Math.cos(f)*e.width/2*g} ${e.height/2+Math.sin(f)*e.height/2*g}`}).join(" L")} Z`}let t=e.vectorNetwork;if(!t?.segments.length)return"";let n=new Set,r=[],o=[...t.regions.flatMap(s=>s.loops),...t.segments.map((s,a)=>[a])];for(let s of o){let a=null,l=null;for(let u of s){if(n.has(u))continue;n.add(u);let c=t.segments[u],f=a!==null&&a===c.end,g=t.vertices[f?c.end:c.start],h=t.vertices[f?c.start:c.end],d=f?c.tangentEnd:c.tangentStart,v=f?c.tangentStart:c.tangentEnd;(a===null||a!==(f?c.end:c.start))&&(r.push(`M${g.x} ${g.y}`),l=f?c.end:c.start),r.push(`C${g.x+d.x} ${g.y+d.y} ${h.x+v.x} ${h.y+v.y} ${h.x} ${h.y}`),a=f?c.start:c.end}a!==null&&a===l&&r.push("Z")}return r.join(" ")}function Nf(e,t,n,r,i){let o=oe(e.a,1),s=oe(e.b),a=oe(e.c),l=oe(e.d,1),u=Math.hypot(o,s)||1,c=(o*l-s*a)/u,f=Math.atan2(s,o),g=Math.abs(t*u),h=Math.abs(n*c),d=Math.cos(f),v=Math.sin(f);Math.abs(o*a+s*l)>.001&&r.add("skew","\u503E\u659C\u53D8\u6362\u5DF2\u8FD1\u4F3C\u4E3A\u65CB\u8F6C\u548C\u7F29\u653E\u3002",i);let T=c<0?-1:1;return{x:oe(e.tx)-g/2+d*g/2-v*T*h/2,y:oe(e.ty)-h/2+v*g/2+d*T*h/2,width:g,height:h,rotation:f*180/Math.PI,flipY:c<0}}function Gr(e){let t=e.rotation*Math.PI/180,n=Math.cos(t),r=Math.sin(t),i=e.flipX?-1:1,o=e.flipY?-1:1,s=n*i,a=r*i,l=-r*o,u=n*o;return{a:s,b:a,c:l,d:u,tx:e.x+e.width/2-s*e.width/2-l*e.height/2,ty:e.y+e.height/2-a*e.width/2-u*e.height/2}}function ua(e=""){return/black|heavy/i.test(e)?900:/extra.?bold/i.test(e)?800:/semi.?bold|demi/i.test(e)?600:/bold/i.test(e)?700:/medium/i.test(e)?500:/thin/i.test(e)?100:/extra.?light/i.test(e)?200:/light/i.test(e)?300:400}var ca=(e,t)=>`${e>=800?"Heavy":e>=700?"Bold":e>=600?"Semibold":e>=500?"Medium":e<=300?"Light":"Regular"}${t?" Italic":""}`;function hv(e,t,n){for(let r of e.nodes.values())if(!(r.type==="CANVAS"||r.id===e.rootId)){["COMPONENT","COMPONENT_SET","INSTANCE"].includes(r.type)&&t!=="fig"&&(t!=="xd"||!la(e,r))&&n.add("component-expanded","\u5C1A\u672A\u5B9E\u73B0\u6B64\u7EC4\u4EF6\u3001\u72B6\u6001\u6216\u5B9E\u4F8B\u5173\u8054\u7684\u7B49\u4EF7\u6620\u5C04\u3002",r.name),r.layoutMode!=="NONE"&&t!=="fig"&&(t!=="xd"||!Ef(e,r))&&n.add("layout-fixed","\u5C1A\u672A\u5B9E\u73B0\u6B64\u81EA\u52A8\u5E03\u5C40\u7684\u7B49\u4EF7\u6620\u5C04\uFF1B\u56FA\u5B9A\u4F4D\u7F6E\u4E0D\u80FD\u4FDD\u7559\u539F\u6709\u81EA\u52A8\u6392\u7248\u89C4\u5219\u3002",r.name);for(let i of[...r.fills,...r.strokes])t!=="fig"&&!["SOLID","IMAGE","GRADIENT_LINEAR","GRADIENT_RADIAL"].includes(i.type)&&n.add("paint-approximation","\u76EE\u6807\u683C\u5F0F\u5C1A\u672A\u5B9E\u73B0\u6B64\u586B\u5145\u7C7B\u578B\u7684\u7B49\u4EF7\u8F6C\u6362\u3002",r.name),t==="xd"&&i.type==="GRADIENT_RADIAL"&&n.add("xd-radial-gradient","\u5F84\u5411\u6E10\u53D8\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u5BFC\u51FA\u5230 XD\u3002",r.name),t!=="fig"&&i.type==="IMAGE"&&(Sf(i)||["CROP","STRETCH"].includes(i.imageScaleMode))&&(t!=="xd"||!bf(r,i,Tf(e.images.get(i.imageHash))))&&n.add("image-crop","\u6B64\u56FE\u7247\u88C1\u526A\u6216\u5C40\u90E8\u53D8\u6362\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",r.name);t!=="fig"&&r.isMask&&(t!=="xd"||!Af(e,r))&&(t==="xd"&&r.maskType!=="VECTOR"&&pv(e,r)?n.add("mask","\u6B64\u8499\u7248\u4F7F\u7528\u900F\u660E\u5EA6\u6216\u660E\u6697\u53D8\u5316\uFF1BXD \u7684\u5F62\u72B6\u88C1\u5207\u4E0D\u80FD\u76F4\u63A5\u4FDD\u7559\u6B64\u900F\u660E\u8499\u7248\u884C\u4E3A\u3002",r.name,"warning","format"):n.add("mask","\u5C1A\u672A\u5B9E\u73B0\u6B64\u5206\u7EC4\u3001\u63CF\u8FB9\u6216\u7279\u6B8A\u8499\u7248\u7684\u7B49\u4EF7\u6620\u5C04\u3002",r.name)),r.clipsContent&&e.getNode(r.parentId)?.type!=="CANVAS"&&t!=="fig"&&t!=="xd"&&n.add("nested-clip","\u5D4C\u5957\u753B\u6846\u7684\u88C1\u5207\u8303\u56F4\u53EF\u80FD\u53D1\u751F\u53D8\u5316\uFF0C\u8BF7\u68C0\u67E5\u6EA2\u51FA\u5185\u5BB9\u3002",r.name),t==="xd"&&r.type==="BOOLEAN_OPERATION"&&!Dt(r)&&n.add("boolean","\u6B64\u5E03\u5C14\u8FD0\u7B97\u7F3A\u5C11\u53EF\u5BFC\u51FA\u7684\u5408\u6210\u8F6E\u5ED3\uFF0C\u4E0D\u80FD\u4FDD\u8BC1\u5916\u89C2\u3002",r.name),["CONNECTOR","SHAPE_WITH_TEXT"].includes(r.type)&&n.add("special-node","\u90E8\u5206\u7279\u6B8A\u56FE\u5C42\u4EC5\u4FDD\u7559\u53EF\u8BFB\u53D6\u7684\u5B50\u56FE\u5C42\u548C\u57FA\u7840\u5916\u89C2\u3002",r.name),t!=="fig"&&r.arcData&&(r.arcData.innerRadius||Math.abs(r.arcData.endingAngle-r.arcData.startingAngle-Math.PI*2)>.001)&&n.add("arc-shape","\u5706\u5F27\u6216\u73AF\u5F62\u7684\u53C2\u6570\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",r.name),t!=="fig"&&r.strokes.some(i=>String(i.cap||r.strokeCap).startsWith("ARROW"))&&n.add("arrow-cap","\u7BAD\u5934\u7AEF\u70B9\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",r.name),t==="sketch"&&r.effects.filter(i=>i.type.includes("BLUR")).length>1&&n.add("multiple-blurs","Sketch \u5BFC\u51FA\u76EE\u524D\u53EA\u80FD\u4FDD\u7559\u4E00\u4E2A\u6A21\u7CCA\u6548\u679C\u3002",r.name),t==="xd"&&r.effects.some(i=>i.blendMode&&i.blendMode!=="NORMAL")&&n.add("xd-effect-blend","\u6B64\u6548\u679C\u7684\u6DF7\u5408\u6A21\u5F0F\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u5BFC\u51FA\u5230 XD\u3002",r.name),t==="xd"&&r.effects.some(i=>i.spread)&&n.add("xd-shadow-spread","XD \u539F\u751F\u9634\u5F71\u6CA1\u6709\u53EF\u7B49\u4EF7\u627F\u63A5\u7684\u6269\u5C55\u53C2\u6570\u3002",r.name,"warning","format"),t==="xd"&&r.type==="TEXT"&&r.fills.some(i=>i.type!=="SOLID")&&n.add("xd-text-paint","XD \u53EF\u7F16\u8F91\u6587\u5B57\u53EA\u652F\u6301\u7EAF\u8272\u586B\u5145\uFF0C\u65E0\u6CD5\u540C\u65F6\u4FDD\u7559\u6587\u5B57\u7F16\u8F91\u80FD\u529B\u548C\u6B64\u56FE\u7247\u6216\u6E10\u53D8\u586B\u5145\u3002",r.name,"warning","format"),t==="xd"&&r.type==="TEXT"&&!tR(r)&&n.add("xd-text-runs","\u6B64\u6587\u5B57\u5305\u542B\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u4FDD\u7559\u7684\u5C40\u90E8\u6837\u5F0F\uFF0C\u4F8B\u5982\u5C40\u90E8\u884C\u9AD8\u3001\u5B57\u4F53\u7279\u6027\u6216\u590D\u6742\u586B\u5145\u3002",r.name)}}function Cf(e,t,n,r,i){let o=t.type==="VECTOR"?Dt(t):"";o&&Object.assign(t,eo((0,gf.default)(o).scale(n,r).toString())),t.x*=n,t.y*=r,t.width*=n,t.height*=r,t.fontSize*=r,t.lineHeight&&(t.lineHeight*=r),t.letterSpacing*=n,t.cornerRadius*=Math.min(n,r),t.strokes.forEach(s=>{s.weight*=(n+r)/2}),t.rotation&&Math.abs(n-r)>.001&&i.add("scaled-rotation","\u975E\u7B49\u6BD4\u7F29\u653E\u4E0E\u65CB\u8F6C\u7684\u7EC4\u5408\u9700\u8981\u68C0\u67E5\u3002",t.name),e.getChildren(t.id).forEach(s=>Cf(e,s,n,r,i))}function Tv(e){return e.layoutScale??1}function rR(e){return Qs(e.mainComponentId!==null?Tv(e):1)}function iR(e,t,n){for(let r of It(n)){if(r.variableData&&!["ALIAS","EXPRESSION"].includes(r.variableData.dataType??""))continue;let i=r.variableField&&$n[r.variableField];i&&(Me(e.instanceOverrides,e.id,t.id,`boundVariables/${i}`,t.boundVariables[i]??null),Me(e.instanceOverrides,e.id,t.id,"boundVariables"))}}function oR(e,t){Sv(e,t,na(t))}function Sv(e,t,n=1){for(let r of It(t)){let i=r.variableField&&$n[r.variableField];if(!i)continue;e.variableBindingScales??(e.variableBindingScales={});let o=Ki(r.variableData),s=o?.reference?o.multiplier:1,a=i==="opacity"?.01:1,l=r.variableData?.value?.expressionValue&&i!=="opacity"&&i!=="rotation";e.variableBindingScales[i]=s*a/(l?n:1)}}function bv(e,t,n){let r=[],i=(o,s)=>{if(n(o)){r.push({match:o,top:s});return}if(!t.isInstance(o))for(let a of t.childrenOf(o))i(a,s)};for(let o of e)i(o,o);return r.length===1?{count:1,...r[0]}:{count:r.length}}function*Ev(e,t){yield e;for(let n of t(e))yield*Ev(n,t)}function Yn(e){return e.guid?ie(e.guid):void 0}function qn(e){return e.parentIndex?.guid?ie(e.parentIndex.guid):void 0}function Pf(e,t){let n=e.parentIndex?.position??"",r=t.parentIndex?.position??"";return n===r?0:n<r?-1:1}function da(e){let t=new Map,n=new Map;for(let r of e){let i=Yn(r);if(i===void 0)continue;if(t.has(i))throw new Error(`Duplicate source node ${i}`);t.set(i,r);let o=qn(r);if(o===void 0)continue;let s=n.get(o);s?s.push(r):n.set(o,[r])}for(let r of n.values())r.sort(Pf);return{sources:t,children:n}}function Tt(e,t){return e?.sessionID===t.sessionID&&e.localID===t.localID}function Df(e){if(!e||typeof e!="object"||!("sessionID"in e)||!("localID"in e)||typeof e.sessionID!="number"||typeof e.localID!="number")return;let t={sessionID:e.sessionID,localID:e.localID};return zn(t)?void 0:t}function wf(e,t){return Tt(e.guid,t)||Tt(Df(e.overrideKey),t)}function sR({children:e}){return{childrenOf:t=>e.get(Yn(t)??"")??[],isInstance:t=>t.symbolData?.symbolID!==void 0}}function Av(e,t,n){let{count:r,match:i,top:o}=bv(e.children.get(t)??[],sR(e),s=>wf(s,n));return{count:r,record:i,topChild:o}}function gv(e,t,n){let r=ie(t);for(let[i,o]of n.entries()){let s=e.sources.get(r);if(!s)return!1;if(i===0&&wf(s,o))continue;let{record:a}=Av(e,r,o);if(!a)return!1;if(i===n.length-1)return!0;if(!a.symbolData?.symbolID)return!1;r=ie(a.symbolData.symbolID)}return!1}function aR(e,t){let n=t,r=new Set;for(;!r.has(n);){r.add(n);let i=e.sources.get(n);if(i?.type!=="INSTANCE"||!i.symbolData?.symbolID)return n;n=ie(i.symbolData.symbolID)}return n}function lR(e){let t=e.value;if(t&&(t.boolValue!==void 0||t.textValue!==void 0||t.guidValue!==void 0||t.textDataValue!==void 0))return t;let n=e.varValue?.value;if(n?.symbolIdValue?.guid)return{guidValue:n.symbolIdValue.guid};if(n?.boolValue!==void 0)return{boolValue:n.boolValue};if(n?.textValue!==void 0)return{textValue:n.textValue};if(n?.textDataValue!==void 0)return{textDataValue:n.textDataValue};if(n?.slotContentIdValue)return{slotContentIdValue:n.slotContentIdValue}}function uR(e,t,n){let r=structuredClone([...e]);for(let i of t){let o=lR(i);if(!i.defID||!o)continue;let s={id:i.defID,value:structuredClone(o),origin:"assignment",...n===void 0?{}:{rank:n}},a=r.findIndex(u=>Tt(u.id,s.id));if(a===-1){r.push(s);continue}let l=r[a];r[a]={...s,superseded:[...l.superseded??[],structuredClone(l.value)]}}return r}function cR(e){return(e.componentPropDefs??[]).flatMap(t=>t.id&&t.initialValue?[{id:t.id,value:structuredClone(t.initialValue),origin:"default"}]:[])}function fR(e,t,n){let r=ji(e),i=e.componentPropRefs;for(let o of i??[]){if(!o.defID||o.isDeleted)continue;let s=t.find(c=>Tt(c.id,o.defID));if(!s)continue;let{value:a,origin:l}=s,u=c=>{n?.({definitionId:structuredClone(s.id),field:c,origin:l},s)};if(o.componentPropNodeField==="VISIBLE"&&a.boolValue!==void 0)r.visible=a.boolValue,u("visible");else if(o.componentPropNodeField==="TEXT_DATA"){let c=typeof a.textValue=="string"?a.textValue:a.textValue?.characters??a.textDataValue?.characters;c!==void 0&&(c!==r.textData?.characters&&(r.derivedTextData=void 0),r.textData={...r.textData,characters:c},u("textData"))}else o.componentPropNodeField==="OVERRIDDEN_SYMBOL_ID"&&a.guidValue?(r.symbolData={...r.symbolData,symbolID:a.guidValue},u("symbolData")):o.componentPropNodeField==="SLOT_CONTENT_ID"&&a.slotContentIdValue&&u("slotContent")}return r}function dR(e,t){let n=e.properties;t.derivedTextData&&(n.derivedTextData=structuredClone(t.derivedTextData)),t.fontSize!==void 0&&(n.fontSize=t.fontSize),t.lineHeight!==void 0&&(n.lineHeight=structuredClone(t.lineHeight)),t.letterSpacing!==void 0&&(n.letterSpacing=structuredClone(t.letterSpacing)),t.size&&(n.size=structuredClone(t.size),e.derivedSize=structuredClone(t.size)),t.transform&&(n.transform=structuredClone(t.transform));let{fillGeometry:r,strokeGeometry:i,vectorData:o}=t;r&&(n.fillGeometry=structuredClone(r)),i&&(n.strokeGeometry=structuredClone(i)),o&&(n.vectorData=structuredClone(o))}function pR(e,t){let n=[],r=[];for(let i of wr(e)){let{guidPath:o,overriddenSymbolID:s,componentPropAssignments:a,...l}=i,u=o?.guids??[];if(!u.length)continue;let c=a??[];(s||c.length)&&n.push({owner:t,declaredPath:u,path:u,swap:s,assignments:c}),Object.keys(l).length&&r.push({path:u,props:l})}return{structural:n,claims:r}}var mR={childrenOf:e=>e.children,isInstance:e=>e.mainComponentId!==null};function pa(e){return Ev(e,t=>t.children)}var hR=class extends Error{constructor(t,n){super(n);se(this,"diagnostic");this.diagnostic=t,this.name="InstancePathError"}},fa=class extends Error{constructor(t,n){super(`Expected one instance-path target for ${ie(n)}; found ${t}`);se(this,"count");this.count=t,this.name="SegmentError"}};function yv(e,t,n,r){return new hR({ownerId:e,mainComponentId:t,path:structuredClone(n),reason:r.count===0?"missing-target":"ambiguous-target"},`Override declared by ${e}, path [${n.map(ie).join(", ")}]: ${r.message}`)}function xv(e,t){let n=ie(t),{count:r,match:i}=bv(e.children,mR,o=>Tt(o.overrideKey,t)||o.sourceId===n);if(!i)throw new fa(r,t);return i}function Mf(e,t){return Tt(e.properties.symbolData?.symbolID,t)||Tt(e.mainComponentOverrideKey,t)||Tt(e.sourceComponentOverrideKey,t)||Tt(e.sourceComponentId,t)}function Nv(e,t){let n=e;for(let[r,i]of t.entries())r===0&&Mf(e,i)||(n=xv(n,i));return n}function gR(e,t,n){if(!t?.properties.size||!n.size)return;let r=na(n);Cv(e,{x:t.properties.size.x*r,y:t.properties.size.y*r},n.size)}function vv(e,t,n,r,i){let o=r-n;if(i==="SCALE"&&n>0){let s=r/n;return{position:e*s,size:t*s}}return i==="MAX"?{position:e+o,size:t}:i==="CENTER"?{position:e+o/2,size:t}:i==="STRETCH"?{position:e,size:Math.max(0,t+o)}:{position:e,size:t}}function Cv(e,t,n){if(t.x===n.x&&t.y===n.y)return;let r=e.properties.stackMode&&e.properties.stackMode!=="NONE";for(let i of e.children){let o=i.properties;if(r&&o.stackPositioning!=="ABSOLUTE"||!o.size)continue;let s=o.transform??{m00:1,m01:0,m02:0,m10:0,m11:1,m12:0},a=vv(s.m02,o.size.x,t.x,n.x,o.horizontalConstraint),l=vv(s.m12,o.size.y,t.y,n.y,o.verticalConstraint),u={x:a.size,y:l.size};Cv(i,o.size,u),o.size=u,o.transform={...s,m02:a.position,m12:l.position}}}var Of=(e,t)=>({x:e.x*t,y:e.y*t});function Ov(e,t){e.fontSize!==void 0&&(e.fontSize*=t);for(let r of["lineHeight","letterSpacing"]){let i=e[r];i?.units==="PIXELS"&&(e[r]={...i,value:i.value*t})}if(e.textData?.styleOverrideTable){e.textData=structuredClone(e.textData);for(let r of e.textData.styleOverrideTable??[])Ov(r,t)}if(!e.derivedTextData)return;let n=structuredClone(e.derivedTextData);n.layoutSize&&(n.layoutSize=Of(n.layoutSize,t)),n.truncatedHeight!==void 0&&(n.truncatedHeight*=t);for(let r of n.glyphs??[])r.position=Of(r.position,t),r.fontSize*=t;for(let r of n.baselines??[])r.position=Of(r.position,t),r.width*=t,r.lineHeight*=t,r.lineAscent*=t,r.lineY!==void 0&&(r.lineY*=t);e.derivedTextData=n}var Rv=["stackPadding",...Object.values(H0)],Dv=["strokeWeight","cornerRadius","rectangleTopLeftCornerRadius","rectangleTopRightCornerRadius","rectangleBottomLeftCornerRadius","rectangleBottomRightCornerRadius"],yR=["fontSize","lineHeight","letterSpacing","textData","derivedTextData"],vR=[...Rv,...Dv,...yR,"dashPattern","effects","size","transform"];function IR(e,t){for(let n of Dv){let r=e[n];typeof r=="number"&&(e[n]=r*t)}e.dashPattern&&(e.dashPattern=e.dashPattern.map(n=>n*t)),e.effects&&(e.effects=e.effects.map(n=>({...n,offset:n.offset?{x:n.offset.x*t,y:n.offset.y*t}:n.offset,radius:typeof n.radius=="number"?n.radius*t:n.radius,spread:typeof n.spread=="number"?n.spread*t:n.spread})))}function TR(e,t){let n=na(t);if(!Number.isFinite(n)||n<=0)throw new Error("Invalid instance uniform scale");if(n!==1){for(let r of pa(e)){r.layoutScale=(r.layoutScale??1)*n;for(let o of Object.keys(r.variableBindingScales??{}))r.variableBindingScales&&o!=="opacity"&&o!=="rotation"&&(r.variableBindingScales[o]*=n);let i=r.properties;Ov(i,n),IR(i,n);for(let o of Rv){let s=i[o];typeof s=="number"&&(i[o]=s*n)}i.size&&(i.size={x:i.size.x*n,y:i.size.y*n}),i.transform&&(i.transform={...i.transform,m02:i.transform.m02*n,m12:i.transform.m12*n}),r.derivedSize&&(r.derivedSize={x:r.derivedSize.x*n,y:r.derivedSize.y*n})}for(let r of vR){let i=t[r];i!==void 0&&Object.assign(e.properties,{[r]:structuredClone(i)})}}}var SR=["fontSize","fontName","fontVariations","letterSpacing","lineHeight","textCase","textAlignHorizontal","textAlignVertical","textAutoResize","styleIdForText","fontVariantCommonLigatures","fontVariantContextualLigatures"];function bR(e,t){if("derivedTextData"in t)return;let n=t.textData;(n!==void 0&&Object.entries(n).some(([r,i])=>!nt(i,e.textData?.[r]))||SR.some(r=>r in t&&!nt(e[r],t[r])))&&(e.derivedTextData=void 0)}function kf(e){return{instance:(t,n={})=>Rf(e,t,"INSTANCE",n),component:(t,n={})=>Rf(e,t,"SYMBOL",n),page:(t,n={})=>Rf(e,t,"CANVAS",n)}}function Rf(e,t,n,r){let{sources:i,children:o}=e,s=new Set,a=new WeakMap,l=new WeakMap,u=I=>{let R=i.get(I.sourceId);if(R?.type==="INSTANCE")return I.properties.name;let x=R?.parentIndex?.guid,P=x?i.get(ie(x)):void 0;return P?.isStateGroup===!0?P.name:I.properties.name},c=I=>{if(!I)return[];let R=Df(i.get(ie(I))?.overrideKey);return R?[I,R]:[I]},f=({boundary:I})=>I?.replaced.some(R=>gv(e,R,I.path))??!1,g=(I,R)=>{if(R.count===0&&f(I))return;let x=yv(I.owner.id,I.owner.mainComponentId,I.declaredPath,R);if(R.count!==0||!r.onUnresolvedAssignment)throw x;I.owner.unresolved.push({...x.diagnostic,assignments:structuredClone(I.assignments)})},h=(I,R)=>{let x=new Map;for(let P of R){let[G]=P.path,{count:D,topChild:w}=Av(e,I,G);if(!w?.guid){g(P,new fa(D,G));continue}let q=ie(w.guid),Z=wf(w,G),X={...P,path:Z?P.path.slice(1):P.path},j=x.get(q);j?j.push(X):x.set(q,[X])}return x},d=(I,R,x)=>{let P=I.symbolData?.symbolID;return R?[...P?[P]:[],...x].filter(G=>!Tt(G,R)):[]},v=(I,R,x,P,G)=>{let D=R.symbolData?.symbolID,w=d(I,D,x),q=[...c(I.symbolData?.symbolID),...c(D)],Z=$=>q.some(le=>Tt(le,$)),X=[{assignments:R.componentPropAssignments??[],rank:G}],j=[],ee=$=>{if(!D)throw new Error("Swap target is not an instance");Tt(D,$)||w.push(D),D=$;for(let le of c(D))Z(le)||q.push(le)};for(let $ of P){let le=$.path.length===0||Z($.path[0]);if(!le||$.path.length>1){j.push(le?{...$,path:$.path.slice(1)}:$);continue}$.swap&&ee($.swap),$.assignments.length&&X.push({assignments:$.assignments,rank:$.owner.rank})}return{effective:D,replaced:w,groups:X,descendant:j}},T=(I,R,x,P)=>{let G=a.get(x),D=Object.fromEntries(Object.entries(P.props).filter(([w])=>{let q=G?.get(w);return q===void 0||q>=R}));Object.keys(D).length!==0&&(Sv(x,D),bR(x.properties,D),Object.assign(x.properties,ji(D),jn(x.properties,D)),"name"in D&&(x.hasOwnName=!0),I.propertyClaims.push({declaredBy:I.sourceId,path:structuredClone(P.path),properties:structuredClone(D)}))},E=(I,R)=>{let x=I;for(let[P,G]of R.entries()){let D=R.slice(P);if((l.get(x)??[]).some(w=>gv(e,w,D)))return!0;if(!(P===0&&Mf(x,G)))try{x=xv(x,G)}catch(w){if(!(w instanceof fa))throw w;return!1}}return!1},S=(I,R)=>{try{return Nv(I,R)}catch(x){if(!(x instanceof fa))throw x;let P=yv(I.sourceId,I.mainComponentId,R,x);if(P.diagnostic.reason==="missing-target"&&E(I,R))return;if(!r.onUnresolvedProperty)throw P;r.onUnresolvedProperty(P.diagnostic);return}},C=(I,R)=>{if(!r.derivedBounds)return;let x=R.derivedSymbolData;for(let P of x??[]){let G=P.guidPath?.guids;if(!G?.length)continue;let D=S(I,G);!D||D===I||dR(D,P)}},A=(I,R)=>{let x=[],P=new Map,G=[],D,w=fR(I,R,(q,Z)=>{if(x.push(q),Z.origin==="assignment"&&Z.rank!==void 0&&P.set(q.field,Z.rank),q.field==="symbolData")for(let X of Z.superseded??[])X.guidValue&&G.push(X.guidValue);if(q.field==="slotContent"){let X=ra(Z.value);D=X?ie(X):void 0}});if(D&&!i.has(D)){if(!r.onMissingSlotContent)throw new Error(`Missing slot content ${D}`);r.onMissingSlotContent({slotId:Yn(I)??"",slotContentId:D}),D=void 0}return{source:w,claims:x,bound:P,superseded:G,slotContent:D}},_=(I,R,x,P)=>{if(s.has(I))throw new Error(`Cyclic component expansion at ${I}`);let G=i.get(I);if(!G)throw new Error(`Missing source node ${I}`);let D=A(G,R),{source:w}=D;s.add(I);try{let q={id:I,rank:P,mainComponentId:null,unresolved:[]},Z=pR(w,q),X=[...Z.structural,...x].sort((B,te)=>te.owner.rank-B.owner.rank),j=v(G,w,D.superseded,X,P),ee;j.effective?ee=O(q,{...j,effective:j.effective},P):D.slotContent?ee=V(D.slotContent,j.descendant,P):ee=k(I,w,R,j.groups,j.descendant,P);let $=ne(I,G,w,j,ee,D.claims);D.slotContent&&($.slotContentId=D.slotContent),a.set($,D.bound),ee.base&&j.replaced.length&&l.set($,j.replaced),oR($,w);let le=ee.dangling?Z.claims.filter(({path:B})=>B.length===1&&Mf($,B[0])):Z.claims;Y($,ee.base,w,le,P,!ee.dangling);for(let B of q.unresolved)r.onUnresolvedAssignment?.({...B,mainComponentId:$.mainComponentId});return $}finally{s.delete(I)}},O=(I,{effective:R,replaced:x,groups:P,descendant:G},D)=>{let w=ie(R);if(!i.has(w)){if(!r.onMissingComponent)throw new Error(`Missing source node ${w}`);return r.onMissingComponent({ownerId:I.id,componentId:w}),{base:null,children:[],dangling:!0}}I.mainComponentId=aR(e,w);let q=G.map(j=>x.length?{...j,boundary:{replaced:x,path:j.path}}:j),Z=P.filter(j=>j.assignments.length).map(j=>({owner:{...I,rank:j.rank},declaredPath:[],path:[],assignments:j.assignments})),X=_(ie(R),[],[...Z,...q],D+1);return{base:X,children:X.children}},k=(I,R,x,P,G,D)=>{let w=R.type==="SYMBOL"?P.reduce((Z,X)=>uR(Z,X.assignments,X.rank),cR(R)):x,q=h(I,G);return{base:null,children:(o.get(I)??[]).map(Z=>{if(!Z.guid)throw new Error("Indexed child has no GUID");let X=ie(Z.guid);return _(X,w,q.get(X)??[],D+1)})}},V=(I,R,x)=>{let P=h(I,R);return{base:null,children:(o.get(I)??[]).map(G=>{if(!G.guid)throw new Error("Indexed child has no GUID");let D=ie(G.guid);return _(D,[],P.get(D)??[],x+1)})}},F=I=>{let R=ra(I.varValue?.value);return!!R&&!i.has(ie(R))},Q=I=>I?{mainComponentId:I.mainComponentId??I.sourceId,mainComponentOverrideKey:I.mainComponentOverrideKey??I.overrideKey,propertyClaims:structuredClone(I.propertyClaims),variableBindingScales:{...I.variableBindingScales},hasOwnName:i.get(I.sourceId)?.type==="INSTANCE"&&I.hasOwnName}:{mainComponentId:null,mainComponentOverrideKey:void 0,propertyClaims:[],variableBindingScales:{},hasOwnName:!1},ne=(I,R,x,{effective:P,replaced:G,groups:D},{base:w,children:q},Z)=>{let X=R.symbolData?.symbolID,[,j]=c(X),ee={sourceId:I,sourceComponentId:X,sourceComponentOverrideKey:j,...Q(w),bindingClaims:Z,overrideKey:Df(x.overrideKey),properties:{...w&&vt(w.properties,W0),...x,...P&&x.symbolData?{symbolData:{...x.symbolData,symbolID:P}}:{},...jn(w?.properties??{},x)},children:q};return x.type==="INSTANCE"&&(ee.properties.componentPropAssignments=D.flatMap($=>$.assignments).filter($=>!F($))),w&&G.length&&!ee.hasOwnName&&(ee.properties.name=w.defaultInstanceName??w.properties.name),ee.defaultInstanceName=u(ee),ee},Y=(I,R,x,P,G,D)=>{for(let w of P){let q=S(I,w.path);q&&T(I,G,q,w)}TR(I,x),gR(I,R,x),x.type==="INSTANCE"&&x.size&&(I.properties.size=structuredClone(x.size),I.derivedSize=structuredClone(x.size)),D&&C(I,x)};if(i.get(t)?.type!==n){let I={INSTANCE:"an instance",SYMBOL:"a component",CANVAS:"a page"}[n];throw new Error(`Expected ${I} source`)}return _(t,[],[],0)}function ER(e,t){let n=Sn();return n.orderKey=e.properties.parentIndex?.position??null,n.fig.layout=t.source?.fig.layout??null,n.fig.uniformScaleFactor=Pr(e.properties)?.uniformScaleFactor??null,n}var AR=new Set(["childIds","source","instanceOverrides"]);function Mv(e){return e instanceof Map||e instanceof Set?!0:e===null||typeof e!="object"||ArrayBuffer.isView(e)?!1:Object.values(e).some(Mv)}function xR(e,t){for(let n of Object.keys(e)){if(AR.has(n))continue;let r=Reflect.get(e,n),i=Reflect.get(t,n);r===i||r===null||typeof r!="object"||Mv(r)||!nt(r,i)||Reflect.set(e,n,i)}}function Iv(e){if(e==="DOCUMENT"||e==="VARIABLE")throw new Error(`Cannot materialize ${e} as an instance descendant`)}function _f(e,t,n,r,i={}){let{blobs:o=[],sourceChildren:s=new Map,existingNodes:a=new Map}=i;if(!e.getNode(t))throw new Error("Missing materialization parent");let l=new Map,u=d=>{if(l.has(d))throw new Error("Repeated or cyclic instance occurrence");let v=qi(d.properties,o,"occurrence");v.nodeType==="TEXT"&&d.derivedSize&&(v.derivedLayout={width:d.derivedSize.x,height:d.derivedSize.y}),Iv(v.nodeType);let T=a.get(d);if(T&&(e.getNode(T.id)!==T||T.type!==v.nodeType))throw new Error(`Invalid preallocated occurrence ${d.sourceId}`);l.set(d,v);let E=s.get(d);if(E&&e.getNode(E)?.type!==v.nodeType)throw new Error(`Invalid source child for ${d.sourceId}`);if(d.mainComponentId!==null){let S=r.get(d.mainComponentId);if(!S||e.getNode(S)?.type!=="COMPONENT")throw new Error(`Missing materialized component ${d.mainComponentId}`)}for(let S of d.children)u(S)};u(n);let c=new Map(a),f=(d,v,T)=>{if(T)for(let E of d.bindingClaims)E.origin==="assignment"&&E.field==="visible"&&Me(T.instanceOverrides,T.id,v.id,"visible",v.visible)},g=(d,v,T)=>{let E=l.get(d);if(!E)throw new Error("Missing prepared occurrence");let{nodeType:S,...C}=E;Iv(S);let A=ER(d,E),_={...C,variableAssignmentScales:rR(d),componentScale:Tv(d),variableBindingScales:Mr(C.boundVariables??{},d.layoutScale??1,d.variableBindingScales),componentId:d.mainComponentId===null?s.get(d)??null:r.get(d.mainComponentId),source:A},O=a.get(d);if(O&&O.parentId!==v)throw new Error(`Preallocated occurrence has wrong parent ${d.sourceId}`);let k=O??e.createNode(S,v,_);O&&e.updateNode(O.id,_);let V=e.getNode(s.get(d)??"");if(V&&xR(k,V),c.set(d,k),O&&d!==n&&k.type==="COMPONENT")return k;f(d,k,T);let F=s.get(d);return T&&d.mainComponentId!==null&&F&&(Me(T.instanceOverrides,T.id,k.id,"sourceComponentId",F),e.getNode(F)?.componentId!==k.componentId&&Me(T.instanceOverrides,T.id,k.id,"componentId",k.componentId)),k.childIds=d.children.map(Q=>g(Q,k.id,k.type==="INSTANCE"?k:T).id),k},h=g(n,t);return OR(c),{root:h,nodes:c}}function NR(e,t,n){return e.kind==="text"?typeof t=="object"&&t!==null&&"characters"in t:e.kind==="text-style"?!!n.textStyleId:!0}function CR(e,t,n,r){if(!Array.isArray(r))return;let i=!1;for(let[o,s]of r.entries()){if(!s.colorVar?.value?.alias)continue;let a=`boundVariables/${n}/${o}/color`;Me(e.instanceOverrides,e.id,t.id,a,t.boundVariables[`${n}/${o}/color`]??null),i=!0}i&&Me(e.instanceOverrides,e.id,t.id,"boundVariables")}function OR(e){for(let[t,n]of e)if(n.type==="INSTANCE")for(let r of t.propertyClaims){let i=Nv(t,r.path),o=e.get(i);if(!o)throw new Error("Unmaterialized property claim target");for(let s of Object.keys(Ji)){if(!(s in r.properties))continue;let a=Ji[s];if(NR(a,r.properties[s],o)){for(let l of a.scene){let u=o[l];Me(n.instanceOverrides,n.id,o.id,l,structuredClone(u))}a.kind==="paint"&&CR(n,o,a.scene[0],r.properties[s])}}iR(n,o,r.properties)}}function Lf(e,t,n){if(e.mainComponentId!==null){let r=n.get(e.mainComponentId);if(!r)throw new Error(`Missing component occurrence ${e.mainComponentId}`);let i=new Map(t.getChildren(r.materialized.root.id).map((s,a)=>[s.id,a])),o=new Map(r.occurrence.children.map(s=>[s.sourceId,s]));e.children=e.children.filter(s=>{let a=o.get(s.sourceId),l=a&&r.materialized.nodes.get(a);return!!l&&i.has(l.id)}).toSorted((s,a)=>{let l=o.get(s.sourceId),u=o.get(a.sourceId),c=l&&r.materialized.nodes.get(l),f=u&&r.materialized.nodes.get(u);return(c?i.get(c.id)??0:0)-(f?i.get(f.id)??0:0)})}for(let r of e.children)Lf(r,t,n)}function*Pv(e,t){let n=new Map;for(let r of t.children){if(n.has(r.sourceId))throw new Error(`Ambiguous source child ${r.sourceId}`);n.set(r.sourceId,r)}for(let r of e.children){let i=n.get(r.sourceId);if(!i)throw new Error(`Missing source child ${r.sourceId}`);yield[r,i]}}function Vf(e,t,n){let r=[],i=(o,s,a,l)=>{for(let[u,c]of Pv(o,s)){let f=t.nodes.get(u),g=l.get(c);if(!f||!g)throw new Error(`Missing materialized correspondence for ${u.sourceId}`);r.push({owner:a,target:f,source:g}),!u.slotContentId&&u.mainComponentId===c.mainComponentId&&i(u,c,a,l)}};for(let o of pa(e)){if(o.mainComponentId===null)continue;let s=n.get(o.mainComponentId),a=t.nodes.get(o);if(!s||!a)throw new Error(`Missing component ${o.mainComponentId}`);i(o,s.occurrence,a,s.materialized.nodes)}for(let{owner:o,target:s,source:a}of r)Me(o.instanceOverrides,o.id,s.id,"sourceComponentId",a.id),s.type==="INSTANCE"&&s.componentId!==a.componentId&&Me(o.instanceOverrides,o.id,s.id,"componentId",s.componentId)}function Ff(e,t){let n=new Map,r=(s,a,l)=>{for(let[u,c]of Pv(s,a)){let f=l.get(c);if(!f)throw new Error(`Unmaterialized source child ${c.sourceId}`);if(n.set(u,f.id),u.mainComponentId!==null)i(u);else if(u.slotContentId)for(let g of u.children)o(g);else r(u,c,l)}},i=s=>{if(s.mainComponentId===null)throw new Error("Expected instance occurrence");let a=t.get(s.mainComponentId);if(!a)throw new Error(`Missing component occurrence ${s.mainComponentId}`);r(s,a.occurrence,a.materialized.nodes)},o=s=>{if(s.mainComponentId!==null)i(s);else for(let a of s.children)o(a)};return o(e),n}function wv(e,t,n,r){let i=r??new Map;if(!r)for(let o of e.getAllNodes())for(let s of o.componentPropertyDefinitions)i.set(s.id,s.type);for(let o of n){let s;o.componentPropertyDefinitions.forEach((a,l)=>{if(i.set(a.id,a.type),a.type!=="INSTANCE_SWAP")return;let u=t.get(a.defaultValue);u&&(s??(s=[...o.componentPropertyDefinitions]),s[l]={...a,defaultValue:u})}),s&&(o.componentPropertyDefinitions=s)}for(let o of n){let s;for(let a in o.componentPropertyAssignments){if(i.get(a)!=="INSTANCE_SWAP")continue;let l=t.get(o.componentPropertyAssignments[a]);l&&(s??(s={...o.componentPropertyAssignments}),s[a]=l)}s&&(o.componentPropertyAssignments=s)}}function kv(e,t){for(let n of t){if(n.type!=="COMPONENT"||!n.parentId||n.variantPropSpecs.length===0)continue;let r=e.getNode(n.parentId);if(r?.type!=="COMPONENT_SET")continue;let i=new Map(r.componentPropertyDefinitions.map(s=>[s.id,s.name])),o={};for(let s of n.variantPropSpecs)o[i.get(s.propDefId)??s.propDefId]=s.value;e.updateNode(n.id,{componentPropertyValues:o})}}function ma(e){let t=new Map;for(let n of e){if(!n.guid||typeof n.key!="string")continue;let r=t.get(n.key)??new Map,i=typeof n.version=="string"?n.version:"",o=ie(n.guid);if(r.has(i)&&r.get(i)!==o)throw new Error(`Ambiguous resource ${n.key} version ${i}`);r.set(i,o),t.set(n.key,r)}return n=>{if(n?.guid)return ie(n.guid);let r=n?.assetRef;if(!r)return;let i=t.get(r.key);return r.version?i?.get(r.version):i?.has("")?i.get(""):i?.size===1?i.values().next().value:void 0}}function _v(e,t,n){let r=new Set,i=s=>{s&&r.add(ie(s))},o=s=>{i(s.value?.guidValue),i(s.varValue?.value?.symbolIdValue?.guid)};return kr(e,(s,a)=>{i(Pr(s)?.symbolID),i(a?.overriddenSymbolID);for(let l of s.componentPropDefs??[])if(l.type==="INSTANCE_SWAP"&&o({value:l.initialValue,varValue:l.varValue}),l.type==="INSTANCE_SWAP"||l.type==="SLOT")for(let u of l.preferredValues?.instanceSwapValues??[]){if(!u.key)continue;let c=t?.({assetRef:{key:u.key,version:u.version}});if(!c){if(!n)throw new Error(`Unresolved preferred component ${u.key}`);n(u.key);continue}r.add(c)}for(let l of s.componentPropAssignments??[])o(l)}),r}function Lv(e){let t=new Set;return kr(e,n=>{for(let r of n.componentPropAssignments??[]){let i=ra(r.varValue?.value);i&&t.add(ie(i))}}),t}function Gf(e){for(let t of e){if(t.pluginData&&t.pluginData.length>1){let n=new Map;for(let r of t.pluginData)n.set(`${r.pluginID}\0${r.key}\0${r.value}`,r);n.size<t.pluginData.length&&(t.pluginData=[...n.values()])}if(t.pluginRelaunchData&&t.pluginRelaunchData.length>1){let n=new Map;for(let r of t.pluginRelaunchData)n.set(`${r.pluginID}\0${r.command}\0${r.message}\0${r.isDeleted}`,r);n.size<t.pluginRelaunchData.length&&(t.pluginRelaunchData=[...n.values()])}}}function Vv(e){if(new TextDecoder().decode(e.slice(0,8))!=="fig-kiwi")return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=t.getUint32(8,!0),r=12,i=[];for(;r<e.length&&!(r+4>e.length);){let a=t.getUint32(r,!0);if(r+=4,r+a>e.length)throw new Error(`Corrupted .fig file: chunk at offset ${r-4} declares length ${a} but only ${e.length-r} bytes remain`);i.push(e.slice(r,r+a)),r+=a}if(i.length<2)return null;let o=i[1],s;if(dc(o))s=qg(o);else try{s=er(o)}catch{throw new Error("Failed to decompress fig-kiwi data chunk")}return{schemaDeflated:i[0],dataRaw:s,version:n}}function ha(e,t,n){let r=Vv(e);if(!r)throw new Error("Invalid fig-kiwi container");let i=er(r.schemaDeflated),o=Bs(new Ot(i));if(t)try{let l=fy(o,r.dataRaw);l.length>0&&t(l)}catch(l){console.warn("Failed to scan FIG page manifest; continuing with full decode:",l)}let s=Ui(o,n).decodeMessage(r.dataRaw),a=s.nodeChanges;if(!a||a.length===0)throw new Error("No nodes found in .fig file");return Gf(a),{nodeChanges:a,blobs:(s.blobs??[]).map(l=>l.bytes instanceof Uint8Array?l.bytes:new Uint8Array(Object.values(l.bytes))),figKiwiVersion:r.version,figSchemaDeflated:r.schemaDeflated}}function Uv(e,t){let n=[],r=t.parentId?e.getNode(t.parentId):void 0;for(;r;)r.type==="INSTANCE"&&n.push(r),r=r.parentId?e.getNode(r.parentId):void 0;return t.type==="INSTANCE"&&n.unshift(t),n}function zv(e,t){let n=[];for(let r of Uv(e,t)){let i=Ct(r.instanceOverrides,r.id,t.id,"sourceComponentId"),o=typeof i=="string"?i:t.componentId,s=o?e.getNode(o):void 0;s&&n.push(s)}return n}function RR(e,t){e.preserveSourceMetadataDuring(()=>{for(let n of t.nodes.values()){let r=Uv(e,n),i=new Set;for(let s of r){let a=s.id===n.id?s.instanceOverrides.self:s.instanceOverrides.descendants.get(n.id);for(let l of a?.keys()??[])i.add(l)}let o={};for(let s of zv(e,n))for(let a of ms)!s.source.editedFields.includes(a)||i.has(a)||Object.assign(o,{[a]:structuredClone(s[a])});Object.keys(o).length&&e.updateNode(n.id,o)}})}var DR=new Uint8Array([137,80,78,71,13,10,26,10]);function MR(e){return DR.every((t,n)=>e[n]===t)}function PR(e){let t=e.toLowerCase();return t.endsWith(".png")||t.endsWith(".jpg")||t.endsWith(".json")}function Fv(e){let t=e["canvas.fig"]??e.canvas;if(t)return t;let n=null;for(let[r,i]of Object.entries(e))!i||PR(r)||(!n||i.byteLength>n.byteLength)&&(n=i);return n}function Gv(e){return e==="canvas.fig"||e==="canvas"}function wR(e,t,n){let r=vc(e);if(!r)return null;let i=ha(e,t,n),o=r.slice(2).find(MR)??null;return{...i,images:[],thumbnailPNG:o,metaJSON:null}}function zf(e,t,n){let r=new Uint8Array(e),i=wR(r,t,n);if(i)return i;let o=Fv(nr(r,{filter:({name:c})=>Gv(c)})),s,a;if(o)a=ha(o,t,n),s=nr(r,{filter:({name:c})=>!Gv(c)});else{if(s=nr(r),o=Fv(s),!o)throw new Error(`No canvas data found in .fig file. Entries: ${Object.keys(s).join(", ")}`);a=ha(o,t,n)}let l=s["meta.json"],u=Object.entries(s).filter(([c])=>c.startsWith("images/")&&c!=="images/").map(([c,f])=>[c.slice(7),f]);return{...a,images:u,thumbnailPNG:s["thumbnail.png"]??null,metaJSON:Object.hasOwn(s,"meta.json")?new TextDecoder().decode(l):null}}function Hv(e){let t={"canvas.fig":[Ic(e.schemaDeflated,e.kiwiData,e.figKiwiVersion),{level:0}],"thumbnail.png":[e.thumbnailPNG,{level:0}],"meta.json":new TextEncoder().encode(e.metaJSON)};for(let n of e.images??[])t[n.name]=[n.data,{level:0}];return tr(t)}function kR(e,t,n,r=new Map){let i=new Map;for(let o of n)o.type==="INSTANCE"&&Ei(o.instanceOverrides,(s,a)=>{if(a!=="width"&&a!=="height")return;let l=s||o.id,u=i.get(l)??new Set;u.add(a),i.set(l,u)});for(let o of n){let s=Mr(o.boundVariables,r.get(o.id)??1,o.variableBindingScales);e.updateNode(o.id,{variableBindingScales:s});for(let a in o.boundVariables){if((a==="width"||a==="height")&&t.has(o.id)||i.get(o.id)?.has(a))continue;let l=o.boundVariables[a],u=e.variables.get(l);if(!u)continue;let c=e.getNodeVariableModeId(o.id,u.collectionId),f=e.resolveVariable(l,c);if(typeof f!="number")continue;let g=a==="opacity"?f:f*(s[a]??1),h=$c(a,g);h&&e.updateNode(o.id,h)}}}function _R(e,t){for(let n of t){let r=_i(e,n);(r.fills||r.strokes)&&e.updateNode(n.id,r)}}function LR(e,t){for(let n of t){if(n.type!=="TEXT")continue;let r=n.boundVariables.text;if(!r)continue;let i=Cs(e.resolveVariableForNode(n.id,r));i===void 0||i===n.text||e.updateNode(n.id,{text:i})}}function VR(e,t){let n=e.getNode(e.rootId);if(!n||!t)return;n.source.format="fig",n.pluginData=t.pluginData?.map(i=>({pluginId:i.pluginID,key:i.key,value:i.value}))??[],n.source.fig.rawNodeFields.strokeJoin=t.strokeJoin,n.source.fig.rawNodeFields.strokeWeight=t.strokeWeight;let r=ut(t,Ze.enabledLibraries);for(let i of r??[])e.enabledLibraries.set(i.libraryId,i)}var FR=new Set(["VISIBLE","TEXT_DATA","OVERRIDDEN_SYMBOL_ID","SLOT_CONTENT_ID"]);function GR(e){for(let t of e.componentPropDefs??[]){let n=t.varValue?.value;t.initialValue||!n||(t.initialValue=n.symbolIdValue?.guid?{guidValue:structuredClone(n.symbolIdValue.guid)}:structuredClone(n))}}function BR(e){GR(e);let t=e.parameterConsumptionMap,n=structuredClone(e.componentPropRefs??[]);for(let r of t?.entries??[]){let i=r.variableData?.value?.propRefValue?.defId;if(r.variableData?.dataType!=="PROP_REF"||!i||!r.variableField||!FR.has(r.variableField))continue;let o={defID:structuredClone(i),componentPropNodeField:r.variableField},s=n.findIndex(a=>a.componentPropNodeField===r.variableField);s===-1?n.push(o):n[s]=o}n.length&&(e.componentPropRefs=n)}var Wv=["styleIdForFill","styleIdForStrokeFill","styleIdForText","styleIdForEffect","styleIdForGrid"];function UR(e,t,n){let r=new Set;return kr(e,i=>{for(let o of[i,...i.textData?.styleOverrideTable??[]])for(let s of Wv){let a=o[s];if(!a)continue;let l=a.guid?ie(a.guid):t(a);l&&n.has(l)&&r.add(l)}}),r}function zR(e,t,n){for(let r of wr(e))n(r,[...t,...r.guidPath?.guids??[]]);for(let r of e.derivedSymbolData??[])n(r,[...t,...r.guidPath?.guids??[]])}function HR(e){return(t,n,r)=>{let i=(s,a,l)=>{if(!s?.assetRef||s.guid)return;let u=e(s);if(!u){r?.({sourceId:n,field:a,key:s.assetRef.key,path:structuredClone(l)});return}s.guid=lt(u)},o=(s,a)=>{BR(s);for(let u of It(s))Bc(u.variableData,c=>i(c,u.variableField??"unknown",a));for(let[u,c]of[["fillPaints",s.fillPaints],["strokePaints",s.strokePaints]])for(let f of c??[])i(f.colorVar?.value?.alias,u,a);let l=s.variableModeBySetMap;for(let u of l?.entries??[])i(u.variableSetID,"variableModeBySetMap",a);for(let u of Wv)i(s[u],u,a);for(let u of s.textData?.styleOverrideTable??[])o(u,a);zR(s,a,o)};o(t,[])}}function WR(e){let t=HR(ma(e));return(n,r)=>t(n,n.guid?ie(n.guid):"unknown",r)}function jR(e,t,n,r=()=>!1){let i=n,o=new Map,s=h=>{if(h.mainComponentId===null){h.properties.type==="SYMBOL"&&o.set(h.sourceId,h);for(let d of h.children)s(d)}};for(let h of e)s(h);let a=[],l=new Set,u=new Set,c=h=>{let d=new Set,v=h;for(;v;){if(d.has(v))throw new Error(`Cyclic source hierarchy at ${v}`);d.add(v);let T=i.get(v);if(!T)throw new Error(`Missing source ancestor ${v}`);if(T.type==="CANVAS")return v;v=qn(T)}throw new Error(`Component ${h} has no source page`)},f=h=>{for(let d of pa(h))d.mainComponentId!==null&&g(d.mainComponentId),d.properties.type==="SYMBOL"&&g(d.sourceId)},g=h=>{if(l.has(h))return;if(r(h)){l.add(h);return}if(u.has(h))throw new Error(`Cyclic component dependency ${h}`);u.add(h);let d=i.get(h);if(!d?.parentIndex?.guid)throw new Error(`Missing component parent ${h}`);let v=c(h),T=o.get(h)??t(h);for(let E of T.children)f(E);a.push({sourceId:h,parentSourceId:ie(d.parentIndex.guid),pageSourceId:v,occurrence:T}),l.add(h),u.delete(h)};for(let h of e)f(h);return a}var Bf=class{constructor(e,t){se(this,"source");se(this,"decode");this.source=e,this.decode=t}get size(){return this.source.size}get(e){let t=this.source.get(e);return t===void 0?void 0:this.decode(t)}has(e){return this.source.has(e)}keys(){return this.source.keys()}*values(){for(let e of this.source.values())yield this.decode(e)}*entries(){for(let[e,t]of this.source)yield[e,this.decode(t)]}forEach(e){for(let[t,n]of this.entries())e(n,t,this)}[Symbol.iterator](){return this.entries()}};function $R(e,t){if(t){for(let n of t)if(e.get(n)?.type!=="CANVAS")throw new Error(`Unknown page ${n}`)}}function XR(e,t,n,r){for(let i of t){let o=new Set([i]),s=e.get(i),a=s?qn(s):void 0;for(;a!==void 0;){if(o.has(a))throw new Error(`Cyclic source hierarchy at ${a}`);if(o.add(a),n.has(a))break;if(n.add(a),s=e.get(a),!s){r.add(a);break}a=qn(s)}}}function KR(e,t,n,r=i=>i){let i=ma(e),{sources:o,children:s}=n,a=new Set(o.keys()),l=new Set,u=new Set,c=new Set,f=new Set,g=new Set,h=new Set,d=new Set,v=new Set;$R(o,t);let T=e.filter(E=>E.type==="CANVAS"&&(t?t.has(Yn(E)??""):E.internalOnly!==!0)).flatMap(E=>Yn(E)??[]);for(;T.length;){let E=T.pop();if(!E||l.has(E))continue;let S=o.get(E);if(!S){h.has(E)?g.add(E):d.has(E)?v.add(E):f.add(E);continue}l.add(E);let C=r(S),A=_v(C,i,O=>c.add(O));for(let O of A)h.add(O);let _=Lv(C);for(let O of _)d.add(O);T.push(...(s.get(E)??[]).flatMap(O=>Yn(O)??[]),...UR(C,i,a),...A,..._)}return XR(o,l,u,f),{contentIds:l,ancestorIds:u,missingIds:f,missingComponentIds:g,missingSlotContentIds:v,externalPreferredKeys:c}}function YR(e,t){let n=e.componentPropDefs;n&&(e.componentPropDefs=n.map(r=>{if(!r.parentPropDefId)return r;let i=ie(r.parentPropDefId);for(let o of t){let s=(o.componentPropDefs??[]).filter(a=>a.id&&ie(a.id)===i);if(s.length>1)throw new Error(`Ambiguous parent property ${i}`);if(s.length===1)return{...structuredClone(s[0]),...r}}throw new Error(`Missing parent property ${i}`)}))}var qR=["guid","parentIndex","type","phase","name","internalOnly","key","version","styleType","overrideKey"];function ZR(e,t){let n=zf(e,void 0,{NodeChange:qR});return{figKiwiVersion:n.figKiwiVersion,figSchemaDeflated:n.figSchemaDeflated,reader:jv(QR(n.nodeChanges),t),blobs:n.blobs,images:n.images,records:n.nodeChanges}}function JR(e){let t=new Map;for(let n of e)if(n.guid&&typeof n.key=="string"){let r=ie(n.guid);t.set(n.key,r),typeof n.version=="string"&&t.set(`${n.key}@${n.version}`,r)}return t}function Uf(e){return e.type==="VARIABLE"||e.type==="VARIABLE_SET"}function Bv(e){let t=fc(e);if(!t)throw new Error("Record header has no archive bytes to read it whole");return Gf([t]),t}function QR(e){let t=e.filter(g=>g.phase!=="REMOVED"),n=da(t),r=WR(t),i=JR(t),o=[];for(let g of t)r(Bv(g),h=>o.push(h));let s=new Map,a=new Bf(n.sources,g=>g.styleType?c(g):g),l=new Set,u=(g,h)=>{if(l.has(g))throw new Error("Cyclic component-property ancestry");l.add(g);try{let d=Bv(g);r(d);let v=[];for(let E=n.sources.get(qn(g)??"");E;E=n.sources.get(qn(E)??""))v.push(h(E));YR(d,v);let T=E=>{Xc(a,E,i);for(let S of wr(E))T(S)};return T(d),d}finally{l.delete(g)}},c=g=>{let h=s.get(g);return h||(h=u(g,c),s.set(g,h)),h};return{records:t,index:n,bindingDiagnostics:o,scope:()=>{let g=new Map,h=d=>{let v=s.get(d)??g.get(d);if(v)return v;let T=u(d,h);return g.set(d,T),T};return h},shared:c,interpreterIndex:()=>{let{sources:g,children:h}=da(t.filter(v=>!Uf(v))),d=new WeakMap;return{sources:new Bf(g,c),children:new Bf(h,v=>{let T=d.get(v);return T||(T=v.map(c),d.set(v,T)),T})}}}}function eD(e){let t;return{records:e,get sourceInterpreter(){return t??(t=kf(e.interpreterIndex())),t}}}function jv(e,t){let n="sourceInterpreter"in e?e:eD(e),{records:r,index:i,bindingDiagnostics:o}=n.records,s=r,a=n.records.scope(),l=s.filter(Uf),u=KR(s,t,i,a);if(u.missingIds.size)throw new Error(`Missing reachable sources: ${[...u.missingIds].join(", ")}`);let c=s.filter(v=>!Uf(v)&&(v.type==="CANVAS"||v.guid&&(u.contentIds.has(ie(v.guid))||u.ancestorIds.has(ie(v.guid))))).map(a),f=n.sourceInterpreter,g=kf(da(c)),h=s.filter(v=>v.type==="CANVAS").toSorted(Pf).map(v=>{if(!v.guid)throw new Error("Page has no GUID");return{id:ie(v.guid),name:v.name??"",position:v.parentIndex?.position??null,internalOnly:v.internalOnly===!0}}),d=new Set(h.map(v=>v.id));return{selectPages(v){return jv(n,v)},get sourceRecords(){return structuredClone(s.map(a))},get documentRecord(){let v=s.find(T=>T.type==="DOCUMENT");return structuredClone(v&&a(v))},dependencyClosure:u,pages:h,get resources(){return structuredClone(l.map(a))},bindingDiagnostics:o,readPage(v,T={}){if(!d.has(v))throw new Error(`Unknown page ${v}`);let E=g.page(v,T);return E.children=E.children.filter(S=>S.properties.isSlotContent!==!0),E},planComponents(v,T={},E){return jR(v,S=>f.component(S,T),i.sources,E)},readComponent:f.component}}function tD(e,t){let{value:n,dataType:r,resolvedDataType:i}=e.variableData;if(!n)throw new Error("Missing variable value");let o=r??i;if(o==="ALIAS"){let s=t(n.alias);if(!s)throw new Error("Unresolved variable alias");return{aliasId:s}}if(o==="COLOR"&&n.colorValue)return structuredClone(n.colorValue);if(o==="BOOLEAN"&&n.boolValue!==void 0)return n.boolValue;if(o==="STRING"&&n.textValue!==void 0)return n.textValue;if(o==="FLOAT"&&n.floatValue!==void 0)return n.floatValue;throw new Error(`Unsupported variable value ${o}`)}function nD(e,t,n){let r=e.variableDataValues?.entries??[];if(!r.length)throw new Error("Missing mode values");let i={};for(let o of r){let s=ie(o.modeID);if(!t.includes(s))throw new Error("Unknown mode");i[s]=tD(o,n)}return i}function rD(e,t,n){let r=(i,o)=>{if(!n)throw new Error(`Unsupported document resource ${i.type}: ${o}`);n(structuredClone(i))};for(let i of t){if(i.type!=="VARIABLE_SET")continue;let o=i.variableSetModes??[];if(!i.guid||o.length===0){r(i,"missing collection identity or modes");continue}let s=ia(Yi(i)),a=pf(i);e.addCollection({id:ie(i.guid),name:i.name??"Variables",modes:o.map(l=>{let u=ie(l.id);return{modeId:u,name:l.name,condition:a[u],...l.sortPosition?{sortPosition:l.sortPosition}:{}}}),defaultModeId:ie(o[0].id),variableIds:[],modeAttribute:mf(i),pluginData:s.length>0?s:void 0,key:typeof i.key=="string"?i.key:void 0,version:typeof i.version=="string"?i.version:void 0})}iD(e,t,r)}function iD(e,t,n){let r=ma(t);for(let i of t){if(i.type!=="VARIABLE")continue;let o=i.variableResolvedType,s=i.variableSetID?r(i.variableSetID):i.parentIndex?.guid&&ie(i.parentIndex.guid),a=s&&e.variableCollections.get(s);if(!i.guid||!a||!s||o!=="COLOR"&&o!=="BOOLEAN"&&o!=="STRING"&&o!=="FLOAT"){n(i,"unresolved collection, identity or type");continue}let l={};try{Object.assign(l,nD(i,a.modes.map(c=>c.modeId),r))}catch(c){n(i,c instanceof Error?c.message:"Invalid mode value");continue}let u=hf(i);e.addVariable({id:ie(i.guid),name:i.name??"Variable",type:o,collectionId:s,valuesByMode:l,...u,...df(i,l)})}}function $v(e,t={}){let{reader:n,blobs:r,images:i}=ZR(e,t.pageIds);return lD(n,r,{...t,images:t.images??new Map(i)})}function oD(e){let t=new Map;for(let n of e.getAllNodes())for(let r of n.componentPropertyDefinitions)t.set(r.id,r.type);return t}function sD(e,t){let n=!0,r=1,i=new Li(()=>n?`0:${r++}`:Ds());n=!1,VR(i,e.documentRecord);for(let[o,s]of t.images??[])i.images.set(o,s.slice());i.applyImportedStateDuring(()=>rD(i,e.resources,t.onUnsupportedResource),()=>`0:${r++}`);for(let o of i.getPages())i.deleteNode(o.id);return{graph:i,nextImportedId:r,sources:new Map,components:new Map,componentIds:new Map,savedSizeNodes:new Set}}function aD(e,t){e.preserveSourceMetadataDuring(()=>{for(let[n,r]of t){let i=e.getNode(n);if(!i)continue;let o=new Set(zv(e,i).flatMap(a=>a.source.editedFields)),s={};i.width!==r.width&&!o.has("width")&&(s.width=r.width),i.height!==r.height&&!o.has("height")&&(s.height=r.height),Object.keys(s).length>0&&e.updateNode(n,s)}})}function lD(e,t,n,r){for(let a of e.bindingDiagnostics){if(!n.onUnresolvedBinding)throw new Error(`Unresolved binding ${a.sourceId}: ${a.field}`);n.onUnresolvedBinding(a)}let i=e.pages.map(a=>e.readPage(a.id,n)),o=r??sD(e,n),s=e.planComponents(i,n,a=>o.components.has(a));return o.graph.applyImportedStateDuring(()=>uD(i,s,t,o,r!==void 0),()=>`0:${o.nextImportedId++}`)}function uD(e,t,n,r,i){let{graph:o,sources:s,components:a,savedSizeNodes:l,componentIds:u}=r,c=new Set(o.nodes.keys()),f=new Map,g=new Map,h=S=>{for(let[C,A]of S)C.derivedSize&&(l.add(A.id),g.set(A.id,{width:A.width,height:A.height})),C.layoutScale!==void 0&&f.set(A.id,C.layoutScale)},d=(S,C)=>{if(S.mainComponentId!==null)return;let A=s.get(S.sourceId);if(A){for(let V of S.children)d(V,A);return}let{nodeType:_,...O}=qi(S.properties,n);if(_==="DOCUMENT"||_==="VARIABLE")throw new Error(`Unsupported scene type ${_}`);let k=o.createNode(_,C,O);s.set(S.sourceId,k.id),k.type==="COMPONENT"&&u.set(S.sourceId,k.id);for(let V of S.children)d(V,k.id)};for(let S of e)d(S,o.rootId);for(let S of t){if(a.has(S.sourceId))continue;let C=s.get(S.parentSourceId);if(!C)throw new Error(`Unmaterialized component parent ${S.parentSourceId}`);let A=new Map,_=k=>{let V=s.get(k.sourceId),F=V?o.getNode(V):void 0;F&&A.set(k,F),k.mainComponentId===null&&k.children.forEach(_)};_(S.occurrence);let O=_f(o,C,S.occurrence,u,{blobs:n,sourceChildren:Ff(S.occurrence,a),existingNodes:A});h(O.nodes),Vf(S.occurrence,O,a),a.set(S.sourceId,{occurrence:S.occurrence,materialized:O}),u.set(S.sourceId,O.root.id),s.set(S.sourceId,O.root.id)}let v=new Set,T=S=>{if(S.properties.type==="SYMBOL")return;let C=s.get(S.sourceId);if(!C)throw new Error(`Missing source container ${S.sourceId}`);let A=[];for(let O of S.children){if(i&&Lf(O,o,a),O.mainComponentId!==null&&!s.has(O.sourceId)){let V=_f(o,C,O,u,{blobs:n,sourceChildren:Ff(O,a)});h(V.nodes),Vf(O,V,a),i&&(RR(o,V),V.root.componentId&&v.add(V.root.id)),s.set(O.sourceId,V.root.id)}else O.mainComponentId===null&&O.properties.type!=="SYMBOL"&&T(O);let k=s.get(O.sourceId);if(!k)throw new Error(`Missing assembled child ${O.sourceId}`);A.push(k)}let _=o.getNode(C);_&&(_.childIds=[...A,..._.childIds.filter(O=>!A.includes(O))])};for(let S of e)T(S);for(let S of v)o.syncInstance(S);v.size>0&&aD(o,g);for(let S of o.getAllNodes())c.has(S.id)||S.styleRuns.length===0||(S.styleRuns=qu(S.styleRuns,{variable:C=>C,style:C=>C,node:C=>s.get(C)??C}));let E=[...o.nodes.values()].filter(S=>!c.has(S.id));return r.definitionTypes??(r.definitionTypes=oD(o)),wv(o,s,E,r.definitionTypes),o.preserveSourceMetadataDuring(()=>{kv(o,E),kR(o,l,E,f),_R(o,E),LR(o,E)}),r}async function Xv(e,t){e[0]===80&&e[1]===75&&_r(e);let n=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength),r=zf(n);if(r.nodeChanges.length>yf)throw new Error("\u56FE\u5C42\u8D85\u8FC7 50,000 \u4E2A\uFF0C\u8BF7\u62C6\u5206 Figma \u6587\u4EF6\u3002");let{graph:i}=$v(n,{pageIds:new Set(r.nodeChanges.filter(o=>o.type==="CANVAS"&&o.guid).map(o=>`${o.guid.sessionID}:${o.guid.localID}`)),onUnsupportedResource:()=>t.add("fig-resource","\u90E8\u5206 Figma \u4E13\u5C5E\u8D44\u6E90\u6CA1\u6709\u5BF9\u5E94\u7684\u76EE\u6807\u683C\u5F0F\u3002"),onUnsupportedVariableExpression:()=>t.add("variable","\u53D8\u91CF\u8868\u8FBE\u5F0F\u6309\u5F53\u524D\u5916\u89C2\u8F6C\u6362\u3002"),onUnresolvedBinding:()=>t.add("binding","\u672A\u80FD\u89E3\u6790\u7684\u53D8\u91CF\u7ED1\u5B9A\u6309\u4FDD\u5B58\u503C\u8F6C\u6362\u3002")});for(let o of r.nodeChanges)(o.prototypeInteractions?.length||o.reactions?.length)&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",o.name);return{graph:i,thumbnail:r.thumbnailPNG||Kn}}async function Kv(e,t,n=Kn,r){await pc();let i=new Map([[e.rootId,{sessionID:0,localID:0}]]),o=1;for(let S of e.nodes.values())S.id!==e.rootId&&i.set(S.id,{sessionID:1,localID:o++});let s=i.get(e.rootId),a=[cf(s,"srgb")],l=[],u={value:o};e.getPages(!0).forEach((S,C)=>{let A=i.get(S.id);a.push({...ff(A,s,String.fromCharCode(33+C),S.name),internalOnly:!!S.internalOnly}),e.getChildren(S.id).forEach((_,O)=>{a.push(...uf(_,A,O,u,e,l,{nodeIdToGuid:i}))})});let c=new Map([...i].map(([S,C])=>[`${C.sessionID}:${C.localID}`,e.getNode(S)])),f=new Set;for(let S of a){let C=c.get(`${S.guid.sessionID}:${S.guid.localID}`);if(!C||C.id===e.rootId||C.type==="CANVAS")continue;f.add(C.id);let A=Gr(C);S.transform={m00:A.a,m01:A.c,m02:A.tx,m10:A.b,m11:A.d,m12:A.ty},S.fontName&&C.fontPostscript&&(S.fontName.postscript=C.fontPostscript)}r&&Vr(e,f,r);let g=af(a,e.images),h=hc({type:"NODE_CHANGES",sessionID:0,ackID:0,nodeChanges:a,blobs:l.map(S=>({bytes:S}))}),d=n.length>24?new DataView(n.buffer,n.byteOffset,n.byteLength):null,v=d?.getUint32(16)||1,T=d?.getUint32(20)||1,E=JSON.stringify({client_meta:{background_color:{r:1,g:1,b:1,a:1},thumbnail_size:{width:v,height:T},render_coordinates:{x:0,y:0,width:v,height:T}},file_name:t,developer_related_links:[],exported_at:new Date().toISOString()});return Hv({schemaDeflated:Yr(mc()),kiwiData:h,thumbnailPNG:n,images:lf(e.images,g),metaJSON:E})}var cD={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0};function Hf(e){let t=e.m00*e.m11-e.m01*e.m10;if(Math.abs(t)<1e-12)return cD;let n=e.m11/t,r=-e.m01/t,i=-e.m10/t,o=e.m00/t;return{m00:n,m01:r,m02:-(n*e.m02+r*e.m12),m10:i,m11:o,m12:-(i*e.m02+o*e.m12)}}function fD(e,t){return{x:e.m00*t.x+e.m01*t.y+e.m02,y:e.m10*t.x+e.m11*t.y+e.m12}}function Br(e,t){return fD(Hf(e),t)}function dD(e,t,n){return Hf({m00:t.x-e.x,m01:n.x,m02:e.x-n.x/2,m10:t.y-e.y,m11:n.y,m12:e.y-n.y/2})}function ga(e,t,n=1,r=1,i=r/n){let o={x:t.x-e.x,y:t.y-e.y};return dD(e,t,{x:-o.y*r*i/n,y:o.x*n*i/r})}function ya(e,t,n){let r={x:2*(t.x-e.x),y:2*(t.y-e.y)},i={x:2*(n.x-e.x),y:2*(n.y-e.y)};return Hf({m00:r.x,m01:i.x,m02:e.x-(r.x+i.x)/2,m10:r.y,m11:i.y,m12:e.y-(r.y+i.y)/2})}var to=(e={})=>ct(e.red,e.green,e.blue,e.alpha??1),no=e=>({_class:"color",red:e.r,green:e.g,blue:e.b,alpha:e.a}),ro=e=>`{${e[0]}, ${e[1]}}`,Yv=["NORMAL","DARKEN","MULTIPLY","COLOR_BURN","LIGHTEN","SCREEN","COLOR_DODGE","OVERLAY","SOFT_LIGHT","HARD_LIGHT","DIFFERENCE","EXCLUSION","HUE","SATURATION","COLOR","LUMINOSITY","PLUS_DARKER","PLUS_LIGHTER"],Wf=e=>Yv[e]||"NORMAL",jf=e=>Math.max(0,Yv.indexOf(e)),qv=["UNION","SUBTRACT","INTERSECT","EXCLUDE"];function pD(e,t,n){let r=(e.points||[]).map(o=>({...o,p:Xn(o.point).map((s,a)=>s*(a?n:t)),from:Xn(o.curveFrom).map((s,a)=>s*(a?n:t)),to:Xn(o.curveTo).map((s,a)=>s*(a?n:t))}));if(!r.length)return"";let i=`M${r[0].p.join(" ")}`;for(let o=1;o<=r.length-(e.isClosed?0:1);o++){let s=r[o-1],a=r[o%r.length];i+=s.hasCurveFrom||a.hasCurveTo?` C${(s.hasCurveFrom?s.from:s.p).join(" ")} ${(a.hasCurveTo?a.to:a.p).join(" ")} ${a.p.join(" ")}`:` L${a.p.join(" ")}`}return i+(e.isClosed?" Z":"")}async function Zv(e,t){let n=_r(e),r=Lr(n,"document.json"),i=(r.pages||[]).map(h=>h._ref?Lr(n,`${h._ref}.json`):h);if(!i.length)throw new Error("Sketch \u6587\u4EF6\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u9875\u9762\u3002");let o=oa(),s=new Map;for(let[h,d]of Object.entries(n))h.startsWith("images/")&&d.length&&s.set(h,await aa(o,d));let a=new Map;function l(h){h.symbolID&&h._class==="symbolMaster"&&a.set(h.symbolID,h),(h.layers||[]).forEach(l)}i.forEach(l),(r.foreignSymbols||[]).forEach(h=>h.symbolMaster&&l(h.symbolMaster));function u(h,d,v,T){let E=Ut(to(h.color),h.contextSettings?.opacity??1);if(E.blendMode=Wf(h.contextSettings?.blendMode),E.visible=h.isEnabled!==!1,h.fillType===1){let S=h.gradient||{},C=Xn(S.from,[0,.5]),A=Xn(S.to,[1,.5]);E={...E,type:S.gradientType===1?"GRADIENT_RADIAL":"GRADIENT_LINEAR",gradientStops:(S.stops||[]).map(_=>({position:oe(_.position),color:to(_.color)})),gradientTransform:S.gradientType===1?ya({x:C[0],y:C[1]},{x:A[0],y:A[1]},{x:C[0]-(A[1]-C[1]),y:C[1]+(A[0]-C[0])}):ga({x:C[0],y:C[1]},{x:A[0],y:A[1]},d||1,v||1)}}else if(h.fillType===4){let S=s.get(h.image?._ref);S?E={...E,type:"IMAGE",imageHash:S,imageScaleMode:h.patternFillType===2?"FIT":h.patternFillType===0?"TILE":"FILL"}:t.add("missing-image","\u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",T)}else h.fillType&&h.fillType!==0&&t.add("sketch-fill","\u90E8\u5206 Sketch \u4E13\u5C5E\u586B\u5145\u6309\u57FA\u7840\u989C\u8272\u8F6C\u6362\u3002",T);return E}function c(h,d,v){let T=h.style||{},E=(T.fills||[]).map(A=>u(A,d,v,h.name)),S=(T.borders||[]).map(A=>({...u(A,d,v,h.name),weight:oe(A.thickness,1),align:["CENTER","INSIDE","OUTSIDE"][A.position]||"CENTER"})),C=[...(T.shadows||[]).map(A=>({...A,kind:"DROP_SHADOW"})),...(T.innerShadows||[]).map(A=>({...A,kind:"INNER_SHADOW"}))].map(A=>({type:A.kind,color:to({...A.color,alpha:(A.color?.alpha??1)*(A.contextSettings?.opacity??1)}),radius:oe(A.blurRadius),spread:oe(A.spread),offset:{x:oe(A.offsetX),y:oe(A.offsetY)},visible:A.isEnabled!==!1,blendMode:Wf(A.contextSettings?.blendMode)}));return T.blur&&(C.push({type:T.blur.type===3?"BACKGROUND_BLUR":"LAYER_BLUR",color:ct(),radius:oe(T.blur.radius),spread:0,offset:{x:0,y:0},visible:T.blur.isEnabled!==!1}),[0,3].includes(T.blur.type??0)||t.add("sketch-blur","\u8FD0\u52A8\u6216\u7F29\u653E\u6A21\u7CCA\u76EE\u524D\u53EA\u80FD\u6309\u666E\u901A\u6A21\u7CCA\u8F6C\u6362\u3002",h.name)),{fills:E,strokes:S,effects:C,opacity:T.contextSettings?.opacity??1,blendMode:Wf(T.contextSettings?.blendMode),dashPattern:T.borderOptions?.dashPattern||[],strokeCap:["NONE","ROUND","SQUARE"][T.borderOptions?.lineCapStyle]||"NONE",strokeJoin:["MITER","ROUND","BEVEL"][T.borderOptions?.lineJoinStyle]||"MITER"}}function f(h={}){let d=h.MSAttributedStringFontAttribute?.attributes||{},v=d.name||"ArialMT",T=h.paragraphStyle||{};return{fontFamily:/^Arial(?:MT|-)/.test(v)?"Arial":v.replace(/[-_](Regular|Medium|Semibold|Bold|Light|Heavy|Italic|Black).*$/i,"").replace(/^(PingFang)(SC|TC|HK)/,"$1 $2"),fontWeight:ua(v),italic:/italic|oblique/i.test(v),fontSize:oe(d.size,14),fills:h.MSAttributedStringColorAttribute?[Ut(to(h.MSAttributedStringColorAttribute))]:void 0,letterSpacing:oe(h.kerning),lineHeight:T.maximumLineHeight||T.minimumLineHeight||null,textDecoration:h.underlineStyle?"UNDERLINE":h.strikethroughStyle?"STRIKETHROUGH":"NONE"}}function g(h,d,v=0,T=1,E=1,S=[]){if(v>128)throw new Error("\u56FE\u5C42\u5D4C\u5957\u8FC7\u6DF1\u3002");h._class==="slice"&&t.add("sketch-slice","\u5207\u7247\u533A\u57DF\u4FDD\u7559\u4E3A\u65E0\u586B\u5145\u753B\u6846\uFF0C\u5207\u7247\u5BFC\u51FA\u8BBE\u7F6E\u4E0D\u4FDD\u7559\u3002",h.name);let C=h.frame||{},A=oe(C.width)*T,_=oe(C.height)*E,O={page:"CANVAS",artboard:"FRAME",slice:"FRAME",symbolMaster:"FRAME",group:"GROUP",shapeGroup:"GROUP",rectangle:"RECTANGLE",oval:"ELLIPSE",text:"TEXT",bitmap:"RECTANGLE",shapePath:"VECTOR",triangle:"VECTOR",star:"VECTOR",polygon:"VECTOR",symbolInstance:"GROUP"}[h._class];O||(O=h.layers?"GROUP":"RECTANGLE",t.add("sketch-node","\u90E8\u5206 Sketch \u56FE\u5C42\u6309\u57FA\u7840\u56FE\u5F62\u6216\u5206\u7EC4\u8F6C\u6362\u3002",h.name));let k={name:h.name||h._class,x:oe(C.x)*T,y:oe(C.y)*E,width:A,height:_,rotation:-oe(h.rotation),flipX:!!h.isFlippedHorizontal,flipY:!!h.isFlippedVertical,visible:h.isVisible!==!1,locked:!!h.isLocked,isMask:!!h.hasClippingMask,clipsContent:h._class==="artboard",...c(h,A,_)};if(h._class==="shapeGroup"){let Y=[...new Set((h.layers||[]).slice(1).map(I=>I.booleanOperation).filter(I=>I>=0))];Y.length===1?(O="BOOLEAN_OPERATION",k.booleanOperation=qv[Y[0]]):Y.length>1&&t.add("sketch-boolean-mixed","\u4E00\u4E2A\u5F62\u72B6\u7EC4\u4E2D\u6DF7\u5408\u4E86\u591A\u79CD\u5E03\u5C14\u8FD0\u7B97\uFF0C\u76EE\u524D\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",h.name)}if(h._class==="group"&&(k.fills=[]),h.hasBackgroundColor&&(k.fills=[Ut(to(h.backgroundColor))]),O==="RECTANGLE"){if(k.cornerRadius=oe(h.fixedRadius||h.points?.[0]?.cornerRadius)*T,h.points?.length===4){let Y=h.points.map(I=>oe(I.cornerRadius,oe(h.fixedRadius))*T);Object.assign(k,{independentCorners:Y.some(I=>I!==Y[0]),topLeftRadius:Y[0],topRightRadius:Y[1],bottomRightRadius:Y[2],bottomLeftRadius:Y[3]})}if(h._class==="bitmap"){let Y=s.get(h.image?._ref);Y?k.fills=[{...Ut(ct(1,1,1)),type:"IMAGE",imageHash:Y,imageScaleMode:"FILL"}]:t.add("missing-image","\u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",h.name)}}if(O==="VECTOR"){let Y=pD(h,A,_);Y&&Object.assign(k,eo(Y,h.style?.windingRule===0?"NONZERO":"EVENODD"))}if(O==="TEXT"){let Y=h.attributedString||{},I=h.style?.textStyle?.encodedAttributes||Y.attributes?.[0]?.attributes||{},R=f(I);(!R.fills||k.fills.length)&&delete R.fills,Object.assign(k,R,{text:Y.string||"",textAutoResize:h.textBehaviour===0?"WIDTH_AND_HEIGHT":h.textBehaviour===1?"HEIGHT":"NONE",textAlignHorizontal:["LEFT","RIGHT","CENTER","JUSTIFIED"][I.paragraphStyle?.alignment]||"LEFT",fontPostscript:I.MSAttributedStringFontAttribute?.attributes?.name}),k.fontSize*=E,k.letterSpacing*=T,k.lineHeight&&(k.lineHeight*=E),k.styleRuns=(Y.attributes||[]).map(x=>({start:oe(x.location),length:oe(x.length),style:f(x.attributes)})),k.styleRuns.forEach(x=>{x.style.fontSize*=E,x.style.letterSpacing*=T,x.style.lineHeight&&(x.style.lineHeight*=E)})}let V=sa(o,O,d,k);(h._class==="symbolMaster"||h._class==="symbolInstance")&&t.add("sketch-symbol","Sketch \u7B26\u53F7\u8F6C\u6362\u4E3A\u53EF\u7F16\u8F91\u56FE\u5C42\uFF0C\u7B26\u53F7\u5173\u8054\u4E0D\u4FDD\u7559\u3002",h.name),h._class==="shapeGroup"&&O!=="BOOLEAN_OPERATION"&&t.add("sketch-shape-group","\u590D\u5408\u8DEF\u5F84\u6309\u53EF\u7F16\u8F91\u5B50\u8DEF\u5F84\u4FDD\u7559\uFF0C\u5408\u6210\u586B\u5145\u89C4\u5219\u5C1A\u4E0D\u80FD\u4FDD\u8BC1\u7B49\u4EF7\u8F6C\u6362\u3002",h.name),h.flow?.destinationArtboardID&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",h.name);let F=h.layers||[],Q=T,ne=E;if(h._class==="symbolInstance"){let R=function(x){for(let P of I)P.overrideName?.startsWith(x.do_objectID+"_")&&(P.overrideName.endsWith("_stringValue")&&x.attributedString&&(x.attributedString.string=String(P.value)),P.overrideName.endsWith("_image")&&(x.image=P.value),P.overrideName.endsWith("_symbolID")&&(x.symbolID=P.value));(x.layers||[]).forEach(R)};if(S.includes(h.symbolID)){t.add("symbol-cycle","\u5FAA\u73AF\u7B26\u53F7\u5F15\u7528\u5DF2\u505C\u6B62\u5C55\u5F00\u3002",h.name);return}let Y=a.get(h.symbolID);if(!Y){t.add("missing-symbol","\u90E8\u5206\u7B26\u53F7\u5B9A\u4E49\u672A\u5305\u542B\u5728\u6587\u4EF6\u4E2D\uFF0C\u65E0\u6CD5\u5C55\u5F00\u3002",h.name);return}F=structuredClone(Y.layers||[]);let I=h.overrideValues||[];F.forEach(R),Q=A/(Y.frame?.width||A||1),ne=_/(Y.frame?.height||_||1),S=[...S,h.symbolID]}F.forEach(Y=>g(Y,V.id,v+1,Q,ne,S))}return i.forEach(h=>g(h,o.rootId)),{graph:o,thumbnail:n["previews/preview.png"]}}function Jv(e,t){return{_class:t,do_objectID:Le(),booleanOperation:-1,isFixedToViewport:!1,isFlippedHorizontal:!!e.flipX,isFlippedVertical:!!e.flipY,isLocked:e.locked,isVisible:e.visible,layerListExpandedType:1,name:e.name,nameIsFixed:!0,resizingConstraint:63,resizingType:0,rotation:-e.rotation,shouldBreakMaskChain:!1,exportOptions:{_class:"exportOptions",includedLayerIds:[],layerOptions:0,shouldTrim:!1,exportFormats:[]},frame:{_class:"rect",constrainProportions:!1,height:e.height,width:e.width,x:e.x,y:e.y},clippingMaskMode:0,hasClippingMask:!!e.isMask}}function $f(e,t,n,r){let i=ro([e/(n||1),t/(r||1)]);return{_class:"curvePoint",cornerRadius:0,curveFrom:i,curveTo:i,point:i,hasCurveFrom:!1,hasCurveTo:!1,curveMode:1}}function mD(e,t){let n=Fr(t),r=[],i;for(let o of n)if(o.type==="M")i={points:[$f(o.x,o.y,e.width,e.height)],isClosed:!1},r.push(i);else if(o.type==="Z")i&&(i.isClosed=!0);else if(i){let s=o;if(o.type==="Q"){let l=Xn(i.points.at(-1).point).map((u,c)=>u*(c?e.height:e.width));s={type:"C",x:o.x,y:o.y,x1:l[0]+2/3*(o.x1-l[0]),y1:l[1]+2/3*(o.y1-l[1]),x2:o.x+2/3*(o.x1-o.x),y2:o.y+2/3*(o.y1-o.y)}}let a=$f(s.x,s.y,e.width,e.height);s.type==="C"&&(Object.assign(i.points.at(-1),{hasCurveFrom:!0,curveMode:4,curveFrom:ro([s.x1/(e.width||1),s.y1/(e.height||1)])}),Object.assign(a,{hasCurveTo:!0,curveMode:4,curveTo:ro([s.x2/(e.width||1),s.y2/(e.height||1)])})),i.points.push(a)}return r.map(o=>({...Jv({...e,x:0,y:0,rotation:0,flipX:!1,flipY:!1},"shapePath"),...o,edited:!0,pointRadiusBehaviour:1}))}function Qv(e,t,n,r){let i={},o=new Set,s=new Map;for(let[d,v]of e.images){let T=`images/${d}.${If(v)}`;i[T]=[v,{level:0}],s.set(d,{_class:"MSJSONFileReference",_ref_class:"MSImageData",_ref:T})}function a(d,v=!1){let T=d.gradientTransform?Br(d.gradientTransform,{x:0,y:.5}):{x:0,y:.5},E=d.gradientTransform?Br(d.gradientTransform,{x:1,y:.5}):{x:1,y:.5};return{_class:v?"border":"fill",isEnabled:d.visible,fillType:d.type==="IMAGE"?4:d.type.startsWith("GRADIENT")?1:0,color:no(d.color),contextSettings:{_class:"graphicsContextSettings",opacity:d.opacity,blendMode:jf(d.blendMode)},gradient:{_class:"gradient",elipseLength:1,from:ro([T.x,T.y]),to:ro([E.x,E.y]),gradientType:d.type==="GRADIENT_RADIAL"?1:0,stops:(d.gradientStops||[]).map(S=>({_class:"gradientStop",color:no(S.color),position:S.position}))},image:s.get(d.imageHash),patternFillType:d.imageScaleMode==="FIT"?2:d.imageScaleMode==="TILE"?0:1,patternTileScale:1,noiseIndex:0,noiseIntensity:0,...v?{thickness:d.weight,position:{CENTER:0,INSIDE:1,OUTSIDE:2}[d.align]||0}:{}}}function l(d){let v=S=>({_class:S.type==="INNER_SHADOW"?"innerShadow":"shadow",isEnabled:S.visible,blurRadius:S.radius,spread:S.spread,offsetX:S.offset.x,offsetY:S.offset.y,color:no(S.color),contextSettings:{_class:"graphicsContextSettings",opacity:1,blendMode:jf(S.blendMode)}}),T={_class:"style",do_objectID:Le(),endMarkerType:0,startMarkerType:0,miterLimit:10,windingRule:1,fills:d.fills.map(S=>a(S)),borders:d.strokes.map(S=>a(S,!0)),shadows:d.effects.filter(S=>S.type==="DROP_SHADOW").map(v),innerShadows:d.effects.filter(S=>S.type==="INNER_SHADOW").map(v),contextSettings:{_class:"graphicsContextSettings",opacity:d.opacity,blendMode:jf(d.blendMode)},borderOptions:{_class:"borderOptions",isEnabled:!0,dashPattern:d.dashPattern,lineCapStyle:{NONE:0,ROUND:1,SQUARE:2}[d.strokeCap]||0,lineJoinStyle:{MITER:0,ROUND:1,BEVEL:2}[d.strokeJoin]||0}},E=d.effects.find(S=>S.type.includes("BLUR"));return E&&(T.blur={_class:"blur",isEnabled:E.visible,type:E.type==="BACKGROUND_BLUR"?3:0,radius:E.radius,center:"{0.5, 0.5}",motionAngle:0,saturation:1}),T}let u=d=>({MSAttributedStringFontAttribute:{_class:"fontDescriptor",attributes:{name:d.fontPostscript||(d.fontFamily==="Arial"?d.fontWeight>=700?"Arial-BoldMT":"ArialMT":`${d.fontFamily.replace(/\s+/g,"")}-${ca(d.fontWeight,d.italic).replace(/\s+/g,"")}`),size:d.fontSize}},MSAttributedStringColorAttribute:no(d.fills.find(v=>v.visible)?.color||ct()),kerning:d.letterSpacing||0,paragraphStyle:{_class:"paragraphStyle",alignment:{LEFT:0,RIGHT:1,CENTER:2,JUSTIFIED:3}[d.textAlignHorizontal]||0,...d.lineHeight?{minimumLineHeight:d.lineHeight,maximumLineHeight:d.lineHeight}:{}},underlineStyle:d.textDecoration==="UNDERLINE"?1:0,strikethroughStyle:d.textDecoration==="STRIKETHROUGH"?1:0});function c(d){o.add(d.id);let v={CANVAS:"page",FRAME:"artboard",RECTANGLE:"rectangle",ROUNDED_RECTANGLE:"rectangle",ELLIPSE:"oval",TEXT:"text",LINE:"shapePath",VECTOR:"shapeGroup",STAR:"shapeGroup",POLYGON:"shapeGroup",BOOLEAN_OPERATION:"group",GROUP:"group",COMPONENT:"group",INSTANCE:"group",COMPONENT_SET:"group",SECTION:"group"}[d.type]||"group";v==="artboard"&&e.getNode(d.parentId)?.type!=="CANVAS"&&(v="group");let T={...Jv(d,v),style:l(d)};if(v==="text"){let E=d.styleRuns.length?d.styleRuns.map(S=>({_class:"stringAttribute",location:S.start,length:S.length,attributes:u({...d,...S.style})})):[{_class:"stringAttribute",location:0,length:d.text.length,attributes:u(d)}];T.attributedString={_class:"attributedString",string:d.text,attributes:E},T.style.textStyle={_class:"textStyle",encodedAttributes:u(d),verticalAlignment:{TOP:0,CENTER:1,BOTTOM:2}[d.textAlignVertical]||0},T.textBehaviour=d.textAutoResize==="WIDTH_AND_HEIGHT"?0:d.textAutoResize==="HEIGHT"?1:2,T.automaticallyDrawOnUnderlyingPath=!1,T.dontSynchroniseWithSymbol=!1,T.lineSpacingBehaviour=2,T.glyphBounds="{{0, 0}, {0, 0}}"}else if(v==="rectangle")T.fixedRadius=d.cornerRadius,T.points=[[0,0],[1,0],[1,1],[0,1]].map(([E,S],C)=>({...$f(E*d.width,S*d.height,d.width,d.height),cornerRadius:d.independentCorners?[d.topLeftRadius,d.topRightRadius,d.bottomRightRadius,d.bottomLeftRadius][C]:d.cornerRadius})),T.isClosed=!0,T.edited=!1,T.pointRadiusBehaviour=1;else if(v==="oval")T.isClosed=!0,T.edited=!1;else if(d.type==="BOOLEAN_OPERATION")T._class="shapeGroup",T.layers=e.getChildren(d.id).map((E,S)=>({...c(E),booleanOperation:S===0?-1:Math.max(0,qv.indexOf(d.booleanOperation))})),T.windingRule=1;else if(v==="shapePath"||v==="shapeGroup"){let E=d.type==="LINE"?`M0 0 L${d.width} ${d.height}`:Dt(d),S=mD(d,E);S.length||r.add("vector-empty","\u90E8\u5206\u77E2\u91CF\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u8F6E\u5ED3\u3002",d.name),T._class="shapeGroup",T.layers=S,T.windingRule=1}if(["group","artboard","page"].includes(v)&&d.type!=="BOOLEAN_OPERATION"){if(T.layers=e.getChildren(d.id).map(c),v==="group"&&d.fills.some(E=>E.visible)&&(T.layers.unshift(c({...d,type:"RECTANGLE",name:`${d.name} \u80CC\u666F`,x:0,y:0,rotation:0,flipX:!1,flipY:!1,strokes:[],effects:[],opacity:1})),T.style.fills=[]),T.hasClickThrough=!0,T.groupLayout={_class:"MSImmutableFreeformGroupLayout"},v==="artboard"){let E=d.fills.filter(C=>C.visible),S=E.length===1&&E[0].type==="SOLID"?E[0]:null;Object.assign(T,{hasBackgroundColor:!!S,backgroundColor:no(S?{...S.color,a:S.color.a*S.opacity}:ct(1,1,1)),includeBackgroundColorInExport:!0,resizesContent:!1}),T.style.fills=[],!S&&E.length&&T.layers.unshift(c({...d,type:"RECTANGLE",name:`${d.name} \u80CC\u666F`,x:0,y:0,rotation:0,flipX:!1,flipY:!1,strokes:[],effects:[],opacity:1}))}v==="page"&&Object.assign(T,{horizontalRulerData:{_class:"rulerData",base:0,guides:[]},verticalRulerData:{_class:"rulerData",base:0,guides:[]}})}return T}let f=e.getPages(!0).map(c),g={};for(let d of f)i[`pages/${d.do_objectID}.json`]=rt(JSON.stringify(d)),g[d.do_objectID]={name:d.name,artboards:Object.fromEntries(d.layers.filter(v=>v._class==="artboard").map(v=>[v.do_objectID,{name:v.name}]))};let h={_class:"document",do_objectID:Le(),assets:{_class:"assetCollection",colors:[],gradients:[],images:[],colorAssets:[],gradientAssets:[]},colorSpace:0,currentPageIndex:0,foreignLayerStyles:[],foreignSymbols:[],foreignTextStyles:[],layerStyles:{_class:"sharedStyleContainer",objects:[]},layerTextStyles:{_class:"sharedTextStyleContainer",objects:[]},pages:f.map(d=>({_class:"MSJSONFileReference",_ref_class:"MSImmutablePage",_ref:`pages/${d.do_objectID}`}))};return i["document.json"]=rt(JSON.stringify(h)),i["meta.json"]=rt(JSON.stringify({version:136,compatibilityVersion:99,app:"com.bohemiancoding.sketch3",variant:"NONAPPSTORE",appVersion:"97",build:1,pagesAndArtboards:g,fonts:[...new Set([...e.nodes.values()].filter(d=>d.type==="TEXT").map(d=>d.fontFamily))]})),i["user.json"]=rt("{}"),n&&(i["previews/preview.png"]=[n,{level:0}]),Vr(e,o,r),tr(i)}var Zf=yo(Eo(),1);var nI=yo(eI(),1);var tI=()=>({locateFile:e=>new URL(`${e}?v=1.0.0`,globalThis.location.href).href});var Ia;function hD(){return Ia||(Ia=(0,nI.default)(tI()).catch(e=>{throw Ia=null,e})),Ia}function gD(e){if(e.type==="ELLIPSE")return`M${e.width/2} 0 A${e.width/2} ${e.height/2} 0 1 1 ${e.width/2} ${e.height} A${e.width/2} ${e.height/2} 0 1 1 ${e.width/2} 0 Z`;if(e.type==="LINE")return`M0 0 L${e.width} ${e.height}`;if(!["RECTANGLE","ROUNDED_RECTANGLE"].includes(e.type))return Dt(e);let t=e.width,n=e.height,[r,i,o,s]=(e.independentCorners?[e.topLeftRadius,e.topRightRadius,e.bottomRightRadius,e.bottomLeftRadius]:Array(4).fill(e.cornerRadius)).map(l=>Math.max(0,Math.min(l,t/2,n/2))),a=(l,u,c)=>l?`A${l} ${l} 0 0 1 ${u} ${c}`:`L${u} ${c}`;return`M${r} 0 L${t-i} 0 ${a(i,t,i)} L${t} ${n-o} ${a(o,t-o,n)} L${s} ${n} ${a(s,0,n-s)} L0 ${r} ${a(r,r,0)} Z`}function yD(e,t){let n=[],r,i,o;for(let u of Fr(t.toSVGString())){let c={x:u.x,y:u.y};u.type==="M"?(r=i=c,o=[],n.push(o)):u.type==="Z"?((r.x!==i.x||r.y!==i.y)&&o.push({type:"L",from:r,to:i}),r=i):(o.push({...u,from:r,to:c}),r=c)}if(n.length>512)throw new Error("\u8499\u7248\u8F6E\u5ED3\u8FC7\u4E8E\u590D\u6742\u3002");let s=(u,c=!1)=>{if(!u.length)return"";let f=c?u.at(-1).to:u[0].from;return`M${f.x} ${f.y} `+(c?[...u].reverse():u).map(g=>{let h=c?g.from:g.to;return g.type==="C"?`C${c?g.x2:g.x1} ${c?g.y2:g.y1} ${c?g.x1:g.x2} ${c?g.y1:g.y2} ${h.x} ${h.y}`:g.type==="Q"?`Q${g.x1} ${g.y1} ${h.x} ${h.y}`:`L${h.x} ${h.y}`}).join(" ")+" Z"},a=u=>u.reduce((c,f)=>{let g=v=>{let T=f.from[v],E=f.to[v],S=f[v+"1"],C=f[v+"2"];return f.type==="C"?[T,3*(S-T),3*(T-2*S+C),-T+3*S-3*C+E]:f.type==="Q"?[T,2*(S-T),T-2*S+E]:[T,E-T]},h=g("x"),d=g("y");for(let v=0;v<h.length;v++)for(let T=1;T<d.length;T++)c+=(h[v]*T*d[T]-d[v]*T*h[T])/(v+T);return c},0),l=n.map(u=>e.FromSVGString(s(u)));try{let u=l.map(c=>c.computeTightBounds());return n.map((c,f)=>{let g=0;for(let h=0;h<l.length;h++){if(h===f)continue;let d=u[f],v=u[h];if(v.fLeft>d.fLeft||v.fTop>d.fTop||v.fRight<d.fRight||v.fBottom<d.fBottom)continue;let T=e.MakeFromOp(l[f],l[h],e.PathOp.DIFFERENCE);if(!T)throw new Error("\u65E0\u6CD5\u786E\u5B9A\u8499\u7248\u5B54\u6D1E\u65B9\u5411\u3002");try{T.toCmds().length||g++}finally{T.delete()}}return s(c,a(c)>0!=(g%2===0))}).join(" ")}finally{l.forEach(u=>u?.delete())}}async function rI(e){let t=await hD(),n=t.NewPath();try{for(let{node:r,stroke:i,matrix:o,include:s}of e){let a=t.FromSVGString(gD(r));if(!a)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u8499\u7248\u7684\u77E2\u91CF\u8F6E\u5ED3\u3002");let l;try{if(a.setFillType(r.fillGeometry[0]?.windingRule==="EVENODD"?t.FillType.EVENODD:t.FillType.WINDING),l=a.copy(),i){if(i.weight<=0)continue;let u={NONE:t.StrokeCap.BUTT,ROUND:t.StrokeCap.ROUND,SQUARE:t.StrokeCap.SQUARE}[i.cap||r.strokeCap],c={MITER:t.StrokeJoin.MITER,ROUND:t.StrokeJoin.ROUND,BEVEL:t.StrokeJoin.BEVEL}[i.join||r.strokeJoin];if(!l.stroke({width:i.weight*(i.align==="CENTER"?1:2),cap:u,join:c,miter_limit:4}))throw new Error("\u65E0\u6CD5\u8BA1\u7B97\u8499\u7248\u63CF\u8FB9\u8F6E\u5ED3\u3002");if(i.align!=="CENTER"&&!l.op(a,i.align==="INSIDE"?t.PathOp.INTERSECT:t.PathOp.DIFFERENCE))throw new Error("\u65E0\u6CD5\u8BA1\u7B97\u8499\u7248\u63CF\u8FB9\u5BF9\u9F50\u3002")}if(l.transform(o.a,o.c,o.tx,o.b,o.d,o.ty,0,0,1),!n.op(l,s?t.PathOp.UNION:t.PathOp.DIFFERENCE))throw new Error("\u65E0\u6CD5\u8BA1\u7B97\u8499\u7248\u7684\u77E2\u91CF\u5E03\u5C14\u8F6E\u5ED3\u3002")}finally{l?.delete(),a.delete()}}return yD(t,n)}finally{n.delete()}}function Ta(e={}){return typeof e.value=="number"?ct((e.value>>>16&255)/255,(e.value>>>8&255)/255,(e.value&255)/255,(e.value>>>24)/255):ct((e.value?.r??e.r??0)/255,(e.value?.g??e.g??0)/255,(e.value?.b??e.b??0)/255,e.alpha??1)}var io=e=>({mode:"RGB",value:{r:Math.round(e.r*255),g:Math.round(e.g*255),b:Math.round(e.b*255)},alpha:e.a}),vD=e=>({value:(Math.round(e.a*255)<<24|Math.round(e.r*255)<<16|Math.round(e.g*255)<<8|Math.round(e.b*255))>>>0}),Sa=e=>e.children||e.artboard?.children||e.group?.children||e.shape?.children||[],ID=e=>String(e||"normal").replace(/-/g,"_").toUpperCase(),TD=e=>String(e==="PASS_THROUGH"?"normal":e||"normal").toLowerCase().replace(/_/g,"-"),iI={ORIGINAL:"none",UPPER:"uppercase",LOWER:"lowercase",TITLE:"titlecase"},SD=Object.fromEntries(Object.entries(iI).map(([e,t])=>[t,e]));function Yf(e={},t={}){return{fontFamily:e.family||"Arial",fontWeight:ua(e.style),italic:/italic|oblique/i.test(e.style||""),fontSize:oe(e.size,14),letterSpacing:oe(t.letterSpacing)*oe(e.size,14)/1e3,textDecoration:t.decoration?.includes("underline")?"UNDERLINE":t.decoration?.includes("line-through")?"STRIKETHROUGH":"NONE",textCase:SD[t.textTransform]||"ORIGINAL"}}function qf(e){let t=ca(e.fontWeight,e.italic).replace(/^Regular Italic$/,"Italic"),n=e.fontFamily==="Arial"?`Arial${e.fontWeight>=700?e.italic?"-BoldItalic":"-Bold":e.italic?"-Italic":""}MT`:`${e.fontFamily.replace(/\s+/g,"")}-${t.replace(/\s+/g,"")}`;return{font:{family:e.fontFamily,style:t,postscriptName:e.fontPostscript||n,size:e.fontSize},textAttributes:{letterSpacing:e.fontSize?e.letterSpacing/e.fontSize*1e3:0,decoration:e.textDecoration==="UNDERLINE"?["underline"]:e.textDecoration==="STRIKETHROUGH"?["line-through"]:[],textTransform:iI[e.textCase]||"none"}}}function bD(e){let t=e.text.length,n=new Set([0,t]);for(let o of e.styleRuns)n.add(Math.max(0,Math.min(t,o.start))),n.add(Math.max(0,Math.min(t,o.start+o.length)));let r=[...n].sort((o,s)=>o-s),i=[];for(let o=0;o<r.length-1;o++){let s=r[o],a=r[o+1],l={...e};for(let u of e.styleRuns)u.start<=s&&u.start+u.length>=a&&(["fontFamily","fontWeight","italic"].some(c=>u.style[c]!==void 0&&u.style[c]!==l[c])&&delete l.fontPostscript,Object.assign(l,u.style));i.push({from:s,to:a,node:l})}return i}async function oI(e,t){let n=_r(e),r=Lr(n,"manifest");if(!String(r.type||"").includes("sparkler"))throw new Error("\u4E0D\u662F\u53D7\u652F\u6301\u7684 Adobe XD \u8BBE\u8BA1\u6587\u4EF6\u3002");let i=Object.entries(n).filter(([d])=>d.endsWith("graphicContent.agc")).map(([d,v])=>({path:d,data:JSON.parse(new TextDecoder().decode(v))})),o=i.find(d=>d.path==="resources/graphics/graphicContent.agc")?.data||{},s=oa(),a=s.addPage(r.name||"XD \u8BBE\u8BA1"),l=new Map;for(let[d,v]of Object.entries(n))/^resources\/[^/]+$/.test(d)&&v.length&&l.set(d.slice(10),await aa(s,v));let u=new Map;function c(d,v=0){if(!(!d||typeof d!="object"||v>128)){if(d.type&&d.type!=="syncRef")for(let T of[d.id,d.guid,d.syncSourceGuid,d.meta?.ux?.symbolId])T&&!u.has(T)&&u.set(T,d);for(let T of Object.values(d))T&&typeof T=="object"&&c(T,v+1)}}i.forEach(d=>c(d.data));function f(d,v,T,E){if(!d||d.type==="none")return[];let S=Ut(Ta(d.color),d.opacity??1);if(S.visible=d.visible!==!1,d.type==="pattern"){let C=d.pattern||{},A=l.get(C.meta?.ux?.uid||C.uid||C.href?.replace(/^.*\//,""));if(!A)return t.add("missing-image","XD \u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",v),[];S={...S,type:"IMAGE",imageHash:A,imageScaleMode:C.meta?.ux?.scaleBehavior==="fit"?"FIT":"FILL"}}else if(d.type==="gradient"){let C=d.gradient?.ref?o.resources?.gradients?.[d.gradient.ref]:d.gradient||d,A=C?.meta?.ux?.gradientResources||C||{},_=A.from||{x:d.x1??A.x1??0,y:d.y1??A.y1??0},O=A.to||{x:d.x2??A.x2??1,y:d.y2??A.y2??0},k=A.type==="radial",V=d.cx??.5,F=d.cy??.5,Q=d.r??.5;S={...S,type:k?"GRADIENT_RADIAL":"GRADIENT_LINEAR",gradientStops:(A.stops||[]).map(ne=>({color:Ta(ne.color),position:ne.offset??ne.position??0})),gradientTransform:k?ya({x:V,y:F},{x:V+Q,y:F},{x:V,y:F+Q}):ga(_,O,T||1,E||1)},A.type&&!["linear","linearGradient","radial"].includes(A.type)&&t.add("xd-gradient","\u90E8\u5206 XD \u6E10\u53D8\u6309\u7EBF\u6027\u6E10\u53D8\u8F6C\u6362\u3002",v),k&&(d.fx!==void 0&&d.fx!==V||d.fy!==void 0&&d.fy!==F)&&t.add("xd-gradient-focus","\u504F\u5FC3\u5F84\u5411\u6E10\u53D8\u7684\u7126\u70B9\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",v)}return[S]}function g(d,v,T={x:0,y:0},E=0,S=[],C=!1){if(E>128)throw new Error("XD \u56FE\u5C42\u5D4C\u5957\u8FC7\u6DF1\u3002");if(d.meta?.ux?.orbitLayoutBounds)return;if(d.type==="syncRef"){let B=d.ref||d.syncSourceGuid;if(S.includes(B)){t.add("xd-symbol-cycle","\u5FAA\u73AF\u7EC4\u4EF6\u5F15\u7528\u5DF2\u505C\u6B62\u5C55\u5F00\u3002");return}let te=u.get(B);if(!te){t.add("missing-symbol","\u90E8\u5206 XD \u7EC4\u4EF6\u5B9A\u4E49\u7F3A\u5931\uFF0C\u65E0\u6CD5\u5C55\u5F00\u3002",d.name);return}d={...structuredClone(te),...d,type:te.type,group:d.group||te.group,artboard:d.artboard||te.artboard},S=[...S,B],C||t.add("xd-component","XD \u7EC4\u4EF6\u6309\u5F53\u524D\u5916\u89C2\u5C55\u5F00\u4E3A\u53EF\u7F16\u8F91\u56FE\u5C42\uFF0C\u7EC4\u4EF6\u72B6\u6001\u4E0D\u4FDD\u7559\u3002",d.name)}let A=d.shape||{},_=d.text||{},O=o.artboards?.[d.artboard?.ref||d.id]||{},k=d.type==="artboard"?"FRAME":d.type==="text"?"TEXT":d.type==="group"?"GROUP":"RECTANGLE";d.meta?.ux?.orbitStandaloneComponent&&d.meta.ux.isMaster&&(k="COMPONENT",C=!0);let V=oe(A.width??O.width??d.width??d.meta?.ux?.width),F=oe(A.height??O.height??d.height??d.meta?.ux?.height),Q=oe(A.x),ne=oe(A.y),Y="";if(["circle","ellipse"].includes(A.type)&&(k="ELLIPSE",V=2*oe(A.rx??A.r),F=2*oe(A.ry??A.r),Q=oe(A.cx)-V/2,ne=oe(A.cy)-F/2),["path","compound","polygon","line"].includes(A.type)&&(k="VECTOR",Y=A.path||(A.type==="line"?`M${A.x1||0} ${A.y1||0} L${A.x2||0} ${A.y2||0}`:A.points?.length?`M${A.points.map(B=>`${B.x} ${B.y}`).join(" L")} Z`:""),Y)){let B=mv(Y);V=B.width,F=B.height,Q=B.x,ne=B.y,Y=(0,Zf.default)(Y).translate(-Q,-ne).toString()}let I=d.style||{},R=I.font||{};if(k==="TEXT"){let B=(_.paragraphs||[]).flatMap(ve=>ve.lines||[]).flat(),te=oe(R.size,14),ae=B[0]||{};Q=oe(ae.x),ne=oe(ae.y)-te*.8,V=oe(_.frame?.width,Math.max(1,...String(_.rawText||"").split(`
`).map(ve=>ve.length*te*.6))),F=oe(_.frame?.height,Math.max(1,(_.paragraphs||[]).flatMap(ve=>ve.lines||[]).length)*te*1.2)}let x={a:1,b:0,c:0,d:1,tx:0,ty:0,...d.transform};x.tx+=x.a*Q+x.c*ne-T.x,x.ty+=x.b*Q+x.d*ne-T.y;let P={name:d.name||O.name||d.type,...Nf(x,V,F,t,d.name),fills:f(I.fill,d.name,V,F),strokes:f(I.stroke,d.name,V,F).map(B=>({...B,weight:oe(I.stroke.width,1),align:String(I.stroke.align||"center").toUpperCase()})),visible:d.visible!==!1,opacity:I.opacity??d.opacity??1,blendMode:I.isolation==="auto"?"PASS_THROUGH":ID(I.blendMode),locked:!!d.meta?.ux?.locked,clipsContent:d.type==="artboard",dashPattern:I.stroke?.dash||[],strokeCap:I.stroke?.cap==="butt"?"NONE":String(I.stroke?.cap||"none").toUpperCase(),strokeJoin:String(I.stroke?.join||"miter").toUpperCase()},G=Sa(d).find(B=>B.meta?.ux?.orbitLayoutBounds)?.shape;G&&Object.assign(P,{width:oe(G.width,V),height:oe(G.height,F)});let D=d.meta?.ux?.orbitResponsivePair;if(D&&["HORIZONTAL","VERTICAL"].includes(D.layoutMode)&&(k="FRAME",Object.assign(P,{layoutMode:D.layoutMode,layoutWrap:"NO_WRAP",primaryAxisAlign:"SPACE_BETWEEN",counterAxisAlign:"CENTER",primaryAxisSizing:"FIXED",counterAxisSizing:"FIXED",width:oe(G?.width??d.meta.ux.width,V),height:oe(G?.height??d.meta.ux.height,F)})),A.type==="compound"&&A.children?.length&&(k="BOOLEAN_OPERATION",P.booleanOperation=String(A.operation||"union").toUpperCase()),d.type==="artboard"&&Object.assign(P,{x:oe(O.x),y:oe(O.y),width:V,height:F}),Y&&Object.assign(P,eo((0,Zf.default)(Y).scale(V?P.width/V:1,F?P.height/F:1).toString())),A.r!==void 0){let B=Array.isArray(A.r)?A.r.map(te=>oe(te)):Array(4).fill(oe(A.r));Object.assign(P,{cornerRadius:B[0],independentCorners:B.some(te=>te!==B[0]),topLeftRadius:B[0],topRightRadius:B[1]??B[0],bottomRightRadius:B[2]??B[0],bottomLeftRadius:B[3]??B[0]})}if(k==="TEXT"){Object.assign(P,Yf(R,I.textAttributes),{text:_.rawText||"",textAutoResize:"NONE",textAlignHorizontal:String(I.textAttributes?.textAlign||_.textAlign||"left").toUpperCase(),lineHeight:I.textAttributes?.lineHeight||null});let B=d.meta?.ux?.rangedStyles;if(B?.length){let te=0;P.styleRuns=B.map(ae=>{let ve=Math.min(oe(ae.length),Math.max(0,P.text.length-te)),Ce={start:te,length:ve,style:{...Yf({family:ae.fontFamily,style:ae.fontStyle,size:ae.fontSize},{letterSpacing:ae.charSpacing,decoration:ae.underline?["underline"]:ae.strikethrough?["line-through"]:[],textTransform:ae.textTransform}),fills:[Ut(Ta(ae.fill))]}};return te+=ve,Ce}).filter(ae=>ae.length>0)}else P.styleRuns=(_.paragraphs||[]).flatMap(te=>te.lines||[]).flat().filter(te=>te.style&&te.to>te.from).map(te=>({start:te.from,length:te.to-te.from,style:{...Yf({...R,...te.style.font},{...I.textAttributes,...te.style.textAttributes}),fills:f(te.style.fill||I.fill,d.name,V,F)}}))}P.effects=(I.filters||I.effects||[]).flatMap(B=>{let te=B.params?.dropShadows||B.params?.innerShadows;return(te||[B.params||{}]).map(ae=>({type:B.type==="dropShadow"?"DROP_SHADOW":B.type==="uxdesign#innerShadow"?"INNER_SHADOW":ae.backgroundEffect?"BACKGROUND_BLUR":"LAYER_BLUR",color:Ta(ae.color),radius:te?oe(ae.r)*2:oe(ae.blurAmount??ae.r??ae.blur),spread:oe(ae.spread),offset:{x:oe(ae.dx??ae.x),y:oe(ae.dy??ae.y)},visible:B.visible!==!1}))});let w=sa(s,k,v,P);["artboard","group","shape","text"].includes(d.type)||t.add("xd-node","\u90E8\u5206 XD \u4E13\u5C5E\u56FE\u5C42\u6309\u57FA\u7840\u56FE\u5F62\u8F6C\u6362\u3002",d.name),d.meta?.ux?.interactions?.length&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",d.name);let q=Sa(d).find(B=>B.id===d.meta?.ux?.orbitVectorMaskSource),Z=d.meta?.ux?.orbitVectorMaskGeometry,X=d.meta?.ux?.clipPathResources?.children?.[0],j=q&&(!Z||JSON.stringify({shape:X?.shape,transform:X?.transform})===JSON.stringify(Z)),ee=j?q.id:null;q&&!j&&t.add("xd-mask-edited","\u4F7F\u7528 XD \u4E2D\u4FEE\u6539\u540E\u7684\u77E2\u91CF\u88C1\u5207\uFF1B\u539F\u59CB\u8499\u7248\u6E90\u56FE\u5C42\u4ECD\u4FDD\u7559\uFF0C\u4E0D\u4F1A\u8986\u76D6\u5F53\u524D\u88C1\u5207\u3002",d.name,"info");let $=ee?[]:d.meta?.ux?.clipPathResources?.children||[];if($.length){let B=$.length===1?$[0]:{type:"group",name:"\u88C1\u5207\u5F62\u72B6",group:{children:$}},te=g(B,w.id,{x:0,y:0},E+1,S,C);te&&(te.isMask=!0,te.maskType=q&&!j?"VECTOR":d.meta.ux.orbitMaskType||"VECTOR")}let le=Sa(d);if(le.forEach(B=>{let te=B.id===ee,ae=g(te?{...B,visible:B.meta?.ux?.orbitMaskSourceVisible!==!1}:B,w.id,d.type==="artboard"?{x:O.x||0,y:O.y||0}:A.type==="compound"?{x:Q,y:ne}:{x:0,y:0},E+1,S,C);te&&ae&&(ae.isMask=!0,ae.maskType=d.meta.ux.orbitMaskType)}),["GROUP","COMPONENT"].includes(k)&&le.length){w.width=G?oe(G.width):Math.max(0,...s.getChildren(w.id).map(ae=>ae.x+ae.width)),w.height=G?oe(G.height):Math.max(0,...s.getChildren(w.id).map(ae=>ae.y+ae.height));let B=Math.hypot(x.a,x.b)||1,te=Math.abs(x.a*x.d-x.b*x.c)/B;(Math.abs(B-1)>.001||Math.abs(te-1)>.001)&&s.getChildren(w.id).forEach(ae=>Cf(s,ae,B,te,t)),Object.assign(w,Nf(x,w.width,w.height,t,d.name))}return w}if(i.filter(d=>d.path.startsWith("artwork/")).forEach(d=>(d.data.children||[]).forEach(v=>{v.meta?.ux?.orbitComponentCanvas?Sa(v).forEach(T=>g(T,a.id)):g(v,a.id)})),!s.getChildren(a.id).length)throw new Error("XD \u6587\u4EF6\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u753B\u677F\u6216\u56FE\u5C42\u3002");let h=Lr(n,"interactions/interactions.json",{});return Object.entries(h).some(([d,v])=>d!=="version"&&v&&typeof v=="object"&&Object.keys(v).length)&&t.add("prototype","XD \u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002"),{graph:s,thumbnail:n["preview.png"]||n["thumbnail.png"]}}async function sI(e,t,n,r){n||(n=Kn);let i={mimetype:[rt("application/vnd.adobe.sparkler.project+dcxucf"),{level:0}]},o=Le(),s={},a=[],l=[],u=[],c=new Set,f=new Map,g=new Map;for(let I of e.nodes.values())if(I.isMask&&(I.type==="GROUP"||I.strokes.some(R=>R.visible))){let R=xf(e,I);if(R)try{let x=await rI(R);if(!x)throw new Error("empty mask");g.set(I.id,x)}catch{r.add("xd-mask-path","\u6B64\u8499\u7248\u7684\u77E2\u91CF\u8F6E\u5ED3\u8BA1\u7B97\u5931\u8D25\uFF0C\u672A\u5BFC\u51FA\u4E0D\u5B8C\u6574\u7ED3\u679C\u3002",I.name)}}let h=(I,R,x="primary",P={})=>({rel:x,type:R,id:Le(),state:"unmodified",name:I,path:I,...P}),d=(I,R=[],x=[],P={})=>({id:Le(),name:I,path:I,children:R,components:x,...P});for(let[I,R]of e.images)f.set(I,Tf(R)),i[`resources/${I}`]=[R,{level:0}],l.push(h(I,R[0]===137?"image/png":R[0]===255?"image/jpeg":"application/octet-stream"));function v(I,R){if(!I||!I.visible)return{type:"none"};if(I.type==="IMAGE"){let x=f.get(I.imageHash);return x||r.add("image-dimensions","\u65E0\u6CD5\u8BFB\u53D6\u6B64\u56FE\u7247\u7684\u539F\u59CB\u5C3A\u5BF8\uFF0C\u586B\u5145\u6BD4\u4F8B\u4E0D\u80FD\u4FDD\u8BC1\u4E00\u81F4\u3002",R.name),{type:"pattern",pattern:{width:x?.width||R.width,height:x?.height||R.height,href:"",meta:{ux:{scaleBehavior:I.imageScaleMode==="FIT"?"fit":"fill",uid:I.imageHash}}},opacity:I.opacity}}if(I.type.startsWith("GRADIENT")){let x=I.gradientTransform?Br(I.gradientTransform,{x:0,y:.5}):{x:0,y:0},P=I.gradientTransform?Br(I.gradientTransform,{x:1,y:.5}):{x:1,y:0};return{type:"gradient",gradient:{meta:{ux:{gradientResources:{type:"linear",stops:(I.gradientStops||[]).map(G=>({offset:G.position,color:io(G.color)}))}}}},x1:x.x,y1:x.y,x2:P.x,y2:P.y,units:"objectBoundingBox"}}return{type:"solid",color:io({...I.color,a:I.color.a*I.opacity})}}function T(I){let R=I.fills.at(-1),x=I.strokes.at(-1),P=[];for(let[G,D,w]of[["DROP_SHADOW","dropShadow","dropShadows"],["INNER_SHADOW","uxdesign#innerShadow","innerShadows"]])for(let q of[!0,!1]){let Z=I.effects.filter(X=>X.type===G&&X.visible!==!1===q);Z.length&&P.push({type:D,global:!0,visible:q,params:{[w]:Z.map(X=>({color:io(X.color),dx:X.offset.x,dy:X.offset.y,r:X.radius/2,spread:X.spread}))}})}for(let G of I.effects.filter(D=>D.type.includes("BLUR")))P.push({type:"uxdesign#blur",global:!0,visible:G.visible,params:{blurAmount:G.radius,brightnessAmount:0,fillOpacity:0,backgroundEffect:G.type==="BACKGROUND_BLUR"}});return{opacity:I.opacity,blendMode:TD(I.blendMode),isolation:I.blendMode==="PASS_THROUGH"?"auto":"isolate",fill:v(R,I),stroke:x&&x.visible?{...v(x,I),width:x.weight,align:x.align.toLowerCase(),cap:(x.cap||I.strokeCap)==="NONE"?"butt":(x.cap||I.strokeCap).toLowerCase(),join:(x.join||I.strokeJoin).toLowerCase(),dash:x.dashPattern||I.dashPattern}:{type:"none"},filters:P}}function E(I,R,x,P){return{...I,name:R,x:0,y:0,rotation:0,flipX:!1,flipY:!1,opacity:1,visible:!0,locked:!1,fills:x,strokes:P,effects:[],blendMode:"NORMAL"}}function S(I,R){if(I.type!=="group")return;let x={type:"shape",name:`${R.name} / \u5E03\u5C40\u5C3A\u5BF8`,id:Le(),meta:{ux:{orbitLayoutBounds:!0,customConstraints:!0,constraintLeft:!0,constraintRight:!0,constraintTop:!0,constraintBottom:!0}},shape:{type:"rect",x:0,y:0,width:R.width,height:R.height},style:{fill:{type:"solid",color:io(ct(0,0,0,0))},stroke:{type:"none"}}};I.group.children.unshift(x)}function C(I,R){let x=Le(),P=structuredClone(I),G={};P.id=Le(),delete P.transform,Object.assign(P.meta.ux,{symbolId:x,width:R.width,height:R.height,componentType:"componentNoBounds"});function D(w){let q=Le();G[w.id]=q;let Z={type:"syncRef",syncSourceGuid:w.id,guid:q};return w.group&&(Z.group={children:w.group.children.map(D)}),Z}I.group.children=P.group.children.map(D),Object.assign(I.meta.ux,{symbolId:x,isMaster:!0,componentType:"componentNoBounds",orbitStandaloneComponent:!0,syncMap:G}),u.push(P),r.add("xd-component-master","\u72EC\u7ACB\u7EC4\u4EF6\u5DF2\u4FDD\u7559\u4E3A XD \u539F\u751F\u4E3B\u7EC4\u4EF6\uFF0C\u53EF\u7EE7\u7EED\u7F16\u8F91\u5E76\u521B\u5EFA\u5173\u8054\u5B9E\u4F8B\u3002",R.name,"info")}function A(I,R,x,P={a:1,b:0,c:0,d:1,tx:0,ty:0},G="VECTOR"){return{type:"group",name:I,id:Le(),transform:P,meta:{ux:{hasCustomName:!0,orbitMaskType:G,clipPathResources:{type:"clipPath",children:[R]}}},group:{children:x}}}function _(I,R=0,x=0){let P=[],G=P,D=R,w=x;for(let q of I)if(q.isMask&&Af(e,q)){let Z=k(q),X=Z,j=[];g.has(q.id)&&(X={type:"shape",name:`${q.name} / \u77E2\u91CF\u88C1\u5207`,id:Le(),transform:Gr(q),shape:{type:"path",path:g.get(q.id)},style:{fill:{type:"solid",color:io(ct())},stroke:{type:"none"}}},Z.visible=!1,Z.meta.ux.orbitMaskSourceVisible=q.visible,j=[Z],r.add("xd-vector-mask","\u9ED1\u767D\u6216\u5E26\u63CF\u8FB9\u8499\u7248\u5DF2\u6620\u5C04\u4E3A\u53EF\u7F16\u8F91\u77E2\u91CF\u88C1\u5207\uFF1B\u539F\u59CB\u8499\u7248\u56FE\u5C42\u548C\u63CF\u8FB9\u53C2\u6570\u4FDD\u7559\u5728\u9690\u85CF\u7684\u53EF\u7F16\u8F91\u6E90\u56FE\u5C42\u4E2D\u3002",q.name,"info"));let ee=A(`${q.name} / \u8499\u7248`,X,j,{a:1,b:0,c:0,d:1,tx:D,ty:w},q.maskType);j.length&&Object.assign(ee.meta.ux,{orbitVectorMaskSource:Z.id,orbitVectorMaskGeometry:{shape:X.shape,transform:X.transform}}),G.push(ee),G=ee.group.children,D=w=0}else G.push(k(q,D,w));return P}let O=I=>I.type==="IMAGE"&&(Sf(I)||["CROP","STRETCH"].includes(I.imageScaleMode));function k(I,R=0,x=0){c.add(I.id);let P=Le(),G=Gr(I);G.tx+=R,G.ty+=x;let D={type:"shape",name:I.name,id:P,transform:G,visible:I.visible,meta:{ux:{hasCustomName:!0,locked:!!I.locked}},style:T(I)};if(["TEXT","ELLIPSE","RECTANGLE","ROUNDED_RECTANGLE","LINE","VECTOR","STAR","POLYGON","BOOLEAN_OPERATION"].includes(I.type)&&(I.fills.length>1||I.strokes.length>1||I.strokes.length&&I.fills.some(O)||[...I.fills,...I.strokes].some(j=>!j.visible||j.opacity!==1||j.blendMode&&!["NORMAL","PASS_THROUGH"].includes(j.blendMode)))){let j=[...I.fills.map((ee,$)=>({node:{...E(I,`${I.name} / \u586B\u5145 ${$+1}`,[{...ee,opacity:1,blendMode:"NORMAL"}],[]),opacity:ee.opacity,blendMode:ee.blendMode||"NORMAL"},visible:ee.visible})),...I.strokes.map((ee,$)=>({node:{...E(I,`${I.name} / \u63CF\u8FB9 ${$+1}`,[],[{...ee,opacity:1,blendMode:"NORMAL"}]),opacity:ee.opacity,blendMode:ee.blendMode||"NORMAL"},visible:ee.visible}))];return D.type="group",D.style.fill=D.style.stroke={type:"none"},D.meta.ux.width=I.width,D.meta.ux.height=I.height,D.group={children:j.map(({node:ee,visible:$})=>{let le=k({...ee,fills:ee.fills.map(B=>({...B,visible:!0})),strokes:ee.strokes.map(B=>({...B,visible:!0}))});return le.visible=$,le})},r.add("xd-paint-layers","\u591A\u91CD\u586B\u5145\u3001\u63CF\u8FB9\u6216\u9690\u85CF\u7684\u7ED8\u5236\u5C5E\u6027\u5DF2\u62C6\u4E3A\u53EF\u7F16\u8F91\u5B50\u56FE\u5C42\u4FDD\u7559\u3002",I.name,"info"),D}let q=I.fills[0],Z=q&&f.get(q.imageHash),X=q&&O(q)&&bf(I,q,Z);if(X){let j=k(E(I,`${I.name} / \u88C1\u5207\u5F62\u72B6`,[Ut(ct())],[])),ee={type:"shape",name:`${I.name} / \u539F\u56FE`,id:Le(),transform:X,shape:{type:"rect",x:0,y:0,width:Z.width,height:Z.height},style:{fill:v({...q,imageScaleMode:"FILL"},I)}},$=A(`${I.name} / \u56FE\u7247\u88C1\u526A`,j,[ee]);D.type="group",D.group={children:[$]},D.meta.ux.width=I.width,D.meta.ux.height=I.height,D.style.fill=D.style.stroke={type:"none"},r.add("xd-image-crop","\u56FE\u7247\u539F\u59CB\u8D44\u6E90\u4E0E\u88C1\u526A\u53D8\u6362\u5DF2\u4FDD\u7559\u4E3A\u53EF\u7F16\u8F91\u7684\u56FE\u7247\u548C\u88C1\u5207\u5F62\u72B6\u3002",I.name,"info")}else if(I.type==="TEXT"){D.type="text",Object.assign(D.style,qf(I)),Object.assign(D.style.textAttributes,{textAlign:I.textAlignHorizontal.toLowerCase(),paragraphAfterSpacing:I.paragraphSpacing,lineHeight:I.lineHeight||I.fontSize*1.2});let j=bD(I);D.meta.ux.singleTextObject=!0,D.meta.ux.rangedStyles=j.map(({from:$,to:le,node:B})=>{let te=qf(B),ae=B.fills.at(-1);return{length:le-$,fontFamily:B.fontFamily,fontStyle:te.font.style,fontSize:B.fontSize,charSpacing:te.textAttributes.letterSpacing,underline:B.textDecoration==="UNDERLINE",strikethrough:B.textDecoration==="STRIKETHROUGH",textTransform:te.textAttributes.textTransform,textScript:"none",fill:vD(ae?.color?{...ae.color,a:ae.color.a*ae.opacity}:{r:0,g:0,b:0,a:1})}});let ee=0;D.text={frame:{type:"positioned",width:I.width,height:I.height},rawText:I.text,paragraphs:I.text.split(`
`).map(($,le)=>{let B=ee,te=B+$.length;ee=te+1;let ae=j.filter(ve=>ve.from<te&&ve.to>B).map((ve,Ce)=>({from:Math.max(B,ve.from),to:Math.min(te,ve.to),...Ce===0?{x:0}:{},y:I.fontSize*.8+le*(I.lineHeight||I.fontSize*1.2),style:{...qf(ve.node),fill:v(ve.node.fills.at(-1),ve.node)}}));return{lines:[ae.length?ae:[{from:B,to:te,x:0,y:I.fontSize*.8+le*(I.lineHeight||I.fontSize*1.2)}]]}})}}else if(I.type==="BOOLEAN_OPERATION")D.shape={type:"compound",path:Dt(I),operation:String(I.booleanOperation||"UNION").toLowerCase(),children:e.getChildren(I.id).map(j=>k(j))};else if(["ELLIPSE"].includes(I.type))D.shape={type:"ellipse",cx:I.width/2,cy:I.height/2,rx:I.width/2,ry:I.height/2};else if(["RECTANGLE","ROUNDED_RECTANGLE"].includes(I.type))D.shape={type:"rect",x:0,y:0,width:I.width,height:I.height,r:I.independentCorners?[I.topLeftRadius,I.topRightRadius,I.bottomRightRadius,I.bottomLeftRadius]:Array(4).fill(I.cornerRadius)};else if(I.type==="LINE")D.shape={type:"line",x1:0,y1:0,x2:I.width,y2:I.height};else if(["VECTOR","STAR","POLYGON"].includes(I.type)){let j=Dt(I);D.shape={type:"path",path:j},j||r.add("vector-empty","\u90E8\u5206\u77E2\u91CF\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u8F6E\u5ED3\u3002",I.name)}else{D.type="group";let j=Ef(e,I),ee=_(e.getChildren(I.id));if(j&&(ee.forEach(($,le)=>{S($,j.children[le]),Object.assign($.meta.ux,{customConstraints:!0,constraintWidth:!0,constraintHeight:!0,constraintLeft:j.horizontal&&le===0,constraintRight:j.horizontal&&le===1,constraintTop:!j.horizontal&&le===0,constraintBottom:!j.horizontal&&le===1})}),D.meta.ux.orbitResponsivePair={layoutMode:I.layoutMode},r.add("xd-responsive-pair","\u4E24\u7AEF\u5206\u5E03\u3001\u5C45\u4E2D\u5BF9\u9F50\u548C\u56FA\u5B9A\u5B50\u5143\u7D20\u5C3A\u5BF8\u5DF2\u6620\u5C04\u4E3A XD \u539F\u751F\u54CD\u5E94\u5F0F\u7EA6\u675F\u3002",I.name,"info")),I.clipsContent){let $=k({...E(I,`${I.name} / \u753B\u6846\u88C1\u5207`,[Ut(ct())],[]),type:"RECTANGLE"});ee=[A(`${I.name} / \u88C1\u5207\u5185\u5BB9`,$,ee)]}D.group={children:ee},D.meta.ux.width=I.width,D.meta.ux.height=I.height,I.fills.length&&D.group.children.unshift(k({...E(I,`${I.name} \u80CC\u666F`,I.fills,[]),type:"RECTANGLE"})),I.strokes.length&&D.group.children.push(k({...E(I,`${I.name} \u63CF\u8FB9`,[],I.strokes),type:"RECTANGLE"})),j&&S(D,I),D.style.fill=D.style.stroke={type:"none"}}return la(e,I)&&C(D,I),D}let V=e.getPages(!0);V.length>1&&r.add("xd-pages","XD \u4E0D\u652F\u6301\u591A\u9875\uFF0C\u6240\u6709\u9875\u9762\u53CA\u5185\u90E8\u8D44\u6E90\u9875\u7684\u56FE\u5C42\u5DF2\u5206\u533A\u6392\u653E\u3002","","info");let F=0;for(let I of V){let R=e.getChildren(I.id),x=R.filter(w=>w.type==="FRAME"||w.type==="COMPONENT"),P=R.filter(w=>!x.includes(w)),G=[...x.map(w=>la(e,w)?{componentCanvas:!0,node:{...w,name:`${w.name} / \u7EC4\u4EF6\u753B\u5E03`,opacity:1,fills:[],strokes:[],effects:[]},items:[{...w,x:0,y:0}]}:{node:w,items:e.getChildren(w.id)}),...P.length?[{node:{...I,name:`${I.name} / \u753B\u5E03`,x:0,y:0,width:Math.max(1,...P.map(w=>w.x+w.width)),height:Math.max(1,...P.map(w=>w.y+w.height))},items:P}]:[]],D=0;for(let{node:w,items:q,componentCanvas:Z}of G){c.add(w.id);let X=Le(),j=w.x+F,ee=w.y;s[X]={width:w.width||1,height:w.height||1,name:w.name,x:j,y:ee},D=Math.max(D,w.x+w.width);let $=T(w),le=_(q,j,ee);(w.fills.length>1||w.strokes.length||w.independentCorners||w.cornerRadius)&&(le.unshift(k({...E(w,`${w.name} \u80CC\u666F`,w.fills,w.strokes),type:"RECTANGLE",x:j,y:ee})),$.fill=$.stroke={type:"none"});let B={version:"1.5.0",children:[{type:"artboard",id:X,name:w.name,visible:w.visible,meta:{ux:{hasCustomName:!0,locked:!!w.locked,...Z?{orbitComponentCanvas:!0}:{}}},style:$,artboard:{children:le,ref:X,meta:{ux:{path:X}}}}],resources:{href:"/resources/graphics/graphicContent.agc"},artboards:{href:"/resources/graphics/graphicContent.agc"}},te=`artboard-${X}`;i[`artwork/${te}/graphics/graphicContent.agc`]=rt(JSON.stringify(B)),a.push(d(te,[d("graphics",[],[h("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])],[],{"uxdesign#bounds":s[X]}))}F+=D+300}i["resources/graphics/graphicContent.agc"]=rt(JSON.stringify({version:"1.5.0",children:[],resources:{gradients:{},clipPaths:{},meta:{ux:{symbols:u,symbolsMetadata:{usingNestedSymbolSyncing:!0},colorSwatches:[],documentLibrary:{version:5,isStickerSheet:!1,hashedMetadata:{publishedDocLibId:null},elements:[],groupData:{groups:[]}},gridDefaults:{defaultGrid:null,layoutOverrides:null},colorProfile:"srgb"}}},artboards:s})),i["artwork/pasteboard/graphics/graphicContent.agc"]=rt(JSON.stringify({version:"1.5.0",children:[],resources:{href:"/resources/graphics/graphicContent.agc"},artboards:{href:"/resources/graphics/graphicContent.agc"}})),a.unshift(d("pasteboard",[d("graphics",[],[h("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])])),i["interactions/interactions.json"]=rt('{"version":"0.24"}'),i["sharing/sharing.json"]=rt('{"version":"0.3","selectedLink":-1}');let Q=Le(),ne=new Date().toISOString();i["META-INF/metadata.xml"]=rt(`<?xml version="1.0" encoding="UTF-8"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmp:CreatorTool="Orbit" xmp:CreateDate="${ne}" xmp:ModifyDate="${ne}" dc:format="application/vnd.adobe.sparkler.project+dcx" xmpMM:DocumentID="${o}" xmpMM:InstanceID="${Le()}"/></rdf:RDF></x:xmpmeta>`);let Y=[h("META-INF/metadata.xml","application/rdf+xml","metadata")];if(n){i["thumbnail.png"]=[n,{level:0}],i["preview.png"]=[n,{level:0}];let I=new DataView(n.buffer,n.byteOffset,n.byteLength),R={width:I.getUint32(16),height:I.getUint32(20)};Y.push(h("thumbnail.png","image/png","thumbnail",R),h("preview.png","image/png","preview",R))}return i.manifest=rt(JSON.stringify({state:"unmodified","manifest-format-version":6,name:t,"uxdesign#applicationVersion":"57.1.12.2",type:"application/vnd.adobe.sparkler.project+dcx","uxdesign#serializationId":Le(),"uxdesign#id":Q,"uxdesign#parentDocId":Q,id:o,"uxdesign#compositeID":o,"uxdesign#version":"2.33",components:Y,children:[d("artwork",a),d("resources",[d("graphics",[],[h("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])],l),d("interactions",[],[h("interactions.json","application/vnd.adobe.uxdesign.interactions+json")]),d("sharing",[],[h("sharing.json","application/vnd.adobe.uxdesign.sharing+json")])]})),Vr(e,c,r),tr(i)}var oo={fig:"Figma",sketch:"Sketch",xd:"Adobe XD"};async function aI(e,t){let n=t.split(".").at(-1).toLowerCase();if(!oo[n])throw new Error("\u8BF7\u9009\u62E9 .fig\u3001.sketch \u6216 .xd \u6587\u4EF6\u3002");if(!e.length)throw new Error("\u6587\u4EF6\u4E3A\u7A7A\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002");let r=vf(),i=await{fig:Xv,sketch:Zv,xd:oI}[n](e,r),o=i.thumbnail?.[0]===137?i.thumbnail:Kn;return{...i,thumbnail:o,source:n,filename:t,issues:r.list(),stats:dv(i.graph)}}function lI(e,t){if(!oo[t]||t===e.source)throw new Error("\u8BF7\u9009\u62E9\u4E0D\u540C\u4E8E\u539F\u6587\u4EF6\u7684\u76EE\u6807\u683C\u5F0F\u3002");let n=vf();for(let r of e.issues)for(let i=0;i<r.count;i++)n.add(r.code,r.message,r.examples[i%(r.examples.length||1)],r.severity,r.category);return hv(e.graph,t,n),n}function uI(e,t){return lI(e,t).list()}async function cI(e,t){let n=lI(e,t);function r(){let s=n.list();if(s.some(a=>a.severity!=="info")){let a=new Error(`\u5F53\u524D\u6587\u4EF6\u5C1A\u4E0D\u80FD\u5B8C\u6574\u8F6C\u6362\u4E3A ${oo[t]}\u3002\u4E0B\u65B9\u5DF2\u533A\u5206\u8F6C\u6362\u5668\u672A\u9002\u914D\u9879\u76EE\u4E0E\u76EE\u6807\u683C\u5F0F\u9650\u5236\uFF1B\u4E0D\u4F1A\u4E22\u5F03\u5C5E\u6027\u3001\u5408\u6210\u56FE\u7247\u6216\u751F\u6210\u4E0D\u5B8C\u6574\u7ED3\u679C\u3002`);throw a.code="PRESERVATION_REQUIRED",a.issues=s,a}}r();let i=e.filename.replace(/\.(fig|xd|sketch)$/i,""),o=await{fig:Kv,sketch:Qv,xd:sI}[t](e.graph,i,e.thumbnail,n);return r(),{bytes:o,filename:`${i}.${t}`,source:e.source,target:t,stats:e.stats,issues:n.list()}}var on=null;self.onmessage=async({data:e})=>{try{if(e.type==="read"){on=null,self.postMessage({type:"progress",message:"\u6B63\u5728\u89E3\u6790\u9875\u9762\u3001\u56FE\u5C42\u4E0E\u56FE\u7247\u8D44\u6E90\u2026"}),on=await aI(new Uint8Array(e.buffer),e.filename);let t=on.thumbnail.slice(),n=Object.fromEntries(Object.keys(oo).filter(r=>r!==on.source).map(r=>[r,uI(on,r)]));self.postMessage({type:"ready",source:on.source,stats:on.stats,compatibility:n,preview:t},[t.buffer])}else if(e.type==="convert"){if(!on)throw new Error("\u8BF7\u5148\u9009\u62E9\u8BBE\u8BA1\u6587\u4EF6\u3002");self.postMessage({type:"progress",message:"\u6B63\u5728\u6620\u5C04\u56FE\u5C42\u5E76\u751F\u6210\u76EE\u6807\u8BBE\u8BA1\u6587\u4EF6\u2026"});let t=await cI(on,e.target);self.postMessage({type:"done",...t},[t.bytes.buffer])}}catch(t){self.postMessage({type:"error",code:t.code,issues:t.issues,message:t.message||"\u8F6C\u6362\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u662F\u5426\u635F\u574F\u6216\u7248\u672C\u662F\u5426\u53D7\u652F\u6301\u3002"})}};})();
