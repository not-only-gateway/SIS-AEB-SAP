import PropTypes from 'prop-types'
import React, {useState} from "react";
import {List, Switcher, useQuery} from 'mfc-core'
import {DeleteRounded} from "@material-ui/icons";
import FinancialDisbursementForm from "../forms/FinancialDisbursementForm";
import getQuery from "../../utils/getQuery";
import useList from "../../../../addons/useList";
import workPlanKeys from "../../keys/workPlanKeys";
import ListTemplate from "../../../../addons/ListTemplate";


export default function FinancialDisbursementList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('financial_disbursement', {
        work_plan: props.workPlan?.id
    }))
    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('financial_disbursement', () => hook.clean())

    return (

        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>
            <FinancialDisbursementForm
                handleClose={() => {
                    setCurrentEntity(null)
                    setOpen(false)
                    hook.clean()
                }}

                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity} workPlan={props.workPlan}/>

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
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
                keys={workPlanKeys.financialDisbursement}
                title={'Desembolso financeiro'}


            />
        </Switcher></>
    )
}
FinancialDisbursementList.propTypes = {
    workPlan: PropTypes.object
}