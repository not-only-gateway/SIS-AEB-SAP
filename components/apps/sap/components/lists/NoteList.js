import React, {useState} from "react";
import {List, useQuery} from "mfc-core";
import {DeleteRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import NoteForm from "../forms/NoteForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import workPlanKeys from "../../keys/workPlanKeys";

export default function NoteList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('commitment_note',  undefined, [{
        key: 'operation_phase',
        value: props.operation?.id,
        type: 'object'
    }]))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <NoteForm
                    handleClose={() => {
                        hook.clean()
                        setOpen(false)
                    }}

                    create={!currentEntity}
                    operation={props.operation}
                    data={currentEntity}/>
            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={workPlanKeys.note}
                title={'Notas de empenho'}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'commitment_note',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
            />
        </Switcher>
    )


}
NoteList.propTypes = {
    operation: PropTypes.object
}