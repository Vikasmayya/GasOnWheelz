import React, { useEffect, useState } from 'react';
import { useParams,useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Alerts from '../Alerts';
import { firestore } from '../Firebase';

const RefillOrders = () => {
    const {phone} = useParams();
    const [INBookings, setINBookings] =useState([]);
    const [Bookings, setBookings] =useState([]);
    let history = useHistory();
    
    const [alerts, setAlerts] = useState(null);
    const [Inalerts, setInAlerts] = useState(null);
    const showAlert = (msg, type) =>{
    setAlerts({
        msg: msg,
        type:type,
    })
    setTimeout(() => {
      setAlerts(null);
    }, 5000);
    }
    const showInAlert = (msg, type) =>{
      setInAlerts({
          msg: msg,
          type:type,
      })
      setTimeout(() => {
        setInAlerts(null);
      }, 7000);
      }

    useEffect(() =>{
      try {
        const getPostFromFirebase = [];
          const firebaseData = firestore.collection("Sales")
          .where('phone', '==',phone)
          .where('order_status', '==','INCOMPLETE')
          .where('order_type', '==','REFILL')
          .orderBy("booked_on","desc")
          .onSnapshot((querySnapshot) =>{
            if(!querySnapshot.empty){
              querySnapshot.forEach( doc => {
                getPostFromFirebase.push({...doc.data(), key: doc.id,});
            });
            setINBookings(getPostFromFirebase);
            }else{    
              showInAlert("CONGRATS! There doesn't exists any INCOMPLETE Orders from this Customer.","info") 
         }
          });
          return () => firebaseData();
      } catch(e) {
        history.push("/Registration");
      } }, [phone, history]);
      
      useEffect(() =>{
        try {
          const getPostFromFbase = [];
            const firebaseData = firestore.collection("Sales")
            .where('phone', '==',phone)
            .where('order_status', '==','COMPLETE')
            .where('order_type', '==','REFILL')
            .orderBy("booked_on","desc")
            .onSnapshot((querySnapshot) =>{
              if(!querySnapshot.empty){
                querySnapshot.forEach( doc => {
                  getPostFromFbase.push({...doc.data(), key: doc.id,});
              });
              setBookings(getPostFromFbase);
              }else{        
                showAlert("Sorry!There doesn't exists any COMPLETE Orders  from this Customer.","danger") 
              }
            });
            return () => firebaseData();
        } catch(e) {
          history.push("/Registration");
        } }, [phone, history]);
    

    return (
        <>
          <div className="alert-container">
          <Alerts alert={Inalerts} />
          <Alerts alert={alerts} />
          </div>
          <div className="my-2">
                <h4 className="text-center">Customer's INCOMPLETE Orders - Refill</h4>
          </div>
          <div className="table-responsive" style={{padding:"20px"}}>
           <table className="table table-borderless" >
            <thead className="thead-dark" style={{backgroundColor : "#c50c0c" , color: "white",borderColor: "black"}}>
            <tr>
                {/* <th scope="col">Customer's Name</th>
                <th scope="col">Phone Number</th> */}
                <th scope="col">Cylinder Type</th>
                <th scope="col">Full</th>
                <th scope="col">Empty</th>
                <th scope="col">Price</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Amount Recieved</th>
                <th scope="col">Pending Amount</th>
                <th scope="col">Pending Empty(s)</th>
                <th scope="col">Booked On</th>
                <th scope="col">Action</th>
                {/* <th scope="col">booked_by</th> */}
                </tr>
            </thead>
            <tbody>
           {
               INBookings.map((post) => {
                 const { key, name, gas_cylinder_type, quantity, empty, price, booked_on, amount, amountr, pending_amount, pending_empty,order_status } = post; 
               return(
                <tr key={key} style={{backgroundColor:"white" }}>
                    {/* <td>{name}</td>
                    <td>{phone}</td> */}
                    <td>{gas_cylinder_type}</td>
                    <td>{quantity}</td>
                    <td>{empty}</td>
                    <td>{price}</td>
                    <td>{amount}</td>
                    <td>{amountr}</td>
                    <td>{pending_amount}</td>
                    <td>{pending_empty}</td>
                    <td>{new Date(booked_on.seconds * 1000).toLocaleDateString("en-UK")+ " at "+new Date(booked_on.seconds * 1000).toLocaleTimeString() }</td>
                    <td>
                     <Link to={`/EditBooking/${phone}/${gas_cylinder_type}/${price}/${name}/${key}/${quantity}/${empty}/${amountr}/${order_status}`} className="btn btn-primary">
                          Edit
                     </Link>
                    </td>
                    </tr>
               )
            })
           }
           </tbody>
           </table>
          </div>
          <div className="my-2">
                <h4 className="text-center">Customer's COMPLETE Orders - Refill</h4>
          </div>
          <div className="table-responsive" style={{padding:"20px"}}>
           <table className="table table-borderless">
            <thead className="thead-dark" style={{backgroundColor : "grey" , color: "white",borderColor: "black"}}>
            <tr>
                {/* <th scope="col">Customer's Name</th>
                <th scope="col">Phone Number</th> */}
                <th scope="col">Cylinder Type</th>
                <th scope="col">Full</th>
                <th scope="col">Empty</th>
                <th scope="col">Price</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Amount Recieved</th>
                <th scope="col">Pending Amount</th>
                <th scope="col">Pending Empty(s)</th>
                <th scope="col">Booked On</th>
                {/* <th scope="col">booked_by</th> */}
                </tr>
            </thead>
            <tbody>
           {
               Bookings.map((post) => {
                 const { key, gas_cylinder_type, quantity, empty, price, booked_on, amount, amountr, pending_amount, pending_empty } = post; 
               return(
                <tr key={key} style={{backgroundColor:"white" }}>
                    {/* <td>{name}</td>
                    <td>{phone}</td> */}
                    <td>{gas_cylinder_type}</td>
                    <td>{quantity}</td>
                    <td>{empty}</td>
                    <td>{price}</td>
                    <td>{amount}</td>
                    <td>{amountr}</td>
                    <td>{pending_amount}</td>
                    <td>{pending_empty}</td>
                    <td>{new Date(booked_on.seconds * 1000).toLocaleDateString("en-UK")+ " at "+new Date(booked_on.seconds * 1000).toLocaleTimeString() }</td>
                    </tr>
               )
            })
           }
           </tbody>
           </table>
          </div>
        </>
    )
}

export default RefillOrders;