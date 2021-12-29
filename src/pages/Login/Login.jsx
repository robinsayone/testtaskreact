import React,{useState,useEffect,useContext} from 'react';
import { Link } from "react-router-dom";
import Button from '../../component/button/button';
import TextInput from '../../component/textInput/textinput';
import { ValidateEmail } from "../../Helpers/emailValidator";
import { passwordValidator } from "../../Helpers/passwordValidator";
import { signUpEmailPwd,signInEmailPwd } from "../../firebaseConfig";
import { useHistory } from "react-router-dom";
import './Login.css';
import {UserContext} from '../../Provider/AuthProvider';
import { FirebaseErrorHandler } from "../../Helpers/FirebaseErrorHandler";
import Spinner from './../Spinner/Spinner';

const Login = (props)=>{
const authUser=useContext(UserContext);
const [signUp,setSignup]=useState('no');	
const [email, setEmail] = useState({ value: "", error: "" });
const [password, setPassword] = useState({ value: "", error: "" });
const [conpassword, setConpassword] = useState({ value: "", error: "" });
const [error, SetError] = useState('');
const [loader, setLoader] = useState(false);

const history = useHistory();

useEffect(() => {
    if (authUser) {
      history.push('/');
    }
  })
const authenticate = () =>{

	   const emailError = ValidateEmail(email.value);
	   const passwordError = passwordValidator(password.value);
	   setLoader(true);
	   if(emailError){
	   	setEmail({...email,error:emailError});	   
	   	setLoader(false);
	   }
	   else if(passwordError){
	   	setPassword({...password,error:passwordError});	   
	   	setLoader(false);
	   }
	   else if (signUp === 'yes' && password.value !== conpassword.value) {
	      setConpassword({ ...conpassword, error: 'Password and Repassword not match' });	   
	      setLoader(false);
	    } 
	   else if(signUp === 'yes'){
		   signUpEmailPwd(email.value,password.value).then((userCredential) => {
 				      SetError("Success");
  	      	   setLoader(false);
			  })
			  .catch((error) => {
			    const errorCode = error.code;
			    const result = FirebaseErrorHandler(errorCode);
		        SetError(result);
       	   setLoader(false);

			  });
	   }
	   else{

	      signInEmailPwd(email.value,password.value).then((userCredential) => {
		      // const user = userCredential.user;
		      SetError("Success.Please SignIn to Site");
      	   setLoader(false);

		    })
		    .catch((error) => {
		      const errorCode = error.code;
		      const result = FirebaseErrorHandler(errorCode);
	         SetError(result);
       	   setLoader(false);

		    });
	   }


}
return (
		<>	
        <div className="fContainer">
   	         <div className="forms-container">
		         <div className="signIn-singUp">
					<form  className="sign-in-form">
			            <h2 className="title">
			            	{ signUp === 'no' ? "Sign in" : "Sign Up" }	
			            </h2>
			            {error  !== '' && 
				            <div className="alert alert-danger" role="alert">
							  {error}
							</div>
						}
			            <div className="user__email fullwidth">
			             <TextInput  label="Email" 
									value={email.value}
									error={!!email.error}
					                errorText={email.error}
									onChange={(event)=>setEmail({value:event.target.value,error:""})}
									variant="filled"/>
						</div>
						<div className="user__password fullwidth">
			            <TextInput  label="Password" 
						            type="password"
									value={password.value}
									error={!!password.error}
					                errorText={password.error}
									onChange={(event)=>setPassword({value:event.target.value,error:""})}
									variant="filled"/>
						</div>
						{ signUp === 'yes' &&
			            <div className="user__password fullwidth">
				            <TextInput  label="Confirm Password" 
							            type="password"
										value={conpassword.value}
										error={!!conpassword.error}
						                errorText={conpassword.error}
										onChange={(event)=>setConpassword({value:event.target.value,error:""})}
										variant="filled"/>
						</div>

						}
						{ loader ? <div className="text-center"><Spinner/></div>
							:
						<>
							<div className="user__button fullwidth">
								<Button variant="contained"
									className="LoginButton"
									buttontext={ signUp === 'no' ? "Sign In" : "Sign Up" } 
									onClick={authenticate}/>
							</div>
							<div >
							{ signUp === 'no' ?
				              <p >New Member? <a  href="#" onClick={()=>{setSignup('yes');SetError('');}}>Sign up now.</a></p>
				              :
				              <p>Already a Member? <a href="#" onClick={()=>setSignup('no')}>Sign In now.</a></p>
							}
				        </div>
			         </>
			         }
			        </form>
			        
		        </div>
		        <div className="panels-container">
			          <div className="panel left-panel">
			            <div className="content">
			              <h3>Home ?</h3>
			              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi beatae quas magnam!</p>
			              <Link as={Link} to="/">
			              	<button className="iBtn transparent"  >Home</button>
			              </Link>
			            </div>
			          </div>			    
			       </div>
	        </div>
        </div>
		</>
	);
}
export default Login;


