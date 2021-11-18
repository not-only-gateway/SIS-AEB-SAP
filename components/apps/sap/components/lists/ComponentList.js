import PropTypes from 'prop-types'
import React, {useState} from "react";
import {AddRounded, CreateRounded, DeleteForeverRounded, LinkRounded, RemoveRounded} from "@material-ui/icons";
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
                    setCurrentComponent(null)
                }}
                asDefault={true}
                onCreationSuccess={(data) => {

                    if (data)
                        submit({
                            suffix: 'classification_infrastructure',
                            data: {
                                'infrastructure': props.infrastructure?.id,
                                'component_classification': data.id
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
                        icon: <AddRounded/>,
                        label: 'Criar novo componente',
                        onClick: () => setOpen(1)
                    },
                    {
                        icon: <LinkRounded/>,
                        label: 'Vincular novo componente',
                        onClick: () => setOpen(0)
                    }

                ]}
                hook={hook}
                keys={associativeKeys.classificationInfrastructure.filter(e => e.key !== 'infrastructure')}
                controlButtons={[{
                    label: 'Remover relação',
                    icon: <RemoveRounded/>,
                    onClick: (entity) => {

                        deleteEntry({
                            suffix: 'classification_infrastructure',
                            customPackage: {
                                component_classification: entity.component_classification.id,
                                infrastructure: entity.infrastructure.id
                            }
                        }).then(() => hook.clean())
                    },
                    disabled: false,
                    color: '#ff5555'
                },
                    {
                        label: 'Deletar componente',
                        icon: <DeleteForeverRounded/>,
                        onClick: (entity) => {

                            deleteEntry({
                                suffix: 'classification',
                                pk: entity.component_classification.id
                            }).then(() => hook.clean())
                        },
                        disabled: false,
                        color: '#ff5555'
                    }
                ]}
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