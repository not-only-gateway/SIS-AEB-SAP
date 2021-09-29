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
                <>
                    <BudgetPlanForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                         asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
                </>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'budget'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/budget_plan'}

                    controlOptions={[

                        {
                            label: 'Importar',
                            icon: <PublishRounded/>,
                            onClick: (d) => {
                                ref.current.click()
                            },
                            disabled: false
                        },
                    ]}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteBudgetPlan({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    },
                        {
                            label: 'Baixar dados',
                            icon: <GetAppRounded/>,
                            onClick: (entity) => {
                                HandleDownload(entity, entity.id)
                            },
                            disabled: false
                        }]}
                    fields={[
                        {name: 'action', type: 'object', subfield: 'number'},
                        {name: 'number', type: 'string'},
                        {name: 'detailing', type: 'string', extraSize: 50}
                    ]} labels={['ação', 'número', 'detalhamento']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }}  title={'Planos orçamentários'}
                    
                    fetchSize={15}

                />
            </div>
        </>
    )
}