import React, {useRef, useState} from "react";
import Cookies from "universal-cookie/lib";
import {DeleteRounded, GetAppRounded, PublishRounded} from "@material-ui/icons";
import Host from "../../utils/shared/Host";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import DecentralizedUnitForm from "../forms/DecentralizedUnitForm";


export default function DecentralizedUnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()
    const ref = useRef()
    return (
        <>
            {!open ? null :

                <DecentralizedUnitForm
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
                            ProjectRequests.deleteDecentralizedUnit({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    },
                        {
                            label: 'Baixar dados',
                            icon: <GetAppRounded/>,
                            onClick: (entity) => {

                            },
                            disabled: false
                        }]}
                    fields={[
                        {key: 'name', type: 'string', label: 'Nome'},
                        {key: 'responsible', type: 'string', label: 'responsável'}
                    ]}
                    clickEvent={() => setOpen(true)}
                    onRowClick={entity => {
                        setCurrentEntity(entity)
                    }}
                    title={'Unidades descentralizadas'}

                />
            </div>
        </>
    )
}