import React,{useState,useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';
import { firestore } from '../Firebase';
import jsPDF from 'jspdf';
import web from "../images/project_orange_logo.png";

const BookDetails = ({post,handleClose}) => {
  const [Customer, setCustomer] =useState({
    address:"",
    gstin:"",
  });
  useEffect(() =>{
    firestore.collection("customers").doc(`GGTD${post.phone}`).get()
      .then((doc) => {
        if(doc){
          setCustomer(doc.data());
        }
      })
  }, [post.phone]);

  const generatePdf = () =>{
    var company_Info={
      Name:'Gopal Govinda Total Distributors',
      GSTIN:'29DHXPG5165D1ZV',
      State:'Karnataka, Code : 29',
      AddressLine1:'Khatha No.630/595/194/2, Suggata Main Road,',
      AddressLine2:'Jala Hobli, Hunasamaranahalli Village,',
      AddressLine3:'Bengaluru',
      PIN: '562157',
    };

    var GSTInfo ={
      CGSTPercent: post.gas_cylinder_type==='19KG'? "9%" : post.gas_cylinder_type==='12KG'? "2.5%" : "9%" ,
      GSTPercent: post.gas_cylinder_type==='19KG'? "18%" : post.gas_cylinder_type==='12KG'? "5%" : "18%" ,
      GSTAmount : post.gas_cylinder_type==='19KG'? 0.18*post.amount : post.gas_cylinder_type==='12KG'? 0.05*post.amount : 0.18*post.amount ,
      GSTncRate: post.gas_cylinder_type==='19KG'? 0.18*post.ncprice : post.gas_cylinder_type==='12KG'? 0.05*post.ncprice : 0.18*post.ncprice ,
      GSTRate: post.gas_cylinder_type==='19KG'? 0.18*post.price : post.gas_cylinder_type==='12KG'? 0.05*post.price : 0.18*post.price ,
    };
  
    var generateData = function(amount) {
      var result = [];
      var data = {
        Product: post.gas_cylinder_type==='19KG'? "Commercial LPG 19 Kgs" : post.gas_cylinder_type==='12KG'? "Domestic LPG 12 Kgs" : "Commercial LPG 17 Kgs" ,
        Quantity: post.quantity+".00 NOS",
        Rate: post.ncprice? "Rs."+parseFloat(post.ncprice-GSTInfo.GSTncRate).toFixed(2) : "Rs."+parseFloat(post.price-GSTInfo.GSTRate).toFixed(2),
        per: "NOS",
        Amount: "Rs."+parseFloat(post.amount-GSTInfo.GSTAmount).toFixed(2),
      };
      for (var i = 0; i < amount; i += 1) {
        data.id = (i + 1).toString();
        result.push(Object.assign({}, data));
      }
      return result;
    };
    
    function createHeaders(keys) {
      var result = [];
      for (var i = 0; i < keys.length; i += 1) {
        result.push({
          id: keys[i],
          name: keys[i],
          prompt: keys[i],
          width: 45,
          align: "center",
          padding: 0
        });
      }
      return result;
    }
    
    var headers = createHeaders([
      "id",
      "Product",
      "Quantity",
      "Rate",
      "per",
      "Amount"
    ]);
    
    var doc = new jsPDF();
    doc.setFontSize(10);
    doc.setFontSize(15);
    doc.setFont("times", "bold");
    doc.text("TAX INVOICE", 85, 15);
    doc.setFontSize(10);
    doc.setLineWidth(0.1);
    doc.line(4, 20, 206.5, 20);
    doc.line(105.2, 20, 105.2, 80);//vertical
    doc.setFont("times", "normal");
    doc.text("Date :", 110, 30);
    doc.setFont("times", "bold");
    doc.text(new Date(post.booked_on.seconds * 1000).toLocaleDateString([], { dateStyle:"long" }), 120, 30);
    doc.setFont("times", "normal");
    doc.text("Invoice No : ", 8, 30);
    doc.setFont("times", "bold");
    doc.text(post.key, 28, 30);
    doc.line(4, 35, 206.5, 35);
    doc.setFont("times", "normal");
    doc.text("Seller(Bill From)", 8, 40);
    doc.setFont("times", "bold");
    doc.text(company_Info.Name, 8, 45);
    doc.text(company_Info.AddressLine1, 8, 50);
    doc.text(company_Info.AddressLine2, 8, 55);
    doc.text(company_Info.AddressLine3+" - "+company_Info.PIN, 8, 60);
    doc.text("GST/UIN : "+company_Info.GSTIN, 8, 65);
    doc.text("State Name : "+company_Info.State, 8, 70);
    doc.setFont("times", "normal");
    doc.text("Buyer(Bill To)", 110, 40);
    doc.setFont("times", "bold");
    doc.text(post.name, 110, 45);
    doc.text(company_Info.AddressLine1, 110, 50);
    doc.text(company_Info.AddressLine2, 110, 55);
    doc.text(company_Info.AddressLine3+" - "+company_Info.PIN, 110, 60);
    doc.text("GST/UIN : "+(Customer && Customer["gstin"]) || "N/A", 110, 65);
    doc.text("State Name : "+company_Info.State, 110, 70);
    doc.table(4, 80, generateData(1), headers,);
    doc.text("CGST : ", 8, 115);
    doc.text(GSTInfo.CGSTPercent, 120, 115);
    doc.text("Rs "+(GSTInfo.GSTAmount/2).toFixed(2), 178, 115);
    doc.line(4, 119, 206.5, 119);
    doc.text("SGST : ", 8, 125);
    doc.text(GSTInfo.CGSTPercent, 120, 125);
    doc.text("Rs "+(GSTInfo.GSTAmount/2).toFixed(2), 178, 125);
    doc.line(4, 129, 206.5, 129);
    doc.text("Total Tax : ", 8, 135);
    doc.text(GSTInfo.GSTPercent, 120, 135);
    doc.text("Rs "+GSTInfo.GSTAmount.toFixed(2), 178, 135);
    doc.line(4, 139, 206.5, 139);
    doc.text("Total : ", 8, 145);
    doc.text(post.quantity+".00 NOS", 78, 145);
    doc.text("Rs."+post.amount.toFixed(2), 178, 145);
    doc.line(206.5, 20, 206.5, 280);//vertical
    doc.line(4, 20, 4, 280);//vertical
    doc.line(4, 149, 206.5, 149);
    doc.text("Company’s Bank Details", 8, 235);
    doc.text("Bank Name : HDFC BANK", 8, 240);
    doc.text("A/c No. : 50200020730245", 8, 245);
    doc.text("Branch & IFS Code : YELAHANKA & HDFC0000371", 8, 250);
    doc.setFont("times", "bold");
    doc.text("Declaration :", 8, 265);
    doc.setFont("times", "normal");
    doc.text("We declare that this invoice shows the actual price of the", 8, 270);
    doc.text("goods described and that all particulars are true and correct.", 8, 275);
    doc.setFont("times", "bold");
    doc.line(110, 230, 206.5, 230);
    doc.line(110, 230, 110, 280);//vertical
    doc.text("for Gopal Govinda Total Distributors.", 135, 240);
    doc.text("Authorised Signatory", 165, 275);
    doc.setFont("times", "normal");
    doc.line(4, 280, 206.5, 280);
    doc.addImage(web, "JPEG", 8, 285, 8, 8);
    doc.text("Powered by Gas on Wheelz.", 18, 290);
    doc.text("This is a Computer generated Document.", 135, 290);
    doc.save(`${post.name}.pdf`);
  }

  return (
    <>
    <div className="my-1 text-nowrap ">
        <div className="float-end">
        <Tooltip title="Close Menu">
        <IconButton onClick={handleClose} sx={{backgroundColor:"#2752E7"}}>
          <CloseIcon sx={{color:"#FFFFFF"}}/>
        </IconButton>  
        </Tooltip>
        </div>
        <h1 className="text-center ms-4 fw-bolder">Booking Details </h1>
        <h6 className="text-center">{new Date(post.booked_on.seconds * 1000).toLocaleDateString([], { dateStyle:"long" })} at {new Date(post.booked_on.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" })}</h6>
    </div>
    <div className="row">
      <div className="col-lg-6">
        <div className="row mt-1">
        <h6 className="fw-bold">Customer Details</h6>
        <div className="col-lg-10 ">
          <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Name or Company Name</label>
          <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control round" name="name" value={post.name} disabled/>
        </div>
        <div className="col-lg-10 ">
          <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >GSTIN/UIN</label>
          <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control round" name="name" value={(Customer && Customer["gstin"]) || "N/A"} disabled/>
        </div>
        <div className="col-lg-10 ">
          <label htmlFor="exampleFormControlTextarea1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Customer's Address</label>
          <textarea rows="3" style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlTextarea1" className="form-control round" name="name" value={(Customer && Customer["address"]) || "N/A"} disabled/>
        </div>
        <div className="col-lg-5 ">
          <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Booking Id</label>
          <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control round" name="id" value={post.key? post.key: "N/A"} disabled/>
        </div>
        <div className="col-lg-3">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Booked by</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control p-1 text-center round" name="bamount" value={post.booked_by? post.booked_by: "N/A"} disabled/>
        </div>
        </div>
      </div>
      <div className="col-lg-6">
        <h6 className="fw-bold">Order Status & Type</h6>
        {post.order_status==="INCOMPLETE"? <h6 className="d-inline me-2 incomplete">Incomplete</h6> : <h6 className="d-inline me-2 complete">Complete</h6>}
        {post.order_type==="NEW_CONNECTION"? <h6 className="ms-2 d-inline newConn">New-Connection</h6>: <h6 className="ms-2 d-inline refill">Refill</h6> }
        <div className="row mt-1">
          <h6 className="fw-bold">Pricing Details</h6>
          <div className="col-lg-3">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Refill Price</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control text-center round" name="ncprice" value={post.ncprice? "₹ "+post.ncprice+'.00' : "₹ 00.00"} disabled/>
          </div>
          <div className="col-lg-3">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >New Connection Price</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control text-center round" name="price" value={post.price? "₹ "+post.price+'.00' : "₹ 00.00"} disabled/>
          </div>
        </div>
        <div className="row mt-2">
          <h6 className="fw-bold">Cylinder Details</h6>
          <div className="col-lg-2 ">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Type</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control text-center round" name="type" value={post.gas_cylinder_type} disabled/>
          </div>
          <div className="col-lg-2">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Qty</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control text-center round" name="quantity" value={post.quantity} disabled/>
          </div>
          <div className="col-lg-2">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Empty Recv</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control text-center round" name="empty" value={post.order_type==="NEW_CONNECTION"? "N/A" : post.empty} disabled/>
          </div>
          <div className="col-lg-2">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Empty Bal</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control text-center round" name="lname" value={post.order_type==="NEW_CONNECTION"? "N/A" : post.pending_empty} disabled/>
          </div>
        </div>
        <div className="row mt-1">
          <h6 className="fw-bold">Transaction Details</h6>
          <div className="col-lg-3">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Total Amount</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control p-1 text-center round" name="tamount" value={post.amount? "₹ "+post.amount+'.00' : "₹ 00.00"}  disabled/>
          </div>
          <div className="col-lg-3">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Recieved Amount</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control p-1 text-center round" name="ramount" value={post.amountr? "₹ "+post.amountr+'.00' : "₹ 00.00"} disabled/>
          </div>
          <div className="col-lg-3">
            <label htmlFor="exampleFormControlInput1" style={{fontSize:"1rem", color:"#7E92A2"}} className="form-label text-nowrap" >Balance Amount</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" id="exampleFormControlInput1" className="form-control p-1 text-center round" name="bamount" value={post.pending_amount? "₹ "+post.pending_amount+'.00' : "₹ 00.00"} disabled/>
          </div>
        </div>
      </div>
    </div>
    <div className="my-2 mx-5 text-center">
    {post.order_status==="INCOMPLETE"? <button type="button" className="btn btn-primary" disabled>Generate Invoice </button>
    :<button type="button" onClick={generatePdf} className="btn btn-primary" >Generate Invoice </button> }
    </div>
    </>
  )
}

export default BookDetails;