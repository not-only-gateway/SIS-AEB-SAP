import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import BudgetPlanForm from "./BudgetPlanForm";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Host from "../../../utils/shared/Host";
import List from "../../shared/core/list/List";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import HandleDownload from "../../../utils/shared/HandleDownload";
import HandleUpload from "../../../utils/shared/HandleUpload";

export default function BudgetPlanList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()

    return (
        <>
            <input
                type={'file'} style={{display: 'none'}}
                ref={ref} accept={'.json'}
                onChange={(file) => {
                    HandleUpload(file.target.files[0]).then(res => {
                        if(res !== null){
                            if(Array.isArray(res)){
                                res.forEach(e => {
                                    ProjectRequests.submitBudgetPlan({
                                        data: e,
                                        create: true
                                    })
                                })
                            }
                            else{
                                res.id = undefined
                                setCurrentEntity(res)
                                setOpen(true)
                            }
                        }
                    })
                    ref.current.value = ''
                }}

            />
            {!open ? null :
                <>
                    <BudgetPlanForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
                </>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'budget'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/budget_plan'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
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
                    options={[{
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
                    }} searchFieldName={'search_input'} title={'Planos orçamentários'}
                    scrollableElement={'scrollableDiv'}
                    fetchSize={15}

                />
            </div>
        </>
    )
}