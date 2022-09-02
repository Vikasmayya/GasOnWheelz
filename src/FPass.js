import { Button} from '@mui/material';
import React, { useState } from 'react';
import { firebaseAuth } from './Firebase';

const FPass = ({handleClose}) => {
    const[data,setData] = useState({
        uid:"",
    });
    const InputEvent= (event)=>{
        const {name,value} = event.target;
        setData((preVal) =>{
            return{...preVal, [name] : value,}
        });
      };

      const formSubmit =(e) =>{
        e.preventDefault();
        firebaseAuth.sendPasswordResetEmail(data.uid)
        .then(() =>{
          alert(`Password Reset mail has been sent to ${data.uid}.`)
          setData({ uid:"",})
          handleClose();
        })
        .catch(error => {
            alert(error.message);
        });
      };
  return (
    <>
      <div className="container">
        <div className="my-1 text-nowrap ">
            <h3 className="text-center mb-5 fw-bolder">Password Reset </h3>
        </div>
        <div className="row">
        <div className="col">
            <form onSubmit={formSubmit}>
              <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">User ID</label>
              <input style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} type="text" className="form-control" id="exampleFormControlInput1" name="uid" value={data.uid} onChange={InputEvent} placeholder="Enter your User ID" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" required/>
              </div>
                <button style={{width:"100%"}} className="btn btn-primary" type="submit">Send Mail</button>
            </form>
            <div className="col-12  mt-3">
            <Button style={{textTransform:'capitalize',fontWeight:'bold'}}  className=" w-100" variant='text' onClick={handleClose}>Cancel</Button>
            </div>
        </div>
        </div>
      </div> 
    </>
  )
}

export default FPass;