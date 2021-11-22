import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import SOCForm from "../forms/SOCForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";

export default function SOCList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('component', {
        infrastructure: props.infrastructure.id
    }))
    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <SOCForm
                    handleClose={() => {
                        setCurrentEntity(null)
                        setOpen(false)
                        hook.clean()
                    }}

                    create={currentEntity === null}
                    data={currentEntity} infrastructure={props.infrastructure}
                />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}

                hook={hook}
                keys={associativeKeys.classificationInfrastructure}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'component',
                            pk: entity.id
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                title={'Situação Operacional de Componentes'}

            />
        </Switcher>
    )
}
SOCList.propTypes = {
    infrastructure: PropTypes.object
}