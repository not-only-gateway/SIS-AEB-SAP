import mainStyles from "../../../styles/shared/Main.module.css";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {Button, Modal} from "@material-ui/core";
import animations from '../../../styles/shared/Animations.module.css'
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import {AddRounded} from "@material-ui/icons";
import {getIconStyle} from "../../../styles/shared/MainStyles";
import EffectiveRoleForm from "../../templates/forms/EffectiveRoleForm";
import submitEffectiveRole from "../../../utils/submit/SubmitEffectiveRole";
import shared from "../../../styles/shared/Shared.module.css";

export default function EffectiveRole(props) {
    const [role, setRole] = useState({})
    const [modal, setModal] = useState(false)
    const [hovered, setHovered] = useState(false)
    useEffect(() => {
        if (props.role !== undefined)
            setRole(props.role)
    }, [])

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
                                       data={role} locale={props.locale}/>
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
            </button>
        </>
    )
}

EffectiveRole.propTypes = {
    role: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool,
    index: PropTypes.number,
}