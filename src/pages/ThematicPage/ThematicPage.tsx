import "./ThematicPage.sass"
import {useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import {useThematic} from "../../hooks/thematics/useThematic";

const ThematicPage = () => {

    const { id } = useParams<{id: string}>();
    
    const {thematic, fetchThematic} = useThematic()
    
    useEffect(() => {
        id && fetchThematic(id)
    }, [])

    if (thematic == undefined) {
        return (
            <div>

            </div>
        )
    }

    const img = `http://127.0.0.1:8000/api/thematics/${id}/image/`

    return (
        <div className="page-details-wrapper">

            <Link className="return-link" to="/">
                Назад
            </Link>

            <div className="left">

                <img src={img}  alt=""/>

            </div>

            <div className="right">

                <div className="info-container">

                    <h2 className="name">{thematic.name}</h2>

                    <br />

                    <span className="description">{thematic.description}</span>

                    <br />

                    <span className="foundation_date">Год основания: {thematic.foundation_date}г</span>

                    <br />

                    <span className="grp">Население: {thematic.grp} млн</span>

                    <br />

                    <span className="square">Площадь: {thematic.square} км^2</span>

                    <br />

                    <span className="climate">Климат: {thematic.climate}</span>

                </div>

            </div>

        </div>
    )
}

export default ThematicPage;