import mainStyles from "../../styles/shared/Main.module.css";
import AccessProfileForm from "../person/forms/AccessProfileForm";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import fetchAccessProfile from "../../utils/fetch/FetchAccessProfile";
import {Modal} from "@material-ui/core";
import animations from '../../styles/shared/Animations.module.css'
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import submitAccessProfile from "../../utils/submit/SubmitAccessProfile";
import {AddRounded} from "@material-ui/icons";
import {getIconStyle} from "../../styles/shared/MainStyles";
import shared from '../../styles/shared/Shared.module.css'

export default function AccessProfile(props) {
    const [accessProfile, setAccessProfile] = useState({})
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [hovered, setHovered] = useState(false)
    useEffect(() => {
        if (modal && !props.create)
            fetchAccessProfile(props.profile.id).then(res => {
                setAccessProfile(res)
                setLoading(false)
            })
        else
            setLoading(false)
    }, [modal])


    function renderModal() {
        return (
            <Modal open={modal && !loading && accessProfile !== {}} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                   className={animations.fadeIn}>
                <div className={shared.modalContainer}>
                    <AccessProfileForm handleSubmit={submitAccessProfile}
                                       closeModal={() => setModal(false)}
                                       handleChange={event => handleObjectChange({
                                           event: event,
                                           setData: setAccessProfile
                                       })} create={props.create}
                                       data={accessProfile} locale={props.locale}/>
                </div>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}

            <button
                className={[shared.rowContainer, animations.slideUpAnimation].join(' ')}
                onClick={() => setModal(true)}
                key={props.create ? 'create-access-profile' : props.profile.id}

            >
                <AddRounded style={{
                    ...{
                        color: 'black',
                        display: !props.create ? 'none' : 'initial'
                    }, ...getIconStyle({dark: false})
                }}/>
                <p className={mainStyles.secondaryParagraph}>
                    {props.create ? 'Create' : props.profile.denomination}
                </p>
            </button>
        </>
    )
}

AccessProfile.propTypes = {
    profile: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool,
}