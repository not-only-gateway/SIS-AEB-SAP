import mainStyles from "../../../styles/shared/Main.module.css";
import AccessProfileForm from "../../templates/forms/AccessProfileForm";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import fetchAccessProfile from "../../../utils/fetch/FetchAccessProfile";
import {Button, Modal} from "@material-ui/core";
import animations from '../../../styles/shared/Animations.module.css'
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import submitAccessProfile from "../../../utils/submit/SubmitAccessProfile";
import {AddRounded} from "@material-ui/icons";
import {getIconStyle} from "../../../styles/shared/MainStyles";
import Alert from "../../layout/Alert";

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
                <div style={{
                    backgroundColor: 'white',
                    width: '75%',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: 'auto',
                    padding: '16px',
                }}>
                    <AccessProfileForm handleSubmit={submitAccessProfile}
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

            <Button
                className={animations.slideUpAnimation}
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                style={{
                    animationDelay: props.index * 200 + 'ms', width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    backgroundColor: 'white',
                    border: hovered ? '#0095ff .7px solid' : 'transparent  .7px solid',
                    boxShadow: hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                    borderRadius: '8px',
                    minHeight: '70px',
                    color: '#262626',
                    textTransform: 'none',
                    opacity: 0
                }} onClick={() => setModal(true)}
                key={props.create ? 'create-access-profile' : props.profile.id}>
                <AddRounded style={{
                    ...{
                        color: 'black',
                        display: !props.create ? 'none' : 'initial'
                    }, ...getIconStyle({dark: false})
                }}/>
                <p className={mainStyles.secondaryParagraph}>
                    {props.create ? 'Create' : props.profile.denomination}
                </p>
            </Button>
        </>
    )
}

AccessProfile.propTypes = {
    profile: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool,
}