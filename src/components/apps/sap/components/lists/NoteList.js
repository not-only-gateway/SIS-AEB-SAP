import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import NoteForm from "../forms/NoteForm";
import OperationRequests from "../../utils/requests/OperationRequests";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";

export default function NoteList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('note', {
        operation: props.operation.id
    }))
    
    return (
        <Switcher openChild={open ? 0 : 1}>

                    <NoteForm
                        returnToMain={() => {
                            hook.clean()
                            setOpen(false)
                        }}

                        create={currentEntity === undefined || currentEntity === null || currentEntity.id === undefined}
                        operation={props.operation.id}
                        data={currentEntity}/>

                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    hook={hook}
                    keys={associativeKeys.note}
                    title={'Notas de empenho'}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            OperationRequests.deleteNote({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={e => setCurrentEntity(e)}
                    
                />
        </Switcher>
    )


}
NoteList.propTypes = {
    operation: PropTypes.object
}