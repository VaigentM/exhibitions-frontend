import {useDispatch, useSelector} from 'react-redux';
import {
	updateDatePerform,
	updateDescription,
	updateExhibition,
	updateName
} from "../../store/exhibitions/exhibitionSlice";
import {useToken} from "../users/useToken";
import {api} from "../../utils/api";

export function useExhibition() {

	const {access_token} = useToken()

	const exhibition = useSelector(state => state.exhibition.exhibition)

	const name = useSelector(state => state.exhibition.name)
	const description = useSelector(state => state.exhibition.description)
	const date_perform = useSelector(state => state.exhibition.date_perform)

	const is_draft = exhibition?.status == 1

	const dispatch = useDispatch()

	const setExhibition = (value) => {
		dispatch(updateExhibition(value))
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
			setName("")
			setDescription("")
			setDatePerform("")
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
			setName("")
			setDescription("")
			setDatePerform("")
		}

	}

	const saveExhibition = async () => {

		const form_data = new FormData()

		form_data.append('name', name)
		form_data.append('description', description)
		form_data.append('date_perform', date_perform)

		await api.put(`exhibitions/${exhibition.id}/update/`, form_data, {
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

		const response = await api.post(`thematics/${thematic.id}/add_to_exhibition/`, {}, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setExhibition(response.data)
		}
	}

	const deleteThematicFromExhibition = async (thematic) => {
		const response = await api.delete(`exhibitions/${exhibition.id}/delete_thematic/${thematic.id}/`, {
			headers: {
				'authorization': access_token
			},
		});

		if (response.status == 200) {
			setExhibition(response.data)
		}
	}

	return {
		exhibition,
		name,
		description,
		date_perform,
		is_draft,
		setExhibition,
		setName,
		setDescription,
		setDatePerform,
		saveExhibition,
		sendExhibition,
		deleteExhibition,
		fetchExhibition,
		addThematicToExhibition,
		deleteThematicFromExhibition
	};
}