import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import TedForm from "../components/forms/TedForm";
import TedList from "../components/lists/TedList";
import {fetchEntry} from "../utils/requests/fetch";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import {CategoryRounded} from "@material-ui/icons";
import Link from 'next/link'
import Button from "../../../core/inputs/button/Button";
import ProjectTedList from "../components/lists/ProjectTedList";

export default function Ted(props) {
    const [ted, setTed] = useState({})

    useEffect(() => {
        if (ted.id !== undefined)
            props.refresh()
        else
            fetchEntry({
                pk: props.query.id,
                suffix: 'ted'
            }).then(res => setTed(res ? res : {}))
    }, [props.query])


    return (
        <div className={shared.pageWrapper}>
            <Head>
                <title>{ted?.number}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>

            <Breadcrumbs divider={'-'} justify={'start'}>
                <Button
                    variant={'minimal'}
                    onClick={() => props.redirect('/sap?page=index')}>
                    Processos
                </Button>
                {!ted.ted ? null :
                    <Link href={'/sap?page=ted&id=' + ted.ted.id}>
                        <Button
                            variant={'minimal'}
                        >
                            {ted?.ted?.number}
                        </Button>
                    </Link>
                }
                <Button variant={'minimal'} highlight={true}>
                    {ted?.number}
                </Button>
            </Breadcrumbs>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {ted?.number}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Instrumento de celebração
                </div>
            </div>
            <div className={shared.pageContent}>
            <VerticalTabs
                classes={[
                    {
                        buttons: [
                            {
                                label: 'Dados',
                                children: (
                                    <div className={shared.contentWrapper}>
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
                                    <div className={shared.contentWrapper}>
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
                        },

                            {
                                label: 'Projetos / Atividades relacionados', children: (
                                    <div className={shared.contentWrapper}>
                                        <ProjectTedList ted={ted} redirect={props.redirect}/>
                                    </div>
                                )
                            }]
                    }]}
            />
            </div>
        </div>
    )
}
Ted.propTypes = {
    refresh: PropTypes.func,
    query: PropTypes.object,
    redirect: PropTypes.func
}