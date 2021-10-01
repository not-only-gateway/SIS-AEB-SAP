import React, {useRef, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import BudgetPlanForm from "../forms/BudgetPlanForm";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import {budget_plan_query} from "../../queries/entities";

export default function BudgetPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(budget_plan_query)
    

    return (
        <>
            {!open ? null :

                <BudgetPlanForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List

                    createOption={true}
                    onCreate={() => setOpen(true)}

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteBudgetPlan({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={[
                        {key: 'action', type: 'object', subfield: 'number', label: 'Ação'},
                        {key: 'number', type: 'string', label: 'Número'},
                        {key: 'detailing', type: 'string', extraSize: 50, label: 'Detalhamento'}
                    ]}

                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }} title={'Planos orçamentários'}

                />
            </div>
        </>
    )
}