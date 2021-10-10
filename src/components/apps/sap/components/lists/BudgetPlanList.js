import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import BudgetPlanForm from "../forms/BudgetPlanForm";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import getQuery from "../../queries/entities";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";

export default function BudgetPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('budget_plan'))


    return (
        <Switcher openChild={open ? 0 : 1}>
            <BudgetPlanForm
                returnToMain={() => {
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
                        ProjectRequests.deleteBudgetPlan({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={associativeKeys.budgetPlan}

                onRowClick={entity => {
                    setCurrentEntity(entity)
                }} title={'Planos orçamentários'}

            />
        </Switcher>
    )
}