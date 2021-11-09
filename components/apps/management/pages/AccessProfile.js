import PermissionList from "../components/lists/PermissionList";
import shared from '../styles/Shared.module.css'
import AccessProfileForm from "../components/forms/AccessProfileForm";
import React, {useEffect, useState} from "react";
import {fetchEntry} from "../utils/fetch";
import {Breadcrumbs, Button, VerticalTabs, Tab} from "mfc-core";
import {CategoryRounded} from "@material-ui/icons";
export default function AccessProfile(props) {
    const [data, setData] = useState({})

    useEffect(() => {
        fetchEntry({suffix: 'access_profile', prefix: 'auth', pk: props.query.id}).then(r => {
            setData(r)
        })
    }, [])

    return (
        <>
            <div style={{
                background: 'var(--mfc-background-primary)'
            }}>
                <Breadcrumbs divider={'/'} justify={'start'}>
                    <Button variant={'minimal'}
                            onClick={() => props.redirect('/management?page=services', '/management?page=services')}>
                        Serviços
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
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Perfil de acesso
                </div>
            </div>
            <VerticalTabs
                classes={[
                    {
                        buttons: [{
                            label: 'Informações',
                            children: (
                                <div className={shared.contentWrapper} style={{paddingTop: '32px'}}>
                                    {Object.keys(data).length > 0 ?
                                        <AccessProfileForm initialData={data} updateData={setData}/> : null}
                                </div>
                            )
                        }]
                    },

                    {
                        label: 'Relações',
                        buttons: [{
                            label: 'Privilégios',
                            children: (
                                <div className={shared.contentWrapper}>
                                    <PermissionList accessProfile={parseInt(props.query.id)}/>
                                </div>
                            )
                        }]
                    }
                ]}>
                <Tab className={shared.tab}>

                </Tab>
            </VerticalTabs>
        </>
    )
}