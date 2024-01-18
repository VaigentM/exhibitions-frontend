import "./ThematicsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useThematics} from "../../../hooks/thematics/useThematics";

const ThematicsFilters = () => {

    const {query, setQuery, fetchThematics} = useThematics()

    const handleSubmit = () => fetchThematics()

    return (
        <div className="thematics-filters">

            <h2>Поиск тематик</h2>

            <SearchBar query={query} setQuery={setQuery} onSubmit={handleSubmit} />

        </div>
    )
}

export default ThematicsFilters