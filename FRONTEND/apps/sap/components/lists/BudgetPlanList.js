import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import BudgetPlanForm from "../forms/BudgetPlanForm";


import getQuery from "../../utils/getQuery";
import associativeKeys from "../../keys/associativeKeys";

import useList from "../../../../hooks/useList";
import ListTemplate from "../../../../templates/ListTemplate";
import {List, Switcher, useQuery} from 'mfc-core'

export default function BudgetPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('budget_plan'))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('budget_plan', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <BudgetPlanForm
                    handleClose={() => {
                        setCurrentEntity(null)
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>

            <List
                createOption={true}
                onCreate={() => setOpen(true)}

                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        setMessage(`Deseja deletar entidade ${entity.id}?`)
                        setCurrentEl(entity.id)
                        setOpenModal(true)
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={associativeKeys.budgetPlan}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }} title={'Planos orçamentários'}

            />
        </Switcher></>
    )
}