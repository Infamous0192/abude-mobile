import{j as c,p as o,k as e,t as r,B as l,r as d,L as m,A as x,m as h,I as u,U as n,v as p}from"./index-8379246e.js";import{y as M,w as U,z as Y,x as F}from"./index-8379246e.js";import{S as q,g as z,u as R}from"./ShiftSelect-b1eeadf1.js";import{B as a,D as g}from"./DatePickerInput-ab403727.js";import{I as j}from"./IconChevronLeft-e03a2f26.js";import{I as i}from"./IconChevronRight-22538819.js";import{I as f}from"./IconLogout-29f398a5.js";import"./Select-019b24dd.js";import"./Input-dea308b8.js";import"./Popover-32617d60.js";import"./use-uncontrolled-17e2814f.js";async function y({id:t}){return(await c.get(`/shift/${t}`)).data}function P({config:t,id:s}){return o({...t,queryKey:["shift",s],queryFn:()=>y({id:s})})}const N=[{id:3,checkIn:new Date,checkOut:null,status:"absent",employee:{id:3,name:"Ujang Pratama",phonenumber:"+6284523476732",address:"lorem ipsum dolor sit amet"},createdAt:new Date},{id:2,checkIn:new Date,checkOut:null,status:"working",employee:{id:2,name:"Asep Permana",phonenumber:"+62896912454352",address:"lorem ipsum dolor sit amet"},createdAt:new Date},{id:1,checkIn:new Date,checkOut:new Date,status:"present",employee:{id:1,name:"Koswara",phonenumber:"+6289691786852",address:"lorem ipsum dolor sit amet"},createdAt:new Date}],b=({date:t})=>e.jsx("section",{className:"px-5 my-4 space-y-4",children:N.map(s=>e.jsxs("div",{className:"bg-white rounded-lg shadow-md shadow-gray-200 border border-gray-100 px-5 py-4",children:[e.jsxs("div",{className:"flex items-start justify-between w-full pb-3 border-b border-gray-300",children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-bold text-sm",children:s.employee.name}),e.jsx("div",{className:"text-xs text-gray-600",children:s.employee.phonenumber})]}),s.status=="present"?e.jsx(a,{color:"blue",children:"Present"}):s.status=="working"?e.jsx(a,{color:"green",children:"Working"}):r(s.createdAt).isSame(t,"date")?e.jsx(a,{color:"gray",children:"Pending"}):e.jsx(a,{color:"red",children:"Absent"})]}),e.jsxs("div",{className:"pt-3 grid grid-cols-2 gap-x-2",children:[s.status=="absent"&&e.jsx("div",{className:"col-span-2",children:e.jsx(l,{variant:"outline",color:"green",fullWidth:!0,children:"Check In"})}),(s.status=="present"||s.status=="working")&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold text-sm text-gray-600 mb-1",children:"Check In"}),e.jsx("div",{className:"flex items-center text-sm",children:e.jsx("span",{className:"text-green-600 bg-green-50 font-medium w-auto rounded-md px-3 py-0.5",children:r(s.checkIn).format("HH:mm:ss")})})]}),s.checkOut!=null?e.jsxs("div",{children:[e.jsx("div",{className:"font-semibold text-sm text-gray-600 mb-1",children:"Check Out"}),e.jsx("div",{className:"flex items-center text-sm",children:e.jsx("span",{className:"text-orange-600 bg-orange-50 font-medium w-auto rounded-md px-3 py-0.5",children:r(s.checkOut).format("HH:mm:ss")})})]}):e.jsx("div",{className:"flex items-center justify-center h-full",children:e.jsx(l,{color:"orange",variant:"outline",children:"Check Out"})})]})]})]},s.id))}),E=()=>{const[t,s]=d.useState(new Date);return e.jsxs("main",{className:"pb-16",children:[e.jsx("header",{className:"px-4 sticky top-0 z-10 bg-white py-3.5",children:e.jsxs(m,{to:"/",className:"flex items-center",children:[e.jsx(x,{variant:"transparent",children:e.jsx(j,{className:"text-gray-800"})}),e.jsx("div",{className:"font-bold ml-4",children:"Kehadiran"})]})}),e.jsx("section",{className:"px-5",children:e.jsx(g,{label:"Tanggal",placeholder:"Pick date",value:t,onChange:s,mx:"auto",valueFormat:"dddd, D MMMM YYYY",maxDate:new Date})}),e.jsx(b,{date:t??new Date})]})},L=()=>{const{creds:t,logout:s}=h();return e.jsxs("main",{className:"py-12",children:[e.jsxs("section",{className:"flex flex-col items-center justify-center",children:[e.jsx("div",{className:"bg-gray-200 text-gray-900 rounded-full p-7 mb-4",children:e.jsx(u,{className:"w-16 h-16"})}),e.jsx("div",{className:"font-bold text-lg",children:t==null?void 0:t.name}),e.jsx("div",{className:"text-sm text-gray-600",children:"Admin Outlet"})]}),e.jsxs("section",{className:"w-full mt-8 px-5",children:[e.jsxs(n,{className:"flex w-full items-center py-2",children:[e.jsx("div",{className:"bg-blue-50 text-blue-600 rounded-lg p-2",children:e.jsx(p,{className:"w-6 h-6"})}),e.jsx("div",{className:"font-bold px-4 flex-grow",children:"Settings"}),e.jsx("div",{className:"rounded-lg",children:e.jsx(i,{className:"w-6 h-6"})})]}),e.jsxs(n,{onClick:()=>s(),className:"flex w-full items-center py-2",children:[e.jsx("div",{className:"bg-red-50 text-red-600 rounded-lg p-2",children:e.jsx(f,{className:"w-6 h-6"})}),e.jsx("div",{className:"font-bold px-4 flex-grow",children:"Logout"}),e.jsx("div",{className:"rounded-lg",children:e.jsx(i,{className:"w-6 h-6"})})]})]})]})};export{b as AttendanceList,E as Attendances,L as Profile,q as ShiftSelect,M as getEmployee,U as getEmployeeOutlet,y as getShift,z as getShifts,Y as useEmployee,F as useEmployeeOutlet,P as useShift,R as useShifts};
