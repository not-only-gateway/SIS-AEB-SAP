import React, {useRef, useState} from "react";
import animations from "../../../styles/Animations.module.css";
import List from "../../shared/core/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import Infrastructure from "./Infrastructure";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import HandleUpload from "../../../utils/shared/HandleUpload";
import HandleDownload from "../../../utils/shared/HandleDownload";

export default function InfrastructureList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()
    return (
        <>
            <input
                accept={'.sap'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    HandleUpload(file.target.files[0]).then(res => {
                        if(res !== null){
                            res.id = undefined
                            setCurrentEntity(res)
                            setOpen(true)
                        }
                    })
                    ref.current.value = ''
                }}
                multiple={false}
            />
            {!open ? null :
                <div className={animations.fadeIn}>
                    <Infrastructure
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}
                    />
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/infrastructure'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                HandleDownload(d,  `infraestruturas - ${new Date().toLocaleDateString()}`)
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
                                HandleDownload(entity, entity.id)
                            },
                            disabled: false
                        }]}
                    fields={[
                        {name: 'name', type: 'string',label: 'Nome'},
                        {name: 'type', type: 'string',label: 'Tipo'}
                    ]} labels={['Nome', 'Tipo']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Infraestruturas'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
          />
            </div>
        </>
    )
}
