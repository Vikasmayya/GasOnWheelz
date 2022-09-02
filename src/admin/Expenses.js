import React, { useState } from 'react';
import { firestore } from '../Firebase';
import {increment} from 'firebase/firestore';
import { Button} from '@mui/material';

const Expenses = ({alert,handleClose}) => {

    let date = new Date();
    let today = date.toDateString();
    const[data,setData] = useState({
        expenseType:"",
        exprice:"",
      });
    const InputEvent= (event)=>{
        const {name,value} = event.target;
        setData((preVal) =>{
            return{...preVal, [name] : value,}
        });
    };

    const expenseFormSubmit =(e) =>{
        e.preventDefault();
        firestore.collection("Expenses").doc(today).set({
            [data.expenseType]: increment(Number(data.exprice)),
        },{merge:true})      
        .then(() =>{
            firestore.collection("Daily_data").doc(today).set({
              expenses:{
              total_expenses: increment(Number(data.exprice)),
             },
            },{merge:true})      
          .then(() =>{
            firestore.collection("Capital").doc("capital").set({
                capital: increment(Number(-data.exprice)),
              },{merge:true})      
            .then(() =>{
                firestore.collection("Capital").doc("capital").get()
                .then((doc) => { let capital = doc.data().capital;
                    if(capital){
                        firestore.collection("Daily_data").doc(today).set({
                            Cash_balance: Number(capital),
                        },{merge:true})  
                        .then(() =>{
                            setData({exprice:"",expenseType:"",})
                            handleClose();
                            alert("Expense data submitted successfully.","success")
                        }).catch(error => { alert(error.message);});
                    }
                }).catch(error => { alert(error.message);});
            }).catch(error => { alert(error.message);});
          }).catch(error => { alert(error.message);});
        }).catch(error => { alert(error.message);});
    };
  return (
    <div className="container contact_div">
        <h3 className="text-center fw-bold">Add Expense </h3>
        <div className="row justify-content-center">
            <form onSubmit={expenseFormSubmit}>
                <div className="mb-3">
                <label htmlFor="exampleFormControlSelect1" className="form-label fw-bold">Type of Expense</label>
                <input style={{backgroundColor:"#F6FAFD"}} type="text" list="expenses"  className="form-control round" id="exampleFormControlInput1" name="expenseType" value={data.expenseType} onChange={InputEvent} placeholder="Enter type of Expense" required />
                <datalist id="expenses">
                    <option>Fuel</option>
                    <option>Salary</option>
                    <option>Tiffin</option>
                    <option>Lunch</option>
                </datalist>
                </div>
                <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Expense Price</label>
                <input style={{backgroundColor:"#F6FAFD"}} type="number" className="form-control round" id="exampleFormControlInput1" name="exprice" value={data.exprice} onChange={InputEvent} placeholder="Enter Price of the Expense" required/>
                </div>
                <button style={{width:"75%", marginLeft:"2.2em"}} className="btn btn-primary" type="submit">Add</button>
            </form>
            <div className="col-10  mt-3">
            <Button style={{textTransform:'capitalize',fontWeight:'bold'}}  className=" w-100" variant='text' onClick={handleClose}>Cancel</Button>
            </div>
        </div>
    </div>
  )
}

export default Expenses;