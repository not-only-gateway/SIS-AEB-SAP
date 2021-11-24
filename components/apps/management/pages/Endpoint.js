import shared from '../styles/Shared.module.css'
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import EndpointForm from "../components/forms/EndpointForm";
import {fetchEntry} from "../utils/fetch";
import EndpointPrivilegeList from "../components/lists/EndpointPrivilegeList";
import {CategoryRounded} from "@material-ui/icons";
import {Breadcrumbs, Button, Tab, VerticalTabs} from "mfc-core";

export default function Endpoint(props) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetchEntry({suffix: 'endpoint', prefix: 'gateway', pk: props.query.id}).then(r => {
            setData(r)
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
                    <Button variant={'minimal'}
                            onClick={() => props.redirect('/management?page=service&id=' + data.service.id)}>
                        {data?.service?.denomination} (serviço)
                    </Button>
                    <Button variant={'minimal'} disabled={true}>
                        {data.denomination}
                    </Button>
                </Breadcrumbs>

            </div>

            <div className={shared.header}
                 style={{padding: '16px 24px'}}>
                {data?.denomination}
                <div className={shared.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Endpoint
                </div>
            </div>
            <div className={shared.pageContent}>
                <VerticalTabs
                    open={open} setOpen={setOpen}
                    className={shared.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset'}}
                >
                    <Tab label={'Informações'} className={shared.tabWrapper}>
                        {Object.keys(data).length > 0 ?
                            <EndpointForm initialData={data} updateData={setData}/> : null}
                    </Tab>
                    <Tab label={'Privilégios'} group={'Relações'} className={shared.tabWrapper}>
                        <EndpointPrivilegeList endpoint={props.query.id}/>
                    </Tab>
                </VerticalTabs>
            </div>
        </div>
    )
}

Endpoint.propTypes = {
    query: PropTypes.object,
    redirect: PropTypes.func
}