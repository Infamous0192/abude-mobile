import{f as v,j as u,h as l,q as r,p as i,m as y,r as j,E as O,k as s,N as o,F as S,B as c}from"./index-8379246e.js";import{O as T}from"./index-8379246e.js";import{O as X}from"./OutletPick-e66e0938.js";import{I as b}from"./IconLogout-29f398a5.js";import"./Menu-271f6457.js";import"./Popover-32617d60.js";import"./use-uncontrolled-17e2814f.js";var k=v("building-store","IconBuildingStore",[["path",{d:"M3 21l18 0",key:"svg-0"}],["path",{d:"M3 7v1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1m0 1a3 3 0 0 0 6 0v-1h-18l2 -4h14l2 4",key:"svg-1"}],["path",{d:"M5 21l0 -10.15",key:"svg-2"}],["path",{d:"M19 21l0 -10.15",key:"svg-3"}],["path",{d:"M9 21v-4a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v4",key:"svg-4"}]]);async function w({data:e}){return(await u.post("/outlet",e)).data}function R({config:e}={}){return l(w,{...e,onSuccess:(...t)=>{r.invalidateQueries(["outlets"]),e!=null&&e.onSuccess&&e.onSuccess(...t)}})}async function N({id:e}){return(await u.delete(`/outlet/${e}`)).data}function D({config:e}={}){return l(N,{...e,onSuccess:(...t)=>{r.invalidateQueries(["outlets"]),e!=null&&e.onSuccess&&e.onSuccess(...t)}})}async function f({id:e}){return(await u.get(`/outlet/${e}`)).data}function E({config:e,id:t}){return i({...e,queryKey:["outlet",t],queryFn:()=>f({id:t})})}async function A({params:e}){return(await u.get("/outlet",{params:e})).data}function K({config:e,params:t}={}){return i({...e,queryKey:["outlets",t],queryFn:()=>A({params:t}),keepPreviousData:!0})}async function q({id:e,data:t}){return(await u.put(`/outlet/${e}`,t)).data}function L({config:e}={}){return l(q,{...e,onSuccess:(...t)=>{r.invalidateQueries(["outlets"]),r.invalidateQueries(["outlet",t[1].id]),e!=null&&e.onSuccess&&e.onSuccess(...t)}})}async function $({id:e}){return(await u.get(`/outlet/${e}/admin`)).data}function W({config:e,id:t}){return i({...e,queryKey:["outlet-admins",t],queryFn:()=>$({id:t}),keepPreviousData:!0})}async function C({outletId:e,employeeId:t}){return(await u.put(`/outlet/${e}/admin/${t}`)).data}function z({config:e}={}){return l(C,{...e,onSuccess:(...t)=>{r.invalidateQueries(["outlet-admins",t[1].outletId]),e!=null&&e.onSuccess&&e.onSuccess(...t)}})}async function I({outletId:e,employeeId:t}){return(await u.delete(`/outlet/${e}/admin/${t}`)).data}function U({config:e}={}){return l(I,{...e,onSuccess:(...t)=>{r.invalidateQueries(["outlet-admins",t[1].outletId]),e!=null&&e.onSuccess&&e.onSuccess(...t)}})}const G=()=>{const{creds:e,logout:t}=y(),[a,m]=j.useState(null),{outlet:x,setOutlet:p,outlets:d}=O();function h(){a!=null&&p(a)}return e?x?s.jsx(o,{to:"/",replace:!0}):s.jsxs("main",{children:[s.jsx("header",{className:"px-5 py-5 flex items-center justify-center",children:s.jsx("h1",{className:"font-bold text-lg",children:"Pilih Outlet"})}),s.jsxs("div",{className:"space-y-4 px-5",children:[d.length==0&&s.jsx("div",{children:"Anda tidak mempunyai akses ke aplikasi Outlet."}),d.map(n=>s.jsx("div",{className:S("cursor-pointer border shadow shadow-gray-300 rounded-md w-full p-4 transition",a==n.id?"bg-blue-50 border-blue-200 bg-opacity-40":"bg-white border-gray-100"),onClick:()=>m(n.id),"aria-hidden":"true",children:s.jsxs("div",{className:"flex",children:[s.jsx("div",{className:"p-2 rounded-lg flex-shrink-0 bg-blue-100",children:s.jsx(k,{className:"text-blue-600 w-6 h-6",stroke:2})}),s.jsx("div",{className:"flex-grow pl-4",children:s.jsxs("div",{className:"",children:[s.jsx("h2",{className:"font-bold text-base line-clamp-1",children:n.name}),s.jsx("p",{className:"text-sm text-gray-600 line-clamp-1",children:n.company.name})]})})]})},n.id))]}),s.jsx("div",{className:"px-5 mt-8",children:s.jsx(c,{onClick:()=>t(),leftIcon:s.jsx(b,{size:14}),color:"red",variant:"subtle",fullWidth:!0,children:"Logout"})}),s.jsx("div",{className:"max-w-md mx-auto fixed bottom-0 w-full p-4 bg-white",children:s.jsx(c,{disabled:a==null,fullWidth:!0,onClick:h,children:"Pilih Outlet"})})]}):s.jsx(o,{to:"/login",replace:!0})};export{C as AddAdmin,X as OutletPick,T as OutletProvider,G as Outlets,I as RemoveAdmin,w as createOutlet,N as deleteOutlet,$ as getAdmins,f as getOutlet,A as getOutlets,q as updateOutlet,z as useAddAdmin,R as useCreateOutlet,D as useDeleteOutlet,E as useOutlet,W as useOutletAdmins,O as useOutletContext,K as useOutlets,U as useRemoveAdmin,L as useUpdateOutlet};
