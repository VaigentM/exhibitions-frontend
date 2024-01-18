import {useDispatch, useSelector} from 'react-redux';
import {
	updateStatus,
	updateDateStart,
	updateDateEnd,
	updateUser
} from "../../store/exhibitions/exhibitionsSlice";
import {api} from "../../utils/api";
import {useToken} from "../users/useToken";

export function useExhibitions() {
	const status = useSelector(state => state.exhibitions.status)
	const date_start = useSelector(state => state.exhibitions.date_start)
	const date_end = useSelector(state => state.exhibitions.date_end)
	const user = useSelector(state => state.exhibitions.user)

	const dispatch = useDispatch()

	const {access_token} = useToken()

	const setStatus = (value) => {
		dispatch(updateStatus(value))
	}

	const setDateStart = (value) => {
		dispatch(updateDateStart(value))
	}

	const setDateEnd = (value) => {
		dispatch(updateDateEnd(value))
	}

	const setUser = (value) => {
		dispatch(updateUser(value))
	}

	const searchExhibitions = async () => {

		const {data} = await api.get(`exhibitions/search/`, {
			params: {
				status: status,
				date_start: new Date(date_start),
				date_end: new Date(date_end)
			},
			headers: {
				'authorization': access_token
			}
		})

		// data = data.filter(exhibition => exhibition.employer.name.includes(user))

		return data

	}

	return {
		status,
		date_start,
		date_end,
		setStatus,
		searchExhibitions,
		setDateStart,
		setDateEnd,
		setUser
	};
}