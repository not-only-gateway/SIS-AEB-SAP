import {Tab, Tabs} from "mfc-core";
import shared from "../styles/Shared.module.css";
import PermissionList from "../components/lists/PermissionList";
import AccessProfileList from "../components/lists/AccessProfileList";
import PropTypes from 'prop-types'

export default function Permissions(props) {
    return (

        <Tabs className={shared.wrapper}>
            <Tab label={'Perfis de acesso'} className={shared.tabWrapper}>
                <AccessProfileList redirect={props.redirect}/>
            </Tab>
            <Tab label={'Privilégios'} className={shared.tabWrapper}>
                <PermissionList/>
            </Tab>
        </Tabs>

    )
}

Permissions.propTypes = {
    redirect: PropTypes.func
}