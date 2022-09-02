import React from 'react';
import { NavLink } from 'react-router-dom';
import web from "../src/images/gastock3.jpg";

const Card =(props) => {
    
    return (
        <>
        <div className="col-md-4 col-10 mx-auto">
        <div className="card">
            <img src={web} className="card-img-top" alt={props.title}/>
            <div className="card-body">
                <hr/>
                <h5 className="card-title fw-bold">{props.title}</h5>
                <p className="card-text">Today's Price : {props.price} Rs Only</p>
                <NavLink to="/Registration" className="btn btn-primary">Book Now</NavLink>
            </div>
            </div>
        </div>
        </>
    )
};

export default Card;