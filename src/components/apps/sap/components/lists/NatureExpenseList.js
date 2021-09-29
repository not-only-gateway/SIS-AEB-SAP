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
                <div className={animations.fadeIn}>
                    <NatureExpenseForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                         asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
                </div>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'nature'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/nature_of_expense'}
                    

                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteNatureOfExpense({
                                pk: entity.id,
                                setRefreshed: setRefreshed
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    },
                        {
                            label: 'Baixar dados',
                            icon: <GetAppRounded/>,
                            onClick: (entity) => {
                                HandleDownload(entity, entity.id)
                            },
                            disabled: false
                        }]}
                    fields={[
                        {name: 'gnd', type: 'string'},
                        {name: 'nature_of_expense', type: 'string'},
                        {name: 'description', type: 'string'}
                    ]} labels={['gnd', 'natureza de despesa', 'descrição']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }}  title={'Naturezas de despesa'}
                    
                    fetchSize={15}
                />
            </div>
        </>
    )
}
