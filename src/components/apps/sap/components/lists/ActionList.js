import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import Host from "../../utils/shared/Host";
import ActionForm from "../forms/ActionForm";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import {List, useQuery} from "sis-aeb-core";
import {action_query} from "../../queries/workplan";


export default function ActionList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(action_query)
    const ref = useRef()
    return (
        <>

            {!open ? null :
                <>
                    <ActionForm
                        returnToMain={() => {
                            setOpen(false)
                            setRefreshed(false)
                        }}
                         asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}/>
                </>
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'budget'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/action'}


                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteAction({
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
                        {name: 'number', type: 'string', label: 'Nome'},
                        {name: 'detailing', type: 'string', label: 'Tipo'}
                    ]} labels={['número', 'detalhamento']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }}  title={'Ações'}
                    fetchSize={15}

                />
            </div>
        </>
    )
}