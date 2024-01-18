import "./ThematicsList.sass"
import {useEffect} from "react";
import ThematicCard from "../../../components/ThematicCard/ThematicCard";
import {useThematics} from "../../../hooks/thematics/useThematics";

const ThematicsList = () => {

    const {thematics, fetchThematics} = useThematics()

    useEffect(() => {
        fetchThematics()
    }, [])

    const cards = thematics.map(thematic  => (
        <ThematicCard thematic={thematic} key={thematic.id}/>
    ))

    return (
        <div className="thematics-list">

            { cards }

        </div>
    )
}

export default ThematicsList;