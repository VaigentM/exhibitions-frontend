import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {useNavigate } from "react-router-dom";
import ThematicsFilters from "../../ThematicsFilters/ThematicsFilters";

const ThematicsTable = ({isLoading, data, isSuccess, refetch}) => {

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        }
    ]

    const navigate = useNavigate()

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const openEditCityPage = (thematic_id) => {
        navigate(`/thematics/${thematic_id}/edit`)
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <ThematicsFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default ThematicsTable