import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import UnitForm from "../forms/UnitForm";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('unit'))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <UnitForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }}
                asDefault={true}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity}
            />
            <List

                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={[
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
        </Switcher>
    )
}