import React, { useEffect, useMemo, useState } from 'react';
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
import Purchases from './Purchases';

const Inventory = () => {
  const [actionTriggered, setActionTriggered] = useState('');
  const [age, setAge] = React.useState('complete_orders');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const style = {
      position: 'absolute',
      top: '10%',
      left: '7.5%',
      width:'85%',
      height:"83%",
      transform: 'translate(-0.5%, -1%)',
      bgcolor: 'background.paper',
      borderRadius: '1.125rem',
      boxShadow: 24,
      p: 2,
      overflow:"auto",
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
        complete_orders : {
          full_12KG:"",
          empty_12KG:"",
          full_17KG:"",
          empty_17KG:"",
          full_19KG:"",
          empty_19KG:"",
        },
        incomplete_orders : {
          full_12KG:"",
          empty_12KG:"",
          full_17KG:"",
          empty_17KG:"",
          full_19KG:"",
          empty_19KG:"",
        },
        modified_orders : {
          full_12KG:"",
          empty_12KG:"",
          full_17KG:"",
          empty_17KG:"",
          full_19KG:"",
          empty_19KG:"",
        },
        purchases : {
          tKGempty:"",
          tKGfull:"",
          sKGempty:"",
          sKGfull:"",
          nKGempty:"",
          nKGfull:"",
        },}],[]);

    const [DailyData, setDailyData] =useState({initialState});

    function handleSelect(item){
      setDates(item)
      setOpen(false);
    };
    useEffect(() =>{
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
    }, [dates, initialState]);  

    // const tKGfull = (DailyData["complete_orders"] ?  DailyData["complete_orders"].tKG_full:0)
    //                +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].tKG_full:0)
    //                +(DailyData["modified_orders"] ? DailyData["modified_orders"].tKG_full:0)
    //                -(DailyData["purchases"] ? DailyData["purchases"].tKGfull:0);    
    // const tKGempty = (DailyData["complete_orders"] ?  DailyData["complete_orders"].tKG_empty:0)
    //                +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].tKG_empty:0)
    //                +(DailyData["modified_orders"] ? DailyData["modified_orders"].tKG_empty:0)
    //                -(DailyData["purchases"] ? DailyData["purchases"].nKGempty:0);
    // const sKGfull = (DailyData["complete_orders"] ?  DailyData["complete_orders"].sKG_full:0)
    //                +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].sKG_full:0)
    //                +(DailyData["modified_orders"] ? DailyData["modified_orders"].sKG_full:0)
    //                -(DailyData["purchases"] ? DailyData["purchases"].sKGfull:0); 
    // const sKGempty = (DailyData["complete_orders"] ?  DailyData["complete_orders"].sKG_empty:0)
    //                +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].sKG_empty:0)
    //                +(DailyData["modified_orders"] ? DailyData["modified_orders"].sKG_empty:0)
    //                -(DailyData["purchases"] ? DailyData["purchases"].nKGempty:0);
    // const nKGfull = (DailyData["complete_orders"] ?  DailyData["complete_orders"].nKG_full:0)
    //                +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].nKG_full:0)
    //                +(DailyData["modified_orders"] ? DailyData["modified_orders"].nKG_full:0)
    //                -(DailyData["purchases"] ? DailyData["purchases"].nKGfull:0)
    // const nKGempty = (DailyData["complete_orders"] ?  DailyData["complete_orders"].nKG_empty:0)
    //                +(DailyData["incomplete_orders"] ? DailyData["incomplete_orders"].nKG_empty:0)
    //                +(DailyData["modified_orders"] ? DailyData["modified_orders"].nKG_empty:0)
    //                -(DailyData["purchases"] ? DailyData["purchases"].nKGfull:0);      
  return (
    <>
    <div className="alert-container">
      <Alerts alert={alerts} />
    </div>
    <div style={{paddingLeft : '1em',paddingRight : '1em',paddingtTop : 0}}>
      <div className="mt-0" style={{display: "inline-block"}}>
          <h4 style={{fontWeight:"700", marginBottom:0, marginTop:"0.3em", fontSize:'1.719rem', fontStyle:"bold"}}>Inventory Info</h4>
      </div>
      <div style={{backgroundColor:"#2752E7", float:"right",display: "inline-block", borderRadius:'0.5rem'}}>
      <Tooltip title="CLick to change Date">
        <Button onClick={()=> {setOpen(true); setActionTriggered('ACTION_1');}}>
        <Typography sx={{color:"#FFFFFF", textTransform:'capitalize'}}>{dates.toLocaleDateString([], { dateStyle:"medium" })}</Typography>
        </Button>
        </Tooltip>
      </div>
      <div className="col" style={{paddingTop:"1.375rem"}}>
      <div className="card border-light mb-5 mt-3" style={{borderRadius:"1.125rem"}}>
          <div className="card-body" style={{ backgroundColor:"#FFFFFF",borderRadius:"1.125rem", boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"}}>
            <div className="d-flex align-items-center">
            <h5 className="card-title fw-bold ms-2">Stock Purchase Details </h5>       
            <Button className='ms-auto px-lg-5' style={{backgroundColor: "#2752E71A",color:'#2752E7', fontSize: "0.925rem",fontWeight:'700',fontFamily:'Sen',textTransform:'capitalize'}}
                variant="contained" onClick={() => {setOpen(true); setActionTriggered('ACTION_3');}}>Add New Purchase</Button>
            </div>
            <div className='row'>
                <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.05)'}}>
                    <h5 className="card-title fw-bold me-2 ">12 Kg Cylinder</h5>
                    <div className='d-inline-block col-6 pt-5 ms-1'>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Full</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#3F84E5'}}>{(DailyData['purchases'] && DailyData['purchases'].tKGfull) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>
                    <div className='d-inline-block col-5 pt-5 '>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Empty</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#21897E'}}>{(DailyData['purchases'] && DailyData['purchases'].tKGempty) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>   
                </div>
                <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.05)'}}>
                    <h5 className="card-title fw-bold me-2 ">17 Kg Cylinder</h5>
                    <div className='d-inline-block col-6 pt-5 ms-1'>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Full</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#3F84E5'}}>{(DailyData['purchases'] && DailyData['purchases'].sKGfull) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>
                    <div className='d-inline-block col-5 pt-5 '>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Empty</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#21897E'}}>{(DailyData['purchases'] && DailyData['purchases'].sKGempty) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>   
                </div>
                <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.05)'}}>
                    <h5 className="card-title fw-bold me-2 ">19 Kg Cylinder</h5>
                    <div className='d-inline-block col-6 pt-5 ms-1'>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Full</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#3F84E5'}}>{(DailyData['purchases'] && DailyData['purchases'].nKGfull) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>
                    <div className='d-inline-block col-5 pt-5 '>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Empty</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#21897E'}}>{(DailyData['purchases'] && DailyData['purchases'].nKGempty) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>   
                </div>
            </div>
          </div>
        </div>
        <div className="card border-light mb-3" style={{borderRadius:"1.125rem"}}>
          <div className="card-body" style={{ backgroundColor:"#FFFFFF",borderRadius:"1.125rem", boxShadow:"0px 5px 30px 0px rgba(0, 0, 0, 0.05)"}}>
            <div className="d-flex align-items-center">
            <h5 className="card-title fw-bold ms-2">Sales Data </h5>
            <FormControl className='ms-auto' sx={{minWidth: 200 }}>
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
                <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.05)'}}>
                    <h5 className="card-title fw-bold me-2 ">12 Kg Cylinder</h5>
                    <div className='d-inline-block col-6 pt-5 ms-1'>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Full</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#3F84E5'}}>{(DailyData[age] && DailyData[age].full_12KG) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>
                    <div className='d-inline-block col-5 pt-5 '>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Empty</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#21897E'}}>{(DailyData[age] && DailyData[age].empty_12KG) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>   
                </div>
                <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.05)'}}>
                    <h5 className="card-title fw-bold me-2 ">17 Kg Cylinder</h5>
                    <div className='d-inline-block col-6 pt-5 ms-1'>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Full</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#3F84E5'}}>{(DailyData[age] && DailyData[age].full_17KG) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>
                    <div className='d-inline-block col-5 pt-5 '>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Empty</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#21897E'}}>{(DailyData[age] && DailyData[age].empty_17KG) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>   
                </div>
                <div className="card-body col-lg-1 mt-4 m-3" style={{borderRadius:'1rem', boxShadow:'0px 5px 30px 0px rgba(0, 0, 0, 0.05)'}}>
                    <h5 className="card-title fw-bold me-2 ">19 Kg Cylinder</h5>
                    <div className='d-inline-block col-6 pt-5 ms-1'>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Full</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#3F84E5'}}>{(DailyData[age] && DailyData[age].full_19KG) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
                    </div>
                    <div className='d-inline-block col-5 pt-5 '>
                        <p style={{color:"#929292"}} className="card-text mb-2 mt-4">Empty</p>
                        <h5 className="mb-0 card-title fw-bold" style={{fontSize:"1.375rem", color:'#21897E'}}>{(DailyData[age] && DailyData[age].empty_19KG) || '0'}<span style={{color:'#000000',fontSize:"0.875rem"}}> Units</span></h5>
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
            <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            borderRadius: '1.125rem',
            boxShadow: 24,
            p: 2,}}>
              <Calendar onChange={handleSelect} date={dates} />  
            </Box> 
        </>
        :<>   
            <Box sx={style}>
              <Purchases alert={showAlert} handleClose={handleClose}/>
            </Box> 
        </>}
    </Modal>
    </>
  )
}

export default Inventory;