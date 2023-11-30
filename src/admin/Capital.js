import React, { useState } from 'react';
import { firestore } from '../Firebase';
import {serverTimestamp} from "firebase/firestore";
import {increment} from 'firebase/firestore';
import { Button} from '@mui/material';


const Capital = ({alert,handleClose}) => {

    let date = new Date();
    let today = date.toDateString();
    const[data,setData] = useState({
      camount:"",
      CapitalDesc:"",
    });

    const InputEvent= (event)=>{
        const {name,value} = event.target;
        setData((preVal) =>{
            return{...preVal, [name] : value,}
        });
    };

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const CapitalFormSubmit =(e) =>{
        e.preventDefault();
        setIsButtonDisabled(true);
        firestore.collection("Capital").doc("capital").set({
            capital: increment(Number(data.camount)),
        },{merge:true})      
        .then(() =>{
            firestore.collection("Capital").doc(today).set({
              Capital_amount: Number(data.camount),
              Capital_description : data.CapitalDesc,
              Invested_on: serverTimestamp(),
            },{merge:true})      
            .then(() =>{
                firestore.collection("Capital").doc("capital").get()
                .then((doc) => { let capital = doc.data().capital;
                    if(capital){
                        firestore.collection("Daily_data").doc(today).set({
                            Cash_balance: Number(capital),
                        },{merge:true})  
                        .then(() =>{
                            setData({camount:"",CapitalDesc:"",})
                            handleClose()
                            alert("Capital data submitted successfully.","success")
                        }).catch(error => { alert(error.message);});
                      }
                }).catch(error => { alert(error.message);});
            }).catch(error => { alert(error.message);});
        }).catch(error => { alert(error.message);});
    };
  return (
    <div className="container contact_div">
    <h3 className="text-center fw-bold">Add Capital </h3>
    <div className="row justify-content-center">
        <form onSubmit={CapitalFormSubmit}>
            <div className="mb-3">
            <label htmlFor="exampleFormControlSelect1" className="form-label fw-bold">Capital Description</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="text" className="form-control round" id="exampleFormControlInput1" name="CapitalDesc" value={data.CapitalDesc} onChange={InputEvent} placeholder="Enter Capital Description" required />
            </div>
            <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Capital Amount</label>
            <input style={{backgroundColor:"#F6FAFD"}} type="number" className="form-control round" id="exampleFormControlInput1" name="camount" value={data.camount} onChange={InputEvent} placeholder="Enter Capital Amount" required/>
            </div>
            {/* <div className="col-10 text-center"> */}
            <button style={{width:"75%", marginLeft:"2.2em"}} className="btn btn-primary" disabled={isButtonDisabled} type="submit">Add</button>
            {/* </div> */}
        </form>
            <div className="col-10  mt-3">
            <Button style={{textTransform:'capitalize',fontWeight:'bold'}} className=" w-100" variant='text' onClick={handleClose}>Cancel</Button>
            </div>
    </div>
    </div>
  )
}

export default Capital;