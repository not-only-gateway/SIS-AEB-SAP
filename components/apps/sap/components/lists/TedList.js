import React, {useMemo, useState} from "react";
import {DeleteRounded} from "@material-ui/icons";
import TedForm from "../forms/TedForm";
import tedKeys from "../../keys/tedKeys";
import PropTypes from "prop-types";
import getQuery from "../../utils/getQuery";

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

import useList from "../../templates/useList";
import ListTemplate from "../../templates/ListTemplate";


export default function TedList(props) {

    const [open, setOpen] = useState(false)
    const query = useMemo(() => {
        return getQuery('ted', props.ted ? {addendum_ted: props.ted.id} : {})
    }, [])
    const hook = useQuery(query)
    const addendumData = useMemo(() => {
        if (props.copyFrom) {
            let value = {...props.copyFrom}
            delete value.id

            return value
        } else return undefined
    }, [props.ted])

    const {
        message,
        setMessage,
        openModal,
        setOpenModal,
        onDecline,
        setCurrentEl,
        onAccept
    } = useList('ted', () => hook.clean())


    return (
        <>
            <ListTemplate open={openModal} onAccept={onAccept} onDecline={onDecline} message={message}/>
            <Switcher openChild={open ? 0 : 1} styles={{width: '100%', height: '100%'}}>

            <TedForm
                handleClose={() => {
                    setOpen(false)
                    hook.clean()

                }} asEntity={true}
                ted={props.ted}
                data={addendumData}
                asDefault={true}
                create={true}
            />

            <List
                createOption={props.ted}
                onCreate={() => setOpen(true)}
                onRowClick={e => props.redirect(`/sap?page=ted&id=${e.id}`)}
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
                keys={tedKeys.ted}
                title={props.ted ? 'Instrumentos de celebração (aditivos)' : 'Instrumentos de celebração'}
            />
        </Switcher></>
    )
}

TedList.propTypes = {
    redirect: PropTypes.func,
    ted: PropTypes.object,
    copyFrom: PropTypes.object
}
