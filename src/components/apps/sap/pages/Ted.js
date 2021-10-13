import React, {useEffect, useState} from 'react'
import Head from "next/head";
import shared from '../styles/Shared.module.css'
import PropTypes from 'prop-types'
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import Tabs from "../../../core/navigation/tabs/Tabs";
import WorkPlanList from "../components/lists/WorkPlanList";
import AddendumList from "../components/lists/AddendumList";
import TedForm from "../components/forms/TedForm";
import ProjectRequests from "../utils/requests/ProjectRequests";
import TedRequests from "../utils/requests/TedRequests";


export default function Ted(props) {
    const [ted, setTed] = useState({})


    useEffect(() => {
        TedRequests.fetchTed(props.id).then(res => {
            if (res !== null)
                setTed(res)
        })
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
                                        {label: 'Dados', children: <TedForm/>}
                                    ]
                                },
                                {
                                    label: 'Informações adicionais',
                                    buttons: [
                                        {label: 'Termos aditivos', children: <AddendumList ted={ted}/>}
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
    routerQuery: PropTypes.object,
    redirect: PropTypes.func
}