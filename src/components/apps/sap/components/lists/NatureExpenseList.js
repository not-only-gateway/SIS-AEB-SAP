import React, {useRef, useState} from "react";
import animations from "../../styles/Animations.module.css";

import {List, useQuery} from "sis-aeb-core";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import NatureExpenseForm from "../forms/NatureExpenseForm";

import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function NatureExpenseList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <>
            {!open ? null :
                <NatureExpenseForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
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
                    fields={[
                        {key: 'gnd', type: 'string', label: 'GND'},
                        {key: 'nature_of_expense', type: 'string', label: 'Natureza de despesa'},
                        {key: 'description', type: 'string', label: 'Descrição'}
                    ]}
                    title={'Naturezas de despesa'}

                />
            </div>
        </>
    )
}
