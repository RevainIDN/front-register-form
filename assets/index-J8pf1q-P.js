(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const p of o.addedNodes)p.tagName==="LINK"&&p.rel==="modulepreload"&&d(p)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function d(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const S=document.getElementById("first-form"),v=document.getElementById("second-form"),E=document.getElementById("third-form"),c=document.getElementById("name"),r=document.getElementById("email"),y=c.closest("label").querySelector(".input--empty"),u=r.closest("label").querySelector(".input--empty"),b=document.querySelectorAll(".topic-btn"),g=document.querySelector(".continue-btn"),L=document.querySelector(".pagination-steps"),h=document.querySelectorAll(".pagination-item");let s=1,l=1;const a=[];function f(){S.style.display=s===1?"flex":"none",v.style.display=s===2?"flex":"none",E.style.display=s===3?"flex":"none",s===3&&x()}function m(){L.textContent=`Step ${s} of 3`,h.forEach((t,n)=>{const i=t.querySelector(".pagination-btn");i.classList.remove("pagination-btn--active","pagination-btn--after-active"),n<s-1?i.classList.add("pagination-btn--after-active"):n===s-1&&i.classList.add("pagination-btn--active")})}h.forEach((t,n)=>{t.addEventListener("click",()=>{n+1<=l&&(s=n+1,f(),m())})});function q(){const t=c.value.trim(),n=r.value.trim();let i=!0;return t.length===0?(y.style.display="flex",c.style.border="2px #B22222 solid",i=!1):(y.style.display="none",c.style.border="2px #4D5562 solid"),n.length===0?(u.style.display="flex",r.style.border="2px #B22222 solid",i=!1):r.validity.valid?(u.style.display="none",r.style.border="2px #4D5562 solid"):(u.textContent="Please enter a valid email address",u.style.display="flex",r.style.border="2px #B22222 solid",i=!1),i}b.forEach(t=>{t.addEventListener("click",()=>{if(t.classList.toggle("topic-btn--active"),t.classList.contains("topic-btn--active"))a.push(t.textContent);else{const n=a.indexOf(t.textContent);n!==-1&&a.splice(n,1)}})});function B(){return a.length!==0}function x(){const t=document.querySelector(".user-name span"),n=document.querySelector(".user-email span"),i=document.querySelector(".topics-list");g.textContent="Confirm",t.textContent=c.value.trim(),n.textContent=r.value.trim(),i.innerHTML="",a.forEach(d=>{const e=document.createElement("li");e.className="topic-item",e.textContent=d,i.appendChild(e)})}function C(){x(),alert("The form has been successfully completed!")}g.addEventListener("click",t=>{t.preventDefault(),s===1?q()&&(s=2,l=Math.max(l,s)):s===2?B()&&(s=3,l=Math.max(l,s)):s===3&&C(),f(),m()});f();m();
