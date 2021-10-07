import Tabs from "../../../core/misc/tabs/Tabs";
import styles from "../styles/Services.module.css";
import PermissionList from "../components/lists/PermissionList";
import AccessProfileList from "../components/lists/AccessProfileList";
import PropTypes from 'prop-types'

export default function Permissions(props){
    return(
        <Tabs
            buttons={[
                {
                    label: 'Perfis de acesso',
                    children: (
                        <div className={styles.contentWrapper}>
                            <AccessProfileList redirect={props.redirect}/>
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
            ]}>
            <div className={styles.header}>
                Permissões e perfis de acesso
            </div>
        </Tabs>
    )
}

Permissions.propTypes={
    redirect: PropTypes.func
}