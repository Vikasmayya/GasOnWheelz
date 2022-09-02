import React, { useState } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber  } from "firebase/auth";
import { useHistory, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {serverTimestamp} from "firebase/firestore";
import { firebaseAuth, firestore } from '../Firebase';
import {increment} from 'firebase/firestore';

const NCBooking = () => {
  
  let history = useHistory();
  const {phone, kg, price, name, amountr, quantity,order_type } = useParams();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  let date = new Date();
  let today = date.toDateString();
  var retrievedUsername = sessionStorage.getItem('user_name');
  var retrievedUseraim = sessionStorage.getItem('useraim');
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '1.125rem',
    boxShadow: 24,
    p: 4,
  };
  const auth = getAuth();
  const[data,setData] = useState({
        phone:"",
        otp:"",
        quantity: quantity || "",
        amountr: amountr || "",
        amount:"",
        pending_amount: "",
        order_status:"",
  });
  if ( price * data.quantity-data.amountr===0){
    data.order_status="COMPLETE"
  }else{
    data.order_status="INCOMPLETE"
  }

  const InputEvent= (event)=>{
    const {name,value} = event.target;
    setData((preVal) =>{
        return{...preVal, [name] : value,}
    });
  };

  const setUpRecaptcha = () =>{
      window["recaptchaVerifier"] = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          console.log("Recaptcha verified");
        }
      }, auth);
  };
  
  const onSignInSubmit = (e) =>{
    e.preventDefault();
    setUpRecaptcha();
  const phoneNumber = "+91" + phone;
  //console.log(phoneNumber);
  const appVerifier = window["recaptchaVerifier"];
  signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window["confirmationResult"] = confirmationResult;
        // console.log("otp sent to phoneNumber");
        setOpen(true);
      }).catch((error) => {
        // Error; SMS not sent
        // ...
        alert(error);
      });
  };

  const onSubmitOTP = (e) =>{
    e.preventDefault();
    setOpen(false)
    const code = data.otp;
        window["confirmationResult"].confirm(code).then((result) => {
          // User signed in successfully.
          // const user = result.user;
          // console.log(JSON.stringify(user));
          firestore.collection("Sales").doc().set({
            name: name,
            phone: phone,
            gas_cylinder_type: kg,
            ncprice: Number(price),
            quantity: Number(data.quantity),
            amountr: Number(data.amountr),
            amount: price * data.quantity,
            pending_amount: Number(price * data.quantity-data.amountr),
            order_status: data.order_status,
            order_type: order_type,
            booked_on : serverTimestamp(),
          })      
          .then(() =>{
            firestore.collection("Capital").doc("capital").set({
              capital: increment(Number(data.amountr)),
            },{merge:true})      
            .then(() =>{
              if(data.order_status==="COMPLETE"){
                firestore.collection("Daily_data").doc(today).set({
                  total_sales_amount: increment(Number(data.amountr)),
                    complete_orders:{
                        total_sales_amount_recv: increment(Number(data.amountr)),
                        total_sales_amount: increment(price * data.quantity),
                        [`full_${kg}`]: increment(data.quantity),
                        [`sales_amount_${kg}`]: increment(price * data.quantity),
                        [`sales_amount_recv_${kg}`]: increment(Number(data.amountr)),
                    },
                  },{merge:true})
                .then(() =>{
                  firestore.collection("Capital").doc("capital").get()
                  .then((doc) => { let capital = doc.data().capital;
                    if(capital){
                      firestore.collection("Daily_data").doc(today).set({
                          Cash_balance: Number(capital),
                      },{merge:true})  
                      .then(() =>{
                        history.push("/Registration");
                        alert(`Booking data recorded.`);
                        firebaseAuth.signInWithEmailAndPassword(retrievedUsername, retrievedUseraim);
                      }).catch(error => { alert(error.message);});
                    }
                  }).catch(error => { alert(error.message);});
                }).catch(error => { alert(error.message);});
              }else if(data.order_status==="INCOMPLETE"){
                firestore.collection("Daily_data").doc(today).set({
                  total_sales_amount: increment(Number(data.amountr)),
                    incomplete_orders:{
                      total_sales_amount_recv: increment(Number(data.amountr)),
                      total_sales_amount: increment(price * data.quantity),
                      [`full_${kg}`]: increment(data.quantity),
                      [`sales_amount_${kg}`]: increment(price * data.quantity),
                      [`sales_amount_recv_${kg}`]: increment(Number(data.amountr)),
                    },
                  },{merge:true})
                .then(() =>{
                  firestore.collection("Capital").doc("capital").get()
                  .then((doc) => { let capital = doc.data().capital;
                    if(capital){
                      firestore.collection("Daily_data").doc(today).set({
                          Cash_balance: Number(capital),
                      },{merge:true})  
                      .then(() =>{
                        history.push("/Registration");
                        alert(`Booking data recorded.`);
                        firebaseAuth.signInWithEmailAndPassword(retrievedUsername, retrievedUseraim);
                      }).catch(error => { alert(error.message);});
                    }
                  }).catch(error => { alert(error.message);});
                }).catch(error => { alert(error.message); });
              }
            }).catch(error => { alert(error.message); });
          }).catch(error => { alert(error.message); });
          // alert("User Verified successfully");
        }).catch((error) => {
          // User couldn't sign in (bad verification code?)
          // ...
          alert(error);
        });
  };
    return (
        <>
          <div style={{backgroundColor:"white", borderRadius:"0.75rem", width:"90%"}} className="container py-4 mt-5">
            <div className="my-5">
                <h1 className="text-center">Customer's New Connection Booking Page</h1>
            </div>
            <div className="container contact_div">
                <div className="row">
                  <div className="col-md-6 col-10 mx-auto">
                      <form onSubmit={onSignInSubmit}>
                        <div id="recaptcha-container"></div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Mobile Number</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="phone" value={phone} onChange={InputEvent} placeholder="Enter Customer's Mobile Number" pattern="[6-9]{1}[0-9]{9}" style={{fontSize:'1.125rem'}} disabled/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Type of Gas Cylinder Required</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="type" value={kg} onChange={InputEvent} placeholder="Enter Type Of Gas Required" style={{fontSize:'1.125rem'}} disabled/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">{kg} Gas Cylinder Price</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="price" value={price} onChange={InputEvent} placeholder="Enter Gas Cylinder Price" style={{fontSize:'1.125rem'}} disabled/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Number of New Cylinder Required(Quantity)</label>
                        <input type="number" className="form-control round" id="exampleFormControlInput1" name="quantity" value={data.quantity} onChange={InputEvent} placeholder="Enter Number of Gas Cylinder Required" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}  required/>
                        </div> 
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Total Amount </label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="amount" value={price * data.quantity} onChange={InputEvent} placeholder="Enter the Amount" style={{fontSize:'1.125rem'}} disabled/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Amount Recieved</label>
                        <input type="number" className="form-control round" id="exampleFormControlInput1" name="amountr" value={data.amountr} onChange={InputEvent} placeholder="Enter the Amount Recieved by the customer" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}  required/>
                        </div> 
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Total Pending Amount </label>
                        <input type="number" className="form-control round" id="exampleFormControlInput1" name="pending_amount" value={price * data.quantity-data.amountr} onChange={InputEvent} placeholder="Enter the pending Amount" style={{fontSize:'1.125rem'}} disabled/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">order_status </label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="order_status" value={data.order_status} onChange={InputEvent} placeholder="order status" style={{fontSize:'1.125rem'}} disabled/>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-outline-primary" type="submit">Verify</button>
                        </div>
                      </form>
                      <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box sx={style}>
                          <form onSubmit={onSubmitOTP}>
                              <div className="mb-3">
                              <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Enter OTP</label>
                              <input type="text" autoComplete="one-time-code" inputMode="numeric" className="form-control round" id="exampleFormControlInput1" name="otp" value={data.otp} onChange={InputEvent} placeholder="Enter OTP Number" pattern="[0-9]{6}" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}  required/>
                              </div> 
                              <div className="col-12">
                                  <button className="btn btn-outline-primary" type="submit">Verify OTP</button>
                              </div>
                          </form>
                          </Box>
                      </Modal> 
                  </div>
                </div>
            </div>
          </div>
        </>
    )
}

export default NCBooking;