import PropTypes from 'prop-types'
import React, {useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import {List, useQuery} from "sis-aeb-core";
import ResourceApplicationForm from "../forms/ResourceApplicationForm";
import workPlanKeys from "../../keys/workPlanKeys";
import Switcher from "../../../../core/misc/switcher/Switcher";
import deleteEntry from "../../../management/utils/delete";
import getQuery from "../../queries/getQuery";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('resource_application',{
        operation: props.operation.id
    }))
    

    return (
        <Switcher openChild={open ? 0 : 1}>
                    <ResourceApplicationForm
                        returnToMain={() => {
                            setOpen(false)
                            hook.clean()
                        }}

                        create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                        data={currentEntity} operation={props.operation}/>

                <List
                    onRowClick={e => setCurrentEntity(e)}
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