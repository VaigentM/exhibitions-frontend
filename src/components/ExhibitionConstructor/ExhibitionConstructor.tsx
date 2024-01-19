import "./ExhibitionConstructor.sass"
import {useExhibition} from "../../hooks/exhibitions/useExhibition";
import {Link} from "react-router-dom";

const ExhibitionConstructor = () => {

    const {exhibition_id} = useExhibition()

    if (exhibition_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая выставка</span>
            </div>
        )
    }

    return (
        <Link to={`/exhibitions/${exhibition_id}`} className="constructor-container">
            <span className="title">Новая выставка</span>
        </Link>
    )
}

export default ExhibitionConstructor