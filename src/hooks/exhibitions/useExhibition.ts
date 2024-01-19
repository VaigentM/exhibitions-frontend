import {useDispatch, useSelector} from 'react-redux';
import {
	updateExhibition,
	updateExhibitionId,
	updateThematics,
	updateName,
	updateDescription,
	updateDatePerform
} from "../../store/exhibitions/exhibitionSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";
import {useNavigate} from "react-router-dom"

export function useExhibition() {

	const {access_token} = useToken()

	const exhibition = useSelector(state => state.exhibition.exhibition)
	const exhibition_id = useSelector(state => state.exhibition.exhibition_id)
	const name = useSelector(state => state.exhibition.name)
	const description = useSelector(state => state.exhibition.description)
	const date_perform = useSelector(state => state.exhibition.date_perform)

	const is_draft = exhibition?.status == 1

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const setExhibition = (value) => {
		dispatch(updateExhibition(value))
	}

	const setThematics = (value) => {
		dispatch(updateThematics(value))
	}

	const setExhibitionId = (value) => {
		dispatch(updateExhibitionId(value))
	}

	const setName = (value) => {
		dispatch(updateName(value))
	}

	const setDescription = (value) => {
		dispatch(updateDescription(value))
	}

	const setDatePerform = (value) => {
		dispatch(updateDatePerform(value))
	}

	const sendExhibition = async () => {

		const response = await api.put(`exhibitions/${exhibition.id}/update_status_user/`, {}, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setExhibition(undefined)
			setExhibitionId(undefined)
			navigate("/exhibitions")
		}
	}

	const deleteExhibition = async () => {

		const response = await api.delete(`exhibitions/${exhibition.id}/delete/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200)
		{
			setExhibition(undefined)
			setExhibitionId(undefined)
			navigate("/")
		}

	}

	const saveExhibition = async () => {

		const formData = new FormData()
		formData.append("name", name)
		formData.append("description", description)
		formData.append("date_perform", date_perform)

		await api.put(`exhibitions/${exhibition.id}/update/`, formData, {
			headers: {
				'authorization': access_token
			}
		})

	}

	const fetchExhibition = async (exhibition_id) => {

		const {data} = await api.get(`exhibitions/${exhibition_id}/`, {
			headers: {
				'authorization': access_token
			},
		})

		setExhibition(data)
		setName(data["name"])
		setDescription(data["description"])
		setDatePerform(data["date_perform"].split('T')[0])
	}

	const addThematicToExhibition = async (thematic) => {
		await api.post(`thematics/${thematic.id}/add_to_exhibition/`, {}, {
			headers: {
				'authorization': access_token
			}
		})
	}

	const deleteThematicFromExhibition = async (thematic) => {
		const response = await api.delete(`exhibitions/${exhibition.id}/delete_thematic/${thematic.id}/`, {
			headers: {
				'authorization': access_token
			}
		})

		if (response.status == 200){
			await fetchExhibition(exhibition_id)
		} else if (response.status == 201) {
			navigate("/")
		}
	}

	return {
		exhibition,
		exhibition_id,
		is_draft,
		name,
		description,
		date_perform,
		setExhibition,
		saveExhibition,
		sendExhibition,
		deleteExhibition,
		fetchExhibition,
		addThematicToExhibition,
		deleteThematicFromExhibition,
		setExhibitionId,
		setThematics,
		setName,
		setDescription,
		setDatePerform
	};
}