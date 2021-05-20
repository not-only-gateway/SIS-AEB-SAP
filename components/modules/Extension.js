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
                            border={'#ecedf2 .7px solid'}
                            variant={'rounded'}
                            content={props.lang.close}
                            handleClick={() => setModal(false)}
                            backgroundColor={'white'}
                            hoverHighlight={true}
                            colorVariant={'secondary'}
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
                            hoverHighlight={false}
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
                    }}

                    className={[styles.extensionButton, animations.popInAnimation].join(' ')}
                    style={{boxShadow: focused ? '0 0 1px 1px #ecedf2' : undefined}}
            >
                <>

                    <ProfilePersona
                        dark={false} key={props.member.id}
                        image={props.person.image} size={'110px'} variant={'circular'}
                        elevation={true} base64={false}
                        cakeDay={
                            ((new Date(props.person.birth)).getDay() === currentDate.getDay() &&
                                (new Date(props.member.birth)).getMonth() === currentDate.getMonth())
                        }/>

                    <div style={{width: '100%', marginTop: '15%'}}>
                    <h3 className={[mainStyles.overflowEllipsis].join(' ')}
                        style={{

                            fontWeight: 525
                        }}>{props.person.name}</h3>


                    <h5>{props.member.corporate_email}</h5>

                    <h5 className={styles.headerStyle}>{props.member.extension}</h5>
                    </div>
                    {/*<div className={mainStyles.displayInlineSpaced}>*/}
                    {/*
                    {/*    <h5 className={styles.secondaryHeaderStyle}></h5>*/}
                    {/*</div>*/}
                    {/*{props.unit === undefined || props.unit === null ?*/}
                    {/*    null*/}
                    {/*    :*/}
                    {/*    <div className={mainStyles.displayInlineSpaced}>*/}
                    {/*        <h5 className={styles.headerStyle}>{props.lang.unit}:</h5>*/}
                    {/*        <h5 className={styles.secondaryHeaderStyle}>{props.unit.value}</h5>*/}

                    {/*    </div>*/}
                    {/*}*/}

                </>
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
