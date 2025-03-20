import{d as x,a1 as S,s as B,r as v,Y as O,A as d,j as a,i as r,u as e,_ as U,o as V,x as p,C as u,a5 as q,a6 as y,a7 as h,W as L,ai as R,aj as j,O as E,R as _,M as w,Q as P,v as s,S as g,D as F,g as K,q as A}from"./vendor-DCUXqmZE.js";import{s as Q}from"./index-IEopUGFI.js";import{_ as T}from"./_plugin-vue_export-helper-DlAUqK2U.js";const W={class:"login-container"},Y={class:"login-header bounce-in"},G=x({__name:"index",setup(H){K(c=>({"4fe6ec67":e(l)?"radial-gradient(circle at 10% 20%, rgba(96, 165, 250, 0.15) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 20%), radial-gradient(circle at 50% 50%, rgba(96, 165, 250, 0.1) 0%, transparent 50%)":"radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(96, 165, 250, 0.1) 0%, transparent 20%), radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)","2f83f5e0":e(l)?"rgba(31, 41, 55, 0.7)":"rgba(255, 255, 255, 0.9)","726318f6":e(l)?"rgba(255, 255, 255, 0.1)":"rgba(59, 130, 246, 0.1)","4f99f585":e(l)?"0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -2px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)":"0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.1)","24c940b2":e(l)?"0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -4px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.2)":"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(59, 130, 246, 0.2)","3dd5c3fd":e(l)?"#9ca3af":"#64748b","199d1e37":e(l)?"rgba(255, 255, 255, 0.1)":"rgba(0, 0, 0, 0.05)","9e41dba4":e(l)?"#f3f4f6":"#1e293b"}));const C=F(),k=S(),{t,locale:I}=B(),f=v(),n=v({username:"",password:""}),l=A("isDarkMode"),m=[{label:"简体中文",key:"zh-CN",icon:()=>s(p,null,{default:()=>s(g)})},{label:"English",key:"en-US",icon:()=>s(p,null,{default:()=>s(g)})}],N=c=>{Q(c)},M={username:{required:!0,message:t("system.pleaseInputUsername"),trigger:"blur"},password:{required:!0,message:t("system.pleaseInputPassword"),trigger:"blur"}},z=x({name:"DeerIcon",render(){return s("svg",{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512",style:"fill: currentColor"},[s("path",{d:"M256 64c-35.3 0-64 28.7-64 64v48c0 8.8 7.2 16 16 16h96c8.8 0 16-7.2 16-16v-48c0-35.3-28.7-64-64-64z",style:"fill: currentColor; opacity: 0.9"}),s("path",{d:"M192 128c0-12.8 2.6-25 7.4-36.1C183.4 102.8 160 132.5 160 168v64c0 8.8 7.2 16 16 16s16-7.2 16-16v-64c0-13.3 10.7-24 24-24",style:"fill: currentColor; opacity: 0.85"}),s("path",{d:"M320 128c0-12.8-2.6-25-7.4-36.1C328.6 102.8 352 132.5 352 168v64c0 8.8-7.2 16-16 16s-16-7.2-16-16v-64c0-13.3-10.7-24-24-24",style:"fill: currentColor; opacity: 0.85"}),s("circle",{cx:"208",cy:"192",r:"16",style:"fill: currentColor; opacity: 0.95"}),s("circle",{cx:"304",cy:"192",r:"16",style:"fill: currentColor; opacity: 0.95"}),s("path",{d:"M256 224c-17.7 0-32 14.3-32 32v16c0 17.7 14.3 32 32 32s32-14.3 32-32v-16c0-17.7-14.3-32-32-32z",style:"fill: currentColor; opacity: 0.8"}),s("path",{d:"M144 168c-8.8 0-16 7.2-16 16v32c0 70.7 57.3 128 128 128s128-57.3 128-128v-32c0-8.8-7.2-16-16-16h-16c-8.8 0-16 7.2-16 16v32c0 44.2-35.8 80-80 80s-80-35.8-80-80v-32c0-8.8-7.2-16-16-16h-16z",style:"fill: currentColor; opacity: 0.7"})])}}),b=()=>{var c;(c=f.value)==null||c.validate(o=>{o||(n.value.username==="admin"&&n.value.password==="admin"?(localStorage.setItem("token","demo-token"),C.push("/")):k.error(t("system.loginError")))})};return(c,o)=>(V(),O("div",W,[o[2]||(o[2]=d("div",{class:"login-background"},null,-1)),a(e(U),{class:"login-card hover-float"},{default:r(()=>[d("div",Y,[a(e(p),{size:"64",color:"#3b82f6"},{default:r(()=>[a(e(z))]),_:1}),d("h2",null,u(e(t)("system.title")),1)]),a(e(q),{ref_key:"formRef",ref:f,model:n.value,rules:M,class:"fade-slide-up"},{default:r(()=>[a(e(y),{path:"username",label:e(t)("system.username")},{default:r(()=>[a(e(h),{value:n.value.username,"onUpdate:value":o[0]||(o[0]=i=>n.value.username=i),placeholder:e(t)("system.pleaseInputUsername")},{prefix:r(()=>[a(e(p),null,{default:r(()=>[a(e(L))]),_:1})]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),a(e(y),{path:"password",label:e(t)("system.password")},{default:r(()=>[a(e(h),{value:n.value.password,"onUpdate:value":o[1]||(o[1]=i=>n.value.password=i),type:"password",placeholder:e(t)("system.pleaseInputPassword"),onKeyup:R(b,["enter"])},{prefix:r(()=>[a(e(p),null,{default:r(()=>[a(e(j))]),_:1})]),_:1},8,["value","placeholder"])]),_:1},8,["label"]),a(e(E),{vertical:"",size:"large",style:{width:"100%"}},{default:r(()=>[a(e(_),{type:"primary",block:"",onClick:b,class:"hover-scale"},{default:r(()=>[w(u(e(t)("system.login")),1)]),_:1}),a(e(P),{options:m,onSelect:N,trigger:"hover"},{default:r(()=>[a(e(_),{quaternary:"",block:"",class:"language-toggle"},{default:r(()=>{var i;return[a(e(p),{size:"18",style:{"margin-right":"8px"}},{default:r(()=>[a(e(g))]),_:1}),w(" "+u((i=m.find(D=>D.key===e(I)))==null?void 0:i.label),1)]}),_:1})]),_:1})]),_:1})]),_:1},8,["model"])]),_:1})]))}}),$=T(G,[["__scopeId","data-v-5d05a3b7"]]);export{$ as default};
