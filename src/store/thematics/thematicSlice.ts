import {createSlice} from "@reduxjs/toolkit"

const initialState = {
	thematic: undefined,
};

const thematicSlice = createSlice({
	name: 'thematic',
	initialState: initialState,
	reducers: {
		updateThematic(state, action) {
			state.thematic = action.payload
		}
	}
})

export const {
	updateThematic
} = thematicSlice.actions;

export default thematicSlice.reducer;