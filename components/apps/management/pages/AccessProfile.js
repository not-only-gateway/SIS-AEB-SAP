import Tabs from "../../../core/navigation/tabs/Tabs";
import PermissionList from "../components/lists/PermissionList";
import styles from '../styles/Shared.module.css'
import AccessProfileForm from "../components/forms/AccessProfileForm";
import React, {useContext, useEffect, useState} from "react";
import {fetchEntry} from "../utils/fetch";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import ThemeContext from "../../../core/misc/theme/ThemeContext";
import Button from "../../../core/inputs/button/Button";
import {CategoryRounded} from "@material-ui/icons";
import VerticalTabs from "../../../core/navigation/tabs/VerticalTabs";

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
                background: 'var(--background-1)'
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

            <div className={styles.header}
                 style={{padding: '16px 24px'}}>
                {data?.denomination}
                <div className={styles.typeLabel}>
                    <CategoryRounded style={{fontSize: '1.15rem'}}/> Perfil de acesso
                </div>
            </div>
            <VerticalTabs
                classes={[
                    {
                        buttons: [{
                            label: 'Informações',
                            children: (
                                <div className={styles.contentWrapper} style={{paddingTop: '32px'}}>
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
                                <div className={styles.contentWrapper}>
                                    <PermissionList accessProfile={parseInt(props.query.id)}/>
                                </div>
                            )
                        }]
                    }
                ]}/>
        </>
    )
}