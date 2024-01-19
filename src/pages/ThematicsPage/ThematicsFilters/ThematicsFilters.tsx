import "./ThematicsFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {useThematics} from "../../../hooks/thematics/useThematics";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const ThematicsFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = useThematics()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="thematics-filters">

            <h2>Поиск тематик</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/thematics/add" bg={variables.primary}>
                        Добавить тематику
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default ThematicsFilters