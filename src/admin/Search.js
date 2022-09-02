import React, { useEffect, useState } from 'react';
import { firestore } from '../Firebase';
import { useLocation,useHistory, NavLink } from "react-router-dom";

const Search = ({showAlert}) => {
    const location = useLocation();
    let history = useHistory();
    var retrieval = sessionStorage.getItem('role');
    const [results, setResults] =useState([]);
    useEffect(() =>{
      let searchText
    try {
      searchText = location.state["searchText"] ?? []
      const getPostFromFirebase = [];
        const firebaseData = firestore.collection("customers")
        .where('phone', '==',searchText)
        .onSnapshot((querySnapshot) =>{
          if(!querySnapshot.empty){
            querySnapshot.forEach( doc => {
              getPostFromFirebase.push({...doc.data(), key: doc.id,});
          });
          setResults(getPostFromFirebase);
          }else{
            history.push("/Registration");        
            showAlert("Sorry! No such Customer Exists. Please check if the phone Number is correct. Or else get this customer Registered.","danger")
          }
        });
        return () => firebaseData();
    } catch(e) {
      history.push("/Registration");
    } }, [location, history, showAlert]);

    const [nKG, setnKG] =useState([]);
    const [nncprice, setnncprice] =useState([]);
    useEffect(() =>{
        const firebaseData = firestore.collection("price_list")
        .doc("19KG")
        .onSnapshot(documentSnapshot =>{
          try{
            setnKG((documentSnapshot).data().price)
            setnncprice((documentSnapshot).data().ncprice)
          }
          catch(e) {
            history.push("/Registration");
          }
      });
        return () => firebaseData();
    }, [history]);
    const [sKG, setsKG] =useState([]);
    const [sncprice, setsncprice] =useState([]);
    useEffect(() =>{
        const firebaseData = firestore.collection("price_list")
        .doc("17KG")
        .onSnapshot(documentSnapshot =>{
          try{
            setsKG((documentSnapshot).data().price)
            setsncprice((documentSnapshot).data().ncprice)
          }
          catch(e) {
            alert("network lost")
            history.push("/Registration");
          }
      });
        return () => firebaseData();
    }, [history]);
    const [tKG, settKG] =useState([]);
    const [tncprice, settncprice] =useState([]);
    useEffect(() =>{
        const firebaseData = firestore.collection("price_list")
        .doc("12KG")
        .onSnapshot(documentSnapshot =>{
          try{
            settKG((documentSnapshot).data().price)
            settncprice((documentSnapshot).data().ncprice)
          }
          catch(e) {
            alert("network lost")
            history.push("/Registration");
          }
      });
        return () => firebaseData();
    }, [history]);
    
  return (
    <>
       {
        results.map((result) => {
              const { key, name, phone, nKGD, sKGD, tKGD, delivery } = result; 
            return(
            <div key={key} className="results" >
                {/* <CData name={name} phone={phone} nKGP={nKG-nKGD+delivery} sKGP={sKG-sKGD+delivery} tKGP={tKG-tKGD+delivery} delivery={delivery}/> */}
                <div className="col-md-4 col-10 mx-auto">
            <div className="card ">
                <div className="card-header">
                    <h5 className="card-title fw-bold">{name}</h5>
                    <p className="card-text">Phone Number : {phone}</p>
                </div>
                <div className="card-body">
                    <h5 className="card-title fw-bold">View Customer's Order history</h5>
                    <NavLink to={`/RefillOrders/${phone}`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>Refill Orders</NavLink>
                    <NavLink to={`/NCorders/${phone}`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>N/C Orders</NavLink>               
                </div>
                <hr/>
                <div className="card-body">
                    <h5 className="card-title fw-bold">12KG Price(including Delivery) : {tKG-tKGD+delivery}</h5>
                    <h5 className="card-title fw-bold">12KG New Connection/Cylinder Price : {tncprice}</h5>
                    <p className="card-text">Delivery Charges : {delivery}</p>
                    <NavLink to={`/Booking/${phone}/12KG/${tKG-tKGD+delivery}/${name}/REFILL`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>12KG Refill</NavLink>
                    <span><NavLink to={`/NCBooking/${phone}/12KG/${tKG-tKGD+delivery+tncprice}/${name}/NEW_CONNECTION`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>12KG N/C</NavLink></span>
                </div>
                <hr/>
                <div className="card-body">
                    <h5 className="card-title fw-bold">17KG Price(including Delivery) : {sKG-sKGD+delivery}</h5>
                    <h5 className="card-title fw-bold">17KG New Connection/Cylinder Price : {sncprice}</h5>
                    <p className="card-text">Delivery Charges : {delivery}</p>
                    <NavLink to={`/Booking/${phone}/17KG/${sKG-sKGD+delivery}/${name}/REFILL`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>17KG Refill</NavLink>
                    <span><NavLink to={`/NCBooking/${phone}/17KG/${sKG-sKGD+delivery+sncprice}/${name}/NEW_CONNECTION`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>17KG N/C</NavLink></span>
                </div>
                <hr/>
                <div className="card-body">
                    <h5 className="card-title fw-bold">19KG Price(including Delivery) : {nKG-nKGD+delivery}</h5>
                    <h5 className="card-title fw-bold">19KG New Connection/Cylinder Price : {nncprice}</h5>
                    <p className="card-text">Delivery Charges : {delivery}</p>
                    <NavLink to={`/Booking/${phone}/19KG/${nKG-nKGD+delivery}/${name}/REFILL`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>19KG Refill</NavLink>
                    <span><NavLink to={`/NCBooking/${phone}/19KG/${nKG-nKGD+delivery+nncprice}/${name}/NEW_CONNECTION`} className="btn btn-primary" style={{marginRight: "0.5rem"}}>19KG N/C</NavLink></span>
                </div>
                {retrieval==="admin" ?
                <>
                <hr/>
                <div className="card-body">
                    <h5 className="card-title fw-bold">Edit Customer Details</h5>
                    <NavLink to={`/CustomerInfo/${key}`} className="btn btn-primary">Edit</NavLink>
                </div>
                </>
                : null }
            </div>
            </div>
            </div>
            )
        })
       }
    </>
  )
}

export default Search;