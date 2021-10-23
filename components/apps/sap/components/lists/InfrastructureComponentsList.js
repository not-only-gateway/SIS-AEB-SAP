import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "mfc-core";
import InfrastructureComponentForm from "../forms/InfrastructureComponentForm";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/requests/delete";
import getQuery from "../../queries/getQuery";

export default function InfrastructureComponentsList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('component', {
        infrastructure: props.infrastructure.id
    }))
    return (
        <Switcher openChild={open ? 0 : 1}>
            <div style={{paddingTop: '32px'}}>
                <InfrastructureComponentForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                    data={currentEntity} infrastructure={props.infrastructure}
                />
            </div>
            <List
                createOption={true}
                onCreate={() => setOpen(true)}

                hook={hook}
                keys={associativeKeys.components}
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
                title={'Situações Operacionais de Componentes'}

            />
        </Switcher>
    )
}
InfrastructureComponentsList.propTypes = {
    infrastructure: PropTypes.object
}