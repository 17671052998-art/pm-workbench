(()=>{var zI=Object.create;var Za=Object.defineProperty;var HI=Object.getOwnPropertyDescriptor;var WI=Object.getOwnPropertyNames;var $I=Object.getPrototypeOf,jI=Object.prototype.hasOwnProperty;var XI=(e,t,n)=>t in e?Za(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Ja=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,n)=>(typeof require<"u"?require:t)[n]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var cn=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var KI=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of WI(t))!jI.call(e,i)&&i!==n&&Za(e,i,{get:()=>t[i],enumerable:!(r=HI(t,i))||r.enumerable});return e};var Kr=(e,t,n)=>(n=e!=null?zI($I(e)):{},KI(t||!e||!e.__esModule?Za(n,"default",{value:e,enumerable:!0}):n,e));var le=(e,t,n)=>XI(e,typeof t!="symbol"?t+"":t,n);var Hd=cn((HD,zd)=>{"use strict";var Co={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},mT=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function hT(e){return e===10||e===13||e===8232||e===8233||e===32||e===9||e===11||e===12||e===160||e>=5760&&mT.indexOf(e)>=0}function gT(e){switch(e|32){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}function yT(e){return(e|32)===97}function lr(e){return e>=48&&e<=57}function vT(e){return e>=48&&e<=57||e===43||e===45||e===46}function IT(e){this.index=0,this.path=e,this.max=e.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function Oo(e){for(;e.index<e.max&&hT(e.path.charCodeAt(e.index));)e.index++}function TT(e){var t=e.path.charCodeAt(e.index);if(t===48){e.param=0,e.index++;return}if(t===49){e.param=1,e.index++;return}e.err="SvgPath: arc flag can be 0 or 1 only (at pos "+e.index+")"}function ST(e){var t=e.index,n=t,r=e.max,i=!1,o=!1,s=!1,a=!1,l;if(n>=r){e.err="SvgPath: missed param (at pos "+n+")";return}if(l=e.path.charCodeAt(n),(l===43||l===45)&&(n++,l=n<r?e.path.charCodeAt(n):0),!lr(l)&&l!==46){e.err="SvgPath: param should start with 0..9 or `.` (at pos "+n+")";return}if(l!==46){if(i=l===48,n++,l=n<r?e.path.charCodeAt(n):0,i&&n<r&&l&&lr(l)){e.err="SvgPath: numbers started with `0` such as `09` are illegal (at pos "+t+")";return}for(;n<r&&lr(e.path.charCodeAt(n));)n++,o=!0;l=n<r?e.path.charCodeAt(n):0}if(l===46){for(a=!0,n++;lr(e.path.charCodeAt(n));)n++,s=!0;l=n<r?e.path.charCodeAt(n):0}if(l===101||l===69){if(a&&!o&&!s){e.err="SvgPath: invalid float exponent (at pos "+n+")";return}if(n++,l=n<r?e.path.charCodeAt(n):0,(l===43||l===45)&&n++,n<r&&lr(e.path.charCodeAt(n)))for(;n<r&&lr(e.path.charCodeAt(n));)n++;else{e.err="SvgPath: invalid float exponent (at pos "+n+")";return}}e.index=n,e.param=parseFloat(e.path.slice(t,n))+0}function dl(e){var t,n;t=e.path[e.segmentStart],n=t.toLowerCase();var r=e.data;if(n==="m"&&r.length>2&&(e.result.push([t,r[0],r[1]]),r=r.slice(2),n="l",t=t==="m"?"l":"L"),n==="r")e.result.push([t].concat(r));else for(;r.length>=Co[n]&&(e.result.push([t].concat(r.splice(0,Co[n]))),!!Co[n]););}function bT(e){var t=e.max,n,r,i,o,s;if(e.segmentStart=e.index,n=e.path.charCodeAt(e.index),r=yT(n),!gT(n)){e.err="SvgPath: bad command "+e.path[e.index]+" (at pos "+e.index+")";return}if(o=Co[e.path[e.index].toLowerCase()],e.index++,Oo(e),e.data=[],!o){dl(e);return}for(i=!1;;){for(s=o;s>0;s--){if(r&&(s===3||s===4)?TT(e):ST(e),e.err.length){dl(e);return}e.data.push(e.param),Oo(e),i=!1,e.index<t&&e.path.charCodeAt(e.index)===44&&(e.index++,Oo(e),i=!0)}if(!i&&(e.index>=e.max||!vT(e.path.charCodeAt(e.index))))break}dl(e)}zd.exports=function(t){var n=new IT(t),r=n.max;for(Oo(n);n.index<r&&!n.err.length;)bT(n);return n.result.length&&("mM".indexOf(n.result[0][0])<0?(n.err="SvgPath: string should start with `M` or `m`",n.result=[]):n.result[0][0]="M"),{err:n.err,segments:n.result}}});var pl=cn((WD,Wd)=>{"use strict";function ET(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]}function xt(){if(!(this instanceof xt))return new xt;this.queue=[],this.cache=null}xt.prototype.matrix=function(e){return e[0]===1&&e[1]===0&&e[2]===0&&e[3]===1&&e[4]===0&&e[5]===0?this:(this.cache=null,this.queue.push(e),this)};xt.prototype.translate=function(e,t){return(e!==0||t!==0)&&(this.cache=null,this.queue.push([1,0,0,1,e,t])),this};xt.prototype.scale=function(e,t){return(e!==1||t!==1)&&(this.cache=null,this.queue.push([e,0,0,t,0,0])),this};xt.prototype.rotate=function(e,t,n){var r,i,o;return e!==0&&(this.translate(t,n),r=e*Math.PI/180,i=Math.cos(r),o=Math.sin(r),this.queue.push([i,o,-o,i,0,0]),this.cache=null,this.translate(-t,-n)),this};xt.prototype.skewX=function(e){return e!==0&&(this.cache=null,this.queue.push([1,0,Math.tan(e*Math.PI/180),1,0,0])),this};xt.prototype.skewY=function(e){return e!==0&&(this.cache=null,this.queue.push([1,Math.tan(e*Math.PI/180),0,1,0,0])),this};xt.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],this.queue.length===1)return this.cache;for(var e=1;e<this.queue.length;e++)this.cache=ET(this.cache,this.queue[e]);return this.cache};xt.prototype.calc=function(e,t,n){var r;return this.queue.length?(this.cache||(this.cache=this.toArray()),r=this.cache,[e*r[0]+t*r[2]+(n?0:r[4]),e*r[1]+t*r[3]+(n?0:r[5])]):[e,t]};Wd.exports=xt});var jd=cn(($D,$d)=>{"use strict";var AT=pl(),xT={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},NT=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,CT=/[\s,]+/;$d.exports=function(t){var n=new AT,r,i;return t.split(NT).forEach(function(o){if(o.length){if(typeof xT[o]<"u"){r=o;return}switch(i=o.split(CT).map(function(s){return+s||0}),r){case"matrix":i.length===6&&n.matrix(i);return;case"scale":i.length===1?n.scale(i[0],i[0]):i.length===2&&n.scale(i[0],i[1]);return;case"rotate":i.length===1?n.rotate(i[0],0,0):i.length===3&&n.rotate(i[0],i[1],i[2]);return;case"translate":i.length===1?n.translate(i[0],0):i.length===2&&n.translate(i[0],i[1]);return;case"skewX":i.length===1&&n.skewX(i[0]);return;case"skewY":i.length===1&&n.skewY(i[0]);return}}}),n}});var Yd=cn((jD,Kd)=>{"use strict";var ei=Math.PI*2;function Xd(e,t,n,r){var i=e*r-t*n<0?-1:1,o=e*n+t*r;return o>1&&(o=1),o<-1&&(o=-1),i*Math.acos(o)}function OT(e,t,n,r,i,o,s,a,l,u){var c=u*(e-n)/2+l*(t-r)/2,f=-l*(e-n)/2+u*(t-r)/2,g=s*s,h=a*a,d=c*c,I=f*f,T=g*h-g*I-h*d;T<0&&(T=0),T/=g*I+h*d,T=Math.sqrt(T)*(i===o?-1:1);var E=T*s/a*f,S=T*-a/s*c,N=u*E-l*S+(e+n)/2,A=l*E+u*S+(t+r)/2,_=(c-E)/s,C=(f-S)/a,M=(-c-E)/s,z=(-f-S)/a,w=Xd(1,0,_,C),ee=Xd(_,C,M,z);return o===0&&ee>0&&(ee-=ei),o===1&&ee<0&&(ee+=ei),[N,A,w,ee]}function RT(e,t){var n=1.3333333333333333*Math.tan(t/4),r=Math.cos(e),i=Math.sin(e),o=Math.cos(e+t),s=Math.sin(e+t);return[r,i,r-i*n,i+r*n,o+s*n,s-o*n,o,s]}Kd.exports=function(t,n,r,i,o,s,a,l,u){var c=Math.sin(u*ei/360),f=Math.cos(u*ei/360),g=f*(t-r)/2+c*(n-i)/2,h=-c*(t-r)/2+f*(n-i)/2;if(g===0&&h===0)return[];if(a===0||l===0)return[];a=Math.abs(a),l=Math.abs(l);var d=g*g/(a*a)+h*h/(l*l);d>1&&(a*=Math.sqrt(d),l*=Math.sqrt(d));var I=OT(t,n,r,i,o,s,a,l,c,f),T=[],E=I[2],S=I[3],N=Math.max(Math.ceil(Math.abs(S)/(ei/4)),1);S/=N;for(var A=0;A<N;A++)T.push(RT(E,S)),E+=S;return T.map(function(_){for(var C=0;C<_.length;C+=2){var M=_[C+0],z=_[C+1];M*=a,z*=l;var w=f*M-c*z,ee=c*M+f*z;_[C+0]=w+I[0],_[C+1]=ee+I[1]}return _})}});var Jd=cn((XD,Zd)=>{"use strict";var ti=1e-10,qd=Math.PI/180;function ni(e,t,n){if(!(this instanceof ni))return new ni(e,t,n);this.rx=e,this.ry=t,this.ax=n}ni.prototype.transform=function(e){var t=Math.cos(this.ax*qd),n=Math.sin(this.ax*qd),r=[this.rx*(e[0]*t+e[2]*n),this.rx*(e[1]*t+e[3]*n),this.ry*(-e[0]*n+e[2]*t),this.ry*(-e[1]*n+e[3]*t)],i=r[0]*r[0]+r[2]*r[2],o=r[1]*r[1]+r[3]*r[3],s=((r[0]-r[3])*(r[0]-r[3])+(r[2]+r[1])*(r[2]+r[1]))*((r[0]+r[3])*(r[0]+r[3])+(r[2]-r[1])*(r[2]-r[1])),a=(i+o)/2;if(s<ti*a)return this.rx=this.ry=Math.sqrt(a),this.ax=0,this;var l=r[0]*r[1]+r[2]*r[3];s=Math.sqrt(s);var u=a+s/2,c=a-s/2;return this.ax=Math.abs(l)<ti&&Math.abs(u-o)<ti?90:Math.atan(Math.abs(l)>Math.abs(u-o)?(u-i)/l:l/(u-o))*180/Math.PI,this.ax>=0?(this.rx=Math.sqrt(u),this.ry=Math.sqrt(c)):(this.ax+=90,this.rx=Math.sqrt(c),this.ry=Math.sqrt(u)),this};ni.prototype.isDegenerate=function(){return this.rx<ti*this.ry||this.ry<ti*this.rx};Zd.exports=ni});var ep=cn((KD,Qd)=>{"use strict";var DT=Hd(),MT=jd(),dn=pl(),PT=Yd(),wT=Jd();function De(e){if(!(this instanceof De))return new De(e);var t=DT(e);this.segments=t.segments,this.err=t.err,this.__stack=[]}De.from=function(e){if(typeof e=="string")return new De(e);if(e instanceof De){var t=new De("");return t.err=e.err,t.segments=e.segments.map(function(n){return n.slice()}),t.__stack=e.__stack.map(function(n){return dn().matrix(n.toArray())}),t}throw new Error("SvgPath.from: invalid param type "+e)};De.prototype.__matrix=function(e){var t=this,n;e.queue.length&&this.iterate(function(r,i,o,s){var a,l,u,c;switch(r[0]){case"v":a=e.calc(0,r[1],!0),l=a[0]===0?["v",a[1]]:["l",a[0],a[1]];break;case"V":a=e.calc(o,r[1],!1),l=a[0]===e.calc(o,s,!1)[0]?["V",a[1]]:["L",a[0],a[1]];break;case"h":a=e.calc(r[1],0,!0),l=a[1]===0?["h",a[0]]:["l",a[0],a[1]];break;case"H":a=e.calc(r[1],s,!1),l=a[1]===e.calc(o,s,!1)[1]?["H",a[0]]:["L",a[0],a[1]];break;case"a":case"A":var f=e.toArray(),g=wT(r[1],r[2],r[3]).transform(f);if(f[0]*f[3]-f[1]*f[2]<0&&(r[5]=r[5]?"0":"1"),a=e.calc(r[6],r[7],r[0]==="a"),r[0]==="A"&&r[6]===o&&r[7]===s||r[0]==="a"&&r[6]===0&&r[7]===0){l=[r[0]==="a"?"l":"L",a[0],a[1]];break}g.isDegenerate()?l=[r[0]==="a"?"l":"L",a[0],a[1]]:l=[r[0],g.rx,g.ry,g.ax,r[4],r[5],a[0],a[1]];break;case"m":c=i>0,a=e.calc(r[1],r[2],c),l=["m",a[0],a[1]];break;default:for(u=r[0],l=[u],c=u.toLowerCase()===u,n=1;n<r.length;n+=2)a=e.calc(r[n],r[n+1],c),l.push(a[0],a[1])}t.segments[i]=l},!0)};De.prototype.__evaluateStack=function(){var e,t;if(this.__stack.length){if(this.__stack.length===1){this.__matrix(this.__stack[0]),this.__stack=[];return}for(e=dn(),t=this.__stack.length;--t>=0;)e.matrix(this.__stack[t].toArray());this.__matrix(e),this.__stack=[]}};De.prototype.toString=function(){var e="",t="",n=!1;this.__evaluateStack();for(var r=0,i=this.segments.length;r<i;r++){var o=this.segments[r],s=o[0];s!==t||s==="m"||s==="M"?(s==="m"&&t==="z"&&(e+=" "),e+=s,n=!1):n=!0;for(var a=1;a<o.length;a++){var l=o[a];a===1?n&&l>=0&&(e+=" "):l>=0&&(e+=" "),e+=l}t=s}return e};De.prototype.translate=function(e,t){return this.__stack.push(dn().translate(e,t||0)),this};De.prototype.scale=function(e,t){return this.__stack.push(dn().scale(e,!t&&t!==0?e:t)),this};De.prototype.rotate=function(e,t,n){return this.__stack.push(dn().rotate(e,t||0,n||0)),this};De.prototype.skewX=function(e){return this.__stack.push(dn().skewX(e)),this};De.prototype.skewY=function(e){return this.__stack.push(dn().skewY(e)),this};De.prototype.matrix=function(e){return this.__stack.push(dn().matrix(e)),this};De.prototype.transform=function(e){return e.trim()?(this.__stack.push(MT(e)),this):this};De.prototype.round=function(e){var t=0,n=0,r=0,i=0,o;return e=e||0,this.__evaluateStack(),this.segments.forEach(function(s){var a=s[0].toLowerCase()===s[0];switch(s[0]){case"H":case"h":a&&(s[1]+=r),r=s[1]-s[1].toFixed(e),s[1]=+s[1].toFixed(e);return;case"V":case"v":a&&(s[1]+=i),i=s[1]-s[1].toFixed(e),s[1]=+s[1].toFixed(e);return;case"Z":case"z":r=t,i=n;return;case"M":case"m":a&&(s[1]+=r,s[2]+=i),r=s[1]-s[1].toFixed(e),i=s[2]-s[2].toFixed(e),t=r,n=i,s[1]=+s[1].toFixed(e),s[2]=+s[2].toFixed(e);return;case"A":case"a":a&&(s[6]+=r,s[7]+=i),r=s[6]-s[6].toFixed(e),i=s[7]-s[7].toFixed(e),s[1]=+s[1].toFixed(e),s[2]=+s[2].toFixed(e),s[3]=+s[3].toFixed(e+2),s[6]=+s[6].toFixed(e),s[7]=+s[7].toFixed(e);return;default:o=s.length,a&&(s[o-2]+=r,s[o-1]+=i),r=s[o-2]-s[o-2].toFixed(e),i=s[o-1]-s[o-1].toFixed(e),s.forEach(function(l,u){u&&(s[u]=+s[u].toFixed(e))});return}}),this};De.prototype.iterate=function(e,t){var n=this.segments,r={},i=!1,o=0,s=0,a=0,l=0,u,c,f;if(t||this.__evaluateStack(),n.forEach(function(g,h){var d=e(g,h,o,s);Array.isArray(d)&&(r[h]=d,i=!0);var I=g[0]===g[0].toLowerCase();switch(g[0]){case"m":case"M":o=g[1]+(I?o:0),s=g[2]+(I?s:0),a=o,l=s;return;case"h":case"H":o=g[1]+(I?o:0);return;case"v":case"V":s=g[1]+(I?s:0);return;case"z":case"Z":o=a,s=l;return;default:o=g[g.length-2]+(I?o:0),s=g[g.length-1]+(I?s:0)}}),!i)return this;for(f=[],u=0;u<n.length;u++)if(typeof r[u]<"u")for(c=0;c<r[u].length;c++)f.push(r[u][c]);else f.push(n[u]);return this.segments=f,this};De.prototype.abs=function(){return this.iterate(function(e,t,n,r){var i=e[0],o=i.toUpperCase(),s;if(i!==o)switch(e[0]=o,i){case"v":e[1]+=r;return;case"a":e[6]+=n,e[7]+=r;return;default:for(s=1;s<e.length;s++)e[s]+=s%2?n:r}},!0),this};De.prototype.rel=function(){return this.iterate(function(e,t,n,r){var i=e[0],o=i.toLowerCase(),s;if(i!==o&&!(t===0&&i==="M"))switch(e[0]=o,i){case"V":e[1]-=r;return;case"A":e[6]-=n,e[7]-=r;return;default:for(s=1;s<e.length;s++)e[s]-=s%2?n:r}},!0),this};De.prototype.unarc=function(){return this.iterate(function(e,t,n,r){var i,o,s,a=[],l=e[0];return l!=="A"&&l!=="a"?null:(l==="a"?(o=n+e[6],s=r+e[7]):(o=e[6],s=e[7]),i=PT(n,r,o,s,e[4],e[5],e[1],e[2],e[3]),i.length===0?[[e[0]==="a"?"l":"L",e[6],e[7]]]:(i.forEach(function(u){a.push(["C",u[2],u[3],u[4],u[5],u[6],u[7]])}),a))}),this};De.prototype.unshort=function(){var e=this.segments,t,n,r,i,o;return this.iterate(function(s,a,l,u){var c=s[0],f=c.toUpperCase(),g;a&&(f==="T"?(g=c==="t",r=e[a-1],r[0]==="Q"?(t=r[1]-l,n=r[2]-u):r[0]==="q"?(t=r[1]-r[3],n=r[2]-r[4]):(t=0,n=0),i=-t,o=-n,g||(i+=l,o+=u),e[a]=[g?"q":"Q",i,o,s[1],s[2]]):f==="S"&&(g=c==="s",r=e[a-1],r[0]==="C"?(t=r[3]-l,n=r[4]-u):r[0]==="c"?(t=r[3]-r[5],n=r[4]-r[6]):(t=0,n=0),i=-t,o=-n,g||(i+=l,o+=u),e[a]=[g?"c":"C",i,o,s[1],s[2],s[3],s[4]]))}),this};Qd.exports=De});var ri=cn((YD,tp)=>{"use strict";tp.exports=ep()});var lI=cn((xa,nd)=>{var td=(()=>{var e=typeof document<"u"&&document.currentScript?document.currentScript.src:void 0;return typeof __filename<"u"&&(e=e||__filename),(function(t){t=t||{};var n;n||(n=typeof t<"u"?t:{});var r=Object.assign,i,o;n.ready=new Promise(function(m,p){i=m,o=p}),(function(m){var p={};m.loadCmdsTypedArray=function(V){for(var X=0,q=0;q<V.length;q++)X+=V[q].length;if(p[X])var Q=p[X];else Q=new Float32Array(X),p[X]=Q;var oe=0;for(q=0;q<V.length;q++)for(var ge=0;ge<V[q].length;ge++){var Ee=V[q][ge];typeof Ee=="string"&&(Ee=m.SkBits2FloatUnsigned(parseInt(Ee))),Q[oe]=Ee,oe++}return V=m._malloc(Q.length*Q.BYTES_PER_ELEMENT),m.HEAPF32.set(Q,V/Q.BYTES_PER_ELEMENT),[V,X]},m.FromCmds=function(V){V=m.loadCmdsTypedArray(V);var X=m._FromCmds(V[0],V[1]);return m._free(V[0]),X};var v,b,x,D,$;m.cubicYFromX=function(V,X,q,Q,oe){return v&&b===V&&x===X&&D===q&&$===Q||(v&&v.delete(),v=new m._SkCubicMap([V,X],[q,Q]),b=V,x=X,D=q,$=Q),v.computeYFromX(oe)},m.cubicPtFromT=function(V,X,q,Q,oe){return v&&b===V&&x===X&&D===q&&$===Q||(v&&v.delete(),v=new m._SkCubicMap([V,X],[q,Q]),b=V,x=X,D=q,$=Q),v.computePtFromT(oe)}})(n),(function(m){m.onRuntimeInitialized=function(){m.SkPath.prototype.addPath=function(){var p=arguments[0];if(arguments.length===1)this._addPath(p,1,0,0,0,1,0,0,0,1);else if(arguments.length===2){var v=arguments[1];this._addPath(p,v.a,v.c,v.e,v.b,v.d,v.f,0,0,1)}else if(arguments.length===7)v=arguments,this._addPath(p,v[1],v[3],v[5],v[2],v[4],v[6],0,0,1);else if(arguments.length===10)v=arguments,this._addPath(p,v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9]);else return console.Ma("addPath expected to take 1, 2, 7, or 10 args. Got "+arguments.length),null;return this},m.SkPath.prototype.arc=function(p,v,b,x,D,$){return this._arc(p,v,b,x,D,!!$),this},m.SkPath.prototype.arcTo=function(p,v,b,x,D){return this._arcTo(p,v,b,x,D),this},m.SkPath.prototype.bezierCurveTo=function(p,v,b,x,D,$){return this._cubicTo(p,v,b,x,D,$),this},m.SkPath.prototype.close=function(){return this._close(),this},m.SkPath.prototype.closePath=function(){return this._close(),this},m.SkPath.prototype.conicTo=function(p,v,b,x,D){return this._conicTo(p,v,b,x,D),this},m.SkPath.prototype.cubicTo=function(p,v,b,x,D,$){return this._cubicTo(p,v,b,x,D,$),this},m.SkPath.prototype.dash=function(p,v,b){return this._dash(p,v,b)?this:null},m.SkPath.prototype.ellipse=function(p,v,b,x,D,$,V,X){return this._ellipse(p,v,b,x,D,$,V,!!X),this},m.SkPath.prototype.lineTo=function(p,v){return this._lineTo(p,v),this},m.SkPath.prototype.moveTo=function(p,v){return this._moveTo(p,v),this},m.SkPath.prototype.op=function(p,v){return this._op(p,v)?this:null},m.SkPath.prototype.quadraticCurveTo=function(p,v,b,x){return this._quadTo(p,v,b,x),this},m.SkPath.prototype.quadTo=function(p,v,b,x){return this._quadTo(p,v,b,x),this},m.SkPath.prototype.rect=function(p,v,b,x){return this._rect(p,v,b,x),this},m.SkPath.prototype.simplify=function(){return this._simplify()?this:null},m.SkPath.prototype.stroke=function(p){return p=p||{},p.width=p.width||1,p.miter_limit=p.miter_limit||4,p.cap=p.cap||m.StrokeCap.BUTT,p.join=p.join||m.StrokeJoin.MITER,this._stroke(p)?this:null},m.SkPath.prototype.transform=function(){if(arguments.length===1)this._transform(arguments[0]);else if(arguments.length===9){var p=arguments;this._transform(p[0],p[1],p[2],p[3],p[4],p[5],p[6],p[7],p[8])}else return console.Ma("transform expected to take 1 or 9 arguments. Got "+arguments.length),null;return this},m.SkPath.prototype.trim=function(p,v,b){return this._trim(p,v,!!b)?this:null}}})(n);var s=r({},n),a=typeof window=="object",l=typeof importScripts=="function",u="",c,f,g,h,d,I;typeof process=="object"&&typeof process.versions=="object"&&typeof process.versions.node=="string"?(u=l?Ja("path").dirname(u)+"/":__dirname+"/",I=()=>{d||(h=Ja("fs"),d=Ja("path"))},c=function(m,p){return I(),m=d.normalize(m),h.readFileSync(m,p?null:"utf8")},g=m=>(m=c(m,!0),m.buffer||(m=new Uint8Array(m)),m),f=(m,p,v)=>{I(),m=d.normalize(m),h.readFile(m,function(b,x){b?v(b):p(x.buffer)})},1<process.argv.length&&process.argv[1].replace(/\\/g,"/"),process.argv.slice(2),process.on("uncaughtException",function(m){throw m}),process.on("unhandledRejection",function(m){throw m}),n.inspect=function(){return"[Emscripten Module object]"}):(a||l)&&(l?u=self.location.href:typeof document<"u"&&document.currentScript&&(u=document.currentScript.src),e&&(u=e),u.indexOf("blob:")!==0?u=u.substr(0,u.replace(/[?#].*/,"").lastIndexOf("/")+1):u="",c=m=>{var p=new XMLHttpRequest;return p.open("GET",m,!1),p.send(null),p.responseText},l&&(g=m=>{var p=new XMLHttpRequest;return p.open("GET",m,!1),p.responseType="arraybuffer",p.send(null),new Uint8Array(p.response)}),f=(m,p,v)=>{var b=new XMLHttpRequest;b.open("GET",m,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?p(b.response):v()},b.onerror=v,b.send(null)});var T=n.print||console.log.bind(console),E=n.printErr||console.warn.bind(console);r(n,s),s=null;var S;n.wasmBinary&&(S=n.wasmBinary);var N=n.noExitRuntime||!0;typeof WebAssembly!="object"&&Ht("no native wasm support detected");var A,_=!1,C=typeof TextDecoder<"u"?new TextDecoder("utf8"):void 0;function M(m,p,v){var b=p+v;for(v=p;m[v]&&!(v>=b);)++v;if(16<v-p&&m.subarray&&C)return C.decode(m.subarray(p,v));for(b="";p<v;){var x=m[p++];if(x&128){var D=m[p++]&63;if((x&224)==192)b+=String.fromCharCode((x&31)<<6|D);else{var $=m[p++]&63;x=(x&240)==224?(x&15)<<12|D<<6|$:(x&7)<<18|D<<12|$<<6|m[p++]&63,65536>x?b+=String.fromCharCode(x):(x-=65536,b+=String.fromCharCode(55296|x>>10,56320|x&1023))}}else b+=String.fromCharCode(x)}return b}function z(m,p,v){var b=P;if(0<v){v=p+v-1;for(var x=0;x<m.length;++x){var D=m.charCodeAt(x);if(55296<=D&&57343>=D){var $=m.charCodeAt(++x);D=65536+((D&1023)<<10)|$&1023}if(127>=D){if(p>=v)break;b[p++]=D}else{if(2047>=D){if(p+1>=v)break;b[p++]=192|D>>6}else{if(65535>=D){if(p+2>=v)break;b[p++]=224|D>>12}else{if(p+3>=v)break;b[p++]=240|D>>18,b[p++]=128|D>>12&63}b[p++]=128|D>>6&63}b[p++]=128|D&63}}b[p]=0}}var w=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0;function ee(m,p){for(var v=m>>1,b=v+p/2;!(v>=b)&&L[v];)++v;if(v<<=1,32<v-m&&w)return w.decode(P.subarray(m,v));for(v="",b=0;!(b>=p/2);++b){var x=F[m+2*b>>1];if(x==0)break;v+=String.fromCharCode(x)}return v}function ie(m,p,v){if(v===void 0&&(v=2147483647),2>v)return 0;v-=2;var b=p;v=v<2*m.length?v/2:m.length;for(var x=0;x<v;++x)F[p>>1]=m.charCodeAt(x),p+=2;return F[p>>1]=0,p-b}function Z(m){return 2*m.length}function R(m,p){for(var v=0,b="";!(v>=p/4);){var x=G[m+4*v>>2];if(x==0)break;++v,65536<=x?(x-=65536,b+=String.fromCharCode(55296|x>>10,56320|x&1023)):b+=String.fromCharCode(x)}return b}function U(m,p,v){if(v===void 0&&(v=2147483647),4>v)return 0;var b=p;v=b+v-4;for(var x=0;x<m.length;++x){var D=m.charCodeAt(x);if(55296<=D&&57343>=D){var $=m.charCodeAt(++x);D=65536+((D&1023)<<10)|$&1023}if(G[p>>2]=D,p+=4,p+4>v)break}return G[p>>2]=0,p-b}function y(m){for(var p=0,v=0;v<m.length;++v){var b=m.charCodeAt(v);55296<=b&&57343>=b&&++v,p+=4}return p}var O,k,P,F,L,G,te,j,J;function B(){var m=A.buffer;O=m,n.HEAP8=k=new Int8Array(m),n.HEAP16=F=new Int16Array(m),n.HEAP32=G=new Int32Array(m),n.HEAPU8=P=new Uint8Array(m),n.HEAPU16=L=new Uint16Array(m),n.HEAPU32=te=new Uint32Array(m),n.HEAPF32=j=new Float32Array(m),n.HEAPF64=J=new Float64Array(m)}var ne,H=[],Y=[],re=[];function de(){var m=n.preRun.shift();H.unshift(m)}var pe=0,be=null,Fe=null;n.preloadedImages={},n.preloadedAudios={};function Ht(m){throw n.onAbort&&n.onAbort(m),m="Aborted("+m+")",E(m),_=!0,m=new WebAssembly.RuntimeError(m+". Build with -s ASSERTIONS=1 for more info."),o(m),m}function ad(){return dt.startsWith("data:application/octet-stream;base64,")}var dt;if(dt="pathkit.wasm",!ad()){var ld=dt;dt=n.locateFile?n.locateFile(ld,u):u+ld}function ud(){var m=dt;try{if(m==dt&&S)return new Uint8Array(S);if(g)return g(m);throw"both async and sync fetching of the wasm failed"}catch(p){Ht(p)}}function NI(){if(!S&&(a||l)){if(typeof fetch=="function"&&!dt.startsWith("file://"))return fetch(dt,{credentials:"same-origin"}).then(function(m){if(!m.ok)throw"failed to load wasm binary file at '"+dt+"'";return m.arrayBuffer()}).catch(function(){return ud()});if(f)return new Promise(function(m,p){f(dt,function(v){m(new Uint8Array(v))},p)})}return Promise.resolve().then(function(){return ud()})}function wa(m){for(;0<m.length;){var p=m.shift();if(typeof p=="function")p(n);else{var v=p.Wa;typeof v=="number"?p.xa===void 0?ne.get(v)():ne.get(v)(p.xa):v(p.xa===void 0?null:p.xa)}}}var mo={};function ka(m){for(;m.length;){var p=m.pop();m.pop()(p)}}function nr(m){return this.fromWireType(te[m>>2])}var rr={},On={},ho={};function cd(m){if(m===void 0)return"_unknown";m=m.replace(/[^a-zA-Z0-9_]/g,"$");var p=m.charCodeAt(0);return 48<=p&&57>=p?"_"+m:m}function _a(m,p){return m=cd(m),function(){return p.apply(this,arguments)}}function La(m){var p=Error,v=_a(m,function(b){this.name=m,this.message=b,b=Error(b).stack,b!==void 0&&(this.stack=this.toString()+`
`+b.replace(/^Error(:[^\n]*)?\n/,""))});return v.prototype=Object.create(p.prototype),v.prototype.constructor=v,v.prototype.toString=function(){return this.message===void 0?this.name:this.name+": "+this.message},v}var fd=void 0;function go(m){throw new fd(m)}function Wt(m,p,v){function b(V){V=v(V),V.length!==m.length&&go("Mismatched type converter count");for(var X=0;X<m.length;++X)wt(m[X],V[X])}m.forEach(function(V){ho[V]=p});var x=Array(p.length),D=[],$=0;p.forEach(function(V,X){On.hasOwnProperty(V)?x[X]=On[V]:(D.push(V),rr.hasOwnProperty(V)||(rr[V]=[]),rr[V].push(function(){x[X]=On[V],++$,$===D.length&&b(x)}))}),D.length===0&&b(x)}var yo={};function vo(m){switch(m){case 1:return 0;case 2:return 1;case 4:return 2;case 8:return 3;default:throw new TypeError("Unknown type size: "+m)}}var dd=void 0;function _e(m){for(var p="";P[m];)p+=dd[P[m++]];return p}var ir=void 0;function me(m){throw new ir(m)}function wt(m,p,v={}){if(!("argPackAdvance"in p))throw new TypeError("registerType registeredInstance requires argPackAdvance");var b=p.name;if(m||me('type "'+b+'" must have a positive integer typeid pointer'),On.hasOwnProperty(m)){if(v.Qa)return;me("Cannot register type '"+b+"' twice")}On[m]=p,delete ho[m],rr.hasOwnProperty(m)&&(p=rr[m],delete rr[m],p.forEach(function(x){x()}))}function Va(m){me(m.ea.ha.fa.name+" instance already deleted")}var Fa=!1;function pd(){}function md(m){--m.count.value,m.count.value===0&&(m.ka?m.ma.la(m.ka):m.ha.fa.la(m.ga))}function Wr(m){return typeof FinalizationGroup>"u"?(Wr=p=>p,m):(Fa=new FinalizationGroup(function(p){for(var v=p.next();!v.done;v=p.next())v=v.value,v.ga?md(v):console.warn("object already deleted: "+v.ga)}),Wr=p=>(Fa.register(p,p.ea,p.ea),p),pd=p=>{Fa.unregister(p.ea)},Wr(m))}var $r=void 0,jr=[];function Ga(){for(;jr.length;){var m=jr.pop();m.ea.pa=!1,m.delete()}}function ln(){}var hd={};function gd(m,p,v){if(m[p].ia===void 0){var b=m[p];m[p]=function(){return m[p].ia.hasOwnProperty(arguments.length)||me("Function '"+v+"' called with an invalid number of arguments ("+arguments.length+") - expects one of ("+m[p].ia+")!"),m[p].ia[arguments.length].apply(this,arguments)},m[p].ia=[],m[p].ia[b.ua]=b}}function Ba(m,p,v){n.hasOwnProperty(m)?((v===void 0||n[m].ia!==void 0&&n[m].ia[v]!==void 0)&&me("Cannot register public name '"+m+"' twice"),gd(n,m,m),n.hasOwnProperty(v)&&me("Cannot register multiple overloads of a function with the same number of arguments ("+v+")!"),n[m].ia[v]=p):(n[m]=p,v!==void 0&&(n[m].Xa=v))}function CI(m,p,v,b,x,D,$,V){this.name=m,this.constructor=p,this.qa=v,this.la=b,this.na=x,this.Oa=D,this.ta=$,this.La=V,this.Ta=[]}function Ua(m,p,v){for(;p!==v;)p.ta||me("Expected null or instance of "+v.name+", got an instance of "+p.name),m=p.ta(m),p=p.na;return m}function OI(m,p){return p===null?(this.Ba&&me("null is not a valid "+this.name),0):(p.ea||me('Cannot pass "'+ja(p)+'" as a '+this.name),p.ea.ga||me("Cannot pass deleted object as a pointer of type "+this.name),Ua(p.ea.ga,p.ea.ha.fa,this.fa))}function RI(m,p){if(p===null){if(this.Ba&&me("null is not a valid "+this.name),this.wa){var v=this.sa();return m!==null&&m.push(this.la,v),v}return 0}if(p.ea||me('Cannot pass "'+ja(p)+'" as a '+this.name),p.ea.ga||me("Cannot pass deleted object as a pointer of type "+this.name),!this.va&&p.ea.ha.va&&me("Cannot convert argument of type "+(p.ea.ma?p.ea.ma.name:p.ea.ha.name)+" to parameter type "+this.name),v=Ua(p.ea.ga,p.ea.ha.fa,this.fa),this.wa)switch(p.ea.ka===void 0&&me("Passing raw pointer to smart pointer is illegal"),this.Va){case 0:p.ea.ma===this?v=p.ea.ka:me("Cannot convert argument of type "+(p.ea.ma?p.ea.ma.name:p.ea.ha.name)+" to parameter type "+this.name);break;case 1:v=p.ea.ka;break;case 2:if(p.ea.ma===this)v=p.ea.ka;else{var b=p.clone();v=this.Ua(v,un(function(){b.delete()})),m!==null&&m.push(this.la,v)}break;default:me("Unsupporting sharing policy")}return v}function DI(m,p){return p===null?(this.Ba&&me("null is not a valid "+this.name),0):(p.ea||me('Cannot pass "'+ja(p)+'" as a '+this.name),p.ea.ga||me("Cannot pass deleted object as a pointer of type "+this.name),p.ea.ha.va&&me("Cannot convert argument of type "+p.ea.ha.name+" to parameter type "+this.name),Ua(p.ea.ga,p.ea.ha.fa,this.fa))}function yd(m,p,v){return p===v?m:v.na===void 0?null:(m=yd(m,p,v.na),m===null?null:v.La(m))}var Xr={};function MI(m,p){for(p===void 0&&me("ptr should not be undefined");m.na;)p=m.ta(p),m=m.na;return Xr[p]}function Io(m,p){return p.ha&&p.ga||go("makeClassHandle requires ptr and ptrType"),!!p.ma!=!!p.ka&&go("Both smartPtrType and smartPtr must be specified"),p.count={value:1},Wr(Object.create(m,{ea:{value:p}}))}function $t(m,p,v,b){this.name=m,this.fa=p,this.Ba=v,this.va=b,this.wa=!1,this.la=this.Ua=this.sa=this.Ia=this.Va=this.Sa=void 0,p.na!==void 0?this.toWireType=RI:(this.toWireType=b?OI:DI,this.ja=null)}function vd(m,p,v){n.hasOwnProperty(m)||go("Replacing nonexistant public symbol"),n[m].ia!==void 0&&v!==void 0?n[m].ia[v]=p:(n[m]=p,n[m].ua=v)}function PI(m,p){var v=[];return function(){v.length=arguments.length;for(var b=0;b<arguments.length;b++)v[b]=arguments[b];return m.includes("j")?(b=n["dynCall_"+m],b=v&&v.length?b.apply(null,[p].concat(v)):b.call(null,p)):b=ne.get(p).apply(null,v),b}}function Ke(m,p){m=_e(m);var v=m.includes("j")?PI(m,p):ne.get(p);return typeof v!="function"&&me("unknown function pointer with signature "+m+": "+p),v}var Id=void 0;function Td(m){m=Nd(m);var p=_e(m);return jt(m),p}function To(m,p){function v(D){x[D]||On[D]||(ho[D]?ho[D].forEach(v):(b.push(D),x[D]=!0))}var b=[],x={};throw p.forEach(v),new Id(m+": "+b.map(Td).join([", "]))}function za(m,p){for(var v=[],b=0;b<m;b++)v.push(G[(p>>2)+b]);return v}function Ha(m,p,v,b,x){var D=p.length;2>D&&me("argTypes array size mismatch! Must at least get return value and 'this' types!");var $=p[1]!==null&&v!==null,V=!1;for(v=1;v<p.length;++v)if(p[v]!==null&&p[v].ja===void 0){V=!0;break}var X=p[0].name!=="void",q=D-2,Q=Array(q),oe=[],ge=[];return function(){if(arguments.length!==q&&me("function "+m+" called with "+arguments.length+" arguments, expected "+q+" args!"),ge.length=0,oe.length=$?2:1,oe[0]=x,$){var Ee=p[1].toWireType(ge,this);oe[1]=Ee}for(var ye=0;ye<q;++ye)Q[ye]=p[ye+2].toWireType(ge,arguments[ye]),oe.push(Q[ye]);if(ye=b.apply(null,oe),V)ka(ge);else for(var Ye=$?1:2;Ye<p.length;Ye++){var qe=Ye===1?Ee:Q[Ye-2];p[Ye].ja!==null&&p[Ye].ja(qe)}return Ee=X?p[0].fromWireType(ye):void 0,Ee}}var Wa=[],Et=[{},{value:void 0},{value:null},{value:!0},{value:!1}];function Sd(m){4<m&&--Et[m].Ca===0&&(Et[m]=void 0,Wa.push(m))}function $a(m){return m||me("Cannot use deleted val. handle = "+m),Et[m].value}function un(m){switch(m){case void 0:return 1;case null:return 2;case!0:return 3;case!1:return 4;default:var p=Wa.length?Wa.pop():Et.length;return Et[p]={Ca:1,value:m},p}}function wI(m,p,v){switch(p){case 0:return function(b){return this.fromWireType((v?k:P)[b])};case 1:return function(b){return this.fromWireType((v?F:L)[b>>1])};case 2:return function(b){return this.fromWireType((v?G:te)[b>>2])};default:throw new TypeError("Unknown integer type: "+m)}}function So(m,p){var v=On[m];return v===void 0&&me(p+" has unknown type "+Td(m)),v}function ja(m){if(m===null)return"null";var p=typeof m;return p==="object"||p==="array"||p==="function"?m.toString():""+m}function kI(m,p){switch(p){case 2:return function(v){return this.fromWireType(j[v>>2])};case 3:return function(v){return this.fromWireType(J[v>>3])};default:throw new TypeError("Unknown float type: "+m)}}function _I(m,p,v){switch(p){case 0:return v?function(b){return k[b]}:function(b){return P[b]};case 1:return v?function(b){return F[b>>1]}:function(b){return L[b>>1]};case 2:return v?function(b){return G[b>>2]}:function(b){return te[b>>2]};default:throw new TypeError("Unknown integer type: "+m)}}var LI={};function Xa(m){var p=LI[m];return p===void 0?_e(m):p}var Ka=[];function bd(){function m(p){p.$$$embind_global$$$=p;var v=typeof $$$embind_global$$$=="object"&&p.$$$embind_global$$$===p;return v||delete p.$$$embind_global$$$,v}if(typeof globalThis=="object")return globalThis;if(typeof $$$embind_global$$$=="object"||(typeof global=="object"&&m(global)?$$$embind_global$$$=global:typeof self=="object"&&m(self)&&($$$embind_global$$$=self),typeof $$$embind_global$$$=="object"))return $$$embind_global$$$;throw Error("unable to get global object.")}function VI(m){var p=Ka.length;return Ka.push(m),p}function FI(m,p){for(var v=Array(m),b=0;b<m;++b)v[b]=So(G[(p>>2)+b],"parameter "+b);return v}var Ed=[];function GI(m){var p=Array(m+1);return function(v,b,x){p[0]=v;for(var D=0;D<m;++D){var $=So(G[(b>>2)+D],"parameter "+D);p[D+1]=$.readValueFromPointer(x),x+=$.argPackAdvance}return v=new(v.bind.apply(v,p)),un(v)}}var Ad={},BI=[null,[],[]];fd=n.InternalError=La("InternalError");for(var xd=Array(256),bo=0;256>bo;++bo)xd[bo]=String.fromCharCode(bo);dd=xd,ir=n.BindingError=La("BindingError"),ln.prototype.isAliasOf=function(m){if(!(this instanceof ln&&m instanceof ln))return!1;var p=this.ea.ha.fa,v=this.ea.ga,b=m.ea.ha.fa;for(m=m.ea.ga;p.na;)v=p.ta(v),p=p.na;for(;b.na;)m=b.ta(m),b=b.na;return p===b&&v===m},ln.prototype.clone=function(){if(this.ea.ga||Va(this),this.ea.ra)return this.ea.count.value+=1,this;var m=Wr,p=Object,v=p.create,b=Object.getPrototypeOf(this),x=this.ea;return m=m(v.call(p,b,{ea:{value:{count:x.count,pa:x.pa,ra:x.ra,ga:x.ga,ha:x.ha,ka:x.ka,ma:x.ma}}})),m.ea.count.value+=1,m.ea.pa=!1,m},ln.prototype.delete=function(){this.ea.ga||Va(this),this.ea.pa&&!this.ea.ra&&me("Object already scheduled for deletion"),pd(this),md(this.ea),this.ea.ra||(this.ea.ka=void 0,this.ea.ga=void 0)},ln.prototype.isDeleted=function(){return!this.ea.ga},ln.prototype.deleteLater=function(){return this.ea.ga||Va(this),this.ea.pa&&!this.ea.ra&&me("Object already scheduled for deletion"),jr.push(this),jr.length===1&&$r&&$r(Ga),this.ea.pa=!0,this},$t.prototype.Pa=function(m){return this.Ia&&(m=this.Ia(m)),m},$t.prototype.Ga=function(m){this.la&&this.la(m)},$t.prototype.argPackAdvance=8,$t.prototype.readValueFromPointer=nr,$t.prototype.deleteObject=function(m){m!==null&&m.delete()},$t.prototype.fromWireType=function(m){function p(){return this.wa?Io(this.fa.qa,{ha:this.Sa,ga:v,ma:this,ka:m}):Io(this.fa.qa,{ha:this,ga:m})}var v=this.Pa(m);if(!v)return this.Ga(m),null;var b=MI(this.fa,v);if(b!==void 0)return b.ea.count.value===0?(b.ea.ga=v,b.ea.ka=m,b.clone()):(b=b.clone(),this.Ga(m),b);if(b=this.fa.Oa(v),b=hd[b],!b)return p.call(this);b=this.va?b.Ja:b.pointerType;var x=yd(v,this.fa,b.fa);return x===null?p.call(this):this.wa?Io(b.fa.qa,{ha:b,ga:x,ma:this,ka:m}):Io(b.fa.qa,{ha:b,ga:x})},n.getInheritedInstanceCount=function(){return Object.keys(Xr).length},n.getLiveInheritedInstances=function(){var m=[],p;for(p in Xr)Xr.hasOwnProperty(p)&&m.push(Xr[p]);return m},n.flushPendingDeletes=Ga,n.setDelayFunction=function(m){$r=m,jr.length&&$r&&$r(Ga)},Id=n.UnboundTypeError=La("UnboundTypeError"),n.count_emval_handles=function(){for(var m=0,p=5;p<Et.length;++p)Et[p]!==void 0&&++m;return m},n.get_first_emval=function(){for(var m=5;m<Et.length;++m)if(Et[m]!==void 0)return Et[m];return null};var UI={r:function(m){var p=mo[m];delete mo[m];var v=p.elements,b=v.length,x=v.map(function(V){return V.Aa}).concat(v.map(function(V){return V.Ea})),D=p.sa,$=p.la;Wt([m],x,function(V){return v.forEach(function(X,q){var Q=V[q],oe=X.ya,ge=X.za,Ee=V[q+b],ye=X.Da,Ye=X.Fa;X.read=qe=>Q.fromWireType(oe(ge,qe)),X.write=(qe,Rn)=>{var pt=[];ye(Ye,qe,Ee.toWireType(pt,Rn)),ka(pt)}}),[{name:p.name,fromWireType:function(X){for(var q=Array(b),Q=0;Q<b;++Q)q[Q]=v[Q].read(X);return $(X),q},toWireType:function(X,q){if(b!==q.length)throw new TypeError("Incorrect number of tuple elements for "+p.name+": expected="+b+", actual="+q.length);for(var Q=D(),oe=0;oe<b;++oe)v[oe].write(Q,q[oe]);return X!==null&&X.push($,Q),Q},argPackAdvance:8,readValueFromPointer:nr,ja:$}]})},u:function(m){var p=yo[m];delete yo[m];var v=p.sa,b=p.la,x=p.Ha,D=x.map(function($){return $.Aa}).concat(x.map(function($){return $.Ea}));Wt([m],D,function($){var V={};return x.forEach(function(X,q){var Q=$[q],oe=X.ya,ge=X.za,Ee=$[q+x.length],ye=X.Da,Ye=X.Fa;V[X.Na]={read:function(qe){return Q.fromWireType(oe(ge,qe))},write:function(qe,Rn){var pt=[];ye(Ye,qe,Ee.toWireType(pt,Rn)),ka(pt)}}}),[{name:p.name,fromWireType:function(X){var q={},Q;for(Q in V)q[Q]=V[Q].read(X);return b(X),q},toWireType:function(X,q){for(var Q in V)if(!(Q in q))throw new TypeError('Missing field:  "'+Q+'"');var oe=v();for(Q in V)V[Q].write(oe,q[Q]);return X!==null&&X.push(b,oe),oe},argPackAdvance:8,readValueFromPointer:nr,ja:b}]})},z:function(){},F:function(m,p,v,b,x){var D=vo(v);p=_e(p),wt(m,{name:p,fromWireType:function($){return!!$},toWireType:function($,V){return V?b:x},argPackAdvance:8,readValueFromPointer:function($){if(v===1)var V=k;else if(v===2)V=F;else if(v===4)V=G;else throw new TypeError("Unknown boolean type size: "+p);return this.fromWireType(V[$>>D])},ja:null})},l:function(m,p,v,b,x,D,$,V,X,q,Q,oe,ge){Q=_e(Q),D=Ke(x,D),V&&(V=Ke($,V)),q&&(q=Ke(X,q)),ge=Ke(oe,ge);var Ee=cd(Q);Ba(Ee,function(){To("Cannot construct "+Q+" due to unbound types",[b])}),Wt([m,p,v],b?[b]:[],function(ye){if(ye=ye[0],b)var Ye=ye.fa,qe=Ye.qa;else qe=ln.prototype;ye=_a(Ee,function(){if(Object.getPrototypeOf(this)!==Rn)throw new ir("Use 'new' to construct "+Q);if(pt.oa===void 0)throw new ir(Q+" has no accessible constructor");var Od=pt.oa[arguments.length];if(Od===void 0)throw new ir("Tried to invoke ctor of "+Q+" with invalid number of parameters ("+arguments.length+") - expected ("+Object.keys(pt.oa).toString()+") parameters instead!");return Od.apply(this,arguments)});var Rn=Object.create(qe,{constructor:{value:ye}});ye.prototype=Rn;var pt=new CI(Q,ye,Rn,ge,Ye,D,V,q);Ye=new $t(Q,pt,!0,!1),qe=new $t(Q+"*",pt,!1,!1);var Cd=new $t(Q+" const*",pt,!1,!0);return hd[m]={pointerType:qe,Ja:Cd},vd(Ee,ye),[Ye,qe,Cd]})},i:function(m,p,v,b,x,D){0<p||Ht(void 0);var $=za(p,v);x=Ke(b,x),Wt([],[m],function(V){V=V[0];var X="constructor "+V.name;if(V.fa.oa===void 0&&(V.fa.oa=[]),V.fa.oa[p-1]!==void 0)throw new ir("Cannot register multiple constructors with identical number of parameters ("+(p-1)+") for class '"+V.name+"'! Overload resolution is currently only performed using the parameter count, not actual type info!");return V.fa.oa[p-1]=()=>{To("Cannot construct "+V.name+" due to unbound types",$)},Wt([],$,function(q){return q.splice(1,0,null),V.fa.oa[p-1]=Ha(X,q,null,x,D),[]}),[]})},a:function(m,p,v,b,x,D,$,V){var X=za(v,b);p=_e(p),D=Ke(x,D),Wt([],[m],function(q){function Q(){To("Cannot call "+oe+" due to unbound types",X)}q=q[0];var oe=q.name+"."+p;p.startsWith("@@")&&(p=Symbol[p.substring(2)]),V&&q.fa.Ta.push(p);var ge=q.fa.qa,Ee=ge[p];return Ee===void 0||Ee.ia===void 0&&Ee.className!==q.name&&Ee.ua===v-2?(Q.ua=v-2,Q.className=q.name,ge[p]=Q):(gd(ge,p,oe),ge[p].ia[v-2]=Q),Wt([],X,function(ye){return ye=Ha(oe,ye,q,D,$),ge[p].ia===void 0?(ye.ua=v-2,ge[p]=ye):ge[p].ia[v-2]=ye,[]}),[]})},I:function(m,p,v){m=_e(m),Wt([],[p],function(b){return b=b[0],n[m]=b.fromWireType(v),[]})},E:function(m,p){p=_e(p),wt(m,{name:p,fromWireType:function(v){var b=$a(v);return Sd(v),b},toWireType:function(v,b){return un(b)},argPackAdvance:8,readValueFromPointer:nr,ja:null})},h:function(m,p,v,b){function x(){}v=vo(v),p=_e(p),x.values={},wt(m,{name:p,constructor:x,fromWireType:function(D){return this.constructor.values[D]},toWireType:function(D,$){return $.value},argPackAdvance:8,readValueFromPointer:wI(p,v,b),ja:null}),Ba(p,x)},k:function(m,p,v){var b=So(m,"enum");p=_e(p),m=b.constructor,b=Object.create(b.constructor.prototype,{value:{value:v},constructor:{value:_a(b.name+"_"+p,function(){})}}),m.values[v]=b,m[p]=b},q:function(m,p,v){v=vo(v),p=_e(p),wt(m,{name:p,fromWireType:function(b){return b},toWireType:function(b,x){return x},argPackAdvance:8,readValueFromPointer:kI(p,v),ja:null})},f:function(m,p,v,b,x,D){var $=za(p,v);m=_e(m),x=Ke(b,x),Ba(m,function(){To("Cannot call "+m+" due to unbound types",$)},p-1),Wt([],$,function(V){return V=[V[0],null].concat(V.slice(1)),vd(m,Ha(m,V,null,x,D),p-1),[]})},e:function(m,p,v,b,x){p=_e(p),x===-1&&(x=4294967295),x=vo(v);var D=V=>V;if(b===0){var $=32-8*v;D=V=>V<<$>>>$}v=p.includes("unsigned")?function(V,X){return X>>>0}:function(V,X){return X},wt(m,{name:p,fromWireType:D,toWireType:v,argPackAdvance:8,readValueFromPointer:_I(p,x,b!==0),ja:null})},b:function(m,p,v){function b(D){D>>=2;var $=te;return new x(O,$[D+1],$[D])}var x=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array][p];v=_e(v),wt(m,{name:v,fromWireType:b,argPackAdvance:8,readValueFromPointer:b},{Qa:!0})},p:function(m,p){p=_e(p);var v=p==="std::string";wt(m,{name:p,fromWireType:function(b){var x=te[b>>2];if(v)for(var D=b+4,$=0;$<=x;++$){var V=b+4+$;if($==x||P[V]==0){if(D=D?M(P,D,V-D):"",X===void 0)var X=D;else X+="\0",X+=D;D=V+1}}else{for(X=Array(x),$=0;$<x;++$)X[$]=String.fromCharCode(P[b+4+$]);X=X.join("")}return jt(b),X},toWireType:function(b,x){x instanceof ArrayBuffer&&(x=new Uint8Array(x));var D=typeof x=="string";D||x instanceof Uint8Array||x instanceof Uint8ClampedArray||x instanceof Int8Array||me("Cannot pass non-string to std::string");var $=(v&&D?()=>{for(var q=0,Q=0;Q<x.length;++Q){var oe=x.charCodeAt(Q);55296<=oe&&57343>=oe&&(oe=65536+((oe&1023)<<10)|x.charCodeAt(++Q)&1023),127>=oe?++q:q=2047>=oe?q+2:65535>=oe?q+3:q+4}return q}:()=>x.length)(),V=Ya(4+$+1);if(te[V>>2]=$,v&&D)z(x,V+4,$+1);else if(D)for(D=0;D<$;++D){var X=x.charCodeAt(D);255<X&&(jt(V),me("String has UTF-16 code units that do not fit in 8 bits")),P[V+4+D]=X}else for(D=0;D<$;++D)P[V+4+D]=x[D];return b!==null&&b.push(jt,V),V},argPackAdvance:8,readValueFromPointer:nr,ja:function(b){jt(b)}})},m:function(m,p,v){if(v=_e(v),p===2)var b=ee,x=ie,D=Z,$=()=>L,V=1;else p===4&&(b=R,x=U,D=y,$=()=>te,V=2);wt(m,{name:v,fromWireType:function(X){for(var q=te[X>>2],Q=$(),oe,ge=X+4,Ee=0;Ee<=q;++Ee){var ye=X+4+Ee*p;(Ee==q||Q[ye>>V]==0)&&(ge=b(ge,ye-ge),oe===void 0?oe=ge:(oe+="\0",oe+=ge),ge=ye+p)}return jt(X),oe},toWireType:function(X,q){typeof q!="string"&&me("Cannot pass non-string to C++ string type "+v);var Q=D(q),oe=Ya(4+Q+p);return te[oe>>2]=Q>>V,x(q,oe+4,Q+p),X!==null&&X.push(jt,oe),oe},argPackAdvance:8,readValueFromPointer:nr,ja:function(X){jt(X)}})},t:function(m,p,v,b,x,D){mo[m]={name:_e(p),sa:Ke(v,b),la:Ke(x,D),elements:[]}},s:function(m,p,v,b,x,D,$,V,X){mo[m].elements.push({Aa:p,ya:Ke(v,b),za:x,Ea:D,Da:Ke($,V),Fa:X})},v:function(m,p,v,b,x,D){yo[m]={name:_e(p),sa:Ke(v,b),la:Ke(x,D),Ha:[]}},j:function(m,p,v,b,x,D,$,V,X,q){yo[m].Ha.push({Na:_e(p),Aa:v,ya:Ke(b,x),za:D,Ea:$,Da:Ke(V,X),Fa:q})},G:function(m,p){p=_e(p),wt(m,{Ra:!0,name:p,argPackAdvance:0,fromWireType:function(){},toWireType:function(){}})},d:function(m,p,v,b){m=Ka[m],p=$a(p),v=Xa(v),m(p,v,null,b)},J:Sd,x:function(m){return m===0?un(bd()):(m=Xa(m),un(bd()[m]))},c:function(m,p){var v=FI(m,p),b=v[0];p=b.name+"_$"+v.slice(1).map(function($){return $.name}).join("_")+"$";var x=Ed[p];if(x!==void 0)return x;var D=Array(m-1);return x=VI(($,V,X,q)=>{for(var Q=0,oe=0;oe<m-1;++oe)D[oe]=v[oe+1].readValueFromPointer(q+Q),Q+=v[oe+1].argPackAdvance;for($=$[V].apply($,D),oe=0;oe<m-1;++oe)v[oe+1].Ka&&v[oe+1].Ka(D[oe]);if(!b.Ra)return b.toWireType(X,$)}),Ed[p]=x},n:function(m){4<m&&(Et[m].Ca+=1)},w:function(m,p,v,b){m=$a(m);var x=Ad[p];return x||(x=GI(p),Ad[p]=x),x(m,v,b)},K:function(){return un([])},D:function(m){return un(Xa(m))},H:function(m,p){return m=So(m,"_emval_take_value"),m=m.readValueFromPointer(p),un(m)},g:function(){Ht("")},B:function(m){var p=P.length;if(m>>>=0,2147483648<m)return!1;for(var v=1;4>=v;v*=2){var b=p*(1+.2/v);b=Math.min(b,m+100663296),b=Math.max(m,b),0<b%65536&&(b+=65536-b%65536);e:{try{A.grow(Math.min(2147483648,b)-O.byteLength+65535>>>16),B();var x=1;break e}catch{}x=void 0}if(x)return!0}return!1},C:function(){return 0},y:function(){},o:function(m,p,v,b){for(var x=0,D=0;D<v;D++){var $=G[p>>2],V=G[p+4>>2];p+=8;for(var X=0;X<V;X++){var q=P[$+X],Q=BI[m];q===0||q===10?((m===1?T:E)(M(Q,0)),Q.length=0):Q.push(q)}x+=V}return G[b>>2]=x,0},A:function(){}};(function(){function m(x){n.asm=x.exports,A=n.asm.L,B(),ne=n.asm._,Y.unshift(n.asm.M),pe--,n.monitorRunDependencies&&n.monitorRunDependencies(pe),pe==0&&(be!==null&&(clearInterval(be),be=null),Fe&&(x=Fe,Fe=null,x()))}function p(x){m(x.instance)}function v(x){return NI().then(function(D){return WebAssembly.instantiate(D,b)}).then(function(D){return D}).then(x,function(D){E("failed to asynchronously prepare wasm: "+D),Ht(D)})}var b={a:UI};if(pe++,n.monitorRunDependencies&&n.monitorRunDependencies(pe),n.instantiateWasm)try{return n.instantiateWasm(b,m)}catch(x){return E("Module.instantiateWasm callback failed with error: "+x),!1}return(function(){return S||typeof WebAssembly.instantiateStreaming!="function"||ad()||dt.startsWith("file://")||typeof fetch!="function"?v(p):fetch(dt,{credentials:"same-origin"}).then(function(x){return WebAssembly.instantiateStreaming(x,b).then(p,function(D){return E("wasm streaming compile failed: "+D),E("falling back to ArrayBuffer instantiation"),v(p)})})})().catch(o),{}})(),n.___wasm_call_ctors=function(){return(n.___wasm_call_ctors=n.asm.M).apply(null,arguments)},n.__Z6ToCmdsRK6SkPath=function(){return(n.__Z6ToCmdsRK6SkPath=n.asm.N).apply(null,arguments)},n.__Z8FromCmdsmi=function(){return(n.__Z8FromCmdsmi=n.asm.O).apply(null,arguments)},n.__Z7NewPathv=function(){return(n.__Z7NewPathv=n.asm.P).apply(null,arguments)},n.__Z8CopyPathRK6SkPath=function(){return(n.__Z8CopyPathRK6SkPath=n.asm.Q).apply(null,arguments)},n.__Z6EqualsRK6SkPathS1_=function(){return(n.__Z6EqualsRK6SkPathS1_=n.asm.R).apply(null,arguments)},n.__Z11ToSVGStringRK6SkPath=function(){return(n.__Z11ToSVGStringRK6SkPath=n.asm.S).apply(null,arguments)},n.__Z13FromSVGStringNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE=function(){return(n.__Z13FromSVGStringNSt3__212basic_stringIcNS_11char_traitsIcEENS_9allocatorIcEEEE=n.asm.T).apply(null,arguments)},n.__Z13ApplySimplifyR6SkPath=function(){return(n.__Z13ApplySimplifyR6SkPath=n.asm.U).apply(null,arguments)},n.__Z11ApplyPathOpR6SkPathRKS_8SkPathOp=function(){return(n.__Z11ApplyPathOpR6SkPathRKS_8SkPathOp=n.asm.V).apply(null,arguments)},n.__Z10MakeFromOpRK6SkPathS1_8SkPathOp=function(){return(n.__Z10MakeFromOpRK6SkPathS1_8SkPathOp=n.asm.W).apply(null,arguments)},n.__Z14ResolveBuilderR11SkOpBuilder=function(){return(n.__Z14ResolveBuilderR11SkOpBuilder=n.asm.X).apply(null,arguments)},n.__Z8ToCanvasRK6SkPathN10emscripten3valE=function(){return(n.__Z8ToCanvasRK6SkPathN10emscripten3valE=n.asm.Y).apply(null,arguments)},n.__Z8ToPath2DRK6SkPath=function(){return(n.__Z8ToPath2DRK6SkPath=n.asm.Z).apply(null,arguments)};var jt=n._free=function(){return(jt=n._free=n.asm.$).apply(null,arguments)},Ya=n._malloc=function(){return(Ya=n._malloc=n.asm.aa).apply(null,arguments)},Nd=n.___getTypeName=function(){return(Nd=n.___getTypeName=n.asm.ba).apply(null,arguments)};n.___embind_register_native_and_builtin_types=function(){return(n.___embind_register_native_and_builtin_types=n.asm.ca).apply(null,arguments)},n.dynCall_jiji=function(){return(n.dynCall_jiji=n.asm.da).apply(null,arguments)};var Eo;Fe=function m(){Eo||qa(),Eo||(Fe=m)};function qa(){function m(){if(!Eo&&(Eo=!0,n.calledRun=!0,!_)){if(wa(Y),i(n),n.onRuntimeInitialized&&n.onRuntimeInitialized(),n.postRun)for(typeof n.postRun=="function"&&(n.postRun=[n.postRun]);n.postRun.length;){var p=n.postRun.shift();re.unshift(p)}wa(re)}}if(!(0<pe)){if(n.preRun)for(typeof n.preRun=="function"&&(n.preRun=[n.preRun]);n.preRun.length;)de();wa(H),0<pe||(n.setStatus?(n.setStatus("Running..."),setTimeout(function(){setTimeout(function(){n.setStatus("")},1),m()},1)):m())}}if(n.run=qa,n.preInit)for(typeof n.preInit=="function"&&(n.preInit=[n.preInit]);0<n.preInit.length;)n.preInit.pop()();return qa(),t.ready})})();typeof xa=="object"&&typeof nd=="object"?nd.exports=td:typeof define=="function"&&define.amd?define([],function(){return td}):typeof xa=="object"&&(xa.PathKitInit=td)});var YI={toSorted(e){"use strict";if(e!==void 0&&typeof e!="function")throw new TypeError("Array comparator must be a function.");if(this==null)throw new TypeError("Cannot sort a null or undefined value.");return Array.from({length:this.length},(t,n)=>this[n]).sort(e)},toReversed(){"use strict";if(this==null)throw new TypeError("Cannot reverse a null or undefined value.");let e=Array.from({length:this.length});for(let t=0;t<e.length;t++)e[t]=this[e.length-t-1];return e}};for(let[e,t]of Object.entries(YI))typeof Array.prototype[e]!="function"&&Object.defineProperty(Array.prototype,e,{value:t,configurable:!0,writable:!0});var Me=Uint8Array,st=Uint16Array,ul=Int32Array,xo=new Me([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),No=new Me([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),rl=new Me([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),kd=function(e,t){for(var n=new st(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new ul(n[30]),r=1;r<30;++r)for(var o=n[r];o<n[r+1];++o)i[o]=o-n[r]<<5|r;return{b:n,r:i}},_d=kd(xo,2),Ld=_d.b,il=_d.r;Ld[28]=258,il[258]=28;var Vd=kd(No,0),qI=Vd.b,Rd=Vd.r,ol=new st(32768);for(ve=0;ve<32768;++ve)Xt=(ve&43690)>>1|(ve&21845)<<1,Xt=(Xt&52428)>>2|(Xt&13107)<<2,Xt=(Xt&61680)>>4|(Xt&3855)<<4,ol[ve]=((Xt&65280)>>8|(Xt&255)<<8)>>1;var Xt,ve,_t=(function(e,t,n){for(var r=e.length,i=0,o=new st(t);i<r;++i)e[i]&&++o[e[i]-1];var s=new st(t);for(i=1;i<t;++i)s[i]=s[i-1]+o[i-1]<<1;var a;if(n){a=new st(1<<t);var l=15-t;for(i=0;i<r;++i)if(e[i])for(var u=i<<4|e[i],c=t-e[i],f=s[e[i]-1]++<<c,g=f|(1<<c)-1;f<=g;++f)a[ol[f]>>l]=u}else for(a=new st(r),i=0;i<r;++i)e[i]&&(a[i]=ol[s[e[i]-1]++]>>15-e[i]);return a}),fn=new Me(288);for(ve=0;ve<144;++ve)fn[ve]=8;var ve;for(ve=144;ve<256;++ve)fn[ve]=9;var ve;for(ve=256;ve<280;++ve)fn[ve]=7;var ve;for(ve=280;ve<288;++ve)fn[ve]=8;var ve,Zr=new Me(32);for(ve=0;ve<32;++ve)Zr[ve]=5;var ve,ZI=_t(fn,9,0),JI=_t(fn,9,1),QI=_t(Zr,5,0),eT=_t(Zr,5,1),Qa=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},At=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},el=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},cl=function(e){return(e+7)/8|0},Jr=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new Me(e.subarray(t,n))};var tT=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],We=function(e,t,n){var r=new Error(t||tT[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,We),!n)throw r;return r},nT=function(e,t,n,r){var i=e.length,o=r?r.length:0;if(!i||t.f&&!t.l)return n||new Me(0);var s=!n,a=s||t.i!=2,l=t.i;s&&(n=new Me(i*3));var u=function(pe){var be=n.length;if(pe>be){var Fe=new Me(Math.max(be*2,pe));Fe.set(n),n=Fe}},c=t.f||0,f=t.p||0,g=t.b||0,h=t.l,d=t.d,I=t.m,T=t.n,E=i*8;do{if(!h){c=At(e,f,1);var S=At(e,f+1,3);if(f+=3,S)if(S==1)h=JI,d=eT,I=9,T=5;else if(S==2){var C=At(e,f,31)+257,M=At(e,f+10,15)+4,z=C+At(e,f+5,31)+1;f+=14;for(var w=new Me(z),ee=new Me(19),ie=0;ie<M;++ie)ee[rl[ie]]=At(e,f+ie*3,7);f+=M*3;for(var Z=Qa(ee),R=(1<<Z)-1,U=_t(ee,Z,1),ie=0;ie<z;){var y=U[At(e,f,R)];f+=y&15;var N=y>>4;if(N<16)w[ie++]=N;else{var O=0,k=0;for(N==16?(k=3+At(e,f,3),f+=2,O=w[ie-1]):N==17?(k=3+At(e,f,7),f+=3):N==18&&(k=11+At(e,f,127),f+=7);k--;)w[ie++]=O}}var P=w.subarray(0,C),F=w.subarray(C);I=Qa(P),T=Qa(F),h=_t(P,I,1),d=_t(F,T,1)}else We(1);else{var N=cl(f)+4,A=e[N-4]|e[N-3]<<8,_=N+A;if(_>i){l&&We(0);break}a&&u(g+A),n.set(e.subarray(N,_),g),t.b=g+=A,t.p=f=_*8,t.f=c;continue}if(f>E){l&&We(0);break}}a&&u(g+131072);for(var L=(1<<I)-1,G=(1<<T)-1,te=f;;te=f){var O=h[el(e,f)&L],j=O>>4;if(f+=O&15,f>E){l&&We(0);break}if(O||We(2),j<256)n[g++]=j;else if(j==256){te=f,h=null;break}else{var J=j-254;if(j>264){var ie=j-257,B=xo[ie];J=At(e,f,(1<<B)-1)+Ld[ie],f+=B}var ne=d[el(e,f)&G],H=ne>>4;ne||We(3),f+=ne&15;var F=qI[H];if(H>3){var B=No[H];F+=el(e,f)&(1<<B)-1,f+=B}if(f>E){l&&We(0);break}a&&u(g+131072);var Y=g+J;if(g<F){var re=o-F,de=Math.min(F,Y);for(re+g<0&&We(3);g<de;++g)n[g]=r[re+g]}for(;g<Y;++g)n[g]=n[g-F]}}t.l=h,t.p=te,t.b=g,t.f=c,h&&(c=1,t.m=I,t.d=d,t.n=T)}while(!c);return g!=n.length&&s?Jr(n,0,g):n.subarray(0,g)},Kt=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},Yr=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},tl=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,o=n.slice();if(!i)return{t:Gd,l:0};if(i==1){var s=new Me(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(_,C){return _.f-C.f}),n.push({s:-1,f:25001});var a=n[0],l=n[1],u=0,c=1,f=2;for(n[0]={s:-1,f:a.f+l.f,l:a,r:l};c!=i-1;)a=n[n[u].f<n[f].f?u++:f++],l=n[u!=c&&n[u].f<n[f].f?u++:f++],n[c++]={s:-1,f:a.f+l.f,l:a,r:l};for(var g=o[0].s,r=1;r<i;++r)o[r].s>g&&(g=o[r].s);var h=new st(g+1),d=sl(n[c-1],h,0);if(d>t){var r=0,I=0,T=d-t,E=1<<T;for(o.sort(function(C,M){return h[M.s]-h[C.s]||C.f-M.f});r<i;++r){var S=o[r].s;if(h[S]>t)I+=E-(1<<d-h[S]),h[S]=t;else break}for(I>>=T;I>0;){var N=o[r].s;h[N]<t?I-=1<<t-h[N]++-1:++r}for(;r>=0&&I;--r){var A=o[r].s;h[A]==t&&(--h[A],++I)}d=t}return{t:new Me(h),l:d}},sl=function(e,t,n){return e.s==-1?Math.max(sl(e.l,t,n+1),sl(e.r,t,n+1)):t[e.s]=n},Dd=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new st(++t),r=0,i=e[0],o=1,s=function(l){n[r++]=l},a=1;a<=t;++a)if(e[a]==i&&a!=t)++o;else{if(!i&&o>2){for(;o>138;o-=138)s(32754);o>2&&(s(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(s(i),--o;o>6;o-=6)s(8304);o>2&&(s(o-3<<5|8208),o=0)}for(;o--;)s(i);o=1,i=e[a]}return{c:n.subarray(0,r),n:t}},qr=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},Fd=function(e,t,n){var r=n.length,i=cl(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var o=0;o<r;++o)e[i+o+4]=n[o];return(i+4+r)*8},Md=function(e,t,n,r,i,o,s,a,l,u,c){Kt(t,c++,n),++i[256];for(var f=tl(i,15),g=f.t,h=f.l,d=tl(o,15),I=d.t,T=d.l,E=Dd(g),S=E.c,N=E.n,A=Dd(I),_=A.c,C=A.n,M=new st(19),z=0;z<S.length;++z)++M[S[z]&31];for(var z=0;z<_.length;++z)++M[_[z]&31];for(var w=tl(M,7),ee=w.t,ie=w.l,Z=19;Z>4&&!ee[rl[Z-1]];--Z);var R=u+5<<3,U=qr(i,fn)+qr(o,Zr)+s,y=qr(i,g)+qr(o,I)+s+14+3*Z+qr(M,ee)+2*M[16]+3*M[17]+7*M[18];if(l>=0&&R<=U&&R<=y)return Fd(t,c,e.subarray(l,l+u));var O,k,P,F;if(Kt(t,c,1+(y<U)),c+=2,y<U){O=_t(g,h,0),k=g,P=_t(I,T,0),F=I;var L=_t(ee,ie,0);Kt(t,c,N-257),Kt(t,c+5,C-1),Kt(t,c+10,Z-4),c+=14;for(var z=0;z<Z;++z)Kt(t,c+3*z,ee[rl[z]]);c+=3*Z;for(var G=[S,_],te=0;te<2;++te)for(var j=G[te],z=0;z<j.length;++z){var J=j[z]&31;Kt(t,c,L[J]),c+=ee[J],J>15&&(Kt(t,c,j[z]>>5&127),c+=j[z]>>12)}}else O=ZI,k=fn,P=QI,F=Zr;for(var z=0;z<a;++z){var B=r[z];if(B>255){var J=B>>18&31;Yr(t,c,O[J+257]),c+=k[J+257],J>7&&(Kt(t,c,B>>23&31),c+=xo[J]);var ne=B&31;Yr(t,c,P[ne]),c+=F[ne],ne>3&&(Yr(t,c,B>>5&8191),c+=No[ne])}else Yr(t,c,O[B]),c+=k[B]}return Yr(t,c,O[256]),c+k[256]},rT=new ul([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Gd=new Me(0),iT=function(e,t,n,r,i,o){var s=o.z||e.length,a=new Me(r+s+5*(1+Math.ceil(s/7e3))+i),l=a.subarray(r,a.length-i),u=o.l,c=(o.r||0)&7;if(t){c&&(l[0]=o.r>>3);for(var f=rT[t-1],g=f>>13,h=f&8191,d=(1<<n)-1,I=o.p||new st(32768),T=o.h||new st(d+1),E=Math.ceil(n/3),S=2*E,N=function(Ht){return(e[Ht]^e[Ht+1]<<E^e[Ht+2]<<S)&d},A=new ul(25e3),_=new st(288),C=new st(32),M=0,z=0,w=o.i||0,ee=0,ie=o.w||0,Z=0;w+2<s;++w){var R=N(w),U=w&32767,y=T[R];if(I[U]=y,T[R]=U,ie<=w){var O=s-w;if((M>7e3||ee>24576)&&(O>423||!u)){c=Md(e,l,0,A,_,C,z,ee,Z,w-Z,c),ee=M=z=0,Z=w;for(var k=0;k<286;++k)_[k]=0;for(var k=0;k<30;++k)C[k]=0}var P=2,F=0,L=h,G=U-y&32767;if(O>2&&R==N(w-G))for(var te=Math.min(g,O)-1,j=Math.min(32767,w),J=Math.min(258,O);G<=j&&--L&&U!=y;){if(e[w+P]==e[w+P-G]){for(var B=0;B<J&&e[w+B]==e[w+B-G];++B);if(B>P){if(P=B,F=G,B>te)break;for(var ne=Math.min(G,B-2),H=0,k=0;k<ne;++k){var Y=w-G+k&32767,re=I[Y],de=Y-re&32767;de>H&&(H=de,y=Y)}}}U=y,y=I[U],G+=U-y&32767}if(F){A[ee++]=268435456|il[P]<<18|Rd[F];var pe=il[P]&31,be=Rd[F]&31;z+=xo[pe]+No[be],++_[257+pe],++C[be],ie=w+P,++M}else A[ee++]=e[w],++_[e[w]]}}for(w=Math.max(w,ie);w<s;++w)A[ee++]=e[w],++_[e[w]];c=Md(e,l,u,A,_,C,z,ee,Z,w-Z,c),u||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=T,o.p=I,o.i=w,o.w=ie)}else{for(var w=o.w||0;w<s+u;w+=65535){var Fe=w+65535;Fe>=s&&(l[c/8|0]=u,Fe=s),c=Fd(l,c+1,e.subarray(w,Fe))}o.i=s}return Jr(a,0,r+cl(c)+i)},oT=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),sT=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=oT[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var aT=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var o=t.dictionary.subarray(-32768),s=new Me(o.length+e.length);s.set(o),s.set(e,o.length),e=s,i.w=o.length}return iT(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)},Bd=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n};var kt=function(e,t){return e[t]|e[t+1]<<8},mt=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},nl=function(e,t){return mt(e,t)+mt(e,t+4)*4294967296},He=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function Qr(e,t){return aT(e,t||{},0,0)}function or(e,t){return nT(e,{i:2},t&&t.out,t&&t.dictionary)}var Ud=function(e,t,n,r){for(var i in e){var o=e[i],s=t+i,a=r;Array.isArray(o)&&(a=Bd(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?n[s]=[o,a]:(n[s+="/"]=[new Me(0),a],Ud(o,s,n,r))}},Pd=typeof TextEncoder<"u"&&new TextEncoder,al=typeof TextDecoder<"u"&&new TextDecoder,lT=0;try{al.decode(Gd,{stream:!0}),lT=1}catch{}var uT=function(e){for(var t="",n=0;;){var r=e[n++],i=(r>127)+(r>223)+(r>239);if(n+i>e.length)return{s:t,r:Jr(e,n-1)};i?i==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function Ao(e,t){if(t){for(var n=new Me(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(Pd)return Pd.encode(e);for(var i=e.length,o=new Me(e.length+(e.length>>1)),s=0,a=function(c){o[s++]=c},r=0;r<i;++r){if(s+5>o.length){var l=new Me(s+8+(i-r<<1));l.set(o),o=l}var u=e.charCodeAt(r);u<128||t?a(u):u<2048?(a(192|u>>6),a(128|u&63)):u>55295&&u<57344?(u=65536+(u&1047552)|e.charCodeAt(++r)&1023,a(240|u>>18),a(128|u>>12&63),a(128|u>>6&63),a(128|u&63)):(a(224|u>>12),a(128|u>>6&63),a(128|u&63))}return Jr(o,0,s)}function fl(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(al)return al.decode(e);var i=uT(e),o=i.s,n=i.r;return n.length&&We(8),o}}var cT=function(e,t){return t+30+kt(e,t+26)+kt(e,t+28)},fT=function(e,t,n){var r=kt(e,t+28),i=kt(e,t+30),o=fl(e.subarray(t+46,t+46+r),!(kt(e,t+8)&2048)),s=t+46+r,a=dT(e,s,i,n,mt(e,t+20),mt(e,t+24),mt(e,t+42)),l=a[0],u=a[1],c=a[2];return[kt(e,t+10),l,u,o,s+i+kt(e,t+32),c]},dT=function(e,t,n,r,i,o,s){var a=i==4294967295,l=o==4294967295,u=s==4294967295,c=t+n,f=a+l+u;if(r&&f){for(;t+4<c;t+=4+kt(e,t+2))if(kt(e,t)==1)return[a?nl(e,t+4+8*l):i,l?nl(e,t+4):o,u?nl(e,t+4+8*(l+a)):s,1];r<2&&We(13)}return[i,o,s,0]},ll=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&We(9),t+=r+4}return t},wd=function(e,t,n,r,i,o,s,a){var l=r.length,u=n.extra,c=a&&a.length,f=ll(u);He(e,t,s!=null?33639248:67324752),t+=4,s!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(o<0&&8),e[t++]=i&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var g=new Date(n.mtime==null?Date.now():n.mtime),h=g.getFullYear()-1980;if((h<0||h>119)&&We(10),He(e,t,h<<25|g.getMonth()+1<<21|g.getDate()<<16|g.getHours()<<11|g.getMinutes()<<5|g.getSeconds()>>1),t+=4,o!=-1&&(He(e,t,n.crc),He(e,t+4,o<0?-o-2:o),He(e,t+8,n.size)),He(e,t+12,l),He(e,t+14,f),t+=16,s!=null&&(He(e,t,c),He(e,t+6,n.attrs),He(e,t+10,s),t+=14),e.set(r,t),t+=l,f)for(var d in u){var I=u[d],T=I.length;He(e,t,+d),He(e,t+2,T),e.set(I,t+4),t+=4+T}return c&&(e.set(a,t),t+=c),t},pT=function(e,t,n,r,i){He(e,t,101010256),He(e,t+8,n),He(e,t+10,n),He(e,t+12,r),He(e,t+16,i)};function sr(e,t){t||(t={});var n={},r=[];Ud(e,"",n,t);var i=0,o=0;for(var s in n){var a=n[s],l=a[0],u=a[1],c=u.level==0?0:8,f=Ao(s),g=f.length,h=u.comment,d=h&&Ao(h),I=d&&d.length,T=ll(u.extra);g>65535&&We(11);var E=c?Qr(l,u):l,S=E.length,N=sT();N.p(l),r.push(Bd(u,{size:l.length,crc:N.d(),c:E,f,m:d,u:g!=s.length||d&&h.length!=I,o:i,compression:c})),i+=30+g+T+S,o+=76+2*(g+T)+(I||0)+S}for(var A=new Me(o+22),_=i,C=o-i,M=0;M<r.length;++M){var f=r[M];wd(A,f.o,f,f.f,f.u,f.c.length);var z=30+f.f.length+ll(f.extra);A.set(f.c,f.o+z),wd(A,i,f,f.f,f.u,f.c.length,f.o,f.m),i+=16+z+(f.m?f.m.length:0)}return pT(A,i,r.length,C,_),A}function ar(e,t){for(var n={},r=e.length-22;mt(e,r)!=101010256;--r)(!r||e.length-r>65558)&&We(13);var i=kt(e,r+8);if(!i)return{};var o=mt(e,r+16),s=mt(e,r-20)==117853008;if(s){var a=mt(e,r-12);s=mt(e,a)==101075792,s&&(i=mt(e,a+32),o=mt(e,a+48))}for(var l=t&&t.filter,u=0;u<i;++u){var c=fT(e,o,s),f=c[0],g=c[1],h=c[2],d=c[3],I=c[4],T=c[5],E=cT(e,T);o=I,(!l||l({name:d,size:g,originalSize:h,compression:f}))&&(f?f==8?n[d]=or(e.subarray(E,E+g),{out:new Me(h)}):We(14,"unknown compression type "+f):n[d]=Jr(e,E,E+g))}return n}var fa=Kr(ri(),1);var kT=(e,t)=>{if(typeof e=="number"){if(t===3)return{mode:"rgb",r:(e>>8&15|e>>4&240)/255,g:(e>>4&15|e&240)/255,b:(e&15|e<<4&240)/255};if(t===4)return{mode:"rgb",r:(e>>12&15|e>>8&240)/255,g:(e>>8&15|e>>4&240)/255,b:(e>>4&15|e&240)/255,alpha:(e&15|e<<4&240)/255};if(t===6)return{mode:"rgb",r:(e>>16&255)/255,g:(e>>8&255)/255,b:(e&255)/255};if(t===8)return{mode:"rgb",r:(e>>24&255)/255,g:(e>>16&255)/255,b:(e>>8&255)/255,alpha:(e&255)/255}}},Ro=kT;var _T={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},np=_T;var LT=e=>Ro(np[e.toLowerCase()],6),rp=LT;var VT=/^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i,FT=e=>{let t;return(t=e.match(VT))?Ro(parseInt(t[1],16),t[1].length):void 0},ip=FT;var Ze="([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)",r2=`(?:${Ze}|none)`,Dn=`${Ze}%`,i2=`(?:${Ze}%|none)`,ii=`(?:${Ze}%|${Ze})`,GT=`(?:${Ze}%|${Ze}|none)`,op=`(?:${Ze}(deg|grad|rad|turn)|${Ze})`,o2=`(?:${Ze}(deg|grad|rad|turn)|${Ze}|none)`,pn="\\s*,\\s*";var s2=new RegExp("^"+GT+"$");var BT=new RegExp(`^rgba?\\(\\s*${Ze}${pn}${Ze}${pn}${Ze}\\s*(?:,\\s*${ii}\\s*)?\\)$`),UT=new RegExp(`^rgba?\\(\\s*${Dn}${pn}${Dn}${pn}${Dn}\\s*(?:,\\s*${ii}\\s*)?\\)$`),zT=e=>{let t={mode:"rgb"},n;if(n=e.match(BT))n[1]!==void 0&&(t.r=n[1]/255),n[2]!==void 0&&(t.g=n[2]/255),n[3]!==void 0&&(t.b=n[3]/255);else if(n=e.match(UT))n[1]!==void 0&&(t.r=n[1]/100),n[2]!==void 0&&(t.g=n[2]/100),n[3]!==void 0&&(t.b=n[3]/100);else return;return n[4]!==void 0?t.alpha=Math.max(0,Math.min(1,n[4]/100)):n[5]!==void 0&&(t.alpha=Math.max(0,Math.min(1,+n[5]))),t},sp=zT;var HT=(e,t)=>e===void 0?void 0:typeof e!="object"?ml(e):e.mode!==void 0?e:t?{...e,mode:t}:void 0,ur=HT;var WT=(e="rgb")=>t=>(t=ur(t,e))!==void 0?t.mode===e?t:Nt[t.mode][e]?Nt[t.mode][e](t):e==="rgb"?Nt[t.mode].rgb(t):Nt.rgb[e](Nt[t.mode].rgb(t)):void 0,Ge=WT;var Nt={},ap={},oi=[],hl={},$T=e=>e,Ie=e=>(Nt[e.mode]={...Nt[e.mode],...e.toMode},Object.keys(e.fromMode||{}).forEach(t=>{Nt[t]||(Nt[t]={}),Nt[t][e.mode]=e.fromMode[t]}),e.ranges||(e.ranges={}),e.difference||(e.difference={}),e.channels.forEach(t=>{if(e.ranges[t]===void 0&&(e.ranges[t]=[0,1]),!e.interpolate[t])throw new Error(`Missing interpolator for: ${t}`);typeof e.interpolate[t]=="function"&&(e.interpolate[t]={use:e.interpolate[t]}),e.interpolate[t].fixup||(e.interpolate[t].fixup=$T)}),ap[e.mode]=e,(e.parse||[]).forEach(t=>{jT(t,e.mode)}),Ge(e.mode)),Yt=e=>ap[e],jT=(e,t)=>{if(typeof e=="string"){if(!t)throw new Error("'mode' required when 'parser' is a string");hl[e]=t}else typeof e=="function"&&oi.indexOf(e)<0&&oi.push(e)};var gl=/[^\x00-\x7F]|[a-zA-Z_]/,XT=/[^\x00-\x7F]|[-\w]/,W={Function:"function",Ident:"ident",Number:"number",Percentage:"percentage",ParenClose:")",None:"none",Hue:"hue",Alpha:"alpha"},ue=0;function Do(e){let t=e[ue],n=e[ue+1];return t==="-"||t==="+"?/\d/.test(n)||n==="."&&/\d/.test(e[ue+2]):t==="."?/\d/.test(n):/\d/.test(t)}function yl(e){if(ue>=e.length)return!1;let t=e[ue];if(gl.test(t))return!0;if(t==="-"){if(e.length-ue<2)return!1;let n=e[ue+1];return!!(n==="-"||gl.test(n))}return!1}var KT={deg:1,rad:180/Math.PI,grad:9/10,turn:360};function si(e){let t="";if((e[ue]==="-"||e[ue]==="+")&&(t+=e[ue++]),t+=Mo(e),e[ue]==="."&&/\d/.test(e[ue+1])&&(t+=e[ue++]+Mo(e)),(e[ue]==="e"||e[ue]==="E")&&((e[ue+1]==="-"||e[ue+1]==="+")&&/\d/.test(e[ue+2])?t+=e[ue++]+e[ue++]+Mo(e):/\d/.test(e[ue+1])&&(t+=e[ue++]+Mo(e))),yl(e)){let n=Po(e);return n==="deg"||n==="rad"||n==="turn"||n==="grad"?{type:W.Hue,value:t*KT[n]}:void 0}return e[ue]==="%"?(ue++,{type:W.Percentage,value:+t}):{type:W.Number,value:+t}}function Mo(e){let t="";for(;/\d/.test(e[ue]);)t+=e[ue++];return t}function Po(e){let t="";for(;ue<e.length&&XT.test(e[ue]);)t+=e[ue++];return t}function YT(e){let t=Po(e);return e[ue]==="("?(ue++,{type:W.Function,value:t}):t==="none"?{type:W.None,value:void 0}:{type:W.Ident,value:t}}function qT(e=""){let t=e.trim(),n=[],r;for(ue=0;ue<t.length;){if(r=t[ue++],r===`
`||r==="	"||r===" "){for(;ue<t.length&&(t[ue]===`
`||t[ue]==="	"||t[ue]===" ");)ue++;continue}if(r===",")return;if(r===")"){n.push({type:W.ParenClose});continue}if(r==="+"){if(ue--,Do(t)){n.push(si(t));continue}return}if(r==="-"){if(ue--,Do(t)){n.push(si(t));continue}if(yl(t)){n.push({type:W.Ident,value:Po(t)});continue}return}if(r==="."){if(ue--,Do(t)){n.push(si(t));continue}return}if(r==="/"){for(;ue<t.length&&(t[ue]===`
`||t[ue]==="	"||t[ue]===" ");)ue++;let i;if(Do(t)&&(i=si(t),i.type!==W.Hue)){n.push({type:W.Alpha,value:i});continue}if(yl(t)&&Po(t)==="none"){n.push({type:W.Alpha,value:{type:W.None,value:void 0}});continue}return}if(/\d/.test(r)){ue--,n.push(si(t));continue}if(gl.test(r)){ue--,n.push(YT(t));continue}return}return n}function ZT(e){e._i=0;let t=e[e._i++];if(!t||t.type!==W.Function||t.value!=="color"||(t=e[e._i++],t.type!==W.Ident))return;let n=hl[t.value];if(!n)return;let r={mode:n},i=lp(e,!1);if(!i)return;let o=Yt(n).channels;for(let s=0,a,l;s<o.length;s++)a=i[s],l=o[s],a.type!==W.None&&(r[l]=a.type===W.Number?a.value:a.value/100,l==="alpha"&&(r[l]=Math.max(0,Math.min(1,r[l]))));return r}function lp(e,t){let n=[],r;for(;e._i<e.length;){if(r=e[e._i++],r.type===W.None||r.type===W.Number||r.type===W.Alpha||r.type===W.Percentage||t&&r.type===W.Hue){n.push(r);continue}if(r.type===W.ParenClose){if(e._i<e.length)return;continue}return}if(!(n.length<3||n.length>4)){if(n.length===4){if(n[3].type!==W.Alpha)return;n[3]=n[3].value}return n.length===3&&n.push({type:W.None,value:void 0}),n.every(i=>i.type!==W.Alpha)?n:void 0}}function JT(e,t){e._i=0;let n=e[e._i++];if(!n||n.type!==W.Function)return;let r=lp(e,t);if(r)return r.unshift(n.value),r}var QT=e=>{if(typeof e!="string")return;let t=qT(e),n=t?JT(t,!0):void 0,r,i=0,o=oi.length;for(;i<o;)if((r=oi[i++](e,n))!==void 0)return r;return t?ZT(t):void 0},ml=QT;function eS(e,t){if(!t||t[0]!=="rgb"&&t[0]!=="rgba")return;let n={mode:"rgb"},[,r,i,o,s]=t;if(!(r.type===W.Hue||i.type===W.Hue||o.type===W.Hue))return r.type!==W.None&&(n.r=r.type===W.Number?r.value/255:r.value/100),i.type!==W.None&&(n.g=i.type===W.Number?i.value/255:i.value/100),o.type!==W.None&&(n.b=o.type===W.Number?o.value/255:o.value/100),s.type!==W.None&&(n.alpha=Math.min(1,Math.max(0,s.type===W.Number?s.value:s.value/100))),n}var up=eS;var tS=e=>e==="transparent"?{mode:"rgb",r:0,g:0,b:0,alpha:0}:void 0,cp=tS;var fp=(e,t,n)=>e+n*(t-e);var nS=e=>{let t=[];for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1];r===void 0&&i===void 0?t.push(void 0):r!==void 0&&i!==void 0?t.push([r,i]):t.push(r!==void 0?[r,r]:[i,i])}return t},dp=e=>t=>{let n=nS(t);return r=>{let i=r*n.length,o=r>=1?n.length-1:Math.max(Math.floor(i),0),s=n[o];return s===void 0?void 0:e(s[0],s[1],i-o)}};var K=dp(fp);var fe=e=>{let t=!1,n=e.map(r=>r!==void 0?(t=!0,r):1);return t?n:e};var rS={mode:"rgb",channels:["r","g","b","alpha"],parse:[up,ip,sp,rp,cp,"srgb"],serialize:"srgb",interpolate:{r:K,g:K,b:K,alpha:{use:K,fixup:fe}},gamut:!0,white:{r:1,g:1,b:1},black:{r:0,g:0,b:0}},ht=rS;var vl=(e=0)=>Math.pow(Math.abs(e),2.19921875)*Math.sign(e),iS=e=>{let t=vl(e.r),n=vl(e.g),r=vl(e.b),i={mode:"xyz65",x:.5766690429101305*t+.1855582379065463*n+.1882286462349947*r,y:.297344975250536*t+.6273635662554661*n+.0752914584939979*r,z:.0270313613864123*t+.0706888525358272*n+.9913375368376386*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},Il=iS;var Tl=e=>Math.pow(Math.abs(e),.4547069271758437)*Math.sign(e),oS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"a98",r:Tl(e*2.0415879038107465-t*.5650069742788597-.3447313507783297*n),g:Tl(e*-.9692436362808798+t*1.8759675015077206+.0415550574071756*n),b:Tl(e*.0134442806320312-t*.1183623922310184+1.0151749943912058*n)};return r!==void 0&&(i.alpha=r),i},Sl=oS;var bl=(e=0)=>{let t=Math.abs(e);return t<=.04045?e/12.92:(Math.sign(e)||1)*Math.pow((t+.055)/1.055,2.4)},sS=({r:e,g:t,b:n,alpha:r})=>{let i={mode:"lrgb",r:bl(e),g:bl(t),b:bl(n)};return r!==void 0&&(i.alpha=r),i},gt=sS;var aS=e=>{let{r:t,g:n,b:r,alpha:i}=gt(e),o={mode:"xyz65",x:.4123907992659593*t+.357584339383878*n+.1804807884018343*r,y:.2126390058715102*t+.715168678767756*n+.0721923153607337*r,z:.0193308187155918*t+.119194779794626*n+.9505321522496607*r};return i!==void 0&&(o.alpha=i),o},nt=aS;var El=(e=0)=>{let t=Math.abs(e);return t>.0031308?(Math.sign(e)||1)*(1.055*Math.pow(t,.4166666666666667)-.055):e*12.92},lS=({r:e,g:t,b:n,alpha:r},i="rgb")=>{let o={mode:i,r:El(e),g:El(t),b:El(n)};return r!==void 0&&(o.alpha=r),o},yt=lS;var uS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=yt({r:e*3.2409699419045226-t*1.537383177570094-.4986107602930034*n,g:e*-.9692436362808796+t*1.8759675015077204+.0415550574071756*n,b:e*.0556300796969936-t*.2039769588889765+1.0569715142428784*n});return r!==void 0&&(i.alpha=r),i},rt=uS;var cS={...ht,mode:"a98",parse:["a98-rgb"],serialize:"a98-rgb",fromMode:{rgb:e=>Sl(nt(e)),xyz65:Sl},toMode:{rgb:e=>rt(Il(e)),xyz65:Il}},pp=cS;var fS=e=>(e=e%360)<0?e+360:e,Te=fS;var dS=(e,t)=>e.map((n,r,i)=>{if(n===void 0)return n;let o=Te(n);return r===0||e[r-1]===void 0?o:t(o-Te(i[r-1]))}).reduce((n,r)=>!n.length||r===void 0||n[n.length-1]===void 0?(n.push(r),n):(n.push(r+n[n.length-1]),n),[]),Be=e=>dS(e,t=>Math.abs(t)<=180?t:t-360*Math.sign(t));var Le=[-.14861,1.78277,-.29227,-.90649,1.97294,0],mp=Math.PI/180,hp=180/Math.PI;var gp=Le[3]*Le[4],yp=Le[1]*Le[4],vp=Le[1]*Le[2]-Le[0]*Le[3],pS=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(vp*n+e*gp-t*yp)/(vp+gp-yp),o=n-i,s=(Le[4]*(t-i)-Le[2]*o)/Le[3],a={mode:"cubehelix",l:i,s:i===0||i===1?void 0:Math.sqrt(o*o+s*s)/(Le[4]*i*(1-i))};return a.s&&(a.h=Math.atan2(s,o)*hp-120),r!==void 0&&(a.alpha=r),a},Ip=pS;var mS=({h:e,s:t,l:n,alpha:r})=>{let i={mode:"rgb"};e=(e===void 0?0:e+120)*mp,n===void 0&&(n=0);let o=t===void 0?0:t*n*(1-n),s=Math.cos(e),a=Math.sin(e);return i.r=n+o*(Le[0]*s+Le[1]*a),i.g=n+o*(Le[2]*s+Le[3]*a),i.b=n+o*(Le[4]*s+Le[5]*a),r!==void 0&&(i.alpha=r),i},Tp=mS;var qt=(e,t)=>{if(e.h===void 0||t.h===void 0||!e.s||!t.s)return 0;let n=Te(e.h),r=Te(t.h),i=Math.sin((r-n+360)/2*Math.PI/180);return 2*Math.sqrt(e.s*t.s)*i},Al=(e,t)=>{if(e.h===void 0||t.h===void 0)return 0;let n=Te(e.h),r=Te(t.h);return Math.abs(r-n)>180?n-(r-360*Math.sign(r-n)):r-n},Zt=(e,t)=>{if(e.h===void 0||t.h===void 0||!e.c||!t.c)return 0;let n=Te(e.h),r=Te(t.h),i=Math.sin((r-n+360)/2*Math.PI/180);return 2*Math.sqrt(e.c*t.c)*i},ai=(e="rgb",t=[1,1,1,0])=>{let n=Yt(e),r=n.channels,i=n.difference,o=Ge(e);return(s,a)=>{let l=o(s),u=o(a);return Math.sqrt(r.reduce((c,f,g)=>{let h=i[f]?i[f](l,u):l[f]-u[f];return c+(t[g]||0)*Math.pow(isNaN(h)?0:h,2)},0))}};var Ue=e=>{let t=e.reduce((r,i)=>{if(i!==void 0){let o=i*Math.PI/180;r.sin+=Math.sin(o),r.cos+=Math.cos(o)}return r},{sin:0,cos:0}),n=Math.atan2(t.sin,t.cos)*180/Math.PI;return n<0?360+n:n};var hS={mode:"cubehelix",channels:["h","s","l","alpha"],parse:["--cubehelix"],serialize:"--cubehelix",ranges:{h:[0,360],s:[0,4.614],l:[0,1]},fromMode:{rgb:Ip},toMode:{rgb:Tp},interpolate:{h:{use:K,fixup:Be},s:K,l:K,alpha:{use:K,fixup:fe}},difference:{h:qt},average:{h:Ue}},Sp=hS;var gS=({l:e,a:t,b:n,alpha:r},i="lch")=>{t===void 0&&(t=0),n===void 0&&(n=0);let o=Math.sqrt(t*t+n*n),s={mode:i,l:e,c:o};return o&&(s.h=Te(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(s.alpha=r),s},at=gS;var yS=({l:e,c:t,h:n,alpha:r},i="lab")=>{n===void 0&&(n=0);let o={mode:i,l:e,a:t?t*Math.cos(n/180*Math.PI):0,b:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(o.alpha=r),o},lt=yS;var wo=Math.pow(29,3)/Math.pow(3,3),ko=Math.pow(6,3)/Math.pow(29,3);var Ce={X:.9642956764295677,Y:1,Z:.8251046025104602},mn={X:.3127/.329,Y:1,Z:(1-.3127-.329)/.329},SM=Math.pow(29,3)/Math.pow(3,3),bM=Math.pow(6,3)/Math.pow(29,3);var xl=e=>Math.pow(e,3)>ko?Math.pow(e,3):(116*e-16)/wo,vS=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+16)/116,o=t/500+i,s=i-n/200,a={mode:"xyz65",x:xl(o)*mn.X,y:xl(i)*mn.Y,z:xl(s)*mn.Z};return r!==void 0&&(a.alpha=r),a},_o=vS;var IS=e=>rt(_o(e)),hn=IS;var Nl=e=>e>ko?Math.cbrt(e):(wo*e+16)/116,TS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Nl(e/mn.X),o=Nl(t/mn.Y),s=Nl(n/mn.Z),a={mode:"lab65",l:116*o-16,a:500*(i-o),b:200*(o-s)};return r!==void 0&&(a.alpha=r),a},Lo=TS;var SS=e=>{let t=Lo(nt(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},gn=SS;var Mn=.14444444444444443*Math.PI,cr=Math.cos(Mn),fr=Math.sin(Mn),Vo=100/Math.log(139/100);var bS=({l:e,c:t,h:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"lab65",l:(Math.exp(e*1/Vo)-1)/.0039},o=(Math.exp(.0435*t*1*1)-1)/.075,s=o*Math.cos(n/180*Math.PI-Mn),a=o*Math.sin(n/180*Math.PI-Mn);return i.a=s*cr-a/.83*fr,i.b=s*fr+a/.83*cr,r!==void 0&&(i.alpha=r),i},ui=bS;var ES=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=t*cr+n*fr,o=.83*(n*cr-t*fr),s=Math.sqrt(i*i+o*o),a={mode:"dlch",l:Vo/1*Math.log(1+.0039*e),c:Math.log(1+.075*s)/(.0435*1*1)};return a.c&&(a.h=Te((Math.atan2(o,i)+Mn)/Math.PI*180)),r!==void 0&&(a.alpha=r),a},ci=ES;var bp=e=>ui(at(e,"dlch")),Ep=e=>lt(ci(e),"dlab"),AS={mode:"dlab",parse:["--din99o-lab"],serialize:"--din99o-lab",toMode:{lab65:bp,rgb:e=>hn(bp(e))},fromMode:{lab65:Ep,rgb:e=>Ep(gn(e))},channels:["l","a","b","alpha"],ranges:{l:[0,100],a:[-40.09,45.501],b:[-40.469,44.344]},interpolate:{l:K,a:K,b:K,alpha:{use:K,fixup:fe}}},Ap=AS;var xS={mode:"dlch",parse:["--din99o-lch"],serialize:"--din99o-lch",toMode:{lab65:ui,dlab:e=>lt(e,"dlab"),rgb:e=>hn(ui(e))},fromMode:{lab65:ci,dlab:e=>at(e,"dlch"),rgb:e=>ci(gn(e))},channels:["l","c","h","alpha"],ranges:{l:[0,100],c:[0,51.484],h:[0,360]},interpolate:{l:K,c:K,h:{use:K,fixup:Be},alpha:{use:K,fixup:fe}},difference:{h:Zt},average:{h:Ue}},xp=xS;function Ol({h:e,s:t,i:n,alpha:r}){e=Te(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o={r:n*(1+t*(3/(2-i)-1)),g:n*(1+t*(3*(1-i)/(2-i)-1)),b:n*(1-t)};break;case 1:o={r:n*(1+t*(3*(1-i)/(2-i)-1)),g:n*(1+t*(3/(2-i)-1)),b:n*(1-t)};break;case 2:o={r:n*(1-t),g:n*(1+t*(3/(2-i)-1)),b:n*(1+t*(3*(1-i)/(2-i)-1))};break;case 3:o={r:n*(1-t),g:n*(1+t*(3*(1-i)/(2-i)-1)),b:n*(1+t*(3/(2-i)-1))};break;case 4:o={r:n*(1+t*(3*(1-i)/(2-i)-1)),g:n*(1-t),b:n*(1+t*(3/(2-i)-1))};break;case 5:o={r:n*(1+t*(3/(2-i)-1)),g:n*(1-t),b:n*(1+t*(3*(1-i)/(2-i)-1))};break;default:o={r:n*(1-t),g:n*(1-t),b:n*(1-t)}}return o.mode="rgb",r!==void 0&&(o.alpha=r),o}function Rl({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsi",s:e+t+n===0?0:1-3*o/(e+t+n),i:(e+t+n)/3};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var NS={mode:"hsi",toMode:{rgb:Ol},parse:["--hsi"],serialize:"--hsi",fromMode:{rgb:Rl},channels:["h","s","i","alpha"],ranges:{h:[0,360]},gamut:"rgb",interpolate:{h:{use:K,fixup:Be},s:K,i:K,alpha:{use:K,fixup:fe}},difference:{h:qt},average:{h:Ue}},Np=NS;function Dl({h:e,s:t,l:n,alpha:r}){e=Te(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=n+t*(n<.5?n:1-n),o=i-(i-n)*2*Math.abs(e/60%2-1),s;switch(Math.floor(e/60)){case 0:s={r:i,g:o,b:2*n-i};break;case 1:s={r:o,g:i,b:2*n-i};break;case 2:s={r:2*n-i,g:i,b:o};break;case 3:s={r:2*n-i,g:o,b:i};break;case 4:s={r:o,g:2*n-i,b:i};break;case 5:s={r:i,g:2*n-i,b:o};break;default:s={r:2*n-i,g:2*n-i,b:2*n-i}}return s.mode="rgb",r!==void 0&&(s.alpha=r),s}function Ml({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsl",s:i===o?0:(i-o)/(1-Math.abs(i+o-1)),l:.5*(i+o)};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var CS=(e,t)=>{switch(t){case"deg":return+e;case"rad":return e/Math.PI*180;case"grad":return e/10*9;case"turn":return e*360}},Cp=CS;var OS=new RegExp(`^hsla?\\(\\s*${op}${pn}${Dn}${pn}${Dn}\\s*(?:,\\s*${ii}\\s*)?\\)$`),RS=e=>{let t=e.match(OS);if(!t)return;let n={mode:"hsl"};return t[3]!==void 0?n.h=+t[3]:t[1]!==void 0&&t[2]!==void 0&&(n.h=Cp(t[1],t[2])),t[4]!==void 0&&(n.s=Math.min(Math.max(0,t[4]/100),1)),t[5]!==void 0&&(n.l=Math.min(Math.max(0,t[5]/100),1)),t[6]!==void 0?n.alpha=Math.max(0,Math.min(1,t[6]/100)):t[7]!==void 0&&(n.alpha=Math.max(0,Math.min(1,+t[7]))),n},Op=RS;function DS(e,t){if(!t||t[0]!=="hsl"&&t[0]!=="hsla")return;let n={mode:"hsl"},[,r,i,o,s]=t;if(r.type!==W.None){if(r.type===W.Percentage)return;n.h=r.value}if(i.type!==W.None){if(i.type===W.Hue)return;n.s=i.value/100}if(o.type!==W.None){if(o.type===W.Hue)return;n.l=o.value/100}return s.type!==W.None&&(n.alpha=Math.min(1,Math.max(0,s.type===W.Number?s.value:s.value/100))),n}var Rp=DS;var MS={mode:"hsl",toMode:{rgb:Dl},fromMode:{rgb:Ml},channels:["h","s","l","alpha"],ranges:{h:[0,360]},gamut:"rgb",parse:[Rp,Op],serialize:e=>`hsl(${e.h!==void 0?e.h:"none"} ${e.s!==void 0?e.s*100+"%":"none"} ${e.l!==void 0?e.l*100+"%":"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:K,fixup:Be},s:K,l:K,alpha:{use:K,fixup:fe}},difference:{h:qt},average:{h:Ue}},Fo=MS;function fi({h:e,s:t,v:n,alpha:r}){e=Te(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o={r:n,g:n*(1-t*i),b:n*(1-t)};break;case 1:o={r:n*(1-t*i),g:n,b:n*(1-t)};break;case 2:o={r:n*(1-t),g:n,b:n*(1-t*i)};break;case 3:o={r:n*(1-t),g:n*(1-t*i),b:n};break;case 4:o={r:n*(1-t*i),g:n*(1-t),b:n};break;case 5:o={r:n,g:n*(1-t),b:n*(1-t*i)};break;default:o={r:n*(1-t),g:n*(1-t),b:n*(1-t)}}return o.mode="rgb",r!==void 0&&(o.alpha=r),o}function di({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsv",s:i===0?0:1-o/i,v:i};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var PS={mode:"hsv",toMode:{rgb:fi},parse:["--hsv"],serialize:"--hsv",fromMode:{rgb:di},channels:["h","s","v","alpha"],ranges:{h:[0,360]},gamut:"rgb",interpolate:{h:{use:K,fixup:Be},s:K,v:K,alpha:{use:K,fixup:fe}},difference:{h:qt},average:{h:Ue}},Go=PS;function Pl({h:e,w:t,b:n,alpha:r}){if(t===void 0&&(t=0),n===void 0&&(n=0),t+n>1){let i=t+n;t/=i,n/=i}return fi({h:e,s:n===1?1:1-t/(1-n),v:1-n,alpha:r})}function wl(e){let t=di(e);if(t===void 0)return;let n=t.s!==void 0?t.s:0,r=t.v!==void 0?t.v:0,i={mode:"hwb",w:(1-n)*r,b:1-r};return t.h!==void 0&&(i.h=t.h),t.alpha!==void 0&&(i.alpha=t.alpha),i}function wS(e,t){if(!t||t[0]!=="hwb")return;let n={mode:"hwb"},[,r,i,o,s]=t;if(r.type!==W.None){if(r.type===W.Percentage)return;n.h=r.value}if(i.type!==W.None){if(i.type===W.Hue)return;n.w=i.value/100}if(o.type!==W.None){if(o.type===W.Hue)return;n.b=o.value/100}return s.type!==W.None&&(n.alpha=Math.min(1,Math.max(0,s.type===W.Number?s.value:s.value/100))),n}var Dp=wS;var kS={mode:"hwb",toMode:{rgb:Pl},fromMode:{rgb:wl},channels:["h","w","b","alpha"],ranges:{h:[0,360]},gamut:"rgb",parse:[Dp],serialize:e=>`hwb(${e.h!==void 0?e.h:"none"} ${e.w!==void 0?e.w*100+"%":"none"} ${e.b!==void 0?e.b*100+"%":"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:K,fixup:Be},w:K,b:K,alpha:{use:K,fixup:fe}},difference:{h:Al},average:{h:Ue}},Mp=kS;var dr=.1593017578125,Pp=78.84375,pr=.8359375,mr=18.8515625,hr=18.6875;function Bo(e){if(e<0)return 0;let t=Math.pow(e,1/Pp);return 1e4*Math.pow(Math.max(0,t-pr)/(mr-hr*t),1/dr)}function Uo(e){if(e<0)return 0;let t=Math.pow(e/1e4,dr);return Math.pow((pr+mr*t)/(1+hr*t),Pp)}var kl=e=>Math.max(e/203,0),LS=({i:e,t,p:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Bo(e+.008609037037932761*t+.11102962500302593*n),o=Bo(e-.00860903703793275*t-.11102962500302599*n),s=Bo(e+.5600313357106791*t-.32062717498731885*n),a={mode:"xyz65",x:kl(2.070152218389422*i-1.3263473389671556*o+.2066510476294051*s),y:kl(.3647385209748074*i+.680566024947227*o-.0453045459220346*s),z:kl(-.049747207535812*i-.0492609666966138*o+1.1880659249923042*s)};return r!==void 0&&(a.alpha=r),a},_l=LS;var Ll=(e=0)=>Math.max(e*203,0),VS=({x:e,y:t,z:n,alpha:r})=>{let i=Ll(e),o=Ll(t),s=Ll(n),a=Uo(.3592832590121217*i+.6976051147779502*o-.0358915932320289*s),l=Uo(-.1920808463704995*i+1.1004767970374323*o+.0753748658519118*s),u=Uo(.0070797844607477*i+.0748396662186366*o+.8433265453898765*s),c=.5*a+.5*l,f=1.61376953125*a-3.323486328125*l+1.709716796875*u,g=4.378173828125*a-4.24560546875*l-.132568359375*u,h={mode:"itp",i:c,t:f,p:g};return r!==void 0&&(h.alpha=r),h},Vl=VS;var FS={mode:"itp",channels:["i","t","p","alpha"],parse:["--ictcp"],serialize:"--ictcp",toMode:{xyz65:_l,rgb:e=>rt(_l(e))},fromMode:{xyz65:Vl,rgb:e=>Vl(nt(e))},ranges:{i:[0,.581],t:[-.369,.272],p:[-.164,.331]},interpolate:{i:K,t:K,p:K,alpha:{use:K,fixup:fe}}},wp=FS;var GS=134.03437499999998,BS=16295499532821565e-27,Fl=e=>{if(e<0)return 0;let t=Math.pow(e/1e4,dr);return Math.pow((pr+mr*t)/(1+hr*t),GS)},Gl=(e=0)=>Math.max(e*203,0),US=({x:e,y:t,z:n,alpha:r})=>{e=Gl(e),t=Gl(t),n=Gl(n);let i=1.15*e-.15*n,o=.66*t+.34*e,s=Fl(.41478972*i+.579999*o+.014648*n),a=Fl(-.20151*i+1.120649*o+.0531008*n),l=Fl(-.0166008*i+.2648*o+.6684799*n),u=(s+a)/2,c={mode:"jab",j:.44*u/(1-.56*u)-BS,a:3.524*s-4.066708*a+.542708*l,b:.199076*s+1.096799*a-1.295875*l};return r!==void 0&&(c.alpha=r),c},zo=US;var zS=134.03437499999998,kp=16295499532821565e-27,Bl=e=>{if(e<0)return 0;let t=Math.pow(e,1/zS);return 1e4*Math.pow((pr-t)/(hr*t-mr),1/dr)},Ul=e=>e/203,HS=({j:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+kp)/(.44+.56*(e+kp)),o=Bl(i+.13860504*t+.058047316*n),s=Bl(i-.13860504*t-.058047316*n),a=Bl(i-.096019242*t-.8118919*n),l={mode:"xyz65",x:Ul(1.661373024652174*o-.914523081304348*s+.23136208173913045*a),y:Ul(-.3250758611844533*o+1.571847026732543*s-.21825383453227928*a),z:Ul(-.090982811*o-.31272829*s+1.5227666*a)};return r!==void 0&&(l.alpha=r),l},Ho=HS;var WS=e=>{let t=zo(nt(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},Wo=WS;var $S=e=>rt(Ho(e)),$o=$S;var jS={mode:"jab",channels:["j","a","b","alpha"],parse:["--jzazbz"],serialize:"--jzazbz",fromMode:{rgb:Wo,xyz65:zo},toMode:{rgb:$o,xyz65:Ho},ranges:{j:[0,.222],a:[-.109,.129],b:[-.185,.134]},interpolate:{j:K,a:K,b:K,alpha:{use:K,fixup:fe}}},_p=jS;var XS=({j:e,a:t,b:n,alpha:r})=>{t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.sqrt(t*t+n*n),o={mode:"jch",j:e,c:i};return i&&(o.h=Te(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(o.alpha=r),o},zl=XS;var KS=({j:e,c:t,h:n,alpha:r})=>{n===void 0&&(n=0);let i={mode:"jab",j:e,a:t?t*Math.cos(n/180*Math.PI):0,b:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(i.alpha=r),i},Hl=KS;var YS={mode:"jch",parse:["--jzczhz"],serialize:"--jzczhz",toMode:{jab:Hl,rgb:e=>$o(Hl(e))},fromMode:{rgb:e=>zl(Wo(e)),jab:zl},channels:["j","c","h","alpha"],ranges:{j:[0,.221],c:[0,.19],h:[0,360]},interpolate:{h:{use:K,fixup:Be},c:K,j:K,alpha:{use:K,fixup:fe}},difference:{h:Zt},average:{h:Ue}},Lp=YS;var yn=Math.pow(29,3)/Math.pow(3,3),gr=Math.pow(6,3)/Math.pow(29,3);var Wl=e=>Math.pow(e,3)>gr?Math.pow(e,3):(116*e-16)/yn,qS=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+16)/116,o=t/500+i,s=i-n/200,a={mode:"xyz50",x:Wl(o)*Ce.X,y:Wl(i)*Ce.Y,z:Wl(s)*Ce.Z};return r!==void 0&&(a.alpha=r),a},yr=qS;var ZS=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=yt({r:e*3.1341359569958707-t*1.6173863321612538-.4906619460083532*n,g:e*-.978795502912089+t*1.916254567259524+.03344273116131949*n,b:e*.07195537988411677-t*.2289768264158322+1.405386058324125*n});return r!==void 0&&(i.alpha=r),i},Lt=ZS;var JS=e=>Lt(yr(e)),jo=JS;var QS=e=>{let{r:t,g:n,b:r,alpha:i}=gt(e),o={mode:"xyz50",x:.436065742824811*t+.3851514688337912*n+.14307845442264197*r,y:.22249319175623702*t+.7168870538238823*n+.06061979053616537*r,z:.013923904500943465*t+.09708128566574634*n+.7140993584005155*r};return i!==void 0&&(o.alpha=i),o},Vt=QS;var $l=e=>e>gr?Math.cbrt(e):(yn*e+16)/116,e1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=$l(e/Ce.X),o=$l(t/Ce.Y),s=$l(n/Ce.Z),a={mode:"lab",l:116*o-16,a:500*(i-o),b:200*(o-s)};return r!==void 0&&(a.alpha=r),a},vr=e1;var t1=e=>{let t=vr(Vt(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},Xo=t1;function n1(e,t){if(!t||t[0]!=="lab")return;let n={mode:"lab"},[,r,i,o,s]=t;if(!(r.type===W.Hue||i.type===W.Hue||o.type===W.Hue))return r.type!==W.None&&(n.l=Math.min(Math.max(0,r.value),100)),i.type!==W.None&&(n.a=i.type===W.Number?i.value:i.value*125/100),o.type!==W.None&&(n.b=o.type===W.Number?o.value:o.value*125/100),s.type!==W.None&&(n.alpha=Math.min(1,Math.max(0,s.type===W.Number?s.value:s.value/100))),n}var Vp=n1;var r1={mode:"lab",toMode:{xyz50:yr,rgb:jo},fromMode:{xyz50:vr,rgb:Xo},channels:["l","a","b","alpha"],ranges:{l:[0,100],a:[-125,125],b:[-125,125]},parse:[Vp],serialize:e=>`lab(${e.l!==void 0?e.l:"none"} ${e.a!==void 0?e.a:"none"} ${e.b!==void 0?e.b:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{l:K,a:K,b:K,alpha:{use:K,fixup:fe}}},Ir=r1;var i1={...Ir,mode:"lab65",parse:["--lab-d65"],serialize:"--lab-d65",toMode:{xyz65:_o,rgb:hn},fromMode:{xyz65:Lo,rgb:gn},ranges:{l:[0,100],a:[-125,125],b:[-125,125]}},Fp=i1;function o1(e,t){if(!t||t[0]!=="lch")return;let n={mode:"lch"},[,r,i,o,s]=t;if(r.type!==W.None){if(r.type===W.Hue)return;n.l=Math.min(Math.max(0,r.value),100)}if(i.type!==W.None&&(n.c=Math.max(0,i.type===W.Number?i.value:i.value*150/100)),o.type!==W.None){if(o.type===W.Percentage)return;n.h=o.value}return s.type!==W.None&&(n.alpha=Math.min(1,Math.max(0,s.type===W.Number?s.value:s.value/100))),n}var Gp=o1;var s1={mode:"lch",toMode:{lab:lt,rgb:e=>jo(lt(e))},fromMode:{rgb:e=>at(Xo(e)),lab:at},channels:["l","c","h","alpha"],ranges:{l:[0,100],c:[0,150],h:[0,360]},parse:[Gp],serialize:e=>`lch(${e.l!==void 0?e.l:"none"} ${e.c!==void 0?e.c:"none"} ${e.h!==void 0?e.h:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:K,fixup:Be},c:K,l:K,alpha:{use:K,fixup:fe}},difference:{h:Zt},average:{h:Ue}},Tr=s1;var a1={...Tr,mode:"lch65",parse:["--lch-d65"],serialize:"--lch-d65",toMode:{lab65:e=>lt(e,"lab65"),rgb:e=>hn(lt(e,"lab65"))},fromMode:{rgb:e=>at(gn(e),"lch65"),lab65:e=>at(e,"lch65")},ranges:{l:[0,100],c:[0,150],h:[0,360]}},Bp=a1;var l1=({l:e,u:t,v:n,alpha:r})=>{t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.sqrt(t*t+n*n),o={mode:"lchuv",l:e,c:i};return i&&(o.h=Te(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(o.alpha=r),o},jl=l1;var u1=({l:e,c:t,h:n,alpha:r})=>{n===void 0&&(n=0);let i={mode:"luv",l:e,u:t?t*Math.cos(n/180*Math.PI):0,v:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(i.alpha=r),i},Xl=u1;var Up=(e,t,n)=>4*e/(e+15*t+3*n),zp=(e,t,n)=>9*t/(e+15*t+3*n),c1=Up(Ce.X,Ce.Y,Ce.Z),f1=zp(Ce.X,Ce.Y,Ce.Z),d1=e=>e<=gr?yn*e:116*Math.cbrt(e)-16,p1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=d1(t/Ce.Y),o=Up(e,t,n),s=zp(e,t,n);!isFinite(o)||!isFinite(s)?i=o=s=0:(o=13*i*(o-c1),s=13*i*(s-f1));let a={mode:"luv",l:i,u:o,v:s};return r!==void 0&&(a.alpha=r),a},pi=p1;var m1=(e,t,n)=>4*e/(e+15*t+3*n),h1=(e,t,n)=>9*t/(e+15*t+3*n),g1=m1(Ce.X,Ce.Y,Ce.Z),y1=h1(Ce.X,Ce.Y,Ce.Z),v1=({l:e,u:t,v:n,alpha:r})=>{if(e===void 0&&(e=0),e===0)return{mode:"xyz50",x:0,y:0,z:0};t===void 0&&(t=0),n===void 0&&(n=0);let i=t/(13*e)+g1,o=n/(13*e)+y1,s=Ce.Y*(e<=8?e/yn:Math.pow((e+16)/116,3)),a=s*(9*i)/(4*o),l=s*(12-3*i-20*o)/(4*o),u={mode:"xyz50",x:a,y:s,z:l};return r!==void 0&&(u.alpha=r),u},mi=v1;var I1=e=>jl(pi(Vt(e))),T1=e=>Lt(mi(Xl(e))),S1={mode:"lchuv",toMode:{luv:Xl,rgb:T1},fromMode:{rgb:I1,luv:jl},channels:["l","c","h","alpha"],parse:["--lchuv"],serialize:"--lchuv",ranges:{l:[0,100],c:[0,176.956],h:[0,360]},interpolate:{h:{use:K,fixup:Be},c:K,l:K,alpha:{use:K,fixup:fe}},difference:{h:Zt},average:{h:Ue}},Hp=S1;var b1={...ht,mode:"lrgb",toMode:{rgb:yt},fromMode:{rgb:gt},parse:["srgb-linear"],serialize:"srgb-linear"},Wp=b1;var E1={mode:"luv",toMode:{xyz50:mi,rgb:e=>Lt(mi(e))},fromMode:{xyz50:pi,rgb:e=>pi(Vt(e))},channels:["l","u","v","alpha"],parse:["--luv"],serialize:"--luv",ranges:{l:[0,100],u:[-84.936,175.042],v:[-125.882,87.243]},interpolate:{l:K,u:K,v:K,alpha:{use:K,fixup:fe}}},$p=E1;var A1=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.cbrt(.412221469470763*e+.5363325372617348*t+.0514459932675022*n),o=Math.cbrt(.2119034958178252*e+.6806995506452344*t+.1073969535369406*n),s=Math.cbrt(.0883024591900564*e+.2817188391361215*t+.6299787016738222*n),a={mode:"oklab",l:.210454268309314*i+.7936177747023054*o-.0040720430116193*s,a:1.9779985324311684*i-2.42859224204858*o+.450593709617411*s,b:.0259040424655478*i+.7827717124575296*o-.8086757549230774*s};return r!==void 0&&(a.alpha=r),a},Ko=A1;var x1=e=>{let t=Ko(gt(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},vn=x1;var N1=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.pow(e+.3963377773761749*t+.2158037573099136*n,3),o=Math.pow(e-.1055613458156586*t-.0638541728258133*n,3),s=Math.pow(e-.0894841775298119*t-1.2914855480194092*n,3),a={mode:"lrgb",r:4.076741636075957*i-3.3077115392580616*o+.2309699031821044*s,g:-1.2684379732850317*i+2.6097573492876887*o-.3413193760026573*s,b:-.0041960761386756*i-.7034186179359362*o+1.7076146940746117*s};return r!==void 0&&(a.alpha=r),a},Ft=N1;var C1=e=>yt(Ft(e)),In=C1;function hi(e){let r=1.170873786407767;return .5*(r*e-.206+Math.sqrt((r*e-.206)*(r*e-.206)+4*.03*r*e))}function Pn(e){return(e*e+.206*e)/(1.170873786407767*(e+.03))}function O1(e,t){let n,r,i,o,s,a,l,u;-1.88170328*e-.80936493*t>1?(n=1.19086277,r=1.76576728,i=.59662641,o=.75515197,s=.56771245,a=4.0767416621,l=-3.3077115913,u=.2309699292):1.81444104*e-1.19445276*t>1?(n=.73956515,r=-.45954404,i=.08285427,o=.1254107,s=.14503204,a=-1.2684380046,l=2.6097574011,u=-.3413193965):(n=1.35733652,r=-.00915799,i=-1.1513021,o=-.50559606,s=.00692167,a=-.0041960863,l=-.7034186147,u=1.707614701);let c=n+r*e+i*t+o*e*e+s*e*t,f=.3963377774*e+.2158037573*t,g=-.1055613458*e-.0638541728*t,h=-.0894841775*e-1.291485548*t;{let d=1+c*f,I=1+c*g,T=1+c*h,E=d*d*d,S=I*I*I,N=T*T*T,A=3*f*d*d,_=3*g*I*I,C=3*h*T*T,M=6*f*f*d,z=6*g*g*I,w=6*h*h*T,ee=a*E+l*S+u*N,ie=a*A+l*_+u*C,Z=a*M+l*z+u*w;c=c-ee*ie/(ie*ie-.5*ee*Z)}return c}function Kl(e,t){let n=O1(e,t),r=Ft({l:1,a:n*e,b:n*t}),i=Math.cbrt(1/Math.max(r.r,r.g,r.b)),o=i*n;return[i,o]}function R1(e,t,n,r,i,o=null){o||(o=Kl(e,t));let s;if((n-i)*o[1]-(o[0]-i)*r<=0)s=o[1]*i/(r*o[0]+o[1]*(i-n));else{s=o[1]*(i-1)/(r*(o[0]-1)+o[1]*(i-n));{let a=n-i,l=r,u=.3963377774*e+.2158037573*t,c=-.1055613458*e-.0638541728*t,f=-.0894841775*e-1.291485548*t,g=a+l*u,h=a+l*c,d=a+l*f;{let I=i*(1-s)+s*n,T=s*r,E=I+T*u,S=I+T*c,N=I+T*f,A=E*E*E,_=S*S*S,C=N*N*N,M=3*g*E*E,z=3*h*S*S,w=3*d*N*N,ee=6*g*g*E,ie=6*h*h*S,Z=6*d*d*N,R=4.0767416621*A-3.3077115913*_+.2309699292*C-1,U=4.0767416621*M-3.3077115913*z+.2309699292*w,y=4.0767416621*ee-3.3077115913*ie+.2309699292*Z,O=U/(U*U-.5*R*y),k=-R*O,P=-1.2684380046*A+2.6097574011*_-.3413193965*C-1,F=-1.2684380046*M+2.6097574011*z-.3413193965*w,L=-1.2684380046*ee+2.6097574011*ie-.3413193965*Z,G=F/(F*F-.5*P*L),te=-P*G,j=-.0041960863*A-.7034186147*_+1.707614701*C-1,J=-.0041960863*M-.7034186147*z+1.707614701*w,B=-.0041960863*ee-.7034186147*ie+1.707614701*Z,ne=J/(J*J-.5*j*B),H=-j*ne;k=O>=0?k:1e6,te=G>=0?te:1e6,H=ne>=0?H:1e6,s+=Math.min(k,Math.min(te,H))}}}return s}function gi(e,t,n=null){n||(n=Kl(e,t));let r=n[0],i=n[1];return[i/r,i/(1-r)]}function Yo(e,t,n){let r=Kl(t,n),i=R1(t,n,e,1,e,r),o=gi(t,n,r),s=.11516993+1/(7.4477897+4.1590124*n+t*(-2.19557347+1.75198401*n+t*(-2.13704948-10.02301043*n+t*(-4.24894561+5.38770819*n+4.69891013*t)))),a=.11239642+1/(1.6132032-.68124379*n+t*(.40370612+.90148123*n+t*(-.27087943+.6122399*n+t*(.00299215-.45399568*n-.14661872*t)))),l=i/Math.min(e*o[0],(1-e)*o[1]),u=e*s,c=(1-e)*a,f=.9*l*Math.sqrt(Math.sqrt(1/(1/(u*u*u*u)+1/(c*c*c*c))));return u=e*.4,c=(1-e)*.8,[Math.sqrt(1/(1/(u*u)+1/(c*c))),f,i]}function qo(e){let t=e.l!==void 0?e.l:0,n=e.a!==void 0?e.a:0,r=e.b!==void 0?e.b:0,i={mode:"okhsl",l:hi(t)};e.alpha!==void 0&&(i.alpha=e.alpha);let o=Math.sqrt(n*n+r*r);if(!o)return i.s=0,i;let[s,a,l]=Yo(t,n/o,r/o),u;if(o<a){let c=0,f=.8*s,g=1-f/a;u=(o-c)/(f+g*(o-c))*.8}else{let c=a,f=.2*a*a*1.25*1.25/s,g=1-f/(l-a);u=.8+.2*((o-c)/(f+g*(o-c)))}return u&&(i.s=u,i.h=Te(Math.atan2(r,n)*180/Math.PI)),i}function Zo(e){let t=e.h!==void 0?e.h:0,n=e.s!==void 0?e.s:0,r=e.l!==void 0?e.l:0,i={mode:"oklab",l:Pn(r)};if(e.alpha!==void 0&&(i.alpha=e.alpha),!n||r===1)return i.a=i.b=0,i;let o=Math.cos(t/180*Math.PI),s=Math.sin(t/180*Math.PI),[a,l,u]=Yo(i.l,o,s),c,f,g,h;n<.8?(c=1.25*n,f=0,g=.8*a,h=1-g/l):(c=5*(n-.8),f=l,g=.2*l*l*1.25*1.25/a,h=1-g/(u-l));let d=f+c*g/(1-h*c);return i.a=d*o,i.b=d*s,i}var D1={...Fo,mode:"okhsl",channels:["h","s","l","alpha"],parse:["--okhsl"],serialize:"--okhsl",fromMode:{oklab:qo,rgb:e=>qo(vn(e))},toMode:{oklab:Zo,rgb:e=>In(Zo(e))}},jp=D1;function Jo(e){let t=e.l!==void 0?e.l:0,n=e.a!==void 0?e.a:0,r=e.b!==void 0?e.b:0,i=Math.sqrt(n*n+r*r),o=i?n/i:1,s=i?r/i:1,[a,l]=gi(o,s),u=.5,c=1-u/a,f=l/(i+t*l),g=f*t,h=f*i,d=Pn(g),I=h*d/g,T=Ft({l:d,a:o*I,b:s*I}),E=Math.cbrt(1/Math.max(T.r,T.g,T.b,0));t=t/E,i=i/E*hi(t)/t,t=hi(t);let S={mode:"okhsv",s:i?(u+l)*h/(l*u+l*c*h):0,v:t?t/g:0};return S.s&&(S.h=Te(Math.atan2(r,n)*180/Math.PI)),e.alpha!==void 0&&(S.alpha=e.alpha),S}function Qo(e){let t={mode:"oklab"};e.alpha!==void 0&&(t.alpha=e.alpha);let n=e.h!==void 0?e.h:0,r=e.s!==void 0?e.s:0,i=e.v!==void 0?e.v:0,o=Math.cos(n/180*Math.PI),s=Math.sin(n/180*Math.PI),[a,l]=gi(o,s),u=.5,c=1-u/a,f=1-r*u/(u+l-l*c*r),g=r*l*u/(u+l-l*c*r),h=Pn(f),d=g*h/f,I=Ft({l:h,a:o*d,b:s*d}),T=Math.cbrt(1/Math.max(I.r,I.g,I.b,0)),E=Pn(i*f),S=g*E/f;return t.l=E*T,t.a=S*o*T,t.b=S*s*T,t}var M1={...Go,mode:"okhsv",channels:["h","s","v","alpha"],parse:["--okhsv"],serialize:"--okhsv",fromMode:{oklab:Jo,rgb:e=>Jo(vn(e))},toMode:{oklab:Qo,rgb:e=>In(Qo(e))}},Xp=M1;function P1(e,t){if(!t||t[0]!=="oklab")return;let n={mode:"oklab"},[,r,i,o,s]=t;if(!(r.type===W.Hue||i.type===W.Hue||o.type===W.Hue))return r.type!==W.None&&(n.l=Math.min(Math.max(0,r.type===W.Number?r.value:r.value/100),1)),i.type!==W.None&&(n.a=i.type===W.Number?i.value:i.value*.4/100),o.type!==W.None&&(n.b=o.type===W.Number?o.value:o.value*.4/100),s.type!==W.None&&(n.alpha=Math.min(1,Math.max(0,s.type===W.Number?s.value:s.value/100))),n}var Kp=P1;var w1={...Ir,mode:"oklab",toMode:{lrgb:Ft,rgb:In},fromMode:{lrgb:Ko,rgb:vn},ranges:{l:[0,1],a:[-.4,.4],b:[-.4,.4]},parse:[Kp],serialize:e=>`oklab(${e.l!==void 0?e.l:"none"} ${e.a!==void 0?e.a:"none"} ${e.b!==void 0?e.b:"none"}${e.alpha<1?` / ${e.alpha}`:""})`},Yp=w1;function k1(e,t){if(!t||t[0]!=="oklch")return;let n={mode:"oklch"},[,r,i,o,s]=t;if(r.type!==W.None){if(r.type===W.Hue)return;n.l=Math.min(Math.max(0,r.type===W.Number?r.value:r.value/100),1)}if(i.type!==W.None&&(n.c=Math.max(0,i.type===W.Number?i.value:i.value*.4/100)),o.type!==W.None){if(o.type===W.Percentage)return;n.h=o.value}return s.type!==W.None&&(n.alpha=Math.min(1,Math.max(0,s.type===W.Number?s.value:s.value/100))),n}var qp=k1;var _1={...Tr,mode:"oklch",toMode:{oklab:e=>lt(e,"oklab"),rgb:e=>In(lt(e,"oklab"))},fromMode:{rgb:e=>at(vn(e),"oklch"),oklab:e=>at(e,"oklch")},parse:[qp],serialize:e=>`oklch(${e.l!==void 0?e.l:"none"} ${e.c!==void 0?e.c:"none"} ${e.h!==void 0?e.h:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,ranges:{l:[0,1],c:[0,.4],h:[0,360]}},Zp=_1;var L1=e=>{let{r:t,g:n,b:r,alpha:i}=gt(e),o={mode:"xyz65",x:.486570948648216*t+.265667693169093*n+.1982172852343625*r,y:.2289745640697487*t+.6917385218365062*n+.079286914093745*r,z:0*t+.0451133818589026*n+1.043944368900976*r};return i!==void 0&&(o.alpha=i),o},Yl=L1;var V1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=yt({r:e*2.4934969119414263-t*.9313836179191242-.402710784450717*n,g:e*-.8294889695615749+t*1.7626640603183465+.0236246858419436*n,b:e*.0358458302437845-t*.0761723892680418+.9568845240076871*n},"p3");return r!==void 0&&(i.alpha=r),i},ql=V1;var F1={...ht,mode:"p3",parse:["display-p3"],serialize:"display-p3",fromMode:{rgb:e=>ql(nt(e)),xyz65:ql},toMode:{rgb:e=>rt(Yl(e)),xyz65:Yl}},Jp=F1;var Zl=e=>{let t=Math.abs(e);return t>=.001953125?Math.sign(e)*Math.pow(t,.5555555555555556):16*e},G1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"prophoto",r:Zl(e*1.3457868816471585-t*.2555720873797946-.0511018649755453*n),g:Zl(e*-.5446307051249019+t*1.5082477428451466+.0205274474364214*n),b:Zl(e*0+t*0+1.2119675456389452*n)};return r!==void 0&&(i.alpha=r),i},Jl=G1;var Ql=(e=0)=>{let t=Math.abs(e);return t>=.03125?Math.sign(e)*Math.pow(t,1.8):e/16},B1=e=>{let t=Ql(e.r),n=Ql(e.g),r=Ql(e.b),i={mode:"xyz50",x:.7977666449006423*t+.1351812974005331*n+.0313477341283922*r,y:.2880748288194013*t+.7118352342418731*n+899369387256e-16*r,z:0*t+0*n+.8251046025104602*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},eu=B1;var U1={...ht,mode:"prophoto",parse:["prophoto-rgb"],serialize:"prophoto-rgb",fromMode:{xyz50:Jl,rgb:e=>Jl(Vt(e))},toMode:{xyz50:eu,rgb:e=>Lt(eu(e))}},Qp=U1;var em=1.09929682680944,z1=.018053968510807,tu=e=>{let t=Math.abs(e);return t>z1?(Math.sign(e)||1)*(em*Math.pow(t,.45)-(em-1)):4.5*e},H1=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"rec2020",r:tu(e*1.7166511879712683-t*.3556707837763925-.2533662813736599*n),g:tu(e*-.6666843518324893+t*1.6164812366349395+.0157685458139111*n),b:tu(e*.0176398574453108-t*.0427706132578085+.9421031212354739*n)};return r!==void 0&&(i.alpha=r),i},nu=H1;var tm=1.09929682680944,W1=.018053968510807,ru=(e=0)=>{let t=Math.abs(e);return t<W1*4.5?e/4.5:(Math.sign(e)||1)*Math.pow((t+tm-1)/tm,1/.45)},$1=e=>{let t=ru(e.r),n=ru(e.g),r=ru(e.b),i={mode:"xyz65",x:.6369580483012911*t+.1446169035862083*n+.1688809751641721*r,y:.262700212011267*t+.6779980715188708*n+.059301716469862*r,z:0*t+.0280726930490874*n+1.0609850577107909*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},iu=$1;var j1={...ht,mode:"rec2020",fromMode:{xyz65:nu,rgb:e=>nu(nt(e))},toMode:{xyz65:iu,rgb:e=>rt(iu(e))},parse:["rec2020"],serialize:"rec2020"},nm=j1;var Jt=.0037930732552754493,es=Math.cbrt(Jt);var ou=e=>Math.cbrt(e)-es,X1=e=>{let{r:t,g:n,b:r,alpha:i}=gt(e),o=ou(.3*t+.622*n+.078*r+Jt),s=ou(.23*t+.692*n+.078*r+Jt),a=ou(.2434226892454782*t+.2047674442449682*n+.5518098665095535*r+Jt),l={mode:"xyb",x:(o-s)/2,y:(o+s)/2,b:a-(o+s)/2};return i!==void 0&&(l.alpha=i),l},rm=X1;var su=e=>Math.pow(e+es,3),K1=({x:e,y:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=su(e+t)-Jt,o=su(t-e)-Jt,s=su(n+t)-Jt,a=yt({r:11.031566904639861*i-9.866943908131562*o-.16462299650829934*s,g:-3.2541473810744237*i+4.418770377582723*o-.16462299650829934*s,b:-3.6588512867136815*i+2.7129230459360922*o+1.9459282407775895*s});return r!==void 0&&(a.alpha=r),a},im=K1;var Y1={mode:"xyb",channels:["x","y","b","alpha"],parse:["--xyb"],serialize:"--xyb",toMode:{rgb:im},fromMode:{rgb:rm},ranges:{x:[-.0154,.0281],y:[0,.8453],b:[-.2778,.388]},interpolate:{x:K,y:K,b:K,alpha:{use:K,fixup:fe}}},om=Y1;var q1={mode:"xyz50",parse:["xyz-d50"],serialize:"xyz-d50",toMode:{rgb:Lt,lab:vr},fromMode:{rgb:Vt,lab:yr},channels:["x","y","z","alpha"],ranges:{x:[0,.964],y:[0,.999],z:[0,.825]},interpolate:{x:K,y:K,z:K,alpha:{use:K,fixup:fe}}},sm=q1;var Z1=e=>{let{x:t,y:n,z:r,alpha:i}=e;t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=0);let o={mode:"xyz50",x:1.0479298208405488*t+.0229467933410191*n-.0501922295431356*r,y:.0296278156881593*t+.990434484573249*n-.0170738250293851*r,z:-.0092430581525912*t+.0150551448965779*n+.7518742899580008*r};return i!==void 0&&(o.alpha=i),o},am=Z1;var J1=e=>{let{x:t,y:n,z:r,alpha:i}=e;t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=0);let o={mode:"xyz65",x:.9554734527042182*t-.0230985368742614*n+.0632593086610217*r,y:-.0283697069632081*t+1.0099954580058226*n+.021041398966943*r,z:.0123140016883199*t-.0205076964334779*n+1.3303659366080753*r};return i!==void 0&&(o.alpha=i),o},lm=J1;var Q1={mode:"xyz65",toMode:{rgb:rt,xyz50:am},fromMode:{rgb:nt,xyz50:lm},ranges:{x:[0,.95],y:[0,1],z:[0,1.088]},channels:["x","y","z","alpha"],parse:["xyz","xyz-d65"],serialize:"xyz-d65",interpolate:{x:K,y:K,z:K,alpha:{use:K,fixup:fe}}},um=Q1;var eb=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"yiq",y:.29889531*e+.58662247*t+.11448223*n,i:.59597799*e-.2741761*t-.32180189*n,q:.21147017*e-.52261711*t+.31114694*n};return r!==void 0&&(i.alpha=r),i},cm=eb;var tb=({y:e,i:t,q:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"rgb",r:e+.95608445*t+.6208885*n,g:e-.27137664*t-.6486059*n,b:e-1.10561724*t+1.70250126*n};return r!==void 0&&(i.alpha=r),i},fm=tb;var nb={mode:"yiq",toMode:{rgb:fm},fromMode:{rgb:cm},channels:["y","i","q","alpha"],parse:["--yiq"],serialize:"--yiq",ranges:{i:[-.595,.595],q:[-.522,.522]},interpolate:{y:K,i:K,q:K,alpha:{use:K,fixup:fe}}},dm=nb;var F3=Ge("rgb"),rb=e=>{let t={mode:e.mode,r:Math.max(0,Math.min(e.r!==void 0?e.r:0,1)),g:Math.max(0,Math.min(e.g!==void 0?e.g:0,1)),b:Math.max(0,Math.min(e.b!==void 0?e.b:0,1))};return e.alpha!==void 0&&(t.alpha=e.alpha),t};var ib=e=>e!==void 0&&(e.r===void 0||e.r>=0&&e.r<=1)&&(e.g===void 0||e.g>=0&&e.g<=1)&&(e.b===void 0||e.b>=0&&e.b<=1);function Sr(e="rgb"){let{gamut:t}=Yt(e);if(!t)return r=>!0;let n=Ge(typeof t=="string"?t:e);return r=>ib(n(r))}function pm(e="rgb"){let{gamut:t}=Yt(e);if(!t)return o=>ur(o);let n=typeof t=="string"?t:e,r=Ge(n),i=Sr(n);return o=>{let s=ur(o);if(!s)return;let a=r(s);if(i(a))return s;let l=rb(a);return s.mode===l.mode?l:Ge(s.mode)(l)}}function br(e="rgb",t="oklch",n=ai("oklch"),r=.02){let i=Ge(e),o=Yt(e);if(!o.gamut)return c=>i(c);let s=Sr(e),a=pm(e),l=Ge(t),{ranges:u}=Yt(t);if(!u.l||!u.c)throw new Error("LCH-like space expected");return c=>{if(c=ur(c),c===void 0)return;let f={...l(c)};if(f.l===void 0&&(f.l=0),f.c===void 0&&(f.c=0),f.l>=u.l[1]){let T={...o.white,mode:e};return c.alpha!==void 0&&(T.alpha=c.alpha),T}if(f.l<=u.l[0]){let T={...o.black,mode:e};return c.alpha!==void 0&&(T.alpha=c.alpha),T}if(s(f))return i(f);let g=0,h=f.c,d=(u.c[1]-u.c[0])/4e3,I=a(f);for(;h-g>d;)f.c=(g+h)*.5,I=a(f),s(f)||n&&r>0&&n(f,I)<=r?g=f.c:h=f.c;return i(s(f)?f:I)}}var C5=Ie(pp),O5=Ie(Sp),R5=Ie(Ap),D5=Ie(xp),M5=Ie(Np),P5=Ie(Fo),w5=Ie(Go),k5=Ie(Mp),_5=Ie(wp),L5=Ie(_p),V5=Ie(Lp),F5=Ie(Ir),G5=Ie(Fp),B5=Ie(Tr),U5=Ie(Bp),z5=Ie(Hp),H5=Ie(Wp),W5=Ie($p),$5=Ie(jp),j5=Ie(Xp),X5=Ie(Yp),K5=Ie(Zp),Y5=Ie(Jp),q5=Ie(Qp),Z5=Ie(nm),J5=Ie(ht),Q5=Ie(om),e4=Ie(sm),t4=Ie(um),n4=Ie(dm);var Tn={r:0,g:0,b:0,a:1};var Er="Inter",yi=4,wn=1;var mm=["button","textField","textarea","numberField","toggle","switch","checkbox","radio","radioGroup","toggleGroup","slider","progress","tabs","collapsible","accordion"];var ts,ob={lang:void 0,message:void 0,abortEarly:void 0,abortPipeEarly:void 0};function hm(e){return!e&&!ts?ob:{lang:e?.lang??ts?.lang,message:e?.message,abortEarly:e?.abortEarly??ts?.abortEarly,abortPipeEarly:e?.abortPipeEarly??ts?.abortPipeEarly}}var sb;function ab(e){return sb?.get(e)}var lb;function ub(e){return lb?.get(e)}var cb;function fb(e,t){return cb?.get(e)?.get(t)}function vi(e){let t=typeof e;return t==="string"?`"${e}"`:t==="number"||t==="bigint"||t==="boolean"?`${e}`:t==="object"||t==="function"?(e&&Object.getPrototypeOf(e)?.constructor?.name)??"null":t}function ze(e,t,n,r,i){let o=i&&"input"in i?i.input:n.value,s=i?.expected??e.expects??null,a=i?.received??vi(o),l={kind:e.kind,type:e.type,input:o,expected:s,received:a,message:`Invalid ${t}: ${s?`Expected ${s} but r`:"R"}eceived ${a}`,requirement:e.requirement,path:i?.path,issues:i?.issues,lang:r.lang,abortEarly:r.abortEarly,abortPipeEarly:r.abortPipeEarly},u=e.kind==="schema",c=i?.message??e.message??fb(e.reference,l.lang)??(u?ub(l.lang):null)??r.message??ab(l.lang);c!==void 0&&(l.message=typeof c=="function"?c(l):c),u&&(n.typed=!1),n.issues?n.issues.push(l):n.issues=[l]}function db(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function pb(e,t){return Object.prototype.hasOwnProperty.call(e,t)&&t!=="__proto__"&&t!=="prototype"&&t!=="constructor"}function mb(e,t){let n=[...new Set(e)];return n.length>1?`(${n.join(` ${t} `)})`:n[0]??"never"}function Je(e){return e["~standard"]={version:1,vendor:"valibot",validate:t=>e["~run"]({value:t},hm())},e}function ns(e,t){return{kind:"validation",type:"check",reference:ns,async:!1,expects:null,requirement:e,message:t,"~run"(n,r){return n.typed&&!this.requirement(n.value)&&ze(this,"input",n,r),n}}}function Gt(e){return{kind:"validation",type:"finite",reference:Gt,async:!1,expects:null,requirement:Number.isFinite,message:e,"~run"(t,n){return t.typed&&!this.requirement(t.value)&&ze(this,"finite",t,n),t}}}function Ii(e,t){return{kind:"validation",type:"max_length",reference:Ii,async:!1,expects:`<=${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&n.value.length>this.requirement&&ze(this,"length",n,r,{received:`${n.value.length}`}),n}}}function rs(e,t){return{kind:"validation",type:"min_length",reference:rs,async:!1,expects:`>=${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&n.value.length<this.requirement&&ze(this,"length",n,r,{received:`${n.value.length}`}),n}}}function is(e,t){return{kind:"validation",type:"min_value",reference:is,async:!1,expects:`>=${e instanceof Date?e.toJSON():vi(e)}`,requirement:e,message:t,"~run"(n,r){return n.typed&&!(n.value>=this.requirement)&&ze(this,"value",n,r,{received:n.value instanceof Date?n.value.toJSON():vi(n.value)}),n}}}function Ar(e){return{kind:"validation",type:"non_empty",reference:Ar,async:!1,expects:"!0",message:e,"~run"(t,n){return t.typed&&t.value.length===0&&ze(this,"length",t,n,{received:"0"}),t}}}function au(e,t){return{kind:"transformation",type:"parse_json",reference:au,config:e,message:t,async:!1,"~run"(n,r){try{n.value=JSON.parse(n.value,this.config?.reviver)}catch(i){if(i instanceof Error)ze(this,"JSON",n,r,{received:`"${i.message}"`}),n.typed=!1;else throw i}return n}}}function os(e,t){return{kind:"validation",type:"regex",reference:os,async:!1,expects:`${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&!this.requirement.test(n.value)&&ze(this,"format",n,r),n}}}function kn(e){return{kind:"transformation",type:"transform",reference:kn,async:!1,operation:e,"~run"(t){return t.value=this.operation(t.value),t}}}function ss(){return{kind:"transformation",type:"trim",reference:ss,async:!1,"~run"(e){return e.value=e.value.trim(),e}}}function gm(e,t,n){return typeof e.fallback=="function"?e.fallback(t,n):e.fallback}function Ct(e,t){return Je({...e,fallback:t,"~run"(n,r){let i=e["~run"](n,r);return i.issues?{typed:!0,value:gm(this,i,r)}:i}})}function lu(e,t,n){return typeof e.default=="function"?e.default(t,n):e.default}function Qt(e,t){return Je({kind:"schema",type:"array",reference:Qt,expects:"Array",async:!1,item:e,message:t,"~run"(n,r){let i=n.value;if(Array.isArray(i)){n.typed=!0,n.value=[];for(let o=0;o<i.length;o++){let s=i[o],a=this.item["~run"]({value:s},r);if(a.issues){let l={type:"array",origin:"value",input:i,key:o,value:s};for(let u of a.issues)u.path?u.path.unshift(l):u.path=[l],n.issues?.push(u);if(n.issues||(n.issues=a.issues),r.abortEarly){n.typed=!1;break}}a.typed||(n.typed=!1),n.value.push(a.value)}}else ze(this,"type",n,r);return n}})}function as(e){return Je({kind:"schema",type:"boolean",reference:as,expects:"boolean",async:!1,message:e,"~run"(t,n){return typeof t.value=="boolean"?t.typed=!0:ze(this,"type",t,n),t}})}function ls(e,t){return Je({kind:"schema",type:"custom",reference:ls,expects:"unknown",async:!1,check:e,message:t,"~run"(n,r){return this.check(n.value)?n.typed=!0:ze(this,"type",n,r),n}})}function uu(e){return Je({kind:"schema",type:"lazy",reference:uu,expects:"unknown",async:!1,getter:e,"~run"(t,n){return this.getter(t.value)["~run"](t,n)}})}function cu(e,t){return Je({kind:"schema",type:"literal",reference:cu,expects:vi(e),async:!1,literal:e,message:t,"~run"(n,r){return db(n.value,this.literal)?n.typed=!0:ze(this,"type",n,r),n}})}function Ti(e,t){return Je({kind:"schema",type:"nullable",reference:Ti,expects:`(${e.expects} | null)`,async:!1,wrapped:e,default:t,"~run"(n,r){return n.value===null&&(this.default!==void 0&&(n.value=lu(this,n,r)),n.value===null)?(n.typed=!0,n):this.wrapped["~run"](n,r)}})}function Se(e){return Je({kind:"schema",type:"number",reference:Se,expects:"number",async:!1,message:e,"~run"(t,n){return typeof t.value=="number"&&!isNaN(t.value)?t.typed=!0:ze(this,"type",t,n),t}})}function xe(e,t){return Je({kind:"schema",type:"object",reference:xe,expects:"Object",async:!1,entries:e,message:t,"~run"(n,r){let i=n.value;if(i&&typeof i=="object"){n.typed=!0,n.value={};for(let o in this.entries){let s=this.entries[o];if(o in i||(s.type==="exact_optional"||s.type==="optional"||s.type==="nullish")&&s.default!==void 0){let a=o in i?i[o]:lu(s),l=s["~run"]({value:a},r);if(l.issues){let u={type:"object",origin:"value",input:i,key:o,value:a};for(let c of l.issues)c.path?c.path.unshift(u):c.path=[u],n.issues?.push(c);if(n.issues||(n.issues=l.issues),r.abortEarly){n.typed=!1;break}}l.typed||(n.typed=!1),n.value[o]=l.value}else if(s.fallback!==void 0)n.value[o]=gm(s);else if(s.type!=="exact_optional"&&s.type!=="optional"&&s.type!=="nullish"&&(ze(this,"key",n,r,{input:void 0,expected:`"${o}"`,path:[{type:"object",origin:"key",input:i,key:o,value:i[o]}]}),r.abortEarly))break}}else ze(this,"type",n,r);return n}})}function he(e,t){return Je({kind:"schema",type:"optional",reference:he,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:t,"~run"(n,r){return n.value===void 0&&(this.default!==void 0&&(n.value=lu(this,n,r)),n.value===void 0)?(n.typed=!0,n):this.wrapped["~run"](n,r)}})}function _n(e,t){return Je({kind:"schema",type:"picklist",reference:_n,expects:mb(e.map(vi),"|"),async:!1,options:e,message:t,"~run"(n,r){return this.options.includes(n.value)?n.typed=!0:ze(this,"type",n,r),n}})}function en(e,t,n){return Je({kind:"schema",type:"record",reference:en,expects:"Object",async:!1,key:e,value:t,message:n,"~run"(r,i){let o=r.value;if(o&&typeof o=="object"){r.typed=!0,r.value={};for(let s in o)if(pb(o,s)){let a=o[s],l=this.key["~run"]({value:s},i);if(l.issues){let c={type:"object",origin:"key",input:o,key:s,value:a};for(let f of l.issues)f.path=[c],r.issues?.push(f);if(r.issues||(r.issues=l.issues),i.abortEarly){r.typed=!1;break}}let u=this.value["~run"]({value:a},i);if(u.issues){let c={type:"object",origin:"value",input:o,key:s,value:a};for(let f of u.issues)f.path?f.path.unshift(c):f.path=[c],r.issues?.push(f);if(r.issues||(r.issues=u.issues),i.abortEarly){r.typed=!1;break}}(!l.typed||!u.typed)&&(r.typed=!1),l.typed&&(r.value[l.value]=u.value)}}else ze(this,"type",r,i);return r}})}function ce(e){return Je({kind:"schema",type:"string",reference:ce,expects:"string",async:!1,message:e,"~run"(t,n){return typeof t.value=="string"?t.typed=!0:ze(this,"type",t,n),t}})}function Sn(){return Je({kind:"schema",type:"unknown",reference:Sn,expects:"unknown",async:!1,"~run"(e){return e.typed=!0,e}})}function Ne(...e){return Je({...e[0],pipe:e,"~run"(t,n){for(let r of e)if(r.kind!=="metadata"){if(t.issues&&(r.kind==="schema"||r.kind==="transformation")){t.typed=!1;break}(!t.issues||!n.abortEarly&&!n.abortPipeEarly)&&(t=r["~run"](t,n))}return t}})}function Si(e,t,n){let r=e["~run"]({value:t},hm(n));return{typed:r.typed,success:!r.issues,output:r.value,issues:r.issues}}var bi="open-pencil";function $e(e,t,n){let r=Ne(ce(),au(),n);return{key:e,role:t,decode(i){let o=Si(r,i);return o.success?o.output:void 0},encode:i=>JSON.stringify(i)}}function us(e,t,n){let r=_n(n);return{key:e,role:t,decode(i){let o=Si(r,i);return o.success?o.output:void 0},encode:i=>i}}function fu(e,t){return e.pluginId==="open-pencil"&&e.key===t.key}function du(e,t){return e?.some(n=>fu(n,t))??!1}function pu(e,t){return{pluginId:bi,key:e.key,value:e.encode(t)}}function cs(e,t){return e.filter(n=>!t.some(r=>fu(n,r)))}function tn(e,t,n){return vm(e,t,n===void 0?[]:[n])}function vm(e,t,n){return[...cs(e,[t]),...n.map(r=>pu(t,r))]}var gb=xe({propertyId:ce(),on:he(ce()),off:he(ce())});function Im(e){return e.max>e.min&&e.step>0}var yb=Ne(xe({min:Ne(Se(),Gt()),max:Ne(Se(),Gt()),step:Ne(Se(),Gt()),default:Ne(Se(),Gt())}),ns(e=>Im(e),"A number value needs max above min and a positive step")),vb={rest:he(ce()),hover:he(ce()),pressed:he(ce()),focus:he(ce()),disabled:he(ce())},Ib=xe({propertyId:ce(),...vb}),Tb=xe({kind:_n(mm),booleans:en(ce(),gb),texts:he(en(ce(),xe({propertyId:ce()})),{}),numbers:en(ce(),yb),parts:en(ce(),ce()),states:he(Ib)}),Tm=["png","jpg","webp","svg","pdf","pptx"];function Sm(e){return Tm.some(t=>t===e)}var bm=.01,Em=1024;function fs(e){return Math.min(Em,Math.max(bm,e))}var Am=/^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:[-_][a-z0-9]+)*$/,xm=xe({name:Ne(ce(),os(Am)),glyph:he(ce())}),Nm=["fill","stroke"],Cm=Ne(Qt(_n(Nm)),rs(1)),Om=xe({type:Ne(ce(),Ar(),Ii(100)),id:he(ce()),props:he(en(ce(),Sn())),children:he(Qt(uu(()=>Om)))}),Rm=xe({components:Ne(Qt(Om),rs(1)),structureVersion:he(Se())}),Dm=xe({image:Ne(ce(),Ar()),preset:Rm,frame:he(xe({width:Ne(Se(),Gt(),is(0)),height:Ne(Se(),Gt(),is(0)),preset:Ne(ce(),Ar())}))});var mu=["ALL_SCOPES","TEXT_CONTENT","CORNER_RADIUS","WIDTH_HEIGHT","GAP","ALL_FILLS","FRAME_FILL","SHAPE_FILL","TEXT_FILL","STROKE","STROKE_FLOAT","EFFECT_FLOAT","EFFECT_COLOR","OPACITY","FONT_STYLE","FONT_FAMILY","FONT_SIZE","LINE_HEIGHT","LETTER_SPACING","PARAGRAPH_SPACING","PARAGRAPH_INDENT","FONT_VARIATIONS","TRANSFORM"],hu=["WEB","ANDROID","iOS"],Mm=["none","px","rem","%","ms","s","deg"];var Pm=/^[A-Za-z_][\w-]*$/;var ym=["AUTO","LTR","RTL"],Sb=Ne(xe({x:Se(),y:Se(),width:Se(),height:Se()}),ns(({x:e,y:t,width:n,height:r})=>Number.isFinite(e+t+n+r)&&n>0&&r>0)),bb=Ne(ls(e=>typeof e=="object"&&e!==null&&!Array.isArray(e)),kn(e=>Object.fromEntries(Object.entries(e).filter(t=>typeof t[1]=="string")))),Eb=Qt(Ne(xe({scale:Ne(Se(),Gt()),format:ls(Sm)}),kn(({scale:e,format:t})=>({scale:fs(e),format:t})))),Ab=Ne(xe({identity:xe({libraryId:ce(),assetKey:ce(),revisionId:ce()}),sourceNodeId:he(Sn()),readOnly:he(Sn())}),kn(({identity:e,sourceNodeId:t,readOnly:n})=>({identity:e,sourceNodeId:typeof t=="string"?t:null,readOnly:n===!0}))),xb=xe({libraryId:ce(),revisionId:ce(),enabled:he(Sn())}),Nb=Ne(Qt(Sn()),kn(e=>e.flatMap(t=>{let n=Si(xb,t);if(!n.success)return[];let{libraryId:r,revisionId:i,enabled:o}=n.output;return[{libraryId:r,revisionId:i,enabled:o===!0}]}))),wm=Ne(ce(),ss(),Ar(),Ii(1e3)),Cb=xe({unit:he(_n(Mm)),expressions:he(en(ce(),xe({css:wm,resolved:Ne(Se(),Gt())})))}),Ob=xe({version:cu(1),kind:_n(["fill","stroke"]),index:Se(),color:xe({h:Se(),c:Se(),l:Se(),a:Ct(he(Se()),void 0)})}),Rb=xe({libraryId:ce(),revisionId:ce(),name:ce(),catalogSource:he(ce())}),Db=Ct(he(xe({r:Se(),g:Se(),b:Se(),a:Se()})),void 0),km={author:Ct(ce(),""),authorColor:Db,text:Ct(ce(),""),createdAt:Ct(ce(),""),deleted:he(as())},Mb=xe({id:ce(),...km}),Pb=xe({id:ce(),pageId:ce(),pageName:he(ce()),nodeId:he(Ti(ce())),nodeName:he(Ti(ce())),offsetX:he(Se()),offsetY:he(Se()),x:Ct(Se(),0),y:Ct(Se(),0),...km,updatedAt:Ct(ce(),""),resolved:Ct(as(),!1),resolvedAt:he(Ti(ce())),replies:Ct(Qt(Mb),[])}),wb=Ne(Qt(Sn()),kn(e=>e.flatMap(t=>{let n=Si(Pb,t);if(!n.success)return[];let r=n.output;return[{...r,updatedAt:r.updatedAt||r.createdAt}]}))),Qe={textDirection:us("textDirection","format",ym),layoutDirection:us("layoutDirection","format",ym),nodeType:us("nodeType","format",["COMPONENT_SET"]),boundVariables:$e("boundVariables","format",bb),exportSettings:$e("exportSettings","format",Eb),textPathBox:$e("textPathBox","format",Sb),librarySource:$e("librarySource","bookkeeping",Ab),enabledLibraries:$e("enabledLibraries","bookkeeping",Nb),sourceLibraryPublication:$e("sourceLibraryPublication","bookkeeping",Rb),comments:$e("comments","bookkeeping",wb),token:$e("token","format",Cb),modeConditions:$e("modeConditions","format",en(ce(),wm)),modeAttribute:$e("modeAttribute","format",Ne(ce(),ss(),Ii(100),os(Pm))),okhcl:$e("okhcl","content",Ob),behaviour:$e("behaviour","content",Tb),icon:$e("icon","content",xm),iconTint:$e("iconTint","content",Cm),shader:$e("shader","content",Dm)},m4=Object.values(Qe).filter(e=>e.role!=="content");var gu=typeof globalThis=="object"&&globalThis||typeof window=="object"&&window||typeof self=="object"&&self||typeof global=="object"&&global||(function(){return this})();function yu(e){return typeof gu.Buffer<"u"&&gu.Buffer.isBuffer(e)}function Ei(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Ai(e){return Ei(e)&&Object.keys(e).length===0}function vu(e){return Object.getOwnPropertySymbols(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}function Iu(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}var _m="[object RegExp]",Lm="[object String]",Vm="[object Number]",Fm="[object Boolean]";var Gm="[object Symbol]",Bm="[object Date]",Um="[object Map]",zm="[object Set]",Hm="[object Array]",Wm="[object Function]",$m="[object ArrayBuffer]",ds="[object Object]",jm="[object Error]",Xm="[object DataView]",Km="[object Uint8Array]",Ym="[object Uint8ClampedArray]",qm="[object Uint16Array]",Zm="[object Uint32Array]",Jm="[object BigUint64Array]",Qm="[object Int8Array]",eh="[object Int16Array]",th="[object Int32Array]",nh="[object BigInt64Array]",rh="[object Float32Array]",ih="[object Float64Array]";function oh(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function sh(e,t,n){return xi(e,t,void 0,void 0,void 0,void 0,n)}function xi(e,t,n,r,i,o,s){let a=s(e,t,n,r,i,o);if(a!==void 0)return a;if(typeof e==typeof t)switch(typeof e){case"bigint":case"string":case"boolean":case"symbol":case"undefined":return e===t;case"number":return e===t||Object.is(e,t);case"function":return e===t;case"object":return Ni(e,t,o,s)}return Ni(e,t,o,s)}function Ni(e,t,n,r){if(Object.is(e,t))return!0;let i=Iu(e),o=Iu(t);if(i==="[object Arguments]"&&(i=ds),o==="[object Arguments]"&&(o=ds),i!==o)return!1;switch(i){case Lm:return e.toString()===t.toString();case Vm:return oh(e.valueOf(),t.valueOf());case Fm:case Bm:case Gm:return Object.is(e.valueOf(),t.valueOf());case _m:return e.source===t.source&&e.flags===t.flags;case Wm:return e===t}n=n??new Map;let s=n.get(e),a=n.get(t);if(s!=null&&a!=null)return s===t;n.set(e,t),n.set(t,e);try{switch(i){case Um:if(e.size!==t.size)return!1;for(let[l,u]of e.entries())if(!t.has(l)||!xi(u,t.get(l),l,e,t,n,r))return!1;return!0;case zm:{if(e.size!==t.size)return!1;let l=Array.from(e.values()),u=Array.from(t.values());for(let c=0;c<l.length;c++){let f=l[c],g=u.findIndex(h=>xi(f,h,void 0,e,t,n,r));if(g===-1)return!1;u.splice(g,1)}return!0}case Hm:case Km:case Ym:case qm:case Zm:case Jm:case Qm:case eh:case th:case nh:case rh:case ih:if(yu(e)!==yu(t)||e.length!==t.length)return!1;for(let l=0;l<e.length;l++)if(!xi(e[l],t[l],l,e,t,n,r))return!1;return!0;case $m:return e.byteLength!==t.byteLength?!1:Ni(new Uint8Array(e),new Uint8Array(t),n,r);case Xm:return e.byteLength!==t.byteLength||e.byteOffset!==t.byteOffset?!1:Ni(new Uint8Array(e),new Uint8Array(t),n,r);case jm:return e.name===t.name&&e.message===t.message;case ds:{if(!(Ni(e.constructor,t.constructor,n,r)||Ei(e)&&Ei(t)))return!1;let l=[...Object.keys(e),...vu(e)],u=[...Object.keys(t),...vu(t)];if(l.length!==u.length)return!1;for(let c=0;c<l.length;c++){let f=l[c],g=e[f];if(!Object.hasOwn(t,f))return!1;let h=t[f];if(!xi(g,h,f,e,t,n,r))return!1}return!0}default:return!1}}finally{n.delete(e),n.delete(t)}}function ah(){}function it(e,t){return sh(e,t,ah)}function kb(){return{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function _b(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function Lb(e){return e.minX===1/0?{x:0,y:0,width:0,height:0}:{x:e.minX,y:e.minY,width:e.maxX-e.minX,height:e.maxY-e.minY}}function ps(e){return e===0?0:e===1||e===2?1:e===3?2:e===4?3:null}function ms(e){let t=kb();for(let n of e){let r=n.commandsBlob,i=new DataView(r.buffer,r.byteOffset,r.byteLength),o=0;for(;o<r.length;){let s=r[o++],a=ps(s);if(a==null)break;for(let l=0;l<a&&!(o+8>r.length);l++)_b(t,i.getFloat32(o,!0),i.getFloat32(o+4,!0)),o+=8}}return t.minX===1/0?null:Lb(t)}function uh(){return{self:new Map,descendants:new Map}}function Tu(e){return{self:new Map([...e.self].map(([t,n])=>[t,structuredClone(n)])),descendants:new Map([...e.descendants].map(([t,n])=>[t,new Map([...n].map(([r,i])=>[r,structuredClone(i)]))]))}}function Rt(e,t,n,r){return n===t?e.self.get(r):e.descendants.get(n)?.get(r)}function Ci(e,t,n,r){return(n===t?e.self:e.descendants.get(n))?.has(r)??!1}function we(e,t,n,r,i=!0){if(n===t){e.self.set(r,i);return}let o=e.descendants.get(n)??new Map;o.set(r,i),e.descendants.set(n,o)}function Su(e){e.self.clear(),e.descendants.clear()}function Oi(e,t){for(let[n,r]of e.self)t("",n,r);for(let[n,r]of e.descendants)for(let[i,o]of r)t(n,i,o)}function En(){return{format:null,id:null,orderKey:null,editedFields:[],fig:{rawSize:null,rawTransform:null,rawNodeFields:{},layout:null,symbolOverrides:[],componentPropAssignments:[],derivedSymbolData:[],derivedSymbolDataLayoutVersion:null,uniformScaleFactor:null}}}function bu(e){return e==="LINE"||e==="VECTOR"?"CENTER":e==="TEXT"?"OUTSIDE":"INSIDE"}function Nr(e,t,n={}){return{id:e(),type:t,name:t.charAt(0)+t.slice(1).toLowerCase(),parentId:null,childIds:[],x:0,y:0,width:100,height:100,rotation:0,source:En(),derivedLayout:null,fills:t==="TEXT"?[{type:"SOLID",color:Tn,opacity:1,visible:!0}]:[],strokes:[],effects:[],layoutGrids:[],guides:[],fillStyleId:null,strokeStyleId:null,textStyleId:null,effectStyleId:null,gridStyleId:null,sharedStyleType:null,opacity:1,cornerRadius:0,topLeftRadius:0,topRightRadius:0,bottomRightRadius:0,bottomLeftRadius:0,independentCorners:!1,cornerSmoothing:0,visible:!0,locked:!1,clipsContent:!1,text:"",fontSize:14,fontFamily:Er,fontWeight:400,italic:!1,textAlignHorizontal:"LEFT",textDirection:"AUTO",textLanguage:null,leadingTrim:"NONE",lineHeight:null,letterSpacing:0,layoutMode:"NONE",layoutDirection:"AUTO",layoutWrap:"NO_WRAP",primaryAxisAlign:"MIN",counterAxisAlign:"MIN",primaryAxisSizing:"FIXED",counterAxisSizing:"FIXED",itemSpacing:0,counterAxisSpacing:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0,blendMode:"PASS_THROUGH",layoutPositioning:"AUTO",layoutGrow:0,layoutAlignSelf:"AUTO",vectorNetwork:null,handleMirroring:"NONE",fillGeometry:[],strokeGeometry:[],arcData:null,textAlignVertical:"TOP",textAutoResize:"NONE",textCase:"ORIGINAL",textDecoration:"NONE",textDecorationStyle:"SOLID",textDecorationThickness:null,textDecorationFills:[],textDecorationSkipInk:!0,textUnderlineOffset:null,maxLines:null,textParagraphs:[],listSpacing:0,paragraphSpacing:0,paragraphIndent:0,hangingList:!1,styleRuns:[],fontVariations:[],fontFeatures:[],horizontalConstraint:"MIN",verticalConstraint:"MIN",strokeCap:"NONE",strokeJoin:"MITER",dashPattern:[],borderTopWeight:0,borderRightWeight:0,borderBottomWeight:0,borderLeftWeight:0,independentStrokeWeights:!1,strokeWeight:1,strokeAlign:bu(t),strokeMiterLimit:4,minWidth:null,maxWidth:null,minHeight:null,maxHeight:null,targetAspectRatio:null,isMask:!1,maskType:"ALPHA",maskIsOutline:!1,gridTemplateColumns:[],gridTemplateRows:[],gridColumnGap:0,gridRowGap:0,gridPosition:null,counterAxisAlignContent:"AUTO",itemReverseZIndex:!1,strokesIncludedInLayout:!1,expanded:!0,textTruncation:"DISABLED",autoRename:!0,pointCount:5,starInnerRadius:.38,componentId:null,instanceOverrides:uh(),componentPropertyDefinitions:[],componentPropertyReferences:[],componentPropertyAssignments:{},componentPropertyValues:{},componentKey:null,sourceLibraryKey:null,publishId:null,overrideKey:null,sharedSymbolVersion:null,publishedVersion:null,librarySource:null,isPublishable:!1,isSymbolPublishable:!1,isExposedInstance:!1,symbolDescription:"",symbolLinks:[],variantPropSpecs:[],boundVariables:{},variableBindingScales:{},variableAssignmentScales:{},componentScale:1,variableModes:{},exportSettings:[],pluginData:[],pluginRelaunchData:[],internalOnly:!1,flipX:!1,flipY:!1,textPicture:null,derivedTextGlyphs:null,textPathData:null,textPathBox:null,booleanOperation:void 0,...n}}var Eu=new Set(["CANVAS","FRAME","GROUP","BOOLEAN_OPERATION","SECTION","COMPONENT","COMPONENT_SET","INSTANCE"]);function Au(e,t){let n=r=>({x:e[0]*r.x+e[1]*r.y,y:e[3]*r.x+e[4]*r.y});return{vertices:t.vertices.map(r=>({...r,x:e[0]*r.x+e[1]*r.y+e[2],y:e[3]*r.x+e[4]*r.y+e[5]})),segments:t.segments.map(r=>({...r,tangentStart:n(r.tangentStart),tangentEnd:n(r.tangentEnd)})),regions:t.regions.map(r=>({windingRule:r.windingRule,loops:r.loops.map(i=>[...i])}))}}function Ri(e){return{vertices:e.vertices.map(t=>({...t})),segments:e.segments.map(t=>({...t,tangentStart:{...t.tangentStart},tangentEnd:{...t.tangentEnd}})),regions:e.regions.map(t=>({windingRule:t.windingRule,loops:t.loops.map(n=>[...n])}))}}function hs(e){let t={x:0,y:0};return{vertices:e.vertices,segments:e.segments.map(n=>({start:n.start,end:n.end,tangentStart:n.tangentStart??{...t},tangentEnd:n.tangentEnd??{...t}})),regions:e.regions??[]}}function xr(e){let t={...e,color:{...e.color}};return e.gradientStops&&(t.gradientStops=e.gradientStops.map(Vb)),e.gradientTransform&&(t.gradientTransform={...e.gradientTransform}),e.imageTransform&&(t.imageTransform={...e.imageTransform}),e.patternSpacing&&(t.patternSpacing={...e.patternSpacing}),e.noiseSize&&(t.noiseSize={...e.noiseSize}),t}function gs(e){let t=xr(e);return e.dashPattern&&(t.dashPattern=[...e.dashPattern]),t}function xu(e){return{...e,color:{...e.color},offset:{...e.offset}}}function Nu(e){let t={...e,style:{...e.style,fills:e.style.fills?e.style.fills.map(xr):void 0,textDecorationFills:e.style.textDecorationFills?e.style.textDecorationFills.map(xr):void 0,fontVariations:e.style.fontVariations?e.style.fontVariations.map(n=>({...n})):void 0,fontFeatures:e.style.fontFeatures?e.style.fontFeatures.map(n=>({...n})):void 0}};return e.style.hyperlink&&(t.style.hyperlink={...e.style.hyperlink}),e.style.boundVariables&&(t.style.boundVariables={...e.style.boundVariables}),t}var lh=new WeakMap;function Ln(e,t){return lh.set(t,lh.get(e)??e),t}function Ot(e){return e.map(xr)}function Fn(e){return e.map(gs)}function Di(e){return e.map(xu)}function Cu(e){return e.map(t=>({...t,color:t.color?{...t.color}:void 0}))}function Mi(e){return e.map(Nu)}function ch(e,t){return{windingRule:e.windingRule,commandsBlob:t,...e.fills?{fills:Ot(e.fills)}:{}}}function Vn(e){return e.map(t=>ch(t,t.commandsBlob.slice()))}function Pi(e,t,n,r,i,o=0,s=0){let a=e.slice(),l=new DataView(a.buffer,a.byteOffset,a.byteLength),u=0;for(;u<a.length;){let c=a[u++],f=ps(c);if(f==null)break;for(let g=0;g<f&&!(u+8>a.length);g++){let h=l.getFloat32(u,!0),d=l.getFloat32(u+4,!0);l.setFloat32(u,t*h+n*d+o,!0),l.setFloat32(u+4,r*h+i*d+s,!0),u+=8}}return a}function wi(e,t,n,r,i,o=0,s=0){return e.map(a=>ch(a,Pi(a.commandsBlob,t,n,r,i,o,s)))}function Cr(e,t,n){return t===1&&n===1?Vn(e):wi(e,t,0,0,n)}function ut(e,t){if(e!==void 0)return e.length>0?t(e):[]}function Vb(e){return{color:{...e.color},position:e.position}}function bn(e){return e?.map(t=>({...t}))??[]}function Fb(e){return e?.map(t=>({...t,variantOptions:t.variantOptions?[...t.variantOptions]:void 0,preferredValues:t.preferredValues?[...t.preferredValues]:void 0,slotSettings:t.slotSettings?{...t.slotSettings}:void 0}))??[]}function ys(e){return e?e.map(t=>({...t,commandsBlob:new Uint8Array(t.commandsBlob)})):null}function Gb(e){return{startingAngle:e.startingAngle,endingAngle:e.endingAngle,innerRadius:e.innerRadius}}function Or(e,t,n="deep"){let{id:r,parentId:i,childIds:o,...s}=e;return n==="fig-import"?{...s,...t!==null?{componentId:t}:{},source:En(),boundVariables:{...e.boundVariables},variableBindingScales:{...e.variableBindingScales},variableAssignmentScales:{...e.variableAssignmentScales},variableModes:{...e.variableModes},instanceOverrides:Tu(e.instanceOverrides),componentPropertyAssignments:{...e.componentPropertyAssignments},componentPropertyValues:{...e.componentPropertyValues}}:{...s,...t!==null?{componentId:t}:{},boundVariables:{...e.boundVariables},variableBindingScales:{...e.variableBindingScales},variableAssignmentScales:{...e.variableAssignmentScales},variableModes:{...e.variableModes},instanceOverrides:Tu(e.instanceOverrides),fills:ut(e.fills,a=>Ln(a,Ot(a))),strokes:ut(e.strokes,a=>Ln(a,Fn(a))),effects:ut(e.effects,a=>Ln(a,Di(a))),layoutGrids:ut(e.layoutGrids,Cu),guides:ut(e.guides,a=>a.map(l=>({...l}))),styleRuns:ut(e.styleRuns,a=>Ln(a,Mi(a))),source:t===null?structuredClone(e.source):En(),dashPattern:ut(e.dashPattern,a=>[...a]),fontVariations:ut(e.fontVariations,a=>a.map(l=>({...l}))),fontFeatures:ut(e.fontFeatures,a=>a.map(l=>({...l}))),textParagraphs:ut(e.textParagraphs,a=>a.map(l=>({...l}))),textDecorationFills:ut(e.textDecorationFills,Ot),fillGeometry:ut(e.fillGeometry,Vn),strokeGeometry:ut(e.strokeGeometry,Vn),gridTemplateColumns:bn(e.gridTemplateColumns),gridTemplateRows:bn(e.gridTemplateRows),componentPropertyDefinitions:Fb(e.componentPropertyDefinitions),componentPropertyReferences:bn(e.componentPropertyReferences),componentPropertyAssignments:{...e.componentPropertyAssignments},symbolLinks:bn(e.symbolLinks),variantPropSpecs:bn(e.variantPropSpecs),pluginData:bn(e.pluginData),pluginRelaunchData:bn(e.pluginRelaunchData),exportSettings:bn(e.exportSettings),componentPropertyValues:{...e.componentPropertyValues},derivedLayout:e.derivedLayout?{...e.derivedLayout}:null,arcData:e.arcData?Gb(e.arcData):null,vectorNetwork:e.vectorNetwork?Ri(e.vectorNetwork):null,textPicture:e.textPicture?new Uint8Array(e.textPicture):null,derivedTextGlyphs:e.derivedTextGlyphs?Ln(e.derivedTextGlyphs,ys(e.derivedTextGlyphs)??[]):null,textPathData:e.textPathData?structuredClone(e.textPathData):null,textPathBox:e.textPathBox?{...e.textPathBox}:null,gridPosition:e.gridPosition?{...e.gridPosition}:null,targetAspectRatio:e.targetAspectRatio?{...e.targetAspectRatio}:null}}var j4=Ge("rgb"),X4=Ge("p3"),K4=Ge("oklch"),Y4=br("rgb","oklch"),q4=br("p3","oklch");var Z4=Ge("rgb"),J4=Ge("p3"),Q4=br("rgb","oklch"),e6=br("p3","oklch"),t6=Sr("rgb"),n6=Sr("p3");var r6=Ge("rgb");var i6=ai("rgb");function fh(e){if(!Number.isInteger(e)||e<=0)throw new RangeError("length must be a positive integer");let t=4294967296,n=t-t%e,r=new Uint32Array(1);do crypto.getRandomValues(r);while(r[0]>=n);return r[0]%e}var Ru=["text","fontSize","fontFamily","fontWeight","italic","letterSpacing","styleRuns","fontVariations","fontFeatures","textParagraphs","listSpacing","paragraphSpacing","paragraphIndent","hangingList"],ki=[...Ru,"lineHeight","textCase","textDirection","textAlignHorizontal","textAlignVertical"],Du=["width","height","textAutoResize","maxLines"];function vh(e){return e==="VERTICAL"?"VERTICAL":"HORIZONTAL"}function Bb(e,t){if(!(!e||e.layoutMode==="NONE"||t.layoutPositioning==="ABSOLUTE"))return e}function Ub(e,t){return t.parentId?e.getNode(t.parentId):void 0}function zb(e,t,n){return e.layoutMode==="NONE"?!1:n===vh(e.layoutMode)?t.layoutGrow>0:t.layoutAlignSelf==="STRETCH"?!0:t.layoutAlignSelf==="AUTO"&&e.layoutMode!=="GRID"&&e.counterAxisAlign==="STRETCH"}function Hb(e,t){if(e.layoutMode!=="NONE")return t===vh(e.layoutMode)?"primaryAxisSizing":"counterAxisSizing"}function Wb(e,t){return e==="WIDTH_AND_HEIGHT"?!0:t==="VERTICAL"&&e==="HEIGHT"}function $b(e,t){if(e.type==="TEXT")return Wb(e.textAutoResize,t);let n=Hb(e,t);return n!==void 0&&e[n]==="HUG"}function vs(e,t,n){return Ih(Ub(e,t),t,n)}function Ih(e,t,n){let r=Bb(e,t);return r&&zb(r,t,n)?"FILL":$b(t,n)&&(r||t.layoutMode!=="NONE")?"HUG":"FIXED"}var jb=new Set(Ru);function Xb(e,t,n,r){let i={...t,...r};if(i.type==="TEXT"){if(ki.every(a=>it(i[a],n[a])))return{width:!1,height:!1};let s=i.textAutoResize;return{width:s==="WIDTH_AND_HEIGHT",height:s==="WIDTH_AND_HEIGHT"||s==="HEIGHT"}}let o=s=>{let a=vs(e,i,s);return a==="FILL"||a==="HUG"&&i.layoutMode!=="NONE"};return{width:o("HORIZONTAL"),height:o("VERTICAL")}}function Th(e,t,n,r){let i=Xb(e,n,r,t);i.width&&Reflect.deleteProperty(t,"width"),i.height&&Reflect.deleteProperty(t,"height")}function Kb(e,t){t.type!=="TEXT"||!t.derivedLayout||Object.keys(e).some(n=>jb.has(n))&&(e.derivedLayout=null)}function Mu(e,t){let n=new Set,r=t.componentId?e.getNode(t.componentId):void 0;for(;r?.type==="INSTANCE"&&r.componentId&&!n.has(r.id);)n.add(r.id),r=e.getNode(r.componentId);return r?.type==="COMPONENT"?r:void 0}function vt(e){return e.componentPropertyReferences.find(t=>t.field==="SLOT_CONTENT")?.propertyId}function An(e,t,n=vt(t)){if(!n)return!1;let r=t.parentId?e.nodes.get(t.parentId):void 0;for(;r&&r.type!=="INSTANCE";)r=r.parentId?e.nodes.get(r.parentId):void 0;return!!r&&Object.hasOwn(r.componentPropertyAssignments,n)}function Sh(e,t,n){let r=Mu(e,t);return[r,r?.parentId?e.nodes.get(r.parentId):void 0].flatMap(i=>i?.componentPropertyDefinitions??[]).find(i=>i.id===n&&i.type==="SLOT")?.name}function Pu(e,t){let n=[],r=i=>{for(let o of i.childIds){let s=e.nodes.get(o);s&&(vt(s)?n.push(s):s.type!=="INSTANCE"&&r(s))}};return r(t),n}function bh(e,t){let n=[],r=i=>{for(let o of i.childIds){let s=e.nodes.get(o);!s||vt(s)||(s.type==="INSTANCE"?n.push(s):r(s))}};return r(t),n}function Yb(e,t,n){let r=t;for(let i of n)r=r&&bh(e,r).find(o=>o.name===i);return r}function Eh(e,t){let n={slots:[],propertyIds:[]},r=(i,o)=>{for(let s of bh(e,i))r(s,[...o,s.name]);for(let s of Pu(e,i)){let a=vt(s);if(!a||!Object.hasOwn(i.componentPropertyAssignments,a))continue;i.id===t.id&&n.propertyIds.push(a);let l=Sh(e,i,a),u=[...o,l].join("\0");if(!l||n.slots.some(f=>[...f.path,f.name].join("\0")===u))continue;let c=[...s.childIds];for(let f of c)e.reorderChild(f,t.id,t.childIds.length);n.slots.push({path:o,name:l,content:c})}};return r(t,[]),n}function Ah(e,t,n){if(!(n.slots.length===0&&n.propertyIds.length===0)){e.updateNode(t.id,{componentPropertyAssignments:Object.fromEntries(Object.entries(t.componentPropertyAssignments).filter(([r])=>!n.propertyIds.includes(r)))});for(let r of n.slots){let i=Yb(e,t,r.path),o=i&&Pu(e,i).find(a=>{let l=vt(a);return!!l&&Sh(e,i,l)===r.name}),s=o&&vt(o);if(!i||!o||!s||Object.hasOwn(i.componentPropertyAssignments,s)){for(let a of r.content)e.deleteNode(a);continue}for(let a of Array.from(o.childIds))e.deleteNode(a);for(let[a,l]of r.content.entries())e.reorderChild(l,o.id,a);e.updateNode(i.id,{componentPropertyAssignments:{...i.componentPropertyAssignments,[s]:""}})}}}function xh(e,t){return{instanceId:e,overrides:t,matched:new Set,leftovers:new Set}}function Nh(e,t){let n=e.type==="INSTANCE"?Rt(t.overrides,t.instanceId,e.id,"sourceComponentId"):void 0;return typeof n=="string"?n:e.componentId??void 0}function qb(e,t,n){if(t.type==="INSTANCE"||Ci(n.overrides,n.instanceId,t.id,"componentId"))return!1;let r=t.componentId?e.nodes.get(t.componentId):void 0;return!r||!An(e,t,vt(r))}function Ch(e,t){if(t.copies)return t.copies;let n=new Map,r=o=>{for(let s of o.childIds){let a=e.nodes.get(s);if(!a)continue;let l=Nh(a,t);l&&n.set(l,[...n.get(l)??[],a]),qb(e,a,t)&&r(a)}},i=e.nodes.get(t.instanceId);return i&&r(i),t.copies=n,n}function Zb(e,t,n,r){return Ch(e,t).get(n)?.find(i=>!t.matched.has(i.id)&&e.nodes.has(i.id)&&i.id!==r&&!e.isDescendant(r,i.id))}function Oh(e,t,n){let r=Ch(e,t);return r.size===0?!1:(e.nodes.get(n)?.childIds??[]).some(i=>r.get(i)?.some(o=>!t.matched.has(o.id))||Oh(e,t,i))}var dh=new WeakMap;function wu(e){let t=dh.get(e);return t||(t={byInstance:new Map,removals:[]},dh.set(e,t)),t}function Jb(e,t){if(t.keys.length===0)return;let n=wu(e);for(n.removals.push(t);n.removals.length>200;){let r=n.removals.shift();for(let[i,o]of r?.keys??[]){let s=n.byInstance.get(i);!s||s.get(o)?.removals!==r||(s.delete(o),s.size===0&&n.byInstance.delete(i))}}}var Ou=new WeakMap;function Rh(e,t){let n=Ou.get(e);if(n)return t(n);let r={keys:[]};Ou.set(e,r);try{return t(r)}finally{Ou.delete(e),Jb(e,r)}}function Qb(e,t,n,r){let i=wu(e),o=i.byInstance.get(t.instanceId),s=o?.get(n);if(!o||!s)return;o.delete(n),o.size===0&&i.byInstance.delete(t.instanceId);let a=s.nodes.at(0);if(!(!a||s.nodes.some(l=>e.nodes.has(l.id)))){for(let l of s.nodes){let{id:u,type:c,parentId:f,childIds:g,...h}=structuredClone(l);e.createNodeWithId(u,c,u===a.id?r:f,h)}for(let[l,u]of s.overrides)t.overrides.descendants.set(l,new Map(u));return e.nodes.get(a.id)}}function eE(e,t,n){let r=wu(e);for(let i of t.leftovers){let o=e.nodes.get(i),s=o?Nh(o,t):void 0;if(!o||!s||t.matched.has(i))continue;let a=[],l=f=>{a.push(structuredClone(f));for(let g of f.childIds){let h=e.nodes.get(g);h&&l(h)}};l(o);let u=new Map;for(let f of a){let g=t.overrides.descendants.get(f.id);g&&u.set(f.id,new Map(g)),t.overrides.descendants.delete(f.id)}let c=r.byInstance.get(t.instanceId);c||(c=new Map,r.byInstance.set(t.instanceId,c)),c.set(s,{nodes:a,overrides:u,removals:n}),n.keys.push([t.instanceId,s]),e.deleteNode(i)}t.leftovers.clear()}function tE(e,t){let n=new Set;return e.closest(t,r=>{if(r.type==="COMPONENT"&&n.add(r.id),r.type==="INSTANCE"){let i=Mu(e,r);i&&n.add(i.id)}return!1}),n}function Dh(e,t,n){let r=tE(e,n);if(r.size===0)return!1;let i=new Set;function o(s){if(r.has(s))return!0;if(i.has(s))return!1;i.add(s);let a=e.getNode(s);return a?a.type==="INSTANCE"&&a.componentId&&o(a.componentId)?!0:a.childIds.some(o):!1}return o(t)}function ku(e,t,n){return e.getNode(t)?.type!=="COMPONENT"?!1:!Dh(e,t,n)}var Mh=["name","text","fontSize","fontWeight","fontFamily","italic","textDirection","letterSpacing","lineHeight","textCase","textDecoration","textDecorationStyle","textDecorationThickness","textUnderlineOffset","textDecorationFills","textDecorationSkipInk","textAlignHorizontal","textAlignVertical","textAutoResize","textTruncation","maxLines","leadingTrim","paragraphSpacing","paragraphIndent","listSpacing","hangingList","fontVariations","fontFeatures","styleRuns","textParagraphs"],nE={styleRuns:"text",textParagraphs:"text"},_i=["width","height","minWidth","maxWidth","minHeight","maxHeight","targetAspectRatio","fills","strokes","effects","opacity","cornerRadius","topLeftRadius","topRightRadius","bottomRightRadius","bottomLeftRadius","independentCorners","layoutMode","layoutDirection","layoutWrap","primaryAxisAlign","counterAxisAlign","primaryAxisSizing","counterAxisSizing","itemSpacing","counterAxisSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","gridTemplateColumns","gridTemplateRows","gridColumnGap","gridRowGap","gridPosition","clipsContent","itemReverseZIndex","strokesIncludedInLayout","layoutGrids","blendMode","cornerSmoothing","strokeWeight","strokeAlign","strokeCap","strokeJoin","strokeMiterLimit","dashPattern","independentStrokeWeights","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight","boundVariables","variableModes","fillStyleId","strokeStyleId","textStyleId","effectStyleId","gridStyleId"],rE=["layoutGrow","layoutAlignSelf","locked"],Ph=["x","y","rotation","flipX","flipY","horizontalConstraint","verticalConstraint","layoutPositioning","counterAxisAlignContent","isMask","maskType","arcData","pointCount","starInnerRadius"],wh=[..._i,...Mh,...rE,"visible"],Is=[...wh,...Ph],kh=Object.freeze({listType:"NONE",indentation:0});function Dr(e){let t=[],n=0;for(let r=e.indexOf(`
`);r!==-1;r=e.indexOf(`
`,n))t.push({start:n,end:r}),n=r+1;return t.push({start:n,end:e.length}),t}function _u(e,t){let n=0,r=Math.min(t,e.length);for(let i=e.indexOf(`
`);i!==-1&&i<r;i=e.indexOf(`
`,i+1))n++;return n}function Li(e,t){return e[t]??kh}var Mr=["listSpacing","paragraphSpacing","paragraphIndent"];function _h(e){return Mr.some(t=>e[t]!==void 0)}function Lu(e,t,n){let{[t]:r,...i}=e;return n===void 0?i:{...i,[t]:n}}function Vu(e){return e.textParagraphs.some(t=>t.listType!=="NONE")}function Fu(e,t){let n=e.slice(0,t).map(r=>({...r}));for(;n.length>0;){let r=n[n.length-1];if(r.listType!=="NONE"||r.indentation!==0||_h(r))break;n.pop()}return n}function Gu(e,t){return e.listType==="NONE"?{...e,indentation:Math.max(0,Math.min(5,Math.round(t)))}:{...e,indentation:iE(t)}}function iE(e){return Math.max(1,Math.min(5,Math.round(e)))}function Ut(e,t){return e==null?null:e*t}function oE(e,t){return e.map(n=>({...structuredClone(n),weight:n.weight*t,dashPattern:n.dashPattern?.map(r=>r*t)}))}function sE(e,t){return e.map(n=>({...structuredClone(n),offset:{x:n.offset.x*t,y:n.offset.y*t},radius:n.radius*t,spread:n.spread*t}))}function aE(e,t){return e.map(n=>({...structuredClone(n),scale:n.scale==null?void 0:n.scale*t,spacing:n.spacing==null?void 0:n.spacing*t,patternSpacing:n.patternSpacing?{x:n.patternSpacing.x*t,y:n.patternSpacing.y*t}:void 0,noiseSize:n.noiseSize?{x:n.noiseSize.x*t,y:n.noiseSize.y*t}:void 0}))}function lE(e,t){return e.map(n=>({...structuredClone(n),style:{...structuredClone(n.style),fontSize:n.style.fontSize==null?void 0:n.style.fontSize*t,letterSpacing:n.style.letterSpacing==null?void 0:n.style.letterSpacing*t,lineHeight:Ut(n.style.lineHeight??null,t),textDecorationThickness:Ut(n.style.textDecorationThickness??null,t),textUnderlineOffset:Ut(n.style.textUnderlineOffset??null,t)}}))}function uE(e,t){return e.map(n=>{let r={...n};for(let i of Mr){let o=n[i];o!==void 0&&(r[i]=o*t)}return r})}function cE(e,t){return e.map(n=>({...structuredClone(n),offset:n.offset==null?void 0:n.offset*t,sectionSize:n.sectionSize==null?void 0:n.sectionSize*t,gutterSize:n.gutterSize==null?void 0:n.gutterSize*t}))}function ph(e,t){return e.map(n=>({...n,value:n.sizing==="FIXED"?n.value*t:n.value}))}function fE(e,t){if(!e.vectorNetwork)return null;let n=Ri(e.vectorNetwork);for(let r of n.vertices)r.x*=t,r.y*=t;for(let r of n.segments)r.tangentStart.x*=t,r.tangentStart.y*=t,r.tangentEnd.x*=t,r.tangentEnd.y*=t;return n}function Vi(e,t,n){return{x:n?e.x*t:e.x,y:n?e.y*t:e.y,width:e.width*t,height:e.height*t,minWidth:Ut(e.minWidth,t),maxWidth:Ut(e.maxWidth,t),minHeight:Ut(e.minHeight,t),maxHeight:Ut(e.maxHeight,t),cornerRadius:e.cornerRadius*t,topLeftRadius:e.topLeftRadius*t,topRightRadius:e.topRightRadius*t,bottomRightRadius:e.bottomRightRadius*t,bottomLeftRadius:e.bottomLeftRadius*t,fontSize:e.fontSize*t,letterSpacing:e.letterSpacing*t,lineHeight:Ut(e.lineHeight,t),textDecorationThickness:Ut(e.textDecorationThickness,t),textUnderlineOffset:Ut(e.textUnderlineOffset,t),styleRuns:lE(e.styleRuns,t),listSpacing:e.listSpacing*t,paragraphSpacing:e.paragraphSpacing*t,paragraphIndent:e.paragraphIndent*t,textParagraphs:uE(e.textParagraphs,t),itemSpacing:e.itemSpacing*t,counterAxisSpacing:e.counterAxisSpacing*t,paddingTop:e.paddingTop*t,paddingRight:e.paddingRight*t,paddingBottom:e.paddingBottom*t,paddingLeft:e.paddingLeft*t,gridColumnGap:e.gridColumnGap*t,gridRowGap:e.gridRowGap*t,gridTemplateColumns:ph(e.gridTemplateColumns,t),gridTemplateRows:ph(e.gridTemplateRows,t),strokes:oE(e.strokes,t),strokeWeight:e.strokeWeight*t,dashPattern:e.dashPattern.map(r=>r*t),borderTopWeight:e.borderTopWeight*t,borderRightWeight:e.borderRightWeight*t,borderBottomWeight:e.borderBottomWeight*t,borderLeftWeight:e.borderLeftWeight*t,strokeMiterLimit:e.strokeMiterLimit,effects:sE(e.effects,t),fills:aE(e.fills,t),layoutGrids:cE(e.layoutGrids,t),vectorNetwork:fE(e,t),fillGeometry:Cr(e.fillGeometry,t,t),strokeGeometry:Cr(e.strokeGeometry,t,t)}}var Ts=new Set(["opacity","width","height","minWidth","maxWidth","minHeight","maxHeight","x","y","rotation","cornerRadius","topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius","strokeWeight","borderTopWeight","borderBottomWeight","borderLeftWeight","borderRightWeight","fontSize","letterSpacing","lineHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","counterAxisSpacing","gridRowGap","gridColumnGap"]);function nn(e){return Ts.has(e)}var Bu=new Set(["text","fontFamily"]),Uu=new Set(["visible"]);function Lh(e,t){let n={...e.variableBindingScales},r={...e.variableAssignmentScales};for(let i of Ts)i==="opacity"||i==="rotation"||(i in e.boundVariables&&(n[i]=(n[i]??1)*t),e.type==="INSTANCE"&&(r[i]=(r[i]??1)*t));return{variableBindingScales:n,variableAssignmentScales:r}}function Vh(e){let t=e.targetAspectRatio;return!t||!(t.x>0)||!(t.y>0)||e.type==="TEXT"&&e.textAutoResize!=="NONE"?null:t.x/t.y}var mh=new Set(["STRETCH","SCALE"]);function hh(e,t,n){return n==="MAX"?{position:e.position+e.size-t,size:t}:n==="CENTER"?{position:e.position+(e.size-t)/2,size:t}:{position:e.position,size:t}}function dE(e,t,n,r,i){let o=mh.has(n);return i===null||o===mh.has(r)?{x:e,y:t}:o?{x:e,y:hh(t,e.size/i,r)}:{x:hh(e,t.size*i,n),y:t}}function gh(e,t,n,r,i){let o=Math.round(r)-Math.round(n);if(i==="MAX")return{position:e+o,size:t};if(i==="CENTER")return{position:e+Math.round(r/2)-Math.round(n/2),size:t};if(i==="STRETCH")return{position:e,size:Math.abs(t+o)};if(i==="SCALE"&&n>0){let s=r/n;return{position:Math.round(e*s*128)/128,size:t*s}}return{position:e,size:t}}function pE(e,t,n,r,i,o=null){let s=dE(gh(e.x,e.width,t.width,n.width,r),gh(e.y,e.height,t.height,n.height,i),r,i,o);return{x:s.x.position,y:s.y.position,width:s.x.size,height:s.y.size}}var mE=new Set(["x","y","width","height"]);function hE(e,t,n,r){let i={width:t.width*r,height:t.height*r};if(i.width===n.width&&i.height===n.height)return e;let o=pE(e,i,n,e.horizontalConstraint,e.verticalConstraint,Vh(e));return{...e,...o}}var gE=.001,yE=["strokes","strokeWeight","strokeAlign","strokeCap","strokeJoin","strokeMiterLimit","dashPattern"],Rr=(e,t)=>Math.abs(e-t)<=gE;function vE(e,t){if(!e||!t)return e===t;if(e.vertices.length!==t.vertices.length||e.segments.length!==t.segments.length)return!1;let n=e.vertices.every((i,o)=>{let{x:s,y:a,...l}=i,{x:u,y:c,...f}=t.vertices[o];return Rr(s,u)&&Rr(a,c)&&it(l,f)}),r=e.segments.every((i,o)=>{let s=t.segments[o];return i.start===s.start&&i.end===s.end&&Rr(i.tangentStart.x,s.tangentStart.x)&&Rr(i.tangentStart.y,s.tangentStart.y)&&Rr(i.tangentEnd.x,s.tangentEnd.x)&&Rr(i.tangentEnd.y,s.tangentEnd.y)});return n&&r&&it(e.regions,t.regions)}function IE(e,t,n){if(n.type!=="VECTOR")return;let r=e.width??t.width,i=e.height??t.height,o=n.width>0?r/n.width:1,s=n.height>0?i/n.height:1,a=o!==1||s!==1,l=g=>a?Au([o,0,0,0,s,0,0,0,1],g):Ri(g),u=n.vectorNetwork?l(n.vectorNetwork):null;if(vE(t.vectorNetwork,u))return;let c=g=>a?Cr(g,o,s):Vn(g),f=yE.every(g=>it(e[g]??t[g],n[g]));e.vectorNetwork=u,e.fillGeometry=c(n.fillGeometry),e.strokeGeometry=f?c(n.strokeGeometry):[]}function Bt(e,t,n){e[t]=n}function Ss(e,t,n){if(n==="fills")Bt(e,n,Ot(t.fills));else if(n==="strokes")Bt(e,n,Fn(t.strokes));else if(n==="effects")Bt(e,n,Di(t.effects));else if(n==="styleRuns")Bt(e,n,Mi(t.styleRuns));else if(n==="boundVariables")Bt(e,n,{...t.boundVariables}),Bt(e,"variableBindingScales",{...t.variableBindingScales});else if(n==="variableModes")Bt(e,n,{...t.variableModes});else if(n==="gridPosition")Bt(e,n,t.gridPosition?{...t.gridPosition}:null);else if(n==="targetAspectRatio")Bt(e,n,t.targetAspectRatio?{...t.targetAspectRatio}:null);else{let r=t[n];Bt(e,n,Array.isArray(r)?structuredClone(r):r)}}function Fh(e){let t=new Set;for(let n of e){let r=[...n].some(i=>i.startsWith("boundVariables/"));for(let i of n)(i!=="boundVariables"||!r)&&t.add(i)}return n=>t.has(n)}function Gh(e,t,n,r){if(r("boundVariables"))return;let i={...t.boundVariables},o={...t.variableBindingScales};for(let s of new Set([...Object.keys(t.boundVariables),...Object.keys(e.boundVariables),...Object.keys(e.variableBindingScales)]))r(`boundVariables/${s}`)&&(Object.hasOwn(e.boundVariables,s)?i[s]=e.boundVariables[s]:Reflect.deleteProperty(i,s),e.variableBindingScales[s]===void 0?Reflect.deleteProperty(o,s):o[s]=e.variableBindingScales[s]);n.boundVariables=i,n.variableBindingScales=o}function Bh(e,t,n){return n(t)||t in e.boundVariables&&(n("boundVariables")||n(`boundVariables/${t}`))}function bs(e,t){let n=t/e.componentScale;if(!Number.isFinite(n)||n<=0)throw new Error("Invalid component coordinate scale");return n===1?e:{...e,...Vi(e,n,!0),...Lh(e,n)}}function TE(e,t,n,{compParent:r,instParent:i,factor:o,skip:s}){let a=i.layoutMode!=="NONE"&&n.layoutPositioning!=="ABSOLUTE",l=a?n:hE(n,r,i,o);for(let u of Is){if(u==="boundVariables"||a&&(u==="x"||u==="y")||s(u))continue;let c=nE[u];if(c&&s(c))continue;let f=mE.has(u)?l:n;it(t[u],f[u])||Ss(e,f,u)}IE(e,t,n),Kb(e,t)}function Uh(e,t,n){let r=Object.fromEntries(Object.entries(n).filter(([i,o])=>!it(t[i],o)));Object.keys(r).length&&e.updateNode(t.id,r)}function zh(e,t,n,r,i="deep"){let o=t.componentScale*r.componentScale/n.componentScale;return e.createNode(t.type,r.id,{...Or(bs(t,o),t.id,i),componentScale:o})}function Pr(e,t,n,r="deep"){if(t===n||e.isDescendant(n,t))return;let i=e.nodes.get(t),o=e.nodes.get(n);if(!(!i||!o))for(let s of i.childIds){let a=e.nodes.get(s);if(!a)continue;let l=zh(e,a,i,o,r);a.childIds.length>0&&Pr(e,s,l.id,r)}}function Hh(e,t){let n=[],r=t.parentId?e.nodes.get(t.parentId):void 0;for(;r;)r.type==="INSTANCE"&&n.push(new Set(r.instanceOverrides.descendants.get(t.id)?.keys())),r=r.parentId?e.nodes.get(r.parentId):void 0;return n}var Wh={VISIBLE:"visible",TEXT:"text",INSTANCE_SWAP:"componentId"},SE=16;function bE(e,t,n){let r=t.componentId?e.nodes.get(t.componentId):void 0;for(let s=0;r?.type==="INSTANCE"&&s<SE;s++)r=r.componentId?e.nodes.get(r.componentId):void 0;let i=r?.parentId?e.nodes.get(r.parentId):void 0,o=i?.type==="COMPONENT_SET"?i:void 0;return[r,o].flatMap(s=>s?.componentPropertyDefinitions??[]).some(s=>s.id===n)}function zu(e,t,n){let r=t;for(;r;){if(r.type==="INSTANCE"){if(Object.hasOwn(r.componentPropertyAssignments,n))return r.componentPropertyAssignments[n];if(bE(e,r,n))return}r=r.parentId?e.nodes.get(r.parentId):void 0}}function EE(e,t,n){return zu(e,t,n)!==void 0}function $h(e,t){for(let n of t.componentPropertyReferences){let r=Wh[n.field];if(!r)continue;let i=zu(e,t,n.propertyId);i!==void 0&&(r==="visible"?e.updateNode(t.id,{visible:i==="true"}):r==="text"?e.updateNode(t.id,{text:i}):r==="componentId"&&t.type==="INSTANCE"&&e.nodes.has(i)&&e.swapInstanceComponent(t.id,i))}for(let n of e.getChildren(t.id))$h(e,n)}function AE(e,t,n){let r=new Set;for(let i of n.componentPropertyReferences){let o=Wh[i.field];o&&EE(e,t,i.propertyId)&&r.add(o)}return r}function xE(e,t,n){let r={};for(let i of n.componentPropertyReferences){let o=zu(e,t,i.propertyId);o!==void 0&&(i.field==="TEXT"&&t.type==="TEXT"?r.text=o:i.field==="VISIBLE"&&(r.visible=o==="true"))}return r}function NE(e,t,n){let r=Hh(e,t);return r.push(new Set(n.descendants.get(t.id)?.keys())),Fh(r)}function CE(e,t,n,r){n.type==="INSTANCE"?we(e,t,n.id,"sourceComponentId",r):n.componentId=r}function OE(e,t,n,r,i,o,s){let a=new Map,l=new Map,u=new Map;for(let c of t.childIds){if(o.has(c))continue;let f=e.nodes.get(c);f&&u.set(f.type,(u.get(f.type)??0)+1)}for(let c of n.childIds){let f=e.nodes.get(c);if(!f||s.has(f.id))continue;l.set(f.type,(l.get(f.type)??0)+1);let g=a.get(f.type);g||(g=new Map,a.set(f.type,g));let h=g.get(f.name);h?h.push(f):g.set(f.name,[f])}for(let c of t.childIds){if(o.has(c))continue;let f=e.nodes.get(c);if(!f)continue;let g=a.get(f.type),h=l.get(f.type)??0;if(h>(u.get(f.type)??0))continue;let d=g?.get(f.name)?.shift();d&&(l.set(f.type,h-1),o.set(c,d),s.add(d.id),CE(i,r,d,c))}}function RE(e,t,n,r,i){let o=new Map;for(let a=0;a<r.length;a++)o.set(r[a],a);let s=new Map;for(let a=0;a<t.childIds.length;a++){let l=t.childIds[a],u=e.nodes.get(l),c=u?Rt(i,n,u.id,"sourceComponentId"):void 0,f=typeof c=="string"?c:u?.componentId,g=f?o.get(f):void 0;s.set(l,g??r.length+a)}t.childIds.toSorted((a,l)=>(s.get(a)??0)-(s.get(l)??0)).forEach((a,l)=>{t.childIds[l]!==a&&e.insertChildAt(a,n,l)})}function DE(e,t,n){return t===n||e.isDescendant(n,t)}function ME(e,t,n,r,i,o,s){for(let a of t.childIds){let l=e.nodes.get(a);if(!l)continue;let u=Rt(r,n,l.id,"sourceComponentId"),c=typeof u=="string"?u:l.componentId;c&&i.has(c)&&(o.set(c,l),s.add(l.id))}}function PE(e,t,n,r,i,o){for(let s of r.values())o.matched.add(s.id);for(let s of t.childIds){if(r.has(s))continue;let a=Zb(e,o,s,n.id)??Qb(e,o,s,n.id);if(a){e.insertChildAt(a.id,n.id,n.childIds.length),r.set(s,a),i.add(a.id),o.matched.add(a.id);continue}let l=e.nodes.get(s);if(!l)continue;let u=zh(e,l,t,n);l.childIds.length>0&&!Oh(e,o,s)&&Pr(e,s,u.id),$h(e,u),r.set(s,u),i.add(u.id),o.matched.add(u.id)}for(let s of n.childIds)i.has(s)||o.leftovers.add(s)}function jh(e,t,n,r,i=xh(n,r)){if(DE(e,t,n))return;let o=e.nodes.get(t),s=e.nodes.get(n);if(!o||!s)return;let a=new Map,l=new Set;ME(e,s,n,r,new Set(o.childIds),a,l),OE(e,o,s,n,r,a,l),PE(e,o,s,a,l,i);for(let u of o.childIds){let c=e.nodes.get(u),f=a.get(u);if(!c||!f)continue;let g=NE(e,f,r),h=AE(e,f,c),d=c.componentScale*s.componentScale/o.componentScale,I=bs(c,d),T={componentScale:d,componentPropertyReferences:structuredClone(c.componentPropertyReferences)};Gh(f,I,T,g),TE(T,f,I,{compParent:o,instParent:s,factor:d/c.componentScale,skip:E=>h.has(E)||Bh(f,E,g)}),Object.assign(T,xE(e,f,c)),Th(e,T,f,I),Uh(e,f,T),c.childIds.length>0&&!Ci(r,n,f.id,"componentId")&&!An(e,f,vt(c))&&jh(e,u,f.id,r,i)}RE(e,s,n,o.childIds,r)}function Xh(e){let t={};for(let n of _i)Ss(t,e,n);return t}function Kh(e,t,n,r={}){let i=e.nodes.get(t);if(i?.type!=="COMPONENT"||!ku(e,t,n))return null;let o={...Xh(i),name:i.name},s=e.createNode("INSTANCE",n,{...o,...r,componentId:t});return Pr(e,i.id,s.id),s}function Yh(e,t,n,r="deep"){let i=e.nodes.get(t),o=e.nodes.get(n);!i||!o||i.type!=="INSTANCE"||Pr(e,n,t,r)}function wE(e,t,n){let r=t.parentId?Gn(e,t.parentId):void 0;r&&(typeof Rt(r.instanceOverrides,r.id,t.id,"sourceComponentId")!="string"&&t.componentId&&we(r.instanceOverrides,r.id,t.id,"sourceComponentId",t.componentId),we(r.instanceOverrides,r.id,t.id,"componentId",n),e.updateNode(r.id,{instanceOverrides:r.instanceOverrides}))}function qh(e,t,n,{keepName:r=!1}={}){let i=e.nodes.get(t),o=e.nodes.get(n);if(!i||o?.type!=="COMPONENT"||i.type!=="INSTANCE"||i.parentId&&!ku(e,n,i.parentId))return;let s=i.componentId?e.nodes.get(i.componentId):void 0;wE(e,i,n);let a={componentId:n},l=bs(o,i.componentScale);for(let f of _i)Ci(i.instanceOverrides,i.id,i.id,f)||Ss(a,l,f);!r&&(!s||i.name===s.name)&&(a.name=o.name);let u=Array.from(i.childIds),c=Eh(e,i);for(let f of u)e.deleteNode(f);e.updateNode(t,a),Pr(e,n,t),Ah(e,i,c)}var yh=new WeakMap;function Hu(e,t){Qh(e,t,Wu(e,t))}function Zh(e,t){Rh(e,()=>{for(let n of t)Hu(e,n)})}function Jh(e,t){let n=e.nodes.get(t);n?.type!=="INSTANCE"||!n.componentId||Qh(e,n.componentId,[n])}function Qh(e,t,n){let r=e.nodes.get(t);if(r?.type!=="COMPONENT")return;let i=yh.get(e);if(i||(i=new Set,yh.set(e,i)),!i.has(t)){i.add(t);try{Rh(e,o=>{for(let s of n){let a=Hh(e,s);a.push(new Set(s.instanceOverrides.self.keys()));let l=Fh(a),u=bs(r,s.componentScale),c={};Gh(s,u,c,l);for(let g of _i)g!=="boundVariables"&&(Bh(s,g,l)||Ss(c,u,g));Th(e,c,s,u),Uh(e,s,c);let f=xh(s.id,s.instanceOverrides);jh(e,r.id,s.id,s.instanceOverrides,f),eE(e,f,o)}})}finally{i.delete(t)}}}function eg(e,t){let n=e.nodes.get(t);n?.type==="INSTANCE"&&(n.componentId&&e.instanceIndex.get(n.componentId)?.delete(t),n.type="FRAME",n.componentId=null,Su(n.instanceOverrides))}function tg(e,t){let n=e.nodes.get(t);if(n?.componentId)return e.nodes.get(n.componentId)}function Wu(e,t){let n=e.instanceIndex.get(t);if(!n)return[];let r=[];for(let i of n){let o=e.nodes.get(i);o&&r.push(o)}return r}function Gn(e,t){let n=e.nodes.get(t);for(;n;){if(n.type==="INSTANCE")return n;n=n.parentId?e.nodes.get(n.parentId):void 0}}function Es(e,t,n){let r=Gn(e,t);return r?Ci(r.instanceOverrides,r.id,t,n):!1}var ng=["x","y","rotation","flipX","flipY"],rg=["width","height"];var ig=()=>[1,0,0,0,1,0,0,0,1],kE=(e,t)=>[e[0]*t[0]+e[1]*t[3]+e[2]*t[6],e[0]*t[1]+e[1]*t[4]+e[2]*t[7],e[0]*t[2]+e[1]*t[5]+e[2]*t[8],e[3]*t[0]+e[4]*t[3]+e[5]*t[6],e[3]*t[1]+e[4]*t[4]+e[5]*t[7],e[3]*t[2]+e[4]*t[5]+e[5]*t[8],e[6]*t[0]+e[7]*t[3]+e[8]*t[6],e[6]*t[1]+e[7]*t[4]+e[8]*t[7],e[6]*t[2]+e[7]*t[5]+e[8]*t[8]],_E=(...e)=>{if(e.length===0)return ig();let t=e[0].slice();for(let n=1;n<e.length;n++)t=kE(t,e[n]);return t},LE=(e,t)=>[1,0,e,0,1,t,0,0,1],VE=(e,t=0,n=0)=>{let r=Math.sin(e),i=Math.cos(e);return[i,-r,r*n+(1-i)*t,r,i,-r*t+(1-i)*n,0,0,1]},FE=(e,t,n=0,r=0)=>[e,0,n-e*n,0,t,r-t*r,0,0,1],GE=e=>{let t=e[0]*e[4]*e[8]+e[1]*e[5]*e[6]+e[2]*e[3]*e[7]-e[2]*e[4]*e[6]-e[1]*e[3]*e[8]-e[0]*e[5]*e[7];return t?[(e[4]*e[8]-e[5]*e[7])/t,(e[2]*e[7]-e[1]*e[8])/t,(e[1]*e[5]-e[2]*e[4])/t,(e[5]*e[6]-e[3]*e[8])/t,(e[0]*e[8]-e[2]*e[6])/t,(e[2]*e[3]-e[0]*e[5])/t,(e[3]*e[7]-e[4]*e[6])/t,(e[1]*e[6]-e[0]*e[7])/t,(e[0]*e[4]-e[1]*e[3])/t]:null},og=(e,t)=>{if(t.length%2)throw new Error("mapPoints requires even length [x,y,...].");let n=t.slice();for(let r=0;r<n.length;r+=2){let i=n[r],o=n[r+1],s=e[6]*i+e[7]*o+e[8],a=e[0]*i+e[1]*o+e[2],l=e[3]*i+e[4]*o+e[5];n[r]=a/s,n[r+1]=l/s}return n},BE=(e,t)=>{let n=og(e,[t.x,t.y]);return{x:n[0],y:n[1]}},je={identity:ig,multiply:_E,translated:LE,rotated:VE,scaled:FE,invert:GE,mapPoints:og,mapPoint:BE};function As(e,t){let n=[],r=e;for(;r&&(n.unshift(r),!!r.parentId);)r=t.getNode(r.parentId);let i=je.identity();for(let o of n){let s=xs(o);i=je.multiply(i,s)}return i}function sg(e,t){return!e||e.id===t.rootId?je.identity():As(e,t)}function ag(e,t){let n=As(e,t),r=je.mapPoints(n,[0,0]);return{x:r[0],y:r[1]}}function UE(e){return e.type==="LINE"?{x:0,y:0}:{x:e.width/2,y:e.height/2}}function xs(e,t=e){let n=je.translated(t.x,t.y);if((e.flipX||e.flipY)&&(n=je.multiply(n,je.scaled(e.flipX?-1:1,e.flipY?-1:1,e.width/2,e.height/2))),e.rotation){let r=UE(e);n=je.multiply(n,je.rotated(e.rotation*Math.PI/180,r.x,r.y))}return n}function lg(e,t,n){let r=je.invert(n);if(!r)return null;let i=je.multiply(r,t),[o,s,,a,l]=i,u=e.flipX?-1:1,c=o*l-s*a<0?-u:u,f=Math.atan2(c*a,u*o)*180/Math.PI;Math.abs(f)<1e-9&&(f=0);let g={rotation:f,flipX:u<0,flipY:c<0},h=xs({...e,...g},{x:0,y:0});return{...g,x:i[2]-h[2],y:i[5]-h[5]}}function $u(e){return e[0]===1&&e[1]===0&&e[3]===0&&e[4]===1}function ju(e){let t={},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],o=e[i];t[o]=i}return t}function Xu(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let o=r[i],s=e[o];n[o]=t(s,o,e)}return n}function It(e,t){let n={...e};for(let r=0;r<t.length;r++){let i=t[r];delete n[i]}return n}function Ns(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let o=r[i],s=o,a=e[s];t(a,o)||(n[s]=a)}return n}function Ku(e,t,n){let r=e[t].length,i=Object.keys(e.boundVariables).filter(o=>{if(o===t)return!0;if(!o.startsWith(`${t}/`))return!1;let s=Number.parseInt(o.split("/")[1]??"",10);return Number.isNaN(s)||s<0||s>=r});i.length!==0&&(e.boundVariables=It(e.boundVariables,i),n.boundVariables={...e.boundVariables})}var ug=()=>({emit(e,...t){for(let n=this.events[e]||[],r=0,i=n.length;r<i;r++)n[r](...t)},events:{},on(e,t){var n;return((n=this.events)[e]||(n[e]=[])).push(t),()=>{this.events[e]=this.events[e]?.filter(r=>t!==r)}}});var zE=class extends AggregateError{constructor(t){super(t,"Committed graph event delivery failed");le(this,"committed",!0);this.name="CommittedGraphEventError"}},cg=class{constructor(){le(this,"delegate",ug());le(this,"buffers",[])}get events(){return this.delegate.events}set events(e){this.delegate.events=e}on(e,t){return this.delegate.on(e,t)}emit(e,...t){let n=this.buffers.at(-1);n?n.push(()=>this.delegate.emit(e,...t)):this.delegate.emit(e,...t)}batch(e){let t=[];this.buffers.push(t);let n;try{n=e()}catch(i){throw this.buffers.pop(),i}this.buffers.pop();let r=this.buffers.at(-1);if(r)r.push(...t);else{let i=[];for(let o of t)try{o()}catch(s){i.push(s)}if(i.length)throw new zE(i)}return n}};function fg(e,t){let n=[t.created?e.on("node:created",t.created):null,t.updated?e.on("node:updated",t.updated):null,t.previewUpdated?e.on("node:previewUpdated",t.previewUpdated):null,t.deleted?e.on("node:deleted",t.deleted):null,t.reparented?e.on("node:reparented",t.reparented):null,t.reordered?e.on("node:reordered",t.reordered):null].filter(r=>!!r);return()=>{for(let r of n)r()}}var HE=new Set(["CANVAS","FRAME","GROUP","SECTION","COMPONENT","COMPONENT_SET","INSTANCE"]),WE=new Set(["COMPONENT","INSTANCE"]);function pg(e){return e.fills.some(t=>t.visible)||e.strokes.some(t=>t.visible)}function mg(e,t){let n=t.parentId?e.nodes.get(t.parentId):void 0;return n?.type==="CANVAS"||n?.type==="SECTION"}function Cs(e,t){return t.type==="FRAME"&&t.layoutMode!=="NONE"&&mg(e,t)}function hg(e,t,n){let r=n.get(e.id);if(r!==void 0)return r;let i=e.parentId?t.getNode(e.parentId):void 0,o=e.rotation!==0||e.flipX||e.flipY||(i?hg(i,t,n):!1);return n.set(e.id,o),o}function zt(e,t,n,r,i,o=0){if(!hg(n,r,i)){let c=r.getAbsolutePosition(n.id);return e>=c.x-o&&e<=c.x+n.width+o&&t>=c.y-o&&t<=c.y+n.height+o}let s=As(n,r),a=je.invert(s);if(!a)return!1;let[l,u]=je.mapPoints(a,[e,t]);return l>=-o&&l<=n.width+o&&u>=-o&&u<=n.height+o}function $E(e,t,n,r,i,o,s,a){return zt(t,n,r,e,s)&&(Bn(e,t,n,i,o,s,a)||pg(r))?r:null}function jE(e,t,n,r,i,o,s,a){if(r.type==="GROUP"){if(!zt(t,n,r,e,s,a))return null;let u=Bn(e,t,n,i,o,s,a);return u?o?u:r:zt(t,n,r,e,s)?r:null}let l=Bn(e,t,n,i,o,s,a);return l?r.locked?r:l:zt(t,n,r,e,s)&&(pg(r)||Cs(e,r))?r:null}function Bn(e,t,n,r,i=!1,o=new Map,s=0){let a=e.nodes.get(r);if(!a||a.clipsContent&&!zt(t,n,a,e,o))return null;for(let l=a.childIds.length-1;l>=0;l--){let u=a.childIds[l],c=e.nodes.get(u);if(!(!c||c.internalOnly||!c.visible)){if(HE.has(c.type)){if(WE.has(c.type)&&!i){let g=$E(e,t,n,c,u,i,o,s);if(g)return g;continue}let f=jE(e,t,n,c,u,i,o,s);if(f)return f;continue}if(zt(t,n,c,e,o,s))return c}}return null}function gg(e,t,n,r){return Bn(e,t,n,r??e.rootId,!1)}function yg(e,t,n,r,i=0){return Bn(e,t,n,r??e.rootId,!0,new Map,i)}function Fi(e,t){return t.type==="COMPONENT_SET"?!0:t.childIds.length===0?!1:t.type==="SECTION"?!0:t.type==="FRAME"&&mg(e,t)}function dg(e,t,n,r){let i=new Map;for(let o=t.childIds.length-1;o>=0;o--){let s=e.nodes.get(t.childIds[o]);if(!(!s||s.internalOnly||!s.visible||s.type!=="FRAME")&&!(Fi(e,s)&&!Cs(e,s))&&zt(n,r,s,e,i))return s}return null}function XE(e,t,n){let r=new Set;for(let i of t){let o=e.nodes.get(i);o&&o.childIds.length>0&&o.type!=="GROUP"&&o.type!=="BOOLEAN_OPERATION"&&r.add(i);let s=o?.parentId;for(;s&&s!==n&&!r.has(s);)r.add(s),s=e.nodes.get(s)?.parentId}return r}function vg(e,t,n,r,i,o=0){let s=Bn(e,t,n,r,!0,new Map,o);if(!s){let f=e.nodes.get(r);return f?dg(e,f,t,n):null}let a=[];for(let f=s;f&&f.id!==r;)a.unshift(f),f=f.parentId?e.nodes.get(f.parentId):void 0;let l=XE(e,i,r);for(let f of a)if(f.locked||!l.has(f.id)&&!Fi(e,f))return f;let u=a.at(-1);if(!u)return null;let c=dg(e,u,t,n);return c||(Cs(e,u)||l.has(u.id)&&!Fi(e,u)?u:null)}function Ig(e,t){let n=e.nodes.get(t);return n!==void 0&&Fi(e,n)}function Tg(e,t,n,r){let i=Bn(e,t,n,r,!0);for(let o=i??void 0;o&&o.id!==r;){if(!Fi(e,o)||Cs(e,o))return null;o=o.parentId?e.nodes.get(o.parentId):void 0}return i}function Sg(e,t,n,r){let i=e.nodes.get(t);return i!==void 0&&zt(n,r,i,e,new Map)}var KE=new Set(["FRAME","SECTION","COMPONENT","INSTANCE"]),YE=new Set(["FRAME","SECTION","INSTANCE"]);function qE(e){let{componentSetIds:t}=e;return t?{takes:n=>YE.has(n.type)||n.type==="COMPONENT_SET"&&t.has(n.id),passThrough:new Set(["GROUP"])}:{takes:n=>KE.has(n.type),passThrough:new Set(["GROUP","COMPONENT_SET"])}}function bg(e,t,n,r,i,o,s){if(r.type!=="CANVAS"&&r.clipsContent&&!zt(t,n,r,e,s))return null;for(let a=r.childIds.length-1;a>=0;a--){let l=r.childIds[a];if(i.has(l))continue;let u=e.nodes.get(l);if(!u||u.internalOnly||!u.visible||u.locked)continue;let c=o.takes(u);if(!c&&!o.passThrough.has(u.type))continue;let f=bg(e,t,n,u,i,o,s);if(f)return f;if(c&&zt(t,n,u,e,s))return u}return null}function Eg(e,t,n,r,i,o={}){let s=e.nodes.get(i??e.rootId);return s?bg(e,t,n,s,r,qE(o),new Map):null}function Yu(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n];r&&t.push(r)}return t}function Un(e,t){let n={};for(let r=0;r<e.length;r++){let i=e[r],o=t(i,r,e);Object.hasOwn(n,o)||(n[o]=[]),n[o].push(i)}return n}function qu(e,t){let n=[],r=[];for(let i=0;i<e.length;i++){let o=e[i];t(o,i,e)?n.push(o):r.push(o)}return[n,r]}var ZE=e=>e/2**32|0,JE=e=>e>>>0;function Ag(e,t,n,r){let i=ZE(n),o=JE(n);e.setUint32(t,r?o:i,r),e.setUint32(t+4,r?i:o,r)}function xg(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in e&&e.BYTES_PER_ELEMENT===1}var Zu=e=>e?`"${e}" `:"";function QE(e,t=""){if(typeof e!="number")throw new TypeError(Zu(t)+"expected number, got "+typeof e);if(!Number.isSafeInteger(e)||e<0)throw new RangeError(Zu(t)+"expected integer >= 0, got "+e);return e}function Os(e,t,n=""){if(xg(e)&&(t===void 0||e.length===t))return e;t!==void 0&&QE(t,"length");let r=xg(e),i=t!==void 0?` of length ${t}`:"",o=r?`length=${e.length}`:`type=${typeof e}`,s=Zu(n)+"expected Uint8Array"+i+", got "+o;throw r?new RangeError(s):new TypeError(s)}var eA=(e,t)=>{if(e===null||typeof e!="object"||Array.isArray(e))throw new TypeError((t==="object"?"":`"${t}" `)+"expected object, got type="+typeof e)},Ng=(e,t)=>{eA(e,t);let n=Object.getPrototypeOf(e);if(n!==Object.prototype&&n!==null)throw new TypeError(`"${t}" expected plain object`);if(Object.hasOwn(e,"__proto__"))throw new TypeError(`"${t}.__proto__" is not allowed`)};function Ju(e,t=!0){if(e.destroyed)throw new Error("hash was destroyed");if(t&&e.finished)throw new Error("digest() was already called")}function Cg(e,t){Os(e,void 0,"output");let n=t.outputLen;if(!(e.length>=n))throw new RangeError('"output" expected length >= '+n)}function Qu(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function Rs(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function Ds(e,t){return e<<t|e>>>32-t>>>0}var tA=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",nA=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function Og(e){if(Os(e),tA)return e.toHex();let t="";for(let n=0;n<e.length;n++)t+=nA[e[n]];return t}function rA(e,t,n="opts"){return Ng(e,"defaults"),t!==void 0&&Ng(t,n),Object.assign(Object.create(null),e,t)}function Rg(e,t={}){if(typeof e!="function")throw new TypeError('"hashCons" expected function, got type='+typeof e);t=rA({},t,"info");let n=(i,o)=>e(o).update(i).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=i=>e(i),Object.assign(n,t),Object.freeze(n)}function Dg(e,t,n){return e&t^~e&n}function Mg(e,t,n){return e&t^e&n^t&n}var Ms=class{constructor(t,n,r,i){le(this,"blockLen");le(this,"outputLen");le(this,"canXOF",!1);le(this,"padOffset");le(this,"isLE");le(this,"buffer");le(this,"view");le(this,"finished",!1);le(this,"length",0);le(this,"pos",0);le(this,"destroyed",!1);this.blockLen=t,this.outputLen=n,this.padOffset=r,this.isLE=i,this.buffer=new Uint8Array(t),this.view=Rs(this.buffer)}update(t){Ju(this),Os(t);let{view:n,buffer:r,blockLen:i}=this,o=t.length,s=!1;for(let a=0;a<o;){let l=Math.min(i-this.pos,o-a);if(l===i){let u=Rs(t);for(;i<=o-a;a+=i)this.process(u,a);s=!0;continue}r.set(a===0&&l===o?t:t.subarray(a,a+l),this.pos),this.pos+=l,a+=l,this.pos===i&&(this.process(n,0),this.pos=0,s=!0)}return this.length+=t.length,s&&this.roundClean(),this}digestInto(t){Ju(this),Cg(t,this),this.finished=!0;let{buffer:n,view:r,blockLen:i,isLE:o}=this,{pos:s}=this;n[s++]=128,n.fill(0,s),this.padOffset>i-s&&(this.process(r,0),n.fill(0)),Ag(r,i-8,this.length*8,o),this.process(r,0),this.roundClean();let a=t===n?r:Rs(t),l=this.outputLen,u=l/4,c=this.get();if(l%4||u>c.length)throw new Error("invalid outputLen");for(let f=0;f<u;f++)a.setUint32(4*f,c[f],o)}digest(){let{buffer:t,outputLen:n}=this;this.digestInto(t);let r=t.slice(0,n);return this.destroy(),r}_cloneIntoMeta(t){let{buffer:n,length:r,finished:i,destroyed:o,pos:s}=this;return t.destroyed=o,t.finished=i,t.length=r,t.pos=s,s&&t.buffer.set(n),t}clone(){return this._cloneInto()}};var Gi=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),xn=new Uint32Array(80),ec=class extends Ms{constructor(){super(64,20,8,!1);le(this,"A",Gi[0]|0);le(this,"B",Gi[1]|0);le(this,"C",Gi[2]|0);le(this,"D",Gi[3]|0);le(this,"E",Gi[4]|0)}get(){let{A:n,B:r,C:i,D:o,E:s}=this;return[n,r,i,o,s]}set(n,r,i,o,s){this.A=n|0,this.B=r|0,this.C=i|0,this.D=o|0,this.E=s|0}_cloneInto(n){return(n||(n=new this.constructor)).set(...this.get()),this._cloneIntoMeta(n)}process(n,r){for(let u=0;u<16;u++,r+=4)xn[u]=n.getUint32(r,!1);for(let u=16;u<80;u++)xn[u]=Ds(xn[u-3]^xn[u-8]^xn[u-14]^xn[u-16],1);let{A:i,B:o,C:s,D:a,E:l}=this;for(let u=0;u<80;u++){let c,f;u<20?(c=Dg(o,s,a),f=1518500249):u<40?(c=o^s^a,f=1859775393):u<60?(c=Mg(o,s,a),f=2400959708):(c=o^s^a,f=3395469782);let g=Ds(i,5)+c+l+f+xn[u]|0;l=a,a=s,s=Ds(o,30),o=i,i=g}i=i+this.A|0,o=o+this.B|0,s=s+this.C|0,a=a+this.D|0,l=l+this.E|0,this.set(i,o,s,a,l)}roundClean(){Qu(xn)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0),Qu(this.buffer)}},Pg=Rg(()=>new ec);function tc(e,t){let n=t,r=t;for(;r&&!(r.type==="COMPONENT"||r.type==="COMPONENT_SET");)r.type==="INSTANCE"&&(n=r),r=r.parentId?e.getNode(r.parentId):void 0;return n}function Fg(e,t,n){if(!nn(n))return;let r=tc(e,t);t.variableBindingScales={...t.variableBindingScales,[n]:r.variableAssignmentScales[n]??1}}function nc(e,t,n="active"){let r={};for(let[i,o]of Object.entries(t.boundVariables)){if(!Ts.has(i)||(i==="width"||i==="height")&&Es(e,t.id,i))continue;let s=e.resolveNumberVariableForNode(t.id,o,n);if(s===void 0||!Number.isFinite(s))continue;let a=s*(t.variableBindingScales[i]??1);if(!Number.isFinite(a))continue;let l=i==="opacity"?Math.max(0,Math.min(1,a)):a;t[i]!==l&&Object.assign(r,{[i]:l})}return r}function Ps(e){if(typeof e=="string")return e;if(typeof e=="boolean")return String(e);if(typeof e=="number"&&Number.isFinite(e))return lA(e)}var oA=-2147483648,sA=2147483647,aA=1e-6;function lA(e){let t=Math.round(e);if(Math.abs(e-t)<aA)return String(Math.min(sA,Math.max(oA,t))||0);let n=Math.abs(e)*100,r=Math.floor(n),i=n-r===.5?r+r%2:Math.round(n);return`${e<0?"-":""}${Math.floor(i/100)}.${String(i%100).padStart(2,"0")}`}function rc(e,t,n="active"){let r={},i=a=>{let l=t.boundVariables[a];if(!(!l||Es(e,t.id,a)))return e.resolveVariableForNode(t.id,l,n)},o=t.type==="TEXT"?Ps(i("text")):void 0;o!==void 0&&o!==t.text&&(r.text=o);let s=i("visible");return typeof s=="boolean"&&s!==t.visible&&(r.visible=s),r}var uA=["fontSize","fontWeight","letterSpacing","lineHeight"];function ic(e,t,n="active"){let r=t.styleRuns.map(i=>{let o=i.style.boundVariables;if(!o)return i;let s=i.style;for(let a of uA){let l=o[a];if(!l)continue;let u=e.resolveNumberVariableForNode(t.id,l,n);u===void 0||!Number.isFinite(u)||s[a]===u||(s={...s,[a]:u})}return s===i.style?i:{...i,style:s}});return r.some((i,o)=>i!==t.styleRuns[o])?{styleRuns:r}:{}}function wg(e,t){e.color={...t,a:1},e.opacity=t.a}function Bi(e,t,n="active"){let r={};for(let i in t.boundVariables){if(!i.endsWith("/color"))continue;let o=/^(fills|strokes)\/(\d+)\/color$/.exec(i);if(!o)continue;let s=e.resolveColorVariableForNode(t.id,t.boundVariables[i],n),a=Number(o[2]);if(s)if(o[1]==="fills"){if(!t.fills[a])continue;r.fills??(r.fills=Ot(t.fills)),wg(r.fills[a],s)}else{if(!t.strokes[a])continue;r.strokes??(r.strokes=Fn(t.strokes)),wg(r.strokes[a],s)}}return r}function Gg(e,t){e.variables.set(t.id,t);let n=e.variableCollections.get(t.collectionId);n&&!n.variableIds.includes(t.id)&&n.variableIds.push(t.id)}function Bg(e,t){let n=e.variables.get(t);if(!n)return;e.variables.delete(t);let r=e.variableCollections.get(n.collectionId);r&&(r.variableIds=r.variableIds.filter(i=>i!==t));for(let i of e.nodes.values())Object.values(i.boundVariables).includes(t)&&(e.willChangeNode(i),i.boundVariables=Ns(i.boundVariables,o=>o===t),i.variableBindingScales=Ns(i.variableBindingScales,(o,s)=>!(s in i.boundVariables)),e.emitter.emit("node:updated",i.id,{boundVariables:{...i.boundVariables},variableBindingScales:{...i.variableBindingScales}}),sc(e,i.id))}function Ug(e,t){e.variableCollections.set(t.id,t),e.activeMode.has(t.id)||e.activeMode.set(t.id,t.defaultModeId)}function cA(e,t){return t!==void 0?t:e==="COLOR"?{...Tn}:e==="FLOAT"?0:e==="BOOLEAN"?!1:""}function fA(e,t,n,r,i,o){let s=e.variableCollections.get(i);if(!s)throw new Error(`Collection "${i}" not found`);let a=t(),l=cA(r,o),u={};for(let f of s.modes)u[f.modeId]=structuredClone(l);let c={id:a,name:n,type:r,collectionId:i,valuesByMode:u,description:"",hiddenFromPublishing:!1};return Gg(e,c),c}function dA(e,t,n){let r=t(),i=t(),o={id:r,name:n,modes:[{modeId:i,name:"Mode 1"}],defaultModeId:i,variableIds:[]};return Ug(e,o),o}function pA(e,t){let n=e.variableCollections.get(t);if(n)for(let r of Array.from(n.variableIds))Bg(e,r);e.variableCollections.delete(t),e.activeMode.delete(t)}function oc(e,t){let n=e.activeMode.get(t);return n||(e.variableCollections.get(t)?.defaultModeId??"")}function ws(e,t,n,r="active"){let i=e.nodes.get(t);for(;i;){let o=i.variableModes[n];if(o)return o;i=i.parentId?e.nodes.get(i.parentId):void 0}return r==="default"?e.variableCollections.get(n)?.defaultModeId??"":oc(e,n)}function mA(e,t,n){e.activeMode.set(t,n)}function zg(e,t,n,r,i){let o=e.variableCollections.get(t);if(!o)return;o.modes.push({modeId:n,name:r});let s=i??o.defaultModeId;for(let a of o.variableIds){let l=e.variables.get(a);l&&(l.valuesByMode[n]=structuredClone(l.valuesByMode[s]??Object.values(l.valuesByMode)[0]))}}function hA(e,t,n,r,i){if(!e.variableCollections.has(n))return;let o=t();return zg(e,n,o,r,i),o}function gA(e,t,n){let r=e.variableCollections.get(t);if(!(!r||r.modes.length<=1)){r.modes=r.modes.filter(i=>i.modeId!==n),r.defaultModeId===n&&(r.defaultModeId=r.modes[0].modeId);for(let i of r.variableIds){let o=e.variables.get(i);o&&(o.valuesByMode=It(o.valuesByMode,[n]))}e.activeMode.get(t)===n&&e.activeMode.set(t,r.defaultModeId)}}function yA(e,t,n,r){let i=e.variableCollections.get(t);if(!i)return;let o=i.modes.find(s=>s.modeId===n);o&&(o.name=r)}function vA(e,t,n){let r=e.variableCollections.get(t);r&&r.modes.some(i=>i.modeId===n)&&(r.defaultModeId=n,r.modes=Hg(r))}function Hg(e){let[t,n]=qu(e.modes,r=>r.modeId===e.defaultModeId);return[...t,...n]}function zn(e,t,n,r){if(r?.has(t))return;let i=e.variables.get(t);if(!i)return;let o=e.variableCollections.get(i.collectionId),s=n??oc(e,i.collectionId),a=o?.defaultModeId,l=Object.hasOwn(i.valuesByMode,s)?i.valuesByMode[s]:void 0;if(l===void 0&&a&&Object.hasOwn(i.valuesByMode,a)&&(l=i.valuesByMode[a]),l??(l=Object.values(i.valuesByMode)[0]),l&&typeof l=="object"&&"aliasId"in l){let u=r??new Set;return u.add(t),zn(e,l.aliasId,s,u)}return l}function IA(e,t){let n=zn(e,t);if(n&&typeof n=="object"&&"r"in n)return n}function TA(e,t){let n=zn(e,t);return typeof n=="number"?n:void 0}function SA(e,t,n,r="active"){let i=e.variables.get(n);if(!i)return;let o=zn(e,n,ws(e,t,i.collectionId,r));if(o&&typeof o=="object"&&"r"in o)return o}function bA(e,t,n,r="active"){let i=e.variables.get(n);if(!i)return;let o=zn(e,n,ws(e,t,i.collectionId,r));return typeof o=="number"?o:void 0}function Wg(e,t,n,r="active"){let i=e.variables.get(n);if(i)return zn(e,n,ws(e,t,i.collectionId,r))}function EA(e,t,n,r="active"){let i=Wg(e,t,n,r);return typeof i=="string"?i:void 0}function AA(e,t){let n=e.variableCollections.get(t);return n?n.variableIds.map(r=>e.variables.get(r)).filter(r=>r!==void 0):[]}function xA(e,t){return[...e.variables.values()].filter(n=>n.type===t)}function NA(e,t,n,r){let i=e.nodes.get(t);if(!i)return;let o=e.variables.get(r);if(!o)throw new Error(`Variable "${r}" not found`);let s=n.match(/^(fills|strokes)\/(\d+)\/color$/);if(s){if(o.type!=="COLOR")throw new Error(`Cannot bind ${o.type} variable to color field "${n}"`);let a=s[1],l=Number.parseInt(s[2],10),u=i[a]?.length??0;if(l>=u)throw new Error(`Index ${l} out of range for ${a} (length ${u})`);let c=s[1];c in i.boundVariables&&(i.boundVariables=It(i.boundVariables,[c]))}if(nn(n)&&o.type!=="FLOAT")throw new Error(`Cannot bind ${o.type} variable to scalar field "${n}"`);if(Bu.has(n)&&o.type!=="STRING")throw new Error(`Cannot bind ${o.type} variable to string field "${n}"`);if(Uu.has(n)&&o.type!=="BOOLEAN")throw new Error(`Cannot bind ${o.type} variable to boolean field "${n}"`);if(!(nn(n)||Bu.has(n)||Uu.has(n)||s))throw new Error(`Unknown binding field "${n}"`);e.willChangeNode(i),i.boundVariables={...i.boundVariables,[n]:r},Fg(e,i,n),sc(e,t,n),e.emitter.emit("node:updated",t,{boundVariables:{...i.boundVariables},variableBindingScales:{...i.variableBindingScales}})}function CA(e,t,n){let r=e.nodes.get(t);r&&n in r.boundVariables&&(e.willChangeNode(r),r.boundVariables=It(r.boundVariables,[n]),r.variableBindingScales=It(r.variableBindingScales,[n]),sc(e,t,n),e.emitter.emit("node:updated",t,{boundVariables:{...r.boundVariables},variableBindingScales:{...r.variableBindingScales}}))}function sc(e,t,n){let r=e.nodes.get(t);if(!r)return;let i=tc(e,r);if(i.type!=="INSTANCE")return;let o=Gn(e,t);o&&we(o.instanceOverrides,o.id,t,"boundVariables"),we(i.instanceOverrides,i.id,t,"boundVariables"),n&&we(i.instanceOverrides,i.id,t,`boundVariables/${n}`,r.boundVariables[n]??null)}function ac(e,t){return e.map(n=>{let{boundVariables:r,textStyleId:i,fillStyleId:o,hyperlink:s}=n.style,a=s?.type==="NODE"&&t.node!==void 0;if(!r&&!i&&!o&&!a)return n;let l={...n.style};return s?.type==="NODE"&&t.node&&(l.hyperlink={type:"NODE",value:t.node(s.value)}),r&&(l.boundVariables=Xu(r,u=>u&&t.variable(u))),i&&(l.textStyleId=t.style(i)),o&&(l.fillStyleId=t.style(o)),{...n,style:l}})}var lc=2147483647;function uc(e){return e===null||e===1/0||(e??0)>=2147483647}function ks(e){let t=e.count===void 0?e.numSections:e.count;return uc(t)?lc:t??1}var kg=["DECIMAL","LOWER_ALPHA","LOWER_ROMAN"];function $g(e){return kg[(Math.max(1,e)-1)%kg.length]}function OA(e){let t="";for(let n=e;n>0;n=Math.floor((n-1)/26))t=String.fromCharCode(97+(n-1)%26)+t;return t}var RA=[[1e3,"m"],[900,"cm"],[500,"d"],[400,"cd"],[100,"c"],[90,"xc"],[50,"l"],[40,"xl"],[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]];function DA(e){let t=e,n="";for(let[r,i]of RA)for(;t>=r;t-=r)n+=i;return n}function jg(e,t){return t==="LOWER_ALPHA"?OA(e):t==="LOWER_ROMAN"?DA(e):String(e)}function cc(e,t){if(!t.some(o=>o.listType!=="NONE"))return[];let n=[],r=[],i=-1;for(let[o,s]of Dr(e).entries()){let a=Li(t,o);if(a.listType==="NONE"){r.length=0,i=-1;continue}let l=Math.max(1,a.indentation);r.length=Math.min(r.length,l);let u=r[l-1],c=u?.listType===a.listType,f=c?u.count+1:1;r[l-1]={listType:a.listType,count:f};let g=r.slice(0,l-1).some(d=>d!==void 0);(i===-1||!c&&!g)&&(i=o);let h=a.listType==="UNORDERED"?"\u2022":`${jg(f,$g(l))}.`;n.push({...s,paragraph:o,listType:a.listType,level:l,ordinal:f,marker:h,startsList:!c,groupStart:i})}return n}var Xg=["fontFamily","fontWeight","italic","fontSize","lineHeight","letterSpacing","textDecoration","textCase","fontFeatures"],MA=new Set(Xg);function Kg(e,t){let n={...t};return"fills"in t&&!("fillStyleId"in t)&&e.fillStyleId&&(n.fillStyleId=null),"strokes"in t&&!("strokeStyleId"in t)&&e.strokeStyleId&&(n.strokeStyleId=null),"effects"in t&&!("effectStyleId"in t)&&e.effectStyleId&&(n.effectStyleId=null),"layoutGrids"in t&&!("gridStyleId"in t)&&e.gridStyleId&&(n.gridStyleId=null),Object.keys(t).some(r=>MA.has(r))&&!("textStyleId"in t)&&e.textStyleId&&(n.textStyleId=null),n}var Yg=new Set([...ki,"textDecoration","fills","width","height"]),qg=new Set(ki);function Zg(e,t){let n={},r=Object.keys(t).filter(o=>!it(e[o],t[o]));e.textPicture&&r.some(o=>Yg.has(o))&&(n.textPicture=null);let i=r.some(o=>qg.has(o))||Du.some(o=>r.includes(o));return i&&!("derivedLayout"in t)&&(n.derivedLayout=null),e.derivedTextGlyphs&&i&&!t.derivedTextGlyphs&&(e.textPathData&&r.every(o=>o==="width"||o==="height")||(n.derivedTextGlyphs=null,n.textPathData=null)),n}function PA(e,t){Object.assign(e,Zg(e,t))}var wA=new Set(["x","y","width","height","rotation","flipX","flipY","parentId","childIds","layoutMode","layoutDirection","layoutWrap","primaryAxisSizing","counterAxisSizing","itemSpacing","counterAxisSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","layoutGrow","layoutAlignSelf","layoutPositioning","minWidth","maxWidth","minHeight","maxHeight","visible","text","fontSize","lineHeight","letterSpacing","styleRuns","textAutoResize"]);function kA(e,t,n,r){let i=e.nodes.get(t);if(!i||(n=Object.fromEntries(Object.entries(n).filter(([,s])=>s!==void 0)),Object.keys(n).every(s=>i[s]===n[s])))return null;Object.keys(n).some(s=>wA.has(s))&&e.clearAbsPosCache();let o=n;return i.type==="TEXT"&&(o={...Zg(i,n),...n}),n.vectorNetwork&&(o={...o,vectorNetwork:hs(n.vectorNetwork)}),r?.(i,o),e.positionPreviewVersion++,Object.assign(i,o),o}function _A(e,t){if(t.length===0)return;let n=new Set(e.source.editedFields);for(let r of t)n.add(r);e.source.editedFields=[...n]}var LA=2;function VA(){return LA+fh(2147483646)}var FA=VA(),GA=1;function _s(){return`${FA}:${GA++}`}function _g(e){let t={};for(let n of Object.keys(e)){let r=e[n];r!==void 0&&(t[n]=r)}return t}var rn,Ui=(rn=class{constructor(t=_s){le(this,"idGenerator");le(this,"nodes",new Map);le(this,"images",new Map);le(this,"variables",new Map);le(this,"variableCollections",new Map);le(this,"activeMode",new Map);le(this,"rootId");le(this,"figKiwiVersion",null);le(this,"figSchemaDeflated",null);le(this,"documentColorSpace","srgb");le(this,"enabledLibraries",new Map);le(this,"emitter",new cg);le(this,"absPosCache",new Map);le(this,"previewMutationDepth",0);le(this,"previewObservers",[]);le(this,"changeObservers",new Set);le(this,"sourceMetadataPreservationDepth",0);le(this,"importedStateApplicationDepth",0);le(this,"importedIdGenerator");le(this,"layoutMutationDepth",0);le(this,"derivedLayoutDepth",0);le(this,"positionPreviewVersion",0);le(this,"instanceIndex",new Map);this.idGenerator=t;let n=Nr(this.idGenerator,"FRAME",{name:"Document",width:0,height:0});this.rootId=n.id,this.nodes.set(n.id,n),this.addPage("Page 1")}addPage(t){return this.createNode("CANVAS",this.rootId,{name:t,width:0,height:0})}getPages(t=!1){return this.getChildren(this.rootId).filter(n=>n.type==="CANVAS"&&(t||!n.internalOnly))}getAllNodes(){return this.nodes.values()}getNode(t){return this.nodes.get(t)}onNodeEvents(t){return fg(this.emitter,t)}observeNodeChanges(t){return this.changeObservers.add(t),()=>this.changeObservers.delete(t)}willChangeNode(t){if(t)for(let n of this.changeObservers)n.before(t)}countDescendants(t){let n=this.nodes.get(t);if(!n)return 0;let r=0,i=[...n.childIds];for(;i.length>0;){let o=i.pop();if(o===void 0)break;r++;let s=this.nodes.get(o);if(s)for(let a of s.childIds)i.push(a)}return r}addVariable(t){Gg(this,t)}removeVariable(t){Bg(this,t)}addCollection(t){Ug(this,t)}createVariable(t,n,r,i){return fA(this,()=>this.generateEntityId(),t,n,r,i)}createCollection(t){let n=new Set;return dA(this,()=>this.generateEntityId(n),t)}createMode(t,n,r){return hA(this,()=>this.generateEntityId(),t,n,r)}removeCollection(t){pA(this,t)}getActiveModeId(t){return oc(this,t)}getNodeVariableModeId(t,n){return ws(this,t,n)}setActiveMode(t,n){mA(this,t,n)}addMode(t,n,r,i){zg(this,t,n,r,i)}removeMode(t,n){gA(this,t,n)}renameMode(t,n,r){yA(this,t,n,r)}setDefaultMode(t,n){vA(this,t,n)}resolveVariable(t,n,r){return zn(this,t,n,r)}resolveColorVariable(t){return IA(this,t)}resolveNumberVariable(t){return TA(this,t)}resolveColorVariableForNode(t,n,r){return SA(this,t,n,r)}resolveNumberVariableForNode(t,n,r){return bA(this,t,n,r)}resolveVariableForNode(t,n,r){return Wg(this,t,n,r)}resolveStringVariableForNode(t,n,r){return EA(this,t,n,r)}getVariablesForCollection(t){return AA(this,t)}getVariablesByType(t){return xA(this,t)}bindVariable(t,n,r){NA(this,t,n,r)}unbindVariable(t,n){CA(this,t,n)}getChildren(t){let n=this.nodes.get(t);return n?n.childIds.map(r=>this.nodes.get(r)).filter(r=>r!==void 0):[]}isContainer(t){let n=this.nodes.get(t);return n?Eu.has(n.type):!1}isDescendant(t,n){return this.closest(t,r=>r.id===n)!==void 0}closest(t,n){let r=this.nodes.get(t);for(let i=0;r&&i<this.nodes.size;i++){if(n(r))return r;r=r.parentId?this.nodes.get(r.parentId):void 0}}pageOf(t){return this.closest(t,n=>n.type==="CANVAS")?.id??null}clearAbsPosCache(){this.absPosCache.clear()}getAbsolutePosition(t){let n=this.absPosCache.get(t);if(n)return n;let r=this.getNode(t);if(!r)return{x:0,y:0};let i=ag(r,this);return this.absPosCache.set(t,i),i}getAbsoluteBounds(t){let n=this.getAbsolutePosition(t),r=this.nodes.get(t);return{x:n.x,y:n.y,width:r?.width??0,height:r?.height??0}}generateEntityId(t){let n=1/0;for(let r=0;r<n;r++){let i=(this.importedIdGenerator??this.idGenerator)();if(this.isEntityIdTaken(i)||t?.has(i)){n===1/0&&(n=this.entityIdCount()+(t?.size??0)+1);continue}return t?.add(i),i}throw new Error("The ID generator only returned IDs that are in use")}entityIdCount(){let t=this.nodes.size+this.variables.size+this.variableCollections.size;for(let n of this.variableCollections.values())t+=n.modes.length;return t}isEntityIdTaken(t){if(this.nodes.has(t)||this.variables.has(t)||this.variableCollections.has(t))return!0;for(let n of this.variableCollections.values())for(let r of n.modes)if(r.modeId===t)return!0;return!1}registerNode(t,n){t.parentId=n,this.nodes.set(t.id,t);for(let r of this.changeObservers)r.created(t);if(t.type==="INSTANCE"&&t.componentId){let r=this.instanceIndex.get(t.componentId);r||(r=new Set,this.instanceIndex.set(t.componentId,r)),r.add(t.id)}return this.emitter.emit("node:created",t),t}withBufferedEvents(t){return this.emitter.batch(t)}createNode(t,n,r={}){let i=Nr(()=>this.generateEntityId(),t,r),o=this.nodes.get(n);return this.willChangeNode(o),o?.childIds.push(i.id),this.registerNode(i,n)}createNodeWithId(t,n,r,i={}){let o=Nr(()=>t,n,i);o.id=t;let s=r?this.nodes.get(r):void 0;return s&&!s.childIds.includes(t)&&(this.willChangeNode(s),s.childIds.push(t)),this.registerNode(o,r)}runPreviewUpdates(t,n){this.previewMutationDepth++,n&&this.previewObservers.push(n);try{t()}finally{n&&this.previewObservers.pop(),this.previewMutationDepth--}}preserveSourceMetadataDuring(t){this.sourceMetadataPreservationDepth++;try{return t()}finally{this.sourceMetadataPreservationDepth--}}get isPreservingSourceMetadata(){return this.sourceMetadataPreservationDepth>0}applyImportedStateDuring(t,n){let r=this.importedIdGenerator;this.importedIdGenerator=n??r,this.importedStateApplicationDepth++;try{return this.preserveSourceMetadataDuring(t)}finally{this.importedStateApplicationDepth--,this.importedIdGenerator=r}}get isApplyingImportedState(){return this.importedStateApplicationDepth>0}applyDerivedLayoutDuring(t){this.derivedLayoutDepth++;try{t()}finally{this.derivedLayoutDepth--}}get isApplyingDerivedLayout(){return this.derivedLayoutDepth>0}withLayoutMutations(t){this.layoutMutationDepth++;try{t()}finally{this.layoutMutationDepth--}}get isApplyingLayout(){return this.layoutMutationDepth>0}updateNodePositionPreview(t,n,r){this.updateNodePreview(t,{x:n,y:r})}updateNodePreview(t,n){let r=kA(this,t,n,(i,o)=>{for(let s of this.previewObservers)s(i,o)});r&&this.emitter.emit("node:previewUpdated",t,r)}updateNode(t,n){if(this.previewMutationDepth>0){this.updateNodePreview(t,n);return}let r=this.nodes.get(t);r&&(n=_g(Kg(r,_g(n))),this.applyNodeChanges(r,n))}restoreNodeProperties(t,n,r){let i=this.nodes.get(t);i&&this.applyNodeChanges(i,n,r)}applyNodeChanges(t,n,r=[]){let{id:i}=t;if(this.willChangeNode(t),r.length){n={...n};for(let o of r)Reflect.set(n,o,void 0)}if(Object.keys(n).some(o=>rn.LAYOUT_AFFECTING_KEYS.has(o))&&this.absPosCache.clear(),t.type==="INSTANCE"&&"componentId"in n&&n.componentId!==t.componentId&&(t.componentId&&this.instanceIndex.get(t.componentId)?.delete(i),n.componentId)){let o=this.instanceIndex.get(n.componentId);o||(o=new Set,this.instanceIndex.set(n.componentId,o)),o.add(i)}t.type==="TEXT"&&PA(t,n),this.sourceMetadataPreservationDepth===0&&!this.isApplyingLayout&&_A(t,Object.keys(n)),n.vectorNetwork&&(n={...n,vectorNetwork:hs(n.vectorNetwork)}),Object.assign(t,n),n.fills&&Ku(t,"fills",n),n.strokes&&Ku(t,"strokes",n);for(let o of r)Reflect.deleteProperty(t,o);this.emitter.emit("node:updated",i,n)}reparentNode(t,n){let r=this.nodes.get(t);if(!r||t===this.rootId||this.isDescendant(n,t))return;let i=r.parentId?this.nodes.get(r.parentId):void 0,o=this.nodes.get(n);if(!o||r.parentId===n)return;let s=r.parentId;this.willChangeNode(r),this.willChangeNode(i),this.willChangeNode(o),this.absPosCache.clear();let a=this.parentWorldMatrix(i),l=this.parentWorldMatrix(o);if(i&&(i.childIds=i.childIds.filter(u=>u!==t)),r.parentId=n,o.childIds.push(t),$u(a)&&$u(l))r.x+=a[2]-l[2],r.y+=a[5]-l[5];else{let u=je.multiply(a,xs(r)),c=lg(r,u,l);c&&Object.assign(r,c)}this.emitter.emit("node:reparented",t,s,n)}parentWorldMatrix(t){return sg(t,this)}reorderChild(t,n,r){let i=this.nodes.get(t);if(!i)return;let o=i.parentId,s=o?this.nodes.get(o):void 0,a=this.nodes.get(n);if(!a||this.isDescendant(n,t))return;this.willChangeNode(i),this.willChangeNode(s),this.willChangeNode(a),s&&(s.childIds=s.childIds.filter(u=>u!==t));let l=r;s===a&&l>(s.childIds.includes(t)?s.childIds.length:l),i.parentId=n,this.absPosCache.clear(),l=Math.min(l,a.childIds.length),a.childIds.splice(l,0,t),this.emitter.emit("node:reordered",t,n,l,o)}insertChildAt(t,n,r){let i=this.getNode(t),o=this.getNode(n);if(!i||!o||t===n||this.isDescendant(n,t))return;let s=i.parentId,a=s?this.getNode(s):void 0;this.willChangeNode(i),this.willChangeNode(a),this.willChangeNode(o),a&&(a.childIds=a.childIds.filter(l=>l!==t)),o.childIds=o.childIds.filter(l=>l!==t),o.childIds.splice(r,0,t),i.parentId=n,this.clearAbsPosCache(),this.emitter.emit("node:reordered",t,n,r,s)}deleteNode(t){let n=this.nodes.get(t);if(!(!n||t===this.rootId)){if(this.willChangeNode(n),n.parentId){let r=this.nodes.get(n.parentId);this.willChangeNode(r),r&&(r.childIds=r.childIds.filter(i=>i!==t))}for(let r of Array.from(n.childIds))this.deleteNode(r);n.type==="INSTANCE"&&n.componentId&&this.instanceIndex.get(n.componentId)?.delete(t),this.nodes.delete(t),this.emitter.emit("node:deleted",t,n.parentId)}}hitTest(t,n,r){return gg(this,t,n,r)}hitTestDeep(t,n,r,i=0){return yg(this,t,n,r,i)}hitTestSelectable(t,n,r,i,o=0){return vg(this,t,n,r,i,o)}hitTestOpenContainer(t,n,r){return Tg(this,t,n,r)}isOpenContainer(t){return Ig(this,t)}isPointInNode(t,n,r){return Sg(this,t,n,r)}hitTestDropTarget(t,n,r,i,o){return Eg(this,t,n,r,i,o)}cloneTree(t,n,r={}){let i=this.nodes.get(t);if(!i)return null;let o=Or(i,null);o.source={...o.source,id:null,orderKey:null};let s=this.createNode(i.type,n,{...o,...r});for(let a of i.childIds)this.cloneTree(a,s.id);return s}createInstance(t,n,r={}){return Kh(this,t,n,r)}populateInstanceChildren(t,n,r="deep"){Yh(this,t,n,r)}swapInstanceComponent(t,n,r){qh(this,t,n,r)}syncInstances(t){Hu(this,t)}syncInstancesTogether(t){Zh(this,t)}syncInstance(t){Jh(this,t)}detachInstance(t){eg(this,t)}getMainComponent(t){return tg(this,t)}getInstances(t){return Wu(this,t)}flattenTree(t,n=0){let r=t??this.rootId,i=this.nodes.get(r);if(!i)return[];let o=[];for(let s of i.childIds){let a=this.nodes.get(s);a&&(o.push({node:a,depth:n}),a.childIds.length>0&&o.push(...this.flattenTree(s,n+1)))}return o}},le(rn,"TEXT_PICTURE_KEYS",Yg),le(rn,"GLYPH_AFFECTING_KEYS",qg),le(rn,"LAYOUT_AFFECTING_KEYS",new Set([...ng,...rg,"layoutMode","layoutDirection","itemSpacing","counterAxisSpacing","paddingLeft","paddingRight","paddingTop","paddingBottom","primaryAxisAlign","counterAxisAlign","counterAxisAlignContent","layoutWrap","primaryAxisSizing","counterAxisSizing","layoutPositioning","layoutGrow","layoutAlignSelf","strokesIncludedInLayout","horizontalConstraint","verticalConstraint","gridTemplateColumns","gridTemplateRows","gridColumnGap","gridRowGap","gridPosition","minWidth","maxWidth","minHeight","maxHeight","targetAspectRatio"])),rn);function Ls(e){return Og(Pg(e))}function Vs(e,t,n){return n==null?Math.min(e,t):Math.min(Math.max(e,t),n)}var Fs={100:"Thin",200:"Extra Light",300:"Light",400:"Regular",500:"Medium",600:"Semi Bold",700:"Bold",800:"Extra Bold",900:"Black"},BA=new Map([{weight:100,names:["thin","hairline","extrathin","ultrathin"]},{weight:200,names:["extralight","ultralight"]},{weight:300,names:["light"]},{weight:400,names:["regular","normal","book","roman","plain"]},{weight:500,names:["medium"]},{weight:600,names:["semibold","demibold"]},{weight:700,names:["bold"]},{weight:800,names:["extrabold","ultrabold"]},{weight:900,names:["black","heavy"]}].flatMap(({names:e,weight:t})=>e.map(n=>[n,t])));function Jg(e){return e.toLowerCase().replace(/italic|oblique/u,"").replace(/[^a-z0-9]+/gu,"")}function Qg(e){let t=e??"",n=/(?:italic|oblique)/iu.test(t),r=Jg(t),i=r.match(/(?:^|[^0-9])([1-9]00)(?:[^0-9]|$)/u)?.[1];return{weight:i?Number(i):BA.get(r)??400,italic:n}}function Gs(e){return Qg(e).weight}function zi(e){return e.replace(/\s+(Variable|\d+(?:pt|px|em))$/i,"")}function fc(e,t=!1){let n=Math.round(e/100)*100,r=(Fs[n]??"Regular").replace(/ /g,"");return t?`${r} Italic`:r}var ey=Kr(ri(),1);function ty(e,t="NONZERO",n={}){let r=ux(e,t,{includeOpenRegions:n.includeOpenRegions??!1,strictCommands:!1});return r.ok?r.network:{vertices:[],segments:[],regions:[]}}function ux(e,t,n){let r=[],i=[],o=[],s=null,a=0,l=0,u=new Map;function c(S,N){let A=`${S},${N}`,_=u.get(A);if(_!==void 0)return _;let C=r.length;return r.push({x:S,y:N}),u.set(A,C),C}function f(S,N,A,_,C,M,z,w){let ee=c(S,N),ie=c(A,_),Z=i.length;i.push({start:ee,end:ie,tangentStart:{x:C-S,y:M-N},tangentEnd:{x:z-A,y:w-_}}),s&&s.segmentIndices.push(Z)}function g(S,N,A,_){f(S,N,A,_,S,N,A,_)}function h(S,N,A,_,C,M,z,w){f(S,N,z,w,A,_,C,M)}let d=(0,ey.default)(e),I="err"in d&&typeof d.err=="string"?d.err:null;if(I)return{ok:!1,error:I};if(n.strictCommands){let S=new Set;d.iterate(A=>{["M","L","Q","C","Z"].includes(A[0])||S.add(A[0])});let N=S.values().next().value;if(N!==void 0)return{ok:!1,error:`Unsupported path command ${N}`}}d.abs().unshort().unarc().iterate(S=>{let N=S[0];if(N==="M")a=S[1],l=S[2],s={startVertexIndex:c(a,l),segmentIndices:[],closed:!1},o.push(s);else if(N==="L")g(a,l,S[1],S[2]),a=S[1],l=S[2];else if(N==="H")g(a,l,S[1],l),a=S[1];else if(N==="V")g(a,l,a,S[1]),l=S[1];else if(N==="C")h(a,l,S[1],S[2],S[3],S[4],S[5],S[6]),a=S[5],l=S[6];else if(N==="Q"){let A=S[1],_=S[2],C=S[3],M=S[4],z=a+2/3*(A-a),w=l+2/3*(_-l),ee=C+2/3*(A-C),ie=M+2/3*(_-M);h(a,l,z,w,ee,ie,C,M),a=C,l=M}else if((N==="Z"||N==="z")&&s){let A=r[s.startVertexIndex];(Math.abs(a-A.x)>.001||Math.abs(l-A.y)>.001)&&g(a,l,A.x,A.y),s.closed=!0,a=A.x,l=A.y}});let T=[],E=o.filter(S=>t!=="NONE"&&S.segmentIndices.length>0&&(S.closed||n.includeOpenRegions));return E.length>0&&t!=="NONE"&&T.push({windingRule:t,loops:E.map(S=>S.segmentIndices)}),{ok:!0,network:{vertices:r,segments:i,regions:T}}}var Hn={sessionID:4294967295,localID:4294967295};function Wn(e){return e.sessionID===Hn.sessionID&&e.localID===Hn.localID}function se(e){return`${e.sessionID}:${e.localID}`}function ct(e){let t=e.match(/^(?:VariableID:|VariableCollectionId:)?(\d+):(\d+)$/);if(t)return{sessionID:Number.parseInt(t[1],10),localID:Number.parseInt(t[2],10)};let[n,r]=e.split(":");return{sessionID:Number.parseInt(n,10),localID:Number.parseInt(r,10)}}var dc={min:3,max:60};function ny(e){let t={};for(let n of e.split(",").map(r=>r.trim())){let r=n.indexOf("=");r!==-1&&(t[n.slice(0,r).trim()]=n.slice(r+1).trim())}return t}var cx=ArrayBuffer,ke=Uint8Array,Bs=Uint16Array,fx=Int16Array;var Us=Int32Array,pc=function(e,t,n){if(ke.prototype.slice)return ke.prototype.slice.call(e,t,n);(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length);var r=new ke(n-t);return r.set(e.subarray(t,n)),r},Wi=function(e,t,n,r){if(ke.prototype.fill)return ke.prototype.fill.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;++n)e[n]=t;return e},dx=function(e,t,n,r){if(ke.prototype.copyWithin)return ke.prototype.copyWithin.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;)e[t++]=e[n++]};var px=["invalid zstd data","window size too large (>2046MB)","invalid block type","FSE accuracy too high","match distance too far back","unexpected EOF"],Ve=function(e,t,n){var r=new Error(t||px[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Ve),!n)throw r;return r},ry=function(e,t,n){for(var r=0,i=0;r<n;++r)i|=e[t++]<<(r<<3);return i},mx=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},hx=function(e,t){var n=e[0]|e[1]<<8|e[2]<<16;if(n==3126568&&e[3]==253){var r=e[4],i=r>>5&1,o=r>>2&1,s=r&3,a=r>>6;r&8&&Ve(0);var l=6-i,u=s==3?4:s,c=ry(e,l,u);l+=u;var f=a?1<<a:i,g=ry(e,l,f)+(a==1&&256),h=g;if(!i){var d=1<<10+(e[5]>>3);h=d+(d>>3)*(e[5]&7)}h>2145386496&&Ve(1);var I=new ke((t==1?g||h:t?0:h)+12);return I[0]=1,I[4]=4,I[8]=8,{b:l+f,y:0,l:0,d:c,w:t&&t!=1?t:I.subarray(12),e:h,o:new Us(I.buffer,0,3),u:g,c:o,m:Math.min(131072,h)}}else if((n>>4|e[3]<<20)==25481893)return mx(e,4)+8;Ve(0)},$n=function(e){for(var t=0;1<<t<=e;++t);return t-1},$i=function(e,t,n){var r=(t<<3)+4,i=(e[t]&15)+5;i>n&&Ve(3);for(var o=1<<i,s=o,a=-1,l=-1,u=-1,c=o,f=new cx(512+(o<<2)),g=new fx(f,0,256),h=new Bs(f,0,256),d=new Bs(f,512,o),I=512+(o<<1),T=new ke(f,I,o),E=new ke(f,I+o);a<255&&s>0;){var S=$n(s+1),N=r>>3,A=(1<<S+1)-1,_=(e[N]|e[N+1]<<8|e[N+2]<<16)>>(r&7)&A,C=(1<<S)-1,M=A-s-1,z=_&C;if(z<M?(r+=S,_=z):(r+=S+1,_>C&&(_-=M)),g[++a]=--_,_==-1?(s+=_,T[--c]=a):s-=_,!_)do{var w=r>>3;l=(e[w]|e[w+1]<<8)>>(r&7)&3,r+=2,a+=l}while(l==3)}(a>255||s)&&Ve(0);for(var ee=0,ie=(o>>1)+(o>>3)+3,Z=o-1,R=0;R<=a;++R){var U=g[R];if(U<1){h[R]=-U;continue}for(u=0;u<U;++u){T[ee]=R;do ee=ee+ie&Z;while(ee>=c)}}for(ee&&Ve(0),u=0;u<o;++u){var y=h[T[u]]++,O=E[u]=i-$n(y);d[u]=(y<<O)-o}return[r+7>>3,{b:i,s:T,n:E,t:d}]},gx=function(e,t){var n=0,r=-1,i=new ke(292),o=e[t],s=i.subarray(0,256),a=i.subarray(256,268),l=new Bs(i.buffer,268);if(o<128){var u=$i(e,t+1,6),c=u[0],f=u[1];t+=o;var g=c<<3,h=e[t];h||Ve(0);for(var d=0,I=0,T=f.b,E=T,S=(++t<<3)-8+$n(h);S-=T,!(S<g);){var N=S>>3;if(d+=(e[N]|e[N+1]<<8)>>(S&7)&(1<<T)-1,s[++r]=f.s[d],S-=E,S<g)break;N=S>>3,I+=(e[N]|e[N+1]<<8)>>(S&7)&(1<<E)-1,s[++r]=f.s[I],T=f.n[d],d=f.t[d],E=f.n[I],I=f.t[I]}++r>255&&Ve(0)}else{for(r=o-127;n<r;n+=2){var A=e[++t];s[n]=A>>4,s[n+1]=A&15}++t}var _=0;for(n=0;n<r;++n){var C=s[n];C>11&&Ve(0),_+=C&&1<<C-1}var M=$n(_)+1,z=1<<M,w=z-_;for(w&w-1&&Ve(0),s[r++]=$n(w)+1,n=0;n<r;++n){var C=s[n];++a[s[n]=C&&M+1-C]}var ee=new ke(z<<1),ie=ee.subarray(0,z),Z=ee.subarray(z);for(l[M]=0,n=M;n>0;--n){var R=l[n];Wi(Z,n,R,l[n-1]=R+a[n]*(1<<M-n))}for(l[0]!=z&&Ve(0),n=0;n<r;++n){var U=s[n];if(U){var y=l[U];Wi(ie,n,y,l[U]=y+(1<<M-U))}}return[t,{n:Z,b:M,s:ie}]},yx=$i(new ke([81,16,99,140,49,198,24,99,12,33,196,24,99,102,102,134,70,146,4]),0,6)[1],vx=$i(new ke([33,20,196,24,99,140,33,132,16,66,8,33,132,16,66,8,33,68,68,68,68,68,68,68,68,36,9]),0,6)[1],Ix=$i(new ke([32,132,16,66,102,70,68,68,68,68,36,73,2]),0,5)[1],iy=function(e,t){for(var n=e.length,r=new Us(n),i=0;i<n;++i)r[i]=t,t+=1<<e[i];return r},mc=new ke(new Us([0,0,0,0,16843009,50528770,134678020,202050057,269422093]).buffer,0,36),Tx=iy(mc,0),hc=new ke(new Us([0,0,0,0,0,0,0,0,16843009,50528770,117769220,185207048,252579084,16]).buffer,0,53),Sx=iy(hc,3),Hi=function(e,t,n){var r=e.length,i=t.length,o=e[r-1],s=(1<<n.b)-1,a=-n.b;o||Ve(0);for(var l=0,u=n.b,c=(r<<3)-8+$n(o)-u,f=-1;c>a&&f<i;){var g=c>>3,h=(e[g]|e[g+1]<<8|e[g+2]<<16)>>(c&7);l=(l<<u|h)&s,t[++f]=n.s[l],c-=u=n.n[l]}(c!=a||f+1!=i)&&Ve(0)},bx=function(e,t,n){var r=6,i=t.length,o=i+3>>2,s=o<<1,a=o+s;Hi(e.subarray(r,r+=e[0]|e[1]<<8),t.subarray(0,o),n),Hi(e.subarray(r,r+=e[2]|e[3]<<8),t.subarray(o,s),n),Hi(e.subarray(r,r+=e[4]|e[5]<<8),t.subarray(s,a),n),Hi(e.subarray(r),t.subarray(a),n)},Ex=function(e,t,n){var r,i=t.b,o=e[i],s=o>>1&3;t.l=o&1;var a=o>>3|e[i+1]<<5|e[i+2]<<13,l=(i+=3)+a;if(s==1)return i>=e.length?void 0:(t.b=i+1,n?(Wi(n,e[i],t.y,t.y+=a),n):Wi(new ke(a),e[i]));if(!(l>e.length)){if(s==0)return t.b=l,n?(n.set(e.subarray(i,l),t.y),t.y+=a,n):pc(e,i,l);if(s==2){var u=e[i],c=u&3,f=u>>2&3,g=u>>4,h=0,d=0;c<2?f&1?g|=e[++i]<<4|(f&2&&e[++i]<<12):g=u>>3:(d=f,f<2?(g|=(e[++i]&63)<<4,h=e[i]>>6|e[++i]<<2):f==2?(g|=e[++i]<<4|(e[++i]&3)<<12,h=e[i]>>2|e[++i]<<6):(g|=e[++i]<<4|(e[++i]&63)<<12,h=e[i]>>6|e[++i]<<2|e[++i]<<10)),++i;var I=n?n.subarray(t.y,t.y+t.m):new ke(t.m),T=I.length-g;if(c==0)I.set(e.subarray(i,i+=g),T);else if(c==1)Wi(I,e[i++],T);else{var E=t.h;if(c==2){var S=gx(e,i);h+=i-(i=S[0]),t.h=E=S[1]}else E||Ve(0);(d?bx:Hi)(e.subarray(i,i+=h),I.subarray(T),E)}var N=e[i++];if(N){N==255?N=(e[i++]|e[i++]<<8)+32512:N>127&&(N=N-128<<8|e[i++]);var A=e[i++];A&3&&Ve(0);for(var _=[vx,Ix,yx],C=2;C>-1;--C){var M=A>>(C<<1)+2&3;if(M==1){var z=new ke([0,0,e[i++]]);_[C]={s:z.subarray(2,3),n:z.subarray(0,1),t:new Bs(z.buffer,0,1),b:0}}else M==2?(r=$i(e,i,9-(C&1)),i=r[0],_[C]=r[1]):M==3&&(t.t||Ve(0),_[C]=t.t[C])}var w=t.t=_,ee=w[0],ie=w[1],Z=w[2],R=e[l-1];R||Ve(0);var U=(l<<3)-8+$n(R)-Z.b,y=U>>3,O=0,k=(e[y]|e[y+1]<<8)>>(U&7)&(1<<Z.b)-1;y=(U-=ie.b)>>3;var P=(e[y]|e[y+1]<<8)>>(U&7)&(1<<ie.b)-1;y=(U-=ee.b)>>3;var F=(e[y]|e[y+1]<<8)>>(U&7)&(1<<ee.b)-1;for(++N;--N;){var L=Z.s[k],G=Z.n[k],te=ee.s[F],j=ee.n[F],J=ie.s[P],B=ie.n[P];y=(U-=J)>>3;var ne=1<<J,H=ne+((e[y]|e[y+1]<<8|e[y+2]<<16|e[y+3]<<24)>>>(U&7)&ne-1);y=(U-=hc[te])>>3;var Y=Sx[te]+((e[y]|e[y+1]<<8|e[y+2]<<16)>>(U&7)&(1<<hc[te])-1);y=(U-=mc[L])>>3;var re=Tx[L]+((e[y]|e[y+1]<<8|e[y+2]<<16)>>(U&7)&(1<<mc[L])-1);if(y=(U-=G)>>3,k=Z.t[k]+((e[y]|e[y+1]<<8)>>(U&7)&(1<<G)-1),y=(U-=j)>>3,F=ee.t[F]+((e[y]|e[y+1]<<8)>>(U&7)&(1<<j)-1),y=(U-=B)>>3,P=ie.t[P]+((e[y]|e[y+1]<<8)>>(U&7)&(1<<B)-1),H>3)t.o[2]=t.o[1],t.o[1]=t.o[0],t.o[0]=H-=3;else{var de=H-(re!=0);de?(H=de==3?t.o[0]-1:t.o[de],de>1&&(t.o[2]=t.o[1]),t.o[1]=t.o[0],t.o[0]=H):H=t.o[0]}for(var C=0;C<re;++C)I[O+C]=I[T+C];O+=re,T+=re;var pe=O-H;if(pe<0){var be=-pe,Fe=t.e+pe;be>Y&&(be=Y);for(var C=0;C<be;++C)I[O+C]=t.w[Fe+C];O+=be,Y-=be,pe=0}for(var C=0;C<Y;++C)I[O+C]=I[pe+C];O+=Y}if(O!=T)for(;T<I.length;)I[O++]=I[T++];else O=I.length;n?t.y+=O:I=pc(I,0,O)}else if(n){if(t.y+=g,T)for(var C=0;C<g;++C)I[C]=I[T+C]}else T&&(I=pc(I,T));return t.b=l,I}Ve(2)}},Ax=function(e,t){if(e.length==1)return e[0];for(var n=new ke(t),r=0,i=0;r<e.length;++r){var o=e[r];n.set(o,i),i+=o.length}return n};function oy(e,t){for(var n=[],r=+!t,i=0,o=0;e.length;){var s=hx(e,r||t);if(typeof s=="object"){for(r?(t=null,s.w.length==s.u&&(n.push(t=s.w),o+=s.u)):(n.push(t),s.e=0);!s.l;){var a=Ex(e,s,t);a||Ve(5),t?s.e=s.y:(n.push(a),o+=a.length,dx(s.w,0,a.length),s.w.set(a,s.w.length-a.length))}i=s.b+s.c*4}else i=s;e=e.subarray(i)}return Ax(n,o)}var yc=new Int32Array(1),sy=new Float32Array(yc.buffer),xx=new TextDecoder,Dt=class{constructor(e){le(this,"_data");le(this,"_index");le(this,"length");if(e&&!(e instanceof Uint8Array))throw new Error("Must initialize a ByteBuffer with a Uint8Array");this._data=e||new Uint8Array(256),this._index=0,this.length=e?e.length:0}get offset(){return this._index}set offset(e){this._index=e}get bytes(){return this._data}toUint8Array(){return this._data.subarray(0,this.length)}readByte(){return this._data[this._index++]}readByteArray(){let e=this.readVarUint(),t=this._index;return this._index=t+e,this._data.slice(t,t+e)}skipByteArray(){let e=this.readVarUint();this._index+=e}readVarFloat(){let e=this._index,t=this._data,n=t[e];if(n===0)return this._index=e+1,0;let r=n|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24;return this._index=e+4,r=r<<23|r>>>9,yc[0]=r,sy[0]}readVarUint(){let e=this._data,t=this._index,n=e[t++],r=n&127;return n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<7,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<14,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<21,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<28,this._index=t,r>>>0))))}readVarInt(){let e=this.readVarUint()|0;return e&1?~(e>>>1):e>>>1}readVarUint64(){let e=BigInt(0),t=BigInt(0),n=BigInt(7),r=this.readByte();for(;r&128&&t<56;)e|=BigInt(r&127)<<t,t+=n,r=this.readByte();return e|=BigInt(r)<<t,e}readVarInt64(){let e=this.readVarUint64(),t=BigInt(1),n=e&t;return e>>=t,n?~e:e}readString(){let e=this._index,t=this.findStringTerminator(e);return this._index=t+1,xx.decode(this._data.subarray(e,t))}skipString(){this._index=this.findStringTerminator(this._index)+1}findStringTerminator(e){let t=this._data,n=e;for(;n<t.length&&t[n]!==0;)n++;if(n>=t.length)throw new Error("Unterminated string in Kiwi message");return n}_growBy(e){if(this.length+e>this._data.length){let t=new Uint8Array(this.length+e<<1);t.set(this._data),this._data=t}this.length+=e}writeByte(e){let t=this.length;this._growBy(1),this._data[t]=e}writeByteArray(e){if(!(e instanceof Uint8Array)&&!Array.isArray(e))throw new Error("Expected byte array");this.writeVarUint(e.length);let t=this.length;this._growBy(e.length),this._data.set(e,t)}writeVarFloat(e){let t=this.length;sy[0]=e;let n=yc[0];if(n=n>>>23|n<<9,(n&255)===0){this.writeByte(0);return}this._growBy(4);let r=this._data;r[t]=n,r[t+1]=n>>8,r[t+2]=n>>16,r[t+3]=n>>24}writeVarUint(e){if(e<0||e>4294967295)throw new Error("Outside uint range: "+e);do{let t=e&127;e>>>=7,this.writeByte(e?t|128:t)}while(e)}writeVarInt(e){if(e<-2147483648||e>2147483647)throw new Error("Outside int range: "+e);this.writeVarUint((e<<1^e>>31)>>>0)}writeVarUint64(e){if(typeof e=="string")e=BigInt(e);else if(typeof e!="bigint")throw new Error(`Expected bigint but got ${typeof e}: ${String(e)}`);if(e<0||e>BigInt("0xFFFFFFFFFFFFFFFF"))throw new Error("Outside uint64 range: "+e);let t=BigInt(127),n=BigInt(7);for(let r=0;e>t&&r<8;r++)this.writeByte(Number(e&t)|128),e>>=n;this.writeByte(Number(e))}writeVarInt64(e){if(typeof e=="string")e=BigInt(e);else if(typeof e!="bigint")throw new Error(`Expected bigint but got ${typeof e}: ${String(e)}`);if(e<-BigInt("0x8000000000000000")||e>BigInt("0x7FFFFFFFFFFFFFFF"))throw new Error("Outside int64 range: "+e);let t=BigInt(1);this.writeVarUint64(e<0?~(e<<t):e<<t)}writeString(e){let t;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(n+1===e.length||r<55296||r>=56320)t=r;else{let i=e.charCodeAt(++n);t=(r<<10)+i+-56613888}if(t===0)throw new Error("Cannot encode a string containing the null character");t<128?this.writeByte(t):(t<2048?this.writeByte(t>>6&31|192):(t<65536?this.writeByte(t>>12&15|224):(this.writeByte(t>>18&7|240),this.writeByte(t>>12&63|128)),this.writeByte(t>>6&63|128)),this.writeByte(t&63|128))}this.writeByte(0)}};function Ae(e){return JSON.stringify(e)}function Pe(e,t,n){var r=new Error(e);throw r.line=t,r.column=n,r}var fy=["bool","byte","float","int","int64","string","uint","uint64"],Nx=["ByteBuffer","package"],Cx=/((?:-|\b)\d+\b|[=;{}]|\[\]|\[deprecated\]|\b[A-Za-z_][A-Za-z0-9_]*\b|\/\/.*|\s+)/g,zs=/^[A-Za-z_][A-Za-z0-9_]*$/,Ox=/^\/\/.*|\s+$/,Rx=/^=$/,Dx=/^$/,ay=/^;$/,Mx=/^-?\d+$/,Px=/^\{$/,wx=/^\}$/,kx=/^\[\]$/,_x=/^enum$/,Lx=/^struct$/,Vx=/^message$/,Fx=/^package$/,Gx=/^\[deprecated\]$/;function Bx(e){let t=e.split(Cx),n=[],r=0,i=0;for(let o=0;o<t.length;o++){let s=t[o];o&1?Ox.test(s)||n.push({text:s,line:i+1,column:r+1}):s!==""&&Pe("Syntax error "+Ae(s),i+1,r+1);let a=s.split(`
`);a.length>1&&(r=0),i+=a.length-1,r+=a[a.length-1].length}return n.push({text:"",line:i,column:r}),n}function Ux(e){function t(){return e[a]}function n(l){return l.test(t().text)?(a++,!0):!1}function r(l,u){if(!n(l)){let c=t();Pe("Expected "+u+" but found "+Ae(c.text),c.line,c.column)}}function i(){let l=t();Pe("Unexpected token "+Ae(l.text),l.line,l.column)}let o=[],s=null,a=0;for(n(Fx)&&(s=t().text,r(zs,"identifier"),r(ay,'";"'));a<e.length&&!n(Dx);){let l=[],u;n(_x)?u="ENUM":n(Lx)?u="STRUCT":n(Vx)?u="MESSAGE":i();let c=t();for(r(zs,"identifier"),r(Px,'"{"');!n(wx);){let f=null,g=!1,h=!1;u!=="ENUM"&&(f=t().text,r(zs,"identifier"),g=n(kx));let d=t();r(zs,"identifier");let I=null;u!=="STRUCT"&&(r(Rx,'"="'),I=t(),r(Mx,"integer"),(+I.text|0)+""!==I.text&&Pe("Invalid integer "+Ae(I.text),I.line,I.column));let T=t();n(Gx)&&(u!=="MESSAGE"&&Pe("Cannot deprecate this field",T.line,T.column),h=!0),r(ay,'";"'),l.push({name:d.text,line:d.line,column:d.column,type:f,isArray:g,isDeprecated:h,value:I!==null?+I.text|0:l.length+1})}o.push({name:c.text,line:c.line,column:c.column,kind:u,fields:l})}return{package:s,definitions:o}}function zx(e){let t=fy.slice(),n={};for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o];t.includes(s.name)&&Pe("The type "+Ae(s.name)+" is defined twice",s.line,s.column),Nx.includes(s.name)&&Pe("The type name "+Ae(s.name)+" is reserved",s.line,s.column),t.push(s.name),n[s.name]=s}for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o],a=s.fields;if(s.kind==="ENUM"||a.length===0)continue;for(let u=0;u<a.length;u++){let c=a[u];t.includes(c.type)||Pe("The type "+Ae(c.type)+" is not defined for field "+Ae(c.name),c.line,c.column)}let l=[];for(let u=0;u<a.length;u++){let c=a[u];l.includes(c.value)&&Pe("The id for field "+Ae(c.name)+" is used twice",c.line,c.column),c.value<=0&&Pe("The id for field "+Ae(c.name)+" must be positive",c.line,c.column),l.push(c.value)}}let r={},i=o=>{let s=n[o];if(s&&s.kind==="STRUCT"&&(r[o]===1&&Pe("Recursive nesting of "+Ae(o)+" is not allowed",s.line,s.column),r[o]!==2&&s)){r[o]=1;let a=s.fields;for(let l=0;l<a.length;l++){let u=a[l];u.isArray||i(u.type)}r[o]=2}return!0};for(let o=0;o<e.definitions.length;o++)i(e.definitions[o].name)}function dy(e){let t=Ux(Bx(e));return zx(t),t}function Sc(e){let t=new Map(e.definitions.map(a=>[a.name,a])),n=new Map,r=a=>{let l=t.get(a);return l||Pe("Invalid type "+Ae(a),0,0),l},i=a=>{let l=n.get(a.name);return l||(l=new Map(a.fields.map(u=>[u.value,u])),n.set(a.name,l)),l},o=(a,l)=>{switch(a){case"bool":case"byte":l.readByte();return;case"int":case"uint":l.readVarUint();return;case"float":l.readVarFloat();return;case"string":l.skipString();return;case"int64":case"uint64":l.readVarUint64();return}let u=r(a);if(u.kind==="ENUM"){l.readVarUint();return}if(u.kind==="STRUCT"){for(let f of u.fields)s(f,l);return}let c=i(u);for(let f=l.readVarUint();f!==0;f=l.readVarUint()){let g=c.get(f);if(!g)throw new Error("Attempted to parse invalid message");s(g,l)}},s=(a,l)=>{let u=a.type;if(u===null&&Pe("Invalid type null for field "+Ae(a.name),a.line,a.column),!a.isArray){o(u,l);return}if(u==="byte"){l.skipByteArray();return}for(let c=l.readVarUint();c>0;c--)o(u,l)};return{definition:r,fieldsById:a=>i(r(a)),skipField:s,skipValue:o}}var py=Symbol("header bytes"),my=Symbol("header start"),hy=Symbol("header whole decoder"),vc=0;function bc(e){let t=Reflect.get(e,py),n=Reflect.get(e,my),r=Reflect.get(e,hy);if(!(t instanceof Uint8Array)||typeof n!="number"||typeof r!="function")return;let i=new Dt(t);return i.offset=n,r(i)}function gc(e,t,n){Reflect.defineProperty(e,t,{value:n,enumerable:!1})}function Hx(e){return t=>{vc++;try{return e(t)}finally{vc--}}}function Wx(e,t){return Object.hasOwn(e,t)}function $x(e){let t=Object.values(e);for(let n=0;n<t.length;n++){let r=t[n];if(r.kind!=="ENUM")for(let i=0;i<r.fields.length;i++){let o=r.fields[i],s=o.type;s===null&&Pe("Invalid type null for field "+Ae(o.name),o.line,o.column),!fy.includes(s)&&!Wx(e,s)&&Pe("Invalid type "+Ae(s)+" for field "+Ae(o.name),o.line,o.column)}}}function Hs(e,t,n,r){switch(n){case"bool":return!!r.readByte();case"byte":return r.readByte();case"int":return r.readVarInt();case"uint":return r.readVarUint();case"float":return r.readVarFloat();case"string":return r.readString();case"int64":return r.readVarInt64();case"uint64":return r.readVarUint64();default:{let i=t[n];return i||Pe("Invalid type "+Ae(n),0,0),i.kind==="ENUM"?e[i.name][r.readVarUint()]:(0,e["decode"+i.name])(r)}}}function ly(e,t,n,r,i){switch(n){case"bool":case"byte":i.writeByte(r);return;case"int":i.writeVarInt(r);return;case"uint":i.writeVarUint(r);return;case"float":i.writeVarFloat(r);return;case"string":i.writeString(r);return;case"int64":i.writeVarInt64(r);return;case"uint64":i.writeVarUint64(r);return;default:{let o=t[n];if(o||Pe("Invalid type "+Ae(n),0,0),o.kind==="ENUM"){let s=e[o.name][r];if(s===void 0)throw new Error("Invalid value "+JSON.stringify(r)+" for enum "+Ae(o.name));i.writeVarUint(s)}else(0,e["encode"+o.name])(r,i)}}}function uy(e,t,n,r,i){let o=n.type;if(o===null&&Pe("Invalid type null for field "+Ae(n.name),n.line,n.column),n.isArray){if(n.isDeprecated){if(o==="byte")r.readByteArray();else{let l=r.readVarUint();for(;l-- >0;)Hs(e,t,o,r)}return}if(o==="byte"){i[n.name]=r.readByteArray();return}let s=r.readVarUint(),a=Array.from({length:s});i[n.name]=a;for(let l=0;l<s;l++)a[l]=Hs(e,t,o,r);return}if(n.isDeprecated){Hs(e,t,o,r);return}i[n.name]=Hs(e,t,o,r)}function jx(e,t,n,r,i){let o=n.type;if(o===null&&Pe("Invalid type null for field "+Ae(n.name),n.line,n.column),n.isArray){if(o==="byte"){i.writeByteArray(r);return}let s=r;i.writeVarUint(s.length);for(let a=0;a<s.length;a++)ly(e,t,o,s[a],i);return}ly(e,t,o,r,i)}function cy(e,t,n,r){let i=new Map;for(let o=0;o<n.fields.length;o++)i.set(n.fields[o].value,n.fields[o]);return function(o){let s=o instanceof e.ByteBuffer?o:new e.ByteBuffer(o),a={};if(n.kind==="MESSAGE"){let l=r&&vc===0?r:void 0;for(l&&(gc(a,py,s.bytes),gc(a,my,s.offset),gc(a,hy,l.whole));;){let u=s.readVarUint();if(u===0)return a;let c=i.get(u);if(!c)throw new Error("Attempted to parse invalid message");l&&!l.keep.has(c.name)?l.skipper.skipField(c,s):uy(e,t,c,s,a)}}else{for(let l=0;l<n.fields.length;l++)uy(e,t,n.fields[l],s,a);return a}}}function Xx(e,t,n){return function(r,i){let o=!i,s=i||new e.ByteBuffer;for(let a=0;a<n.fields.length;a++){let l=n.fields[a];if(l.isDeprecated)continue;let u=r[l.name];if(u!=null)n.kind==="MESSAGE"&&s.writeVarUint(l.value),jx(e,t,l,u,s);else if(n.kind==="STRUCT")throw new Error("Missing required field "+Ae(l.name))}if(n.kind==="MESSAGE"&&s.writeVarUint(0),o)return s.toUint8Array()}}function ji(e,t){let n=Object.create(null);for(let o=0;o<e.definitions.length;o++)n[e.definitions[o].name]=e.definitions[o];$x(n);let r={ByteBuffer:Dt},i;for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o];switch(s.kind){case"ENUM":{let a={};for(let l=0;l<s.fields.length;l++){let u=s.fields[l];a[u.name]=u.value,a[u.value]=u.name}r[s.name]=a;break}case"STRUCT":case"MESSAGE":{let a=s.kind==="MESSAGE"?t?.[s.name]:void 0,l=a&&{keep:new Set(a),skipper:i??(i=Sc(e)),whole:Hx(cy(r,n,s))};r["decode"+s.name]=cy(r,n,s,l),r["encode"+s.name]=Xx(r,n,s);break}default:Pe("Invalid definition kind "+Ae(s.kind),s.line,s.column)}}return r}var Ic=["bool","byte","int","uint","float","string","int64","uint64"],Tc=["ENUM","STRUCT","MESSAGE"];function $s(e){let t=e instanceof Dt?e:new Dt(e),n=t.readVarUint(),r=[];for(let i=0;i<n;i++){let o=t.readString(),s=t.readByte(),a=t.readVarUint(),l=[];for(let u=0;u<a;u++){let c=t.readString(),f=t.readVarInt(),g=!!(t.readByte()&1),h=t.readVarUint();l.push({name:c,line:0,column:0,type:Tc[s]==="ENUM"?null:f,isArray:g,isDeprecated:!1,value:h})}r.push({name:o,line:0,column:0,kind:Tc[s],fields:l})}for(let i=0;i<n;i++){let o=r[i].fields;for(let s=0;s<o.length;s++){let a=o[s],l=a.type;if(l!==null&&l<0){if(~l>=Ic.length)throw new Error("Invalid type "+l);a.type=Ic[~l]}else{if(l!==null&&l>=r.length)throw new Error("Invalid type "+l);a.type=l===null?null:r[l].name}}}return{package:null,definitions:r}}function gy(e){let t=new Dt,n=e.definitions,r={};t.writeVarUint(n.length);for(let i=0;i<n.length;i++)r[n[i].name]=i;for(let i=0;i<n.length;i++){let o=n[i];t.writeString(o.name),t.writeByte(Tc.indexOf(o.kind)),t.writeVarUint(o.fields.length);for(let s=0;s<o.fields.length;s++){let a=o.fields[s],l=Ic.indexOf(a.type);t.writeString(a.name),t.writeVarInt(l===-1?r[a.type]:~l),t.writeByte(a.isArray?1:0),t.writeVarUint(a.value)}}return t.toUint8Array()}function yy(e){for(let t of e.definitions)Kx(t),t.kind==="ENUM"&&Yx(t)}function Kx(e){let t=new Set;for(let n of e.fields)t.has(n.name)&&Pe(`The field ${Ae(n.name)} is defined twice in ${Ae(e.name)}`,n.line,n.column),t.add(n.name)}function Yx(e){let t=new Set;for(let n of e.fields)t.has(n.value)&&Pe(`The enum value ${n.value} is used twice in ${Ae(e.name)}`,n.line,n.column),t.add(n.value)}var wr=dy(`enum MessageType {
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
`);yy(wr);var qx=new Uint8Array([40,181,47,253]);function Ec(e){return e.length>=4&&e[0]===40&&e[1]===181&&e[2]===47&&e[3]===253}var Ws=null;async function Ac(){Ws||(Ws=ji(wr))}function xc(){return gy(wr)}function Nc(e){if(!Ws)throw new Error("Codec not initialized. Call initCodec() first.");return Ws.encodeMessage(e)}function Jx(e){return new Map(e.fields.map(t=>[t.value,t]))}function Cc(e,t){let n=e.fields.get(t.name);return n||(n=Jx(t),e.fields.set(t.name,n)),n}function vy(e,t,n){switch(t.type){case"bool":case"byte":e.readByte();return;case"int":e.readVarInt();return;case"uint":e.readVarUint();return;case"float":e.readVarFloat();return;case"string":e.skipString();return;case"int64":e.readVarInt64();return;case"uint64":e.readVarUint64();return}let r=t.type?n.definitions.get(t.type):void 0;if(!r)throw new Error(`Invalid Kiwi field type: ${String(t.type)}`);if(r.kind==="ENUM"){e.readVarUint();return}Qx(e,r,n)}function js(e,t,n){if(!t.isArray){vy(e,t,n);return}if(t.type==="byte"){e.skipByteArray();return}let r=e.readVarUint();for(;r-- >0;)vy(e,t,n)}function Qx(e,t,n){if(t.kind==="STRUCT"){for(let i of t.fields)js(e,i,n);return}let r=Cc(n,t);for(;;){let i=e.readVarUint();if(i===0)return;let o=r.get(i);if(!o)throw new Error(`Invalid field ${i} in Kiwi ${t.name}`);js(e,o,n)}}function Iy(e,t,n){let r=e.readVarUint(),i=t.type?n.definitions.get(t.type):void 0;return i?.kind==="ENUM"?i.fields.find(o=>o.value===r)?.name??null:null}function eN(e,t,n){let r=Cc(n,t),i=null,o=null,s=null,a=null,l=null,u=null,c=null,f=null,g=!1;for(;;){let I=e.readVarUint();if(I===0)break;let T=r.get(I);if(!T)throw new Error(`Invalid field ${I} in Kiwi NodeChange`);switch(T.name){case"guid":i=e.readVarUint(),o=e.readVarUint();break;case"parentIndex":s=e.readVarUint(),a=e.readVarUint(),l=e.offset,e.skipString();break;case"phase":u=Iy(e,T,n);break;case"type":c=Iy(e,T,n);break;case"name":c==="DOCUMENT"||c==="CANVAS"?f=e.readString():e.skipString();break;case"internalOnly":g=!!e.readByte();break;default:js(e,T,n)}}if(c!=="DOCUMENT"&&c!=="CANVAS"||i===null||o===null)return null;let h=null;if(l!==null){let I=e.offset;e.offset=l,h=e.readString(),e.offset=I}let d=s===null||a===null?null:`${s}:${a}`;return{sourceId:`${i}:${o}`,parentId:d,position:h,phase:u,type:c,name:f??"Page",internalOnly:g}}function Ty(e,t){let n=new Map(e.definitions.map(c=>[c.name,c])),r={definitions:n,fields:new Map},i=n.get("Message"),o=n.get("NodeChange");if(i?.kind!=="MESSAGE"||o?.kind!=="MESSAGE")return[];let s=new Dt(t),a=Cc(r,i),l=[];for(;;){let c=s.readVarUint();if(c===0)break;let f=a.get(c);if(!f)throw new Error(`Invalid field ${c} in Kiwi Message`);if(f.name!=="nodeChanges"||!f.isArray){js(s,f,r);continue}let g=s.readVarUint();for(;g-- >0;){let h=eN(s,o,r);h&&l.push(h)}break}let u=l.find(c=>c.type==="DOCUMENT"&&c.phase!=="REMOVED")?.sourceId;return l.filter(c=>c.type==="CANVAS"&&c.phase!=="REMOVED"&&(!u||c.parentId===u)).sort((c,f)=>{let g=c.position??"",h=f.position??"";return g<h?-1:g>h?1:0}).map(({sourceId:c,name:f,position:g,internalOnly:h})=>({sourceId:c,name:f,position:g,internalOnly:h}))}function Oc(e){let t=Math.floor(e/94),n=String.fromCharCode(33+e%94);return"~".repeat(t)+n}function Nn(e,t){if(e!==null&&t!==null&&e>=t)return null;let n=e??"",r=t??"",i=0;for(;i<n.length&&i<r.length&&n[i]===r[i];)i++;let o=i<n.length?n.charCodeAt(i):32,s=t!==null&&i<t.length?t.charCodeAt(i):127;if(s-o>1)return n.slice(0,i)+String.fromCharCode(Math.floor((o+s)/2));if(i<n.length)return n.slice(0,i+1)+(Nn(n.slice(i+1),null)??"O");let a=t?.slice(i+1)??"";return!t||a===""?null:t.slice(0,i+1)+(Nn(null,a)??"")}function tN(e,t,n){for(let r=Nn(e,t);r!==null;r=Nn(r,t)){if(r+n<t)return r+n;if(!t.startsWith(r))return null}return null}function nN(e,t,n=""){let r=Nn(e,t);return r===null?(Nn(e,null)??"O")+n:n?t===null?r+n:tN(e,t,n)??r:r}function rN(e,t){return Nn(e,t)!==null}function iN(e){let t=[],n=new Map;for(let i=0;i<e.length;i++){let o=e[i];if(!o)continue;let s=0,a=t.length;for(;s<a;){let l=s+a>>1;(e[t[l]]??"")<o?s=l+1:a=l}s===0&&i>0&&!rN(null,o)||(s>0&&n.set(i,t[s-1]),t[s]=i)}let r=new Set;for(let i=t.at(-1);i!==void 0;i=n.get(i))r.add(i);return r}function Sy(e,t={}){let n=[],r=null,i=[],o=(u,c,f)=>{if(t.suffix){let h=nN(c,f,t.suffix());return f===null||h<f?h:null}let g=Oc(u);return(c===null||g>c)&&(f===null||g<f)?g:Nn(c,f)},s=u=>{let c=[],f=r;for(let g of i){let h=o(g,f,u);if(h===null)return null;c.push(h),f=h}return c},a=iN(e);for(let u=0;u<e.length;u++){let c=e[u],f=c&&a.has(u)?s(c):null;c&&f?(i.forEach((g,h)=>n[g]=f[h]),n[u]=c,r=c,i=[]):i.push(u)}let l=s(null)??[];return i.forEach((u,c)=>n[u]=l[c]),n}function Rc(e){if(new TextDecoder().decode(e.slice(0,8))!=="fig-kiwi")return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=12,r=[];for(;n<e.length;){let i=t.getUint32(n,!0);n+=4,r.push(e.slice(n,n+i)),n+=i}return r.length>=2?r:null}function Dc(e,t,n=101){let r,i=globalThis.Bun?.zstdCompressSync;i?r=i(t):r=Qr(t);let o=16+e.length+4+r.length,s=new Uint8Array(o),a=new DataView(s.buffer);s.set(new TextEncoder().encode("fig-kiwi"),0),a.setUint32(8,n,!0);let l=12;return a.setUint32(l,e.length,!0),l+=4,s.set(e,l),l+=e.length,a.setUint32(l,r.length,!0),l+=4,s.set(r,l),s}function Uy(e){switch(e){case"FRAME":return"FRAME";case"RECTANGLE":return"RECTANGLE";case"ROUNDED_RECTANGLE":return"ROUNDED_RECTANGLE";case"ELLIPSE":return"ELLIPSE";case"TEXT":return"TEXT";case"LINE":return"LINE";case"STAR":return"STAR";case"POLYGON":return"REGULAR_POLYGON";case"VECTOR":return"VECTOR";case"BOOLEAN_OPERATION":return"BOOLEAN_OPERATION";case"GROUP":return"FRAME";case"SECTION":return"SECTION";case"COMPONENT":return"SYMBOL";case"COMPONENT_SET":return"FRAME";case"INSTANCE":return"INSTANCE";case"CONNECTOR":return"CONNECTOR";case"SHAPE_WITH_TEXT":return"SHAPE_WITH_TEXT";default:return"RECTANGLE"}}function zy(e){let t=e.flipX?-1:1,n=Math.cos(e.rotation*Math.PI/180),r=Math.sin(e.rotation*Math.PI/180),i=n*t,o=-r*t,s=r,a=n,l=e.width/2,u=e.height/2;return{m00:i,m01:o,m02:e.x+l-i*l-o*u,m10:s,m11:a,m12:e.y+u-s*l-a*u}}function oN(e){if(!e||typeof e!="object")return!1;let t=e;return Number.isFinite(t.sessionID)&&Number.isFinite(t.localID)}function by(e,t){return e?`fig-guide:${e.sessionID}:${e.localID}`:`guide:${t}`}function Hy(e){if(!Array.isArray(e))return[];let t=[];for(let[n,r]of e.entries()){if(!r||typeof r!="object")continue;let i=r;if(typeof i.offset!="number"||!Number.isFinite(i.offset))continue;let o=oN(i.guid)?i.guid:void 0;i.axis==="X"?t.push({id:by(o,n),axis:"x",position:i.offset,...o?{figGuid:o}:{}}):i.axis==="Y"&&t.push({id:by(o,n),axis:"y",position:i.offset,...o?{figGuid:o}:{}})}return t}function Wy(e){return e.map(t=>({axis:t.axis==="x"?"X":"Y",offset:t.position,...t.figGuid?{guid:t.figGuid}:{}}))}function sN(e,t){let n=e.baselines??[];if(e.logicalIndexToCharacterOffsetMap?.length!==t.length+1||n.length!==1)return!1;let r=n[0].position.y;return(e.glyphs??[]).every(i=>(i.rotation??0)===0&&i.position.y===r)}function $y(e,t,n){if(!e||sN(e,n))return[];let r=[],i=e.truncationStartIndex??-1,o=e.glyphs??[];for(let s of i>=0?o.slice(0,i):o){let a=s.commandsBlob===void 0?void 0:t[s.commandsBlob];if(!a)return[];let l=s.advance*s.fontSize;r.push({commandsBlob:a,x:s.position.x,y:s.position.y,fontSize:s.fontSize,firstCharacter:s.firstCharacter,rotation:s.rotation,advance:Number.isFinite(l)?l:void 0})}return r}var aN=new Set((wr.definitions.find(e=>e.name==="OpenTypeFeature")?.fields??[]).map(e=>e.name)),jy=[["fontVariantCommonLigatures","LIGA"],["fontVariantContextualLigatures","CALT"],["fontVariantDiscretionaryLigatures","DLIG"],["fontVariantHistoricalLigatures","HLIG"],["fontVariantOrdinal","ORDN"],["fontVariantSlashedZero","ZERO"]],lN=[["fontVariantNumericFigure",{LINING:"LNUM",OLDSTYLE:"ONUM"}],["fontVariantNumericSpacing",{PROPORTIONAL:"PNUM",TABULAR:"TNUM"}],["fontVariantNumericFraction",{DIAGONAL:"FRAC",STACKED:"AFRC"}],["fontVariantCaps",{SMALL:"SMCP",PETITE:"PCAP",ALL_SMALL:["SMCP","C2SC"],ALL_PETITE:["PCAP","C2PC"],UNICASE:"UNIC",TITLING:"TITL"}]],uN=Object.fromEntries(jy.map(([e,t])=>[t,e])),cN={LNUM:{field:"fontVariantNumericFigure",value:"LINING"},ONUM:{field:"fontVariantNumericFigure",value:"OLDSTYLE"},PNUM:{field:"fontVariantNumericSpacing",value:"PROPORTIONAL"},TNUM:{field:"fontVariantNumericSpacing",value:"TABULAR"},FRAC:{field:"fontVariantNumericFraction",value:"DIAGONAL"},AFRC:{field:"fontVariantNumericFraction",value:"STACKED"},SMCP:{field:"fontVariantCaps",value:"SMALL"},PCAP:{field:"fontVariantCaps",value:"PETITE"},C2SC:{field:"fontVariantCaps",value:"ALL_SMALL"},C2PC:{field:"fontVariantCaps",value:"ALL_PETITE"},UNIC:{field:"fontVariantCaps",value:"UNICASE"},TITL:{field:"fontVariantCaps",value:"TITLING"}};function Xi(e,t,n){let r=t.toUpperCase();e.some(i=>i.tag===r)||e.push({tag:r,enabled:n})}function Wc(e){let t=[];for(let[n,r]of jy){let i=e[n];i!==void 0&&Xi(t,r,i)}for(let[n,r]of lN){let i=r[String(e[n])];if(Array.isArray(i))for(let o of i)Xi(t,o,!0);else i&&Xi(t,i,!0)}for(let n of e.toggledOnOTFeatures??[])Xi(t,n,!0);for(let n of e.toggledOffOTFeatures??[])Xi(t,n,!1);return t}function fN(e,t,n,r,i,o){let s=uN[t];if(s){e[s]=n;return}let a=cN[t];if(a){n?(e[a.field]=a.value,o.delete(a.field)):e[a.field]===void 0&&o.set(a.field,"NORMAL");return}aN.has(t)&&(n?r.push(t):i.push(t))}function $c(e,t){let n=[],r=[],i=new Map;for(let o of t)fN(e,o.tag.toUpperCase(),o.enabled,n,r,i);for(let o of i.keys())e[o]="NORMAL";n.length>0&&(e.toggledOnOTFeatures=n),r.length>0&&(e.toggledOffOTFeatures=r)}function Xy(e){return String.fromCharCode(e>>24&255,e>>16&255,e>>8&255,e&255)}function Ky(e){if(e.length===4)return(e.charCodeAt(0)<<24|e.charCodeAt(1)<<16|e.charCodeAt(2)<<8|e.charCodeAt(3))>>>0}function jc(e){let t=[];for(let n of e.fontVariations??[]){if(typeof n.value!="number")continue;let r=typeof n.axisTag=="number"?Xy(n.axisTag):n.axisName||"";r&&t.push({axis:r,value:n.value})}return t}function Yy(e){if(e.length%2!==0)throw new Error("Hex string must contain an even number of characters");let t=new Uint8Array(e.length/2);for(let n=0;n<t.length;n++){let r=Number.parseInt(e.slice(n*2,n*2+2),16);if(Number.isNaN(r))throw new Error("Hex string contains invalid characters");t[n]=r}return t}var dN=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function Xc(e){if(typeof e.toHex=="function")return e.toHex();let t=Array.from({length:e.length},()=>"");for(let n=0;n<e.length;n++)t[n]=dN[e[n]];return t.join("")}function Js(e){return{r:e.r,g:e.g,b:e.b,a:"a"in e?e.a:1}}function Yi(e){let t={type:e.type,color:Js(e.color),opacity:e.opacity,visible:e.visible,blendMode:e.blendMode??"NORMAL"};return e.gradientStops&&(t.stops=e.gradientStops.map(n=>({color:Js(n.color),position:n.position}))),e.gradientTransform&&(t.transform=e.gradientTransform),e.imageHash&&(t.image={hash:Yy(e.imageHash)}),e.imageScaleMode&&(t.imageScaleMode=e.imageScaleMode),e.imageTransform&&(t.transform=e.imageTransform),e.sourceNodeId&&(t.sourceNodeId=ct(e.sourceNodeId)),e.scale&&(t.scale=e.scale),e.spacing&&(t.spacing=e.spacing),e.patternSpacing&&(t.patternSpacing=e.patternSpacing),e.patternTileType&&(t.patternTileType=e.patternTileType),e.verticalAlignment&&(t.verticalAlignment=e.verticalAlignment),e.horizontalAlignment&&(t.horizontalAlignment=e.horizontalAlignment),e.noiseType&&(t.noiseType=e.noiseType),e.density!==void 0&&(t.density=e.density),e.noiseSize&&(t.noiseSize=e.noiseSize),e.customEffectId&&(t.customEffectId={guid:ct(e.customEffectId)}),t}function Kc(e){return e?{r:e.r??0,g:e.g??0,b:e.b??0,a:e.a??1}:{...Tn}}function pN(e){return Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>e[Number(t)]).map(t=>t.toString(16).padStart(2,"0")).join("")}function qy(e){if(e)return{m00:e.m00,m01:e.m01,m02:e.m02,m10:e.m10,m11:e.m11,m12:e.m12}}var Ey=null;function mN(e){let t=e.colorVar?.value?.alias;if(!(!t||!Ey))return Ey(t)??void 0}function hN(e){let t=mN(e);return t?{color:{...t,a:e.color?.a??1},opacity:e.opacity??t.a}:{color:Kc(e.color),opacity:e.opacity??1}}function gN(e){let{color:t,opacity:n}=hN(e);return{type:e.type,color:t,opacity:n,visible:e.visible??!0,blendMode:e.blendMode??"NORMAL"}}function yN(e,t){!t.type.startsWith("GRADIENT")||!t.stops||(e.gradientStops=t.stops.map(n=>({color:Kc(n.color),position:n.position})),t.transform&&(e.gradientTransform=qy(t.transform)))}function vN(e,t){if(t.type==="IMAGE"){if(t.image&&typeof t.image=="object"){let n=t.image;typeof n.hash=="object"?e.imageHash=pN(n.hash):typeof n.hash=="string"&&(e.imageHash=n.hash)}e.imageScaleMode=t.imageScaleMode??"FILL",t.transform&&(e.imageTransform=qy(t.transform))}}function IN(e,t){t.sourceNodeId&&(e.sourceNodeId=se(t.sourceNodeId)),t.scale&&(e.scale=t.scale),t.spacing&&(e.spacing=t.spacing),t.patternSpacing&&(e.patternSpacing=t.patternSpacing),t.patternTileType&&(e.patternTileType=t.patternTileType),t.verticalAlignment&&(e.verticalAlignment=t.verticalAlignment),t.horizontalAlignment&&(e.horizontalAlignment=t.horizontalAlignment),t.noiseType&&(e.noiseType=t.noiseType),t.density!==void 0&&(e.density=t.density),t.noiseSize&&(e.noiseSize=t.noiseSize),t.customEffectId?.guid&&(e.customEffectId=se(t.customEffectId.guid))}function Zy(e){let t=gN(e);return yN(t,e),vN(t,e),IN(t,e),t}function _r(e){return e?e.map(Zy):[]}function Yc(e){return e==="INSIDE"||e==="OUTSIDE"?e:"CENTER"}function Jy(e,t,n,r,i,o){if(!e)return[];let s=Yc(n);return e.map(a=>({...Zy(a),weight:t??1,align:s,cap:r??"NONE",join:i??"MITER",dashPattern:o??[]}))}function Qy(e){return e?e.map(t=>({type:t.type,color:Kc(t.color),offset:t.offset??{x:0,y:0},radius:t.radius??0,spread:t.spread??0,visible:t.visible??!0,blendMode:t.blendMode??"NORMAL",showShadowBehindNode:t.showShadowBehindNode??!0})):[]}function Ay(e,t,n){return t===0&&n===0?e:wi(e,1,0,0,1,t,n)}function TN(e,t,n){let r=[...e.fillGeometry??[],...e.strokeGeometry??[]],i=r.length>0?ms(r):null,o=i?.x??0,s=i?.y??0,a=i?i.x+i.width:t,l=i?i.y+i.height:n;for(let c of e.derivedTextGlyphs??[]){let f=c.fontSize||0;o=Math.min(o,c.x-f*.25),s=Math.min(s,c.y-f),a=Math.max(a,c.x+f),l=Math.max(l,c.y+f*.35)}let u=1;return{left:Math.max(0,-o+(o<0?u:0)),top:Math.max(0,-s+(s<0?u:0)),right:Math.max(0,a-t+(a>t?u:0)),bottom:Math.max(0,l-n+(l>n?u:0))}}function SN(e,t,n){e.strokeGeometry&&e.strokeGeometry.length>0&&(e.strokeGeometry=Ay(e.strokeGeometry,t,n)),e.fillGeometry&&e.fillGeometry.length>0&&(e.fillGeometry=Ay(e.fillGeometry,t,n)),e.derivedTextGlyphs?.length&&(e.derivedTextGlyphs=e.derivedTextGlyphs.map(r=>({...r,x:r.x+t,y:r.y+n})))}function bN(e,t){if(e.nodeType!=="TEXT"||!t)return;e.textPathData=t;let n=e.width??0,r=e.height??0;e.textPathBox={x:0,y:0,width:n,height:r};let i=TN(e,n,r);if(i.left===0&&i.top===0&&i.right===0&&i.bottom===0)return;let o=i.left,s=i.top;e.x=(e.x??0)-o,e.y=(e.y??0)-s,e.width=n+i.left+i.right,e.height=r+i.top+i.bottom,(o!==0||s!==0)&&(e.textPathBox={x:o,y:s,width:n,height:r},SN(e,o,s))}var EN=new Set(["width","height"]),AN=new Set(["x","y","rotation","flipX","flipY"]),Oe=["textData","derivedTextData","textUserLayoutVersion","textExplicitLayoutVersion"],Mt=["strokeGeometry","vectorData"],xN={fillStyleId:["styleIdForFill"],strokeStyleId:["styleIdForStrokeFill"],textStyleId:["styleIdForText"],effectStyleId:["styleIdForEffect"],gridStyleId:["styleIdForGrid"],fills:["fillPaints","backgroundPaints","backgroundColor"],strokes:["strokePaints"],effects:["effects"],blendMode:["blendMode"],layoutGrids:["layoutGrids"],guides:["guides"],exportSettings:["exportSettings"],cornerRadius:["cornerRadius"],independentCorners:["rectangleCornerRadiiIndependent"],topLeftRadius:["rectangleTopLeftCornerRadius","rectangleCornerRadiiIndependent"],topRightRadius:["rectangleTopRightCornerRadius","rectangleCornerRadiiIndependent"],bottomLeftRadius:["rectangleBottomLeftCornerRadius","rectangleCornerRadiiIndependent"],bottomRightRadius:["rectangleBottomRightCornerRadius","rectangleCornerRadiiIndependent"],cornerSmoothing:["cornerSmoothing"],borderTopWeight:["borderTopWeight",...Mt],borderRightWeight:["borderRightWeight",...Mt],borderBottomWeight:["borderBottomWeight",...Mt],borderLeftWeight:["borderLeftWeight",...Mt],independentStrokeWeights:["borderStrokeWeightsIndependent","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight",...Mt],strokeWeight:["strokeWeight",...Mt],strokeAlign:["strokeAlign",...Mt],strokeJoin:["strokeJoin",...Mt],strokeMiterLimit:["miterLimit",...Mt],strokeCap:[...Mt],dashPattern:[...Mt],text:[...Oe],styleRuns:[...Oe],fontSize:["fontSize",...Oe],fontFamily:["fontName","fontVersion",...Oe],fontWeight:["semanticWeight",...Oe],italic:["semanticItalic",...Oe],textAlignHorizontal:["textAlignHorizontal",...Oe],textAlignVertical:["textAlignVertical",...Oe],lineHeight:["lineHeight",...Oe],letterSpacing:["letterSpacing","textTracking",...Oe],textAutoResize:["textAutoResize",...Oe],textDecorationStyle:["textDecorationStyle",...Oe],textDecorationThickness:["textDecorationThickness",...Oe],textDecorationFills:["textDecorationFillPaints",...Oe],textUnderlineOffset:["textUnderlineOffset",...Oe],leadingTrim:["leadingTrim",...Oe],maxLines:["maxLines",...Oe],textParagraphs:[...Oe],listSpacing:["listSpacing",...Oe],paragraphSpacing:["paragraphSpacing",...Oe],paragraphIndent:["paragraphIndent",...Oe],hangingList:["hangingList",...Oe],fontVariations:["fontVariations",...Oe],fontFeatures:["fontVariantCommonLigatures","fontVariantContextualLigatures","toggledOnOTFeatures","toggledOffOTFeatures",...Oe],minWidth:["minSize"],minHeight:["minSize"],maxWidth:["maxSize"],maxHeight:["maxSize"],vectorNetwork:["vectorData","fillGeometry","strokeGeometry"],fillGeometry:["fillGeometry","vectorData"],strokeGeometry:["strokeGeometry","vectorData"],isMask:["mask"],maskType:["maskType"],maskIsOutline:["maskIsOutline"],componentPropertyDefinitions:["componentPropDefs"],componentPropertyReferences:["componentPropRefs"],componentPropertyAssignments:["componentPropAssignments"],variantPropSpecs:["variantPropSpecs"]};function qc(e=[]){return new Set(e.flatMap(t=>xN[t]??[]))}function et(e){let t=qc(e.source.editedFields??[]);return t.size===0?e.source.fig.rawNodeFields:Object.fromEntries(Object.entries(e.source.fig.rawNodeFields).filter(([n])=>!t.has(n)))}function ta(e){let t=e.source.editedFields??[];return{...e.source.fig,rawNodeFields:et(e),rawSize:t.some(n=>EN.has(n))?null:e.source.fig.rawSize,rawTransform:t.some(n=>AN.has(n))?null:e.source.fig.rawTransform}}function e0(e,t){if(!qc(e.source.editedFields??[]).has(t))return e.source.fig.rawNodeFields[t]}function NN(e){return Object.getPrototypeOf(e)===Object.prototype}function kc(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>kc(n));if(!NN(e))return structuredClone(e);let t={};for(let n of Object.keys(e))t[n]=kc(e[n]);return t}function qi(e){return kc(e)}var t0=64;function Qi(e,t=0){if(t>t0)throw new Error("Variable expression exceeds maximum depth");let n=e?.value;if(e?.dataType==="EXPRESSION"&&!n?.expressionValue)throw new Error("Missing variable expression value");if(!n)return;if(n.alias)return{multiplier:1,reference:n.alias};if(typeof n.floatValue=="number"&&Number.isFinite(n.floatValue))return{multiplier:n.floatValue};let r=n.expressionValue;if(r){if(r.expressionFunction==="STRINGIFY")return CN(r);if(r.expressionFunction!=="MULTIPLY"||!r.expressionArguments?.length)throw new Error(`Unsupported variable expression ${r.expressionFunction}`);return ON(r.expressionArguments,t)}}function CN(e){let t=e.expressionArguments??[],n=t.length===1?t[0].value?.alias:void 0;if(!n)throw new Error("Variable expression STRINGIFY must wrap one alias");return{multiplier:1,reference:n}}function ON(e,t){let n={multiplier:1};for(let r of e){let i=Qi(r,t+1);if(!i||n.reference&&i.reference)throw new Error("Variable expression is not a constant multiplied by one alias");n.multiplier*=i.multiplier,i.reference&&(n.reference=i.reference)}if(!Number.isFinite(n.multiplier))throw new Error("Variable expression has a non-finite multiplier");return n}function Zc(e,t,n=0){if(n>t0)throw new Error("Variable expression exceeds maximum depth");e?.value?.alias&&t(e.value.alias);for(let r of e?.value?.expressionValue?.expressionArguments??[])Zc(r,t,n+1)}var na={cornerRadius:"CORNER_RADIUS",topLeftRadius:"RECTANGLE_TOP_LEFT_CORNER_RADIUS",topRightRadius:"RECTANGLE_TOP_RIGHT_CORNER_RADIUS",bottomLeftRadius:"RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS",bottomRightRadius:"RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS",strokeWeight:"STROKE_WEIGHT",borderTopWeight:"BORDER_TOP_WEIGHT",borderBottomWeight:"BORDER_BOTTOM_WEIGHT",borderLeftWeight:"BORDER_LEFT_WEIGHT",borderRightWeight:"BORDER_RIGHT_WEIGHT",itemSpacing:"STACK_SPACING",paddingLeft:"STACK_PADDING_LEFT",paddingTop:"STACK_PADDING_TOP",paddingRight:"STACK_PADDING_RIGHT",paddingBottom:"STACK_PADDING_BOTTOM",counterAxisSpacing:"STACK_COUNTER_SPACING",gridRowGap:"GRID_ROW_GAP",gridColumnGap:"GRID_COLUMN_GAP",text:"TEXT_DATA",visible:"VISIBLE",opacity:"OPACITY",width:"WIDTH",height:"HEIGHT",minWidth:"MIN_WIDTH",maxWidth:"MAX_WIDTH",minHeight:"MIN_HEIGHT",maxHeight:"MAX_HEIGHT",x:"X_POSITION",y:"Y_POSITION",rotation:"ROTATION",fontSize:"FONT_SIZE",letterSpacing:"LETTER_SPACING",lineHeight:"LINE_HEIGHT",fontFamily:"FONT_FAMILY"},Kn=Object.fromEntries(Object.entries(na).map(([e,t])=>[t,e])),ra=.01;function Jc(e){return e==="ALIAS"||e==="EXPRESSION"}function Tt(e){let t=e.parameterConsumptionMap,n=new Map,r=[];for(let i of[...e.variableConsumptionMap?.entries??[],...t?.entries??[]])i.variableField?n.set(i.variableField,i):r.push(i);return[...r,...n.values()]}function Xn(e,t){let n=Tt(t);if(n.length===0)return{};let r=[];for(let i of[...Tt(e),...n]){let o=i.variableField?r.findIndex(s=>s.variableField===i.variableField):-1;o<0?r.push(qi(i)):r[o]=qi(i)}return{parameterConsumptionMap:{entries:r}}}function Qc(e,t,n,r,i=1,o=!1){let s=na[e];if(s)return i0(s,t,n,r,i,o)}var ef={fontFamily:"FONT_FAMILY",fontStyle:"FONT_STYLE",fontSize:"FONT_SIZE",letterSpacing:"LETTER_SPACING",lineHeight:"LINE_HEIGHT",paragraphSpacing:"PARAGRAPH_SPACING",paragraphIndent:"PARAGRAPH_INDENT"},RN=ju(ef);function n0(e,t,n){return Object.entries(e).flatMap(([r,i])=>{let o=ef[r];return!o||!i||!t.variables.has(i)?[]:[i0(o,i,t,n)]})}function r0(e){let t={};for(let n of Tt(e)){let r=n.variableField&&RN[n.variableField],i=r?Qi(n.variableData)?.reference?.guid:void 0;r&&i&&(t[r]=se(i))}return t}function tf(e,t,n){let r=e.variables.get(t);return r?.key?{assetRef:{key:r.key,...r.version?{version:r.version}:{}}}:{guid:n?.get(t)??ct(t)}}function i0(e,t,n,r,i=1,o=!1){if(!t)return{variableField:e};let s=n.variables.get(t);if(!s)throw new Error(`Missing bound variable ${t}`);if(!Number.isFinite(i))throw new Error("Non-finite variable binding multiplier");let a={dataType:"ALIAS",resolvedDataType:s.type,value:{alias:tf(n,t,r)}};return e==="TEXT_DATA"&&s.type!=="STRING"?{variableField:e,variableData:{dataType:"EXPRESSION",resolvedDataType:"STRING",value:{expressionValue:{expressionFunction:"STRINGIFY",expressionArguments:[a]}}}}:s.type!=="FLOAT"||!o&&i===1?{variableField:e,variableData:a}:{variableField:e,variableData:{dataType:"EXPRESSION",resolvedDataType:"FLOAT",value:{expressionValue:{expressionFunction:"MULTIPLY",expressionArguments:[{dataType:"FLOAT",resolvedDataType:"FLOAT",value:{floatValue:i}},a]}}}}}function o0(e,t){return e==="opacity"?ra:e==="rotation"?1:t}function s0(e,t,n,r,i){let o=o0(e,n.componentScale),s=t.variableBindingScales[e]===void 0?1:t.variableBindingScales[e]/o;return Qc(e,t.boundVariables[e],r,i,s)}function a0(e,t,n){let r=new Set(Object.keys(e.boundVariables));for(let i of Tt(et(e))){if(!Jc(i.variableData?.dataType))continue;let o=i.variableField&&Kn[i.variableField];o&&r.add(o)}return[...r].flatMap(i=>{let o=(e.variableBindingScales[i]??1)/(i==="opacity"?ra:1),s=Qc(i,e.boundVariables[i],t,n,o,e.type==="INSTANCE"&&e.componentScale!==1);return s?[s]:[]})}function nf(e){let t=e.variableField?Kn[e.variableField]:void 0;if(!t)return;let n=Qi(e.variableData);if(e.variableData?.value?.expressionValue&&!n?.reference)throw new Error("Variable expression must contain one alias");let r=n?.reference?.guid;return r?{field:t,variableId:se(r),multiplier:n.multiplier}:void 0}function l0(e){let t={};for(let n of Tt(e)){let r=nf(n);r&&nn(r.field)&&(t[r.field]=r.multiplier*(r.field==="opacity"?ra:1))}return t}function ia(e=1){return e===1?{}:Object.fromEntries(Object.entries(Lr(na,e)).filter(([,t])=>t!==1))}function Lr(e,t,n={}){let r={};for(let i of Object.keys(e))nn(i)&&(r[i]=n[i]??o0(i,t));return r}function rf(e,t){return e==="opacity"?{opacity:Math.max(0,Math.min(1,t*ra))}:nn(e)?{[e]:t}:void 0}var{boundVariables:DN,exportSettings:_c,librarySource:u0,textPathBox:c0}=Qe,MN={PNG:"png",JPEG:"jpg",SVG:"svg",PDF:"pdf"};function ft(e,t){return t.decode(e.pluginData?.find(n=>n.pluginID===bi&&n.key===t.key)?.value)}function f0(e){e.exportSettings.length!==0&&(!du(e.pluginData,_c)&&Array.isArray(e0(e,"exportSettings"))||(e.pluginData=tn(e.pluginData,_c,e.exportSettings)))}function d0(e){e.textPathBox&&(e.pluginData=tn(e.pluginData,c0,e.textPathBox))}function p0(e){return ft(e,c0)??null}function m0(e){let t=ft(e,DN)??{};for(let n of Tt(e)){let r=nf(n);if(r)t[r.field]=r.variableId;else if(n.variableField&&!Jc(n.variableData?.dataType)){let i=Kn[n.variableField];i&&(t=It(t,[i]))}}return e.fillPaints?.forEach((n,r)=>{let i=n.colorVar?.value?.alias?.guid;i&&(t[`fills/${r}/color`]=se(i))}),e.strokePaints?.forEach((n,r)=>{let i=n.colorVar?.value?.alias?.guid;i&&(t[`strokes/${r}/color`]=se(i))}),t}function PN(e){return typeof e=="string"?MN[e]??null:e===0?"png":e===1?"jpg":e===2?"svg":e===3?"pdf":null}function wN(e){if(!e||typeof e!="object"||Array.isArray(e))return 1;let t=e.type;if(t!=="CONTENT_SCALE"&&t!==0)return 1;let n=e.value;return typeof n=="number"&&Number.isFinite(n)?fs(n):1}function h0(e){let t=ft(e,_c);return t||(e.exportSettings??[]).flatMap(n=>{if(!n||typeof n!="object"||Array.isArray(n))return[];let r=PN(n.imageType);return r?[{scale:wN(n.constraint),format:r}]:[]})}function eo(e){return(e.pluginData??[]).map(t=>({pluginId:t.pluginID,key:t.key,value:t.value}))}function g0(e){return ft(e,u0)??null}function y0(e){e.pluginData=tn(e.pluginData,u0,e.librarySource??void 0)}function v0(e){return(e.pluginRelaunchData??[]).map(t=>({pluginId:t.pluginID,command:t.command,message:t.message,isDeleted:t.isDeleted}))}function I0(e){return e.map(t=>({pluginID:t.pluginId,key:t.key,value:t.value}))}function T0(e){return e.map(t=>({pluginID:t.pluginId,command:t.command,message:t.message,isDeleted:t.isDeleted}))}var kN=["fontSize","fontName","lineHeight","letterSpacing","textDecoration","textCase"];function Zi(e,t,n){if(t?.guid)return e.get(se(t.guid));if(!t?.assetRef||!n)return;let{key:r,version:i}=t.assetRef,o=(i?n.get(`${r}@${i}`):void 0)??n.get(r);return o?e.get(o):void 0}function _N(e,t,n){let r=Zi(e,t.styleIdForFill,n);r?.styleType==="FILL"&&r.fillPaints&&(t.fillPaints=r.fillPaints);let i=Zi(e,t.styleIdForStrokeFill,n);i?.styleType==="FILL"&&i.fillPaints&&(t.strokePaints=i.fillPaints)}function LN(e,t,n){let r=Zi(e,t.styleIdForEffect,n);r?.styleType==="EFFECT"&&r.effects&&(t.effects=r.effects);let i=Zi(e,t.styleIdForGrid,n);i?.styleType==="GRID"&&i.layoutGrids&&(t.layoutGrids=i.layoutGrids)}function VN(e,t,n){let r=Zi(e,t.styleIdForText,n);if(!(r?.type!=="TEXT"||r.styleType!=="TEXT"))for(let i of kN)i==="textDecoration"?t.textDecoration=r.textDecoration:r[i]!==void 0&&Object.assign(t,{[i]:r[i]})}function of(e,t,n){_N(e,t,n),LN(e,t,n),VN(e,t,n)}function Cn(e){if(!e||typeof e!="object"||!("guid"in e))return null;let t=e.guid;return!t||typeof t!="object"||Wn(t)?null:se(t)}function sf(e){switch(e){case"UNDERLINE":return"UNDERLINE";case"STRIKETHROUGH":return"STRIKETHROUGH";default:return"NONE"}}var Ji={value:100,units:"PERCENT"};function af(e){return e?.units===Ji.units&&e.value===Ji.value}function lf(e,t){return!e||af(e)?null:e.units==="PIXELS"?e.value:e.units==="PERCENT"?e.value/100*(t??14):e.units==="RAW"?e.value*(t??14):null}function uf(e,t){return e?e.units==="PIXELS"?e.value:e.units==="PERCENT"?e.value/100*(t??14):e.value:0}var FN=new Set(["ORIGINAL","UPPER","LOWER","TITLE"]);function cf(e){if(!e||typeof e!="object")return;let t=e;if(typeof t.url=="string"&&t.url!=="")return{type:"URL",value:t.url};if(t.guid&&!Wn(t.guid))return{type:"NODE",value:se(t.guid)}}function GN(e,t,n){FN.has(t.textCase)&&(e.textCase=t.textCase);let r=cf(t.hyperlink);r&&(e.hyperlink=r);for(let[o,s]of[["textStyleId","styleIdForText"],["fillStyleId","styleIdForFill"]]){if(t[s]===void 0)continue;let a=Cn(t[s]);a!==Cn(n[s])&&(e[o]=a)}let i=r0(t);Ai(i)||(e.boundVariables=i)}function BN(e,t){let n=t.textDecoration;if(n&&(e.textDecoration=sf(n)),t.textDecorationStyle&&(e.textDecorationStyle=t.textDecorationStyle),t.textDecorationThickness&&(e.textDecorationThickness=t.textDecorationThickness.value??null),t.textDecorationSkipInk!==void 0&&(e.textDecorationSkipInk=t.textDecorationSkipInk),t.textUnderlineOffset&&(e.textUnderlineOffset=t.textUnderlineOffset.value??null),t.textDecorationFillPaints){let r=_r(t.textDecorationFillPaints);r.length>0&&(e.textDecorationFills=r)}}function UN(e,t){let n=t.fontSize,r={};e.fontName&&(r.fontFamily=e.fontName.family,r.fontWeight=Gs(e.fontName.style),r.italic=e.fontName.style.toLowerCase().includes("italic")),e.fontSize!==void 0&&(r.fontSize=e.fontSize);let i=jc(e);i.length>0&&(r.fontVariations=i);let o=Wc(e);if(o.length>0&&(r.fontFeatures=o),e.letterSpacing&&(r.letterSpacing=uf(e.letterSpacing,e.fontSize??n)),e.lineHeight&&(r.lineHeight=lf(e.lineHeight,e.fontSize??n)),BN(r,e),e.fillPaints){let s=_r(e.fillPaints);s.length>0&&(r.fills=s)}return GN(r,e,t),r}function zN(e,t){let n=new Map;for(let r of e){let i=r.styleID;if(i===void 0||i===0)continue;let o=UN(r,t);Object.keys(o).length>0&&n.set(i,o)}return n}function HN(e,t){let n=[],r=e[0],i=0;for(let o=1;o<=e.length;o++)if(o===e.length||e[o]!==r){let s=t.get(r);s&&n.push({start:i,length:o-i,style:s}),o<e.length&&(r=e[o],i=o)}return n}function WN(e,t,n,r){for(let i of n.values())i.hyperlink??(i.hyperlink=r);return n.set(0,{hyperlink:r}),Array.from({length:t},(i,o)=>e[o]??0)}function S0(e){let t=e.textData,n=cf(e.hyperlink),r=t?.characters.length??0,i=zN(t?.styleOverrideTable??[],e),o=n?WN(t?.characterStyleIDs??[],r,i,n):t?.characterStyleIDs??[];return o.length===0||i.size===0?[]:HN(o,i)}var $N={NONE:"PLAIN",ORDERED:"ORDERED_LIST",UNORDERED:"UNORDERED_LIST"};function jN(e){return e.lineType==="ORDERED_LIST"?"ORDERED":e.lineType==="UNORDERED_LIST"?"UNORDERED":"NONE"}function XN(e,t=[]){if(!e)return[];let n=new Map(t.map(i=>[i.styleID,i])),r=e.map(i=>{let o={listType:jN(i),indentation:i.indentationLevel??0};o.listType!=="NONE"&&(o=Gu(o,o.indentation));let s=i.styleId?n.get(i.styleId):void 0;for(let a of Mr){let l=s?.[a];l!==void 0&&(o=Lu(o,a,l))}return o});return Fu(r,r.length)}function KN(e,t=1){let n=new Set(cc(e.text,e.textParagraphs).filter(s=>s.startsList).map(s=>s.paragraph)),r=[],i=new Map,o=s=>{let a={};for(let c of Mr){let f=s[c];f!==void 0&&(a[c]=f)}if(Ai(a))return 0;let l=JSON.stringify(a),u=i.get(l);return u===void 0&&(u=t+r.length,i.set(l,u),r.push({styleID:u,...a})),u};return{lines:Dr(e.text).map((s,a)=>{let l=Li(e.textParagraphs,a);return{lineType:$N[l.listType],styleId:o(l),indentationLevel:l.indentation,sourceDirectionality:"AUTO",listStartOffset:0,isFirstLineOfList:n.has(a)}}),overrides:r}}function ff(e,t){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),r=0,i=n.getUint32(r,!0);r+=4;let o=n.getUint32(r,!0);r+=4;let s=n.getUint32(r,!0);r+=4;let a=new Map;for(let f of t??[])a.set(f.styleID,f);let l=[];for(let f=0;f<i;f++){let g=n.getUint32(r,!0);r+=4;let h=n.getFloat32(r,!0);r+=4;let d=n.getFloat32(r,!0);r+=4;let I=a.get(g),T={x:h,y:d,handleMirroring:I?.handleMirroring??"NONE"};I?.strokeCap&&(T.strokeCap=I.strokeCap),I?.strokeJoin&&(T.strokeJoin=I.strokeJoin),I?.cornerRadius!==void 0&&(T.cornerRadius=I.cornerRadius),l.push(T)}let u=[];for(let f=0;f<o;f++){r+=4;let g=n.getUint32(r,!0);r+=4;let h=n.getFloat32(r,!0);r+=4;let d=n.getFloat32(r,!0);r+=4;let I=n.getUint32(r,!0);r+=4;let T=n.getFloat32(r,!0);r+=4;let E=n.getFloat32(r,!0);r+=4,u.push({start:g,end:I,tangentStart:{x:h,y:d},tangentEnd:{x:T,y:E}})}let c=[];for(let f=0;f<s;f++){let g=(n.getUint32(r,!0)&1)===1?"NONZERO":"EVENODD";r+=4;let h=n.getUint32(r,!0);r+=4;let d=[];for(let I=0;I<h;I++){let T=n.getUint32(r,!0);r+=4;let E=[];for(let S=0;S<T;S++)E.push(n.getUint32(r,!0)),r+=4;d.push(E)}c.push({windingRule:g,loops:d})}return{vertices:l,segments:u,regions:c}}function b0(e){return[e.handleMirroring??"NONE",e.strokeCap??"",e.strokeJoin??"",e.cornerRadius??""].join("|")}function E0(e){let t=new Map,n=[],r=1;for(let i of e.vertices){let o=i.handleMirroring??"NONE";if(o==="NONE"&&!i.strokeCap&&!i.strokeJoin&&i.cornerRadius===void 0)continue;let s=b0(i);if(t.has(s))continue;t.set(s,r);let a={styleID:r};o!=="NONE"&&(a.handleMirroring=o),i.strokeCap&&(a.strokeCap=i.strokeCap),i.strokeJoin&&(a.strokeJoin=i.strokeJoin),i.cornerRadius!==void 0&&(a.cornerRadius=i.cornerRadius),n.push(a),r++}return{table:n,styleToId:t}}function A0(e,t){let n=0;for(let s of e.regions){n+=8;for(let a of s.loops)n+=4+a.length*4}let r=new ArrayBuffer(12+e.vertices.length*12+e.segments.length*28+n),i=new DataView(r),o=0;i.setUint32(o,e.vertices.length,!0),o+=4,i.setUint32(o,e.segments.length,!0),o+=4,i.setUint32(o,e.regions.length,!0),o+=4;for(let s of e.vertices)i.setUint32(o,t?.get(b0(s))??0,!0),o+=4,i.setFloat32(o,s.x,!0),o+=4,i.setFloat32(o,s.y,!0),o+=4;for(let s of e.segments)i.setUint32(o,0,!0),o+=4,i.setUint32(o,s.start,!0),o+=4,i.setFloat32(o,s.tangentStart.x,!0),o+=4,i.setFloat32(o,s.tangentStart.y,!0),o+=4,i.setUint32(o,s.end,!0),o+=4,i.setFloat32(o,s.tangentEnd.x,!0),o+=4,i.setFloat32(o,s.tangentEnd.y,!0),o+=4;for(let s of e.regions){i.setUint32(o,s.windingRule==="EVENODD"?0:1,!0),o+=4,i.setUint32(o,s.loops.length,!0),o+=4;for(let a of s.loops){i.setUint32(o,a.length,!0),o+=4;for(let l of a)i.setUint32(o,l,!0),o+=4}}return new Uint8Array(r)}function Ys(e){return e==="EVENODD"?"ODD":"NONZERO"}function x0(e){return e==="ODD"||e==="EVENODD"?"EVENODD":"NONZERO"}function N0(e,t){let n=t?.regions??[];return e.length===n.length?e.map((r,i)=>({...r,windingRule:n[i].windingRule})):e.length===1&&n.length>0&&n.every(r=>r.windingRule===n[0].windingRule)?[{...e[0],windingRule:n[0].windingRule}]:e}function C0(e,t){let n=e.vectorData;if(n?.vectorNetworkBlob===void 0)return null;let r=n.vectorNetworkBlob;if(r<0||r>=t.length)return null;try{let i=ff(t[r],n.styleOverrideTable),o=n.normalizedSize,s=e.size?.x??0,a=e.size?.y??0,l=o&&o.x>0&&s>0?s/o.x:1,u=o&&o.y>0&&a>0?a/o.y:1;if(l!==1||u!==1){for(let c of i.vertices)c.x*=l,c.y*=u;for(let c of i.segments)c.tangentStart={x:c.tangentStart.x*l,y:c.tangentStart.y*u},c.tangentEnd={x:c.tangentEnd.x*l,y:c.tangentEnd.y*u}}return i}catch{return null}}function O0(e){let t=new Map;for(let n of e??[])n.fillPaints&&n.fillPaints.length>0&&t.set(n.styleID,_r(n.fillPaints));return t}function R0(e){let t=e.vectorData;return O0(t?.styleOverrideTable)}function Lc(e,t,n){if(!e||e.length===0)return[];let r=[];for(let i of e){if(i.commandsBlob===void 0||i.commandsBlob<0||i.commandsBlob>=t.length)continue;let o=t[i.commandsBlob];if(o.length===0)continue;let s=i.styleID?n?.get(i.styleID):void 0;r.push({windingRule:x0(i.windingRule),commandsBlob:o,fills:s&&s.length>0?Ot(s):void 0})}return r}function YN(e){let t={},n=e.variableModeBySetMap;for(let r of n?.entries??[]){let i=r.variableSetID?.guid,o=r.variableModeID;!i||!o||(t[se(i)]=se(o))}return t}var qN={DOCUMENT:"DOCUMENT",VARIABLE:"VARIABLE",CANVAS:"CANVAS",FRAME:"FRAME",RECTANGLE:"RECTANGLE",ROUNDED_RECTANGLE:"ROUNDED_RECTANGLE",ELLIPSE:"ELLIPSE",TEXT:"TEXT",LINE:"LINE",STAR:"STAR",REGULAR_POLYGON:"POLYGON",VECTOR:"VECTOR",BOOLEAN_OPERATION:"BOOLEAN_OPERATION",GROUP:"GROUP",SECTION:"SECTION",COMPONENT:"COMPONENT",COMPONENT_SET:"COMPONENT_SET",INSTANCE:"INSTANCE",SYMBOL:"COMPONENT",CONNECTOR:"CONNECTOR",SHAPE_WITH_TEXT:"SHAPE_WITH_TEXT",TEXT_PATH:"TEXT"};function ZN(e){return e?qN[e]??"RECTANGLE":"RECTANGLE"}function JN(e){if(e.type!=="BOOLEAN_OPERATION")return;let t=e.booleanOperation;switch(t){case"SUBTRACT":case"INTERSECT":return t;case"EXCLUDE":case"XOR":return"EXCLUDE";default:return"UNION"}}function QN(e){switch(e){case"HORIZONTAL":return"HORIZONTAL";case"VERTICAL":return"VERTICAL";default:return"NONE"}}function Vc(e){switch(e){case"RESIZE_TO_FIT":case"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":return"HUG";default:return"FIXED"}}function D0(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"SPACE_BETWEEN":case"SPACE_EVENLY":return"SPACE_BETWEEN";default:return"MIN"}}function M0(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"BASELINE":return"BASELINE";default:return"MIN"}}function P0(e){switch(e){case"MIN":return"MIN";case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"BASELINE":return"BASELINE";default:return"AUTO"}}function xy(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"SCALE":return"SCALE";default:return"MIN"}}function w0(e){return e?{startingAngle:e.startingAngle??0,endingAngle:e.endingAngle??2*Math.PI,innerRadius:e.innerRadius??0}:null}function k0(e){let t=e.size?.x??100,n=e.size?.y??100,r=e.transform?.m02??0,i=e.transform?.m12??0,o=0,s=!1;if(e.transform){let a=e.transform;a.m00*a.m11-a.m01*a.m10<0&&(s=!0),o=Math.atan2(a.m10,s?a.m11:a.m00)*(180/Math.PI);let l=o*Math.PI/180,u=Math.cos(l),c=Math.sin(l),f=t/2,g=n/2,h=s?-u:u,d=s?c:-c,I=c,T=u;r=a.m02-f+h*f+d*g,i=a.m12-g+I*f+T*g}return{x:r,y:i,width:t,height:n,rotation:o,flipX:s,flipY:!1}}function eC(e){return{cornerRadius:e.cornerRadius??0,topLeftRadius:e.rectangleTopLeftCornerRadius??e.cornerRadius??0,topRightRadius:e.rectangleTopRightCornerRadius??e.cornerRadius??0,bottomRightRadius:e.rectangleBottomRightCornerRadius??e.cornerRadius??0,bottomLeftRadius:e.rectangleBottomLeftCornerRadius??e.cornerRadius??0,independentCorners:e.rectangleCornerRadiiIndependent??!1,cornerSmoothing:e.cornerSmoothing??0}}function tC(e){let t={};return e.count!==void 0&&(t.pointCount=Vs(e.count,dc.min,dc.max)),e.starInnerScale!==void 0&&Number.isFinite(e.starInnerScale)&&(t.starInnerRadius=Vs(e.starInnerScale,0,1)),t}function nC(e){if(!e.lineHeight||af(e.lineHeight))return null;let t=e.derivedTextData?.baselines?.[0]?.lineHeight;return e.lineHeight.units==="PIXELS"&&t!==void 0&&Number.isFinite(t)&&t<e.lineHeight.value?t:lf(e.lineHeight,e.fontSize)}function rC(e){return{textDecoration:sf(e.textDecoration),textDecorationStyle:e.textDecorationStyle??"SOLID",textDecorationThickness:e.textDecorationThickness?.value??null,textDecorationFills:_r(e.textDecorationFillPaints),textDecorationSkipInk:e.textDecorationSkipInk??!0,textUnderlineOffset:e.textUnderlineOffset?.value??null}}function iC(e){return{textParagraphs:XN(e.textData?.lines,e.textData?.styleOverrideTable),listSpacing:e.listSpacing??0,paragraphSpacing:e.paragraphSpacing??0,paragraphIndent:e.paragraphIndent??0,hangingList:e.hangingList??!1}}function oC(e,t){return{text:e.textData?.characters??"",fontSize:e.fontSize??14,fontFamily:e.fontName?.family??Er,fontWeight:Gs(e.fontName?.style??""),italic:e.fontName?.style.toLowerCase().includes("italic")??!1,textAlignHorizontal:e.textAlignHorizontal??"LEFT",textAlignVertical:e.textAlignVertical??"TOP",textAutoResize:e.textAutoResize??"NONE",textCase:e.textCase??"ORIGINAL",...rC(e),leadingTrim:e.leadingTrim??"NONE",lineHeight:nC(e),letterSpacing:uf(e.letterSpacing,e.fontSize),maxLines:e.maxLines??null,...iC(e),styleRuns:S0(e),fontVariations:jc(e),fontFeatures:Wc(e),textTruncation:e.textTruncation==="ENDING"?"ENDING":"DISABLED",textDirection:ft(e,Qe.textDirection)??"AUTO",...sC(e,t)}}function sC(e,t){let n=e.derivedTextData?.layoutSize;return{derivedLayout:n?{width:n.x,height:n.y}:null,derivedTextGlyphs:$y(e.derivedTextData,t,e.textData?.characters??"")}}function aC(e){let t=e.stackPadding??0;return{paddingTop:e.stackVerticalPadding??t,paddingBottom:e.stackPaddingBottom??t,paddingLeft:e.stackHorizontalPadding??t,paddingRight:e.stackPaddingRight??t}}function lC(e,t,n,r){let i=n==="HUG"||r==="HUG",o=(e.fillPaints?.some(s=>s.visible!==!1)??!1)||(e.strokePaints?.some(s=>s.visible!==!1)??!1);if(!(t==="NONE"||!i||!o))return{x:e.transform?.m02??0,y:e.transform?.m12??0,width:e.size?.x??100,height:e.size?.y??100}}function Ny(e,t){let n=e?.value?.[t];return typeof n=="number"&&Number.isFinite(n)&&n>0?n:null}function Cy(e,t){let n=e?.value?.[t];return typeof n=="number"&&Number.isFinite(n)&&n>=0?n:null}function uC(e){let t=e.targetAspectRatio?.value;return!t||!Number.isFinite(t.x)||!Number.isFinite(t.y)?null:{x:t.x,y:t.y}}function cC(e){let t=QN(e.stackMode),n=e.stackPrimarySizing===void 0&&(t==="HORIZONTAL"||t==="VERTICAL")?"HUG":Vc(e.stackPrimarySizing),r=Vc(e.stackCounterSizing),i=lC(e,t,n,r);return{layoutMode:t,itemSpacing:e.stackSpacing??0,...aC(e),primaryAxisSizing:n,counterAxisSizing:r,primaryAxisAlign:D0(e.stackPrimaryAlignItems??e.stackJustify),counterAxisAlign:M0(e.stackCounterAlignItems??e.stackCounterAlign),layoutWrap:e.stackWrap==="WRAP"?"WRAP":"NO_WRAP",counterAxisSpacing:e.stackCounterSpacing??0,layoutPositioning:e.stackPositioning==="ABSOLUTE"?"ABSOLUTE":"AUTO",layoutGrow:e.stackChildPrimaryGrow??0,layoutAlignSelf:P0(e.stackChildAlignSelf),counterAxisAlignContent:e.stackCounterAlignContent==="SPACE_BETWEEN"?"SPACE_BETWEEN":"AUTO",itemReverseZIndex:e.stackReverseZIndex??!1,strokesIncludedInLayout:e.strokesIncludedInLayout??!1,layoutDirection:ft(e,Qe.layoutDirection)??"AUTO",...i?{derivedLayout:i}:{}}}function fC(e){return e.strokeCap??"NONE"}function dC(e,t){return e.strokeJoin??t?.vertices.find(n=>n.strokeJoin)?.strokeJoin??"MITER"}function Oy(e){return e==="FILL"||e==="TEXT"||e==="EFFECT"||e==="GRID"?e:null}function pC(e){return Array.isArray(e)?structuredClone(e):[]}function mC(e,t){if(e.type!=="TEXT_PATH")return null;let n=e.vectorData,r=n?.vectorNetworkBlob,i=n?.normalizedSize;if(typeof r!="number"||!i||i.x<=0||i.y<=0)return null;let o=t[r],s=e.textPathStart;try{return{network:ff(o,n.styleOverrideTable),normalizedSize:{x:i.x,y:i.y},tValue:s?.tValue??0,forward:s?.forward??!0}}catch{return null}}function hC(e,t){let n=C0(e,t),r=fC(e),i=dC(e,n);return{vectorNetwork:n,fillGeometry:N0(Lc(e.fillGeometry,t,R0(e)),n),strokeGeometry:Lc(e.strokeGeometry,t),arcData:w0(e.arcData),strokeCap:r,strokeJoin:i,dashPattern:e.dashPattern??[],borderTopWeight:e.borderTopWeight??0,borderRightWeight:e.borderRightWeight??0,borderBottomWeight:e.borderBottomWeight??0,borderLeftWeight:e.borderLeftWeight??0,independentStrokeWeights:e.borderStrokeWeightsIndependent??!1,strokeMiterLimit:e.miterLimit??yi}}function gC(e){let t=ZN(e.type);return t==="FRAME"&&xC(e)||ft(e,Qe.nodeType)==="COMPONENT_SET"?"COMPONENT_SET":t==="FRAME"&&e.resizeToFit===!0&&(e.stackMode===void 0||e.stackMode==="NONE")?"GROUP":t}function to(e,t,n="source"){let r=gC(e),i=hC(e,t),o=mC(e,t),s={nodeType:r,name:e.name??r,source:n==="source"?CC(e,t):NC(e),...k0(e),opacity:e.opacity??1,visible:e.visible??!0,locked:e.locked??!1,internalOnly:e.internalOnly===!0||Oy(e.styleType)!==null,blendMode:e.blendMode??"PASS_THROUGH",booleanOperation:JN(e),fills:_r(e.fillPaints),strokes:Jy(e.strokePaints,e.strokeWeight,e.strokeAlign,i.strokeCap,i.strokeJoin,e.dashPattern??[]),strokeWeight:e.strokeWeight??wn,strokeAlign:Yc(e.strokeAlign),effects:Qy(e.effects),layoutGrids:pC(e.layoutGrids),guides:Hy(e.guides),fillStyleId:Cn(e.styleIdForFill),strokeStyleId:Cn(e.styleIdForStrokeFill),textStyleId:Cn(e.styleIdForText),effectStyleId:Cn(e.styleIdForEffect),gridStyleId:Cn(e.styleIdForGrid),sharedStyleType:Oy(e.styleType),...eC(e),...tC(e),...oC(e,t),horizontalConstraint:xy(e.horizontalConstraint),verticalConstraint:xy(e.verticalConstraint),...cC(e),...i,minWidth:Ny(e.minSize,"x"),maxWidth:Cy(e.maxSize,"x"),minHeight:Ny(e.minSize,"y"),maxHeight:Cy(e.maxSize,"y"),targetAspectRatio:uC(e),isMask:e.mask??!1,maskType:e.maskType??"ALPHA",maskIsOutline:e.maskIsOutline??!1,expanded:!0,autoRename:e.autoRename??!0,boundVariables:m0(e),variableAssignmentScales:ia(),variableBindingScales:l0(e),variableModes:YN(e),exportSettings:h0(e),pluginData:eo(e),librarySource:g0(e),pluginRelaunchData:v0(e),clipsContent:e.frameMaskDisabled===!1&&e.resizeToFit!==!0,componentId:DC(e),componentPropertyDefinitions:r==="INSTANCE"?[]:L0(e),componentPropertyReferences:IC(e),componentPropertyAssignments:SC(e),componentPropertyValues:bC(e),...AC(e)};bN(s,o);let a=p0(e);return a&&s.textPathBox&&(s.textPathBox={x:a.x+s.textPathBox.x,y:a.y+s.textPathBox.y,width:a.width,height:a.height}),s}var yC={VARIANT:"VARIANT",TEXT:"TEXT",BOOL:"BOOLEAN",BOOLEAN:"BOOLEAN",INSTANCE_SWAP:"INSTANCE_SWAP",SLOT:"SLOT"};function _0(e){if(!e||typeof e!="object")return"";let t=e;return typeof t.boolValue=="boolean"?String(t.boolValue):typeof t.textValue=="string"?t.textValue:t.textValue&&typeof t.textValue=="object"?t.textValue.characters??"":t.guidValue?se(t.guidValue):""}function vC(e){let t={allowPreferredValuesOnly:e.allowPreferredValuesOnly??!1,displayEmptyByDefault:e.displayByDefault??!1,stretchChildOnInsert:e.stretchChildOnInsert??!1};return e.minChildren!==void 0&&(t.minChildren=e.minChildren),e.maxChildren!==void 0&&(t.maxChildren=e.maxChildren),t}function L0(e){let t=e.componentPropDefs;if(!t?.length)return[];let n=[];for(let r of t){if(!r.id||!r.name)continue;let i=yC[r.type??""]??"VARIANT",o={id:se(r.id),name:r.name,type:i,defaultValue:_0(r.initialValue),variantOptions:i==="VARIANT"?r.preferredValues?.stringValues:void 0,preferredValues:i==="INSTANCE_SWAP"||i==="SLOT"?r.preferredValues?.instanceSwapValues?.map(s=>s.key).filter(s=>s!==void 0):void 0};r.description&&(o.description=r.description),i==="SLOT"&&r.slotPropConfig&&(o.slotSettings=vC(r.slotPropConfig)),n.push(o)}return n}function IC(e){let t=e.componentPropRefs;if(!t?.length)return[];let n={0:"VISIBLE",1:"TEXT",2:"INSTANCE_SWAP",4:"SLOT_CONTENT",VISIBLE:"VISIBLE",TEXT_DATA:"TEXT",OVERRIDDEN_SYMBOL_ID:"INSTANCE_SWAP",SLOT_CONTENT_ID:"SLOT_CONTENT"};return t.flatMap(r=>{let i=n[String(r.componentPropNodeField)];return r.defID&&i&&!r.isDeleted?[{propertyId:se(r.defID),field:i}]:[]})}function TC(e){if(e.value&&(e.value.boolValue!==void 0||e.value.textValue!==void 0||e.value.guidValue!==void 0))return _0(e.value);let t=e.varValue?.value;return t?.symbolIdValue?.guid?se(t.symbolIdValue.guid):t?.boolValue!==void 0?String(t.boolValue):t?.textValue!==void 0?t.textValue:t?.textDataValue?.characters??""}function SC(e){let t=e.componentPropAssignments;return t?.length?Object.fromEntries(t.flatMap(n=>n.defID?[[se(n.defID),TC(n)]]:[])):{}}function V0(e){let t=e.variantPropSpecs;return t?.length?t.filter(n=>!!n.propDefId).map(n=>({propDefId:se(n.propDefId),value:n.value??""})):[]}function bC(e){let t=V0(e),n=new Map(L0(e).map(i=>[i.id,i.name]));if(t.length>0&&n.size>0){let i={};for(let o of t)i[n.get(o.propDefId)??o.propDefId]=o.value;return i}let r=e.name;return r?.includes("=")?ny(r):{}}function Ry(e){if(!e||typeof e!="object")return null;let t=e;if(typeof t.sessionID!="number"||typeof t.localID!="number")return null;let n={sessionID:t.sessionID,localID:t.localID};return Wn(n)?null:se(n)}function Xs(e){return typeof e=="string"?e:null}function EC(e){return typeof e=="string"?e:""}function Mc(e){return typeof e=="boolean"?e:!1}function AC(e){let t=e.symbolLinks??[];return{componentKey:Xs(e.componentKey),sourceLibraryKey:Xs(e.sourceLibraryKey),publishId:Ry(e.publishID),overrideKey:Ry(e.overrideKey),sharedSymbolVersion:Xs(e.sharedSymbolVersion),publishedVersion:Xs(e.publishedVersion),isPublishable:Mc(e.isPublishable),isSymbolPublishable:Mc(e.isSymbolPublishable),isExposedInstance:Mc(e.propsAreBubbled),symbolDescription:EC(e.symbolDescription),symbolLinks:t.filter(n=>typeof n.uri=="string").map(n=>({uri:n.uri,displayName:n.displayName,displayText:n.displayText})),variantPropSpecs:V0(e)}}function xC(e){let t=e.componentPropDefs;return t?.length?t.some(n=>n.type==="VARIANT"):!1}function F0(e){return{stackMode:e.stackMode,stackSpacing:e.stackSpacing,stackPadding:e.stackPadding,stackPaddingRight:e.stackPaddingRight,stackPaddingBottom:e.stackPaddingBottom,stackCounterAlign:e.stackCounterAlign,stackJustify:e.stackJustify,stackCounterAlignItems:e.stackCounterAlignItems,stackPrimaryAlignItems:e.stackPrimaryAlignItems,stackPrimarySizing:e.stackPrimarySizing,stackCounterSizing:e.stackCounterSizing,stackVerticalPadding:e.stackVerticalPadding,stackHorizontalPadding:e.stackHorizontalPadding,stackWrap:e.stackWrap,stackPositioning:e.stackPositioning,stackChildPrimaryGrow:e.stackChildPrimaryGrow,stackChildAlignSelf:e.stackChildAlignSelf,stackCounterSpacing:e.stackCounterSpacing,bordersTakeSpace:e.bordersTakeSpace,stackReverseZIndex:e.stackReverseZIndex}}function NC(e){let t=En();return t.fig.layout=F0(e),t}function CC(e,t){return{format:"fig",id:e.guid?se(e.guid):null,orderKey:e.parentIndex?.position??null,editedFields:[],fig:{...OC(e,t),...RC(e,t),layout:F0(e)}}}function kr(e,t){if(e instanceof Uint8Array)return e;if(Array.isArray(e))return e.map(r=>kr(r,t));if(!e||typeof e!="object")return e;let n={};for(let[r,i]of Object.entries(e))if((r==="commandsBlob"||r==="vectorNetworkBlob")&&typeof i=="number"){let o=t[i];o==null?n[r]=i:n[r]={__openPencilFigmaBlob:o instanceof Uint8Array?o:new Uint8Array(Object.values(o))}}else n[r]=kr(i,t);return n}var G0=["styleIdForFill","styleIdForStrokeFill","styleIdForText","styleIdForEffect","styleIdForGrid","styleType","componentPropAssignments","backgroundPaints","layoutGrids","exportSettings","componentPropDefs","componentPropRefs","variantPropSpecs","stateGroupPropertyValueOrders","isStateGroup","version","sourceLibraryKey","userFacingVersion","description","key","sortPosition","detachedSymbolId","documentColorProfile","variableConsumptionMap","variableModeBySetMap","parameterConsumptionMap","editInfo","backgroundColor","blendMode","pageType","isPageDivider","guides","handoffStatusMap","annotationCategories","miterLimit","mask","maskType","maskIsOutline","strokeWeight","strokeJoin","borderStrokeWeightsIndependent","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight","minSize","maxSize","gridRows","gridColumns","gridRowAnchor","gridColumnAnchor","gridColumnsSizing","gridRowsSizing","gridChildVerticalAlign","gridChildHorizontalAlign","textAutoResize","textAlignHorizontal","textAlignVertical","textData","lineHeight","fontName","fontSize","letterSpacing","textTracking","fontVersion","textUserLayoutVersion","textExplicitLayoutVersion","fontVariations","fontVariantCommonLigatures","fontVariantContextualLigatures","toggledOnOTFeatures","toggledOffOTFeatures","leadingTrim","textDecorationFillPaints","textUnderlineOffset","textDecorationThickness","textDecorationStyle","semanticWeight","semanticItalic","maxLines","textPathStart","derivedTextData","fillPaints","strokePaints","effects","sectionStatusInfo","prototypeStartNodeID","prototypeInteractions","transitionInfo","codeSyntax","lockMode","slideThemeMap","isSoftDeleted","brushType","scatterStrokeSettings","vectorOperationVersion","vectorData","fillGeometry","strokeGeometry"];function OC(e,t){let n={};for(let r of G0){let i=e[r];i!==void 0&&(n[r]=kr(i,t))}return{rawSize:e.size?{...e.size}:null,rawTransform:e.transform?{...e.transform}:null,rawNodeFields:n}}function RC(e,t){let n=e.symbolData;return{symbolOverrides:kr(n?.symbolOverrides??[],t),componentPropAssignments:kr(e.componentPropAssignments??[],t),derivedSymbolData:kr(e.derivedSymbolData??[],t),derivedSymbolDataLayoutVersion:typeof e.derivedSymbolDataLayoutVersion=="number"?e.derivedSymbolDataLayoutVersion:null,uniformScaleFactor:typeof n?.uniformScaleFactor=="number"?n.uniformScaleFactor:null}}function DC(e){let t=e.symbolData;return t?.symbolID?se(t.symbolID):""}function oa(e,t=!1){let n=Math.round(e/100)*100,r=Fs[n]??"Regular";return t?`${r} Italic`:r}var MC=0,PC=1,wC=2,Dy=4;function kC(e){switch(e){case"M":case"L":return 1+2*Float32Array.BYTES_PER_ELEMENT;case"C":case"Q":return 1+6*Float32Array.BYTES_PER_ELEMENT;case"Z":return 1;default:return 0}}function sa(e,t=1){let n=e.reduce((c,f)=>c+kC(f.type),0),r=new Uint8Array(n),i=new DataView(r.buffer),o=0,s=c=>{i.setFloat32(o,(c??0)/t,!0),o+=Float32Array.BYTES_PER_ELEMENT},a=c=>c===void 0?void 0:-c,l=0,u=0;for(let c of e)switch(c.type){case"M":r[o++]=PC,s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"L":r[o++]=wC,s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"C":r[o++]=Dy,s(c.x1),s(a(c.y1)),s(c.x2),s(a(c.y2)),s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"Q":{let f=c.x1??0,g=c.y1??0,h=c.x??0,d=c.y??0;r[o++]=Dy,s(l+2/3*(f-l)),s(a(u+2/3*(g-u))),s(h+2/3*(f-h)),s(a(d+2/3*(g-d))),s(h),s(a(d)),l=h,u=d;break}case"Z":r[o++]=MC}return r}function B0(e,t,n,r){if(t===1&&n===1)return e;let i=Math.cos(r),o=Math.sin(r),s=t*i*i+n*o*o,a=(n-t)*o*i,l=t*o*o+n*i*i;return Pi(e,s,a,a,l)}function df(e){let t=Ky(e.axis);return t===void 0?{axisName:e.axis,value:e.value}:{axisTag:t,axisName:e.axis,value:e.value}}function _C(e,t,n){t.textDecoration&&(e.textDecoration=t.textDecoration),t.textDecorationStyle&&(e.textDecorationStyle=t.textDecorationStyle),t.textDecorationThickness!=null&&(e.textDecorationThickness={value:t.textDecorationThickness,units:"PIXELS"}),t.textDecorationSkipInk!==void 0&&(e.textDecorationSkipInk=t.textDecorationSkipInk),t.textUnderlineOffset!=null&&(e.textUnderlineOffset={value:t.textUnderlineOffset,units:"PIXELS"}),t.textDecorationFills&&t.textDecorationFills.length>0&&(e.textDecorationFillPaints=t.textDecorationFills.map(n))}function LC(e,t,n,r){let i={styleID:e},o=t.fontWeight??n.fontWeight,s=t.italic??n.italic;return i.fontName={family:zi(t.fontFamily??n.fontFamily),style:oa(o,s),postscript:""},t.fontSize!==void 0&&(i.fontSize=t.fontSize),t.fontVariations&&t.fontVariations.length>0&&(i.fontVariations=t.fontVariations.map(df)),t.fontFeatures&&t.fontFeatures.length>0&&$c(i,t.fontFeatures),t.letterSpacing!==void 0&&(i.letterSpacing={value:t.letterSpacing,units:"PIXELS"}),t.lineHeight!==void 0&&(i.lineHeight=t.lineHeight===null?{...Ji}:{value:t.lineHeight,units:"PIXELS"}),_C(i,t,r),t.textCase&&(i.textCase=t.textCase),t.fills&&t.fills.length>0&&(i.fillPaints=t.fills.map(r)),i}function pf(e){let t=Array.from({length:e.text.length}).fill(0),n=new Map,r=1;for(let i of e.styleRuns){let o=JSON.stringify(i.style),s=n.get(o);s||(s={id:r++,style:i.style},n.set(o,s));for(let a=i.start;a<i.start+i.length&&a<t.length;a++)t[a]=s.id}return{charIds:t,styleMap:n}}function U0(e){return[...pf(e).styleMap.values()]}function z0(e){return pf(e).charIds}function H0(e,t){let{charIds:n,styleMap:r}=pf(e),i=[...r.values()].map(({id:l,style:u})=>LC(l,u,e,t)),o=KN(e,r.size+1),s=[...i,...o.overrides],a={characters:e.text,lines:o.lines};return e.styleRuns.length>0&&(a.characterStyleIDs=n),s.length>0&&(a.styleOverrideTable=s),a}function Fc(e){return{layoutSize:{x:e.node.width,y:e.node.height},baselines:e.baselines,glyphs:e.glyphs,...e.decorations?{decorations:e.decorations}:{},fontMetaData:e.fontMetaData,logicalIndexToCharacterOffsetMap:e.logicalIndexToCharacterOffsetMap,derivedLines:[{directionality:"LTR"}],truncationStartIndex:-1,truncatedHeight:-1}}var VC=[{type:"Z"}];function W0(e,t){let n=Xc(t),r=e.glyphBlobMap.get(n);if(r!==void 0)return r;let i=e.blobs.push(t)-1;return e.glyphBlobMap.set(n,i),i}function FC(e,t){let n=[],r=new Set,i=(o,s,a)=>{let l=zi(o),u=`${l}|${fc(s,a)}`;r.has(u)||(r.add(u),n.push({key:{family:l,style:oa(s,a),postscript:""},fontLineHeight:1.2,fontDigest:t.get(u),fontStyle:a?"ITALIC":"NORMAL",fontWeight:s}))};i(e.fontFamily,e.fontWeight,e.italic);for(let o of e.styleRuns)i(o.style.fontFamily??e.fontFamily,o.style.fontWeight??e.fontWeight,o.style.italic??e.italic);return n}function GC(e,t){return e.glyphs.map(n=>({commandsBlob:n.commands?W0(t,sa(n.commands.length>0?n.commands:VC,n.fontSize)):void 0,position:{x:n.x,y:n.y},fontSize:n.fontSize,firstCharacter:n.firstCharacter,advance:n.fontSize>0?n.advance/n.fontSize:0,rotation:0}))}function BC(e){return e.some(({glyph:t})=>(t.rotation??0)!==0)?[e]:Object.values(Un(e,({glyph:t})=>String(t.y))).sort((t,n)=>t[0].glyph.y-n[0].glyph.y)}function $0(e,t){let n=Vu(e)||t.some(r=>r.firstCharacter!==void 0);return t.map((r,i)=>r.firstCharacter??(n?void 0:i))}function UC(e,t,n){let r=t.flatMap(({character:i})=>i===void 0?[]:[i]);return r.length>0?Math.min(...r):n===void 0?0:Dr(e.text)[_u(e.text,n)+1]?.start??e.text.length}function zC(e,t){let n=e.lineHeight??Math.ceil(e.fontSize*1.2),r=Array.from({length:e.text.length},()=>0),i=$0(e,t),o=BC(t.map((l,u)=>({glyph:l,character:i[u]}))),s=[],a;for(let l of o){s.push(UC(e,l,a));for(let{character:u}of l)u!==void 0&&(a=Math.max(a??0,u));l.every(({character:u})=>u===void 0)&&(a=s.at(-1))}return{baselines:o.map((l,u)=>{let c=l.filter(({character:g})=>g!==void 0),f=c.length?Math.min(...c.map(({glyph:g})=>g.x)):Math.max(...l.map(({glyph:g})=>g.x+(g.advance??0)));for(let{glyph:g,character:h}of c)h!==void 0&&h<r.length&&(r[h]=g.x-f);return{firstCharacter:s[u],endCharacter:s[u+1]??e.text.length,position:{x:f,y:l[0].glyph.y},width:e.width,lineY:u*n,lineHeight:n,lineAscent:Math.max(n-e.fontSize*.2,0)}}),logicalIndexToCharacterOffsetMap:r}}function HC(e,t){return e.fontSize<=0?0:e.advance!==void 0?e.advance*(e.scaleX??1)/e.fontSize:t?Math.max(t.x-e.x,0)/e.fontSize:0}function WC(e,t,n){let r=$0(e,t);return t.map((i,o)=>{let s=t[o+1],a=o+1<t.length&&s.y===i.y&&(s.rotation??0)===(i.rotation??0);return{commandsBlob:W0(n,B0(i.commandsBlob,i.scaleX??1,i.scaleY??1,i.rotation??0)),position:{x:i.x,y:i.y},fontSize:i.fontSize,firstCharacter:r[o],advance:HC(i,a?s:void 0),rotation:i.rotation??0}})}function My(e,t,n){let r=n.textDecorations(e,t);if(r.length===0)return;let i=z0(e),o=Un(r,s=>String(i[s.firstCharacter]??0));return Object.entries(o).map(([s,a])=>({rects:a.map(({x:l,y:u,width:c,height:f})=>({x:l,y:u,w:c,h:f})),styleID:Number(s)}))}function $C(e,t){try{return t.shapeText(e)}catch(n){return console.warn(`Writing "${e.name}" without glyphs; text shaping failed:`,n),null}}function j0(e,t){let n=FC(e,t.digestMap),r=e.derivedTextGlyphs??[];if(r.length>0)return Fc({node:e,glyphs:WC(e,r,t),decorations:e.textPathData?void 0:My(e,r,t),fontMetaData:n,...zC(e,r)});let i=e.textPathData?null:$C(e,t);return Fc({node:e,glyphs:i?GC(i,t):[],decorations:i?My(e,i.glyphs,t):void 0,fontMetaData:n,baselines:i?.baselines??[],logicalIndexToCharacterOffsetMap:i?.logicalIndexToCharacterOffsetMap??[]})}function jC(e){let t=new Map;for(let n of e.getAllNodes()){if(n.sharedStyleType===null||!n.source.id)continue;let r=et(n);typeof r.key=="string"&&t.set(n.source.id,{assetRef:{key:r.key,...typeof r.version=="string"?{version:r.version}:{}}})}return t}function XC(e,t){if(!e.styleNodeIds){let r=new Map;for(let i of e.graph.getAllNodes())i.sharedStyleType!==null&&i.source.id&&r.set(i.source.id,i.id);e.styleNodeIds=r}let n=e.styleNodeIds.get(t);return(n?e.nodeIdToGuid?.get(n):void 0)??e.nodeIdToGuid?.get(t)??ct(t)}function Qs(e,t){return e.styleReferences??(e.styleReferences=jC(e.graph)),e.styleReferences.get(t)??{guid:XC(e,t)}}var Py=2147483647;function on(e){if(!/^\d+:\d+$/.test(e))return null;let t=ct(e);return t.sessionID<=Py&&t.localID<=Py?t:null}function KC(e,t){let n=new Set,r=t;for(;!n.has(r);){n.add(r);let i=e.graph.getNode(r);if(i?.type!=="INSTANCE"||!i.componentId)return r;r=i.componentId}return t}function no(e,t,n){let r=e.graph.getNode(t);if(!r)return;let i=e.nodeIdToGuid?.get(t);if(i)return i;let o=!r.source.id||!e.recordOwners||e.recordOwners.get(r.source.id)===t,s=r.source.id&&o?on(r.source.id):null;if(s&&e.assignedGuidValues){let l=`${s.sessionID}:${s.localID}`;if(e.assignedGuidValues.has(l)){let u={sessionID:1,localID:n.value++};return e.nodeIdToGuid?.set(t,u),e.assignedGuidValues.add(`${u.sessionID}:${u.localID}`),u}}let a=s??{sessionID:1,localID:n.value++};return e.nodeIdToGuid?.set(t,a),e.assignedGuidValues?.add(`${a.sessionID}:${a.localID}`),a}function Ki(e,t,n){let r=e.propertyIdToGuid.get(t);if(r)return r;let i=on(t);if(i)return i;let o={sessionID:1,localID:n.value++};return e.propertyIdToGuid.set(t,o),e.assignedGuidValues?.add(`${o.sessionID}:${o.localID}`),o}function YC(e,t,n){let r=e.graph.getNode(t);for(;r?.parentId;){if(r.parentId===n)return!0;r=e.graph.getNode(r.parentId)}return!1}function mf(e,t,n,r){let i=t.boundVariables[r];if(!i){if(!n.colorVar)return n;let{colorVar:o,...s}=n;return s}return{...n,colorVar:{dataType:"ALIAS",resolvedDataType:"COLOR",value:{alias:tf(e.graph,i,e.varIdToGuid)}}}}function hf(e,t){return t.fills.map((n,r)=>mf(e,t,e.fillToKiwiPaint(n),`fills/${r}/color`))}function gf(e,t){return t.strokes.map((n,r)=>mf(e,t,e.fillToKiwiPaint(n),`strokes/${r}/color`))}function X0(e,t){return n=>{let r=e.graph.getNode(n);return(r?.overrideKey?on(r.overrideKey):null)??no(e,n,t)}}function K0(e,t,n,r){if(n.id===t.id&&t.componentId){let l=r(t.componentId);return l?[l]:void 0}let i=[],o=n.parentId?e.getNode(n.parentId):void 0;for(;o&&o.id!==t.id;)o.type==="INSTANCE"&&i.unshift(o),o=o.parentId?e.getNode(o.parentId):void 0;if(!o)return;let s=[],a=t;for(let l of[...i,n]){let u=qC(e,Y0(a,l));if(!u)return;let c=r(u);if(!c)return;s.push(c),a=l}return s}function Y0(e,t){let n=Rt(e.instanceOverrides,e.id,t.id,"sourceComponentId");return typeof n=="string"?n:t.componentId}function qC(e,t){let n=new Set,r=t?e.getNode(t):void 0;for(;r;){let i=r.parentId?Gn(e,r.parentId):void 0;if(!i)return r.id;if(n.has(r.id))return;n.add(r.id);let o=Y0(i,r);r=o?e.getNode(o):void 0}}function ZC(e,t,n,r,i){let o=c=>c.map(f=>`${f.sessionID}:${f.localID}`).join("/"),s=new Map,a=[];for(let c of r){if(!c.guidPath?.guids?.length){a.push(c);continue}let f=o(c.guidPath.guids);s.set(f,{...s.get(f),...c})}let l=new Set,u=c=>{for(let f of e.getChildren(c.id)){let g=K0(e,t,f,n);if(!g)throw new Error(`Missing instance geometry address for ${f.id} under ${t.id}`);let h=o(g);if(l.has(h))throw new Error(`Ambiguous instance geometry address ${h} under ${t.id}`);l.add(h),s.set(h,{...s.get(h),guidPath:{guids:g},...i(f)}),An(e,f)||u(f)}};return u(t),[...a,...s.values()]}function JC(e,t,n){let r=s=>e.nodeIdToGuid?.get(s)??ct(s),i=n.hyperlink;i&&(t.hyperlink=i.type==="URL"?{url:i.value}:{guid:r(i.value)}),n.textStyleId!==void 0&&(t.styleIdForText=n.textStyleId?Qs(e,n.textStyleId):{guid:{...Hn}}),n.fillStyleId!==void 0&&(t.styleIdForFill=n.fillStyleId?Qs(e,n.fillStyleId):{guid:{...Hn}});let o=n0(n.boundVariables??{},e.graph,e.varIdToGuid);o.length>0&&(t.parameterConsumptionMap={entries:o})}function QC(e,t,n){let r=n.styleOverrideTable;if(!r)return;let i=new Map(U0(t).map(({id:o,style:s})=>[o,s]));for(let o of r){let s=i.get(o.styleID);s&&JC(e,o,s)}}var qs={guid:{...Hn}},ro={name:{scene:["name"],kind:"scalar"},opacity:{scene:["opacity"],kind:"scalar"},fontSize:{scene:["fontSize"],kind:"scalar",length:!0},visible:{scene:["visible"],kind:"visible"},textData:{scene:["text","styleRuns","textParagraphs"],kind:"text"},styleIdForText:{scene:["textStyleId"],kind:"text-style"},fillPaints:{scene:["fills"],kind:"paint"},strokePaints:{scene:["strokes"],kind:"paint"},size:{scene:["width","height"],kind:"size",length:!0},stackSpacing:{scene:["itemSpacing"],kind:"layout-distance",length:!0},stackCounterSpacing:{scene:["counterAxisSpacing"],kind:"layout-distance",length:!0},stackHorizontalPadding:{scene:["paddingLeft"],kind:"layout-distance",length:!0},stackVerticalPadding:{scene:["paddingTop"],kind:"layout-distance",length:!0},stackPaddingRight:{scene:["paddingRight"],kind:"layout-distance",length:!0},stackPaddingBottom:{scene:["paddingBottom"],kind:"layout-distance",length:!0},textAutoResize:{scene:["textAutoResize"],kind:"layout-mode"},stackChildPrimaryGrow:{scene:["layoutGrow"],kind:"layout-mode"},stackPrimarySizing:{scene:["primaryAxisSizing"],kind:"layout-mode"},stackCounterSizing:{scene:["counterAxisSizing"],kind:"layout-mode"},stackChildAlignSelf:{scene:["layoutAlignSelf"],kind:"layout-mode"},cornerRadius:{scene:["cornerRadius"],kind:"node",length:!0,absent:0},rectangleTopLeftCornerRadius:{scene:["topLeftRadius"],kind:"node",length:!0,absent:0},rectangleTopRightCornerRadius:{scene:["topRightRadius"],kind:"node",length:!0,absent:0},rectangleBottomRightCornerRadius:{scene:["bottomRightRadius"],kind:"node",length:!0,absent:0},rectangleBottomLeftCornerRadius:{scene:["bottomLeftRadius"],kind:"node",length:!0,absent:0},rectangleCornerRadiiIndependent:{scene:["independentCorners"],kind:"node",absent:!1},cornerSmoothing:{scene:["cornerSmoothing"],kind:"node",absent:0},strokeWeight:{scene:["strokeWeight"],kind:"node",length:!0},strokeAlign:{scene:["strokeAlign"],kind:"node",absent:"CENTER"},borderTopWeight:{scene:["borderTopWeight"],kind:"node",length:!0},borderRightWeight:{scene:["borderRightWeight"],kind:"node",length:!0},borderBottomWeight:{scene:["borderBottomWeight"],kind:"node",length:!0},borderLeftWeight:{scene:["borderLeftWeight"],kind:"node",length:!0},borderStrokeWeightsIndependent:{scene:["independentStrokeWeights"],kind:"node",absent:!1},strokeCap:{scene:["strokeCap"],kind:"node",absent:"NONE"},strokeJoin:{scene:["strokeJoin"],kind:"node",absent:"MITER"},miterLimit:{scene:["strokeMiterLimit"],kind:"node"},dashPattern:{scene:["dashPattern"],kind:"node",length:!0,absent:[]},blendMode:{scene:["blendMode"],kind:"node",absent:"PASS_THROUGH"},effects:{scene:["effects"],kind:"node",absent:[]},locked:{scene:["locked"],kind:"node",absent:!1},layoutGrids:{scene:["layoutGrids"],kind:"node",absent:[]},styleIdForFill:{scene:["fillStyleId"],kind:"node",absent:qs},styleIdForStrokeFill:{scene:["strokeStyleId"],kind:"node",absent:qs},styleIdForEffect:{scene:["effectStyleId"],kind:"node",absent:qs},stackPrimaryAlignItems:{scene:["primaryAxisAlign"],kind:"node"},stackCounterAlignItems:{scene:["counterAxisAlign"],kind:"node"},stackPositioning:{scene:["layoutPositioning"],kind:"node"},fontName:{scene:["fontFamily","fontWeight","italic"],kind:"node"},fontVariations:{scene:["fontVariations"],kind:"node",absent:[]},lineHeight:{scene:["lineHeight"],kind:"node",absent:{value:100,units:"PERCENT"}},letterSpacing:{scene:["letterSpacing"],kind:"node"},paragraphSpacing:{scene:["paragraphSpacing"],kind:"node",length:!0,absent:0},textCase:{scene:["textCase"],kind:"node",absent:"ORIGINAL"},textDecoration:{scene:["textDecoration"],kind:"node",absent:"NONE"},textAlignHorizontal:{scene:["textAlignHorizontal"],kind:"node"},textAlignVertical:{scene:["textAlignVertical"],kind:"node"},textTruncation:{scene:["textTruncation"],kind:"node",absent:"DISABLED"},maxLines:{scene:["maxLines"],kind:"node"}},q0=Object.entries(ro),eO=new Map(Object.entries(Un(q0.flatMap(([e,t])=>t.scene.map(n=>({scene:n,raw:e,field:t}))),e=>e.scene)).map(([e,t])=>[e,t.map(({raw:n,field:r})=>({raw:n,field:r}))]));function Z0(e){return q0.flatMap(([t,n])=>n.kind===e?[t]:[])}Z0("scalar");var J0=Object.fromEntries(Z0("layout-distance").map(e=>[ro[e].scene[0],e])),Q0=["componentKey","sourceLibraryKey","publishID","publishedVersion","sharedSymbolVersion","isSymbolPublishable","variantPropSpecs","componentPropDefs","overrideKey"];function Gc(e,t,n){if(t.layoutMode!=="HORIZONTAL"&&t.layoutMode!=="VERTICAL")return!1;let r=t.layoutMode==="HORIZONTAL"?"VERTICAL":"HORIZONTAL",i=n==="stackPrimarySizing"?t.layoutMode:r;return vs(e,t,i)==="FILL"}function tO(e,t){let n={...nc(e,t,"default"),...Bi(e,t,"default"),...rc(e,t,"default"),...ic(e,t,"default")};return Object.keys(n).length>0?{...t,...n}:t}function ev(e,t){e.resolvedNodes??(e.resolvedNodes=new WeakMap);let n=e.resolvedNodes.get(t);return n||(n=tO(e.graph,t),e.resolvedNodes.set(t,n)),n}function nO(e,t){let n=e.componentScale;if(!Number.isFinite(n)||n<=0)throw new Error("Invalid instance uniform scale");return{x:t.width/n,y:t.height/n}}function rO(e,t,n,r){if(!n||t.type!=="INSTANCE"||!t.componentId)return;let i=no(e,t.componentId,r);return i?{guidPath:{guids:n},overriddenSymbolID:i}:void 0}function iO(e,t,n,r){if(!(typeof t!="string"&&typeof t!="number")){if(e==="stackPrimarySizing"||e==="stackCounterSizing"){let i=t==="HUG"&&!Gc(n,r,e);return{[e]:i?"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":"FIXED"}}return{[e]:t}}}function oO(e,t,n){if(typeof t!="number")return;let r=n.componentScale;if(!Number.isFinite(r)||r<=0)throw new Error("Invalid instance uniform scale");return{[e]:t/r}}function sO(e,t){let n=eO.get(e);if(!n)return;let r=Yu(n.map(({raw:i,field:o})=>lO(i,o,e,t)));return r.length>0?Object.assign({},...r):void 0}function aO(e,t,n){let r=t.componentScale;if(!Number.isFinite(r)||r<=0)throw new Error("Invalid instance uniform scale");return e(r===1?n:{...n,...Vi(n,1/r,!1)})}function lO(e,t,n,{context:r,instance:i,target:o,value:s,nodeFields:a}){switch(t.kind){case"node":{let l=a(),u=e in l?l[e]:t.absent;return u===void 0?void 0:{[e]:u}}case"scalar":return{[e]:o[n]};case"visible":return{visible:o.visible};case"text":{let l=n==="text"&&typeof s=="string"?s:o.text;return{textData:{...a().textData,characters:l}}}case"text-style":return{styleIdForText:o.textStyleId?Qs(r,o.textStyleId):structuredClone(qs)};case"paint":return e==="fillPaints"?{fillPaints:hf(r,o)}:{strokePaints:gf(r,o)};case"size":return{size:nO(i,o)};case"layout-distance":return oO(e,o[n],i);case"layout-mode":return iO(e,o[n],r.graph,o);default:return}}function uO(e,t,n){if(/^fills\/\d+\/color$/.test(n))return{fillPaints:hf(e,t)};if(/^strokes\/\d+\/color$/.test(n))return{strokePaints:gf(e,t)}}function cO({context:e,instance:t,target:n},r){let i=r.slice(15),o=uO(e,n,i);if(o)return o;let s=s0(i,n,t,e.graph,e.varIdToGuid);return s?{parameterConsumptionMap:{entries:[s]}}:void 0}function fO(e,t,n,r){let i=ev(e.context,e.target),s={...e,target:i,nodeFields:()=>{let l=e.records.get(i.id);return l||(l=aO(e.writeNodeFields,e.instance,i),e.records.set(i.id,l)),l}};if(t==="componentId")return rO(s.context,s.target,n,r);let a=t.startsWith("boundVariables/")?cO(s,t):sO(t,s);return a&&{guidPath:{guids:n},...a}}function dO(e,t,n,r){let i=[],o=X0(e,n),s=new Map,a=new Map,l=f=>{let g=e.graph.getNode(f);if(!g||g.id!==t.id&&!YC(e,f,t.id))return;let h=K0(e.graph,t,g,o);return h?{target:g,path:h}:void 0},u=(f,g)=>{let h=g||f.id;s.has(h)||s.set(h,l(h));let d=s.get(h);return d&&{target:d.target,path:[...d.path]}},c=f=>{if(f.type==="INSTANCE"&&Oi(f.instanceOverrides,(g,h,d)=>{let I=u(f,g);if(!I)return;let T=fO({context:e,instance:t,target:I.target,value:d,records:a,writeNodeFields:r},h,I.path,n);T&&i.push(T)}),!An(e.graph,f))for(let g of e.graph.getChildren(f.id))c(g)};return c(t),i}function wy(e){let t=e.guidPath?.guids;return t?.length?t.map(({sessionID:n,localID:r})=>`${n}:${r}`).join("/"):null}function pO(e,t){let n=new Map;e.forEach((r,i)=>{let o=wy(r);o&&n.set(o,i)});for(let r of t){let i=wy(r),o=i?n.get(i)??-1:-1;o<0?(i&&n.set(i,e.length),e.push(r)):e[o]={...e[o],...r,...Xn(e[o],r)}}}function Vr(e){return e.symbolData}function Fr(e){return Vr(e)?.symbolOverrides??[]}function aa(e){return Vr(e)?.uniformScaleFactor??1}function Gr(e,t,n){t(e,n);for(let r of Fr(e))Gr(r,t,r)}var tv=Hn;function la(e){let t=e?.slotContentIdValue?.guid;if(t)return Wn(t)?void 0:t}function nv(e){return{value:{slotContentIdValue:{guid:e}},dataType:"SLOT_CONTENT_ID",resolvedDataType:"SLOT_CONTENT_ID"}}function mO(e){let t={varValue:nv({...tv})},n=e.slotSettings;if(!n)return t;let r={stretchChildOnInsert:n.stretchChildOnInsert,displayByDefault:n.displayEmptyByDefault,allowPreferredValuesOnly:n.allowPreferredValuesOnly};return n.minChildren!==void 0&&(r.minChildren=n.minChildren),n.maxChildren!==void 0&&(r.maxChildren=n.maxChildren),t.slotPropConfig=r,t}function hO(e,t,n){let r=i=>{for(let o of e.graph.getChildren(i.id)){if(vt(o)===n&&An(e.graph,o))return o;if(o.type==="INSTANCE")continue;let s=r(o);if(s)return s}};return r(t)}function gO(e,t,n,r,i){let o=e.slotContentRecords,s=hO(e,t,n);if(!o||!s)return null;let a=e.sceneNodeToKiwi(s,{...tv},0,i,e),l=a.at(0);return l?.guid?(yO(l),o.push(...a),{defID:r,varValue:nv(l.guid)}):null}function yO(e){e.isSlotContent=!0,Reflect.deleteProperty(e,"componentPropRefs");let t=e.parameterConsumptionMap?.entries?.filter(n=>n.variableField!=="SLOT_CONTENT_ID");t?.length?e.parameterConsumptionMap={entries:t}:Reflect.deleteProperty(e,"parameterConsumptionMap")}var ky=new WeakMap;function vO(e,t,n){let r=e.orderKeys?.get(t.id);if(r)return r;let i=t.parentId;if(!i)return e.fractionalPosition(n);let o=e.graph.getNode(i);if(!o||o.type==="CANVAS")return e.fractionalPosition(n);let s=ky.get(e);s||(s=new Map,ky.set(e,s));let a=s.get(i);if(!a){let l=e.graph.getChildren(i).filter(c=>!c.internalOnly),u=Sy(l.map(c=>c.source.orderKey));a={keyById:new Map(l.map((c,f)=>[c.id,u[f]]))},s.set(i,a)}return a.keyById.get(t.id)??e.fractionalPosition(n)}function IO(e){return e==="EXCLUDE"?"XOR":e??"UNION"}function rv(e,t){let n=new Map;for(let[r,i]of e.variables){if(!i.key)continue;let o=t.get(r)??ct(r);n.set(i.key,o),i.version&&n.set(`${i.key}@${i.version}`,o)}return n}function TO(e){return e==="BOOLEAN"?"BOOL":e}function Bc(e,t,n,r){if(e==="BOOLEAN")return{boolValue:t==="true"};if(e==="INSTANCE_SWAP"){let i=n.graph.getNode(t),o=i?no(n,i.id,r):on(t);return o?{guidValue:o}:{textValue:{characters:t}}}return{textValue:{characters:t}}}function _y(e,t,n,r){let i=Bc(e,t,n,r);return e==="BOOLEAN"?{value:{boolValue:t==="true"},dataType:"BOOLEAN",resolvedDataType:"BOOLEAN"}:e==="INSTANCE_SWAP"&&"guidValue"in i?{value:{symbolIdValue:{guid:i.guidValue}},dataType:"SYMBOL_ID",resolvedDataType:"SYMBOL_ID"}:{value:{textValue:t},dataType:"STRING",resolvedDataType:"STRING"}}function SO(e,t,n){let r=Object.entries(e.variableModes).flatMap(([i,o])=>{let s=t?.get(i)??on(i),a=n?.get(o)??on(o);return!s||!a?[]:[{variableSetID:{guid:s},variableModeID:a}]});return r.length>0?{entries:r}:void 0}var bO=new Set(["variableConsumptionMap","parameterConsumptionMap"]),EO=new Set(["colorVar","opacityVar"]),AO=new Set(["BOOLEAN","FLOAT","STRING","ALIAS","COLOR","SYMBOL_ID","TEXT_DATA","PROP_REF"]);function xO(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&"entries"in e}function iv(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function NO(e){if(!iv(e))return!1;let t=e,n=t.variableData?.dataType;return typeof n=="string"&&AO.has(n)||!!t.variableData?.value?.propRefValue}function CO(e){if(!iv(e))return!1;let t=e;return t.variableData?.dataType==="PROP_REF"||!!t.variableData?.value?.propRefValue}function OO(e,t,n,r){if(!xO(e))return;let i=e.entries?.filter(r)??[];if(i.length!==0)return{entries:i.map(o=>jn(o,t,n))}}function RO(e,t,n){let r=e.__openPencilFigmaBlob,i=r instanceof Uint8Array?r:new Uint8Array(Object.values(r??{})),o=Xc(i),s=n.blobIndexByHex?.get(o);if(s!==void 0)return s;let a=t.length;return t.push(i),n.blobIndexByHex?.set(o,a),a}function DO(e,t){return e==="stackCounterAlignItems"&&t==="STRETCH"?"MIN":(e==="stackJustify"||e==="stackPrimaryAlignItems"||e==="stackCounterAlign"||e==="stackCounterAlignItems")&&t==="SPACE_EVENLY"?"SPACE_BETWEEN":t}function jn(e,t,n={}){if(e instanceof Uint8Array)return e;if(Array.isArray(e))return e.map(i=>jn(i,t,n));if(!e||typeof e!="object")return e;if("__openPencilFigmaBlob"in e)return RO(e,t,n);let r={};for(let[i,o]of Object.entries(e))if(!(EO.has(i)&&!n.includePaintVariables)){if(bO.has(i)){let s=OO(o,t,n,n.includeVariableMaps?NO:CO);s!==void 0&&(r[i]=s);continue}r[i]=DO(i,jn(o,t,n))}return r}var MO=new Set(["pageType","derivedSymbolData","derivedSymbolDataLayoutVersion","sourceLibraryKey","minSize","maxSize","variableConsumptionMap","parameterConsumptionMap"]);function PO(e){return e.type!=="TEXT"||e.textPathData===null||(e.derivedTextGlyphs?.length??0)===0||e.textPathBox===null||e.strokeGeometry.length!==0?!1:e.strokes.length>0}function wO(e){return e.type==="TEXT"&&e.textPathData!==null&&ta(e).rawTransform===null&&(e.derivedTextGlyphs?.length??0)>0}function kO(e,t,n){let r=et(t);(PO(t)||wO(t))&&(r={...r},delete r.strokeGeometry,delete r.derivedTextData);let i=jn(r,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0});for(let o of Object.keys(i))if(!MO.has(String(o))){if((o==="fillPaints"||o==="strokePaints")&&t.source.id){let s=i[o],a=o==="fillPaints"?t.fills:t.strokes;n[o]=s?.map((l,u)=>{let c=`${o==="fillPaints"?"fills":"strokes"}/${u}/color`,f=mf(e,t,l,c),g=t.boundVariables[c]?a[u]:void 0;return g?{...f,color:e.safeColor(g.color),opacity:g.opacity}:f});continue}if(o==="effects"&&t.source.id&&e.assetRefToVarGuid&&e.assetRefToVarGuid.size>0){n[o]=_O(i[o],e.assetRefToVarGuid);continue}if(o==="derivedTextData"&&t.source.id){n.derivedTextData=i.derivedTextData;continue}if(o==="textDecorationFillPaints"&&t.source.id){n.textDecorationFillPaints=i.textDecorationFillPaints;continue}o in n||(n[o]=i[o])}}function _O(e,t){if(!Array.isArray(e))return e;let n=e.map(r=>{let i=r.colorVar,o=i?.value?.alias;if(!i||!o||o.guid||!o.assetRef?.key)return r;let s=o.assetRef,a=s.version?`${s.key}@${s.version}`:s.key,l=t.get(a)??t.get(s.key);return l?{...r,colorVar:{...i,value:{...i.value,alias:{guid:l}}}}:r});return n.some((r,i)=>r!==e[i])?n:e}function LO(e,t,n,r){if(t.type!=="INSTANCE"||!t.componentId)return;let i=no(e,KC(e,t.componentId),r);if(i){let s={symbolID:i},a=[];if(t.source.fig.symbolOverrides.length>0&&a.push(...jn(t.source.fig.symbolOverrides,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0})),pO(a,dO(e,t,r,l=>fv(e,l))),a.length>0&&(s.symbolOverrides=a),!Number.isFinite(t.componentScale)||t.componentScale<=0)throw new Error("Invalid instance uniform scale");(t.componentScale!==1||t.source.fig.uniformScaleFactor!=null)&&(s.uniformScaleFactor=t.componentScale),n.symbolData=s}t.source.fig.componentPropAssignments.length>0&&!t.source.editedFields.includes("componentPropertyAssignments")&&(n.componentPropAssignments=jn(t.source.fig.componentPropAssignments,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0}));let o=jn(t.source.fig.derivedSymbolData,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0});n.derivedSymbolData=ZC(e.graph,t,X0(e,r),o,s=>({size:sv(s),transform:av(e,s)})),t.source.fig.derivedSymbolDataLayoutVersion!=null&&(n.derivedSymbolDataLayoutVersion=t.source.fig.derivedSymbolDataLayoutVersion)}function VO(e,t){if((e.type==="INSTANCE_SWAP"||e.type==="SLOT")&&e.preferredValues?.length)return{instanceSwapValues:e.preferredValues.map(n=>{let r=t.graph.getNode(n);return{type:"COMPONENT",key:r?.componentKey||r?.sourceLibraryKey||n}})};if(e.type==="VARIANT"&&e.variantOptions?.length)return{stringValues:[...e.variantOptions]}}function FO(e){return e==="TEXT"?"TEXT_DATA":e==="INSTANCE_SWAP"?"OVERRIDDEN_SYMBOL_ID":e==="SLOT_CONTENT"?"SLOT_CONTENT_ID":"VISIBLE"}function ov(e){let t=new Map;for(let n of e.getAllNodes())for(let r of n.componentPropertyDefinitions)t.has(r.id)||t.set(r.id,r);return t}function Ks(e,t,n,r=!1){return n&&!(t in et(e))&&!r}function GO(e){let t=e.parameterConsumptionMap?.entries??[],n=new Set(t.map(i=>i.variableField)),r=e.variableConsumptionMap?.entries??[];r.length&&(e.parameterConsumptionMap={entries:[...r.filter(i=>!n.has(i.variableField)),...t]})}function BO(e,t){if(!t.length)return;let n=e.parameterConsumptionMap,r=new Set(t.map(s=>s.componentPropNodeField)),i=(n?.entries??[]).filter(s=>!r.has(s.variableField??"")),o={VISIBLE:"BOOLEAN",TEXT_DATA:"STRING",OVERRIDDEN_SYMBOL_ID:"SYMBOL_ID",SLOT_CONTENT_ID:"SLOT_CONTENT_ID"};for(let s of t)i.push({variableField:s.componentPropNodeField,variableData:{value:{propRefValue:{defId:s.defID}},dataType:"PROP_REF",resolvedDataType:o[s.componentPropNodeField]}});e.parameterConsumptionMap={entries:i}}function UO(e,t,n,r){t.componentKey&&(n.componentKey=t.componentKey),t.sourceLibraryKey&&(n.sourceLibraryKey=t.sourceLibraryKey);let i=t.publishId?on(t.publishId):null,o=t.overrideKey?on(t.overrideKey):null;i&&(n.publishID=i),o&&(n.overrideKey=o),t.sharedSymbolVersion&&(n.sharedSymbolVersion=t.sharedSymbolVersion),t.publishedVersion&&(n.publishedVersion=t.publishedVersion),(t.type==="COMPONENT_SET"||t.isPublishable)&&(n.isPublishable=t.isPublishable),(t.type==="COMPONENT"||t.isSymbolPublishable)&&(n.isSymbolPublishable=t.isSymbolPublishable),t.isExposedInstance&&(n.propsAreBubbled=!0),t.symbolDescription&&(n.symbolDescription=t.symbolDescription),t.symbolLinks.length>0&&(n.symbolLinks=structuredClone(t.symbolLinks));let s=t.componentPropertyDefinitions.map(f=>{let g={id:Ki(e,f.id,r),name:f.name,type:TO(f.type),preferredValues:VO(f,e)};return f.type==="SLOT"?Object.assign(g,mO(f)):(g.initialValue=Bc(f.type,f.defaultValue,e,r),g.varValue=_y(f.type,f.defaultValue,e,r)),f.description&&(g.description=f.description),g});Ks(t,"componentPropDefs",s.length>0)&&(n.componentPropDefs=s);let a=t.componentPropertyReferences.map(f=>({defID:Ki(e,f.propertyId,r),componentPropNodeField:FO(f.field)})),l=a.filter(f=>f.componentPropNodeField!=="SLOT_CONTENT_ID");Ks(t,"componentPropRefs",l.length>0)&&(n.componentPropRefs=l),BO(n,a);let u=Object.entries(t.componentPropertyAssignments).map(([f,g])=>{let h=e.componentPropertyDefinitionsById.get(f);return h?h.type==="SLOT"?gO(e,t,f,Ki(e,f,r),r):{defID:Ki(e,f,r),value:Bc(h.type,g,e,r),varValue:_y(h.type,g,e,r)}:null}).filter(f=>f!==null);Ks(t,"componentPropAssignments",u.length>0,!!n.componentPropAssignments)&&(n.componentPropAssignments=u);let c=t.variantPropSpecs.map(f=>({propDefId:Ki(e,f.propDefId,r),value:f.value}));Ks(t,"variantPropSpecs",c.length>0)&&(n.variantPropSpecs=c)}function sv(e){let t=ta(e);return t.rawSize&&t.rawTransform?{...t.rawSize}:{x:e.width,y:e.height}}function av(e,t){let n=ta(t).rawTransform;return n?{...n}:e.computeExportTransform(t)}function Pc(e){let t=et(e);return"fillGeometry"in t||"strokeGeometry"in t}function Ly(e){return"vectorData"in et(e)}var zO=new Set(["DROP_SHADOW","INNER_SHADOW","LAYER_BLUR","BACKGROUND_BLUR","FOREGROUND_BLUR"]);function HO(e){let t=et(e).effects;return Array.isArray(t)&&t.some(n=>n&&typeof n=="object"&&"type"in n&&!zO.has(String(n.type)))}function WO(e){return!Pc(e)&&!Ly(e)?e:{...e,fillGeometry:Pc(e)?[]:e.fillGeometry,strokeGeometry:Pc(e)?[]:e.strokeGeometry,vectorNetwork:Ly(e)?null:e.vectorNetwork}}function $O(e){let t=e.pattern==="ROWS"||e.pattern!=="COLUMNS"&&e.axis==="Y";return{type:e.type??e.alignment??"STRETCH",axis:t?"Y":"X",visible:e.visible??!0,numSections:ks(e),offset:e.offset??0,sectionSize:e.sectionSize??(e.pattern==="GRID"?10:0),gutterSize:e.gutterSize??0,color:e.color??{r:1,g:0,b:0,a:.1},pattern:e.pattern==="GRID"?"GRID":"STRIPES"}}function jO(e,t,n){let r=i=>Qs(e,i);t.fillStyleId&&(n.styleIdForFill=r(t.fillStyleId)),t.strokeStyleId&&(n.styleIdForStrokeFill=r(t.strokeStyleId)),t.textStyleId&&(n.styleIdForText=r(t.textStyleId)),t.effectStyleId&&(n.styleIdForEffect=r(t.effectStyleId)),t.gridStyleId&&(n.styleIdForGrid=r(t.gridStyleId)),t.layoutGrids.length>0&&(n.layoutGrids=t.layoutGrids.map($O)),t.guides.length>0&&(n.guides=Wy(t.guides))}function XO(e,t,n){e.serializeTextProps(t,n,e.graph,e.fontDigestMap,e.blobs,e.glyphBlobMap),n.textData&&QC(e,t,n.textData)}function lv(e,t,n){t.independentStrokeWeights&&(n.borderStrokeWeightsIndependent=!0,n.borderTopWeight=t.borderTopWeight,n.borderRightWeight=t.borderRightWeight,n.borderBottomWeight=t.borderBottomWeight,n.borderLeftWeight=t.borderLeftWeight),t.fills.length>0&&(n.fillPaints=hf(e,t)),e.serializeCornerRadii(t,n),(t.type==="POLYGON"||t.type==="STAR")&&(n.count=t.pointCount),t.type==="STAR"&&(n.starInnerScale=t.starInnerRadius),t.effects.length>0&&!HO(t)&&(n.effects=t.effects.map(i=>({type:i.type==="LAYER_BLUR"?"FOREGROUND_BLUR":i.type,color:e.safeColor(i.color),offset:i.offset,radius:i.radius,spread:i.spread,visible:i.visible,blendMode:i.blendMode??"NORMAL",showShadowBehindNode:i.showShadowBehindNode}))),t.type==="TEXT"&&XO(e,t,n),t.type!=="VECTOR"&&(n.frameMaskDisabled=!t.clipsContent),jO(e,t,n),t.horizontalConstraint!=="MIN"&&(n.horizontalConstraint=t.horizontalConstraint),t.verticalConstraint!=="MIN"&&(n.verticalConstraint=t.verticalConstraint),t.strokeCap!=="NONE"&&(n.strokeCap=t.strokeCap);let r=et(t);(t.strokeJoin!=="MITER"||"strokeJoin"in r)&&(n.strokeJoin=t.strokeJoin),(t.strokeMiterLimit!==yi||"miterLimit"in r)&&(n.miterLimit=t.strokeMiterLimit),t.dashPattern.length>0&&(n.dashPattern=t.dashPattern),t.arcData&&(n.arcData={startingAngle:t.arcData.startingAngle,endingAngle:t.arcData.endingAngle,innerRadius:t.arcData.innerRadius}),t.autoRename||(n.autoRename=!1)}function KO(e,t){return e.textPathData!==null&&e.type==="TEXT"&&(e.derivedTextGlyphs?.length??0)>0?"TEXT_PATH":t.mapToFigmaType(e.type)}function uv(e,t){let n=ev(e,t);return{...n,pluginData:e.pluginDataOverrides?.get(t.id)??n.pluginData}}function YO(e,t){return e.type==="INSTANCE"||t.writeChildren===!1?[]:t.graph.getChildren(e.id).filter(n=>!n.internalOnly&&n.sharedStyleType===null)}function cv(e,t){if(e.strokes.length>0)t.strokeWeight=e.strokes[0].weight,t.strokeAlign=e.strokes[0].align;else{let n=et(e);(e.strokeWeight!==wn||"strokeWeight"in n)&&(t.strokeWeight=e.strokeWeight),(e.strokeAlign!=="CENTER"||"strokeAlign"in n)&&(t.strokeAlign=e.strokeAlign)}e.locked&&(t.locked=!0)}function fv(e,t){let n=uv(e,t),r={};return n.blendMode!=="PASS_THROUGH"&&(r.blendMode=n.blendMode),cv(n,r),lv({...e,fontDigestMap:void 0},n,r),e.serializeLayoutProps(n,r),r}function Uc(e,t,n,r,i){let o=uv(i,e),s=no(i,o.id,r)??{sessionID:1,localID:r.value++},a=gf(i,o),l=KO(o,i),u={guid:s,parentIndex:{guid:t,position:vO(i,o,n)},type:l,name:o.name,visible:o.visible,opacity:o.opacity,phase:"CREATED",size:sv(o),transform:av(i,o)};o.sharedStyleType&&(u.styleType=o.sharedStyleType),o.blendMode!=="PASS_THROUGH"&&(u.blendMode=o.blendMode),o.type==="GROUP"&&(u.resizeToFit=!0),cv(o,u),lv(i,o,u),UO(i,o,u,r),LO(i,o,u,r),o.type==="COMPONENT_SET"&&(o.pluginData=tn(o.pluginData,Qe.nodeType,o.type)),u.type==="CANVAS"&&(u.pageType="DESIGN"),o.type==="BOOLEAN_OPERATION"&&(u.booleanOperation=IO(o.booleanOperation)),a.length>0&&(u.strokePaints=a),i.serializeLayoutProps(o,u),i.serializeGeometry(WO(o),u,i.blobs),i.serializeVariableBindings(o,u,i.graph,i.varIdToGuid),GO(u),kO(i,o,u);let c=SO(o,i.varIdToGuid,i.modeIdToGuid);c&&(u.variableModeBySetMap=c),f0(o),y0(o),d0(o);let f=I0(o.pluginData);f.length>0&&(u.pluginData=f),o.pluginRelaunchData.length>0&&(u.pluginRelaunchData=T0(o.pluginRelaunchData));let g=[u],h=YO(o,i);for(let d=0;d<h.length;d++)g.push(...i.sceneNodeToKiwi(h[d],s,d,r,i));return g}var dv={shapeText:()=>null,textDecorations:()=>[]},qO=["image","imageThumbnail","animatedImage"],{shader:wc}=Qe;function yf(e){return typeof e=="object"&&e!==null&&!ArrayBuffer.isView(e)}function ZO(e){return yf(e)&&"hash"in e}function JO(e){return yf(e)&&"pluginID"in e&&"key"in e}function zc(e,t){if(Array.isArray(e)){for(let n of e)zc(n,t);return}if(yf(e)){if(JO(e)){t.pluginData(e);return}for(let n of qO){let r=e[n];ZO(r)&&t.image(r)}for(let n of Object.values(e))zc(n,t)}}function QO(e){return e.hash===void 0?null:typeof e.hash=="string"?e.hash:Xc(e.hash)}function vf(e,t){let n=new Map,r=i=>{let o=n.get(i);if(o)return o;let s=t.get(i);if(!s)return null;let a=Ls(s);return n.set(i,a),a};return zc(e,{image(i){let o=QO(i),s=o?r(o):null;!s||s===o||(i.hash=typeof i.hash=="string"?s:Yy(s))},pluginData(i){if(i.pluginID!==bi||i.key!==wc.key)return;let o=wc.decode(i.value),s=o?r(o.image):null;!o||!s||s===o.image||(i.value=wc.encode({...o,image:s}))}}),n}function If(e,t){let n=new Map;for(let[r,i]of e)n.set(t.get(r)??Ls(i),i);return[...n].map(([r,i])=>({name:`images/${r}`,data:i}))}function eR(e,t){let n=e.topLeftRadius>0||e.topRightRadius>0||e.bottomLeftRadius>0||e.bottomRightRadius>0;if(e.cornerRadius>0&&(t.cornerRadius=e.cornerRadius),n||e.independentCorners){let r=e.source.id?et(e)?.rectangleCornerRadiiIndependent:void 0;t.rectangleCornerRadiiIndependent=typeof r=="boolean"?r:e.independentCorners,t.rectangleTopLeftCornerRadius=e.topLeftRadius,t.rectangleTopRightCornerRadius=e.topRightRadius,t.rectangleBottomLeftCornerRadius=e.bottomLeftRadius,t.rectangleBottomRightCornerRadius=e.bottomRightRadius}(e.cornerSmoothing>0||"cornerSmoothing"in et(e))&&(t.cornerSmoothing=e.cornerSmoothing)}function tR(e,t){e.paragraphSpacing!==0&&(t.paragraphSpacing=e.paragraphSpacing),e.paragraphIndent!==0&&(t.paragraphIndent=e.paragraphIndent),e.listSpacing!==0&&(t.listSpacing=e.listSpacing),e.hangingList&&(t.hangingList=!0)}function nR(e,t,n,r,i,o,s){e.pluginData=tn(e.pluginData,Qe.textDirection,e.textDirection),t.fontSize=e.fontSize,t.fontName={family:zi(e.fontFamily),style:oa(e.fontWeight,e.italic),postscript:""},t.textData=H0(e,Yi),e.fontVariations.length>0&&(t.fontVariations=e.fontVariations.map(df));let a=e.textAutoResize,l=et(e);(!e.source.id||a!=="NONE"||"textAutoResize"in l)&&(t.textAutoResize=a),t.textAlignHorizontal=e.textAlignHorizontal,t.textAlignVertical=e.textAlignVertical,t.textUserLayoutVersion=4,t.textExplicitLayoutVersion=1,t.textBidiVersion=1,t.textDecorationSkipInk=e.textDecorationSkipInk,t.fontVariantCommonLigatures=!0,t.fontVariantContextualLigatures=!0,$c(t,e.fontFeatures),t.fontVersion="",t.emojiImageSet="APPLE",e.textCase!=="ORIGINAL"&&(t.textCase=e.textCase),e.textTruncation==="ENDING"&&(t.textTruncation="ENDING"),e.maxLines!=null&&(t.maxLines=e.maxLines),tR(e,t),r&&(t.derivedTextData=j0(e,{digestMap:r,blobs:i,glyphBlobMap:o??new Map,shapeText:u=>s.shapeText(u),textDecorations:(u,c)=>s.textDecorations(u,c)})),e.leadingTrim!=="NONE"&&(t.leadingTrim=e.leadingTrim),t.lineHeight=e.lineHeight===null?{...Ji}:{value:e.lineHeight,units:"PIXELS"},t.letterSpacing={value:e.letterSpacing,units:"PIXELS"},e.textDecoration!=="NONE"&&(t.textDecoration=e.textDecoration==="UNDERLINE"?"UNDERLINE":"STRIKETHROUGH"),e.textDecorationStyle!=="SOLID"&&(t.textDecorationStyle=e.textDecorationStyle),e.textDecorationThickness!=null&&(t.textDecorationThickness={value:e.textDecorationThickness,units:"PIXELS"}),e.textUnderlineOffset!=null&&(t.textUnderlineOffset={value:e.textUnderlineOffset,units:"PIXELS"}),e.textDecorationFills.length>0&&(t.textDecorationFillPaints=e.textDecorationFills.map(Yi))}function pv(e){return e==="HORIZONTAL"||e==="VERTICAL"||e==="NONE"?e:void 0}function Vy(e){return e==="FIXED"||e==="RESIZE_TO_FIT"||e==="RESIZE_TO_FIT_WITH_IMPLICIT_SIZE"?e:void 0}function Zs(e){return e==="SPACE_EVENLY"?"SPACE_BETWEEN":e}function mv(e){return e==="SPACE_EVENLY"?"SPACE_BETWEEN":e}function Hc(e){let t=mv(e);return t==="STRETCH"?"MIN":t}function Fy(e,t,n){if(!e.parentId||e.layoutAlignSelf!=="AUTO"||e.layoutPositioning==="ABSOLUTE")return;let r=n.getNode(e.parentId);r?.counterAxisAlign==="STRETCH"&&(r.layoutMode==="HORIZONTAL"||r.layoutMode==="VERTICAL")&&(t.stackChildAlignSelf="STRETCH")}function Gy(e,t,n,r){return e!==void 0?e:r!==(t??n??r)?r:void 0}function rR(e,t){e.targetAspectRatio&&(t.targetAspectRatio={value:{...e.targetAspectRatio}}),(e.minWidth!=null||e.minHeight!=null)&&(t.minSize={value:{x:e.minWidth??0,y:e.minHeight??0}}),(e.maxWidth!=null||e.maxHeight!=null)&&(t.maxSize={value:{x:e.maxWidth??Number.POSITIVE_INFINITY,y:e.maxHeight??Number.POSITIVE_INFINITY}})}function ea(e){return e==="HUG"?"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":"FIXED"}var iR=new Set(["layoutMode","primaryAxisSizing","counterAxisSizing","layoutGrow","layoutAlignSelf","layoutPositioning"]);function By(e,t,n){e.source.fig.layout&&!e.source.editedFields.some(r=>iR.has(r))||(Gc(n,e,"stackPrimarySizing")&&(t.stackPrimarySizing="FIXED"),Gc(n,e,"stackCounterSizing")&&(t.stackCounterSizing="FIXED"))}function oR(e,t){let n={layoutMode:{stackMode:pv(e.layoutMode)},itemSpacing:{stackSpacing:e.itemSpacing},paddingLeft:{stackHorizontalPadding:e.paddingLeft},paddingRight:{stackPaddingRight:e.paddingRight},paddingTop:{stackVerticalPadding:e.paddingTop},paddingBottom:{stackPaddingBottom:e.paddingBottom},primaryAxisSizing:{stackPrimarySizing:ea(e.primaryAxisSizing)},counterAxisSizing:{stackCounterSizing:ea(e.counterAxisSizing)},primaryAxisAlign:{stackPrimaryAlignItems:Zs(e.primaryAxisAlign)},counterAxisAlign:{stackCounterAlignItems:Hc(e.counterAxisAlign)},layoutGrow:{stackChildPrimaryGrow:e.layoutGrow},layoutAlignSelf:{stackChildAlignSelf:e.layoutAlignSelf},layoutPositioning:{stackPositioning:e.layoutPositioning},layoutWrap:{stackWrap:e.layoutWrap},counterAxisSpacing:{stackCounterSpacing:e.counterAxisSpacing},strokesIncludedInLayout:{bordersTakeSpace:e.strokesIncludedInLayout},itemReverseZIndex:{stackReverseZIndex:e.itemReverseZIndex}};for(let r of e.source.editedFields)r in n&&Object.assign(t,n[r]);e.source.editedFields.includes("layoutDirection")&&hv(e)}function hv(e){e.pluginData=tn(e.pluginData,Qe.layoutDirection,e.layoutDirection)}function sR(e,t,n){e.source.id||hv(e),rR(e,t);let r=e.source.fig.layout;if(r){t.stackMode=pv(r.stackMode),t.stackSpacing=r.stackSpacing,t.stackPadding=r.stackPadding,t.stackPaddingRight=Gy(r.stackPaddingRight,r.stackHorizontalPadding,r.stackPadding,e.paddingRight),t.stackPaddingBottom=Gy(r.stackPaddingBottom,r.stackVerticalPadding,r.stackPadding,e.paddingBottom),t.stackCounterAlign=mv(r.stackCounterAlign),t.stackJustify=Zs(r.stackJustify),t.stackCounterAlignItems=Hc(r.stackCounterAlignItems),t.stackPrimaryAlignItems=Zs(r.stackPrimaryAlignItems);let i=Vy(r.stackPrimarySizing);i&&(t.stackPrimarySizing=i);let o=Vy(r.stackCounterSizing);o&&(t.stackCounterSizing=o),t.stackVerticalPadding=r.stackVerticalPadding,t.stackHorizontalPadding=r.stackHorizontalPadding,t.stackWrap=r.stackWrap,t.stackPositioning=r.stackPositioning,t.stackChildPrimaryGrow=r.stackChildPrimaryGrow,t.stackChildAlignSelf=r.stackChildAlignSelf,t.stackCounterSpacing=r.stackCounterSpacing,t.bordersTakeSpace=r.bordersTakeSpace,r.stackReverseZIndex&&(t.stackReverseZIndex=!0),Fy(e,t,n),oR(e,t),By(e,t,n);return}e.layoutMode!=="NONE"&&e.layoutMode!=="GRID"&&(t.stackMode=e.layoutMode,t.stackSpacing=e.itemSpacing,t.stackVerticalPadding=e.paddingTop,t.stackHorizontalPadding=e.paddingLeft,t.stackPaddingBottom=e.paddingBottom,t.stackPaddingRight=e.paddingRight,t.stackPrimarySizing=ea(e.primaryAxisSizing),t.stackCounterSizing=ea(e.counterAxisSizing),t.stackPrimaryAlignItems=Zs(e.primaryAxisAlign),t.stackCounterAlignItems=Hc(e.counterAxisAlign),e.layoutWrap==="WRAP"&&(t.stackWrap="WRAP"),e.counterAxisSpacing>0&&(t.stackCounterSpacing=e.counterAxisSpacing),t.bordersTakeSpace=e.strokesIncludedInLayout),e.itemReverseZIndex&&(t.stackReverseZIndex=!0),e.layoutPositioning==="ABSOLUTE"&&(t.stackPositioning="ABSOLUTE"),e.layoutGrow>0&&(t.stackChildPrimaryGrow=e.layoutGrow),e.layoutAlignSelf!=="AUTO"?t.stackChildAlignSelf=e.layoutAlignSelf:Fy(e,t,n),By(e,t,n)}function aR(e,t,n){e.isMask&&(t.mask=!0,t.maskType=e.maskType,e.maskIsOutline&&(t.maskIsOutline=!0));let r=[],i={};if(e.vectorNetwork&&e.type==="VECTOR"){let{table:o,styleToId:s}=E0(e.vectorNetwork);r=o;let a=n.length;n.push(A0(e.vectorNetwork,s)),i.vectorNetworkBlob=a,i.normalizedSize={x:e.width,y:e.height}}e.fillGeometry.length>0&&(t.fillGeometry=e.fillGeometry.map(o=>{let s=n.length;if(n.push(o.commandsBlob),!o.fills||o.fills.length===0)return{windingRule:Ys(o.windingRule),commandsBlob:s};let a=r.length+1;return r.push({styleID:a,fillPaints:o.fills.map(Yi)}),{windingRule:Ys(o.windingRule),commandsBlob:s,styleID:a}})),r.length>0&&(i.styleOverrideTable=r),Object.keys(i).length>0&&(t.vectorData=i),e.strokeGeometry.length>0&&(t.strokeGeometry=e.strokeGeometry.map(o=>{let s=n.length;return n.push(o.commandsBlob),{windingRule:Ys(o.windingRule),commandsBlob:s}}))}function lR(e,t,n,r){let i=a0(e,n,r),o={};for(let[s,a]of Object.entries(e.boundVariables)){if(!n.variables.get(a))continue;let l=r?.get(a)??ct(a);o[s]=se(l)}if(e.pluginData=tn(e.pluginData,Qe.boundVariables,Object.keys(o).length>0?o:void 0),i.length>0){t.variableConsumptionMap={entries:i};let s=Xn(et(e),{parameterConsumptionMap:{entries:i}}),a=t.parameterConsumptionMap;Object.assign(t,a?Xn(s,{parameterConsumptionMap:a}):s)}}function Tf(e,t,n,r,i,o,s={}){let{nodeIdToGuid:a,fontDigestMap:l,varIdToGuid:u,glyphBlobMap:c=new Map,blobIndexByHex:f,assignedGuidValues:g,runtime:h=dv,componentPropertyDefinitionsById:d=ov(i),modeIdToGuid:I,propertyIdToGuid:T=new Map,slotContentRecords:E,pluginDataOverrides:S,recordOwners:N,orderKeys:A,writeChildren:_}=s;return Uc(e,t,n,r,{graph:i,blobs:o,blobIndexByHex:f,nodeIdToGuid:a,assignedGuidValues:g,fontDigestMap:l,glyphBlobMap:c,varIdToGuid:u,modeIdToGuid:I,assetRefToVarGuid:u?rv(i,u):void 0,componentPropertyDefinitionsById:d,propertyIdToGuid:T,slotContentRecords:E,pluginDataOverrides:S,recordOwners:N,orderKeys:A,writeChildren:_,fractionalPosition:Oc,mapToFigmaType:Uy,fillToKiwiPaint:Yi,safeColor:Js,computeExportTransform:zy,serializeCornerRadii:eR,serializeTextProps:(C,M,z,w,ee,ie)=>nR(C,M,z,w,ee,ie,h),serializeLayoutProps:(C,M)=>sR(C,M,i),serializeGeometry:aR,serializeVariableBindings:lR,sceneNodeToKiwi:Uc})}var gv={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0};function Sf(e,t="display-p3"){return{guid:e,type:"DOCUMENT",name:"Document",visible:!0,opacity:1,phase:"CREATED",transform:{...gv},strokeWeight:wn,strokeAlign:"CENTER",strokeJoin:"MITER",documentColorProfile:t==="display-p3"?"DISPLAY_P3":"SRGB"}}function bf(e,t,n,r,i){return{guid:e,parentIndex:{guid:t,position:n},type:"CANVAS",name:r,visible:!0,opacity:1,phase:"CREATED",transform:{...gv},strokeWeight:wn,strokeAlign:"CENTER",strokeJoin:"MITER",pageType:"DESIGN",...i}}var{token:yv,modeConditions:vv,modeAttribute:Iv}=Qe;function ua(e){return cs(e,[yv,vv,Iv])}function uR(e){return Ai(e)?void 0:e}function cR(e,t){return typeof e=="number"&&Math.fround(e)===Math.fround(t)}function Ef(e,t){let n=ft(e,yv)??{},r=Object.entries(n.expressions??{}).filter(([i,o])=>cR(t[i],o.resolved));return{unit:n.unit,expressions:uR(Object.fromEntries(r))}}function Af(e){return ft(e,vv)??{}}function xf(e){return ft(e,Iv)}var fR=e=>mu.includes(e),dR=e=>hu.includes(e);function pR(e){let t=(e.codeSyntax?.entries??[]).flatMap(({platform:n,value:r})=>dR(n)&&r?[[n,r]]:[]);return t.length>0?Object.fromEntries(t):void 0}function Nf(e){let t=e.variableScopes?.filter(fR),n=ua(eo(e)),r={description:e.description??e.symbolDescription??"",hiddenFromPublishing:e.isPublishable===!1,scopes:t?.length?t:void 0,codeSyntax:pR(e),pluginData:n.length>0?n:void 0};return typeof e.key=="string"&&(r.key=e.key),typeof e.version=="string"&&(r.version=e.version),r}var hR=400*1024*1024,Cf=5e4,ot=Ao,Tv=fl,Re=()=>crypto.randomUUID().toUpperCase(),ae=(e,t=0)=>Number.isFinite(Number(e))?Number(e):t,io=(e,t=0,n=1)=>Math.max(t,Math.min(n,ae(e))),Yn=(e,t=[0,0])=>{let n=typeof e=="string"?e.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number):null;return n?.length>=2?n:t},tt=(e=0,t=0,n=0,r=1)=>({r:io(e),g:io(t),b:io(n),a:io(r)}),St=(e,t=1)=>({type:"SOLID",color:e,opacity:io(t),visible:!0}),qn=Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="),e=>e.charCodeAt(0));function Br(e){let t=0,n=0;return ar(e,{filter(r){if(t+=r.originalSize,++n>5e4||t>hR)throw new Error("\u89E3\u538B\u540E\u5185\u5BB9\u8FC7\u5927\uFF0C\u8BF7\u62C6\u5206\u8BBE\u8BA1\u6587\u4EF6\u3002");return!0}})}function Ur(e,t,n){let r=e[t];if(!r){if(n!==void 0)return n;throw new Error(`\u6587\u4EF6\u7F3A\u5C11\u5FC5\u8981\u5185\u5BB9\uFF1A${t}`)}try{return JSON.parse(Tv(r))}catch{throw new Error(`\u8BBE\u8BA1\u6570\u636E\u635F\u574F\uFF1A${t}`)}}function da(){let e=new Ui;return e.getPages().forEach(t=>e.deleteNode(t.id)),e}function Of(){let e=new Map;return{add(t,n,r="",i="warning",o="implementation"){let s=`${t}:${o}`,a=e.get(s)||{code:t,message:n,count:0,examples:[],severity:i,category:o};i!=="info"&&(a.severity=i),a.count++,r&&a.examples.length<3&&!a.examples.includes(r)&&a.examples.push(r.slice(0,100)),e.set(s,a)},list(){return[...e.values()]}}}function zr(e,t,n){for(let r of e.nodes.values())r.type!=="CANVAS"&&r.id!==e.rootId&&!t.has(r.id)&&n.add("missing-layer","\u5BFC\u51FA\u5668\u672A\u80FD\u5199\u5165\u6B64\u6E90\u56FE\u5C42\uFF0C\u4E0D\u80FD\u4F5C\u4E3A\u5B8C\u6574\u7ED3\u679C\u4F7F\u7528\u3002",r.name)}function gR(e){let t=new Set(["fontFamily","fontSize","fontWeight","italic","letterSpacing","textDecoration","textCase","fills"]);return e.styleRuns.every(n=>Object.entries(n.style).every(([r,i])=>i===void 0||JSON.stringify(i)===JSON.stringify(e[r])?!0:t.has(r)?r==="fills"?e.fills.length===1&&e.fills[0].opacity===1&&i.length===1&&i[0].type==="SOLID"&&i[0].visible!==!1&&(!i[0].blendMode||i[0].blendMode==="NORMAL"):r==="textCase"?["ORIGINAL","UPPER","LOWER","TITLE"].includes(i):r!=="textDecoration"||["NONE","UNDERLINE","STRIKETHROUGH"].includes(i):!1))}function pa(e,t,n,r={}){if(e.nodes.size>Cf)throw new Error("\u56FE\u5C42\u8D85\u8FC7 50,000 \u4E2A\uFF0C\u8BF7\u6309\u9875\u9762\u62C6\u5206\u540E\u8F6C\u6362\u3002");return e.createNode(t,n,r)}function Sv(e){let t=[...e.nodes.values()].filter(n=>n.id!==e.rootId&&n.type!=="CANVAS");return{pages:e.getPages().length,layers:t.length,images:e.images.size,text:t.filter(n=>n.type==="TEXT").length,artboards:t.filter(n=>n.type==="FRAME"&&e.getNode(n.parentId)?.type==="CANVAS").length}}async function ma(e,t){let n=[...new Uint8Array(await crypto.subtle.digest("SHA-1",t))].map(r=>r.toString(16).padStart(2,"0")).join("");return e.images.set(n,t),n}function Rf(e){return e?.[0]===137&&e[1]===80?"png":e?.[0]===255&&e[1]===216?"jpg":e?.[0]===71&&e[1]===73?"gif":e?.[8]===87&&e[9]===69?"webp":"bin"}function Zn(e){if(!e)return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=Rf(e),r=0,i=0;if(n==="png"&&e.length>=24)r=t.getUint32(16),i=t.getUint32(20);else if(n==="gif"&&e.length>=10)r=t.getUint16(6,!0),i=t.getUint16(8,!0);else if(n==="jpg"){let o=2;for(;o<e.length&&e[o++]===255;){for(;o<e.length&&e[o]===255;)o++;let s=e[o++];if(s===217||s===218)break;if(s===1||s>=208&&s<=216)continue;if(o+2>e.length)break;let a=t.getUint16(o);if(a<2||o+a>e.length)break;if(s>=192&&s<=207&&![196,200,204].includes(s)&&a>=8){i=t.getUint16(o+3),r=t.getUint16(o+5);break}o+=a}}else if(n==="webp"&&e.length>=30){let o=Tv(e.subarray(12,16));if(o==="VP8X")r=1+(t.getUint32(24,!0)&16777215),i=1+(t.getUint32(26,!0)>>>8);else if(o==="VP8 "&&e[23]===157&&e[24]===1&&e[25]===42)r=t.getUint16(26,!0)&16383,i=t.getUint16(28,!0)&16383;else if(o==="VP8L"&&e[20]===47){let s=t.getUint32(21,!0);r=1+(s&16383),i=1+(s>>>14&16383)}}return r>0&&i>0?{width:r,height:i}:null}function Df(e){let t=e.imageTransform;return t&&Object.entries({m00:1,m01:0,m02:0,m10:0,m11:1,m12:0}).some(([n,r])=>Math.abs(ae(t[n],r)-r)>1e-6)}function Jn(e,t,n){if(!n||!["RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE","VECTOR","BOOLEAN_OPERATION","STAR","POLYGON"].includes(e.type))return null;let r={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0,...t.imageTransform},i=r.m00*r.m11-r.m01*r.m10;return!Object.values(r).every(Number.isFinite)||Math.abs(i)<1e-12?null:{a:e.width*r.m11/i/n.width,b:-e.height*r.m10/i/n.width,c:-e.width*r.m01/i/n.height,d:e.height*r.m00/i/n.height,tx:e.width*(r.m01*r.m12-r.m11*r.m02)/i,ty:e.height*(r.m10*r.m02-r.m00*r.m12)/i}}function Mf(e,t){if(t.type!=="FRAME"||!["HORIZONTAL","VERTICAL"].includes(t.layoutMode)||t.layoutWrap!=="NO_WRAP"||t.primaryAxisAlign!=="SPACE_BETWEEN"||t.counterAxisAlign!=="CENTER"||t.primaryAxisSizing!=="FIXED"||t.counterAxisSizing!=="FIXED"||t.clipsContent||t.fills.length||t.strokes.length||t.effects.length||t.rotation||t.flipX||t.flipY||[t.paddingTop,t.paddingRight,t.paddingBottom,t.paddingLeft].some(Boolean))return null;let n=e.getChildren(t.id);if(n.length!==2||n.some(u=>!u.visible||u.isMask||u.rotation||u.flipX||u.flipY||u.layoutGrow||u.layoutAlignSelf!=="AUTO"||u.layoutPositioning!=="AUTO"))return null;let r=t.layoutMode==="HORIZONTAL",i=r?"x":"y",o=r?"width":"height",s=r?"y":"x",a=r?"height":"width",l=(u,c)=>Math.abs(u-c)<.01;return!l(n[0][i],0)||!l(n[1][i]+n[1][o],t[o])||n.some(u=>!l(u[s]+u[a]/2,t[a]/2))?null:{horizontal:r,children:n}}function ha(e,t){if(t.type!=="COMPONENT"||e.getNode(t.parentId)?.type!=="CANVAS"||t.componentPropertyDefinitions?.length)return!1;for(let r of e.nodes.values())if(r.type==="INSTANCE"&&r.componentId===t.id)return!1;function n(r){return r!==t&&["COMPONENT","COMPONENT_SET","INSTANCE"].includes(r.type)||r.isMask||r.layoutMode!=="NONE"||r.effects.length?!1:e.getChildren(r.id).every(n)}return n(t)}function oo(e,t,n=t.maskType){if(Pf(e,t,n))return!0;if(!t.visible||t.opacity!==1||t.effects.some(i=>i.visible)||t.fills.length>1||t.strokes.length>1||[...t.fills,...t.strokes].some(i=>!i.visible||i.opacity!==1||i.blendMode&&!["NORMAL","PASS_THROUGH"].includes(i.blendMode))||["GROUP","FRAME"].includes(t.type)||!["RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE","VECTOR","BOOLEAN_OPERATION","STAR","POLYGON"].includes(t.type)||["VECTOR","BOOLEAN_OPERATION"].includes(t.type)&&!Xe(t))return!1;if(n==="VECTOR")return!0;if(t.strokes.some(i=>i.visible))return!1;let r=t.fills.filter(i=>i.visible);return r.length>0&&r.every(i=>{let o=i.type==="SOLID"?[i.color]:i.type.startsWith("GRADIENT")?(i.gradientStops||[]).map(s=>s.color):[];return i.opacity===1&&o.length>0&&o.every(s=>s.a===1&&(n!=="LUMINANCE"||s.r===1&&s.g===1&&s.b===1))})}function Pf(e,t,n=t.maskType){if(!["ALPHA","LUMINANCE"].includes(n)||!t.visible)return null;let r=[];function i(o,s){if(!o.visible)return!0;if(o.opacity!==1||o.effects.some(u=>u.visible)||o.isMask&&o!==t||!["NORMAL","PASS_THROUGH"].includes(o.blendMode))return!1;let a=o===t?{a:1,b:0,c:0,d:1,tx:0,ty:0}:sn(o),l={a:s.a*a.a+s.c*a.b,b:s.b*a.a+s.d*a.b,c:s.a*a.c+s.c*a.d,d:s.b*a.c+s.d*a.d,tx:s.a*a.tx+s.c*a.ty+s.tx,ty:s.b*a.tx+s.d*a.ty+s.ty};if(o.type==="GROUP")return!o.fills.length&&!o.strokes.length&&e.getChildren(o.id).every(u=>i(u,l));if(!["VECTOR","RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE","LINE","STAR","POLYGON"].includes(o.type)||o.type==="VECTOR"&&(!Xe(o)||o.fillGeometry.some(u=>u.windingRule!==(o.fillGeometry[0]?.windingRule||"NONZERO"))))return!1;for(let[u,c]of[[!1,o.fills],[!0,o.strokes]])for(let f of c.filter(g=>g.visible)){if(f.opacity!==1||f.blendMode&&!["NORMAL","PASS_THROUGH"].includes(f.blendMode))return!1;let g=f.type==="SOLID"?[f.color]:f.type.startsWith("GRADIENT")?f.gradientStops?.map(d=>d.color)||[]:[];if(!g.length||g.some(d=>d.a!==1))return!1;let h=g.map(d=>n==="ALPHA"||d.r===1&&d.g===1&&d.b===1?1:d.r===0&&d.g===0&&d.b===0?0:-1);if(h.some(d=>d<0||d!==h[0])||u&&((f.dashPattern||o.dashPattern).length||!["NONE","ROUND","SQUARE"].includes(f.cap||o.strokeCap)||!["MITER","ROUND","BEVEL"].includes(f.join||o.strokeJoin)||!["CENTER","INSIDE","OUTSIDE"].includes(f.align)))return!1;r.push({node:o,matrix:l,stroke:u?f:null,include:h[0]===1})}return e.getChildren(o.id).length===0}return i(t,{a:1,b:0,c:0,d:1,tx:0,ty:0})&&r.length?r:null}function bv(e,t,n=t.maskType){if(t.opacity<1)return!0;let r=t.type==="GROUP"?[]:[...t.fills,...t.strokes].filter(i=>i.visible);for(let i of r){if(i.opacity<1)return!0;let o=i.type==="SOLID"?[i.color]:i.gradientStops?.map(s=>s.color)||[];if(o.some(s=>s.a<1))return!0;if(n==="LUMINANCE"){let s=o.map(a=>.2126*a.r+.7152*a.g+.0722*a.b);if(s.some(a=>a>1e-6&&a<1-1e-6)||i.type.startsWith("GRADIENT")&&s.some(a=>Math.abs(a-s[0])>1e-6))return!0}}return e.getChildren(t.id).filter(i=>i.visible).some(i=>bv(e,i,n))}function Hr(e){let t=(0,fa.default)(e).abs().unshort().unarc();if(t.err)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u77E2\u91CF\u8DEF\u5F84\u3002");let n=0,r=0,i=[];return t.iterate(o=>{o[0]==="H"&&(o=["L",o[1],r]),o[0]==="V"&&(o=["L",n,o[1]]);let s=o[0].toUpperCase();s==="M"||s==="L"?(n=o[1],r=o[2],i.push({type:s,x:n,y:r})):s==="C"?(n=o[5],r=o[6],i.push({type:s,x1:o[1],y1:o[2],x2:o[3],y2:o[4],x:n,y:r})):s==="Q"?(n=o[3],r=o[4],i.push({type:s,x1:o[1],y1:o[2],x:n,y:r})):s==="Z"&&i.push({type:"Z"})}),i}function wf(e){let t=Hr(e).flatMap(i=>[[i.x,i.y],[i.x1,i.y1],[i.x2,i.y2]].filter(o=>o.every(Number.isFinite)));if(!t.length)return{x:0,y:0,width:0,height:0};let n=t.map(i=>i[0]),r=t.map(i=>i[1]);return{x:Math.min(...n),y:Math.min(...r),width:Math.max(...n)-Math.min(...n),height:Math.max(...r)-Math.min(...r)}}function Qn(e,t="NONZERO"){return{vectorNetwork:ty(e,t,{includeOpenRegions:!0}),fillGeometry:[{windingRule:t,commandsBlob:sa(Hr(e))}]}}function ca(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=0,r=[];for(;n<e.length;){let i=e[n++];if(i===0){r.length&&r.push("Z");continue}let o={1:2,2:2,3:4,4:6}[i];if(!o||n+o*4>e.length)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u77E2\u91CF\u8F6E\u5ED3\u3002");let s=Array.from({length:o},(a,l)=>t.getFloat32(n+l*4,!0)*(l%2?-1:1));n+=o*4,r.push({1:"M",2:"L",3:"Q",4:"C"}[i]+s.join(" "))}return r.join(" ")}function Xe(e){if(e.fillGeometry.length){let s=e.fillGeometry.map(a=>ca(a.commandsBlob)).join(" ");if(e.source?.format==="fig"&&e.height>0){let a=wf(s);if(a.y<-.01&&a.y+a.height<=.01)return ca(Qn((0,fa.default)(s).scale(1,-1).toString()).fillGeometry[0].commandsBlob)}return s}if(e.type==="STAR"||e.type==="POLYGON"){let s=Math.max(3,Math.min(1e3,e.pointCount||5)),a=e.type==="STAR"?s*2:s;return`M${Array.from({length:a},(u,c)=>{let f=-Math.PI/2+c*Math.PI*2/a,g=e.type==="STAR"&&c%2?e.starInnerRadius||.5:1;return`${e.width/2+Math.cos(f)*e.width/2*g} ${e.height/2+Math.sin(f)*e.height/2*g}`}).join(" L")} Z`}let t=e.vectorNetwork;if(!t?.segments.length)return"";let n=new Set,r=[],o=[...t.regions.flatMap(s=>s.loops),...t.segments.map((s,a)=>[a])];for(let s of o){let a=null,l=null;for(let u of s){if(n.has(u))continue;n.add(u);let c=t.segments[u],f=a!==null&&a===c.end,g=t.vertices[f?c.end:c.start],h=t.vertices[f?c.start:c.end],d=f?c.tangentEnd:c.tangentStart,I=f?c.tangentStart:c.tangentEnd;(a===null||a!==(f?c.end:c.start))&&(r.push(`M${g.x} ${g.y}`),l=f?c.end:c.start),r.push(`C${g.x+d.x} ${g.y+d.y} ${h.x+I.x} ${h.y+I.y} ${h.x} ${h.y}`),a=f?c.start:c.end}a!==null&&a===l&&r.push("Z")}return r.join(" ")}function kf(e,t,n,r,i){let o=ae(e.a,1),s=ae(e.b),a=ae(e.c),l=ae(e.d,1),u=Math.hypot(o,s)||1,c=(o*l-s*a)/u,f=Math.atan2(s,o),g=Math.abs(t*u),h=Math.abs(n*c),d=Math.cos(f),I=Math.sin(f);Math.abs(o*a+s*l)>.001&&r.add("skew","\u503E\u659C\u53D8\u6362\u5DF2\u8FD1\u4F3C\u4E3A\u65CB\u8F6C\u548C\u7F29\u653E\u3002",i);let T=c<0?-1:1;return{x:ae(e.tx)-g/2+d*g/2-I*T*h/2,y:ae(e.ty)-h/2+I*g/2+d*T*h/2,width:g,height:h,rotation:f*180/Math.PI,flipY:c<0}}function sn(e){let t=e.rotation*Math.PI/180,n=Math.cos(t),r=Math.sin(t),i=e.flipX?-1:1,o=e.flipY?-1:1,s=n*i,a=r*i,l=-r*o,u=n*o;return{a:s,b:a,c:l,d:u,tx:e.x+e.width/2-s*e.width/2-l*e.height/2,ty:e.y+e.height/2-a*e.width/2-u*e.height/2}}function ga(e=""){return/black|heavy/i.test(e)?900:/extra.?bold/i.test(e)?800:/semi.?bold|demi/i.test(e)?600:/bold/i.test(e)?700:/medium/i.test(e)?500:/thin/i.test(e)?100:/extra.?light/i.test(e)?200:/light/i.test(e)?300:400}var ya=(e,t)=>`${e>=800?"Heavy":e>=700?"Bold":e>=600?"Semibold":e>=500?"Medium":e<=300?"Light":"Regular"}${t?" Italic":""}`;function Ev(e,t,n,r={}){for(let i of e.nodes.values())if(!(i.type==="CANVAS"||i.id===e.rootId)){["COMPONENT","COMPONENT_SET","INSTANCE"].includes(i.type)&&t!=="fig"&&(t!=="xd"||!ha(e,i))&&n.add("component-expanded","\u5C1A\u672A\u5B9E\u73B0\u6B64\u7EC4\u4EF6\u3001\u72B6\u6001\u6216\u5B9E\u4F8B\u5173\u8054\u7684\u7B49\u4EF7\u6620\u5C04\u3002",i.name),i.layoutMode!=="NONE"&&t!=="fig"&&(t!=="xd"||!Mf(e,i))&&n.add("layout-fixed","\u5C1A\u672A\u5B9E\u73B0\u6B64\u81EA\u52A8\u5E03\u5C40\u7684\u7B49\u4EF7\u6620\u5C04\uFF1B\u56FA\u5B9A\u4F4D\u7F6E\u4E0D\u80FD\u4FDD\u7559\u539F\u6709\u81EA\u52A8\u6392\u7248\u89C4\u5219\u3002",i.name);for(let o of[...i.fills,...i.strokes])t!=="fig"&&!["SOLID","IMAGE","GRADIENT_LINEAR","GRADIENT_RADIAL"].includes(o.type)&&n.add("paint-approximation","\u76EE\u6807\u683C\u5F0F\u5C1A\u672A\u5B9E\u73B0\u6B64\u586B\u5145\u7C7B\u578B\u7684\u7B49\u4EF7\u8F6C\u6362\u3002",i.name),t==="xd"&&o.type==="GRADIENT_RADIAL"&&n.add("xd-radial-gradient","\u5F84\u5411\u6E10\u53D8\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u5BFC\u51FA\u5230 XD\u3002",i.name),t!=="fig"&&o.type==="IMAGE"&&(Df(o)||["CROP","STRETCH"].includes(o.imageScaleMode))&&(t!=="xd"||!Jn(i,o,Zn(e.images.get(o.imageHash))))&&n.add("image-crop","\u6B64\u56FE\u7247\u88C1\u526A\u6216\u5C40\u90E8\u53D8\u6362\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",i.name);t!=="fig"&&i.isMask&&(t!=="xd"||!oo(e,i))&&(t==="xd"&&r.mask?.(e,i)?n.add("xd-compatible-mask","\u900F\u660E\u8499\u7248\u5C06\u5199\u5165\u5404\u56FE\u7247\u900F\u660E\u901A\u9053\uFF1B\u539F\u56FE\u3001\u539F\u59CB\u56FE\u5C42\u548C\u8499\u7248\u53C2\u6570\u4FDD\u7559\u5907\u4EFD\uFF0C\u4E0D\u5408\u6210\u6574\u9875\u3002",i.name,"info","compatibility"):t==="xd"&&i.maskType!=="VECTOR"&&bv(e,i)?n.add("mask","\u6B64\u8499\u7248\u4F7F\u7528\u900F\u660E\u5EA6\u6216\u660E\u6697\u53D8\u5316\uFF1BXD \u7684\u5F62\u72B6\u88C1\u5207\u4E0D\u80FD\u76F4\u63A5\u4FDD\u7559\u6B64\u900F\u660E\u8499\u7248\u884C\u4E3A\u3002",i.name,"warning","format"):n.add("mask","\u5C1A\u672A\u5B9E\u73B0\u6B64\u5206\u7EC4\u3001\u63CF\u8FB9\u6216\u7279\u6B8A\u8499\u7248\u7684\u7B49\u4EF7\u6620\u5C04\u3002",i.name)),i.clipsContent&&e.getNode(i.parentId)?.type!=="CANVAS"&&t!=="fig"&&t!=="xd"&&n.add("nested-clip","\u5D4C\u5957\u753B\u6846\u7684\u88C1\u5207\u8303\u56F4\u53EF\u80FD\u53D1\u751F\u53D8\u5316\uFF0C\u8BF7\u68C0\u67E5\u6EA2\u51FA\u5185\u5BB9\u3002",i.name),t==="xd"&&i.type==="BOOLEAN_OPERATION"&&!Xe(i)&&n.add("boolean","\u6B64\u5E03\u5C14\u8FD0\u7B97\u7F3A\u5C11\u53EF\u5BFC\u51FA\u7684\u5408\u6210\u8F6E\u5ED3\uFF0C\u4E0D\u80FD\u4FDD\u8BC1\u5916\u89C2\u3002",i.name),["CONNECTOR","SHAPE_WITH_TEXT"].includes(i.type)&&n.add("special-node","\u90E8\u5206\u7279\u6B8A\u56FE\u5C42\u4EC5\u4FDD\u7559\u53EF\u8BFB\u53D6\u7684\u5B50\u56FE\u5C42\u548C\u57FA\u7840\u5916\u89C2\u3002",i.name),t!=="fig"&&i.arcData&&(i.arcData.innerRadius||Math.abs(i.arcData.endingAngle-i.arcData.startingAngle-Math.PI*2)>.001)&&n.add("arc-shape","\u5706\u5F27\u6216\u73AF\u5F62\u7684\u53C2\u6570\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",i.name),t!=="fig"&&i.strokes.some(o=>String(o.cap||i.strokeCap).startsWith("ARROW"))&&n.add("arrow-cap","\u7BAD\u5934\u7AEF\u70B9\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",i.name),t==="sketch"&&i.effects.filter(o=>o.type.includes("BLUR")).length>1&&n.add("multiple-blurs","Sketch \u5BFC\u51FA\u76EE\u524D\u53EA\u80FD\u4FDD\u7559\u4E00\u4E2A\u6A21\u7CCA\u6548\u679C\u3002",i.name),t==="xd"&&i.effects.some(o=>o.blendMode&&o.blendMode!=="NORMAL")&&n.add("xd-effect-blend","\u6B64\u6548\u679C\u7684\u6DF7\u5408\u6A21\u5F0F\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u5BFC\u51FA\u5230 XD\u3002",i.name),t==="xd"&&i.effects.some(o=>o.spread)&&(r.shadow?.(i)?n.add("xd-compatible-shadow","\u9634\u5F71\u6269\u5C55\u5C06\u91CD\u5EFA\u4E3A\u5C40\u90E8\u900F\u660E\u6548\u679C\u56FE\u5C42\uFF0C\u4FDD\u7559\u53EF\u7F16\u8F91\u539F\u5F62\u72B6\u3001\u539F\u59CB\u56FE\u5C42\u53CA\u6548\u679C\u53C2\u6570\u5907\u4EFD\u3002",i.name,"info","compatibility"):n.add("xd-shadow-spread","XD \u539F\u751F\u9634\u5F71\u6CA1\u6709\u53EF\u7B49\u4EF7\u627F\u63A5\u7684\u6269\u5C55\u53C2\u6570\u3002",i.name,"warning","format")),t==="xd"&&i.type==="TEXT"&&i.fills.some(o=>o.type!=="SOLID")&&(r.text?.(i)?n.add("xd-compatible-text","\u590D\u6742\u6587\u5B57\u586B\u5145\u6309\u539F\u7A3F\u5B57\u5F62\u91CD\u5EFA\u4E3A\u53EF\u7F16\u8F91\u77E2\u91CF\u5916\u89C2\uFF0C\u540C\u65F6\u4FDD\u7559\u53EF\u7F16\u8F91\u6587\u5B57\u548C\u586B\u5145\u53C2\u6570\u5907\u4EFD\uFF1B\u4FEE\u6539\u6587\u5B57\u540E\u9700\u91CD\u65B0\u8F6C\u6362\u5916\u89C2\u3002",i.name,"info","compatibility"):n.add("xd-text-paint","XD \u53EF\u7F16\u8F91\u6587\u5B57\u53EA\u652F\u6301\u7EAF\u8272\u586B\u5145\uFF0C\u65E0\u6CD5\u540C\u65F6\u4FDD\u7559\u6587\u5B57\u7F16\u8F91\u80FD\u529B\u548C\u6B64\u56FE\u7247\u6216\u6E10\u53D8\u586B\u5145\u3002",i.name,"warning","format")),t==="xd"&&i.type==="TEXT"&&!gR(i)&&n.add("xd-text-runs","\u6B64\u6587\u5B57\u5305\u542B\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u4FDD\u7559\u7684\u5C40\u90E8\u6837\u5F0F\uFF0C\u4F8B\u5982\u5C40\u90E8\u884C\u9AD8\u3001\u5B57\u4F53\u7279\u6027\u6216\u590D\u6742\u586B\u5145\u3002",i.name)}}function _f(e,t,n,r,i){let o=t.type==="VECTOR"?Xe(t):"";o&&Object.assign(t,Qn((0,fa.default)(o).scale(n,r).toString())),t.x*=n,t.y*=r,t.width*=n,t.height*=r,t.fontSize*=r,t.lineHeight&&(t.lineHeight*=r),t.letterSpacing*=n,t.cornerRadius*=Math.min(n,r),t.strokes.forEach(s=>{s.weight*=(n+r)/2}),t.rotation&&Math.abs(n-r)>.001&&i.add("scaled-rotation","\u975E\u7B49\u6BD4\u7F29\u653E\u4E0E\u65CB\u8F6C\u7684\u7EC4\u5408\u9700\u8981\u68C0\u67E5\u3002",t.name),e.getChildren(t.id).forEach(s=>_f(e,s,n,r,i))}function Ov(e){return e.layoutScale??1}function yR(e){return ia(e.mainComponentId!==null?Ov(e):1)}function vR(e,t,n){for(let r of Tt(n)){if(r.variableData&&!["ALIAS","EXPRESSION"].includes(r.variableData.dataType??""))continue;let i=r.variableField&&Kn[r.variableField];i&&(we(e.instanceOverrides,e.id,t.id,`boundVariables/${i}`,t.boundVariables[i]??null),we(e.instanceOverrides,e.id,t.id,"boundVariables"))}}function IR(e,t){Rv(e,t,aa(t))}function Rv(e,t,n=1){for(let r of Tt(t)){let i=r.variableField&&Kn[r.variableField];if(!i)continue;e.variableBindingScales??(e.variableBindingScales={});let o=Qi(r.variableData),s=o?.reference?o.multiplier:1,a=i==="opacity"?.01:1,l=r.variableData?.value?.expressionValue&&i!=="opacity"&&i!=="rotation";e.variableBindingScales[i]=s*a/(l?n:1)}}function Dv(e,t,n){let r=[],i=(o,s)=>{if(n(o)){r.push({match:o,top:s});return}if(!t.isInstance(o))for(let a of t.childrenOf(o))i(a,s)};for(let o of e)i(o,o);return r.length===1?{count:1,...r[0]}:{count:r.length}}function*Mv(e,t){yield e;for(let n of t(e))yield*Mv(n,t)}function er(e){return e.guid?se(e.guid):void 0}function tr(e){return e.parentIndex?.guid?se(e.parentIndex.guid):void 0}function Bf(e,t){let n=e.parentIndex?.position??"",r=t.parentIndex?.position??"";return n===r?0:n<r?-1:1}function Ia(e){let t=new Map,n=new Map;for(let r of e){let i=er(r);if(i===void 0)continue;if(t.has(i))throw new Error(`Duplicate source node ${i}`);t.set(i,r);let o=tr(r);if(o===void 0)continue;let s=n.get(o);s?s.push(r):n.set(o,[r])}for(let r of n.values())r.sort(Bf);return{sources:t,children:n}}function bt(e,t){return e?.sessionID===t.sessionID&&e.localID===t.localID}function Ff(e){if(!e||typeof e!="object"||!("sessionID"in e)||!("localID"in e)||typeof e.sessionID!="number"||typeof e.localID!="number")return;let t={sessionID:e.sessionID,localID:e.localID};return Wn(t)?void 0:t}function Uf(e,t){return bt(e.guid,t)||bt(Ff(e.overrideKey),t)}function TR({children:e}){return{childrenOf:t=>e.get(er(t)??"")??[],isInstance:t=>t.symbolData?.symbolID!==void 0}}function Pv(e,t,n){let{count:r,match:i,top:o}=Dv(e.children.get(t)??[],TR(e),s=>Uf(s,n));return{count:r,record:i,topChild:o}}function Av(e,t,n){let r=se(t);for(let[i,o]of n.entries()){let s=e.sources.get(r);if(!s)return!1;if(i===0&&Uf(s,o))continue;let{record:a}=Pv(e,r,o);if(!a)return!1;if(i===n.length-1)return!0;if(!a.symbolData?.symbolID)return!1;r=se(a.symbolData.symbolID)}return!1}function SR(e,t){let n=t,r=new Set;for(;!r.has(n);){r.add(n);let i=e.sources.get(n);if(i?.type!=="INSTANCE"||!i.symbolData?.symbolID)return n;n=se(i.symbolData.symbolID)}return n}function bR(e){let t=e.value;if(t&&(t.boolValue!==void 0||t.textValue!==void 0||t.guidValue!==void 0||t.textDataValue!==void 0))return t;let n=e.varValue?.value;if(n?.symbolIdValue?.guid)return{guidValue:n.symbolIdValue.guid};if(n?.boolValue!==void 0)return{boolValue:n.boolValue};if(n?.textValue!==void 0)return{textValue:n.textValue};if(n?.textDataValue!==void 0)return{textDataValue:n.textDataValue};if(n?.slotContentIdValue)return{slotContentIdValue:n.slotContentIdValue}}function ER(e,t,n){let r=structuredClone([...e]);for(let i of t){let o=bR(i);if(!i.defID||!o)continue;let s={id:i.defID,value:structuredClone(o),origin:"assignment",...n===void 0?{}:{rank:n}},a=r.findIndex(u=>bt(u.id,s.id));if(a===-1){r.push(s);continue}let l=r[a];r[a]={...s,superseded:[...l.superseded??[],structuredClone(l.value)]}}return r}function AR(e){return(e.componentPropDefs??[]).flatMap(t=>t.id&&t.initialValue?[{id:t.id,value:structuredClone(t.initialValue),origin:"default"}]:[])}function xR(e,t,n){let r=qi(e),i=e.componentPropRefs;for(let o of i??[]){if(!o.defID||o.isDeleted)continue;let s=t.find(c=>bt(c.id,o.defID));if(!s)continue;let{value:a,origin:l}=s,u=c=>{n?.({definitionId:structuredClone(s.id),field:c,origin:l},s)};if(o.componentPropNodeField==="VISIBLE"&&a.boolValue!==void 0)r.visible=a.boolValue,u("visible");else if(o.componentPropNodeField==="TEXT_DATA"){let c=typeof a.textValue=="string"?a.textValue:a.textValue?.characters??a.textDataValue?.characters;c!==void 0&&(c!==r.textData?.characters&&(r.derivedTextData=void 0),r.textData={...r.textData,characters:c},u("textData"))}else o.componentPropNodeField==="OVERRIDDEN_SYMBOL_ID"&&a.guidValue?(r.symbolData={...r.symbolData,symbolID:a.guidValue},u("symbolData")):o.componentPropNodeField==="SLOT_CONTENT_ID"&&a.slotContentIdValue&&u("slotContent")}return r}function NR(e,t){let n=e.properties;t.derivedTextData&&(n.derivedTextData=structuredClone(t.derivedTextData)),t.fontSize!==void 0&&(n.fontSize=t.fontSize),t.lineHeight!==void 0&&(n.lineHeight=structuredClone(t.lineHeight)),t.letterSpacing!==void 0&&(n.letterSpacing=structuredClone(t.letterSpacing)),t.size&&(n.size=structuredClone(t.size),e.derivedSize=structuredClone(t.size)),t.transform&&(n.transform=structuredClone(t.transform));let{fillGeometry:r,strokeGeometry:i,vectorData:o}=t;r&&(n.fillGeometry=structuredClone(r)),i&&(n.strokeGeometry=structuredClone(i)),o&&(n.vectorData=structuredClone(o))}function CR(e,t){let n=[],r=[];for(let i of Fr(e)){let{guidPath:o,overriddenSymbolID:s,componentPropAssignments:a,...l}=i,u=o?.guids??[];if(!u.length)continue;let c=a??[];(s||c.length)&&n.push({owner:t,declaredPath:u,path:u,swap:s,assignments:c}),Object.keys(l).length&&r.push({path:u,props:l})}return{structural:n,claims:r}}var OR={childrenOf:e=>e.children,isInstance:e=>e.mainComponentId!==null};function Ta(e){return Mv(e,t=>t.children)}var RR=class extends Error{constructor(t,n){super(n);le(this,"diagnostic");this.diagnostic=t,this.name="InstancePathError"}},va=class extends Error{constructor(t,n){super(`Expected one instance-path target for ${se(n)}; found ${t}`);le(this,"count");this.count=t,this.name="SegmentError"}};function xv(e,t,n,r){return new RR({ownerId:e,mainComponentId:t,path:structuredClone(n),reason:r.count===0?"missing-target":"ambiguous-target"},`Override declared by ${e}, path [${n.map(se).join(", ")}]: ${r.message}`)}function wv(e,t){let n=se(t),{count:r,match:i}=Dv(e.children,OR,o=>bt(o.overrideKey,t)||o.sourceId===n);if(!i)throw new va(r,t);return i}function Gf(e,t){return bt(e.properties.symbolData?.symbolID,t)||bt(e.mainComponentOverrideKey,t)||bt(e.sourceComponentOverrideKey,t)||bt(e.sourceComponentId,t)}function kv(e,t){let n=e;for(let[r,i]of t.entries())r===0&&Gf(e,i)||(n=wv(n,i));return n}function DR(e,t,n){if(!t?.properties.size||!n.size)return;let r=aa(n);_v(e,{x:t.properties.size.x*r,y:t.properties.size.y*r},n.size)}function Nv(e,t,n,r,i){let o=r-n;if(i==="SCALE"&&n>0){let s=r/n;return{position:e*s,size:t*s}}return i==="MAX"?{position:e+o,size:t}:i==="CENTER"?{position:e+o/2,size:t}:i==="STRETCH"?{position:e,size:Math.max(0,t+o)}:{position:e,size:t}}function _v(e,t,n){if(t.x===n.x&&t.y===n.y)return;let r=e.properties.stackMode&&e.properties.stackMode!=="NONE";for(let i of e.children){let o=i.properties;if(r&&o.stackPositioning!=="ABSOLUTE"||!o.size)continue;let s=o.transform??{m00:1,m01:0,m02:0,m10:0,m11:1,m12:0},a=Nv(s.m02,o.size.x,t.x,n.x,o.horizontalConstraint),l=Nv(s.m12,o.size.y,t.y,n.y,o.verticalConstraint),u={x:a.size,y:l.size};_v(i,o.size,u),o.size=u,o.transform={...s,m02:a.position,m12:l.position}}}var Lf=(e,t)=>({x:e.x*t,y:e.y*t});function Lv(e,t){e.fontSize!==void 0&&(e.fontSize*=t);for(let r of["lineHeight","letterSpacing"]){let i=e[r];i?.units==="PIXELS"&&(e[r]={...i,value:i.value*t})}if(e.textData?.styleOverrideTable){e.textData=structuredClone(e.textData);for(let r of e.textData.styleOverrideTable??[])Lv(r,t)}if(!e.derivedTextData)return;let n=structuredClone(e.derivedTextData);n.layoutSize&&(n.layoutSize=Lf(n.layoutSize,t)),n.truncatedHeight!==void 0&&(n.truncatedHeight*=t);for(let r of n.glyphs??[])r.position=Lf(r.position,t),r.fontSize*=t;for(let r of n.baselines??[])r.position=Lf(r.position,t),r.width*=t,r.lineHeight*=t,r.lineAscent*=t,r.lineY!==void 0&&(r.lineY*=t);e.derivedTextData=n}var Vv=["stackPadding",...Object.values(J0)],Fv=["strokeWeight","cornerRadius","rectangleTopLeftCornerRadius","rectangleTopRightCornerRadius","rectangleBottomLeftCornerRadius","rectangleBottomRightCornerRadius"],MR=["fontSize","lineHeight","letterSpacing","textData","derivedTextData"],PR=[...Vv,...Fv,...MR,"dashPattern","effects","size","transform"];function wR(e,t){for(let n of Fv){let r=e[n];typeof r=="number"&&(e[n]=r*t)}e.dashPattern&&(e.dashPattern=e.dashPattern.map(n=>n*t)),e.effects&&(e.effects=e.effects.map(n=>({...n,offset:n.offset?{x:n.offset.x*t,y:n.offset.y*t}:n.offset,radius:typeof n.radius=="number"?n.radius*t:n.radius,spread:typeof n.spread=="number"?n.spread*t:n.spread})))}function kR(e,t){let n=aa(t);if(!Number.isFinite(n)||n<=0)throw new Error("Invalid instance uniform scale");if(n!==1){for(let r of Ta(e)){r.layoutScale=(r.layoutScale??1)*n;for(let o of Object.keys(r.variableBindingScales??{}))r.variableBindingScales&&o!=="opacity"&&o!=="rotation"&&(r.variableBindingScales[o]*=n);let i=r.properties;Lv(i,n),wR(i,n);for(let o of Vv){let s=i[o];typeof s=="number"&&(i[o]=s*n)}i.size&&(i.size={x:i.size.x*n,y:i.size.y*n}),i.transform&&(i.transform={...i.transform,m02:i.transform.m02*n,m12:i.transform.m12*n}),r.derivedSize&&(r.derivedSize={x:r.derivedSize.x*n,y:r.derivedSize.y*n})}for(let r of PR){let i=t[r];i!==void 0&&Object.assign(e.properties,{[r]:structuredClone(i)})}}}var _R=["fontSize","fontName","fontVariations","letterSpacing","lineHeight","textCase","textAlignHorizontal","textAlignVertical","textAutoResize","styleIdForText","fontVariantCommonLigatures","fontVariantContextualLigatures"];function LR(e,t){if("derivedTextData"in t)return;let n=t.textData;(n!==void 0&&Object.entries(n).some(([r,i])=>!it(i,e.textData?.[r]))||_R.some(r=>r in t&&!it(e[r],t[r])))&&(e.derivedTextData=void 0)}function zf(e){return{instance:(t,n={})=>Vf(e,t,"INSTANCE",n),component:(t,n={})=>Vf(e,t,"SYMBOL",n),page:(t,n={})=>Vf(e,t,"CANVAS",n)}}function Vf(e,t,n,r){let{sources:i,children:o}=e,s=new Set,a=new WeakMap,l=new WeakMap,u=R=>{let U=i.get(R.sourceId);if(U?.type==="INSTANCE")return R.properties.name;let y=U?.parentIndex?.guid,O=y?i.get(se(y)):void 0;return O?.isStateGroup===!0?O.name:R.properties.name},c=R=>{if(!R)return[];let U=Ff(i.get(se(R))?.overrideKey);return U?[R,U]:[R]},f=({boundary:R})=>R?.replaced.some(U=>Av(e,U,R.path))??!1,g=(R,U)=>{if(U.count===0&&f(R))return;let y=xv(R.owner.id,R.owner.mainComponentId,R.declaredPath,U);if(U.count!==0||!r.onUnresolvedAssignment)throw y;R.owner.unresolved.push({...y.diagnostic,assignments:structuredClone(R.assignments)})},h=(R,U)=>{let y=new Map;for(let O of U){let[k]=O.path,{count:P,topChild:F}=Pv(e,R,k);if(!F?.guid){g(O,new va(P,k));continue}let L=se(F.guid),G=Uf(F,k),te={...O,path:G?O.path.slice(1):O.path},j=y.get(L);j?j.push(te):y.set(L,[te])}return y},d=(R,U,y)=>{let O=R.symbolData?.symbolID;return U?[...O?[O]:[],...y].filter(k=>!bt(k,U)):[]},I=(R,U,y,O,k)=>{let P=U.symbolData?.symbolID,F=d(R,P,y),L=[...c(R.symbolData?.symbolID),...c(P)],G=B=>L.some(ne=>bt(ne,B)),te=[{assignments:U.componentPropAssignments??[],rank:k}],j=[],J=B=>{if(!P)throw new Error("Swap target is not an instance");bt(P,B)||F.push(P),P=B;for(let ne of c(P))G(ne)||L.push(ne)};for(let B of O){let ne=B.path.length===0||G(B.path[0]);if(!ne||B.path.length>1){j.push(ne?{...B,path:B.path.slice(1)}:B);continue}B.swap&&J(B.swap),B.assignments.length&&te.push({assignments:B.assignments,rank:B.owner.rank})}return{effective:P,replaced:F,groups:te,descendant:j}},T=(R,U,y,O)=>{let k=a.get(y),P=Object.fromEntries(Object.entries(O.props).filter(([F])=>{let L=k?.get(F);return L===void 0||L>=U}));Object.keys(P).length!==0&&(Rv(y,P),LR(y.properties,P),Object.assign(y.properties,qi(P),Xn(y.properties,P)),"name"in P&&(y.hasOwnName=!0),R.propertyClaims.push({declaredBy:R.sourceId,path:structuredClone(O.path),properties:structuredClone(P)}))},E=(R,U)=>{let y=R;for(let[O,k]of U.entries()){let P=U.slice(O);if((l.get(y)??[]).some(F=>Av(e,F,P)))return!0;if(!(O===0&&Gf(y,k)))try{y=wv(y,k)}catch(F){if(!(F instanceof va))throw F;return!1}}return!1},S=(R,U)=>{try{return kv(R,U)}catch(y){if(!(y instanceof va))throw y;let O=xv(R.sourceId,R.mainComponentId,U,y);if(O.diagnostic.reason==="missing-target"&&E(R,U))return;if(!r.onUnresolvedProperty)throw O;r.onUnresolvedProperty(O.diagnostic);return}},N=(R,U)=>{if(!r.derivedBounds)return;let y=U.derivedSymbolData;for(let O of y??[]){let k=O.guidPath?.guids;if(!k?.length)continue;let P=S(R,k);!P||P===R||NR(P,O)}},A=(R,U)=>{let y=[],O=new Map,k=[],P,F=xR(R,U,(L,G)=>{if(y.push(L),G.origin==="assignment"&&G.rank!==void 0&&O.set(L.field,G.rank),L.field==="symbolData")for(let te of G.superseded??[])te.guidValue&&k.push(te.guidValue);if(L.field==="slotContent"){let te=la(G.value);P=te?se(te):void 0}});if(P&&!i.has(P)){if(!r.onMissingSlotContent)throw new Error(`Missing slot content ${P}`);r.onMissingSlotContent({slotId:er(R)??"",slotContentId:P}),P=void 0}return{source:F,claims:y,bound:O,superseded:k,slotContent:P}},_=(R,U,y,O)=>{if(s.has(R))throw new Error(`Cyclic component expansion at ${R}`);let k=i.get(R);if(!k)throw new Error(`Missing source node ${R}`);let P=A(k,U),{source:F}=P;s.add(R);try{let L={id:R,rank:O,mainComponentId:null,unresolved:[]},G=CR(F,L),te=[...G.structural,...y].sort((H,Y)=>Y.owner.rank-H.owner.rank),j=I(k,F,P.superseded,te,O),J;j.effective?J=C(L,{...j,effective:j.effective},O):P.slotContent?J=z(P.slotContent,j.descendant,O):J=M(R,F,U,j.groups,j.descendant,O);let B=ie(R,k,F,j,J,P.claims);P.slotContent&&(B.slotContentId=P.slotContent),a.set(B,P.bound),J.base&&j.replaced.length&&l.set(B,j.replaced),IR(B,F);let ne=J.dangling?G.claims.filter(({path:H})=>H.length===1&&Gf(B,H[0])):G.claims;Z(B,J.base,F,ne,O,!J.dangling);for(let H of L.unresolved)r.onUnresolvedAssignment?.({...H,mainComponentId:B.mainComponentId});return B}finally{s.delete(R)}},C=(R,{effective:U,replaced:y,groups:O,descendant:k},P)=>{let F=se(U);if(!i.has(F)){if(!r.onMissingComponent)throw new Error(`Missing source node ${F}`);return r.onMissingComponent({ownerId:R.id,componentId:F}),{base:null,children:[],dangling:!0}}R.mainComponentId=SR(e,F);let L=k.map(j=>y.length?{...j,boundary:{replaced:y,path:j.path}}:j),G=O.filter(j=>j.assignments.length).map(j=>({owner:{...R,rank:j.rank},declaredPath:[],path:[],assignments:j.assignments})),te=_(se(U),[],[...G,...L],P+1);return{base:te,children:te.children}},M=(R,U,y,O,k,P)=>{let F=U.type==="SYMBOL"?O.reduce((G,te)=>ER(G,te.assignments,te.rank),AR(U)):y,L=h(R,k);return{base:null,children:(o.get(R)??[]).map(G=>{if(!G.guid)throw new Error("Indexed child has no GUID");let te=se(G.guid);return _(te,F,L.get(te)??[],P+1)})}},z=(R,U,y)=>{let O=h(R,U);return{base:null,children:(o.get(R)??[]).map(k=>{if(!k.guid)throw new Error("Indexed child has no GUID");let P=se(k.guid);return _(P,[],O.get(P)??[],y+1)})}},w=R=>{let U=la(R.varValue?.value);return!!U&&!i.has(se(U))},ee=R=>R?{mainComponentId:R.mainComponentId??R.sourceId,mainComponentOverrideKey:R.mainComponentOverrideKey??R.overrideKey,propertyClaims:structuredClone(R.propertyClaims),variableBindingScales:{...R.variableBindingScales},hasOwnName:i.get(R.sourceId)?.type==="INSTANCE"&&R.hasOwnName}:{mainComponentId:null,mainComponentOverrideKey:void 0,propertyClaims:[],variableBindingScales:{},hasOwnName:!1},ie=(R,U,y,{effective:O,replaced:k,groups:P},{base:F,children:L},G)=>{let te=U.symbolData?.symbolID,[,j]=c(te),J={sourceId:R,sourceComponentId:te,sourceComponentOverrideKey:j,...ee(F),bindingClaims:G,overrideKey:Ff(y.overrideKey),properties:{...F&&It(F.properties,Q0),...y,...O&&y.symbolData?{symbolData:{...y.symbolData,symbolID:O}}:{},...Xn(F?.properties??{},y)},children:L};return y.type==="INSTANCE"&&(J.properties.componentPropAssignments=P.flatMap(B=>B.assignments).filter(B=>!w(B))),F&&k.length&&!J.hasOwnName&&(J.properties.name=F.defaultInstanceName??F.properties.name),J.defaultInstanceName=u(J),J},Z=(R,U,y,O,k,P)=>{for(let F of O){let L=S(R,F.path);L&&T(R,k,L,F)}kR(R,y),DR(R,U,y),y.type==="INSTANCE"&&y.size&&(R.properties.size=structuredClone(y.size),R.derivedSize=structuredClone(y.size)),P&&N(R,y)};if(i.get(t)?.type!==n){let R={INSTANCE:"an instance",SYMBOL:"a component",CANVAS:"a page"}[n];throw new Error(`Expected ${R} source`)}return _(t,[],[],0)}function VR(e,t){let n=En();return n.orderKey=e.properties.parentIndex?.position??null,n.fig.layout=t.source?.fig.layout??null,n.fig.uniformScaleFactor=Vr(e.properties)?.uniformScaleFactor??null,n}var FR=new Set(["childIds","source","instanceOverrides"]);function Gv(e){return e instanceof Map||e instanceof Set?!0:e===null||typeof e!="object"||ArrayBuffer.isView(e)?!1:Object.values(e).some(Gv)}function GR(e,t){for(let n of Object.keys(e)){if(FR.has(n))continue;let r=Reflect.get(e,n),i=Reflect.get(t,n);r===i||r===null||typeof r!="object"||Gv(r)||!it(r,i)||Reflect.set(e,n,i)}}function Cv(e){if(e==="DOCUMENT"||e==="VARIABLE")throw new Error(`Cannot materialize ${e} as an instance descendant`)}function Hf(e,t,n,r,i={}){let{blobs:o=[],sourceChildren:s=new Map,existingNodes:a=new Map}=i;if(!e.getNode(t))throw new Error("Missing materialization parent");let l=new Map,u=d=>{if(l.has(d))throw new Error("Repeated or cyclic instance occurrence");let I=to(d.properties,o,"occurrence");I.nodeType==="TEXT"&&d.derivedSize&&(I.derivedLayout={width:d.derivedSize.x,height:d.derivedSize.y}),Cv(I.nodeType);let T=a.get(d);if(T&&(e.getNode(T.id)!==T||T.type!==I.nodeType))throw new Error(`Invalid preallocated occurrence ${d.sourceId}`);l.set(d,I);let E=s.get(d);if(E&&e.getNode(E)?.type!==I.nodeType)throw new Error(`Invalid source child for ${d.sourceId}`);if(d.mainComponentId!==null){let S=r.get(d.mainComponentId);if(!S||e.getNode(S)?.type!=="COMPONENT")throw new Error(`Missing materialized component ${d.mainComponentId}`)}for(let S of d.children)u(S)};u(n);let c=new Map(a),f=(d,I,T)=>{if(T)for(let E of d.bindingClaims)E.origin==="assignment"&&E.field==="visible"&&we(T.instanceOverrides,T.id,I.id,"visible",I.visible)},g=(d,I,T)=>{let E=l.get(d);if(!E)throw new Error("Missing prepared occurrence");let{nodeType:S,...N}=E;Cv(S);let A=VR(d,E),_={...N,variableAssignmentScales:yR(d),componentScale:Ov(d),variableBindingScales:Lr(N.boundVariables??{},d.layoutScale??1,d.variableBindingScales),componentId:d.mainComponentId===null?s.get(d)??null:r.get(d.mainComponentId),source:A},C=a.get(d);if(C&&C.parentId!==I)throw new Error(`Preallocated occurrence has wrong parent ${d.sourceId}`);let M=C??e.createNode(S,I,_);C&&e.updateNode(C.id,_);let z=e.getNode(s.get(d)??"");if(z&&GR(M,z),c.set(d,M),C&&d!==n&&M.type==="COMPONENT")return M;f(d,M,T);let w=s.get(d);return T&&d.mainComponentId!==null&&w&&(we(T.instanceOverrides,T.id,M.id,"sourceComponentId",w),e.getNode(w)?.componentId!==M.componentId&&we(T.instanceOverrides,T.id,M.id,"componentId",M.componentId)),M.childIds=d.children.map(ee=>g(ee,M.id,M.type==="INSTANCE"?M:T).id),M},h=g(n,t);return zR(c),{root:h,nodes:c}}function BR(e,t,n){return e.kind==="text"?typeof t=="object"&&t!==null&&"characters"in t:e.kind==="text-style"?!!n.textStyleId:!0}function UR(e,t,n,r){if(!Array.isArray(r))return;let i=!1;for(let[o,s]of r.entries()){if(!s.colorVar?.value?.alias)continue;let a=`boundVariables/${n}/${o}/color`;we(e.instanceOverrides,e.id,t.id,a,t.boundVariables[`${n}/${o}/color`]??null),i=!0}i&&we(e.instanceOverrides,e.id,t.id,"boundVariables")}function zR(e){for(let[t,n]of e)if(n.type==="INSTANCE")for(let r of t.propertyClaims){let i=kv(t,r.path),o=e.get(i);if(!o)throw new Error("Unmaterialized property claim target");for(let s of Object.keys(ro)){if(!(s in r.properties))continue;let a=ro[s];if(BR(a,r.properties[s],o)){for(let l of a.scene){let u=o[l];we(n.instanceOverrides,n.id,o.id,l,structuredClone(u))}a.kind==="paint"&&UR(n,o,a.scene[0],r.properties[s])}}vR(n,o,r.properties)}}function Wf(e,t,n){if(e.mainComponentId!==null){let r=n.get(e.mainComponentId);if(!r)throw new Error(`Missing component occurrence ${e.mainComponentId}`);let i=new Map(t.getChildren(r.materialized.root.id).map((s,a)=>[s.id,a])),o=new Map(r.occurrence.children.map(s=>[s.sourceId,s]));e.children=e.children.filter(s=>{let a=o.get(s.sourceId),l=a&&r.materialized.nodes.get(a);return!!l&&i.has(l.id)}).toSorted((s,a)=>{let l=o.get(s.sourceId),u=o.get(a.sourceId),c=l&&r.materialized.nodes.get(l),f=u&&r.materialized.nodes.get(u);return(c?i.get(c.id)??0:0)-(f?i.get(f.id)??0:0)})}for(let r of e.children)Wf(r,t,n)}function*Bv(e,t){let n=new Map;for(let r of t.children){if(n.has(r.sourceId))throw new Error(`Ambiguous source child ${r.sourceId}`);n.set(r.sourceId,r)}for(let r of e.children){let i=n.get(r.sourceId);if(!i)throw new Error(`Missing source child ${r.sourceId}`);yield[r,i]}}function $f(e,t,n){let r=[],i=(o,s,a,l)=>{for(let[u,c]of Bv(o,s)){let f=t.nodes.get(u),g=l.get(c);if(!f||!g)throw new Error(`Missing materialized correspondence for ${u.sourceId}`);r.push({owner:a,target:f,source:g}),!u.slotContentId&&u.mainComponentId===c.mainComponentId&&i(u,c,a,l)}};for(let o of Ta(e)){if(o.mainComponentId===null)continue;let s=n.get(o.mainComponentId),a=t.nodes.get(o);if(!s||!a)throw new Error(`Missing component ${o.mainComponentId}`);i(o,s.occurrence,a,s.materialized.nodes)}for(let{owner:o,target:s,source:a}of r)we(o.instanceOverrides,o.id,s.id,"sourceComponentId",a.id),s.type==="INSTANCE"&&s.componentId!==a.componentId&&we(o.instanceOverrides,o.id,s.id,"componentId",s.componentId)}function jf(e,t){let n=new Map,r=(s,a,l)=>{for(let[u,c]of Bv(s,a)){let f=l.get(c);if(!f)throw new Error(`Unmaterialized source child ${c.sourceId}`);if(n.set(u,f.id),u.mainComponentId!==null)i(u);else if(u.slotContentId)for(let g of u.children)o(g);else r(u,c,l)}},i=s=>{if(s.mainComponentId===null)throw new Error("Expected instance occurrence");let a=t.get(s.mainComponentId);if(!a)throw new Error(`Missing component occurrence ${s.mainComponentId}`);r(s,a.occurrence,a.materialized.nodes)},o=s=>{if(s.mainComponentId!==null)i(s);else for(let a of s.children)o(a)};return o(e),n}function Uv(e,t,n,r){let i=r??new Map;if(!r)for(let o of e.getAllNodes())for(let s of o.componentPropertyDefinitions)i.set(s.id,s.type);for(let o of n){let s;o.componentPropertyDefinitions.forEach((a,l)=>{if(i.set(a.id,a.type),a.type!=="INSTANCE_SWAP")return;let u=t.get(a.defaultValue);u&&(s??(s=[...o.componentPropertyDefinitions]),s[l]={...a,defaultValue:u})}),s&&(o.componentPropertyDefinitions=s)}for(let o of n){let s;for(let a in o.componentPropertyAssignments){if(i.get(a)!=="INSTANCE_SWAP")continue;let l=t.get(o.componentPropertyAssignments[a]);l&&(s??(s={...o.componentPropertyAssignments}),s[a]=l)}s&&(o.componentPropertyAssignments=s)}}function zv(e,t){for(let n of t){if(n.type!=="COMPONENT"||!n.parentId||n.variantPropSpecs.length===0)continue;let r=e.getNode(n.parentId);if(r?.type!=="COMPONENT_SET")continue;let i=new Map(r.componentPropertyDefinitions.map(s=>[s.id,s.name])),o={};for(let s of n.variantPropSpecs)o[i.get(s.propDefId)??s.propDefId]=s.value;e.updateNode(n.id,{componentPropertyValues:o})}}function Sa(e){let t=new Map;for(let n of e){if(!n.guid||typeof n.key!="string")continue;let r=t.get(n.key)??new Map,i=typeof n.version=="string"?n.version:"",o=se(n.guid);if(r.has(i)&&r.get(i)!==o)throw new Error(`Ambiguous resource ${n.key} version ${i}`);r.set(i,o),t.set(n.key,r)}return n=>{if(n?.guid)return se(n.guid);let r=n?.assetRef;if(!r)return;let i=t.get(r.key);return r.version?i?.get(r.version):i?.has("")?i.get(""):i?.size===1?i.values().next().value:void 0}}function Hv(e,t,n){let r=new Set,i=s=>{s&&r.add(se(s))},o=s=>{i(s.value?.guidValue),i(s.varValue?.value?.symbolIdValue?.guid)};return Gr(e,(s,a)=>{i(Vr(s)?.symbolID),i(a?.overriddenSymbolID);for(let l of s.componentPropDefs??[])if(l.type==="INSTANCE_SWAP"&&o({value:l.initialValue,varValue:l.varValue}),l.type==="INSTANCE_SWAP"||l.type==="SLOT")for(let u of l.preferredValues?.instanceSwapValues??[]){if(!u.key)continue;let c=t?.({assetRef:{key:u.key,version:u.version}});if(!c){if(!n)throw new Error(`Unresolved preferred component ${u.key}`);n(u.key);continue}r.add(c)}for(let l of s.componentPropAssignments??[])o(l)}),r}function Wv(e){let t=new Set;return Gr(e,n=>{for(let r of n.componentPropAssignments??[]){let i=la(r.varValue?.value);i&&t.add(se(i))}}),t}function Xf(e){for(let t of e){if(t.pluginData&&t.pluginData.length>1){let n=new Map;for(let r of t.pluginData)n.set(`${r.pluginID}\0${r.key}\0${r.value}`,r);n.size<t.pluginData.length&&(t.pluginData=[...n.values()])}if(t.pluginRelaunchData&&t.pluginRelaunchData.length>1){let n=new Map;for(let r of t.pluginRelaunchData)n.set(`${r.pluginID}\0${r.command}\0${r.message}\0${r.isDeleted}`,r);n.size<t.pluginRelaunchData.length&&(t.pluginRelaunchData=[...n.values()])}}}function $v(e){if(new TextDecoder().decode(e.slice(0,8))!=="fig-kiwi")return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=t.getUint32(8,!0),r=12,i=[];for(;r<e.length&&!(r+4>e.length);){let a=t.getUint32(r,!0);if(r+=4,r+a>e.length)throw new Error(`Corrupted .fig file: chunk at offset ${r-4} declares length ${a} but only ${e.length-r} bytes remain`);i.push(e.slice(r,r+a)),r+=a}if(i.length<2)return null;let o=i[1],s;if(Ec(o))s=oy(o);else try{s=or(o)}catch{throw new Error("Failed to decompress fig-kiwi data chunk")}return{schemaDeflated:i[0],dataRaw:s,version:n}}function ba(e,t,n){let r=$v(e);if(!r)throw new Error("Invalid fig-kiwi container");let i=or(r.schemaDeflated),o=$s(new Dt(i));if(t)try{let l=Ty(o,r.dataRaw);l.length>0&&t(l)}catch(l){console.warn("Failed to scan FIG page manifest; continuing with full decode:",l)}let s=ji(o,n).decodeMessage(r.dataRaw),a=s.nodeChanges;if(!a||a.length===0)throw new Error("No nodes found in .fig file");return Xf(a),{nodeChanges:a,blobs:(s.blobs??[]).map(l=>l.bytes instanceof Uint8Array?l.bytes:new Uint8Array(Object.values(l.bytes))),figKiwiVersion:r.version,figSchemaDeflated:r.schemaDeflated}}function Yv(e,t){let n=[],r=t.parentId?e.getNode(t.parentId):void 0;for(;r;)r.type==="INSTANCE"&&n.push(r),r=r.parentId?e.getNode(r.parentId):void 0;return t.type==="INSTANCE"&&n.unshift(t),n}function qv(e,t){let n=[];for(let r of Yv(e,t)){let i=Rt(r.instanceOverrides,r.id,t.id,"sourceComponentId"),o=typeof i=="string"?i:t.componentId,s=o?e.getNode(o):void 0;s&&n.push(s)}return n}function HR(e,t){e.preserveSourceMetadataDuring(()=>{for(let n of t.nodes.values()){let r=Yv(e,n),i=new Set;for(let s of r){let a=s.id===n.id?s.instanceOverrides.self:s.instanceOverrides.descendants.get(n.id);for(let l of a?.keys()??[])i.add(l)}let o={};for(let s of qv(e,n))for(let a of Is)!s.source.editedFields.includes(a)||i.has(a)||Object.assign(o,{[a]:structuredClone(s[a])});Object.keys(o).length&&e.updateNode(n.id,o)}})}var WR=new Uint8Array([137,80,78,71,13,10,26,10]);function $R(e){return WR.every((t,n)=>e[n]===t)}function jR(e){let t=e.toLowerCase();return t.endsWith(".png")||t.endsWith(".jpg")||t.endsWith(".json")}function jv(e){let t=e["canvas.fig"]??e.canvas;if(t)return t;let n=null;for(let[r,i]of Object.entries(e))!i||jR(r)||(!n||i.byteLength>n.byteLength)&&(n=i);return n}function Xv(e){return e==="canvas.fig"||e==="canvas"}function XR(e,t,n){let r=Rc(e);if(!r)return null;let i=ba(e,t,n),o=r.slice(2).find($R)??null;return{...i,images:[],thumbnailPNG:o,metaJSON:null}}function qf(e,t,n){let r=new Uint8Array(e),i=XR(r,t,n);if(i)return i;let o=jv(ar(r,{filter:({name:c})=>Xv(c)})),s,a;if(o)a=ba(o,t,n),s=ar(r,{filter:({name:c})=>!Xv(c)});else{if(s=ar(r),o=jv(s),!o)throw new Error(`No canvas data found in .fig file. Entries: ${Object.keys(s).join(", ")}`);a=ba(o,t,n)}let l=s["meta.json"],u=Object.entries(s).filter(([c])=>c.startsWith("images/")&&c!=="images/").map(([c,f])=>[c.slice(7),f]);return{...a,images:u,thumbnailPNG:s["thumbnail.png"]??null,metaJSON:Object.hasOwn(s,"meta.json")?new TextDecoder().decode(l):null}}function Zv(e){let t={"canvas.fig":[Dc(e.schemaDeflated,e.kiwiData,e.figKiwiVersion),{level:0}],"thumbnail.png":[e.thumbnailPNG,{level:0}],"meta.json":new TextEncoder().encode(e.metaJSON)};for(let n of e.images??[])t[n.name]=[n.data,{level:0}];return sr(t)}function KR(e,t,n,r=new Map){let i=new Map;for(let o of n)o.type==="INSTANCE"&&Oi(o.instanceOverrides,(s,a)=>{if(a!=="width"&&a!=="height")return;let l=s||o.id,u=i.get(l)??new Set;u.add(a),i.set(l,u)});for(let o of n){let s=Lr(o.boundVariables,r.get(o.id)??1,o.variableBindingScales);e.updateNode(o.id,{variableBindingScales:s});for(let a in o.boundVariables){if((a==="width"||a==="height")&&t.has(o.id)||i.get(o.id)?.has(a))continue;let l=o.boundVariables[a],u=e.variables.get(l);if(!u)continue;let c=e.getNodeVariableModeId(o.id,u.collectionId),f=e.resolveVariable(l,c);if(typeof f!="number")continue;let g=a==="opacity"?f:f*(s[a]??1),h=rf(a,g);h&&e.updateNode(o.id,h)}}}function YR(e,t){for(let n of t){let r=Bi(e,n);(r.fills||r.strokes)&&e.updateNode(n.id,r)}}function qR(e,t){for(let n of t){if(n.type!=="TEXT")continue;let r=n.boundVariables.text;if(!r)continue;let i=Ps(e.resolveVariableForNode(n.id,r));i===void 0||i===n.text||e.updateNode(n.id,{text:i})}}function ZR(e,t){let n=e.getNode(e.rootId);if(!n||!t)return;n.source.format="fig",n.pluginData=t.pluginData?.map(i=>({pluginId:i.pluginID,key:i.key,value:i.value}))??[],n.source.fig.rawNodeFields.strokeJoin=t.strokeJoin,n.source.fig.rawNodeFields.strokeWeight=t.strokeWeight;let r=ft(t,Qe.enabledLibraries);for(let i of r??[])e.enabledLibraries.set(i.libraryId,i)}var JR=new Set(["VISIBLE","TEXT_DATA","OVERRIDDEN_SYMBOL_ID","SLOT_CONTENT_ID"]);function QR(e){for(let t of e.componentPropDefs??[]){let n=t.varValue?.value;t.initialValue||!n||(t.initialValue=n.symbolIdValue?.guid?{guidValue:structuredClone(n.symbolIdValue.guid)}:structuredClone(n))}}function eD(e){QR(e);let t=e.parameterConsumptionMap,n=structuredClone(e.componentPropRefs??[]);for(let r of t?.entries??[]){let i=r.variableData?.value?.propRefValue?.defId;if(r.variableData?.dataType!=="PROP_REF"||!i||!r.variableField||!JR.has(r.variableField))continue;let o={defID:structuredClone(i),componentPropNodeField:r.variableField},s=n.findIndex(a=>a.componentPropNodeField===r.variableField);s===-1?n.push(o):n[s]=o}n.length&&(e.componentPropRefs=n)}var Jv=["styleIdForFill","styleIdForStrokeFill","styleIdForText","styleIdForEffect","styleIdForGrid"];function tD(e,t,n){let r=new Set;return Gr(e,i=>{for(let o of[i,...i.textData?.styleOverrideTable??[]])for(let s of Jv){let a=o[s];if(!a)continue;let l=a.guid?se(a.guid):t(a);l&&n.has(l)&&r.add(l)}}),r}function nD(e,t,n){for(let r of Fr(e))n(r,[...t,...r.guidPath?.guids??[]]);for(let r of e.derivedSymbolData??[])n(r,[...t,...r.guidPath?.guids??[]])}function rD(e){return(t,n,r)=>{let i=(s,a,l)=>{if(!s?.assetRef||s.guid)return;let u=e(s);if(!u){r?.({sourceId:n,field:a,key:s.assetRef.key,path:structuredClone(l)});return}s.guid=ct(u)},o=(s,a)=>{eD(s);for(let u of Tt(s))Zc(u.variableData,c=>i(c,u.variableField??"unknown",a));for(let[u,c]of[["fillPaints",s.fillPaints],["strokePaints",s.strokePaints]])for(let f of c??[])i(f.colorVar?.value?.alias,u,a);let l=s.variableModeBySetMap;for(let u of l?.entries??[])i(u.variableSetID,"variableModeBySetMap",a);for(let u of Jv)i(s[u],u,a);for(let u of s.textData?.styleOverrideTable??[])o(u,a);nD(s,a,o)};o(t,[])}}function iD(e){let t=rD(Sa(e));return(n,r)=>t(n,n.guid?se(n.guid):"unknown",r)}function oD(e,t,n,r=()=>!1){let i=n,o=new Map,s=h=>{if(h.mainComponentId===null){h.properties.type==="SYMBOL"&&o.set(h.sourceId,h);for(let d of h.children)s(d)}};for(let h of e)s(h);let a=[],l=new Set,u=new Set,c=h=>{let d=new Set,I=h;for(;I;){if(d.has(I))throw new Error(`Cyclic source hierarchy at ${I}`);d.add(I);let T=i.get(I);if(!T)throw new Error(`Missing source ancestor ${I}`);if(T.type==="CANVAS")return I;I=tr(T)}throw new Error(`Component ${h} has no source page`)},f=h=>{for(let d of Ta(h))d.mainComponentId!==null&&g(d.mainComponentId),d.properties.type==="SYMBOL"&&g(d.sourceId)},g=h=>{if(l.has(h))return;if(r(h)){l.add(h);return}if(u.has(h))throw new Error(`Cyclic component dependency ${h}`);u.add(h);let d=i.get(h);if(!d?.parentIndex?.guid)throw new Error(`Missing component parent ${h}`);let I=c(h),T=o.get(h)??t(h);for(let E of T.children)f(E);a.push({sourceId:h,parentSourceId:se(d.parentIndex.guid),pageSourceId:I,occurrence:T}),l.add(h),u.delete(h)};for(let h of e)f(h);return a}var Kf=class{constructor(e,t){le(this,"source");le(this,"decode");this.source=e,this.decode=t}get size(){return this.source.size}get(e){let t=this.source.get(e);return t===void 0?void 0:this.decode(t)}has(e){return this.source.has(e)}keys(){return this.source.keys()}*values(){for(let e of this.source.values())yield this.decode(e)}*entries(){for(let[e,t]of this.source)yield[e,this.decode(t)]}forEach(e){for(let[t,n]of this.entries())e(n,t,this)}[Symbol.iterator](){return this.entries()}};function sD(e,t){if(t){for(let n of t)if(e.get(n)?.type!=="CANVAS")throw new Error(`Unknown page ${n}`)}}function aD(e,t,n,r){for(let i of t){let o=new Set([i]),s=e.get(i),a=s?tr(s):void 0;for(;a!==void 0;){if(o.has(a))throw new Error(`Cyclic source hierarchy at ${a}`);if(o.add(a),n.has(a))break;if(n.add(a),s=e.get(a),!s){r.add(a);break}a=tr(s)}}}function lD(e,t,n,r=i=>i){let i=Sa(e),{sources:o,children:s}=n,a=new Set(o.keys()),l=new Set,u=new Set,c=new Set,f=new Set,g=new Set,h=new Set,d=new Set,I=new Set;sD(o,t);let T=e.filter(E=>E.type==="CANVAS"&&(t?t.has(er(E)??""):E.internalOnly!==!0)).flatMap(E=>er(E)??[]);for(;T.length;){let E=T.pop();if(!E||l.has(E))continue;let S=o.get(E);if(!S){h.has(E)?g.add(E):d.has(E)?I.add(E):f.add(E);continue}l.add(E);let N=r(S),A=Hv(N,i,C=>c.add(C));for(let C of A)h.add(C);let _=Wv(N);for(let C of _)d.add(C);T.push(...(s.get(E)??[]).flatMap(C=>er(C)??[]),...tD(N,i,a),...A,..._)}return aD(o,l,u,f),{contentIds:l,ancestorIds:u,missingIds:f,missingComponentIds:g,missingSlotContentIds:I,externalPreferredKeys:c}}function uD(e,t){let n=e.componentPropDefs;n&&(e.componentPropDefs=n.map(r=>{if(!r.parentPropDefId)return r;let i=se(r.parentPropDefId);for(let o of t){let s=(o.componentPropDefs??[]).filter(a=>a.id&&se(a.id)===i);if(s.length>1)throw new Error(`Ambiguous parent property ${i}`);if(s.length===1)return{...structuredClone(s[0]),...r}}throw new Error(`Missing parent property ${i}`)}))}var cD=["guid","parentIndex","type","phase","name","internalOnly","key","version","styleType","overrideKey"];function fD(e,t){let n=qf(e,void 0,{NodeChange:cD});return{figKiwiVersion:n.figKiwiVersion,figSchemaDeflated:n.figSchemaDeflated,reader:Qv(pD(n.nodeChanges),t),blobs:n.blobs,images:n.images,records:n.nodeChanges}}function dD(e){let t=new Map;for(let n of e)if(n.guid&&typeof n.key=="string"){let r=se(n.guid);t.set(n.key,r),typeof n.version=="string"&&t.set(`${n.key}@${n.version}`,r)}return t}function Yf(e){return e.type==="VARIABLE"||e.type==="VARIABLE_SET"}function Kv(e){let t=bc(e);if(!t)throw new Error("Record header has no archive bytes to read it whole");return Xf([t]),t}function pD(e){let t=e.filter(g=>g.phase!=="REMOVED"),n=Ia(t),r=iD(t),i=dD(t),o=[];for(let g of t)r(Kv(g),h=>o.push(h));let s=new Map,a=new Kf(n.sources,g=>g.styleType?c(g):g),l=new Set,u=(g,h)=>{if(l.has(g))throw new Error("Cyclic component-property ancestry");l.add(g);try{let d=Kv(g);r(d);let I=[];for(let E=n.sources.get(tr(g)??"");E;E=n.sources.get(tr(E)??""))I.push(h(E));uD(d,I);let T=E=>{of(a,E,i);for(let S of Fr(E))T(S)};return T(d),d}finally{l.delete(g)}},c=g=>{let h=s.get(g);return h||(h=u(g,c),s.set(g,h)),h};return{records:t,index:n,bindingDiagnostics:o,scope:()=>{let g=new Map,h=d=>{let I=s.get(d)??g.get(d);if(I)return I;let T=u(d,h);return g.set(d,T),T};return h},shared:c,interpreterIndex:()=>{let{sources:g,children:h}=Ia(t.filter(I=>!Yf(I))),d=new WeakMap;return{sources:new Kf(g,c),children:new Kf(h,I=>{let T=d.get(I);return T||(T=I.map(c),d.set(I,T)),T})}}}}function mD(e){let t;return{records:e,get sourceInterpreter(){return t??(t=zf(e.interpreterIndex())),t}}}function Qv(e,t){let n="sourceInterpreter"in e?e:mD(e),{records:r,index:i,bindingDiagnostics:o}=n.records,s=r,a=n.records.scope(),l=s.filter(Yf),u=lD(s,t,i,a);if(u.missingIds.size)throw new Error(`Missing reachable sources: ${[...u.missingIds].join(", ")}`);let c=s.filter(I=>!Yf(I)&&(I.type==="CANVAS"||I.guid&&(u.contentIds.has(se(I.guid))||u.ancestorIds.has(se(I.guid))))).map(a),f=n.sourceInterpreter,g=zf(Ia(c)),h=s.filter(I=>I.type==="CANVAS").toSorted(Bf).map(I=>{if(!I.guid)throw new Error("Page has no GUID");return{id:se(I.guid),name:I.name??"",position:I.parentIndex?.position??null,internalOnly:I.internalOnly===!0}}),d=new Set(h.map(I=>I.id));return{selectPages(I){return Qv(n,I)},get sourceRecords(){return structuredClone(s.map(a))},get documentRecord(){let I=s.find(T=>T.type==="DOCUMENT");return structuredClone(I&&a(I))},dependencyClosure:u,pages:h,get resources(){return structuredClone(l.map(a))},bindingDiagnostics:o,readPage(I,T={}){if(!d.has(I))throw new Error(`Unknown page ${I}`);let E=g.page(I,T);return E.children=E.children.filter(S=>S.properties.isSlotContent!==!0),E},planComponents(I,T={},E){return oD(I,S=>f.component(S,T),i.sources,E)},readComponent:f.component}}function hD(e,t){let{value:n,dataType:r,resolvedDataType:i}=e.variableData;if(!n)throw new Error("Missing variable value");let o=r??i;if(o==="ALIAS"){let s=t(n.alias);if(!s)throw new Error("Unresolved variable alias");return{aliasId:s}}if(o==="COLOR"&&n.colorValue)return structuredClone(n.colorValue);if(o==="BOOLEAN"&&n.boolValue!==void 0)return n.boolValue;if(o==="STRING"&&n.textValue!==void 0)return n.textValue;if(o==="FLOAT"&&n.floatValue!==void 0)return n.floatValue;throw new Error(`Unsupported variable value ${o}`)}function gD(e,t,n){let r=e.variableDataValues?.entries??[];if(!r.length)throw new Error("Missing mode values");let i={};for(let o of r){let s=se(o.modeID);if(!t.includes(s))throw new Error("Unknown mode");i[s]=hD(o,n)}return i}function yD(e,t,n){let r=(i,o)=>{if(!n)throw new Error(`Unsupported document resource ${i.type}: ${o}`);n(structuredClone(i))};for(let i of t){if(i.type!=="VARIABLE_SET")continue;let o=i.variableSetModes??[];if(!i.guid||o.length===0){r(i,"missing collection identity or modes");continue}let s=ua(eo(i)),a=Af(i);e.addCollection({id:se(i.guid),name:i.name??"Variables",modes:o.map(l=>{let u=se(l.id);return{modeId:u,name:l.name,condition:a[u],...l.sortPosition?{sortPosition:l.sortPosition}:{}}}),defaultModeId:se(o[0].id),variableIds:[],modeAttribute:xf(i),pluginData:s.length>0?s:void 0,key:typeof i.key=="string"?i.key:void 0,version:typeof i.version=="string"?i.version:void 0})}vD(e,t,r)}function vD(e,t,n){let r=Sa(t);for(let i of t){if(i.type!=="VARIABLE")continue;let o=i.variableResolvedType,s=i.variableSetID?r(i.variableSetID):i.parentIndex?.guid&&se(i.parentIndex.guid),a=s&&e.variableCollections.get(s);if(!i.guid||!a||!s||o!=="COLOR"&&o!=="BOOLEAN"&&o!=="STRING"&&o!=="FLOAT"){n(i,"unresolved collection, identity or type");continue}let l={};try{Object.assign(l,gD(i,a.modes.map(c=>c.modeId),r))}catch(c){n(i,c instanceof Error?c.message:"Invalid mode value");continue}let u=Nf(i);e.addVariable({id:se(i.guid),name:i.name??"Variable",type:o,collectionId:s,valuesByMode:l,...u,...Ef(i,l)})}}function eI(e,t={}){let{reader:n,blobs:r,images:i}=fD(e,t.pageIds);return bD(n,r,{...t,images:t.images??new Map(i)})}function ID(e){let t=new Map;for(let n of e.getAllNodes())for(let r of n.componentPropertyDefinitions)t.set(r.id,r.type);return t}function TD(e,t){let n=!0,r=1,i=new Ui(()=>n?`0:${r++}`:_s());n=!1,ZR(i,e.documentRecord);for(let[o,s]of t.images??[])i.images.set(o,s.slice());i.applyImportedStateDuring(()=>yD(i,e.resources,t.onUnsupportedResource),()=>`0:${r++}`);for(let o of i.getPages())i.deleteNode(o.id);return{graph:i,nextImportedId:r,sources:new Map,components:new Map,componentIds:new Map,savedSizeNodes:new Set}}function SD(e,t){e.preserveSourceMetadataDuring(()=>{for(let[n,r]of t){let i=e.getNode(n);if(!i)continue;let o=new Set(qv(e,i).flatMap(a=>a.source.editedFields)),s={};i.width!==r.width&&!o.has("width")&&(s.width=r.width),i.height!==r.height&&!o.has("height")&&(s.height=r.height),Object.keys(s).length>0&&e.updateNode(n,s)}})}function bD(e,t,n,r){for(let a of e.bindingDiagnostics){if(!n.onUnresolvedBinding)throw new Error(`Unresolved binding ${a.sourceId}: ${a.field}`);n.onUnresolvedBinding(a)}let i=e.pages.map(a=>e.readPage(a.id,n)),o=r??TD(e,n),s=e.planComponents(i,n,a=>o.components.has(a));return o.graph.applyImportedStateDuring(()=>ED(i,s,t,o,r!==void 0),()=>`0:${o.nextImportedId++}`)}function ED(e,t,n,r,i){let{graph:o,sources:s,components:a,savedSizeNodes:l,componentIds:u}=r,c=new Set(o.nodes.keys()),f=new Map,g=new Map,h=S=>{for(let[N,A]of S)N.derivedSize&&(l.add(A.id),g.set(A.id,{width:A.width,height:A.height})),N.layoutScale!==void 0&&f.set(A.id,N.layoutScale)},d=(S,N)=>{if(S.mainComponentId!==null)return;let A=s.get(S.sourceId);if(A){for(let z of S.children)d(z,A);return}let{nodeType:_,...C}=to(S.properties,n);if(_==="DOCUMENT"||_==="VARIABLE")throw new Error(`Unsupported scene type ${_}`);let M=o.createNode(_,N,C);s.set(S.sourceId,M.id),M.type==="COMPONENT"&&u.set(S.sourceId,M.id);for(let z of S.children)d(z,M.id)};for(let S of e)d(S,o.rootId);for(let S of t){if(a.has(S.sourceId))continue;let N=s.get(S.parentSourceId);if(!N)throw new Error(`Unmaterialized component parent ${S.parentSourceId}`);let A=new Map,_=M=>{let z=s.get(M.sourceId),w=z?o.getNode(z):void 0;w&&A.set(M,w),M.mainComponentId===null&&M.children.forEach(_)};_(S.occurrence);let C=Hf(o,N,S.occurrence,u,{blobs:n,sourceChildren:jf(S.occurrence,a),existingNodes:A});h(C.nodes),$f(S.occurrence,C,a),a.set(S.sourceId,{occurrence:S.occurrence,materialized:C}),u.set(S.sourceId,C.root.id),s.set(S.sourceId,C.root.id)}let I=new Set,T=S=>{if(S.properties.type==="SYMBOL")return;let N=s.get(S.sourceId);if(!N)throw new Error(`Missing source container ${S.sourceId}`);let A=[];for(let C of S.children){if(i&&Wf(C,o,a),C.mainComponentId!==null&&!s.has(C.sourceId)){let z=Hf(o,N,C,u,{blobs:n,sourceChildren:jf(C,a)});h(z.nodes),$f(C,z,a),i&&(HR(o,z),z.root.componentId&&I.add(z.root.id)),s.set(C.sourceId,z.root.id)}else C.mainComponentId===null&&C.properties.type!=="SYMBOL"&&T(C);let M=s.get(C.sourceId);if(!M)throw new Error(`Missing assembled child ${C.sourceId}`);A.push(M)}let _=o.getNode(N);_&&(_.childIds=[...A,..._.childIds.filter(C=>!A.includes(C))])};for(let S of e)T(S);for(let S of I)o.syncInstance(S);I.size>0&&SD(o,g);for(let S of o.getAllNodes())c.has(S.id)||S.styleRuns.length===0||(S.styleRuns=ac(S.styleRuns,{variable:N=>N,style:N=>N,node:N=>s.get(N)??N}));let E=[...o.nodes.values()].filter(S=>!c.has(S.id));return r.definitionTypes??(r.definitionTypes=ID(o)),Uv(o,s,E,r.definitionTypes),o.preserveSourceMetadataDuring(()=>{zv(o,E),KR(o,l,E,f),YR(o,E),qR(o,E)}),r}async function tI(e,t){e[0]===80&&e[1]===75&&Br(e);let n=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength),r=qf(n);if(r.nodeChanges.length>Cf)throw new Error("\u56FE\u5C42\u8D85\u8FC7 50,000 \u4E2A\uFF0C\u8BF7\u62C6\u5206 Figma \u6587\u4EF6\u3002");let{graph:i}=eI(n,{pageIds:new Set(r.nodeChanges.filter(o=>o.type==="CANVAS"&&o.guid).map(o=>`${o.guid.sessionID}:${o.guid.localID}`)),onUnsupportedResource:()=>t.add("fig-resource","\u90E8\u5206 Figma \u4E13\u5C5E\u8D44\u6E90\u6CA1\u6709\u5BF9\u5E94\u7684\u76EE\u6807\u683C\u5F0F\u3002"),onUnsupportedVariableExpression:()=>t.add("variable","\u53D8\u91CF\u8868\u8FBE\u5F0F\u6309\u5F53\u524D\u5916\u89C2\u8F6C\u6362\u3002"),onUnresolvedBinding:()=>t.add("binding","\u672A\u80FD\u89E3\u6790\u7684\u53D8\u91CF\u7ED1\u5B9A\u6309\u4FDD\u5B58\u503C\u8F6C\u6362\u3002")});for(let o of r.nodeChanges)(o.prototypeInteractions?.length||o.reactions?.length)&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",o.name);return{graph:i,thumbnail:r.thumbnailPNG||qn}}async function nI(e,t,n=qn,r){await Ac();let i=new Map([[e.rootId,{sessionID:0,localID:0}]]),o=1;for(let S of e.nodes.values())S.id!==e.rootId&&i.set(S.id,{sessionID:1,localID:o++});let s=i.get(e.rootId),a=[Sf(s,"srgb")],l=[],u={value:o};e.getPages(!0).forEach((S,N)=>{let A=i.get(S.id);a.push({...bf(A,s,String.fromCharCode(33+N),S.name),internalOnly:!!S.internalOnly}),e.getChildren(S.id).forEach((_,C)=>{a.push(...Tf(_,A,C,u,e,l,{nodeIdToGuid:i}))})});let c=new Map([...i].map(([S,N])=>[`${N.sessionID}:${N.localID}`,e.getNode(S)])),f=new Set;for(let S of a){let N=c.get(`${S.guid.sessionID}:${S.guid.localID}`);if(!N||N.id===e.rootId||N.type==="CANVAS")continue;f.add(N.id);let A=sn(N);S.transform={m00:A.a,m01:A.c,m02:A.tx,m10:A.b,m11:A.d,m12:A.ty},S.fontName&&N.fontPostscript&&(S.fontName.postscript=N.fontPostscript)}r&&zr(e,f,r);let g=vf(a,e.images),h=Nc({type:"NODE_CHANGES",sessionID:0,ackID:0,nodeChanges:a,blobs:l.map(S=>({bytes:S}))}),d=n.length>24?new DataView(n.buffer,n.byteOffset,n.byteLength):null,I=d?.getUint32(16)||1,T=d?.getUint32(20)||1,E=JSON.stringify({client_meta:{background_color:{r:1,g:1,b:1,a:1},thumbnail_size:{width:I,height:T},render_coordinates:{x:0,y:0,width:I,height:T}},file_name:t,developer_related_links:[],exported_at:new Date().toISOString()});return Zv({schemaDeflated:Qr(xc()),kiwiData:h,thumbnailPNG:n,images:If(e.images,g),metaJSON:E})}var AD={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0};function Zf(e){let t=e.m00*e.m11-e.m01*e.m10;if(Math.abs(t)<1e-12)return AD;let n=e.m11/t,r=-e.m01/t,i=-e.m10/t,o=e.m00/t;return{m00:n,m01:r,m02:-(n*e.m02+r*e.m12),m10:i,m11:o,m12:-(i*e.m02+o*e.m12)}}function xD(e,t){return{x:e.m00*t.x+e.m01*t.y+e.m02,y:e.m10*t.x+e.m11*t.y+e.m12}}function an(e,t){return xD(Zf(e),t)}function ND(e,t,n){return Zf({m00:t.x-e.x,m01:n.x,m02:e.x-n.x/2,m10:t.y-e.y,m11:n.y,m12:e.y-n.y/2})}function Ea(e,t,n=1,r=1,i=r/n){let o={x:t.x-e.x,y:t.y-e.y};return ND(e,t,{x:-o.y*r*i/n,y:o.x*n*i/r})}function Aa(e,t,n){let r={x:2*(t.x-e.x),y:2*(t.y-e.y)},i={x:2*(n.x-e.x),y:2*(n.y-e.y)};return Zf({m00:r.x,m01:i.x,m02:e.x-(r.x+i.x)/2,m10:r.y,m11:i.y,m12:e.y-(r.y+i.y)/2})}var so=(e={})=>tt(e.red,e.green,e.blue,e.alpha??1),ao=e=>({_class:"color",red:e.r,green:e.g,blue:e.b,alpha:e.a}),lo=e=>`{${e[0]}, ${e[1]}}`,rI=["NORMAL","DARKEN","MULTIPLY","COLOR_BURN","LIGHTEN","SCREEN","COLOR_DODGE","OVERLAY","SOFT_LIGHT","HARD_LIGHT","DIFFERENCE","EXCLUSION","HUE","SATURATION","COLOR","LUMINOSITY","PLUS_DARKER","PLUS_LIGHTER"],Jf=e=>rI[e]||"NORMAL",Qf=e=>Math.max(0,rI.indexOf(e)),iI=["UNION","SUBTRACT","INTERSECT","EXCLUDE"];function CD(e,t,n){let r=(e.points||[]).map(o=>({...o,p:Yn(o.point).map((s,a)=>s*(a?n:t)),from:Yn(o.curveFrom).map((s,a)=>s*(a?n:t)),to:Yn(o.curveTo).map((s,a)=>s*(a?n:t))}));if(!r.length)return"";let i=`M${r[0].p.join(" ")}`;for(let o=1;o<=r.length-(e.isClosed?0:1);o++){let s=r[o-1],a=r[o%r.length];i+=s.hasCurveFrom||a.hasCurveTo?` C${(s.hasCurveFrom?s.from:s.p).join(" ")} ${(a.hasCurveTo?a.to:a.p).join(" ")} ${a.p.join(" ")}`:` L${a.p.join(" ")}`}return i+(e.isClosed?" Z":"")}async function oI(e,t){let n=Br(e),r=Ur(n,"document.json"),i=(r.pages||[]).map(h=>h._ref?Ur(n,`${h._ref}.json`):h);if(!i.length)throw new Error("Sketch \u6587\u4EF6\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u9875\u9762\u3002");let o=da(),s=new Map;for(let[h,d]of Object.entries(n))h.startsWith("images/")&&d.length&&s.set(h,await ma(o,d));let a=new Map;function l(h){h.symbolID&&h._class==="symbolMaster"&&a.set(h.symbolID,h),(h.layers||[]).forEach(l)}i.forEach(l),(r.foreignSymbols||[]).forEach(h=>h.symbolMaster&&l(h.symbolMaster));function u(h,d,I,T){let E=St(so(h.color),h.contextSettings?.opacity??1);if(E.blendMode=Jf(h.contextSettings?.blendMode),E.visible=h.isEnabled!==!1,h.fillType===1){let S=h.gradient||{},N=Yn(S.from,[0,.5]),A=Yn(S.to,[1,.5]);E={...E,type:S.gradientType===1?"GRADIENT_RADIAL":"GRADIENT_LINEAR",gradientStops:(S.stops||[]).map(_=>({position:ae(_.position),color:so(_.color)})),gradientTransform:S.gradientType===1?Aa({x:N[0],y:N[1]},{x:A[0],y:A[1]},{x:N[0]-(A[1]-N[1]),y:N[1]+(A[0]-N[0])}):Ea({x:N[0],y:N[1]},{x:A[0],y:A[1]},d||1,I||1)}}else if(h.fillType===4){let S=s.get(h.image?._ref);S?E={...E,type:"IMAGE",imageHash:S,imageScaleMode:h.patternFillType===2?"FIT":h.patternFillType===0?"TILE":"FILL"}:t.add("missing-image","\u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",T)}else h.fillType&&h.fillType!==0&&t.add("sketch-fill","\u90E8\u5206 Sketch \u4E13\u5C5E\u586B\u5145\u6309\u57FA\u7840\u989C\u8272\u8F6C\u6362\u3002",T);return E}function c(h,d,I){let T=h.style||{},E=(T.fills||[]).map(A=>u(A,d,I,h.name)),S=(T.borders||[]).map(A=>({...u(A,d,I,h.name),weight:ae(A.thickness,1),align:["CENTER","INSIDE","OUTSIDE"][A.position]||"CENTER"})),N=[...(T.shadows||[]).map(A=>({...A,kind:"DROP_SHADOW"})),...(T.innerShadows||[]).map(A=>({...A,kind:"INNER_SHADOW"}))].map(A=>({type:A.kind,color:so({...A.color,alpha:(A.color?.alpha??1)*(A.contextSettings?.opacity??1)}),radius:ae(A.blurRadius),spread:ae(A.spread),offset:{x:ae(A.offsetX),y:ae(A.offsetY)},visible:A.isEnabled!==!1,blendMode:Jf(A.contextSettings?.blendMode)}));return T.blur&&(N.push({type:T.blur.type===3?"BACKGROUND_BLUR":"LAYER_BLUR",color:tt(),radius:ae(T.blur.radius),spread:0,offset:{x:0,y:0},visible:T.blur.isEnabled!==!1}),[0,3].includes(T.blur.type??0)||t.add("sketch-blur","\u8FD0\u52A8\u6216\u7F29\u653E\u6A21\u7CCA\u76EE\u524D\u53EA\u80FD\u6309\u666E\u901A\u6A21\u7CCA\u8F6C\u6362\u3002",h.name)),{fills:E,strokes:S,effects:N,opacity:T.contextSettings?.opacity??1,blendMode:Jf(T.contextSettings?.blendMode),dashPattern:T.borderOptions?.dashPattern||[],strokeCap:["NONE","ROUND","SQUARE"][T.borderOptions?.lineCapStyle]||"NONE",strokeJoin:["MITER","ROUND","BEVEL"][T.borderOptions?.lineJoinStyle]||"MITER"}}function f(h={}){let d=h.MSAttributedStringFontAttribute?.attributes||{},I=d.name||"ArialMT",T=h.paragraphStyle||{};return{fontFamily:/^Arial(?:MT|-)/.test(I)?"Arial":I.replace(/[-_](Regular|Medium|Semibold|Bold|Light|Heavy|Italic|Black).*$/i,"").replace(/^(PingFang)(SC|TC|HK)/,"$1 $2"),fontWeight:ga(I),italic:/italic|oblique/i.test(I),fontSize:ae(d.size,14),fills:h.MSAttributedStringColorAttribute?[St(so(h.MSAttributedStringColorAttribute))]:void 0,letterSpacing:ae(h.kerning),lineHeight:T.maximumLineHeight||T.minimumLineHeight||null,textDecoration:h.underlineStyle?"UNDERLINE":h.strikethroughStyle?"STRIKETHROUGH":"NONE"}}function g(h,d,I=0,T=1,E=1,S=[]){if(I>128)throw new Error("\u56FE\u5C42\u5D4C\u5957\u8FC7\u6DF1\u3002");h._class==="slice"&&t.add("sketch-slice","\u5207\u7247\u533A\u57DF\u4FDD\u7559\u4E3A\u65E0\u586B\u5145\u753B\u6846\uFF0C\u5207\u7247\u5BFC\u51FA\u8BBE\u7F6E\u4E0D\u4FDD\u7559\u3002",h.name);let N=h.frame||{},A=ae(N.width)*T,_=ae(N.height)*E,C={page:"CANVAS",artboard:"FRAME",slice:"FRAME",symbolMaster:"FRAME",group:"GROUP",shapeGroup:"GROUP",rectangle:"RECTANGLE",oval:"ELLIPSE",text:"TEXT",bitmap:"RECTANGLE",shapePath:"VECTOR",triangle:"VECTOR",star:"VECTOR",polygon:"VECTOR",symbolInstance:"GROUP"}[h._class];C||(C=h.layers?"GROUP":"RECTANGLE",t.add("sketch-node","\u90E8\u5206 Sketch \u56FE\u5C42\u6309\u57FA\u7840\u56FE\u5F62\u6216\u5206\u7EC4\u8F6C\u6362\u3002",h.name));let M={name:h.name||h._class,x:ae(N.x)*T,y:ae(N.y)*E,width:A,height:_,rotation:-ae(h.rotation),flipX:!!h.isFlippedHorizontal,flipY:!!h.isFlippedVertical,visible:h.isVisible!==!1,locked:!!h.isLocked,isMask:!!h.hasClippingMask,clipsContent:h._class==="artboard",...c(h,A,_)};if(h._class==="shapeGroup"){let Z=[...new Set((h.layers||[]).slice(1).map(R=>R.booleanOperation).filter(R=>R>=0))];Z.length===1?(C="BOOLEAN_OPERATION",M.booleanOperation=iI[Z[0]]):Z.length>1&&t.add("sketch-boolean-mixed","\u4E00\u4E2A\u5F62\u72B6\u7EC4\u4E2D\u6DF7\u5408\u4E86\u591A\u79CD\u5E03\u5C14\u8FD0\u7B97\uFF0C\u76EE\u524D\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",h.name)}if(h._class==="group"&&(M.fills=[]),h.hasBackgroundColor&&(M.fills=[St(so(h.backgroundColor))]),C==="RECTANGLE"){if(M.cornerRadius=ae(h.fixedRadius||h.points?.[0]?.cornerRadius)*T,h.points?.length===4){let Z=h.points.map(R=>ae(R.cornerRadius,ae(h.fixedRadius))*T);Object.assign(M,{independentCorners:Z.some(R=>R!==Z[0]),topLeftRadius:Z[0],topRightRadius:Z[1],bottomRightRadius:Z[2],bottomLeftRadius:Z[3]})}if(h._class==="bitmap"){let Z=s.get(h.image?._ref);Z?M.fills=[{...St(tt(1,1,1)),type:"IMAGE",imageHash:Z,imageScaleMode:"FILL"}]:t.add("missing-image","\u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",h.name)}}if(C==="VECTOR"){let Z=CD(h,A,_);Z&&Object.assign(M,Qn(Z,h.style?.windingRule===0?"NONZERO":"EVENODD"))}if(C==="TEXT"){let Z=h.attributedString||{},R=h.style?.textStyle?.encodedAttributes||Z.attributes?.[0]?.attributes||{},U=f(R);(!U.fills||M.fills.length)&&delete U.fills,Object.assign(M,U,{text:Z.string||"",textAutoResize:h.textBehaviour===0?"WIDTH_AND_HEIGHT":h.textBehaviour===1?"HEIGHT":"NONE",textAlignHorizontal:["LEFT","RIGHT","CENTER","JUSTIFIED"][R.paragraphStyle?.alignment]||"LEFT",fontPostscript:R.MSAttributedStringFontAttribute?.attributes?.name}),M.fontSize*=E,M.letterSpacing*=T,M.lineHeight&&(M.lineHeight*=E),M.styleRuns=(Z.attributes||[]).map(y=>({start:ae(y.location),length:ae(y.length),style:f(y.attributes)})),M.styleRuns.forEach(y=>{y.style.fontSize*=E,y.style.letterSpacing*=T,y.style.lineHeight&&(y.style.lineHeight*=E)})}let z=pa(o,C,d,M);(h._class==="symbolMaster"||h._class==="symbolInstance")&&t.add("sketch-symbol","Sketch \u7B26\u53F7\u8F6C\u6362\u4E3A\u53EF\u7F16\u8F91\u56FE\u5C42\uFF0C\u7B26\u53F7\u5173\u8054\u4E0D\u4FDD\u7559\u3002",h.name),h._class==="shapeGroup"&&C!=="BOOLEAN_OPERATION"&&t.add("sketch-shape-group","\u590D\u5408\u8DEF\u5F84\u6309\u53EF\u7F16\u8F91\u5B50\u8DEF\u5F84\u4FDD\u7559\uFF0C\u5408\u6210\u586B\u5145\u89C4\u5219\u5C1A\u4E0D\u80FD\u4FDD\u8BC1\u7B49\u4EF7\u8F6C\u6362\u3002",h.name),h.flow?.destinationArtboardID&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",h.name);let w=h.layers||[],ee=T,ie=E;if(h._class==="symbolInstance"){let U=function(y){for(let O of R)O.overrideName?.startsWith(y.do_objectID+"_")&&(O.overrideName.endsWith("_stringValue")&&y.attributedString&&(y.attributedString.string=String(O.value)),O.overrideName.endsWith("_image")&&(y.image=O.value),O.overrideName.endsWith("_symbolID")&&(y.symbolID=O.value));(y.layers||[]).forEach(U)};if(S.includes(h.symbolID)){t.add("symbol-cycle","\u5FAA\u73AF\u7B26\u53F7\u5F15\u7528\u5DF2\u505C\u6B62\u5C55\u5F00\u3002",h.name);return}let Z=a.get(h.symbolID);if(!Z){t.add("missing-symbol","\u90E8\u5206\u7B26\u53F7\u5B9A\u4E49\u672A\u5305\u542B\u5728\u6587\u4EF6\u4E2D\uFF0C\u65E0\u6CD5\u5C55\u5F00\u3002",h.name);return}w=structuredClone(Z.layers||[]);let R=h.overrideValues||[];w.forEach(U),ee=A/(Z.frame?.width||A||1),ie=_/(Z.frame?.height||_||1),S=[...S,h.symbolID]}w.forEach(Z=>g(Z,z.id,I+1,ee,ie,S))}return i.forEach(h=>g(h,o.rootId)),{graph:o,thumbnail:n["previews/preview.png"]}}function sI(e,t){return{_class:t,do_objectID:Re(),booleanOperation:-1,isFixedToViewport:!1,isFlippedHorizontal:!!e.flipX,isFlippedVertical:!!e.flipY,isLocked:e.locked,isVisible:e.visible,layerListExpandedType:1,name:e.name,nameIsFixed:!0,resizingConstraint:63,resizingType:0,rotation:-e.rotation,shouldBreakMaskChain:!1,exportOptions:{_class:"exportOptions",includedLayerIds:[],layerOptions:0,shouldTrim:!1,exportFormats:[]},frame:{_class:"rect",constrainProportions:!1,height:e.height,width:e.width,x:e.x,y:e.y},clippingMaskMode:0,hasClippingMask:!!e.isMask}}function ed(e,t,n,r){let i=lo([e/(n||1),t/(r||1)]);return{_class:"curvePoint",cornerRadius:0,curveFrom:i,curveTo:i,point:i,hasCurveFrom:!1,hasCurveTo:!1,curveMode:1}}function OD(e,t){let n=Hr(t),r=[],i;for(let o of n)if(o.type==="M")i={points:[ed(o.x,o.y,e.width,e.height)],isClosed:!1},r.push(i);else if(o.type==="Z")i&&(i.isClosed=!0);else if(i){let s=o;if(o.type==="Q"){let l=Yn(i.points.at(-1).point).map((u,c)=>u*(c?e.height:e.width));s={type:"C",x:o.x,y:o.y,x1:l[0]+2/3*(o.x1-l[0]),y1:l[1]+2/3*(o.y1-l[1]),x2:o.x+2/3*(o.x1-o.x),y2:o.y+2/3*(o.y1-o.y)}}let a=ed(s.x,s.y,e.width,e.height);s.type==="C"&&(Object.assign(i.points.at(-1),{hasCurveFrom:!0,curveMode:4,curveFrom:lo([s.x1/(e.width||1),s.y1/(e.height||1)])}),Object.assign(a,{hasCurveTo:!0,curveMode:4,curveTo:lo([s.x2/(e.width||1),s.y2/(e.height||1)])})),i.points.push(a)}return r.map(o=>({...sI({...e,x:0,y:0,rotation:0,flipX:!1,flipY:!1},"shapePath"),...o,edited:!0,pointRadiusBehaviour:1}))}function aI(e,t,n,r){let i={},o=new Set,s=new Map;for(let[d,I]of e.images){let T=`images/${d}.${Rf(I)}`;i[T]=[I,{level:0}],s.set(d,{_class:"MSJSONFileReference",_ref_class:"MSImageData",_ref:T})}function a(d,I=!1){let T=d.gradientTransform?an(d.gradientTransform,{x:0,y:.5}):{x:0,y:.5},E=d.gradientTransform?an(d.gradientTransform,{x:1,y:.5}):{x:1,y:.5};return{_class:I?"border":"fill",isEnabled:d.visible,fillType:d.type==="IMAGE"?4:d.type.startsWith("GRADIENT")?1:0,color:ao(d.color),contextSettings:{_class:"graphicsContextSettings",opacity:d.opacity,blendMode:Qf(d.blendMode)},gradient:{_class:"gradient",elipseLength:1,from:lo([T.x,T.y]),to:lo([E.x,E.y]),gradientType:d.type==="GRADIENT_RADIAL"?1:0,stops:(d.gradientStops||[]).map(S=>({_class:"gradientStop",color:ao(S.color),position:S.position}))},image:s.get(d.imageHash),patternFillType:d.imageScaleMode==="FIT"?2:d.imageScaleMode==="TILE"?0:1,patternTileScale:1,noiseIndex:0,noiseIntensity:0,...I?{thickness:d.weight,position:{CENTER:0,INSIDE:1,OUTSIDE:2}[d.align]||0}:{}}}function l(d){let I=S=>({_class:S.type==="INNER_SHADOW"?"innerShadow":"shadow",isEnabled:S.visible,blurRadius:S.radius,spread:S.spread,offsetX:S.offset.x,offsetY:S.offset.y,color:ao(S.color),contextSettings:{_class:"graphicsContextSettings",opacity:1,blendMode:Qf(S.blendMode)}}),T={_class:"style",do_objectID:Re(),endMarkerType:0,startMarkerType:0,miterLimit:10,windingRule:1,fills:d.fills.map(S=>a(S)),borders:d.strokes.map(S=>a(S,!0)),shadows:d.effects.filter(S=>S.type==="DROP_SHADOW").map(I),innerShadows:d.effects.filter(S=>S.type==="INNER_SHADOW").map(I),contextSettings:{_class:"graphicsContextSettings",opacity:d.opacity,blendMode:Qf(d.blendMode)},borderOptions:{_class:"borderOptions",isEnabled:!0,dashPattern:d.dashPattern,lineCapStyle:{NONE:0,ROUND:1,SQUARE:2}[d.strokeCap]||0,lineJoinStyle:{MITER:0,ROUND:1,BEVEL:2}[d.strokeJoin]||0}},E=d.effects.find(S=>S.type.includes("BLUR"));return E&&(T.blur={_class:"blur",isEnabled:E.visible,type:E.type==="BACKGROUND_BLUR"?3:0,radius:E.radius,center:"{0.5, 0.5}",motionAngle:0,saturation:1}),T}let u=d=>({MSAttributedStringFontAttribute:{_class:"fontDescriptor",attributes:{name:d.fontPostscript||(d.fontFamily==="Arial"?d.fontWeight>=700?"Arial-BoldMT":"ArialMT":`${d.fontFamily.replace(/\s+/g,"")}-${ya(d.fontWeight,d.italic).replace(/\s+/g,"")}`),size:d.fontSize}},MSAttributedStringColorAttribute:ao(d.fills.find(I=>I.visible)?.color||tt()),kerning:d.letterSpacing||0,paragraphStyle:{_class:"paragraphStyle",alignment:{LEFT:0,RIGHT:1,CENTER:2,JUSTIFIED:3}[d.textAlignHorizontal]||0,...d.lineHeight?{minimumLineHeight:d.lineHeight,maximumLineHeight:d.lineHeight}:{}},underlineStyle:d.textDecoration==="UNDERLINE"?1:0,strikethroughStyle:d.textDecoration==="STRIKETHROUGH"?1:0});function c(d){o.add(d.id);let I={CANVAS:"page",FRAME:"artboard",RECTANGLE:"rectangle",ROUNDED_RECTANGLE:"rectangle",ELLIPSE:"oval",TEXT:"text",LINE:"shapePath",VECTOR:"shapeGroup",STAR:"shapeGroup",POLYGON:"shapeGroup",BOOLEAN_OPERATION:"group",GROUP:"group",COMPONENT:"group",INSTANCE:"group",COMPONENT_SET:"group",SECTION:"group"}[d.type]||"group";I==="artboard"&&e.getNode(d.parentId)?.type!=="CANVAS"&&(I="group");let T={...sI(d,I),style:l(d)};if(I==="text"){let E=d.styleRuns.length?d.styleRuns.map(S=>({_class:"stringAttribute",location:S.start,length:S.length,attributes:u({...d,...S.style})})):[{_class:"stringAttribute",location:0,length:d.text.length,attributes:u(d)}];T.attributedString={_class:"attributedString",string:d.text,attributes:E},T.style.textStyle={_class:"textStyle",encodedAttributes:u(d),verticalAlignment:{TOP:0,CENTER:1,BOTTOM:2}[d.textAlignVertical]||0},T.textBehaviour=d.textAutoResize==="WIDTH_AND_HEIGHT"?0:d.textAutoResize==="HEIGHT"?1:2,T.automaticallyDrawOnUnderlyingPath=!1,T.dontSynchroniseWithSymbol=!1,T.lineSpacingBehaviour=2,T.glyphBounds="{{0, 0}, {0, 0}}"}else if(I==="rectangle")T.fixedRadius=d.cornerRadius,T.points=[[0,0],[1,0],[1,1],[0,1]].map(([E,S],N)=>({...ed(E*d.width,S*d.height,d.width,d.height),cornerRadius:d.independentCorners?[d.topLeftRadius,d.topRightRadius,d.bottomRightRadius,d.bottomLeftRadius][N]:d.cornerRadius})),T.isClosed=!0,T.edited=!1,T.pointRadiusBehaviour=1;else if(I==="oval")T.isClosed=!0,T.edited=!1;else if(d.type==="BOOLEAN_OPERATION")T._class="shapeGroup",T.layers=e.getChildren(d.id).map((E,S)=>({...c(E),booleanOperation:S===0?-1:Math.max(0,iI.indexOf(d.booleanOperation))})),T.windingRule=1;else if(I==="shapePath"||I==="shapeGroup"){let E=d.type==="LINE"?`M0 0 L${d.width} ${d.height}`:Xe(d),S=OD(d,E);S.length||r.add("vector-empty","\u90E8\u5206\u77E2\u91CF\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u8F6E\u5ED3\u3002",d.name),T._class="shapeGroup",T.layers=S,T.windingRule=1}if(["group","artboard","page"].includes(I)&&d.type!=="BOOLEAN_OPERATION"){if(T.layers=e.getChildren(d.id).map(c),I==="group"&&d.fills.some(E=>E.visible)&&(T.layers.unshift(c({...d,type:"RECTANGLE",name:`${d.name} \u80CC\u666F`,x:0,y:0,rotation:0,flipX:!1,flipY:!1,strokes:[],effects:[],opacity:1})),T.style.fills=[]),T.hasClickThrough=!0,T.groupLayout={_class:"MSImmutableFreeformGroupLayout"},I==="artboard"){let E=d.fills.filter(N=>N.visible),S=E.length===1&&E[0].type==="SOLID"?E[0]:null;Object.assign(T,{hasBackgroundColor:!!S,backgroundColor:ao(S?{...S.color,a:S.color.a*S.opacity}:tt(1,1,1)),includeBackgroundColorInExport:!0,resizesContent:!1}),T.style.fills=[],!S&&E.length&&T.layers.unshift(c({...d,type:"RECTANGLE",name:`${d.name} \u80CC\u666F`,x:0,y:0,rotation:0,flipX:!1,flipY:!1,strokes:[],effects:[],opacity:1}))}I==="page"&&Object.assign(T,{horizontalRulerData:{_class:"rulerData",base:0,guides:[]},verticalRulerData:{_class:"rulerData",base:0,guides:[]}})}return T}let f=e.getPages(!0).map(c),g={};for(let d of f)i[`pages/${d.do_objectID}.json`]=ot(JSON.stringify(d)),g[d.do_objectID]={name:d.name,artboards:Object.fromEntries(d.layers.filter(I=>I._class==="artboard").map(I=>[I.do_objectID,{name:I.name}]))};let h={_class:"document",do_objectID:Re(),assets:{_class:"assetCollection",colors:[],gradients:[],images:[],colorAssets:[],gradientAssets:[]},colorSpace:0,currentPageIndex:0,foreignLayerStyles:[],foreignSymbols:[],foreignTextStyles:[],layerStyles:{_class:"sharedStyleContainer",objects:[]},layerTextStyles:{_class:"sharedTextStyleContainer",objects:[]},pages:f.map(d=>({_class:"MSJSONFileReference",_ref_class:"MSImmutablePage",_ref:`pages/${d.do_objectID}`}))};return i["document.json"]=ot(JSON.stringify(h)),i["meta.json"]=ot(JSON.stringify({version:136,compatibilityVersion:99,app:"com.bohemiancoding.sketch3",variant:"NONAPPSTORE",appVersion:"97",build:1,pagesAndArtboards:g,fonts:[...new Set([...e.nodes.values()].filter(d=>d.type==="TEXT").map(d=>d.fontFamily))]})),i["user.json"]=ot("{}"),n&&(i["previews/preview.png"]=[n,{level:0}]),zr(e,o,r),sr(i)}var od=Kr(ri(),1);var cI=Kr(lI(),1);var uI=()=>({locateFile:e=>new URL(`${e}?v=1.0.0`,globalThis.location.href).href});var Na;function fI(){return Na||(Na=(0,cI.default)(uI()).catch(e=>{throw Na=null,e})),Na}async function dI(e){let t=await fI(),n=t.FromSVGString(e);if(!n)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u5B57\u5F62\u8F6E\u5ED3\u3002");try{let r=n.computeTightBounds();return{x:r.fLeft,y:r.fTop,width:r.fRight-r.fLeft,height:r.fBottom-r.fTop}}finally{n.delete()}}function RD(e){if(e.type==="ELLIPSE")return`M${e.width/2} 0 A${e.width/2} ${e.height/2} 0 1 1 ${e.width/2} ${e.height} A${e.width/2} ${e.height/2} 0 1 1 ${e.width/2} 0 Z`;if(e.type==="LINE")return`M0 0 L${e.width} ${e.height}`;if(!["RECTANGLE","ROUNDED_RECTANGLE"].includes(e.type))return Xe(e);let t=e.width,n=e.height,[r,i,o,s]=(e.independentCorners?[e.topLeftRadius,e.topRightRadius,e.bottomRightRadius,e.bottomLeftRadius]:Array(4).fill(e.cornerRadius)).map(l=>Math.max(0,Math.min(l,t/2,n/2))),a=(l,u,c)=>l?`A${l} ${l} 0 0 1 ${u} ${c}`:`L${u} ${c}`;return`M${r} 0 L${t-i} 0 ${a(i,t,i)} L${t} ${n-o} ${a(o,t-o,n)} L${s} ${n} ${a(s,0,n-s)} L0 ${r} ${a(r,r,0)} Z`}function DD(e,t){let n=[],r,i,o;for(let u of Hr(t.toSVGString())){let c={x:u.x,y:u.y};u.type==="M"?(r=i=c,o=[],n.push(o)):u.type==="Z"?((r.x!==i.x||r.y!==i.y)&&o.push({type:"L",from:r,to:i}),r=i):(o.push({...u,from:r,to:c}),r=c)}if(n.length>512)throw new Error("\u8499\u7248\u8F6E\u5ED3\u8FC7\u4E8E\u590D\u6742\u3002");let s=(u,c=!1)=>{if(!u.length)return"";let f=c?u.at(-1).to:u[0].from;return`M${f.x} ${f.y} `+(c?[...u].reverse():u).map(g=>{let h=c?g.from:g.to;return g.type==="C"?`C${c?g.x2:g.x1} ${c?g.y2:g.y1} ${c?g.x1:g.x2} ${c?g.y1:g.y2} ${h.x} ${h.y}`:g.type==="Q"?`Q${g.x1} ${g.y1} ${h.x} ${h.y}`:`L${h.x} ${h.y}`}).join(" ")+" Z"},a=u=>u.reduce((c,f)=>{let g=I=>{let T=f.from[I],E=f.to[I],S=f[I+"1"],N=f[I+"2"];return f.type==="C"?[T,3*(S-T),3*(T-2*S+N),-T+3*S-3*N+E]:f.type==="Q"?[T,2*(S-T),T-2*S+E]:[T,E-T]},h=g("x"),d=g("y");for(let I=0;I<h.length;I++)for(let T=1;T<d.length;T++)c+=(h[I]*T*d[T]-d[I]*T*h[T])/(I+T);return c},0),l=n.map(u=>e.FromSVGString(s(u)));try{let u=l.map(c=>c.computeTightBounds());return n.map((c,f)=>{let g=0;for(let h=0;h<l.length;h++){if(h===f)continue;let d=u[f],I=u[h];if(I.fLeft>d.fLeft||I.fTop>d.fTop||I.fRight<d.fRight||I.fBottom<d.fBottom)continue;let T=e.MakeFromOp(l[f],l[h],e.PathOp.DIFFERENCE);if(!T)throw new Error("\u65E0\u6CD5\u786E\u5B9A\u8499\u7248\u5B54\u6D1E\u65B9\u5411\u3002");try{T.toCmds().length||g++}finally{T.delete()}}return s(c,a(c)>0!=(g%2===0))}).join(" ")}finally{l.forEach(u=>u?.delete())}}async function pI(e){let t=await fI(),n=t.NewPath();try{for(let{node:r,stroke:i,matrix:o,include:s}of e){let a=t.FromSVGString(RD(r));if(!a)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u8499\u7248\u7684\u77E2\u91CF\u8F6E\u5ED3\u3002");let l;try{if(a.setFillType(r.fillGeometry[0]?.windingRule==="EVENODD"?t.FillType.EVENODD:t.FillType.WINDING),l=a.copy(),i){if(i.weight<=0)continue;let u={NONE:t.StrokeCap.BUTT,ROUND:t.StrokeCap.ROUND,SQUARE:t.StrokeCap.SQUARE}[i.cap||r.strokeCap],c={MITER:t.StrokeJoin.MITER,ROUND:t.StrokeJoin.ROUND,BEVEL:t.StrokeJoin.BEVEL}[i.join||r.strokeJoin];if(!l.stroke({width:i.weight*(i.align==="CENTER"?1:2),cap:u,join:c,miter_limit:4}))throw new Error("\u65E0\u6CD5\u8BA1\u7B97\u8499\u7248\u63CF\u8FB9\u8F6E\u5ED3\u3002");if(i.align!=="CENTER"&&!l.op(a,i.align==="INSIDE"?t.PathOp.INTERSECT:t.PathOp.DIFFERENCE))throw new Error("\u65E0\u6CD5\u8BA1\u7B97\u8499\u7248\u63CF\u8FB9\u5BF9\u9F50\u3002")}if(l.transform(o.a,o.c,o.tx,o.b,o.d,o.ty,0,0,1),!n.op(l,s?t.PathOp.UNION:t.PathOp.DIFFERENCE))throw new Error("\u65E0\u6CD5\u8BA1\u7B97\u8499\u7248\u7684\u77E2\u91CF\u5E03\u5C14\u8F6E\u5ED3\u3002")}finally{l?.delete(),a.delete()}}return DD(t,n)}finally{n.delete()}}function Ca(e,t){let n=new OffscreenCanvas(e,t);return{canvas:n,ctx:n.getContext("2d",{willReadFrequently:!0}),path:r=>new Path2D(r),png:async()=>new Uint8Array(await(await n.convertToBlob({type:"image/png"})).arrayBuffer())}}var mI=e=>createImageBitmap(new Blob([e]));var vI=Kr(ri(),1);var hI=new Set(["RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE","VECTOR"]),uo=e=>!e||["NORMAL","PASS_THROUGH"].includes(e),MD=e=>["SOLID","GRADIENT_LINEAR"].includes(e.type)&&uo(e.blendMode)&&(e.type==="SOLID"||e.gradientStops?.length>0);function Oa(e,t){if(!t.isMask||t.maskType!=="ALPHA"||!hI.has(t.type)||!t.visible||t.effects.some(o=>o.visible)||!uo(t.blendMode)||oo(e,t)||t.type==="VECTOR"&&!Xe(t)||![...t.fills,...t.strokes].every(MD)||t.dashPattern.length||t.strokes.some(o=>o.dashPattern?.length||!["CENTER","INSIDE","OUTSIDE"].includes(o.align)))return null;let n=e.getChildren(t.parentId),r=n.indexOf(t),i=[];for(let o of n.slice(r+1)){if(o.isMask)break;if(!hI.has(o.type)||e.getChildren(o.id).length||o.fills.length!==1||o.fills[0].type!=="IMAGE"||o.effects.length||o.strokes.length)return null;let s=o.fills[0],a=Zn(e.images.get(s.imageHash));if(!a||a.width*a.height>16*1024*1024||!["FILL","FIT","CROP","STRETCH"].includes(s.imageScaleMode)||["CROP","STRETCH"].includes(s.imageScaleMode)&&!Jn(o,s,a))return null;i.push(o)}return i.length?i:null}function Ra(e){return e.type==="TEXT"&&e.textDecoration==="NONE"&&e.derivedTextGlyphs?.length>0&&!e.styleRuns.length&&e.fills.length===1&&e.fills[0].type==="GRADIENT_LINEAR"&&uo(e.fills[0].blendMode)&&e.strokes.length<=1&&e.strokes.every(t=>t.type==="SOLID"&&t.opacity===1&&uo(t.blendMode))}function Da(e){return["RECTANGLE","ROUNDED_RECTANGLE","ELLIPSE"].includes(e.type)&&!e.cornerSmoothing&&!e.strokes.length&&e.fills.length>0&&e.effects.length===1&&e.effects.every(t=>t.type==="INNER_SHADOW"&&t.radius>=0&&t.spread>=0&&uo(t.blendMode))}function co(e){if(e.type==="VECTOR")return Xe(e);if(e.type==="ELLIPSE")return`M${e.width/2} 0 A${e.width/2} ${e.height/2} 0 1 1 ${e.width/2} ${e.height} A${e.width/2} ${e.height/2} 0 1 1 ${e.width/2} 0 Z`;let t=e.width,n=e.height,r=e.independentCorners?[e.topLeftRadius,e.topRightRadius,e.bottomRightRadius,e.bottomLeftRadius]:Array(4).fill(e.cornerRadius),[i,o,s,a]=r.map(u=>Math.max(0,Math.min(u,t/2,n/2))),l=(u,c,f)=>u?`A${u} ${u} 0 0 1 ${c} ${f}`:`L${c} ${f}`;return`M${i} 0 L${t-o} 0 ${l(o,t,o)} L${t} ${n-s} ${l(s,t-s,n)} L${a} ${n} ${l(a,0,n-a)} L0 ${i} ${l(i,i,0)} Z`}var gI=(e,t)=>({a:e.a*t.a+e.c*t.b,b:e.b*t.a+e.d*t.b,c:e.a*t.c+e.c*t.d,d:e.b*t.c+e.d*t.d,tx:e.a*t.tx+e.c*t.ty+e.tx,ty:e.b*t.tx+e.d*t.ty+e.ty});function PD(e){let t=e.a*e.d-e.b*e.c;if(Math.abs(t)<1e-12)throw new Error("\u56FE\u7247\u6216\u8499\u7248\u53D8\u6362\u4E0D\u53EF\u9006\u3002");return{a:e.d/t,b:-e.b/t,c:-e.c/t,d:e.a/t,tx:(e.c*e.ty-e.d*e.tx)/t,ty:(e.b*e.tx-e.a*e.ty)/t}}function wD(e,t,n){if(["CROP","STRETCH"].includes(t.imageScaleMode)||t.imageTransform&&Object.entries({m00:1,m01:0,m02:0,m10:0,m11:1,m12:0}).some(([i,o])=>Math.abs((t.imageTransform[i]??o)-o)>1e-6))return Jn(e,t,n);let r=Math[t.imageScaleMode==="FIT"?"min":"max"](e.width/n.width,e.height/n.height);return{a:r,b:0,c:0,d:r,tx:(e.width-n.width*r)/2,ty:(e.height-n.height*r)/2}}function yI(e,t,n){if(t.type==="SOLID")return`rgba(255,255,255,${t.color.a})`;let r=t.gradientTransform?an(t.gradientTransform,{x:0,y:.5}):{x:0,y:0},i=t.gradientTransform?an(t.gradientTransform,{x:1,y:.5}):{x:1,y:0},o=e.createLinearGradient(r.x*n.width,r.y*n.height,i.x*n.width,i.y*n.height);for(let s of t.gradientStops)o.addColorStop(Math.max(0,Math.min(1,s.position)),`rgba(255,255,255,${s.color.a})`);return o}async function kD(e,t,n,r){let i=n.fills[0],o=e.images.get(i.imageHash),s=Zn(o),a=gI(PD(gI(sn(n),wD(n,i,s))),sn(t)),l=JSON.stringify({image:i.imageHash,path:co(t),fills:t.fills,strokes:t.strokes,opacity:t.opacity,m:a});if(r.has(l))return r.get(l);let u=Ca(s.width,s.height),{ctx:c}=u;c.setTransform(a.a,a.b,a.c,a.d,a.tx,a.ty);let f=u.path(co(t));for(let T of t.fills.filter(E=>E.visible))c.globalAlpha=T.opacity,c.fillStyle=yI(c,T,t),c.fill(f,t.fillGeometry[0]?.windingRule==="EVENODD"?"evenodd":"nonzero");for(let T of t.strokes.filter(E=>E.visible&&E.weight>0)){if(c.save(),c.globalAlpha=T.opacity,c.strokeStyle=yI(c,T,t),c.lineWidth=T.weight*(T.align==="CENTER"?1:2),c.lineJoin=(T.join||t.strokeJoin).toLowerCase(),c.lineCap=(T.cap||t.strokeCap)==="NONE"?"butt":(T.cap||t.strokeCap).toLowerCase(),c.miterLimit=t.strokeMiterLimit||4,T.align==="INSIDE"&&c.clip(f),T.align==="OUTSIDE"){let S=u.path(`M-100000 -100000 H100000 V100000 H-100000 Z ${co(t)}`);c.clip(S,"evenodd")}c.stroke(f),c.restore()}c.resetTransform(),c.globalAlpha=1;let g=c.getImageData(0,0,s.width,s.height).data;c.clearRect(0,0,s.width,s.height);let h=await mI(o);try{c.drawImage(h,0,0)}finally{h.close?.()}let d=c.getImageData(0,0,s.width,s.height);for(let T=3;T<d.data.length;T+=4)d.data[T]=Math.round(d.data[T]*g[T]/255*t.opacity);c.putImageData(d,0,0);let I=await u.png();return r.set(l,I),I}async function _D(e,t){let r=Math.max(1,Math.ceil(e.width*3)),i=Math.max(1,Math.ceil(e.height*3));if(r*i>16*1024*1024)throw new Error("\u9634\u5F71\u533A\u57DF\u8FC7\u5927\uFF0C\u8BF7\u7F29\u5C0F\u7D20\u6750\u540E\u91CD\u8BD5\u3002");let o=Math.ceil((t.radius*3+t.spread+Math.abs(t.offset.x)+Math.abs(t.offset.y)+2)*3);if(!Number.isFinite(o)||(r+o*2)*(i+o*2)>16*1024*1024)throw new Error("\u9634\u5F71\u6269\u5C55\u8303\u56F4\u8FC7\u5927\uFF0C\u8BF7\u51CF\u5C0F\u6A21\u7CCA\u6216\u6269\u5C55\u503C\u540E\u91CD\u8BD5\u3002");let s=Ca(r,i),a=Ca(r+o*2,i+o*2),{ctx:l}=a,u=t.spread,c={...e,width:Math.max(0,e.width-u*2),height:Math.max(0,e.height-u*2),cornerRadius:Math.max(0,e.cornerRadius-u),topLeftRadius:Math.max(0,e.topLeftRadius-u),topRightRadius:Math.max(0,e.topRightRadius-u),bottomLeftRadius:Math.max(0,e.bottomLeftRadius-u),bottomRightRadius:Math.max(0,e.bottomRightRadius-u)};l.scale(3,3),l.fillStyle="white",l.fillRect(0,0,a.canvas.width/3,a.canvas.height/3),l.globalCompositeOperation="destination-out",l.translate(o/3+u+t.offset.x,o/3+u+t.offset.y),l.fill(a.path(co(c)));let f=s.ctx;f.filter=`blur(${t.radius/2*3}px)`,f.drawImage(a.canvas,-o,-o),f.filter="none";let g=f.getImageData(0,0,r,i),h=t.color;for(let d=0;d<g.data.length;d+=4)g.data[d]=Math.round(h.r*255),g.data[d+1]=Math.round(h.g*255),g.data[d+2]=Math.round(h.b*255),g.data[d+3]=Math.round(g.data[d+3]*h.a);return f.putImageData(g,0,0),f.globalCompositeOperation="destination-in",f.scale(3,3),f.fillStyle="white",f.fill(s.path(co(e))),s.png()}async function II(e){let t=new Map,n=new Map,r=new Map,i=new Map,o=new Map,s=new Map;async function a(l){let u=[...new Uint8Array(await crypto.subtle.digest("SHA-1",l))].map(c=>c.toString(16).padStart(2,"0")).join("");return o.set(u,l),u}for(let l of e.nodes.values()){let u=Oa(e,l);if(u){t.set(l.id,u.map(c=>c.id));for(let c of u)n.set(c.id,await a(await kD(e,l,c,s)))}if(Ra(l)){let c=l.derivedTextGlyphs.map(g=>(0,vI.default)(ca(g.commandsBlob)).scale(g.fontSize).rotate((g.rotation||0)*180/Math.PI).scale(g.scaleX??1,g.scaleY??1).translate(g.x,g.y).toString()).join(" "),f=c.trim()?await dI(c):null;if(!f||!Number.isFinite(f.width)||!Number.isFinite(f.height)||f.width<=0||f.height<=0)throw new Error(`\u6587\u5B57\u201C${l.name}\u201D\u7684\u5B57\u5F62\u7F13\u5B58\u65E0\u6709\u6548\u8F6E\u5ED3\uFF0C\u4E0D\u80FD\u751F\u6210\u7F3A\u5931\u6587\u5B57\u7684\u7ED3\u679C\u3002`);i.set(l.id,{path:c,bounds:f})}if(l.effects.some(c=>c.spread)&&Da(l)){let c=[];for(let f of l.effects.filter(g=>g.spread))c.push({effect:f,hash:await a(await _D(l,f))});r.set(l.id,c)}}return{masks:t,images:n,shadows:r,texts:i,resources:o}}function Ma(e={}){return typeof e.value=="number"?tt((e.value>>>16&255)/255,(e.value>>>8&255)/255,(e.value&255)/255,(e.value>>>24)/255):tt((e.value?.r??e.r??0)/255,(e.value?.g??e.g??0)/255,(e.value?.b??e.b??0)/255,e.alpha??1)}var fo=e=>({mode:"RGB",value:{r:Math.round(e.r*255),g:Math.round(e.g*255),b:Math.round(e.b*255)},alpha:e.a}),LD=e=>({value:(Math.round(e.a*255)<<24|Math.round(e.r*255)<<16|Math.round(e.g*255)<<8|Math.round(e.b*255))>>>0}),Pa=e=>e.children||e.artboard?.children||e.group?.children||e.shape?.children||[],VD=e=>String(e||"normal").replace(/-/g,"_").toUpperCase(),FD=e=>String(e==="PASS_THROUGH"?"normal":e||"normal").toLowerCase().replace(/_/g,"-"),TI={ORIGINAL:"none",UPPER:"uppercase",LOWER:"lowercase",TITLE:"titlecase"},GD=Object.fromEntries(Object.entries(TI).map(([e,t])=>[t,e]));function rd(e={},t={}){return{fontFamily:e.family||"Arial",fontWeight:ga(e.style),italic:/italic|oblique/i.test(e.style||""),fontSize:ae(e.size,14),letterSpacing:ae(t.letterSpacing)*ae(e.size,14)/1e3,textDecoration:t.decoration?.includes("underline")?"UNDERLINE":t.decoration?.includes("line-through")?"STRIKETHROUGH":"NONE",textCase:GD[t.textTransform]||"ORIGINAL"}}function id(e){let t=ya(e.fontWeight,e.italic).replace(/^Regular Italic$/,"Italic"),n=e.fontFamily==="Arial"?`Arial${e.fontWeight>=700?e.italic?"-BoldItalic":"-Bold":e.italic?"-Italic":""}MT`:`${e.fontFamily.replace(/\s+/g,"")}-${t.replace(/\s+/g,"")}`;return{font:{family:e.fontFamily,style:t,postscriptName:e.fontPostscript||n,size:e.fontSize},textAttributes:{letterSpacing:e.fontSize?e.letterSpacing/e.fontSize*1e3:0,decoration:e.textDecoration==="UNDERLINE"?["underline"]:e.textDecoration==="STRIKETHROUGH"?["line-through"]:[],textTransform:TI[e.textCase]||"none"}}}function BD(e){let t=e.text.length,n=new Set([0,t]);for(let o of e.styleRuns)n.add(Math.max(0,Math.min(t,o.start))),n.add(Math.max(0,Math.min(t,o.start+o.length)));let r=[...n].sort((o,s)=>o-s),i=[];for(let o=0;o<r.length-1;o++){let s=r[o],a=r[o+1],l={...e};for(let u of e.styleRuns)u.start<=s&&u.start+u.length>=a&&(["fontFamily","fontWeight","italic"].some(c=>u.style[c]!==void 0&&u.style[c]!==l[c])&&delete l.fontPostscript,Object.assign(l,u.style));i.push({from:s,to:a,node:l})}return i}async function SI(e,t){let n=Br(e),r=Ur(n,"manifest");if(!String(r.type||"").includes("sparkler"))throw new Error("\u4E0D\u662F\u53D7\u652F\u6301\u7684 Adobe XD \u8BBE\u8BA1\u6587\u4EF6\u3002");let i=Object.entries(n).filter(([d])=>d.endsWith("graphicContent.agc")).map(([d,I])=>({path:d,data:JSON.parse(new TextDecoder().decode(I))})),o=i.find(d=>d.path==="resources/graphics/graphicContent.agc")?.data||{},s=da(),a=s.addPage(r.name||"XD \u8BBE\u8BA1"),l=new Map;for(let[d,I]of Object.entries(n))/^resources\/[^/]+$/.test(d)&&I.length&&l.set(d.slice(10),await ma(s,I));let u=new Map;function c(d,I=0){if(!(!d||typeof d!="object"||I>128)){if(d.type&&d.type!=="syncRef")for(let T of[d.id,d.guid,d.syncSourceGuid,d.meta?.ux?.symbolId])T&&!u.has(T)&&u.set(T,d);for(let T of Object.values(d))T&&typeof T=="object"&&c(T,I+1)}}i.forEach(d=>c(d.data));function f(d,I,T,E){if(!d||d.type==="none")return[];let S=St(Ma(d.color),d.opacity??1);if(S.visible=d.visible!==!1,d.type==="pattern"){let N=d.pattern||{},A=l.get(N.meta?.ux?.uid||N.uid||N.href?.replace(/^.*\//,""));if(!A)return t.add("missing-image","XD \u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",I),[];S={...S,type:"IMAGE",imageHash:A,imageScaleMode:N.meta?.ux?.scaleBehavior==="fit"?"FIT":"FILL"}}else if(d.type==="gradient"){let N=d.gradient?.ref?o.resources?.gradients?.[d.gradient.ref]:d.gradient||d,A=N?.meta?.ux?.gradientResources||N||{},_=A.from||{x:d.gradient?.x1??N?.x1??d.x1??A.x1??0,y:d.gradient?.y1??N?.y1??d.y1??A.y1??0},C=A.to||{x:d.gradient?.x2??N?.x2??d.x2??A.x2??1,y:d.gradient?.y2??N?.y2??d.y2??A.y2??0},M=A.type==="radial",z=d.cx??.5,w=d.cy??.5,ee=d.r??.5;S={...S,type:M?"GRADIENT_RADIAL":"GRADIENT_LINEAR",gradientStops:(A.stops||[]).map(ie=>({color:Ma(ie.color),position:ie.offset??ie.position??0})),gradientTransform:M?Aa({x:z,y:w},{x:z+ee,y:w},{x:z,y:w+ee}):Ea(_,C,T||1,E||1)},A.type&&!["linear","linearGradient","radial"].includes(A.type)&&t.add("xd-gradient","\u90E8\u5206 XD \u6E10\u53D8\u6309\u7EBF\u6027\u6E10\u53D8\u8F6C\u6362\u3002",I),M&&(d.fx!==void 0&&d.fx!==z||d.fy!==void 0&&d.fy!==w)&&t.add("xd-gradient-focus","\u504F\u5FC3\u5F84\u5411\u6E10\u53D8\u7684\u7126\u70B9\u5C1A\u4E0D\u80FD\u7B49\u4EF7\u8F6C\u6362\u3002",I)}return[S]}function g(d,I,T={x:0,y:0},E=0,S=[],N=!1){if(E>128)throw new Error("XD \u56FE\u5C42\u5D4C\u5957\u8FC7\u6DF1\u3002");if(d.meta?.ux?.orbitLayoutBounds)return;if(d.type==="syncRef"){let H=d.ref||d.syncSourceGuid;if(S.includes(H)){t.add("xd-symbol-cycle","\u5FAA\u73AF\u7EC4\u4EF6\u5F15\u7528\u5DF2\u505C\u6B62\u5C55\u5F00\u3002");return}let Y=u.get(H);if(!Y){t.add("missing-symbol","\u90E8\u5206 XD \u7EC4\u4EF6\u5B9A\u4E49\u7F3A\u5931\uFF0C\u65E0\u6CD5\u5C55\u5F00\u3002",d.name);return}d={...structuredClone(Y),...d,type:Y.type,group:d.group||Y.group,artboard:d.artboard||Y.artboard},S=[...S,H],N||t.add("xd-component","XD \u7EC4\u4EF6\u6309\u5F53\u524D\u5916\u89C2\u5C55\u5F00\u4E3A\u53EF\u7F16\u8F91\u56FE\u5C42\uFF0C\u7EC4\u4EF6\u72B6\u6001\u4E0D\u4FDD\u7559\u3002",d.name)}let A=d.shape||{},_=d.text||{},C=o.artboards?.[d.artboard?.ref||d.id]||{},M=d.type==="artboard"?"FRAME":d.type==="text"?"TEXT":d.type==="group"?"GROUP":"RECTANGLE";d.meta?.ux?.orbitStandaloneComponent&&d.meta.ux.isMaster&&(M="COMPONENT",N=!0);let z=ae(A.width??C.width??d.width??d.meta?.ux?.width),w=ae(A.height??C.height??d.height??d.meta?.ux?.height),ee=ae(A.x),ie=ae(A.y),Z="";if(["circle","ellipse"].includes(A.type)&&(M="ELLIPSE",z=2*ae(A.rx??A.r),w=2*ae(A.ry??A.r),ee=ae(A.cx)-z/2,ie=ae(A.cy)-w/2),["path","compound","polygon","line"].includes(A.type)&&(M="VECTOR",Z=A.path||(A.type==="line"?`M${A.x1||0} ${A.y1||0} L${A.x2||0} ${A.y2||0}`:A.points?.length?`M${A.points.map(H=>`${H.x} ${H.y}`).join(" L")} Z`:""),Z)){let H=wf(Z);z=H.width,w=H.height,ee=H.x,ie=H.y,Z=(0,od.default)(Z).translate(-ee,-ie).toString()}let R=d.style||{},U=R.font||{};if(M==="TEXT"){let H=(_.paragraphs||[]).flatMap(de=>de.lines||[]).flat(),Y=ae(U.size,14),re=H[0]||{};ee=ae(re.x),ie=ae(re.y)-Y*.8,z=ae(_.frame?.width,Math.max(1,...String(_.rawText||"").split(`
`).map(de=>de.length*Y*.6))),w=ae(_.frame?.height,Math.max(1,(_.paragraphs||[]).flatMap(de=>de.lines||[]).length)*Y*1.2)}let y={a:1,b:0,c:0,d:1,tx:0,ty:0,...d.transform};y.tx+=y.a*ee+y.c*ie-T.x,y.ty+=y.b*ee+y.d*ie-T.y;let O={name:d.name||C.name||d.type,...kf(y,z,w,t,d.name),fills:f(R.fill,d.name,z,w),strokes:f(R.stroke,d.name,z,w).map(H=>({...H,weight:ae(R.stroke.width,1),align:String(R.stroke.align||"center").toUpperCase()})),visible:d.visible!==!1,opacity:R.opacity??d.opacity??1,blendMode:R.isolation==="auto"?"PASS_THROUGH":VD(R.blendMode),locked:!!d.meta?.ux?.locked,clipsContent:d.type==="artboard",dashPattern:R.stroke?.dash||[],strokeCap:R.stroke?.cap==="butt"?"NONE":String(R.stroke?.cap||"none").toUpperCase(),strokeJoin:String(R.stroke?.join||"miter").toUpperCase()},k=Pa(d).find(H=>H.meta?.ux?.orbitLayoutBounds)?.shape;k&&Object.assign(O,{width:ae(k.width,z),height:ae(k.height,w)});let P=d.meta?.ux?.orbitResponsivePair;if(P&&["HORIZONTAL","VERTICAL"].includes(P.layoutMode)&&(M="FRAME",Object.assign(O,{layoutMode:P.layoutMode,layoutWrap:"NO_WRAP",primaryAxisAlign:"SPACE_BETWEEN",counterAxisAlign:"CENTER",primaryAxisSizing:"FIXED",counterAxisSizing:"FIXED",width:ae(k?.width??d.meta.ux.width,z),height:ae(k?.height??d.meta.ux.height,w)})),A.type==="compound"&&A.children?.length&&(M="BOOLEAN_OPERATION",O.booleanOperation=String(A.operation||"union").toUpperCase()),d.type==="artboard"&&Object.assign(O,{x:ae(C.x),y:ae(C.y),width:z,height:w}),Z&&Object.assign(O,Qn((0,od.default)(Z).scale(z?O.width/z:1,w?O.height/w:1).toString())),A.r!==void 0){let H=Array.isArray(A.r)?A.r.map(Y=>ae(Y)):Array(4).fill(ae(A.r));Object.assign(O,{cornerRadius:H[0],independentCorners:H.some(Y=>Y!==H[0]),topLeftRadius:H[0],topRightRadius:H[1]??H[0],bottomRightRadius:H[2]??H[0],bottomLeftRadius:H[3]??H[0]})}if(M==="TEXT"){Object.assign(O,rd(U,R.textAttributes),{text:_.rawText||"",textAutoResize:"NONE",textAlignHorizontal:String(R.textAttributes?.textAlign||_.textAlign||"left").toUpperCase(),lineHeight:R.textAttributes?.lineHeight||null});let H=d.meta?.ux?.rangedStyles;if(H?.length){let Y=0;O.styleRuns=H.map(re=>{let de=Math.min(ae(re.length),Math.max(0,O.text.length-Y)),pe={start:Y,length:de,style:{...rd({family:re.fontFamily,style:re.fontStyle,size:re.fontSize},{letterSpacing:re.charSpacing,decoration:re.underline?["underline"]:re.strikethrough?["line-through"]:[],textTransform:re.textTransform}),fills:[St(Ma(re.fill))]}};return Y+=de,pe}).filter(re=>re.length>0)}else O.styleRuns=(_.paragraphs||[]).flatMap(Y=>Y.lines||[]).flat().filter(Y=>Y.style&&Y.to>Y.from).map(Y=>({start:Y.from,length:Y.to-Y.from,style:{...rd({...U,...Y.style.font},{...R.textAttributes,...Y.style.textAttributes}),fills:f(Y.style.fill||R.fill,d.name,z,w)}}))}O.effects=(R.filters||R.effects||[]).flatMap(H=>{let Y=H.params?.dropShadows||H.params?.innerShadows;return(Y||[H.params||{}]).map(re=>({type:H.type==="dropShadow"?"DROP_SHADOW":H.type==="uxdesign#innerShadow"?"INNER_SHADOW":re.backgroundEffect?"BACKGROUND_BLUR":"LAYER_BLUR",color:Ma(re.color),radius:Y?ae(re.r)*2:ae(re.blurAmount??re.r??re.blur),spread:ae(re.spread),offset:{x:ae(re.dx??re.x),y:ae(re.dy??re.y)},visible:H.visible!==!1}))});let F=pa(s,M,I,O);["artboard","group","shape","text"].includes(d.type)||t.add("xd-node","\u90E8\u5206 XD \u4E13\u5C5E\u56FE\u5C42\u6309\u57FA\u7840\u56FE\u5F62\u8F6C\u6362\u3002",d.name),d.meta?.ux?.interactions?.length&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",d.name);let L=Pa(d).find(H=>H.id===d.meta?.ux?.orbitVectorMaskSource),G=d.meta?.ux?.orbitVectorMaskGeometry,te=d.meta?.ux?.clipPathResources?.children?.[0],j=L&&(!G||JSON.stringify({shape:te?.shape,transform:te?.transform})===JSON.stringify(G)),J=j?L.id:null;L&&!j&&t.add("xd-mask-edited","\u4F7F\u7528 XD \u4E2D\u4FEE\u6539\u540E\u7684\u77E2\u91CF\u88C1\u5207\uFF1B\u539F\u59CB\u8499\u7248\u6E90\u56FE\u5C42\u4ECD\u4FDD\u7559\uFF0C\u4E0D\u4F1A\u8986\u76D6\u5F53\u524D\u88C1\u5207\u3002",d.name,"info");let B=J?[]:d.meta?.ux?.clipPathResources?.children||[];if(B.length){let H=B.length===1?B[0]:{type:"group",name:"\u88C1\u5207\u5F62\u72B6",group:{children:B}},Y=g(H,F.id,{x:0,y:0},E+1,S,N);Y&&(Y.isMask=!0,Y.maskType=L&&!j?"VECTOR":d.meta.ux.orbitMaskType||"VECTOR")}let ne=Pa(d);if(ne.forEach(H=>{let Y=H.id===J,re=g(Y?{...H,visible:H.meta?.ux?.orbitMaskSourceVisible!==!1}:H,F.id,d.type==="artboard"?{x:C.x||0,y:C.y||0}:A.type==="compound"?{x:ee,y:ie}:{x:0,y:0},E+1,S,N);Y&&re&&(re.isMask=!0,re.maskType=d.meta.ux.orbitMaskType)}),["GROUP","COMPONENT"].includes(M)&&ne.length){F.width=k?ae(k.width):Math.max(0,...s.getChildren(F.id).map(re=>re.x+re.width)),F.height=k?ae(k.height):Math.max(0,...s.getChildren(F.id).map(re=>re.y+re.height));let H=Math.hypot(y.a,y.b)||1,Y=Math.abs(y.a*y.d-y.b*y.c)/H;(Math.abs(H-1)>.001||Math.abs(Y-1)>.001)&&s.getChildren(F.id).forEach(re=>_f(s,re,H,Y,t)),Object.assign(F,kf(y,F.width,F.height,t,d.name))}return F}if(i.filter(d=>d.path.startsWith("artwork/")).forEach(d=>(d.data.children||[]).forEach(I=>{I.meta?.ux?.orbitComponentCanvas?Pa(I).forEach(T=>g(T,a.id)):g(I,a.id)})),!s.getChildren(a.id).length)throw new Error("XD \u6587\u4EF6\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u753B\u677F\u6216\u56FE\u5C42\u3002");let h=Ur(n,"interactions/interactions.json",{});return Object.entries(h).some(([d,I])=>d!=="version"&&I&&typeof I=="object"&&Object.keys(I).length)&&t.add("prototype","XD \u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002"),{graph:s,thumbnail:n["preview.png"]||n["thumbnail.png"]}}async function bI(e,t,n,r,i={}){n||(n=qn);let o={mimetype:[ot("application/vnd.adobe.sparkler.project+dcxucf"),{level:0}]},s=Re(),a={},l=[],u=[],c=[],f=new Set,g=new Map,h=i.mode==="compatible"?await II(e):{masks:new Map,images:new Map,shadows:new Map,texts:new Map,resources:new Map},d=new Map;for(let y of e.nodes.values())if(y.isMask&&(y.type==="GROUP"||y.strokes.some(O=>O.visible))){let O=Pf(e,y);if(O)try{let k=await pI(O);if(!k)throw new Error("empty mask");d.set(y.id,k)}catch{r.add("xd-mask-path","\u6B64\u8499\u7248\u7684\u77E2\u91CF\u8F6E\u5ED3\u8BA1\u7B97\u5931\u8D25\uFF0C\u672A\u5BFC\u51FA\u4E0D\u5B8C\u6574\u7ED3\u679C\u3002",y.name)}}let I=(y,O,k="primary",P={})=>({rel:k,type:O,id:Re(),state:"unmodified",name:y,path:y,...P}),T=(y,O=[],k=[],P={})=>({id:Re(),name:y,path:y,children:O,components:k,...P});for(let[y,O]of[...e.images,...h.resources])g.set(y,Zn(O)),o[`resources/${y}`]=[O,{level:0}],u.push(I(y,O[0]===137?"image/png":O[0]===255?"image/jpeg":"application/octet-stream"));function E(y,O){if(!y||!y.visible)return{type:"none"};if(y.type==="IMAGE"){let k=g.get(y.imageHash);return k||r.add("image-dimensions","\u65E0\u6CD5\u8BFB\u53D6\u6B64\u56FE\u7247\u7684\u539F\u59CB\u5C3A\u5BF8\uFF0C\u586B\u5145\u6BD4\u4F8B\u4E0D\u80FD\u4FDD\u8BC1\u4E00\u81F4\u3002",O.name),{type:"pattern",pattern:{width:k?.width||O.width,height:k?.height||O.height,href:"",meta:{ux:{scaleBehavior:y.imageScaleMode==="FIT"?"fit":"fill",uid:y.imageHash}}},opacity:y.opacity}}if(y.type.startsWith("GRADIENT")){let k=y.gradientTransform?an(y.gradientTransform,{x:0,y:.5}):{x:0,y:0},P=y.gradientTransform?an(y.gradientTransform,{x:1,y:.5}):{x:1,y:0};return{type:"gradient",gradient:{meta:{ux:{gradientResources:{type:"linear",stops:(y.gradientStops||[]).map(F=>({offset:F.position,color:fo(F.color)}))}}},x1:k.x,y1:k.y,x2:P.x,y2:P.y,units:"objectBoundingBox"}}}return{type:"solid",color:fo({...y.color,a:y.color.a*y.opacity})}}function S(y){let O=y.fills.at(-1),k=y.strokes.at(-1),P=[];for(let[F,L,G]of[["DROP_SHADOW","dropShadow","dropShadows"],["INNER_SHADOW","uxdesign#innerShadow","innerShadows"]])for(let te of[!0,!1]){let j=y.effects.filter(J=>J.type===F&&J.visible!==!1===te);j.length&&P.push({type:L,global:!0,visible:te,params:{[G]:j.map(J=>({color:fo(J.color),dx:J.offset.x,dy:J.offset.y,r:J.radius/2,spread:J.spread}))}})}for(let F of y.effects.filter(L=>L.type.includes("BLUR")))P.push({type:"uxdesign#blur",global:!0,visible:F.visible,params:{blurAmount:F.radius,brightnessAmount:0,fillOpacity:0,backgroundEffect:F.type==="BACKGROUND_BLUR"}});return{opacity:y.opacity,blendMode:FD(y.blendMode),isolation:y.blendMode==="PASS_THROUGH"?"auto":"isolate",fill:E(O,y),stroke:k&&k.visible?{...E(k,y),width:k.weight,align:k.align.toLowerCase(),cap:(k.cap||y.strokeCap)==="NONE"?"butt":(k.cap||y.strokeCap).toLowerCase(),join:(k.join||y.strokeJoin).toLowerCase(),dash:k.dashPattern||y.dashPattern}:{type:"none"},filters:P}}function N(y,O,k,P){return{...y,id:Re(),name:O,x:0,y:0,rotation:0,flipX:!1,flipY:!1,opacity:1,visible:!0,locked:!1,fills:k,strokes:P,effects:[],blendMode:"NORMAL"}}function A(y,O){if(y.type!=="group")return;let k={type:"shape",name:`${O.name} / \u5E03\u5C40\u5C3A\u5BF8`,id:Re(),meta:{ux:{orbitLayoutBounds:!0,customConstraints:!0,constraintLeft:!0,constraintRight:!0,constraintTop:!0,constraintBottom:!0}},shape:{type:"rect",x:0,y:0,width:O.width,height:O.height},style:{fill:{type:"solid",color:fo(tt(0,0,0,0))},stroke:{type:"none"}}};y.group.children.unshift(k)}function _(y,O){let k=Re(),P=structuredClone(y),F={};P.id=Re(),delete P.transform,Object.assign(P.meta.ux,{symbolId:k,width:O.width,height:O.height,componentType:"componentNoBounds"});function L(G){let te=Re();F[G.id]=te;let j={type:"syncRef",syncSourceGuid:G.id,guid:te};return G.group&&(j.group={children:G.group.children.map(L)}),j}y.group.children=P.group.children.map(L),Object.assign(y.meta.ux,{symbolId:k,isMaster:!0,componentType:"componentNoBounds",orbitStandaloneComponent:!0,syncMap:F}),c.push(P),r.add("xd-component-master","\u72EC\u7ACB\u7EC4\u4EF6\u5DF2\u4FDD\u7559\u4E3A XD \u539F\u751F\u4E3B\u7EC4\u4EF6\uFF0C\u53EF\u7EE7\u7EED\u7F16\u8F91\u5E76\u521B\u5EFA\u5173\u8054\u5B9E\u4F8B\u3002",O.name,"info")}function C(y,O,k,P={a:1,b:0,c:0,d:1,tx:0,ty:0},F="VECTOR"){return{type:"group",name:y,id:Re(),transform:P,meta:{ux:{hasCustomName:!0,orbitMaskType:F,clipPathResources:{type:"clipPath",children:[O]}}},group:{children:k}}}function M(y,O=0,k=0){let P=[],F=P,L=O,G=k,te;for(let j of y)if(h.masks.has(j.id)){let J=w(j);J.meta.ux.orbitSourceProperties={kind:"alpha-mask",maskType:j.maskType,opacity:j.opacity,fills:j.fills,strokes:j.strokes,effects:j.effects};let B={type:"group",name:`${j.name} / \u539F\u59CB\u56FE\u5C42\u5907\u4EFD\uFF08\u9690\u85CF\uFF09`,id:Re(),visible:!1,group:{children:[J]}},ne={type:"group",name:`${j.name} / \u517C\u5BB9\u900F\u660E\u8499\u7248`,id:Re(),transform:{a:1,b:0,c:0,d:1,tx:L,ty:G},meta:{ux:{hasCustomName:!0,orbitCompatibleMask:!0,orbitSourceProperties:J.meta.ux.orbitSourceProperties}},group:{children:[B]}};F.push(ne),F=ne.group.children,te=B.group.children,L=G=0}else if(h.images.has(j.id)){let J=w(j);J.name=`${j.name} / \u539F\u59CB\u56FE\u5C42`,J.meta.ux.orbitSourceProperties={fills:j.fills,opacity:j.opacity},te.push(J);let B=w({...j,fills:[{...j.fills[0],imageHash:h.images.get(j.id)}]},L,G);B.meta.ux.orbitCompatibleImage={originalImageHash:j.fills[0].imageHash},F.push(B)}else if(j.isMask&&oo(e,j)){let J=w(j),B=J,ne=[];d.has(j.id)&&(B={type:"shape",name:`${j.name} / \u77E2\u91CF\u88C1\u5207`,id:Re(),transform:sn(j),shape:{type:"path",path:d.get(j.id)},style:{fill:{type:"solid",color:fo(tt())},stroke:{type:"none"}}},J.visible=!1,J.meta.ux.orbitMaskSourceVisible=j.visible,ne=[J],r.add("xd-vector-mask","\u9ED1\u767D\u6216\u5E26\u63CF\u8FB9\u8499\u7248\u5DF2\u6620\u5C04\u4E3A\u53EF\u7F16\u8F91\u77E2\u91CF\u88C1\u5207\uFF1B\u539F\u59CB\u8499\u7248\u56FE\u5C42\u548C\u63CF\u8FB9\u53C2\u6570\u4FDD\u7559\u5728\u9690\u85CF\u7684\u53EF\u7F16\u8F91\u6E90\u56FE\u5C42\u4E2D\u3002",j.name,"info"));let H=C(`${j.name} / \u8499\u7248`,B,ne,{a:1,b:0,c:0,d:1,tx:L,ty:G},j.maskType);ne.length&&Object.assign(H.meta.ux,{orbitVectorMaskSource:J.id,orbitVectorMaskGeometry:{shape:B.shape,transform:B.transform}}),F.push(H),F=H.group.children,L=G=0}else F.push(w(j,L,G));return P}let z=y=>y.type==="IMAGE"&&(Df(y)||["CROP","STRETCH"].includes(y.imageScaleMode));function w(y,O=0,k=0){f.add(y.id);let P=Re(),F=sn(y);F.tx+=O,F.ty+=k;let L={type:"shape",name:y.name,id:P,transform:F,visible:y.visible,meta:{ux:{hasCustomName:!0,locked:!!y.locked}},style:S(y)};if(h.shadows.has(y.id)){let B=w({...N(y,`${y.name} / \u539F\u59CB\u6548\u679C\u5907\u4EFD\uFF08\u9690\u85CF\uFF09`,y.fills,y.strokes),effects:y.effects});B.visible=!1,B.meta.ux.orbitSourceProperties={effects:y.effects};let ne=w({...N(y,`${y.name} / \u53EF\u7F16\u8F91\u5F62\u72B6`,y.fills,y.strokes),effects:y.effects.filter(Y=>!Y.spread)}),H=h.shadows.get(y.id).filter(({effect:Y})=>Y.visible!==!1).map(({hash:Y},re)=>w({...N(y,`${y.name} / \u9634\u5F71\u517C\u5BB9\u6548\u679C ${re+1}`,[{...St(tt()),type:"IMAGE",imageHash:Y,imageScaleMode:"STRETCH"}],[]),type:"RECTANGLE",cornerRadius:0,independentCorners:!1}));return L.type="group",L.style.fill=L.style.stroke={type:"none"},L.style.filters=[],L.meta.ux.orbitSourceProperties={kind:"shadow-spread",effects:y.effects},L.group={children:[B,ne,...H]},L}if(h.texts.has(y.id)){let B=w(N(y,`${y.name} / \u539F\u59CB\u6587\u5B57\u5907\u4EFD\uFF08\u9690\u85CF\uFF09`,[St(tt())],[]));B.visible=!1,B.meta.ux.orbitSourceProperties={fills:y.fills,strokes:y.strokes,effects:y.effects};let{path:ne,bounds:H}=h.texts.get(y.id),Y={...S(y),opacity:y.fills[0].opacity,blendMode:"normal",filters:[]};for(let[pe,be]of[["x","width"],["y","height"]])for(let Fe of[1,2])Y.fill.gradient[`${pe}${Fe}`]=(Y.fill.gradient[`${pe}${Fe}`]*y[be]-H[pe])/(H[be]||1);let re=Xe({...y,...Qn(ne)}),de={type:"shape",name:`${y.name} / \u6E10\u53D8\u6587\u5B57\u77E2\u91CF\u5916\u89C2`,id:Re(),transform:{a:1,b:0,c:0,d:1,tx:0,ty:0},visible:!0,meta:{ux:{hasCustomName:!0}},shape:{type:"path",path:re},style:Y};return L.type="group",L.style.fill=L.style.stroke={type:"none"},L.group={children:[B,de]},A(L,y),L.meta.ux.orbitSourceProperties={kind:"text-fill",fills:y.fills,strokes:y.strokes,text:y.text},L}if(["TEXT","ELLIPSE","RECTANGLE","ROUNDED_RECTANGLE","LINE","VECTOR","STAR","POLYGON","BOOLEAN_OPERATION"].includes(y.type)&&(y.fills.length>1||y.strokes.length>1||y.strokes.length&&y.fills.some(z)||[...y.fills,...y.strokes].some(B=>!B.visible||B.opacity!==1||B.blendMode&&!["NORMAL","PASS_THROUGH"].includes(B.blendMode)))){let B=[...y.fills.map((ne,H)=>({node:{...N(y,`${y.name} / \u586B\u5145 ${H+1}`,[{...ne,opacity:1,blendMode:"NORMAL"}],[]),opacity:ne.opacity,blendMode:ne.blendMode||"NORMAL"},visible:ne.visible})),...y.strokes.map((ne,H)=>({node:{...N(y,`${y.name} / \u63CF\u8FB9 ${H+1}`,[],[{...ne,opacity:1,blendMode:"NORMAL"}]),opacity:ne.opacity,blendMode:ne.blendMode||"NORMAL"},visible:ne.visible}))];return L.type="group",L.style.fill=L.style.stroke={type:"none"},L.meta.ux.width=y.width,L.meta.ux.height=y.height,L.group={children:B.map(({node:ne,visible:H})=>{let Y=w({...ne,fills:ne.fills.map(re=>({...re,visible:!0})),strokes:ne.strokes.map(re=>({...re,visible:!0}))});return Y.visible=H,Y})},r.add("xd-paint-layers","\u591A\u91CD\u586B\u5145\u3001\u63CF\u8FB9\u6216\u9690\u85CF\u7684\u7ED8\u5236\u5C5E\u6027\u5DF2\u62C6\u4E3A\u53EF\u7F16\u8F91\u5B50\u56FE\u5C42\u4FDD\u7559\u3002",y.name,"info"),L}let te=y.fills[0],j=te&&g.get(te.imageHash),J=te&&z(te)&&Jn(y,te,j);if(J){let B=w(N(y,`${y.name} / \u88C1\u5207\u5F62\u72B6`,[St(tt())],[])),ne={type:"shape",name:`${y.name} / \u539F\u56FE`,id:Re(),transform:J,shape:{type:"rect",x:0,y:0,width:j.width,height:j.height},style:{fill:E({...te,imageScaleMode:"FILL"},y)}},H=C(`${y.name} / \u56FE\u7247\u88C1\u526A`,B,[ne]);L.type="group",L.group={children:[H]},L.meta.ux.width=y.width,L.meta.ux.height=y.height,L.style.fill=L.style.stroke={type:"none"},r.add("xd-image-crop","\u56FE\u7247\u539F\u59CB\u8D44\u6E90\u4E0E\u88C1\u526A\u53D8\u6362\u5DF2\u4FDD\u7559\u4E3A\u53EF\u7F16\u8F91\u7684\u56FE\u7247\u548C\u88C1\u5207\u5F62\u72B6\u3002",y.name,"info")}else if(y.type==="TEXT"){L.type="text",Object.assign(L.style,id(y)),Object.assign(L.style.textAttributes,{textAlign:y.textAlignHorizontal.toLowerCase(),paragraphAfterSpacing:y.paragraphSpacing,lineHeight:y.lineHeight||y.fontSize*1.2});let B=BD(y);L.meta.ux.singleTextObject=!0,L.meta.ux.rangedStyles=B.map(({from:H,to:Y,node:re})=>{let de=id(re),pe=re.fills.at(-1);return{length:Y-H,fontFamily:re.fontFamily,fontStyle:de.font.style,fontSize:re.fontSize,charSpacing:de.textAttributes.letterSpacing,underline:re.textDecoration==="UNDERLINE",strikethrough:re.textDecoration==="STRIKETHROUGH",textTransform:de.textAttributes.textTransform,textScript:"none",fill:LD(pe?.color?{...pe.color,a:pe.color.a*pe.opacity}:{r:0,g:0,b:0,a:1})}});let ne=0;L.text={frame:{type:"positioned",width:y.width,height:y.height},rawText:y.text,paragraphs:y.text.split(`
`).map((H,Y)=>{let re=ne,de=re+H.length;ne=de+1;let pe=B.filter(be=>be.from<de&&be.to>re).map((be,Fe)=>({from:Math.max(re,be.from),to:Math.min(de,be.to),...Fe===0?{x:0}:{},y:y.fontSize*.8+Y*(y.lineHeight||y.fontSize*1.2),style:{...id(be.node),fill:E(be.node.fills.at(-1),be.node)}}));return{lines:[pe.length?pe:[{from:re,to:de,x:0,y:y.fontSize*.8+Y*(y.lineHeight||y.fontSize*1.2)}]]}})}}else if(y.type==="BOOLEAN_OPERATION")L.shape={type:"compound",path:Xe(y),operation:String(y.booleanOperation||"UNION").toLowerCase(),children:e.getChildren(y.id).map(B=>w(B))};else if(["ELLIPSE"].includes(y.type))L.shape={type:"ellipse",cx:y.width/2,cy:y.height/2,rx:y.width/2,ry:y.height/2};else if(["RECTANGLE","ROUNDED_RECTANGLE"].includes(y.type))L.shape={type:"rect",x:0,y:0,width:y.width,height:y.height,r:y.independentCorners?[y.topLeftRadius,y.topRightRadius,y.bottomRightRadius,y.bottomLeftRadius]:Array(4).fill(y.cornerRadius)};else if(y.type==="LINE")L.shape={type:"line",x1:0,y1:0,x2:y.width,y2:y.height};else if(["VECTOR","STAR","POLYGON"].includes(y.type)){let B=Xe(y);L.shape={type:"path",path:B},B||r.add("vector-empty","\u90E8\u5206\u77E2\u91CF\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u8F6E\u5ED3\u3002",y.name)}else{L.type="group";let B=Mf(e,y),ne=M(e.getChildren(y.id));if(B&&(ne.forEach((H,Y)=>{A(H,B.children[Y]),Object.assign(H.meta.ux,{customConstraints:!0,constraintWidth:!0,constraintHeight:!0,constraintLeft:B.horizontal&&Y===0,constraintRight:B.horizontal&&Y===1,constraintTop:!B.horizontal&&Y===0,constraintBottom:!B.horizontal&&Y===1})}),L.meta.ux.orbitResponsivePair={layoutMode:y.layoutMode},r.add("xd-responsive-pair","\u4E24\u7AEF\u5206\u5E03\u3001\u5C45\u4E2D\u5BF9\u9F50\u548C\u56FA\u5B9A\u5B50\u5143\u7D20\u5C3A\u5BF8\u5DF2\u6620\u5C04\u4E3A XD \u539F\u751F\u54CD\u5E94\u5F0F\u7EA6\u675F\u3002",y.name,"info")),y.clipsContent){let H=w({...N(y,`${y.name} / \u753B\u6846\u88C1\u5207`,[St(tt())],[]),type:"RECTANGLE"});ne=[C(`${y.name} / \u88C1\u5207\u5185\u5BB9`,H,ne)]}L.group={children:ne},L.meta.ux.width=y.width,L.meta.ux.height=y.height,y.fills.length&&L.group.children.unshift(w({...N(y,`${y.name} \u80CC\u666F`,y.fills,[]),type:"RECTANGLE"})),y.strokes.length&&L.group.children.push(w({...N(y,`${y.name} \u63CF\u8FB9`,[],y.strokes),type:"RECTANGLE"})),B&&A(L,y),L.style.fill=L.style.stroke={type:"none"}}return ha(e,y)&&_(L,y),L}let ee=e.getPages(!0);ee.length>1&&r.add("xd-pages","XD \u4E0D\u652F\u6301\u591A\u9875\uFF0C\u6240\u6709\u9875\u9762\u53CA\u5185\u90E8\u8D44\u6E90\u9875\u7684\u56FE\u5C42\u5DF2\u5206\u533A\u6392\u653E\u3002","","info");let ie=0;for(let y of ee){let O=e.getChildren(y.id),k=O.filter(G=>G.type==="FRAME"||G.type==="COMPONENT"),P=O.filter(G=>!k.includes(G)),F=[...k.map(G=>ha(e,G)?{componentCanvas:!0,node:{...G,name:`${G.name} / \u7EC4\u4EF6\u753B\u5E03`,opacity:1,fills:[],strokes:[],effects:[]},items:[{...G,x:0,y:0}]}:{node:G,items:e.getChildren(G.id)}),...P.length?[{node:{...y,name:`${y.name} / \u753B\u5E03`,x:0,y:0,width:Math.max(1,...P.map(G=>G.x+G.width)),height:Math.max(1,...P.map(G=>G.y+G.height))},items:P}]:[]],L=0;for(let{node:G,items:te,componentCanvas:j}of F){f.add(G.id);let J=Re(),B=G.x+ie,ne=G.y;a[J]={width:G.width||1,height:G.height||1,name:G.name,x:B,y:ne},L=Math.max(L,G.x+G.width);let H=S(G),Y=M(te,B,ne);(G.fills.length>1||G.strokes.length||G.independentCorners||G.cornerRadius)&&(Y.unshift(w({...N(G,`${G.name} \u80CC\u666F`,G.fills,G.strokes),type:"RECTANGLE",x:B,y:ne})),H.fill=H.stroke={type:"none"});let re={version:"1.5.0",children:[{type:"artboard",id:J,name:G.name,visible:G.visible,meta:{ux:{hasCustomName:!0,locked:!!G.locked,...j?{orbitComponentCanvas:!0}:{}}},style:H,artboard:{children:Y,ref:J,meta:{ux:{path:J}}}}],resources:{href:"/resources/graphics/graphicContent.agc"},artboards:{href:"/resources/graphics/graphicContent.agc"}},de=`artboard-${J}`;o[`artwork/${de}/graphics/graphicContent.agc`]=ot(JSON.stringify(re)),l.push(T(de,[T("graphics",[],[I("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])],[],{"uxdesign#bounds":a[J]}))}ie+=L+300}o["resources/graphics/graphicContent.agc"]=ot(JSON.stringify({version:"1.5.0",children:[],resources:{gradients:{},clipPaths:{},meta:{ux:{symbols:c,symbolsMetadata:{usingNestedSymbolSyncing:!0},colorSwatches:[],documentLibrary:{version:5,isStickerSheet:!1,hashedMetadata:{publishedDocLibId:null},elements:[],groupData:{groups:[]}},gridDefaults:{defaultGrid:null,layoutOverrides:null},colorProfile:"srgb"}}},artboards:a})),o["artwork/pasteboard/graphics/graphicContent.agc"]=ot(JSON.stringify({version:"1.5.0",children:[],resources:{href:"/resources/graphics/graphicContent.agc"},artboards:{href:"/resources/graphics/graphicContent.agc"}})),l.unshift(T("pasteboard",[T("graphics",[],[I("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])])),o["interactions/interactions.json"]=ot('{"version":"0.24"}'),o["sharing/sharing.json"]=ot('{"version":"0.3","selectedLink":-1}');let Z=Re(),R=new Date().toISOString();o["META-INF/metadata.xml"]=ot(`<?xml version="1.0" encoding="UTF-8"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmp:CreatorTool="Orbit" xmp:CreateDate="${R}" xmp:ModifyDate="${R}" dc:format="application/vnd.adobe.sparkler.project+dcx" xmpMM:DocumentID="${s}" xmpMM:InstanceID="${Re()}"/></rdf:RDF></x:xmpmeta>`);let U=[I("META-INF/metadata.xml","application/rdf+xml","metadata")];if(n){o["thumbnail.png"]=[n,{level:0}],o["preview.png"]=[n,{level:0}];let y=new DataView(n.buffer,n.byteOffset,n.byteLength),O={width:y.getUint32(16),height:y.getUint32(20)};U.push(I("thumbnail.png","image/png","thumbnail",O),I("preview.png","image/png","preview",O))}return o.manifest=ot(JSON.stringify({state:"unmodified","manifest-format-version":6,name:t,"uxdesign#applicationVersion":"57.1.12.2",type:"application/vnd.adobe.sparkler.project+dcx","uxdesign#serializationId":Re(),"uxdesign#id":Z,"uxdesign#parentDocId":Z,id:s,"uxdesign#compositeID":s,"uxdesign#version":"2.33",components:U,children:[T("artwork",l),T("resources",[T("graphics",[],[I("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])],u),T("interactions",[],[I("interactions.json","application/vnd.adobe.uxdesign.interactions+json")]),T("sharing",[],[I("sharing.json","application/vnd.adobe.uxdesign.sharing+json")])]})),zr(e,f,r),sr(o)}var po={fig:"Figma",sketch:"Sketch",xd:"Adobe XD"};async function EI(e,t){let n=t.split(".").at(-1).toLowerCase();if(!po[n])throw new Error("\u8BF7\u9009\u62E9 .fig\u3001.sketch \u6216 .xd \u6587\u4EF6\u3002");if(!e.length)throw new Error("\u6587\u4EF6\u4E3A\u7A7A\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002");let r=Of(),i=await{fig:tI,sketch:oI,xd:SI}[n](e,r),o=i.thumbnail?.[0]===137?i.thumbnail:qn;return{...i,thumbnail:o,source:n,filename:t,issues:r.list(),stats:Sv(i.graph)}}function AI(e,t,n={}){if(!po[t]||t===e.source)throw new Error("\u8BF7\u9009\u62E9\u4E0D\u540C\u4E8E\u539F\u6587\u4EF6\u7684\u76EE\u6807\u683C\u5F0F\u3002");let r=Of();for(let i of e.issues)for(let o=0;o<i.count;o++)r.add(i.code,i.message,i.examples[o%(i.examples.length||1)],i.severity,i.category);return Ev(e.graph,t,r,t==="xd"&&n.mode==="compatible"?{mask:Oa,text:Ra,shadow:Da}:{}),r}function sd(e,t,n){return AI(e,t,n).list()}async function xI(e,t,n={}){let r=AI(e,t,n);function i(){let a=r.list();if(a.some(l=>l.severity!=="info")){let l=new Error(t==="xd"&&n.mode==="compatible"?"\u6B64\u6587\u4EF6\u4ECD\u6709\u5C1A\u672A\u5B9E\u73B0\u517C\u5BB9\u91CD\u5EFA\u7684\u5185\u5BB9\uFF0C\u8BF7\u67E5\u770B\u4E0B\u65B9\u5177\u4F53\u56FE\u5C42\uFF1B\u4E0D\u4F1A\u901A\u8FC7\u5FFD\u7565\u95EE\u9898\u6765\u751F\u6210\u6587\u4EF6\u3002":`\u5F53\u524D\u6587\u4EF6\u5C1A\u4E0D\u80FD\u5B8C\u6574\u8F6C\u6362\u4E3A ${po[t]}\u3002\u4E0B\u65B9\u5DF2\u533A\u5206\u8F6C\u6362\u5668\u672A\u9002\u914D\u9879\u76EE\u4E0E\u76EE\u6807\u683C\u5F0F\u9650\u5236\uFF1B\u4E0D\u4F1A\u4E22\u5F03\u5C5E\u6027\u3001\u5408\u6210\u56FE\u7247\u6216\u751F\u6210\u4E0D\u5B8C\u6574\u7ED3\u679C\u3002`);throw l.code="PRESERVATION_REQUIRED",l.issues=a,l}}i();let o=e.filename.replace(/\.(fig|xd|sketch)$/i,""),s=await{fig:nI,sketch:aI,xd:bI}[t](e.graph,o,e.thumbnail,r,n);return i(),{bytes:s,filename:`${o}.${t}`,source:e.source,target:t,mode:t==="xd"&&n.mode==="compatible"?"compatible":"strict",stats:e.stats,issues:r.list()}}var Pt=null;self.onmessage=async({data:e})=>{try{if(e.type==="read"){Pt=null,self.postMessage({type:"progress",message:"\u6B63\u5728\u89E3\u6790\u9875\u9762\u3001\u56FE\u5C42\u4E0E\u56FE\u7247\u8D44\u6E90\u2026"}),Pt=await EI(new Uint8Array(e.buffer),e.filename);let t=Pt.thumbnail.slice(),n=Object.fromEntries(Object.keys(po).filter(i=>i!==Pt.source).map(i=>[i,sd(Pt,i)])),r=Pt.source==="xd"?{}:{xd:sd(Pt,"xd",{mode:"compatible"})};self.postMessage({type:"ready",source:Pt.source,stats:Pt.stats,compatibility:n,compatible:r,preview:t},[t.buffer])}else if(e.type==="convert"){if(!Pt)throw new Error("\u8BF7\u5148\u9009\u62E9\u8BBE\u8BA1\u6587\u4EF6\u3002");self.postMessage({type:"progress",message:"\u6B63\u5728\u6620\u5C04\u56FE\u5C42\u5E76\u751F\u6210\u76EE\u6807\u8BBE\u8BA1\u6587\u4EF6\u2026"});let t=await xI(Pt,e.target,{mode:e.mode==="compatible"?"compatible":"strict"});self.postMessage({type:"done",...t},[t.bytes.buffer])}}catch(t){self.postMessage({type:"error",code:t.code,issues:t.issues,message:t.message||"\u8F6C\u6362\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u662F\u5426\u635F\u574F\u6216\u7248\u672C\u662F\u5426\u53D7\u652F\u6301\u3002"})}};})();
