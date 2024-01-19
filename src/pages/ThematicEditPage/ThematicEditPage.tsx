import "./ThematicEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {useThematic} from "../../hooks/thematics/useThematic";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const ThematicEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        thematic,
        fetchThematic,
        setName,
        setDescription,
        setPlacesCount,
        setImage
    } = useThematic()

    useEffect(() => {
        id && fetchThematic(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const saveThematic = async() => {
        let form_data = new FormData()

        form_data.append('name', thematic.name)
        form_data.append('description', thematic.description)
        form_data.append('places_count', thematic.places_count)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`thematics/${thematic.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }
    }

    const deleteThematic = async () => {

        const response = await api.delete(`thematics/${thematic.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (thematic == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={thematic.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange} />

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={thematic.name} setValue={setName} />

                    <CustomTextarea placeholder="Адрес" value={thematic.description} setValue={setDescription} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={saveThematic}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deleteThematic}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default ThematicEditPage