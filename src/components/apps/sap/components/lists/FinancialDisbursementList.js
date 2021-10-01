import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import WorkPlanRequests from "../../utils/requests/WorkPlanRequests";
import FinancialDisbursementForm from "../forms/FinancialDisbursementForm";


export default function FinancialDisbursementList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    

    return (

        <div style={{width: '100%'}}>
            {!open ? null :
                <FinancialDisbursementForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} workPlan={props.workPlan}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteFinancial({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={[
                        {key: 'year', type: 'string', label: 'ano'},
                        {key: 'month', type: 'string', label: 'mês'},
                        {key: 'value', type: 'number', label: 'valor', maskStart: 'R$ '},
                    ]}
                    title={'Desembolso financeiro'}

                    {/*fetchParams={{*/}
                    {/*    work_plan: props.workPlan.id*/}
                    {/*}}*/}
                />
            </div>
        </div>
    )
}
FinancialDisbursementList.propTypes =
    {
        workPlan: PropTypes.object
    }