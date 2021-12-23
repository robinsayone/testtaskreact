
import React,{useState,useEffect,useContext} from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { signOutApp } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import {UserContext} from '../../Provider/AuthProvider';
import TextInput from '../../component/textInput/textinput';
import {useSelector , useDispatch} from 'react-redux';
import {eventSearchActions} from '../../store/Eventslice';
import './Navbar.css';



const NavBar =(props)=>{
const history = useHistory();
const authUser=useContext(UserContext);
// const [category,setCategory]=useState('');
const [key,setKey]=useState('');
const [logged,setLogged]=useState(false);
const dispatch =useDispatch();
const searchkey = useSelector((state)=>state.search.searchKey);

    useEffect(() => {
        if (!!authUser === false) {
            setLogged(false);
          // history.push('/');
        }
        else {
            setLogged(true);
        }
      }, [authUser,history])


    useEffect(() => {
        if((searchkey !== 'all') && (searchkey !== 'remove_search_key')){
            setKey(searchkey)
        }
        else{
            setKey('');
        }
      }, [searchkey])


    const signOut=()=>{
        signOutApp().then(() => {
            history.push('/Login');
          }).catch((error) => {
            console.log('error');
          });
    }
    const search=(e)=>{
        e.preventDefault();
        dispatch(eventSearchActions.searchKey(key));
    }


	return(
		 <Navbar className="navbar navbar-expand-lg navbar-light navDefault" expand="lg">
            <Container>
                <Navbar.Brand  as={Link} to="/"  className="navBrn">
                   Event <span className="navHighlight">Home</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <form className="form-inline my-2 my-lg-0">
                      {/*<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                      <div className="search-form">
                        <TextInput  label="KeyWord" 
                                    value={key}
                                    type="text"
                                    required
                                    onChange={(event)=>setKey(event.target.value)}
                                    variant="outlined"
                                    size="small"/>
                        </div>

                      <button className="btn btn-outline-success my-2 my-sm-0" onClick={search}>Search</button>
                    </form>

                    <Nav className="ms-auto mainNav" activeKey="/home">
                        <Nav.Item>
                            {
                               logged  ?
                                    <div>
                                        <button onClick={signOut} className="loginBtn">LogOut</button>
                                    </div> :
                                    <Link to="/Login">
                                        <button className="loginBtn">LogIn</button>
                                    </Link>
                            }
                        </Nav.Item>
                    </Nav>
                     

                </Navbar.Collapse>
            </Container>
        </Navbar>
        );
};
export default NavBar;

