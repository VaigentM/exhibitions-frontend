import {useEffect} from "react";
import {useExhibition} from "../../hooks/exhibitions/useExhibition";
import {useNavigate, useParams} from "react-router-dom"
import ThematicCard from "../../components/ThematicCard/ThematicCard";
import "./ExhibitionPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import {pluralDeliveryDate} from "../../utils/plural";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomDatePicker from "../../components/CustomDatePicker/CustomDatePicker";

const ExhibitionPage = () => {

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {exhibition, name, setName, description, setDescription, date_perform, setDatePerform, fetchExhibition, saveExhibition, sendExhibition, deleteExhibition, setExhibition} = useExhibition()

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
        navigate("/exhibitions")
    }

    const onDeleteExhibition = async () => {
        await deleteExhibition()
        navigate("/thematics")
    }

    const cards = exhibition.thematics.map(thematic  => (
        <ThematicCard thematic={thematic} key={thematic.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveExhibition} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendExhibition} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteExhibition} bg={variables.red}>Удалить</CustomButton>

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
                    <span>Статус: {STATUSES.find(status => status.id == exhibition.status).name}</span>
                    <span>Дата создания: {moment(exhibition.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(exhibition.status) && <span>Дата формирования: {moment(exhibition.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(exhibition.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                    {is_moderator && <span>Покупатель: {exhibition.owner.name}</span> }
                    {is_moderator && <span>Модератор: {exhibition.moderator.name}</span>}
                    {completed && <span>Дата доставки: {exhibition.delivery_date > 0 ? pluralDeliveryDate(exhibition.delivery_date) : "Нет"}</span>}
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Название выставки" value={name} setValue={setName} disabled={!is_draft} />
                    <CustomDatePicker placeholder="Дата проведения" value={date_perform} setValue={setDatePerform} disabled={!is_draft} />
                    <CustomTextarea placeholder="Описание выставки" value={description} setValue={setDescription} disabled={!is_draft} />

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