import{f as T,j as p,h as y,q as h,p as I,n as g,k as a,D as d,B as o,E as f,F as B,G as L,L as k,A as w,H as E}from"./index-8379246e.js";import{u as K}from"./useInfiniteQuery-5c41b255.js";import{u as Q}from"./ProductPick-ecf2cc25.js";import{P as Ce,g as qe,a as De}from"./ProductPick-ecf2cc25.js";import{u as S,T as b}from"./use-form-0d174131.js";import{T as P,N as C}from"./NumberInput-d208a666.js";import{S as j}from"./Select-019b24dd.js";import{I as U,a as V}from"./IconArrowBarUp-00a3b700.js";import{I as q}from"./IconChevronRight-22538819.js";import{I as D}from"./IconChevronLeft-e03a2f26.js";import"./Input-dea308b8.js";import"./Popover-32617d60.js";import"./use-uncontrolled-17e2814f.js";var N=T("check","IconCheck",[["path",{d:"M5 12l5 5l10 -10",key:"svg-0"}]]);async function $({data:e}){return(await p.post("/supplier",e)).data}function M({config:e}={}){return y($,{...e,onSuccess:(...s)=>{h.invalidateQueries(["suppliers"]),e!=null&&e.onSuccess&&e.onSuccess(...s)}})}async function R({id:e}){return(await p.delete(`/supplier/${e}`)).data}function ge({config:e}={}){return y(R,{...e,onSuccess:(...s)=>{h.invalidateQueries(["suppliers"]),e!=null&&e.onSuccess&&e.onSuccess(...s)}})}async function z({id:e}){return(await p.get(`/supplier/${e}`)).data}function fe({config:e,id:s}){return I({...e,queryKey:["supplier",s],queryFn:()=>z({id:s})})}async function A({params:e}){return(await p.get("/supplier",{params:e})).data}function F({config:e,params:s}={}){return I({...e,queryKey:["suppliers",s],queryFn:()=>A({params:s}),keepPreviousData:!0})}function H({params:e}={}){return K({queryKey:["suppliers",e],queryFn:({pageParam:s=1})=>A({params:{...e,page:s}}),getNextPageParam:({metadata:s})=>s.hasNext?s.page+1:void 0,getPreviousPageParam:({metadata:s})=>s.hasPrev?s.page-1:void 0})}async function W({id:e,data:s}){return(await p.put(`/supplier/${e}`,s)).data}function Y({config:e}={}){return y(W,{...e,onSuccess:(...s)=>{h.invalidateQueries(["suppliers"]),h.invalidateQueries(["supplier",s[1].id]),e!=null&&e.onSuccess&&e.onSuccess(...s)}})}async function G({data:e}){return(await p.post("/product",e)).data}function O({config:e}={}){return y(G,{...e,onSuccess:(...s)=>{h.invalidateQueries(["products"]),e!=null&&e.onSuccess&&e.onSuccess(...s)}})}async function J({id:e}){return(await p.delete(`/product/${e}`)).data}function Se({config:e}={}){return y(J,{...e,onSuccess:(...s)=>{h.invalidateQueries(["products"]),e!=null&&e.onSuccess&&e.onSuccess(...s)}})}async function X({id:e}){return(await p.get(`/product/${e}`)).data}function Pe({config:e,id:s}){return I({...e,queryKey:["product",s],queryFn:()=>X({id:s})})}async function Z({id:e,data:s}){return(await p.put(`/product/${e}`,s)).data}function _({config:e}={}){return y(Z,{...e,onSuccess:(...s)=>{h.invalidateQueries(["products"]),h.invalidateQueries(["product",s[1].id]),e!=null&&e.onSuccess&&e.onSuccess(...s)}})}const ee=({product:e,company:s,onSuccess:t})=>{var n,m;const i=S({initialValues:{name:e.name,description:e.description,price:e.price,unit:e.unit,company:s,category:e.category,supplier:(n=e.supplier)==null?void 0:n.id,isDefault:e.isDefault}}),{mutateAsync:u,isLoading:l}=_(),{data:c}=F({params:{limit:-1,company:s}}),r=i.onSubmit(async x=>{await u({id:e.id,data:x},{onError({response:v}){i.setErrors((v==null?void 0:v.data).errors)},onSuccess(){t&&t(),g.show({message:"Produk berhasil diubah",color:"green",icon:a.jsx(N,{})}),d.closeAll()}})});return a.jsxs("form",{className:"relative",onSubmit:r,children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(b,{...i.getInputProps("name"),label:"Nama",required:!0}),a.jsx(P,{...i.getInputProps("description"),label:"Deskripsi"}),a.jsx(C,{...i.getInputProps("price"),label:"Harga",required:!0,hideControls:!0,icon:a.jsx("span",{className:"text-xs",children:"Rp."})}),a.jsx(b,{...i.getInputProps("unit"),placeholder:"Masukan Satuan",label:"Satuan",required:!0}),a.jsx(j,{...i.getInputProps("category"),value:i.values.category??"",label:"Kategori",placeholder:"Pilih Kategori",required:!0,data:[{label:"Pembelian",value:"purchase"},{label:"Penjualan",value:"sale"}]}),a.jsx(j,{...i.getInputProps("isDefault"),label:"Default?",required:!0,withinPortal:!0,data:[{label:"Ya",value:"true"},{label:"Tidak",value:"false"}],value:i.values.isDefault?"true":"false",onChange:x=>i.setFieldValue("isDefault",x=="true")}),a.jsx(j,{...i.getInputProps("supplier"),value:((m=i.values.supplier)==null?void 0:m.toString())??"",label:"Supplier",searchable:!0,onChange:x=>i.setFieldValue("supplier",x?parseInt(x):void 0),data:[{label:"(Tanpa Supplier)",value:""},...((c==null?void 0:c.result)??[]).map(({id:x,name:v})=>({label:v,value:x.toString()}))]})]}),a.jsxs("div",{className:"flex items-center justify-end gap-4 mt-4",children:[a.jsx(o,{type:"button",variant:"default",onClick:()=>d.closeAll(),loading:l,children:"Batal"}),a.jsx(o,{type:"submit",loading:l,children:"Simpan"})]})]})},ae={page:1,limit:5},se=()=>{const{outlet:e}=f(),{data:s,isFetching:t,hasNextPage:i,fetchNextPage:u}=Q({params:{...ae,company:e==null?void 0:e.company.id}}),l=(s==null?void 0:s.pages.reduce((r,{result:n})=>[...r,...n],[]))??[];function c(r){return()=>{e!=null&&e.company&&d.open({title:"Update Barang",children:a.jsx(ee,{product:r,company:e.company.id})})}}return a.jsxs("div",{children:[l.map(r=>{var n;return a.jsx("div",{className:"py-3 active:bg-gray-100 transition rounded-lg px-5 cursor-pointer",onClick:c(r),"aria-hidden":!0,children:a.jsxs("div",{className:"w-full flex items-center",children:[a.jsx("div",{className:B("rounded-lg p-2",r.category=="sale"?"bg-blue-100 text-blue-600":"bg-orange-100 text-orange-600"),children:r.category=="purchase"?a.jsx(U,{className:"w-6 h-6"}):a.jsx(V,{className:"w-6 h-6"})}),a.jsxs("div",{className:"flex-grow px-3",children:[a.jsx("div",{className:"text-sx font-bold",children:r.name}),a.jsx("div",{className:"text-xs text-gray-600",children:(n=r.supplier)==null?void 0:n.name})]}),a.jsxs("div",{className:"flex-shrink-0 text-right",children:[a.jsx("div",{className:"font-bold",children:L(r.price)}),a.jsxs("div",{className:"text-xs text-gray-600",children:["/ ",r.unit]})]}),a.jsx("div",{className:"flex-shrink-0 pl-2",children:a.jsx(q,{className:"w-6 h-6 text-gray-600",stroke:1.3})})]})},r.id)}),a.jsx("div",{className:"px-5",children:t?a.jsx("div",{className:"text-center",children:"loading..."}):i&&a.jsx(o,{variant:"subtle",fullWidth:!0,onClick:()=>u(),children:"Lihat Semua"})})]})},te=({company:e,onSuccess:s})=>{var r;const t=S({initialValues:{name:"",description:"",price:0,unit:"",company:e,category:void 0,supplier:void 0,isDefault:!1}}),{mutateAsync:i,isLoading:u}=O(),{data:l}=F({params:{limit:-1,company:e}}),c=t.onSubmit(async n=>{await i({data:n},{onError({response:m}){t.setErrors((m==null?void 0:m.data).errors)},onSuccess(){s&&s(),g.show({message:"Produk berhasil dibuat",color:"green",icon:a.jsx(N,{})}),d.closeAll()}})});return a.jsxs("form",{className:"relative",onSubmit:c,children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(b,{...t.getInputProps("name"),label:"Nama",required:!0}),a.jsx(P,{...t.getInputProps("description"),label:"Deskripsi"}),a.jsx(C,{...t.getInputProps("price"),label:"Harga",required:!0,hideControls:!0,icon:a.jsx("span",{className:"text-xs",children:"Rp."})}),a.jsx(b,{...t.getInputProps("unit"),placeholder:"Masukan Satuan",label:"Satuan",required:!0}),a.jsx(j,{...t.getInputProps("category"),value:t.values.category??"",label:"Kategori",placeholder:"Pilih Kategori",required:!0,data:[{label:"Pembelian",value:"purchase"},{label:"Penjualan",value:"sale"}]}),a.jsx(j,{...t.getInputProps("isDefault"),label:"Default?",required:!0,withinPortal:!0,data:[{label:"Ya",value:"true"},{label:"Tidak",value:"false"}],value:t.values.isDefault?"true":"false",onChange:n=>t.setFieldValue("isDefault",n=="true")}),a.jsx(j,{...t.getInputProps("supplier"),value:((r=t.values.supplier)==null?void 0:r.toString())??"",label:"Supplier",searchable:!0,onChange:n=>t.setFieldValue("supplier",n?parseInt(n):void 0),data:[{label:"(Tanpa Supplier)",value:""},...((l==null?void 0:l.result)??[]).map(({id:n,name:m})=>({label:m,value:n.toString()}))]})]}),a.jsxs("div",{className:"flex items-center justify-end gap-4 mt-4",children:[a.jsx(o,{type:"button",variant:"default",onClick:()=>d.closeAll(),loading:u,children:"Batal"}),a.jsx(o,{type:"submit",loading:u,children:"Tambah"})]})]})},re=({supplier:e,company:s,onSuccess:t})=>{const i=S({initialValues:{name:e.name,description:e.description,company:s}}),{mutateAsync:u,isLoading:l}=Y(),c=i.onSubmit(async r=>{await u({id:e.id,data:r},{onError({response:n}){i.setErrors((n==null?void 0:n.data).errors)},onSuccess(){t&&t(),g.show({message:"Supplier berhasil dibuat",color:"green",icon:a.jsx(N,{})}),d.closeAll()}})});return a.jsxs("form",{className:"relative",onSubmit:c,children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(b,{label:"Nama",required:!0,...i.getInputProps("name")}),a.jsx(P,{label:"Deskripsi",...i.getInputProps("description")})]}),a.jsxs("div",{className:"flex items-center justify-end gap-4 mt-4",children:[a.jsx(o,{type:"button",variant:"default",onClick:()=>d.closeAll(),loading:l,children:"Batal"}),a.jsx(o,{type:"submit",loading:l,children:"Simpan"})]})]})},ie={page:1,limit:5},ne=()=>{const{outlet:e}=f(),{data:s,isFetching:t,hasNextPage:i,fetchNextPage:u}=H({params:{...ie,company:e==null?void 0:e.company.id}}),l=(s==null?void 0:s.pages.reduce((r,{result:n})=>[...r,...n],[]))??[];function c(r){return()=>{e!=null&&e.company&&d.open({title:"Update Supplier",children:a.jsx(re,{supplier:r,company:e.company.id})})}}return a.jsxs("div",{children:[l.map(r=>a.jsxs("div",{className:"flex items-center justify-between py-4 border-b border-gray-300 active:bg-gray-100 transition px-5 cursor-pointer",onClick:c(r),"aria-hidden":!0,children:[a.jsx("div",{className:"font-semibold",children:r.name}),a.jsx("div",{children:a.jsx(q,{className:"w-6 h-6 text-gray-600",stroke:1.3})})]},r.id)),a.jsx("div",{className:"px-5",children:t?a.jsx("div",{className:"text-center",children:"loading..."}):i&&a.jsx(o,{variant:"subtle",fullWidth:!0,onClick:()=>u(),children:"Lihat Semua"})})]})},le=({company:e,onSuccess:s})=>{const t=S({initialValues:{name:"",description:"",company:e}}),{mutateAsync:i,isLoading:u}=M(),l=t.onSubmit(async c=>{await i({data:c},{onError({response:r}){t.setErrors((r==null?void 0:r.data).errors)},onSuccess(){s&&s(),g.show({message:"Supplier berhasil dibuat",color:"green",icon:a.jsx(N,{})}),d.closeAll()}})});return a.jsxs("form",{className:"relative",onSubmit:l,children:[a.jsxs("div",{className:"space-y-2",children:[a.jsx(b,{label:"Nama",required:!0,...t.getInputProps("name")}),a.jsx(P,{label:"Deskripsi",...t.getInputProps("description")})]}),a.jsxs("div",{className:"flex items-center justify-end gap-4 mt-4",children:[a.jsx(o,{type:"button",variant:"default",onClick:()=>d.closeAll(),loading:u,children:"Batal"}),a.jsx(o,{type:"submit",loading:u,children:"Tambah"})]})]})},Ne=()=>{const{outlet:e}=f();function s(){e!=null&&e.company.id&&d.open({title:"Tambah Barang",children:a.jsx(te,{company:e.company.id})})}return a.jsxs("main",{children:[a.jsx("header",{className:"px-4 sticky top-0 z-10 bg-white py-3.5 border-b border-gray-200",children:a.jsxs(k,{to:"/",className:"flex items-center",children:[a.jsx(w,{variant:"transparent",children:a.jsx(D,{className:"text-gray-800"})}),a.jsx("div",{className:"font-bold ml-4",children:"Kembali"})]})}),a.jsxs("section",{className:"flex items-center justify-between px-5 mt-7 mb-4",children:[a.jsx("h1",{className:"text-lg font-bold",children:"Data Barang"}),a.jsx(o,{size:"xs",onClick:s,children:"Tambah"})]}),a.jsx(se,{})]})},Ie=()=>{const{outlet:e}=f();function s(){e!=null&&e.company.id&&E({title:"Tambah Supplier",children:a.jsx(le,{company:e.company.id})})}return a.jsxs("main",{children:[a.jsx("header",{className:"px-4 sticky top-0 z-10 bg-white py-3.5 border-b border-gray-200",children:a.jsxs(k,{to:"/",className:"flex items-center",children:[a.jsx(w,{variant:"transparent",children:a.jsx(D,{className:"text-gray-800"})}),a.jsx("div",{className:"font-bold ml-4",children:"Kembali"})]})}),a.jsxs("section",{className:"flex items-center justify-between px-5 mt-7 mb-4",children:[a.jsx("h1",{className:"text-lg font-bold",children:"Data Supplier"}),a.jsx(o,{size:"xs",onClick:s,children:"Tambah"})]}),a.jsx(ne,{})]})};export{te as ProductCreateForm,se as ProductList,Ce as ProductPick,ee as ProductUpdateForm,Ne as Products,le as SupplierCreateForm,ne as SupplierList,re as SupplierUpdateForm,Ie as Suppliers,G as createProduct,$ as createSupplier,J as deleteProduct,R as deleteSupplier,X as getProduct,qe as getProducts,z as getSupplier,A as getSuppliers,Z as updateProduct,W as updateSupplier,O as useCreateProduct,M as useCreateSupplier,Se as useDeleteProduct,ge as useDeleteSupplier,Q as useInfiniteProducts,H as useInfiniteSuppliers,Pe as useProduct,De as useProducts,fe as useSupplier,F as useSuppliers,_ as useUpdateProduct,Y as useUpdateSupplier};
