import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import InfrastructureComponentsList from "../components/lists/InfrastructureComponentsList";
import {fetchEntry} from "../utils/requests/fetch";
import InfrastructureForm from "../components/forms/InfrastructureForm";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded} from "@material-ui/icons";
import Button from "../../../core/inputs/button/Button";


export default function Infrastructure(props) {
    const [infrastructure, setInfrastructure] = useState({})
    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'infrastructure'
        }).then(res => setInfrastructure(res))
    }, [])

    return (
        <>
            <Head>
                <title>{infrastructure?.name}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>


            <Breadcrumbs divider={'-'} justify={'start'}>
                <Button variant={'minimal'}
                        onClick={() => props.redirect('/sap?page=associative')}>
                    Entidades
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
            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {
                                label: 'Dados',
                                children: (
                                    <div style={{padding: '16px 10%'}}>
                                        <InfrastructureForm asDefault={true} data={infrastructure}/>
                                    </div>
                                )
                            }
                        ]
                    },
                    {
                        label: 'Informações adicionais',
                        buttons: [
                            {
                                label: 'Componentes', children: (
                                    <div style={{padding: '0 10%'}}>
                                        <InfrastructureComponentsList infrastructure={infrastructure}/>
                                    </div>
                                )
                            },

                        ]
                    }]}
            />

        </>
    )
}
Infrastructure.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}