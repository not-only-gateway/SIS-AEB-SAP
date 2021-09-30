import HeaderTabs from "../../../core/misc/tabs/HeaderTabs";
import styles from "../styles/Services.module.css";
import ServiceList from "../components/lists/ServiceList";
import EndpointList from "../components/lists/EndpointList";
import PermissionList from "../components/lists/PermissionList";
import AccessProfileList from "../components/lists/AccessProfileList";

export default function Permissions(){
    return(
        <HeaderTabs
            header={
                <div className={styles.header}>
                    Permissões e perfis de acesso
                </div>
            }
            buttons={[
                {
                    label: 'Perfis de acesso',
                    children: (
                        <div className={styles.contentWrapper}>
                            <AccessProfileList/>
                        </div>
                    )
                },
                {
                    label: 'Permissões',
                    children: (
                        <div className={styles.contentWrapper}>
                            <PermissionList/>
                        </div>
                    )
                }
            ]}/>
    )
}