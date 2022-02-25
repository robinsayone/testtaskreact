
import React, {useState, useContext, useEffect}from "react";
import { getSingleEvent } from "../../firebaseConfig";
import {useParams, Link , useHistory } from "react-router-dom"; 
import './View.css';
import ModalComponent from "../../component/modal/Modal"; 
import Spinner from './../Spinner/Spinner'; 
import { UserContext } from "../../Provider/AuthProvider";
import Header from '../header/header'; 

const View = () => {
   
    //const[res, setRes] = useState('test');
    // const[event, setEvent] = useState('');
    const[error, setError] = useState("no");
    const[name,setName]= useState('');
    const [price,setTicketprice]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
    const [banner,setBanner]=useState('');
    const [loader, setLoader] = useState(true);
    const [logged,setLogged]=useState(false);  
    
    // const[result, setResult] = useState('');

    // const {name, category, description, bannerPath ,price} = event; 

    let { id } = useParams();
    let history = useHistory();  
    const authUser=useContext(UserContext); 
   
    console.log(id); 
    const getEventData = async()=> {
      
      const event = await getSingleEvent(id);
      console.log(event); 
    //   if(event.exists){
    //     setEvent(event.data())
    //     console.log(event);
        
    //   } 
    //    else{
    //     console.log("no doc")
    
    
      
      return event;
    }; 
    useEffect(() => {
      if (!!authUser === false) {
          setLogged(false);
        // history.push('/');
      }
      else {
          setLogged(true);
      }
    }, [authUser]) 
   
    useEffect ( async() => {
       
       const result = await getEventData(id);
       console.log(result);
       //console.log(event);
        if(result.hasOwnProperty('error')){
            setError("No event")  
            setTimeout (()=> {
             
              history.push(`/`);
            }, 3000)
        }
        else{
            setName(result.name);
            setBanner(result.bannerPath);
            setDescription(result.description);
            setCategory(result.category);
            setTicketprice(result.price);
        }

      setLoader(false); 
    //    if(Array.isArray(result)){
    //     if(result.length!==0){
    //         setEvent(result);
    //         console.log(event);
    //     }
    //     else{
    //         setError("No event")

    //     }
    // } 
    // else {
    //     setError("No event")
    // }
       
       //    const resVal = result.docs.map((value) =>  [{id: value.id,...value.data()}][0]);
    //    console.log(resVal);
       
    }, [id]) 
    
    // useEffect(()=>{
        
    // })

    // useEffect(()=>{
    //     getEventData();

    // }, [id]); 

    
    
  return ( 
    <>  
    <Header />  
    
    <div className="container"> 
    

        <h2 className="Productdetails"> View Product Details  </h2>

       
        {
                               error=='no'  ?  loader ?  
                               <>
                                <div className="text-center">
                                 <Spinner/>
                           </div> 
                               </> : 
                               <>
                              
                                <div className="single-event">
              
              <img src={banner} alt="" className="image" />
          </div>
          <h4 className="Name">{name}</h4>

         
          <p className="des">{description}</p>
         
          <div className="booking">
              <p className="Price">
              <span>
                      <b>Fee::</b>
                  </span>
                  {price}
              </p>
           </div>
           { logged &&  
            <Link to={`/update/${id}`}>
                                    
            <button className="bookingBtn">Edit details</button>
        
        </Link> 
        
        
 
           }
           
                               
                               </>

       
           
                           
                                   
                                    : 
                                     
                                    <ModalComponent Msg="The event doesnot exist"/> 
                                    
                            }
                    
                
           
           
    </div>

    </>
  )
}

export default View


