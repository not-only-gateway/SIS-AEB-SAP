import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import FinancialDisbursementForm from "../forms/FinancialDisbursementForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import {financial_query} from "../../queries/workplan";


export default function FinancialDisbursementList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(financial_query({
        work_plan: props.workPlan.id
    }))
    

    return (

            <Switcher openChild={open ? 0 : 1}>
                <FinancialDisbursementForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} workPlan={props.workPlan}/>

                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteFinancial({
                                pk: entity.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={associativeKeys.financialDisbursement}
                    title={'Desembolso financeiro'}


                />
            </Switcher>
    )
}
FinancialDisbursementList.propTypes =
    {
        workPlan: PropTypes.object
    }