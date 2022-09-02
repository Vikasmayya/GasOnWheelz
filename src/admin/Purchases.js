import React, { useState } from 'react'
import { firestore } from '../Firebase';
import {increment} from 'firebase/firestore';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip } from '@mui/material';

const Purchases = ({alert,handleClose}) => {
    let date = new Date();
    let today = date.toDateString();
    const[data,setData] = useState({
      ncquantity:"",
      quantity:"",
      gas:"",
      empty:"",
      ncprice:"",
      price:"",
      type:"",
      dname:"",
    });

    const InputEvent= (event)=>{
      const {name,value} = event.target;
      setData((preVal) =>{
          return{...preVal, [name] : event.target.type === "number" ? parseInt(value) : value,}
      });
    };
    const formSubmit =(e) =>{
      e.preventDefault();
      if(data.type==="REFILL"){
        firestore.collection("Purchase").doc(today).set({
          [`${data.gas}${data.dname}${data.type}`]:{
            quantity: increment(Number(data.quantity)),
            gas: data.gas,
            empty: increment(Number(data.empty)),
            price: Number(data.price),
            amount: increment(Number(data.price* data.quantity)),
            dealer_name: data.dname,
          },
        },{merge:true})      
        .then(() =>{
          firestore.collection("Daily_data").doc(today).set({
            purchases:{
            total_purchase_amount: increment(Number(data.price* data.quantity)),
            [`${data.gas}full`]: increment(Number(data.quantity)),
            [`${data.gas}empty`]: increment(Number(data.empty)),
            [`${data.gas}Amount`]: increment(Number(data.price* data.quantity)),
           },
          },{merge:true})      
          .then(() =>{
            firestore.collection("Capital").doc("capital").set({
              capital: increment(Number(-data.price* data.quantity)),
            },{merge:true})      
            .then(() =>{
              firestore.collection("Capital").doc("capital").get()
              .then((doc) => { let capital = doc.data().capital;
                  if(capital){
                      firestore.collection("Daily_data").doc(today).set({
                          Cash_balance: Number(capital),
                      },{merge:true})  
                      .then(() =>{
                        setData({quantity:0, gas:"",empty:0,price:0,dname:"",amount:0,})
                        alert("Purchase data of REFILL submitted successfully.","success")
                        handleClose();
                      }).catch(error => { alert(error.message);});
                  }
              }).catch(error => { alert(error.message);});
            }).catch(error => { alert(error.message);});
          }).catch(error => { alert(error.message);});
        }).catch(error => { alert(error.message);});
      } else if(data.type==="NEW_CONNECTION"){
        firestore.collection("Purchase").doc(today).set({
          [`${data.gas}.${data.dname}.${data.type}`]:{
            quantity: increment(Number(data.ncquantity)),
            gas: data.gas,
            ncprice: Number(data.ncprice),
            amount: increment(Number(data.ncprice* data.ncquantity)),
            dealer_name: data.dname,
          },
        },{merge:true})      
        .then(() =>{
          firestore.collection("Daily_data").doc(today).set({
            purchases:{
            total_purchase_amount: increment(Number(data.ncprice* data.ncquantity)),
            [`${data.gas}full`]: increment(Number(data.ncquantity)),
            [`${data.gas}Amount`]: increment(Number(data.ncprice* data.ncquantity)),
           },
          },{merge:true})      
          .then(() =>{
            firestore.collection("Capital").doc("capital").set({
              capital: increment(Number(-data.ncprice* data.ncquantity)),
            },{merge:true})      
            .then(() =>{
              firestore.collection("Capital").doc("capital").get()
              .then((doc) => { let capital = doc.data().capital;
                  if(capital){
                      firestore.collection("Daily_data").doc(today).set({
                          Cash_balance: Number(capital),
                      },{merge:true})  
                      .then(() =>{
                        setData({ncquantity:0, gas:"",ncprice:0,dname:"",amount:0,})
                        alert("Purchase data of NEW_CONNECTION submitted successfully.","success")
                      }).catch(error => { alert(error.message);});
                  }
              }).catch(error => { alert(error.message);});
            }).catch(error => { alert(error.message);});
          }).catch(error => { alert(error.message);});
        }).catch(error => { alert(error.message);});
      }
    };

  return (
      <>
        <div className="container contact_div">
          <div className="my-1 text-nowrap ">
              <div className="float-end">
              <Tooltip title="Close Menu">
              <IconButton onClick={handleClose} sx={{backgroundColor:"#2752E7",marginTop:'-4rem'}}>
                <CloseIcon sx={{color:"#FFFFFF"}}/>
              </IconButton>  
              </Tooltip>
              </div>
              <h3 className="text-center my-5 fw-bolder">Purchase Form </h3>
          </div>
          <form onSubmit={formSubmit}>
              <div className="row">
                     <div className='col-lg-6'>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect1" className="form-label fw-bold">Type of Gas Cylinder Required</label>
                        <select style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} className="form-control round" id="exampleFormControlSelect1" name="gas" value={data.gas} onChange={InputEvent} required>
                          <option value="">Select Type Of Gas</option>
                          <option value="nKG">19 KG</option>
                          <option value="sKG">17 KG</option>
                          <option value="tKG">12 KG</option>
                        </select>
                      </div>
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Name of Dealer </label>
                      <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="text" list="dnames" className="form-control round" id="exampleFormControlInput1" name="dname" value={data.dname} onChange={InputEvent} placeholder="Enter the Dealer Name" required/>
                      <datalist id="dnames">
                          <option>TOIPL</option>
                          <option>Balaji</option>
                        </datalist>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlSelect1" className="form-label fw-bold">Type of order Required</label>
                        <select style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} className="form-control round" id="exampleFormControlSelect1" name="type" value={data.type} onChange={InputEvent} required>
                          <option style={{ fontSize:'0.875rem'}} value="">Select Type Of Purchase</option>
                          <option value="REFILL">Refill</option>
                          <option value="NEW_CONNECTION">New-Connection</option>
                        </select>
                      </div>
                     </div> 
                     <div className='col-lg-6'>
                      {data.type==="REFILL" ? 
                      <div>
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Purchase Price of Gas Cylinder Refill</label>
                      <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="number" className="form-control round" id="exampleFormControlInput1" name="price" value={data.price} onChange={InputEvent} placeholder="Enter Price of Gas Cylinder Refill" required/>
                      </div> 
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Number of Gas Cylinder Refill Recieved(Quantity)</label>
                      <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="number" className="form-control round" id="exampleFormControlInput1" name="quantity" value={data.quantity} onChange={InputEvent} placeholder="Enter Number of Gas Cylinder Required" required/>
                      </div> 
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Number of Empty Cylinder Given( Empty Quantity)</label>
                      <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="number" className="form-control round" id="exampleFormControlInput1" name="empty" value={data.empty} onChange={InputEvent} placeholder="Enter Number of Empty Cylinder Recieved" required/>
                      </div> 
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Total Amount </label>
                      <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="text" className="form-control round" id="exampleFormControlInput1" name="amount" value={data.price* data.quantity} onChange={InputEvent} placeholder="Enter the Amount" disabled/>
                      </div>
                      </div>
                      : 
                      <div>
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Purchase Price of New Connection</label>
                      <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="number" className="form-control round" id="exampleFormControlInput1" name="ncprice" value={data.ncprice} onChange={InputEvent} placeholder="Enter Price of Gas Cylinder + Refill" required/>
                      </div> 
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Number of Gas Cylinder Recieved(Quantity)</label>
                      <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="number" className="form-control round" id="exampleFormControlInput1" name="ncquantity" value={data.ncquantity} onChange={InputEvent} placeholder="Enter Number of Gas Cylinder Required" required/>
                      </div>
                      <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Total Amount </label>
                      <input style={{backgroundColor:"#0000000D", fontSize:'1.125rem'}} type="text" className="form-control round" id="exampleFormControlInput1" name="ncamount" value={data.ncprice* data.ncquantity} onChange={InputEvent} placeholder="Enter the Amount" disabled/>
                      </div>
                      </div>
                      }
                      <div className="col-4 float-end">
                      <Tooltip title="Submit Purchase Order">
                        <button className="btn btn-primary w-100 text-white" type="submit">Submit</button>
                      </Tooltip>
                      </div>
                    </div>  
            </div>
                    </form>
                </div>
      </>
  )
}

export default Purchases;