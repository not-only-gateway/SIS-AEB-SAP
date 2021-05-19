import mainStyles from "../../styles/shared/Main.module.css";
import React, {useState} from "react";
import PropTypes from 'prop-types'
import styles from '../../styles/Extensions.module.css'
import ProfilePersona from "../elements/ProfilePersona";
import animations from '../../styles/shared/Animations.module.css'
import {Modal} from "@material-ui/core";
import Button from "./inputs/Button";
import ProfileOverview from "../templates/ProfileOverview";
import Profile from "../templates/Profile";

export default function Extension(props) {
    const currentDate = new Date()
    const [hovered, setHovered] = useState(false)
    const [modal, setModal] = useState(false)
    const [focused, setFocused] = useState(false)

    function renderModal() {
        return (
            <Modal style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}
                   onClose={() => setModal(false)} open={modal}>
                <div className={[styles.extensionModalContainer, animations.fadeIn].join(' ')}>
                    <div style={{padding: '32px', height: '100%', display: 'grid', gap: '32px'}}>
                        <Profile person={props.person} member={props.member}/>
                        <ProfileOverview
                            locale={props.locale}
                            person={props.person} unit={props.unit} member={props.member}
                            commissionedRole={props.commissionedRole}
                            effectiveRole={props.effectiveRole} linkage={props.linkage} senior={props.senior}
                        />
                    </div>
                    <div className={styles.extensionModalFooter}>

                        <Button
                            width={'fit-content'}
                            border={'unset'}
                            variant={'rounded'}
                            content={props.lang.close}
                            handleClick={() => setModal(false)}
                            backgroundColor={'white'}
                            disabled={false}
                            elevation={true}
                            fontColor={'#262626'}
                            padding={'8px 32px 8px 32px'}
                        />
                        {props.editable ? <Button
                            width={'fit-content'}
                            border={'unset'}
                            variant={'rounded'}
                            content={props.lang.edit}
                            handleClick={() => props.redirect(props.member.id)}
                            backgroundColor={'#0095ff'}
                            disabled={false}
                            elevation={true}
                            fontColor={'white'}
                            padding={'8px 32px 8px 32px'}
                        /> : null}
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}
            <button key={props.member.id} onClick={() => setModal(true)}
                    onMouseDown={() => setFocused(true)}
                    onMouseUp={() => setFocused(false)}
                    onMouseLeave={() => {
                        setFocused(false)
                        setHovered(false)
                    }}

                    onMouseEnter={() => setHovered(true)}

                    className={styles.extensionButton}
                    style={{
                        animationDelay: props.index * 200 + 'ms',
                        border: hovered ? '#0095ff .7px solid' : '#ecedf2 .7px solid',
                        boxShadow: hovered && !focused ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'unset'
                    }}>
                <div className={mainStyles.rowContainer} style={{height: 'auto'}}>
                    <div
                        className={[mainStyles.displayInlineStart, mainStyles.overflowEllipsis].join(' ')}
                    >
                        <ProfilePersona dark={false} key={props.member.id}
                                        image={props.person.image} size={'65px'} variant={'rounded'}
                                        elevation={hovered} base64={false}
                                        cakeDay={((new Date(props.person.birth)).getDay() === currentDate.getDay() && (new Date(props.member.birth)).getMonth() === currentDate.getMonth())}/>
                        <h4 className={styles.headerStyle}
                            style={{
                                marginLeft: '5px',
                                fontWeight: 525
                            }}>{props.person.name}</h4>
                    </div>
                    <div className={mainStyles.displayInlineSpaced}>
                        <h5 className={styles.headerStyle}>Email:</h5>
                        <h5 className={styles.secondaryHeaderStyle}>{props.member.corporate_email}</h5>

                    </div>
                    <div className={mainStyles.displayInlineSpaced}>
                        <h5 className={styles.headerStyle}>{props.lang.extension}:</h5>
                        <h5 className={styles.secondaryHeaderStyle}>{props.member.extension}</h5>
                    </div>
                    {props.unit === undefined || props.unit === null ?
                        null
                        :
                        <div className={mainStyles.displayInlineSpaced}>
                            <h5 className={styles.headerStyle}>{props.lang.unit}:</h5>
                            <h5 className={styles.secondaryHeaderStyle}>{props.unit.value}</h5>

                        </div>
                    }

                </div>
            </button>
        </>
    )
}

Extension.propTypes = {
    person: PropTypes.object,
    unit: PropTypes.object,
    member: PropTypes.object,
    senior: PropTypes.object,
    effectiveRole: PropTypes.object,
    commissionedRole: PropTypes.object,
    linkage: PropTypes.object,
    lang: PropTypes.object,
    index: PropTypes.number,
    redirect: PropTypes.func,
    editable: PropTypes.bool,
    locale: PropTypes.string
}
