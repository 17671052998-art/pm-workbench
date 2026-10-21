(()=>{var n0=Object.create;var Is=Object.defineProperty;var r0=Object.getOwnPropertyDescriptor;var i0=Object.getOwnPropertyNames;var o0=Object.getPrototypeOf,s0=Object.prototype.hasOwnProperty;var a0=(e,t,n)=>t in e?Is(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var jt=(e,t)=>()=>{try{return t||e((t={exports:{}}).exports,t),t.exports}catch(n){throw t=0,n}};var l0=(e,t,n,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of i0(t))!s0.call(e,i)&&i!==n&&Is(e,i,{get:()=>t[i],enumerable:!(r=r0(t,i))||r.enumerable});return e};var vs=(e,t,n)=>(n=e!=null?n0(o0(e)):{},l0(t||!e||!e.__esModule?Is(n,"default",{value:e,enumerable:!0}):n,e));var G=(e,t,n)=>a0(e,typeof t!="symbol"?t+"":t,n);var Pc=jt(($C,Mc)=>{"use strict";var vi={a:7,c:6,h:1,l:2,m:2,r:4,q:4,s:4,t:2,v:1,z:0},O0=[5760,6158,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8239,8287,12288,65279];function D0(e){return e===10||e===13||e===8232||e===8233||e===32||e===9||e===11||e===12||e===160||e>=5760&&O0.indexOf(e)>=0}function R0(e){switch(e|32){case 109:case 122:case 108:case 104:case 118:case 99:case 115:case 113:case 116:case 97:case 114:return!0}return!1}function M0(e){return(e|32)===97}function Sn(e){return e>=48&&e<=57}function P0(e){return e>=48&&e<=57||e===43||e===45||e===46}function w0(e){this.index=0,this.path=e,this.max=e.length,this.result=[],this.param=0,this.err="",this.segmentStart=0,this.data=[]}function Ti(e){for(;e.index<e.max&&D0(e.path.charCodeAt(e.index));)e.index++}function k0(e){var t=e.path.charCodeAt(e.index);if(t===48){e.param=0,e.index++;return}if(t===49){e.param=1,e.index++;return}e.err="SvgPath: arc flag can be 0 or 1 only (at pos "+e.index+")"}function L0(e){var t=e.index,n=t,r=e.max,i=!1,o=!1,s=!1,a=!1,l;if(n>=r){e.err="SvgPath: missed param (at pos "+n+")";return}if(l=e.path.charCodeAt(n),(l===43||l===45)&&(n++,l=n<r?e.path.charCodeAt(n):0),!Sn(l)&&l!==46){e.err="SvgPath: param should start with 0..9 or `.` (at pos "+n+")";return}if(l!==46){if(i=l===48,n++,l=n<r?e.path.charCodeAt(n):0,i&&n<r&&l&&Sn(l)){e.err="SvgPath: numbers started with `0` such as `09` are illegal (at pos "+t+")";return}for(;n<r&&Sn(e.path.charCodeAt(n));)n++,o=!0;l=n<r?e.path.charCodeAt(n):0}if(l===46){for(a=!0,n++;Sn(e.path.charCodeAt(n));)n++,s=!0;l=n<r?e.path.charCodeAt(n):0}if(l===101||l===69){if(a&&!o&&!s){e.err="SvgPath: invalid float exponent (at pos "+n+")";return}if(n++,l=n<r?e.path.charCodeAt(n):0,(l===43||l===45)&&n++,n<r&&Sn(e.path.charCodeAt(n)))for(;n<r&&Sn(e.path.charCodeAt(n));)n++;else{e.err="SvgPath: invalid float exponent (at pos "+n+")";return}}e.index=n,e.param=parseFloat(e.path.slice(t,n))+0}function ws(e){var t,n;t=e.path[e.segmentStart],n=t.toLowerCase();var r=e.data;if(n==="m"&&r.length>2&&(e.result.push([t,r[0],r[1]]),r=r.slice(2),n="l",t=t==="m"?"l":"L"),n==="r")e.result.push([t].concat(r));else for(;r.length>=vi[n]&&(e.result.push([t].concat(r.splice(0,vi[n]))),!!vi[n]););}function _0(e){var t=e.max,n,r,i,o,s;if(e.segmentStart=e.index,n=e.path.charCodeAt(e.index),r=M0(n),!R0(n)){e.err="SvgPath: bad command "+e.path[e.index]+" (at pos "+e.index+")";return}if(o=vi[e.path[e.index].toLowerCase()],e.index++,Ti(e),e.data=[],!o){ws(e);return}for(i=!1;;){for(s=o;s>0;s--){if(r&&(s===3||s===4)?k0(e):L0(e),e.err.length){ws(e);return}e.data.push(e.param),Ti(e),i=!1,e.index<t&&e.path.charCodeAt(e.index)===44&&(e.index++,Ti(e),i=!0)}if(!i&&(e.index>=e.max||!P0(e.path.charCodeAt(e.index))))break}ws(e)}Mc.exports=function(t){var n=new w0(t),r=n.max;for(Ti(n);n.index<r&&!n.err.length;)_0(n);return n.result.length&&("mM".indexOf(n.result[0][0])<0?(n.err="SvgPath: string should start with `M` or `m`",n.result=[]):n.result[0][0]="M"),{err:n.err,segments:n.result}}});var ks=jt((KC,wc)=>{"use strict";function V0(e,t){return[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]]}function qe(){if(!(this instanceof qe))return new qe;this.queue=[],this.cache=null}qe.prototype.matrix=function(e){return e[0]===1&&e[1]===0&&e[2]===0&&e[3]===1&&e[4]===0&&e[5]===0?this:(this.cache=null,this.queue.push(e),this)};qe.prototype.translate=function(e,t){return(e!==0||t!==0)&&(this.cache=null,this.queue.push([1,0,0,1,e,t])),this};qe.prototype.scale=function(e,t){return(e!==1||t!==1)&&(this.cache=null,this.queue.push([e,0,0,t,0,0])),this};qe.prototype.rotate=function(e,t,n){var r,i,o;return e!==0&&(this.translate(t,n),r=e*Math.PI/180,i=Math.cos(r),o=Math.sin(r),this.queue.push([i,o,-o,i,0,0]),this.cache=null,this.translate(-t,-n)),this};qe.prototype.skewX=function(e){return e!==0&&(this.cache=null,this.queue.push([1,0,Math.tan(e*Math.PI/180),1,0,0])),this};qe.prototype.skewY=function(e){return e!==0&&(this.cache=null,this.queue.push([1,Math.tan(e*Math.PI/180),0,1,0,0])),this};qe.prototype.toArray=function(){if(this.cache)return this.cache;if(!this.queue.length)return this.cache=[1,0,0,1,0,0],this.cache;if(this.cache=this.queue[0],this.queue.length===1)return this.cache;for(var e=1;e<this.queue.length;e++)this.cache=V0(this.cache,this.queue[e]);return this.cache};qe.prototype.calc=function(e,t,n){var r;return this.queue.length?(this.cache||(this.cache=this.toArray()),r=this.cache,[e*r[0]+t*r[2]+(n?0:r[4]),e*r[1]+t*r[3]+(n?0:r[5])]):[e,t]};wc.exports=qe});var Lc=jt((YC,kc)=>{"use strict";var F0=ks(),G0={matrix:!0,scale:!0,rotate:!0,translate:!0,skewX:!0,skewY:!0},B0=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,U0=/[\s,]+/;kc.exports=function(t){var n=new F0,r,i;return t.split(B0).forEach(function(o){if(o.length){if(typeof G0[o]<"u"){r=o;return}switch(i=o.split(U0).map(function(s){return+s||0}),r){case"matrix":i.length===6&&n.matrix(i);return;case"scale":i.length===1?n.scale(i[0],i[0]):i.length===2&&n.scale(i[0],i[1]);return;case"rotate":i.length===1?n.rotate(i[0],0,0):i.length===3&&n.rotate(i[0],i[1],i[2]);return;case"translate":i.length===1?n.translate(i[0],0):i.length===2&&n.translate(i[0],i[1]);return;case"skewX":i.length===1&&n.skewX(i[0]);return;case"skewY":i.length===1&&n.skewY(i[0]);return}}}),n}});var Fc=jt((qC,Vc)=>{"use strict";var ar=Math.PI*2;function _c(e,t,n,r){var i=e*r-t*n<0?-1:1,o=e*n+t*r;return o>1&&(o=1),o<-1&&(o=-1),i*Math.acos(o)}function z0(e,t,n,r,i,o,s,a,l,u){var c=u*(e-n)/2+l*(t-r)/2,f=-l*(e-n)/2+u*(t-r)/2,p=s*s,d=a*a,m=c*c,h=f*f,y=p*d-p*h-d*m;y<0&&(y=0),y/=p*h+d*m,y=Math.sqrt(y)*(i===o?-1:1);var v=y*s/a*f,g=y*-a/s*c,I=u*v-l*g+(e+n)/2,S=l*v+u*g+(t+r)/2,E=(c-v)/s,T=(f-g)/a,C=(-c-v)/s,x=(-f-g)/a,D=_c(1,0,E,T),M=_c(E,T,C,x);return o===0&&M>0&&(M-=ar),o===1&&M<0&&(M+=ar),[I,S,D,M]}function H0(e,t){var n=1.3333333333333333*Math.tan(t/4),r=Math.cos(e),i=Math.sin(e),o=Math.cos(e+t),s=Math.sin(e+t);return[r,i,r-i*n,i+r*n,o+s*n,s-o*n,o,s]}Vc.exports=function(t,n,r,i,o,s,a,l,u){var c=Math.sin(u*ar/360),f=Math.cos(u*ar/360),p=f*(t-r)/2+c*(n-i)/2,d=-c*(t-r)/2+f*(n-i)/2;if(p===0&&d===0)return[];if(a===0||l===0)return[];a=Math.abs(a),l=Math.abs(l);var m=p*p/(a*a)+d*d/(l*l);m>1&&(a*=Math.sqrt(m),l*=Math.sqrt(m));var h=z0(t,n,r,i,o,s,a,l,c,f),y=[],v=h[2],g=h[3],I=Math.max(Math.ceil(Math.abs(g)/(ar/4)),1);g/=I;for(var S=0;S<I;S++)y.push(H0(v,g)),v+=g;return y.map(function(E){for(var T=0;T<E.length;T+=2){var C=E[T+0],x=E[T+1];C*=a,x*=l;var D=f*C-c*x,M=c*C+f*x;E[T+0]=D+h[0],E[T+1]=M+h[1]}return E})}});var Uc=jt((JC,Bc)=>{"use strict";var lr=1e-10,Gc=Math.PI/180;function ur(e,t,n){if(!(this instanceof ur))return new ur(e,t,n);this.rx=e,this.ry=t,this.ax=n}ur.prototype.transform=function(e){var t=Math.cos(this.ax*Gc),n=Math.sin(this.ax*Gc),r=[this.rx*(e[0]*t+e[2]*n),this.rx*(e[1]*t+e[3]*n),this.ry*(-e[0]*n+e[2]*t),this.ry*(-e[1]*n+e[3]*t)],i=r[0]*r[0]+r[2]*r[2],o=r[1]*r[1]+r[3]*r[3],s=((r[0]-r[3])*(r[0]-r[3])+(r[2]+r[1])*(r[2]+r[1]))*((r[0]+r[3])*(r[0]+r[3])+(r[2]-r[1])*(r[2]-r[1])),a=(i+o)/2;if(s<lr*a)return this.rx=this.ry=Math.sqrt(a),this.ax=0,this;var l=r[0]*r[1]+r[2]*r[3];s=Math.sqrt(s);var u=a+s/2,c=a-s/2;return this.ax=Math.abs(l)<lr&&Math.abs(u-o)<lr?90:Math.atan(Math.abs(l)>Math.abs(u-o)?(u-i)/l:l/(u-o))*180/Math.PI,this.ax>=0?(this.rx=Math.sqrt(u),this.ry=Math.sqrt(c)):(this.ax+=90,this.rx=Math.sqrt(c),this.ry=Math.sqrt(u)),this};ur.prototype.isDegenerate=function(){return this.rx<lr*this.ry||this.ry<lr*this.rx};Bc.exports=ur});var Hc=jt((ZC,zc)=>{"use strict";var W0=Pc(),X0=Lc(),Dt=ks(),j0=Fc(),$0=Uc();function le(e){if(!(this instanceof le))return new le(e);var t=W0(e);this.segments=t.segments,this.err=t.err,this.__stack=[]}le.from=function(e){if(typeof e=="string")return new le(e);if(e instanceof le){var t=new le("");return t.err=e.err,t.segments=e.segments.map(function(n){return n.slice()}),t.__stack=e.__stack.map(function(n){return Dt().matrix(n.toArray())}),t}throw new Error("SvgPath.from: invalid param type "+e)};le.prototype.__matrix=function(e){var t=this,n;e.queue.length&&this.iterate(function(r,i,o,s){var a,l,u,c;switch(r[0]){case"v":a=e.calc(0,r[1],!0),l=a[0]===0?["v",a[1]]:["l",a[0],a[1]];break;case"V":a=e.calc(o,r[1],!1),l=a[0]===e.calc(o,s,!1)[0]?["V",a[1]]:["L",a[0],a[1]];break;case"h":a=e.calc(r[1],0,!0),l=a[1]===0?["h",a[0]]:["l",a[0],a[1]];break;case"H":a=e.calc(r[1],s,!1),l=a[1]===e.calc(o,s,!1)[1]?["H",a[0]]:["L",a[0],a[1]];break;case"a":case"A":var f=e.toArray(),p=$0(r[1],r[2],r[3]).transform(f);if(f[0]*f[3]-f[1]*f[2]<0&&(r[5]=r[5]?"0":"1"),a=e.calc(r[6],r[7],r[0]==="a"),r[0]==="A"&&r[6]===o&&r[7]===s||r[0]==="a"&&r[6]===0&&r[7]===0){l=[r[0]==="a"?"l":"L",a[0],a[1]];break}p.isDegenerate()?l=[r[0]==="a"?"l":"L",a[0],a[1]]:l=[r[0],p.rx,p.ry,p.ax,r[4],r[5],a[0],a[1]];break;case"m":c=i>0,a=e.calc(r[1],r[2],c),l=["m",a[0],a[1]];break;default:for(u=r[0],l=[u],c=u.toLowerCase()===u,n=1;n<r.length;n+=2)a=e.calc(r[n],r[n+1],c),l.push(a[0],a[1])}t.segments[i]=l},!0)};le.prototype.__evaluateStack=function(){var e,t;if(this.__stack.length){if(this.__stack.length===1){this.__matrix(this.__stack[0]),this.__stack=[];return}for(e=Dt(),t=this.__stack.length;--t>=0;)e.matrix(this.__stack[t].toArray());this.__matrix(e),this.__stack=[]}};le.prototype.toString=function(){var e="",t="",n=!1;this.__evaluateStack();for(var r=0,i=this.segments.length;r<i;r++){var o=this.segments[r],s=o[0];s!==t||s==="m"||s==="M"?(s==="m"&&t==="z"&&(e+=" "),e+=s,n=!1):n=!0;for(var a=1;a<o.length;a++){var l=o[a];a===1?n&&l>=0&&(e+=" "):l>=0&&(e+=" "),e+=l}t=s}return e};le.prototype.translate=function(e,t){return this.__stack.push(Dt().translate(e,t||0)),this};le.prototype.scale=function(e,t){return this.__stack.push(Dt().scale(e,!t&&t!==0?e:t)),this};le.prototype.rotate=function(e,t,n){return this.__stack.push(Dt().rotate(e,t||0,n||0)),this};le.prototype.skewX=function(e){return this.__stack.push(Dt().skewX(e)),this};le.prototype.skewY=function(e){return this.__stack.push(Dt().skewY(e)),this};le.prototype.matrix=function(e){return this.__stack.push(Dt().matrix(e)),this};le.prototype.transform=function(e){return e.trim()?(this.__stack.push(X0(e)),this):this};le.prototype.round=function(e){var t=0,n=0,r=0,i=0,o;return e=e||0,this.__evaluateStack(),this.segments.forEach(function(s){var a=s[0].toLowerCase()===s[0];switch(s[0]){case"H":case"h":a&&(s[1]+=r),r=s[1]-s[1].toFixed(e),s[1]=+s[1].toFixed(e);return;case"V":case"v":a&&(s[1]+=i),i=s[1]-s[1].toFixed(e),s[1]=+s[1].toFixed(e);return;case"Z":case"z":r=t,i=n;return;case"M":case"m":a&&(s[1]+=r,s[2]+=i),r=s[1]-s[1].toFixed(e),i=s[2]-s[2].toFixed(e),t=r,n=i,s[1]=+s[1].toFixed(e),s[2]=+s[2].toFixed(e);return;case"A":case"a":a&&(s[6]+=r,s[7]+=i),r=s[6]-s[6].toFixed(e),i=s[7]-s[7].toFixed(e),s[1]=+s[1].toFixed(e),s[2]=+s[2].toFixed(e),s[3]=+s[3].toFixed(e+2),s[6]=+s[6].toFixed(e),s[7]=+s[7].toFixed(e);return;default:o=s.length,a&&(s[o-2]+=r,s[o-1]+=i),r=s[o-2]-s[o-2].toFixed(e),i=s[o-1]-s[o-1].toFixed(e),s.forEach(function(l,u){u&&(s[u]=+s[u].toFixed(e))});return}}),this};le.prototype.iterate=function(e,t){var n=this.segments,r={},i=!1,o=0,s=0,a=0,l=0,u,c,f;if(t||this.__evaluateStack(),n.forEach(function(p,d){var m=e(p,d,o,s);Array.isArray(m)&&(r[d]=m,i=!0);var h=p[0]===p[0].toLowerCase();switch(p[0]){case"m":case"M":o=p[1]+(h?o:0),s=p[2]+(h?s:0),a=o,l=s;return;case"h":case"H":o=p[1]+(h?o:0);return;case"v":case"V":s=p[1]+(h?s:0);return;case"z":case"Z":o=a,s=l;return;default:o=p[p.length-2]+(h?o:0),s=p[p.length-1]+(h?s:0)}}),!i)return this;for(f=[],u=0;u<n.length;u++)if(typeof r[u]<"u")for(c=0;c<r[u].length;c++)f.push(r[u][c]);else f.push(n[u]);return this.segments=f,this};le.prototype.abs=function(){return this.iterate(function(e,t,n,r){var i=e[0],o=i.toUpperCase(),s;if(i!==o)switch(e[0]=o,i){case"v":e[1]+=r;return;case"a":e[6]+=n,e[7]+=r;return;default:for(s=1;s<e.length;s++)e[s]+=s%2?n:r}},!0),this};le.prototype.rel=function(){return this.iterate(function(e,t,n,r){var i=e[0],o=i.toLowerCase(),s;if(i!==o&&!(t===0&&i==="M"))switch(e[0]=o,i){case"V":e[1]-=r;return;case"A":e[6]-=n,e[7]-=r;return;default:for(s=1;s<e.length;s++)e[s]-=s%2?n:r}},!0),this};le.prototype.unarc=function(){return this.iterate(function(e,t,n,r){var i,o,s,a=[],l=e[0];return l!=="A"&&l!=="a"?null:(l==="a"?(o=n+e[6],s=r+e[7]):(o=e[6],s=e[7]),i=j0(n,r,o,s,e[4],e[5],e[1],e[2],e[3]),i.length===0?[[e[0]==="a"?"l":"L",e[6],e[7]]]:(i.forEach(function(u){a.push(["C",u[2],u[3],u[4],u[5],u[6],u[7]])}),a))}),this};le.prototype.unshort=function(){var e=this.segments,t,n,r,i,o;return this.iterate(function(s,a,l,u){var c=s[0],f=c.toUpperCase(),p;a&&(f==="T"?(p=c==="t",r=e[a-1],r[0]==="Q"?(t=r[1]-l,n=r[2]-u):r[0]==="q"?(t=r[1]-r[3],n=r[2]-r[4]):(t=0,n=0),i=-t,o=-n,p||(i+=l,o+=u),e[a]=[p?"q":"Q",i,o,s[1],s[2]]):f==="S"&&(p=c==="s",r=e[a-1],r[0]==="C"?(t=r[3]-l,n=r[4]-u):r[0]==="c"?(t=r[3]-r[5],n=r[4]-r[6]):(t=0,n=0),i=-t,o=-n,p||(i+=l,o+=u),e[a]=[p?"c":"C",i,o,s[1],s[2],s[3],s[4]]))}),this};zc.exports=le});var Si=jt((QC,Wc)=>{"use strict";Wc.exports=Hc()});var u0={toSorted(e){"use strict";if(e!==void 0&&typeof e!="function")throw new TypeError("Array comparator must be a function.");if(this==null)throw new TypeError("Cannot sort a null or undefined value.");return Array.from({length:this.length},(t,n)=>this[n]).sort(e)},toReversed(){"use strict";if(this==null)throw new TypeError("Cannot reverse a null or undefined value.");let e=Array.from({length:this.length});for(let t=0;t<e.length;t++)e[t]=this[e.length-t-1];return e}};for(let[e,t]of Object.entries(u0))typeof Array.prototype[e]!="function"&&Object.defineProperty(Array.prototype,e,{value:t,configurable:!0,writable:!0});var ue=Uint8Array,Pe=Uint16Array,Rs=Int32Array,yi=new ue([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),Ii=new ue([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),As=new ue([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),Ec=function(e,t){for(var n=new Pe(31),r=0;r<31;++r)n[r]=t+=1<<e[r-1];for(var i=new Rs(n[30]),r=1;r<30;++r)for(var o=n[r];o<n[r+1];++o)i[o]=o-n[r]<<5|r;return{b:n,r:i}},Ac=Ec(yi,2),xc=Ac.b,xs=Ac.r;xc[28]=258,xs[258]=28;var Nc=Ec(Ii,0),c0=Nc.b,Ic=Nc.r,Ns=new Pe(32768);for(J=0;J<32768;++J)mt=(J&43690)>>1|(J&21845)<<1,mt=(mt&52428)>>2|(mt&13107)<<2,mt=(mt&61680)>>4|(mt&3855)<<4,Ns[J]=((mt&65280)>>8|(mt&255)<<8)>>1;var mt,J,it=(function(e,t,n){for(var r=e.length,i=0,o=new Pe(t);i<r;++i)e[i]&&++o[e[i]-1];var s=new Pe(t);for(i=1;i<t;++i)s[i]=s[i-1]+o[i-1]<<1;var a;if(n){a=new Pe(1<<t);var l=15-t;for(i=0;i<r;++i)if(e[i])for(var u=i<<4|e[i],c=t-e[i],f=s[e[i]-1]++<<c,p=f|(1<<c)-1;f<=p;++f)a[Ns[f]>>l]=u}else for(a=new Pe(r),i=0;i<r;++i)e[i]&&(a[i]=Ns[s[e[i]-1]++]>>15-e[i]);return a}),Ot=new ue(288);for(J=0;J<144;++J)Ot[J]=8;var J;for(J=144;J<256;++J)Ot[J]=9;var J;for(J=256;J<280;++J)Ot[J]=7;var J;for(J=280;J<288;++J)Ot[J]=8;var J,ir=new ue(32);for(J=0;J<32;++J)ir[J]=5;var J,f0=it(Ot,9,0),d0=it(Ot,9,1),p0=it(ir,5,0),m0=it(ir,5,1),Ts=function(e){for(var t=e[0],n=1;n<e.length;++n)e[n]>t&&(t=e[n]);return t},Ye=function(e,t,n){var r=t/8|0;return(e[r]|e[r+1]<<8)>>(t&7)&n},Ss=function(e,t){var n=t/8|0;return(e[n]|e[n+1]<<8|e[n+2]<<16)>>(t&7)},Ms=function(e){return(e+7)/8|0},or=function(e,t,n){return(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length),new ue(e.subarray(t,n))};var h0=["unexpected EOF","invalid block type","invalid length/literal","invalid distance","stream finished","no stream handler",,"no callback","invalid UTF-8 data","extra field too long","date not in range 1980-2099","filename too long","stream finishing","invalid zip data"],Te=function(e,t,n){var r=new Error(t||h0[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,Te),!n)throw r;return r},g0=function(e,t,n,r){var i=e.length,o=r?r.length:0;if(!i||t.f&&!t.l)return n||new ue(0);var s=!n,a=s||t.i!=2,l=t.i;s&&(n=new ue(i*3));var u=function($e){var Ke=n.length;if($e>Ke){var Ct=new ue(Math.max(Ke*2,$e));Ct.set(n),n=Ct}},c=t.f||0,f=t.p||0,p=t.b||0,d=t.l,m=t.d,h=t.m,y=t.n,v=i*8;do{if(!d){c=Ye(e,f,1);var g=Ye(e,f+1,3);if(f+=3,g)if(g==1)d=d0,m=m0,h=9,y=5;else if(g==2){var T=Ye(e,f,31)+257,C=Ye(e,f+10,15)+4,x=T+Ye(e,f+5,31)+1;f+=14;for(var D=new ue(x),M=new ue(19),V=0;V<C;++V)M[As[V]]=Ye(e,f+V*3,7);f+=C*3;for(var L=Ts(M),A=(1<<L)-1,N=it(M,L,1),V=0;V<x;){var b=N[Ye(e,f,A)];f+=b&15;var I=b>>4;if(I<16)D[V++]=I;else{var R=0,_=0;for(I==16?(_=3+Ye(e,f,3),f+=2,R=D[V-1]):I==17?(_=3+Ye(e,f,7),f+=3):I==18&&(_=11+Ye(e,f,127),f+=7);_--;)D[V++]=R}}var O=D.subarray(0,T),k=D.subarray(T);h=Ts(O),y=Ts(k),d=it(O,h,1),m=it(k,y,1)}else Te(1);else{var I=Ms(f)+4,S=e[I-4]|e[I-3]<<8,E=I+S;if(E>i){l&&Te(0);break}a&&u(p+S),n.set(e.subarray(I,E),p),t.b=p+=S,t.p=f=E*8,t.f=c;continue}if(f>v){l&&Te(0);break}}a&&u(p+131072);for(var U=(1<<h)-1,X=(1<<y)-1,$=f;;$=f){var R=d[Ss(e,f)&U],j=R>>4;if(f+=R&15,f>v){l&&Te(0);break}if(R||Te(2),j<256)n[p++]=j;else if(j==256){$=f,d=null;break}else{var K=j-254;if(j>264){var V=j-257,B=yi[V];K=Ye(e,f,(1<<B)-1)+xc[V],f+=B}var te=m[Ss(e,f)&X],re=te>>4;te||Te(3),f+=te&15;var k=c0[re];if(re>3){var B=Ii[re];k+=Ss(e,f)&(1<<B)-1,f+=B}if(f>v){l&&Te(0);break}a&&u(p+131072);var Ce=p+K;if(p<k){var dt=o-k,pt=Math.min(k,Ce);for(dt+p<0&&Te(3);p<pt;++p)n[p]=r[dt+p]}for(;p<Ce;++p)n[p]=n[p-k]}}t.l=d,t.p=$,t.b=p,t.f=c,d&&(c=1,t.m=h,t.d=m,t.n=y)}while(!c);return p!=n.length&&s?or(n,0,p):n.subarray(0,p)},ht=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8},nr=function(e,t,n){n<<=t&7;var r=t/8|0;e[r]|=n,e[r+1]|=n>>8,e[r+2]|=n>>16},bs=function(e,t){for(var n=[],r=0;r<e.length;++r)e[r]&&n.push({s:r,f:e[r]});var i=n.length,o=n.slice();if(!i)return{t:Oc,l:0};if(i==1){var s=new ue(n[0].s+1);return s[n[0].s]=1,{t:s,l:1}}n.sort(function(E,T){return E.f-T.f}),n.push({s:-1,f:25001});var a=n[0],l=n[1],u=0,c=1,f=2;for(n[0]={s:-1,f:a.f+l.f,l:a,r:l};c!=i-1;)a=n[n[u].f<n[f].f?u++:f++],l=n[u!=c&&n[u].f<n[f].f?u++:f++],n[c++]={s:-1,f:a.f+l.f,l:a,r:l};for(var p=o[0].s,r=1;r<i;++r)o[r].s>p&&(p=o[r].s);var d=new Pe(p+1),m=Cs(n[c-1],d,0);if(m>t){var r=0,h=0,y=m-t,v=1<<y;for(o.sort(function(T,C){return d[C.s]-d[T.s]||T.f-C.f});r<i;++r){var g=o[r].s;if(d[g]>t)h+=v-(1<<m-d[g]),d[g]=t;else break}for(h>>=y;h>0;){var I=o[r].s;d[I]<t?h-=1<<t-d[I]++-1:++r}for(;r>=0&&h;--r){var S=o[r].s;d[S]==t&&(--d[S],++h)}m=t}return{t:new ue(d),l:m}},Cs=function(e,t,n){return e.s==-1?Math.max(Cs(e.l,t,n+1),Cs(e.r,t,n+1)):t[e.s]=n},vc=function(e){for(var t=e.length;t&&!e[--t];);for(var n=new Pe(++t),r=0,i=e[0],o=1,s=function(l){n[r++]=l},a=1;a<=t;++a)if(e[a]==i&&a!=t)++o;else{if(!i&&o>2){for(;o>138;o-=138)s(32754);o>2&&(s(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(s(i),--o;o>6;o-=6)s(8304);o>2&&(s(o-3<<5|8208),o=0)}for(;o--;)s(i);o=1,i=e[a]}return{c:n.subarray(0,r),n:t}},rr=function(e,t){for(var n=0,r=0;r<t.length;++r)n+=e[r]*t[r];return n},Cc=function(e,t,n){var r=n.length,i=Ms(t+2);e[i]=r&255,e[i+1]=r>>8,e[i+2]=e[i]^255,e[i+3]=e[i+1]^255;for(var o=0;o<r;++o)e[i+o+4]=n[o];return(i+4+r)*8},Tc=function(e,t,n,r,i,o,s,a,l,u,c){ht(t,c++,n),++i[256];for(var f=bs(i,15),p=f.t,d=f.l,m=bs(o,15),h=m.t,y=m.l,v=vc(p),g=v.c,I=v.n,S=vc(h),E=S.c,T=S.n,C=new Pe(19),x=0;x<g.length;++x)++C[g[x]&31];for(var x=0;x<E.length;++x)++C[E[x]&31];for(var D=bs(C,7),M=D.t,V=D.l,L=19;L>4&&!M[As[L-1]];--L);var A=u+5<<3,N=rr(i,Ot)+rr(o,ir)+s,b=rr(i,p)+rr(o,h)+s+14+3*L+rr(C,M)+2*C[16]+3*C[17]+7*C[18];if(l>=0&&A<=N&&A<=b)return Cc(t,c,e.subarray(l,l+u));var R,_,O,k;if(ht(t,c,1+(b<N)),c+=2,b<N){R=it(p,d,0),_=p,O=it(h,y,0),k=h;var U=it(M,V,0);ht(t,c,I-257),ht(t,c+5,T-1),ht(t,c+10,L-4),c+=14;for(var x=0;x<L;++x)ht(t,c+3*x,M[As[x]]);c+=3*L;for(var X=[g,E],$=0;$<2;++$)for(var j=X[$],x=0;x<j.length;++x){var K=j[x]&31;ht(t,c,U[K]),c+=M[K],K>15&&(ht(t,c,j[x]>>5&127),c+=j[x]>>12)}}else R=f0,_=Ot,O=p0,k=ir;for(var x=0;x<a;++x){var B=r[x];if(B>255){var K=B>>18&31;nr(t,c,R[K+257]),c+=_[K+257],K>7&&(ht(t,c,B>>23&31),c+=yi[K]);var te=B&31;nr(t,c,O[te]),c+=k[te],te>3&&(nr(t,c,B>>5&8191),c+=Ii[te])}else nr(t,c,R[B]),c+=_[B]}return nr(t,c,R[256]),c+_[256]},y0=new Rs([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),Oc=new ue(0),I0=function(e,t,n,r,i,o){var s=o.z||e.length,a=new ue(r+s+5*(1+Math.ceil(s/7e3))+i),l=a.subarray(r,a.length-i),u=o.l,c=(o.r||0)&7;if(t){c&&(l[0]=o.r>>3);for(var f=y0[t-1],p=f>>13,d=f&8191,m=(1<<n)-1,h=o.p||new Pe(32768),y=o.h||new Pe(m+1),v=Math.ceil(n/3),g=2*v,I=function(ys){return(e[ys]^e[ys+1]<<v^e[ys+2]<<g)&m},S=new Rs(25e3),E=new Pe(288),T=new Pe(32),C=0,x=0,D=o.i||0,M=0,V=o.w||0,L=0;D+2<s;++D){var A=I(D),N=D&32767,b=y[A];if(h[N]=b,y[A]=N,V<=D){var R=s-D;if((C>7e3||M>24576)&&(R>423||!u)){c=Tc(e,l,0,S,E,T,x,M,L,D-L,c),M=C=x=0,L=D;for(var _=0;_<286;++_)E[_]=0;for(var _=0;_<30;++_)T[_]=0}var O=2,k=0,U=d,X=N-b&32767;if(R>2&&A==I(D-X))for(var $=Math.min(p,R)-1,j=Math.min(32767,D),K=Math.min(258,R);X<=j&&--U&&N!=b;){if(e[D+O]==e[D+O-X]){for(var B=0;B<K&&e[D+B]==e[D+B-X];++B);if(B>O){if(O=B,k=X,B>$)break;for(var te=Math.min(X,B-2),re=0,_=0;_<te;++_){var Ce=D-X+_&32767,dt=h[Ce],pt=Ce-dt&32767;pt>re&&(re=pt,b=Ce)}}}N=b,b=h[N],X+=N-b&32767}if(k){S[M++]=268435456|xs[O]<<18|Ic[k];var $e=xs[O]&31,Ke=Ic[k]&31;x+=yi[$e]+Ii[Ke],++E[257+$e],++T[Ke],V=D+O,++C}else S[M++]=e[D],++E[e[D]]}}for(D=Math.max(D,V);D<s;++D)S[M++]=e[D],++E[e[D]];c=Tc(e,l,u,S,E,T,x,M,L,D-L,c),u||(o.r=c&7|l[c/8|0]<<3,c-=7,o.h=y,o.p=h,o.i=D,o.w=V)}else{for(var D=o.w||0;D<s+u;D+=65535){var Ct=D+65535;Ct>=s&&(l[c/8|0]=u,Ct=s),c=Cc(l,c+1,e.subarray(D,Ct))}o.i=s}return or(a,0,r+Ms(c)+i)},v0=(function(){for(var e=new Int32Array(256),t=0;t<256;++t){for(var n=t,r=9;--r;)n=(n&1&&-306674912)^n>>>1;e[t]=n}return e})(),T0=function(){var e=-1;return{p:function(t){for(var n=e,r=0;r<t.length;++r)n=v0[n&255^t[r]]^n>>>8;e=n},d:function(){return~e}}};var S0=function(e,t,n,r,i){if(!i&&(i={l:1},t.dictionary)){var o=t.dictionary.subarray(-32768),s=new ue(o.length+e.length);s.set(o),s.set(e,o.length),e=s,i.w=o.length}return I0(e,t.level==null?6:t.level,t.mem==null?i.l?Math.ceil(Math.max(8,Math.min(13,Math.log(e.length)))*1.5):20:12+t.mem,n,r,i)},Dc=function(e,t){var n={};for(var r in e)n[r]=e[r];for(var r in t)n[r]=t[r];return n};var rt=function(e,t){return e[t]|e[t+1]<<8},Ge=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},Es=function(e,t){return Ge(e,t)+Ge(e,t+4)*4294967296},ve=function(e,t,n){for(;n;++t)e[t]=n,n>>>=8};function sr(e,t){return S0(e,t||{},0,0)}function In(e,t){return g0(e,{i:2},t&&t.out,t&&t.dictionary)}var Rc=function(e,t,n,r){for(var i in e){var o=e[i],s=t+i,a=r;Array.isArray(o)&&(a=Dc(r,o[1]),o=o[0]),ArrayBuffer.isView(o)?n[s]=[o,a]:(n[s+="/"]=[new ue(0),a],Rc(o,s,n,r))}},Sc=typeof TextEncoder<"u"&&new TextEncoder,Os=typeof TextDecoder<"u"&&new TextDecoder,b0=0;try{Os.decode(Oc,{stream:!0}),b0=1}catch{}var E0=function(e){for(var t="",n=0;;){var r=e[n++],i=(r>127)+(r>223)+(r>239);if(n+i>e.length)return{s:t,r:or(e,n-1)};i?i==3?(r=((r&15)<<18|(e[n++]&63)<<12|(e[n++]&63)<<6|e[n++]&63)-65536,t+=String.fromCharCode(55296|r>>10,56320|r&1023)):i&1?t+=String.fromCharCode((r&31)<<6|e[n++]&63):t+=String.fromCharCode((r&15)<<12|(e[n++]&63)<<6|e[n++]&63):t+=String.fromCharCode(r)}};function gi(e,t){if(t){for(var n=new ue(e.length),r=0;r<e.length;++r)n[r]=e.charCodeAt(r);return n}if(Sc)return Sc.encode(e);for(var i=e.length,o=new ue(e.length+(e.length>>1)),s=0,a=function(c){o[s++]=c},r=0;r<i;++r){if(s+5>o.length){var l=new ue(s+8+(i-r<<1));l.set(o),o=l}var u=e.charCodeAt(r);u<128||t?a(u):u<2048?(a(192|u>>6),a(128|u&63)):u>55295&&u<57344?(u=65536+(u&1047552)|e.charCodeAt(++r)&1023,a(240|u>>18),a(128|u>>12&63),a(128|u>>6&63),a(128|u&63)):(a(224|u>>12),a(128|u>>6&63),a(128|u&63))}return or(o,0,s)}function Ps(e,t){if(t){for(var n="",r=0;r<e.length;r+=16384)n+=String.fromCharCode.apply(null,e.subarray(r,r+16384));return n}else{if(Os)return Os.decode(e);var i=E0(e),o=i.s,n=i.r;return n.length&&Te(8),o}}var A0=function(e,t){return t+30+rt(e,t+26)+rt(e,t+28)},x0=function(e,t,n){var r=rt(e,t+28),i=rt(e,t+30),o=Ps(e.subarray(t+46,t+46+r),!(rt(e,t+8)&2048)),s=t+46+r,a=N0(e,s,i,n,Ge(e,t+20),Ge(e,t+24),Ge(e,t+42)),l=a[0],u=a[1],c=a[2];return[rt(e,t+10),l,u,o,s+i+rt(e,t+32),c]},N0=function(e,t,n,r,i,o,s){var a=i==4294967295,l=o==4294967295,u=s==4294967295,c=t+n,f=a+l+u;if(r&&f){for(;t+4<c;t+=4+rt(e,t+2))if(rt(e,t)==1)return[a?Es(e,t+4+8*l):i,l?Es(e,t+4):o,u?Es(e,t+4+8*(l+a)):s,1];r<2&&Te(13)}return[i,o,s,0]},Ds=function(e){var t=0;if(e)for(var n in e){var r=e[n].length;r>65535&&Te(9),t+=r+4}return t},bc=function(e,t,n,r,i,o,s,a){var l=r.length,u=n.extra,c=a&&a.length,f=Ds(u);ve(e,t,s!=null?33639248:67324752),t+=4,s!=null&&(e[t++]=20,e[t++]=n.os),e[t]=20,t+=2,e[t++]=n.flag<<1|(o<0&&8),e[t++]=i&&8,e[t++]=n.compression&255,e[t++]=n.compression>>8;var p=new Date(n.mtime==null?Date.now():n.mtime),d=p.getFullYear()-1980;if((d<0||d>119)&&Te(10),ve(e,t,d<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>1),t+=4,o!=-1&&(ve(e,t,n.crc),ve(e,t+4,o<0?-o-2:o),ve(e,t+8,n.size)),ve(e,t+12,l),ve(e,t+14,f),t+=16,s!=null&&(ve(e,t,c),ve(e,t+6,n.attrs),ve(e,t+10,s),t+=14),e.set(r,t),t+=l,f)for(var m in u){var h=u[m],y=h.length;ve(e,t,+m),ve(e,t+2,y),e.set(h,t+4),t+=4+y}return c&&(e.set(a,t),t+=c),t},C0=function(e,t,n,r,i){ve(e,t,101010256),ve(e,t+8,n),ve(e,t+10,n),ve(e,t+12,r),ve(e,t+16,i)};function vn(e,t){t||(t={});var n={},r=[];Rc(e,"",n,t);var i=0,o=0;for(var s in n){var a=n[s],l=a[0],u=a[1],c=u.level==0?0:8,f=gi(s),p=f.length,d=u.comment,m=d&&gi(d),h=m&&m.length,y=Ds(u.extra);p>65535&&Te(11);var v=c?sr(l,u):l,g=v.length,I=T0();I.p(l),r.push(Dc(u,{size:l.length,crc:I.d(),c:v,f,m,u:p!=s.length||m&&d.length!=h,o:i,compression:c})),i+=30+p+y+g,o+=76+2*(p+y)+(h||0)+g}for(var S=new ue(o+22),E=i,T=o-i,C=0;C<r.length;++C){var f=r[C];bc(S,f.o,f,f.f,f.u,f.c.length);var x=30+f.f.length+Ds(f.extra);S.set(f.c,f.o+x),bc(S,i,f,f.f,f.u,f.c.length,f.o,f.m),i+=16+x+(f.m?f.m.length:0)}return C0(S,i,r.length,T,E),S}function Tn(e,t){for(var n={},r=e.length-22;Ge(e,r)!=101010256;--r)(!r||e.length-r>65558)&&Te(13);var i=rt(e,r+8);if(!i)return{};var o=Ge(e,r+16),s=Ge(e,r-20)==117853008;if(s){var a=Ge(e,r-12);s=Ge(e,a)==101075792,s&&(i=Ge(e,a+32),o=Ge(e,a+48))}for(var l=t&&t.filter,u=0;u<i;++u){var c=x0(e,o,s),f=c[0],p=c[1],d=c[2],m=c[3],h=c[4],y=c[5],v=A0(e,y);o=h,(!l||l({name:m,size:p,originalSize:d,compression:f}))&&(f?f==8?n[m]=In(e.subarray(v,v+p),{out:new ue(d)}):Te(14,"unknown compression type "+f):n[m]=or(e,v,v+p))}return n}var $u=vs(Si(),1);var K0=(e,t)=>{if(typeof e=="number"){if(t===3)return{mode:"rgb",r:(e>>8&15|e>>4&240)/255,g:(e>>4&15|e&240)/255,b:(e&15|e<<4&240)/255};if(t===4)return{mode:"rgb",r:(e>>12&15|e>>8&240)/255,g:(e>>8&15|e>>4&240)/255,b:(e>>4&15|e&240)/255,alpha:(e&15|e<<4&240)/255};if(t===6)return{mode:"rgb",r:(e>>16&255)/255,g:(e>>8&255)/255,b:(e&255)/255};if(t===8)return{mode:"rgb",r:(e>>24&255)/255,g:(e>>16&255)/255,b:(e>>8&255)/255,alpha:(e&255)/255}}},bi=K0;var Y0={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xc=Y0;var q0=e=>bi(Xc[e.toLowerCase()],6),jc=q0;var J0=/^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i,Z0=e=>{let t;return(t=e.match(J0))?bi(parseInt(t[1],16),t[1].length):void 0},$c=Z0;var Ee="([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)",aO=`(?:${Ee}|none)`,$t=`${Ee}%`,lO=`(?:${Ee}%|none)`,cr=`(?:${Ee}%|${Ee})`,Q0=`(?:${Ee}%|${Ee}|none)`,Kc=`(?:${Ee}(deg|grad|rad|turn)|${Ee})`,uO=`(?:${Ee}(deg|grad|rad|turn)|${Ee}|none)`,Rt="\\s*,\\s*";var cO=new RegExp("^"+Q0+"$");var eI=new RegExp(`^rgba?\\(\\s*${Ee}${Rt}${Ee}${Rt}${Ee}\\s*(?:,\\s*${cr}\\s*)?\\)$`),tI=new RegExp(`^rgba?\\(\\s*${$t}${Rt}${$t}${Rt}${$t}\\s*(?:,\\s*${cr}\\s*)?\\)$`),nI=e=>{let t={mode:"rgb"},n;if(n=e.match(eI))n[1]!==void 0&&(t.r=n[1]/255),n[2]!==void 0&&(t.g=n[2]/255),n[3]!==void 0&&(t.b=n[3]/255);else if(n=e.match(tI))n[1]!==void 0&&(t.r=n[1]/100),n[2]!==void 0&&(t.g=n[2]/100),n[3]!==void 0&&(t.b=n[3]/100);else return;return n[4]!==void 0?t.alpha=Math.max(0,Math.min(1,n[4]/100)):n[5]!==void 0&&(t.alpha=Math.max(0,Math.min(1,+n[5]))),t},Yc=nI;var rI=(e,t)=>e===void 0?void 0:typeof e!="object"?Ls(e):e.mode!==void 0?e:t?{...e,mode:t}:void 0,bn=rI;var iI=(e="rgb")=>t=>(t=bn(t,e))!==void 0?t.mode===e?t:Je[t.mode][e]?Je[t.mode][e](t):e==="rgb"?Je[t.mode].rgb(t):Je.rgb[e](Je[t.mode].rgb(t)):void 0,he=iI;var Je={},qc={},fr=[],_s={},oI=e=>e,Z=e=>(Je[e.mode]={...Je[e.mode],...e.toMode},Object.keys(e.fromMode||{}).forEach(t=>{Je[t]||(Je[t]={}),Je[t][e.mode]=e.fromMode[t]}),e.ranges||(e.ranges={}),e.difference||(e.difference={}),e.channels.forEach(t=>{if(e.ranges[t]===void 0&&(e.ranges[t]=[0,1]),!e.interpolate[t])throw new Error(`Missing interpolator for: ${t}`);typeof e.interpolate[t]=="function"&&(e.interpolate[t]={use:e.interpolate[t]}),e.interpolate[t].fixup||(e.interpolate[t].fixup=oI)}),qc[e.mode]=e,(e.parse||[]).forEach(t=>{sI(t,e.mode)}),he(e.mode)),gt=e=>qc[e],sI=(e,t)=>{if(typeof e=="string"){if(!t)throw new Error("'mode' required when 'parser' is a string");_s[e]=t}else typeof e=="function"&&fr.indexOf(e)<0&&fr.push(e)};var Vs=/[^\x00-\x7F]|[a-zA-Z_]/,aI=/[^\x00-\x7F]|[-\w]/,P={Function:"function",Ident:"ident",Number:"number",Percentage:"percentage",ParenClose:")",None:"none",Hue:"hue",Alpha:"alpha"},z=0;function Ei(e){let t=e[z],n=e[z+1];return t==="-"||t==="+"?/\d/.test(n)||n==="."&&/\d/.test(e[z+2]):t==="."?/\d/.test(n):/\d/.test(t)}function Fs(e){if(z>=e.length)return!1;let t=e[z];if(Vs.test(t))return!0;if(t==="-"){if(e.length-z<2)return!1;let n=e[z+1];return!!(n==="-"||Vs.test(n))}return!1}var lI={deg:1,rad:180/Math.PI,grad:9/10,turn:360};function dr(e){let t="";if((e[z]==="-"||e[z]==="+")&&(t+=e[z++]),t+=Ai(e),e[z]==="."&&/\d/.test(e[z+1])&&(t+=e[z++]+Ai(e)),(e[z]==="e"||e[z]==="E")&&((e[z+1]==="-"||e[z+1]==="+")&&/\d/.test(e[z+2])?t+=e[z++]+e[z++]+Ai(e):/\d/.test(e[z+1])&&(t+=e[z++]+Ai(e))),Fs(e)){let n=xi(e);return n==="deg"||n==="rad"||n==="turn"||n==="grad"?{type:P.Hue,value:t*lI[n]}:void 0}return e[z]==="%"?(z++,{type:P.Percentage,value:+t}):{type:P.Number,value:+t}}function Ai(e){let t="";for(;/\d/.test(e[z]);)t+=e[z++];return t}function xi(e){let t="";for(;z<e.length&&aI.test(e[z]);)t+=e[z++];return t}function uI(e){let t=xi(e);return e[z]==="("?(z++,{type:P.Function,value:t}):t==="none"?{type:P.None,value:void 0}:{type:P.Ident,value:t}}function cI(e=""){let t=e.trim(),n=[],r;for(z=0;z<t.length;){if(r=t[z++],r===`
`||r==="	"||r===" "){for(;z<t.length&&(t[z]===`
`||t[z]==="	"||t[z]===" ");)z++;continue}if(r===",")return;if(r===")"){n.push({type:P.ParenClose});continue}if(r==="+"){if(z--,Ei(t)){n.push(dr(t));continue}return}if(r==="-"){if(z--,Ei(t)){n.push(dr(t));continue}if(Fs(t)){n.push({type:P.Ident,value:xi(t)});continue}return}if(r==="."){if(z--,Ei(t)){n.push(dr(t));continue}return}if(r==="/"){for(;z<t.length&&(t[z]===`
`||t[z]==="	"||t[z]===" ");)z++;let i;if(Ei(t)&&(i=dr(t),i.type!==P.Hue)){n.push({type:P.Alpha,value:i});continue}if(Fs(t)&&xi(t)==="none"){n.push({type:P.Alpha,value:{type:P.None,value:void 0}});continue}return}if(/\d/.test(r)){z--,n.push(dr(t));continue}if(Vs.test(r)){z--,n.push(uI(t));continue}return}return n}function fI(e){e._i=0;let t=e[e._i++];if(!t||t.type!==P.Function||t.value!=="color"||(t=e[e._i++],t.type!==P.Ident))return;let n=_s[t.value];if(!n)return;let r={mode:n},i=Jc(e,!1);if(!i)return;let o=gt(n).channels;for(let s=0,a,l;s<o.length;s++)a=i[s],l=o[s],a.type!==P.None&&(r[l]=a.type===P.Number?a.value:a.value/100,l==="alpha"&&(r[l]=Math.max(0,Math.min(1,r[l]))));return r}function Jc(e,t){let n=[],r;for(;e._i<e.length;){if(r=e[e._i++],r.type===P.None||r.type===P.Number||r.type===P.Alpha||r.type===P.Percentage||t&&r.type===P.Hue){n.push(r);continue}if(r.type===P.ParenClose){if(e._i<e.length)return;continue}return}if(!(n.length<3||n.length>4)){if(n.length===4){if(n[3].type!==P.Alpha)return;n[3]=n[3].value}return n.length===3&&n.push({type:P.None,value:void 0}),n.every(i=>i.type!==P.Alpha)?n:void 0}}function dI(e,t){e._i=0;let n=e[e._i++];if(!n||n.type!==P.Function)return;let r=Jc(e,t);if(r)return r.unshift(n.value),r}var pI=e=>{if(typeof e!="string")return;let t=cI(e),n=t?dI(t,!0):void 0,r,i=0,o=fr.length;for(;i<o;)if((r=fr[i++](e,n))!==void 0)return r;return t?fI(t):void 0},Ls=pI;function mI(e,t){if(!t||t[0]!=="rgb"&&t[0]!=="rgba")return;let n={mode:"rgb"},[,r,i,o,s]=t;if(!(r.type===P.Hue||i.type===P.Hue||o.type===P.Hue))return r.type!==P.None&&(n.r=r.type===P.Number?r.value/255:r.value/100),i.type!==P.None&&(n.g=i.type===P.Number?i.value/255:i.value/100),o.type!==P.None&&(n.b=o.type===P.Number?o.value/255:o.value/100),s.type!==P.None&&(n.alpha=Math.min(1,Math.max(0,s.type===P.Number?s.value:s.value/100))),n}var Zc=mI;var hI=e=>e==="transparent"?{mode:"rgb",r:0,g:0,b:0,alpha:0}:void 0,Qc=hI;var ef=(e,t,n)=>e+n*(t-e);var gI=e=>{let t=[];for(let n=0;n<e.length-1;n++){let r=e[n],i=e[n+1];r===void 0&&i===void 0?t.push(void 0):r!==void 0&&i!==void 0?t.push([r,i]):t.push(r!==void 0?[r,r]:[i,i])}return t},tf=e=>t=>{let n=gI(t);return r=>{let i=r*n.length,o=r>=1?n.length-1:Math.max(Math.floor(i),0),s=n[o];return s===void 0?void 0:e(s[0],s[1],i-o)}};var w=tf(ef);var Y=e=>{let t=!1,n=e.map(r=>r!==void 0?(t=!0,r):1);return t?n:e};var yI={mode:"rgb",channels:["r","g","b","alpha"],parse:[Zc,$c,Yc,jc,Qc,"srgb"],serialize:"srgb",interpolate:{r:w,g:w,b:w,alpha:{use:w,fixup:Y}},gamut:!0,white:{r:1,g:1,b:1},black:{r:0,g:0,b:0}},Be=yI;var Gs=(e=0)=>Math.pow(Math.abs(e),2.19921875)*Math.sign(e),II=e=>{let t=Gs(e.r),n=Gs(e.g),r=Gs(e.b),i={mode:"xyz65",x:.5766690429101305*t+.1855582379065463*n+.1882286462349947*r,y:.297344975250536*t+.6273635662554661*n+.0752914584939979*r,z:.0270313613864123*t+.0706888525358272*n+.9913375368376386*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},Bs=II;var Us=e=>Math.pow(Math.abs(e),.4547069271758437)*Math.sign(e),vI=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"a98",r:Us(e*2.0415879038107465-t*.5650069742788597-.3447313507783297*n),g:Us(e*-.9692436362808798+t*1.8759675015077206+.0415550574071756*n),b:Us(e*.0134442806320312-t*.1183623922310184+1.0151749943912058*n)};return r!==void 0&&(i.alpha=r),i},zs=vI;var Hs=(e=0)=>{let t=Math.abs(e);return t<=.04045?e/12.92:(Math.sign(e)||1)*Math.pow((t+.055)/1.055,2.4)},TI=({r:e,g:t,b:n,alpha:r})=>{let i={mode:"lrgb",r:Hs(e),g:Hs(t),b:Hs(n)};return r!==void 0&&(i.alpha=r),i},Ue=TI;var SI=e=>{let{r:t,g:n,b:r,alpha:i}=Ue(e),o={mode:"xyz65",x:.4123907992659593*t+.357584339383878*n+.1804807884018343*r,y:.2126390058715102*t+.715168678767756*n+.0721923153607337*r,z:.0193308187155918*t+.119194779794626*n+.9505321522496607*r};return i!==void 0&&(o.alpha=i),o},Oe=SI;var Ws=(e=0)=>{let t=Math.abs(e);return t>.0031308?(Math.sign(e)||1)*(1.055*Math.pow(t,.4166666666666667)-.055):e*12.92},bI=({r:e,g:t,b:n,alpha:r},i="rgb")=>{let o={mode:i,r:Ws(e),g:Ws(t),b:Ws(n)};return r!==void 0&&(o.alpha=r),o},ze=bI;var EI=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=ze({r:e*3.2409699419045226-t*1.537383177570094-.4986107602930034*n,g:e*-.9692436362808796+t*1.8759675015077204+.0415550574071756*n,b:e*.0556300796969936-t*.2039769588889765+1.0569715142428784*n});return r!==void 0&&(i.alpha=r),i},De=EI;var AI={...Be,mode:"a98",parse:["a98-rgb"],serialize:"a98-rgb",fromMode:{rgb:e=>zs(Oe(e)),xyz65:zs},toMode:{rgb:e=>De(Bs(e)),xyz65:Bs}},nf=AI;var xI=e=>(e=e%360)<0?e+360:e,Q=xI;var NI=(e,t)=>e.map((n,r,i)=>{if(n===void 0)return n;let o=Q(n);return r===0||e[r-1]===void 0?o:t(o-Q(i[r-1]))}).reduce((n,r)=>!n.length||r===void 0||n[n.length-1]===void 0?(n.push(r),n):(n.push(r+n[n.length-1]),n),[]),ge=e=>NI(e,t=>Math.abs(t)<=180?t:t-360*Math.sign(t));var pe=[-.14861,1.78277,-.29227,-.90649,1.97294,0],rf=Math.PI/180,of=180/Math.PI;var sf=pe[3]*pe[4],af=pe[1]*pe[4],lf=pe[1]*pe[2]-pe[0]*pe[3],CI=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(lf*n+e*sf-t*af)/(lf+sf-af),o=n-i,s=(pe[4]*(t-i)-pe[2]*o)/pe[3],a={mode:"cubehelix",l:i,s:i===0||i===1?void 0:Math.sqrt(o*o+s*s)/(pe[4]*i*(1-i))};return a.s&&(a.h=Math.atan2(s,o)*of-120),r!==void 0&&(a.alpha=r),a},uf=CI;var OI=({h:e,s:t,l:n,alpha:r})=>{let i={mode:"rgb"};e=(e===void 0?0:e+120)*rf,n===void 0&&(n=0);let o=t===void 0?0:t*n*(1-n),s=Math.cos(e),a=Math.sin(e);return i.r=n+o*(pe[0]*s+pe[1]*a),i.g=n+o*(pe[2]*s+pe[3]*a),i.b=n+o*(pe[4]*s+pe[5]*a),r!==void 0&&(i.alpha=r),i},cf=OI;var yt=(e,t)=>{if(e.h===void 0||t.h===void 0||!e.s||!t.s)return 0;let n=Q(e.h),r=Q(t.h),i=Math.sin((r-n+360)/2*Math.PI/180);return 2*Math.sqrt(e.s*t.s)*i},Xs=(e,t)=>{if(e.h===void 0||t.h===void 0)return 0;let n=Q(e.h),r=Q(t.h);return Math.abs(r-n)>180?n-(r-360*Math.sign(r-n)):r-n},It=(e,t)=>{if(e.h===void 0||t.h===void 0||!e.c||!t.c)return 0;let n=Q(e.h),r=Q(t.h),i=Math.sin((r-n+360)/2*Math.PI/180);return 2*Math.sqrt(e.c*t.c)*i},pr=(e="rgb",t=[1,1,1,0])=>{let n=gt(e),r=n.channels,i=n.difference,o=he(e);return(s,a)=>{let l=o(s),u=o(a);return Math.sqrt(r.reduce((c,f,p)=>{let d=i[f]?i[f](l,u):l[f]-u[f];return c+(t[p]||0)*Math.pow(isNaN(d)?0:d,2)},0))}};var ye=e=>{let t=e.reduce((r,i)=>{if(i!==void 0){let o=i*Math.PI/180;r.sin+=Math.sin(o),r.cos+=Math.cos(o)}return r},{sin:0,cos:0}),n=Math.atan2(t.sin,t.cos)*180/Math.PI;return n<0?360+n:n};var DI={mode:"cubehelix",channels:["h","s","l","alpha"],parse:["--cubehelix"],serialize:"--cubehelix",ranges:{h:[0,360],s:[0,4.614],l:[0,1]},fromMode:{rgb:uf},toMode:{rgb:cf},interpolate:{h:{use:w,fixup:ge},s:w,l:w,alpha:{use:w,fixup:Y}},difference:{h:yt},average:{h:ye}},ff=DI;var RI=({l:e,a:t,b:n,alpha:r},i="lch")=>{t===void 0&&(t=0),n===void 0&&(n=0);let o=Math.sqrt(t*t+n*n),s={mode:i,l:e,c:o};return o&&(s.h=Q(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(s.alpha=r),s},we=RI;var MI=({l:e,c:t,h:n,alpha:r},i="lab")=>{n===void 0&&(n=0);let o={mode:i,l:e,a:t?t*Math.cos(n/180*Math.PI):0,b:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(o.alpha=r),o},ke=MI;var Ni=Math.pow(29,3)/Math.pow(3,3),Ci=Math.pow(6,3)/Math.pow(29,3);var se={X:.9642956764295677,Y:1,Z:.8251046025104602},Mt={X:.3127/.329,Y:1,Z:(1-.3127-.329)/.329},xD=Math.pow(29,3)/Math.pow(3,3),ND=Math.pow(6,3)/Math.pow(29,3);var js=e=>Math.pow(e,3)>Ci?Math.pow(e,3):(116*e-16)/Ni,PI=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+16)/116,o=t/500+i,s=i-n/200,a={mode:"xyz65",x:js(o)*Mt.X,y:js(i)*Mt.Y,z:js(s)*Mt.Z};return r!==void 0&&(a.alpha=r),a},Oi=PI;var wI=e=>De(Oi(e)),Pt=wI;var $s=e=>e>Ci?Math.cbrt(e):(Ni*e+16)/116,kI=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=$s(e/Mt.X),o=$s(t/Mt.Y),s=$s(n/Mt.Z),a={mode:"lab65",l:116*o-16,a:500*(i-o),b:200*(o-s)};return r!==void 0&&(a.alpha=r),a},Di=kI;var LI=e=>{let t=Di(Oe(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},wt=LI;var Kt=.14444444444444443*Math.PI,En=Math.cos(Kt),An=Math.sin(Kt),Ri=100/Math.log(139/100);var _I=({l:e,c:t,h:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"lab65",l:(Math.exp(e*1/Ri)-1)/.0039},o=(Math.exp(.0435*t*1*1)-1)/.075,s=o*Math.cos(n/180*Math.PI-Kt),a=o*Math.sin(n/180*Math.PI-Kt);return i.a=s*En-a/.83*An,i.b=s*An+a/.83*En,r!==void 0&&(i.alpha=r),i},hr=_I;var VI=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=t*En+n*An,o=.83*(n*En-t*An),s=Math.sqrt(i*i+o*o),a={mode:"dlch",l:Ri/1*Math.log(1+.0039*e),c:Math.log(1+.075*s)/(.0435*1*1)};return a.c&&(a.h=Q((Math.atan2(o,i)+Kt)/Math.PI*180)),r!==void 0&&(a.alpha=r),a},gr=VI;var df=e=>hr(we(e,"dlch")),pf=e=>ke(gr(e),"dlab"),FI={mode:"dlab",parse:["--din99o-lab"],serialize:"--din99o-lab",toMode:{lab65:df,rgb:e=>Pt(df(e))},fromMode:{lab65:pf,rgb:e=>pf(wt(e))},channels:["l","a","b","alpha"],ranges:{l:[0,100],a:[-40.09,45.501],b:[-40.469,44.344]},interpolate:{l:w,a:w,b:w,alpha:{use:w,fixup:Y}}},mf=FI;var GI={mode:"dlch",parse:["--din99o-lch"],serialize:"--din99o-lch",toMode:{lab65:hr,dlab:e=>ke(e,"dlab"),rgb:e=>Pt(hr(e))},fromMode:{lab65:gr,dlab:e=>we(e,"dlch"),rgb:e=>gr(wt(e))},channels:["l","c","h","alpha"],ranges:{l:[0,100],c:[0,51.484],h:[0,360]},interpolate:{l:w,c:w,h:{use:w,fixup:ge},alpha:{use:w,fixup:Y}},difference:{h:It},average:{h:ye}},hf=GI;function Ys({h:e,s:t,i:n,alpha:r}){e=Q(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o={r:n*(1+t*(3/(2-i)-1)),g:n*(1+t*(3*(1-i)/(2-i)-1)),b:n*(1-t)};break;case 1:o={r:n*(1+t*(3*(1-i)/(2-i)-1)),g:n*(1+t*(3/(2-i)-1)),b:n*(1-t)};break;case 2:o={r:n*(1-t),g:n*(1+t*(3/(2-i)-1)),b:n*(1+t*(3*(1-i)/(2-i)-1))};break;case 3:o={r:n*(1-t),g:n*(1+t*(3*(1-i)/(2-i)-1)),b:n*(1+t*(3/(2-i)-1))};break;case 4:o={r:n*(1+t*(3*(1-i)/(2-i)-1)),g:n*(1-t),b:n*(1+t*(3/(2-i)-1))};break;case 5:o={r:n*(1+t*(3/(2-i)-1)),g:n*(1-t),b:n*(1+t*(3*(1-i)/(2-i)-1))};break;default:o={r:n*(1-t),g:n*(1-t),b:n*(1-t)}}return o.mode="rgb",r!==void 0&&(o.alpha=r),o}function qs({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsi",s:e+t+n===0?0:1-3*o/(e+t+n),i:(e+t+n)/3};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var BI={mode:"hsi",toMode:{rgb:Ys},parse:["--hsi"],serialize:"--hsi",fromMode:{rgb:qs},channels:["h","s","i","alpha"],ranges:{h:[0,360]},gamut:"rgb",interpolate:{h:{use:w,fixup:ge},s:w,i:w,alpha:{use:w,fixup:Y}},difference:{h:yt},average:{h:ye}},gf=BI;function Js({h:e,s:t,l:n,alpha:r}){e=Q(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=n+t*(n<.5?n:1-n),o=i-(i-n)*2*Math.abs(e/60%2-1),s;switch(Math.floor(e/60)){case 0:s={r:i,g:o,b:2*n-i};break;case 1:s={r:o,g:i,b:2*n-i};break;case 2:s={r:2*n-i,g:i,b:o};break;case 3:s={r:2*n-i,g:o,b:i};break;case 4:s={r:o,g:2*n-i,b:i};break;case 5:s={r:i,g:2*n-i,b:o};break;default:s={r:2*n-i,g:2*n-i,b:2*n-i}}return s.mode="rgb",r!==void 0&&(s.alpha=r),s}function Zs({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsl",s:i===o?0:(i-o)/(1-Math.abs(i+o-1)),l:.5*(i+o)};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var UI=(e,t)=>{switch(t){case"deg":return+e;case"rad":return e/Math.PI*180;case"grad":return e/10*9;case"turn":return e*360}},yf=UI;var zI=new RegExp(`^hsla?\\(\\s*${Kc}${Rt}${$t}${Rt}${$t}\\s*(?:,\\s*${cr}\\s*)?\\)$`),HI=e=>{let t=e.match(zI);if(!t)return;let n={mode:"hsl"};return t[3]!==void 0?n.h=+t[3]:t[1]!==void 0&&t[2]!==void 0&&(n.h=yf(t[1],t[2])),t[4]!==void 0&&(n.s=Math.min(Math.max(0,t[4]/100),1)),t[5]!==void 0&&(n.l=Math.min(Math.max(0,t[5]/100),1)),t[6]!==void 0?n.alpha=Math.max(0,Math.min(1,t[6]/100)):t[7]!==void 0&&(n.alpha=Math.max(0,Math.min(1,+t[7]))),n},If=HI;function WI(e,t){if(!t||t[0]!=="hsl"&&t[0]!=="hsla")return;let n={mode:"hsl"},[,r,i,o,s]=t;if(r.type!==P.None){if(r.type===P.Percentage)return;n.h=r.value}if(i.type!==P.None){if(i.type===P.Hue)return;n.s=i.value/100}if(o.type!==P.None){if(o.type===P.Hue)return;n.l=o.value/100}return s.type!==P.None&&(n.alpha=Math.min(1,Math.max(0,s.type===P.Number?s.value:s.value/100))),n}var vf=WI;var XI={mode:"hsl",toMode:{rgb:Js},fromMode:{rgb:Zs},channels:["h","s","l","alpha"],ranges:{h:[0,360]},gamut:"rgb",parse:[vf,If],serialize:e=>`hsl(${e.h!==void 0?e.h:"none"} ${e.s!==void 0?e.s*100+"%":"none"} ${e.l!==void 0?e.l*100+"%":"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:w,fixup:ge},s:w,l:w,alpha:{use:w,fixup:Y}},difference:{h:yt},average:{h:ye}},Mi=XI;function yr({h:e,s:t,v:n,alpha:r}){e=Q(e!==void 0?e:0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.abs(e/60%2-1),o;switch(Math.floor(e/60)){case 0:o={r:n,g:n*(1-t*i),b:n*(1-t)};break;case 1:o={r:n*(1-t*i),g:n,b:n*(1-t)};break;case 2:o={r:n*(1-t),g:n,b:n*(1-t*i)};break;case 3:o={r:n*(1-t),g:n*(1-t*i),b:n};break;case 4:o={r:n*(1-t*i),g:n*(1-t),b:n};break;case 5:o={r:n,g:n*(1-t),b:n*(1-t*i)};break;default:o={r:n*(1-t),g:n*(1-t),b:n*(1-t)}}return o.mode="rgb",r!==void 0&&(o.alpha=r),o}function Ir({r:e,g:t,b:n,alpha:r}){e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.max(e,t,n),o=Math.min(e,t,n),s={mode:"hsv",s:i===0?0:1-o/i,v:i};return i-o!==0&&(s.h=(i===e?(t-n)/(i-o)+(t<n)*6:i===t?(n-e)/(i-o)+2:(e-t)/(i-o)+4)*60),r!==void 0&&(s.alpha=r),s}var jI={mode:"hsv",toMode:{rgb:yr},parse:["--hsv"],serialize:"--hsv",fromMode:{rgb:Ir},channels:["h","s","v","alpha"],ranges:{h:[0,360]},gamut:"rgb",interpolate:{h:{use:w,fixup:ge},s:w,v:w,alpha:{use:w,fixup:Y}},difference:{h:yt},average:{h:ye}},Pi=jI;function Qs({h:e,w:t,b:n,alpha:r}){if(t===void 0&&(t=0),n===void 0&&(n=0),t+n>1){let i=t+n;t/=i,n/=i}return yr({h:e,s:n===1?1:1-t/(1-n),v:1-n,alpha:r})}function ea(e){let t=Ir(e);if(t===void 0)return;let n=t.s!==void 0?t.s:0,r=t.v!==void 0?t.v:0,i={mode:"hwb",w:(1-n)*r,b:1-r};return t.h!==void 0&&(i.h=t.h),t.alpha!==void 0&&(i.alpha=t.alpha),i}function $I(e,t){if(!t||t[0]!=="hwb")return;let n={mode:"hwb"},[,r,i,o,s]=t;if(r.type!==P.None){if(r.type===P.Percentage)return;n.h=r.value}if(i.type!==P.None){if(i.type===P.Hue)return;n.w=i.value/100}if(o.type!==P.None){if(o.type===P.Hue)return;n.b=o.value/100}return s.type!==P.None&&(n.alpha=Math.min(1,Math.max(0,s.type===P.Number?s.value:s.value/100))),n}var Tf=$I;var KI={mode:"hwb",toMode:{rgb:Qs},fromMode:{rgb:ea},channels:["h","w","b","alpha"],ranges:{h:[0,360]},gamut:"rgb",parse:[Tf],serialize:e=>`hwb(${e.h!==void 0?e.h:"none"} ${e.w!==void 0?e.w*100+"%":"none"} ${e.b!==void 0?e.b*100+"%":"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:w,fixup:ge},w,b:w,alpha:{use:w,fixup:Y}},difference:{h:Xs},average:{h:ye}},Sf=KI;var xn=.1593017578125,bf=78.84375,Nn=.8359375,Cn=18.8515625,On=18.6875;function wi(e){if(e<0)return 0;let t=Math.pow(e,1/bf);return 1e4*Math.pow(Math.max(0,t-Nn)/(Cn-On*t),1/xn)}function ki(e){if(e<0)return 0;let t=Math.pow(e/1e4,xn);return Math.pow((Nn+Cn*t)/(1+On*t),bf)}var ta=e=>Math.max(e/203,0),qI=({i:e,t,p:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=wi(e+.008609037037932761*t+.11102962500302593*n),o=wi(e-.00860903703793275*t-.11102962500302599*n),s=wi(e+.5600313357106791*t-.32062717498731885*n),a={mode:"xyz65",x:ta(2.070152218389422*i-1.3263473389671556*o+.2066510476294051*s),y:ta(.3647385209748074*i+.680566024947227*o-.0453045459220346*s),z:ta(-.049747207535812*i-.0492609666966138*o+1.1880659249923042*s)};return r!==void 0&&(a.alpha=r),a},na=qI;var ra=(e=0)=>Math.max(e*203,0),JI=({x:e,y:t,z:n,alpha:r})=>{let i=ra(e),o=ra(t),s=ra(n),a=ki(.3592832590121217*i+.6976051147779502*o-.0358915932320289*s),l=ki(-.1920808463704995*i+1.1004767970374323*o+.0753748658519118*s),u=ki(.0070797844607477*i+.0748396662186366*o+.8433265453898765*s),c=.5*a+.5*l,f=1.61376953125*a-3.323486328125*l+1.709716796875*u,p=4.378173828125*a-4.24560546875*l-.132568359375*u,d={mode:"itp",i:c,t:f,p};return r!==void 0&&(d.alpha=r),d},ia=JI;var ZI={mode:"itp",channels:["i","t","p","alpha"],parse:["--ictcp"],serialize:"--ictcp",toMode:{xyz65:na,rgb:e=>De(na(e))},fromMode:{xyz65:ia,rgb:e=>ia(Oe(e))},ranges:{i:[0,.581],t:[-.369,.272],p:[-.164,.331]},interpolate:{i:w,t:w,p:w,alpha:{use:w,fixup:Y}}},Ef=ZI;var QI=134.03437499999998,ev=16295499532821565e-27,oa=e=>{if(e<0)return 0;let t=Math.pow(e/1e4,xn);return Math.pow((Nn+Cn*t)/(1+On*t),QI)},sa=(e=0)=>Math.max(e*203,0),tv=({x:e,y:t,z:n,alpha:r})=>{e=sa(e),t=sa(t),n=sa(n);let i=1.15*e-.15*n,o=.66*t+.34*e,s=oa(.41478972*i+.579999*o+.014648*n),a=oa(-.20151*i+1.120649*o+.0531008*n),l=oa(-.0166008*i+.2648*o+.6684799*n),u=(s+a)/2,c={mode:"jab",j:.44*u/(1-.56*u)-ev,a:3.524*s-4.066708*a+.542708*l,b:.199076*s+1.096799*a-1.295875*l};return r!==void 0&&(c.alpha=r),c},Li=tv;var nv=134.03437499999998,Af=16295499532821565e-27,aa=e=>{if(e<0)return 0;let t=Math.pow(e,1/nv);return 1e4*Math.pow((Nn-t)/(On*t-Cn),1/xn)},la=e=>e/203,rv=({j:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+Af)/(.44+.56*(e+Af)),o=aa(i+.13860504*t+.058047316*n),s=aa(i-.13860504*t-.058047316*n),a=aa(i-.096019242*t-.8118919*n),l={mode:"xyz65",x:la(1.661373024652174*o-.914523081304348*s+.23136208173913045*a),y:la(-.3250758611844533*o+1.571847026732543*s-.21825383453227928*a),z:la(-.090982811*o-.31272829*s+1.5227666*a)};return r!==void 0&&(l.alpha=r),l},_i=rv;var iv=e=>{let t=Li(Oe(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},Vi=iv;var ov=e=>De(_i(e)),Fi=ov;var sv={mode:"jab",channels:["j","a","b","alpha"],parse:["--jzazbz"],serialize:"--jzazbz",fromMode:{rgb:Vi,xyz65:Li},toMode:{rgb:Fi,xyz65:_i},ranges:{j:[0,.222],a:[-.109,.129],b:[-.185,.134]},interpolate:{j:w,a:w,b:w,alpha:{use:w,fixup:Y}}},xf=sv;var av=({j:e,a:t,b:n,alpha:r})=>{t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.sqrt(t*t+n*n),o={mode:"jch",j:e,c:i};return i&&(o.h=Q(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(o.alpha=r),o},ua=av;var lv=({j:e,c:t,h:n,alpha:r})=>{n===void 0&&(n=0);let i={mode:"jab",j:e,a:t?t*Math.cos(n/180*Math.PI):0,b:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(i.alpha=r),i},ca=lv;var uv={mode:"jch",parse:["--jzczhz"],serialize:"--jzczhz",toMode:{jab:ca,rgb:e=>Fi(ca(e))},fromMode:{rgb:e=>ua(Vi(e)),jab:ua},channels:["j","c","h","alpha"],ranges:{j:[0,.221],c:[0,.19],h:[0,360]},interpolate:{h:{use:w,fixup:ge},c:w,j:w,alpha:{use:w,fixup:Y}},difference:{h:It},average:{h:ye}},Nf=uv;var kt=Math.pow(29,3)/Math.pow(3,3),Dn=Math.pow(6,3)/Math.pow(29,3);var fa=e=>Math.pow(e,3)>Dn?Math.pow(e,3):(116*e-16)/kt,cv=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=(e+16)/116,o=t/500+i,s=i-n/200,a={mode:"xyz50",x:fa(o)*se.X,y:fa(i)*se.Y,z:fa(s)*se.Z};return r!==void 0&&(a.alpha=r),a},Rn=cv;var fv=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=ze({r:e*3.1341359569958707-t*1.6173863321612538-.4906619460083532*n,g:e*-.978795502912089+t*1.916254567259524+.03344273116131949*n,b:e*.07195537988411677-t*.2289768264158322+1.405386058324125*n});return r!==void 0&&(i.alpha=r),i},ot=fv;var dv=e=>ot(Rn(e)),Gi=dv;var pv=e=>{let{r:t,g:n,b:r,alpha:i}=Ue(e),o={mode:"xyz50",x:.436065742824811*t+.3851514688337912*n+.14307845442264197*r,y:.22249319175623702*t+.7168870538238823*n+.06061979053616537*r,z:.013923904500943465*t+.09708128566574634*n+.7140993584005155*r};return i!==void 0&&(o.alpha=i),o},st=pv;var da=e=>e>Dn?Math.cbrt(e):(kt*e+16)/116,mv=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=da(e/se.X),o=da(t/se.Y),s=da(n/se.Z),a={mode:"lab",l:116*o-16,a:500*(i-o),b:200*(o-s)};return r!==void 0&&(a.alpha=r),a},Mn=mv;var hv=e=>{let t=Mn(st(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},Bi=hv;function gv(e,t){if(!t||t[0]!=="lab")return;let n={mode:"lab"},[,r,i,o,s]=t;if(!(r.type===P.Hue||i.type===P.Hue||o.type===P.Hue))return r.type!==P.None&&(n.l=Math.min(Math.max(0,r.value),100)),i.type!==P.None&&(n.a=i.type===P.Number?i.value:i.value*125/100),o.type!==P.None&&(n.b=o.type===P.Number?o.value:o.value*125/100),s.type!==P.None&&(n.alpha=Math.min(1,Math.max(0,s.type===P.Number?s.value:s.value/100))),n}var Cf=gv;var yv={mode:"lab",toMode:{xyz50:Rn,rgb:Gi},fromMode:{xyz50:Mn,rgb:Bi},channels:["l","a","b","alpha"],ranges:{l:[0,100],a:[-125,125],b:[-125,125]},parse:[Cf],serialize:e=>`lab(${e.l!==void 0?e.l:"none"} ${e.a!==void 0?e.a:"none"} ${e.b!==void 0?e.b:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{l:w,a:w,b:w,alpha:{use:w,fixup:Y}}},Pn=yv;var Iv={...Pn,mode:"lab65",parse:["--lab-d65"],serialize:"--lab-d65",toMode:{xyz65:Oi,rgb:Pt},fromMode:{xyz65:Di,rgb:wt},ranges:{l:[0,100],a:[-125,125],b:[-125,125]}},Of=Iv;function vv(e,t){if(!t||t[0]!=="lch")return;let n={mode:"lch"},[,r,i,o,s]=t;if(r.type!==P.None){if(r.type===P.Hue)return;n.l=Math.min(Math.max(0,r.value),100)}if(i.type!==P.None&&(n.c=Math.max(0,i.type===P.Number?i.value:i.value*150/100)),o.type!==P.None){if(o.type===P.Percentage)return;n.h=o.value}return s.type!==P.None&&(n.alpha=Math.min(1,Math.max(0,s.type===P.Number?s.value:s.value/100))),n}var Df=vv;var Tv={mode:"lch",toMode:{lab:ke,rgb:e=>Gi(ke(e))},fromMode:{rgb:e=>we(Bi(e)),lab:we},channels:["l","c","h","alpha"],ranges:{l:[0,100],c:[0,150],h:[0,360]},parse:[Df],serialize:e=>`lch(${e.l!==void 0?e.l:"none"} ${e.c!==void 0?e.c:"none"} ${e.h!==void 0?e.h:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,interpolate:{h:{use:w,fixup:ge},c:w,l:w,alpha:{use:w,fixup:Y}},difference:{h:It},average:{h:ye}},wn=Tv;var Sv={...wn,mode:"lch65",parse:["--lch-d65"],serialize:"--lch-d65",toMode:{lab65:e=>ke(e,"lab65"),rgb:e=>Pt(ke(e,"lab65"))},fromMode:{rgb:e=>we(wt(e),"lch65"),lab65:e=>we(e,"lch65")},ranges:{l:[0,100],c:[0,150],h:[0,360]}},Rf=Sv;var bv=({l:e,u:t,v:n,alpha:r})=>{t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.sqrt(t*t+n*n),o={mode:"lchuv",l:e,c:i};return i&&(o.h=Q(Math.atan2(n,t)*180/Math.PI)),r!==void 0&&(o.alpha=r),o},pa=bv;var Ev=({l:e,c:t,h:n,alpha:r})=>{n===void 0&&(n=0);let i={mode:"luv",l:e,u:t?t*Math.cos(n/180*Math.PI):0,v:t?t*Math.sin(n/180*Math.PI):0};return r!==void 0&&(i.alpha=r),i},ma=Ev;var Mf=(e,t,n)=>4*e/(e+15*t+3*n),Pf=(e,t,n)=>9*t/(e+15*t+3*n),Av=Mf(se.X,se.Y,se.Z),xv=Pf(se.X,se.Y,se.Z),Nv=e=>e<=Dn?kt*e:116*Math.cbrt(e)-16,Cv=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Nv(t/se.Y),o=Mf(e,t,n),s=Pf(e,t,n);!isFinite(o)||!isFinite(s)?i=o=s=0:(o=13*i*(o-Av),s=13*i*(s-xv));let a={mode:"luv",l:i,u:o,v:s};return r!==void 0&&(a.alpha=r),a},vr=Cv;var Ov=(e,t,n)=>4*e/(e+15*t+3*n),Dv=(e,t,n)=>9*t/(e+15*t+3*n),Rv=Ov(se.X,se.Y,se.Z),Mv=Dv(se.X,se.Y,se.Z),Pv=({l:e,u:t,v:n,alpha:r})=>{if(e===void 0&&(e=0),e===0)return{mode:"xyz50",x:0,y:0,z:0};t===void 0&&(t=0),n===void 0&&(n=0);let i=t/(13*e)+Rv,o=n/(13*e)+Mv,s=se.Y*(e<=8?e/kt:Math.pow((e+16)/116,3)),a=s*(9*i)/(4*o),l=s*(12-3*i-20*o)/(4*o),u={mode:"xyz50",x:a,y:s,z:l};return r!==void 0&&(u.alpha=r),u},Tr=Pv;var wv=e=>pa(vr(st(e))),kv=e=>ot(Tr(ma(e))),Lv={mode:"lchuv",toMode:{luv:ma,rgb:kv},fromMode:{rgb:wv,luv:pa},channels:["l","c","h","alpha"],parse:["--lchuv"],serialize:"--lchuv",ranges:{l:[0,100],c:[0,176.956],h:[0,360]},interpolate:{h:{use:w,fixup:ge},c:w,l:w,alpha:{use:w,fixup:Y}},difference:{h:It},average:{h:ye}},wf=Lv;var _v={...Be,mode:"lrgb",toMode:{rgb:ze},fromMode:{rgb:Ue},parse:["srgb-linear"],serialize:"srgb-linear"},kf=_v;var Vv={mode:"luv",toMode:{xyz50:Tr,rgb:e=>ot(Tr(e))},fromMode:{xyz50:vr,rgb:e=>vr(st(e))},channels:["l","u","v","alpha"],parse:["--luv"],serialize:"--luv",ranges:{l:[0,100],u:[-84.936,175.042],v:[-125.882,87.243]},interpolate:{l:w,u:w,v:w,alpha:{use:w,fixup:Y}}},Lf=Vv;var Fv=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.cbrt(.412221469470763*e+.5363325372617348*t+.0514459932675022*n),o=Math.cbrt(.2119034958178252*e+.6806995506452344*t+.1073969535369406*n),s=Math.cbrt(.0883024591900564*e+.2817188391361215*t+.6299787016738222*n),a={mode:"oklab",l:.210454268309314*i+.7936177747023054*o-.0040720430116193*s,a:1.9779985324311684*i-2.42859224204858*o+.450593709617411*s,b:.0259040424655478*i+.7827717124575296*o-.8086757549230774*s};return r!==void 0&&(a.alpha=r),a},Ui=Fv;var Gv=e=>{let t=Ui(Ue(e));return e.r===e.b&&e.b===e.g&&(t.a=t.b=0),t},Lt=Gv;var Bv=({l:e,a:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Math.pow(e+.3963377773761749*t+.2158037573099136*n,3),o=Math.pow(e-.1055613458156586*t-.0638541728258133*n,3),s=Math.pow(e-.0894841775298119*t-1.2914855480194092*n,3),a={mode:"lrgb",r:4.076741636075957*i-3.3077115392580616*o+.2309699031821044*s,g:-1.2684379732850317*i+2.6097573492876887*o-.3413193760026573*s,b:-.0041960761386756*i-.7034186179359362*o+1.7076146940746117*s};return r!==void 0&&(a.alpha=r),a},at=Bv;var Uv=e=>ze(at(e)),_t=Uv;function Sr(e){let r=1.170873786407767;return .5*(r*e-.206+Math.sqrt((r*e-.206)*(r*e-.206)+4*.03*r*e))}function Yt(e){return(e*e+.206*e)/(1.170873786407767*(e+.03))}function zv(e,t){let n,r,i,o,s,a,l,u;-1.88170328*e-.80936493*t>1?(n=1.19086277,r=1.76576728,i=.59662641,o=.75515197,s=.56771245,a=4.0767416621,l=-3.3077115913,u=.2309699292):1.81444104*e-1.19445276*t>1?(n=.73956515,r=-.45954404,i=.08285427,o=.1254107,s=.14503204,a=-1.2684380046,l=2.6097574011,u=-.3413193965):(n=1.35733652,r=-.00915799,i=-1.1513021,o=-.50559606,s=.00692167,a=-.0041960863,l=-.7034186147,u=1.707614701);let c=n+r*e+i*t+o*e*e+s*e*t,f=.3963377774*e+.2158037573*t,p=-.1055613458*e-.0638541728*t,d=-.0894841775*e-1.291485548*t;{let m=1+c*f,h=1+c*p,y=1+c*d,v=m*m*m,g=h*h*h,I=y*y*y,S=3*f*m*m,E=3*p*h*h,T=3*d*y*y,C=6*f*f*m,x=6*p*p*h,D=6*d*d*y,M=a*v+l*g+u*I,V=a*S+l*E+u*T,L=a*C+l*x+u*D;c=c-M*V/(V*V-.5*M*L)}return c}function ha(e,t){let n=zv(e,t),r=at({l:1,a:n*e,b:n*t}),i=Math.cbrt(1/Math.max(r.r,r.g,r.b)),o=i*n;return[i,o]}function Hv(e,t,n,r,i,o=null){o||(o=ha(e,t));let s;if((n-i)*o[1]-(o[0]-i)*r<=0)s=o[1]*i/(r*o[0]+o[1]*(i-n));else{s=o[1]*(i-1)/(r*(o[0]-1)+o[1]*(i-n));{let a=n-i,l=r,u=.3963377774*e+.2158037573*t,c=-.1055613458*e-.0638541728*t,f=-.0894841775*e-1.291485548*t,p=a+l*u,d=a+l*c,m=a+l*f;{let h=i*(1-s)+s*n,y=s*r,v=h+y*u,g=h+y*c,I=h+y*f,S=v*v*v,E=g*g*g,T=I*I*I,C=3*p*v*v,x=3*d*g*g,D=3*m*I*I,M=6*p*p*v,V=6*d*d*g,L=6*m*m*I,A=4.0767416621*S-3.3077115913*E+.2309699292*T-1,N=4.0767416621*C-3.3077115913*x+.2309699292*D,b=4.0767416621*M-3.3077115913*V+.2309699292*L,R=N/(N*N-.5*A*b),_=-A*R,O=-1.2684380046*S+2.6097574011*E-.3413193965*T-1,k=-1.2684380046*C+2.6097574011*x-.3413193965*D,U=-1.2684380046*M+2.6097574011*V-.3413193965*L,X=k/(k*k-.5*O*U),$=-O*X,j=-.0041960863*S-.7034186147*E+1.707614701*T-1,K=-.0041960863*C-.7034186147*x+1.707614701*D,B=-.0041960863*M-.7034186147*V+1.707614701*L,te=K/(K*K-.5*j*B),re=-j*te;_=R>=0?_:1e6,$=X>=0?$:1e6,re=te>=0?re:1e6,s+=Math.min(_,Math.min($,re))}}}return s}function br(e,t,n=null){n||(n=ha(e,t));let r=n[0],i=n[1];return[i/r,i/(1-r)]}function zi(e,t,n){let r=ha(t,n),i=Hv(t,n,e,1,e,r),o=br(t,n,r),s=.11516993+1/(7.4477897+4.1590124*n+t*(-2.19557347+1.75198401*n+t*(-2.13704948-10.02301043*n+t*(-4.24894561+5.38770819*n+4.69891013*t)))),a=.11239642+1/(1.6132032-.68124379*n+t*(.40370612+.90148123*n+t*(-.27087943+.6122399*n+t*(.00299215-.45399568*n-.14661872*t)))),l=i/Math.min(e*o[0],(1-e)*o[1]),u=e*s,c=(1-e)*a,f=.9*l*Math.sqrt(Math.sqrt(1/(1/(u*u*u*u)+1/(c*c*c*c))));return u=e*.4,c=(1-e)*.8,[Math.sqrt(1/(1/(u*u)+1/(c*c))),f,i]}function Hi(e){let t=e.l!==void 0?e.l:0,n=e.a!==void 0?e.a:0,r=e.b!==void 0?e.b:0,i={mode:"okhsl",l:Sr(t)};e.alpha!==void 0&&(i.alpha=e.alpha);let o=Math.sqrt(n*n+r*r);if(!o)return i.s=0,i;let[s,a,l]=zi(t,n/o,r/o),u;if(o<a){let c=0,f=.8*s,p=1-f/a;u=(o-c)/(f+p*(o-c))*.8}else{let c=a,f=.2*a*a*1.25*1.25/s,p=1-f/(l-a);u=.8+.2*((o-c)/(f+p*(o-c)))}return u&&(i.s=u,i.h=Q(Math.atan2(r,n)*180/Math.PI)),i}function Wi(e){let t=e.h!==void 0?e.h:0,n=e.s!==void 0?e.s:0,r=e.l!==void 0?e.l:0,i={mode:"oklab",l:Yt(r)};if(e.alpha!==void 0&&(i.alpha=e.alpha),!n||r===1)return i.a=i.b=0,i;let o=Math.cos(t/180*Math.PI),s=Math.sin(t/180*Math.PI),[a,l,u]=zi(i.l,o,s),c,f,p,d;n<.8?(c=1.25*n,f=0,p=.8*a,d=1-p/l):(c=5*(n-.8),f=l,p=.2*l*l*1.25*1.25/a,d=1-p/(u-l));let m=f+c*p/(1-d*c);return i.a=m*o,i.b=m*s,i}var Wv={...Mi,mode:"okhsl",channels:["h","s","l","alpha"],parse:["--okhsl"],serialize:"--okhsl",fromMode:{oklab:Hi,rgb:e=>Hi(Lt(e))},toMode:{oklab:Wi,rgb:e=>_t(Wi(e))}},_f=Wv;function Xi(e){let t=e.l!==void 0?e.l:0,n=e.a!==void 0?e.a:0,r=e.b!==void 0?e.b:0,i=Math.sqrt(n*n+r*r),o=i?n/i:1,s=i?r/i:1,[a,l]=br(o,s),u=.5,c=1-u/a,f=l/(i+t*l),p=f*t,d=f*i,m=Yt(p),h=d*m/p,y=at({l:m,a:o*h,b:s*h}),v=Math.cbrt(1/Math.max(y.r,y.g,y.b,0));t=t/v,i=i/v*Sr(t)/t,t=Sr(t);let g={mode:"okhsv",s:i?(u+l)*d/(l*u+l*c*d):0,v:t?t/p:0};return g.s&&(g.h=Q(Math.atan2(r,n)*180/Math.PI)),e.alpha!==void 0&&(g.alpha=e.alpha),g}function ji(e){let t={mode:"oklab"};e.alpha!==void 0&&(t.alpha=e.alpha);let n=e.h!==void 0?e.h:0,r=e.s!==void 0?e.s:0,i=e.v!==void 0?e.v:0,o=Math.cos(n/180*Math.PI),s=Math.sin(n/180*Math.PI),[a,l]=br(o,s),u=.5,c=1-u/a,f=1-r*u/(u+l-l*c*r),p=r*l*u/(u+l-l*c*r),d=Yt(f),m=p*d/f,h=at({l:d,a:o*m,b:s*m}),y=Math.cbrt(1/Math.max(h.r,h.g,h.b,0)),v=Yt(i*f),g=p*v/f;return t.l=v*y,t.a=g*o*y,t.b=g*s*y,t}var Xv={...Pi,mode:"okhsv",channels:["h","s","v","alpha"],parse:["--okhsv"],serialize:"--okhsv",fromMode:{oklab:Xi,rgb:e=>Xi(Lt(e))},toMode:{oklab:ji,rgb:e=>_t(ji(e))}},Vf=Xv;function jv(e,t){if(!t||t[0]!=="oklab")return;let n={mode:"oklab"},[,r,i,o,s]=t;if(!(r.type===P.Hue||i.type===P.Hue||o.type===P.Hue))return r.type!==P.None&&(n.l=Math.min(Math.max(0,r.type===P.Number?r.value:r.value/100),1)),i.type!==P.None&&(n.a=i.type===P.Number?i.value:i.value*.4/100),o.type!==P.None&&(n.b=o.type===P.Number?o.value:o.value*.4/100),s.type!==P.None&&(n.alpha=Math.min(1,Math.max(0,s.type===P.Number?s.value:s.value/100))),n}var Ff=jv;var $v={...Pn,mode:"oklab",toMode:{lrgb:at,rgb:_t},fromMode:{lrgb:Ui,rgb:Lt},ranges:{l:[0,1],a:[-.4,.4],b:[-.4,.4]},parse:[Ff],serialize:e=>`oklab(${e.l!==void 0?e.l:"none"} ${e.a!==void 0?e.a:"none"} ${e.b!==void 0?e.b:"none"}${e.alpha<1?` / ${e.alpha}`:""})`},Gf=$v;function Kv(e,t){if(!t||t[0]!=="oklch")return;let n={mode:"oklch"},[,r,i,o,s]=t;if(r.type!==P.None){if(r.type===P.Hue)return;n.l=Math.min(Math.max(0,r.type===P.Number?r.value:r.value/100),1)}if(i.type!==P.None&&(n.c=Math.max(0,i.type===P.Number?i.value:i.value*.4/100)),o.type!==P.None){if(o.type===P.Percentage)return;n.h=o.value}return s.type!==P.None&&(n.alpha=Math.min(1,Math.max(0,s.type===P.Number?s.value:s.value/100))),n}var Bf=Kv;var Yv={...wn,mode:"oklch",toMode:{oklab:e=>ke(e,"oklab"),rgb:e=>_t(ke(e,"oklab"))},fromMode:{rgb:e=>we(Lt(e),"oklch"),oklab:e=>we(e,"oklch")},parse:[Bf],serialize:e=>`oklch(${e.l!==void 0?e.l:"none"} ${e.c!==void 0?e.c:"none"} ${e.h!==void 0?e.h:"none"}${e.alpha<1?` / ${e.alpha}`:""})`,ranges:{l:[0,1],c:[0,.4],h:[0,360]}},Uf=Yv;var qv=e=>{let{r:t,g:n,b:r,alpha:i}=Ue(e),o={mode:"xyz65",x:.486570948648216*t+.265667693169093*n+.1982172852343625*r,y:.2289745640697487*t+.6917385218365062*n+.079286914093745*r,z:0*t+.0451133818589026*n+1.043944368900976*r};return i!==void 0&&(o.alpha=i),o},ga=qv;var Jv=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=ze({r:e*2.4934969119414263-t*.9313836179191242-.402710784450717*n,g:e*-.8294889695615749+t*1.7626640603183465+.0236246858419436*n,b:e*.0358458302437845-t*.0761723892680418+.9568845240076871*n},"p3");return r!==void 0&&(i.alpha=r),i},ya=Jv;var Zv={...Be,mode:"p3",parse:["display-p3"],serialize:"display-p3",fromMode:{rgb:e=>ya(Oe(e)),xyz65:ya},toMode:{rgb:e=>De(ga(e)),xyz65:ga}},zf=Zv;var Ia=e=>{let t=Math.abs(e);return t>=.001953125?Math.sign(e)*Math.pow(t,.5555555555555556):16*e},Qv=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"prophoto",r:Ia(e*1.3457868816471585-t*.2555720873797946-.0511018649755453*n),g:Ia(e*-.5446307051249019+t*1.5082477428451466+.0205274474364214*n),b:Ia(e*0+t*0+1.2119675456389452*n)};return r!==void 0&&(i.alpha=r),i},va=Qv;var Ta=(e=0)=>{let t=Math.abs(e);return t>=.03125?Math.sign(e)*Math.pow(t,1.8):e/16},eT=e=>{let t=Ta(e.r),n=Ta(e.g),r=Ta(e.b),i={mode:"xyz50",x:.7977666449006423*t+.1351812974005331*n+.0313477341283922*r,y:.2880748288194013*t+.7118352342418731*n+899369387256e-16*r,z:0*t+0*n+.8251046025104602*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},Sa=eT;var tT={...Be,mode:"prophoto",parse:["prophoto-rgb"],serialize:"prophoto-rgb",fromMode:{xyz50:va,rgb:e=>va(st(e))},toMode:{xyz50:Sa,rgb:e=>ot(Sa(e))}},Hf=tT;var Wf=1.09929682680944,nT=.018053968510807,ba=e=>{let t=Math.abs(e);return t>nT?(Math.sign(e)||1)*(Wf*Math.pow(t,.45)-(Wf-1)):4.5*e},rT=({x:e,y:t,z:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"rec2020",r:ba(e*1.7166511879712683-t*.3556707837763925-.2533662813736599*n),g:ba(e*-.6666843518324893+t*1.6164812366349395+.0157685458139111*n),b:ba(e*.0176398574453108-t*.0427706132578085+.9421031212354739*n)};return r!==void 0&&(i.alpha=r),i},Ea=rT;var Xf=1.09929682680944,iT=.018053968510807,Aa=(e=0)=>{let t=Math.abs(e);return t<iT*4.5?e/4.5:(Math.sign(e)||1)*Math.pow((t+Xf-1)/Xf,1/.45)},oT=e=>{let t=Aa(e.r),n=Aa(e.g),r=Aa(e.b),i={mode:"xyz65",x:.6369580483012911*t+.1446169035862083*n+.1688809751641721*r,y:.262700212011267*t+.6779980715188708*n+.059301716469862*r,z:0*t+.0280726930490874*n+1.0609850577107909*r};return e.alpha!==void 0&&(i.alpha=e.alpha),i},xa=oT;var sT={...Be,mode:"rec2020",fromMode:{xyz65:Ea,rgb:e=>Ea(Oe(e))},toMode:{xyz65:xa,rgb:e=>De(xa(e))},parse:["rec2020"],serialize:"rec2020"},jf=sT;var vt=.0037930732552754493,$i=Math.cbrt(vt);var Na=e=>Math.cbrt(e)-$i,aT=e=>{let{r:t,g:n,b:r,alpha:i}=Ue(e),o=Na(.3*t+.622*n+.078*r+vt),s=Na(.23*t+.692*n+.078*r+vt),a=Na(.2434226892454782*t+.2047674442449682*n+.5518098665095535*r+vt),l={mode:"xyb",x:(o-s)/2,y:(o+s)/2,b:a-(o+s)/2};return i!==void 0&&(l.alpha=i),l},$f=aT;var Ca=e=>Math.pow(e+$i,3),lT=({x:e,y:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i=Ca(e+t)-vt,o=Ca(t-e)-vt,s=Ca(n+t)-vt,a=ze({r:11.031566904639861*i-9.866943908131562*o-.16462299650829934*s,g:-3.2541473810744237*i+4.418770377582723*o-.16462299650829934*s,b:-3.6588512867136815*i+2.7129230459360922*o+1.9459282407775895*s});return r!==void 0&&(a.alpha=r),a},Kf=lT;var uT={mode:"xyb",channels:["x","y","b","alpha"],parse:["--xyb"],serialize:"--xyb",toMode:{rgb:Kf},fromMode:{rgb:$f},ranges:{x:[-.0154,.0281],y:[0,.8453],b:[-.2778,.388]},interpolate:{x:w,y:w,b:w,alpha:{use:w,fixup:Y}}},Yf=uT;var cT={mode:"xyz50",parse:["xyz-d50"],serialize:"xyz-d50",toMode:{rgb:ot,lab:Mn},fromMode:{rgb:st,lab:Rn},channels:["x","y","z","alpha"],ranges:{x:[0,.964],y:[0,.999],z:[0,.825]},interpolate:{x:w,y:w,z:w,alpha:{use:w,fixup:Y}}},qf=cT;var fT=e=>{let{x:t,y:n,z:r,alpha:i}=e;t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=0);let o={mode:"xyz50",x:1.0479298208405488*t+.0229467933410191*n-.0501922295431356*r,y:.0296278156881593*t+.990434484573249*n-.0170738250293851*r,z:-.0092430581525912*t+.0150551448965779*n+.7518742899580008*r};return i!==void 0&&(o.alpha=i),o},Jf=fT;var dT=e=>{let{x:t,y:n,z:r,alpha:i}=e;t===void 0&&(t=0),n===void 0&&(n=0),r===void 0&&(r=0);let o={mode:"xyz65",x:.9554734527042182*t-.0230985368742614*n+.0632593086610217*r,y:-.0283697069632081*t+1.0099954580058226*n+.021041398966943*r,z:.0123140016883199*t-.0205076964334779*n+1.3303659366080753*r};return i!==void 0&&(o.alpha=i),o},Zf=dT;var pT={mode:"xyz65",toMode:{rgb:De,xyz50:Jf},fromMode:{rgb:Oe,xyz50:Zf},ranges:{x:[0,.95],y:[0,1],z:[0,1.088]},channels:["x","y","z","alpha"],parse:["xyz","xyz-d65"],serialize:"xyz-d65",interpolate:{x:w,y:w,z:w,alpha:{use:w,fixup:Y}}},Qf=pT;var mT=({r:e,g:t,b:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"yiq",y:.29889531*e+.58662247*t+.11448223*n,i:.59597799*e-.2741761*t-.32180189*n,q:.21147017*e-.52261711*t+.31114694*n};return r!==void 0&&(i.alpha=r),i},ed=mT;var hT=({y:e,i:t,q:n,alpha:r})=>{e===void 0&&(e=0),t===void 0&&(t=0),n===void 0&&(n=0);let i={mode:"rgb",r:e+.95608445*t+.6208885*n,g:e-.27137664*t-.6486059*n,b:e-1.10561724*t+1.70250126*n};return r!==void 0&&(i.alpha=r),i},td=hT;var gT={mode:"yiq",toMode:{rgb:td},fromMode:{rgb:ed},channels:["y","i","q","alpha"],parse:["--yiq"],serialize:"--yiq",ranges:{i:[-.595,.595],q:[-.522,.522]},interpolate:{y:w,i:w,q:w,alpha:{use:w,fixup:Y}}},nd=gT;var zk=he("rgb"),yT=e=>{let t={mode:e.mode,r:Math.max(0,Math.min(e.r!==void 0?e.r:0,1)),g:Math.max(0,Math.min(e.g!==void 0?e.g:0,1)),b:Math.max(0,Math.min(e.b!==void 0?e.b:0,1))};return e.alpha!==void 0&&(t.alpha=e.alpha),t};var IT=e=>e!==void 0&&(e.r===void 0||e.r>=0&&e.r<=1)&&(e.g===void 0||e.g>=0&&e.g<=1)&&(e.b===void 0||e.b>=0&&e.b<=1);function kn(e="rgb"){let{gamut:t}=gt(e);if(!t)return r=>!0;let n=he(typeof t=="string"?t:e);return r=>IT(n(r))}function rd(e="rgb"){let{gamut:t}=gt(e);if(!t)return o=>bn(o);let n=typeof t=="string"?t:e,r=he(n),i=kn(n);return o=>{let s=bn(o);if(!s)return;let a=r(s);if(i(a))return s;let l=yT(a);return s.mode===l.mode?l:he(s.mode)(l)}}function Ln(e="rgb",t="oklch",n=pr("oklch"),r=.02){let i=he(e),o=gt(e);if(!o.gamut)return c=>i(c);let s=kn(e),a=rd(e),l=he(t),{ranges:u}=gt(t);if(!u.l||!u.c)throw new Error("LCH-like space expected");return c=>{if(c=bn(c),c===void 0)return;let f={...l(c)};if(f.l===void 0&&(f.l=0),f.c===void 0&&(f.c=0),f.l>=u.l[1]){let y={...o.white,mode:e};return c.alpha!==void 0&&(y.alpha=c.alpha),y}if(f.l<=u.l[0]){let y={...o.black,mode:e};return c.alpha!==void 0&&(y.alpha=c.alpha),y}if(s(f))return i(f);let p=0,d=f.c,m=(u.c[1]-u.c[0])/4e3,h=a(f);for(;d-p>m;)f.c=(p+d)*.5,h=a(f),s(f)||n&&r>0&&n(f,h)<=r?p=f.c:d=f.c;return i(s(f)?f:h)}}var ML=Z(nf),PL=Z(ff),wL=Z(mf),kL=Z(hf),LL=Z(gf),_L=Z(Mi),VL=Z(Pi),FL=Z(Sf),GL=Z(Ef),BL=Z(xf),UL=Z(Nf),zL=Z(Pn),HL=Z(Of),WL=Z(wn),XL=Z(Rf),jL=Z(wf),$L=Z(kf),KL=Z(Lf),YL=Z(_f),qL=Z(Vf),JL=Z(Gf),ZL=Z(Uf),QL=Z(zf),e_=Z(Hf),t_=Z(jf),n_=Z(Be),r_=Z(Yf),i_=Z(qf),o_=Z(Qf),s_=Z(nd);var Vt={r:0,g:0,b:0,a:1};var _n="Inter",Er=4,qt=1;var id=["button","textField","textarea","numberField","toggle","switch","checkbox","radio","radioGroup","toggleGroup","slider","progress","tabs","collapsible","accordion"];var Ki,vT={lang:void 0,message:void 0,abortEarly:void 0,abortPipeEarly:void 0};function od(e){return!e&&!Ki?vT:{lang:e?.lang??Ki?.lang,message:e?.message,abortEarly:e?.abortEarly??Ki?.abortEarly,abortPipeEarly:e?.abortPipeEarly??Ki?.abortPipeEarly}}var TT;function ST(e){return TT?.get(e)}var bT;function ET(e){return bT?.get(e)}var AT;function xT(e,t){return AT?.get(e)?.get(t)}function Ar(e){let t=typeof e;return t==="string"?`"${e}"`:t==="number"||t==="bigint"||t==="boolean"?`${e}`:t==="object"||t==="function"?(e&&Object.getPrototypeOf(e)?.constructor?.name)??"null":t}function Ie(e,t,n,r,i){let o=i&&"input"in i?i.input:n.value,s=i?.expected??e.expects??null,a=i?.received??Ar(o),l={kind:e.kind,type:e.type,input:o,expected:s,received:a,message:`Invalid ${t}: ${s?`Expected ${s} but r`:"R"}eceived ${a}`,requirement:e.requirement,path:i?.path,issues:i?.issues,lang:r.lang,abortEarly:r.abortEarly,abortPipeEarly:r.abortPipeEarly},u=e.kind==="schema",c=i?.message??e.message??xT(e.reference,l.lang)??(u?ET(l.lang):null)??r.message??ST(l.lang);c!==void 0&&(l.message=typeof c=="function"?c(l):c),u&&(n.typed=!1),n.issues?n.issues.push(l):n.issues=[l]}function NT(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function CT(e,t){return Object.prototype.hasOwnProperty.call(e,t)&&t!=="__proto__"&&t!=="prototype"&&t!=="constructor"}function OT(e,t){let n=[...new Set(e)];return n.length>1?`(${n.join(` ${t} `)})`:n[0]??"never"}function Ae(e){return e["~standard"]={version:1,vendor:"valibot",validate:t=>e["~run"]({value:t},od())},e}function Yi(e,t){return{kind:"validation",type:"check",reference:Yi,async:!1,expects:null,requirement:e,message:t,"~run"(n,r){return n.typed&&!this.requirement(n.value)&&Ie(this,"input",n,r),n}}}function lt(e){return{kind:"validation",type:"finite",reference:lt,async:!1,expects:null,requirement:Number.isFinite,message:e,"~run"(t,n){return t.typed&&!this.requirement(t.value)&&Ie(this,"finite",t,n),t}}}function xr(e,t){return{kind:"validation",type:"max_length",reference:xr,async:!1,expects:`<=${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&n.value.length>this.requirement&&Ie(this,"length",n,r,{received:`${n.value.length}`}),n}}}function qi(e,t){return{kind:"validation",type:"min_length",reference:qi,async:!1,expects:`>=${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&n.value.length<this.requirement&&Ie(this,"length",n,r,{received:`${n.value.length}`}),n}}}function Ji(e,t){return{kind:"validation",type:"min_value",reference:Ji,async:!1,expects:`>=${e instanceof Date?e.toJSON():Ar(e)}`,requirement:e,message:t,"~run"(n,r){return n.typed&&!(n.value>=this.requirement)&&Ie(this,"value",n,r,{received:n.value instanceof Date?n.value.toJSON():Ar(n.value)}),n}}}function Vn(e){return{kind:"validation",type:"non_empty",reference:Vn,async:!1,expects:"!0",message:e,"~run"(t,n){return t.typed&&t.value.length===0&&Ie(this,"length",t,n,{received:"0"}),t}}}function Oa(e,t){return{kind:"transformation",type:"parse_json",reference:Oa,config:e,message:t,async:!1,"~run"(n,r){try{n.value=JSON.parse(n.value,this.config?.reviver)}catch(i){if(i instanceof Error)Ie(this,"JSON",n,r,{received:`"${i.message}"`}),n.typed=!1;else throw i}return n}}}function Zi(e,t){return{kind:"validation",type:"regex",reference:Zi,async:!1,expects:`${e}`,requirement:e,message:t,"~run"(n,r){return n.typed&&!this.requirement.test(n.value)&&Ie(this,"format",n,r),n}}}function Jt(e){return{kind:"transformation",type:"transform",reference:Jt,async:!1,operation:e,"~run"(t){return t.value=this.operation(t.value),t}}}function Qi(){return{kind:"transformation",type:"trim",reference:Qi,async:!1,"~run"(e){return e.value=e.value.trim(),e}}}function sd(e,t,n){return typeof e.fallback=="function"?e.fallback(t,n):e.fallback}function Ze(e,t){return Ae({...e,fallback:t,"~run"(n,r){let i=e["~run"](n,r);return i.issues?{typed:!0,value:sd(this,i,r)}:i}})}function Da(e,t,n){return typeof e.default=="function"?e.default(t,n):e.default}function Tt(e,t){return Ae({kind:"schema",type:"array",reference:Tt,expects:"Array",async:!1,item:e,message:t,"~run"(n,r){let i=n.value;if(Array.isArray(i)){n.typed=!0,n.value=[];for(let o=0;o<i.length;o++){let s=i[o],a=this.item["~run"]({value:s},r);if(a.issues){let l={type:"array",origin:"value",input:i,key:o,value:s};for(let u of a.issues)u.path?u.path.unshift(l):u.path=[l],n.issues?.push(u);if(n.issues||(n.issues=a.issues),r.abortEarly){n.typed=!1;break}}a.typed||(n.typed=!1),n.value.push(a.value)}}else Ie(this,"type",n,r);return n}})}function eo(e){return Ae({kind:"schema",type:"boolean",reference:eo,expects:"boolean",async:!1,message:e,"~run"(t,n){return typeof t.value=="boolean"?t.typed=!0:Ie(this,"type",t,n),t}})}function to(e,t){return Ae({kind:"schema",type:"custom",reference:to,expects:"unknown",async:!1,check:e,message:t,"~run"(n,r){return this.check(n.value)?n.typed=!0:Ie(this,"type",n,r),n}})}function Ra(e){return Ae({kind:"schema",type:"lazy",reference:Ra,expects:"unknown",async:!1,getter:e,"~run"(t,n){return this.getter(t.value)["~run"](t,n)}})}function Ma(e,t){return Ae({kind:"schema",type:"literal",reference:Ma,expects:Ar(e),async:!1,literal:e,message:t,"~run"(n,r){return NT(n.value,this.literal)?n.typed=!0:Ie(this,"type",n,r),n}})}function Nr(e,t){return Ae({kind:"schema",type:"nullable",reference:Nr,expects:`(${e.expects} | null)`,async:!1,wrapped:e,default:t,"~run"(n,r){return n.value===null&&(this.default!==void 0&&(n.value=Da(this,n,r)),n.value===null)?(n.typed=!0,n):this.wrapped["~run"](n,r)}})}function ee(e){return Ae({kind:"schema",type:"number",reference:ee,expects:"number",async:!1,message:e,"~run"(t,n){return typeof t.value=="number"&&!isNaN(t.value)?t.typed=!0:Ie(this,"type",t,n),t}})}function ie(e,t){return Ae({kind:"schema",type:"object",reference:ie,expects:"Object",async:!1,entries:e,message:t,"~run"(n,r){let i=n.value;if(i&&typeof i=="object"){n.typed=!0,n.value={};for(let o in this.entries){let s=this.entries[o];if(o in i||(s.type==="exact_optional"||s.type==="optional"||s.type==="nullish")&&s.default!==void 0){let a=o in i?i[o]:Da(s),l=s["~run"]({value:a},r);if(l.issues){let u={type:"object",origin:"value",input:i,key:o,value:a};for(let c of l.issues)c.path?c.path.unshift(u):c.path=[u],n.issues?.push(c);if(n.issues||(n.issues=l.issues),r.abortEarly){n.typed=!1;break}}l.typed||(n.typed=!1),n.value[o]=l.value}else if(s.fallback!==void 0)n.value[o]=sd(s);else if(s.type!=="exact_optional"&&s.type!=="optional"&&s.type!=="nullish"&&(Ie(this,"key",n,r,{input:void 0,expected:`"${o}"`,path:[{type:"object",origin:"key",input:i,key:o,value:i[o]}]}),r.abortEarly))break}}else Ie(this,"type",n,r);return n}})}function q(e,t){return Ae({kind:"schema",type:"optional",reference:q,expects:`(${e.expects} | undefined)`,async:!1,wrapped:e,default:t,"~run"(n,r){return n.value===void 0&&(this.default!==void 0&&(n.value=Da(this,n,r)),n.value===void 0)?(n.typed=!0,n):this.wrapped["~run"](n,r)}})}function Zt(e,t){return Ae({kind:"schema",type:"picklist",reference:Zt,expects:OT(e.map(Ar),"|"),async:!1,options:e,message:t,"~run"(n,r){return this.options.includes(n.value)?n.typed=!0:Ie(this,"type",n,r),n}})}function St(e,t,n){return Ae({kind:"schema",type:"record",reference:St,expects:"Object",async:!1,key:e,value:t,message:n,"~run"(r,i){let o=r.value;if(o&&typeof o=="object"){r.typed=!0,r.value={};for(let s in o)if(CT(o,s)){let a=o[s],l=this.key["~run"]({value:s},i);if(l.issues){let c={type:"object",origin:"key",input:o,key:s,value:a};for(let f of l.issues)f.path=[c],r.issues?.push(f);if(r.issues||(r.issues=l.issues),i.abortEarly){r.typed=!1;break}}let u=this.value["~run"]({value:a},i);if(u.issues){let c={type:"object",origin:"value",input:o,key:s,value:a};for(let f of u.issues)f.path?f.path.unshift(c):f.path=[c],r.issues?.push(f);if(r.issues||(r.issues=u.issues),i.abortEarly){r.typed=!1;break}}(!l.typed||!u.typed)&&(r.typed=!1),l.typed&&(r.value[l.value]=u.value)}}else Ie(this,"type",r,i);return r}})}function H(e){return Ae({kind:"schema",type:"string",reference:H,expects:"string",async:!1,message:e,"~run"(t,n){return typeof t.value=="string"?t.typed=!0:Ie(this,"type",t,n),t}})}function Ft(){return Ae({kind:"schema",type:"unknown",reference:Ft,expects:"unknown",async:!1,"~run"(e){return e.typed=!0,e}})}function oe(...e){return Ae({...e[0],pipe:e,"~run"(t,n){for(let r of e)if(r.kind!=="metadata"){if(t.issues&&(r.kind==="schema"||r.kind==="transformation")){t.typed=!1;break}(!t.issues||!n.abortEarly&&!n.abortPipeEarly)&&(t=r["~run"](t,n))}return t}})}function Cr(e,t,n){let r=e["~run"]({value:t},od(n));return{typed:r.typed,success:!r.issues,output:r.value,issues:r.issues}}var Or="open-pencil";function Se(e,t,n){let r=oe(H(),Oa(),n);return{key:e,role:t,decode(i){let o=Cr(r,i);return o.success?o.output:void 0},encode:i=>JSON.stringify(i)}}function no(e,t,n){let r=Zt(n);return{key:e,role:t,decode(i){let o=Cr(r,i);return o.success?o.output:void 0},encode:i=>i}}function Pa(e,t){return e.pluginId==="open-pencil"&&e.key===t.key}function wa(e,t){return e?.some(n=>Pa(n,t))??!1}function ka(e,t){return{pluginId:Or,key:e.key,value:e.encode(t)}}function ro(e,t){return e.filter(n=>!t.some(r=>Pa(n,r)))}function bt(e,t,n){return ld(e,t,n===void 0?[]:[n])}function ld(e,t,n){return[...ro(e,[t]),...n.map(r=>ka(t,r))]}var RT=ie({propertyId:H(),on:q(H()),off:q(H())});function ud(e){return e.max>e.min&&e.step>0}var MT=oe(ie({min:oe(ee(),lt()),max:oe(ee(),lt()),step:oe(ee(),lt()),default:oe(ee(),lt())}),Yi(e=>ud(e),"A number value needs max above min and a positive step")),PT={rest:q(H()),hover:q(H()),pressed:q(H()),focus:q(H()),disabled:q(H())},wT=ie({propertyId:H(),...PT}),kT=ie({kind:Zt(id),booleans:St(H(),RT),texts:q(St(H(),ie({propertyId:H()})),{}),numbers:St(H(),MT),parts:St(H(),H()),states:q(wT)}),cd=["png","jpg","webp","svg","pdf","pptx"];function fd(e){return cd.some(t=>t===e)}var dd=.01,pd=1024;function io(e){return Math.min(pd,Math.max(dd,e))}var md=/^[a-z0-9]+(?:-[a-z0-9]+)*:[a-z0-9]+(?:[-_][a-z0-9]+)*$/,hd=ie({name:oe(H(),Zi(md)),glyph:q(H())}),gd=["fill","stroke"],yd=oe(Tt(Zt(gd)),qi(1)),Id=ie({type:oe(H(),Vn(),xr(100)),id:q(H()),props:q(St(H(),Ft())),children:q(Tt(Ra(()=>Id)))}),vd=ie({components:oe(Tt(Id),qi(1)),structureVersion:q(ee())}),Td=ie({image:oe(H(),Vn()),preset:vd,frame:q(ie({width:oe(ee(),lt(),Ji(0)),height:oe(ee(),lt(),Ji(0)),preset:oe(H(),Vn())}))});var La=["ALL_SCOPES","TEXT_CONTENT","CORNER_RADIUS","WIDTH_HEIGHT","GAP","ALL_FILLS","FRAME_FILL","SHAPE_FILL","TEXT_FILL","STROKE","STROKE_FLOAT","EFFECT_FLOAT","EFFECT_COLOR","OPACITY","FONT_STYLE","FONT_FAMILY","FONT_SIZE","LINE_HEIGHT","LETTER_SPACING","PARAGRAPH_SPACING","PARAGRAPH_INDENT","FONT_VARIATIONS","TRANSFORM"],_a=["WEB","ANDROID","iOS"],Sd=["none","px","rem","%","ms","s","deg"];var bd=/^[A-Za-z_][\w-]*$/;var ad=["AUTO","LTR","RTL"],LT=oe(ie({x:ee(),y:ee(),width:ee(),height:ee()}),Yi(({x:e,y:t,width:n,height:r})=>Number.isFinite(e+t+n+r)&&n>0&&r>0)),_T=oe(to(e=>typeof e=="object"&&e!==null&&!Array.isArray(e)),Jt(e=>Object.fromEntries(Object.entries(e).filter(t=>typeof t[1]=="string")))),VT=Tt(oe(ie({scale:oe(ee(),lt()),format:to(fd)}),Jt(({scale:e,format:t})=>({scale:io(e),format:t})))),FT=oe(ie({identity:ie({libraryId:H(),assetKey:H(),revisionId:H()}),sourceNodeId:q(Ft()),readOnly:q(Ft())}),Jt(({identity:e,sourceNodeId:t,readOnly:n})=>({identity:e,sourceNodeId:typeof t=="string"?t:null,readOnly:n===!0}))),GT=ie({libraryId:H(),revisionId:H(),enabled:q(Ft())}),BT=oe(Tt(Ft()),Jt(e=>e.flatMap(t=>{let n=Cr(GT,t);if(!n.success)return[];let{libraryId:r,revisionId:i,enabled:o}=n.output;return[{libraryId:r,revisionId:i,enabled:o===!0}]}))),Ed=oe(H(),Qi(),Vn(),xr(1e3)),UT=ie({unit:q(Zt(Sd)),expressions:q(St(H(),ie({css:Ed,resolved:oe(ee(),lt())})))}),zT=ie({version:Ma(1),kind:Zt(["fill","stroke"]),index:ee(),color:ie({h:ee(),c:ee(),l:ee(),a:Ze(q(ee()),void 0)})}),HT=ie({libraryId:H(),revisionId:H(),name:H(),catalogSource:q(H())}),WT=Ze(q(ie({r:ee(),g:ee(),b:ee(),a:ee()})),void 0),Ad={author:Ze(H(),""),authorColor:WT,text:Ze(H(),""),createdAt:Ze(H(),""),deleted:q(eo())},XT=ie({id:H(),...Ad}),jT=ie({id:H(),pageId:H(),pageName:q(H()),nodeId:q(Nr(H())),nodeName:q(Nr(H())),offsetX:q(ee()),offsetY:q(ee()),x:Ze(ee(),0),y:Ze(ee(),0),...Ad,updatedAt:Ze(H(),""),resolved:Ze(eo(),!1),resolvedAt:q(Nr(H())),replies:Ze(Tt(XT),[])}),$T=oe(Tt(Ft()),Jt(e=>e.flatMap(t=>{let n=Cr(jT,t);if(!n.success)return[];let r=n.output;return[{...r,updatedAt:r.updatedAt||r.createdAt}]}))),xe={textDirection:no("textDirection","format",ad),layoutDirection:no("layoutDirection","format",ad),nodeType:no("nodeType","format",["COMPONENT_SET"]),boundVariables:Se("boundVariables","format",_T),exportSettings:Se("exportSettings","format",VT),textPathBox:Se("textPathBox","format",LT),librarySource:Se("librarySource","bookkeeping",FT),enabledLibraries:Se("enabledLibraries","bookkeeping",BT),sourceLibraryPublication:Se("sourceLibraryPublication","bookkeeping",HT),comments:Se("comments","bookkeeping",$T),token:Se("token","format",UT),modeConditions:Se("modeConditions","format",St(H(),Ed)),modeAttribute:Se("modeAttribute","format",oe(H(),Qi(),xr(100),Zi(bd))),okhcl:Se("okhcl","content",zT),behaviour:Se("behaviour","content",kT),icon:Se("icon","content",hd),iconTint:Se("iconTint","content",yd),shader:Se("shader","content",Td)},I_=Object.values(xe).filter(e=>e.role!=="content");var Va=typeof globalThis=="object"&&globalThis||typeof window=="object"&&window||typeof self=="object"&&self||typeof global=="object"&&global||(function(){return this})();function Fa(e){return typeof Va.Buffer<"u"&&Va.Buffer.isBuffer(e)}function Dr(e){if(!e||typeof e!="object")return!1;let t=Object.getPrototypeOf(e);return t===null||t===Object.prototype||Object.getPrototypeOf(t)===null?Object.prototype.toString.call(e)==="[object Object]":!1}function Rr(e){return Dr(e)&&Object.keys(e).length===0}function Ga(e){return Object.getOwnPropertySymbols(e).filter(t=>Object.prototype.propertyIsEnumerable.call(e,t))}function Ba(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}var xd="[object RegExp]",Nd="[object String]",Cd="[object Number]",Od="[object Boolean]";var Dd="[object Symbol]",Rd="[object Date]",Md="[object Map]",Pd="[object Set]",wd="[object Array]",kd="[object Function]",Ld="[object ArrayBuffer]",oo="[object Object]",_d="[object Error]",Vd="[object DataView]",Fd="[object Uint8Array]",Gd="[object Uint8ClampedArray]",Bd="[object Uint16Array]",Ud="[object Uint32Array]",zd="[object BigUint64Array]",Hd="[object Int8Array]",Wd="[object Int16Array]",Xd="[object Int32Array]",jd="[object BigInt64Array]",$d="[object Float32Array]",Kd="[object Float64Array]";function Yd(e,t){return e===t||Number.isNaN(e)&&Number.isNaN(t)}function qd(e,t,n){return Mr(e,t,void 0,void 0,void 0,void 0,n)}function Mr(e,t,n,r,i,o,s){let a=s(e,t,n,r,i,o);if(a!==void 0)return a;if(typeof e==typeof t)switch(typeof e){case"bigint":case"string":case"boolean":case"symbol":case"undefined":return e===t;case"number":return e===t||Object.is(e,t);case"function":return e===t;case"object":return Pr(e,t,o,s)}return Pr(e,t,o,s)}function Pr(e,t,n,r){if(Object.is(e,t))return!0;let i=Ba(e),o=Ba(t);if(i==="[object Arguments]"&&(i=oo),o==="[object Arguments]"&&(o=oo),i!==o)return!1;switch(i){case Nd:return e.toString()===t.toString();case Cd:return Yd(e.valueOf(),t.valueOf());case Od:case Rd:case Dd:return Object.is(e.valueOf(),t.valueOf());case xd:return e.source===t.source&&e.flags===t.flags;case kd:return e===t}n=n??new Map;let s=n.get(e),a=n.get(t);if(s!=null&&a!=null)return s===t;n.set(e,t),n.set(t,e);try{switch(i){case Md:if(e.size!==t.size)return!1;for(let[l,u]of e.entries())if(!t.has(l)||!Mr(u,t.get(l),l,e,t,n,r))return!1;return!0;case Pd:{if(e.size!==t.size)return!1;let l=Array.from(e.values()),u=Array.from(t.values());for(let c=0;c<l.length;c++){let f=l[c],p=u.findIndex(d=>Mr(f,d,void 0,e,t,n,r));if(p===-1)return!1;u.splice(p,1)}return!0}case wd:case Fd:case Gd:case Bd:case Ud:case zd:case Hd:case Wd:case Xd:case jd:case $d:case Kd:if(Fa(e)!==Fa(t)||e.length!==t.length)return!1;for(let l=0;l<e.length;l++)if(!Mr(e[l],t[l],l,e,t,n,r))return!1;return!0;case Ld:return e.byteLength!==t.byteLength?!1:Pr(new Uint8Array(e),new Uint8Array(t),n,r);case Vd:return e.byteLength!==t.byteLength||e.byteOffset!==t.byteOffset?!1:Pr(new Uint8Array(e),new Uint8Array(t),n,r);case _d:return e.name===t.name&&e.message===t.message;case oo:{if(!(Pr(e.constructor,t.constructor,n,r)||Dr(e)&&Dr(t)))return!1;let l=[...Object.keys(e),...Ga(e)],u=[...Object.keys(t),...Ga(t)];if(l.length!==u.length)return!1;for(let c=0;c<l.length;c++){let f=l[c],p=e[f];if(!Object.hasOwn(t,f))return!1;let d=t[f];if(!Mr(p,d,f,e,t,n,r))return!1}return!0}default:return!1}}finally{n.delete(e),n.delete(t)}}function Jd(){}function Re(e,t){return qd(e,t,Jd)}function KT(){return{minX:1/0,minY:1/0,maxX:-1/0,maxY:-1/0}}function YT(e,t,n){e.minX=Math.min(e.minX,t),e.minY=Math.min(e.minY,n),e.maxX=Math.max(e.maxX,t),e.maxY=Math.max(e.maxY,n)}function qT(e){return e.minX===1/0?{x:0,y:0,width:0,height:0}:{x:e.minX,y:e.minY,width:e.maxX-e.minX,height:e.maxY-e.minY}}function so(e){return e===0?0:e===1||e===2?1:e===3?2:e===4?3:null}function ao(e){let t=KT();for(let n of e){let r=n.commandsBlob,i=new DataView(r.buffer,r.byteOffset,r.byteLength),o=0;for(;o<r.length;){let s=r[o++],a=so(s);if(a==null)break;for(let l=0;l<a&&!(o+8>r.length);l++)YT(t,i.getFloat32(o,!0),i.getFloat32(o+4,!0)),o+=8}}return t.minX===1/0?null:qT(t)}function Qd(){return{self:new Map,descendants:new Map}}function Ua(e){return{self:new Map([...e.self].map(([t,n])=>[t,structuredClone(n)])),descendants:new Map([...e.descendants].map(([t,n])=>[t,new Map([...n].map(([r,i])=>[r,structuredClone(i)]))]))}}function et(e,t,n,r){return n===t?e.self.get(r):e.descendants.get(n)?.get(r)}function wr(e,t,n,r){return(n===t?e.self:e.descendants.get(n))?.has(r)??!1}function fe(e,t,n,r,i=!0){if(n===t){e.self.set(r,i);return}let o=e.descendants.get(n)??new Map;o.set(r,i),e.descendants.set(n,o)}function za(e){e.self.clear(),e.descendants.clear()}function kr(e,t){for(let[n,r]of e.self)t("",n,r);for(let[n,r]of e.descendants)for(let[i,o]of r)t(n,i,o)}function Bt(){return{format:null,id:null,orderKey:null,editedFields:[],fig:{rawSize:null,rawTransform:null,rawNodeFields:{},layout:null,symbolOverrides:[],componentPropAssignments:[],derivedSymbolData:[],derivedSymbolDataLayoutVersion:null,uniformScaleFactor:null}}}function Ha(e){return e==="LINE"||e==="VECTOR"?"CENTER":e==="TEXT"?"OUTSIDE":"INSIDE"}function Gn(e,t,n={}){return{id:e(),type:t,name:t.charAt(0)+t.slice(1).toLowerCase(),parentId:null,childIds:[],x:0,y:0,width:100,height:100,rotation:0,source:Bt(),derivedLayout:null,fills:t==="TEXT"?[{type:"SOLID",color:Vt,opacity:1,visible:!0}]:[],strokes:[],effects:[],layoutGrids:[],guides:[],fillStyleId:null,strokeStyleId:null,textStyleId:null,effectStyleId:null,gridStyleId:null,sharedStyleType:null,opacity:1,cornerRadius:0,topLeftRadius:0,topRightRadius:0,bottomRightRadius:0,bottomLeftRadius:0,independentCorners:!1,cornerSmoothing:0,visible:!0,locked:!1,clipsContent:!1,text:"",fontSize:14,fontFamily:_n,fontWeight:400,italic:!1,textAlignHorizontal:"LEFT",textDirection:"AUTO",textLanguage:null,leadingTrim:"NONE",lineHeight:null,letterSpacing:0,layoutMode:"NONE",layoutDirection:"AUTO",layoutWrap:"NO_WRAP",primaryAxisAlign:"MIN",counterAxisAlign:"MIN",primaryAxisSizing:"FIXED",counterAxisSizing:"FIXED",itemSpacing:0,counterAxisSpacing:0,paddingTop:0,paddingRight:0,paddingBottom:0,paddingLeft:0,blendMode:"PASS_THROUGH",layoutPositioning:"AUTO",layoutGrow:0,layoutAlignSelf:"AUTO",vectorNetwork:null,handleMirroring:"NONE",fillGeometry:[],strokeGeometry:[],arcData:null,textAlignVertical:"TOP",textAutoResize:"NONE",textCase:"ORIGINAL",textDecoration:"NONE",textDecorationStyle:"SOLID",textDecorationThickness:null,textDecorationFills:[],textDecorationSkipInk:!0,textUnderlineOffset:null,maxLines:null,textParagraphs:[],listSpacing:0,paragraphSpacing:0,paragraphIndent:0,hangingList:!1,styleRuns:[],fontVariations:[],fontFeatures:[],horizontalConstraint:"MIN",verticalConstraint:"MIN",strokeCap:"NONE",strokeJoin:"MITER",dashPattern:[],borderTopWeight:0,borderRightWeight:0,borderBottomWeight:0,borderLeftWeight:0,independentStrokeWeights:!1,strokeWeight:1,strokeAlign:Ha(t),strokeMiterLimit:4,minWidth:null,maxWidth:null,minHeight:null,maxHeight:null,targetAspectRatio:null,isMask:!1,maskType:"ALPHA",maskIsOutline:!1,gridTemplateColumns:[],gridTemplateRows:[],gridColumnGap:0,gridRowGap:0,gridPosition:null,counterAxisAlignContent:"AUTO",itemReverseZIndex:!1,strokesIncludedInLayout:!1,expanded:!0,textTruncation:"DISABLED",autoRename:!0,pointCount:5,starInnerRadius:.38,componentId:null,instanceOverrides:Qd(),componentPropertyDefinitions:[],componentPropertyReferences:[],componentPropertyAssignments:{},componentPropertyValues:{},componentKey:null,sourceLibraryKey:null,publishId:null,overrideKey:null,sharedSymbolVersion:null,publishedVersion:null,librarySource:null,isPublishable:!1,isSymbolPublishable:!1,isExposedInstance:!1,symbolDescription:"",symbolLinks:[],variantPropSpecs:[],boundVariables:{},variableBindingScales:{},variableAssignmentScales:{},componentScale:1,variableModes:{},exportSettings:[],pluginData:[],pluginRelaunchData:[],internalOnly:!1,flipX:!1,flipY:!1,textPicture:null,derivedTextGlyphs:null,textPathData:null,textPathBox:null,booleanOperation:void 0,...n}}var Wa=new Set(["CANVAS","FRAME","GROUP","BOOLEAN_OPERATION","SECTION","COMPONENT","COMPONENT_SET","INSTANCE"]);function Xa(e,t){let n=r=>({x:e[0]*r.x+e[1]*r.y,y:e[3]*r.x+e[4]*r.y});return{vertices:t.vertices.map(r=>({...r,x:e[0]*r.x+e[1]*r.y+e[2],y:e[3]*r.x+e[4]*r.y+e[5]})),segments:t.segments.map(r=>({...r,tangentStart:n(r.tangentStart),tangentEnd:n(r.tangentEnd)})),regions:t.regions.map(r=>({windingRule:r.windingRule,loops:r.loops.map(i=>[...i])}))}}function Lr(e){return{vertices:e.vertices.map(t=>({...t})),segments:e.segments.map(t=>({...t,tangentStart:{...t.tangentStart},tangentEnd:{...t.tangentEnd}})),regions:e.regions.map(t=>({windingRule:t.windingRule,loops:t.loops.map(n=>[...n])}))}}function lo(e){let t={x:0,y:0};return{vertices:e.vertices,segments:e.segments.map(n=>({start:n.start,end:n.end,tangentStart:n.tangentStart??{...t},tangentEnd:n.tangentEnd??{...t}})),regions:e.regions??[]}}function Fn(e){let t={...e,color:{...e.color}};return e.gradientStops&&(t.gradientStops=e.gradientStops.map(JT)),e.gradientTransform&&(t.gradientTransform={...e.gradientTransform}),e.imageTransform&&(t.imageTransform={...e.imageTransform}),e.patternSpacing&&(t.patternSpacing={...e.patternSpacing}),e.noiseSize&&(t.noiseSize={...e.noiseSize}),t}function uo(e){let t=Fn(e);return e.dashPattern&&(t.dashPattern=[...e.dashPattern]),t}function ja(e){return{...e,color:{...e.color},offset:{...e.offset}}}function $a(e){let t={...e,style:{...e.style,fills:e.style.fills?e.style.fills.map(Fn):void 0,textDecorationFills:e.style.textDecorationFills?e.style.textDecorationFills.map(Fn):void 0,fontVariations:e.style.fontVariations?e.style.fontVariations.map(n=>({...n})):void 0,fontFeatures:e.style.fontFeatures?e.style.fontFeatures.map(n=>({...n})):void 0}};return e.style.hyperlink&&(t.style.hyperlink={...e.style.hyperlink}),e.style.boundVariables&&(t.style.boundVariables={...e.style.boundVariables}),t}var Zd=new WeakMap;function Qt(e,t){return Zd.set(t,Zd.get(e)??e),t}function Qe(e){return e.map(Fn)}function tn(e){return e.map(uo)}function _r(e){return e.map(ja)}function Ka(e){return e.map(t=>({...t,color:t.color?{...t.color}:void 0}))}function Vr(e){return e.map($a)}function ep(e,t){return{windingRule:e.windingRule,commandsBlob:t,...e.fills?{fills:Qe(e.fills)}:{}}}function en(e){return e.map(t=>ep(t,t.commandsBlob.slice()))}function Fr(e,t,n,r,i,o=0,s=0){let a=e.slice(),l=new DataView(a.buffer,a.byteOffset,a.byteLength),u=0;for(;u<a.length;){let c=a[u++],f=so(c);if(f==null)break;for(let p=0;p<f&&!(u+8>a.length);p++){let d=l.getFloat32(u,!0),m=l.getFloat32(u+4,!0);l.setFloat32(u,t*d+n*m+o,!0),l.setFloat32(u+4,r*d+i*m+s,!0),u+=8}}return a}function Gr(e,t,n,r,i,o=0,s=0){return e.map(a=>ep(a,Fr(a.commandsBlob,t,n,r,i,o,s)))}function Bn(e,t,n){return t===1&&n===1?en(e):Gr(e,t,0,0,n)}function Le(e,t){if(e!==void 0)return e.length>0?t(e):[]}function JT(e){return{color:{...e.color},position:e.position}}function Gt(e){return e?.map(t=>({...t}))??[]}function ZT(e){return e?.map(t=>({...t,variantOptions:t.variantOptions?[...t.variantOptions]:void 0,preferredValues:t.preferredValues?[...t.preferredValues]:void 0,slotSettings:t.slotSettings?{...t.slotSettings}:void 0}))??[]}function co(e){return e?e.map(t=>({...t,commandsBlob:new Uint8Array(t.commandsBlob)})):null}function QT(e){return{startingAngle:e.startingAngle,endingAngle:e.endingAngle,innerRadius:e.innerRadius}}function Un(e,t,n="deep"){let{id:r,parentId:i,childIds:o,...s}=e;return n==="fig-import"?{...s,...t!==null?{componentId:t}:{},source:Bt(),boundVariables:{...e.boundVariables},variableBindingScales:{...e.variableBindingScales},variableAssignmentScales:{...e.variableAssignmentScales},variableModes:{...e.variableModes},instanceOverrides:Ua(e.instanceOverrides),componentPropertyAssignments:{...e.componentPropertyAssignments},componentPropertyValues:{...e.componentPropertyValues}}:{...s,...t!==null?{componentId:t}:{},boundVariables:{...e.boundVariables},variableBindingScales:{...e.variableBindingScales},variableAssignmentScales:{...e.variableAssignmentScales},variableModes:{...e.variableModes},instanceOverrides:Ua(e.instanceOverrides),fills:Le(e.fills,a=>Qt(a,Qe(a))),strokes:Le(e.strokes,a=>Qt(a,tn(a))),effects:Le(e.effects,a=>Qt(a,_r(a))),layoutGrids:Le(e.layoutGrids,Ka),guides:Le(e.guides,a=>a.map(l=>({...l}))),styleRuns:Le(e.styleRuns,a=>Qt(a,Vr(a))),source:t===null?structuredClone(e.source):Bt(),dashPattern:Le(e.dashPattern,a=>[...a]),fontVariations:Le(e.fontVariations,a=>a.map(l=>({...l}))),fontFeatures:Le(e.fontFeatures,a=>a.map(l=>({...l}))),textParagraphs:Le(e.textParagraphs,a=>a.map(l=>({...l}))),textDecorationFills:Le(e.textDecorationFills,Qe),fillGeometry:Le(e.fillGeometry,en),strokeGeometry:Le(e.strokeGeometry,en),gridTemplateColumns:Gt(e.gridTemplateColumns),gridTemplateRows:Gt(e.gridTemplateRows),componentPropertyDefinitions:ZT(e.componentPropertyDefinitions),componentPropertyReferences:Gt(e.componentPropertyReferences),componentPropertyAssignments:{...e.componentPropertyAssignments},symbolLinks:Gt(e.symbolLinks),variantPropSpecs:Gt(e.variantPropSpecs),pluginData:Gt(e.pluginData),pluginRelaunchData:Gt(e.pluginRelaunchData),exportSettings:Gt(e.exportSettings),componentPropertyValues:{...e.componentPropertyValues},derivedLayout:e.derivedLayout?{...e.derivedLayout}:null,arcData:e.arcData?QT(e.arcData):null,vectorNetwork:e.vectorNetwork?Lr(e.vectorNetwork):null,textPicture:e.textPicture?new Uint8Array(e.textPicture):null,derivedTextGlyphs:e.derivedTextGlyphs?Qt(e.derivedTextGlyphs,co(e.derivedTextGlyphs)??[]):null,textPathData:e.textPathData?structuredClone(e.textPathData):null,textPathBox:e.textPathBox?{...e.textPathBox}:null,gridPosition:e.gridPosition?{...e.gridPosition}:null,targetAspectRatio:e.targetAspectRatio?{...e.targetAspectRatio}:null}}var q_=he("rgb"),J_=he("p3"),Z_=he("oklch"),Q_=Ln("rgb","oklch"),e3=Ln("p3","oklch");var t3=he("rgb"),n3=he("p3"),r3=Ln("rgb","oklch"),i3=Ln("p3","oklch"),o3=kn("rgb"),s3=kn("p3");var a3=he("rgb");var l3=pr("rgb");function tp(e){if(!Number.isInteger(e)||e<=0)throw new RangeError("length must be a positive integer");let t=4294967296,n=t-t%e,r=new Uint32Array(1);do crypto.getRandomValues(r);while(r[0]>=n);return r[0]%e}var qa=["text","fontSize","fontFamily","fontWeight","italic","letterSpacing","styleRuns","fontVariations","fontFeatures","textParagraphs","listSpacing","paragraphSpacing","paragraphIndent","hangingList"],Br=[...qa,"lineHeight","textCase","textDirection","textAlignHorizontal","textAlignVertical"],Ja=["width","height","textAutoResize","maxLines"];function lp(e){return e==="VERTICAL"?"VERTICAL":"HORIZONTAL"}function eS(e,t){if(!(!e||e.layoutMode==="NONE"||t.layoutPositioning==="ABSOLUTE"))return e}function tS(e,t){return t.parentId?e.getNode(t.parentId):void 0}function nS(e,t,n){return e.layoutMode==="NONE"?!1:n===lp(e.layoutMode)?t.layoutGrow>0:t.layoutAlignSelf==="STRETCH"?!0:t.layoutAlignSelf==="AUTO"&&e.layoutMode!=="GRID"&&e.counterAxisAlign==="STRETCH"}function rS(e,t){if(e.layoutMode!=="NONE")return t===lp(e.layoutMode)?"primaryAxisSizing":"counterAxisSizing"}function iS(e,t){return e==="WIDTH_AND_HEIGHT"?!0:t==="VERTICAL"&&e==="HEIGHT"}function oS(e,t){if(e.type==="TEXT")return iS(e.textAutoResize,t);let n=rS(e,t);return n!==void 0&&e[n]==="HUG"}function fo(e,t,n){return up(tS(e,t),t,n)}function up(e,t,n){let r=eS(e,t);return r&&nS(r,t,n)?"FILL":oS(t,n)&&(r||t.layoutMode!=="NONE")?"HUG":"FIXED"}var sS=new Set(qa);function aS(e,t,n,r){let i={...t,...r};if(i.type==="TEXT"){if(Br.every(a=>Re(i[a],n[a])))return{width:!1,height:!1};let s=i.textAutoResize;return{width:s==="WIDTH_AND_HEIGHT",height:s==="WIDTH_AND_HEIGHT"||s==="HEIGHT"}}let o=s=>{let a=fo(e,i,s);return a==="FILL"||a==="HUG"&&i.layoutMode!=="NONE"};return{width:o("HORIZONTAL"),height:o("VERTICAL")}}function cp(e,t,n,r){let i=aS(e,n,r,t);i.width&&Reflect.deleteProperty(t,"width"),i.height&&Reflect.deleteProperty(t,"height")}function lS(e,t){t.type!=="TEXT"||!t.derivedLayout||Object.keys(e).some(n=>sS.has(n))&&(e.derivedLayout=null)}function Za(e,t){let n=new Set,r=t.componentId?e.getNode(t.componentId):void 0;for(;r?.type==="INSTANCE"&&r.componentId&&!n.has(r.id);)n.add(r.id),r=e.getNode(r.componentId);return r?.type==="COMPONENT"?r:void 0}function He(e){return e.componentPropertyReferences.find(t=>t.field==="SLOT_CONTENT")?.propertyId}function Ut(e,t,n=He(t)){if(!n)return!1;let r=t.parentId?e.nodes.get(t.parentId):void 0;for(;r&&r.type!=="INSTANCE";)r=r.parentId?e.nodes.get(r.parentId):void 0;return!!r&&Object.hasOwn(r.componentPropertyAssignments,n)}function fp(e,t,n){let r=Za(e,t);return[r,r?.parentId?e.nodes.get(r.parentId):void 0].flatMap(i=>i?.componentPropertyDefinitions??[]).find(i=>i.id===n&&i.type==="SLOT")?.name}function Qa(e,t){let n=[],r=i=>{for(let o of i.childIds){let s=e.nodes.get(o);s&&(He(s)?n.push(s):s.type!=="INSTANCE"&&r(s))}};return r(t),n}function dp(e,t){let n=[],r=i=>{for(let o of i.childIds){let s=e.nodes.get(o);!s||He(s)||(s.type==="INSTANCE"?n.push(s):r(s))}};return r(t),n}function uS(e,t,n){let r=t;for(let i of n)r=r&&dp(e,r).find(o=>o.name===i);return r}function pp(e,t){let n={slots:[],propertyIds:[]},r=(i,o)=>{for(let s of dp(e,i))r(s,[...o,s.name]);for(let s of Qa(e,i)){let a=He(s);if(!a||!Object.hasOwn(i.componentPropertyAssignments,a))continue;i.id===t.id&&n.propertyIds.push(a);let l=fp(e,i,a),u=[...o,l].join("\0");if(!l||n.slots.some(f=>[...f.path,f.name].join("\0")===u))continue;let c=[...s.childIds];for(let f of c)e.reorderChild(f,t.id,t.childIds.length);n.slots.push({path:o,name:l,content:c})}};return r(t,[]),n}function mp(e,t,n){if(!(n.slots.length===0&&n.propertyIds.length===0)){e.updateNode(t.id,{componentPropertyAssignments:Object.fromEntries(Object.entries(t.componentPropertyAssignments).filter(([r])=>!n.propertyIds.includes(r)))});for(let r of n.slots){let i=uS(e,t,r.path),o=i&&Qa(e,i).find(a=>{let l=He(a);return!!l&&fp(e,i,l)===r.name}),s=o&&He(o);if(!i||!o||!s||Object.hasOwn(i.componentPropertyAssignments,s)){for(let a of r.content)e.deleteNode(a);continue}for(let a of Array.from(o.childIds))e.deleteNode(a);for(let[a,l]of r.content.entries())e.reorderChild(l,o.id,a);e.updateNode(i.id,{componentPropertyAssignments:{...i.componentPropertyAssignments,[s]:""}})}}}function hp(e,t){return{instanceId:e,overrides:t,matched:new Set,leftovers:new Set}}function gp(e,t){let n=e.type==="INSTANCE"?et(t.overrides,t.instanceId,e.id,"sourceComponentId"):void 0;return typeof n=="string"?n:e.componentId??void 0}function cS(e,t,n){if(t.type==="INSTANCE"||wr(n.overrides,n.instanceId,t.id,"componentId"))return!1;let r=t.componentId?e.nodes.get(t.componentId):void 0;return!r||!Ut(e,t,He(r))}function yp(e,t){if(t.copies)return t.copies;let n=new Map,r=o=>{for(let s of o.childIds){let a=e.nodes.get(s);if(!a)continue;let l=gp(a,t);l&&n.set(l,[...n.get(l)??[],a]),cS(e,a,t)&&r(a)}},i=e.nodes.get(t.instanceId);return i&&r(i),t.copies=n,n}function fS(e,t,n,r){return yp(e,t).get(n)?.find(i=>!t.matched.has(i.id)&&e.nodes.has(i.id)&&i.id!==r&&!e.isDescendant(r,i.id))}function Ip(e,t,n){let r=yp(e,t);return r.size===0?!1:(e.nodes.get(n)?.childIds??[]).some(i=>r.get(i)?.some(o=>!t.matched.has(o.id))||Ip(e,t,i))}var np=new WeakMap;function el(e){let t=np.get(e);return t||(t={byInstance:new Map,removals:[]},np.set(e,t)),t}function dS(e,t){if(t.keys.length===0)return;let n=el(e);for(n.removals.push(t);n.removals.length>200;){let r=n.removals.shift();for(let[i,o]of r?.keys??[]){let s=n.byInstance.get(i);!s||s.get(o)?.removals!==r||(s.delete(o),s.size===0&&n.byInstance.delete(i))}}}var Ya=new WeakMap;function vp(e,t){let n=Ya.get(e);if(n)return t(n);let r={keys:[]};Ya.set(e,r);try{return t(r)}finally{Ya.delete(e),dS(e,r)}}function pS(e,t,n,r){let i=el(e),o=i.byInstance.get(t.instanceId),s=o?.get(n);if(!o||!s)return;o.delete(n),o.size===0&&i.byInstance.delete(t.instanceId);let a=s.nodes.at(0);if(!(!a||s.nodes.some(l=>e.nodes.has(l.id)))){for(let l of s.nodes){let{id:u,type:c,parentId:f,childIds:p,...d}=structuredClone(l);e.createNodeWithId(u,c,u===a.id?r:f,d)}for(let[l,u]of s.overrides)t.overrides.descendants.set(l,new Map(u));return e.nodes.get(a.id)}}function mS(e,t,n){let r=el(e);for(let i of t.leftovers){let o=e.nodes.get(i),s=o?gp(o,t):void 0;if(!o||!s||t.matched.has(i))continue;let a=[],l=f=>{a.push(structuredClone(f));for(let p of f.childIds){let d=e.nodes.get(p);d&&l(d)}};l(o);let u=new Map;for(let f of a){let p=t.overrides.descendants.get(f.id);p&&u.set(f.id,new Map(p)),t.overrides.descendants.delete(f.id)}let c=r.byInstance.get(t.instanceId);c||(c=new Map,r.byInstance.set(t.instanceId,c)),c.set(s,{nodes:a,overrides:u,removals:n}),n.keys.push([t.instanceId,s]),e.deleteNode(i)}t.leftovers.clear()}function hS(e,t){let n=new Set;return e.closest(t,r=>{if(r.type==="COMPONENT"&&n.add(r.id),r.type==="INSTANCE"){let i=Za(e,r);i&&n.add(i.id)}return!1}),n}function Tp(e,t,n){let r=hS(e,n);if(r.size===0)return!1;let i=new Set;function o(s){if(r.has(s))return!0;if(i.has(s))return!1;i.add(s);let a=e.getNode(s);return a?a.type==="INSTANCE"&&a.componentId&&o(a.componentId)?!0:a.childIds.some(o):!1}return o(t)}function tl(e,t,n){return e.getNode(t)?.type!=="COMPONENT"?!1:!Tp(e,t,n)}var Sp=["name","text","fontSize","fontWeight","fontFamily","italic","textDirection","letterSpacing","lineHeight","textCase","textDecoration","textDecorationStyle","textDecorationThickness","textUnderlineOffset","textDecorationFills","textDecorationSkipInk","textAlignHorizontal","textAlignVertical","textAutoResize","textTruncation","maxLines","leadingTrim","paragraphSpacing","paragraphIndent","listSpacing","hangingList","fontVariations","fontFeatures","styleRuns","textParagraphs"],gS={styleRuns:"text",textParagraphs:"text"},Ur=["width","height","minWidth","maxWidth","minHeight","maxHeight","targetAspectRatio","fills","strokes","effects","opacity","cornerRadius","topLeftRadius","topRightRadius","bottomRightRadius","bottomLeftRadius","independentCorners","layoutMode","layoutDirection","layoutWrap","primaryAxisAlign","counterAxisAlign","primaryAxisSizing","counterAxisSizing","itemSpacing","counterAxisSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","gridTemplateColumns","gridTemplateRows","gridColumnGap","gridRowGap","gridPosition","clipsContent","itemReverseZIndex","strokesIncludedInLayout","layoutGrids","blendMode","cornerSmoothing","strokeWeight","strokeAlign","strokeCap","strokeJoin","strokeMiterLimit","dashPattern","independentStrokeWeights","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight","boundVariables","variableModes","fillStyleId","strokeStyleId","textStyleId","effectStyleId","gridStyleId"],yS=["layoutGrow","layoutAlignSelf","locked"],bp=["x","y","rotation","flipX","flipY","horizontalConstraint","verticalConstraint","layoutPositioning","counterAxisAlignContent","isMask","maskType","arcData","pointCount","starInnerRadius"],Ep=[...Ur,...Sp,...yS,"visible"],po=[...Ep,...bp],Ap=Object.freeze({listType:"NONE",indentation:0});function Hn(e){let t=[],n=0;for(let r=e.indexOf(`
`);r!==-1;r=e.indexOf(`
`,n))t.push({start:n,end:r}),n=r+1;return t.push({start:n,end:e.length}),t}function nl(e,t){let n=0,r=Math.min(t,e.length);for(let i=e.indexOf(`
`);i!==-1&&i<r;i=e.indexOf(`
`,i+1))n++;return n}function zr(e,t){return e[t]??Ap}var Wn=["listSpacing","paragraphSpacing","paragraphIndent"];function xp(e){return Wn.some(t=>e[t]!==void 0)}function rl(e,t,n){let{[t]:r,...i}=e;return n===void 0?i:{...i,[t]:n}}function il(e){return e.textParagraphs.some(t=>t.listType!=="NONE")}function ol(e,t){let n=e.slice(0,t).map(r=>({...r}));for(;n.length>0;){let r=n[n.length-1];if(r.listType!=="NONE"||r.indentation!==0||xp(r))break;n.pop()}return n}function sl(e,t){return e.listType==="NONE"?{...e,indentation:Math.max(0,Math.min(5,Math.round(t)))}:{...e,indentation:IS(t)}}function IS(e){return Math.max(1,Math.min(5,Math.round(e)))}function ct(e,t){return e==null?null:e*t}function vS(e,t){return e.map(n=>({...structuredClone(n),weight:n.weight*t,dashPattern:n.dashPattern?.map(r=>r*t)}))}function TS(e,t){return e.map(n=>({...structuredClone(n),offset:{x:n.offset.x*t,y:n.offset.y*t},radius:n.radius*t,spread:n.spread*t}))}function SS(e,t){return e.map(n=>({...structuredClone(n),scale:n.scale==null?void 0:n.scale*t,spacing:n.spacing==null?void 0:n.spacing*t,patternSpacing:n.patternSpacing?{x:n.patternSpacing.x*t,y:n.patternSpacing.y*t}:void 0,noiseSize:n.noiseSize?{x:n.noiseSize.x*t,y:n.noiseSize.y*t}:void 0}))}function bS(e,t){return e.map(n=>({...structuredClone(n),style:{...structuredClone(n.style),fontSize:n.style.fontSize==null?void 0:n.style.fontSize*t,letterSpacing:n.style.letterSpacing==null?void 0:n.style.letterSpacing*t,lineHeight:ct(n.style.lineHeight??null,t),textDecorationThickness:ct(n.style.textDecorationThickness??null,t),textUnderlineOffset:ct(n.style.textUnderlineOffset??null,t)}}))}function ES(e,t){return e.map(n=>{let r={...n};for(let i of Wn){let o=n[i];o!==void 0&&(r[i]=o*t)}return r})}function AS(e,t){return e.map(n=>({...structuredClone(n),offset:n.offset==null?void 0:n.offset*t,sectionSize:n.sectionSize==null?void 0:n.sectionSize*t,gutterSize:n.gutterSize==null?void 0:n.gutterSize*t}))}function rp(e,t){return e.map(n=>({...n,value:n.sizing==="FIXED"?n.value*t:n.value}))}function xS(e,t){if(!e.vectorNetwork)return null;let n=Lr(e.vectorNetwork);for(let r of n.vertices)r.x*=t,r.y*=t;for(let r of n.segments)r.tangentStart.x*=t,r.tangentStart.y*=t,r.tangentEnd.x*=t,r.tangentEnd.y*=t;return n}function Hr(e,t,n){return{x:n?e.x*t:e.x,y:n?e.y*t:e.y,width:e.width*t,height:e.height*t,minWidth:ct(e.minWidth,t),maxWidth:ct(e.maxWidth,t),minHeight:ct(e.minHeight,t),maxHeight:ct(e.maxHeight,t),cornerRadius:e.cornerRadius*t,topLeftRadius:e.topLeftRadius*t,topRightRadius:e.topRightRadius*t,bottomRightRadius:e.bottomRightRadius*t,bottomLeftRadius:e.bottomLeftRadius*t,fontSize:e.fontSize*t,letterSpacing:e.letterSpacing*t,lineHeight:ct(e.lineHeight,t),textDecorationThickness:ct(e.textDecorationThickness,t),textUnderlineOffset:ct(e.textUnderlineOffset,t),styleRuns:bS(e.styleRuns,t),listSpacing:e.listSpacing*t,paragraphSpacing:e.paragraphSpacing*t,paragraphIndent:e.paragraphIndent*t,textParagraphs:ES(e.textParagraphs,t),itemSpacing:e.itemSpacing*t,counterAxisSpacing:e.counterAxisSpacing*t,paddingTop:e.paddingTop*t,paddingRight:e.paddingRight*t,paddingBottom:e.paddingBottom*t,paddingLeft:e.paddingLeft*t,gridColumnGap:e.gridColumnGap*t,gridRowGap:e.gridRowGap*t,gridTemplateColumns:rp(e.gridTemplateColumns,t),gridTemplateRows:rp(e.gridTemplateRows,t),strokes:vS(e.strokes,t),strokeWeight:e.strokeWeight*t,dashPattern:e.dashPattern.map(r=>r*t),borderTopWeight:e.borderTopWeight*t,borderRightWeight:e.borderRightWeight*t,borderBottomWeight:e.borderBottomWeight*t,borderLeftWeight:e.borderLeftWeight*t,strokeMiterLimit:e.strokeMiterLimit,effects:TS(e.effects,t),fills:SS(e.fills,t),layoutGrids:AS(e.layoutGrids,t),vectorNetwork:xS(e,t),fillGeometry:Bn(e.fillGeometry,t,t),strokeGeometry:Bn(e.strokeGeometry,t,t)}}var mo=new Set(["opacity","width","height","minWidth","maxWidth","minHeight","maxHeight","x","y","rotation","cornerRadius","topLeftRadius","topRightRadius","bottomLeftRadius","bottomRightRadius","strokeWeight","borderTopWeight","borderBottomWeight","borderLeftWeight","borderRightWeight","fontSize","letterSpacing","lineHeight","paddingLeft","paddingRight","paddingTop","paddingBottom","itemSpacing","counterAxisSpacing","gridRowGap","gridColumnGap"]);function Et(e){return mo.has(e)}var al=new Set(["text","fontFamily"]),ll=new Set(["visible"]);function Np(e,t){let n={...e.variableBindingScales},r={...e.variableAssignmentScales};for(let i of mo)i==="opacity"||i==="rotation"||(i in e.boundVariables&&(n[i]=(n[i]??1)*t),e.type==="INSTANCE"&&(r[i]=(r[i]??1)*t));return{variableBindingScales:n,variableAssignmentScales:r}}function Cp(e){let t=e.targetAspectRatio;return!t||!(t.x>0)||!(t.y>0)||e.type==="TEXT"&&e.textAutoResize!=="NONE"?null:t.x/t.y}var ip=new Set(["STRETCH","SCALE"]);function op(e,t,n){return n==="MAX"?{position:e.position+e.size-t,size:t}:n==="CENTER"?{position:e.position+(e.size-t)/2,size:t}:{position:e.position,size:t}}function NS(e,t,n,r,i){let o=ip.has(n);return i===null||o===ip.has(r)?{x:e,y:t}:o?{x:e,y:op(t,e.size/i,r)}:{x:op(e,t.size*i,n),y:t}}function sp(e,t,n,r,i){let o=Math.round(r)-Math.round(n);if(i==="MAX")return{position:e+o,size:t};if(i==="CENTER")return{position:e+Math.round(r/2)-Math.round(n/2),size:t};if(i==="STRETCH")return{position:e,size:Math.abs(t+o)};if(i==="SCALE"&&n>0){let s=r/n;return{position:Math.round(e*s*128)/128,size:t*s}}return{position:e,size:t}}function CS(e,t,n,r,i,o=null){let s=NS(sp(e.x,e.width,t.width,n.width,r),sp(e.y,e.height,t.height,n.height,i),r,i,o);return{x:s.x.position,y:s.y.position,width:s.x.size,height:s.y.size}}var OS=new Set(["x","y","width","height"]);function DS(e,t,n,r){let i={width:t.width*r,height:t.height*r};if(i.width===n.width&&i.height===n.height)return e;let o=CS(e,i,n,e.horizontalConstraint,e.verticalConstraint,Cp(e));return{...e,...o}}var RS=.001,MS=["strokes","strokeWeight","strokeAlign","strokeCap","strokeJoin","strokeMiterLimit","dashPattern"],zn=(e,t)=>Math.abs(e-t)<=RS;function PS(e,t){if(!e||!t)return e===t;if(e.vertices.length!==t.vertices.length||e.segments.length!==t.segments.length)return!1;let n=e.vertices.every((i,o)=>{let{x:s,y:a,...l}=i,{x:u,y:c,...f}=t.vertices[o];return zn(s,u)&&zn(a,c)&&Re(l,f)}),r=e.segments.every((i,o)=>{let s=t.segments[o];return i.start===s.start&&i.end===s.end&&zn(i.tangentStart.x,s.tangentStart.x)&&zn(i.tangentStart.y,s.tangentStart.y)&&zn(i.tangentEnd.x,s.tangentEnd.x)&&zn(i.tangentEnd.y,s.tangentEnd.y)});return n&&r&&Re(e.regions,t.regions)}function wS(e,t,n){if(n.type!=="VECTOR")return;let r=e.width??t.width,i=e.height??t.height,o=n.width>0?r/n.width:1,s=n.height>0?i/n.height:1,a=o!==1||s!==1,l=p=>a?Xa([o,0,0,0,s,0,0,0,1],p):Lr(p),u=n.vectorNetwork?l(n.vectorNetwork):null;if(PS(t.vectorNetwork,u))return;let c=p=>a?Bn(p,o,s):en(p),f=MS.every(p=>Re(e[p]??t[p],n[p]));e.vectorNetwork=u,e.fillGeometry=c(n.fillGeometry),e.strokeGeometry=f?c(n.strokeGeometry):[]}function ut(e,t,n){e[t]=n}function ho(e,t,n){if(n==="fills")ut(e,n,Qe(t.fills));else if(n==="strokes")ut(e,n,tn(t.strokes));else if(n==="effects")ut(e,n,_r(t.effects));else if(n==="styleRuns")ut(e,n,Vr(t.styleRuns));else if(n==="boundVariables")ut(e,n,{...t.boundVariables}),ut(e,"variableBindingScales",{...t.variableBindingScales});else if(n==="variableModes")ut(e,n,{...t.variableModes});else if(n==="gridPosition")ut(e,n,t.gridPosition?{...t.gridPosition}:null);else if(n==="targetAspectRatio")ut(e,n,t.targetAspectRatio?{...t.targetAspectRatio}:null);else{let r=t[n];ut(e,n,Array.isArray(r)?structuredClone(r):r)}}function Op(e){let t=new Set;for(let n of e){let r=[...n].some(i=>i.startsWith("boundVariables/"));for(let i of n)(i!=="boundVariables"||!r)&&t.add(i)}return n=>t.has(n)}function Dp(e,t,n,r){if(r("boundVariables"))return;let i={...t.boundVariables},o={...t.variableBindingScales};for(let s of new Set([...Object.keys(t.boundVariables),...Object.keys(e.boundVariables),...Object.keys(e.variableBindingScales)]))r(`boundVariables/${s}`)&&(Object.hasOwn(e.boundVariables,s)?i[s]=e.boundVariables[s]:Reflect.deleteProperty(i,s),e.variableBindingScales[s]===void 0?Reflect.deleteProperty(o,s):o[s]=e.variableBindingScales[s]);n.boundVariables=i,n.variableBindingScales=o}function Rp(e,t,n){return n(t)||t in e.boundVariables&&(n("boundVariables")||n(`boundVariables/${t}`))}function go(e,t){let n=t/e.componentScale;if(!Number.isFinite(n)||n<=0)throw new Error("Invalid component coordinate scale");return n===1?e:{...e,...Hr(e,n,!0),...Np(e,n)}}function kS(e,t,n,{compParent:r,instParent:i,factor:o,skip:s}){let a=i.layoutMode!=="NONE"&&n.layoutPositioning!=="ABSOLUTE",l=a?n:DS(n,r,i,o);for(let u of po){if(u==="boundVariables"||a&&(u==="x"||u==="y")||s(u))continue;let c=gS[u];if(c&&s(c))continue;let f=OS.has(u)?l:n;Re(t[u],f[u])||ho(e,f,u)}wS(e,t,n),lS(e,t)}function Mp(e,t,n){let r=Object.fromEntries(Object.entries(n).filter(([i,o])=>!Re(t[i],o)));Object.keys(r).length&&e.updateNode(t.id,r)}function Pp(e,t,n,r,i="deep"){let o=t.componentScale*r.componentScale/n.componentScale;return e.createNode(t.type,r.id,{...Un(go(t,o),t.id,i),componentScale:o})}function Xn(e,t,n,r="deep"){if(t===n||e.isDescendant(n,t))return;let i=e.nodes.get(t),o=e.nodes.get(n);if(!(!i||!o))for(let s of i.childIds){let a=e.nodes.get(s);if(!a)continue;let l=Pp(e,a,i,o,r);a.childIds.length>0&&Xn(e,s,l.id,r)}}function wp(e,t){let n=[],r=t.parentId?e.nodes.get(t.parentId):void 0;for(;r;)r.type==="INSTANCE"&&n.push(new Set(r.instanceOverrides.descendants.get(t.id)?.keys())),r=r.parentId?e.nodes.get(r.parentId):void 0;return n}var kp={VISIBLE:"visible",TEXT:"text",INSTANCE_SWAP:"componentId"},LS=16;function _S(e,t,n){let r=t.componentId?e.nodes.get(t.componentId):void 0;for(let s=0;r?.type==="INSTANCE"&&s<LS;s++)r=r.componentId?e.nodes.get(r.componentId):void 0;let i=r?.parentId?e.nodes.get(r.parentId):void 0,o=i?.type==="COMPONENT_SET"?i:void 0;return[r,o].flatMap(s=>s?.componentPropertyDefinitions??[]).some(s=>s.id===n)}function ul(e,t,n){let r=t;for(;r;){if(r.type==="INSTANCE"){if(Object.hasOwn(r.componentPropertyAssignments,n))return r.componentPropertyAssignments[n];if(_S(e,r,n))return}r=r.parentId?e.nodes.get(r.parentId):void 0}}function VS(e,t,n){return ul(e,t,n)!==void 0}function Lp(e,t){for(let n of t.componentPropertyReferences){let r=kp[n.field];if(!r)continue;let i=ul(e,t,n.propertyId);i!==void 0&&(r==="visible"?e.updateNode(t.id,{visible:i==="true"}):r==="text"?e.updateNode(t.id,{text:i}):r==="componentId"&&t.type==="INSTANCE"&&e.nodes.has(i)&&e.swapInstanceComponent(t.id,i))}for(let n of e.getChildren(t.id))Lp(e,n)}function FS(e,t,n){let r=new Set;for(let i of n.componentPropertyReferences){let o=kp[i.field];o&&VS(e,t,i.propertyId)&&r.add(o)}return r}function GS(e,t,n){let r={};for(let i of n.componentPropertyReferences){let o=ul(e,t,i.propertyId);o!==void 0&&(i.field==="TEXT"&&t.type==="TEXT"?r.text=o:i.field==="VISIBLE"&&(r.visible=o==="true"))}return r}function BS(e,t,n){let r=wp(e,t);return r.push(new Set(n.descendants.get(t.id)?.keys())),Op(r)}function US(e,t,n,r){n.type==="INSTANCE"?fe(e,t,n.id,"sourceComponentId",r):n.componentId=r}function zS(e,t,n,r,i,o,s){let a=new Map,l=new Map,u=new Map;for(let c of t.childIds){if(o.has(c))continue;let f=e.nodes.get(c);f&&u.set(f.type,(u.get(f.type)??0)+1)}for(let c of n.childIds){let f=e.nodes.get(c);if(!f||s.has(f.id))continue;l.set(f.type,(l.get(f.type)??0)+1);let p=a.get(f.type);p||(p=new Map,a.set(f.type,p));let d=p.get(f.name);d?d.push(f):p.set(f.name,[f])}for(let c of t.childIds){if(o.has(c))continue;let f=e.nodes.get(c);if(!f)continue;let p=a.get(f.type),d=l.get(f.type)??0;if(d>(u.get(f.type)??0))continue;let m=p?.get(f.name)?.shift();m&&(l.set(f.type,d-1),o.set(c,m),s.add(m.id),US(i,r,m,c))}}function HS(e,t,n,r,i){let o=new Map;for(let a=0;a<r.length;a++)o.set(r[a],a);let s=new Map;for(let a=0;a<t.childIds.length;a++){let l=t.childIds[a],u=e.nodes.get(l),c=u?et(i,n,u.id,"sourceComponentId"):void 0,f=typeof c=="string"?c:u?.componentId,p=f?o.get(f):void 0;s.set(l,p??r.length+a)}t.childIds.toSorted((a,l)=>(s.get(a)??0)-(s.get(l)??0)).forEach((a,l)=>{t.childIds[l]!==a&&e.insertChildAt(a,n,l)})}function WS(e,t,n){return t===n||e.isDescendant(n,t)}function XS(e,t,n,r,i,o,s){for(let a of t.childIds){let l=e.nodes.get(a);if(!l)continue;let u=et(r,n,l.id,"sourceComponentId"),c=typeof u=="string"?u:l.componentId;c&&i.has(c)&&(o.set(c,l),s.add(l.id))}}function jS(e,t,n,r,i,o){for(let s of r.values())o.matched.add(s.id);for(let s of t.childIds){if(r.has(s))continue;let a=fS(e,o,s,n.id)??pS(e,o,s,n.id);if(a){e.insertChildAt(a.id,n.id,n.childIds.length),r.set(s,a),i.add(a.id),o.matched.add(a.id);continue}let l=e.nodes.get(s);if(!l)continue;let u=Pp(e,l,t,n);l.childIds.length>0&&!Ip(e,o,s)&&Xn(e,s,u.id),Lp(e,u),r.set(s,u),i.add(u.id),o.matched.add(u.id)}for(let s of n.childIds)i.has(s)||o.leftovers.add(s)}function _p(e,t,n,r,i=hp(n,r)){if(WS(e,t,n))return;let o=e.nodes.get(t),s=e.nodes.get(n);if(!o||!s)return;let a=new Map,l=new Set;XS(e,s,n,r,new Set(o.childIds),a,l),zS(e,o,s,n,r,a,l),jS(e,o,s,a,l,i);for(let u of o.childIds){let c=e.nodes.get(u),f=a.get(u);if(!c||!f)continue;let p=BS(e,f,r),d=FS(e,f,c),m=c.componentScale*s.componentScale/o.componentScale,h=go(c,m),y={componentScale:m,componentPropertyReferences:structuredClone(c.componentPropertyReferences)};Dp(f,h,y,p),kS(y,f,h,{compParent:o,instParent:s,factor:m/c.componentScale,skip:v=>d.has(v)||Rp(f,v,p)}),Object.assign(y,GS(e,f,c)),cp(e,y,f,h),Mp(e,f,y),c.childIds.length>0&&!wr(r,n,f.id,"componentId")&&!Ut(e,f,He(c))&&_p(e,u,f.id,r,i)}HS(e,s,n,o.childIds,r)}function Vp(e){let t={};for(let n of Ur)ho(t,e,n);return t}function Fp(e,t,n,r={}){let i=e.nodes.get(t);if(i?.type!=="COMPONENT"||!tl(e,t,n))return null;let o={...Vp(i),name:i.name},s=e.createNode("INSTANCE",n,{...o,...r,componentId:t});return Xn(e,i.id,s.id),s}function Gp(e,t,n,r="deep"){let i=e.nodes.get(t),o=e.nodes.get(n);!i||!o||i.type!=="INSTANCE"||Xn(e,n,t,r)}function $S(e,t,n){let r=t.parentId?nn(e,t.parentId):void 0;r&&(typeof et(r.instanceOverrides,r.id,t.id,"sourceComponentId")!="string"&&t.componentId&&fe(r.instanceOverrides,r.id,t.id,"sourceComponentId",t.componentId),fe(r.instanceOverrides,r.id,t.id,"componentId",n),e.updateNode(r.id,{instanceOverrides:r.instanceOverrides}))}function Bp(e,t,n,{keepName:r=!1}={}){let i=e.nodes.get(t),o=e.nodes.get(n);if(!i||o?.type!=="COMPONENT"||i.type!=="INSTANCE"||i.parentId&&!tl(e,n,i.parentId))return;let s=i.componentId?e.nodes.get(i.componentId):void 0;$S(e,i,n);let a={componentId:n},l=go(o,i.componentScale);for(let f of Ur)wr(i.instanceOverrides,i.id,i.id,f)||ho(a,l,f);!r&&(!s||i.name===s.name)&&(a.name=o.name);let u=Array.from(i.childIds),c=pp(e,i);for(let f of u)e.deleteNode(f);e.updateNode(t,a),Xn(e,n,t),mp(e,i,c)}var ap=new WeakMap;function cl(e,t){Hp(e,t,fl(e,t))}function Up(e,t){vp(e,()=>{for(let n of t)cl(e,n)})}function zp(e,t){let n=e.nodes.get(t);n?.type!=="INSTANCE"||!n.componentId||Hp(e,n.componentId,[n])}function Hp(e,t,n){let r=e.nodes.get(t);if(r?.type!=="COMPONENT")return;let i=ap.get(e);if(i||(i=new Set,ap.set(e,i)),!i.has(t)){i.add(t);try{vp(e,o=>{for(let s of n){let a=wp(e,s);a.push(new Set(s.instanceOverrides.self.keys()));let l=Op(a),u=go(r,s.componentScale),c={};Dp(s,u,c,l);for(let p of Ur)p!=="boundVariables"&&(Rp(s,p,l)||ho(c,u,p));cp(e,c,s,u),Mp(e,s,c);let f=hp(s.id,s.instanceOverrides);_p(e,r.id,s.id,s.instanceOverrides,f),mS(e,f,o)}})}finally{i.delete(t)}}}function Wp(e,t){let n=e.nodes.get(t);n?.type==="INSTANCE"&&(n.componentId&&e.instanceIndex.get(n.componentId)?.delete(t),n.type="FRAME",n.componentId=null,za(n.instanceOverrides))}function Xp(e,t){let n=e.nodes.get(t);if(n?.componentId)return e.nodes.get(n.componentId)}function fl(e,t){let n=e.instanceIndex.get(t);if(!n)return[];let r=[];for(let i of n){let o=e.nodes.get(i);o&&r.push(o)}return r}function nn(e,t){let n=e.nodes.get(t);for(;n;){if(n.type==="INSTANCE")return n;n=n.parentId?e.nodes.get(n.parentId):void 0}}function yo(e,t,n){let r=nn(e,t);return r?wr(r.instanceOverrides,r.id,t,n):!1}var jp=["x","y","rotation","flipX","flipY"],$p=["width","height"];var Kp=()=>[1,0,0,0,1,0,0,0,1],KS=(e,t)=>[e[0]*t[0]+e[1]*t[3]+e[2]*t[6],e[0]*t[1]+e[1]*t[4]+e[2]*t[7],e[0]*t[2]+e[1]*t[5]+e[2]*t[8],e[3]*t[0]+e[4]*t[3]+e[5]*t[6],e[3]*t[1]+e[4]*t[4]+e[5]*t[7],e[3]*t[2]+e[4]*t[5]+e[5]*t[8],e[6]*t[0]+e[7]*t[3]+e[8]*t[6],e[6]*t[1]+e[7]*t[4]+e[8]*t[7],e[6]*t[2]+e[7]*t[5]+e[8]*t[8]],YS=(...e)=>{if(e.length===0)return Kp();let t=e[0].slice();for(let n=1;n<e.length;n++)t=KS(t,e[n]);return t},qS=(e,t)=>[1,0,e,0,1,t,0,0,1],JS=(e,t=0,n=0)=>{let r=Math.sin(e),i=Math.cos(e);return[i,-r,r*n+(1-i)*t,r,i,-r*t+(1-i)*n,0,0,1]},ZS=(e,t,n=0,r=0)=>[e,0,n-e*n,0,t,r-t*r,0,0,1],QS=e=>{let t=e[0]*e[4]*e[8]+e[1]*e[5]*e[6]+e[2]*e[3]*e[7]-e[2]*e[4]*e[6]-e[1]*e[3]*e[8]-e[0]*e[5]*e[7];return t?[(e[4]*e[8]-e[5]*e[7])/t,(e[2]*e[7]-e[1]*e[8])/t,(e[1]*e[5]-e[2]*e[4])/t,(e[5]*e[6]-e[3]*e[8])/t,(e[0]*e[8]-e[2]*e[6])/t,(e[2]*e[3]-e[0]*e[5])/t,(e[3]*e[7]-e[4]*e[6])/t,(e[1]*e[6]-e[0]*e[7])/t,(e[0]*e[4]-e[1]*e[3])/t]:null},Yp=(e,t)=>{if(t.length%2)throw new Error("mapPoints requires even length [x,y,...].");let n=t.slice();for(let r=0;r<n.length;r+=2){let i=n[r],o=n[r+1],s=e[6]*i+e[7]*o+e[8],a=e[0]*i+e[1]*o+e[2],l=e[3]*i+e[4]*o+e[5];n[r]=a/s,n[r+1]=l/s}return n},eb=(e,t)=>{let n=Yp(e,[t.x,t.y]);return{x:n[0],y:n[1]}},be={identity:Kp,multiply:YS,translated:qS,rotated:JS,scaled:ZS,invert:QS,mapPoints:Yp,mapPoint:eb};function Io(e,t){let n=[],r=e;for(;r&&(n.unshift(r),!!r.parentId);)r=t.getNode(r.parentId);let i=be.identity();for(let o of n){let s=vo(o);i=be.multiply(i,s)}return i}function qp(e,t){return!e||e.id===t.rootId?be.identity():Io(e,t)}function Jp(e,t){let n=Io(e,t),r=be.mapPoints(n,[0,0]);return{x:r[0],y:r[1]}}function tb(e){return e.type==="LINE"?{x:0,y:0}:{x:e.width/2,y:e.height/2}}function vo(e,t=e){let n=be.translated(t.x,t.y);if((e.flipX||e.flipY)&&(n=be.multiply(n,be.scaled(e.flipX?-1:1,e.flipY?-1:1,e.width/2,e.height/2))),e.rotation){let r=tb(e);n=be.multiply(n,be.rotated(e.rotation*Math.PI/180,r.x,r.y))}return n}function Zp(e,t,n){let r=be.invert(n);if(!r)return null;let i=be.multiply(r,t),[o,s,,a,l]=i,u=e.flipX?-1:1,c=o*l-s*a<0?-u:u,f=Math.atan2(c*a,u*o)*180/Math.PI;Math.abs(f)<1e-9&&(f=0);let p={rotation:f,flipX:u<0,flipY:c<0},d=vo({...e,...p},{x:0,y:0});return{...p,x:i[2]-d[2],y:i[5]-d[5]}}function dl(e){return e[0]===1&&e[1]===0&&e[3]===0&&e[4]===1}function pl(e){let t={},n=Object.keys(e);for(let r=0;r<n.length;r++){let i=n[r],o=e[i];t[o]=i}return t}function ml(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let o=r[i],s=e[o];n[o]=t(s,o,e)}return n}function We(e,t){let n={...e};for(let r=0;r<t.length;r++){let i=t[r];delete n[i]}return n}function To(e,t){let n={},r=Object.keys(e);for(let i=0;i<r.length;i++){let o=r[i],s=o,a=e[s];t(a,o)||(n[s]=a)}return n}function hl(e,t,n){let r=e[t].length,i=Object.keys(e.boundVariables).filter(o=>{if(o===t)return!0;if(!o.startsWith(`${t}/`))return!1;let s=Number.parseInt(o.split("/")[1]??"",10);return Number.isNaN(s)||s<0||s>=r});i.length!==0&&(e.boundVariables=We(e.boundVariables,i),n.boundVariables={...e.boundVariables})}var Qp=()=>({emit(e,...t){for(let n=this.events[e]||[],r=0,i=n.length;r<i;r++)n[r](...t)},events:{},on(e,t){var n;return((n=this.events)[e]||(n[e]=[])).push(t),()=>{this.events[e]=this.events[e]?.filter(r=>t!==r)}}});var nb=class extends AggregateError{constructor(t){super(t,"Committed graph event delivery failed");G(this,"committed",!0);this.name="CommittedGraphEventError"}},em=class{constructor(){G(this,"delegate",Qp());G(this,"buffers",[])}get events(){return this.delegate.events}set events(e){this.delegate.events=e}on(e,t){return this.delegate.on(e,t)}emit(e,...t){let n=this.buffers.at(-1);n?n.push(()=>this.delegate.emit(e,...t)):this.delegate.emit(e,...t)}batch(e){let t=[];this.buffers.push(t);let n;try{n=e()}catch(i){throw this.buffers.pop(),i}this.buffers.pop();let r=this.buffers.at(-1);if(r)r.push(...t);else{let i=[];for(let o of t)try{o()}catch(s){i.push(s)}if(i.length)throw new nb(i)}return n}};function tm(e,t){let n=[t.created?e.on("node:created",t.created):null,t.updated?e.on("node:updated",t.updated):null,t.previewUpdated?e.on("node:previewUpdated",t.previewUpdated):null,t.deleted?e.on("node:deleted",t.deleted):null,t.reparented?e.on("node:reparented",t.reparented):null,t.reordered?e.on("node:reordered",t.reordered):null].filter(r=>!!r);return()=>{for(let r of n)r()}}var rb=new Set(["CANVAS","FRAME","GROUP","SECTION","COMPONENT","COMPONENT_SET","INSTANCE"]),ib=new Set(["COMPONENT","INSTANCE"]);function rm(e){return e.fills.some(t=>t.visible)||e.strokes.some(t=>t.visible)}function im(e,t){let n=t.parentId?e.nodes.get(t.parentId):void 0;return n?.type==="CANVAS"||n?.type==="SECTION"}function So(e,t){return t.type==="FRAME"&&t.layoutMode!=="NONE"&&im(e,t)}function om(e,t,n){let r=n.get(e.id);if(r!==void 0)return r;let i=e.parentId?t.getNode(e.parentId):void 0,o=e.rotation!==0||e.flipX||e.flipY||(i?om(i,t,n):!1);return n.set(e.id,o),o}function ft(e,t,n,r,i,o=0){if(!om(n,r,i)){let c=r.getAbsolutePosition(n.id);return e>=c.x-o&&e<=c.x+n.width+o&&t>=c.y-o&&t<=c.y+n.height+o}let s=Io(n,r),a=be.invert(s);if(!a)return!1;let[l,u]=be.mapPoints(a,[e,t]);return l>=-o&&l<=n.width+o&&u>=-o&&u<=n.height+o}function ob(e,t,n,r,i,o,s,a){return ft(t,n,r,e,s)&&(rn(e,t,n,i,o,s,a)||rm(r))?r:null}function sb(e,t,n,r,i,o,s,a){if(r.type==="GROUP"){if(!ft(t,n,r,e,s,a))return null;let u=rn(e,t,n,i,o,s,a);return u?o?u:r:ft(t,n,r,e,s)?r:null}let l=rn(e,t,n,i,o,s,a);return l?r.locked?r:l:ft(t,n,r,e,s)&&(rm(r)||So(e,r))?r:null}function rn(e,t,n,r,i=!1,o=new Map,s=0){let a=e.nodes.get(r);if(!a||a.clipsContent&&!ft(t,n,a,e,o))return null;for(let l=a.childIds.length-1;l>=0;l--){let u=a.childIds[l],c=e.nodes.get(u);if(!(!c||c.internalOnly||!c.visible)){if(rb.has(c.type)){if(ib.has(c.type)&&!i){let p=ob(e,t,n,c,u,i,o,s);if(p)return p;continue}let f=sb(e,t,n,c,u,i,o,s);if(f)return f;continue}if(ft(t,n,c,e,o,s))return c}}return null}function sm(e,t,n,r){return rn(e,t,n,r??e.rootId,!1)}function am(e,t,n,r,i=0){return rn(e,t,n,r??e.rootId,!0,new Map,i)}function Wr(e,t){return t.type==="COMPONENT_SET"?!0:t.childIds.length===0?!1:t.type==="SECTION"?!0:t.type==="FRAME"&&im(e,t)}function nm(e,t,n,r){let i=new Map;for(let o=t.childIds.length-1;o>=0;o--){let s=e.nodes.get(t.childIds[o]);if(!(!s||s.internalOnly||!s.visible||s.type!=="FRAME")&&!(Wr(e,s)&&!So(e,s))&&ft(n,r,s,e,i))return s}return null}function ab(e,t,n){let r=new Set;for(let i of t){let o=e.nodes.get(i);o&&o.childIds.length>0&&o.type!=="GROUP"&&o.type!=="BOOLEAN_OPERATION"&&r.add(i);let s=o?.parentId;for(;s&&s!==n&&!r.has(s);)r.add(s),s=e.nodes.get(s)?.parentId}return r}function lm(e,t,n,r,i,o=0){let s=rn(e,t,n,r,!0,new Map,o);if(!s){let f=e.nodes.get(r);return f?nm(e,f,t,n):null}let a=[];for(let f=s;f&&f.id!==r;)a.unshift(f),f=f.parentId?e.nodes.get(f.parentId):void 0;let l=ab(e,i,r);for(let f of a)if(f.locked||!l.has(f.id)&&!Wr(e,f))return f;let u=a.at(-1);if(!u)return null;let c=nm(e,u,t,n);return c||(So(e,u)||l.has(u.id)&&!Wr(e,u)?u:null)}function um(e,t){let n=e.nodes.get(t);return n!==void 0&&Wr(e,n)}function cm(e,t,n,r){let i=rn(e,t,n,r,!0);for(let o=i??void 0;o&&o.id!==r;){if(!Wr(e,o)||So(e,o))return null;o=o.parentId?e.nodes.get(o.parentId):void 0}return i}function fm(e,t,n,r){let i=e.nodes.get(t);return i!==void 0&&ft(n,r,i,e,new Map)}var lb=new Set(["FRAME","SECTION","COMPONENT","INSTANCE"]),ub=new Set(["FRAME","SECTION","INSTANCE"]);function cb(e){let{componentSetIds:t}=e;return t?{takes:n=>ub.has(n.type)||n.type==="COMPONENT_SET"&&t.has(n.id),passThrough:new Set(["GROUP"])}:{takes:n=>lb.has(n.type),passThrough:new Set(["GROUP","COMPONENT_SET"])}}function dm(e,t,n,r,i,o,s){if(r.type!=="CANVAS"&&r.clipsContent&&!ft(t,n,r,e,s))return null;for(let a=r.childIds.length-1;a>=0;a--){let l=r.childIds[a];if(i.has(l))continue;let u=e.nodes.get(l);if(!u||u.internalOnly||!u.visible||u.locked)continue;let c=o.takes(u);if(!c&&!o.passThrough.has(u.type))continue;let f=dm(e,t,n,u,i,o,s);if(f)return f;if(c&&ft(t,n,u,e,s))return u}return null}function pm(e,t,n,r,i,o={}){let s=e.nodes.get(i??e.rootId);return s?dm(e,t,n,s,r,cb(o),new Map):null}function gl(e){let t=[];for(let n=0;n<e.length;n++){let r=e[n];r&&t.push(r)}return t}function on(e,t){let n={};for(let r=0;r<e.length;r++){let i=e[r],o=t(i,r,e);Object.hasOwn(n,o)||(n[o]=[]),n[o].push(i)}return n}function yl(e,t){let n=[],r=[];for(let i=0;i<e.length;i++){let o=e[i];t(o,i,e)?n.push(o):r.push(o)}return[n,r]}var fb=e=>e/2**32|0,db=e=>e>>>0;function mm(e,t,n,r){let i=fb(n),o=db(n);e.setUint32(t,r?o:i,r),e.setUint32(t+4,r?i:o,r)}function hm(e){return e instanceof Uint8Array||ArrayBuffer.isView(e)&&e.constructor.name==="Uint8Array"&&"BYTES_PER_ELEMENT"in e&&e.BYTES_PER_ELEMENT===1}var Il=e=>e?`"${e}" `:"";function pb(e,t=""){if(typeof e!="number")throw new TypeError(Il(t)+"expected number, got "+typeof e);if(!Number.isSafeInteger(e)||e<0)throw new RangeError(Il(t)+"expected integer >= 0, got "+e);return e}function bo(e,t,n=""){if(hm(e)&&(t===void 0||e.length===t))return e;t!==void 0&&pb(t,"length");let r=hm(e),i=t!==void 0?` of length ${t}`:"",o=r?`length=${e.length}`:`type=${typeof e}`,s=Il(n)+"expected Uint8Array"+i+", got "+o;throw r?new RangeError(s):new TypeError(s)}var mb=(e,t)=>{if(e===null||typeof e!="object"||Array.isArray(e))throw new TypeError((t==="object"?"":`"${t}" `)+"expected object, got type="+typeof e)},gm=(e,t)=>{mb(e,t);let n=Object.getPrototypeOf(e);if(n!==Object.prototype&&n!==null)throw new TypeError(`"${t}" expected plain object`);if(Object.hasOwn(e,"__proto__"))throw new TypeError(`"${t}.__proto__" is not allowed`)};function vl(e,t=!0){if(e.destroyed)throw new Error("hash was destroyed");if(t&&e.finished)throw new Error("digest() was already called")}function ym(e,t){bo(e,void 0,"output");let n=t.outputLen;if(!(e.length>=n))throw new RangeError('"output" expected length >= '+n)}function Tl(...e){for(let t=0;t<e.length;t++)e[t].fill(0)}function Eo(e){return new DataView(e.buffer,e.byteOffset,e.byteLength)}function Ao(e,t){return e<<t|e>>>32-t>>>0}var hb=typeof Uint8Array.from([]).toHex=="function"&&typeof Uint8Array.fromHex=="function",gb=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function Im(e){if(bo(e),hb)return e.toHex();let t="";for(let n=0;n<e.length;n++)t+=gb[e[n]];return t}function yb(e,t,n="opts"){return gm(e,"defaults"),t!==void 0&&gm(t,n),Object.assign(Object.create(null),e,t)}function vm(e,t={}){if(typeof e!="function")throw new TypeError('"hashCons" expected function, got type='+typeof e);t=yb({},t,"info");let n=(i,o)=>e(o).update(i).digest(),r=e(void 0);return n.outputLen=r.outputLen,n.blockLen=r.blockLen,n.canXOF=r.canXOF,n.create=i=>e(i),Object.assign(n,t),Object.freeze(n)}function Tm(e,t,n){return e&t^~e&n}function Sm(e,t,n){return e&t^e&n^t&n}var xo=class{constructor(t,n,r,i){G(this,"blockLen");G(this,"outputLen");G(this,"canXOF",!1);G(this,"padOffset");G(this,"isLE");G(this,"buffer");G(this,"view");G(this,"finished",!1);G(this,"length",0);G(this,"pos",0);G(this,"destroyed",!1);this.blockLen=t,this.outputLen=n,this.padOffset=r,this.isLE=i,this.buffer=new Uint8Array(t),this.view=Eo(this.buffer)}update(t){vl(this),bo(t);let{view:n,buffer:r,blockLen:i}=this,o=t.length,s=!1;for(let a=0;a<o;){let l=Math.min(i-this.pos,o-a);if(l===i){let u=Eo(t);for(;i<=o-a;a+=i)this.process(u,a);s=!0;continue}r.set(a===0&&l===o?t:t.subarray(a,a+l),this.pos),this.pos+=l,a+=l,this.pos===i&&(this.process(n,0),this.pos=0,s=!0)}return this.length+=t.length,s&&this.roundClean(),this}digestInto(t){vl(this),ym(t,this),this.finished=!0;let{buffer:n,view:r,blockLen:i,isLE:o}=this,{pos:s}=this;n[s++]=128,n.fill(0,s),this.padOffset>i-s&&(this.process(r,0),n.fill(0)),mm(r,i-8,this.length*8,o),this.process(r,0),this.roundClean();let a=t===n?r:Eo(t),l=this.outputLen,u=l/4,c=this.get();if(l%4||u>c.length)throw new Error("invalid outputLen");for(let f=0;f<u;f++)a.setUint32(4*f,c[f],o)}digest(){let{buffer:t,outputLen:n}=this;this.digestInto(t);let r=t.slice(0,n);return this.destroy(),r}_cloneIntoMeta(t){let{buffer:n,length:r,finished:i,destroyed:o,pos:s}=this;return t.destroyed=o,t.finished=i,t.length=r,t.pos=s,s&&t.buffer.set(n),t}clone(){return this._cloneInto()}};var Xr=Uint32Array.from([1732584193,4023233417,2562383102,271733878,3285377520]),zt=new Uint32Array(80),Sl=class extends xo{constructor(){super(64,20,8,!1);G(this,"A",Xr[0]|0);G(this,"B",Xr[1]|0);G(this,"C",Xr[2]|0);G(this,"D",Xr[3]|0);G(this,"E",Xr[4]|0)}get(){let{A:n,B:r,C:i,D:o,E:s}=this;return[n,r,i,o,s]}set(n,r,i,o,s){this.A=n|0,this.B=r|0,this.C=i|0,this.D=o|0,this.E=s|0}_cloneInto(n){return(n||(n=new this.constructor)).set(...this.get()),this._cloneIntoMeta(n)}process(n,r){for(let u=0;u<16;u++,r+=4)zt[u]=n.getUint32(r,!1);for(let u=16;u<80;u++)zt[u]=Ao(zt[u-3]^zt[u-8]^zt[u-14]^zt[u-16],1);let{A:i,B:o,C:s,D:a,E:l}=this;for(let u=0;u<80;u++){let c,f;u<20?(c=Tm(o,s,a),f=1518500249):u<40?(c=o^s^a,f=1859775393):u<60?(c=Sm(o,s,a),f=2400959708):(c=o^s^a,f=3395469782);let p=Ao(i,5)+c+l+f+zt[u]|0;l=a,a=s,s=Ao(o,30),o=i,i=p}i=i+this.A|0,o=o+this.B|0,s=s+this.C|0,a=a+this.D|0,l=l+this.E|0,this.set(i,o,s,a,l)}roundClean(){Tl(zt)}destroy(){this.destroyed=!0,this.set(0,0,0,0,0),Tl(this.buffer)}},bm=vm(()=>new Sl);function bl(e,t){let n=t,r=t;for(;r&&!(r.type==="COMPONENT"||r.type==="COMPONENT_SET");)r.type==="INSTANCE"&&(n=r),r=r.parentId?e.getNode(r.parentId):void 0;return n}function Om(e,t,n){if(!Et(n))return;let r=bl(e,t);t.variableBindingScales={...t.variableBindingScales,[n]:r.variableAssignmentScales[n]??1}}function El(e,t,n="active"){let r={};for(let[i,o]of Object.entries(t.boundVariables)){if(!mo.has(i)||(i==="width"||i==="height")&&yo(e,t.id,i))continue;let s=e.resolveNumberVariableForNode(t.id,o,n);if(s===void 0||!Number.isFinite(s))continue;let a=s*(t.variableBindingScales[i]??1);if(!Number.isFinite(a))continue;let l=i==="opacity"?Math.max(0,Math.min(1,a)):a;t[i]!==l&&Object.assign(r,{[i]:l})}return r}function No(e){if(typeof e=="string")return e;if(typeof e=="boolean")return String(e);if(typeof e=="number"&&Number.isFinite(e))return bb(e)}var vb=-2147483648,Tb=2147483647,Sb=1e-6;function bb(e){let t=Math.round(e);if(Math.abs(e-t)<Sb)return String(Math.min(Tb,Math.max(vb,t))||0);let n=Math.abs(e)*100,r=Math.floor(n),i=n-r===.5?r+r%2:Math.round(n);return`${e<0?"-":""}${Math.floor(i/100)}.${String(i%100).padStart(2,"0")}`}function Al(e,t,n="active"){let r={},i=a=>{let l=t.boundVariables[a];if(!(!l||yo(e,t.id,a)))return e.resolveVariableForNode(t.id,l,n)},o=t.type==="TEXT"?No(i("text")):void 0;o!==void 0&&o!==t.text&&(r.text=o);let s=i("visible");return typeof s=="boolean"&&s!==t.visible&&(r.visible=s),r}var Eb=["fontSize","fontWeight","letterSpacing","lineHeight"];function xl(e,t,n="active"){let r=t.styleRuns.map(i=>{let o=i.style.boundVariables;if(!o)return i;let s=i.style;for(let a of Eb){let l=o[a];if(!l)continue;let u=e.resolveNumberVariableForNode(t.id,l,n);u===void 0||!Number.isFinite(u)||s[a]===u||(s={...s,[a]:u})}return s===i.style?i:{...i,style:s}});return r.some((i,o)=>i!==t.styleRuns[o])?{styleRuns:r}:{}}function Em(e,t){e.color={...t,a:1},e.opacity=t.a}function jr(e,t,n="active"){let r={};for(let i in t.boundVariables){if(!i.endsWith("/color"))continue;let o=/^(fills|strokes)\/(\d+)\/color$/.exec(i);if(!o)continue;let s=e.resolveColorVariableForNode(t.id,t.boundVariables[i],n),a=Number(o[2]);if(s)if(o[1]==="fills"){if(!t.fills[a])continue;r.fills??(r.fills=Qe(t.fills)),Em(r.fills[a],s)}else{if(!t.strokes[a])continue;r.strokes??(r.strokes=tn(t.strokes)),Em(r.strokes[a],s)}}return r}function Dm(e,t){e.variables.set(t.id,t);let n=e.variableCollections.get(t.collectionId);n&&!n.variableIds.includes(t.id)&&n.variableIds.push(t.id)}function Rm(e,t){let n=e.variables.get(t);if(!n)return;e.variables.delete(t);let r=e.variableCollections.get(n.collectionId);r&&(r.variableIds=r.variableIds.filter(i=>i!==t));for(let i of e.nodes.values())Object.values(i.boundVariables).includes(t)&&(e.willChangeNode(i),i.boundVariables=To(i.boundVariables,o=>o===t),i.variableBindingScales=To(i.variableBindingScales,(o,s)=>!(s in i.boundVariables)),e.emitter.emit("node:updated",i.id,{boundVariables:{...i.boundVariables},variableBindingScales:{...i.variableBindingScales}}),Cl(e,i.id))}function Mm(e,t){e.variableCollections.set(t.id,t),e.activeMode.has(t.id)||e.activeMode.set(t.id,t.defaultModeId)}function Ab(e,t){return t!==void 0?t:e==="COLOR"?{...Vt}:e==="FLOAT"?0:e==="BOOLEAN"?!1:""}function xb(e,t,n,r,i,o){let s=e.variableCollections.get(i);if(!s)throw new Error(`Collection "${i}" not found`);let a=t(),l=Ab(r,o),u={};for(let f of s.modes)u[f.modeId]=structuredClone(l);let c={id:a,name:n,type:r,collectionId:i,valuesByMode:u,description:"",hiddenFromPublishing:!1};return Dm(e,c),c}function Nb(e,t,n){let r=t(),i=t(),o={id:r,name:n,modes:[{modeId:i,name:"Mode 1"}],defaultModeId:i,variableIds:[]};return Mm(e,o),o}function Cb(e,t){let n=e.variableCollections.get(t);if(n)for(let r of Array.from(n.variableIds))Rm(e,r);e.variableCollections.delete(t),e.activeMode.delete(t)}function Nl(e,t){let n=e.activeMode.get(t);return n||(e.variableCollections.get(t)?.defaultModeId??"")}function Co(e,t,n,r="active"){let i=e.nodes.get(t);for(;i;){let o=i.variableModes[n];if(o)return o;i=i.parentId?e.nodes.get(i.parentId):void 0}return r==="default"?e.variableCollections.get(n)?.defaultModeId??"":Nl(e,n)}function Ob(e,t,n){e.activeMode.set(t,n)}function Pm(e,t,n,r,i){let o=e.variableCollections.get(t);if(!o)return;o.modes.push({modeId:n,name:r});let s=i??o.defaultModeId;for(let a of o.variableIds){let l=e.variables.get(a);l&&(l.valuesByMode[n]=structuredClone(l.valuesByMode[s]??Object.values(l.valuesByMode)[0]))}}function Db(e,t,n,r,i){if(!e.variableCollections.has(n))return;let o=t();return Pm(e,n,o,r,i),o}function Rb(e,t,n){let r=e.variableCollections.get(t);if(!(!r||r.modes.length<=1)){r.modes=r.modes.filter(i=>i.modeId!==n),r.defaultModeId===n&&(r.defaultModeId=r.modes[0].modeId);for(let i of r.variableIds){let o=e.variables.get(i);o&&(o.valuesByMode=We(o.valuesByMode,[n]))}e.activeMode.get(t)===n&&e.activeMode.set(t,r.defaultModeId)}}function Mb(e,t,n,r){let i=e.variableCollections.get(t);if(!i)return;let o=i.modes.find(s=>s.modeId===n);o&&(o.name=r)}function Pb(e,t,n){let r=e.variableCollections.get(t);r&&r.modes.some(i=>i.modeId===n)&&(r.defaultModeId=n,r.modes=wm(r))}function wm(e){let[t,n]=yl(e.modes,r=>r.modeId===e.defaultModeId);return[...t,...n]}function sn(e,t,n,r){if(r?.has(t))return;let i=e.variables.get(t);if(!i)return;let o=e.variableCollections.get(i.collectionId),s=n??Nl(e,i.collectionId),a=o?.defaultModeId,l=Object.hasOwn(i.valuesByMode,s)?i.valuesByMode[s]:void 0;if(l===void 0&&a&&Object.hasOwn(i.valuesByMode,a)&&(l=i.valuesByMode[a]),l??(l=Object.values(i.valuesByMode)[0]),l&&typeof l=="object"&&"aliasId"in l){let u=r??new Set;return u.add(t),sn(e,l.aliasId,s,u)}return l}function wb(e,t){let n=sn(e,t);if(n&&typeof n=="object"&&"r"in n)return n}function kb(e,t){let n=sn(e,t);return typeof n=="number"?n:void 0}function Lb(e,t,n,r="active"){let i=e.variables.get(n);if(!i)return;let o=sn(e,n,Co(e,t,i.collectionId,r));if(o&&typeof o=="object"&&"r"in o)return o}function _b(e,t,n,r="active"){let i=e.variables.get(n);if(!i)return;let o=sn(e,n,Co(e,t,i.collectionId,r));return typeof o=="number"?o:void 0}function km(e,t,n,r="active"){let i=e.variables.get(n);if(i)return sn(e,n,Co(e,t,i.collectionId,r))}function Vb(e,t,n,r="active"){let i=km(e,t,n,r);return typeof i=="string"?i:void 0}function Fb(e,t){let n=e.variableCollections.get(t);return n?n.variableIds.map(r=>e.variables.get(r)).filter(r=>r!==void 0):[]}function Gb(e,t){return[...e.variables.values()].filter(n=>n.type===t)}function Bb(e,t,n,r){let i=e.nodes.get(t);if(!i)return;let o=e.variables.get(r);if(!o)throw new Error(`Variable "${r}" not found`);let s=n.match(/^(fills|strokes)\/(\d+)\/color$/);if(s){if(o.type!=="COLOR")throw new Error(`Cannot bind ${o.type} variable to color field "${n}"`);let a=s[1],l=Number.parseInt(s[2],10),u=i[a]?.length??0;if(l>=u)throw new Error(`Index ${l} out of range for ${a} (length ${u})`);let c=s[1];c in i.boundVariables&&(i.boundVariables=We(i.boundVariables,[c]))}if(Et(n)&&o.type!=="FLOAT")throw new Error(`Cannot bind ${o.type} variable to scalar field "${n}"`);if(al.has(n)&&o.type!=="STRING")throw new Error(`Cannot bind ${o.type} variable to string field "${n}"`);if(ll.has(n)&&o.type!=="BOOLEAN")throw new Error(`Cannot bind ${o.type} variable to boolean field "${n}"`);if(!(Et(n)||al.has(n)||ll.has(n)||s))throw new Error(`Unknown binding field "${n}"`);e.willChangeNode(i),i.boundVariables={...i.boundVariables,[n]:r},Om(e,i,n),Cl(e,t,n),e.emitter.emit("node:updated",t,{boundVariables:{...i.boundVariables},variableBindingScales:{...i.variableBindingScales}})}function Ub(e,t,n){let r=e.nodes.get(t);r&&n in r.boundVariables&&(e.willChangeNode(r),r.boundVariables=We(r.boundVariables,[n]),r.variableBindingScales=We(r.variableBindingScales,[n]),Cl(e,t,n),e.emitter.emit("node:updated",t,{boundVariables:{...r.boundVariables},variableBindingScales:{...r.variableBindingScales}}))}function Cl(e,t,n){let r=e.nodes.get(t);if(!r)return;let i=bl(e,r);if(i.type!=="INSTANCE")return;let o=nn(e,t);o&&fe(o.instanceOverrides,o.id,t,"boundVariables"),fe(i.instanceOverrides,i.id,t,"boundVariables"),n&&fe(i.instanceOverrides,i.id,t,`boundVariables/${n}`,r.boundVariables[n]??null)}function Ol(e,t){return e.map(n=>{let{boundVariables:r,textStyleId:i,fillStyleId:o,hyperlink:s}=n.style,a=s?.type==="NODE"&&t.node!==void 0;if(!r&&!i&&!o&&!a)return n;let l={...n.style};return s?.type==="NODE"&&t.node&&(l.hyperlink={type:"NODE",value:t.node(s.value)}),r&&(l.boundVariables=ml(r,u=>u&&t.variable(u))),i&&(l.textStyleId=t.style(i)),o&&(l.fillStyleId=t.style(o)),{...n,style:l}})}var Dl=2147483647;function Rl(e){return e===null||e===1/0||(e??0)>=2147483647}function Oo(e){let t=e.count===void 0?e.numSections:e.count;return Rl(t)?Dl:t??1}var Am=["DECIMAL","LOWER_ALPHA","LOWER_ROMAN"];function Lm(e){return Am[(Math.max(1,e)-1)%Am.length]}function zb(e){let t="";for(let n=e;n>0;n=Math.floor((n-1)/26))t=String.fromCharCode(97+(n-1)%26)+t;return t}var Hb=[[1e3,"m"],[900,"cm"],[500,"d"],[400,"cd"],[100,"c"],[90,"xc"],[50,"l"],[40,"xl"],[10,"x"],[9,"ix"],[5,"v"],[4,"iv"],[1,"i"]];function Wb(e){let t=e,n="";for(let[r,i]of Hb)for(;t>=r;t-=r)n+=i;return n}function _m(e,t){return t==="LOWER_ALPHA"?zb(e):t==="LOWER_ROMAN"?Wb(e):String(e)}function Ml(e,t){if(!t.some(o=>o.listType!=="NONE"))return[];let n=[],r=[],i=-1;for(let[o,s]of Hn(e).entries()){let a=zr(t,o);if(a.listType==="NONE"){r.length=0,i=-1;continue}let l=Math.max(1,a.indentation);r.length=Math.min(r.length,l);let u=r[l-1],c=u?.listType===a.listType,f=c?u.count+1:1;r[l-1]={listType:a.listType,count:f};let p=r.slice(0,l-1).some(m=>m!==void 0);(i===-1||!c&&!p)&&(i=o);let d=a.listType==="UNORDERED"?"\u2022":`${_m(f,Lm(l))}.`;n.push({...s,paragraph:o,listType:a.listType,level:l,ordinal:f,marker:d,startsList:!c,groupStart:i})}return n}var Vm=["fontFamily","fontWeight","italic","fontSize","lineHeight","letterSpacing","textDecoration","textCase","fontFeatures"],Xb=new Set(Vm);function Fm(e,t){let n={...t};return"fills"in t&&!("fillStyleId"in t)&&e.fillStyleId&&(n.fillStyleId=null),"strokes"in t&&!("strokeStyleId"in t)&&e.strokeStyleId&&(n.strokeStyleId=null),"effects"in t&&!("effectStyleId"in t)&&e.effectStyleId&&(n.effectStyleId=null),"layoutGrids"in t&&!("gridStyleId"in t)&&e.gridStyleId&&(n.gridStyleId=null),Object.keys(t).some(r=>Xb.has(r))&&!("textStyleId"in t)&&e.textStyleId&&(n.textStyleId=null),n}var Gm=new Set([...Br,"textDecoration","fills","width","height"]),Bm=new Set(Br);function Um(e,t){let n={},r=Object.keys(t).filter(o=>!Re(e[o],t[o]));e.textPicture&&r.some(o=>Gm.has(o))&&(n.textPicture=null);let i=r.some(o=>Bm.has(o))||Ja.some(o=>r.includes(o));return i&&!("derivedLayout"in t)&&(n.derivedLayout=null),e.derivedTextGlyphs&&i&&!t.derivedTextGlyphs&&(e.textPathData&&r.every(o=>o==="width"||o==="height")||(n.derivedTextGlyphs=null,n.textPathData=null)),n}function jb(e,t){Object.assign(e,Um(e,t))}var $b=new Set(["x","y","width","height","rotation","flipX","flipY","parentId","childIds","layoutMode","layoutDirection","layoutWrap","primaryAxisSizing","counterAxisSizing","itemSpacing","counterAxisSpacing","paddingTop","paddingRight","paddingBottom","paddingLeft","layoutGrow","layoutAlignSelf","layoutPositioning","minWidth","maxWidth","minHeight","maxHeight","visible","text","fontSize","lineHeight","letterSpacing","styleRuns","textAutoResize"]);function Kb(e,t,n,r){let i=e.nodes.get(t);if(!i||(n=Object.fromEntries(Object.entries(n).filter(([,s])=>s!==void 0)),Object.keys(n).every(s=>i[s]===n[s])))return null;Object.keys(n).some(s=>$b.has(s))&&e.clearAbsPosCache();let o=n;return i.type==="TEXT"&&(o={...Um(i,n),...n}),n.vectorNetwork&&(o={...o,vectorNetwork:lo(n.vectorNetwork)}),r?.(i,o),e.positionPreviewVersion++,Object.assign(i,o),o}function Yb(e,t){if(t.length===0)return;let n=new Set(e.source.editedFields);for(let r of t)n.add(r);e.source.editedFields=[...n]}var qb=2;function Jb(){return qb+tp(2147483646)}var Zb=Jb(),Qb=1;function Do(){return`${Zb}:${Qb++}`}function xm(e){let t={};for(let n of Object.keys(e)){let r=e[n];r!==void 0&&(t[n]=r)}return t}var At,$r=(At=class{constructor(t=Do){G(this,"idGenerator");G(this,"nodes",new Map);G(this,"images",new Map);G(this,"variables",new Map);G(this,"variableCollections",new Map);G(this,"activeMode",new Map);G(this,"rootId");G(this,"figKiwiVersion",null);G(this,"figSchemaDeflated",null);G(this,"documentColorSpace","srgb");G(this,"enabledLibraries",new Map);G(this,"emitter",new em);G(this,"absPosCache",new Map);G(this,"previewMutationDepth",0);G(this,"previewObservers",[]);G(this,"changeObservers",new Set);G(this,"sourceMetadataPreservationDepth",0);G(this,"importedStateApplicationDepth",0);G(this,"importedIdGenerator");G(this,"layoutMutationDepth",0);G(this,"derivedLayoutDepth",0);G(this,"positionPreviewVersion",0);G(this,"instanceIndex",new Map);this.idGenerator=t;let n=Gn(this.idGenerator,"FRAME",{name:"Document",width:0,height:0});this.rootId=n.id,this.nodes.set(n.id,n),this.addPage("Page 1")}addPage(t){return this.createNode("CANVAS",this.rootId,{name:t,width:0,height:0})}getPages(t=!1){return this.getChildren(this.rootId).filter(n=>n.type==="CANVAS"&&(t||!n.internalOnly))}getAllNodes(){return this.nodes.values()}getNode(t){return this.nodes.get(t)}onNodeEvents(t){return tm(this.emitter,t)}observeNodeChanges(t){return this.changeObservers.add(t),()=>this.changeObservers.delete(t)}willChangeNode(t){if(t)for(let n of this.changeObservers)n.before(t)}countDescendants(t){let n=this.nodes.get(t);if(!n)return 0;let r=0,i=[...n.childIds];for(;i.length>0;){let o=i.pop();if(o===void 0)break;r++;let s=this.nodes.get(o);if(s)for(let a of s.childIds)i.push(a)}return r}addVariable(t){Dm(this,t)}removeVariable(t){Rm(this,t)}addCollection(t){Mm(this,t)}createVariable(t,n,r,i){return xb(this,()=>this.generateEntityId(),t,n,r,i)}createCollection(t){let n=new Set;return Nb(this,()=>this.generateEntityId(n),t)}createMode(t,n,r){return Db(this,()=>this.generateEntityId(),t,n,r)}removeCollection(t){Cb(this,t)}getActiveModeId(t){return Nl(this,t)}getNodeVariableModeId(t,n){return Co(this,t,n)}setActiveMode(t,n){Ob(this,t,n)}addMode(t,n,r,i){Pm(this,t,n,r,i)}removeMode(t,n){Rb(this,t,n)}renameMode(t,n,r){Mb(this,t,n,r)}setDefaultMode(t,n){Pb(this,t,n)}resolveVariable(t,n,r){return sn(this,t,n,r)}resolveColorVariable(t){return wb(this,t)}resolveNumberVariable(t){return kb(this,t)}resolveColorVariableForNode(t,n,r){return Lb(this,t,n,r)}resolveNumberVariableForNode(t,n,r){return _b(this,t,n,r)}resolveVariableForNode(t,n,r){return km(this,t,n,r)}resolveStringVariableForNode(t,n,r){return Vb(this,t,n,r)}getVariablesForCollection(t){return Fb(this,t)}getVariablesByType(t){return Gb(this,t)}bindVariable(t,n,r){Bb(this,t,n,r)}unbindVariable(t,n){Ub(this,t,n)}getChildren(t){let n=this.nodes.get(t);return n?n.childIds.map(r=>this.nodes.get(r)).filter(r=>r!==void 0):[]}isContainer(t){let n=this.nodes.get(t);return n?Wa.has(n.type):!1}isDescendant(t,n){return this.closest(t,r=>r.id===n)!==void 0}closest(t,n){let r=this.nodes.get(t);for(let i=0;r&&i<this.nodes.size;i++){if(n(r))return r;r=r.parentId?this.nodes.get(r.parentId):void 0}}pageOf(t){return this.closest(t,n=>n.type==="CANVAS")?.id??null}clearAbsPosCache(){this.absPosCache.clear()}getAbsolutePosition(t){let n=this.absPosCache.get(t);if(n)return n;let r=this.getNode(t);if(!r)return{x:0,y:0};let i=Jp(r,this);return this.absPosCache.set(t,i),i}getAbsoluteBounds(t){let n=this.getAbsolutePosition(t),r=this.nodes.get(t);return{x:n.x,y:n.y,width:r?.width??0,height:r?.height??0}}generateEntityId(t){let n=1/0;for(let r=0;r<n;r++){let i=(this.importedIdGenerator??this.idGenerator)();if(this.isEntityIdTaken(i)||t?.has(i)){n===1/0&&(n=this.entityIdCount()+(t?.size??0)+1);continue}return t?.add(i),i}throw new Error("The ID generator only returned IDs that are in use")}entityIdCount(){let t=this.nodes.size+this.variables.size+this.variableCollections.size;for(let n of this.variableCollections.values())t+=n.modes.length;return t}isEntityIdTaken(t){if(this.nodes.has(t)||this.variables.has(t)||this.variableCollections.has(t))return!0;for(let n of this.variableCollections.values())for(let r of n.modes)if(r.modeId===t)return!0;return!1}registerNode(t,n){t.parentId=n,this.nodes.set(t.id,t);for(let r of this.changeObservers)r.created(t);if(t.type==="INSTANCE"&&t.componentId){let r=this.instanceIndex.get(t.componentId);r||(r=new Set,this.instanceIndex.set(t.componentId,r)),r.add(t.id)}return this.emitter.emit("node:created",t),t}withBufferedEvents(t){return this.emitter.batch(t)}createNode(t,n,r={}){let i=Gn(()=>this.generateEntityId(),t,r),o=this.nodes.get(n);return this.willChangeNode(o),o?.childIds.push(i.id),this.registerNode(i,n)}createNodeWithId(t,n,r,i={}){let o=Gn(()=>t,n,i);o.id=t;let s=r?this.nodes.get(r):void 0;return s&&!s.childIds.includes(t)&&(this.willChangeNode(s),s.childIds.push(t)),this.registerNode(o,r)}runPreviewUpdates(t,n){this.previewMutationDepth++,n&&this.previewObservers.push(n);try{t()}finally{n&&this.previewObservers.pop(),this.previewMutationDepth--}}preserveSourceMetadataDuring(t){this.sourceMetadataPreservationDepth++;try{return t()}finally{this.sourceMetadataPreservationDepth--}}get isPreservingSourceMetadata(){return this.sourceMetadataPreservationDepth>0}applyImportedStateDuring(t,n){let r=this.importedIdGenerator;this.importedIdGenerator=n??r,this.importedStateApplicationDepth++;try{return this.preserveSourceMetadataDuring(t)}finally{this.importedStateApplicationDepth--,this.importedIdGenerator=r}}get isApplyingImportedState(){return this.importedStateApplicationDepth>0}applyDerivedLayoutDuring(t){this.derivedLayoutDepth++;try{t()}finally{this.derivedLayoutDepth--}}get isApplyingDerivedLayout(){return this.derivedLayoutDepth>0}withLayoutMutations(t){this.layoutMutationDepth++;try{t()}finally{this.layoutMutationDepth--}}get isApplyingLayout(){return this.layoutMutationDepth>0}updateNodePositionPreview(t,n,r){this.updateNodePreview(t,{x:n,y:r})}updateNodePreview(t,n){let r=Kb(this,t,n,(i,o)=>{for(let s of this.previewObservers)s(i,o)});r&&this.emitter.emit("node:previewUpdated",t,r)}updateNode(t,n){if(this.previewMutationDepth>0){this.updateNodePreview(t,n);return}let r=this.nodes.get(t);r&&(n=xm(Fm(r,xm(n))),this.applyNodeChanges(r,n))}restoreNodeProperties(t,n,r){let i=this.nodes.get(t);i&&this.applyNodeChanges(i,n,r)}applyNodeChanges(t,n,r=[]){let{id:i}=t;if(this.willChangeNode(t),r.length){n={...n};for(let o of r)Reflect.set(n,o,void 0)}if(Object.keys(n).some(o=>At.LAYOUT_AFFECTING_KEYS.has(o))&&this.absPosCache.clear(),t.type==="INSTANCE"&&"componentId"in n&&n.componentId!==t.componentId&&(t.componentId&&this.instanceIndex.get(t.componentId)?.delete(i),n.componentId)){let o=this.instanceIndex.get(n.componentId);o||(o=new Set,this.instanceIndex.set(n.componentId,o)),o.add(i)}t.type==="TEXT"&&jb(t,n),this.sourceMetadataPreservationDepth===0&&!this.isApplyingLayout&&Yb(t,Object.keys(n)),n.vectorNetwork&&(n={...n,vectorNetwork:lo(n.vectorNetwork)}),Object.assign(t,n),n.fills&&hl(t,"fills",n),n.strokes&&hl(t,"strokes",n);for(let o of r)Reflect.deleteProperty(t,o);this.emitter.emit("node:updated",i,n)}reparentNode(t,n){let r=this.nodes.get(t);if(!r||t===this.rootId||this.isDescendant(n,t))return;let i=r.parentId?this.nodes.get(r.parentId):void 0,o=this.nodes.get(n);if(!o||r.parentId===n)return;let s=r.parentId;this.willChangeNode(r),this.willChangeNode(i),this.willChangeNode(o),this.absPosCache.clear();let a=this.parentWorldMatrix(i),l=this.parentWorldMatrix(o);if(i&&(i.childIds=i.childIds.filter(u=>u!==t)),r.parentId=n,o.childIds.push(t),dl(a)&&dl(l))r.x+=a[2]-l[2],r.y+=a[5]-l[5];else{let u=be.multiply(a,vo(r)),c=Zp(r,u,l);c&&Object.assign(r,c)}this.emitter.emit("node:reparented",t,s,n)}parentWorldMatrix(t){return qp(t,this)}reorderChild(t,n,r){let i=this.nodes.get(t);if(!i)return;let o=i.parentId,s=o?this.nodes.get(o):void 0,a=this.nodes.get(n);if(!a||this.isDescendant(n,t))return;this.willChangeNode(i),this.willChangeNode(s),this.willChangeNode(a),s&&(s.childIds=s.childIds.filter(u=>u!==t));let l=r;s===a&&l>(s.childIds.includes(t)?s.childIds.length:l),i.parentId=n,this.absPosCache.clear(),l=Math.min(l,a.childIds.length),a.childIds.splice(l,0,t),this.emitter.emit("node:reordered",t,n,l,o)}insertChildAt(t,n,r){let i=this.getNode(t),o=this.getNode(n);if(!i||!o||t===n||this.isDescendant(n,t))return;let s=i.parentId,a=s?this.getNode(s):void 0;this.willChangeNode(i),this.willChangeNode(a),this.willChangeNode(o),a&&(a.childIds=a.childIds.filter(l=>l!==t)),o.childIds=o.childIds.filter(l=>l!==t),o.childIds.splice(r,0,t),i.parentId=n,this.clearAbsPosCache(),this.emitter.emit("node:reordered",t,n,r,s)}deleteNode(t){let n=this.nodes.get(t);if(!(!n||t===this.rootId)){if(this.willChangeNode(n),n.parentId){let r=this.nodes.get(n.parentId);this.willChangeNode(r),r&&(r.childIds=r.childIds.filter(i=>i!==t))}for(let r of Array.from(n.childIds))this.deleteNode(r);n.type==="INSTANCE"&&n.componentId&&this.instanceIndex.get(n.componentId)?.delete(t),this.nodes.delete(t),this.emitter.emit("node:deleted",t,n.parentId)}}hitTest(t,n,r){return sm(this,t,n,r)}hitTestDeep(t,n,r,i=0){return am(this,t,n,r,i)}hitTestSelectable(t,n,r,i,o=0){return lm(this,t,n,r,i,o)}hitTestOpenContainer(t,n,r){return cm(this,t,n,r)}isOpenContainer(t){return um(this,t)}isPointInNode(t,n,r){return fm(this,t,n,r)}hitTestDropTarget(t,n,r,i,o){return pm(this,t,n,r,i,o)}cloneTree(t,n,r={}){let i=this.nodes.get(t);if(!i)return null;let o=Un(i,null);o.source={...o.source,id:null,orderKey:null};let s=this.createNode(i.type,n,{...o,...r});for(let a of i.childIds)this.cloneTree(a,s.id);return s}createInstance(t,n,r={}){return Fp(this,t,n,r)}populateInstanceChildren(t,n,r="deep"){Gp(this,t,n,r)}swapInstanceComponent(t,n,r){Bp(this,t,n,r)}syncInstances(t){cl(this,t)}syncInstancesTogether(t){Up(this,t)}syncInstance(t){zp(this,t)}detachInstance(t){Wp(this,t)}getMainComponent(t){return Xp(this,t)}getInstances(t){return fl(this,t)}flattenTree(t,n=0){let r=t??this.rootId,i=this.nodes.get(r);if(!i)return[];let o=[];for(let s of i.childIds){let a=this.nodes.get(s);a&&(o.push({node:a,depth:n}),a.childIds.length>0&&o.push(...this.flattenTree(s,n+1)))}return o}},G(At,"TEXT_PICTURE_KEYS",Gm),G(At,"GLYPH_AFFECTING_KEYS",Bm),G(At,"LAYOUT_AFFECTING_KEYS",new Set([...jp,...$p,"layoutMode","layoutDirection","itemSpacing","counterAxisSpacing","paddingLeft","paddingRight","paddingTop","paddingBottom","primaryAxisAlign","counterAxisAlign","counterAxisAlignContent","layoutWrap","primaryAxisSizing","counterAxisSizing","layoutPositioning","layoutGrow","layoutAlignSelf","strokesIncludedInLayout","horizontalConstraint","verticalConstraint","gridTemplateColumns","gridTemplateRows","gridColumnGap","gridRowGap","gridPosition","minWidth","maxWidth","minHeight","maxHeight","targetAspectRatio"])),At);function Ro(e){return Im(bm(e))}function Mo(e,t,n){return n==null?Math.min(e,t):Math.min(Math.max(e,t),n)}var Po={100:"Thin",200:"Extra Light",300:"Light",400:"Regular",500:"Medium",600:"Semi Bold",700:"Bold",800:"Extra Bold",900:"Black"},e1=new Map([{weight:100,names:["thin","hairline","extrathin","ultrathin"]},{weight:200,names:["extralight","ultralight"]},{weight:300,names:["light"]},{weight:400,names:["regular","normal","book","roman","plain"]},{weight:500,names:["medium"]},{weight:600,names:["semibold","demibold"]},{weight:700,names:["bold"]},{weight:800,names:["extrabold","ultrabold"]},{weight:900,names:["black","heavy"]}].flatMap(({names:e,weight:t})=>e.map(n=>[n,t])));function zm(e){return e.toLowerCase().replace(/italic|oblique/u,"").replace(/[^a-z0-9]+/gu,"")}function Hm(e){let t=e??"",n=/(?:italic|oblique)/iu.test(t),r=zm(t),i=r.match(/(?:^|[^0-9])([1-9]00)(?:[^0-9]|$)/u)?.[1];return{weight:i?Number(i):e1.get(r)??400,italic:n}}function wo(e){return Hm(e).weight}function Kr(e){return e.replace(/\s+(Variable|\d+(?:pt|px|em))$/i,"")}function Pl(e,t=!1){let n=Math.round(e/100)*100,r=(Po[n]??"Regular").replace(/ /g,"");return t?`${r} Italic`:r}var Wm=vs(Si(),1);function Xm(e,t="NONZERO",n={}){let r=E1(e,t,{includeOpenRegions:n.includeOpenRegions??!1,strictCommands:!1});return r.ok?r.network:{vertices:[],segments:[],regions:[]}}function E1(e,t,n){let r=[],i=[],o=[],s=null,a=0,l=0,u=new Map;function c(g,I){let S=`${g},${I}`,E=u.get(S);if(E!==void 0)return E;let T=r.length;return r.push({x:g,y:I}),u.set(S,T),T}function f(g,I,S,E,T,C,x,D){let M=c(g,I),V=c(S,E),L=i.length;i.push({start:M,end:V,tangentStart:{x:T-g,y:C-I},tangentEnd:{x:x-S,y:D-E}}),s&&s.segmentIndices.push(L)}function p(g,I,S,E){f(g,I,S,E,g,I,S,E)}function d(g,I,S,E,T,C,x,D){f(g,I,x,D,S,E,T,C)}let m=(0,Wm.default)(e),h="err"in m&&typeof m.err=="string"?m.err:null;if(h)return{ok:!1,error:h};if(n.strictCommands){let g=new Set;m.iterate(S=>{["M","L","Q","C","Z"].includes(S[0])||g.add(S[0])});let I=g.values().next().value;if(I!==void 0)return{ok:!1,error:`Unsupported path command ${I}`}}m.abs().unshort().unarc().iterate(g=>{let I=g[0];if(I==="M")a=g[1],l=g[2],s={startVertexIndex:c(a,l),segmentIndices:[],closed:!1},o.push(s);else if(I==="L")p(a,l,g[1],g[2]),a=g[1],l=g[2];else if(I==="H")p(a,l,g[1],l),a=g[1];else if(I==="V")p(a,l,a,g[1]),l=g[1];else if(I==="C")d(a,l,g[1],g[2],g[3],g[4],g[5],g[6]),a=g[5],l=g[6];else if(I==="Q"){let S=g[1],E=g[2],T=g[3],C=g[4],x=a+2/3*(S-a),D=l+2/3*(E-l),M=T+2/3*(S-T),V=C+2/3*(E-C);d(a,l,x,D,M,V,T,C),a=T,l=C}else if((I==="Z"||I==="z")&&s){let S=r[s.startVertexIndex];(Math.abs(a-S.x)>.001||Math.abs(l-S.y)>.001)&&p(a,l,S.x,S.y),s.closed=!0,a=S.x,l=S.y}});let y=[],v=o.filter(g=>t!=="NONE"&&g.segmentIndices.length>0&&(g.closed||n.includeOpenRegions));return v.length>0&&t!=="NONE"&&y.push({windingRule:t,loops:v.map(g=>g.segmentIndices)}),{ok:!0,network:{vertices:r,segments:i,regions:y}}}var an={sessionID:4294967295,localID:4294967295};function ln(e){return e.sessionID===an.sessionID&&e.localID===an.localID}function F(e){return`${e.sessionID}:${e.localID}`}function _e(e){let t=e.match(/^(?:VariableID:|VariableCollectionId:)?(\d+):(\d+)$/);if(t)return{sessionID:Number.parseInt(t[1],10),localID:Number.parseInt(t[2],10)};let[n,r]=e.split(":");return{sessionID:Number.parseInt(n,10),localID:Number.parseInt(r,10)}}var wl={min:3,max:60};function jm(e){let t={};for(let n of e.split(",").map(r=>r.trim())){let r=n.indexOf("=");r!==-1&&(t[n.slice(0,r).trim()]=n.slice(r+1).trim())}return t}var A1=ArrayBuffer,de=Uint8Array,ko=Uint16Array,x1=Int16Array;var Lo=Int32Array,kl=function(e,t,n){if(de.prototype.slice)return de.prototype.slice.call(e,t,n);(t==null||t<0)&&(t=0),(n==null||n>e.length)&&(n=e.length);var r=new de(n-t);return r.set(e.subarray(t,n)),r},qr=function(e,t,n,r){if(de.prototype.fill)return de.prototype.fill.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;++n)e[n]=t;return e},N1=function(e,t,n,r){if(de.prototype.copyWithin)return de.prototype.copyWithin.call(e,t,n,r);for((n==null||n<0)&&(n=0),(r==null||r>e.length)&&(r=e.length);n<r;)e[t++]=e[n++]};var C1=["invalid zstd data","window size too large (>2046MB)","invalid block type","FSE accuracy too high","match distance too far back","unexpected EOF"],me=function(e,t,n){var r=new Error(t||C1[e]);if(r.code=e,Error.captureStackTrace&&Error.captureStackTrace(r,me),!n)throw r;return r},$m=function(e,t,n){for(var r=0,i=0;r<n;++r)i|=e[t++]<<(r<<3);return i},O1=function(e,t){return(e[t]|e[t+1]<<8|e[t+2]<<16|e[t+3]<<24)>>>0},D1=function(e,t){var n=e[0]|e[1]<<8|e[2]<<16;if(n==3126568&&e[3]==253){var r=e[4],i=r>>5&1,o=r>>2&1,s=r&3,a=r>>6;r&8&&me(0);var l=6-i,u=s==3?4:s,c=$m(e,l,u);l+=u;var f=a?1<<a:i,p=$m(e,l,f)+(a==1&&256),d=p;if(!i){var m=1<<10+(e[5]>>3);d=m+(m>>3)*(e[5]&7)}d>2145386496&&me(1);var h=new de((t==1?p||d:t?0:d)+12);return h[0]=1,h[4]=4,h[8]=8,{b:l+f,y:0,l:0,d:c,w:t&&t!=1?t:h.subarray(12),e:d,o:new Lo(h.buffer,0,3),u:p,c:o,m:Math.min(131072,d)}}else if((n>>4|e[3]<<20)==25481893)return O1(e,4)+8;me(0)},un=function(e){for(var t=0;1<<t<=e;++t);return t-1},Jr=function(e,t,n){var r=(t<<3)+4,i=(e[t]&15)+5;i>n&&me(3);for(var o=1<<i,s=o,a=-1,l=-1,u=-1,c=o,f=new A1(512+(o<<2)),p=new x1(f,0,256),d=new ko(f,0,256),m=new ko(f,512,o),h=512+(o<<1),y=new de(f,h,o),v=new de(f,h+o);a<255&&s>0;){var g=un(s+1),I=r>>3,S=(1<<g+1)-1,E=(e[I]|e[I+1]<<8|e[I+2]<<16)>>(r&7)&S,T=(1<<g)-1,C=S-s-1,x=E&T;if(x<C?(r+=g,E=x):(r+=g+1,E>T&&(E-=C)),p[++a]=--E,E==-1?(s+=E,y[--c]=a):s-=E,!E)do{var D=r>>3;l=(e[D]|e[D+1]<<8)>>(r&7)&3,r+=2,a+=l}while(l==3)}(a>255||s)&&me(0);for(var M=0,V=(o>>1)+(o>>3)+3,L=o-1,A=0;A<=a;++A){var N=p[A];if(N<1){d[A]=-N;continue}for(u=0;u<N;++u){y[M]=A;do M=M+V&L;while(M>=c)}}for(M&&me(0),u=0;u<o;++u){var b=d[y[u]]++,R=v[u]=i-un(b);m[u]=(b<<R)-o}return[r+7>>3,{b:i,s:y,n:v,t:m}]},R1=function(e,t){var n=0,r=-1,i=new de(292),o=e[t],s=i.subarray(0,256),a=i.subarray(256,268),l=new ko(i.buffer,268);if(o<128){var u=Jr(e,t+1,6),c=u[0],f=u[1];t+=o;var p=c<<3,d=e[t];d||me(0);for(var m=0,h=0,y=f.b,v=y,g=(++t<<3)-8+un(d);g-=y,!(g<p);){var I=g>>3;if(m+=(e[I]|e[I+1]<<8)>>(g&7)&(1<<y)-1,s[++r]=f.s[m],g-=v,g<p)break;I=g>>3,h+=(e[I]|e[I+1]<<8)>>(g&7)&(1<<v)-1,s[++r]=f.s[h],y=f.n[m],m=f.t[m],v=f.n[h],h=f.t[h]}++r>255&&me(0)}else{for(r=o-127;n<r;n+=2){var S=e[++t];s[n]=S>>4,s[n+1]=S&15}++t}var E=0;for(n=0;n<r;++n){var T=s[n];T>11&&me(0),E+=T&&1<<T-1}var C=un(E)+1,x=1<<C,D=x-E;for(D&D-1&&me(0),s[r++]=un(D)+1,n=0;n<r;++n){var T=s[n];++a[s[n]=T&&C+1-T]}var M=new de(x<<1),V=M.subarray(0,x),L=M.subarray(x);for(l[C]=0,n=C;n>0;--n){var A=l[n];qr(L,n,A,l[n-1]=A+a[n]*(1<<C-n))}for(l[0]!=x&&me(0),n=0;n<r;++n){var N=s[n];if(N){var b=l[N];qr(V,n,b,l[N]=b+(1<<C-N))}}return[t,{n:L,b:C,s:V}]},M1=Jr(new de([81,16,99,140,49,198,24,99,12,33,196,24,99,102,102,134,70,146,4]),0,6)[1],P1=Jr(new de([33,20,196,24,99,140,33,132,16,66,8,33,132,16,66,8,33,68,68,68,68,68,68,68,68,36,9]),0,6)[1],w1=Jr(new de([32,132,16,66,102,70,68,68,68,68,36,73,2]),0,5)[1],Km=function(e,t){for(var n=e.length,r=new Lo(n),i=0;i<n;++i)r[i]=t,t+=1<<e[i];return r},Ll=new de(new Lo([0,0,0,0,16843009,50528770,134678020,202050057,269422093]).buffer,0,36),k1=Km(Ll,0),_l=new de(new Lo([0,0,0,0,0,0,0,0,16843009,50528770,117769220,185207048,252579084,16]).buffer,0,53),L1=Km(_l,3),Yr=function(e,t,n){var r=e.length,i=t.length,o=e[r-1],s=(1<<n.b)-1,a=-n.b;o||me(0);for(var l=0,u=n.b,c=(r<<3)-8+un(o)-u,f=-1;c>a&&f<i;){var p=c>>3,d=(e[p]|e[p+1]<<8|e[p+2]<<16)>>(c&7);l=(l<<u|d)&s,t[++f]=n.s[l],c-=u=n.n[l]}(c!=a||f+1!=i)&&me(0)},_1=function(e,t,n){var r=6,i=t.length,o=i+3>>2,s=o<<1,a=o+s;Yr(e.subarray(r,r+=e[0]|e[1]<<8),t.subarray(0,o),n),Yr(e.subarray(r,r+=e[2]|e[3]<<8),t.subarray(o,s),n),Yr(e.subarray(r,r+=e[4]|e[5]<<8),t.subarray(s,a),n),Yr(e.subarray(r),t.subarray(a),n)},V1=function(e,t,n){var r,i=t.b,o=e[i],s=o>>1&3;t.l=o&1;var a=o>>3|e[i+1]<<5|e[i+2]<<13,l=(i+=3)+a;if(s==1)return i>=e.length?void 0:(t.b=i+1,n?(qr(n,e[i],t.y,t.y+=a),n):qr(new de(a),e[i]));if(!(l>e.length)){if(s==0)return t.b=l,n?(n.set(e.subarray(i,l),t.y),t.y+=a,n):kl(e,i,l);if(s==2){var u=e[i],c=u&3,f=u>>2&3,p=u>>4,d=0,m=0;c<2?f&1?p|=e[++i]<<4|(f&2&&e[++i]<<12):p=u>>3:(m=f,f<2?(p|=(e[++i]&63)<<4,d=e[i]>>6|e[++i]<<2):f==2?(p|=e[++i]<<4|(e[++i]&3)<<12,d=e[i]>>2|e[++i]<<6):(p|=e[++i]<<4|(e[++i]&63)<<12,d=e[i]>>6|e[++i]<<2|e[++i]<<10)),++i;var h=n?n.subarray(t.y,t.y+t.m):new de(t.m),y=h.length-p;if(c==0)h.set(e.subarray(i,i+=p),y);else if(c==1)qr(h,e[i++],y);else{var v=t.h;if(c==2){var g=R1(e,i);d+=i-(i=g[0]),t.h=v=g[1]}else v||me(0);(m?_1:Yr)(e.subarray(i,i+=d),h.subarray(y),v)}var I=e[i++];if(I){I==255?I=(e[i++]|e[i++]<<8)+32512:I>127&&(I=I-128<<8|e[i++]);var S=e[i++];S&3&&me(0);for(var E=[P1,w1,M1],T=2;T>-1;--T){var C=S>>(T<<1)+2&3;if(C==1){var x=new de([0,0,e[i++]]);E[T]={s:x.subarray(2,3),n:x.subarray(0,1),t:new ko(x.buffer,0,1),b:0}}else C==2?(r=Jr(e,i,9-(T&1)),i=r[0],E[T]=r[1]):C==3&&(t.t||me(0),E[T]=t.t[T])}var D=t.t=E,M=D[0],V=D[1],L=D[2],A=e[l-1];A||me(0);var N=(l<<3)-8+un(A)-L.b,b=N>>3,R=0,_=(e[b]|e[b+1]<<8)>>(N&7)&(1<<L.b)-1;b=(N-=V.b)>>3;var O=(e[b]|e[b+1]<<8)>>(N&7)&(1<<V.b)-1;b=(N-=M.b)>>3;var k=(e[b]|e[b+1]<<8)>>(N&7)&(1<<M.b)-1;for(++I;--I;){var U=L.s[_],X=L.n[_],$=M.s[k],j=M.n[k],K=V.s[O],B=V.n[O];b=(N-=K)>>3;var te=1<<K,re=te+((e[b]|e[b+1]<<8|e[b+2]<<16|e[b+3]<<24)>>>(N&7)&te-1);b=(N-=_l[$])>>3;var Ce=L1[$]+((e[b]|e[b+1]<<8|e[b+2]<<16)>>(N&7)&(1<<_l[$])-1);b=(N-=Ll[U])>>3;var dt=k1[U]+((e[b]|e[b+1]<<8|e[b+2]<<16)>>(N&7)&(1<<Ll[U])-1);if(b=(N-=X)>>3,_=L.t[_]+((e[b]|e[b+1]<<8)>>(N&7)&(1<<X)-1),b=(N-=j)>>3,k=M.t[k]+((e[b]|e[b+1]<<8)>>(N&7)&(1<<j)-1),b=(N-=B)>>3,O=V.t[O]+((e[b]|e[b+1]<<8)>>(N&7)&(1<<B)-1),re>3)t.o[2]=t.o[1],t.o[1]=t.o[0],t.o[0]=re-=3;else{var pt=re-(dt!=0);pt?(re=pt==3?t.o[0]-1:t.o[pt],pt>1&&(t.o[2]=t.o[1]),t.o[1]=t.o[0],t.o[0]=re):re=t.o[0]}for(var T=0;T<dt;++T)h[R+T]=h[y+T];R+=dt,y+=dt;var $e=R-re;if($e<0){var Ke=-$e,Ct=t.e+$e;Ke>Ce&&(Ke=Ce);for(var T=0;T<Ke;++T)h[R+T]=t.w[Ct+T];R+=Ke,Ce-=Ke,$e=0}for(var T=0;T<Ce;++T)h[R+T]=h[$e+T];R+=Ce}if(R!=y)for(;y<h.length;)h[R++]=h[y++];else R=h.length;n?t.y+=R:h=kl(h,0,R)}else if(n){if(t.y+=p,y)for(var T=0;T<p;++T)h[T]=h[y+T]}else y&&(h=kl(h,y));return t.b=l,h}me(2)}},F1=function(e,t){if(e.length==1)return e[0];for(var n=new de(t),r=0,i=0;r<e.length;++r){var o=e[r];n.set(o,i),i+=o.length}return n};function Ym(e,t){for(var n=[],r=+!t,i=0,o=0;e.length;){var s=D1(e,r||t);if(typeof s=="object"){for(r?(t=null,s.w.length==s.u&&(n.push(t=s.w),o+=s.u)):(n.push(t),s.e=0);!s.l;){var a=V1(e,s,t);a||me(5),t?s.e=s.y:(n.push(a),o+=a.length,N1(s.w,0,a.length),s.w.set(a,s.w.length-a.length))}i=s.b+s.c*4}else i=s;e=e.subarray(i)}return F1(n,o)}var Fl=new Int32Array(1),qm=new Float32Array(Fl.buffer),G1=new TextDecoder,tt=class{constructor(e){G(this,"_data");G(this,"_index");G(this,"length");if(e&&!(e instanceof Uint8Array))throw new Error("Must initialize a ByteBuffer with a Uint8Array");this._data=e||new Uint8Array(256),this._index=0,this.length=e?e.length:0}get offset(){return this._index}set offset(e){this._index=e}get bytes(){return this._data}toUint8Array(){return this._data.subarray(0,this.length)}readByte(){return this._data[this._index++]}readByteArray(){let e=this.readVarUint(),t=this._index;return this._index=t+e,this._data.slice(t,t+e)}skipByteArray(){let e=this.readVarUint();this._index+=e}readVarFloat(){let e=this._index,t=this._data,n=t[e];if(n===0)return this._index=e+1,0;let r=n|t[e+1]<<8|t[e+2]<<16|t[e+3]<<24;return this._index=e+4,r=r<<23|r>>>9,Fl[0]=r,qm[0]}readVarUint(){let e=this._data,t=this._index,n=e[t++],r=n&127;return n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<7,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<14,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<21,n<128?(this._index=t,r):(n=e[t++],r|=(n&127)<<28,this._index=t,r>>>0))))}readVarInt(){let e=this.readVarUint()|0;return e&1?~(e>>>1):e>>>1}readVarUint64(){let e=BigInt(0),t=BigInt(0),n=BigInt(7),r=this.readByte();for(;r&128&&t<56;)e|=BigInt(r&127)<<t,t+=n,r=this.readByte();return e|=BigInt(r)<<t,e}readVarInt64(){let e=this.readVarUint64(),t=BigInt(1),n=e&t;return e>>=t,n?~e:e}readString(){let e=this._index,t=this.findStringTerminator(e);return this._index=t+1,G1.decode(this._data.subarray(e,t))}skipString(){this._index=this.findStringTerminator(this._index)+1}findStringTerminator(e){let t=this._data,n=e;for(;n<t.length&&t[n]!==0;)n++;if(n>=t.length)throw new Error("Unterminated string in Kiwi message");return n}_growBy(e){if(this.length+e>this._data.length){let t=new Uint8Array(this.length+e<<1);t.set(this._data),this._data=t}this.length+=e}writeByte(e){let t=this.length;this._growBy(1),this._data[t]=e}writeByteArray(e){if(!(e instanceof Uint8Array)&&!Array.isArray(e))throw new Error("Expected byte array");this.writeVarUint(e.length);let t=this.length;this._growBy(e.length),this._data.set(e,t)}writeVarFloat(e){let t=this.length;qm[0]=e;let n=Fl[0];if(n=n>>>23|n<<9,(n&255)===0){this.writeByte(0);return}this._growBy(4);let r=this._data;r[t]=n,r[t+1]=n>>8,r[t+2]=n>>16,r[t+3]=n>>24}writeVarUint(e){if(e<0||e>4294967295)throw new Error("Outside uint range: "+e);do{let t=e&127;e>>>=7,this.writeByte(e?t|128:t)}while(e)}writeVarInt(e){if(e<-2147483648||e>2147483647)throw new Error("Outside int range: "+e);this.writeVarUint((e<<1^e>>31)>>>0)}writeVarUint64(e){if(typeof e=="string")e=BigInt(e);else if(typeof e!="bigint")throw new Error(`Expected bigint but got ${typeof e}: ${String(e)}`);if(e<0||e>BigInt("0xFFFFFFFFFFFFFFFF"))throw new Error("Outside uint64 range: "+e);let t=BigInt(127),n=BigInt(7);for(let r=0;e>t&&r<8;r++)this.writeByte(Number(e&t)|128),e>>=n;this.writeByte(Number(e))}writeVarInt64(e){if(typeof e=="string")e=BigInt(e);else if(typeof e!="bigint")throw new Error(`Expected bigint but got ${typeof e}: ${String(e)}`);if(e<-BigInt("0x8000000000000000")||e>BigInt("0x7FFFFFFFFFFFFFFF"))throw new Error("Outside int64 range: "+e);let t=BigInt(1);this.writeVarUint64(e<0?~(e<<t):e<<t)}writeString(e){let t;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);if(n+1===e.length||r<55296||r>=56320)t=r;else{let i=e.charCodeAt(++n);t=(r<<10)+i+-56613888}if(t===0)throw new Error("Cannot encode a string containing the null character");t<128?this.writeByte(t):(t<2048?this.writeByte(t>>6&31|192):(t<65536?this.writeByte(t>>12&15|224):(this.writeByte(t>>18&7|240),this.writeByte(t>>12&63|128)),this.writeByte(t>>6&63|128)),this.writeByte(t&63|128))}this.writeByte(0)}};function ne(e){return JSON.stringify(e)}function ce(e,t,n){var r=new Error(e);throw r.line=t,r.column=n,r}var th=["bool","byte","float","int","int64","string","uint","uint64"],B1=["ByteBuffer","package"],U1=/((?:-|\b)\d+\b|[=;{}]|\[\]|\[deprecated\]|\b[A-Za-z_][A-Za-z0-9_]*\b|\/\/.*|\s+)/g,_o=/^[A-Za-z_][A-Za-z0-9_]*$/,z1=/^\/\/.*|\s+$/,H1=/^=$/,W1=/^$/,Jm=/^;$/,X1=/^-?\d+$/,j1=/^\{$/,$1=/^\}$/,K1=/^\[\]$/,Y1=/^enum$/,q1=/^struct$/,J1=/^message$/,Z1=/^package$/,Q1=/^\[deprecated\]$/;function eE(e){let t=e.split(U1),n=[],r=0,i=0;for(let o=0;o<t.length;o++){let s=t[o];o&1?z1.test(s)||n.push({text:s,line:i+1,column:r+1}):s!==""&&ce("Syntax error "+ne(s),i+1,r+1);let a=s.split(`
`);a.length>1&&(r=0),i+=a.length-1,r+=a[a.length-1].length}return n.push({text:"",line:i,column:r}),n}function tE(e){function t(){return e[a]}function n(l){return l.test(t().text)?(a++,!0):!1}function r(l,u){if(!n(l)){let c=t();ce("Expected "+u+" but found "+ne(c.text),c.line,c.column)}}function i(){let l=t();ce("Unexpected token "+ne(l.text),l.line,l.column)}let o=[],s=null,a=0;for(n(Z1)&&(s=t().text,r(_o,"identifier"),r(Jm,'";"'));a<e.length&&!n(W1);){let l=[],u;n(Y1)?u="ENUM":n(q1)?u="STRUCT":n(J1)?u="MESSAGE":i();let c=t();for(r(_o,"identifier"),r(j1,'"{"');!n($1);){let f=null,p=!1,d=!1;u!=="ENUM"&&(f=t().text,r(_o,"identifier"),p=n(K1));let m=t();r(_o,"identifier");let h=null;u!=="STRUCT"&&(r(H1,'"="'),h=t(),r(X1,"integer"),(+h.text|0)+""!==h.text&&ce("Invalid integer "+ne(h.text),h.line,h.column));let y=t();n(Q1)&&(u!=="MESSAGE"&&ce("Cannot deprecate this field",y.line,y.column),d=!0),r(Jm,'";"'),l.push({name:m.text,line:m.line,column:m.column,type:f,isArray:p,isDeprecated:d,value:h!==null?+h.text|0:l.length+1})}o.push({name:c.text,line:c.line,column:c.column,kind:u,fields:l})}return{package:s,definitions:o}}function nE(e){let t=th.slice(),n={};for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o];t.includes(s.name)&&ce("The type "+ne(s.name)+" is defined twice",s.line,s.column),B1.includes(s.name)&&ce("The type name "+ne(s.name)+" is reserved",s.line,s.column),t.push(s.name),n[s.name]=s}for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o],a=s.fields;if(s.kind==="ENUM"||a.length===0)continue;for(let u=0;u<a.length;u++){let c=a[u];t.includes(c.type)||ce("The type "+ne(c.type)+" is not defined for field "+ne(c.name),c.line,c.column)}let l=[];for(let u=0;u<a.length;u++){let c=a[u];l.includes(c.value)&&ce("The id for field "+ne(c.name)+" is used twice",c.line,c.column),c.value<=0&&ce("The id for field "+ne(c.name)+" must be positive",c.line,c.column),l.push(c.value)}}let r={},i=o=>{let s=n[o];if(s&&s.kind==="STRUCT"&&(r[o]===1&&ce("Recursive nesting of "+ne(o)+" is not allowed",s.line,s.column),r[o]!==2&&s)){r[o]=1;let a=s.fields;for(let l=0;l<a.length;l++){let u=a[l];u.isArray||i(u.type)}r[o]=2}return!0};for(let o=0;o<e.definitions.length;o++)i(e.definitions[o].name)}function nh(e){let t=tE(eE(e));return nE(t),t}function zl(e){let t=new Map(e.definitions.map(a=>[a.name,a])),n=new Map,r=a=>{let l=t.get(a);return l||ce("Invalid type "+ne(a),0,0),l},i=a=>{let l=n.get(a.name);return l||(l=new Map(a.fields.map(u=>[u.value,u])),n.set(a.name,l)),l},o=(a,l)=>{switch(a){case"bool":case"byte":l.readByte();return;case"int":case"uint":l.readVarUint();return;case"float":l.readVarFloat();return;case"string":l.skipString();return;case"int64":case"uint64":l.readVarUint64();return}let u=r(a);if(u.kind==="ENUM"){l.readVarUint();return}if(u.kind==="STRUCT"){for(let f of u.fields)s(f,l);return}let c=i(u);for(let f=l.readVarUint();f!==0;f=l.readVarUint()){let p=c.get(f);if(!p)throw new Error("Attempted to parse invalid message");s(p,l)}},s=(a,l)=>{let u=a.type;if(u===null&&ce("Invalid type null for field "+ne(a.name),a.line,a.column),!a.isArray){o(u,l);return}if(u==="byte"){l.skipByteArray();return}for(let c=l.readVarUint();c>0;c--)o(u,l)};return{definition:r,fieldsById:a=>i(r(a)),skipField:s,skipValue:o}}var rh=Symbol("header bytes"),ih=Symbol("header start"),oh=Symbol("header whole decoder"),Gl=0;function Hl(e){let t=Reflect.get(e,rh),n=Reflect.get(e,ih),r=Reflect.get(e,oh);if(!(t instanceof Uint8Array)||typeof n!="number"||typeof r!="function")return;let i=new tt(t);return i.offset=n,r(i)}function Vl(e,t,n){Reflect.defineProperty(e,t,{value:n,enumerable:!1})}function rE(e){return t=>{Gl++;try{return e(t)}finally{Gl--}}}function iE(e,t){return Object.hasOwn(e,t)}function oE(e){let t=Object.values(e);for(let n=0;n<t.length;n++){let r=t[n];if(r.kind!=="ENUM")for(let i=0;i<r.fields.length;i++){let o=r.fields[i],s=o.type;s===null&&ce("Invalid type null for field "+ne(o.name),o.line,o.column),!th.includes(s)&&!iE(e,s)&&ce("Invalid type "+ne(s)+" for field "+ne(o.name),o.line,o.column)}}}function Vo(e,t,n,r){switch(n){case"bool":return!!r.readByte();case"byte":return r.readByte();case"int":return r.readVarInt();case"uint":return r.readVarUint();case"float":return r.readVarFloat();case"string":return r.readString();case"int64":return r.readVarInt64();case"uint64":return r.readVarUint64();default:{let i=t[n];return i||ce("Invalid type "+ne(n),0,0),i.kind==="ENUM"?e[i.name][r.readVarUint()]:(0,e["decode"+i.name])(r)}}}function Zm(e,t,n,r,i){switch(n){case"bool":case"byte":i.writeByte(r);return;case"int":i.writeVarInt(r);return;case"uint":i.writeVarUint(r);return;case"float":i.writeVarFloat(r);return;case"string":i.writeString(r);return;case"int64":i.writeVarInt64(r);return;case"uint64":i.writeVarUint64(r);return;default:{let o=t[n];if(o||ce("Invalid type "+ne(n),0,0),o.kind==="ENUM"){let s=e[o.name][r];if(s===void 0)throw new Error("Invalid value "+JSON.stringify(r)+" for enum "+ne(o.name));i.writeVarUint(s)}else(0,e["encode"+o.name])(r,i)}}}function Qm(e,t,n,r,i){let o=n.type;if(o===null&&ce("Invalid type null for field "+ne(n.name),n.line,n.column),n.isArray){if(n.isDeprecated){if(o==="byte")r.readByteArray();else{let l=r.readVarUint();for(;l-- >0;)Vo(e,t,o,r)}return}if(o==="byte"){i[n.name]=r.readByteArray();return}let s=r.readVarUint(),a=Array.from({length:s});i[n.name]=a;for(let l=0;l<s;l++)a[l]=Vo(e,t,o,r);return}if(n.isDeprecated){Vo(e,t,o,r);return}i[n.name]=Vo(e,t,o,r)}function sE(e,t,n,r,i){let o=n.type;if(o===null&&ce("Invalid type null for field "+ne(n.name),n.line,n.column),n.isArray){if(o==="byte"){i.writeByteArray(r);return}let s=r;i.writeVarUint(s.length);for(let a=0;a<s.length;a++)Zm(e,t,o,s[a],i);return}Zm(e,t,o,r,i)}function eh(e,t,n,r){let i=new Map;for(let o=0;o<n.fields.length;o++)i.set(n.fields[o].value,n.fields[o]);return function(o){let s=o instanceof e.ByteBuffer?o:new e.ByteBuffer(o),a={};if(n.kind==="MESSAGE"){let l=r&&Gl===0?r:void 0;for(l&&(Vl(a,rh,s.bytes),Vl(a,ih,s.offset),Vl(a,oh,l.whole));;){let u=s.readVarUint();if(u===0)return a;let c=i.get(u);if(!c)throw new Error("Attempted to parse invalid message");l&&!l.keep.has(c.name)?l.skipper.skipField(c,s):Qm(e,t,c,s,a)}}else{for(let l=0;l<n.fields.length;l++)Qm(e,t,n.fields[l],s,a);return a}}}function aE(e,t,n){return function(r,i){let o=!i,s=i||new e.ByteBuffer;for(let a=0;a<n.fields.length;a++){let l=n.fields[a];if(l.isDeprecated)continue;let u=r[l.name];if(u!=null)n.kind==="MESSAGE"&&s.writeVarUint(l.value),sE(e,t,l,u,s);else if(n.kind==="STRUCT")throw new Error("Missing required field "+ne(l.name))}if(n.kind==="MESSAGE"&&s.writeVarUint(0),o)return s.toUint8Array()}}function Zr(e,t){let n=Object.create(null);for(let o=0;o<e.definitions.length;o++)n[e.definitions[o].name]=e.definitions[o];oE(n);let r={ByteBuffer:tt},i;for(let o=0;o<e.definitions.length;o++){let s=e.definitions[o];switch(s.kind){case"ENUM":{let a={};for(let l=0;l<s.fields.length;l++){let u=s.fields[l];a[u.name]=u.value,a[u.value]=u.name}r[s.name]=a;break}case"STRUCT":case"MESSAGE":{let a=s.kind==="MESSAGE"?t?.[s.name]:void 0,l=a&&{keep:new Set(a),skipper:i??(i=zl(e)),whole:rE(eh(r,n,s))};r["decode"+s.name]=eh(r,n,s,l),r["encode"+s.name]=aE(r,n,s);break}default:ce("Invalid definition kind "+ne(s.kind),s.line,s.column)}}return r}var Bl=["bool","byte","int","uint","float","string","int64","uint64"],Ul=["ENUM","STRUCT","MESSAGE"];function Go(e){let t=e instanceof tt?e:new tt(e),n=t.readVarUint(),r=[];for(let i=0;i<n;i++){let o=t.readString(),s=t.readByte(),a=t.readVarUint(),l=[];for(let u=0;u<a;u++){let c=t.readString(),f=t.readVarInt(),p=!!(t.readByte()&1),d=t.readVarUint();l.push({name:c,line:0,column:0,type:Ul[s]==="ENUM"?null:f,isArray:p,isDeprecated:!1,value:d})}r.push({name:o,line:0,column:0,kind:Ul[s],fields:l})}for(let i=0;i<n;i++){let o=r[i].fields;for(let s=0;s<o.length;s++){let a=o[s],l=a.type;if(l!==null&&l<0){if(~l>=Bl.length)throw new Error("Invalid type "+l);a.type=Bl[~l]}else{if(l!==null&&l>=r.length)throw new Error("Invalid type "+l);a.type=l===null?null:r[l].name}}}return{package:null,definitions:r}}function sh(e){let t=new tt,n=e.definitions,r={};t.writeVarUint(n.length);for(let i=0;i<n.length;i++)r[n[i].name]=i;for(let i=0;i<n.length;i++){let o=n[i];t.writeString(o.name),t.writeByte(Ul.indexOf(o.kind)),t.writeVarUint(o.fields.length);for(let s=0;s<o.fields.length;s++){let a=o.fields[s],l=Bl.indexOf(a.type);t.writeString(a.name),t.writeVarInt(l===-1?r[a.type]:~l),t.writeByte(a.isArray?1:0),t.writeVarUint(a.value)}}return t.toUint8Array()}function ah(e){for(let t of e.definitions)lE(t),t.kind==="ENUM"&&uE(t)}function lE(e){let t=new Set;for(let n of e.fields)t.has(n.name)&&ce(`The field ${ne(n.name)} is defined twice in ${ne(e.name)}`,n.line,n.column),t.add(n.name)}function uE(e){let t=new Set;for(let n of e.fields)t.has(n.value)&&ce(`The enum value ${n.value} is used twice in ${ne(e.name)}`,n.line,n.column),t.add(n.value)}var jn=nh(`enum MessageType {
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
`);ah(jn);var cE=new Uint8Array([40,181,47,253]);function Wl(e){return e.length>=4&&e[0]===40&&e[1]===181&&e[2]===47&&e[3]===253}var Fo=null;async function Xl(){Fo||(Fo=Zr(jn))}function jl(){return sh(jn)}function $l(e){if(!Fo)throw new Error("Codec not initialized. Call initCodec() first.");return Fo.encodeMessage(e)}function dE(e){return new Map(e.fields.map(t=>[t.value,t]))}function Kl(e,t){let n=e.fields.get(t.name);return n||(n=dE(t),e.fields.set(t.name,n)),n}function lh(e,t,n){switch(t.type){case"bool":case"byte":e.readByte();return;case"int":e.readVarInt();return;case"uint":e.readVarUint();return;case"float":e.readVarFloat();return;case"string":e.skipString();return;case"int64":e.readVarInt64();return;case"uint64":e.readVarUint64();return}let r=t.type?n.definitions.get(t.type):void 0;if(!r)throw new Error(`Invalid Kiwi field type: ${String(t.type)}`);if(r.kind==="ENUM"){e.readVarUint();return}pE(e,r,n)}function Bo(e,t,n){if(!t.isArray){lh(e,t,n);return}if(t.type==="byte"){e.skipByteArray();return}let r=e.readVarUint();for(;r-- >0;)lh(e,t,n)}function pE(e,t,n){if(t.kind==="STRUCT"){for(let i of t.fields)Bo(e,i,n);return}let r=Kl(n,t);for(;;){let i=e.readVarUint();if(i===0)return;let o=r.get(i);if(!o)throw new Error(`Invalid field ${i} in Kiwi ${t.name}`);Bo(e,o,n)}}function uh(e,t,n){let r=e.readVarUint(),i=t.type?n.definitions.get(t.type):void 0;return i?.kind==="ENUM"?i.fields.find(o=>o.value===r)?.name??null:null}function mE(e,t,n){let r=Kl(n,t),i=null,o=null,s=null,a=null,l=null,u=null,c=null,f=null,p=!1;for(;;){let h=e.readVarUint();if(h===0)break;let y=r.get(h);if(!y)throw new Error(`Invalid field ${h} in Kiwi NodeChange`);switch(y.name){case"guid":i=e.readVarUint(),o=e.readVarUint();break;case"parentIndex":s=e.readVarUint(),a=e.readVarUint(),l=e.offset,e.skipString();break;case"phase":u=uh(e,y,n);break;case"type":c=uh(e,y,n);break;case"name":c==="DOCUMENT"||c==="CANVAS"?f=e.readString():e.skipString();break;case"internalOnly":p=!!e.readByte();break;default:Bo(e,y,n)}}if(c!=="DOCUMENT"&&c!=="CANVAS"||i===null||o===null)return null;let d=null;if(l!==null){let h=e.offset;e.offset=l,d=e.readString(),e.offset=h}let m=s===null||a===null?null:`${s}:${a}`;return{sourceId:`${i}:${o}`,parentId:m,position:d,phase:u,type:c,name:f??"Page",internalOnly:p}}function ch(e,t){let n=new Map(e.definitions.map(c=>[c.name,c])),r={definitions:n,fields:new Map},i=n.get("Message"),o=n.get("NodeChange");if(i?.kind!=="MESSAGE"||o?.kind!=="MESSAGE")return[];let s=new tt(t),a=Kl(r,i),l=[];for(;;){let c=s.readVarUint();if(c===0)break;let f=a.get(c);if(!f)throw new Error(`Invalid field ${c} in Kiwi Message`);if(f.name!=="nodeChanges"||!f.isArray){Bo(s,f,r);continue}let p=s.readVarUint();for(;p-- >0;){let d=mE(s,o,r);d&&l.push(d)}break}let u=l.find(c=>c.type==="DOCUMENT"&&c.phase!=="REMOVED")?.sourceId;return l.filter(c=>c.type==="CANVAS"&&c.phase!=="REMOVED"&&(!u||c.parentId===u)).sort((c,f)=>{let p=c.position??"",d=f.position??"";return p<d?-1:p>d?1:0}).map(({sourceId:c,name:f,position:p,internalOnly:d})=>({sourceId:c,name:f,position:p,internalOnly:d}))}function Yl(e){let t=Math.floor(e/94),n=String.fromCharCode(33+e%94);return"~".repeat(t)+n}function Ht(e,t){if(e!==null&&t!==null&&e>=t)return null;let n=e??"",r=t??"",i=0;for(;i<n.length&&i<r.length&&n[i]===r[i];)i++;let o=i<n.length?n.charCodeAt(i):32,s=t!==null&&i<t.length?t.charCodeAt(i):127;if(s-o>1)return n.slice(0,i)+String.fromCharCode(Math.floor((o+s)/2));if(i<n.length)return n.slice(0,i+1)+(Ht(n.slice(i+1),null)??"O");let a=t?.slice(i+1)??"";return!t||a===""?null:t.slice(0,i+1)+(Ht(null,a)??"")}function hE(e,t,n){for(let r=Ht(e,t);r!==null;r=Ht(r,t)){if(r+n<t)return r+n;if(!t.startsWith(r))return null}return null}function gE(e,t,n=""){let r=Ht(e,t);return r===null?(Ht(e,null)??"O")+n:n?t===null?r+n:hE(e,t,n)??r:r}function yE(e,t){return Ht(e,t)!==null}function IE(e){let t=[],n=new Map;for(let i=0;i<e.length;i++){let o=e[i];if(!o)continue;let s=0,a=t.length;for(;s<a;){let l=s+a>>1;(e[t[l]]??"")<o?s=l+1:a=l}s===0&&i>0&&!yE(null,o)||(s>0&&n.set(i,t[s-1]),t[s]=i)}let r=new Set;for(let i=t.at(-1);i!==void 0;i=n.get(i))r.add(i);return r}function fh(e,t={}){let n=[],r=null,i=[],o=(u,c,f)=>{if(t.suffix){let d=gE(c,f,t.suffix());return f===null||d<f?d:null}let p=Yl(u);return(c===null||p>c)&&(f===null||p<f)?p:Ht(c,f)},s=u=>{let c=[],f=r;for(let p of i){let d=o(p,f,u);if(d===null)return null;c.push(d),f=d}return c},a=IE(e);for(let u=0;u<e.length;u++){let c=e[u],f=c&&a.has(u)?s(c):null;c&&f?(i.forEach((p,d)=>n[p]=f[d]),n[u]=c,r=c,i=[]):i.push(u)}let l=s(null)??[];return i.forEach((u,c)=>n[u]=l[c]),n}function ql(e){if(new TextDecoder().decode(e.slice(0,8))!=="fig-kiwi")return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=12,r=[];for(;n<e.length;){let i=t.getUint32(n,!0);n+=4,r.push(e.slice(n,n+i)),n+=i}return r.length>=2?r:null}function Jl(e,t,n=101){let r,i=globalThis.Bun?.zstdCompressSync;i?r=i(t):r=sr(t);let o=16+e.length+4+r.length,s=new Uint8Array(o),a=new DataView(s.buffer);s.set(new TextEncoder().encode("fig-kiwi"),0),a.setUint32(8,n,!0);let l=12;return a.setUint32(l,e.length,!0),l+=4,s.set(e,l),l+=e.length,a.setUint32(l,r.length,!0),l+=4,s.set(r,l),s}function Mh(e){switch(e){case"FRAME":return"FRAME";case"RECTANGLE":return"RECTANGLE";case"ROUNDED_RECTANGLE":return"ROUNDED_RECTANGLE";case"ELLIPSE":return"ELLIPSE";case"TEXT":return"TEXT";case"LINE":return"LINE";case"STAR":return"STAR";case"POLYGON":return"REGULAR_POLYGON";case"VECTOR":return"VECTOR";case"BOOLEAN_OPERATION":return"BOOLEAN_OPERATION";case"GROUP":return"FRAME";case"SECTION":return"SECTION";case"COMPONENT":return"SYMBOL";case"COMPONENT_SET":return"FRAME";case"INSTANCE":return"INSTANCE";case"CONNECTOR":return"CONNECTOR";case"SHAPE_WITH_TEXT":return"SHAPE_WITH_TEXT";default:return"RECTANGLE"}}function Ph(e){let t=e.flipX?-1:1,n=Math.cos(e.rotation*Math.PI/180),r=Math.sin(e.rotation*Math.PI/180),i=n*t,o=-r*t,s=r,a=n,l=e.width/2,u=e.height/2;return{m00:i,m01:o,m02:e.x+l-i*l-o*u,m10:s,m11:a,m12:e.y+u-s*l-a*u}}function vE(e){if(!e||typeof e!="object")return!1;let t=e;return Number.isFinite(t.sessionID)&&Number.isFinite(t.localID)}function dh(e,t){return e?`fig-guide:${e.sessionID}:${e.localID}`:`guide:${t}`}function wh(e){if(!Array.isArray(e))return[];let t=[];for(let[n,r]of e.entries()){if(!r||typeof r!="object")continue;let i=r;if(typeof i.offset!="number"||!Number.isFinite(i.offset))continue;let o=vE(i.guid)?i.guid:void 0;i.axis==="X"?t.push({id:dh(o,n),axis:"x",position:i.offset,...o?{figGuid:o}:{}}):i.axis==="Y"&&t.push({id:dh(o,n),axis:"y",position:i.offset,...o?{figGuid:o}:{}})}return t}function kh(e){return e.map(t=>({axis:t.axis==="x"?"X":"Y",offset:t.position,...t.figGuid?{guid:t.figGuid}:{}}))}function TE(e,t){let n=e.baselines??[];if(e.logicalIndexToCharacterOffsetMap?.length!==t.length+1||n.length!==1)return!1;let r=n[0].position.y;return(e.glyphs??[]).every(i=>(i.rotation??0)===0&&i.position.y===r)}function Lh(e,t,n){if(!e||TE(e,n))return[];let r=[],i=e.truncationStartIndex??-1,o=e.glyphs??[];for(let s of i>=0?o.slice(0,i):o){let a=s.commandsBlob===void 0?void 0:t[s.commandsBlob];if(!a)return[];let l=s.advance*s.fontSize;r.push({commandsBlob:a,x:s.position.x,y:s.position.y,fontSize:s.fontSize,firstCharacter:s.firstCharacter,rotation:s.rotation,advance:Number.isFinite(l)?l:void 0})}return r}var SE=new Set((jn.definitions.find(e=>e.name==="OpenTypeFeature")?.fields??[]).map(e=>e.name)),_h=[["fontVariantCommonLigatures","LIGA"],["fontVariantContextualLigatures","CALT"],["fontVariantDiscretionaryLigatures","DLIG"],["fontVariantHistoricalLigatures","HLIG"],["fontVariantOrdinal","ORDN"],["fontVariantSlashedZero","ZERO"]],bE=[["fontVariantNumericFigure",{LINING:"LNUM",OLDSTYLE:"ONUM"}],["fontVariantNumericSpacing",{PROPORTIONAL:"PNUM",TABULAR:"TNUM"}],["fontVariantNumericFraction",{DIAGONAL:"FRAC",STACKED:"AFRC"}],["fontVariantCaps",{SMALL:"SMCP",PETITE:"PCAP",ALL_SMALL:["SMCP","C2SC"],ALL_PETITE:["PCAP","C2PC"],UNICASE:"UNIC",TITLING:"TITL"}]],EE=Object.fromEntries(_h.map(([e,t])=>[t,e])),AE={LNUM:{field:"fontVariantNumericFigure",value:"LINING"},ONUM:{field:"fontVariantNumericFigure",value:"OLDSTYLE"},PNUM:{field:"fontVariantNumericSpacing",value:"PROPORTIONAL"},TNUM:{field:"fontVariantNumericSpacing",value:"TABULAR"},FRAC:{field:"fontVariantNumericFraction",value:"DIAGONAL"},AFRC:{field:"fontVariantNumericFraction",value:"STACKED"},SMCP:{field:"fontVariantCaps",value:"SMALL"},PCAP:{field:"fontVariantCaps",value:"PETITE"},C2SC:{field:"fontVariantCaps",value:"ALL_SMALL"},C2PC:{field:"fontVariantCaps",value:"ALL_PETITE"},UNIC:{field:"fontVariantCaps",value:"UNICASE"},TITL:{field:"fontVariantCaps",value:"TITLING"}};function Qr(e,t,n){let r=t.toUpperCase();e.some(i=>i.tag===r)||e.push({tag:r,enabled:n})}function fu(e){let t=[];for(let[n,r]of _h){let i=e[n];i!==void 0&&Qr(t,r,i)}for(let[n,r]of bE){let i=r[String(e[n])];if(Array.isArray(i))for(let o of i)Qr(t,o,!0);else i&&Qr(t,i,!0)}for(let n of e.toggledOnOTFeatures??[])Qr(t,n,!0);for(let n of e.toggledOffOTFeatures??[])Qr(t,n,!1);return t}function xE(e,t,n,r,i,o){let s=EE[t];if(s){e[s]=n;return}let a=AE[t];if(a){n?(e[a.field]=a.value,o.delete(a.field)):e[a.field]===void 0&&o.set(a.field,"NORMAL");return}SE.has(t)&&(n?r.push(t):i.push(t))}function du(e,t){let n=[],r=[],i=new Map;for(let o of t)xE(e,o.tag.toUpperCase(),o.enabled,n,r,i);for(let o of i.keys())e[o]="NORMAL";n.length>0&&(e.toggledOnOTFeatures=n),r.length>0&&(e.toggledOffOTFeatures=r)}function Vh(e){return String.fromCharCode(e>>24&255,e>>16&255,e>>8&255,e&255)}function Fh(e){if(e.length===4)return(e.charCodeAt(0)<<24|e.charCodeAt(1)<<16|e.charCodeAt(2)<<8|e.charCodeAt(3))>>>0}function pu(e){let t=[];for(let n of e.fontVariations??[]){if(typeof n.value!="number")continue;let r=typeof n.axisTag=="number"?Vh(n.axisTag):n.axisName||"";r&&t.push({axis:r,value:n.value})}return t}function Gh(e){if(e.length%2!==0)throw new Error("Hex string must contain an even number of characters");let t=new Uint8Array(e.length/2);for(let n=0;n<t.length;n++){let r=Number.parseInt(e.slice(n*2,n*2+2),16);if(Number.isNaN(r))throw new Error("Hex string contains invalid characters");t[n]=r}return t}var NE=Array.from({length:256},(e,t)=>t.toString(16).padStart(2,"0"));function mu(e){if(typeof e.toHex=="function")return e.toHex();let t=Array.from({length:e.length},()=>"");for(let n=0;n<e.length;n++)t[n]=NE[e[n]];return t.join("")}function jo(e){return{r:e.r,g:e.g,b:e.b,a:"a"in e?e.a:1}}function ti(e){let t={type:e.type,color:jo(e.color),opacity:e.opacity,visible:e.visible,blendMode:e.blendMode??"NORMAL"};return e.gradientStops&&(t.stops=e.gradientStops.map(n=>({color:jo(n.color),position:n.position}))),e.gradientTransform&&(t.transform=e.gradientTransform),e.imageHash&&(t.image={hash:Gh(e.imageHash)}),e.imageScaleMode&&(t.imageScaleMode=e.imageScaleMode),e.imageTransform&&(t.transform=e.imageTransform),e.sourceNodeId&&(t.sourceNodeId=_e(e.sourceNodeId)),e.scale&&(t.scale=e.scale),e.spacing&&(t.spacing=e.spacing),e.patternSpacing&&(t.patternSpacing=e.patternSpacing),e.patternTileType&&(t.patternTileType=e.patternTileType),e.verticalAlignment&&(t.verticalAlignment=e.verticalAlignment),e.horizontalAlignment&&(t.horizontalAlignment=e.horizontalAlignment),e.noiseType&&(t.noiseType=e.noiseType),e.density!==void 0&&(t.density=e.density),e.noiseSize&&(t.noiseSize=e.noiseSize),e.customEffectId&&(t.customEffectId={guid:_e(e.customEffectId)}),t}function hu(e){return e?{r:e.r??0,g:e.g??0,b:e.b??0,a:e.a??1}:{...Vt}}function CE(e){return Object.keys(e).sort((t,n)=>Number(t)-Number(n)).map(t=>e[Number(t)]).map(t=>t.toString(16).padStart(2,"0")).join("")}function Bh(e){if(e)return{m00:e.m00,m01:e.m01,m02:e.m02,m10:e.m10,m11:e.m11,m12:e.m12}}var ph=null;function OE(e){let t=e.colorVar?.value?.alias;if(!(!t||!ph))return ph(t)??void 0}function DE(e){let t=OE(e);return t?{color:{...t,a:e.color?.a??1},opacity:e.opacity??t.a}:{color:hu(e.color),opacity:e.opacity??1}}function RE(e){let{color:t,opacity:n}=DE(e);return{type:e.type,color:t,opacity:n,visible:e.visible??!0,blendMode:e.blendMode??"NORMAL"}}function ME(e,t){!t.type.startsWith("GRADIENT")||!t.stops||(e.gradientStops=t.stops.map(n=>({color:hu(n.color),position:n.position})),t.transform&&(e.gradientTransform=Bh(t.transform)))}function PE(e,t){if(t.type==="IMAGE"){if(t.image&&typeof t.image=="object"){let n=t.image;typeof n.hash=="object"?e.imageHash=CE(n.hash):typeof n.hash=="string"&&(e.imageHash=n.hash)}e.imageScaleMode=t.imageScaleMode??"FILL",t.transform&&(e.imageTransform=Bh(t.transform))}}function wE(e,t){t.sourceNodeId&&(e.sourceNodeId=F(t.sourceNodeId)),t.scale&&(e.scale=t.scale),t.spacing&&(e.spacing=t.spacing),t.patternSpacing&&(e.patternSpacing=t.patternSpacing),t.patternTileType&&(e.patternTileType=t.patternTileType),t.verticalAlignment&&(e.verticalAlignment=t.verticalAlignment),t.horizontalAlignment&&(e.horizontalAlignment=t.horizontalAlignment),t.noiseType&&(e.noiseType=t.noiseType),t.density!==void 0&&(e.density=t.density),t.noiseSize&&(e.noiseSize=t.noiseSize),t.customEffectId?.guid&&(e.customEffectId=F(t.customEffectId.guid))}function Uh(e){let t=RE(e);return ME(t,e),PE(t,e),wE(t,e),t}function Kn(e){return e?e.map(Uh):[]}function gu(e){return e==="INSIDE"||e==="OUTSIDE"?e:"CENTER"}function zh(e,t,n,r,i,o){if(!e)return[];let s=gu(n);return e.map(a=>({...Uh(a),weight:t??1,align:s,cap:r??"NONE",join:i??"MITER",dashPattern:o??[]}))}function Hh(e){return e?e.map(t=>({type:t.type,color:hu(t.color),offset:t.offset??{x:0,y:0},radius:t.radius??0,spread:t.spread??0,visible:t.visible??!0,blendMode:t.blendMode??"NORMAL",showShadowBehindNode:t.showShadowBehindNode??!0})):[]}function mh(e,t,n){return t===0&&n===0?e:Gr(e,1,0,0,1,t,n)}function kE(e,t,n){let r=[...e.fillGeometry??[],...e.strokeGeometry??[]],i=r.length>0?ao(r):null,o=i?.x??0,s=i?.y??0,a=i?i.x+i.width:t,l=i?i.y+i.height:n;for(let c of e.derivedTextGlyphs??[]){let f=c.fontSize||0;o=Math.min(o,c.x-f*.25),s=Math.min(s,c.y-f),a=Math.max(a,c.x+f),l=Math.max(l,c.y+f*.35)}let u=1;return{left:Math.max(0,-o+(o<0?u:0)),top:Math.max(0,-s+(s<0?u:0)),right:Math.max(0,a-t+(a>t?u:0)),bottom:Math.max(0,l-n+(l>n?u:0))}}function LE(e,t,n){e.strokeGeometry&&e.strokeGeometry.length>0&&(e.strokeGeometry=mh(e.strokeGeometry,t,n)),e.fillGeometry&&e.fillGeometry.length>0&&(e.fillGeometry=mh(e.fillGeometry,t,n)),e.derivedTextGlyphs?.length&&(e.derivedTextGlyphs=e.derivedTextGlyphs.map(r=>({...r,x:r.x+t,y:r.y+n})))}function _E(e,t){if(e.nodeType!=="TEXT"||!t)return;e.textPathData=t;let n=e.width??0,r=e.height??0;e.textPathBox={x:0,y:0,width:n,height:r};let i=kE(e,n,r);if(i.left===0&&i.top===0&&i.right===0&&i.bottom===0)return;let o=i.left,s=i.top;e.x=(e.x??0)-o,e.y=(e.y??0)-s,e.width=n+i.left+i.right,e.height=r+i.top+i.bottom,(o!==0||s!==0)&&(e.textPathBox={x:o,y:s,width:n,height:r},LE(e,o,s))}var VE=new Set(["width","height"]),FE=new Set(["x","y","rotation","flipX","flipY"]),ae=["textData","derivedTextData","textUserLayoutVersion","textExplicitLayoutVersion"],nt=["strokeGeometry","vectorData"],GE={fillStyleId:["styleIdForFill"],strokeStyleId:["styleIdForStrokeFill"],textStyleId:["styleIdForText"],effectStyleId:["styleIdForEffect"],gridStyleId:["styleIdForGrid"],fills:["fillPaints","backgroundPaints","backgroundColor"],strokes:["strokePaints"],effects:["effects"],blendMode:["blendMode"],layoutGrids:["layoutGrids"],guides:["guides"],exportSettings:["exportSettings"],cornerRadius:["cornerRadius"],independentCorners:["rectangleCornerRadiiIndependent"],topLeftRadius:["rectangleTopLeftCornerRadius","rectangleCornerRadiiIndependent"],topRightRadius:["rectangleTopRightCornerRadius","rectangleCornerRadiiIndependent"],bottomLeftRadius:["rectangleBottomLeftCornerRadius","rectangleCornerRadiiIndependent"],bottomRightRadius:["rectangleBottomRightCornerRadius","rectangleCornerRadiiIndependent"],cornerSmoothing:["cornerSmoothing"],borderTopWeight:["borderTopWeight",...nt],borderRightWeight:["borderRightWeight",...nt],borderBottomWeight:["borderBottomWeight",...nt],borderLeftWeight:["borderLeftWeight",...nt],independentStrokeWeights:["borderStrokeWeightsIndependent","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight",...nt],strokeWeight:["strokeWeight",...nt],strokeAlign:["strokeAlign",...nt],strokeJoin:["strokeJoin",...nt],strokeMiterLimit:["miterLimit",...nt],strokeCap:[...nt],dashPattern:[...nt],text:[...ae],styleRuns:[...ae],fontSize:["fontSize",...ae],fontFamily:["fontName","fontVersion",...ae],fontWeight:["semanticWeight",...ae],italic:["semanticItalic",...ae],textAlignHorizontal:["textAlignHorizontal",...ae],textAlignVertical:["textAlignVertical",...ae],lineHeight:["lineHeight",...ae],letterSpacing:["letterSpacing","textTracking",...ae],textAutoResize:["textAutoResize",...ae],textDecorationStyle:["textDecorationStyle",...ae],textDecorationThickness:["textDecorationThickness",...ae],textDecorationFills:["textDecorationFillPaints",...ae],textUnderlineOffset:["textUnderlineOffset",...ae],leadingTrim:["leadingTrim",...ae],maxLines:["maxLines",...ae],textParagraphs:[...ae],listSpacing:["listSpacing",...ae],paragraphSpacing:["paragraphSpacing",...ae],paragraphIndent:["paragraphIndent",...ae],hangingList:["hangingList",...ae],fontVariations:["fontVariations",...ae],fontFeatures:["fontVariantCommonLigatures","fontVariantContextualLigatures","toggledOnOTFeatures","toggledOffOTFeatures",...ae],minWidth:["minSize"],minHeight:["minSize"],maxWidth:["maxSize"],maxHeight:["maxSize"],vectorNetwork:["vectorData","fillGeometry","strokeGeometry"],fillGeometry:["fillGeometry","vectorData"],strokeGeometry:["strokeGeometry","vectorData"],isMask:["mask"],maskType:["maskType"],maskIsOutline:["maskIsOutline"],componentPropertyDefinitions:["componentPropDefs"],componentPropertyReferences:["componentPropRefs"],componentPropertyAssignments:["componentPropAssignments"],variantPropSpecs:["variantPropSpecs"]};function yu(e=[]){return new Set(e.flatMap(t=>GE[t]??[]))}function Ne(e){let t=yu(e.source.editedFields??[]);return t.size===0?e.source.fig.rawNodeFields:Object.fromEntries(Object.entries(e.source.fig.rawNodeFields).filter(([n])=>!t.has(n)))}function Yo(e){let t=e.source.editedFields??[];return{...e.source.fig,rawNodeFields:Ne(e),rawSize:t.some(n=>VE.has(n))?null:e.source.fig.rawSize,rawTransform:t.some(n=>FE.has(n))?null:e.source.fig.rawTransform}}function Wh(e,t){if(!yu(e.source.editedFields??[]).has(t))return e.source.fig.rawNodeFields[t]}function BE(e){return Object.getPrototypeOf(e)===Object.prototype}function tu(e){if(e===null||typeof e!="object")return e;if(Array.isArray(e))return e.map(n=>tu(n));if(!BE(e))return structuredClone(e);let t={};for(let n of Object.keys(e))t[n]=tu(e[n]);return t}function ni(e){return tu(e)}var Xh=64;function oi(e,t=0){if(t>Xh)throw new Error("Variable expression exceeds maximum depth");let n=e?.value;if(e?.dataType==="EXPRESSION"&&!n?.expressionValue)throw new Error("Missing variable expression value");if(!n)return;if(n.alias)return{multiplier:1,reference:n.alias};if(typeof n.floatValue=="number"&&Number.isFinite(n.floatValue))return{multiplier:n.floatValue};let r=n.expressionValue;if(r){if(r.expressionFunction==="STRINGIFY")return UE(r);if(r.expressionFunction!=="MULTIPLY"||!r.expressionArguments?.length)throw new Error(`Unsupported variable expression ${r.expressionFunction}`);return zE(r.expressionArguments,t)}}function UE(e){let t=e.expressionArguments??[],n=t.length===1?t[0].value?.alias:void 0;if(!n)throw new Error("Variable expression STRINGIFY must wrap one alias");return{multiplier:1,reference:n}}function zE(e,t){let n={multiplier:1};for(let r of e){let i=oi(r,t+1);if(!i||n.reference&&i.reference)throw new Error("Variable expression is not a constant multiplied by one alias");n.multiplier*=i.multiplier,i.reference&&(n.reference=i.reference)}if(!Number.isFinite(n.multiplier))throw new Error("Variable expression has a non-finite multiplier");return n}function Iu(e,t,n=0){if(n>Xh)throw new Error("Variable expression exceeds maximum depth");e?.value?.alias&&t(e.value.alias);for(let r of e?.value?.expressionValue?.expressionArguments??[])Iu(r,t,n+1)}var qo={cornerRadius:"CORNER_RADIUS",topLeftRadius:"RECTANGLE_TOP_LEFT_CORNER_RADIUS",topRightRadius:"RECTANGLE_TOP_RIGHT_CORNER_RADIUS",bottomLeftRadius:"RECTANGLE_BOTTOM_LEFT_CORNER_RADIUS",bottomRightRadius:"RECTANGLE_BOTTOM_RIGHT_CORNER_RADIUS",strokeWeight:"STROKE_WEIGHT",borderTopWeight:"BORDER_TOP_WEIGHT",borderBottomWeight:"BORDER_BOTTOM_WEIGHT",borderLeftWeight:"BORDER_LEFT_WEIGHT",borderRightWeight:"BORDER_RIGHT_WEIGHT",itemSpacing:"STACK_SPACING",paddingLeft:"STACK_PADDING_LEFT",paddingTop:"STACK_PADDING_TOP",paddingRight:"STACK_PADDING_RIGHT",paddingBottom:"STACK_PADDING_BOTTOM",counterAxisSpacing:"STACK_COUNTER_SPACING",gridRowGap:"GRID_ROW_GAP",gridColumnGap:"GRID_COLUMN_GAP",text:"TEXT_DATA",visible:"VISIBLE",opacity:"OPACITY",width:"WIDTH",height:"HEIGHT",minWidth:"MIN_WIDTH",maxWidth:"MAX_WIDTH",minHeight:"MIN_HEIGHT",maxHeight:"MAX_HEIGHT",x:"X_POSITION",y:"Y_POSITION",rotation:"ROTATION",fontSize:"FONT_SIZE",letterSpacing:"LETTER_SPACING",lineHeight:"LINE_HEIGHT",fontFamily:"FONT_FAMILY"},dn=Object.fromEntries(Object.entries(qo).map(([e,t])=>[t,e])),Jo=.01;function vu(e){return e==="ALIAS"||e==="EXPRESSION"}function Xe(e){let t=e.parameterConsumptionMap,n=new Map,r=[];for(let i of[...e.variableConsumptionMap?.entries??[],...t?.entries??[]])i.variableField?n.set(i.variableField,i):r.push(i);return[...r,...n.values()]}function fn(e,t){let n=Xe(t);if(n.length===0)return{};let r=[];for(let i of[...Xe(e),...n]){let o=i.variableField?r.findIndex(s=>s.variableField===i.variableField):-1;o<0?r.push(ni(i)):r[o]=ni(i)}return{parameterConsumptionMap:{entries:r}}}function Tu(e,t,n,r,i=1,o=!1){let s=qo[e];if(s)return Kh(s,t,n,r,i,o)}var Su={fontFamily:"FONT_FAMILY",fontStyle:"FONT_STYLE",fontSize:"FONT_SIZE",letterSpacing:"LETTER_SPACING",lineHeight:"LINE_HEIGHT",paragraphSpacing:"PARAGRAPH_SPACING",paragraphIndent:"PARAGRAPH_INDENT"},HE=pl(Su);function jh(e,t,n){return Object.entries(e).flatMap(([r,i])=>{let o=Su[r];return!o||!i||!t.variables.has(i)?[]:[Kh(o,i,t,n)]})}function $h(e){let t={};for(let n of Xe(e)){let r=n.variableField&&HE[n.variableField],i=r?oi(n.variableData)?.reference?.guid:void 0;r&&i&&(t[r]=F(i))}return t}function bu(e,t,n){let r=e.variables.get(t);return r?.key?{assetRef:{key:r.key,...r.version?{version:r.version}:{}}}:{guid:n?.get(t)??_e(t)}}function Kh(e,t,n,r,i=1,o=!1){if(!t)return{variableField:e};let s=n.variables.get(t);if(!s)throw new Error(`Missing bound variable ${t}`);if(!Number.isFinite(i))throw new Error("Non-finite variable binding multiplier");let a={dataType:"ALIAS",resolvedDataType:s.type,value:{alias:bu(n,t,r)}};return e==="TEXT_DATA"&&s.type!=="STRING"?{variableField:e,variableData:{dataType:"EXPRESSION",resolvedDataType:"STRING",value:{expressionValue:{expressionFunction:"STRINGIFY",expressionArguments:[a]}}}}:s.type!=="FLOAT"||!o&&i===1?{variableField:e,variableData:a}:{variableField:e,variableData:{dataType:"EXPRESSION",resolvedDataType:"FLOAT",value:{expressionValue:{expressionFunction:"MULTIPLY",expressionArguments:[{dataType:"FLOAT",resolvedDataType:"FLOAT",value:{floatValue:i}},a]}}}}}function Yh(e,t){return e==="opacity"?Jo:e==="rotation"?1:t}function qh(e,t,n,r,i){let o=Yh(e,n.componentScale),s=t.variableBindingScales[e]===void 0?1:t.variableBindingScales[e]/o;return Tu(e,t.boundVariables[e],r,i,s)}function Jh(e,t,n){let r=new Set(Object.keys(e.boundVariables));for(let i of Xe(Ne(e))){if(!vu(i.variableData?.dataType))continue;let o=i.variableField&&dn[i.variableField];o&&r.add(o)}return[...r].flatMap(i=>{let o=(e.variableBindingScales[i]??1)/(i==="opacity"?Jo:1),s=Tu(i,e.boundVariables[i],t,n,o,e.type==="INSTANCE"&&e.componentScale!==1);return s?[s]:[]})}function Eu(e){let t=e.variableField?dn[e.variableField]:void 0;if(!t)return;let n=oi(e.variableData);if(e.variableData?.value?.expressionValue&&!n?.reference)throw new Error("Variable expression must contain one alias");let r=n?.reference?.guid;return r?{field:t,variableId:F(r),multiplier:n.multiplier}:void 0}function Zh(e){let t={};for(let n of Xe(e)){let r=Eu(n);r&&Et(r.field)&&(t[r.field]=r.multiplier*(r.field==="opacity"?Jo:1))}return t}function Zo(e=1){return e===1?{}:Object.fromEntries(Object.entries(Yn(qo,e)).filter(([,t])=>t!==1))}function Yn(e,t,n={}){let r={};for(let i of Object.keys(e))Et(i)&&(r[i]=n[i]??Yh(i,t));return r}function Au(e,t){return e==="opacity"?{opacity:Math.max(0,Math.min(1,t*Jo))}:Et(e)?{[e]:t}:void 0}var{boundVariables:WE,exportSettings:nu,librarySource:Qh,textPathBox:eg}=xe,XE={PNG:"png",JPEG:"jpg",SVG:"svg",PDF:"pdf"};function Ve(e,t){return t.decode(e.pluginData?.find(n=>n.pluginID===Or&&n.key===t.key)?.value)}function tg(e){e.exportSettings.length!==0&&(!wa(e.pluginData,nu)&&Array.isArray(Wh(e,"exportSettings"))||(e.pluginData=bt(e.pluginData,nu,e.exportSettings)))}function ng(e){e.textPathBox&&(e.pluginData=bt(e.pluginData,eg,e.textPathBox))}function rg(e){return Ve(e,eg)??null}function ig(e){let t=Ve(e,WE)??{};for(let n of Xe(e)){let r=Eu(n);if(r)t[r.field]=r.variableId;else if(n.variableField&&!vu(n.variableData?.dataType)){let i=dn[n.variableField];i&&(t=We(t,[i]))}}return e.fillPaints?.forEach((n,r)=>{let i=n.colorVar?.value?.alias?.guid;i&&(t[`fills/${r}/color`]=F(i))}),e.strokePaints?.forEach((n,r)=>{let i=n.colorVar?.value?.alias?.guid;i&&(t[`strokes/${r}/color`]=F(i))}),t}function jE(e){return typeof e=="string"?XE[e]??null:e===0?"png":e===1?"jpg":e===2?"svg":e===3?"pdf":null}function $E(e){if(!e||typeof e!="object"||Array.isArray(e))return 1;let t=e.type;if(t!=="CONTENT_SCALE"&&t!==0)return 1;let n=e.value;return typeof n=="number"&&Number.isFinite(n)?io(n):1}function og(e){let t=Ve(e,nu);return t||(e.exportSettings??[]).flatMap(n=>{if(!n||typeof n!="object"||Array.isArray(n))return[];let r=jE(n.imageType);return r?[{scale:$E(n.constraint),format:r}]:[]})}function si(e){return(e.pluginData??[]).map(t=>({pluginId:t.pluginID,key:t.key,value:t.value}))}function sg(e){return Ve(e,Qh)??null}function ag(e){e.pluginData=bt(e.pluginData,Qh,e.librarySource??void 0)}function lg(e){return(e.pluginRelaunchData??[]).map(t=>({pluginId:t.pluginID,command:t.command,message:t.message,isDeleted:t.isDeleted}))}function ug(e){return e.map(t=>({pluginID:t.pluginId,key:t.key,value:t.value}))}function cg(e){return e.map(t=>({pluginID:t.pluginId,command:t.command,message:t.message,isDeleted:t.isDeleted}))}var KE=["fontSize","fontName","lineHeight","letterSpacing","textDecoration","textCase"];function ri(e,t,n){if(t?.guid)return e.get(F(t.guid));if(!t?.assetRef||!n)return;let{key:r,version:i}=t.assetRef,o=(i?n.get(`${r}@${i}`):void 0)??n.get(r);return o?e.get(o):void 0}function YE(e,t,n){let r=ri(e,t.styleIdForFill,n);r?.styleType==="FILL"&&r.fillPaints&&(t.fillPaints=r.fillPaints);let i=ri(e,t.styleIdForStrokeFill,n);i?.styleType==="FILL"&&i.fillPaints&&(t.strokePaints=i.fillPaints)}function qE(e,t,n){let r=ri(e,t.styleIdForEffect,n);r?.styleType==="EFFECT"&&r.effects&&(t.effects=r.effects);let i=ri(e,t.styleIdForGrid,n);i?.styleType==="GRID"&&i.layoutGrids&&(t.layoutGrids=i.layoutGrids)}function JE(e,t,n){let r=ri(e,t.styleIdForText,n);if(!(r?.type!=="TEXT"||r.styleType!=="TEXT"))for(let i of KE)i==="textDecoration"?t.textDecoration=r.textDecoration:r[i]!==void 0&&Object.assign(t,{[i]:r[i]})}function xu(e,t,n){YE(e,t,n),qE(e,t,n),JE(e,t,n)}function Wt(e){if(!e||typeof e!="object"||!("guid"in e))return null;let t=e.guid;return!t||typeof t!="object"||ln(t)?null:F(t)}function Nu(e){switch(e){case"UNDERLINE":return"UNDERLINE";case"STRIKETHROUGH":return"STRIKETHROUGH";default:return"NONE"}}var ii={value:100,units:"PERCENT"};function Cu(e){return e?.units===ii.units&&e.value===ii.value}function Ou(e,t){return!e||Cu(e)?null:e.units==="PIXELS"?e.value:e.units==="PERCENT"?e.value/100*(t??14):e.units==="RAW"?e.value*(t??14):null}function Du(e,t){return e?e.units==="PIXELS"?e.value:e.units==="PERCENT"?e.value/100*(t??14):e.value:0}var ZE=new Set(["ORIGINAL","UPPER","LOWER","TITLE"]);function Ru(e){if(!e||typeof e!="object")return;let t=e;if(typeof t.url=="string"&&t.url!=="")return{type:"URL",value:t.url};if(t.guid&&!ln(t.guid))return{type:"NODE",value:F(t.guid)}}function QE(e,t,n){ZE.has(t.textCase)&&(e.textCase=t.textCase);let r=Ru(t.hyperlink);r&&(e.hyperlink=r);for(let[o,s]of[["textStyleId","styleIdForText"],["fillStyleId","styleIdForFill"]]){if(t[s]===void 0)continue;let a=Wt(t[s]);a!==Wt(n[s])&&(e[o]=a)}let i=$h(t);Rr(i)||(e.boundVariables=i)}function eA(e,t){let n=t.textDecoration;if(n&&(e.textDecoration=Nu(n)),t.textDecorationStyle&&(e.textDecorationStyle=t.textDecorationStyle),t.textDecorationThickness&&(e.textDecorationThickness=t.textDecorationThickness.value??null),t.textDecorationSkipInk!==void 0&&(e.textDecorationSkipInk=t.textDecorationSkipInk),t.textUnderlineOffset&&(e.textUnderlineOffset=t.textUnderlineOffset.value??null),t.textDecorationFillPaints){let r=Kn(t.textDecorationFillPaints);r.length>0&&(e.textDecorationFills=r)}}function tA(e,t){let n=t.fontSize,r={};e.fontName&&(r.fontFamily=e.fontName.family,r.fontWeight=wo(e.fontName.style),r.italic=e.fontName.style.toLowerCase().includes("italic")),e.fontSize!==void 0&&(r.fontSize=e.fontSize);let i=pu(e);i.length>0&&(r.fontVariations=i);let o=fu(e);if(o.length>0&&(r.fontFeatures=o),e.letterSpacing&&(r.letterSpacing=Du(e.letterSpacing,e.fontSize??n)),e.lineHeight&&(r.lineHeight=Ou(e.lineHeight,e.fontSize??n)),eA(r,e),e.fillPaints){let s=Kn(e.fillPaints);s.length>0&&(r.fills=s)}return QE(r,e,t),r}function nA(e,t){let n=new Map;for(let r of e){let i=r.styleID;if(i===void 0||i===0)continue;let o=tA(r,t);Object.keys(o).length>0&&n.set(i,o)}return n}function rA(e,t){let n=[],r=e[0],i=0;for(let o=1;o<=e.length;o++)if(o===e.length||e[o]!==r){let s=t.get(r);s&&n.push({start:i,length:o-i,style:s}),o<e.length&&(r=e[o],i=o)}return n}function iA(e,t,n,r){for(let i of n.values())i.hyperlink??(i.hyperlink=r);return n.set(0,{hyperlink:r}),Array.from({length:t},(i,o)=>e[o]??0)}function fg(e){let t=e.textData,n=Ru(e.hyperlink),r=t?.characters.length??0,i=nA(t?.styleOverrideTable??[],e),o=n?iA(t?.characterStyleIDs??[],r,i,n):t?.characterStyleIDs??[];return o.length===0||i.size===0?[]:rA(o,i)}var oA={NONE:"PLAIN",ORDERED:"ORDERED_LIST",UNORDERED:"UNORDERED_LIST"};function sA(e){return e.lineType==="ORDERED_LIST"?"ORDERED":e.lineType==="UNORDERED_LIST"?"UNORDERED":"NONE"}function aA(e,t=[]){if(!e)return[];let n=new Map(t.map(i=>[i.styleID,i])),r=e.map(i=>{let o={listType:sA(i),indentation:i.indentationLevel??0};o.listType!=="NONE"&&(o=sl(o,o.indentation));let s=i.styleId?n.get(i.styleId):void 0;for(let a of Wn){let l=s?.[a];l!==void 0&&(o=rl(o,a,l))}return o});return ol(r,r.length)}function lA(e,t=1){let n=new Set(Ml(e.text,e.textParagraphs).filter(s=>s.startsList).map(s=>s.paragraph)),r=[],i=new Map,o=s=>{let a={};for(let c of Wn){let f=s[c];f!==void 0&&(a[c]=f)}if(Rr(a))return 0;let l=JSON.stringify(a),u=i.get(l);return u===void 0&&(u=t+r.length,i.set(l,u),r.push({styleID:u,...a})),u};return{lines:Hn(e.text).map((s,a)=>{let l=zr(e.textParagraphs,a);return{lineType:oA[l.listType],styleId:o(l),indentationLevel:l.indentation,sourceDirectionality:"AUTO",listStartOffset:0,isFirstLineOfList:n.has(a)}}),overrides:r}}function Mu(e,t){let n=new DataView(e.buffer,e.byteOffset,e.byteLength),r=0,i=n.getUint32(r,!0);r+=4;let o=n.getUint32(r,!0);r+=4;let s=n.getUint32(r,!0);r+=4;let a=new Map;for(let f of t??[])a.set(f.styleID,f);let l=[];for(let f=0;f<i;f++){let p=n.getUint32(r,!0);r+=4;let d=n.getFloat32(r,!0);r+=4;let m=n.getFloat32(r,!0);r+=4;let h=a.get(p),y={x:d,y:m,handleMirroring:h?.handleMirroring??"NONE"};h?.strokeCap&&(y.strokeCap=h.strokeCap),h?.strokeJoin&&(y.strokeJoin=h.strokeJoin),h?.cornerRadius!==void 0&&(y.cornerRadius=h.cornerRadius),l.push(y)}let u=[];for(let f=0;f<o;f++){r+=4;let p=n.getUint32(r,!0);r+=4;let d=n.getFloat32(r,!0);r+=4;let m=n.getFloat32(r,!0);r+=4;let h=n.getUint32(r,!0);r+=4;let y=n.getFloat32(r,!0);r+=4;let v=n.getFloat32(r,!0);r+=4,u.push({start:p,end:h,tangentStart:{x:d,y:m},tangentEnd:{x:y,y:v}})}let c=[];for(let f=0;f<s;f++){let p=(n.getUint32(r,!0)&1)===1?"NONZERO":"EVENODD";r+=4;let d=n.getUint32(r,!0);r+=4;let m=[];for(let h=0;h<d;h++){let y=n.getUint32(r,!0);r+=4;let v=[];for(let g=0;g<y;g++)v.push(n.getUint32(r,!0)),r+=4;m.push(v)}c.push({windingRule:p,loops:m})}return{vertices:l,segments:u,regions:c}}function dg(e){return[e.handleMirroring??"NONE",e.strokeCap??"",e.strokeJoin??"",e.cornerRadius??""].join("|")}function pg(e){let t=new Map,n=[],r=1;for(let i of e.vertices){let o=i.handleMirroring??"NONE";if(o==="NONE"&&!i.strokeCap&&!i.strokeJoin&&i.cornerRadius===void 0)continue;let s=dg(i);if(t.has(s))continue;t.set(s,r);let a={styleID:r};o!=="NONE"&&(a.handleMirroring=o),i.strokeCap&&(a.strokeCap=i.strokeCap),i.strokeJoin&&(a.strokeJoin=i.strokeJoin),i.cornerRadius!==void 0&&(a.cornerRadius=i.cornerRadius),n.push(a),r++}return{table:n,styleToId:t}}function mg(e,t){let n=0;for(let s of e.regions){n+=8;for(let a of s.loops)n+=4+a.length*4}let r=new ArrayBuffer(12+e.vertices.length*12+e.segments.length*28+n),i=new DataView(r),o=0;i.setUint32(o,e.vertices.length,!0),o+=4,i.setUint32(o,e.segments.length,!0),o+=4,i.setUint32(o,e.regions.length,!0),o+=4;for(let s of e.vertices)i.setUint32(o,t?.get(dg(s))??0,!0),o+=4,i.setFloat32(o,s.x,!0),o+=4,i.setFloat32(o,s.y,!0),o+=4;for(let s of e.segments)i.setUint32(o,0,!0),o+=4,i.setUint32(o,s.start,!0),o+=4,i.setFloat32(o,s.tangentStart.x,!0),o+=4,i.setFloat32(o,s.tangentStart.y,!0),o+=4,i.setUint32(o,s.end,!0),o+=4,i.setFloat32(o,s.tangentEnd.x,!0),o+=4,i.setFloat32(o,s.tangentEnd.y,!0),o+=4;for(let s of e.regions){i.setUint32(o,s.windingRule==="EVENODD"?0:1,!0),o+=4,i.setUint32(o,s.loops.length,!0),o+=4;for(let a of s.loops){i.setUint32(o,a.length,!0),o+=4;for(let l of a)i.setUint32(o,l,!0),o+=4}}return new Uint8Array(r)}function Ho(e){return e==="EVENODD"?"ODD":"NONZERO"}function hg(e){return e==="ODD"||e==="EVENODD"?"EVENODD":"NONZERO"}function gg(e,t){let n=t?.regions??[];return e.length===n.length?e.map((r,i)=>({...r,windingRule:n[i].windingRule})):e.length===1&&n.length>0&&n.every(r=>r.windingRule===n[0].windingRule)?[{...e[0],windingRule:n[0].windingRule}]:e}function yg(e,t){let n=e.vectorData;if(n?.vectorNetworkBlob===void 0)return null;let r=n.vectorNetworkBlob;if(r<0||r>=t.length)return null;try{let i=Mu(t[r],n.styleOverrideTable),o=n.normalizedSize,s=e.size?.x??0,a=e.size?.y??0,l=o&&o.x>0&&s>0?s/o.x:1,u=o&&o.y>0&&a>0?a/o.y:1;if(l!==1||u!==1){for(let c of i.vertices)c.x*=l,c.y*=u;for(let c of i.segments)c.tangentStart={x:c.tangentStart.x*l,y:c.tangentStart.y*u},c.tangentEnd={x:c.tangentEnd.x*l,y:c.tangentEnd.y*u}}return i}catch{return null}}function Ig(e){let t=new Map;for(let n of e??[])n.fillPaints&&n.fillPaints.length>0&&t.set(n.styleID,Kn(n.fillPaints));return t}function vg(e){let t=e.vectorData;return Ig(t?.styleOverrideTable)}function ru(e,t,n){if(!e||e.length===0)return[];let r=[];for(let i of e){if(i.commandsBlob===void 0||i.commandsBlob<0||i.commandsBlob>=t.length)continue;let o=t[i.commandsBlob];if(o.length===0)continue;let s=i.styleID?n?.get(i.styleID):void 0;r.push({windingRule:hg(i.windingRule),commandsBlob:o,fills:s&&s.length>0?Qe(s):void 0})}return r}function uA(e){let t={},n=e.variableModeBySetMap;for(let r of n?.entries??[]){let i=r.variableSetID?.guid,o=r.variableModeID;!i||!o||(t[F(i)]=F(o))}return t}var cA={DOCUMENT:"DOCUMENT",VARIABLE:"VARIABLE",CANVAS:"CANVAS",FRAME:"FRAME",RECTANGLE:"RECTANGLE",ROUNDED_RECTANGLE:"ROUNDED_RECTANGLE",ELLIPSE:"ELLIPSE",TEXT:"TEXT",LINE:"LINE",STAR:"STAR",REGULAR_POLYGON:"POLYGON",VECTOR:"VECTOR",BOOLEAN_OPERATION:"BOOLEAN_OPERATION",GROUP:"GROUP",SECTION:"SECTION",COMPONENT:"COMPONENT",COMPONENT_SET:"COMPONENT_SET",INSTANCE:"INSTANCE",SYMBOL:"COMPONENT",CONNECTOR:"CONNECTOR",SHAPE_WITH_TEXT:"SHAPE_WITH_TEXT",TEXT_PATH:"TEXT"};function fA(e){return e?cA[e]??"RECTANGLE":"RECTANGLE"}function dA(e){if(e.type!=="BOOLEAN_OPERATION")return;let t=e.booleanOperation;switch(t){case"SUBTRACT":case"INTERSECT":return t;case"EXCLUDE":case"XOR":return"EXCLUDE";default:return"UNION"}}function pA(e){switch(e){case"HORIZONTAL":return"HORIZONTAL";case"VERTICAL":return"VERTICAL";default:return"NONE"}}function iu(e){switch(e){case"RESIZE_TO_FIT":case"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":return"HUG";default:return"FIXED"}}function Tg(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"SPACE_BETWEEN":case"SPACE_EVENLY":return"SPACE_BETWEEN";default:return"MIN"}}function Sg(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"BASELINE":return"BASELINE";default:return"MIN"}}function bg(e){switch(e){case"MIN":return"MIN";case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"BASELINE":return"BASELINE";default:return"AUTO"}}function hh(e){switch(e){case"CENTER":return"CENTER";case"MAX":return"MAX";case"STRETCH":return"STRETCH";case"SCALE":return"SCALE";default:return"MIN"}}function Eg(e){return e?{startingAngle:e.startingAngle??0,endingAngle:e.endingAngle??2*Math.PI,innerRadius:e.innerRadius??0}:null}function Ag(e){let t=e.size?.x??100,n=e.size?.y??100,r=e.transform?.m02??0,i=e.transform?.m12??0,o=0,s=!1;if(e.transform){let a=e.transform;a.m00*a.m11-a.m01*a.m10<0&&(s=!0),o=Math.atan2(a.m10,s?a.m11:a.m00)*(180/Math.PI);let l=o*Math.PI/180,u=Math.cos(l),c=Math.sin(l),f=t/2,p=n/2,d=s?-u:u,m=s?c:-c,h=c,y=u;r=a.m02-f+d*f+m*p,i=a.m12-p+h*f+y*p}return{x:r,y:i,width:t,height:n,rotation:o,flipX:s,flipY:!1}}function mA(e){return{cornerRadius:e.cornerRadius??0,topLeftRadius:e.rectangleTopLeftCornerRadius??e.cornerRadius??0,topRightRadius:e.rectangleTopRightCornerRadius??e.cornerRadius??0,bottomRightRadius:e.rectangleBottomRightCornerRadius??e.cornerRadius??0,bottomLeftRadius:e.rectangleBottomLeftCornerRadius??e.cornerRadius??0,independentCorners:e.rectangleCornerRadiiIndependent??!1,cornerSmoothing:e.cornerSmoothing??0}}function hA(e){let t={};return e.count!==void 0&&(t.pointCount=Mo(e.count,wl.min,wl.max)),e.starInnerScale!==void 0&&Number.isFinite(e.starInnerScale)&&(t.starInnerRadius=Mo(e.starInnerScale,0,1)),t}function gA(e){if(!e.lineHeight||Cu(e.lineHeight))return null;let t=e.derivedTextData?.baselines?.[0]?.lineHeight;return e.lineHeight.units==="PIXELS"&&t!==void 0&&Number.isFinite(t)&&t<e.lineHeight.value?t:Ou(e.lineHeight,e.fontSize)}function yA(e){return{textDecoration:Nu(e.textDecoration),textDecorationStyle:e.textDecorationStyle??"SOLID",textDecorationThickness:e.textDecorationThickness?.value??null,textDecorationFills:Kn(e.textDecorationFillPaints),textDecorationSkipInk:e.textDecorationSkipInk??!0,textUnderlineOffset:e.textUnderlineOffset?.value??null}}function IA(e){return{textParagraphs:aA(e.textData?.lines,e.textData?.styleOverrideTable),listSpacing:e.listSpacing??0,paragraphSpacing:e.paragraphSpacing??0,paragraphIndent:e.paragraphIndent??0,hangingList:e.hangingList??!1}}function vA(e,t){return{text:e.textData?.characters??"",fontSize:e.fontSize??14,fontFamily:e.fontName?.family??_n,fontWeight:wo(e.fontName?.style??""),italic:e.fontName?.style.toLowerCase().includes("italic")??!1,textAlignHorizontal:e.textAlignHorizontal??"LEFT",textAlignVertical:e.textAlignVertical??"TOP",textAutoResize:e.textAutoResize??"NONE",textCase:e.textCase??"ORIGINAL",...yA(e),leadingTrim:e.leadingTrim??"NONE",lineHeight:gA(e),letterSpacing:Du(e.letterSpacing,e.fontSize),maxLines:e.maxLines??null,...IA(e),styleRuns:fg(e),fontVariations:pu(e),fontFeatures:fu(e),textTruncation:e.textTruncation==="ENDING"?"ENDING":"DISABLED",textDirection:Ve(e,xe.textDirection)??"AUTO",...TA(e,t)}}function TA(e,t){let n=e.derivedTextData?.layoutSize;return{derivedLayout:n?{width:n.x,height:n.y}:null,derivedTextGlyphs:Lh(e.derivedTextData,t,e.textData?.characters??"")}}function SA(e){let t=e.stackPadding??0;return{paddingTop:e.stackVerticalPadding??t,paddingBottom:e.stackPaddingBottom??t,paddingLeft:e.stackHorizontalPadding??t,paddingRight:e.stackPaddingRight??t}}function bA(e,t,n,r){let i=n==="HUG"||r==="HUG",o=(e.fillPaints?.some(s=>s.visible!==!1)??!1)||(e.strokePaints?.some(s=>s.visible!==!1)??!1);if(!(t==="NONE"||!i||!o))return{x:e.transform?.m02??0,y:e.transform?.m12??0,width:e.size?.x??100,height:e.size?.y??100}}function gh(e,t){let n=e?.value?.[t];return typeof n=="number"&&Number.isFinite(n)&&n>0?n:null}function yh(e,t){let n=e?.value?.[t];return typeof n=="number"&&Number.isFinite(n)&&n>=0?n:null}function EA(e){let t=e.targetAspectRatio?.value;return!t||!Number.isFinite(t.x)||!Number.isFinite(t.y)?null:{x:t.x,y:t.y}}function AA(e){let t=pA(e.stackMode),n=e.stackPrimarySizing===void 0&&(t==="HORIZONTAL"||t==="VERTICAL")?"HUG":iu(e.stackPrimarySizing),r=iu(e.stackCounterSizing),i=bA(e,t,n,r);return{layoutMode:t,itemSpacing:e.stackSpacing??0,...SA(e),primaryAxisSizing:n,counterAxisSizing:r,primaryAxisAlign:Tg(e.stackPrimaryAlignItems??e.stackJustify),counterAxisAlign:Sg(e.stackCounterAlignItems??e.stackCounterAlign),layoutWrap:e.stackWrap==="WRAP"?"WRAP":"NO_WRAP",counterAxisSpacing:e.stackCounterSpacing??0,layoutPositioning:e.stackPositioning==="ABSOLUTE"?"ABSOLUTE":"AUTO",layoutGrow:e.stackChildPrimaryGrow??0,layoutAlignSelf:bg(e.stackChildAlignSelf),counterAxisAlignContent:e.stackCounterAlignContent==="SPACE_BETWEEN"?"SPACE_BETWEEN":"AUTO",itemReverseZIndex:e.stackReverseZIndex??!1,strokesIncludedInLayout:e.strokesIncludedInLayout??!1,layoutDirection:Ve(e,xe.layoutDirection)??"AUTO",...i?{derivedLayout:i}:{}}}function xA(e){return e.strokeCap??"NONE"}function NA(e,t){return e.strokeJoin??t?.vertices.find(n=>n.strokeJoin)?.strokeJoin??"MITER"}function Ih(e){return e==="FILL"||e==="TEXT"||e==="EFFECT"||e==="GRID"?e:null}function CA(e){return Array.isArray(e)?structuredClone(e):[]}function OA(e,t){if(e.type!=="TEXT_PATH")return null;let n=e.vectorData,r=n?.vectorNetworkBlob,i=n?.normalizedSize;if(typeof r!="number"||!i||i.x<=0||i.y<=0)return null;let o=t[r],s=e.textPathStart;try{return{network:Mu(o,n.styleOverrideTable),normalizedSize:{x:i.x,y:i.y},tValue:s?.tValue??0,forward:s?.forward??!0}}catch{return null}}function DA(e,t){let n=yg(e,t),r=xA(e),i=NA(e,n);return{vectorNetwork:n,fillGeometry:gg(ru(e.fillGeometry,t,vg(e)),n),strokeGeometry:ru(e.strokeGeometry,t),arcData:Eg(e.arcData),strokeCap:r,strokeJoin:i,dashPattern:e.dashPattern??[],borderTopWeight:e.borderTopWeight??0,borderRightWeight:e.borderRightWeight??0,borderBottomWeight:e.borderBottomWeight??0,borderLeftWeight:e.borderLeftWeight??0,independentStrokeWeights:e.borderStrokeWeightsIndependent??!1,strokeMiterLimit:e.miterLimit??Er}}function RA(e){let t=fA(e.type);return t==="FRAME"&&GA(e)||Ve(e,xe.nodeType)==="COMPONENT_SET"?"COMPONENT_SET":t==="FRAME"&&e.resizeToFit===!0&&(e.stackMode===void 0||e.stackMode==="NONE")?"GROUP":t}function ai(e,t,n="source"){let r=RA(e),i=DA(e,t),o=OA(e,t),s={nodeType:r,name:e.name??r,source:n==="source"?UA(e,t):BA(e),...Ag(e),opacity:e.opacity??1,visible:e.visible??!0,locked:e.locked??!1,internalOnly:e.internalOnly===!0||Ih(e.styleType)!==null,blendMode:e.blendMode??"PASS_THROUGH",booleanOperation:dA(e),fills:Kn(e.fillPaints),strokes:zh(e.strokePaints,e.strokeWeight,e.strokeAlign,i.strokeCap,i.strokeJoin,e.dashPattern??[]),strokeWeight:e.strokeWeight??qt,strokeAlign:gu(e.strokeAlign),effects:Hh(e.effects),layoutGrids:CA(e.layoutGrids),guides:wh(e.guides),fillStyleId:Wt(e.styleIdForFill),strokeStyleId:Wt(e.styleIdForStrokeFill),textStyleId:Wt(e.styleIdForText),effectStyleId:Wt(e.styleIdForEffect),gridStyleId:Wt(e.styleIdForGrid),sharedStyleType:Ih(e.styleType),...mA(e),...hA(e),...vA(e,t),horizontalConstraint:hh(e.horizontalConstraint),verticalConstraint:hh(e.verticalConstraint),...AA(e),...i,minWidth:gh(e.minSize,"x"),maxWidth:yh(e.maxSize,"x"),minHeight:gh(e.minSize,"y"),maxHeight:yh(e.maxSize,"y"),targetAspectRatio:EA(e),isMask:e.mask??!1,maskType:e.maskType??"ALPHA",maskIsOutline:e.maskIsOutline??!1,expanded:!0,autoRename:e.autoRename??!0,boundVariables:ig(e),variableAssignmentScales:Zo(),variableBindingScales:Zh(e),variableModes:uA(e),exportSettings:og(e),pluginData:si(e),librarySource:sg(e),pluginRelaunchData:lg(e),clipsContent:e.frameMaskDisabled===!1&&e.resizeToFit!==!0,componentId:WA(e),componentPropertyDefinitions:r==="INSTANCE"?[]:Ng(e),componentPropertyReferences:wA(e),componentPropertyAssignments:LA(e),componentPropertyValues:_A(e),...FA(e)};_E(s,o);let a=rg(e);return a&&s.textPathBox&&(s.textPathBox={x:a.x+s.textPathBox.x,y:a.y+s.textPathBox.y,width:a.width,height:a.height}),s}var MA={VARIANT:"VARIANT",TEXT:"TEXT",BOOL:"BOOLEAN",BOOLEAN:"BOOLEAN",INSTANCE_SWAP:"INSTANCE_SWAP",SLOT:"SLOT"};function xg(e){if(!e||typeof e!="object")return"";let t=e;return typeof t.boolValue=="boolean"?String(t.boolValue):typeof t.textValue=="string"?t.textValue:t.textValue&&typeof t.textValue=="object"?t.textValue.characters??"":t.guidValue?F(t.guidValue):""}function PA(e){let t={allowPreferredValuesOnly:e.allowPreferredValuesOnly??!1,displayEmptyByDefault:e.displayByDefault??!1,stretchChildOnInsert:e.stretchChildOnInsert??!1};return e.minChildren!==void 0&&(t.minChildren=e.minChildren),e.maxChildren!==void 0&&(t.maxChildren=e.maxChildren),t}function Ng(e){let t=e.componentPropDefs;if(!t?.length)return[];let n=[];for(let r of t){if(!r.id||!r.name)continue;let i=MA[r.type??""]??"VARIANT",o={id:F(r.id),name:r.name,type:i,defaultValue:xg(r.initialValue),variantOptions:i==="VARIANT"?r.preferredValues?.stringValues:void 0,preferredValues:i==="INSTANCE_SWAP"||i==="SLOT"?r.preferredValues?.instanceSwapValues?.map(s=>s.key).filter(s=>s!==void 0):void 0};r.description&&(o.description=r.description),i==="SLOT"&&r.slotPropConfig&&(o.slotSettings=PA(r.slotPropConfig)),n.push(o)}return n}function wA(e){let t=e.componentPropRefs;if(!t?.length)return[];let n={0:"VISIBLE",1:"TEXT",2:"INSTANCE_SWAP",4:"SLOT_CONTENT",VISIBLE:"VISIBLE",TEXT_DATA:"TEXT",OVERRIDDEN_SYMBOL_ID:"INSTANCE_SWAP",SLOT_CONTENT_ID:"SLOT_CONTENT"};return t.flatMap(r=>{let i=n[String(r.componentPropNodeField)];return r.defID&&i&&!r.isDeleted?[{propertyId:F(r.defID),field:i}]:[]})}function kA(e){if(e.value&&(e.value.boolValue!==void 0||e.value.textValue!==void 0||e.value.guidValue!==void 0))return xg(e.value);let t=e.varValue?.value;return t?.symbolIdValue?.guid?F(t.symbolIdValue.guid):t?.boolValue!==void 0?String(t.boolValue):t?.textValue!==void 0?t.textValue:t?.textDataValue?.characters??""}function LA(e){let t=e.componentPropAssignments;return t?.length?Object.fromEntries(t.flatMap(n=>n.defID?[[F(n.defID),kA(n)]]:[])):{}}function Cg(e){let t=e.variantPropSpecs;return t?.length?t.filter(n=>!!n.propDefId).map(n=>({propDefId:F(n.propDefId),value:n.value??""})):[]}function _A(e){let t=Cg(e),n=new Map(Ng(e).map(i=>[i.id,i.name]));if(t.length>0&&n.size>0){let i={};for(let o of t)i[n.get(o.propDefId)??o.propDefId]=o.value;return i}let r=e.name;return r?.includes("=")?jm(r):{}}function vh(e){if(!e||typeof e!="object")return null;let t=e;if(typeof t.sessionID!="number"||typeof t.localID!="number")return null;let n={sessionID:t.sessionID,localID:t.localID};return ln(n)?null:F(n)}function Uo(e){return typeof e=="string"?e:null}function VA(e){return typeof e=="string"?e:""}function Zl(e){return typeof e=="boolean"?e:!1}function FA(e){let t=e.symbolLinks??[];return{componentKey:Uo(e.componentKey),sourceLibraryKey:Uo(e.sourceLibraryKey),publishId:vh(e.publishID),overrideKey:vh(e.overrideKey),sharedSymbolVersion:Uo(e.sharedSymbolVersion),publishedVersion:Uo(e.publishedVersion),isPublishable:Zl(e.isPublishable),isSymbolPublishable:Zl(e.isSymbolPublishable),isExposedInstance:Zl(e.propsAreBubbled),symbolDescription:VA(e.symbolDescription),symbolLinks:t.filter(n=>typeof n.uri=="string").map(n=>({uri:n.uri,displayName:n.displayName,displayText:n.displayText})),variantPropSpecs:Cg(e)}}function GA(e){let t=e.componentPropDefs;return t?.length?t.some(n=>n.type==="VARIANT"):!1}function Og(e){return{stackMode:e.stackMode,stackSpacing:e.stackSpacing,stackPadding:e.stackPadding,stackPaddingRight:e.stackPaddingRight,stackPaddingBottom:e.stackPaddingBottom,stackCounterAlign:e.stackCounterAlign,stackJustify:e.stackJustify,stackCounterAlignItems:e.stackCounterAlignItems,stackPrimaryAlignItems:e.stackPrimaryAlignItems,stackPrimarySizing:e.stackPrimarySizing,stackCounterSizing:e.stackCounterSizing,stackVerticalPadding:e.stackVerticalPadding,stackHorizontalPadding:e.stackHorizontalPadding,stackWrap:e.stackWrap,stackPositioning:e.stackPositioning,stackChildPrimaryGrow:e.stackChildPrimaryGrow,stackChildAlignSelf:e.stackChildAlignSelf,stackCounterSpacing:e.stackCounterSpacing,bordersTakeSpace:e.bordersTakeSpace,stackReverseZIndex:e.stackReverseZIndex}}function BA(e){let t=Bt();return t.fig.layout=Og(e),t}function UA(e,t){return{format:"fig",id:e.guid?F(e.guid):null,orderKey:e.parentIndex?.position??null,editedFields:[],fig:{...zA(e,t),...HA(e,t),layout:Og(e)}}}function $n(e,t){if(e instanceof Uint8Array)return e;if(Array.isArray(e))return e.map(r=>$n(r,t));if(!e||typeof e!="object")return e;let n={};for(let[r,i]of Object.entries(e))if((r==="commandsBlob"||r==="vectorNetworkBlob")&&typeof i=="number"){let o=t[i];o==null?n[r]=i:n[r]={__openPencilFigmaBlob:o instanceof Uint8Array?o:new Uint8Array(Object.values(o))}}else n[r]=$n(i,t);return n}var Dg=["styleIdForFill","styleIdForStrokeFill","styleIdForText","styleIdForEffect","styleIdForGrid","styleType","componentPropAssignments","backgroundPaints","layoutGrids","exportSettings","componentPropDefs","componentPropRefs","variantPropSpecs","stateGroupPropertyValueOrders","isStateGroup","version","sourceLibraryKey","userFacingVersion","description","key","sortPosition","detachedSymbolId","documentColorProfile","variableConsumptionMap","variableModeBySetMap","parameterConsumptionMap","editInfo","backgroundColor","blendMode","pageType","isPageDivider","guides","handoffStatusMap","annotationCategories","miterLimit","mask","maskType","maskIsOutline","strokeWeight","strokeJoin","borderStrokeWeightsIndependent","borderTopWeight","borderRightWeight","borderBottomWeight","borderLeftWeight","minSize","maxSize","gridRows","gridColumns","gridRowAnchor","gridColumnAnchor","gridColumnsSizing","gridRowsSizing","gridChildVerticalAlign","gridChildHorizontalAlign","textAutoResize","textAlignHorizontal","textAlignVertical","textData","lineHeight","fontName","fontSize","letterSpacing","textTracking","fontVersion","textUserLayoutVersion","textExplicitLayoutVersion","fontVariations","fontVariantCommonLigatures","fontVariantContextualLigatures","toggledOnOTFeatures","toggledOffOTFeatures","leadingTrim","textDecorationFillPaints","textUnderlineOffset","textDecorationThickness","textDecorationStyle","semanticWeight","semanticItalic","maxLines","textPathStart","derivedTextData","fillPaints","strokePaints","effects","sectionStatusInfo","prototypeStartNodeID","prototypeInteractions","transitionInfo","codeSyntax","lockMode","slideThemeMap","isSoftDeleted","brushType","scatterStrokeSettings","vectorOperationVersion","vectorData","fillGeometry","strokeGeometry"];function zA(e,t){let n={};for(let r of Dg){let i=e[r];i!==void 0&&(n[r]=$n(i,t))}return{rawSize:e.size?{...e.size}:null,rawTransform:e.transform?{...e.transform}:null,rawNodeFields:n}}function HA(e,t){let n=e.symbolData;return{symbolOverrides:$n(n?.symbolOverrides??[],t),componentPropAssignments:$n(e.componentPropAssignments??[],t),derivedSymbolData:$n(e.derivedSymbolData??[],t),derivedSymbolDataLayoutVersion:typeof e.derivedSymbolDataLayoutVersion=="number"?e.derivedSymbolDataLayoutVersion:null,uniformScaleFactor:typeof n?.uniformScaleFactor=="number"?n.uniformScaleFactor:null}}function WA(e){let t=e.symbolData;return t?.symbolID?F(t.symbolID):""}function Qo(e,t=!1){let n=Math.round(e/100)*100,r=Po[n]??"Regular";return t?`${r} Italic`:r}var XA=0,jA=1,$A=2,Th=4;function KA(e){switch(e){case"M":case"L":return 1+2*Float32Array.BYTES_PER_ELEMENT;case"C":case"Q":return 1+6*Float32Array.BYTES_PER_ELEMENT;case"Z":return 1;default:return 0}}function es(e,t=1){let n=e.reduce((c,f)=>c+KA(f.type),0),r=new Uint8Array(n),i=new DataView(r.buffer),o=0,s=c=>{i.setFloat32(o,(c??0)/t,!0),o+=Float32Array.BYTES_PER_ELEMENT},a=c=>c===void 0?void 0:-c,l=0,u=0;for(let c of e)switch(c.type){case"M":r[o++]=jA,s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"L":r[o++]=$A,s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"C":r[o++]=Th,s(c.x1),s(a(c.y1)),s(c.x2),s(a(c.y2)),s(c.x),s(a(c.y)),l=c.x??0,u=c.y??0;break;case"Q":{let f=c.x1??0,p=c.y1??0,d=c.x??0,m=c.y??0;r[o++]=Th,s(l+2/3*(f-l)),s(a(u+2/3*(p-u))),s(d+2/3*(f-d)),s(a(m+2/3*(p-m))),s(d),s(a(m)),l=d,u=m;break}case"Z":r[o++]=XA}return r}function Rg(e,t,n,r){if(t===1&&n===1)return e;let i=Math.cos(r),o=Math.sin(r),s=t*i*i+n*o*o,a=(n-t)*o*i,l=t*o*o+n*i*i;return Fr(e,s,a,a,l)}function Pu(e){let t=Fh(e.axis);return t===void 0?{axisName:e.axis,value:e.value}:{axisTag:t,axisName:e.axis,value:e.value}}function YA(e,t,n){t.textDecoration&&(e.textDecoration=t.textDecoration),t.textDecorationStyle&&(e.textDecorationStyle=t.textDecorationStyle),t.textDecorationThickness!=null&&(e.textDecorationThickness={value:t.textDecorationThickness,units:"PIXELS"}),t.textDecorationSkipInk!==void 0&&(e.textDecorationSkipInk=t.textDecorationSkipInk),t.textUnderlineOffset!=null&&(e.textUnderlineOffset={value:t.textUnderlineOffset,units:"PIXELS"}),t.textDecorationFills&&t.textDecorationFills.length>0&&(e.textDecorationFillPaints=t.textDecorationFills.map(n))}function qA(e,t,n,r){let i={styleID:e},o=t.fontWeight??n.fontWeight,s=t.italic??n.italic;return i.fontName={family:Kr(t.fontFamily??n.fontFamily),style:Qo(o,s),postscript:""},t.fontSize!==void 0&&(i.fontSize=t.fontSize),t.fontVariations&&t.fontVariations.length>0&&(i.fontVariations=t.fontVariations.map(Pu)),t.fontFeatures&&t.fontFeatures.length>0&&du(i,t.fontFeatures),t.letterSpacing!==void 0&&(i.letterSpacing={value:t.letterSpacing,units:"PIXELS"}),t.lineHeight!==void 0&&(i.lineHeight=t.lineHeight===null?{...ii}:{value:t.lineHeight,units:"PIXELS"}),YA(i,t,r),t.textCase&&(i.textCase=t.textCase),t.fills&&t.fills.length>0&&(i.fillPaints=t.fills.map(r)),i}function wu(e){let t=Array.from({length:e.text.length}).fill(0),n=new Map,r=1;for(let i of e.styleRuns){let o=JSON.stringify(i.style),s=n.get(o);s||(s={id:r++,style:i.style},n.set(o,s));for(let a=i.start;a<i.start+i.length&&a<t.length;a++)t[a]=s.id}return{charIds:t,styleMap:n}}function Mg(e){return[...wu(e).styleMap.values()]}function Pg(e){return wu(e).charIds}function wg(e,t){let{charIds:n,styleMap:r}=wu(e),i=[...r.values()].map(({id:l,style:u})=>qA(l,u,e,t)),o=lA(e,r.size+1),s=[...i,...o.overrides],a={characters:e.text,lines:o.lines};return e.styleRuns.length>0&&(a.characterStyleIDs=n),s.length>0&&(a.styleOverrideTable=s),a}function ou(e){return{layoutSize:{x:e.node.width,y:e.node.height},baselines:e.baselines,glyphs:e.glyphs,...e.decorations?{decorations:e.decorations}:{},fontMetaData:e.fontMetaData,logicalIndexToCharacterOffsetMap:e.logicalIndexToCharacterOffsetMap,derivedLines:[{directionality:"LTR"}],truncationStartIndex:-1,truncatedHeight:-1}}var JA=[{type:"Z"}];function kg(e,t){let n=mu(t),r=e.glyphBlobMap.get(n);if(r!==void 0)return r;let i=e.blobs.push(t)-1;return e.glyphBlobMap.set(n,i),i}function ZA(e,t){let n=[],r=new Set,i=(o,s,a)=>{let l=Kr(o),u=`${l}|${Pl(s,a)}`;r.has(u)||(r.add(u),n.push({key:{family:l,style:Qo(s,a),postscript:""},fontLineHeight:1.2,fontDigest:t.get(u),fontStyle:a?"ITALIC":"NORMAL",fontWeight:s}))};i(e.fontFamily,e.fontWeight,e.italic);for(let o of e.styleRuns)i(o.style.fontFamily??e.fontFamily,o.style.fontWeight??e.fontWeight,o.style.italic??e.italic);return n}function QA(e,t){return e.glyphs.map(n=>({commandsBlob:n.commands?kg(t,es(n.commands.length>0?n.commands:JA,n.fontSize)):void 0,position:{x:n.x,y:n.y},fontSize:n.fontSize,firstCharacter:n.firstCharacter,advance:n.fontSize>0?n.advance/n.fontSize:0,rotation:0}))}function ex(e){return e.some(({glyph:t})=>(t.rotation??0)!==0)?[e]:Object.values(on(e,({glyph:t})=>String(t.y))).sort((t,n)=>t[0].glyph.y-n[0].glyph.y)}function Lg(e,t){let n=il(e)||t.some(r=>r.firstCharacter!==void 0);return t.map((r,i)=>r.firstCharacter??(n?void 0:i))}function tx(e,t,n){let r=t.flatMap(({character:i})=>i===void 0?[]:[i]);return r.length>0?Math.min(...r):n===void 0?0:Hn(e.text)[nl(e.text,n)+1]?.start??e.text.length}function nx(e,t){let n=e.lineHeight??Math.ceil(e.fontSize*1.2),r=Array.from({length:e.text.length},()=>0),i=Lg(e,t),o=ex(t.map((l,u)=>({glyph:l,character:i[u]}))),s=[],a;for(let l of o){s.push(tx(e,l,a));for(let{character:u}of l)u!==void 0&&(a=Math.max(a??0,u));l.every(({character:u})=>u===void 0)&&(a=s.at(-1))}return{baselines:o.map((l,u)=>{let c=l.filter(({character:p})=>p!==void 0),f=c.length?Math.min(...c.map(({glyph:p})=>p.x)):Math.max(...l.map(({glyph:p})=>p.x+(p.advance??0)));for(let{glyph:p,character:d}of c)d!==void 0&&d<r.length&&(r[d]=p.x-f);return{firstCharacter:s[u],endCharacter:s[u+1]??e.text.length,position:{x:f,y:l[0].glyph.y},width:e.width,lineY:u*n,lineHeight:n,lineAscent:Math.max(n-e.fontSize*.2,0)}}),logicalIndexToCharacterOffsetMap:r}}function rx(e,t){return e.fontSize<=0?0:e.advance!==void 0?e.advance*(e.scaleX??1)/e.fontSize:t?Math.max(t.x-e.x,0)/e.fontSize:0}function ix(e,t,n){let r=Lg(e,t);return t.map((i,o)=>{let s=t[o+1],a=o+1<t.length&&s.y===i.y&&(s.rotation??0)===(i.rotation??0);return{commandsBlob:kg(n,Rg(i.commandsBlob,i.scaleX??1,i.scaleY??1,i.rotation??0)),position:{x:i.x,y:i.y},fontSize:i.fontSize,firstCharacter:r[o],advance:rx(i,a?s:void 0),rotation:i.rotation??0}})}function Sh(e,t,n){let r=n.textDecorations(e,t);if(r.length===0)return;let i=Pg(e),o=on(r,s=>String(i[s.firstCharacter]??0));return Object.entries(o).map(([s,a])=>({rects:a.map(({x:l,y:u,width:c,height:f})=>({x:l,y:u,w:c,h:f})),styleID:Number(s)}))}function ox(e,t){try{return t.shapeText(e)}catch(n){return console.warn(`Writing "${e.name}" without glyphs; text shaping failed:`,n),null}}function _g(e,t){let n=ZA(e,t.digestMap),r=e.derivedTextGlyphs??[];if(r.length>0)return ou({node:e,glyphs:ix(e,r,t),decorations:e.textPathData?void 0:Sh(e,r,t),fontMetaData:n,...nx(e,r)});let i=e.textPathData?null:ox(e,t);return ou({node:e,glyphs:i?QA(i,t):[],decorations:i?Sh(e,i.glyphs,t):void 0,fontMetaData:n,baselines:i?.baselines??[],logicalIndexToCharacterOffsetMap:i?.logicalIndexToCharacterOffsetMap??[]})}function sx(e){let t=new Map;for(let n of e.getAllNodes()){if(n.sharedStyleType===null||!n.source.id)continue;let r=Ne(n);typeof r.key=="string"&&t.set(n.source.id,{assetRef:{key:r.key,...typeof r.version=="string"?{version:r.version}:{}}})}return t}function ax(e,t){if(!e.styleNodeIds){let r=new Map;for(let i of e.graph.getAllNodes())i.sharedStyleType!==null&&i.source.id&&r.set(i.source.id,i.id);e.styleNodeIds=r}let n=e.styleNodeIds.get(t);return(n?e.nodeIdToGuid?.get(n):void 0)??e.nodeIdToGuid?.get(t)??_e(t)}function $o(e,t){return e.styleReferences??(e.styleReferences=sx(e.graph)),e.styleReferences.get(t)??{guid:ax(e,t)}}var bh=2147483647;function xt(e){if(!/^\d+:\d+$/.test(e))return null;let t=_e(e);return t.sessionID<=bh&&t.localID<=bh?t:null}function lx(e,t){let n=new Set,r=t;for(;!n.has(r);){n.add(r);let i=e.graph.getNode(r);if(i?.type!=="INSTANCE"||!i.componentId)return r;r=i.componentId}return t}function li(e,t,n){let r=e.graph.getNode(t);if(!r)return;let i=e.nodeIdToGuid?.get(t);if(i)return i;let o=!r.source.id||!e.recordOwners||e.recordOwners.get(r.source.id)===t,s=r.source.id&&o?xt(r.source.id):null;if(s&&e.assignedGuidValues){let l=`${s.sessionID}:${s.localID}`;if(e.assignedGuidValues.has(l)){let u={sessionID:1,localID:n.value++};return e.nodeIdToGuid?.set(t,u),e.assignedGuidValues.add(`${u.sessionID}:${u.localID}`),u}}let a=s??{sessionID:1,localID:n.value++};return e.nodeIdToGuid?.set(t,a),e.assignedGuidValues?.add(`${a.sessionID}:${a.localID}`),a}function ei(e,t,n){let r=e.propertyIdToGuid.get(t);if(r)return r;let i=xt(t);if(i)return i;let o={sessionID:1,localID:n.value++};return e.propertyIdToGuid.set(t,o),e.assignedGuidValues?.add(`${o.sessionID}:${o.localID}`),o}function ux(e,t,n){let r=e.graph.getNode(t);for(;r?.parentId;){if(r.parentId===n)return!0;r=e.graph.getNode(r.parentId)}return!1}function ku(e,t,n,r){let i=t.boundVariables[r];if(!i){if(!n.colorVar)return n;let{colorVar:o,...s}=n;return s}return{...n,colorVar:{dataType:"ALIAS",resolvedDataType:"COLOR",value:{alias:bu(e.graph,i,e.varIdToGuid)}}}}function Lu(e,t){return t.fills.map((n,r)=>ku(e,t,e.fillToKiwiPaint(n),`fills/${r}/color`))}function _u(e,t){return t.strokes.map((n,r)=>ku(e,t,e.fillToKiwiPaint(n),`strokes/${r}/color`))}function Vg(e,t){return n=>{let r=e.graph.getNode(n);return(r?.overrideKey?xt(r.overrideKey):null)??li(e,n,t)}}function Fg(e,t,n,r){if(n.id===t.id&&t.componentId){let l=r(t.componentId);return l?[l]:void 0}let i=[],o=n.parentId?e.getNode(n.parentId):void 0;for(;o&&o.id!==t.id;)o.type==="INSTANCE"&&i.unshift(o),o=o.parentId?e.getNode(o.parentId):void 0;if(!o)return;let s=[],a=t;for(let l of[...i,n]){let u=cx(e,Gg(a,l));if(!u)return;let c=r(u);if(!c)return;s.push(c),a=l}return s}function Gg(e,t){let n=et(e.instanceOverrides,e.id,t.id,"sourceComponentId");return typeof n=="string"?n:t.componentId}function cx(e,t){let n=new Set,r=t?e.getNode(t):void 0;for(;r;){let i=r.parentId?nn(e,r.parentId):void 0;if(!i)return r.id;if(n.has(r.id))return;n.add(r.id);let o=Gg(i,r);r=o?e.getNode(o):void 0}}function fx(e,t,n,r,i){let o=c=>c.map(f=>`${f.sessionID}:${f.localID}`).join("/"),s=new Map,a=[];for(let c of r){if(!c.guidPath?.guids?.length){a.push(c);continue}let f=o(c.guidPath.guids);s.set(f,{...s.get(f),...c})}let l=new Set,u=c=>{for(let f of e.getChildren(c.id)){let p=Fg(e,t,f,n);if(!p)throw new Error(`Missing instance geometry address for ${f.id} under ${t.id}`);let d=o(p);if(l.has(d))throw new Error(`Ambiguous instance geometry address ${d} under ${t.id}`);l.add(d),s.set(d,{...s.get(d),guidPath:{guids:p},...i(f)}),Ut(e,f)||u(f)}};return u(t),[...a,...s.values()]}function dx(e,t,n){let r=s=>e.nodeIdToGuid?.get(s)??_e(s),i=n.hyperlink;i&&(t.hyperlink=i.type==="URL"?{url:i.value}:{guid:r(i.value)}),n.textStyleId!==void 0&&(t.styleIdForText=n.textStyleId?$o(e,n.textStyleId):{guid:{...an}}),n.fillStyleId!==void 0&&(t.styleIdForFill=n.fillStyleId?$o(e,n.fillStyleId):{guid:{...an}});let o=jh(n.boundVariables??{},e.graph,e.varIdToGuid);o.length>0&&(t.parameterConsumptionMap={entries:o})}function px(e,t,n){let r=n.styleOverrideTable;if(!r)return;let i=new Map(Mg(t).map(({id:o,style:s})=>[o,s]));for(let o of r){let s=i.get(o.styleID);s&&dx(e,o,s)}}var Wo={guid:{...an}},ui={name:{scene:["name"],kind:"scalar"},opacity:{scene:["opacity"],kind:"scalar"},fontSize:{scene:["fontSize"],kind:"scalar",length:!0},visible:{scene:["visible"],kind:"visible"},textData:{scene:["text","styleRuns","textParagraphs"],kind:"text"},styleIdForText:{scene:["textStyleId"],kind:"text-style"},fillPaints:{scene:["fills"],kind:"paint"},strokePaints:{scene:["strokes"],kind:"paint"},size:{scene:["width","height"],kind:"size",length:!0},stackSpacing:{scene:["itemSpacing"],kind:"layout-distance",length:!0},stackCounterSpacing:{scene:["counterAxisSpacing"],kind:"layout-distance",length:!0},stackHorizontalPadding:{scene:["paddingLeft"],kind:"layout-distance",length:!0},stackVerticalPadding:{scene:["paddingTop"],kind:"layout-distance",length:!0},stackPaddingRight:{scene:["paddingRight"],kind:"layout-distance",length:!0},stackPaddingBottom:{scene:["paddingBottom"],kind:"layout-distance",length:!0},textAutoResize:{scene:["textAutoResize"],kind:"layout-mode"},stackChildPrimaryGrow:{scene:["layoutGrow"],kind:"layout-mode"},stackPrimarySizing:{scene:["primaryAxisSizing"],kind:"layout-mode"},stackCounterSizing:{scene:["counterAxisSizing"],kind:"layout-mode"},stackChildAlignSelf:{scene:["layoutAlignSelf"],kind:"layout-mode"},cornerRadius:{scene:["cornerRadius"],kind:"node",length:!0,absent:0},rectangleTopLeftCornerRadius:{scene:["topLeftRadius"],kind:"node",length:!0,absent:0},rectangleTopRightCornerRadius:{scene:["topRightRadius"],kind:"node",length:!0,absent:0},rectangleBottomRightCornerRadius:{scene:["bottomRightRadius"],kind:"node",length:!0,absent:0},rectangleBottomLeftCornerRadius:{scene:["bottomLeftRadius"],kind:"node",length:!0,absent:0},rectangleCornerRadiiIndependent:{scene:["independentCorners"],kind:"node",absent:!1},cornerSmoothing:{scene:["cornerSmoothing"],kind:"node",absent:0},strokeWeight:{scene:["strokeWeight"],kind:"node",length:!0},strokeAlign:{scene:["strokeAlign"],kind:"node",absent:"CENTER"},borderTopWeight:{scene:["borderTopWeight"],kind:"node",length:!0},borderRightWeight:{scene:["borderRightWeight"],kind:"node",length:!0},borderBottomWeight:{scene:["borderBottomWeight"],kind:"node",length:!0},borderLeftWeight:{scene:["borderLeftWeight"],kind:"node",length:!0},borderStrokeWeightsIndependent:{scene:["independentStrokeWeights"],kind:"node",absent:!1},strokeCap:{scene:["strokeCap"],kind:"node",absent:"NONE"},strokeJoin:{scene:["strokeJoin"],kind:"node",absent:"MITER"},miterLimit:{scene:["strokeMiterLimit"],kind:"node"},dashPattern:{scene:["dashPattern"],kind:"node",length:!0,absent:[]},blendMode:{scene:["blendMode"],kind:"node",absent:"PASS_THROUGH"},effects:{scene:["effects"],kind:"node",absent:[]},locked:{scene:["locked"],kind:"node",absent:!1},layoutGrids:{scene:["layoutGrids"],kind:"node",absent:[]},styleIdForFill:{scene:["fillStyleId"],kind:"node",absent:Wo},styleIdForStrokeFill:{scene:["strokeStyleId"],kind:"node",absent:Wo},styleIdForEffect:{scene:["effectStyleId"],kind:"node",absent:Wo},stackPrimaryAlignItems:{scene:["primaryAxisAlign"],kind:"node"},stackCounterAlignItems:{scene:["counterAxisAlign"],kind:"node"},stackPositioning:{scene:["layoutPositioning"],kind:"node"},fontName:{scene:["fontFamily","fontWeight","italic"],kind:"node"},fontVariations:{scene:["fontVariations"],kind:"node",absent:[]},lineHeight:{scene:["lineHeight"],kind:"node",absent:{value:100,units:"PERCENT"}},letterSpacing:{scene:["letterSpacing"],kind:"node"},paragraphSpacing:{scene:["paragraphSpacing"],kind:"node",length:!0,absent:0},textCase:{scene:["textCase"],kind:"node",absent:"ORIGINAL"},textDecoration:{scene:["textDecoration"],kind:"node",absent:"NONE"},textAlignHorizontal:{scene:["textAlignHorizontal"],kind:"node"},textAlignVertical:{scene:["textAlignVertical"],kind:"node"},textTruncation:{scene:["textTruncation"],kind:"node",absent:"DISABLED"},maxLines:{scene:["maxLines"],kind:"node"}},Bg=Object.entries(ui),mx=new Map(Object.entries(on(Bg.flatMap(([e,t])=>t.scene.map(n=>({scene:n,raw:e,field:t}))),e=>e.scene)).map(([e,t])=>[e,t.map(({raw:n,field:r})=>({raw:n,field:r}))]));function Ug(e){return Bg.flatMap(([t,n])=>n.kind===e?[t]:[])}Ug("scalar");var zg=Object.fromEntries(Ug("layout-distance").map(e=>[ui[e].scene[0],e])),Hg=["componentKey","sourceLibraryKey","publishID","publishedVersion","sharedSymbolVersion","isSymbolPublishable","variantPropSpecs","componentPropDefs","overrideKey"];function su(e,t,n){if(t.layoutMode!=="HORIZONTAL"&&t.layoutMode!=="VERTICAL")return!1;let r=t.layoutMode==="HORIZONTAL"?"VERTICAL":"HORIZONTAL",i=n==="stackPrimarySizing"?t.layoutMode:r;return fo(e,t,i)==="FILL"}function hx(e,t){let n={...El(e,t,"default"),...jr(e,t,"default"),...Al(e,t,"default"),...xl(e,t,"default")};return Object.keys(n).length>0?{...t,...n}:t}function Wg(e,t){e.resolvedNodes??(e.resolvedNodes=new WeakMap);let n=e.resolvedNodes.get(t);return n||(n=hx(e.graph,t),e.resolvedNodes.set(t,n)),n}function gx(e,t){let n=e.componentScale;if(!Number.isFinite(n)||n<=0)throw new Error("Invalid instance uniform scale");return{x:t.width/n,y:t.height/n}}function yx(e,t,n,r){if(!n||t.type!=="INSTANCE"||!t.componentId)return;let i=li(e,t.componentId,r);return i?{guidPath:{guids:n},overriddenSymbolID:i}:void 0}function Ix(e,t,n,r){if(!(typeof t!="string"&&typeof t!="number")){if(e==="stackPrimarySizing"||e==="stackCounterSizing"){let i=t==="HUG"&&!su(n,r,e);return{[e]:i?"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":"FIXED"}}return{[e]:t}}}function vx(e,t,n){if(typeof t!="number")return;let r=n.componentScale;if(!Number.isFinite(r)||r<=0)throw new Error("Invalid instance uniform scale");return{[e]:t/r}}function Tx(e,t){let n=mx.get(e);if(!n)return;let r=gl(n.map(({raw:i,field:o})=>bx(i,o,e,t)));return r.length>0?Object.assign({},...r):void 0}function Sx(e,t,n){let r=t.componentScale;if(!Number.isFinite(r)||r<=0)throw new Error("Invalid instance uniform scale");return e(r===1?n:{...n,...Hr(n,1/r,!1)})}function bx(e,t,n,{context:r,instance:i,target:o,value:s,nodeFields:a}){switch(t.kind){case"node":{let l=a(),u=e in l?l[e]:t.absent;return u===void 0?void 0:{[e]:u}}case"scalar":return{[e]:o[n]};case"visible":return{visible:o.visible};case"text":{let l=n==="text"&&typeof s=="string"?s:o.text;return{textData:{...a().textData,characters:l}}}case"text-style":return{styleIdForText:o.textStyleId?$o(r,o.textStyleId):structuredClone(Wo)};case"paint":return e==="fillPaints"?{fillPaints:Lu(r,o)}:{strokePaints:_u(r,o)};case"size":return{size:gx(i,o)};case"layout-distance":return vx(e,o[n],i);case"layout-mode":return Ix(e,o[n],r.graph,o);default:return}}function Ex(e,t,n){if(/^fills\/\d+\/color$/.test(n))return{fillPaints:Lu(e,t)};if(/^strokes\/\d+\/color$/.test(n))return{strokePaints:_u(e,t)}}function Ax({context:e,instance:t,target:n},r){let i=r.slice(15),o=Ex(e,n,i);if(o)return o;let s=qh(i,n,t,e.graph,e.varIdToGuid);return s?{parameterConsumptionMap:{entries:[s]}}:void 0}function xx(e,t,n,r){let i=Wg(e.context,e.target),s={...e,target:i,nodeFields:()=>{let l=e.records.get(i.id);return l||(l=Sx(e.writeNodeFields,e.instance,i),e.records.set(i.id,l)),l}};if(t==="componentId")return yx(s.context,s.target,n,r);let a=t.startsWith("boundVariables/")?Ax(s,t):Tx(t,s);return a&&{guidPath:{guids:n},...a}}function Nx(e,t,n,r){let i=[],o=Vg(e,n),s=new Map,a=new Map,l=f=>{let p=e.graph.getNode(f);if(!p||p.id!==t.id&&!ux(e,f,t.id))return;let d=Fg(e.graph,t,p,o);return d?{target:p,path:d}:void 0},u=(f,p)=>{let d=p||f.id;s.has(d)||s.set(d,l(d));let m=s.get(d);return m&&{target:m.target,path:[...m.path]}},c=f=>{if(f.type==="INSTANCE"&&kr(f.instanceOverrides,(p,d,m)=>{let h=u(f,p);if(!h)return;let y=xx({context:e,instance:t,target:h.target,value:m,records:a,writeNodeFields:r},d,h.path,n);y&&i.push(y)}),!Ut(e.graph,f))for(let p of e.graph.getChildren(f.id))c(p)};return c(t),i}function Eh(e){let t=e.guidPath?.guids;return t?.length?t.map(({sessionID:n,localID:r})=>`${n}:${r}`).join("/"):null}function Cx(e,t){let n=new Map;e.forEach((r,i)=>{let o=Eh(r);o&&n.set(o,i)});for(let r of t){let i=Eh(r),o=i?n.get(i)??-1:-1;o<0?(i&&n.set(i,e.length),e.push(r)):e[o]={...e[o],...r,...fn(e[o],r)}}}function qn(e){return e.symbolData}function Jn(e){return qn(e)?.symbolOverrides??[]}function ts(e){return qn(e)?.uniformScaleFactor??1}function Zn(e,t,n){t(e,n);for(let r of Jn(e))Zn(r,t,r)}var Xg=an;function ns(e){let t=e?.slotContentIdValue?.guid;if(t)return ln(t)?void 0:t}function jg(e){return{value:{slotContentIdValue:{guid:e}},dataType:"SLOT_CONTENT_ID",resolvedDataType:"SLOT_CONTENT_ID"}}function Ox(e){let t={varValue:jg({...Xg})},n=e.slotSettings;if(!n)return t;let r={stretchChildOnInsert:n.stretchChildOnInsert,displayByDefault:n.displayEmptyByDefault,allowPreferredValuesOnly:n.allowPreferredValuesOnly};return n.minChildren!==void 0&&(r.minChildren=n.minChildren),n.maxChildren!==void 0&&(r.maxChildren=n.maxChildren),t.slotPropConfig=r,t}function Dx(e,t,n){let r=i=>{for(let o of e.graph.getChildren(i.id)){if(He(o)===n&&Ut(e.graph,o))return o;if(o.type==="INSTANCE")continue;let s=r(o);if(s)return s}};return r(t)}function Rx(e,t,n,r,i){let o=e.slotContentRecords,s=Dx(e,t,n);if(!o||!s)return null;let a=e.sceneNodeToKiwi(s,{...Xg},0,i,e),l=a.at(0);return l?.guid?(Mx(l),o.push(...a),{defID:r,varValue:jg(l.guid)}):null}function Mx(e){e.isSlotContent=!0,Reflect.deleteProperty(e,"componentPropRefs");let t=e.parameterConsumptionMap?.entries?.filter(n=>n.variableField!=="SLOT_CONTENT_ID");t?.length?e.parameterConsumptionMap={entries:t}:Reflect.deleteProperty(e,"parameterConsumptionMap")}var Ah=new WeakMap;function Px(e,t,n){let r=e.orderKeys?.get(t.id);if(r)return r;let i=t.parentId;if(!i)return e.fractionalPosition(n);let o=e.graph.getNode(i);if(!o||o.type==="CANVAS")return e.fractionalPosition(n);let s=Ah.get(e);s||(s=new Map,Ah.set(e,s));let a=s.get(i);if(!a){let l=e.graph.getChildren(i).filter(c=>!c.internalOnly),u=fh(l.map(c=>c.source.orderKey));a={keyById:new Map(l.map((c,f)=>[c.id,u[f]]))},s.set(i,a)}return a.keyById.get(t.id)??e.fractionalPosition(n)}function wx(e){return e==="EXCLUDE"?"XOR":e??"UNION"}function $g(e,t){let n=new Map;for(let[r,i]of e.variables){if(!i.key)continue;let o=t.get(r)??_e(r);n.set(i.key,o),i.version&&n.set(`${i.key}@${i.version}`,o)}return n}function kx(e){return e==="BOOLEAN"?"BOOL":e}function au(e,t,n,r){if(e==="BOOLEAN")return{boolValue:t==="true"};if(e==="INSTANCE_SWAP"){let i=n.graph.getNode(t),o=i?li(n,i.id,r):xt(t);return o?{guidValue:o}:{textValue:{characters:t}}}return{textValue:{characters:t}}}function xh(e,t,n,r){let i=au(e,t,n,r);return e==="BOOLEAN"?{value:{boolValue:t==="true"},dataType:"BOOLEAN",resolvedDataType:"BOOLEAN"}:e==="INSTANCE_SWAP"&&"guidValue"in i?{value:{symbolIdValue:{guid:i.guidValue}},dataType:"SYMBOL_ID",resolvedDataType:"SYMBOL_ID"}:{value:{textValue:t},dataType:"STRING",resolvedDataType:"STRING"}}function Lx(e,t,n){let r=Object.entries(e.variableModes).flatMap(([i,o])=>{let s=t?.get(i)??xt(i),a=n?.get(o)??xt(o);return!s||!a?[]:[{variableSetID:{guid:s},variableModeID:a}]});return r.length>0?{entries:r}:void 0}var _x=new Set(["variableConsumptionMap","parameterConsumptionMap"]),Vx=new Set(["colorVar","opacityVar"]),Fx=new Set(["BOOLEAN","FLOAT","STRING","ALIAS","COLOR","SYMBOL_ID","TEXT_DATA","PROP_REF"]);function Gx(e){return!!e&&typeof e=="object"&&!Array.isArray(e)&&"entries"in e}function Kg(e){return!!e&&typeof e=="object"&&!Array.isArray(e)}function Bx(e){if(!Kg(e))return!1;let t=e,n=t.variableData?.dataType;return typeof n=="string"&&Fx.has(n)||!!t.variableData?.value?.propRefValue}function Ux(e){if(!Kg(e))return!1;let t=e;return t.variableData?.dataType==="PROP_REF"||!!t.variableData?.value?.propRefValue}function zx(e,t,n,r){if(!Gx(e))return;let i=e.entries?.filter(r)??[];if(i.length!==0)return{entries:i.map(o=>cn(o,t,n))}}function Hx(e,t,n){let r=e.__openPencilFigmaBlob,i=r instanceof Uint8Array?r:new Uint8Array(Object.values(r??{})),o=mu(i),s=n.blobIndexByHex?.get(o);if(s!==void 0)return s;let a=t.length;return t.push(i),n.blobIndexByHex?.set(o,a),a}function Wx(e,t){return e==="stackCounterAlignItems"&&t==="STRETCH"?"MIN":(e==="stackJustify"||e==="stackPrimaryAlignItems"||e==="stackCounterAlign"||e==="stackCounterAlignItems")&&t==="SPACE_EVENLY"?"SPACE_BETWEEN":t}function cn(e,t,n={}){if(e instanceof Uint8Array)return e;if(Array.isArray(e))return e.map(i=>cn(i,t,n));if(!e||typeof e!="object")return e;if("__openPencilFigmaBlob"in e)return Hx(e,t,n);let r={};for(let[i,o]of Object.entries(e))if(!(Vx.has(i)&&!n.includePaintVariables)){if(_x.has(i)){let s=zx(o,t,n,n.includeVariableMaps?Bx:Ux);s!==void 0&&(r[i]=s);continue}r[i]=Wx(i,cn(o,t,n))}return r}var Xx=new Set(["pageType","derivedSymbolData","derivedSymbolDataLayoutVersion","sourceLibraryKey","minSize","maxSize","variableConsumptionMap","parameterConsumptionMap"]);function jx(e){return e.type!=="TEXT"||e.textPathData===null||(e.derivedTextGlyphs?.length??0)===0||e.textPathBox===null||e.strokeGeometry.length!==0?!1:e.strokes.length>0}function $x(e){return e.type==="TEXT"&&e.textPathData!==null&&Yo(e).rawTransform===null&&(e.derivedTextGlyphs?.length??0)>0}function Kx(e,t,n){let r=Ne(t);(jx(t)||$x(t))&&(r={...r},delete r.strokeGeometry,delete r.derivedTextData);let i=cn(r,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0});for(let o of Object.keys(i))if(!Xx.has(String(o))){if((o==="fillPaints"||o==="strokePaints")&&t.source.id){let s=i[o],a=o==="fillPaints"?t.fills:t.strokes;n[o]=s?.map((l,u)=>{let c=`${o==="fillPaints"?"fills":"strokes"}/${u}/color`,f=ku(e,t,l,c),p=t.boundVariables[c]?a[u]:void 0;return p?{...f,color:e.safeColor(p.color),opacity:p.opacity}:f});continue}if(o==="effects"&&t.source.id&&e.assetRefToVarGuid&&e.assetRefToVarGuid.size>0){n[o]=Yx(i[o],e.assetRefToVarGuid);continue}if(o==="derivedTextData"&&t.source.id){n.derivedTextData=i.derivedTextData;continue}if(o==="textDecorationFillPaints"&&t.source.id){n.textDecorationFillPaints=i.textDecorationFillPaints;continue}o in n||(n[o]=i[o])}}function Yx(e,t){if(!Array.isArray(e))return e;let n=e.map(r=>{let i=r.colorVar,o=i?.value?.alias;if(!i||!o||o.guid||!o.assetRef?.key)return r;let s=o.assetRef,a=s.version?`${s.key}@${s.version}`:s.key,l=t.get(a)??t.get(s.key);return l?{...r,colorVar:{...i,value:{...i.value,alias:{guid:l}}}}:r});return n.some((r,i)=>r!==e[i])?n:e}function qx(e,t,n,r){if(t.type!=="INSTANCE"||!t.componentId)return;let i=li(e,lx(e,t.componentId),r);if(i){let s={symbolID:i},a=[];if(t.source.fig.symbolOverrides.length>0&&a.push(...cn(t.source.fig.symbolOverrides,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0})),Cx(a,Nx(e,t,r,l=>ty(e,l))),a.length>0&&(s.symbolOverrides=a),!Number.isFinite(t.componentScale)||t.componentScale<=0)throw new Error("Invalid instance uniform scale");(t.componentScale!==1||t.source.fig.uniformScaleFactor!=null)&&(s.uniformScaleFactor=t.componentScale),n.symbolData=s}t.source.fig.componentPropAssignments.length>0&&!t.source.editedFields.includes("componentPropertyAssignments")&&(n.componentPropAssignments=cn(t.source.fig.componentPropAssignments,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0}));let o=cn(t.source.fig.derivedSymbolData,e.blobs,{blobIndexByHex:e.blobIndexByHex,includePaintVariables:!0,includeVariableMaps:!0});n.derivedSymbolData=fx(e.graph,t,Vg(e,r),o,s=>({size:qg(s),transform:Jg(e,s)})),t.source.fig.derivedSymbolDataLayoutVersion!=null&&(n.derivedSymbolDataLayoutVersion=t.source.fig.derivedSymbolDataLayoutVersion)}function Jx(e,t){if((e.type==="INSTANCE_SWAP"||e.type==="SLOT")&&e.preferredValues?.length)return{instanceSwapValues:e.preferredValues.map(n=>{let r=t.graph.getNode(n);return{type:"COMPONENT",key:r?.componentKey||r?.sourceLibraryKey||n}})};if(e.type==="VARIANT"&&e.variantOptions?.length)return{stringValues:[...e.variantOptions]}}function Zx(e){return e==="TEXT"?"TEXT_DATA":e==="INSTANCE_SWAP"?"OVERRIDDEN_SYMBOL_ID":e==="SLOT_CONTENT"?"SLOT_CONTENT_ID":"VISIBLE"}function Yg(e){let t=new Map;for(let n of e.getAllNodes())for(let r of n.componentPropertyDefinitions)t.has(r.id)||t.set(r.id,r);return t}function zo(e,t,n,r=!1){return n&&!(t in Ne(e))&&!r}function Qx(e){let t=e.parameterConsumptionMap?.entries??[],n=new Set(t.map(i=>i.variableField)),r=e.variableConsumptionMap?.entries??[];r.length&&(e.parameterConsumptionMap={entries:[...r.filter(i=>!n.has(i.variableField)),...t]})}function eN(e,t){if(!t.length)return;let n=e.parameterConsumptionMap,r=new Set(t.map(s=>s.componentPropNodeField)),i=(n?.entries??[]).filter(s=>!r.has(s.variableField??"")),o={VISIBLE:"BOOLEAN",TEXT_DATA:"STRING",OVERRIDDEN_SYMBOL_ID:"SYMBOL_ID",SLOT_CONTENT_ID:"SLOT_CONTENT_ID"};for(let s of t)i.push({variableField:s.componentPropNodeField,variableData:{value:{propRefValue:{defId:s.defID}},dataType:"PROP_REF",resolvedDataType:o[s.componentPropNodeField]}});e.parameterConsumptionMap={entries:i}}function tN(e,t,n,r){t.componentKey&&(n.componentKey=t.componentKey),t.sourceLibraryKey&&(n.sourceLibraryKey=t.sourceLibraryKey);let i=t.publishId?xt(t.publishId):null,o=t.overrideKey?xt(t.overrideKey):null;i&&(n.publishID=i),o&&(n.overrideKey=o),t.sharedSymbolVersion&&(n.sharedSymbolVersion=t.sharedSymbolVersion),t.publishedVersion&&(n.publishedVersion=t.publishedVersion),(t.type==="COMPONENT_SET"||t.isPublishable)&&(n.isPublishable=t.isPublishable),(t.type==="COMPONENT"||t.isSymbolPublishable)&&(n.isSymbolPublishable=t.isSymbolPublishable),t.isExposedInstance&&(n.propsAreBubbled=!0),t.symbolDescription&&(n.symbolDescription=t.symbolDescription),t.symbolLinks.length>0&&(n.symbolLinks=structuredClone(t.symbolLinks));let s=t.componentPropertyDefinitions.map(f=>{let p={id:ei(e,f.id,r),name:f.name,type:kx(f.type),preferredValues:Jx(f,e)};return f.type==="SLOT"?Object.assign(p,Ox(f)):(p.initialValue=au(f.type,f.defaultValue,e,r),p.varValue=xh(f.type,f.defaultValue,e,r)),f.description&&(p.description=f.description),p});zo(t,"componentPropDefs",s.length>0)&&(n.componentPropDefs=s);let a=t.componentPropertyReferences.map(f=>({defID:ei(e,f.propertyId,r),componentPropNodeField:Zx(f.field)})),l=a.filter(f=>f.componentPropNodeField!=="SLOT_CONTENT_ID");zo(t,"componentPropRefs",l.length>0)&&(n.componentPropRefs=l),eN(n,a);let u=Object.entries(t.componentPropertyAssignments).map(([f,p])=>{let d=e.componentPropertyDefinitionsById.get(f);return d?d.type==="SLOT"?Rx(e,t,f,ei(e,f,r),r):{defID:ei(e,f,r),value:au(d.type,p,e,r),varValue:xh(d.type,p,e,r)}:null}).filter(f=>f!==null);zo(t,"componentPropAssignments",u.length>0,!!n.componentPropAssignments)&&(n.componentPropAssignments=u);let c=t.variantPropSpecs.map(f=>({propDefId:ei(e,f.propDefId,r),value:f.value}));zo(t,"variantPropSpecs",c.length>0)&&(n.variantPropSpecs=c)}function qg(e){let t=Yo(e);return t.rawSize&&t.rawTransform?{...t.rawSize}:{x:e.width,y:e.height}}function Jg(e,t){let n=Yo(t).rawTransform;return n?{...n}:e.computeExportTransform(t)}function Ql(e){let t=Ne(e);return"fillGeometry"in t||"strokeGeometry"in t}function Nh(e){return"vectorData"in Ne(e)}var nN=new Set(["DROP_SHADOW","INNER_SHADOW","LAYER_BLUR","BACKGROUND_BLUR","FOREGROUND_BLUR"]);function rN(e){let t=Ne(e).effects;return Array.isArray(t)&&t.some(n=>n&&typeof n=="object"&&"type"in n&&!nN.has(String(n.type)))}function iN(e){return!Ql(e)&&!Nh(e)?e:{...e,fillGeometry:Ql(e)?[]:e.fillGeometry,strokeGeometry:Ql(e)?[]:e.strokeGeometry,vectorNetwork:Nh(e)?null:e.vectorNetwork}}function oN(e){let t=e.pattern==="ROWS"||e.pattern!=="COLUMNS"&&e.axis==="Y";return{type:e.type??e.alignment??"STRETCH",axis:t?"Y":"X",visible:e.visible??!0,numSections:Oo(e),offset:e.offset??0,sectionSize:e.sectionSize??(e.pattern==="GRID"?10:0),gutterSize:e.gutterSize??0,color:e.color??{r:1,g:0,b:0,a:.1},pattern:e.pattern==="GRID"?"GRID":"STRIPES"}}function sN(e,t,n){let r=i=>$o(e,i);t.fillStyleId&&(n.styleIdForFill=r(t.fillStyleId)),t.strokeStyleId&&(n.styleIdForStrokeFill=r(t.strokeStyleId)),t.textStyleId&&(n.styleIdForText=r(t.textStyleId)),t.effectStyleId&&(n.styleIdForEffect=r(t.effectStyleId)),t.gridStyleId&&(n.styleIdForGrid=r(t.gridStyleId)),t.layoutGrids.length>0&&(n.layoutGrids=t.layoutGrids.map(oN)),t.guides.length>0&&(n.guides=kh(t.guides))}function aN(e,t,n){e.serializeTextProps(t,n,e.graph,e.fontDigestMap,e.blobs,e.glyphBlobMap),n.textData&&px(e,t,n.textData)}function Zg(e,t,n){t.independentStrokeWeights&&(n.borderStrokeWeightsIndependent=!0,n.borderTopWeight=t.borderTopWeight,n.borderRightWeight=t.borderRightWeight,n.borderBottomWeight=t.borderBottomWeight,n.borderLeftWeight=t.borderLeftWeight),t.fills.length>0&&(n.fillPaints=Lu(e,t)),e.serializeCornerRadii(t,n),(t.type==="POLYGON"||t.type==="STAR")&&(n.count=t.pointCount),t.type==="STAR"&&(n.starInnerScale=t.starInnerRadius),t.effects.length>0&&!rN(t)&&(n.effects=t.effects.map(i=>({type:i.type==="LAYER_BLUR"?"FOREGROUND_BLUR":i.type,color:e.safeColor(i.color),offset:i.offset,radius:i.radius,spread:i.spread,visible:i.visible,blendMode:i.blendMode??"NORMAL",showShadowBehindNode:i.showShadowBehindNode}))),t.type==="TEXT"&&aN(e,t,n),t.type!=="VECTOR"&&(n.frameMaskDisabled=!t.clipsContent),sN(e,t,n),t.horizontalConstraint!=="MIN"&&(n.horizontalConstraint=t.horizontalConstraint),t.verticalConstraint!=="MIN"&&(n.verticalConstraint=t.verticalConstraint),t.strokeCap!=="NONE"&&(n.strokeCap=t.strokeCap);let r=Ne(t);(t.strokeJoin!=="MITER"||"strokeJoin"in r)&&(n.strokeJoin=t.strokeJoin),(t.strokeMiterLimit!==Er||"miterLimit"in r)&&(n.miterLimit=t.strokeMiterLimit),t.dashPattern.length>0&&(n.dashPattern=t.dashPattern),t.arcData&&(n.arcData={startingAngle:t.arcData.startingAngle,endingAngle:t.arcData.endingAngle,innerRadius:t.arcData.innerRadius}),t.autoRename||(n.autoRename=!1)}function lN(e,t){return e.textPathData!==null&&e.type==="TEXT"&&(e.derivedTextGlyphs?.length??0)>0?"TEXT_PATH":t.mapToFigmaType(e.type)}function Qg(e,t){let n=Wg(e,t);return{...n,pluginData:e.pluginDataOverrides?.get(t.id)??n.pluginData}}function uN(e,t){return e.type==="INSTANCE"||t.writeChildren===!1?[]:t.graph.getChildren(e.id).filter(n=>!n.internalOnly&&n.sharedStyleType===null)}function ey(e,t){if(e.strokes.length>0)t.strokeWeight=e.strokes[0].weight,t.strokeAlign=e.strokes[0].align;else{let n=Ne(e);(e.strokeWeight!==qt||"strokeWeight"in n)&&(t.strokeWeight=e.strokeWeight),(e.strokeAlign!=="CENTER"||"strokeAlign"in n)&&(t.strokeAlign=e.strokeAlign)}e.locked&&(t.locked=!0)}function ty(e,t){let n=Qg(e,t),r={};return n.blendMode!=="PASS_THROUGH"&&(r.blendMode=n.blendMode),ey(n,r),Zg({...e,fontDigestMap:void 0},n,r),e.serializeLayoutProps(n,r),r}function lu(e,t,n,r,i){let o=Qg(i,e),s=li(i,o.id,r)??{sessionID:1,localID:r.value++},a=_u(i,o),l=lN(o,i),u={guid:s,parentIndex:{guid:t,position:Px(i,o,n)},type:l,name:o.name,visible:o.visible,opacity:o.opacity,phase:"CREATED",size:qg(o),transform:Jg(i,o)};o.sharedStyleType&&(u.styleType=o.sharedStyleType),o.blendMode!=="PASS_THROUGH"&&(u.blendMode=o.blendMode),o.type==="GROUP"&&(u.resizeToFit=!0),ey(o,u),Zg(i,o,u),tN(i,o,u,r),qx(i,o,u,r),o.type==="COMPONENT_SET"&&(o.pluginData=bt(o.pluginData,xe.nodeType,o.type)),u.type==="CANVAS"&&(u.pageType="DESIGN"),o.type==="BOOLEAN_OPERATION"&&(u.booleanOperation=wx(o.booleanOperation)),a.length>0&&(u.strokePaints=a),i.serializeLayoutProps(o,u),i.serializeGeometry(iN(o),u,i.blobs),i.serializeVariableBindings(o,u,i.graph,i.varIdToGuid),Qx(u),Kx(i,o,u);let c=Lx(o,i.varIdToGuid,i.modeIdToGuid);c&&(u.variableModeBySetMap=c),tg(o),ag(o),ng(o);let f=ug(o.pluginData);f.length>0&&(u.pluginData=f),o.pluginRelaunchData.length>0&&(u.pluginRelaunchData=cg(o.pluginRelaunchData));let p=[u],d=uN(o,i);for(let m=0;m<d.length;m++)p.push(...i.sceneNodeToKiwi(d[m],s,m,r,i));return p}var ny={shapeText:()=>null,textDecorations:()=>[]},cN=["image","imageThumbnail","animatedImage"],{shader:eu}=xe;function Vu(e){return typeof e=="object"&&e!==null&&!ArrayBuffer.isView(e)}function fN(e){return Vu(e)&&"hash"in e}function dN(e){return Vu(e)&&"pluginID"in e&&"key"in e}function uu(e,t){if(Array.isArray(e)){for(let n of e)uu(n,t);return}if(Vu(e)){if(dN(e)){t.pluginData(e);return}for(let n of cN){let r=e[n];fN(r)&&t.image(r)}for(let n of Object.values(e))uu(n,t)}}function pN(e){return e.hash===void 0?null:typeof e.hash=="string"?e.hash:mu(e.hash)}function Fu(e,t){let n=new Map,r=i=>{let o=n.get(i);if(o)return o;let s=t.get(i);if(!s)return null;let a=Ro(s);return n.set(i,a),a};return uu(e,{image(i){let o=pN(i),s=o?r(o):null;!s||s===o||(i.hash=typeof i.hash=="string"?s:Gh(s))},pluginData(i){if(i.pluginID!==Or||i.key!==eu.key)return;let o=eu.decode(i.value),s=o?r(o.image):null;!o||!s||s===o.image||(i.value=eu.encode({...o,image:s}))}}),n}function Gu(e,t){let n=new Map;for(let[r,i]of e)n.set(t.get(r)??Ro(i),i);return[...n].map(([r,i])=>({name:`images/${r}`,data:i}))}function mN(e,t){let n=e.topLeftRadius>0||e.topRightRadius>0||e.bottomLeftRadius>0||e.bottomRightRadius>0;if(e.cornerRadius>0&&(t.cornerRadius=e.cornerRadius),n||e.independentCorners){let r=e.source.id?Ne(e)?.rectangleCornerRadiiIndependent:void 0;t.rectangleCornerRadiiIndependent=typeof r=="boolean"?r:e.independentCorners,t.rectangleTopLeftCornerRadius=e.topLeftRadius,t.rectangleTopRightCornerRadius=e.topRightRadius,t.rectangleBottomLeftCornerRadius=e.bottomLeftRadius,t.rectangleBottomRightCornerRadius=e.bottomRightRadius}(e.cornerSmoothing>0||"cornerSmoothing"in Ne(e))&&(t.cornerSmoothing=e.cornerSmoothing)}function hN(e,t){e.paragraphSpacing!==0&&(t.paragraphSpacing=e.paragraphSpacing),e.paragraphIndent!==0&&(t.paragraphIndent=e.paragraphIndent),e.listSpacing!==0&&(t.listSpacing=e.listSpacing),e.hangingList&&(t.hangingList=!0)}function gN(e,t,n,r,i,o,s){e.pluginData=bt(e.pluginData,xe.textDirection,e.textDirection),t.fontSize=e.fontSize,t.fontName={family:Kr(e.fontFamily),style:Qo(e.fontWeight,e.italic),postscript:""},t.textData=wg(e,ti),e.fontVariations.length>0&&(t.fontVariations=e.fontVariations.map(Pu));let a=e.textAutoResize,l=Ne(e);(!e.source.id||a!=="NONE"||"textAutoResize"in l)&&(t.textAutoResize=a),t.textAlignHorizontal=e.textAlignHorizontal,t.textAlignVertical=e.textAlignVertical,t.textUserLayoutVersion=4,t.textExplicitLayoutVersion=1,t.textBidiVersion=1,t.textDecorationSkipInk=e.textDecorationSkipInk,t.fontVariantCommonLigatures=!0,t.fontVariantContextualLigatures=!0,du(t,e.fontFeatures),t.fontVersion="",t.emojiImageSet="APPLE",e.textCase!=="ORIGINAL"&&(t.textCase=e.textCase),e.textTruncation==="ENDING"&&(t.textTruncation="ENDING"),e.maxLines!=null&&(t.maxLines=e.maxLines),hN(e,t),r&&(t.derivedTextData=_g(e,{digestMap:r,blobs:i,glyphBlobMap:o??new Map,shapeText:u=>s.shapeText(u),textDecorations:(u,c)=>s.textDecorations(u,c)})),e.leadingTrim!=="NONE"&&(t.leadingTrim=e.leadingTrim),t.lineHeight=e.lineHeight===null?{...ii}:{value:e.lineHeight,units:"PIXELS"},t.letterSpacing={value:e.letterSpacing,units:"PIXELS"},e.textDecoration!=="NONE"&&(t.textDecoration=e.textDecoration==="UNDERLINE"?"UNDERLINE":"STRIKETHROUGH"),e.textDecorationStyle!=="SOLID"&&(t.textDecorationStyle=e.textDecorationStyle),e.textDecorationThickness!=null&&(t.textDecorationThickness={value:e.textDecorationThickness,units:"PIXELS"}),e.textUnderlineOffset!=null&&(t.textUnderlineOffset={value:e.textUnderlineOffset,units:"PIXELS"}),e.textDecorationFills.length>0&&(t.textDecorationFillPaints=e.textDecorationFills.map(ti))}function ry(e){return e==="HORIZONTAL"||e==="VERTICAL"||e==="NONE"?e:void 0}function Ch(e){return e==="FIXED"||e==="RESIZE_TO_FIT"||e==="RESIZE_TO_FIT_WITH_IMPLICIT_SIZE"?e:void 0}function Xo(e){return e==="SPACE_EVENLY"?"SPACE_BETWEEN":e}function iy(e){return e==="SPACE_EVENLY"?"SPACE_BETWEEN":e}function cu(e){let t=iy(e);return t==="STRETCH"?"MIN":t}function Oh(e,t,n){if(!e.parentId||e.layoutAlignSelf!=="AUTO"||e.layoutPositioning==="ABSOLUTE")return;let r=n.getNode(e.parentId);r?.counterAxisAlign==="STRETCH"&&(r.layoutMode==="HORIZONTAL"||r.layoutMode==="VERTICAL")&&(t.stackChildAlignSelf="STRETCH")}function Dh(e,t,n,r){return e!==void 0?e:r!==(t??n??r)?r:void 0}function yN(e,t){e.targetAspectRatio&&(t.targetAspectRatio={value:{...e.targetAspectRatio}}),(e.minWidth!=null||e.minHeight!=null)&&(t.minSize={value:{x:e.minWidth??0,y:e.minHeight??0}}),(e.maxWidth!=null||e.maxHeight!=null)&&(t.maxSize={value:{x:e.maxWidth??Number.POSITIVE_INFINITY,y:e.maxHeight??Number.POSITIVE_INFINITY}})}function Ko(e){return e==="HUG"?"RESIZE_TO_FIT_WITH_IMPLICIT_SIZE":"FIXED"}var IN=new Set(["layoutMode","primaryAxisSizing","counterAxisSizing","layoutGrow","layoutAlignSelf","layoutPositioning"]);function Rh(e,t,n){e.source.fig.layout&&!e.source.editedFields.some(r=>IN.has(r))||(su(n,e,"stackPrimarySizing")&&(t.stackPrimarySizing="FIXED"),su(n,e,"stackCounterSizing")&&(t.stackCounterSizing="FIXED"))}function vN(e,t){let n={layoutMode:{stackMode:ry(e.layoutMode)},itemSpacing:{stackSpacing:e.itemSpacing},paddingLeft:{stackHorizontalPadding:e.paddingLeft},paddingRight:{stackPaddingRight:e.paddingRight},paddingTop:{stackVerticalPadding:e.paddingTop},paddingBottom:{stackPaddingBottom:e.paddingBottom},primaryAxisSizing:{stackPrimarySizing:Ko(e.primaryAxisSizing)},counterAxisSizing:{stackCounterSizing:Ko(e.counterAxisSizing)},primaryAxisAlign:{stackPrimaryAlignItems:Xo(e.primaryAxisAlign)},counterAxisAlign:{stackCounterAlignItems:cu(e.counterAxisAlign)},layoutGrow:{stackChildPrimaryGrow:e.layoutGrow},layoutAlignSelf:{stackChildAlignSelf:e.layoutAlignSelf},layoutPositioning:{stackPositioning:e.layoutPositioning},layoutWrap:{stackWrap:e.layoutWrap},counterAxisSpacing:{stackCounterSpacing:e.counterAxisSpacing},strokesIncludedInLayout:{bordersTakeSpace:e.strokesIncludedInLayout},itemReverseZIndex:{stackReverseZIndex:e.itemReverseZIndex}};for(let r of e.source.editedFields)r in n&&Object.assign(t,n[r]);e.source.editedFields.includes("layoutDirection")&&oy(e)}function oy(e){e.pluginData=bt(e.pluginData,xe.layoutDirection,e.layoutDirection)}function TN(e,t,n){e.source.id||oy(e),yN(e,t);let r=e.source.fig.layout;if(r){t.stackMode=ry(r.stackMode),t.stackSpacing=r.stackSpacing,t.stackPadding=r.stackPadding,t.stackPaddingRight=Dh(r.stackPaddingRight,r.stackHorizontalPadding,r.stackPadding,e.paddingRight),t.stackPaddingBottom=Dh(r.stackPaddingBottom,r.stackVerticalPadding,r.stackPadding,e.paddingBottom),t.stackCounterAlign=iy(r.stackCounterAlign),t.stackJustify=Xo(r.stackJustify),t.stackCounterAlignItems=cu(r.stackCounterAlignItems),t.stackPrimaryAlignItems=Xo(r.stackPrimaryAlignItems);let i=Ch(r.stackPrimarySizing);i&&(t.stackPrimarySizing=i);let o=Ch(r.stackCounterSizing);o&&(t.stackCounterSizing=o),t.stackVerticalPadding=r.stackVerticalPadding,t.stackHorizontalPadding=r.stackHorizontalPadding,t.stackWrap=r.stackWrap,t.stackPositioning=r.stackPositioning,t.stackChildPrimaryGrow=r.stackChildPrimaryGrow,t.stackChildAlignSelf=r.stackChildAlignSelf,t.stackCounterSpacing=r.stackCounterSpacing,t.bordersTakeSpace=r.bordersTakeSpace,r.stackReverseZIndex&&(t.stackReverseZIndex=!0),Oh(e,t,n),vN(e,t),Rh(e,t,n);return}e.layoutMode!=="NONE"&&e.layoutMode!=="GRID"&&(t.stackMode=e.layoutMode,t.stackSpacing=e.itemSpacing,t.stackVerticalPadding=e.paddingTop,t.stackHorizontalPadding=e.paddingLeft,t.stackPaddingBottom=e.paddingBottom,t.stackPaddingRight=e.paddingRight,t.stackPrimarySizing=Ko(e.primaryAxisSizing),t.stackCounterSizing=Ko(e.counterAxisSizing),t.stackPrimaryAlignItems=Xo(e.primaryAxisAlign),t.stackCounterAlignItems=cu(e.counterAxisAlign),e.layoutWrap==="WRAP"&&(t.stackWrap="WRAP"),e.counterAxisSpacing>0&&(t.stackCounterSpacing=e.counterAxisSpacing),t.bordersTakeSpace=e.strokesIncludedInLayout),e.itemReverseZIndex&&(t.stackReverseZIndex=!0),e.layoutPositioning==="ABSOLUTE"&&(t.stackPositioning="ABSOLUTE"),e.layoutGrow>0&&(t.stackChildPrimaryGrow=e.layoutGrow),e.layoutAlignSelf!=="AUTO"?t.stackChildAlignSelf=e.layoutAlignSelf:Oh(e,t,n),Rh(e,t,n)}function SN(e,t,n){e.isMask&&(t.mask=!0,t.maskType=e.maskType,e.maskIsOutline&&(t.maskIsOutline=!0));let r=[],i={};if(e.vectorNetwork&&e.type==="VECTOR"){let{table:o,styleToId:s}=pg(e.vectorNetwork);r=o;let a=n.length;n.push(mg(e.vectorNetwork,s)),i.vectorNetworkBlob=a,i.normalizedSize={x:e.width,y:e.height}}e.fillGeometry.length>0&&(t.fillGeometry=e.fillGeometry.map(o=>{let s=n.length;if(n.push(o.commandsBlob),!o.fills||o.fills.length===0)return{windingRule:Ho(o.windingRule),commandsBlob:s};let a=r.length+1;return r.push({styleID:a,fillPaints:o.fills.map(ti)}),{windingRule:Ho(o.windingRule),commandsBlob:s,styleID:a}})),r.length>0&&(i.styleOverrideTable=r),Object.keys(i).length>0&&(t.vectorData=i),e.strokeGeometry.length>0&&(t.strokeGeometry=e.strokeGeometry.map(o=>{let s=n.length;return n.push(o.commandsBlob),{windingRule:Ho(o.windingRule),commandsBlob:s}}))}function bN(e,t,n,r){let i=Jh(e,n,r),o={};for(let[s,a]of Object.entries(e.boundVariables)){if(!n.variables.get(a))continue;let l=r?.get(a)??_e(a);o[s]=F(l)}if(e.pluginData=bt(e.pluginData,xe.boundVariables,Object.keys(o).length>0?o:void 0),i.length>0){t.variableConsumptionMap={entries:i};let s=fn(Ne(e),{parameterConsumptionMap:{entries:i}}),a=t.parameterConsumptionMap;Object.assign(t,a?fn(s,{parameterConsumptionMap:a}):s)}}function Bu(e,t,n,r,i,o,s={}){let{nodeIdToGuid:a,fontDigestMap:l,varIdToGuid:u,glyphBlobMap:c=new Map,blobIndexByHex:f,assignedGuidValues:p,runtime:d=ny,componentPropertyDefinitionsById:m=Yg(i),modeIdToGuid:h,propertyIdToGuid:y=new Map,slotContentRecords:v,pluginDataOverrides:g,recordOwners:I,orderKeys:S,writeChildren:E}=s;return lu(e,t,n,r,{graph:i,blobs:o,blobIndexByHex:f,nodeIdToGuid:a,assignedGuidValues:p,fontDigestMap:l,glyphBlobMap:c,varIdToGuid:u,modeIdToGuid:h,assetRefToVarGuid:u?$g(i,u):void 0,componentPropertyDefinitionsById:m,propertyIdToGuid:y,slotContentRecords:v,pluginDataOverrides:g,recordOwners:I,orderKeys:S,writeChildren:E,fractionalPosition:Yl,mapToFigmaType:Mh,fillToKiwiPaint:ti,safeColor:jo,computeExportTransform:Ph,serializeCornerRadii:mN,serializeTextProps:(T,C,x,D,M,V)=>gN(T,C,x,D,M,V,d),serializeLayoutProps:(T,C)=>TN(T,C,i),serializeGeometry:SN,serializeVariableBindings:bN,sceneNodeToKiwi:lu})}var sy={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0};function Uu(e,t="display-p3"){return{guid:e,type:"DOCUMENT",name:"Document",visible:!0,opacity:1,phase:"CREATED",transform:{...sy},strokeWeight:qt,strokeAlign:"CENTER",strokeJoin:"MITER",documentColorProfile:t==="display-p3"?"DISPLAY_P3":"SRGB"}}function zu(e,t,n,r,i){return{guid:e,parentIndex:{guid:t,position:n},type:"CANVAS",name:r,visible:!0,opacity:1,phase:"CREATED",transform:{...sy},strokeWeight:qt,strokeAlign:"CENTER",strokeJoin:"MITER",pageType:"DESIGN",...i}}var{token:ay,modeConditions:ly,modeAttribute:uy}=xe;function rs(e){return ro(e,[ay,ly,uy])}function EN(e){return Rr(e)?void 0:e}function AN(e,t){return typeof e=="number"&&Math.fround(e)===Math.fround(t)}function Hu(e,t){let n=Ve(e,ay)??{},r=Object.entries(n.expressions??{}).filter(([i,o])=>AN(t[i],o.resolved));return{unit:n.unit,expressions:EN(Object.fromEntries(r))}}function Wu(e){return Ve(e,ly)??{}}function Xu(e){return Ve(e,uy)}var xN=e=>La.includes(e),NN=e=>_a.includes(e);function CN(e){let t=(e.codeSyntax?.entries??[]).flatMap(({platform:n,value:r})=>NN(n)&&r?[[n,r]]:[]);return t.length>0?Object.fromEntries(t):void 0}function ju(e){let t=e.variableScopes?.filter(xN),n=rs(si(e)),r={description:e.description??e.symbolDescription??"",hiddenFromPublishing:e.isPublishable===!1,scopes:t?.length?t:void 0,codeSyntax:CN(e),pluginData:n.length>0?n:void 0};return typeof e.key=="string"&&(r.key=e.key),typeof e.version=="string"&&(r.version=e.version),r}var DN=400*1024*1024,Ku=5e4,Me=gi,RN=Ps,Fe=()=>crypto.randomUUID().toUpperCase(),W=(e,t=0)=>Number.isFinite(Number(e))?Number(e):t,ci=(e,t=0,n=1)=>Math.max(t,Math.min(n,W(e))),pn=(e,t=[0,0])=>{let n=typeof e=="string"?e.match(/[-+]?(?:\d*\.)?\d+(?:e[-+]?\d+)?/gi)?.map(Number):null;return n?.length>=2?n:t},Nt=(e=0,t=0,n=0,r=1)=>({r:ci(e),g:ci(t),b:ci(n),a:ci(r)}),mn=(e,t=1)=>({type:"SOLID",color:e,opacity:ci(t),visible:!0}),hn=Uint8Array.from(atob("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII="),e=>e.charCodeAt(0));function Qn(e){let t=0,n=0;return Tn(e,{filter(r){if(t+=r.originalSize,++n>5e4||t>DN)throw new Error("\u89E3\u538B\u540E\u5185\u5BB9\u8FC7\u5927\uFF0C\u8BF7\u62C6\u5206\u8BBE\u8BA1\u6587\u4EF6\u3002");return!0}})}function er(e,t,n){let r=e[t];if(!r){if(n!==void 0)return n;throw new Error(`\u6587\u4EF6\u7F3A\u5C11\u5FC5\u8981\u5185\u5BB9\uFF1A${t}`)}try{return JSON.parse(RN(r))}catch{throw new Error(`\u8BBE\u8BA1\u6570\u636E\u635F\u574F\uFF1A${t}`)}}function is(){let e=new $r;return e.getPages().forEach(t=>e.deleteNode(t.id)),e}function Yu(){let e=new Map;return{add(t,n,r=""){let i=e.get(t)||{code:t,message:n,count:0,examples:[]};i.count++,r&&i.examples.length<3&&!i.examples.includes(r)&&i.examples.push(r.slice(0,100)),e.set(t,i)},list(){return[...e.values()]}}}function os(e,t,n,r={}){if(e.nodes.size>Ku)throw new Error("\u56FE\u5C42\u8D85\u8FC7 50,000 \u4E2A\uFF0C\u8BF7\u6309\u9875\u9762\u62C6\u5206\u540E\u8F6C\u6362\u3002");return e.createNode(t,n,r)}function cy(e){let t=[...e.nodes.values()].filter(n=>n.id!==e.rootId&&n.type!=="CANVAS");return{pages:e.getPages().length,layers:t.length,images:e.images.size,text:t.filter(n=>n.type==="TEXT").length,artboards:t.filter(n=>n.type==="FRAME"&&e.getNode(n.parentId)?.type==="CANVAS").length}}async function ss(e,t){let n=[...new Uint8Array(await crypto.subtle.digest("SHA-1",t))].map(r=>r.toString(16).padStart(2,"0")).join("");return e.images.set(n,t),n}function fy(e){return e?.[0]===137&&e[1]===80?"png":e?.[0]===255&&e[1]===216?"jpg":e?.[0]===71&&e[1]===73?"gif":e?.[8]===87&&e[9]===69?"webp":"bin"}function as(e){let t=(0,$u.default)(e).abs().unshort().unarc();if(t.err)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u77E2\u91CF\u8DEF\u5F84\u3002");let n=0,r=0,i=[];return t.iterate(o=>{o[0]==="H"&&(o=["L",o[1],r]),o[0]==="V"&&(o=["L",n,o[1]]);let s=o[0].toUpperCase();s==="M"||s==="L"?(n=o[1],r=o[2],i.push({type:s,x:n,y:r})):s==="C"?(n=o[5],r=o[6],i.push({type:s,x1:o[1],y1:o[2],x2:o[3],y2:o[4],x:n,y:r})):s==="Q"?(n=o[3],r=o[4],i.push({type:s,x1:o[1],y1:o[2],x:n,y:r})):s==="Z"&&i.push({type:"Z"})}),i}function dy(e){let t=as(e).flatMap(i=>[[i.x,i.y],[i.x1,i.y1],[i.x2,i.y2]].filter(o=>o.every(Number.isFinite)));if(!t.length)return{x:0,y:0,width:0,height:0};let n=t.map(i=>i[0]),r=t.map(i=>i[1]);return{x:Math.min(...n),y:Math.min(...r),width:Math.max(...n)-Math.min(...n),height:Math.max(...r)-Math.min(...r)}}function fi(e,t="NONZERO"){return{vectorNetwork:Xm(e,t,{includeOpenRegions:!0}),fillGeometry:[{windingRule:t,commandsBlob:es(as(e))}]}}function MN(e){let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=0,r=[];for(;n<e.length;){let i=e[n++];if(i===0){r.push("Z");continue}let o={1:2,2:2,3:4,4:6}[i];if(!o||n+o*4>e.length)throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u77E2\u91CF\u8F6E\u5ED3\u3002");let s=Array.from({length:o},(a,l)=>t.getFloat32(n+l*4,!0)*(l%2?-1:1));n+=o*4,r.push({1:"M",2:"L",3:"Q",4:"C"}[i]+s.join(" "))}return r.join(" ")}function di(e){if(e.fillGeometry.length)return e.fillGeometry.map(s=>MN(s.commandsBlob)).join(" ");if(e.type==="STAR"||e.type==="POLYGON"){let s=Math.max(3,Math.min(1e3,e.pointCount||5)),a=e.type==="STAR"?s*2:s;return`M${Array.from({length:a},(u,c)=>{let f=-Math.PI/2+c*Math.PI*2/a,p=e.type==="STAR"&&c%2?e.starInnerRadius||.5:1;return`${e.width/2+Math.cos(f)*e.width/2*p} ${e.height/2+Math.sin(f)*e.height/2*p}`}).join(" L")} Z`}let t=e.vectorNetwork;if(!t?.segments.length)return"";let n=new Set,r=[],o=[...t.regions.flatMap(s=>s.loops),...t.segments.map((s,a)=>[a])];for(let s of o){let a=null,l=null;for(let u of s){if(n.has(u))continue;n.add(u);let c=t.segments[u],f=a!==null&&a===c.end,p=t.vertices[f?c.end:c.start],d=t.vertices[f?c.start:c.end],m=f?c.tangentEnd:c.tangentStart,h=f?c.tangentStart:c.tangentEnd;(a===null||a!==(f?c.end:c.start))&&(r.push(`M${p.x} ${p.y}`),l=f?c.end:c.start),r.push(`C${p.x+m.x} ${p.y+m.y} ${d.x+h.x} ${d.y+h.y} ${d.x} ${d.y}`),a=f?c.start:c.end}a!==null&&a===l&&r.push("Z")}return r.join(" ")}function qu(e,t,n,r,i){let o=W(e.a,1),s=W(e.b),a=W(e.c),l=W(e.d,1),u=Math.hypot(o,s)||1,c=(o*l-s*a)/u,f=Math.atan2(s,o),p=Math.abs(t*u),d=Math.abs(n*c),m=Math.cos(f),h=Math.sin(f);Math.abs(o*a+s*l)>.001&&r.add("skew","\u503E\u659C\u53D8\u6362\u5DF2\u8FD1\u4F3C\u4E3A\u65CB\u8F6C\u548C\u7F29\u653E\u3002",i);let y=c<0?-1:1;return{x:W(e.tx)-p/2+m*p/2-h*y*d/2,y:W(e.ty)-d/2+h*p/2+m*y*d/2,width:p,height:d,rotation:f*180/Math.PI,flipY:c<0}}function ls(e){let t=e.rotation*Math.PI/180,n=Math.cos(t),r=Math.sin(t),i=e.flipX?-1:1,o=e.flipY?-1:1,s=n*i,a=r*i,l=-r*o,u=n*o;return{a:s,b:a,c:l,d:u,tx:e.x+e.width/2-s*e.width/2-l*e.height/2,ty:e.y+e.height/2-a*e.width/2-u*e.height/2}}function us(e=""){return/black|heavy/i.test(e)?900:/extra.?bold/i.test(e)?800:/semi.?bold|demi/i.test(e)?600:/bold/i.test(e)?700:/medium/i.test(e)?500:/thin/i.test(e)?100:/extra.?light/i.test(e)?200:/light/i.test(e)?300:400}var cs=(e,t)=>`${e>=800?"Heavy":e>=700?"Bold":e>=600?"Semibold":e>=500?"Medium":e<=300?"Light":"Regular"}${t?" Italic":""}`;function py(e,t,n){for(let r of e.nodes.values())if(!(r.type==="CANVAS"||r.id===e.rootId)){["COMPONENT","COMPONENT_SET","INSTANCE"].includes(r.type)&&t!=="fig"&&n.add("component-expanded","\u7EC4\u4EF6\u6309\u5F53\u524D\u5916\u89C2\u5C55\u5F00\u4E3A\u53EF\u7F16\u8F91\u5206\u7EC4\uFF0C\u4E3B\u5B9E\u4F8B\u5173\u8054\u4E0D\u4FDD\u7559\u3002",r.name),r.layoutMode!=="NONE"&&t!=="fig"&&n.add("layout-fixed","\u81EA\u52A8\u5E03\u5C40\u8F6C\u6362\u4E3A\u5F53\u524D\u56FA\u5B9A\u4F4D\u7F6E\u3002",r.name),t==="xd"&&r.fills.filter(i=>i.visible).length>1&&n.add("multiple-fills","XD \u4EC5\u4FDD\u7559\u6700\u4E0A\u5C42\u53EF\u89C1\u586B\u5145\u3002",r.name),t==="xd"&&r.strokes.filter(i=>i.visible).length>1&&n.add("multiple-strokes","XD \u4EC5\u4FDD\u7559\u6700\u4E0A\u5C42\u53EF\u89C1\u63CF\u8FB9\u3002",r.name);for(let i of r.fills)["SOLID","IMAGE","GRADIENT_LINEAR","GRADIENT_RADIAL"].includes(i.type)||n.add("paint-approximation","\u90E8\u5206\u586B\u5145\u7C7B\u578B\u6309\u57FA\u7840\u989C\u8272\u6216\u7EBF\u6027\u6E10\u53D8\u8FD1\u4F3C\u3002",r.name);r.isMask&&n.add("mask","\u590D\u6742\u8499\u7248\u9700\u8981\u5728\u76EE\u6807\u8F6F\u4EF6\u4E2D\u68C0\u67E5\u3002",r.name),r.clipsContent&&e.getNode(r.parentId)?.type!=="CANVAS"&&t!=="fig"&&n.add("nested-clip","\u5D4C\u5957\u753B\u6846\u7684\u88C1\u5207\u8303\u56F4\u53EF\u80FD\u53D1\u751F\u53D8\u5316\uFF0C\u8BF7\u68C0\u67E5\u6EA2\u51FA\u5185\u5BB9\u3002",r.name),r.type==="BOOLEAN_OPERATION"&&n.add("boolean","\u5E03\u5C14\u7EC4\u5408\u6309\u53EF\u7F16\u8F91\u5B50\u56FE\u5C42\u4FDD\u7559\uFF0C\u76F8\u51CF\u548C\u76F8\u4EA4\u6548\u679C\u9700\u8981\u68C0\u67E5\u3002",r.name),["CONNECTOR","SHAPE_WITH_TEXT"].includes(r.type)&&n.add("special-node","\u90E8\u5206\u7279\u6B8A\u56FE\u5C42\u4EC5\u4FDD\u7559\u53EF\u8BFB\u53D6\u7684\u5B50\u56FE\u5C42\u548C\u57FA\u7840\u5916\u89C2\u3002",r.name);for(let i of r.fills)i.type==="IMAGE"&&(i.imageTransform||i.imageScaleMode==="CROP")&&n.add("image-crop","\u56FE\u7247\u4FDD\u7559\u539F\u59CB\u8D44\u6E90\uFF0C\u88C1\u526A\u548C\u5C40\u90E8\u53D8\u6362\u9700\u8981\u68C0\u67E5\u3002",r.name)}}function Ju(e,t,n,r,i){let o=t.type==="VECTOR"?di(t):"";o&&Object.assign(t,fi((0,$u.default)(o).scale(n,r).toString())),t.x*=n,t.y*=r,t.width*=n,t.height*=r,t.fontSize*=r,t.lineHeight&&(t.lineHeight*=r),t.letterSpacing*=n,t.cornerRadius*=Math.min(n,r),t.strokes.forEach(s=>{s.weight*=(n+r)/2}),t.rotation&&Math.abs(n-r)>.001&&i.add("scaled-rotation","\u975E\u7B49\u6BD4\u7F29\u653E\u4E0E\u65CB\u8F6C\u7684\u7EC4\u5408\u9700\u8981\u68C0\u67E5\u3002",t.name),e.getChildren(t.id).forEach(s=>Ju(e,s,n,r,i))}function Iy(e){return e.layoutScale??1}function PN(e){return Zo(e.mainComponentId!==null?Iy(e):1)}function wN(e,t,n){for(let r of Xe(n)){if(r.variableData&&!["ALIAS","EXPRESSION"].includes(r.variableData.dataType??""))continue;let i=r.variableField&&dn[r.variableField];i&&(fe(e.instanceOverrides,e.id,t.id,`boundVariables/${i}`,t.boundVariables[i]??null),fe(e.instanceOverrides,e.id,t.id,"boundVariables"))}}function kN(e,t){vy(e,t,ts(t))}function vy(e,t,n=1){for(let r of Xe(t)){let i=r.variableField&&dn[r.variableField];if(!i)continue;e.variableBindingScales??(e.variableBindingScales={});let o=oi(r.variableData),s=o?.reference?o.multiplier:1,a=i==="opacity"?.01:1,l=r.variableData?.value?.expressionValue&&i!=="opacity"&&i!=="rotation";e.variableBindingScales[i]=s*a/(l?n:1)}}function Ty(e,t,n){let r=[],i=(o,s)=>{if(n(o)){r.push({match:o,top:s});return}if(!t.isInstance(o))for(let a of t.childrenOf(o))i(a,s)};for(let o of e)i(o,o);return r.length===1?{count:1,...r[0]}:{count:r.length}}function*Sy(e,t){yield e;for(let n of t(e))yield*Sy(n,t)}function gn(e){return e.guid?F(e.guid):void 0}function yn(e){return e.parentIndex?.guid?F(e.parentIndex.guid):void 0}function nc(e,t){let n=e.parentIndex?.position??"",r=t.parentIndex?.position??"";return n===r?0:n<r?-1:1}function ds(e){let t=new Map,n=new Map;for(let r of e){let i=gn(r);if(i===void 0)continue;if(t.has(i))throw new Error(`Duplicate source node ${i}`);t.set(i,r);let o=yn(r);if(o===void 0)continue;let s=n.get(o);s?s.push(r):n.set(o,[r])}for(let r of n.values())r.sort(nc);return{sources:t,children:n}}function je(e,t){return e?.sessionID===t.sessionID&&e.localID===t.localID}function ec(e){if(!e||typeof e!="object"||!("sessionID"in e)||!("localID"in e)||typeof e.sessionID!="number"||typeof e.localID!="number")return;let t={sessionID:e.sessionID,localID:e.localID};return ln(t)?void 0:t}function rc(e,t){return je(e.guid,t)||je(ec(e.overrideKey),t)}function LN({children:e}){return{childrenOf:t=>e.get(gn(t)??"")??[],isInstance:t=>t.symbolData?.symbolID!==void 0}}function by(e,t,n){let{count:r,match:i,top:o}=Ty(e.children.get(t)??[],LN(e),s=>rc(s,n));return{count:r,record:i,topChild:o}}function my(e,t,n){let r=F(t);for(let[i,o]of n.entries()){let s=e.sources.get(r);if(!s)return!1;if(i===0&&rc(s,o))continue;let{record:a}=by(e,r,o);if(!a)return!1;if(i===n.length-1)return!0;if(!a.symbolData?.symbolID)return!1;r=F(a.symbolData.symbolID)}return!1}function _N(e,t){let n=t,r=new Set;for(;!r.has(n);){r.add(n);let i=e.sources.get(n);if(i?.type!=="INSTANCE"||!i.symbolData?.symbolID)return n;n=F(i.symbolData.symbolID)}return n}function VN(e){let t=e.value;if(t&&(t.boolValue!==void 0||t.textValue!==void 0||t.guidValue!==void 0||t.textDataValue!==void 0))return t;let n=e.varValue?.value;if(n?.symbolIdValue?.guid)return{guidValue:n.symbolIdValue.guid};if(n?.boolValue!==void 0)return{boolValue:n.boolValue};if(n?.textValue!==void 0)return{textValue:n.textValue};if(n?.textDataValue!==void 0)return{textDataValue:n.textDataValue};if(n?.slotContentIdValue)return{slotContentIdValue:n.slotContentIdValue}}function FN(e,t,n){let r=structuredClone([...e]);for(let i of t){let o=VN(i);if(!i.defID||!o)continue;let s={id:i.defID,value:structuredClone(o),origin:"assignment",...n===void 0?{}:{rank:n}},a=r.findIndex(u=>je(u.id,s.id));if(a===-1){r.push(s);continue}let l=r[a];r[a]={...s,superseded:[...l.superseded??[],structuredClone(l.value)]}}return r}function GN(e){return(e.componentPropDefs??[]).flatMap(t=>t.id&&t.initialValue?[{id:t.id,value:structuredClone(t.initialValue),origin:"default"}]:[])}function BN(e,t,n){let r=ni(e),i=e.componentPropRefs;for(let o of i??[]){if(!o.defID||o.isDeleted)continue;let s=t.find(c=>je(c.id,o.defID));if(!s)continue;let{value:a,origin:l}=s,u=c=>{n?.({definitionId:structuredClone(s.id),field:c,origin:l},s)};if(o.componentPropNodeField==="VISIBLE"&&a.boolValue!==void 0)r.visible=a.boolValue,u("visible");else if(o.componentPropNodeField==="TEXT_DATA"){let c=typeof a.textValue=="string"?a.textValue:a.textValue?.characters??a.textDataValue?.characters;c!==void 0&&(c!==r.textData?.characters&&(r.derivedTextData=void 0),r.textData={...r.textData,characters:c},u("textData"))}else o.componentPropNodeField==="OVERRIDDEN_SYMBOL_ID"&&a.guidValue?(r.symbolData={...r.symbolData,symbolID:a.guidValue},u("symbolData")):o.componentPropNodeField==="SLOT_CONTENT_ID"&&a.slotContentIdValue&&u("slotContent")}return r}function UN(e,t){let n=e.properties;t.derivedTextData&&(n.derivedTextData=structuredClone(t.derivedTextData)),t.fontSize!==void 0&&(n.fontSize=t.fontSize),t.lineHeight!==void 0&&(n.lineHeight=structuredClone(t.lineHeight)),t.letterSpacing!==void 0&&(n.letterSpacing=structuredClone(t.letterSpacing)),t.size&&(n.size=structuredClone(t.size),e.derivedSize=structuredClone(t.size)),t.transform&&(n.transform=structuredClone(t.transform));let{fillGeometry:r,strokeGeometry:i,vectorData:o}=t;r&&(n.fillGeometry=structuredClone(r)),i&&(n.strokeGeometry=structuredClone(i)),o&&(n.vectorData=structuredClone(o))}function zN(e,t){let n=[],r=[];for(let i of Jn(e)){let{guidPath:o,overriddenSymbolID:s,componentPropAssignments:a,...l}=i,u=o?.guids??[];if(!u.length)continue;let c=a??[];(s||c.length)&&n.push({owner:t,declaredPath:u,path:u,swap:s,assignments:c}),Object.keys(l).length&&r.push({path:u,props:l})}return{structural:n,claims:r}}var HN={childrenOf:e=>e.children,isInstance:e=>e.mainComponentId!==null};function ps(e){return Sy(e,t=>t.children)}var WN=class extends Error{constructor(t,n){super(n);G(this,"diagnostic");this.diagnostic=t,this.name="InstancePathError"}},fs=class extends Error{constructor(t,n){super(`Expected one instance-path target for ${F(n)}; found ${t}`);G(this,"count");this.count=t,this.name="SegmentError"}};function hy(e,t,n,r){return new WN({ownerId:e,mainComponentId:t,path:structuredClone(n),reason:r.count===0?"missing-target":"ambiguous-target"},`Override declared by ${e}, path [${n.map(F).join(", ")}]: ${r.message}`)}function Ey(e,t){let n=F(t),{count:r,match:i}=Ty(e.children,HN,o=>je(o.overrideKey,t)||o.sourceId===n);if(!i)throw new fs(r,t);return i}function tc(e,t){return je(e.properties.symbolData?.symbolID,t)||je(e.mainComponentOverrideKey,t)||je(e.sourceComponentOverrideKey,t)||je(e.sourceComponentId,t)}function Ay(e,t){let n=e;for(let[r,i]of t.entries())r===0&&tc(e,i)||(n=Ey(n,i));return n}function XN(e,t,n){if(!t?.properties.size||!n.size)return;let r=ts(n);xy(e,{x:t.properties.size.x*r,y:t.properties.size.y*r},n.size)}function gy(e,t,n,r,i){let o=r-n;if(i==="SCALE"&&n>0){let s=r/n;return{position:e*s,size:t*s}}return i==="MAX"?{position:e+o,size:t}:i==="CENTER"?{position:e+o/2,size:t}:i==="STRETCH"?{position:e,size:Math.max(0,t+o)}:{position:e,size:t}}function xy(e,t,n){if(t.x===n.x&&t.y===n.y)return;let r=e.properties.stackMode&&e.properties.stackMode!=="NONE";for(let i of e.children){let o=i.properties;if(r&&o.stackPositioning!=="ABSOLUTE"||!o.size)continue;let s=o.transform??{m00:1,m01:0,m02:0,m10:0,m11:1,m12:0},a=gy(s.m02,o.size.x,t.x,n.x,o.horizontalConstraint),l=gy(s.m12,o.size.y,t.y,n.y,o.verticalConstraint),u={x:a.size,y:l.size};xy(i,o.size,u),o.size=u,o.transform={...s,m02:a.position,m12:l.position}}}var Zu=(e,t)=>({x:e.x*t,y:e.y*t});function Ny(e,t){e.fontSize!==void 0&&(e.fontSize*=t);for(let r of["lineHeight","letterSpacing"]){let i=e[r];i?.units==="PIXELS"&&(e[r]={...i,value:i.value*t})}if(e.textData?.styleOverrideTable){e.textData=structuredClone(e.textData);for(let r of e.textData.styleOverrideTable??[])Ny(r,t)}if(!e.derivedTextData)return;let n=structuredClone(e.derivedTextData);n.layoutSize&&(n.layoutSize=Zu(n.layoutSize,t)),n.truncatedHeight!==void 0&&(n.truncatedHeight*=t);for(let r of n.glyphs??[])r.position=Zu(r.position,t),r.fontSize*=t;for(let r of n.baselines??[])r.position=Zu(r.position,t),r.width*=t,r.lineHeight*=t,r.lineAscent*=t,r.lineY!==void 0&&(r.lineY*=t);e.derivedTextData=n}var Cy=["stackPadding",...Object.values(zg)],Oy=["strokeWeight","cornerRadius","rectangleTopLeftCornerRadius","rectangleTopRightCornerRadius","rectangleBottomLeftCornerRadius","rectangleBottomRightCornerRadius"],jN=["fontSize","lineHeight","letterSpacing","textData","derivedTextData"],$N=[...Cy,...Oy,...jN,"dashPattern","effects","size","transform"];function KN(e,t){for(let n of Oy){let r=e[n];typeof r=="number"&&(e[n]=r*t)}e.dashPattern&&(e.dashPattern=e.dashPattern.map(n=>n*t)),e.effects&&(e.effects=e.effects.map(n=>({...n,offset:n.offset?{x:n.offset.x*t,y:n.offset.y*t}:n.offset,radius:typeof n.radius=="number"?n.radius*t:n.radius,spread:typeof n.spread=="number"?n.spread*t:n.spread})))}function YN(e,t){let n=ts(t);if(!Number.isFinite(n)||n<=0)throw new Error("Invalid instance uniform scale");if(n!==1){for(let r of ps(e)){r.layoutScale=(r.layoutScale??1)*n;for(let o of Object.keys(r.variableBindingScales??{}))r.variableBindingScales&&o!=="opacity"&&o!=="rotation"&&(r.variableBindingScales[o]*=n);let i=r.properties;Ny(i,n),KN(i,n);for(let o of Cy){let s=i[o];typeof s=="number"&&(i[o]=s*n)}i.size&&(i.size={x:i.size.x*n,y:i.size.y*n}),i.transform&&(i.transform={...i.transform,m02:i.transform.m02*n,m12:i.transform.m12*n}),r.derivedSize&&(r.derivedSize={x:r.derivedSize.x*n,y:r.derivedSize.y*n})}for(let r of $N){let i=t[r];i!==void 0&&Object.assign(e.properties,{[r]:structuredClone(i)})}}}var qN=["fontSize","fontName","fontVariations","letterSpacing","lineHeight","textCase","textAlignHorizontal","textAlignVertical","textAutoResize","styleIdForText","fontVariantCommonLigatures","fontVariantContextualLigatures"];function JN(e,t){if("derivedTextData"in t)return;let n=t.textData;(n!==void 0&&Object.entries(n).some(([r,i])=>!Re(i,e.textData?.[r]))||qN.some(r=>r in t&&!Re(e[r],t[r])))&&(e.derivedTextData=void 0)}function ic(e){return{instance:(t,n={})=>Qu(e,t,"INSTANCE",n),component:(t,n={})=>Qu(e,t,"SYMBOL",n),page:(t,n={})=>Qu(e,t,"CANVAS",n)}}function Qu(e,t,n,r){let{sources:i,children:o}=e,s=new Set,a=new WeakMap,l=new WeakMap,u=A=>{let N=i.get(A.sourceId);if(N?.type==="INSTANCE")return A.properties.name;let b=N?.parentIndex?.guid,R=b?i.get(F(b)):void 0;return R?.isStateGroup===!0?R.name:A.properties.name},c=A=>{if(!A)return[];let N=ec(i.get(F(A))?.overrideKey);return N?[A,N]:[A]},f=({boundary:A})=>A?.replaced.some(N=>my(e,N,A.path))??!1,p=(A,N)=>{if(N.count===0&&f(A))return;let b=hy(A.owner.id,A.owner.mainComponentId,A.declaredPath,N);if(N.count!==0||!r.onUnresolvedAssignment)throw b;A.owner.unresolved.push({...b.diagnostic,assignments:structuredClone(A.assignments)})},d=(A,N)=>{let b=new Map;for(let R of N){let[_]=R.path,{count:O,topChild:k}=by(e,A,_);if(!k?.guid){p(R,new fs(O,_));continue}let U=F(k.guid),X=rc(k,_),$={...R,path:X?R.path.slice(1):R.path},j=b.get(U);j?j.push($):b.set(U,[$])}return b},m=(A,N,b)=>{let R=A.symbolData?.symbolID;return N?[...R?[R]:[],...b].filter(_=>!je(_,N)):[]},h=(A,N,b,R,_)=>{let O=N.symbolData?.symbolID,k=m(A,O,b),U=[...c(A.symbolData?.symbolID),...c(O)],X=B=>U.some(te=>je(te,B)),$=[{assignments:N.componentPropAssignments??[],rank:_}],j=[],K=B=>{if(!O)throw new Error("Swap target is not an instance");je(O,B)||k.push(O),O=B;for(let te of c(O))X(te)||U.push(te)};for(let B of R){let te=B.path.length===0||X(B.path[0]);if(!te||B.path.length>1){j.push(te?{...B,path:B.path.slice(1)}:B);continue}B.swap&&K(B.swap),B.assignments.length&&$.push({assignments:B.assignments,rank:B.owner.rank})}return{effective:O,replaced:k,groups:$,descendant:j}},y=(A,N,b,R)=>{let _=a.get(b),O=Object.fromEntries(Object.entries(R.props).filter(([k])=>{let U=_?.get(k);return U===void 0||U>=N}));Object.keys(O).length!==0&&(vy(b,O),JN(b.properties,O),Object.assign(b.properties,ni(O),fn(b.properties,O)),"name"in O&&(b.hasOwnName=!0),A.propertyClaims.push({declaredBy:A.sourceId,path:structuredClone(R.path),properties:structuredClone(O)}))},v=(A,N)=>{let b=A;for(let[R,_]of N.entries()){let O=N.slice(R);if((l.get(b)??[]).some(k=>my(e,k,O)))return!0;if(!(R===0&&tc(b,_)))try{b=Ey(b,_)}catch(k){if(!(k instanceof fs))throw k;return!1}}return!1},g=(A,N)=>{try{return Ay(A,N)}catch(b){if(!(b instanceof fs))throw b;let R=hy(A.sourceId,A.mainComponentId,N,b);if(R.diagnostic.reason==="missing-target"&&v(A,N))return;if(!r.onUnresolvedProperty)throw R;r.onUnresolvedProperty(R.diagnostic);return}},I=(A,N)=>{if(!r.derivedBounds)return;let b=N.derivedSymbolData;for(let R of b??[]){let _=R.guidPath?.guids;if(!_?.length)continue;let O=g(A,_);!O||O===A||UN(O,R)}},S=(A,N)=>{let b=[],R=new Map,_=[],O,k=BN(A,N,(U,X)=>{if(b.push(U),X.origin==="assignment"&&X.rank!==void 0&&R.set(U.field,X.rank),U.field==="symbolData")for(let $ of X.superseded??[])$.guidValue&&_.push($.guidValue);if(U.field==="slotContent"){let $=ns(X.value);O=$?F($):void 0}});if(O&&!i.has(O)){if(!r.onMissingSlotContent)throw new Error(`Missing slot content ${O}`);r.onMissingSlotContent({slotId:gn(A)??"",slotContentId:O}),O=void 0}return{source:k,claims:b,bound:R,superseded:_,slotContent:O}},E=(A,N,b,R)=>{if(s.has(A))throw new Error(`Cyclic component expansion at ${A}`);let _=i.get(A);if(!_)throw new Error(`Missing source node ${A}`);let O=S(_,N),{source:k}=O;s.add(A);try{let U={id:A,rank:R,mainComponentId:null,unresolved:[]},X=zN(k,U),$=[...X.structural,...b].sort((re,Ce)=>Ce.owner.rank-re.owner.rank),j=h(_,k,O.superseded,$,R),K;j.effective?K=T(U,{...j,effective:j.effective},R):O.slotContent?K=x(O.slotContent,j.descendant,R):K=C(A,k,N,j.groups,j.descendant,R);let B=V(A,_,k,j,K,O.claims);O.slotContent&&(B.slotContentId=O.slotContent),a.set(B,O.bound),K.base&&j.replaced.length&&l.set(B,j.replaced),kN(B,k);let te=K.dangling?X.claims.filter(({path:re})=>re.length===1&&tc(B,re[0])):X.claims;L(B,K.base,k,te,R,!K.dangling);for(let re of U.unresolved)r.onUnresolvedAssignment?.({...re,mainComponentId:B.mainComponentId});return B}finally{s.delete(A)}},T=(A,{effective:N,replaced:b,groups:R,descendant:_},O)=>{let k=F(N);if(!i.has(k)){if(!r.onMissingComponent)throw new Error(`Missing source node ${k}`);return r.onMissingComponent({ownerId:A.id,componentId:k}),{base:null,children:[],dangling:!0}}A.mainComponentId=_N(e,k);let U=_.map(j=>b.length?{...j,boundary:{replaced:b,path:j.path}}:j),X=R.filter(j=>j.assignments.length).map(j=>({owner:{...A,rank:j.rank},declaredPath:[],path:[],assignments:j.assignments})),$=E(F(N),[],[...X,...U],O+1);return{base:$,children:$.children}},C=(A,N,b,R,_,O)=>{let k=N.type==="SYMBOL"?R.reduce((X,$)=>FN(X,$.assignments,$.rank),GN(N)):b,U=d(A,_);return{base:null,children:(o.get(A)??[]).map(X=>{if(!X.guid)throw new Error("Indexed child has no GUID");let $=F(X.guid);return E($,k,U.get($)??[],O+1)})}},x=(A,N,b)=>{let R=d(A,N);return{base:null,children:(o.get(A)??[]).map(_=>{if(!_.guid)throw new Error("Indexed child has no GUID");let O=F(_.guid);return E(O,[],R.get(O)??[],b+1)})}},D=A=>{let N=ns(A.varValue?.value);return!!N&&!i.has(F(N))},M=A=>A?{mainComponentId:A.mainComponentId??A.sourceId,mainComponentOverrideKey:A.mainComponentOverrideKey??A.overrideKey,propertyClaims:structuredClone(A.propertyClaims),variableBindingScales:{...A.variableBindingScales},hasOwnName:i.get(A.sourceId)?.type==="INSTANCE"&&A.hasOwnName}:{mainComponentId:null,mainComponentOverrideKey:void 0,propertyClaims:[],variableBindingScales:{},hasOwnName:!1},V=(A,N,b,{effective:R,replaced:_,groups:O},{base:k,children:U},X)=>{let $=N.symbolData?.symbolID,[,j]=c($),K={sourceId:A,sourceComponentId:$,sourceComponentOverrideKey:j,...M(k),bindingClaims:X,overrideKey:ec(b.overrideKey),properties:{...k&&We(k.properties,Hg),...b,...R&&b.symbolData?{symbolData:{...b.symbolData,symbolID:R}}:{},...fn(k?.properties??{},b)},children:U};return b.type==="INSTANCE"&&(K.properties.componentPropAssignments=O.flatMap(B=>B.assignments).filter(B=>!D(B))),k&&_.length&&!K.hasOwnName&&(K.properties.name=k.defaultInstanceName??k.properties.name),K.defaultInstanceName=u(K),K},L=(A,N,b,R,_,O)=>{for(let k of R){let U=g(A,k.path);U&&y(A,_,U,k)}YN(A,b),XN(A,N,b),b.type==="INSTANCE"&&b.size&&(A.properties.size=structuredClone(b.size),A.derivedSize=structuredClone(b.size)),O&&I(A,b)};if(i.get(t)?.type!==n){let A={INSTANCE:"an instance",SYMBOL:"a component",CANVAS:"a page"}[n];throw new Error(`Expected ${A} source`)}return E(t,[],[],0)}function ZN(e,t){let n=Bt();return n.orderKey=e.properties.parentIndex?.position??null,n.fig.layout=t.source?.fig.layout??null,n.fig.uniformScaleFactor=qn(e.properties)?.uniformScaleFactor??null,n}var QN=new Set(["childIds","source","instanceOverrides"]);function Dy(e){return e instanceof Map||e instanceof Set?!0:e===null||typeof e!="object"||ArrayBuffer.isView(e)?!1:Object.values(e).some(Dy)}function eC(e,t){for(let n of Object.keys(e)){if(QN.has(n))continue;let r=Reflect.get(e,n),i=Reflect.get(t,n);r===i||r===null||typeof r!="object"||Dy(r)||!Re(r,i)||Reflect.set(e,n,i)}}function yy(e){if(e==="DOCUMENT"||e==="VARIABLE")throw new Error(`Cannot materialize ${e} as an instance descendant`)}function oc(e,t,n,r,i={}){let{blobs:o=[],sourceChildren:s=new Map,existingNodes:a=new Map}=i;if(!e.getNode(t))throw new Error("Missing materialization parent");let l=new Map,u=m=>{if(l.has(m))throw new Error("Repeated or cyclic instance occurrence");let h=ai(m.properties,o,"occurrence");h.nodeType==="TEXT"&&m.derivedSize&&(h.derivedLayout={width:m.derivedSize.x,height:m.derivedSize.y}),yy(h.nodeType);let y=a.get(m);if(y&&(e.getNode(y.id)!==y||y.type!==h.nodeType))throw new Error(`Invalid preallocated occurrence ${m.sourceId}`);l.set(m,h);let v=s.get(m);if(v&&e.getNode(v)?.type!==h.nodeType)throw new Error(`Invalid source child for ${m.sourceId}`);if(m.mainComponentId!==null){let g=r.get(m.mainComponentId);if(!g||e.getNode(g)?.type!=="COMPONENT")throw new Error(`Missing materialized component ${m.mainComponentId}`)}for(let g of m.children)u(g)};u(n);let c=new Map(a),f=(m,h,y)=>{if(y)for(let v of m.bindingClaims)v.origin==="assignment"&&v.field==="visible"&&fe(y.instanceOverrides,y.id,h.id,"visible",h.visible)},p=(m,h,y)=>{let v=l.get(m);if(!v)throw new Error("Missing prepared occurrence");let{nodeType:g,...I}=v;yy(g);let S=ZN(m,v),E={...I,variableAssignmentScales:PN(m),componentScale:Iy(m),variableBindingScales:Yn(I.boundVariables??{},m.layoutScale??1,m.variableBindingScales),componentId:m.mainComponentId===null?s.get(m)??null:r.get(m.mainComponentId),source:S},T=a.get(m);if(T&&T.parentId!==h)throw new Error(`Preallocated occurrence has wrong parent ${m.sourceId}`);let C=T??e.createNode(g,h,E);T&&e.updateNode(T.id,E);let x=e.getNode(s.get(m)??"");if(x&&eC(C,x),c.set(m,C),T&&m!==n&&C.type==="COMPONENT")return C;f(m,C,y);let D=s.get(m);return y&&m.mainComponentId!==null&&D&&(fe(y.instanceOverrides,y.id,C.id,"sourceComponentId",D),e.getNode(D)?.componentId!==C.componentId&&fe(y.instanceOverrides,y.id,C.id,"componentId",C.componentId)),C.childIds=m.children.map(M=>p(M,C.id,C.type==="INSTANCE"?C:y).id),C},d=p(n,t);return rC(c),{root:d,nodes:c}}function tC(e,t,n){return e.kind==="text"?typeof t=="object"&&t!==null&&"characters"in t:e.kind==="text-style"?!!n.textStyleId:!0}function nC(e,t,n,r){if(!Array.isArray(r))return;let i=!1;for(let[o,s]of r.entries()){if(!s.colorVar?.value?.alias)continue;let a=`boundVariables/${n}/${o}/color`;fe(e.instanceOverrides,e.id,t.id,a,t.boundVariables[`${n}/${o}/color`]??null),i=!0}i&&fe(e.instanceOverrides,e.id,t.id,"boundVariables")}function rC(e){for(let[t,n]of e)if(n.type==="INSTANCE")for(let r of t.propertyClaims){let i=Ay(t,r.path),o=e.get(i);if(!o)throw new Error("Unmaterialized property claim target");for(let s of Object.keys(ui)){if(!(s in r.properties))continue;let a=ui[s];if(tC(a,r.properties[s],o)){for(let l of a.scene){let u=o[l];fe(n.instanceOverrides,n.id,o.id,l,structuredClone(u))}a.kind==="paint"&&nC(n,o,a.scene[0],r.properties[s])}}wN(n,o,r.properties)}}function sc(e,t,n){if(e.mainComponentId!==null){let r=n.get(e.mainComponentId);if(!r)throw new Error(`Missing component occurrence ${e.mainComponentId}`);let i=new Map(t.getChildren(r.materialized.root.id).map((s,a)=>[s.id,a])),o=new Map(r.occurrence.children.map(s=>[s.sourceId,s]));e.children=e.children.filter(s=>{let a=o.get(s.sourceId),l=a&&r.materialized.nodes.get(a);return!!l&&i.has(l.id)}).toSorted((s,a)=>{let l=o.get(s.sourceId),u=o.get(a.sourceId),c=l&&r.materialized.nodes.get(l),f=u&&r.materialized.nodes.get(u);return(c?i.get(c.id)??0:0)-(f?i.get(f.id)??0:0)})}for(let r of e.children)sc(r,t,n)}function*Ry(e,t){let n=new Map;for(let r of t.children){if(n.has(r.sourceId))throw new Error(`Ambiguous source child ${r.sourceId}`);n.set(r.sourceId,r)}for(let r of e.children){let i=n.get(r.sourceId);if(!i)throw new Error(`Missing source child ${r.sourceId}`);yield[r,i]}}function ac(e,t,n){let r=[],i=(o,s,a,l)=>{for(let[u,c]of Ry(o,s)){let f=t.nodes.get(u),p=l.get(c);if(!f||!p)throw new Error(`Missing materialized correspondence for ${u.sourceId}`);r.push({owner:a,target:f,source:p}),!u.slotContentId&&u.mainComponentId===c.mainComponentId&&i(u,c,a,l)}};for(let o of ps(e)){if(o.mainComponentId===null)continue;let s=n.get(o.mainComponentId),a=t.nodes.get(o);if(!s||!a)throw new Error(`Missing component ${o.mainComponentId}`);i(o,s.occurrence,a,s.materialized.nodes)}for(let{owner:o,target:s,source:a}of r)fe(o.instanceOverrides,o.id,s.id,"sourceComponentId",a.id),s.type==="INSTANCE"&&s.componentId!==a.componentId&&fe(o.instanceOverrides,o.id,s.id,"componentId",s.componentId)}function lc(e,t){let n=new Map,r=(s,a,l)=>{for(let[u,c]of Ry(s,a)){let f=l.get(c);if(!f)throw new Error(`Unmaterialized source child ${c.sourceId}`);if(n.set(u,f.id),u.mainComponentId!==null)i(u);else if(u.slotContentId)for(let p of u.children)o(p);else r(u,c,l)}},i=s=>{if(s.mainComponentId===null)throw new Error("Expected instance occurrence");let a=t.get(s.mainComponentId);if(!a)throw new Error(`Missing component occurrence ${s.mainComponentId}`);r(s,a.occurrence,a.materialized.nodes)},o=s=>{if(s.mainComponentId!==null)i(s);else for(let a of s.children)o(a)};return o(e),n}function My(e,t,n,r){let i=r??new Map;if(!r)for(let o of e.getAllNodes())for(let s of o.componentPropertyDefinitions)i.set(s.id,s.type);for(let o of n){let s;o.componentPropertyDefinitions.forEach((a,l)=>{if(i.set(a.id,a.type),a.type!=="INSTANCE_SWAP")return;let u=t.get(a.defaultValue);u&&(s??(s=[...o.componentPropertyDefinitions]),s[l]={...a,defaultValue:u})}),s&&(o.componentPropertyDefinitions=s)}for(let o of n){let s;for(let a in o.componentPropertyAssignments){if(i.get(a)!=="INSTANCE_SWAP")continue;let l=t.get(o.componentPropertyAssignments[a]);l&&(s??(s={...o.componentPropertyAssignments}),s[a]=l)}s&&(o.componentPropertyAssignments=s)}}function Py(e,t){for(let n of t){if(n.type!=="COMPONENT"||!n.parentId||n.variantPropSpecs.length===0)continue;let r=e.getNode(n.parentId);if(r?.type!=="COMPONENT_SET")continue;let i=new Map(r.componentPropertyDefinitions.map(s=>[s.id,s.name])),o={};for(let s of n.variantPropSpecs)o[i.get(s.propDefId)??s.propDefId]=s.value;e.updateNode(n.id,{componentPropertyValues:o})}}function ms(e){let t=new Map;for(let n of e){if(!n.guid||typeof n.key!="string")continue;let r=t.get(n.key)??new Map,i=typeof n.version=="string"?n.version:"",o=F(n.guid);if(r.has(i)&&r.get(i)!==o)throw new Error(`Ambiguous resource ${n.key} version ${i}`);r.set(i,o),t.set(n.key,r)}return n=>{if(n?.guid)return F(n.guid);let r=n?.assetRef;if(!r)return;let i=t.get(r.key);return r.version?i?.get(r.version):i?.has("")?i.get(""):i?.size===1?i.values().next().value:void 0}}function wy(e,t,n){let r=new Set,i=s=>{s&&r.add(F(s))},o=s=>{i(s.value?.guidValue),i(s.varValue?.value?.symbolIdValue?.guid)};return Zn(e,(s,a)=>{i(qn(s)?.symbolID),i(a?.overriddenSymbolID);for(let l of s.componentPropDefs??[])if(l.type==="INSTANCE_SWAP"&&o({value:l.initialValue,varValue:l.varValue}),l.type==="INSTANCE_SWAP"||l.type==="SLOT")for(let u of l.preferredValues?.instanceSwapValues??[]){if(!u.key)continue;let c=t?.({assetRef:{key:u.key,version:u.version}});if(!c){if(!n)throw new Error(`Unresolved preferred component ${u.key}`);n(u.key);continue}r.add(c)}for(let l of s.componentPropAssignments??[])o(l)}),r}function ky(e){let t=new Set;return Zn(e,n=>{for(let r of n.componentPropAssignments??[]){let i=ns(r.varValue?.value);i&&t.add(F(i))}}),t}function uc(e){for(let t of e){if(t.pluginData&&t.pluginData.length>1){let n=new Map;for(let r of t.pluginData)n.set(`${r.pluginID}\0${r.key}\0${r.value}`,r);n.size<t.pluginData.length&&(t.pluginData=[...n.values()])}if(t.pluginRelaunchData&&t.pluginRelaunchData.length>1){let n=new Map;for(let r of t.pluginRelaunchData)n.set(`${r.pluginID}\0${r.command}\0${r.message}\0${r.isDeleted}`,r);n.size<t.pluginRelaunchData.length&&(t.pluginRelaunchData=[...n.values()])}}}function Ly(e){if(new TextDecoder().decode(e.slice(0,8))!=="fig-kiwi")return null;let t=new DataView(e.buffer,e.byteOffset,e.byteLength),n=t.getUint32(8,!0),r=12,i=[];for(;r<e.length&&!(r+4>e.length);){let a=t.getUint32(r,!0);if(r+=4,r+a>e.length)throw new Error(`Corrupted .fig file: chunk at offset ${r-4} declares length ${a} but only ${e.length-r} bytes remain`);i.push(e.slice(r,r+a)),r+=a}if(i.length<2)return null;let o=i[1],s;if(Wl(o))s=Ym(o);else try{s=In(o)}catch{throw new Error("Failed to decompress fig-kiwi data chunk")}return{schemaDeflated:i[0],dataRaw:s,version:n}}function hs(e,t,n){let r=Ly(e);if(!r)throw new Error("Invalid fig-kiwi container");let i=In(r.schemaDeflated),o=Go(new tt(i));if(t)try{let l=ch(o,r.dataRaw);l.length>0&&t(l)}catch(l){console.warn("Failed to scan FIG page manifest; continuing with full decode:",l)}let s=Zr(o,n).decodeMessage(r.dataRaw),a=s.nodeChanges;if(!a||a.length===0)throw new Error("No nodes found in .fig file");return uc(a),{nodeChanges:a,blobs:(s.blobs??[]).map(l=>l.bytes instanceof Uint8Array?l.bytes:new Uint8Array(Object.values(l.bytes))),figKiwiVersion:r.version,figSchemaDeflated:r.schemaDeflated}}function Gy(e,t){let n=[],r=t.parentId?e.getNode(t.parentId):void 0;for(;r;)r.type==="INSTANCE"&&n.push(r),r=r.parentId?e.getNode(r.parentId):void 0;return t.type==="INSTANCE"&&n.unshift(t),n}function By(e,t){let n=[];for(let r of Gy(e,t)){let i=et(r.instanceOverrides,r.id,t.id,"sourceComponentId"),o=typeof i=="string"?i:t.componentId,s=o?e.getNode(o):void 0;s&&n.push(s)}return n}function iC(e,t){e.preserveSourceMetadataDuring(()=>{for(let n of t.nodes.values()){let r=Gy(e,n),i=new Set;for(let s of r){let a=s.id===n.id?s.instanceOverrides.self:s.instanceOverrides.descendants.get(n.id);for(let l of a?.keys()??[])i.add(l)}let o={};for(let s of By(e,n))for(let a of po)!s.source.editedFields.includes(a)||i.has(a)||Object.assign(o,{[a]:structuredClone(s[a])});Object.keys(o).length&&e.updateNode(n.id,o)}})}var oC=new Uint8Array([137,80,78,71,13,10,26,10]);function sC(e){return oC.every((t,n)=>e[n]===t)}function aC(e){let t=e.toLowerCase();return t.endsWith(".png")||t.endsWith(".jpg")||t.endsWith(".json")}function _y(e){let t=e["canvas.fig"]??e.canvas;if(t)return t;let n=null;for(let[r,i]of Object.entries(e))!i||aC(r)||(!n||i.byteLength>n.byteLength)&&(n=i);return n}function Vy(e){return e==="canvas.fig"||e==="canvas"}function lC(e,t,n){let r=ql(e);if(!r)return null;let i=hs(e,t,n),o=r.slice(2).find(sC)??null;return{...i,images:[],thumbnailPNG:o,metaJSON:null}}function dc(e,t,n){let r=new Uint8Array(e),i=lC(r,t,n);if(i)return i;let o=_y(Tn(r,{filter:({name:c})=>Vy(c)})),s,a;if(o)a=hs(o,t,n),s=Tn(r,{filter:({name:c})=>!Vy(c)});else{if(s=Tn(r),o=_y(s),!o)throw new Error(`No canvas data found in .fig file. Entries: ${Object.keys(s).join(", ")}`);a=hs(o,t,n)}let l=s["meta.json"],u=Object.entries(s).filter(([c])=>c.startsWith("images/")&&c!=="images/").map(([c,f])=>[c.slice(7),f]);return{...a,images:u,thumbnailPNG:s["thumbnail.png"]??null,metaJSON:Object.hasOwn(s,"meta.json")?new TextDecoder().decode(l):null}}function Uy(e){let t={"canvas.fig":[Jl(e.schemaDeflated,e.kiwiData,e.figKiwiVersion),{level:0}],"thumbnail.png":[e.thumbnailPNG,{level:0}],"meta.json":new TextEncoder().encode(e.metaJSON)};for(let n of e.images??[])t[n.name]=[n.data,{level:0}];return vn(t)}function uC(e,t,n,r=new Map){let i=new Map;for(let o of n)o.type==="INSTANCE"&&kr(o.instanceOverrides,(s,a)=>{if(a!=="width"&&a!=="height")return;let l=s||o.id,u=i.get(l)??new Set;u.add(a),i.set(l,u)});for(let o of n){let s=Yn(o.boundVariables,r.get(o.id)??1,o.variableBindingScales);e.updateNode(o.id,{variableBindingScales:s});for(let a in o.boundVariables){if((a==="width"||a==="height")&&t.has(o.id)||i.get(o.id)?.has(a))continue;let l=o.boundVariables[a],u=e.variables.get(l);if(!u)continue;let c=e.getNodeVariableModeId(o.id,u.collectionId),f=e.resolveVariable(l,c);if(typeof f!="number")continue;let p=a==="opacity"?f:f*(s[a]??1),d=Au(a,p);d&&e.updateNode(o.id,d)}}}function cC(e,t){for(let n of t){let r=jr(e,n);(r.fills||r.strokes)&&e.updateNode(n.id,r)}}function fC(e,t){for(let n of t){if(n.type!=="TEXT")continue;let r=n.boundVariables.text;if(!r)continue;let i=No(e.resolveVariableForNode(n.id,r));i===void 0||i===n.text||e.updateNode(n.id,{text:i})}}function dC(e,t){let n=e.getNode(e.rootId);if(!n||!t)return;n.source.format="fig",n.pluginData=t.pluginData?.map(i=>({pluginId:i.pluginID,key:i.key,value:i.value}))??[],n.source.fig.rawNodeFields.strokeJoin=t.strokeJoin,n.source.fig.rawNodeFields.strokeWeight=t.strokeWeight;let r=Ve(t,xe.enabledLibraries);for(let i of r??[])e.enabledLibraries.set(i.libraryId,i)}var pC=new Set(["VISIBLE","TEXT_DATA","OVERRIDDEN_SYMBOL_ID","SLOT_CONTENT_ID"]);function mC(e){for(let t of e.componentPropDefs??[]){let n=t.varValue?.value;t.initialValue||!n||(t.initialValue=n.symbolIdValue?.guid?{guidValue:structuredClone(n.symbolIdValue.guid)}:structuredClone(n))}}function hC(e){mC(e);let t=e.parameterConsumptionMap,n=structuredClone(e.componentPropRefs??[]);for(let r of t?.entries??[]){let i=r.variableData?.value?.propRefValue?.defId;if(r.variableData?.dataType!=="PROP_REF"||!i||!r.variableField||!pC.has(r.variableField))continue;let o={defID:structuredClone(i),componentPropNodeField:r.variableField},s=n.findIndex(a=>a.componentPropNodeField===r.variableField);s===-1?n.push(o):n[s]=o}n.length&&(e.componentPropRefs=n)}var zy=["styleIdForFill","styleIdForStrokeFill","styleIdForText","styleIdForEffect","styleIdForGrid"];function gC(e,t,n){let r=new Set;return Zn(e,i=>{for(let o of[i,...i.textData?.styleOverrideTable??[]])for(let s of zy){let a=o[s];if(!a)continue;let l=a.guid?F(a.guid):t(a);l&&n.has(l)&&r.add(l)}}),r}function yC(e,t,n){for(let r of Jn(e))n(r,[...t,...r.guidPath?.guids??[]]);for(let r of e.derivedSymbolData??[])n(r,[...t,...r.guidPath?.guids??[]])}function IC(e){return(t,n,r)=>{let i=(s,a,l)=>{if(!s?.assetRef||s.guid)return;let u=e(s);if(!u){r?.({sourceId:n,field:a,key:s.assetRef.key,path:structuredClone(l)});return}s.guid=_e(u)},o=(s,a)=>{hC(s);for(let u of Xe(s))Iu(u.variableData,c=>i(c,u.variableField??"unknown",a));for(let[u,c]of[["fillPaints",s.fillPaints],["strokePaints",s.strokePaints]])for(let f of c??[])i(f.colorVar?.value?.alias,u,a);let l=s.variableModeBySetMap;for(let u of l?.entries??[])i(u.variableSetID,"variableModeBySetMap",a);for(let u of zy)i(s[u],u,a);for(let u of s.textData?.styleOverrideTable??[])o(u,a);yC(s,a,o)};o(t,[])}}function vC(e){let t=IC(ms(e));return(n,r)=>t(n,n.guid?F(n.guid):"unknown",r)}function TC(e,t,n,r=()=>!1){let i=n,o=new Map,s=d=>{if(d.mainComponentId===null){d.properties.type==="SYMBOL"&&o.set(d.sourceId,d);for(let m of d.children)s(m)}};for(let d of e)s(d);let a=[],l=new Set,u=new Set,c=d=>{let m=new Set,h=d;for(;h;){if(m.has(h))throw new Error(`Cyclic source hierarchy at ${h}`);m.add(h);let y=i.get(h);if(!y)throw new Error(`Missing source ancestor ${h}`);if(y.type==="CANVAS")return h;h=yn(y)}throw new Error(`Component ${d} has no source page`)},f=d=>{for(let m of ps(d))m.mainComponentId!==null&&p(m.mainComponentId),m.properties.type==="SYMBOL"&&p(m.sourceId)},p=d=>{if(l.has(d))return;if(r(d)){l.add(d);return}if(u.has(d))throw new Error(`Cyclic component dependency ${d}`);u.add(d);let m=i.get(d);if(!m?.parentIndex?.guid)throw new Error(`Missing component parent ${d}`);let h=c(d),y=o.get(d)??t(d);for(let v of y.children)f(v);a.push({sourceId:d,parentSourceId:F(m.parentIndex.guid),pageSourceId:h,occurrence:y}),l.add(d),u.delete(d)};for(let d of e)f(d);return a}var cc=class{constructor(e,t){G(this,"source");G(this,"decode");this.source=e,this.decode=t}get size(){return this.source.size}get(e){let t=this.source.get(e);return t===void 0?void 0:this.decode(t)}has(e){return this.source.has(e)}keys(){return this.source.keys()}*values(){for(let e of this.source.values())yield this.decode(e)}*entries(){for(let[e,t]of this.source)yield[e,this.decode(t)]}forEach(e){for(let[t,n]of this.entries())e(n,t,this)}[Symbol.iterator](){return this.entries()}};function SC(e,t){if(t){for(let n of t)if(e.get(n)?.type!=="CANVAS")throw new Error(`Unknown page ${n}`)}}function bC(e,t,n,r){for(let i of t){let o=new Set([i]),s=e.get(i),a=s?yn(s):void 0;for(;a!==void 0;){if(o.has(a))throw new Error(`Cyclic source hierarchy at ${a}`);if(o.add(a),n.has(a))break;if(n.add(a),s=e.get(a),!s){r.add(a);break}a=yn(s)}}}function EC(e,t,n,r=i=>i){let i=ms(e),{sources:o,children:s}=n,a=new Set(o.keys()),l=new Set,u=new Set,c=new Set,f=new Set,p=new Set,d=new Set,m=new Set,h=new Set;SC(o,t);let y=e.filter(v=>v.type==="CANVAS"&&(t?t.has(gn(v)??""):v.internalOnly!==!0)).flatMap(v=>gn(v)??[]);for(;y.length;){let v=y.pop();if(!v||l.has(v))continue;let g=o.get(v);if(!g){d.has(v)?p.add(v):m.has(v)?h.add(v):f.add(v);continue}l.add(v);let I=r(g),S=wy(I,i,T=>c.add(T));for(let T of S)d.add(T);let E=ky(I);for(let T of E)m.add(T);y.push(...(s.get(v)??[]).flatMap(T=>gn(T)??[]),...gC(I,i,a),...S,...E)}return bC(o,l,u,f),{contentIds:l,ancestorIds:u,missingIds:f,missingComponentIds:p,missingSlotContentIds:h,externalPreferredKeys:c}}function AC(e,t){let n=e.componentPropDefs;n&&(e.componentPropDefs=n.map(r=>{if(!r.parentPropDefId)return r;let i=F(r.parentPropDefId);for(let o of t){let s=(o.componentPropDefs??[]).filter(a=>a.id&&F(a.id)===i);if(s.length>1)throw new Error(`Ambiguous parent property ${i}`);if(s.length===1)return{...structuredClone(s[0]),...r}}throw new Error(`Missing parent property ${i}`)}))}var xC=["guid","parentIndex","type","phase","name","internalOnly","key","version","styleType","overrideKey"];function NC(e,t){let n=dc(e,void 0,{NodeChange:xC});return{figKiwiVersion:n.figKiwiVersion,figSchemaDeflated:n.figSchemaDeflated,reader:Hy(OC(n.nodeChanges),t),blobs:n.blobs,images:n.images,records:n.nodeChanges}}function CC(e){let t=new Map;for(let n of e)if(n.guid&&typeof n.key=="string"){let r=F(n.guid);t.set(n.key,r),typeof n.version=="string"&&t.set(`${n.key}@${n.version}`,r)}return t}function fc(e){return e.type==="VARIABLE"||e.type==="VARIABLE_SET"}function Fy(e){let t=Hl(e);if(!t)throw new Error("Record header has no archive bytes to read it whole");return uc([t]),t}function OC(e){let t=e.filter(p=>p.phase!=="REMOVED"),n=ds(t),r=vC(t),i=CC(t),o=[];for(let p of t)r(Fy(p),d=>o.push(d));let s=new Map,a=new cc(n.sources,p=>p.styleType?c(p):p),l=new Set,u=(p,d)=>{if(l.has(p))throw new Error("Cyclic component-property ancestry");l.add(p);try{let m=Fy(p);r(m);let h=[];for(let v=n.sources.get(yn(p)??"");v;v=n.sources.get(yn(v)??""))h.push(d(v));AC(m,h);let y=v=>{xu(a,v,i);for(let g of Jn(v))y(g)};return y(m),m}finally{l.delete(p)}},c=p=>{let d=s.get(p);return d||(d=u(p,c),s.set(p,d)),d};return{records:t,index:n,bindingDiagnostics:o,scope:()=>{let p=new Map,d=m=>{let h=s.get(m)??p.get(m);if(h)return h;let y=u(m,d);return p.set(m,y),y};return d},shared:c,interpreterIndex:()=>{let{sources:p,children:d}=ds(t.filter(h=>!fc(h))),m=new WeakMap;return{sources:new cc(p,c),children:new cc(d,h=>{let y=m.get(h);return y||(y=h.map(c),m.set(h,y)),y})}}}}function DC(e){let t;return{records:e,get sourceInterpreter(){return t??(t=ic(e.interpreterIndex())),t}}}function Hy(e,t){let n="sourceInterpreter"in e?e:DC(e),{records:r,index:i,bindingDiagnostics:o}=n.records,s=r,a=n.records.scope(),l=s.filter(fc),u=EC(s,t,i,a);if(u.missingIds.size)throw new Error(`Missing reachable sources: ${[...u.missingIds].join(", ")}`);let c=s.filter(h=>!fc(h)&&(h.type==="CANVAS"||h.guid&&(u.contentIds.has(F(h.guid))||u.ancestorIds.has(F(h.guid))))).map(a),f=n.sourceInterpreter,p=ic(ds(c)),d=s.filter(h=>h.type==="CANVAS").toSorted(nc).map(h=>{if(!h.guid)throw new Error("Page has no GUID");return{id:F(h.guid),name:h.name??"",position:h.parentIndex?.position??null,internalOnly:h.internalOnly===!0}}),m=new Set(d.map(h=>h.id));return{selectPages(h){return Hy(n,h)},get sourceRecords(){return structuredClone(s.map(a))},get documentRecord(){let h=s.find(y=>y.type==="DOCUMENT");return structuredClone(h&&a(h))},dependencyClosure:u,pages:d,get resources(){return structuredClone(l.map(a))},bindingDiagnostics:o,readPage(h,y={}){if(!m.has(h))throw new Error(`Unknown page ${h}`);let v=p.page(h,y);return v.children=v.children.filter(g=>g.properties.isSlotContent!==!0),v},planComponents(h,y={},v){return TC(h,g=>f.component(g,y),i.sources,v)},readComponent:f.component}}function RC(e,t){let{value:n,dataType:r,resolvedDataType:i}=e.variableData;if(!n)throw new Error("Missing variable value");let o=r??i;if(o==="ALIAS"){let s=t(n.alias);if(!s)throw new Error("Unresolved variable alias");return{aliasId:s}}if(o==="COLOR"&&n.colorValue)return structuredClone(n.colorValue);if(o==="BOOLEAN"&&n.boolValue!==void 0)return n.boolValue;if(o==="STRING"&&n.textValue!==void 0)return n.textValue;if(o==="FLOAT"&&n.floatValue!==void 0)return n.floatValue;throw new Error(`Unsupported variable value ${o}`)}function MC(e,t,n){let r=e.variableDataValues?.entries??[];if(!r.length)throw new Error("Missing mode values");let i={};for(let o of r){let s=F(o.modeID);if(!t.includes(s))throw new Error("Unknown mode");i[s]=RC(o,n)}return i}function PC(e,t,n){let r=(i,o)=>{if(!n)throw new Error(`Unsupported document resource ${i.type}: ${o}`);n(structuredClone(i))};for(let i of t){if(i.type!=="VARIABLE_SET")continue;let o=i.variableSetModes??[];if(!i.guid||o.length===0){r(i,"missing collection identity or modes");continue}let s=rs(si(i)),a=Wu(i);e.addCollection({id:F(i.guid),name:i.name??"Variables",modes:o.map(l=>{let u=F(l.id);return{modeId:u,name:l.name,condition:a[u],...l.sortPosition?{sortPosition:l.sortPosition}:{}}}),defaultModeId:F(o[0].id),variableIds:[],modeAttribute:Xu(i),pluginData:s.length>0?s:void 0,key:typeof i.key=="string"?i.key:void 0,version:typeof i.version=="string"?i.version:void 0})}wC(e,t,r)}function wC(e,t,n){let r=ms(t);for(let i of t){if(i.type!=="VARIABLE")continue;let o=i.variableResolvedType,s=i.variableSetID?r(i.variableSetID):i.parentIndex?.guid&&F(i.parentIndex.guid),a=s&&e.variableCollections.get(s);if(!i.guid||!a||!s||o!=="COLOR"&&o!=="BOOLEAN"&&o!=="STRING"&&o!=="FLOAT"){n(i,"unresolved collection, identity or type");continue}let l={};try{Object.assign(l,MC(i,a.modes.map(c=>c.modeId),r))}catch(c){n(i,c instanceof Error?c.message:"Invalid mode value");continue}let u=ju(i);e.addVariable({id:F(i.guid),name:i.name??"Variable",type:o,collectionId:s,valuesByMode:l,...u,...Hu(i,l)})}}function Wy(e,t={}){let{reader:n,blobs:r,images:i}=NC(e,t.pageIds);return VC(n,r,{...t,images:t.images??new Map(i)})}function kC(e){let t=new Map;for(let n of e.getAllNodes())for(let r of n.componentPropertyDefinitions)t.set(r.id,r.type);return t}function LC(e,t){let n=!0,r=1,i=new $r(()=>n?`0:${r++}`:Do());n=!1,dC(i,e.documentRecord);for(let[o,s]of t.images??[])i.images.set(o,s.slice());i.applyImportedStateDuring(()=>PC(i,e.resources,t.onUnsupportedResource),()=>`0:${r++}`);for(let o of i.getPages())i.deleteNode(o.id);return{graph:i,nextImportedId:r,sources:new Map,components:new Map,componentIds:new Map,savedSizeNodes:new Set}}function _C(e,t){e.preserveSourceMetadataDuring(()=>{for(let[n,r]of t){let i=e.getNode(n);if(!i)continue;let o=new Set(By(e,i).flatMap(a=>a.source.editedFields)),s={};i.width!==r.width&&!o.has("width")&&(s.width=r.width),i.height!==r.height&&!o.has("height")&&(s.height=r.height),Object.keys(s).length>0&&e.updateNode(n,s)}})}function VC(e,t,n,r){for(let a of e.bindingDiagnostics){if(!n.onUnresolvedBinding)throw new Error(`Unresolved binding ${a.sourceId}: ${a.field}`);n.onUnresolvedBinding(a)}let i=e.pages.map(a=>e.readPage(a.id,n)),o=r??LC(e,n),s=e.planComponents(i,n,a=>o.components.has(a));return o.graph.applyImportedStateDuring(()=>FC(i,s,t,o,r!==void 0),()=>`0:${o.nextImportedId++}`)}function FC(e,t,n,r,i){let{graph:o,sources:s,components:a,savedSizeNodes:l,componentIds:u}=r,c=new Set(o.nodes.keys()),f=new Map,p=new Map,d=g=>{for(let[I,S]of g)I.derivedSize&&(l.add(S.id),p.set(S.id,{width:S.width,height:S.height})),I.layoutScale!==void 0&&f.set(S.id,I.layoutScale)},m=(g,I)=>{if(g.mainComponentId!==null)return;let S=s.get(g.sourceId);if(S){for(let x of g.children)m(x,S);return}let{nodeType:E,...T}=ai(g.properties,n);if(E==="DOCUMENT"||E==="VARIABLE")throw new Error(`Unsupported scene type ${E}`);let C=o.createNode(E,I,T);s.set(g.sourceId,C.id),C.type==="COMPONENT"&&u.set(g.sourceId,C.id);for(let x of g.children)m(x,C.id)};for(let g of e)m(g,o.rootId);for(let g of t){if(a.has(g.sourceId))continue;let I=s.get(g.parentSourceId);if(!I)throw new Error(`Unmaterialized component parent ${g.parentSourceId}`);let S=new Map,E=C=>{let x=s.get(C.sourceId),D=x?o.getNode(x):void 0;D&&S.set(C,D),C.mainComponentId===null&&C.children.forEach(E)};E(g.occurrence);let T=oc(o,I,g.occurrence,u,{blobs:n,sourceChildren:lc(g.occurrence,a),existingNodes:S});d(T.nodes),ac(g.occurrence,T,a),a.set(g.sourceId,{occurrence:g.occurrence,materialized:T}),u.set(g.sourceId,T.root.id),s.set(g.sourceId,T.root.id)}let h=new Set,y=g=>{if(g.properties.type==="SYMBOL")return;let I=s.get(g.sourceId);if(!I)throw new Error(`Missing source container ${g.sourceId}`);let S=[];for(let T of g.children){if(i&&sc(T,o,a),T.mainComponentId!==null&&!s.has(T.sourceId)){let x=oc(o,I,T,u,{blobs:n,sourceChildren:lc(T,a)});d(x.nodes),ac(T,x,a),i&&(iC(o,x),x.root.componentId&&h.add(x.root.id)),s.set(T.sourceId,x.root.id)}else T.mainComponentId===null&&T.properties.type!=="SYMBOL"&&y(T);let C=s.get(T.sourceId);if(!C)throw new Error(`Missing assembled child ${T.sourceId}`);S.push(C)}let E=o.getNode(I);E&&(E.childIds=[...S,...E.childIds.filter(T=>!S.includes(T))])};for(let g of e)y(g);for(let g of h)o.syncInstance(g);h.size>0&&_C(o,p);for(let g of o.getAllNodes())c.has(g.id)||g.styleRuns.length===0||(g.styleRuns=Ol(g.styleRuns,{variable:I=>I,style:I=>I,node:I=>s.get(I)??I}));let v=[...o.nodes.values()].filter(g=>!c.has(g.id));return r.definitionTypes??(r.definitionTypes=kC(o)),My(o,s,v,r.definitionTypes),o.preserveSourceMetadataDuring(()=>{Py(o,v),uC(o,l,v,f),cC(o,v),fC(o,v)}),r}async function Xy(e,t){e[0]===80&&e[1]===75&&Qn(e);let n=e.buffer.slice(e.byteOffset,e.byteOffset+e.byteLength),r=dc(n);if(r.nodeChanges.length>Ku)throw new Error("\u56FE\u5C42\u8D85\u8FC7 50,000 \u4E2A\uFF0C\u8BF7\u62C6\u5206 Figma \u6587\u4EF6\u3002");let{graph:i}=Wy(n,{onUnsupportedResource:()=>t.add("fig-resource","\u90E8\u5206 Figma \u4E13\u5C5E\u8D44\u6E90\u6CA1\u6709\u5BF9\u5E94\u7684\u76EE\u6807\u683C\u5F0F\u3002"),onUnsupportedVariableExpression:()=>t.add("variable","\u53D8\u91CF\u8868\u8FBE\u5F0F\u6309\u5F53\u524D\u5916\u89C2\u8F6C\u6362\u3002"),onUnresolvedBinding:()=>t.add("binding","\u672A\u80FD\u89E3\u6790\u7684\u53D8\u91CF\u7ED1\u5B9A\u6309\u4FDD\u5B58\u503C\u8F6C\u6362\u3002")});for(let o of r.nodeChanges)(o.prototypeInteractions?.length||o.reactions?.length)&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",o.name);return{graph:i,thumbnail:r.thumbnailPNG||hn}}async function jy(e,t,n=hn){await Xl();let r=new Map([[e.rootId,{sessionID:0,localID:0}]]),i=1;for(let y of e.nodes.values())y.id!==e.rootId&&r.set(y.id,{sessionID:1,localID:i++});let o=r.get(e.rootId),s=[Uu(o,"srgb")],a=[],l={value:i};e.getPages().forEach((y,v)=>{let g=r.get(y.id);s.push(zu(g,o,String.fromCharCode(33+v),y.name)),e.getChildren(y.id).forEach((I,S)=>{s.push(...Bu(I,g,S,l,e,a,{nodeIdToGuid:r}))})});let u=new Map([...r].map(([y,v])=>[`${v.sessionID}:${v.localID}`,e.getNode(y)]));for(let y of s){let v=u.get(`${y.guid.sessionID}:${y.guid.localID}`);if(!v||v.id===e.rootId||v.type==="CANVAS")continue;let g=ls(v);y.transform={m00:g.a,m01:g.c,m02:g.tx,m10:g.b,m11:g.d,m12:g.ty},y.fontName&&v.fontPostscript&&(y.fontName.postscript=v.fontPostscript)}let c=Fu(s,e.images),f=$l({type:"NODE_CHANGES",sessionID:0,ackID:0,nodeChanges:s,blobs:a.map(y=>({bytes:y}))}),p=n.length>24?new DataView(n.buffer,n.byteOffset,n.byteLength):null,d=p?.getUint32(16)||1,m=p?.getUint32(20)||1,h=JSON.stringify({client_meta:{background_color:{r:1,g:1,b:1,a:1},thumbnail_size:{width:d,height:m},render_coordinates:{x:0,y:0,width:d,height:m}},file_name:t,developer_related_links:[],exported_at:new Date().toISOString()});return Uy({schemaDeflated:sr(jl()),kiwiData:f,thumbnailPNG:n,images:Gu(e.images,c),metaJSON:h})}var GC={m00:1,m01:0,m02:0,m10:0,m11:1,m12:0};function pc(e){let t=e.m00*e.m11-e.m01*e.m10;if(Math.abs(t)<1e-12)return GC;let n=e.m11/t,r=-e.m01/t,i=-e.m10/t,o=e.m00/t;return{m00:n,m01:r,m02:-(n*e.m02+r*e.m12),m10:i,m11:o,m12:-(i*e.m02+o*e.m12)}}function BC(e,t){return{x:e.m00*t.x+e.m01*t.y+e.m02,y:e.m10*t.x+e.m11*t.y+e.m12}}function tr(e,t){return BC(pc(e),t)}function UC(e,t,n){return pc({m00:t.x-e.x,m01:n.x,m02:e.x-n.x/2,m10:t.y-e.y,m11:n.y,m12:e.y-n.y/2})}function gs(e,t,n=1,r=1,i=r/n){let o={x:t.x-e.x,y:t.y-e.y};return UC(e,t,{x:-o.y*r*i/n,y:o.x*n*i/r})}function $y(e,t,n){let r={x:2*(t.x-e.x),y:2*(t.y-e.y)},i={x:2*(n.x-e.x),y:2*(n.y-e.y)};return pc({m00:r.x,m01:i.x,m02:e.x-(r.x+i.x)/2,m10:r.y,m11:i.y,m12:e.y-(r.y+i.y)/2})}var pi=(e={})=>Nt(e.red,e.green,e.blue,e.alpha??1),mi=e=>({_class:"color",red:e.r,green:e.g,blue:e.b,alpha:e.a}),hi=e=>`{${e[0]}, ${e[1]}}`;function zC(e,t,n){let r=(e.points||[]).map(o=>({...o,p:pn(o.point).map((s,a)=>s*(a?n:t)),from:pn(o.curveFrom).map((s,a)=>s*(a?n:t)),to:pn(o.curveTo).map((s,a)=>s*(a?n:t))}));if(!r.length)return"";let i=`M${r[0].p.join(" ")}`;for(let o=1;o<=r.length-(e.isClosed?0:1);o++){let s=r[o-1],a=r[o%r.length];i+=s.hasCurveFrom||a.hasCurveTo?` C${(s.hasCurveFrom?s.from:s.p).join(" ")} ${(a.hasCurveTo?a.to:a.p).join(" ")} ${a.p.join(" ")}`:` L${a.p.join(" ")}`}return i+(e.isClosed?" Z":"")}async function Ky(e,t){let n=Qn(e),r=er(n,"document.json"),i=(r.pages||[]).map(d=>d._ref?er(n,`${d._ref}.json`):d);if(!i.length)throw new Error("Sketch \u6587\u4EF6\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u9875\u9762\u3002");let o=is(),s=new Map;for(let[d,m]of Object.entries(n))d.startsWith("images/")&&m.length&&s.set(d,await ss(o,m));let a=new Map;function l(d){d.symbolID&&d._class==="symbolMaster"&&a.set(d.symbolID,d),(d.layers||[]).forEach(l)}i.forEach(l),(r.foreignSymbols||[]).forEach(d=>d.symbolMaster&&l(d.symbolMaster));function u(d,m,h,y){let v=mn(pi(d.color),d.contextSettings?.opacity??1);if(v.visible=d.isEnabled!==!1,d.fillType===1){let g=d.gradient||{},I=pn(g.from,[0,.5]),S=pn(g.to,[1,.5]);v={...v,type:g.gradientType===1?"GRADIENT_RADIAL":"GRADIENT_LINEAR",gradientStops:(g.stops||[]).map(E=>({position:W(E.position),color:pi(E.color)})),gradientTransform:g.gradientType===1?$y({x:I[0],y:I[1]},{x:S[0],y:S[1]},{x:I[0]-(S[1]-I[1]),y:I[1]+(S[0]-I[0])}):gs({x:I[0],y:I[1]},{x:S[0],y:S[1]},m||1,h||1)}}else if(d.fillType===4){let g=s.get(d.image?._ref);g?v={...v,type:"IMAGE",imageHash:g,imageScaleMode:d.patternFillType===2?"FIT":d.patternFillType===0?"TILE":"FILL"}:t.add("missing-image","\u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",y)}else d.fillType&&d.fillType!==0&&t.add("sketch-fill","\u90E8\u5206 Sketch \u4E13\u5C5E\u586B\u5145\u6309\u57FA\u7840\u989C\u8272\u8F6C\u6362\u3002",y);return v}function c(d,m,h){let y=d.style||{},v=(y.fills||[]).map(S=>u(S,m,h,d.name)),g=(y.borders||[]).map(S=>({...u(S,m,h,d.name),weight:W(S.thickness,1),align:["CENTER","INSIDE","OUTSIDE"][S.position]||"CENTER"})),I=[...(y.shadows||[]).map(S=>({...S,kind:"DROP_SHADOW"})),...(y.innerShadows||[]).map(S=>({...S,kind:"INNER_SHADOW"}))].map(S=>({type:S.kind,color:pi(S.color),radius:W(S.blurRadius),spread:W(S.spread),offset:{x:W(S.offsetX),y:W(S.offsetY)},visible:S.isEnabled!==!1}));return y.blur?.isEnabled&&I.push({type:y.blur.type===3?"BACKGROUND_BLUR":"LAYER_BLUR",color:Nt(),radius:W(y.blur.radius),spread:0,offset:{x:0,y:0},visible:!0}),{fills:v,strokes:g,effects:I,opacity:y.contextSettings?.opacity??1,dashPattern:y.borderOptions?.dashPattern||[],strokeCap:["NONE","ROUND","SQUARE"][y.borderOptions?.lineCapStyle]||"NONE",strokeJoin:["MITER","ROUND","BEVEL"][y.borderOptions?.lineJoinStyle]||"MITER"}}function f(d={}){let m=d.MSAttributedStringFontAttribute?.attributes||{},h=m.name||"ArialMT",y=d.paragraphStyle||{};return{fontFamily:/^Arial(?:MT|-)/.test(h)?"Arial":h.replace(/[-_](Regular|Medium|Semibold|Bold|Light|Heavy|Italic|Black).*$/i,"").replace(/^(PingFang)(SC|TC|HK)/,"$1 $2"),fontWeight:us(h),italic:/italic|oblique/i.test(h),fontSize:W(m.size,14),fills:d.MSAttributedStringColorAttribute?[mn(pi(d.MSAttributedStringColorAttribute))]:void 0,letterSpacing:W(d.kerning),lineHeight:y.maximumLineHeight||y.minimumLineHeight||null,textDecoration:d.underlineStyle?"UNDERLINE":d.strikethroughStyle?"STRIKETHROUGH":"NONE"}}function p(d,m,h=0,y=1,v=1,g=[]){if(h>128)throw new Error("\u56FE\u5C42\u5D4C\u5957\u8FC7\u6DF1\u3002");if(d._class==="slice")return;let I=d.frame||{},S=W(I.width)*y,E=W(I.height)*v,T={page:"CANVAS",artboard:"FRAME",symbolMaster:"FRAME",group:"GROUP",shapeGroup:"GROUP",rectangle:"RECTANGLE",oval:"ELLIPSE",text:"TEXT",bitmap:"RECTANGLE",shapePath:"VECTOR",triangle:"VECTOR",star:"VECTOR",polygon:"VECTOR",symbolInstance:"GROUP"}[d._class];T||(T=d.layers?"GROUP":"RECTANGLE",t.add("sketch-node","\u90E8\u5206 Sketch \u56FE\u5C42\u6309\u57FA\u7840\u56FE\u5F62\u6216\u5206\u7EC4\u8F6C\u6362\u3002",d.name));let C={name:d.name||d._class,x:W(I.x)*y,y:W(I.y)*v,width:S,height:E,rotation:-W(d.rotation),flipX:!!d.isFlippedHorizontal,flipY:!!d.isFlippedVertical,visible:d.isVisible!==!1,locked:!!d.isLocked,isMask:!!d.hasClippingMask,clipsContent:d._class==="artboard",...c(d,S,E)};if(d._class==="group"&&(C.fills=[]),d.hasBackgroundColor&&(C.fills=[mn(pi(d.backgroundColor))]),T==="RECTANGLE"&&(C.cornerRadius=W(d.fixedRadius||d.points?.[0]?.cornerRadius)*y,d._class==="bitmap")){let L=s.get(d.image?._ref);L?C.fills=[{...mn(Nt(1,1,1)),type:"IMAGE",imageHash:L,imageScaleMode:"FILL"}]:t.add("missing-image","\u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",d.name)}if(T==="VECTOR"){let L=zC(d,S,E);L&&Object.assign(C,fi(L,d.style?.windingRule===0?"NONZERO":"EVENODD"))}if(T==="TEXT"){let L=d.attributedString||{},A=d.style?.textStyle?.encodedAttributes||L.attributes?.[0]?.attributes||{},N=f(A);N.fills||delete N.fills,Object.assign(C,N,{text:L.string||"",textAutoResize:d.textBehaviour===0?"WIDTH_AND_HEIGHT":d.textBehaviour===1?"HEIGHT":"NONE",textAlignHorizontal:["LEFT","RIGHT","CENTER","JUSTIFIED"][A.paragraphStyle?.alignment]||"LEFT",fontPostscript:A.MSAttributedStringFontAttribute?.attributes?.name}),C.fontSize*=v,C.letterSpacing*=y,C.lineHeight&&(C.lineHeight*=v),C.styleRuns=(L.attributes||[]).map(b=>({start:W(b.location),length:W(b.length),style:f(b.attributes)})),C.styleRuns.forEach(b=>{b.style.fontSize*=v,b.style.letterSpacing*=y,b.style.lineHeight&&(b.style.lineHeight*=v)})}let x=os(o,T,m,C);(d._class==="symbolMaster"||d._class==="symbolInstance")&&t.add("sketch-symbol","Sketch \u7B26\u53F7\u8F6C\u6362\u4E3A\u53EF\u7F16\u8F91\u56FE\u5C42\uFF0C\u7B26\u53F7\u5173\u8054\u4E0D\u4FDD\u7559\u3002",d.name),d._class==="shapeGroup"&&t.add("sketch-boolean","Sketch \u5E03\u5C14\u7EC4\u5408\u4FDD\u7559\u4E3A\u53EF\u7F16\u8F91\u5B50\u56FE\u5C42\uFF0C\u9700\u8981\u68C0\u67E5\u76F8\u51CF\u548C\u76F8\u4EA4\u6548\u679C\u3002",d.name),d.flow?.destinationArtboardID&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",d.name);let D=d.layers||[],M=y,V=v;if(d._class==="symbolInstance"){let N=function(b){for(let R of A)R.overrideName?.startsWith(b.do_objectID+"_")&&(R.overrideName.endsWith("_stringValue")&&b.attributedString&&(b.attributedString.string=String(R.value)),R.overrideName.endsWith("_image")&&(b.image=R.value),R.overrideName.endsWith("_symbolID")&&(b.symbolID=R.value));(b.layers||[]).forEach(N)};if(g.includes(d.symbolID)){t.add("symbol-cycle","\u5FAA\u73AF\u7B26\u53F7\u5F15\u7528\u5DF2\u505C\u6B62\u5C55\u5F00\u3002",d.name);return}let L=a.get(d.symbolID);if(!L){t.add("missing-symbol","\u90E8\u5206\u7B26\u53F7\u5B9A\u4E49\u672A\u5305\u542B\u5728\u6587\u4EF6\u4E2D\uFF0C\u65E0\u6CD5\u5C55\u5F00\u3002",d.name);return}D=structuredClone(L.layers||[]);let A=d.overrideValues||[];D.forEach(N),M=S/(L.frame?.width||S||1),V=E/(L.frame?.height||E||1),g=[...g,d.symbolID]}D.forEach(L=>p(L,x.id,h+1,M,V,g))}return i.forEach(d=>p(d,o.rootId)),{graph:o,thumbnail:n["previews/preview.png"]}}function Yy(e,t){return{_class:t,do_objectID:Fe(),booleanOperation:-1,isFixedToViewport:!1,isFlippedHorizontal:!!e.flipX,isFlippedVertical:!!e.flipY,isLocked:e.locked,isVisible:e.visible,layerListExpandedType:1,name:e.name,nameIsFixed:!0,resizingConstraint:63,resizingType:0,rotation:-e.rotation,shouldBreakMaskChain:!1,exportOptions:{_class:"exportOptions",includedLayerIds:[],layerOptions:0,shouldTrim:!1,exportFormats:[]},frame:{_class:"rect",constrainProportions:!1,height:e.height,width:e.width,x:e.x,y:e.y},clippingMaskMode:0,hasClippingMask:!!e.isMask}}function mc(e,t,n,r){let i=hi([e/(n||1),t/(r||1)]);return{_class:"curvePoint",cornerRadius:0,curveFrom:i,curveTo:i,point:i,hasCurveFrom:!1,hasCurveTo:!1,curveMode:1}}function HC(e,t){let n=as(t),r=[],i;for(let o of n)if(o.type==="M")i={points:[mc(o.x,o.y,e.width,e.height)],isClosed:!1},r.push(i);else if(o.type==="Z")i&&(i.isClosed=!0);else if(i){let s=o;if(o.type==="Q"){let l=pn(i.points.at(-1).point).map((u,c)=>u*(c?e.height:e.width));s={type:"C",x:o.x,y:o.y,x1:l[0]+2/3*(o.x1-l[0]),y1:l[1]+2/3*(o.y1-l[1]),x2:o.x+2/3*(o.x1-o.x),y2:o.y+2/3*(o.y1-o.y)}}let a=mc(s.x,s.y,e.width,e.height);s.type==="C"&&(Object.assign(i.points.at(-1),{hasCurveFrom:!0,curveMode:4,curveFrom:hi([s.x1/(e.width||1),s.y1/(e.height||1)])}),Object.assign(a,{hasCurveTo:!0,curveMode:4,curveTo:hi([s.x2/(e.width||1),s.y2/(e.height||1)])})),i.points.push(a)}return r.map(o=>({...Yy({...e,x:0,y:0,rotation:0,flipX:!1,flipY:!1},"shapePath"),...o,edited:!0,pointRadiusBehaviour:1}))}function qy(e,t,n,r){let i={},o=new Map;for(let[d,m]of e.images){let h=`images/${d}.${fy(m)}`;i[h]=[m,{level:0}],o.set(d,{_class:"MSJSONFileReference",_ref_class:"MSImageData",_ref:h})}function s(d,m=!1){let h=d.gradientTransform?tr(d.gradientTransform,{x:0,y:.5}):{x:0,y:.5},y=d.gradientTransform?tr(d.gradientTransform,{x:1,y:.5}):{x:1,y:.5};return{_class:m?"border":"fill",isEnabled:d.visible,fillType:d.type==="IMAGE"?4:d.type.startsWith("GRADIENT")?1:0,color:mi(d.color),contextSettings:{_class:"graphicsContextSettings",opacity:d.opacity,blendMode:0},gradient:{_class:"gradient",elipseLength:1,from:hi([h.x,h.y]),to:hi([y.x,y.y]),gradientType:d.type==="GRADIENT_RADIAL"?1:0,stops:(d.gradientStops||[]).map(v=>({_class:"gradientStop",color:mi(v.color),position:v.position}))},image:o.get(d.imageHash),patternFillType:d.imageScaleMode==="FIT"?2:d.imageScaleMode==="TILE"?0:1,patternTileScale:1,noiseIndex:0,noiseIntensity:0,...m?{thickness:d.weight,position:{CENTER:0,INSIDE:1,OUTSIDE:2}[d.align]||0}:{}}}function a(d){let m=h=>({_class:h.type==="INNER_SHADOW"?"innerShadow":"shadow",isEnabled:h.visible,blurRadius:h.radius,spread:h.spread,offsetX:h.offset.x,offsetY:h.offset.y,color:mi(h.color),contextSettings:{_class:"graphicsContextSettings",opacity:1,blendMode:0}});return{_class:"style",do_objectID:Fe(),endMarkerType:0,startMarkerType:0,miterLimit:10,windingRule:1,fills:d.fills.map(h=>s(h)),borders:d.strokes.map(h=>s(h,!0)),shadows:d.effects.filter(h=>h.type==="DROP_SHADOW").map(m),innerShadows:d.effects.filter(h=>h.type==="INNER_SHADOW").map(m),contextSettings:{_class:"graphicsContextSettings",opacity:d.opacity,blendMode:0},borderOptions:{_class:"borderOptions",isEnabled:!0,dashPattern:d.dashPattern,lineCapStyle:{NONE:0,ROUND:1,SQUARE:2}[d.strokeCap]||0,lineJoinStyle:{MITER:0,ROUND:1,BEVEL:2}[d.strokeJoin]||0}}}let l=d=>({MSAttributedStringFontAttribute:{_class:"fontDescriptor",attributes:{name:d.fontPostscript||(d.fontFamily==="Arial"?d.fontWeight>=700?"Arial-BoldMT":"ArialMT":`${d.fontFamily.replace(/\s+/g,"")}-${cs(d.fontWeight,d.italic).replace(/\s+/g,"")}`),size:d.fontSize}},MSAttributedStringColorAttribute:mi(d.fills.find(m=>m.visible)?.color||Nt()),kerning:d.letterSpacing||0,paragraphStyle:{_class:"paragraphStyle",alignment:{LEFT:0,RIGHT:1,CENTER:2,JUSTIFIED:3}[d.textAlignHorizontal]||0,...d.lineHeight?{minimumLineHeight:d.lineHeight,maximumLineHeight:d.lineHeight}:{}},underlineStyle:d.textDecoration==="UNDERLINE"?1:0,strikethroughStyle:d.textDecoration==="STRIKETHROUGH"?1:0});function u(d){let m={CANVAS:"page",FRAME:"artboard",RECTANGLE:"rectangle",ROUNDED_RECTANGLE:"rectangle",ELLIPSE:"oval",TEXT:"text",LINE:"shapePath",VECTOR:"shapeGroup",STAR:"shapeGroup",POLYGON:"shapeGroup",BOOLEAN_OPERATION:"group",GROUP:"group",COMPONENT:"group",INSTANCE:"group",COMPONENT_SET:"group",SECTION:"group"}[d.type]||"group";m==="artboard"&&e.getNode(d.parentId)?.type!=="CANVAS"&&(m="group");let h={...Yy(d,m),style:a(d)};if(m==="text"){let y=d.styleRuns.length?d.styleRuns.map(v=>({_class:"stringAttribute",location:v.start,length:v.length,attributes:l({...d,...v.style})})):[{_class:"stringAttribute",location:0,length:d.text.length,attributes:l(d)}];h.attributedString={_class:"attributedString",string:d.text,attributes:y},h.style.textStyle={_class:"textStyle",encodedAttributes:l(d),verticalAlignment:{TOP:0,CENTER:1,BOTTOM:2}[d.textAlignVertical]||0},h.textBehaviour=d.textAutoResize==="WIDTH_AND_HEIGHT"?0:d.textAutoResize==="HEIGHT"?1:2,h.automaticallyDrawOnUnderlyingPath=!1,h.dontSynchroniseWithSymbol=!1,h.lineSpacingBehaviour=2,h.glyphBounds="{{0, 0}, {0, 0}}"}else if(m==="rectangle")h.fixedRadius=d.cornerRadius,h.points=[[0,0],[1,0],[1,1],[0,1]].map(([y,v],g)=>({...mc(y*d.width,v*d.height,d.width,d.height),cornerRadius:d.independentCorners?[d.topLeftRadius,d.topRightRadius,d.bottomRightRadius,d.bottomLeftRadius][g]:d.cornerRadius})),h.isClosed=!0,h.edited=!1,h.pointRadiusBehaviour=1;else if(m==="oval")h.isClosed=!0,h.edited=!1;else if(m==="shapePath"||m==="shapeGroup"){let y=d.type==="LINE"?`M0 0 L${d.width} ${d.height}`:di(d),v=HC(d,y);v.length||r.add("vector-empty","\u90E8\u5206\u77E2\u91CF\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u8F6E\u5ED3\u3002",d.name),h._class="shapeGroup",h.layers=v,h.windingRule=1}if(["group","artboard","page"].includes(m)){if(h.layers=e.getChildren(d.id).map(u),m==="group"&&d.fills.some(y=>y.visible)&&(h.layers.unshift(u({...d,type:"RECTANGLE",name:`${d.name} \u80CC\u666F`,x:0,y:0,rotation:0,flipX:!1,flipY:!1,strokes:[],effects:[],opacity:1})),h.style.fills=[]),h.hasClickThrough=!0,h.groupLayout={_class:"MSImmutableFreeformGroupLayout"},m==="artboard"){let y=d.fills.filter(g=>g.visible),v=y.length===1&&y[0].type==="SOLID"?y[0]:null;Object.assign(h,{hasBackgroundColor:!!v,backgroundColor:mi(v?{...v.color,a:v.color.a*v.opacity}:Nt(1,1,1)),includeBackgroundColorInExport:!0,resizesContent:!1}),h.style.fills=[],!v&&y.length&&h.layers.unshift(u({...d,type:"RECTANGLE",name:`${d.name} \u80CC\u666F`,x:0,y:0,rotation:0,flipX:!1,flipY:!1,strokes:[],effects:[],opacity:1}))}m==="page"&&Object.assign(h,{horizontalRulerData:{_class:"rulerData",base:0,guides:[]},verticalRulerData:{_class:"rulerData",base:0,guides:[]}})}return h}let c=e.getPages().map(u),f={};for(let d of c)i[`pages/${d.do_objectID}.json`]=Me(JSON.stringify(d)),f[d.do_objectID]={name:d.name,artboards:Object.fromEntries(d.layers.filter(m=>m._class==="artboard").map(m=>[m.do_objectID,{name:m.name}]))};let p={_class:"document",do_objectID:Fe(),assets:{_class:"assetCollection",colors:[],gradients:[],images:[],colorAssets:[],gradientAssets:[]},colorSpace:0,currentPageIndex:0,foreignLayerStyles:[],foreignSymbols:[],foreignTextStyles:[],layerStyles:{_class:"sharedStyleContainer",objects:[]},layerTextStyles:{_class:"sharedTextStyleContainer",objects:[]},pages:c.map(d=>({_class:"MSJSONFileReference",_ref_class:"MSImmutablePage",_ref:`pages/${d.do_objectID}`}))};return i["document.json"]=Me(JSON.stringify(p)),i["meta.json"]=Me(JSON.stringify({version:136,compatibilityVersion:99,app:"com.bohemiancoding.sketch3",variant:"NONAPPSTORE",appVersion:"97",build:1,pagesAndArtboards:f,fonts:[...new Set([...e.nodes.values()].filter(d=>d.type==="TEXT").map(d=>d.fontFamily))]})),i["user.json"]=Me("{}"),n&&(i["previews/preview.png"]=[n,{level:0}]),vn(i)}var yc=vs(Si(),1);function hc(e={}){return typeof e.value=="number"?Nt((e.value>>>16&255)/255,(e.value>>>8&255)/255,(e.value&255)/255,(e.value>>>24)/255):Nt((e.value?.r??e.r??0)/255,(e.value?.g??e.g??0)/255,(e.value?.b??e.b??0)/255,e.alpha??1)}var gc=e=>({mode:"RGB",value:{r:Math.round(e.r*255),g:Math.round(e.g*255),b:Math.round(e.b*255)},alpha:e.a}),WC=e=>e.children||e.artboard?.children||e.group?.children||[];async function Jy(e,t){let n=Qn(e),r=er(n,"manifest");if(!String(r.type||"").includes("sparkler"))throw new Error("\u4E0D\u662F\u53D7\u652F\u6301\u7684 Adobe XD \u8BBE\u8BA1\u6587\u4EF6\u3002");let i=Object.entries(n).filter(([m])=>m.endsWith("graphicContent.agc")).map(([m,h])=>({path:m,data:JSON.parse(new TextDecoder().decode(h))})),o=i.find(m=>m.path==="resources/graphics/graphicContent.agc")?.data||{},s=is(),a=s.addPage(r.name||"XD \u8BBE\u8BA1"),l=new Map;for(let[m,h]of Object.entries(n))/^resources\/[^/]+$/.test(m)&&h.length&&l.set(m.slice(10),await ss(s,h));let u=new Map;function c(m,h=0){if(!(!m||typeof m!="object"||h>128)){if(m.type&&m.type!=="syncRef")for(let y of[m.id,m.guid,m.syncSourceGuid,m.meta?.ux?.symbolId])y&&!u.has(y)&&u.set(y,m);for(let y of Object.values(m))y&&typeof y=="object"&&c(y,h+1)}}i.forEach(m=>c(m.data));function f(m,h,y,v){if(!m||m.type==="none")return[];let g=mn(hc(m.color),m.opacity??1);if(m.type==="pattern"){let I=m.pattern||{},S=l.get(I.meta?.ux?.uid||I.uid||I.href?.replace(/^.*\//,""));if(!S)return t.add("missing-image","XD \u6587\u4EF6\u4E2D\u7684\u90E8\u5206\u56FE\u7247\u8D44\u6E90\u7F3A\u5931\u3002",h),[];g={...g,type:"IMAGE",imageHash:S,imageScaleMode:I.meta?.ux?.scaleBehavior==="fit"?"FIT":"FILL"}}else if(m.type==="gradient"){let I=m.gradient?.ref?o.resources?.gradients?.[m.gradient.ref]:m.gradient||m,S=I.from||{x:I.x1??0,y:I.y1??0},E=I.to||{x:I.x2??1,y:I.y2??0};g={...g,type:"GRADIENT_LINEAR",gradientStops:(I.stops||[]).map(T=>({color:hc(T.color),position:T.offset??T.position??0})),gradientTransform:gs(S,E,y||1,v||1)},I.type&&!["linear","linearGradient"].includes(I.type)&&t.add("xd-gradient","\u90E8\u5206 XD \u6E10\u53D8\u6309\u7EBF\u6027\u6E10\u53D8\u8F6C\u6362\u3002",h)}return[g]}function p(m,h,y={x:0,y:0},v=0,g=[]){if(v>128)throw new Error("XD \u56FE\u5C42\u5D4C\u5957\u8FC7\u6DF1\u3002");if(m.type==="syncRef"){let O=m.ref||m.syncSourceGuid;if(g.includes(O)){t.add("xd-symbol-cycle","\u5FAA\u73AF\u7EC4\u4EF6\u5F15\u7528\u5DF2\u505C\u6B62\u5C55\u5F00\u3002");return}let k=u.get(O);if(!k){t.add("missing-symbol","\u90E8\u5206 XD \u7EC4\u4EF6\u5B9A\u4E49\u7F3A\u5931\uFF0C\u65E0\u6CD5\u5C55\u5F00\u3002",m.name);return}m={...structuredClone(k),...m,type:k.type,group:m.group||k.group,artboard:m.artboard||k.artboard},g=[...g,O],t.add("xd-component","XD \u7EC4\u4EF6\u6309\u5F53\u524D\u5916\u89C2\u5C55\u5F00\u4E3A\u53EF\u7F16\u8F91\u56FE\u5C42\uFF0C\u7EC4\u4EF6\u72B6\u6001\u4E0D\u4FDD\u7559\u3002",m.name)}let I=m.shape||{},S=m.text||{},E=o.artboards?.[m.artboard?.ref||m.id]||{},T=m.type==="artboard"?"FRAME":m.type==="text"?"TEXT":m.type==="group"?"GROUP":"RECTANGLE",C=W(I.width??E.width??m.width??m.meta?.ux?.width),x=W(I.height??E.height??m.height??m.meta?.ux?.height),D=W(I.x),M=W(I.y),V="";if(["circle","ellipse"].includes(I.type)&&(T="ELLIPSE",C=2*W(I.rx??I.r),x=2*W(I.ry??I.r),D=W(I.cx)-C/2,M=W(I.cy)-x/2),["path","compound","polygon","line"].includes(I.type)&&(T="VECTOR",V=I.path||(I.type==="line"?`M${I.x1||0} ${I.y1||0} L${I.x2||0} ${I.y2||0}`:I.points?.length?`M${I.points.map(O=>`${O.x} ${O.y}`).join(" L")} Z`:""),V)){let O=dy(V);C=O.width,x=O.height,D=O.x,M=O.y,V=(0,yc.default)(V).translate(-D,-M).toString()}let L=m.style||{},A=L.font||{};if(T==="TEXT"){let O=(S.paragraphs||[]).flatMap(X=>X.lines||[]).flat(),k=W(A.size,14),U=O[0]||{};D=W(U.x),M=W(U.y)-k*.8,C=W(S.frame?.width,Math.max(1,...String(S.rawText||"").split(`
`).map(X=>X.length*k*.6))),x=W(S.frame?.height,Math.max(1,(S.paragraphs||[]).flatMap(X=>X.lines||[]).length)*k*1.2)}let N={a:1,b:0,c:0,d:1,tx:0,ty:0,...m.transform};N.tx+=N.a*D+N.c*M-y.x,N.ty+=N.b*D+N.d*M-y.y;let b={name:m.name||E.name||m.type,...qu(N,C,x,t,m.name),fills:f(L.fill,m.name,C,x),strokes:f(L.stroke,m.name,C,x).map(O=>({...O,weight:W(L.stroke.width,1),align:String(L.stroke.align||"center").toUpperCase()})),visible:m.visible!==!1,opacity:m.opacity??1,locked:!!m.meta?.ux?.locked,clipsContent:m.type==="artboard"};m.type==="artboard"&&Object.assign(b,{x:W(E.x),y:W(E.y),width:C,height:x}),V&&Object.assign(b,fi((0,yc.default)(V).scale(C?b.width/C:1,x?b.height/x:1).toString())),I.r&&(b.cornerRadius=W(Array.isArray(I.r)?I.r[0]:I.r)),T==="TEXT"&&Object.assign(b,{text:S.rawText||"",fontFamily:A.family||"Arial",fontWeight:us(A.style),italic:/italic|oblique/i.test(A.style||""),fontSize:W(A.size,14),textAutoResize:"NONE",textAlignHorizontal:String(L.textAttributes?.textAlign||S.textAlign||"left").toUpperCase(),lineHeight:L.textAttributes?.lineHeight||null,letterSpacing:W(L.textAttributes?.letterSpacing)}),b.effects=(L.filters||L.effects||[]).filter(O=>O.visible!==!1).map(O=>({type:O.type==="dropShadow"?"DROP_SHADOW":O.type==="uxdesign#innerShadow"?"INNER_SHADOW":O.params?.backgroundEffect?"BACKGROUND_BLUR":"LAYER_BLUR",color:hc(O.params?.color),radius:W(O.params?.blurAmount??O.params?.r),spread:W(O.params?.spread),offset:{x:W(O.params?.dx),y:W(O.params?.dy)},visible:!0}));let R=os(s,T,h,b);["artboard","group","shape","text"].includes(m.type)||t.add("xd-node","\u90E8\u5206 XD \u4E13\u5C5E\u56FE\u5C42\u6309\u57FA\u7840\u56FE\u5F62\u8F6C\u6362\u3002",m.name),m.meta?.ux?.interactions?.length&&t.add("prototype","\u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002",m.name);let _=WC(m);if(_.forEach(O=>p(O,R.id,m.type==="artboard"?{x:E.x||0,y:E.y||0}:{x:0,y:0},v+1,g)),T==="GROUP"&&_.length){R.width=Math.max(0,...s.getChildren(R.id).map(U=>U.x+U.width)),R.height=Math.max(0,...s.getChildren(R.id).map(U=>U.y+U.height));let O=Math.hypot(N.a,N.b)||1,k=Math.abs(N.a*N.d-N.b*N.c)/O;(Math.abs(O-1)>.001||Math.abs(k-1)>.001)&&s.getChildren(R.id).forEach(U=>Ju(s,U,O,k,t)),Object.assign(R,qu(N,R.width,R.height,t,m.name))}}if(i.filter(m=>m.path.startsWith("artwork/")).forEach(m=>(m.data.children||[]).forEach(h=>p(h,a.id))),!s.getChildren(a.id).length)throw new Error("XD \u6587\u4EF6\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u753B\u677F\u6216\u56FE\u5C42\u3002");let d=er(n,"interactions/interactions.json",{});return Object.keys(d).some(m=>d[m]&&Object.keys(d[m]).length)&&t.add("prototype","XD \u539F\u578B\u4EA4\u4E92\u6682\u4E0D\u53C2\u4E0E\u683C\u5F0F\u8F6C\u6362\u3002"),{graph:s,thumbnail:n["preview.png"]||n["thumbnail.png"]}}function Zy(e,t,n,r){n||(n=hn);let i={mimetype:[Me("application/vnd.adobe.sparkler.project+dcxucf"),{level:0}]},o=Fe(),s={},a=[],l=[],u=(g,I,S="primary",E={})=>({rel:S,type:I,id:Fe(),state:"unmodified",name:g,path:g,...E}),c=(g,I=[],S=[],E={})=>({id:Fe(),name:g,path:g,children:I,components:S,...E});for(let[g,I]of e.images)i[`resources/${g}`]=[I,{level:0}],l.push(u(g,I[0]===137?"image/png":I[0]===255?"image/jpeg":"application/octet-stream"));function f(g,I){if(!g)return{type:"none"};if(g.type==="IMAGE"){let S=e.images.get(g.imageHash),E=S?.[0]===137&&S.length>24?new DataView(S.buffer,S.byteOffset,S.byteLength):null;return{type:"pattern",pattern:{width:E?.getUint32(16)||I.width,height:E?.getUint32(20)||I.height,href:"",meta:{ux:{scaleBehavior:g.imageScaleMode==="FIT"?"fit":"fill",uid:g.imageHash}}},opacity:g.opacity}}if(g.type.startsWith("GRADIENT")){let S=g.gradientTransform?tr(g.gradientTransform,{x:0,y:.5}):{x:0,y:0},E=g.gradientTransform?tr(g.gradientTransform,{x:1,y:.5}):{x:1,y:0};return{type:"gradient",gradient:{type:"linear",x1:S.x,y1:S.y,x2:E.x,y2:E.y,stops:(g.gradientStops||[]).map(T=>({offset:T.position,color:gc(T.color)}))},opacity:g.opacity}}return{type:"solid",color:gc({...g.color,a:g.color.a*g.opacity})}}function p(g,I=0,S=0){let E=Fe(),T=ls(g);T.tx+=I,T.ty+=S;let C=g.fills.filter(M=>M.visible).at(-1),x=g.strokes.filter(M=>M.visible).at(-1),D={type:"shape",name:g.name,id:E,transform:T,visible:g.visible,opacity:g.opacity,meta:{ux:{hasCustomName:!0}},style:{fill:f(C,g),stroke:x?{...f(x,g),width:x.weight,align:x.align.toLowerCase()}:{type:"none"}}};if(D.style.filters=g.effects.filter(M=>M.visible).map(M=>({type:M.type==="DROP_SHADOW"?"dropShadow":M.type==="INNER_SHADOW"?"uxdesign#innerShadow":"uxdesign#blur",visible:!0,params:{color:gc(M.color),dx:M.offset.x,dy:M.offset.y,r:M.radius,blurAmount:M.radius,spread:M.spread,backgroundEffect:M.type==="BACKGROUND_BLUR"}})),g.type==="TEXT"){D.type="text";let M=cs(g.fontWeight,g.italic);D.style.font={family:g.fontFamily,style:M,postscriptName:`${g.fontFamily.replace(/\s+/g,"")}-${M.replace(/\s+/g,"")}`,size:g.fontSize},D.style.textAttributes={textAlign:g.textAlignHorizontal.toLowerCase(),paragraphAfterSpacing:g.paragraphSpacing,lineHeight:g.lineHeight||g.fontSize*1.2};let V=0;D.text={frame:{type:"positioned"},rawText:g.text,paragraphs:g.text.split(`
`).map((A,N)=>{let b=V;return V+=A.length+1,{lines:[[{from:b,to:b+A.length,x:0,y:g.fontSize*.8+N*(g.lineHeight||g.fontSize*1.2)}]]}})},g.styleRuns.some(A=>Object.entries(A.style).some(([N,b])=>b!==void 0&&JSON.stringify(b)!==JSON.stringify(g[N])))&&r.add("xd-text-runs","XD \u5BFC\u51FA\u6682\u4F7F\u7528\u6BCF\u4E2A\u6587\u5B57\u56FE\u5C42\u7684\u57FA\u7840\u6837\u5F0F\uFF0C\u6DF7\u6392\u6837\u5F0F\u9700\u8981\u68C0\u67E5\u3002",g.name)}else if(["ELLIPSE"].includes(g.type))D.shape={type:"ellipse",cx:g.width/2,cy:g.height/2,rx:g.width/2,ry:g.height/2};else if(["RECTANGLE","ROUNDED_RECTANGLE"].includes(g.type))D.shape={type:"rect",x:0,y:0,width:g.width,height:g.height,r:g.independentCorners?[g.topLeftRadius,g.topRightRadius,g.bottomRightRadius,g.bottomLeftRadius]:Array(4).fill(g.cornerRadius)};else if(g.type==="LINE")D.shape={type:"line",x1:0,y1:0,x2:g.width,y2:g.height};else if(["VECTOR","STAR","POLYGON"].includes(g.type)){let M=di(g);D.shape={type:"path",path:M},M||r.add("vector-empty","\u90E8\u5206\u77E2\u91CF\u6CA1\u6709\u53EF\u8BFB\u53D6\u7684\u8F6E\u5ED3\u3002",g.name)}else D.type="group",D.group={children:e.getChildren(g.id).map(M=>p(M))},D.meta.ux.width=g.width,D.meta.ux.height=g.height,g.fills.length&&D.group.children.unshift({...p({...g,type:"RECTANGLE",name:`${g.name} \u80CC\u666F`,x:0,y:0,rotation:0,opacity:1,strokes:[],effects:[]}),transform:{a:1,b:0,c:0,d:1,tx:0,ty:0}});return D}let d=e.getPages();d.length>1&&r.add("xd-pages","XD \u4E0D\u652F\u6301\u591A\u9875\uFF0C\u9875\u9762\u5DF2\u5408\u5E76\u5230\u540C\u4E00\u753B\u5E03\u5E76\u5206\u533A\u6392\u653E\u3002");let m=0;for(let g of d){let I=e.getChildren(g.id),S=I.filter(x=>x.type==="FRAME"||x.type==="COMPONENT"),E=I.filter(x=>!S.includes(x)),T=[...S.map(x=>({node:x,children:e.getChildren(x.id)})),...E.length?[{node:{...g,name:`${g.name} / \u753B\u5E03`,x:0,y:0,width:Math.max(1,...E.map(x=>x.x+x.width)),height:Math.max(1,...E.map(x=>x.y+x.height))},children:E}]:[]],C=0;for(let{node:x,children:D}of T){let M=Fe(),V=x.x+m,L=x.y;s[M]={width:x.width||1,height:x.height||1,name:x.name,x:V,y:L},C=Math.max(C,x.x+x.width);let A={version:"1.5.0",children:[{type:"artboard",id:M,meta:{ux:{hasCustomName:!0}},style:{fill:f(x.fills.filter(b=>b.visible).at(-1),x)},artboard:{children:D.map(b=>p(b,V,L)),ref:M,meta:{ux:{path:M}}}}],resources:{href:"/resources/graphics/graphicContent.agc"},artboards:{href:"/resources/graphics/graphicContent.agc"}},N=`artboard-${M}`;i[`artwork/${N}/graphics/graphicContent.agc`]=Me(JSON.stringify(A)),a.push(c(N,[c("graphics",[],[u("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])],[],{"uxdesign#bounds":s[M]}))}m+=C+300}i["resources/graphics/graphicContent.agc"]=Me(JSON.stringify({version:"1.5.0",children:[],resources:{gradients:{},clipPaths:{},meta:{ux:{symbols:[],symbolsMetadata:{usingNestedSymbolSyncing:!0},colorSwatches:[],documentLibrary:{version:5,isStickerSheet:!1,hashedMetadata:{publishedDocLibId:null},elements:[],groupData:{groups:[]}},gridDefaults:{defaultGrid:null,layoutOverrides:null},colorProfile:"srgb"}}},artboards:s})),i["artwork/pasteboard/graphics/graphicContent.agc"]=Me(JSON.stringify({version:"1.5.0",children:[],resources:{href:"/resources/graphics/graphicContent.agc"},artboards:{href:"/resources/graphics/graphicContent.agc"}})),a.unshift(c("pasteboard",[c("graphics",[],[u("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])])),i["interactions/interactions.json"]=Me('{"version":"0.24"}'),i["sharing/sharing.json"]=Me('{"version":"0.3","selectedLink":-1}');let h=Fe(),y=new Date().toISOString();i["META-INF/metadata.xml"]=Me(`<?xml version="1.0" encoding="UTF-8"?><x:xmpmeta xmlns:x="adobe:ns:meta/"><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"><rdf:Description rdf:about="" xmlns:xmp="http://ns.adobe.com/xap/1.0/" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:xmpMM="http://ns.adobe.com/xap/1.0/mm/" xmp:CreatorTool="Orbit" xmp:CreateDate="${y}" xmp:ModifyDate="${y}" dc:format="application/vnd.adobe.sparkler.project+dcx" xmpMM:DocumentID="${o}" xmpMM:InstanceID="${Fe()}"/></rdf:RDF></x:xmpmeta>`);let v=[u("META-INF/metadata.xml","application/rdf+xml","metadata")];if(n){i["thumbnail.png"]=[n,{level:0}],i["preview.png"]=[n,{level:0}];let g=new DataView(n.buffer,n.byteOffset,n.byteLength),I={width:g.getUint32(16),height:g.getUint32(20)};v.push(u("thumbnail.png","image/png","thumbnail",I),u("preview.png","image/png","preview",I))}return i.manifest=Me(JSON.stringify({state:"unmodified","manifest-format-version":6,name:t,"uxdesign#applicationVersion":"57.1.12.2",type:"application/vnd.adobe.sparkler.project+dcx","uxdesign#serializationId":Fe(),"uxdesign#id":h,"uxdesign#parentDocId":h,id:o,"uxdesign#compositeID":o,"uxdesign#version":"2.33",components:v,children:[c("artwork",a),c("resources",[c("graphics",[],[u("graphicContent.agc","application/vnd.adobe.agc.graphicsTree+json")])],l),c("interactions",[],[u("interactions.json","application/vnd.adobe.uxdesign.interactions+json")]),c("sharing",[],[u("sharing.json","application/vnd.adobe.uxdesign.sharing+json")])]})),vn(i)}var Qy={fig:"Figma",sketch:"Sketch",xd:"Adobe XD"};async function e0(e,t){let n=t.split(".").at(-1).toLowerCase();if(!Qy[n])throw new Error("\u8BF7\u9009\u62E9 .fig\u3001.sketch \u6216 .xd \u6587\u4EF6\u3002");if(!e.length)throw new Error("\u6587\u4EF6\u4E3A\u7A7A\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\u3002");let r=Yu(),i=await{fig:Xy,sketch:Ky,xd:Jy}[n](e,r),o=i.thumbnail?.[0]===137?i.thumbnail:hn;return{...i,thumbnail:o,source:n,filename:t,issues:r.list(),stats:cy(i.graph)}}async function t0(e,t){if(!Qy[t]||t===e.source)throw new Error("\u8BF7\u9009\u62E9\u4E0D\u540C\u4E8E\u539F\u6587\u4EF6\u7684\u76EE\u6807\u683C\u5F0F\u3002");let n=Yu();for(let o of e.issues)for(let s=0;s<o.count;s++)n.add(o.code,o.message,o.examples[s%(o.examples.length||1)]);py(e.graph,t,n);let r=e.filename.replace(/\.(fig|xd|sketch)$/i,"");return{bytes:await{fig:jy,sketch:qy,xd:Zy}[t](e.graph,r,e.thumbnail,n),filename:`${r}.${t}`,source:e.source,target:t,stats:e.stats,issues:n.list()}}var Xt=null;self.onmessage=async({data:e})=>{try{if(e.type==="read"){Xt=null,self.postMessage({type:"progress",message:"\u6B63\u5728\u89E3\u6790\u9875\u9762\u3001\u56FE\u5C42\u4E0E\u56FE\u7247\u8D44\u6E90\u2026"}),Xt=await e0(new Uint8Array(e.buffer),e.filename);let t=Xt.thumbnail.slice();self.postMessage({type:"ready",source:Xt.source,stats:Xt.stats,issues:Xt.issues,preview:t},[t.buffer])}else if(e.type==="convert"){if(!Xt)throw new Error("\u8BF7\u5148\u9009\u62E9\u8BBE\u8BA1\u6587\u4EF6\u3002");self.postMessage({type:"progress",message:"\u6B63\u5728\u6620\u5C04\u56FE\u5C42\u5E76\u751F\u6210\u76EE\u6807\u8BBE\u8BA1\u6587\u4EF6\u2026"});let t=await t0(Xt,e.target);self.postMessage({type:"done",...t},[t.bytes.buffer])}}catch(t){self.postMessage({type:"error",message:t.message||"\u8F6C\u6362\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6587\u4EF6\u662F\u5426\u635F\u574F\u6216\u7248\u672C\u662F\u5426\u53D7\u652F\u6301\u3002"})}};})();
