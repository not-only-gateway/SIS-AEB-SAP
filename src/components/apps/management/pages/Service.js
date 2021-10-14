import Tabs from "../../../core/navigation/tabs/Tabs";
import styles from '../styles/Shared.module.css'
import EndpointList from "../components/lists/EndpointList";
import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {fetchService} from "../utils/fetch";
import ServiceForm from "../components/forms/ServiceForm";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import ThemeContext from "../../../core/theme/ThemeContext";
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";

export default function Service(props) {
    const [data, setData] = useState(null)
    const themes = useContext(ThemeContext)
    useEffect(() => {
        fetchService(props.query.id).then(r => {
            if (r !== null) {
                let host = r.host.split('//')
                console.log(host)
                setData({
                    ...r,
                    host: host[1].split(':')[0],
                    port: host[1].split(':')[1],
                    protocol: host[0]
                })
            }
        })
    }, [])

    return (
        <>
            <div style={{
                padding: '0 calc(10% - 16px)',
                background: themes.themes.background1,
                borderBottom: themes.themes.border0 + ' 1px solid'
            }}>
                <Breadcrumbs divider={'/'} justify={'start'}>
                    <button className={styles.button}
                            onClick={() => props.redirect('/management?page=services', '/management?page=services')}>
                        Serviços
                    </button>
                    <button className={styles.button} disabled={true}>
                        {data?.denomination}
                    </button>
                </Breadcrumbs>
                <div
                    className={styles.header}
                    style={{padding: '10px 0 16px 12px'}}
                >
                    {data?.denomination}
                </div>
            </div>
            <VerticalTabs classes={[
                {
                    buttons: [{
                        label: 'Informações',
                        children: (
                            <div className={styles.contentWrapper} style={{paddingTop: '32px'}}>
                                {data !== null ? <ServiceForm initialData={data} updateData={setData}/> : null}
                            </div>
                        )
                    }]
                },
                {
                    label: 'Relações',
                    buttons: [
                        {
                            label: 'Endpoints',
                            children: (
                                <div className={styles.contentWrapper}>
                                    <EndpointList service={parseInt(props.query.id)}/>
                                </div>
                            )
                        }
                    ]
                }
            ]}>

            </VerticalTabs>
        </>
    )
}

Service.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}