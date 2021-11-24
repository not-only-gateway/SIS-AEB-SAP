import shared from '../styles/Shared.module.css'
import EndpointList from "../components/lists/EndpointList";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {fetchEntry} from "../utils/fetch";
import ServiceForm from "../components/forms/ServiceForm";
import {CategoryRounded} from "@material-ui/icons";
import {Breadcrumbs, Button, Tab, VerticalTabs} from "mfc-core";

export default function Service(props) {
    const [data, setData] = useState({})
    useEffect(() => {
        fetchEntry({suffix: 'service', prefix: 'gateway', pk: props.query.id}).then(r => {
            if (r !== null) {
                let host = r.host?.split('//')

                setData(r)
            }
        })
    }, [])
    const [open, setOpen] = useState(0)
    return (
        <div className={shared.pageWrapper}>
            <div style={{
                background: 'var(--mfc-background-primary)'
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

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {data?.denomination}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Serviço
                </div>
            </div>
            <div className={shared.pageContent}>
                <VerticalTabs
                    open={open} setOpen={setOpen}
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset'}}
                >
                    <Tab label={'Informações'} className={shared.tabWrapper}>
                        {data !== null ? <ServiceForm initialData={data} updateData={setData}/> : null}
                    </Tab>
                    <Tab label={'Endpoints'} group={'Relações'} className={shared.tabWrapper}>
                        <EndpointList redirect={props.redirect} service={parseInt(props.query.id)}/>
                    </Tab>
                </VerticalTabs>
            </div>
        </div>
    )
}

Service.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}