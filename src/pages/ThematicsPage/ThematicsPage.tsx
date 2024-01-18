import "./ThematicsPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import ThematicsList from "./ThematicsList/ThematicsList";
import ThematicsFilters from "./ThematicsFilters/ThematicsFilters";

const ThematicsPage = () => {

    const {is_moderator} = useAuth()

    return (
        <div className="thematics-wrapper">

            <ThematicsFilters />

            {!is_moderator && <ThematicsList />}

        </div>
    )
}

export default ThematicsPage;