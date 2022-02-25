import React from "react";
import Event from "../Events/Event";


function ViewDetails({event}) {
    const {name, category, description, bannerPath ,price} = event;

    return (
        <div className="container">
            <h2> View page </h2>
            <div className="service-card">
                <div className="text-center">
                    <img src={bannerPath} alt="" className="serviceImg" />
                </div>
                <h4 className="serviceName">{name}</h4>
                <p className="serviceCategory">{category}</p>
                <p className="serviceDes">{description}</p>
                <div className="bookingBox">
                    <p className="servicePrice">
                        <span>
                            <b>Fee::</b> 
                        </span>
                        {price}
                    </p>
                    <button className="bookingBtn">Details</button>
                </div>
            </div>
        </div>
    );
}

export default ViewDetails;
