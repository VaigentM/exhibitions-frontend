import "./ThematicCard.sass"
import {Thematic} from "../../utils/types";
import {Link} from "react-router-dom";
import {useAuth} from "../../hooks/users/useAuth";
import {useExhibition} from "../../hooks/exhibitions/useExhibition";
import CustomButton from "../CustomButton/CustomButton";
import {variables} from "../../utils/consts";

const ThematicCard = ({ thematic }: {thematic:Thematic}) => {
    
    const {is_authenticated, is_moderator} = useAuth()

    const {exhibition, is_draft, addThematicToExhibition, deleteThematicFromExhibition} = useExhibition()

    const handleAddThematic = (e) => {
        e.preventDefault()
        addThematicToExhibition(thematic)
    }

    const handleDeleteThematic = (e) => {
        deleteThematicFromExhibition(thematic)
    }

    const is_chosen = exhibition?.thematics.find(g => g.id == thematic.id)

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

                    <Link to={`/thematics/${thematic.id}`}>
                        <CustomButton bg={variables.primary}>
                            Подробнее
                        </CustomButton>
                    </Link>
                    
                    {is_authenticated && !is_chosen && !is_moderator && location.pathname.includes("thematics") &&
                        <CustomButton onClick={handleAddThematic} bg={variables.green}>Добавить</CustomButton>
                    }

                    {is_authenticated && is_chosen && location.pathname.includes("thematics") &&
                        <CustomButton onClick={handleDeleteThematic} bg={variables.red} >Удалить</CustomButton>
                    }

                    {is_authenticated && !is_moderator && is_draft && location.pathname.includes("exhibitions") &&
                        <CustomButton onClick={handleDeleteThematic} bg={variables.red}>Удалить</CustomButton>
                    }

                </div>

            </div>

        </div>
    )
}

export default ThematicCard;