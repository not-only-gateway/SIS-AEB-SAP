import React, {useState} from "react";

import PropTypes from "prop-types";
import {setCookiesLanguage} from "../../utils/shared/PageLanguage";
import styles from '../../styles/SettingsActivity.module.css'
import DropDownField from "./inputs/DropDownField";
import Alert from "../layout/Alert";


export default function Settings(props) {

    const [status, setStatus]= useState({
        type: undefined,
        message: undefined
    })

    return (
        <div className={styles.settingsComponentContainer}>
            <Alert
                type={status.type} message={status.message}
                handleClose={() => setStatus({
                    type: undefined,
                    message: undefined
                })} render={status.type !== undefined}
            />
            <DropDownField
                dark={false}
                placeholder={props.lang.language}
                label={props.lang.language}
                handleChange={event => {
                    setCookiesLanguage(event)
                    props.redirect({url: '/settings', locale: event})
                }}
                locale={props.locale}
                value={props.locale}
                required={false}
                width={'100%'} choices={[
                {value: 'Português', key: 'pt'},
                {value: 'English', key: 'en'}
            ]}/>
        </div>
    )
}

Settings.propTypes = {
    redirect: PropTypes.func,
    locale: PropTypes.string,
    lang: PropTypes.object
}