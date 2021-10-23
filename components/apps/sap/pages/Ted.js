import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import TedForm from "../components/forms/TedForm";
import TedList from "../components/lists/TedList";
import {fetchEntry} from "../utils/requests/fetch";
import ThemeContext from "../../../core/misc/theme/ThemeContext";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import styles from "../../management/styles/Shared.module.css";
import {CategoryRounded} from "@material-ui/icons";
import Link from 'next/link'

export default function Ted(props) {
    const [ted, setTed] = useState({})

    useEffect(() => {
        if (ted.id !== undefined)
            props.refresh()
        else
            fetchEntry({
                pk: props.query.id,
                suffix: 'ted'
            }).then(res => setTed(res))
    }, [props.query])

    const themes = useContext(ThemeContext)

    return (
        <>
            <Head>
                <title>{ted?.number}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <div style={{
                padding: '0 32px', background: themes.themes.background1
            }}>
                <Breadcrumbs divider={'-'} justify={'start'}>
                    <button className={styles.button}
                            onClick={() => props.redirect('/sap?page=index')}>
                        Processos
                    </button>
                    {!ted.ted ? null :
                        <Link href={'/sap?page=ted&id=' + ted.ted.id}>
                            <button className={styles.button}>
                                {ted?.ted?.number}
                            </button>
                        </Link>
                    }

                    <button className={styles.button} disabled={true}>
                        {ted?.number}
                    </button>
                </Breadcrumbs>
            </div>
            <div className={shared.header}
                 style={{padding: '16px 48px', borderBottom: themes.themes.border0 + ' 1px solid'}}>
                {ted?.number}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Instrumento de celebração
                </div>
            </div>
            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {
                                label: 'Dados', children:
                                    (
                                        <div style={{padding: '16px 10%'}}>
                                            <TedForm data={ted}/>
                                        </div>
                                    )
                            }
                        ]
                    },
                    {
                        label: 'Informações adicionais',
                        buttons: [
                            {
                                label: 'Termos aditivos', children: (
                                    <div style={{padding: '16px 10%'}}>
                                        <TedList ted={ted} redirect={props.redirect}/>
                                    </div>
                                )
                            }
                        ]
                    },
                    {
                        label: 'Acesso rápido',
                        buttons: [{
                            label: 'Planos de trabalho', children: (
                                <div className={shared.contentWrapper}>
                                    <WorkPlanList ted={ted} redirect={props.redirect}/>
                                </div>
                            )
                        }]
                    }]}
            />


        </>
    )
}
Ted.propTypes = {
    refresh: PropTypes.func,
    query: PropTypes.object,
    redirect: PropTypes.func
}