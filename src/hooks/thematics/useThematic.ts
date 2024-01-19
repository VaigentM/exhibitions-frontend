import {useDispatch, useSelector} from 'react-redux';
import {
	updateThematic,
	updateName,
	updateDescription,
	updatePlacesCount,
	updateImage
} from "../../store/thematics/thematicSlice";
import {api} from "../../utils/api";

export function useThematic() {
	const thematic = useSelector(state => state.thematic.thematic);

	const dispatch = useDispatch()

	const setThematic = (value) => {
		dispatch(updateThematic(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setPlacesCount = (value) => {
		dispatch(updatePlacesCount(value))
	}

	const setImage = (value) => {
		dispatch(updateImage(value))
	}

	const fetchThematic = async (id) => {

		const {data} = await api.get(`thematics/${id}`);

		setThematic(data)

	};

	return {
		thematic,
		setThematic,
		fetchThematic,
		setName,
		setDescription,
		setPlacesCount,
		setImage
	};
}