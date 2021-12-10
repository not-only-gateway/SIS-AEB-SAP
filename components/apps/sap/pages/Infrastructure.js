import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import SOCList from "../components/lists/SOCList";
import {fetchEntry} from "../utils/fetchData";
import InfrastructureForm from "../components/forms/InfrastructureForm";
import {CategoryRounded, LinkRounded} from "@material-ui/icons";
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
import InfrastructureComponentDescriptionList from "../components/lists/ComponentList";


export default function Infrastructure(props) {
    const [infrastructure, setInfrastructure] = useState({})
    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'infrastructure'
        }).then(res => setInfrastructure(res))
    }, [])

    const [open, setOpen] = useState(0)

    useEffect(() => {
        const t = props.query.tab
        setOpen(t !== undefined && !isNaN(parseInt(t)) ? parseInt(t) : 0)
    }, [props.query])

    return (
        <div className={shared.pageWrapper}>
            <Head>
                <title>{infrastructure?.name}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>


            <Breadcrumbs divider={'-'} justify={'start'}>
                <Button variant={"minimal-horizontal"}
                        onClick={() => props.redirect('/sap?page=associative')}
                        styles={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <LinkRounded style={{fontSize: '1.1rem'}}/> Entidades associativas
                </Button>
                <Button variant={'minimal'} disabled={true}>
                    {infrastructure?.name}
                </Button>
            </Breadcrumbs>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {infrastructure?.name}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Infraestrutura
                </div>
            </div>
            <div className={shared.pageContent}>
                <VerticalTabs
                    open={open}
                    setOpen={index => {
                        const url = {pathname: props.pathname, query: {...props.query, tab: index}}
                        props.redirect(url, url, {shallow: true})
                    }}
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset', padding: '8px'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <InfrastructureForm asDefault={true} data={infrastructure}/>
                    </Tab>
                    <Tab label={'Componente'} group={'Informações adicionais'} className={shared.tabWrapper}
                         styles={{padding: '0 10%'}}>
                        <InfrastructureComponentDescriptionList infrastructure={infrastructure}/>
                    </Tab>
                    <Tab label={'Situação Operacional de Componentes'} group={'Informações adicionais'}
                         className={shared.tabWrapper} styles={{padding: '0 10%'}}>
                        <SOCList infrastructure={infrastructure}/>
                    </Tab>


                </VerticalTabs>
            </div>
        </div>
    )
}
Infrastructure.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}