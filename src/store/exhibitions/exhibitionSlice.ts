import {createSlice} from "@reduxjs/toolkit"
import {Exhibition} from "../../utils/types";

interface IExhibitionState {
	exhibition: Exhibition | undefined,
	exhibition_id: number | undefined,
	name: string,
	description: string,
	date_perform: string
}

const initialState: IExhibitionState = {
	exhibition: undefined,
	exhibition_id: undefined,
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
		updateThematics(state, action) {
			state.exhibition.thematics = action.payload
		},
		updateExhibitionId(state, action) {
			state.exhibition_id = action.payload
		},
		updateName(state, action) {
			state.name = action.payload
		},
		updateDescription(state, action) {
			state.description = action.payload
		},
		updateDatePerform(state, action) {
			state.date_perform = action.payload
		}
	}
})

export const {updateExhibition, updateThematics, updateExhibitionId, updateName, updateDescription, updateDatePerform} = exhibitionSlice.actions;

export default exhibitionSlice.reducer;