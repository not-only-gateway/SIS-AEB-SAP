import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import TypeForm from "../forms/TypeForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";

export default function TypeList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('type'))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <TypeForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }} asEntity={true}
                asDefault={true}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity}/>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => setCurrentEntity(e)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        ProjectRequests.deleteType({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={associativeKeys.type}
                title={'Tipos'}
            />
        </Switcher>
    )
}
