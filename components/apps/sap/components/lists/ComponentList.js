import PropTypes from 'prop-types'
import React, {useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import useQuery from "../../../../core/visualization/hooks/useQuery";
import List from "../../../../core/visualization/list/List";
import associativeKeys from "../../keys/associativeKeys";
import Switcher from "../../../../core/navigation/switcher/Switcher";
import deleteEntry from "../../utils/delete";
import getQuery from "../../utils/getQuery";
import InfrastructureComponentForm from "../forms/InfrastructureComponentForm";
import submit from "../../utils/submit";
import ComponentForm from "../forms/ComponentForm";

export default function ComponentList(props) {
    const [open, setOpen] = useState(2)
    const [currentComponent, setCurrentComponent] = useState(null)
    const hook = useQuery(getQuery(
        'classification_infrastructure',
        undefined, [{
            key: 'infrastructure',
            type: 'object',
            value: props.infrastructure?.id
        }]))
    return (
        <Switcher openChild={open} styles={{width: '100%', height: '100%'}}>

            <InfrastructureComponentForm
                handleClose={() => {
                    setOpen(2)
                    hook.clean()
                    setCurrentComponent(null)
                }}
                create={true}
                infrastructure={props.infrastructure}
            />
            <ComponentForm
                handleClose={() => {
                    setOpen(2)
                    hook.clean()
                    setCurrentComponent(null)
                }}
                asDefault={true}
                onCreationSuccess={(data) => {
                    if (data)
                        submit({
                            suffix: 'classification_infrastructure',
                            data: {
                                'infrastructure': props.infrastructure?.id,
                                'classification': data.id
                            },
                            create: true
                        }).then(res => {
                            hook.clean()
                        })
                }}
                create={currentComponent === null}
                data={currentComponent}
            />

            <List
                options={[
                    {
                        label: 'Vincular novo componente',
                        onClick: () => setOpen(0)
                    },
                    {
                        label: 'Criar novo componente',
                        onClick: () => setOpen(1)
                    }
                ]}
                hook={hook}
                keys={associativeKeys.classificationInfrastructure.filter(e => e.key !== 'infrastructure')}
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
                    setOpen(1)
                    setCurrentComponent(e)
                }}
                title={'Componentes'}

            />
        </Switcher>
    )
}
ComponentList.propTypes = {
    infrastructure: PropTypes.object
}