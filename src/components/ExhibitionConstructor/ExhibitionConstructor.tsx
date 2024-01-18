import "./ExhibitionConstructor.sass"
import {useExhibition} from "../../hooks/exhibitions/useExhibition";
import {Link} from "react-router-dom";

const ExhibitionConstructor = () => {

    const {exhibition} = useExhibition()

    if (exhibition == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая выставка</span>
            </div>
        )
    }

    return (
        <Link to={`/exhibitions/${exhibition.id}`} className="constructor-container">
            <span className="title">Новая выставка</span>
            {exhibition.thematics.length > 0 && <span className="badge">{exhibition.thematics.length}</span>}
        </Link>
    )
}

export default ExhibitionConstructor