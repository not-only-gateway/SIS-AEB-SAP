import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import DecentralizedUnitForm from "../forms/DecentralizedUnitForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";


export default function DecentralizedUnitList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('decentralized_unit'))
    
    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%'}}>

                <DecentralizedUnitForm
                    handleClose={() => {
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
                            deleteEntry({
                                suffix: 'decentralized_unit',
                                pk: entity.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={associativeKeys.decentralizedUnit}
                    clickEvent={() => setOpen(true)}
                    onRowClick={e => {
                        setOpen(true)
                        setCurrentEntity(e)
                    }}
                    title={'Unidades descentralizadas'}

                />
            </Switcher>
    )
}