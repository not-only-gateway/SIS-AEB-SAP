import Cookies from "universal-cookie/lib";
import {Selector} from "sis-aeb-inputs";
import mapToSelect from "../../utils/shared/MapToSelect";
import React, {useEffect, useState} from "react";


import PropTypes from "prop-types";
import styles from '../../styles/SettingsActivity.module.css'
import submitCollaborationChange from "../../utils/submit/SubmitCollaborationChange";
import Alert from "../shared/layout/Alert";

export default function Settings(props) {
    const [collaborations, setCollaborations] = useState([])
    const [currentCollaboration, setCurrentCollaboration] = useState(null)
    const [status, setStatus]= useState({
        type: undefined,
        message: undefined
    })
    useEffect(() => {
        if (currentCollaboration === null) {
            const collaborationSession = sessionStorage.getItem('collaboration')
            if (collaborationSession !== null)
                setCurrentCollaboration(JSON.parse(collaborationSession))
        }

        const profile = sessionStorage.getItem('profile')
        // if(profile !== null) {
        //     fetchActiveCollaborations(JSON.parse(profile).member_id).then(res => {
        //         setCollaborations(res)
        //     })
        // }
    }, [])

    return (
        <div className={styles.settingsComponentContainer}>
            <Alert
                type={status.type} message={status.message}
                handleClose={() => setStatus({
                    type: undefined,
                    message: undefined
                })} render={status.type !== undefined}
            />

            {(new Cookies()).get('jwt') !== undefined ?
                <Selector
                    required={false}
                    handleChange={event => {
                        submitCollaborationChange({collaborationID: event.key, setStatus: setStatus}).then(res => {
                            if (res) {
                                sessionStorage.removeItem('profile')
                                sessionStorage.removeItem('collaboration')
                                sessionStorage.removeItem('accessProfile')

                                window.location.reload()
                            }
                        }
                        )
                    }}
                    setChanged={undefined} disabled={false}
                    selected={{
                        key: currentCollaboration !== null ? currentCollaboration.id : undefined,
                        value: currentCollaboration !== null ? currentCollaboration.tag : undefined
                    }}
                    data={mapToSelect({data: collaborations, option: 4})}
                    label={props.lang.collaboration}
                    width={'100%'}
                />
                :
                null
            }
        </div>
    )
}

Settings.propTypes = {
    redirect: PropTypes.func,

    lang: PropTypes.object
}