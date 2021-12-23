import {createSlice} from '@reduxjs/toolkit';
const initialState={
	searchKey:''
}
export const event_slice = createSlice({
	name:'EventSlice',
	initialState,
	reducers:{
		searchKey:(state,actions) =>{
			state.searchKey=actions.payload;
		}

	}

});
export const eventSearchActions = event_slice.actions;
const eventSearch = event_slice.reducer;
export default eventSearch;