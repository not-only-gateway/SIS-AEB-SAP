import styles from '../styles/Shared.module.css'
import React, {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import ThemeContext from "../../../core/theme/ThemeContext";
import EndpointForm from "../components/forms/EndpointForm";
import {fetchEntry} from "../utils/fetch";
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import EndpointPrivilegeList from "../components/lists/EndpointPrivilegeList";

export default function Endpoint(props) {
    const [data, setData] = useState(null)
    const themes = useContext(ThemeContext)
    useEffect(() => {
        fetchEntry({suffix: 'endpoint', prefix: 'gateway', pk: props.query.id}).then(r => {
            setData(r)
        })
    }, [])

    return (
        <>
            <div style={{
                padding: '0 calc(10% - 16px)', background: themes.themes.background1
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
            </div>

            <div
                className={styles.header}
                style={{padding: '16px 10%', borderBottom: themes.themes.border0 + ' 1px solid'}}
            >
                {data?.denomination}
            </div>

            <VerticalTabs classes={[
                {
                    buttons: [{
                        label: 'Informações',
                        children: (
                            <div className={styles.contentWrapper} style={{paddingTop: '32px'}}>
                                {data !== null ? <EndpointForm initialData={data} updateData={setData}/> : null}
                            </div>
                        ),
                    },
                        {
                            label: 'Privilégios',
                            children: (
                                <div className={styles.contentWrapper}>
                                    <EndpointPrivilegeList endpoint={props.query.id}/>
                                </div>
                            )
                        }]
                },
            ]}/>
        </>
    )
}

Endpoint.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}