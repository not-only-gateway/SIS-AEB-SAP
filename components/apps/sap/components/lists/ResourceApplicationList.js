import PropTypes from 'prop-types'
import React, {useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";

import ResourceApplicationForm from "../forms/ResourceApplicationForm";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('resource_application', undefined, [{
        key: 'operation_phase',
        value: props.operation?.id,
        type: 'object'
    }]))


    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <ResourceApplicationForm
                    handleClose={() => {
                        setOpen(false)
                        hook.clean()
                    }}

                    create={!currentEntity}
                    data={currentEntity} operation={props.operation}/>

            <List
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                createOption={true}
                onCreate={() => setOpen(true)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'resource_application',
                            pk: entity.id,
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                hook={hook}
                keys={workPlanKeys.resource}
                title={'Aplicação dos recursos'}

            />
        </Switcher>
    )
}
ResourceApplicationList.propTypes = {
    operation: PropTypes.object
}