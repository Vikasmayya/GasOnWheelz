import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firestore } from '../Firebase';

const CustomerInfo = () => {
    const {key} = useParams();
    const[data,setData] = useState({
        name:"",
        phone:"",
        EName:"",
        address:"",
        nKGD:"",
        sKGD:"",
        tKGD:"",
        delivery:"",
        gstin:"",
    });

    const InputEvent= (event)=>{
        const {name,value} = event.target;
        setData((preVal) =>{
            return{...preVal, [name] : value,}
        });
    };

    useEffect(() =>{
        const firebaseData = firestore.collection("customers").doc(key)
        .onSnapshot(documentSnapshot =>{
            setData((documentSnapshot).data())
        });
        return () => firebaseData();
    }, [key]);

    const onUpdate = (e) => {
        e.preventDefault();
        firestore.collection("customers").doc(key).update({name : data.name,
            EName: data.EName,
            address: data.address,
            phone : data.phone,
            nKGD:Number(data.nKGD),
            sKGD:Number(data.sKGD),
            tKGD:Number(data.tKGD),
            delivery:Number(data.delivery),
            gstin: data.gstin,
        })
            .then(() =>{
                alert(`Your customer ${data.name}'s data is updated successfully.`)
            })
            .catch(error => {
                alert(error.message);
            });
      }

    return (
        <>
        <div style={{backgroundColor:"white", borderRadius:"0.75rem", width:"90%"}} className="container py-4 mt-5">
            <div className="mb-4">
                <h1 className="text-center fw-bold">Customer Details Edit</h1>
            </div>
            <div className="container contact_div">
                <div className="row">
                  <div className="col-md-6 col-10 mx-auto">
                      <form onSubmit={onUpdate}>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold" >Customer Name or Company Name</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="name" value={data.name || ''} onChange={InputEvent} placeholder="Enter Customer's Name" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Mobile Number</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="phone" value={data.phone || ''} onChange={InputEvent} placeholder="Enter Customer's Mobile Number" pattern="[6-9]{1}[0-9]{9}" style={{fontSize:'1.125rem'}} disabled/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Employee Name</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="EName" value={data.EName || ''} onChange={InputEvent} placeholder="Enter Employee's Name through which customer is Registered" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Customer's Address</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="address" value={data.address || ''} onChange={InputEvent} placeholder="Enter Customer's Address" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}} required/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Customer's Delivery charges</label>
                        <input type="number" className="form-control round" id="exampleFormControlInput1" name="delivery" value={data.delivery || ''} onChange={InputEvent} placeholder="Enter Customer's Delivery charges" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Customer's Discount for 19KG</label>
                        <input type="number" className="form-control round" id="exampleFormControlInput1" name="nKGD" value={data.nKGD || ''} onChange={InputEvent} placeholder="Enter Customer's Discount Price for 19kg" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Customer's Discount for 17KG</label>
                        <input type="number" className="form-control round" id="exampleFormControlInput1" name="sKGD" value={data.sKGD || ''} onChange={InputEvent} placeholder="Enter Customer's Discount Price for 17kg" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Customer's Discount for 12KG</label>
                        <input type="number" className="form-control round" id="exampleFormControlInput1" name="tKGD" value={data.tKGD || ''} onChange={InputEvent} placeholder="Enter Customer's Discount Price for 12kg" style={{backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}/>
                        </div>
                        <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label fw-bold">Customer's GSTIN/UIN Number</label>
                        <input type="text" className="form-control round" id="exampleFormControlInput1" name="gstin" value={data.gstin || ''} onChange={InputEvent} placeholder="Enter Customer's GSTIN/UIN Number" style={{textTransform:"uppercase",backgroundColor:"#F6FAFD", fontSize:'1.125rem'}}/>
                        </div>
                        <div className="col-12">
                          <button className="btn btn-outline-primary" type="submit">Update</button>
                        </div>
                      </form>
                  </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CustomerInfo;

//,nKGD:0,sKGD:0, tKGD:0,