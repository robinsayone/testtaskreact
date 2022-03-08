// view copy 

import React, {useState, useEffect}from "react";
import { getSingleEvent } from "../../firebaseConfig";
import {useParams  } from "react-router-dom"; 


const View = () => {
   
    //const[res, setRes] = useState('test');
    const[event, setEvent] = useState('trest');
    // const[result, setResult] = useState('');

    const {name, category, description, bannerPath ,price} = event; 

    let { id } = useParams();
   
    console.log(id); 
    const getEventData = async(id)=> {
      
      const event = await getSingleEvent(id);
      console.log(event); 
      if(event.exists){
        setEvent(event.data())
       
    }
    else{
        console.log("no doc")
    }
      
      return event;
    }; 
   
    useEffect( async() => {
       
       const result = await getEventData(id);
       console.log(result);
       
       //    const resVal = result.docs.map((value) =>  [{id: value.id,...value.data()}][0]);
    //    console.log(resVal);
       
    }, [id]) 
    
    useEffect(()=>{
        
    })

    // useEffect(()=>{
    //     getEventData();

    // }, [id]); 

    console.log(event);
    
  return (
    <div className="container"> 
        <h2> View Product Details</h2>
        <div className="single-event">
                <div className="text-center">
                    <img src={event.bannerPath} alt="" className="image" />
                </div>
                <h4 className="Name">{event.name}</h4>
                <p className="category">{event}</p>
                <p className="des">{event.description}</p>
                <div className="bookingBox">
                    <p className="servicePrice">
                        <span>
                            <b>Fee::</b>
                        </span>
                        {event.price}
                    </p>
                    <button className="bookingBtn">Go back</button>
                    
                </div>
            </div>
           
    </div>
  )
}

export default View


