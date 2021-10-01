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

                    createOption={true}
                    fields={[
                        {key: 'name', type: 'string', label: 'nome'},
                        {key: 'acronym', type: 'string', label: 'Acrônimo'},
                        {key: 'parent_unit', type: 'object', subfield: 'acronym', label: 'Unidade pai'},
                    ]}
                    onRowClick={e => setCurrentEntity(e)}
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            ProjectRequests.deleteUnit({
                                pk: entity.id
                            })
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    title={'Unidades / Responsáveis'}
                />
            </div>
        </>
    )
}