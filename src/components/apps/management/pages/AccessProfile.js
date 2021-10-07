import Tabs from "../../../core/misc/tabs/Tabs";
import PermissionList from "../components/lists/PermissionList";
import styles from '../styles/Services.module.css'
import AccessProfileForm from "../components/forms/AccessProfileForm";
import {useEffect, useState} from "react";
import {fetchAccess} from "../utils/fetch";

export default function AccessProfile(props) {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetchAccess(props.query.id).then(r => setData(r))
    }, [])

    return (
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
                {'cafe'}
            </div>
        </Tabs>
    )
}