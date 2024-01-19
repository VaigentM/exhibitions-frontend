import "./ThematicsList.sass"
import ThematicCard from "../../../components/ThematicCard/ThematicCard";
import {useThematics} from "../../../hooks/thematics/useThematics";
import {useQuery} from "react-query";
import ThematicsFilters from "../ThematicsFilters/ThematicsFilters";

const ThematicsList = () => {

    const {searchThematics} = useThematics()

    const { isLoading, data, refetch } = useQuery(
        ["thematics"],
        () => searchThematics(),
        {
            keepPreviousData: false,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    const cards = data.map(thematic  => (
        <ThematicCard thematic={thematic} key={thematic.id} refetch={refetch}/>
    ))

    return (
        <div className="thematics-wrapper">
            <div className="thematics-list-wrapper">

                <ThematicsFilters refetch={refetch}/>

                <div className="thematics-list">
                    { cards }
                </div>

            </div>
        </div>
    )
}

export default ThematicsList;