import Accordion from "../../layout/Accordion";
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

export default function AccessProfile(props) {
    const [accessProfile, setAccessProfile] = useState({})
    const [modal, setModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [accepted, setAccepted] = useState(false)
    useEffect(() => {
        if (modal && !props.create)
            fetchAccessProfile(props.profile.id).then(res => {
                setAccessProfile(res)
                setLoading(false)
            })
        else
            setLoading(false)
        if (accepted) {
            props.fetch()
            setAccepted(false)
        }
    }, [modal, accepted])


    function renderModal() {
        return (
            <Modal open={modal && !loading && accessProfile !== {} && !accepted} onClose={() => setModal(false)}
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
                                       setAccepted={setAccepted}
                                       data={accessProfile} locale={props.locale}/>
                </div>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}
            <Button className={animations.slideUpAnimation} style={{
                animationDelay: props.index * 200 + 'ms', width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                border: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
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
    fetch: PropTypes.func
}