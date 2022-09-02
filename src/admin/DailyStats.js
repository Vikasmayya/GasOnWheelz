import React, { useEffect, useMemo, useState } from 'react';
import { firestore } from '../Firebase';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Alerts from '../Alerts';

const DailyStats = () => {
  
    const [dates, setDates] = useState(new Date());
    const[showbutton, setShowbutton] = useState(false);
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

    function handleSelect(item){
      setDates(item)
      setShowbutton(false)
    };
    
    const initialState = useMemo(() => [{
    Cash_balance : "",
    total_sales_amount : "",
    complete_orders : {
      tKG_full:"",
      tKG_empty:"",
      tKG_sales_amount:"",
      tKG_sales_amount_recv:"",
      sKG_full:"",
      sKG_empty:"",
      sKG_sales_amount:"",
      sKG_sales_amount_recv:"",
      nKG_full:"",
      nKG_empty:"",
      nKG_sales_amount:"",
      nKG_sales_amount_recv:"",
      total_sales_amount:"",
      total_sales_amount_recv: "",
    },
    incomplete_orders : {
      tKG_full:"",
      tKG_empty:"",
      tKG_sales_amount:"",
      tKG_sales_amount_recv:"",
      sKG_full:"",
      sKG_empty:"",
      sKG_sales_amount:"",
      sKG_sales_amount_recv:"",
      nKG_full:"",
      nKG_empty:"",
      nKG_sales_amount:"",
      nKG_sales_amount_recv:"",
      total_sales_amount:"",
      total_sales_amount_recv:"",
    },
    modified_orders : {
      tKG_full:"",
      tKG_empty:"",
      tKG_sales_amount:"",
      tKG_sales_amount_recv:"",
      sKG_full:"",
      sKG_empty:"",
      sKG_sales_amount:"",
      sKG_sales_amount_recv:"",
      nKG_full:"",
      nKG_empty:"",
      nKG_sales_amount:"",
      nKG_sales_amount_recv:"",
      total_sales_amount:"",
      total_sales_amount_recv:"",
    },
    expenses : {
      total_expenses:"",
    },
    purchases : {
      tKGempty:"",
      tKGfull:"",
      sKGempty:"",
      sKGfull:"",
      nKGempty:"",
      nKGfull:"",
      tKGAmount:"",
      sKGAmount:"",
      nKGAmount:"",
      total_purchase_amount:"",
    },}],[]);

    const [DailyData, setDailyData] =useState({initialState});
    const [capital,setCapital] = useState('');
    useEffect(() =>{
        firestore.collection("Capital").doc("capital").get()
        .then(document =>{
          try{
            setCapital(document.data().capital);
          }catch(e){showAlert("Sorry! Data can't be retrieved.","danger")}
          firestore.collection("Daily_data").doc(dates.toDateString()).get()
          .then(doc => {
            if (!doc.exists) {
              showAlert("Sorry!There doesn't exists any Data on this Date.","danger")
              setDailyData(...initialState);
            } else {
              setDailyData(doc.data());
            }
            })
          .catch(err => { console.log('Error getting document', err);})
        })
        .catch(err => { console.log('Error getting document', err);})
        
    }, [dates, initialState]);

    const pnl = (DailyData["total_sales_amount"] ? DailyData["total_sales_amount"] : 0)
              - (DailyData["expenses"] ? DailyData["expenses"].total_expenses : 0)
              - (DailyData["purchases"] ? DailyData["purchases"].total_purchase_amount : 0);    
    const tKGfull = (DailyData["complete_orders"] ?  DailyData["complete_orders"].tKG_full:0)
                   +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].tKG_full:0)
                   +(DailyData["modified_orders"] ? DailyData["modified_orders"].tKG_full:0);    
    const tKGempty = (DailyData["complete_orders"] ?  DailyData["complete_orders"].tKG_empty:0)
                   +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].tKG_empty:0)
                   +(DailyData["modified_orders"] ? DailyData["modified_orders"].tKG_empty:0);
    const sKGfull = (DailyData["complete_orders"] ?  DailyData["complete_orders"].sKG_full:0)
                   +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].sKG_full:0)
                   +(DailyData["modified_orders"] ? DailyData["modified_orders"].sKG_full:0); 
    const sKGempty = (DailyData["complete_orders"] ?  DailyData["complete_orders"].sKG_empty:0)
                   +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].sKG_empty:0)
                   +(DailyData["modified_orders"] ? DailyData["modified_orders"].sKG_empty:0);
    const nKGfull = (DailyData["complete_orders"] ?  DailyData["complete_orders"].nKG_full:0)
                   +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].nKG_full:0)
                   +(DailyData["modified_orders"] ? DailyData["modified_orders"].nKG_full:0);
    const nKGempty = (DailyData["complete_orders"] ?  DailyData["complete_orders"].nKG_empty:0)
                   +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].nKG_empty:0)
                   +(DailyData["modified_orders"] ? DailyData["modified_orders"].nKG_empty:0);                                                                                             
    return (
        <>
        <div className="alert-container">
          <Alerts alert={alerts} />
        </div>
        <div className="my-5">
                <h1 className="text-center">Daily Stats - {dates.toDateString()}</h1>
        </div>
        <div>
        <CalendarTodayIcon onClick={()=> setShowbutton(!showbutton)}/>
            {showbutton && 
            <div style={{"borderColor": 'darkgray', "border": "solid 1px", "display": "inline-block"}}>
              <Calendar onChange={handleSelect} date={dates} />
            </div>
            }
        </div>
        <div className="col-sm-4 col-10 mx-auto">
        <div className="row gy-4">
        <div className="card">
          <h3>Present Capital:</h3>
          <h5>Capital(realtime) = {capital || 0}</h5>
        </div>
        <div className="card">
          <h3>Sales Amount:</h3>
          <h5>total sales_amount = {(DailyData["total_sales_amount"] && DailyData["total_sales_amount"]) || 0}</h5>
        </div>
        <div className="card">
          <h3>Expenses:</h3>
          <h5>total_expenses = {(DailyData["expenses"] && DailyData["expenses"].total_expenses) || 0}</h5>
        </div>
        <div className="card">
          <h3>Purchases:</h3>
          <h5>total_purchase_amount = {(DailyData["purchases"] && DailyData["purchases"].total_purchase_amount) || 0}</h5>
        </div>
        <div className="card">
          <h3>Profit & Loss:</h3>
          <h5>Net Profit or Loss = {pnl}</h5>
        </div>
        <div className="card">
          <h3>Cash_balance:</h3>
          <h5>total Cash_balance = {(DailyData["Cash_balance"] && DailyData["Cash_balance"]) || 0}</h5>
        </div>
        <div className="card">
          <h3>Purchase Details(Accounts):</h3>
          <h5>12 KG_amount = {(DailyData["purchases"] && DailyData["purchases"].tKGAmount) || '00'}</h5>
          <h5>17 KG_amount = {(DailyData["purchases"] && DailyData["purchases"].sKGAmount) || '00'}</h5>
          <h5>19 KG_amount = {(DailyData["purchases"] && DailyData["purchases"].nKGAmount) || '00'}</h5>
        </div>
        <div className="card">
          <h3>Total Sales:</h3>
          <h5>12 KG_full delivered = {tKGfull || '00'}</h5>
          <h5>12 KG_empty recieved = {tKGempty || '00'}</h5>
          <h5>17 KG_full delivered = {sKGfull || '00'}</h5>
          <h5>17 KG_empty recieved = {sKGempty || '00'}</h5>
          <h5>19 KG_full delivered = {nKGfull || '00'}</h5>
          <h5>19 KG_empty recieved = {nKGempty || '00'}</h5>
        </div>
        <div className="card">
          <h3>Purchase Stock Details:</h3>
          <h5>12 KG_full - {(DailyData["purchases"] && DailyData["purchases"].tKGfull) || '00'}</h5>
          <h5>12 KG_empty - {(DailyData["purchases"] && DailyData["purchases"].tKGempty) || '00'}</h5>
          <h5>17 KG_full - {(DailyData["purchases"] && DailyData["purchases"].sKGfull) || '00'}</h5>
          <h5>17 KG_empty - {(DailyData["purchases"] && DailyData["purchases"].sKGempty) || '00'}</h5>
          <h5>19 KG_full - {(DailyData["purchases"] && DailyData["purchases"].nKGfull) || '00'}</h5>
          <h5>19 KG_empty - {(DailyData["purchases"] && DailyData["purchases"].nKGempty) || '00'}</h5>
        </div>
        <div className="card">
          <h3>Sales Data of Complete Orders:</h3>
          <h5>12 KG_full - {(DailyData["complete_orders"] && DailyData["complete_orders"].tKG_full) || '00'}</h5>
          <h5>12 KG_empty - {(DailyData["complete_orders"] && DailyData["complete_orders"].tKG_empty) || '00'}</h5>
          <h5>12 KG_sales_amount - {(DailyData["complete_orders"] && DailyData["complete_orders"].tKG_sales_amount) || '00'}</h5>
          <h5>12 KG_sales_amount_recieved - {(DailyData["complete_orders"] && DailyData["complete_orders"].tKG_sales_amount_recv) || '00'}</h5>
          <h5>17 KG_full - {(DailyData["complete_orders"] && DailyData["complete_orders"].sKG_full) || '00'}</h5>
          <h5>17 KG_empty - {(DailyData["complete_orders"] && DailyData["complete_orders"].sKG_empty) || '00'}</h5>
          <h5>17 KG_sales_amount - {(DailyData["complete_orders"] && DailyData["complete_orders"].sKG_sales_amount) || '00'}</h5>
          <h5>17 KG_sales_amount_recieved - {(DailyData["complete_orders"] && DailyData["complete_orders"].sKG_sales_amount_recv) || '00'}</h5>
          <h5>19 KG_full - {(DailyData["complete_orders"] && DailyData["complete_orders"].nKG_full) || '00'}</h5>
          <h5>19 KG_empty - {(DailyData["complete_orders"] && DailyData["complete_orders"].nKG_empty) || '00'}</h5>
          <h5>19 KG_sales_amount - {(DailyData["complete_orders"] && DailyData["complete_orders"].nKG_sales_amount) || '00'}</h5>
          <h5>19 KG_sales_amount_recieved - {(DailyData["complete_orders"] && DailyData["complete_orders"].nKG_sales_amount_recv) || '00'}</h5>
          <h5>total sales_amount - {(DailyData["complete_orders"] && DailyData["complete_orders"].total_sales_amount) || '00'}</h5>
          <h5>total sales_amount_recieved - {(DailyData["complete_orders"] && DailyData["complete_orders"].total_sales_amount_recv) || '00'}</h5>
        </div>
        <div className="card">
          <h3>Sales Data of Incomplete Orders:</h3>
          <h5>12 KG_full - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].tKG_full) || '00'}</h5>
          <h5>12 KG_empty - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].tKG_empty) || '00'}</h5>
          <h5>12 KG_sales_amount - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].tKG_sales_amount) || '00'}</h5>
          <h5>12 KG_sales_amount_recieved - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].tKG_sales_amount_recv) || '00'}</h5>
          <h5>17 KG_full - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].sKG_full) || '00'}</h5>
          <h5>17 KG_empty - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].sKG_empty) || '00'}</h5>
          <h5>17 KG_sales_amount - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].sKG_sales_amount) || '00'}</h5>
          <h5>17 KG_sales_amount_recieved - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].sKG_sales_amount_recv) || '00'}</h5>
          <h5>19 KG_full - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].nKG_full) || '00'}</h5>
          <h5>19 KG_empty - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].nKG_empty) || '00'}</h5>
          <h5>19 KG_sales_amount - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].nKG_sales_amount) || '00'}</h5>
          <h5>19 KG_sales_amount_recieved - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].nKG_sales_amount_recv) || '00'}</h5>
          <h5>total sales_amount - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].total_sales_amount) || '00'}</h5>
          <h5>total sales_amount_recieved - {(DailyData["incomplete_orders"] && DailyData["incomplete_orders"].total_sales_amount_recv) || '00'}</h5>
        </div>
        <div className="card">
          <h3>Sales Data of Modified Orders:</h3>
          <h5>12 KG_full - {(DailyData["modified_orders"] && DailyData["modified_orders"].tKG_full) || '00'}</h5>
          <h5>12 KG_empty - {(DailyData["modified_orders"] && DailyData["modified_orders"].tKG_empty) || '00'}</h5>
          <h5>12 KG_sales_amount - {(DailyData["modified_orders"] && DailyData["modified_orders"].tKG_sales_amount) || '00'}</h5>
          <h5>12 KG_sales_amount_recieved - {(DailyData["modified_orders"] && DailyData["modified_orders"].tKG_sales_amount_recv) || '00'}</h5>
          <h5>17 KG_full - {(DailyData["modified_orders"] && DailyData["modified_orders"].sKG_full) || '00'}</h5>
          <h5>17 KG_empty - {(DailyData["modified_orders"] && DailyData["modified_orders"].sKG_empty) || '00'}</h5>
          <h5>17 KG_sales_amount - {(DailyData["modified_orders"] && DailyData["modified_orders"].sKG_sales_amount) || '00'}</h5>
          <h5>17 KG_sales_amount_recieved - {(DailyData["modified_orders"] && DailyData["modified_orders"].sKG_sales_amount_recv) || '00'}</h5>
          <h5>19 KG_full - {(DailyData["modified_orders"] && DailyData["modified_orders"].nKG_full) || '00'}</h5>
          <h5>19 KG_empty - {(DailyData["modified_orders"] && DailyData["modified_orders"].nKG_empty) || '00'}</h5>
          <h5>19 KG_sales_amount - {(DailyData["modified_orders"] && DailyData["modified_orders"].nKG_sales_amount) || '00'}</h5>
          <h5>19 KG_sales_amount_recieved - {(DailyData["modified_orders"] && DailyData["modified_orders"].nKG_sales_amount_recv) || '00'}</h5>
          <h5>total sales_amount - {(DailyData["modified_orders"] && DailyData["modified_orders"].total_sales_amount) || '00'}</h5>
          <h5>total sales_amount_recieved - {(DailyData["modified_orders"] && DailyData["modified_orders"].total_sales_amount_recv) || '00'}</h5>
        </div>
        </div>
        </div>
        </>
    );
};

export default DailyStats;