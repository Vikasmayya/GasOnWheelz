import React, { useState, useCallback } from "react";
import {serverTimestamp} from "firebase/firestore";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { firestore } from '../Firebase';
import Alerts from '../Alerts';
import { Input } from "@mui/material";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';

export const PriceUpdate = ({ prices}) => {
  const [price, setPrice] = useState(prices.price);
  const Change = (e) => { setPrice(e.target.value); }
  const [ncprice, setncPrice] = useState(prices.ncprice);
  const ncChange = (e) => { setncPrice(e.target.value); }
  const [updateDate, setupdateDate] = useState({
   refillUpdate: new Date(prices.updated_on.seconds * 1000).toLocaleDateString(['en-GB'], { dateStyle:"short" }),
   ncUpdate: new Date(prices.nc_updated_on.seconds * 1000).toLocaleDateString(['en-GB'], { dateStyle:"short" })
  });
  const [updateTime, setupdateTime] = useState({
   refillUpdate: new Date(prices.updated_on.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" }),
   ncUpdate: new Date(prices.nc_updated_on.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" })
  });
  const [alerts, setAlerts] = useState(null);

  const showAlert = useCallback((msg, type) => {
    setAlerts({
        msg: msg,
        type:type,
    })
    setTimeout(() => {
      setAlerts(null);
    }, 2000);
  },[]);

  const onUpdate = () => {
    try{
      if(prices.price !== price){
        firestore.collection('price_list').doc(prices.id).update({ price : Number(price), updated_on : serverTimestamp()})
        setupdateDate({
          refillUpdate : new Date().toLocaleDateString(['en-GB'], { dateStyle:"short" }),
          ncUpdate: new Date(prices.nc_updated_on.seconds * 1000).toLocaleDateString(['en-GB'], { dateStyle:"short" })
        }) 
        setupdateTime({
          refillUpdate : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" }),
          ncUpdate: new Date(prices.nc_updated_on.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" })
        })
        showAlert("Price has been updated successfully!", "success")
      }else if(prices.ncprice !== ncprice){
        firestore.collection('price_list').doc(prices.id).update({ ncprice : Number(ncprice), nc_updated_on : serverTimestamp(),})
        setupdateDate({
          ncUpdate : new Date().toLocaleDateString(['en-GB'], { dateStyle:"short" }),
          refillUpdate: new Date(prices.updated_on.seconds * 1000).toLocaleDateString(['en-GB'], { dateStyle:"short" })
        }) 
        setupdateTime({
          refillUpdate: new Date(prices.updated_on.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" }),
          ncUpdate : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" })
        })
        showAlert("Price has been updated successfully!", "success")
      }
    }catch(error){
      alert(error)
    }
   
  }

  const CustomTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      maxWidth: 150,
    },
  });

  const nUpdate =`Last updated on ${updateDate.ncUpdate} at ${updateTime.ncUpdate}`;
  const refilUpdate =`Last updated on ${updateDate.refillUpdate} at ${updateTime.refillUpdate}`;

  return (
    <>
      <div style={{borderRadius:"0.75em"}} className="card shadow p-3 mb-5 mx-3 bg-white">
        <div className="card-body pl-1">
            <h5 className="card-title fw-bold mb-4">{prices.title}</h5>
            <div style={{width:"100%"}} className="mb-3 ms-lg-4">
            <label className="fw-bold">Refill Price
               <span>
                <CustomTooltip title={refilUpdate}> 
                  <InfoOutlinedIcon sx={{width: "0.8em", height:'0.8em', color:'#808080', ml:1}}/>
                </CustomTooltip>
               </span>
              </label><br/>
              <Input 
                sx={{ width: "10.5rem", fontSize: "2.5rem", fontWeight:'bold', fontFamily:'Sen', color:'#282C27'}}
                id="standard-adornment-amount"
                value={price}
                onChange={Change}
                startAdornment="₹"
                endAdornment=".00"
              />
            </div>
            <div style={{width:"100%"}} className="mb-3 ms-lg-4">
              <label className="fw-bold">Deposit Price
               <span>
                <CustomTooltip title={nUpdate}> 
                  <InfoOutlinedIcon sx={{width: "0.8em", height:'0.8em', color:'#808080', ml:1}}/>
                </CustomTooltip>
               </span>
              </label><br/>
              <Input 
                sx={{ width: "10.5rem", fontSize: "2.5rem", fontWeight:'bold', fontFamily:'Sen', color:'#575C5F'}}
                id="standard-adornment-amount"
                value={ncprice}
                onChange={ncChange}
                startAdornment="₹"
                endAdornment=".00"
              />
            </div>
            {/* <h6 style={{ color:'#575C5F'}}> Last updated on {updateDate} at {updateTime}</h6> */}
              <button style={{width:"100%",borderRadius:"2.5em"}} className="btn btn-primary" type="button" onClick={onUpdate}>Update</button>
        </div>
      </div>
      <div className="alert-container bottom-0 start-0">
        <Alerts alert={alerts} />
      </div>
    </>
  );
};