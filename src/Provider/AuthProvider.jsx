import React,{ createContext, useState,useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const UserContext=createContext({ user:null });
const auth = getAuth();

const UserProvider=(props)=>{
	const [user,setUser]=useState(null);
	useEffect(()=>{
		onAuthStateChanged(auth, (userAuth) => {
			  if (userAuth) {
			    localStorage.setItem('accessToken', userAuth.accessToken);
			    setUser(userAuth);
			  }else{
			  	localStorage.removeItem('accessToken');
			    setUser(null);
			  }
			})
		},[]);

	return (
		<UserContext.Provider value={user} >{props.children}</UserContext.Provider>
		);
}

export default UserProvider;