import React, {useState} from "react";

import {List, useQuery} from "sis-aeb-core";
import {DeleteRounded} from "@material-ui/icons";
import Infrastructure from "../entities/Infrastructure";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";
import getQuery from "../../queries/getQuery";

export default function InfrastructureList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('infrastructure'))
    
    return (
        <Switcher openChild={open ? 0 : 1}>
                <Infrastructure
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
                    controlButtons={[{
                        label: 'Deletar',
                        icon: <DeleteRounded/>,
                        onClick: (entity) => {
                            deleteEntry({
                                suffix: 'infrastructure',
                                pk: entity.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    onRowClick={e => setCurrentEntity(e)}
                    hook={hook}
                    keys={associativeKeys.infrastructure} labels={['Nome', 'Tipo']}
                    title={'Infraestruturas'}

                />
            </Switcher>
    )
}
