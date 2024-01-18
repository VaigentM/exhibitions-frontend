import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	exhibition: undefined,
	name: "",
	description: "",
	date_perform: ""
};

const exhibitionSlice = createSlice({
	name: 'exhibition',
	initialState: initialState,
	reducers: {
		updateExhibition(state, action) {
			state.exhibition = action.payload
		},
		updateName(state, action){
			state.name = action.payload
		},
		updateDescription(state, action){
			state.description = action.payload
		},
		updateDatePerform(state, action){
			state.date_perform = action.payload
		}
	}
})

export const {updateExhibition, updateName, updateDescription, updateDatePerform} = exhibitionSlice.actions;

export default exhibitionSlice.reducer;