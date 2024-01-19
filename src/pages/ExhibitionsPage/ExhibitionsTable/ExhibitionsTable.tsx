import React from "react";
import "./ExhibitionsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useExhibitions} from "../../../hooks/exhibitions/useExhibitions";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import ExhibitionsFilters from "../ExhibitionsFilters/ExhibitionsFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";

const ExhibitionsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchExhibitions} = useExhibitions()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Пользователь",
            accessor: "owner",
            Cell: ({ value }) => { return value.name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Помещение",
            accessor: "room",
            Cell: ({ value }) => {
                if (!value) {
                    return "Не рассчитано"
                }

                return value
            }
        }
    ]

    if (is_moderator) {
        columns.push({
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptExhibition(cell.row.values.id)}>Принять</CustomButton>
            )
        })

        columns.push({
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissExhibition(cell.row.values.id)}>Отклонить</CustomButton>
            )
        })
    }

    const acceptExhibition = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`exhibitions/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissExhibition = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`exhibitions/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["exhibitions"],
        () => searchExhibitions(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

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

    const handleClick = (exhibition_id) => {
        navigate(`/exhibitions/${exhibition_id}`)
    }

    return (
        <div className="exhibitions-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <ExhibitionsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default ExhibitionsTable