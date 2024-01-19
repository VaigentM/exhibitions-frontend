import "./ThematicCard.sass"
import {Thematic} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useExhibition} from "../../hooks/exhibitions/useExhibition";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";
import {useThematics} from "../../hooks/thematics/useThematics";

const ThematicCard = ({ thematic, refetch }: {thematic:Thematic}) => {

    const {is_authenticated, is_moderator} = useAuth()

    const {is_draft, addThematicToExhibition, deleteThematicFromExhibition} = useExhibition()

    const {deleteThematic} = useThematics()

    const {searchThematics} = useThematics()

    const handleAddThematic = async (e) => {
        e.preventDefault()
        await addThematicToExhibition(thematic)
        await searchThematics()
    }

    const handleDeleteThematicFromExhibition = async (e) => {
        e.preventDefault()
        await deleteThematicFromExhibition(thematic)
    }

    const handleDeleteThematic = async () => {
        await deleteThematic(thematic)
        refetch()
    }

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={thematic.image}  alt=""/>
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {thematic.name} </h3>

                </div>

                <div className="content-bottom">

                    {!is_moderator &&
                        <Link to={`/thematics/${thematic.id}`}>
                            <CustomButton bg={variables.primary}>
                                Подробнее
                            </CustomButton>
                        </Link>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("thematics-list") &&
                        <Link to={`/thematics/${thematic.id}/edit`}>
                            <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                        </Link>
                    }

                    {is_authenticated && !is_moderator && location.pathname.includes("thematics-list") &&
                        <CustomButton onClick={handleAddThematic} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_moderator && location.pathname.includes("thematics-list") &&
                        <CustomButton onClick={handleDeleteThematic} bg={variables.red}>Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("exhibitions") &&
                        <CustomButton onClick={handleDeleteThematicFromExhibition} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default ThematicCard;