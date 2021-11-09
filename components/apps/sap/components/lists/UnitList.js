import React, {useState} from "react";
import {useQuery} from "mfc-core";
import UnitForm from "../forms/UnitForm";
import {DeleteRounded} from "@material-ui/icons";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";
import List from "../../../../core/visualization/list/List";
import associativeKeys from "../../keys/associativeKeys";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('unit'))

    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <UnitForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!currentEntity}
                    data={currentEntity}
                />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                hook={hook}
                keys={associativeKeys.responsible}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
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