import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import Host from "../../../utils/shared/Host";
import List from "../../shared/core/list/List";
import ComponentForm from "./ComponentForm";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import WorkPlanRequests from "../../../utils/requests/WorkPlanRequests";
import HandleUpload from "../../../utils/shared/HandleUpload";
import HandleDownload from "../../../utils/shared/HandleDownload";
import ProjectRequests from "../../../utils/requests/ProjectRequests";

export default function ComponentsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const [refreshed, setRefreshed] = useState(false)
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
                                    WorkPlanRequests.submitComponent({
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
                <ComponentForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} infrastructure={props.infrastructure}
                />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/component'}
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
                    fields={[
                        {name: 'classification', type: 'object',subfield: 'classification'},
                        {name: 'classification', type: 'object',subfield: 'type'},
                        {name: 'situation', type: 'string',label: 'situação'}
                    ]}
                    options={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            WorkPlanRequests.deleteComponent({
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
                    labels={['classificação', 'tipo', 'situação']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Componentes'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        infrastructure: props.infrastructure.id
                    }}
                />
            </div>
        </>
    )
}
ComponentsList.propTypes = {
    infrastructure: PropTypes.object
}