import {useThematics} from "../../../hooks/thematics/useThematics";
import {useQuery} from "react-query";
import ThematicsTable from "./ThematicsTable/ThematicsTable";

const ThematicsTableWrapper = () => {

    const {searchThematics} = useThematics()

    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["thematics"],
        () => searchThematics(),
        {
            keepPreviousData: true,
        }
    )

    if (isLoading) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="thematics-wrapper">
            <ThematicsTable isLoading={isLoading} data={data} isSuccess={isSuccess} refetch={refetch} />
        </div>
    )
}

export default ThematicsTableWrapper