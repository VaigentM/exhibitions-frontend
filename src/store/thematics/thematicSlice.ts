import {createSlice} from "@reduxjs/toolkit"
import {Thematic} from "../../utils/types";

interface IThematicState {
	thematic: Thematic | undefined
}

const initialState: IThematicState = {
	thematic: undefined,
};

const thematicSlice = createSlice({
	name: 'thematic',
	initialState: initialState,
	reducers: {
		updateThematic(state, action) {
			state.thematic = action.payload
		},
		updateName(state, action) {
			state.thematic.name = action.payload
		},
		updateDescription(state, action) {
			state.thematic.description = action.payload
		},
		updatePlacesCount(state, action) {
			state.thematic.places_count = action.payload
		},
		updateImage(state, action) {
			state.thematic.image = action.payload
		}
	}
})

export const {
	updateThematic,
	updateName,
	updateDescription,
	updatePlacesCount,
	updateImage
} = thematicSlice.actions;

export default thematicSlice.reducer;