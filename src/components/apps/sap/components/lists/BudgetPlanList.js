import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import BudgetPlanForm from "../forms/BudgetPlanForm";
import Host from "../../utils/shared/Host";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import {budget_plan_query} from "../../queries/entities";

export default function BudgetPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(budget_plan_query)
    const ref = useRef()

    return (
        <>
            {!open ? null :

                <BudgetPlanForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List

                    createOption={true}

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
                    fields={[
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