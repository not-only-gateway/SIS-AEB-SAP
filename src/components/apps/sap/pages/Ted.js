import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import TedForm from "../components/forms/TedForm";
import TedList from "../components/lists/TedList";
import {fetchEntry} from "../utils/requests/fetch";
import ThemeContext from "../../../core/theme/ThemeContext";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import styles from "../../management/styles/Shared.module.css";
import {CategoryRounded} from "@material-ui/icons";


export default function Ted(props) {
    const [ted, setTed] = useState({})


    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'ted'
        }).then(res => setTed(res))
    }, [])
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
    query: PropTypes.object,
    redirect: PropTypes.func
}