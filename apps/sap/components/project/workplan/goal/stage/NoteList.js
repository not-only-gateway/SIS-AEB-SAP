import React, {useState} from "react";
import Host from "../../../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import animations from "../../../../../styles/Animations.module.css";
import handleObjectChange from "../../../../../utils/shared/HandleObjectChange";
import List from "../../../../shared/misc/list/List";
import {RemoveRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import NoteForm from "./NoteForm";
import Alert from "../../../../shared/misc/alert/Alert";
import OperationRequests from "../../../../../utils/fetch/OperationRequests";

export default function NoteList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const [refreshed, setRefreshed] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    return (
        <div>
            <Alert
                type={status.type} render={status.type !== undefined}
                handleClose={() => setStatus({type: undefined, message: undefined})}
                message={status.message}
            />
            {!open ? null :
                <div className={animations.fadeIn} style={{width: '100%'}}>
                    <NoteForm
                        returnToMain={() => {
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

                    searchFieldName={'search_input'}
                    title={'Notas de empenho'}
                    scrollableElement={'scrollableDiv'}
                    options={[{
                        label: 'Deletar',
                        icon: <RemoveRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteNote({
                                pk: entity.id,
                                setStatus: setStatus,
                                setRefreshed: setRefreshed
                            })
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