import Tabs from "../../../core/misc/tabs/Tabs";
import styles from '../styles/Services.module.css'
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";
import React, {useContext, useEffect, useState} from "react";
import {Requester} from "sis-aeb-core";
import PropTypes from "prop-types";
import Host from "../utils/shared/Host";
import {useRouter} from "next/router";
import useCookies from "../../../core/shared/hooks/useCookies";
import {fetchAccess, fetchEndpoint, fetchService} from "../utils/fetch";
import AccessProfileForm from "../components/forms/AccessProfileForm";
import PermissionList from "../components/lists/PermissionList";
import ServiceForm from "../components/forms/ServiceForm";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import ThemeContext from "../../../core/theme/ThemeContext";
import EndpointForm from "../components/forms/EndpointForm";

export default function Endpoint(props) {
    const [data, setData] = useState(null)
    const themes = useContext(ThemeContext)
    useEffect(() => {
        fetchEndpoint(props.query.id).then(r => {
           setData(r)
        })
    }, [])

    return (
        <>
            <div style={{padding: '0 calc(10% - 16px)', background: themes.themes.background1}}>
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
                className={styles.header} style={{background: themes.themes.background1, padding: '16px 10%'}}
            >
                {data?.denomination}
            </div>

            <div className={styles.contentWrapper} style={{paddingTop: '32px'}}>
                {data !== null ? <EndpointForm initialData={data} updateData={setData}/> : null}
            </div>
        </>
    )
}

Endpoint.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}