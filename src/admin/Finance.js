import React, { useEffect, useMemo, useState } from 'react';
import BalanceIcon from '@mui/icons-material/Balance';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import InsightsIcon from '@mui/icons-material/Insights';
import PaidIcon from '@mui/icons-material/Paid';
import AddCardIcon from '@mui/icons-material/AddCard';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, Tooltip, Typography } from '@mui/material';
import { firestore } from '../Firebase';
import { Calendar } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import Alerts from '../Alerts';
import Capital from './Capital';
import Expenses from './Expenses';

const Finance = () => {
  const [actionTriggered, setActionTriggered] = useState('');
  const [age, setAge] = React.useState('complete_orders');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      borderRadius: '1.125rem',
      boxShadow: 24,
      p: 2,
  };
  const [dates, setDates] = useState(new Date());
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
    Cash_balance : "",
    total_sales_amount : "",
    complete_orders : {
      sales_amount_12KG:"",
      sales_amount_recv_12KG:"",
      sales_amount_17KG:"",
      sales_amount_recv_17KG:"",
      sales_amount_19KG:"",
      sales_amount_recv_19KG:"",
      total_sales_amount:"",
      total_sales_amount_recv: "",
    },
    incomplete_orders : {
      sales_amount_12KG:"",
      sales_amount_recv_12KG:"",
      sales_amount_17KG:"",
      sales_amount_recv_17KG:"",
      sales_amount_19KG:"",
      sales_amount_recv_19KG:"",
      total_sales_amount:"",
      total_sales_amount_recv:"",
    },
    modified_orders : {
      sales_amount_12KG:"",
      sales_amount_recv_12KG:"",
      sales_amount_17KG:"",
      sales_amount_recv_17KG:"",
      sales_amount_19KG:"",
      sales_amount_recv_19KG:"",
      total_sales_amount:"",
      total_sales_amount_recv:"",
    },
    expenses : { total_expenses:"",},
    purchases : {
      tKGAmount:"",
      sKGAmount:"",
      nKGAmount:"",
      total_purchase_amount:"",
    },}],[]);

    const [DailyData, setDailyData] =useState({initialState});
    const [capital,setCapital] = useState('');

    function handleSelect(item){
      setDates(item)
      setOpen(false);
    };
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
  return (
    <>
    <div className="alert-container">
      <Alerts alert={alerts} />
    </div>
    <div style={{paddingLeft : '1em',paddingRight : '1em',paddingtTop : 0}}>
      <div className="mt-0" style={{display: "inline-block"}}>
          <h4 style={{fontWeight:"700", marginBottom:0, marginTop:"0.3em", fontSize:'1.719rem', fontStyle:"bold"}}>Finance Details </h4>
      </div>
      <div style={{backgroundColor:"#2752E7", float:"right",display: "inline-block", borderRadius:'0.5rem'}}>
        <Tooltip title="CLick to change Date">
        <Button onClick={()=> {setOpen(true); setActionTriggered('ACTION_1');}}>
        <Typography sx={{color:"#FFFFFF", textTransform:'capitalize'}}>{dates.toLocaleDateString([], { dateStyle:"medium" })}</Typography>
        </Button>
        </Tooltip>
      </div>
      <div className="col" style={{paddingTop:"1.25rem"}}>
        <div className="row">
          <div className="col-lg-3">
            <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="card-body">
                <div className="float-end rounded-circle p-1" style={{backgroundColor:"#21BF731A"}}><AcUnitIcon sx={{color:"#21BF73"}}/></div>
                <h5 className="card-title fw-bold">Sales Amount</h5>
                <p className="card-text mb-1 mt-3">Total Sales Amount</p>
                <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["total_sales_amount"] && DailyData["total_sales_amount"]) || '00'}.00</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="card-body">
                <div className="float-end rounded-circle p-1" style={{backgroundColor:"#0E103D1A"}}><BalanceIcon sx={{color:"#0E103D"}}/></div>
                <h5 className="card-title fw-bold">Cash Balance</h5>
                <p className="card-text mb-1 mt-3">Total Cash Balance</p>
                <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["Cash_balance"] && DailyData["Cash_balance"]) || '00'}.00</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="card-body">
              <div className="float-end rounded-circle p-1" style={{backgroundColor:"#0550491A"}}><InsightsIcon sx={{color:"#055049"}}/></div>
                <h5 className="card-title fw-bold">Profit & Loss</h5>
                <p className="card-text mb-1 mt-3">Net Profit and Loss</p>
                <h6 className="card-subtitle fs-5 fw-bold">₹ {pnl || '00'}.00</h6>
              </div>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="card border-light mb-3 " style={{borderRadius:"1.125rem"}}>
              <div className="card-header border-bottom-0" style={{backgroundColor:"#FFFFFF",borderRadius:"1.125rem"}}>
              <div className="float-end rounded-circle p-1" style={{backgroundColor:"#8723411A"}}><PaidIcon sx={{color:"#872341"}}/></div>
                <h5 className="card-title fw-bold">Present Capital</h5> 
              </div>
              <div className="card-body pt-0 d-flex">   
              <div className='col'>
                <p className="card-text mb-1">Total Capital</p>
                <h6 className="card-text fs-5 fw-bold">₹ {capital || '00'}.00</h6>     
              </div>        
              <Button className='mt-3' style={{backgroundColor: "#2752E71A",color:'#2752E7', fontSize: "0.925rem",fontWeight:'700',
                fontFamily:'Sen',padding:'6px 10px', textTransform:'capitalize' }}
                  variant="contained"  onClick={()=> {setOpen(true); setActionTriggered('ACTION_2');}}>Add</Button>
              </div> 
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
              <div className="card border-light mb-3" style={{borderRadius:"1.125rem"}}>
                <div className="card-body" style={{ boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"}}>
                  <h5 className="card-title fw-bold">Purchase Details</h5>
                  <div className="d-lg-inline-block col-lg-3 mt-3" style={{paddingTop:"0.375rem"}}>
                    <p className="card-text mb-1">12Kg</p>
                    <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["purchases"] && DailyData["purchases"].tKGAmount) || '00'}.00</h6>
                  </div>
                    <span className="d-lg-inline d-none me-2" style={{fontSize:"2.5rem",color:"#C1C1C1"}}> | </span>
                  <div className="d-lg-inline-block col-lg-3 mt-3" style={{paddingTop:"0.375rem"}}>  
                    <p className="card-text mb-1">17Kg</p>
                    <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["purchases"] && DailyData["purchases"].sKGAmount) || '00'}.00</h6>
                  </div>  
                    <span className="d-lg-inline d-none me-2" style={{fontSize:"2.5rem",color:"#C1C1C1"}}> | </span>
                  <div className="d-lg-inline-block col-lg-3 mt-3" style={{paddingTop:"0.375rem"}}>  
                    <p className="card-text mb-1">19Kg</p>
                    <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["purchases"] && DailyData["purchases"].nKGAmount) || '00'}.00</h6>
                  </div>  
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card border-light mb-3" style={{borderRadius:"1.125rem",height:'9.125rem'}}>
                <div className="card-body" style={{ boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"}}>
              <div className="float-end rounded-circle p-1" style={{backgroundColor:"#8723411A"}}><AddCardIcon sx={{color:"#872341"}}/></div>
                  <h5 className="card-title fw-bold">Purchases</h5>
                  <div style={{paddingTop:'2rem'}}>
                  <p className="card-text mb-1 ">Total Purchase Amount</p>
                  <h6 className="card-subtitle fs-5 fw-bold">₹ {(DailyData["purchases"] && DailyData["purchases"].total_purchase_amount) || '00'}.00</h6>
                  </div>
              </div>
              </div>
            </div>
            <div className="col-lg-3">
            <div className="card border-light mb-3 " style={{borderRadius:"1.125rem",height:'9.125rem'}}>
              <div className="card-header border-bottom-0" style={{backgroundColor:"#FFFFFF",borderRadius:"1.125rem"}}>
              <div className="float-end rounded-circle p-1" style={{backgroundColor:"#8723411A"}}><DonutLargeIcon sx={{color:"#872341"}}/></div>
              <h5 className="card-title fw-bold">Expenses</h5> 
              </div>
              <div className="card-body pt-0 d-flex mt-4">   
              <div className='col'>
              <p className="card-text mb-1">Total Expenses</p>
                <h6 className="card-text fs-5 fw-bold">₹ {(DailyData["expenses"] && DailyData["expenses"].total_expenses) || '00'}.00</h6>     
              </div>        
              <Button className='mt-3' style={{backgroundColor: "#2752E71A",color:'#2752E7', fontSize: "0.925rem",fontWeight:'700',fontFamily:'Sen',padding:'6px 10px', textTransform:'capitalize', display:'inline-block' }}
                  variant="contained" onClick={() => {setOpen(true); setActionTriggered('ACTION_3');}}>Add</Button>
              </div> 
            </div>
          </div>
        </div>
        <div className="card border-light mb-3" style={{borderRadius:"1.125rem"}}>
          <div className="card-body" style={{ backgroundColor:"#FFFFFF",borderRadius:"1.125rem", boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"}}>
            <div className="d-flex align-items-center">
            <h5 className="card-title fw-bold ms-2">Sales Data </h5>
            <FormControl className='ms-auto p-1' sx={{minWidth: 200 }}>
              <Select
                value={age}
                onChange={handleChange}
                sx={{color: "#fff", backgroundColor:"#2752E7", fontWeight:'bold', fontFamily:'Sen',
                "& .MuiSvgIcon-root": {
                    color: "white",
                    backgroundColor:"#2752E7"
                },
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                },
                "&:hover": {
                  "&& fieldset": {
                    border: "none"
                  }
                }
                }}
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem value={'complete_orders'}>Complete Orders</MenuItem>
                <MenuItem value={'incomplete_orders'}>Incomplete Orders</MenuItem>
                <MenuItem value={'modified_orders'}>Modified Orders</MenuItem>
              </Select>
            </FormControl>
            </div>
            <div className='row'>
            <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.3)'}}>
             <h5 className="card-title fw-bold me-2">12 Kg Cylinder</h5>
                <p style={{color:"#929292"}} className="card-text mb-2 mt-4 text-center">Total Sales Value</p>
                <h5 className="mb-0 card-title fw-bold text-center" style={{fontSize:"1.25rem"}}>₹ {(DailyData[age] && DailyData[age].sales_amount_12KG) || '00'}.00</h5>
                <p style={{color:"#929292"}} className="card-text mb-2 mt-4 text-center">Amount Recieved</p>
                <h5 className="mb-0 card-title fw-bold text-center" style={{fontSize:"1.25rem"}}>₹ {(DailyData[age] && DailyData[age].sales_amount_recv_12KG) || '00'}.00</h5>
            </div>
            <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.3)'}}>
             <h5 className="card-title fw-bold me-2">17 Kg Cylinder</h5>
                <p style={{color:"#929292"}} className="card-text mb-2 mt-4 text-center">Total Sales Value</p>
                <h5 className="mb-0 card-title fw-bold text-center" style={{fontSize:"1.25rem"}}>₹ {(DailyData[age] && DailyData[age].sales_amount_17KG) || '00'}.00</h5>
                <p style={{color:"#929292"}} className="card-text mb-2 mt-4 text-center">Amount Recieved</p>
                <h5 className="mb-0 card-title fw-bold text-center" style={{fontSize:"1.25rem"}}>₹ {(DailyData[age] && DailyData[age].sales_amount_recv_17KG) || '00'}.00</h5>
            </div>
            <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.3)'}}>
             <h5 className="card-title fw-bold me-2">19 Kg Cylinder</h5>
                <p style={{color:"#929292"}} className="card-text mb-2 mt-4 text-center">Total Sales Value</p>
                <h5 className="mb-0 card-title fw-bold text-center" style={{fontSize:"1.25rem"}}>₹ {(DailyData[age] && DailyData[age].sales_amount_19KG) || '00'}.00</h5>
                <p style={{color:"#929292"}} className="card-text mb-2 mt-4 text-center">Amount Recieved</p>
                <h5 className="mb-0 card-title fw-bold text-center" style={{fontSize:"1.25rem"}}>₹ {(DailyData[age] && DailyData[age].sales_amount_recv_19KG) || '00'}.00</h5>
            </div>
            <div className="card-body text-center col-lg-2 mt-4 m-3" style={{borderRadius:'1rem', alignItems:'center', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.3)'}}> 
              <div className="card-body m-3" style={{backgroundColor:"#112C91",color:'#FFFFFF',borderRadius:'1.25rem'}}>
                <h5 className="card-title fw-bold" style={{fontSize:"1.375rem"}}>₹ {(DailyData[age] && DailyData[age].total_sales_amount) || '00'}.00</h5>
                <p className="card-text">Overall Sales Amount</p>
              </div>
              <div className="card-body m-3" style={{backgroundColor:"#0C9847",color:'#FFFFFF',borderRadius:'1.25rem'}}>
                <h5 className="card-title fw-bold" style={{fontSize:"1.375rem"}}>₹ {(DailyData[age] && DailyData[age].total_sales_amount_recv) || '00'}.00</h5>
                <p className="card-text">Overall Amount Recieved</p>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        {actionTriggered === 'ACTION_1' ?
        <>
            <Box sx={style}>
              <Calendar onChange={handleSelect} date={dates} />  
            </Box> 
        </>
        :actionTriggered === 'ACTION_2' ?
        <>
            <Box sx={style}>
              <Capital alert={showAlert} handleClose={handleClose}/>
            </Box> 
        </>
        :
        <>   
            <Box sx={style}>
              <Expenses alert={showAlert} handleClose={handleClose}/>
            </Box> 
        </>}    
    </Modal>
    </>
  )
}

export default Finance;