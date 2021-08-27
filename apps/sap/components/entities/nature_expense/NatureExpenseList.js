import React, {useRef, useState} from "react";
import animations from "../../../styles/Animations.module.css";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";
import NatureExpenseForm from "./NatureExpenseForm";
import ProjectRequests from "../../../utils/requests/ProjectRequests";

export default function NatureExpenseList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()
    return (
        <>
            <input
                accept={'.json'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    let reader = new FileReader();
                    reader.onload = e => {
                        let data = JSON.parse(e.target.result)
                        data.id = undefined

                        ProjectRequests.submitNatureOfExpense({
                            data: data,
                            create: true
                        }).then(res => {
                            if (res)
                                setRefreshed(false)
                        })
                        ref.current.value = ''

                    };
                    reader.readAsText(file.target.files[0]);
                }}
                multiple={false}
            />
            {!open ? null :
                <div className={animations.fadeIn}>
                    <NatureExpenseForm
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
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'nature'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/nature_of_expense'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                let downloadAnchorNode = document.createElement('a');
                                const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d))
                                downloadAnchorNode.setAttribute("href", data);
                                downloadAnchorNode.setAttribute("download", `naturezas_de_despesa - ${new Date().toLocaleDateString()}.json`);
                                document.body.appendChild(downloadAnchorNode)
                                downloadAnchorNode.click()
                                downloadAnchorNode.remove()
                            }
                        },
                        {
                            label: 'Importar multiplos',
                            icon: <CloudUploadRounded/>,
                            onClick: (d) => {
                            },
                            disabled: true
                        },
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
                            WorkPlanRequests.deleteInfrastructure({
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
                                let downloadAnchorNode = document.createElement('a');
                                const data =  "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entity))
                                downloadAnchorNode.setAttribute("href", data);
                                downloadAnchorNode.setAttribute("download", `${entity.id}.json`);
                                document.body.appendChild(downloadAnchorNode)
                                downloadAnchorNode.click()
                                downloadAnchorNode.remove()
                            },
                            disabled: false
                        }]}
                    fields={[
                        {name: 'gnd', type: 'string'},
                        {name: 'nature_of_expense', type: 'string'},
                        {name: 'description', type: 'string'}
                    ]} labels={['gnd', 'natureza de despesa', 'descrição']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Naturezas de despesa'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                />
            </div>
        </>
    )
}
