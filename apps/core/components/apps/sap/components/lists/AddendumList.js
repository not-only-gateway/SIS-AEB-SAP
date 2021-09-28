import PropTypes from 'prop-types'
import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import TedRequests from "../../utils/requests/TedRequests";
import HandleDownload from "../../utils/shared/HandleDownload";
import TedForm from "../forms/TedForm";
import {List, useQuery} from "sis-aeb-core";
import {addendum_query} from "../../queries/ted";

export default function AddendumList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(addendum_query)
    const ref = useRef()

    return (
        <div style={{width: '100%'}}>

            {!open ? null :
                <div className={animations.fadeIn}>
                    <TedForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }} asAddendum={true}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setCurrentEntity
                        })} ted={props.ted}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'project'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/addendum'}
                    fields={[
                        {name: 'number', type: 'string', label: 'Número'},
                        {name: 'responsible', type: 'object', subfield: 'acronym'},
                        {name: 'process', type: 'string', label: 'Processo'}
                    ]}
                    labels={['Número', 'Responsável', 'Processo']}
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
                        if (entity === null || entity === undefined)
                            setCurrentEntity(props.ted)
                        else
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