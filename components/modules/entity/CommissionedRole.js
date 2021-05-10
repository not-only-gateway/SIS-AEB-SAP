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

export default function CommissionedRole(props) {
    const [role, setRole] = useState({})
    const [modal, setModal] = useState(false)
    const [accepted, setAccepted] = useState(false)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        if (props.role !== undefined || props.role === role)
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

                }} key={props.create ? 'create-commissioned-role' : props.role.id}>
                    <CommissionedRoleForm handleSubmit={submitCommissionedRole}
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
            <Button
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                className={animations.slideUpAnimation} style={{
                animationDelay: props.index * 200 + 'ms', width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                border: hovered ? '#0095ff .7px solid' : 'transparent  .7px solid',
                boxShadow: hovered ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                backgroundColor: 'white',
                borderRadius: '8px',
                minHeight: '70px',
                color: '#262626',
                textTransform: 'none',
                opacity: 0
            }} onClick={() => setModal(true)}>
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
            </Button>
        </>
    )
}

CommissionedRole.propTypes = {
    role: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool,
    index: PropTypes.number,
    fetch: PropTypes.func
}