import styles from '../styles/Shared.module.css'
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import EndpointForm from "../components/forms/EndpointForm";
import {fetchEntry} from "../utils/fetch";
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";
import EndpointPrivilegeList from "../components/lists/EndpointPrivilegeList";
import Button from "../../../core/inputs/button/Button";
import {CategoryRounded} from "@material-ui/icons";

export default function Endpoint(props) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetchEntry({suffix: 'endpoint', prefix: 'gateway', pk: props.query.id}).then(r => {
            setData(r)
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
                    <Button variant={'minimal'}
                            onClick={() => props.redirect('/management?page=service&id=' + data.service.id)}>
                        {data.service?.denomination} (serviço)
                    </Button>
                    <Button variant={'minimal'} disabled={true}>
                        {data.denomination}
                    </Button>
                </Breadcrumbs>

            </div>

            <div className={styles.header}
                 style={{padding: '16px 24px'}}>
                {data?.denomination}
                <div className={styles.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Endpoint
                </div>
            </div>
            <VerticalTabs classes={[
                {
                    buttons: [{
                        label: 'Informações',
                        children: (
                            <div className={styles.contentWrapper} style={{paddingTop: '32px'}}>
                                {Object.keys(data).length > 0 ?
                                    <EndpointForm initialData={data} updateData={setData}/> : null}
                            </div>
                        ),
                    }]
                },
                {
                    label: 'Relações',
                    buttons: [{
                        label: 'Privilégios',
                        children: (
                            <div className={styles.contentWrapper}>
                                <EndpointPrivilegeList endpoint={props.query.id}/>
                            </div>
                        )
                    }]
                }
            ]}/>
        </>
    )
}

Endpoint.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}