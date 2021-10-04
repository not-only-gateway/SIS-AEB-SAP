import React, {useState} from "react";
import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import TedForm from "../forms/TedForm";
import TedRequests from "../../utils/requests/TedRequests";
import tedKeys from "../../keys/tedKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";

export default function TedList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery()

    return (
        <Switcher openChild={open ? 0 : 1}>
            <TedForm
                returnToMain={() => {
                    setOpen(false)
                    hook.clean()
                }} asEntity={true}
                asDefault={true}
                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity}
            />

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
                keys={tedKeys.ted}
                title={'Instrumentos de celebração'}
            />
        </Switcher>
    )
}
