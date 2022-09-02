import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from "../Firebase";

const BookingList = () => {
    const [Bookings, setBookings] =useState([]);
    
    useEffect(() =>{
        let start = new Date();
        start.setDate(start.getDate() - 1);
        let end = new Date();
        end.setDate(end.getDate() + 1);
        const getPostFromFirebase = [];
        const firebaseData = firestore.collection("Sales")
        .where("booked_on", ">", start)
        .where('booked_on', '<', end)
        .orderBy("booked_on","desc")
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach( doc => {
                getPostFromFirebase.push({...doc.data(), key: doc.id,});
            });
            setBookings(getPostFromFirebase);
        });
        return () => firebaseData();
    }, []);
    
    return (
        <>
           <div className="my-5">
                <h1 className="text-center">Booking History of last 24 hours</h1>
            </div>
           <div className="table-responsive" style={{padding:"20px"}}>
           <table className="table table-bordered" style={{borderColor: "transparent"}}>
            <thead className="thead-dark" style={{backgroundColor : "black" , color: "white",borderColor: "white"}}>
                <tr>
                <th scope="col">Customer's Name</th>
                <th scope="col"> Type</th>
                <th scope="col">Order Type</th>
                <th scope="col">Total Amount</th>
                <th scope="col">Amount Bal.</th>
                <th scope="col">Empty Bal.</th>
                <th scope="col">Order Status</th>
                <th scope="col">Booked On</th>
                <th scope="col">Action</th>
                {/* <th scope="col">booked_by</th> */}
                </tr>
            </thead>
           {
               Bookings.map((post) => {
                 const { key, name, gas_cylinder_type, order_type, booked_on, amount, pending_amount, pending_empty, order_status } = post; 
               return(
                <tbody key={key}>
                    <tr>
                    <td>{name}</td>
                    <td>{gas_cylinder_type}</td>
                    <td>{order_type}</td>
                    <td>{amount}</td>
                    <td>{pending_amount}</td>
                    <td>{pending_empty}</td>
                    <td>{order_status}</td>
                    <td>{new Date(booked_on.seconds * 1000).toLocaleDateString("en-UK")+ " at "+new Date(booked_on.seconds * 1000).toLocaleTimeString() }</td>
                    <td>
                     <Link to={`/BookDetails/${key}`} className="btn btn-primary">
                          More
                     </Link>
                    </td>
                    </tr>
                </tbody>
               )
            })
           }
           </table>
           </div>
        </>
    );
};

export default BookingList;