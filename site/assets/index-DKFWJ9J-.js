(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const c of n)if(c.type==="childList")for(const m of c.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&r(m)}).observe(document,{childList:!0,subtree:!0});function t(n){const c={};return n.integrity&&(c.integrity=n.integrity),n.referrerPolicy&&(c.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?c.credentials="include":n.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function r(n){if(n.ep)return;n.ep=!0;const c=t(n);fetch(n.href,c)}})();const L=22,N=50,T=[{posX:50*2-50/4,posY:50*11-50/4,color:"#AC1517",currentPiece:{posX:0,posY:0,imgSrc:"",color:"red",locked:!0}},{posX:50*4+50/4,posY:50*11-50/4,color:"#AC1517",currentPiece:{posX:0,posY:0,imgSrc:"",color:"red",locked:!0}},{posX:50*2-50/4,posY:50*13+50/4,color:"#AC1517",currentPiece:{posX:0,posY:0,imgSrc:"",color:"red",locked:!0}},{posX:50*4+50/4,posY:50*13+50/4,color:"#AC1517",currentPiece:{posX:0,posY:0,imgSrc:"",color:"red",locked:!0}}],v=[{posX:50*2-50/4,posY:50*2-50/4,color:"#009BF8",currentPiece:{posX:0,posY:0,imgSrc:"",color:"lightblue",locked:!0}},{posX:50*4+50/4,posY:50*2-50/4,color:"#009BF8",currentPiece:{posX:0,posY:0,imgSrc:"",color:"lightblue",locked:!0}},{posX:50*2-50/4,posY:50*4+50/4,color:"#009BF8",currentPiece:{posX:0,posY:0,imgSrc:"",color:"lightblue",locked:!0}},{posX:50*4+50/4,posY:50*4+50/4,color:"#009BF8",currentPiece:{posX:0,posY:0,imgSrc:"",color:"lightblue",locked:!0}}],E=[{posX:50*11-50/4,posY:50*2-50/4,color:"#FFC312",currentPiece:{posX:0,posY:0,imgSrc:"",color:"yellow",locked:!0}},{posX:50*13+50/4,posY:50*2-50/4,color:"#FFC312",currentPiece:{posX:0,posY:0,imgSrc:"",color:"yellow",locked:!0}},{posX:50*11-50/4,posY:50*4+50/4,color:"#FFC312",currentPiece:{posX:0,posY:0,imgSrc:"",color:"yellow",locked:!0}},{posX:50*13+50/4,posY:50*4+50/4,color:"#FFC312",currentPiece:{posX:0,posY:0,imgSrc:"",color:"yellow",locked:!0}}],k=[{posX:50*11-50/4,posY:50*11-50/4,color:"#6CB92C",currentPiece:{posX:0,posY:0,imgSrc:"",color:"green",locked:!0}},{posX:50*13+50/4,posY:50*11-50/4,color:"#6CB92C",currentPiece:{posX:0,posY:0,imgSrc:"",color:"green",locked:!0}},{posX:50*11-50/4,posY:50*13+50/4,color:"#6CB92C",currentPiece:{posX:0,posY:0,imgSrc:"",color:"green",locked:!0}},{posX:50*13+50/4,posY:50*13+50/4,color:"#6CB92C",currentPiece:{posX:0,posY:0,imgSrc:"",color:"green",locked:!0}}];function U(e){if(e=="red")return T;if(e=="green")return k;if(e=="blue")return v;if(e=="yellow")return E}function x(e,o){if(e=="red")return T[o%4];if(e=="blue")return v[o%4];if(e=="green")return k[o%4];if(e=="yellow")return E[o%4]}const R="https://gobaby-production.up.railway.app",M="ws://gobaby-production.up.railway.app";function H(e,o){return`
  <tr>
  <td>${e.name}</td>
      <td>${e.color}</td>
      <td>${o}</td>
      </tr>
  `}function _(e,o){return`
  <tr>
    <td>${e.name}</td>
    <td>${e.users.length}</td>
    <td><button onclick="
      connectToRoom('${e.id}')" 
      ${o||e.users.length==4?"disabled":""} >
    ${o?"Connected":"Connect"}</button></td>
   </tr> 
  `}const d=[],g=[];crypto.randomUUID();function j(e){return fetch(`${R}/create-room`,{body:JSON.stringify({name:e}),method:"post"}).then(o=>o)}function D(){return fetch(`${R}/get-rooms`).then(e=>e.json()).then(e=>e)}function q(){return g.filter(e=>e.CurrentBoxX>-1&&e.CurrentBoxY>-1).length>0}const i=e=>document.querySelector(e),u=i("canvas"),S=i("#players"),$=i("#rooms"),I=i("#inputName"),J=i("#input_name"),P=i("#roller-button"),K=i("#current-turn"),W=i("#dice-number"),z=i("#result-list"),l=u.getContext("2d"),Y=new Image(750,750);Y.src="public/tablero.png";let C=!1,f,s,p,X,a={id:crypto.randomUUID(),name:"",color:""},h,y;async function F(){const e=$.firstElementChild.firstElementChild,o=await D();$.innerHTML=`
      ${e.innerHTML}
      ${Object.entries(o).map(([t,r])=>_(r,s!=null)).join("")}      
      `}document.getElementById("add-room-form").addEventListener("submit",function(e){e.preventDefault(),j(J.value).then(o=>{F()})});F();function G(){z.innerHTML=s.result.map(e=>`<li>${e}</li>`).join("")}function Q(){S.innerHTML=S.querySelector("tr").innerHTML+s.users.map(e=>(e.id==a.id&&(a.color=e.color),H(e,s.game.board.salveds.filter(o=>o==e.color).length))).join("")}function b(){f.send(JSON.stringify({eventType:"move",message:{dice:h,tokenId:p!=null?p.Id:-1}}))}function V(e){y=e,K.innerHTML=y}window.connectToRoom=function(e){f=new WebSocket(`${M}/join-room/${e}?username=${I.value}`),f.addEventListener("open",o=>{a.name=I.value,f.send(JSON.stringify({eventType:"connection",message:a}))}),f.addEventListener("message",o=>{s=JSON.parse(o.data),console.log(s),C=!0,G(),Q(),s.game.board.tokens.forEach(t=>{const r=d.findIndex(c=>t.Id==c.Id);r!==-1?d[r]=t:d.push(t);const n=g.findIndex(c=>t.Id==c.Id);n!==-1?g[n]=t:t.Color==a.color&&g.push(t)}),V(s.game.currentTurn)}),f.onclose=()=>{}};P.addEventListener("click",()=>{if(p=void 0,h=Math.floor(Math.random()*6+1),W.innerHTML=h,h==6||q()){X=!0;return}b()});Y.onload=function(){l.drawImage(Y,0,0,u.width,u.height)};function w(e,o,t,r){l.beginPath(),l.arc(e,o,t,0,Math.PI*3),l.fillStyle=r,l.fill(),l.closePath()}function Z(e){w(e.posX,e.posY,N,e.color)}function ee(e,o){e.currentPiece.locked&&d[o].CurrentBoxX==-1&&d[o].CurrentBoxY==-1&&w(e.posX,e.posY,L,e.currentPiece.color)}function oe(){d.forEach((e,o)=>{const t=x(e.Color,o);Z(t),ee(t,o)})}u.addEventListener("click",e=>{if(!X)return;const{offsetX:o,offsetY:t}=e;if(h==6){const r=U(a.color),[n,c]=[r[0].posX,r[0].posY],[m,A]=[r[r.length-1].posX,r[r.length-1].posY];if(o>n&&o<m&&t>c&&t<A){p=g.find(B=>B.CurrentBoxX==-1&&B.CurrentBoxY==-1),console.log(p),b(),X=!1,p=void 0;return}}d.forEach(r=>{o>r.CurrentBoxX*50&&o<(r.CurrentBoxX+1)*50&&t>r.CurrentBoxY*50&&t<(r.CurrentBoxY+1)*50&&r.Color==a.color&&(p=r,b(),X=!1)}),console.log(o,t,d)});function re(e){e.forEach(o=>{o.CurrentToken&&w(o.X*50+25,o.Y*50+25,L,o.CurrentToken.Color)})}function O(){y==a.color?P.removeAttribute("disabled"):P.setAttribute("disabled",!0),C&&(l.clearRect(0,0,u.width,u.height),l.drawImage(Y,0,0,u.width,u.height),oe(),re(s==null?void 0:s.game.board.road),C=!1),window.requestAnimationFrame(O)}O();
