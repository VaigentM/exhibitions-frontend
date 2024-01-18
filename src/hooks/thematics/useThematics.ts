import {useDispatch, useSelector} from 'react-redux';
import {
	updateThematics,
	updateQuery
} from "../../store/thematics/thematicsSlice";
import {api} from "../../utils/api";
import {useExhibition} from "../exhibitions/useExhibition";
import {useToken} from "../users/useToken";
import {AxiosRequestConfig} from "axios";

export function useThematics() {
	const thematics = useSelector(state => state.thematics.thematics);
	const query = useSelector(state => state.thematics.query);

	const {access_token} = useToken()

	const {fetchExhibition} = useExhibition()

	const dispatch = useDispatch()

	const setThematics = (value) => {
		dispatch(updateThematics(value))
	}

	const setQuery = (value) => {
		dispatch(updateQuery(value))
	}

	const searchThematics = async () => {
		
		const {data} = await api.get(`thematics/search`, {
			params: {
				query: query
			},
			headers: {
				'authorization': access_token
			}
		})

		const draft_exhibition_id = data["draft_exhibition_id"]
		draft_exhibition_id && fetchExhibition(draft_exhibition_id)

		return data["thematics"]
	}

	const fetchThematics = async () => {
		searchThematics().then(data => setThematics(data))
	}

	return {
		thematics,
		setThematics,
		query,
		setQuery,
		searchThematics,
		fetchThematics
	};
}