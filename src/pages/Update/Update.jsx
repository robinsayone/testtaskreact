import React, { useState, useEffect, useContext } from 'react';
import InputLabel from '@mui/material/InputLabel';
import TextInput from '../../component/textInput/textinput';
import BasicSelect from '../../component/dropdown/dropdown';

import Button from '../../component/button/button';
import { Link, useParams, useHistory } from 'react-router-dom';
import { getSingleEvent,imageupload, updateEvent, db } from '../../firebaseConfig';
import { doc, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import ModalComponent from "../../component/modal/Modal";
import Header from '../header/header';
import { UserContext } from "../../Provider/AuthProvider";
import isNotEmpty from '../../Helpers/isNotEmpty';
import isPriceValid from '../../Helpers/priceValidation';
import Spinner from '../Spinner/Spinner';
import Loader from 'react-loader-spinner';
import { selectClasses } from '@mui/material';
import { getDownloadURL } from "firebase/storage";


const Update = () => {

  const [name, setName] = useState('');
  const [price, setTicketprice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [banner, setBanner] = useState('');
  const [bannerPath, setBannerPath] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [logged, setLogged] = useState(false);
  const [loader, setLoader] = useState(true);

  const [eventMsg, setEventMsg] = useState('');
  let { id } = useParams();
  let history = useHistory();
  const authUser = useContext(UserContext);


  console.log(id);



  const getEventData = async () => {

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

  useEffect(async () => {

    const result = await getEventData(id);
    console.log(result);
    console.log(id);
    //console.log(event);
    if (result.hasOwnProperty('error')) {
      setError("No event")
    }
    else {
      setName(result.name);
      setBannerPath(result.bannerPath);
      setDescription(result.description);
      setCategory(result.category);
      setTicketprice(result.price);
      setLoader(false);
    }
  }, [id])

  const types = ["image/png", "image/PNG", "image/jpeg", "image/jpg"];

  const productImageHandler = (event) => {
    let selectedFile = event.target.files[0];
    console.log(selectedFile);
    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setBannerPath(URL.createObjectURL(event.target.files[0]));
        setError("");
        setBanner(selectedFile);
      } else {
        setBanner(null);
        setError("Please select a valid image type or jpeg");
      }
    }
    else {
      console.log("Please select your file");
    }

  };



  const handleSubmit = (event) => {
    event.preventDefault();


    if ((!isNotEmpty(name)) || (!isNotEmpty(price)) || (!isNotEmpty(description)) || (!isNotEmpty(bannerPath)) || (!isNotEmpty(category))) {
      setError("Fill all fields")
      return false;
    }
    if (!isPriceValid(price)) {
      setError("Price not valid")
      return false;

    }


    try {
      setError('');
      setLoader(true);

      if (banner) {
        imageupload(authUser.uid, banner).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((downloadURL) => {

            async function updateEdata() {
              await updateEvent(id, downloadURL, name, price, description, category)


              setLoader(false);
              setSuccessMsg("Event successfully updated")

              setTimeout(() => {

                setSuccessMsg("");
                setName("");
                setTicketprice("");
                setBannerPath("");
                setDescription("");
                setCategory("");

                history.push(`/viewdetails/${id}`);
              }, 3000);

            }
            updateEdata();

          })
        })
      } 
        else {
          async function updateEdata() {
            await updateEvent(id, bannerPath, name, price, description, category)

            setLoader(false);
            setSuccessMsg("Event successfully updated")

            setTimeout(() => {

              setSuccessMsg("");
              setName("");
              setTicketprice("");
              setBannerPath("");
              setDescription("");
              setCategory("");

              history.push(`/viewdetails/${id}`);
            }, 3000);

          }
          updateEdata(); 
        }
    }  catch (error) {
        setError('Error.Please try after some time...');
      }



    }
    ;




  return (
    <>
      <Header />

      <div className="container">
        <h2> Update Event</h2>
        <br />
        {successMsg && (
          <>
            <div className="success-msg" >{successMsg}</div>
            <br />
            <br />
          </>
        )}
        {loader ?
          <>
            <div className="text-center">

              <Spinner />
            </div>
          </>
          :




          <form className="createEvent-form">

            <div className=" createEvent-form">
              <TextInput label="Name"
                value={name}
                required
                onChange={(event) => setName(event.target.value)}
                variant="standard" />
            </div>
            <div className=" createEvent-form">
              <TextInput label="Price in INR"
                value={price}
                type="number"
                required
                min="0"
                onChange={(event) => setTicketprice(event.target.value)}
                variant="standard" />
            </div>


            <div className="row createEvent-form noMarginTop">
              <div className='col-md-8'>

                <InputLabel id="demo-simple-file-label">Update Event Banner *</InputLabel>

                <TextInput

                  label=""
                  type="file"
                  placeholder="Event Banner"
                  variant="standard"
                  required
                  filename={bannerPath}
                  onChange={productImageHandler}
                  //onChange={(event)=>setBannerPath(event.target.value)}
                  variant="standard" />

              </div>
              <div className='col-md-4'>
                <InputLabel id="demo-simple-file-label">Current Event Banner *</InputLabel>

                <img src={bannerPath} width="250px" />
                <label> {bannerPath ? "Change " : "Upload"} Product Image</label>
              </div>
            </div>

            <div className=" createEvent-form">
              <TextInput placeholder="Description"
                label="Description"
                multiline
                rows={10}
                value={description}
                variant="outlined"
                required
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
            <div className=" createEvent-form">
              <BasicSelect label="Category *"
                options="standard"
                value={category}
                required
                onChange={(event) => setCategory(event.target.value)} />
            </div>

            <div className='"createEvent-form'>
              <Button variant="contained"
                className="LoginButton"
                buttontext="Update"
                onClick={handleSubmit}
              />


            </div>


          </form>


        }
        {successMsg ? <ModalComponent Msg='Successfully Updated' /> : error}

      </div>
    </>
  )
}

export default Update