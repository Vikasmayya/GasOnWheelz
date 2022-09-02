import React, { useCallback, useState } from 'react';
import { firestore } from '../Firebase';
import { DateRange} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Button, IconButton, Tooltip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import BookDetails from './BookDetails';

const BList = () => {
    const [actionTriggered, setActionTriggered] = useState('');
    const [Bookings, setBookings] =useState([]);
    const[lastDoc, setLastDoc] = useState("");
    const [startDate, setstartDate] = useState(new Date());
    const [endDate, setendDate] = useState(new Date());
    const selectionRange = {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
    };
    const[modal,setModal] = useState([]);
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'absolute',
        top: '12%',
        left: '2.5%',
        transform: 'translate(-0.5%, -1%)',
        bgcolor: 'background.paper',
        borderRadius: '1.125rem',
        boxShadow: 24,
        width:"95%",
        height:"83%",
        p: 2,
        overflow:"auto",
    };
    const calendar = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        borderRadius: '1.125rem',
        boxShadow: 24,
        p: 2,
    };
    function handleSelect(ranges){
        setstartDate(ranges.selection.startDate);
        setendDate(ranges.selection.endDate);
    };
    const DatesEnabled = useCallback(() => {
        const getPostFromFirebase = [];
        const firebaseData = firestore.collection("Sales")
        .where("booked_on", ">", startDate)
        .where('booked_on', '<', endDate)
        .orderBy("booked_on","asc")
        .limit(9)
        .onSnapshot((querySnapshot) =>{
            querySnapshot.forEach( doc => {
                getPostFromFirebase.push({...doc.data(), key: doc.id,});
            });
            setBookings(getPostFromFirebase);
            const LastDoc = querySnapshot.docs[querySnapshot.docs.length-1];
            setLastDoc(LastDoc);
        });
        return () => firebaseData();
    },[startDate,endDate]);
    
    const frontPage = useCallback(() => {
        if(lastDoc){
            const getPostFromFirebase = [];
            const firebaseData = firestore.collection("Sales")
            .where("booked_on", ">", startDate)
            .where('booked_on', '<', endDate)
            .orderBy("booked_on","asc")
            .startAfter(lastDoc)
            .limit(9)
            .onSnapshot((querySnapshot) =>{
                const EmptyCollection = querySnapshot.size===0;
            if(!EmptyCollection){
                querySnapshot.forEach( doc => {
                    getPostFromFirebase.push({...doc.data(), key: doc.id,});
                });
                setBookings(getPostFromFirebase);
                const LastDoc = querySnapshot.docs[querySnapshot.docs.length-1];
                setLastDoc(LastDoc);
            }else{
                alert('reached end of document')
            }
            });
            return () => firebaseData();
        }else{
            alert('No data exists!Please select other date ranges.')
        }
    },[startDate,endDate,lastDoc]);

    const  backPage = useCallback(() => {
        if(lastDoc){
            const getPostFromFirebase = [];
            const firebaseData = firestore.collection("Sales")
            .where("booked_on", ">", startDate)
            .where('booked_on', '<', endDate)
            .orderBy("booked_on","asc")
            .endBefore(lastDoc)
            .limit(9)
            .onSnapshot((querySnapshot) =>{
                const EmptyCollection = querySnapshot.size===0;
                const size = querySnapshot.size;
            if(!EmptyCollection && size >=9){
                querySnapshot.forEach( doc => {
                    getPostFromFirebase.push({...doc.data(), key: doc.id,});
                });
                setBookings(getPostFromFirebase);
                const LastDoc = querySnapshot.docs[querySnapshot.docs.length-1];
                setLastDoc(LastDoc);
            }else {
                alert('No more previous documents exists!')
            }
            });
            return () => firebaseData();
        }else {
            alert('No data exists!Please select other date ranges.')
        }
    },[startDate,endDate,lastDoc]);

    return (
        <>
        <div style={{paddingLeft : '1em',paddingRight : '1em',paddingtTop : 0}}>
            <div className="mt-0" style={{display: "inline-block"}}>
                <h4 style={{fontWeight:"700", marginBottom:0, marginTop:"0.3em", fontSize:'1.719rem', fontStyle:"bold"}}>Booking History</h4>
            </div>
            <div style={{backgroundColor:"#2752E7", width:"2.5em", float:"right",display: "inline-block", borderRadius:'0.5rem'}}>
            <Tooltip title="CLick to Add Filters">
            <IconButton onClick={()=> {setOpen(true); setActionTriggered('ACTION_2');}}>
            <CalendarTodayIcon sx={{color:"#FFFFFF"}}/>
            </IconButton>
            </Tooltip>
            </div>
        </div>
        <div style={{paddingLeft:"1rem",paddingRight:'1rem',paddingBottom:'20rem'}}>
        <div className="table overflow-auto" >
        <table className="table table-borderless">
            <thead style={{backgroundColor : "white" , color: "black"}}>
            <tr style={{borderRadius:"0.25em"}}>
                <th scope="col">Customer Name</th>
                <th scope="col">Order Type</th>
                <th scope="col">Type</th>
                <th className='text-right' scope="col">Total amount</th>
                <th className='text-right' scope="col">Balance amount</th>
                <th className='text-right' scope="col">Empty Balance</th>
                <th scope="col">  Order Status</th>
                <th scope="col">Booked On</th>
                <th className='text-center' scope="col">Action</th>
                {/* <th scope="col">booked_by</th> */}
                </tr>
            </thead>
            <tbody>
        {
            Bookings.map((post,index) => {
                const { name, gas_cylinder_type, order_type, booked_on, amount, pending_amount, pending_empty, order_status } = post;
            return(
                <tr key={index} className="align-middle" style={{backgroundColor:"white", height:"1em" }}>
                    <td>{name}</td>
                    <td>{order_type==="NEW_CONNECTION"? <div className="newConn">New-Connection</div> : <div className="refill">Refill</div>}</td>
                    <td>{gas_cylinder_type}</td>
                    <td className='text-right'>₹ {amount}.00</td>
                    <td className='text-right'>₹ {pending_amount}.00</td>
                    <td className='text-right'>{order_type==="NEW_CONNECTION"? <h6 className="mb-0">N/A</h6> : <h6 className='mb-0'>{pending_empty}</h6>}</td>
                    <td className='text-center'>{order_status==="INCOMPLETE"? <div className="incomplete text-center">Incomplete</div> : <div className="complete">Complete</div>}</td>
                    <td><h6 style={{fontSize:"0.8em", paddingTop:"0.1em", margin:0}}>{new Date(booked_on.seconds * 1000).toLocaleDateString([], { dateStyle:"medium" })}<br/>{new Date(booked_on.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12:"true", second:"2-digit" })}</h6></td>
                    <td className='text-center'>
                    <Button variant="text" style={{textTransform: "none", fontFamily:"Sen" }} onClick={() => {setOpen(true); setModal(post); setActionTriggered('ACTION_1');}} >View more</Button>
                    </td>
                </tr>
            )
            })
        }
        </tbody>
        </table>
        </div>
        <div style={{backgroundColor:"white", float:"right", borderRadius:"0.5rem",padding:"0.5rem" }}>
            <Tooltip title="CLick to previous page">
            <span style={{backgroundColor:"#F1F7FF"}} className="prev"  onClick={backPage}>
            <ArrowBackIosNewRoundedIcon sx={{color:"#333333"}}/>
            </span>
            </Tooltip>
            <Tooltip title="CLick for Next Page">
                <span style={{backgroundColor:"#2752E7"}} className="next" onClick={frontPage}>
                <ArrowForwardIosRoundedIcon sx={{color:"white"}} />
                </span>
            </Tooltip>
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            {actionTriggered === 'ACTION_1' ?
            <>
                <Box sx={style}>
                <BookDetails post={modal} handleClose={handleClose}/>
                </Box>
            </>
            :
            <>   
                <Box sx={calendar}>
                    <DateRange editableDateInputs={true} onChange={handleSelect} moveRangeOnFirstSelection={false} ranges={[selectionRange]} />  
                    <div style={{textAlign: "center", paddingBottom:"1em", backgroundColor:"white",marginLeft:"auto",marginRight:0,}}>
                    <Tooltip title="Apply Filters">
                    <Button variant="contained" onClick={()=>{DatesEnabled(); setOpen(false) }} endIcon={<CheckCircleIcon/>}>Apply</Button>  
                    </Tooltip>
                    </div>
                </Box> 
            </>}
        </Modal>
        </div>
        </>
    );
};

export default BList;