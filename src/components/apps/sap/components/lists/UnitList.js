import React, {useState} from "react";
import {useQuery} from "sis-aeb-core";
import UnitForm from "../forms/UnitForm";
import {DeleteRounded} from "@material-ui/icons";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import List from "../../../../core/list/List";
import associativeKeys from "../../keys/associativeKeys";

export default function UnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('unit'))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <UnitForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!currentEntity}
                    data={currentEntity}
                />
            </div>
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