import React from 'react';

import {Link, useHistory,useParams  } from "react-router-dom";

const Event = ({event}) => {
    const {name, category, description, bannerPath ,price} = event;
    let history = useHistory();
     let { urlParms , value } = useParams();  


    return (
        <div className="col-md-6 col-lg-4 service">
            <div duration={2700} distance='70px'>
                <div className="service-card">
                    <div className="text-center">
                        <img src={bannerPath} alt="" className="serviceImg"/>
                    </div>
                    <h4 className="serviceName">{name}</h4>
                    <p className="serviceCategory">{category}</p>
                    <p className="serviceDes">{description}</p>
                    <div className="bookingBox">
                        <p className="servicePrice"><span><b>Fee::</b></span>{price}</p>
                            <Link to={`/viewdetails/${event.id}`}>   
                            <button className="bookingBtn"
                            >Details</button>
                            </Link> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event;