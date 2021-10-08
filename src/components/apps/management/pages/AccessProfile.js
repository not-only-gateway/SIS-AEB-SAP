import Tabs from "../../../core/misc/tabs/Tabs";
import PermissionList from "../components/lists/PermissionList";
import styles from '../styles/Services.module.css'
import AccessProfileForm from "../components/forms/AccessProfileForm";
import React, {useContext, useEffect, useState} from "react";
import {fetchAccess} from "../utils/fetch";
import Breadcrumbs from "../../../core/navigation/breadcrumbs/Breadcrumbs";
import ThemeContext from "../../../core/theme/ThemeContext";

export default function AccessProfile(props) {
    const [data, setData] = useState(null)
    const themes = useContext(ThemeContext)
    useEffect(() => {
        fetchAccess(props.query.id).then(r => setData(r))
    }, [])

    return (
        <>
            <div style={{padding: '0 calc(10% - 16px)', background: themes.themes.background1}}>
                <Breadcrumbs divider={'/'} justify={'start'}>
                    <button className={styles.button}
                            onClick={() => props.redirect('/management?page=permissions', '/management?page=permissions')}>
                        Perfis de acesso
                    </button>
                    <button className={styles.button} disabled={true}>
                        {data?.denomination}
                    </button>
                </Breadcrumbs>
            </div>
            <Tabs buttons={[
                {
                    label: 'Informações',
                    children: (
                        <div className={styles.contentWrapper} style={{paddingTop: '32px'}}>
                            {data !== null ? <AccessProfileForm initialData={data} updateData={setData}/> : null}
                        </div>
                    )
                },
                {
                    label: 'Privilégios',
                    children: (
                        <div className={styles.contentWrapper}>
                            <PermissionList accessProfile={parseInt(props.query.id)}/>
                        </div>
                    )
                }
            ]}>
                <div
                    className={styles.header}
                >
                    {data?.denomination}
                </div>
            </Tabs>
        </>
    )
}