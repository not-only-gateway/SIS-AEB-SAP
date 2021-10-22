import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import { useQuery} from "mfc-core";
import ComponentClassificationForm from "../forms/ComponentClassificationForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";
import List from "../../../../core/list/List";

export default function ComponentClassificationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('classification', undefined))

    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <ComponentClassificationForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}
                    asDefault={true}
                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity}/>
            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'classification',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={associativeKeys.classification}

                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                title={'Componentes'}
            />
        </Switcher>
    )
}