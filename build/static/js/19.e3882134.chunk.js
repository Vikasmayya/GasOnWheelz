(this.webpackJsonpgasonwheelz=this.webpackJsonpgasonwheelz||[]).push([[19,26],{185:function(e,t,s){"use strict";s.r(t);s(8);var a=s(9);t.default=function(e){return e.alert&&Object(a.jsx)("div",{className:"alert alert-".concat(e.alert.type," alert-dismissible fade show"),role:"alert",id:"alerts",children:Object(a.jsx)("strong",{style:{textTransform:"capitalize"},children:e.alert.msg})})}},651:function(e,t,s){"use strict";s.r(t);var a=s(42),c=s(18),l=s(17),r=s(8),d=s(57),i=s(79),n=s.p+"static/media/RedGraph.540fe122.svg",o=s.p+"static/media/GreenGraph.2b69c7a2.svg",j=s.p+"static/media/TotalSales.ca2cf17b.svg",b=s.p+"static/media/CashBal.d8bf54a6.svg",m=s.p+"static/media/CR.698a299a.svg",h=s.p+"static/media/Purchases.6c81ce0b.svg",x=s.p+"static/media/pnl.1712e974.svg",O=s(421),u=s(9),p=function(e){var t=e.chartData;return Object(u.jsx)("div",{children:Object(u.jsx)(O.a,{data:t,options:{plugins:{title:{display:!1},legend:{display:!0,position:"top",align:"end",labels:{usePointStyle:!0}}},indexAxis:"y",elements:{bar:{borderWidth:1}},scales:{x:{grid:{display:!1}},y:{grid:{display:!1}}}}})})},g=s(337);function N(){var e=Object(r.useState)([]),t=Object(l.a)(e,2),s=t[0],a=t[1];return Object(r.useEffect)((function(){var e=i.c.collection("Capital").doc("capital").onSnapshot((function(e){a({labels:["12KG","17KG","19KG"],datasets:[{label:"Full ",data:[e.data().full_12KG,e.data().full_17KG,e.data().full_19KG],backgroundColor:["#2752E7"],borderColor:"transparent",borderWidth:1,borderRadius:10},{label:"Empty ",data:[e.data().empty_12KG,e.data().empty_17KG,e.data().empty_19KG],backgroundColor:["#FF4F4F"],borderWidth:1,borderRadius:10}]})}));return function(){return e()}}),[]),Object(u.jsx)(p,{chartData:s})}s(347).a.register(g.a);var v=s(185);t.default=function(){var e=sessionStorage.getItem("role"),t=sessionStorage.getItem("user_name"),s=Object(r.useState)(null),O=Object(l.a)(s,2),p=O[0],g=O[1],f=Object(r.useMemo)((function(){return[{Cash_balance:"0",total_sales_amount:"0",expenses:{total_expenses:"0"},purchases:{total_purchase_amount:"0"}}]}),[]),y=Object(r.useState)({initialState:f}),_=Object(l.a)(y,2),w=_[0],S=_[1],C=(w.total_sales_amount?w.total_sales_amount:0)-(w.expenses?w.expenses.total_expenses:0)-(w.purchases?w.purchases.total_purchase_amount:0);Object(r.useEffect)((function(){i.c.collection("Daily_data").doc((new Date).toDateString()).get().then((function(e){e.exists?S(e.data()):(g({msg:"Sorry!There doesn't exists any Data on this Date.",type:"danger"}),setTimeout((function(){g(null)}),5e3),S.apply(void 0,Object(c.a)(f)))})).catch((function(e){console.log("Error getting document",e)}))}),[f]);var D=Object(r.useState)([]),k=Object(l.a)(D,2),R=k[0],T=k[1];return Object(r.useEffect)((function(){var e=new Date;e.setDate(e.getDate()-1);var t=new Date;t.setDate(t.getDate()+1);var s=[],c=i.c.collection("Sales").where("booked_on",">",e).where("booked_on","<",t).orderBy("booked_on","desc").onSnapshot((function(e){e.forEach((function(e){s.push(Object(a.a)(Object(a.a)({},e.data()),{},{key:e.id}))})),T(s)}));return function(){return c()}}),[]),Object(u.jsx)(u.Fragment,{children:t&&e?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"alert-container",children:Object(u.jsx)(v.default,{alert:p})}),Object(u.jsxs)("div",{style:{paddingLeft:"1em",paddingRight:"1em",paddingtTop:0},children:[Object(u.jsx)("div",{className:"mt-0 ms-3",style:{display:"inline-block"},children:Object(u.jsx)("h4",{style:{fontWeight:"700",marginBottom:0,marginTop:"0.3em",fontSize:"1.719rem",fontStyle:"bold"},children:"Today's Stats"})}),Object(u.jsxs)("div",{className:"col",style:{paddingTop:"1.25rem"},children:[Object(u.jsxs)("div",{className:"row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-5 row-cols-xl-5",children:[Object(u.jsx)("div",{className:"col",children:Object(u.jsxs)("div",{className:"card border-light mb-3 ",style:{borderRadius:"1.125rem"},children:[Object(u.jsx)("div",{className:"float-start ms-3 mt-3",children:Object(u.jsx)("img",{src:j,alt:"totalSales"})}),Object(u.jsx)("div",{className:"float-end me-3 mt-3",children:w.total_sales_amount>0?Object(u.jsx)("img",{src:o,alt:"graph"}):Object(u.jsx)("img",{src:n,alt:"graph"})}),Object(u.jsxs)("div",{className:"card-body",children:[Object(u.jsx)("p",{className:"card-text mb-1 mt-5",children:"Total Sales"}),Object(u.jsxs)("h6",{className:"card-subtitle fs-5 fw-bold",children:["\u20b9 ",w.total_sales_amount&&w.total_sales_amount||"00",".00"]})]})]})}),Object(u.jsx)("div",{className:"col",children:Object(u.jsxs)("div",{className:"card border-light mb-3 ",style:{borderRadius:"1.125rem"},children:[Object(u.jsx)("div",{className:"float-start ms-3 mt-3",children:Object(u.jsx)("img",{src:b,alt:"CashBal"})}),Object(u.jsx)("div",{className:"float-end me-3 mt-3",children:w.Cash_balance>0?Object(u.jsx)("img",{src:o,alt:"graph"}):Object(u.jsx)("img",{src:n,alt:"graph"})}),Object(u.jsxs)("div",{className:"card-body",children:[Object(u.jsx)("p",{className:"card-text mb-1 mt-5",children:"Cash Balance"}),Object(u.jsxs)("h6",{className:"card-subtitle fs-5 fw-bold",children:["\u20b9 ",w.Cash_balance&&w.Cash_balance||"00",".00"]})]})]})}),Object(u.jsx)("div",{className:"col",children:Object(u.jsxs)("div",{className:"card border-light mb-3 ",style:{borderRadius:"1.125rem"},children:[Object(u.jsx)("div",{className:"float-start ms-3 mt-3",children:Object(u.jsx)("img",{src:x,alt:"pnl"})}),Object(u.jsx)("div",{className:"float-end me-3 mt-3",children:C>0?Object(u.jsx)("img",{src:o,alt:"graph"}):Object(u.jsx)("img",{src:n,alt:"graph"})}),Object(u.jsxs)("div",{className:"card-body",children:[Object(u.jsx)("p",{className:"card-text mb-1 mt-5",children:" Today's P&L"}),Object(u.jsxs)("h6",{className:"card-subtitle fs-5 fw-bold",children:["\u20b9 ",C||"00",".00"]})]})]})}),Object(u.jsx)("div",{className:"col",children:Object(u.jsxs)("div",{className:"card border-light mb-3 ",style:{borderRadius:"1.125rem"},children:[Object(u.jsx)("div",{className:"float-start ms-3 mt-3",children:Object(u.jsx)("img",{src:h,alt:"purchases"})}),Object(u.jsx)("div",{className:"float-end me-3 mt-3",children:w.purchases>0?Object(u.jsx)("img",{src:n,alt:"graph"}):Object(u.jsx)("img",{src:o,alt:"graph"})}),Object(u.jsxs)("div",{className:"card-body",children:[Object(u.jsx)("p",{className:"card-text mb-1 mt-5",children:"Purchases"}),Object(u.jsxs)("h6",{className:"card-subtitle fs-5 fw-bold",children:["\u20b9 ",w.purchases&&w.purchases.total_purchase_amount||"00",".00"]})]})]})}),Object(u.jsx)("div",{className:"col",children:Object(u.jsxs)("div",{className:"card border-light mb-3 ",style:{borderRadius:"1.125rem"},children:[Object(u.jsx)("div",{className:"float-start ms-3 mt-3",children:Object(u.jsx)("img",{src:m,alt:"expense"})}),Object(u.jsx)("div",{className:"float-end me-3 mt-3",children:w.expenses&&w.expenses.total_expenses>110?Object(u.jsx)("img",{src:n,alt:"graph"}):Object(u.jsx)("img",{src:o,alt:"graph"})}),Object(u.jsxs)("div",{className:"card-body",children:[Object(u.jsx)("p",{className:"card-text mb-1 mt-5",children:"Expenses"}),Object(u.jsxs)("h6",{className:"card-subtitle fs-5 fw-bold",children:["\u20b9 ",w.expenses&&w.expenses.total_expenses||"00",".00"]})]})]})})]}),Object(u.jsxs)("div",{className:"row",children:[Object(u.jsx)("div",{className:"col-lg-8",children:Object(u.jsx)("div",{className:"card border-light mb-3",style:{borderRadius:"1.125rem"},children:Object(u.jsxs)("div",{className:"card-body",style:{boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"},children:[Object(u.jsx)("h5",{className:"card-title fw-bold",children:"Recent Bookings"}),Object(u.jsxs)("div",{className:"table overflow-auto",children:[Object(u.jsxs)("table",{className:"table table-borderless",children:[Object(u.jsx)("thead",{style:{backgroundColor:"#FBFBFB",color:"black"},children:Object(u.jsxs)("tr",{style:{borderRadius:"0.25em"},children:[Object(u.jsx)("th",{scope:"col",children:"Customer Name"}),Object(u.jsx)("th",{scope:"col",children:"Type"}),Object(u.jsx)("th",{className:"text-right",scope:"col",children:"Full Qty"}),Object(u.jsx)("th",{className:"text-right",scope:"col",children:"Empty Qty"}),Object(u.jsx)("th",{className:"text-right",scope:"col",children:"Amount Paid"}),Object(u.jsx)("th",{className:"text-right",scope:"col",children:"Balance Amount"})]})}),Object(u.jsx)("tbody",{children:R.map((function(e,t){var s=e.name,a=e.gas_cylinder_type,c=e.order_type,l=e.amount,r=e.empty,d=e.amountr,i=e.quantity;return Object(u.jsxs)("tr",{className:"align-middle",style:{backgroundColor:"white",height:"1em"},children:[Object(u.jsx)("td",{children:s}),Object(u.jsx)("td",{children:a}),Object(u.jsx)("td",{className:"text-right",children:i}),Object(u.jsx)("td",{className:"text-right",children:"NEW_CONNECTION"===c?Object(u.jsx)("h6",{className:"mb-0",children:"N/C"}):Object(u.jsx)("h6",{className:"mb-0",children:r})}),Object(u.jsxs)("td",{className:"text-right",children:["\u20b9 ",l,".00"]}),Object(u.jsxs)("td",{className:"text-right",children:["\u20b9 ",d,".00"]})]},t)}))})]}),Object(u.jsx)("div",{style:{borderTop:"none"},className:" text-center",children:Object(u.jsx)(d.c,{to:"/BList",style:{textDecoration:"none"},children:"View more"})})]})]})})}),Object(u.jsx)("div",{className:"col-lg-4",children:Object(u.jsx)("div",{className:"card border-light mb-3",style:{borderRadius:"1.125rem"},children:Object(u.jsxs)("div",{className:"card-body",style:{boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"},children:[Object(u.jsx)("h5",{className:"fw-bold",children:"Inventory stock details"}),Object(u.jsx)("div",{children:Object(u.jsx)(N,{})})]})})})]})]})]})]}):t?Object(u.jsxs)(u.Fragment,{children:[Object(u.jsx)("div",{className:"my-5",children:Object(u.jsx)("h1",{className:"text-center",children:"Delete Account "})}),Object(u.jsx)("div",{className:"container-fluid mb-5",children:Object(u.jsx)("div",{className:"row",children:Object(u.jsx)("div",{className:"col-10 mx-auto",children:Object(u.jsx)("div",{className:"row gy-4",children:Object(u.jsxs)("div",{style:{textAlign:"center"},children:[Object(u.jsx)("h1",{children:"Oops! Sorry,You no longer have access to this account"}),Object(u.jsx)("button",{className:"btn btn-outline-primary",onClick:function(){i.b.currentUser.delete().then((function(){i.b.signOut(),sessionStorage.clear()})).catch((function(e){alert(e)}))},children:"Delete "})]})})})})})]}):null})}}}]);
//# sourceMappingURL=19.e3882134.chunk.js.map