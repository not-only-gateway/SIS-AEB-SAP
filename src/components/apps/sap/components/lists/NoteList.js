import React, {useRef, useState} from "react";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import animations from "../../styles/Animations.module.css";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import NoteForm from "../forms/NoteForm";
import OperationRequests from "../../utils/requests/OperationRequests";

export default function NoteList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <div>

            {!open ? null :
                <div className={animations.fadeIn} style={{width: '100%'}}>
                    <NoteForm
                        returnToMain={() => {
                            setRefreshed(false)
                            setOpen(false)
                        }}

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

                    
                    title={'Notas de empenho'}
                    
                    controlButtons={[{
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
                            HandleDownload(entity, entity.id)
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