import {createSlice} from "@reduxjs/toolkit"
import {Thematic} from "../../utils/types";

interface IThematicsState {
	thematics: Array<Thematic>
	query: string
}

const initialState: IThematicsState = {
	thematics: [],
	query: ""
};

const thematicsSlice = createSlice({
	name: 'thematics',
	initialState: initialState,
	reducers: {
		updateThematics(state, action) {
			state.thematics = action.payload
		},
		updateQuery(state, action) {
			state.query = action.payload
		}
	}
})

export const {
	updateThematics,
	updateQuery
} = thematicsSlice.actions;

export default thematicsSlice.reducer;