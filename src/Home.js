import React, {useState, useMemo,useEffect}  from 'react';
import { NavLink } from 'react-router-dom';
import { firestore } from "./Firebase";
import { firebaseAuth } from './Firebase';
import graph from "./images/icons/RedGraph.svg";
import Ggraph from "./images/icons/GreenGraph.svg";
import totalSales from "./images/icons/TotalSales.svg";
import CashBal from "./images/icons/CashBal.svg";
import CR from "./images/icons/CR.svg";
import Purchases from "./images/icons/Purchases.svg";
import pnloss from "./images/icons/pnl.svg";
import Chart from './Chart';
import Alerts from './Alerts';

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
    };

    const [alerts, setAlerts] = useState(null);
    const showAlert = (msg, type) =>{
      setAlerts({
          msg: msg,
          type:type,
      })
      setTimeout(() => {
        setAlerts(null);
      }, 5000);
      };
    const initialState = useMemo(() => [{
      Cash_balance : "0",
      total_sales_amount : "0",
      expenses : { total_expenses:"0",},
      purchases : {total_purchase_amount:"0",},}],[]);

    const [DailyData, setDailyData] =useState({initialState});  
    const pnl = (DailyData["total_sales_amount"] ? DailyData["total_sales_amount"] : 0)
              - (DailyData["expenses"] ? DailyData["expenses"].total_expenses : 0)
              - (DailyData["purchases"] ? DailyData["purchases"].total_purchase_amount : 0); 
              
    useEffect(() =>{
      firestore.collection("Daily_data").doc(new Date().toDateString()).get()
      .then(doc => {
        if (!doc.exists) {
          showAlert("Sorry!There doesn't exists any Data on this Date.","danger")
          setDailyData(...initialState);
        } else {
          setDailyData(doc.data());
        }
        })
      .catch(err => { console.log('Error getting document', err);})
    }, [initialState]);          
    
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
        {retrievedUsername && retrieval ?
        <>
        <div className="alert-container">
          <Alerts alert={alerts} />
        </div>
        <div style={{paddingLeft : '1em',paddingRight : '1em',paddingtTop : 0}}>
          <div className="mt-0 ms-3" style={{display: "inline-block"}}>
              <h4 style={{fontWeight:"700", marginBottom:0, marginTop:"0.3em", fontSize:'1.719rem', fontStyle:"bold"}}>Today's Stats</h4>
          </div>
          <div className="col" style={{paddingTop:"1.25rem"}}>
          <div className="row row-cols-1 row-cols-sm-1 row-cols-md-3 row-cols-lg-5 row-cols-xl-5">
            <div className="col">
              <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="float-start ms-3 mt-3"><img src={totalSales} alt="totalSales"/></div>
              <div className="float-end me-3 mt-3">{ DailyData["total_sales_amount"]> 0 ? <img src={Ggraph} alt="graph"/> : <img src={graph} alt="graph"/>}</div>
                <div className="card-body">  
                  <p className="card-text mb-1 mt-5">Total Sales</p>
                  <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["total_sales_amount"] && DailyData["total_sales_amount"]) || '00'}.00</h6>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="float-start ms-3 mt-3"><img src={CashBal} alt="CashBal"/></div>
              <div className="float-end me-3 mt-3">{ DailyData["Cash_balance"]> 0 ? <img src={Ggraph} alt="graph"/> : <img src={graph} alt="graph"/>}</div>
                <div className="card-body">  
                  <p className="card-text mb-1 mt-5">Cash Balance</p>
                  <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["Cash_balance"] && DailyData["Cash_balance"]) || '00'}.00</h6>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="float-start ms-3 mt-3"><img src={pnloss} alt="pnl"/></div>
              <div className="float-end me-3 mt-3">{ pnl > 0 ? <img src={Ggraph} alt="graph"/> : <img src={graph} alt="graph"/>}</div>
                <div className="card-body">  
                  <p className="card-text mb-1 mt-5"> Today's P&L</p>
                  <h6 className="card-subtitle fs-5 fw-bold">₹ {pnl || '00'}.00</h6>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="float-start ms-3 mt-3"><img src={Purchases} alt="purchases"/></div>
              <div className="float-end me-3 mt-3">{ DailyData["purchases"] > 0 ? <img src={graph} alt="graph"/> : <img src={Ggraph} alt="graph"/>}</div>
                <div className="card-body">  
                  <p className="card-text mb-1 mt-5">Purchases</p>
                  <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["purchases"] && DailyData["purchases"].total_purchase_amount) || '00'}.00</h6>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="float-start ms-3 mt-3"><img src={CR} alt="expense"/></div>
              <div className="float-end me-3 mt-3">{ DailyData["expenses"] && DailyData["expenses"].total_expenses > 110 ? <img src={graph} alt="graph"/> : <img src={Ggraph} alt="graph"/>}</div>
                <div className="card-body">  
                  <p className="card-text mb-1 mt-5">Expenses</p>
                  <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["expenses"] && DailyData["expenses"].total_expenses) || '00'}.00</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8">
                <div className="card border-light mb-3" style={{borderRadius:"1.125rem"}}>
                  <div className="card-body" style={{ boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"}}>
                    <h5 className="card-title fw-bold">Recent Bookings</h5>
                    <div className="table overflow-auto" >
                    <table className="table table-borderless">
                        <thead style={{backgroundColor : "#FBFBFB" , color: "black"}}>
                        <tr style={{borderRadius:"0.25em"}}>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Type</th>
                            <th className='text-right' scope="col">Full Qty</th>
                            <th className='text-right' scope="col">Empty Qty</th>
                            <th className='text-right' scope="col">Amount Paid</th>
                            <th className='text-right' scope="col">Balance Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        Bookings.map((post,index) => {
                            const { name, gas_cylinder_type, order_type, amount, empty, amountr,quantity } = post;
                        return(
                            <tr key={index} className="align-middle" style={{backgroundColor:"white", height:"1em" }}>
                                <td>{name}</td>
                                <td>{gas_cylinder_type}</td>
                                <td className='text-right'>{quantity}</td>
                                <td className='text-right'>{order_type==="NEW_CONNECTION"? <h6 className="mb-0">N/C</h6> : <h6 className='mb-0'>{empty}</h6>}</td>
                                <td className='text-right'>₹ {amount}.00</td>
                                <td className='text-right'>₹ {amountr}.00</td>
                            </tr>
                        )
                        })
                    }
                    </tbody>
                    </table>
                    <div style={{borderTop:"none"}} className=" text-center">
                    <NavLink to="/BList" style={{textDecoration:"none" }}>View more</NavLink></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card border-light mb-3" style={{borderRadius:"1.125rem"}}>
                  <div className="card-body" style={{ boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"}}>
                    <h5 className="fw-bold">Inventory stock details</h5>
                    <div>
                    <Chart/>
                    </div>
                </div>
                </div>
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