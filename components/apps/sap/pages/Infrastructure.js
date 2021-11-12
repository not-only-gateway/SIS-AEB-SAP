import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import InfrastructureComponentsList from "../components/lists/InfrastructureComponentsList";
import {fetchEntry} from "../utils/fetchData";
import InfrastructureForm from "../components/forms/InfrastructureForm";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded, HomeRounded, LinkRounded} from "@material-ui/icons";
import Button from "../../../core/inputs/button/Button";
import Tab from "../../../core/navigation/tabs/Tab";
import ProjectForm from "../components/forms/ProjectForm";
import ComponentClassificationList from "../components/lists/ComponentClassificationList";
import ClassificationInfrastructureList from "../components/lists/ClassificationInfrastructureList";


export default function Infrastructure(props) {
    const [infrastructure, setInfrastructure] = useState({})
    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'infrastructure'
        }).then(res => setInfrastructure(res))
    }, [])

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
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset', padding: '8px'}}
                >
                    <Tab label={'Dados'} className={shared.tabWrapper}>
                        <InfrastructureForm asDefault={true} data={infrastructure}/>
                    </Tab>
                    <Tab label={'Componentes'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <ClassificationInfrastructureList infrastructure={infrastructure}/>
                    </Tab>
                    <Tab label={'Situações Operacionais de Componentes'} group={'Informações adicionais'} className={shared.tabWrapper}>
                        <InfrastructureComponentsList infrastructure={infrastructure}/>
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