var k=Object.defineProperty;var v=(r,t,e)=>t in r?k(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var o=(r,t,e)=>(v(r,typeof t!="symbol"?t+"":t,e),e);import{s as Z,x as b,i as M,n as y,r as _,o as Y,y as T,e as X}from"../chunks/scheduler.B8wtCbz7.js";import{S as C,i as S,e as G,c as R,a as W,d as x,o as E,g as A,y as g}from"../chunks/index.qEq-rAAa.js";class H{constructor(t,e,s){o(this,"world");o(this,"x");o(this,"y");this.world=t,this.x=e,this.y=s}nearby(){let t=0;for(const e of this.pattern)t+=this.world.getTile(this.x+e.x,this.y+e.y).mines();return t}}class P extends H{constructor(e,s,n){super(e,s,n);o(this,"isMine");o(this,"state","covered");o(this,"pattern",[{x:-1,y:0},{x:-1,y:1},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:1,y:-1},{x:0,y:-1},{x:-1,y:-1}]);this.isMine=this.world.rng.tileRNG(this.x,this.y,0)>.7}mines(){return this.isMine?1:0}flag(){this.state!="revealed"&&(this.state=this.state=="covered"?"flagged":"covered")}reveal(){return this.state="revealed",this.isMine}render(e){this.state=="covered"?(e.fillStyle="gray",e.fillRect(0,0,1,1)):this.state=="flagged"?(e.fillStyle="green",e.fillRect(0,0,1,1)):this.isMine?(e.fillStyle="red",e.fillRect(0,0,1,1)):(e.fillStyle="orange",e.font="1px segoe",e.fillText(`${this.nearby()}`,0,1))}}function z(r,t){return()=>{r|=0,r=r+2654435769|0;let e=r^r>>>16;e=Math.imul(e,569420461),e=e^e>>>15,e=Math.imul(e,1935289751);const s=(e=e^e>>>15)>>>0;return t?s/4294967296:s}}function D(r,t,e,s){return r^=r<<13|r>>>17,r=r*2158630691+3333583613&4294967295,r^=t,r^=r<<13|r>>>17,r=r*2158630691+3333583613&4294967295,r^=e,r^=r<<13|r>>>17,r=r*2158630691+3333583613&4294967295,r^=s,r^=r<<16|r>>>15,r=r*2158630691+3333583613&4294967295,(r>>>0)/4294967295}class L{constructor(t){o(this,"seed");o(this,"seedTile");this.seed=t;const e=z(this.seed,!1);this.seedTile=e()}tileRNG(t,e,s){return D(this.seedTile,t,e,s)}}class N{constructor(t,e){o(this,"world");o(this,"canvas");o(this,"ctx");o(this,"cameraX",0);o(this,"cameraY",0);o(this,"cameraZoom",32);o(this,"cameraMinZoom",4);o(this,"cameraMaxZoom",64);this.world=t,this.canvas=e;const s=this.canvas.getContext("2d");if(!s)throw new Error("This browser or machine does not support canvas 2d.");this.ctx=s}cameraWidth(){return this.canvas.width/this.cameraZoom}cameraHeight(){return this.canvas.height/this.cameraZoom}cameraTranslate(t,e){this.cameraX-=t/this.cameraZoom,this.cameraY-=e/this.cameraZoom}cameraScale(t){const e=this.cameraX+this.cameraWidth()*.5,s=this.cameraY+this.cameraHeight()*.5;this.cameraZoom*=t,this.canvas.width/this.cameraZoom<this.cameraMinZoom&&(this.cameraZoom=this.canvas.width/this.cameraMinZoom),this.canvas.height/this.cameraZoom<this.cameraMinZoom&&(this.cameraZoom=this.canvas.height/this.cameraMinZoom),this.canvas.width/this.cameraZoom>this.cameraMaxZoom&&(this.cameraZoom=this.canvas.width/this.cameraMaxZoom),this.canvas.height/this.cameraZoom>this.cameraMaxZoom&&(this.cameraZoom=this.canvas.height/this.cameraMaxZoom);const n=this.cameraX+this.cameraWidth()*.5,a=this.cameraY+this.cameraHeight()*.5;this.cameraX-=n-e,this.cameraY-=a-s}cameraBounds(t=0){return{minX:Math.floor(this.cameraX-t),minY:Math.floor(this.cameraY-t),maxX:Math.ceil(this.cameraX+this.cameraWidth()+t),maxY:Math.ceil(this.cameraY+this.cameraHeight()+t)}}cameraPos(t,e){return{x:Math.floor(t/this.cameraZoom+this.cameraX),y:Math.floor(e/this.cameraZoom+this.cameraY)}}renderWorld(){const t=this.cameraBounds(1);for(let e=t.minX;e<t.maxX;e++)for(let s=t.minY;s<t.maxY;s++)this.ctx.save(),this.ctx.translate(e,s),this.ctx.scale(1.03,1.03),this.world.getTile(e,s).render(this.ctx),this.ctx.restore()}render(){this.ctx.reset(),this.ctx.fillStyle="purple",this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.scale(this.cameraZoom,this.cameraZoom),this.ctx.translate(-this.cameraX,-this.cameraY),this.renderWorld()}}const c=32;class w{constructor(t,e,s){o(this,"world");o(this,"chunkX");o(this,"chunkY");this.world=t,this.chunkX=e,this.chunkY=s}isGenerated(){return this instanceof p}generate(){if(this.isGenerated())throw new Error("Cannot generate an already generated chunk.");console.log(`Generating new chunk: ${this.chunkX}, ${this.chunkY}`);const t=[];for(let e=0;e<c;e++)for(let s=0;s<c;s++){const n=this.world.generateTile(this.chunkX*c+s,this.chunkY*c+e);t.push(n)}return new p(this.world,this.chunkX,this.chunkY,t)}}class p extends w{constructor(e,s,n,a){super(e,s,n);o(this,"tiles");if(this.tiles=a,this.tiles.length!=c*c)throw new Error("GeneratedChunk incorrect tiles length.")}getTileAbsolute(e,s){return this.getTile(e-this.chunkX*c,s-this.chunkY*c)}getTile(e,s){return this.tiles[e+s*c]}}function*q(r,t){let e=r,s=t,n=1,a=1;for(;;){for(;2*e*n<a;)yield{x:e,y:s},e+=n;for(;2*s*n<a;)yield{x:e,y:s},s+=n;n=-1*n,a+=1}}class F{constructor(t){o(this,"rng");o(this,"loadedChunks",{});this.rng=t}generateTile(t,e){return new P(this,t,e)}getChunk(t,e){const s=this.loadedChunks[`${t},${e}`];return s||new w(this,t,e)}getGeneratedChunk(t,e){const s=this.getChunk(t,e);if(s.isGenerated())return s;const n=s.generate();return this.loadedChunks[`${t},${e}`]=n,n}getTile(t,e){const s=Math.floor(t/c),n=Math.floor(e/c);return this.getGeneratedChunk(s,n).getTileAbsolute(t,e)}flag(t,e){return this.getTile(t,e).flag()}reveal(t,e){const s=this.getTile(t,e);if(s.reveal())return!0;if(s.nearby()>0)return!1;let a=[],h=[s];for(;h.length>0;){const l=h.pop();a.push(l);for(const d of l.pattern){const m=this.getTile(l.x+d.x,l.y+d.y);h.some(f=>f.x==m.x&&f.y==m.y)||a.some(f=>f.x==m.x&&f.y==m.y)||(m.nearby()==0?h.push(m):a.push(m))}}return a.forEach(l=>l.reveal()),!1}revealClosest0(t,e){for(const{x:s,y:n}of q(t,e)){const a=this.getTile(s,n);if(a.mines()==0&&a.nearby()==0){console.log(a),this.reveal(a.x,a.y);break}}}}const B=(r,t)=>{const e=new ResizeObserver(()=>{t(r.clientWidth,r.clientHeight)});return e.observe(r),{destroy(){e.unobserve(r),e.disconnect()}}};function I(r){let t,e,s,n;return{c(){t=G("canvas"),this.h()},l(a){t=R(a,"CANVAS",{class:!0}),W(t).forEach(x),this.h()},h(){E(t,"class","w-screen h-screen")},m(a,h){A(a,t,h),r[4](t),s||(n=[b(e=B.call(null,t,r[5])),g(t,"mousedown",r[6]),g(t,"mouseup",r[7]),g(t,"mousemove",r[8]),g(t,"wheel",r[9],{passive:!0}),g(t,"contextmenu",V)],s=!0)},p(a,[h]){e&&M(e.update)&&h&13&&e.update.call(null,a[5])},i:y,o:y,d(a){a&&x(t),r[4](null),s=!1,_(n)}}}const V=r=>{r.preventDefault()};function K(r,t,e){let s,n,a,h=!1,l=-1;const d=()=>{cancelAnimationFrame(l),l=requestAnimationFrame(d),h&&(e(3,h=!1),a.render())};Y(()=>{e(1,n=new F(new L(0))),n.revealClosest0(0,0),e(2,a=new N(n,s)),console.log(n),d()}),T(()=>{try{location.reload()}catch{}});function m(i){X[i?"unshift":"push"](()=>{s=i,e(0,s)})}return[s,n,a,h,m,(i,u)=>{e(0,s.width=i,s),e(0,s.height=u,s),a.cameraScale(1),e(3,h=!0)},i=>{if(document.pointerLockElement!=s){if(i.button==1)s.requestPointerLock(),i.preventDefault();else if(i.button==0){i.preventDefault();const u=a.cameraPos(i.offsetX,i.offsetY);n.reveal(u.x,u.y),e(3,h=!0)}else if(i.button==2){i.preventDefault();const u=a.cameraPos(i.offsetX,i.offsetY);n.flag(u.x,u.y),e(3,h=!0)}}},i=>{document.pointerLockElement==s&&i.button==1&&document.exitPointerLock()},i=>{document.pointerLockElement==s&&(a.cameraTranslate(i.movementX,i.movementY),e(3,h=!0))},i=>{a.cameraScale(i.deltaY>0?.9:1.1),e(3,h=!0)}]}class te extends C{constructor(t){super(),S(this,t,K,I,Z,{})}}export{te as component};
