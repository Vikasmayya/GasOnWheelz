import React, { useEffect, useState } from 'react'
import { firestore } from '../Firebase';
import { PriceUpdate } from '../admin/PriceUpdate';

const Pricelist = ({showAlert}) => {
    const [price_list, setPrice_list] = useState([]);
    // const [alerts, setAlerts] = useState(null);

    // const showAlert = useCallback((msg, type) => {
    //   setAlerts({
    //       msg: msg,
    //       type:type,
    //   })
    //   setTimeout(() => {
    //     setAlerts(null);
    //   }, 2000);
    // },[]);

   useEffect(() =>{
    const getPostFromFirebase = [];
    const firebaseData = firestore.collection("price_list")
    .onSnapshot((querySnapshot) =>{
        querySnapshot.forEach( doc => {
            getPostFromFirebase.push({...doc.data(), key: doc.id,});
        });
        setPrice_list(getPostFromFirebase);
    });
    return () => firebaseData();
    }, []);

    return (
        <>
            <div className="my-0">
                <h4 style={{fontWeight:"600", paddingLeft:"0.5em",paddingRight:"0.5em"}}>Price Update</h4>
            </div>
            <div className="container-fluid mb-5">
            <div className="row pt-4">
                    <div className="col-12 mx-auto">
                        <div className="row gy-3">
                        {price_list.map(prices => (
                            <div className="col-md-4 col-10 mx-auto" key={prices.id}>
                            <PriceUpdate prices={prices} showAlert={showAlert} />
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Pricelist;