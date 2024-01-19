import ExhibitionsTable from "./ExhibitionsTable/ExhibitionsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const ExhibitionsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/thematics")
        }
    }, [])

    return (
        <div>
            <ExhibitionsTable />
        </div>
    )
}

export default ExhibitionsPage;

