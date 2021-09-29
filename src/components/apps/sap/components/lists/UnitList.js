import React, {useState} from "react";
import Cookies from "universal-cookie/lib";

import Host from "../../utils/shared/Host";
import {List, useQuery} from "sis-aeb-core";
import UnitForm from "../forms/UnitForm";
import {DeleteRounded, GetAppRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()

    return (
        <>

            {!open ? null :
                <UnitForm
                    returnToMain={() => {
                        setOpen(false)
                        setRefreshed(false)
                    }}
                     asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}
                />
            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'unit'}
                    createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/unit'}
                    
                    fields={[
                        {name: 'name', type: 'string'},
                        {name: 'acronym', type: 'string'},
                        {name: 'parent_unit', type: 'object', subfield: 'acronym', fallback: 'Nenhuma'},
                    ]} labels={['nome', 'Acrônimo', 'Unidade pai']}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteUnit({
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
                    clickEvent={() => setOpen(true)}
                    setEntity={entity => {
                        setCurrentEntity(entity)
                    }}  title={'Unidades / Responsáveis'}
                    fetchSize={15}
                />
            </div>
        </>
    )
}