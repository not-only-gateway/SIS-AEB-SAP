import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";
import ProjectRequests from "../../utils/requests/ProjectRequests";
import ClassificationForm from "../forms/ClassificationForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import getQuery from "../../queries/getQuery";

export default function ClassificationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('classification'))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <ClassificationForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }}
                asDefault={true}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity}/>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        ProjectRequests.deleteClassification({
                            pk: entity.id
                        })
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={associativeKeys.classification}

                onRowClick={entity => {
                    setCurrentEntity(entity)
                }}
                title={'Componentes'}
            />
        </Switcher>
    )
}