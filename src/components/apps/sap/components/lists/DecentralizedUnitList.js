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
                <>
                    <DecentralizedUnitForm
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
                    listKey={'decentralized_unit'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/decentralized_unit'}

                    controlOptions={[

                        {
                            label: 'Importar',
                            icon: <PublishRounded/>,
                            onClick: (d) => {
                                ref.current.click()
                            },
                            disabled: false
                        },
                    ]}
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
                        {name: 'name', type: 'string'},
                        {name: 'responsible', type: 'string'}
                    ]} labels={['nome', 'responsável']}
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }} searchFieldName={'search_input'} title={'Unidades descentralizadas'}
                    fetchSize={15}

                />
            </div>
        </>
    )
}