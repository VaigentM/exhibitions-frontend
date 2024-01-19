import {useEffect} from "react";
import {useExhibition} from "../../hooks/exhibitions/useExhibition";
import {useNavigate, useParams} from "react-router-dom"
import ThematicCard from "../../components/ThematicCard/ThematicCard";
import "./ExhibitionPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";

const ExhibitionPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {exhibition, name, description, date_perform, fetchExhibition, saveExhibition, sendExhibition, deleteExhibition, setExhibition, setName, setDescription, setDatePerform} = useExhibition()

    useEffect(() => {
        id && fetchExhibition(id)
        
        return () => {
            setExhibition(undefined)
        };
    }, [])

    if (id == undefined || exhibition == undefined)
    {
        return (
            <div className="exhibition-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendExhibition = async() => {
        await saveExhibition()
        await sendExhibition()
    }

    const cards = exhibition.thematics.map(thematic  => (
        <ThematicCard thematic={thematic} key={thematic.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveExhibition} bg={variables.primary}>Сохранить</CustomButton>

                <CustomButton onClick={onSendExhibition} bg={variables.green}>Отправить</CustomButton>

                <CustomButton onClick={deleteExhibition} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = exhibition.status == 1

    const completed = [3, 4].includes(exhibition.status)

    return (
        <div className="exhibition-page-wrapper">

            <div className="exhibition-thematics-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая выставка" : exhibition.name}</h3>
                </div>

                <div className="exhibition-info-container">
                    <span>Название: {exhibition.name}</span>
                    <span>Описание: {exhibition.description}</span>
                    <span>Дата проведения: {moment(exhibition.date_perform).locale(ru()).format("D MMMM HH:mm")}</span>
                    <span>Дата создания: {moment(exhibition.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(exhibition.status) && <span>Помещение: {exhibition.room}</span> }
                    {[2, 3, 4].includes(exhibition.status) && <span>Дата формирования: {moment(exhibition.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(exhibition.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Пользователь: {exhibition.owner.name}</span> }
                </div>

                <div className="inputs-container">

                    <CustomInput id="name" placeholder="Название" value={name} setValue={setName} disabled={!is_draft}/>
                    <CustomTextarea placeholder="Описание" value={description} setValue={setDescription} disabled={!is_draft} />
                    <CustomDatePicker placeholder="Дата проведения" value={date_perform} setValue={setDatePerform} disabled={!is_draft}/>

                </div>

                <div className="title">
                    <h3>Тематики</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default ExhibitionPage