import React, {useState, useEffect, useContext} from 'react';
import InputLabel from '@mui/material/InputLabel'; 
import TextInput from '../../component/textInput/textinput';
import BasicSelect from '../../component/dropdown/dropdown';
import Spinner from '../Spinner/Spinner';
import Button from '../../component/button/button'; 
import {Link , useParams, useHistory} from 'react-router-dom';
import { getSingleEvent , updateEvent, db} from '../../firebaseConfig';
import { doc, updateDoc} from "firebase/firestore"; 
import { toast } from "react-toastify"; 
import ModalComponent from "../../component/modal/Modal";  
import Header from '../header/header'; 
import { UserContext } from "../../Provider/AuthProvider"; 


const Update = () => {
   // const [events,setEvents] = useState([]);
    //const [createEvent,setCreateEvent] = useState({value:false});

    const [name,setName]=useState('');
    const [price,setTicketprice]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
    const [bannerPath,setBannerPath]=useState('');
    const [error, setError] = useState(''); 
    const [successMsg, setSuccessMsg] = useState('');
    const [logged,setLogged]=useState(false);   
   
    //const [loader, setLoader] = useState(true);
    //const [pagination,setPagination]=useState(true);
    const [eventMsg,setEventMsg]=useState('');
    let { id } = useParams(); 
    let history = useHistory(); 
    const authUser=useContext(UserContext); 


     console.log(id); 

    const getEventData = async()=> {
      
      const event = await getSingleEvent(id);
    
      console.log(event);
      return event;
    }; 
    useEffect(() => {
      if (!!authUser === false) {
          setLogged(false);
          history.push('/');
      }
      else {
          setLogged(true);
      }
    }, [authUser]) 

    useEffect ( async() => {
       
      const result = await getEventData(id);
      console.log(result);
      console.log(id); 
      //console.log(event);
       if(result.hasOwnProperty('error')){
           setError("No event")
       }
       else{
           setName(result.name);
           setBannerPath(result.bannerPath);
           setDescription(result.description);
           setCategory(result.category);
           setTicketprice(result.price);
           
       }
      }, [id]) 


      const handleSubmit = (event)=> {
        event.preventDefault();
        

        try {
          async function updateEdata(){
            await updateEvent(id,bannerPath,name,price,description,category)
             
              setSuccessMsg("Event successfully updated")
              setTimeout(() => {
               setSuccessMsg("");
               setName("");
               setTicketprice("");
               setDescription(""); 
               setCategory("");  
               history.push(`/viewdetails/${id}`);
          }, 3000);
             
          }
          updateEdata();
          if(successMsg && !error){
            toast.error("PLease provide value in each input field");
          }
          
        } catch (error) {
          setError('Error.Please try after some time...'); 
        }
        
         

        
        
        // const updateDoc = async(userId,bannerPath,name,price,description,category) => {
        //   const eventRef = doc(db, "events", "id") 
        //   try{
        //     await updateDoc(eventRef, {
              
        
        //   })
        // }  catch (e) {
        //   return 'error';
        //   console.error("Error updating document: ", e);
        // }
        // }
        

      }; 


  return (
    <>   
    <Header /> 
    
   <div className="container">
     <h2> Update Event</h2>
     <br/> 
     {successMsg && (
        <>
          <div className="success-msg" >{successMsg}</div>
          <br />
          <br />
        </>
      )}


    <form  className="createEvent-form">
                {/* {error  !== '' && 
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                } */}
                {/* { eventMsg !=='' &&
                    <div className="alert alert-info" role="alert">{eventMsg}</div>
                } */}
                    <div className=" createEvent-form">
                     <TextInput  label="Name" 
                                value={name}
                                required
                                onChange={(event)=>setName(event.target.value)}
                                variant="standard"/>
                    </div>
                    <div className=" createEvent-form">
                    <TextInput  label="Price in INR" 
                                value={price}
                                type="number"
                                required
                                onChange={(event)=>setTicketprice(event.target.value)}
                                variant="standard"/>
                    </div>
                    <div className=" createEvent-form noMarginTop">

                    <InputLabel id="demo-simple-file-label">Event Banner *</InputLabel>

                    <TextInput 
                                label="" 
                                type="file"
                                placeholder="Event Banner"
                                variant="standard"
                                required
                                filename={bannerPath}
                                //onChange={eventBanner}
                                />
                    </div>
                    <div className=" createEvent-form">
                    <TextInput  placeholder="Description" 
                                label="Description"
                                multiline
                                rows={10}
                                value={description}
                                variant="outlined" 
                                required
                                onChange={(event)=>setDescription(event.target.value)}
                                  />
                    </div>
                    <div className=" createEvent-form">
                    <BasicSelect  label="Category *" 
                                options="standard"
                                value={category}
                                required
                                onChange={(event)=>setCategory(event.target.value)} />
                    </div>

                    <div className='"createEvent-form'> 
                    <Button variant="contained"
                                className="LoginButton"
                                buttontext="Update"
                                onClick={handleSubmit}
                                />



                    </div>

                    {/* <div className=" createEvent-form">
                        {loader ?
                            <div className="text-center"><Spinner/></div>
                            : 
                            <Button variant="contained"
                                className="LoginButton"
                                buttontext="Create"
                                //onClick={saveEvent}
                                />
                        }
                    </div> */}
                </form>
                
                {successMsg? <ModalComponent Msg ='Successfully Updated'/> : error}
                </div> 
                </>
  )
}

export default Update