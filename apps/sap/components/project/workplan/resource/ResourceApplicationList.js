import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";

import Cookies from "universal-cookie/lib";

import {CloudUploadRounded, DeleteRounded, GetAppRounded, PublishRounded, RemoveRounded} from "@material-ui/icons";
import OperationRequests from "../../../../utils/requests/OperationRequests";
import List from "../../../shared/misc/list/List";
import Host from "../../../../utils/shared/Host";
import handleObjectChange from "../../../../utils/shared/HandleObjectChange";
import ResourceApplicationForm from "./ResourceApplicationForm";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const ref = useRef()

    return (
        <div style={{width: '100%'}}>
            <input
                accept={'.json'} type={'file'} style={{display: 'none'}}
                ref={ref}
                onChange={(file) => {
                    let reader = new FileReader();
                    reader.onload = e => {
                        let data = JSON.parse(e.target.result)
                        data.id = undefined

                        OperationRequests.submitResource({
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
                <>
                    <ResourceApplicationForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>
                </>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'resource'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/resource_application'}
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
                                downloadAnchorNode.setAttribute("download", `aplicacoes_de_recursos - ${new Date().toLocaleDateString()}.json`);
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
                            OperationRequests.deleteResource({
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
                    fields={[
                        {name: 'nature_of_expense', type: 'object', subfield: 'gnd'},
                        {name: 'nature_of_expense', type: 'object', subfield: 'nature_of_expense'},
                        {name: 'indirect_cost', type: 'bool'},
                        {name: 'value', type: 'number', maskStart: 'R$ '},
                    ]}

                    labels={['GND', 'Natureza de despesa', 'custo indireto', 'valor']}

                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Aplicação dos recursos'}
                    fetchSize={15}
                    fetchParams={{
                        operation: props.operation.id
                    }}
                />
            </div>
        </div>
    )
}
ResourceApplicationList.propTypes = {
    operation: PropTypes.object
}