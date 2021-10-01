import React, {useRef, useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import TedForm from "../forms/TedForm";
import TedRequests from "../../utils/requests/TedRequests";

export default function TedList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    
    return (
        <>

            {!open ? null :

                    <TedForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }} asEntity={true}
                         asDefault={true}
                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity}
                    />

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    createOption={true}
                    onCreate={() => setOpen(true)}
                    onRowClick={e => setCurrentEntity(e)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            TedRequests.deleteTed({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={[
                        {key: 'number', type: 'string', label: 'Número'},
                        {key: 'responsible', type: 'object', subfield: 'acronym', label: 'Responsável'},
                        {key: 'process', type: 'string', label: 'Processo'}
                    ]}
                    title={'Instrumentos de celebração'}
                />
            </div>
        </>
    )
}
