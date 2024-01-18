import {configureStore} from "@reduxjs/toolkit";

import thematicReducer from "./thematics/thematicSlice"
import draftExhibitionReducer from "./exhibitions/exhibitionSlice"
import authReducer from "./users/authSlice"
import exhibitionsReducer from "./exhibitions/exhibitionsSlice"
import thematicsReducer  from "./thematics/thematicsSlice"

export default configureStore({
	reducer: {
		thematic: thematicReducer,
		thematics: thematicsReducer,
		exhibition: draftExhibitionReducer,
		exhibitions: exhibitionsReducer,
		user: authReducer
	}
});