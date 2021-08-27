import React, {useRef, useState} from "react";
import Host from "../../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import animations from "../../../../styles/Animations.module.css";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import List from "../../../shared/misc/list/List";
import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import NoteForm from "./NoteForm";
import OperationRequests from "../../../../utils/requests/OperationRequests";

export default function NoteList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()
    return (
        <div>
            <input
                accept={'.json'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    let reader = new FileReader();
                    reader.onload = e => {
                        let data = JSON.parse(e.target.result)
                        data.id = undefined

                        OperationRequests.submitNote({
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
                <div className={animations.fadeIn} style={{width: '100%'}}>
                    <NoteForm
                        returnToMain={() => {
                            setRefreshed(false)
                            setOpen(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={currentEntity === undefined || currentEntity === null || currentEntity.id === undefined}
                        operation={props.operation.id}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined, width: '100%'}}>
                <List
                    listKey={'notes'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/note'}
                    triggerRefresh={!refreshed}
                    setRefreshed={setRefreshed}
                    fields={[
                        {name: 'number', type: 'string'},
                        {name: 'value', type: 'number', maskStart: 'R$'}
                    ]}
                    labels={['Número','Valor']}
                    clickEvent={() => null}
                    setEntity={entity => {
                        setOpen(true)
                        setCurrentEntity(entity)
                    }}
                    controlOptions={[
                        {
                            label: 'Baixar selecionados',
                            icon: <GetAppRounded/>,
                            onClick: (d) => {
                                let downloadAnchorNode = document.createElement('a');
                                const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(d))
                                downloadAnchorNode.setAttribute("href", data);
                                downloadAnchorNode.setAttribute("download", `notas - ${new Date().toLocaleDateString()}.json`);
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
                    searchFieldName={'search_input'}
                    title={'Notas de empenho'}
                    scrollableElement={'scrollableDiv'}
                    options={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteNote({
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
                    fetchParams={{
                        operation: props.operation.id
                    }}
                    fetchSize={15}/>
            </div>
        </div>
    )


}
NoteList.propTypes ={
    operation: PropTypes.object
}