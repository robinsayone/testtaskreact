import {configureStore} from '@reduxjs/toolkit';
import eventSearch from './Eventslice';
export const store =configureStore({
	reducer:{
		search:eventSearch
	},
   devTools: process.env.NODE_ENV !== 'production',
});
