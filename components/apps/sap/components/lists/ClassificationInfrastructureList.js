import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";
import InfrastructureClassificationForm from "../forms/InfrastructureClassificationForm";
import submit from "../../utils/submit";

export default function ClassificationInfrastructureList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('classification_infrastructure', undefined, [
        // {
        //     key: 'infrastructure',
        //     value: props.infrastructure?.id,
        //     type: 'object',
        //     // different_from: true
        // }
        ]))
    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

            <InfrastructureClassificationForm
                handleClose={() => {
                    setOpen(false)
                    hook.clean()
                }}

                create={!(currentEntity !== null && currentEntity !== undefined && currentEntity.id !== undefined)}
                data={currentEntity} infrastructure={props.infrastructure}
            />

            <List
                createOption={true}
                onCreate={() => setOpen(true)}

                hook={hook}
                keys={associativeKeys.classificationInfrastructure(props.infrastructure?.id)}
                controlButtons={[{
                    label: 'Deletar',
                    icon: <DeleteRounded/>,
                    onClick: (entity) => {
                        deleteEntry({
                            suffix: 'classification_infrastructure',
                            customPackage: {
                                classification: entity.classification.id,
                                infrastructure: entity.infrastructure.id
                            }
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                }]}
                onRowClick={e => {
                    console.log(e, props.infrastructure)
                    if (e.infrastructure.id !== props.infrastructure.id)
                        submit({
                            suffix: 'classification_infrastructure',
                            // pk: data.id,
                            data: {...e, infrastructure: props.infrastructure.id},
                            create: true
                        }).then(() => {
                            hook.clean()
                        })
                }}
                title={'Componentes'}

            />
        </Switcher>
    )
}
ClassificationInfrastructureList.propTypes = {
    infrastructure: PropTypes.object
}