import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import ThemeContext from "../../../core/theme/ThemeContext";
import ComponentsList from "../components/lists/ComponentsList";
import {fetchEntry} from "../utils/requests/fetch";
import InfrastructureForm from "../components/forms/InfrastructureForm";


export default function Infrastructure(props) {
    const [infrastructure, setInfrastructure] = useState({})
    const theme = useContext(ThemeContext)
    useEffect(() => {
        fetchEntry({
            pk: props.routerQuery.id,
            suffix: 'infrastructure'
        }).then(res => setInfrastructure(res))
    }, [])

    return (
        <>
            <Head>
                <title>{infrastructure?.name}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <div className={shared.header} style={{padding: '16px', borderBottom: theme.themes.border0 + ' 1px solid'}}>
                {infrastructure.name}
            </div>

            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {label: 'Dados', children: <InfrastructureForm asDefault={true} data={infrastructure}/>}
                        ]
                    },
                    {
                        label: 'Informações adicionais',
                        buttons: [
                            {label: 'Componentes', children: <ComponentsList infrastructure={infrastructure}/>},

                        ]
                    }]}
            />

        </>
    )
}
Infrastructure.propTypes = {
    routerQuery: PropTypes.object,
    redirect: PropTypes.func
}