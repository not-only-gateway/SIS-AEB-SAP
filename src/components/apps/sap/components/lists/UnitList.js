import React, {useState} from "react";
import {useQuery} from "sis-aeb-core";
import UnitForm from "../forms/UnitForm";
import {DeleteRounded} from "@material-ui/icons";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";
import getQuery from "../../queries/getQuery";
import List from "../../../../core/list/List";
import associativeKeys from "../../keys/associativeKeys";

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
                keys={associativeKeys.responsible}
                onRowClick={e => setCurrentEntity(e)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'unit',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                title={'Unidades / Responsáveis'}
            />
        </Switcher>
    )
}