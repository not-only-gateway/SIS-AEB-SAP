import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";
import InfrastructureComponentDescription from "../forms/InfrastructureComponentDescription";
import submit from "../../utils/submit";

export default function ClassificationInfrastructureList(props) {
    const [open, setOpen] = useState(false)

    const hook = useQuery(getQuery('classification_infrastructure'))
    return (
        <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

            <InfrastructureComponentDescription
                handleClose={() => {
                    setOpen(false)
                    hook.clean()
                }}
                create={true}
                infrastructure={props.infrastructure}
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
                title={'Descrição do componente'}

            />
        </Switcher>
    )
}
ClassificationInfrastructureList.propTypes = {
    infrastructure: PropTypes.object
}