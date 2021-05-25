import Accordion from "../layout/Accordion";
import {Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup} from "@material-ui/core";
import {getSecondaryColor, getTertiaryColor} from "../../styles/shared/MainStyles";
import shared from "../../styles/shared/Shared.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import Cookies from "universal-cookie/lib";
import Selector from "./inputs/Selector";
import mapToSelect from "../../utils/shared/MapToSelect";
import Link from "next/link";
import animations from "../../styles/shared/Animations.module.css";
import {HistoryRounded} from "@material-ui/icons";
import React, {useEffect, useState} from "react";
import {readCollaboration, readProfile} from "../../utils/shared/IndexedDB";
import fetchSettingsData from "../../utils/fetch/FetchSettings";

import PropTypes from "prop-types";
import {setCookiesLanguage} from "../../utils/shared/PageLanguage";
import styles from '../../styles/SettingsActivity.module.css'
import DropDownField from "./inputs/DropDownField";


export default function Settings(props) {
    const [collaborations, setCollaborations] = useState([])
    const [currentCollaboration, setCurrentCollaboration] = useState(null)
    useEffect(() => {
        if (currentCollaboration === null)
            readCollaboration().then(res => {
                if (res !== null)
                    setCurrentCollaboration(res)
            })
        if (collaborations.length === 0)
            readProfile().then(res => {
                if (res !== null)
                    fetchSettingsData(res.id).then(res => setCollaborations(res))
            })

    }, [])

    return (
        <div className={styles.settingsComponentContainer}>

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

            {(new Cookies()).get('jwt') !== undefined && currentCollaboration !== null ?
                <Selector
                    required={false} key={'collaboration-setting'} handleChange={undefined}
                    setChanged={undefined} disabled={false} selected={{
                    key: currentCollaboration.id,
                    value: <div className={mainStyles.displayInlineSpaced}
                                style={{width: '100%', padding: '16px', height: '56px'}}>
                        <p>{currentCollaboration.unitAcronym}</p>
                        <p>{currentCollaboration.roleInformation}</p>
                    </div>
                }}
                    data={mapToSelect({data: collaborations, option: 1})}
                    label={'Collaboration'}
                    width={'31%'}
                />
                :
                null
            }
        </div>
    )
}

Settings.propTypes = {
    redirect: PropTypes.func,
    locale: PropTypes.string,
    lang: PropTypes.object
}