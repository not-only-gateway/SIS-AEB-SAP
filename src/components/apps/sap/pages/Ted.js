import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import Tabs from "../../../core/navigation/tabs/Tabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import TedForm from "../components/forms/TedForm";
import TedList from "../components/lists/TedList";
import {fetchEntry} from "../utils/requests/fetch";


export default function Ted(props) {
    const [ted, setTed] = useState({})


    useEffect(() => {
        fetchEntry({
            pk: props.query.id,
            suffix: 'ted'
        }).then(res => setTed(res))
    }, [])

    return (
        <>
            <Head>
                <title>{ted?.number}</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Tabs buttons={[
                {
                    label: 'Instrumento de celebração', children: (
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
                                                    <TedList ted={ted}/>
                                                </div>
                                            )
                                        }
                                    ]
                                }]}
                        />
                    )
                },
                {
                    label: 'Planos de trabalho', children: (
                        <div className={shared.contentWrapper}>
                            <WorkPlanList ted={ted}/>
                        </div>
                    )
                }
            ]}>
                <div className={shared.header} style={{paddingLeft: '16px'}}>
                    {ted?.number}
                </div>
            </Tabs>

        </>
    )
}
Ted.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}