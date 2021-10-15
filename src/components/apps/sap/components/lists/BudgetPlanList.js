import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import BudgetPlanForm from "../forms/BudgetPlanForm";
import {List, useQuery} from "sis-aeb-core";
import getQuery from "../../queries/getQuery";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";

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
                        deleteEntry({
                            suffix: 'budget_plan',
                            pk: entity.id
                        }).then(() => hook.clean())
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