import React, { useState } from 'react';
import {firestore} from './Firebase';
import {serverTimestamp} from "firebase/firestore";

const Registration =({showAlert}) => {

    var retrievedname = sessionStorage.getItem('name');
    const[data,setData] = useState({
        fname:"",
        lname:"",
        phone:"",
        address:"",
        street:"",
        city:"",
        state:"",
        zip:"",
    });

    const InputEvent= (event)=>{
        const {name,value} = event.target;
        setData((preVal) =>{
            return{...preVal, [name] : value,}
        });
    };
    const formSubmit =(e) =>{
        e.preventDefault();
        firestore.collection("customers").where("phone", "==", data.phone).get()
        .then((doc) => { 
            if(!doc.empty){
                showAlert("user already exists","danger");
            }else{
                firestore.collection("customers").doc(`GGTD${data.phone}`).set({
                    name : data.fname+ " "+data.lname,
                    EName: retrievedname,
                    address : data.address,
                    street : data.street,
                    state : data.state,
                    city : data.city,
                    zip : data.zip,
                    phone : data.phone,
                    gstin : "",
                    nKGD:Number(0),
                    sKGD:Number(0),
                    tKGD:Number(0),
                    delivery:Number(0),
                    date : serverTimestamp(),
                })      
                .then(() =>{
                    showAlert(` ${data.fname} is Registered successfully. He can now order Gas Cylinder.`)
                    setData({
                        fname:"",
                        lname:"",
                        phone:"",
                        address:"",
                        city:"",
                        state:"",
                        zip:"",
                        country:"",
                    })
                }).catch(error => { showAlert(error.message); });
            }
        }).catch(error => { showAlert(error.message); });
        
    };

    return (
        <>
            <div style={{backgroundColor:"white", borderRadius:"0.75rem", width:"90%"}} className="container py-4 mt-5">
                <div className=" mb-4">
                    <h3 className="text-center fw-bold">New Customer Registration</h3>
                </div>
                <div className="row">
                    <div className="col-10 mx-auto">
                        <form onSubmit={formSubmit}>
                        <div className="row mb-3">
                            <div className="col-lg-6 ">
                            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold" >First Name</label>
                            <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="text" id="exampleFormControlInput1" className="form-control round" placeholder="First name" name="fname" value={data.fname} onChange={InputEvent} required/>
                            </div>
                            <div className="col-lg-6">
                            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold" >Last Name</label>
                            <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="text" id="exampleFormControlInput1" className="form-control round" placeholder="Last name" name="lname" value={data.lname} onChange={InputEvent} required/>
                            </div>
                        </div>
                        <div className="col-lg-6 mb-3 pr-lg-2">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Mobile Number</label>
                        <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="text" className="form-control round" id="exampleFormControlInput1" name="phone" value={data.phone} onChange={InputEvent} placeholder="Enter Customer's Mobile Number" pattern="[6-9]{1}[0-9]{9}" required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Address Details</label>
                        <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="text" className="form-control round" id="exampleFormControlInput1" name="address" value={data.address} onChange={InputEvent} placeholder="Building/house number " required/>
                        </div>
                        <div className="row">
                            <div className="col-lg-6 mb-3">
                            <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="text" id="exampleFormControlInput1" className="form-control round" placeholder="Street Name" name="state" value={data.street} onChange={InputEvent} required/>
                            </div>
                            <div className="col-lg-6 mb-3">
                            <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="text" list="cname" id="exampleFormControlInput1" className="form-control round" placeholder="City" name="city" value={data.city} onChange={InputEvent} required/>
                            <datalist id="cname">
                                <option>Bengaluru</option>
                            </datalist>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-lg-6 mb-3">
                            <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="text" list="sname" id="exampleFormControlInput1" className="form-control round" placeholder="State" name="state" value={data.state} onChange={InputEvent} required/>
                            <datalist id="sname">
                                <option>Karnataka</option>
                            </datalist>
                            </div>
                            <div className="col-lg-6">
                            <input style={{backgroundColor:"rgb(231 232 239)", fontSize:'1.125rem'}} type="number" id="exampleFormControlInput1" className="form-control round" placeholder="Zip/Postal Code" name="zip" value={data.zip} onChange={InputEvent} pattern="[1-9]{1}[0-9]{5}" required/>
                            </div>
                        </div>
                        <div className="col float-end">
                            <button className="btn btn-primary px-5" type="submit">Register</button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Registration;