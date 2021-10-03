import React, {useRef, useState} from "react";

import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import NatureExpenseForm from "../forms/NatureExpenseForm";

import ProjectRequests from "../../utils/requests/ProjectRequests";
import associativeKeys from "../../keys/associativeKeys";

export default function NatureExpenseList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>
            {!open ? null :
                <NatureExpenseForm
                    returnToMain={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteNatureOfExpense({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={e => setCurrentEntity(e)}
                    hook={hook}
                    keys={associativeKeys.natureOfExpense}
                    title={'Naturezas de despesa'}

                />
            </div>
        </>
    )
}
