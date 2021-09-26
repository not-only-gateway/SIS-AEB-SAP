import React, {useRef, useState} from "react";
import animations from "../../../styles/Animations.module.css";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import List from "../../shared/core/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import HandleUpload from "../../../utils/shared/HandleUpload";
import HandleDownload from "../../../utils/shared/HandleDownload";
import ProjectRequests from "../../../utils/requests/ProjectRequests";
import TypeForm from "./TypeForm";

export default function TypeList(props) {
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
                                    let data = {...e}
                                    data.id = undefined
                                    ProjectRequests.submitType({
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
                <div className={animations.fadeIn}>
                    <TypeForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} asEntity={true}
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
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/type'}
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
                            ProjectRequests.deleteType({
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
                        {name: 'type', type: 'string'},
                    ]} labels={['tipo']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Tipos'}

                />
            </div>
        </>
    )
}
