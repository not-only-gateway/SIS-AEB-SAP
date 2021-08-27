import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import animations from "../../../../styles/Animations.module.css";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import Cookies from "universal-cookie/lib";
import Host from "../../../../utils/shared/Host";

import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import AddendumForm from "./AddendumForm";
import TedRequests from "../../../../utils/requests/TedRequests";
import ProjectRequests from "../../../../utils/requests/ProjectRequests";
import HandleUpload from "../../../../utils/shared/HandleUpload";
import HandleDownload from "../../../../utils/shared/HandleDownload";

export default function AddendumList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()
    return (
        <div style={{width: '100%'}}>
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
                    <AddendumForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} ted={props.ted}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} project={props.project}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/addendum'}
                    fields={[
                        {name: 'number', type: 'string'},
                        {name: 'global_value', type: 'number', maskStart: 'R$ '},
                    ]}
                    labels={['Número', 'valor global']}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                HandleDownload(d,  `termo_aditivo - ${new Date().toLocaleDateString()}`)
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
                    clickEvent={() => setOpen(true)}
                    options={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            TedRequests.deleteAddendum({
                                pk: entity.id,

                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }, {
                        label: 'Baixar dados',
                        icon: <GetAppRounded/>,
                        onClick: (entity) => {
                            HandleDownload(entity, entity.id)
                        },
                        disabled: false
                    }]}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Termos aditivos'} scrollableElement={'scrollableDiv'}
                    fetchSize={15}
                    fetchParams={{
                        ted: props.ted.id
                    }}
                    />
            </div>
        </div>
    )
}
AddendumList.propTypes = {
    ted: PropTypes.object
}