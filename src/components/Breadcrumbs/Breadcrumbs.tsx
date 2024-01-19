import "./Breadcrumbs.sass"
import { Link, useLocation } from "react-router-dom";
import {FaChevronRight} from "react-icons/fa6";
import {FaHome} from "react-icons/fa";
import {useThematic} from "../../hooks/thematics/useThematic";
import {useExhibition} from "../../hooks/exhibitions/useExhibition";
import ThematicsList from "../../pages/ThematicsPage/ThematicsList/ThematicsList";

const Breadcrumbs = () => {

    const location = useLocation()

    const {thematic, setThematic} = useThematic()

    const { exhibition, is_draft } = useExhibition()

    let currentLink = ''

    const resetSelectedThematic = () => setThematic(undefined)

    const topics = {
        "thematics-list": "Тематики",
        "thematics-table": "Тематики",
        "exhibitions": "Выставки",
        "home": "Главная",
        "login": "Вход",
        "register": "Регистрация",
        "profile": "Личный кабинет"
    }

    const crumbs = location.pathname.split('/').filter(crumb => crumb !== '').map(crumb => {

        currentLink += `/${crumb}`

        if (crumb == "edit") {
            return
        }

        if (crumb == "thematics") {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to="thematics-list">
                        Тематики
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (Object.keys(topics).find(x => x == crumb)) {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink} onClick={resetSelectedThematic}>
                        { topics[crumb] }
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('add')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        Новая тематика
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }


        if (currentLink.match(new RegExp('exhibitions/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {is_draft ? "Новая выставка" : exhibition?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }

        if (currentLink.match(new RegExp('thematics/(\d*)')))
        {
            return (
                <div className={"crumb"} key={crumb}>

                    <Link to={currentLink}>
                        {thematic?.name}
                    </Link>

                    <FaChevronRight className={"chevron-icon"}/>

                </div>
            )
        }
    });

    return (
        <div className="breadcrumbs-wrapper">
            <div className="breadcrumbs">

                <div className="crumb">

                    <Link to="/">
                        <FaHome className="home-icon" />
                    </Link>

                    <FaChevronRight className="chevron-icon" />

                </div>

                {crumbs}

            </div>
        </div>
    )
}

export default Breadcrumbs;