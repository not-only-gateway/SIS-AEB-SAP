import React, {useState} from "react";
import {List, useQuery} from "mfc-core";
import {DeleteRounded} from "@material-ui/icons";
import TypeForm from "../forms/TypeForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";

export default function TypeList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('type'))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <TypeForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }} asEntity={true}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>
            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'type',
                            pk: entity.id
                        }).then(() => hook.clean())
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
