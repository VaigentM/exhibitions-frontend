import "./ThematicCard.sass"
import {Thematic} from "../../../Types";
import {Link} from "react-router-dom";
import mockImage from "/src/assets/mock.png"

const ThematicCard = ({ thematic, isMock }: {thematic:Thematic, isMock:boolean }) => {

    const img = `http://127.0.0.1:8000/api/thematics/${thematic.id}/image/`

    return (
        <div className="card-wrapper">

            <div className="preview">
                <img src={isMock ? mockImage : img} />
            </div>

            <div className="card-content">

                <div className="content-top">

                    <h3 className="title"> {thematic.name} </h3>

                </div>

                <div className="content-bottom">

                    <Link to={`/thematics/${thematic.id}`}>
                        Подробнее
                    </Link>

                </div>

            </div>

        </div>
    )
}

export default ThematicCard;