import mainStyles from "../../../styles/shared/Main.module.css";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {Button, Modal} from "@material-ui/core";
import animations from '../../../styles/shared/Animations.module.css'
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import {AddRounded} from "@material-ui/icons";
import {getIconStyle} from "../../../styles/shared/MainStyles";
import CommissionedRoleForm from "../../templates/forms/CommissionedRoleForm";
import submitCommissionedRole from "../../../utils/submit/SubmitCommissionedRole";
import shared from "../../../styles/shared/Shared.module.css";

export default function CommissionedRole(props) {
    const [role, setRole] = useState({})
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (props.role !== undefined || props.role === role)
            setRole(props.role)

    }, [])

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                   className={animations.fadeIn}>
                <div className={shared.modalContainer} key={props.create ? 'create-commissioned-role' : props.role.id}>
                    <CommissionedRoleForm
                        handleSubmit={submitCommissionedRole}
                        closeModal={() => setModal(false)}
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
                key={props.create ? 'create-commissioned-role' : props.role.id}
            >
                <AddRounded style={{
                    ...{
                        color: 'black',
                        display: !props.create ? 'none' : 'initial'
                    }, ...getIconStyle({dark: false})
                }}/>
                <p className={mainStyles.secondaryParagraph}>
                    {props.create ? 'Create' :
                        <div className={mainStyles.displayInlineStart}>
                            <div style={{display: 'flex'}}>
                                <h5 style={{marginTop: "0", marginBottom: 0, marginRight: '5px'}}>Denomination:</h5>
                                <h5 style={{
                                    color: '#555555',
                                    marginBottom: 0,
                                    marginTop: 0
                                }}>{props.role.denomination}</h5>
                            </div>
                            <div style={{display: 'flex', marginLeft: '25px'}}>
                                <h5 style={{
                                    color: '#555555',
                                    marginBottom: 0,
                                    marginTop: 0
                                }}>{props.role.das ? 'DAS' : 'FCPE'}</h5>
                            </div>
                            <div style={{display: 'flex', marginLeft: '25px'}}>
                                <h5 style={{marginTop: "0", marginBottom: 0, marginRight: '5px'}}>Class:</h5>
                                <h5 style={{
                                    color: '#555555',
                                    marginBottom: 0,
                                    marginTop: 0
                                }}>{props.role.role_class}</h5>
                            </div>

                            <div style={{display: 'flex', marginLeft: '25px'}}>
                                <h5 style={{marginTop: "0", marginBottom: 0, marginRight: '5px'}}>Level:</h5>
                                <h5 style={{
                                    color: '#555555',
                                    marginBottom: 0,
                                    marginTop: 0
                                }}>{props.role.role_level}</h5>
                            </div>
                        </div>
                    }
                </p>
            </button>
        </>
    )
}

CommissionedRole.propTypes = {
    role: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool,
    index: PropTypes.number
}