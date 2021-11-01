import styles from '../styles/Shared.module.css'
import EndpointList from "../components/lists/EndpointList";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {fetchEntry} from "../utils/fetch";
import ServiceForm from "../components/forms/ServiceForm";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";

import {CategoryRounded} from "@material-ui/icons";
import Button from "../../../core/inputs/button/Button";

export default function Service(props) {
    const [data, setData] = useState(null)
    useEffect(() => {
        fetchEntry({suffix: 'service', prefix: 'gateway', pk: props.query.id}).then(r => {
            if (r !== null) {
                let host = r.host.split('//')
                console.log(host)
                setData(r)
            }
        })
    }, [])

    return (
        <>
            <div style={{
                background: 'var(--background-1)'
            }}>
                <Breadcrumbs divider={'/'} justify={'start'}>
                    <Button variant={'minimal'}
                            onClick={() => props.redirect('/management?page=services', '/management?page=services')}>
                        Serviços
                    </Button>
                    <Button variant={'minimal'} disabled={true}>
                        {data?.denomination}
                    </Button>
                </Breadcrumbs>

            </div>

            <div className={styles.header}
                 style={{padding: '16px 24px'}}>
                {data?.denomination}
                <div className={styles.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Serviço
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
                                    <EndpointList redirect={props.redirect} service={parseInt(props.query.id)}/>
                                </div>
                            )
                        }
                    ]
                }
            ]}/>
        </>
    )
}

Service.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}