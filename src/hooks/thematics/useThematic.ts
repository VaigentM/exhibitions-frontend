import {useDispatch, useSelector} from 'react-redux';
import {
	updateThematic
} from "../../store/thematics/thematicSlice";
import {api} from "../../utils/api";

export function useThematic() {
	const thematic = useSelector(state => state.thematic.thematic);

	const dispatch = useDispatch()

	const setThematic = (value) => {
		dispatch(updateThematic(value))
	}

	const fetchThematic = async (id) => {

		const {data} = await api.get(`thematics/${id}`);

		setThematic(data)

	};

	return {
		thematic,
		setThematic,
		fetchThematic
	};
}