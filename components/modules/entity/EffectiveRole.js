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
import EffectiveRoleForm from "../../templates/forms/EffectiveRoleForm";
import submitEffectiveRole from "../../../utils/submit/SubmitEffectiveRole";

export default function EffectiveRole(props) {
    const [role, setRole] = useState({})
    const [modal, setModal] = useState(false)
    const [accepted, setAccepted] = useState(false)
    useEffect(() => {
        if(props.role !== undefined )
            setRole(props.role)

            if (accepted) {
                props.fetch()
                setAccepted(false)
                setModal(false)
            }
    }, [accepted])

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
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
                    <EffectiveRoleForm handleSubmit={submitEffectiveRole}
                                       handleChange={event => handleObjectChange({
                                           event: event,
                                           setData: setRole
                                       })} create={props.create}
                                       setAccepted={setAccepted}
                                       data={role} locale={props.locale}/>
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
                    key={props.create ? 'create-effective-role' : props.role.id}>
                <AddRounded style={{
                    ...{
                        color: 'black',
                        display: !props.create ? 'none' : 'initial'
                    }, ...getIconStyle({dark: false})
                }}/>
                <p className={mainStyles.secondaryParagraph}>
                    {props.create ? 'Create' : props.role.denomination}
                </p>
            </Button>
        </>
    )
}

EffectiveRole.propTypes = {
    role: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool,
    index: PropTypes.number,
    fetch: PropTypes.func
}