(this.webpackJsonpgasonwheelz=this.webpackJsonpgasonwheelz||[]).push([[19,24],{196:function(e,t,c){"use strict";c.r(t);c(8);var n=c(9);t.default=function(e){return e.alert&&Object(n.jsx)("div",{className:"alert alert-".concat(e.alert.type," alert-dismissible fade show"),role:"alert",id:"alerts",children:Object(n.jsx)("strong",{style:{textTransform:"capitalize"},children:e.alert.msg})})}},482:function(e,t,c){"use strict";c.r(t);var n=c(42),s=c(17),r=c(8),o=c(23),l=c(57),d=c(196),a=c(79),i=c(9);t.default=function(){var e=Object(o.i)().phone,t=Object(r.useState)([]),c=Object(s.a)(t,2),j=c[0],h=c[1],b=Object(r.useState)([]),O=Object(s.a)(b,2),u=O[0],p=O[1],x=Object(o.g)(),m=Object(r.useState)(null),y=Object(s.a)(m,2),f=y[0],g=y[1],E=Object(r.useState)(null),k=Object(s.a)(E,2),w=k[0],C=k[1];return Object(r.useEffect)((function(){try{var t=[],c=a.c.collection("Sales").where("phone","==",e).where("order_status","==","INCOMPLETE").where("order_type","==","REFILL").orderBy("booked_on","desc").onSnapshot((function(e){e.empty?(C({msg:"CONGRATS! There doesn't exists any INCOMPLETE Orders from this Customer.",type:"info"}),setTimeout((function(){C(null)}),7e3)):(e.forEach((function(e){t.push(Object(n.a)(Object(n.a)({},e.data()),{},{key:e.id}))})),h(t))}));return function(){return c()}}catch(s){x.push("/Registration")}}),[e,x]),Object(r.useEffect)((function(){try{var t=[],c=a.c.collection("Sales").where("phone","==",e).where("order_status","==","COMPLETE").where("order_type","==","REFILL").orderBy("booked_on","desc").onSnapshot((function(e){e.empty?(g({msg:"Sorry!There doesn't exists any COMPLETE Orders  from this Customer.",type:"danger"}),setTimeout((function(){g(null)}),5e3)):(e.forEach((function(e){t.push(Object(n.a)(Object(n.a)({},e.data()),{},{key:e.id}))})),p(t))}));return function(){return c()}}catch(s){x.push("/Registration")}}),[e,x]),Object(i.jsxs)(i.Fragment,{children:[Object(i.jsxs)("div",{className:"alert-container",children:[Object(i.jsx)(d.default,{alert:w}),Object(i.jsx)(d.default,{alert:f})]}),Object(i.jsx)("div",{className:"my-2",children:Object(i.jsx)("h4",{className:"text-center",children:"Customer's INCOMPLETE Orders - Refill"})}),Object(i.jsx)("div",{className:"table-responsive",style:{padding:"20px"},children:Object(i.jsxs)("table",{className:"table table-borderless",children:[Object(i.jsx)("thead",{className:"thead-dark",style:{backgroundColor:"#c50c0c",color:"white",borderColor:"black"},children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{scope:"col",children:"Cylinder Type"}),Object(i.jsx)("th",{scope:"col",children:"Full"}),Object(i.jsx)("th",{scope:"col",children:"Empty"}),Object(i.jsx)("th",{scope:"col",children:"Price"}),Object(i.jsx)("th",{scope:"col",children:"Total Amount"}),Object(i.jsx)("th",{scope:"col",children:"Amount Recieved"}),Object(i.jsx)("th",{scope:"col",children:"Pending Amount"}),Object(i.jsx)("th",{scope:"col",children:"Pending Empty(s)"}),Object(i.jsx)("th",{scope:"col",children:"Booked On"}),Object(i.jsx)("th",{scope:"col",children:"Action"})]})}),Object(i.jsx)("tbody",{children:j.map((function(t){var c=t.key,n=t.name,s=t.gas_cylinder_type,r=t.quantity,o=t.empty,d=t.price,a=t.booked_on,j=t.amount,h=t.amountr,b=t.pending_amount,O=t.pending_empty,u=t.order_status;return Object(i.jsxs)("tr",{style:{backgroundColor:"white"},children:[Object(i.jsx)("td",{children:s}),Object(i.jsx)("td",{children:r}),Object(i.jsx)("td",{children:o}),Object(i.jsx)("td",{children:d}),Object(i.jsx)("td",{children:j}),Object(i.jsx)("td",{children:h}),Object(i.jsx)("td",{children:b}),Object(i.jsx)("td",{children:O}),Object(i.jsx)("td",{children:new Date(1e3*a.seconds).toLocaleDateString("en-UK")+" at "+new Date(1e3*a.seconds).toLocaleTimeString()}),Object(i.jsx)("td",{children:Object(i.jsx)(l.b,{to:"/EditBooking/".concat(e,"/").concat(s,"/").concat(d,"/").concat(n,"/").concat(c,"/").concat(r,"/").concat(o,"/").concat(h,"/").concat(u),className:"btn btn-primary",children:"Edit"})})]},c)}))})]})}),Object(i.jsx)("div",{className:"my-2",children:Object(i.jsx)("h4",{className:"text-center",children:"Customer's COMPLETE Orders - Refill"})}),Object(i.jsx)("div",{className:"table-responsive",style:{padding:"20px"},children:Object(i.jsxs)("table",{className:"table table-borderless",children:[Object(i.jsx)("thead",{className:"thead-dark",style:{backgroundColor:"grey",color:"white",borderColor:"black"},children:Object(i.jsxs)("tr",{children:[Object(i.jsx)("th",{scope:"col",children:"Cylinder Type"}),Object(i.jsx)("th",{scope:"col",children:"Full"}),Object(i.jsx)("th",{scope:"col",children:"Empty"}),Object(i.jsx)("th",{scope:"col",children:"Price"}),Object(i.jsx)("th",{scope:"col",children:"Total Amount"}),Object(i.jsx)("th",{scope:"col",children:"Amount Recieved"}),Object(i.jsx)("th",{scope:"col",children:"Pending Amount"}),Object(i.jsx)("th",{scope:"col",children:"Pending Empty(s)"}),Object(i.jsx)("th",{scope:"col",children:"Booked On"})]})}),Object(i.jsx)("tbody",{children:u.map((function(e){var t=e.key,c=e.gas_cylinder_type,n=e.quantity,s=e.empty,r=e.price,o=e.booked_on,l=e.amount,d=e.amountr,a=e.pending_amount,j=e.pending_empty;return Object(i.jsxs)("tr",{style:{backgroundColor:"white"},children:[Object(i.jsx)("td",{children:c}),Object(i.jsx)("td",{children:n}),Object(i.jsx)("td",{children:s}),Object(i.jsx)("td",{children:r}),Object(i.jsx)("td",{children:l}),Object(i.jsx)("td",{children:d}),Object(i.jsx)("td",{children:a}),Object(i.jsx)("td",{children:j}),Object(i.jsx)("td",{children:new Date(1e3*o.seconds).toLocaleDateString("en-UK")+" at "+new Date(1e3*o.seconds).toLocaleTimeString()})]},t)}))})]})})]})}}}]);
//# sourceMappingURL=19.faf091a4.chunk.js.map