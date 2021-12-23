
// import Spinner from '../../Shared/Spinner/Spinner';
import React,{useState,useEffect,useContext} from 'react';
import Event from './Event';
import {UserContext} from '../../Provider/AuthProvider';
import Button from '../../component/button/button';
import TextInput from '../../component/textInput/textinput';
import BasicSelect from '../../component/dropdown/dropdown';
import Spinner from './../Spinner/Spinner';
import './Events.css'
import './pagination.scss'
import InputLabel from '@mui/material/InputLabel';
import { writeEventData,imageupload,getFirstdata,getCountEvent,getNextdata,getPrevdata,getFilterCategory,getSearchCategory} from "../../firebaseConfig";
import { getDownloadURL } from "firebase/storage";
import {useSelector , useDispatch} from 'react-redux';
import {eventSearchActions} from '../../store/Eventslice';

const Events = () =>{
    const [events,setEvents] = useState([]);
    const [createEvent,setCreateEvent] = useState({value:false});

    const [name,setName]=useState('');
    const [price,setTicketprice]=useState('');
    const [description,setDescription]=useState('');
    const [category,setCategory]=useState('');
    const [banner,setBanner]=useState('');
    const [error, SetError] = useState('');
    const [firebasedoc, setFirebasedoc] = useState('');
    const [curentPage, setCurentPage] = useState(1);
    const [pageCount, setPageCount] = useState(0);

    const [disPrev, setDisPrev] = useState(true);
    const [disNext, setDisNext] = useState(false);
    const [filterCategory,setFilterCategory] = useState('');
    const authUser=useContext(UserContext);
    const dispatch =useDispatch();
    const searchkey = useSelector((state)=>state.search.searchKey);
    const [loader, setLoader] = useState(true);
    const [pagination,setPagination]=useState(true);
    const [eventMsg,setEventMsg]=useState('');

console.log(searchkey);
    const itemsPerPage = 3;
       useEffect( () => {
         async function eventdata(){
             try{
                    let result=[];
                    setFilterCategory('');
                    if((searchkey === '') || (searchkey === 'all')){

                         result = await getFirstdata();
                         setPagination(true); 
                    }
                    else{
                         result = await getSearchCategory(searchkey);
                                   setPagination(false); 

                    }
                    setFirebasedoc(result);
                    const res = result.docs.map((value) =>  [{id: value.id,...value.data()}][0]);
                    setEvents(res);
                    setLoader(false);
                    SetError('');
            }
            catch{  
                    setLoader(false);
                    SetError('Please try after some time..');
            }
         }
           eventdata();

        }, [searchkey]);

    useEffect( ()=>{
        async function getcount(){
             const count = await getCountEvent();
            setPageCount(Math.ceil(count / itemsPerPage));     
        }
        getcount();
       
       },[searchkey]);

    const toggleEvent = () =>{
        setEventMsg('')
        setCreateEvent(prevState =>({
            value:!prevState.value
        }));
    }
    const listEvent = () =>{
        setEventMsg('')
        dispatch(eventSearchActions.searchKey('all'));
        setCreateEvent({value:false});
    }
    const eventCreate = () =>{
        setCreateEvent({value:true});
    }
    const filterChange =(event) =>{
        setFilterCategory(event.target.value);
        dispatch(eventSearchActions.searchKey(''));
        setFirebasedoc('');
         getFilterCategory(event.target.value).then((result)=>{
                const res = result.docs.map((value) =>  [{id: value.id,...value.data()}][0]);
                setEvents(res);
                SetError('');
                setPagination(false); 
            }).catch((error)=>{
                SetError('Please try after some time..');
            });
    }
    const saveEvent = ()=>{
        if(!name || !price || !description || !category || !banner){
            SetError('Please fill all fields.');
        }else{
            SetError('');
            setLoader(true);
            imageupload(authUser.uid,banner).then((snapshot)=>{
                getDownloadURL(snapshot.ref).then((downloadURL) => {
                    // console.log('File available at', downloadURL);
                    // const bannerPath = snapshot.metadata.fullPath;
                    async function saveEventdata(){
                        const result = await writeEventData(authUser.uid,downloadURL,name,price,description,category);
                        setEventMsg(result);
                        setLoader(false);
                        setName('');
                        setTicketprice('');
                        setDescription('');
                        setCategory('');
                        setBanner('');
                        // toggleEvent();
                    }
                    saveEventdata();


                });
            }).catch((error) => {
              SetError('Error.Please try after some time...');
            });
        }
    }
      const Next = (event) => {
        getNextdata(firebasedoc).then((result)=>{
                const res = result.docs.map((value) =>  [{id: value.id,...value.data()}][0]);
                setEvents(res); 
                setFirebasedoc(result);
   
                // setDisPrev(false);
                // if(res.length > 0){
                //     setEvents(res); 
                //     setFirebasedoc(result);
   
                // }else{
                //     setDisNext(true);
                // }
                SetError('');
                setCurentPage(+curentPage + 1);
                setDisPrev(false);
                if(curentPage === pageCount-1){
                setDisNext(true);
                }
            }).catch((error)=>{
                SetError('Please try after some time..');
            });

      };
      const Previous = (event) => {
        getPrevdata(firebasedoc).then((result)=>{
                const res = result.docs.map((value) =>  [{id: value.id,...value.data()}][0]);
                setEvents(res); 
                setFirebasedoc(result);
                SetError('');
                setDisNext(false);
                
                // if(res.length > 0){
                //     setEvents(res);
                // setFirebasedoc(result);
                // }else{
                //     setDisPrev(true);
                // }

                setCurentPage(+curentPage - 1);
                setDisNext(false);
                if(curentPage === 2){
                setDisPrev(true);
                }

            }).catch((error)=>{
                SetError('Please try after some time..');
            });
      };
    const clearFilter = () =>{
            setFilterCategory('');
            dispatch(eventSearchActions.searchKey('all'));
    }


      

    return (
        <section id="services" className="services">
        
            <h4 className="miniTitle text-center sectionTitle">
                {/*{(authUser.user != undefined && authUser.user.user != null) && (createEvent.value == false) ? 'Events' : 'Create Event'}*/}
                {(authUser !== undefined && authUser !== null) || (createEvent.value === false) ? 'Events' : 'Create Event'}
            </h4>
           
            {/*{events.length === 0 && <div className="spinner text-center"><Spinner/></div>}*/}
            {   authUser !== undefined && authUser !== null && 
                    <div className="createbuttonclas">
                            {(authUser !== undefined && authUser !== null) && (createEvent.value === false) ? <button  className="loginBtn" onClick={eventCreate}>Create Event</button> 
                            : <button  className="loginBtn" onClick={listEvent}>List Event</button>}
                    </div>
            }

            { (createEvent.value === false) || (authUser === undefined && authUser === null) ? 
          <>
            { !loader && events.length !== 0 &&
                <div className="filterForm mt-4">

                    <div className="filterp">                    
                     <b>Filter By :: </b>
                     <div className="filterDiv">
                        <BasicSelect  label="Category" 
                                options="outlined"
                                value={filterCategory}
                                required
                                onChange={filterChange} 
                                size="small"/>
                     </div>
                     { filterCategory &&
                        <button type="button" className="btn btn-success" onClick={clearFilter}>Clear Filter</button>
                     }
                    </div>
                </div>
            }
            <div className="row mt-0 container mx-auto justify-content-center">
                {events.length === 0 && !loader &&
                         <div className="alert alert-danger" role="alert">
                             No events are found..
                            </div>
                    
                }
                { loader && 
                    <div className="text-center">
                                <Spinner/>
                            </div>
                }
                { events.length !== 0
                    && events?.map((event, id) => <Event  key={id} event={event}/>)
                }

            </div>
            {!loader && events.length !== 0 && pagination &&
             <div className="paginationCustom">
                <div>
                 <Button variant="contained"
                            className="LoginButton"
                            buttontext="Previous"
                            onClick={Previous}
                            disabled={disPrev}/>
                </div>
                <div>
                <Button variant="contained"
                            className="LoginButton"
                            buttontext="Next"
                            onClick={Next}
                            disabled={disNext}/>
                </div>
            </div>
            }
            </>
                : 
                <form  className="createEvent-form">
                {error  !== '' && 
                            <div className="alert alert-danger" role="alert">
                              {error}
                            </div>
                }
                { eventMsg !=='' &&
                    <div className="alert alert-info" role="alert">{eventMsg}</div>
                }
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
                                filename={banner}
                                onChange={(event)=>setBanner(event.target.files[0])}/>
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
                    <div className=" createEvent-form">
                        {loader ?
                            <div className="text-center"><Spinner/></div>
                            : 
                            <Button variant="contained"
                                className="LoginButton"
                                buttontext="Create"
                                onClick={saveEvent}/>
                        }
                    </div>
                </form>

            }
        </section>
    );
};
export default Events;