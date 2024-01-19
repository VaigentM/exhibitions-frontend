import {createSlice} from "@reduxjs/toolkit"

interface IExhibitionsState {
	status: number,
	date_start: string,
	date_end: string,
	user: string
}

const initialState: IExhibitionsState = {
	status: -1,
	date_start: "2013-10-12",
	date_end: "2024-01-25",
	user: ""
};

const exhibitionsSlice = createSlice({
	name: 'exhibitions',
	initialState: initialState,
	reducers: {
		updateStatus(state, action) {
			state.status = action.payload
		},
		updateDateStart(state, action) {
			state.date_start = action.payload
		},
		updateDateEnd(state, action) {
			state.date_end = action.payload
		},
		updateUser(state, action) {
			state.user = action.payload
		}
	}
})

export const {updateStatus, updateDateStart, updateDateEnd, updateUser} = exhibitionsSlice.actions;

export default exhibitionsSlice.reducer;