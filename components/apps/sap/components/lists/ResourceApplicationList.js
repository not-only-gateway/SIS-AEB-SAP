import PropTypes from 'prop-types'
import React, {useState} from "react";

import {DeleteRounded} from "@material-ui/icons";
import {
    useCopyToClipboard, useFile,

    Empty,
    request, Alert, ToolTip,

    Selector, Form, FormRow, DateField,
    SelectField, MultiSelectField,
    TextField, Button, Checkbox, CheckboxGroup,
    FileField,

    ThemeContext, MfcWrapper, Ripple,

    ScrollStepper, StepperWrapper,
    Tab, Tabs, VerticalTabs, Modal, Breadcrumbs,
    Carousel, DynamicRoutes, Switcher, RailActionButton,
    RailContext, NavigationRail, Dropdown, RailActionWrapper,

    List,  Feed, FeedCard, Filter,
    useInfiniteScroll, useQuery

} from 'mfc-core'
import ResourceApplicationForm from "../forms/ResourceApplicationForm";
import workPlanKeys from "../../keys/workPlanKeys";
import getQuery from "../../utils/getQuery";
import useList from "../../../../addons/useList";
import ListTemplate from "../../../../addons/ListTemplate";


export default function ResourceApplicationList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('resource_application', undefined, [{
        key: 'operation_phase',
        value: props.operation?.id,
        type: 'object'
    }]))

    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('resource_application', () => hook.clean())

    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

                <ResourceApplicationForm
                    handleClose={() => {
                        setCurrentEntity(null)
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
                            setMessage(`Deseja deletar entidade ${entity.id}?`)
                            setCurrentEl(entity.id)
                            setOpenModal(true)
                        },
                        disabled: false,
                        color: '#ff5555'
                    }]}
                    hook={hook}
                    keys={workPlanKeys.resource}
                    title={'Aplicação dos recursos'}

                />
            </Switcher>
        </>
    )
}
ResourceApplicationList.propTypes = {
    operation: PropTypes.object
}