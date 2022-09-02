import React, { useEffect, useState }  from 'react';
import Card from './Card';
import { firebaseAuth, firestore } from './Firebase';

const Home = () => {
    var retrieval = sessionStorage.getItem('role');
    var retrievedUsername = sessionStorage.getItem('user_name');

    const onDelete = () =>{
        const user = firebaseAuth.currentUser;
        user.delete().then(() => {
        // User deleted.
        firebaseAuth.signOut();
        sessionStorage.clear();
        }).catch((error) => {
        // An error ocurred
        alert(error)
        });
    }

    const [prices, setPrices] =useState([]);
    useEffect(() =>{
        const getFromFirebase = [];
        const firebaseData = firestore.collection("price_list")
        .orderBy("title","desc")
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach( doc => {
                getFromFirebase.push({...doc.data(), key: doc.id,});
            });
            setPrices(getFromFirebase);
        });
        return () => firebaseData();
    }, []);
    

    return (
        <>
        {retrievedUsername && retrieval ?
        <>
            <div className="my-5">
            <h1 className="text-center">LPG Cylinder Details </h1>
        </div>
        <div className="container-fluid mb-5">
            <div className="row">
                <div className="col-10 mx-auto">
                    <div className="row gy-4">
                    {
                        prices.map((prices) => {
                            const { key, title, price } = prices;
                        return( <Card key={key} title={title} price={price}/> )
                        })
                    }
                    </div>
                </div>
            </div>
        </div>
        </>
        :retrievedUsername ?
        <>
            <div className="my-5">
                    <h1 className="text-center">Delete Account </h1>
            </div>
            <div className="container-fluid mb-5">
                <div className="row">
                    <div className="col-10 mx-auto">
                    <div className="row gy-4">
                    <div style={{textAlign:"center"}}>
                        <h1>Oops! Sorry,You no longer have access to this account</h1>
                        <button className="btn btn-outline-primary" onClick={onDelete}>Delete </button>
                    </div>
                    </div>
                    </div>
                </div>
            </div>
            </>
        : null    
        }
        </>
    );
};

export default Home;