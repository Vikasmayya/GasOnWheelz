import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import web from "./images/project_orange_logo.png";
import { firebaseAuth } from './Firebase';
import SearchIcon from '@mui/icons-material/Search';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { pink } from '@mui/material/colors';
const Navbar = () =>{
    let history = useHistory();
    var retrieval = sessionStorage.getItem('role');

    const SignOut = () => {
        firebaseAuth.signOut();
        sessionStorage.clear();
    }

    const[search,setSearch] = useState({
        searchText:"",
    });

    const InputEvent= (event)=>{
        const {name,value} = event.target;
        setSearch((preVal) =>{
            return{...preVal, [name] : value,}
        });
    };

    const SubmitData =(e) =>{
        e.preventDefault();
        history.push({pathname: '/Search', state: search});
    };
    
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor: "#fff"}}>
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/homepage"><img src={web} alt="" width="35" height="35"/></NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    {retrieval ?
                    <li className="nav-item">
                        <form className="d-flex my-2" onSubmit={SubmitData}>
                            <div className="input-group me-5" style={{boxShadow : '0px 2px 20px 0px rgba(0, 0, 0, 0.05)'}}>
                            <input type="search" className="form-control " placeholder="Search for Customer" aria-label="Search" aria-describedby="button-addon2" value={search.searchText} onChange={InputEvent} name="searchText" pattern="[6-9]{1}[0-9]{9}" autoComplete="off" required/>
                            {search.searchText ? <button className="btn btn-outline-secondary shadow-none" type="submit" id="button-addon2"><SearchIcon style={{ color: 'white' }}/></button> :
                            <button className="btn btn-outline-secondary shadow-none" type="submit" id="button-addon2" disabled><SearchIcon style={{ color: 'white' }}/></button> } 
                            </div>
                        </form>
                    </li>
                    : null }
                    {retrieval ?
                    <>
                    <li className="nav-item">
                     <NavLink exact activeClassName="menu_active" className="nav-link py-3" aria-current="page" to="/homepage">Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink exact activeClassName="menu_active" className="nav-link py-3" to="/BList">Bookings</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink exact activeClassName="menu_active" className="nav-link py-3" to="/Registration">Registration</NavLink>
                    </li>
                    {retrieval==="admin" ?
                    <li className="nav-item dropdown">
                    <NavLink exact activeClassName="dropdown-item_active" className="nav-link py-3 dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Admin controls
                    </NavLink>
                    <ul className="dropdown-menu dropdown-menu-start" aria-labelledby="navbarDropdown">
                        <li><NavLink exact activeClassName="dropdown-item_active" className="dropdown-item" to="/PriceList"><span className="icon-background" style={{backgroundColor:"#a9a3a9"}}><CurrencyRupeeOutlinedIcon sx={{ color: "#41464b", paddingLeft:"0.1em", paddingTop:"0.1em" }}/></span> Price Update</NavLink></li>
                        <li><NavLink exact activeClassName="dropdown-item_active" className="dropdown-item" to="/Finance"><span className="icon-background" style={{backgroundColor:"#d1e9e9"}}><InsertChartOutlinedOutlinedIcon  sx={{ color: "#1ee979", paddingLeft:"0.1em", paddingTop:"0.1em" }}/></span> Finance Management</NavLink></li>
                        <li><NavLink exact activeClassName="dropdown-item_active" className="dropdown-item" to="/Inventory"><span className="icon-background" style={{backgroundColor:"#e3c5e3"}}><InventoryOutlinedIcon  sx={{ color: pink[500], paddingLeft:"0.1em", paddingTop:"0.1em" }}/></span> Inventory Management</NavLink></li>
                        {/* <li><NavLink exact activeClassName="dropdown-item_active" className="dropdown-item" to="/Employee"><span className="icon-background" style={{backgroundColor:"#e3c5e3"}}><InventoryOutlinedIcon  sx={{ color: pink[500], paddingLeft:"0.1em", paddingTop:"0.1em" }}/></span> Dashboard</NavLink></li> */}
                    </ul>
                    </li>
                    : null }
                    <li className="nav-item">
                    <NavLink style={{borderRadius:"2.5em",padding: "0.375rem 1rem", color:"#f7ebeb", marginLeft:"0.5rem"}} className="btn btn-primary my-2" to="#" onClick={SignOut}>LOGOUT</NavLink>
                    </li>
                    </>
                    : null }
                </ul>
              </div>
            </div>
        </nav>
        </>
    )
}

export default Navbar;