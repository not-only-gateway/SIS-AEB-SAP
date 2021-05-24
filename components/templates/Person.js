import mainStyles from "../../styles/shared/Main.module.css";
import React, {useState} from "react";
import PropTypes from 'prop-types'

import animations from '../../styles/shared/Animations.module.css'
import {Modal} from "@material-ui/core";
import ProfileOverview from "../templates/ProfileOverview";
import Profile from "../templates/Profile";
import shared from '../../styles/shared/Shared.module.css'
import Link from "next/link";
import ProfilePersona from "../elements/ProfilePersona";
import {ExtensionRounded} from "@material-ui/icons";
import Button from "../modules/inputs/Button";


export default function Person(props) {

    const [modal, setModal] = useState(false)


    function renderModal() {
        return (
            <Modal style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}
                   onClose={() => setModal(false)} open={modal}>
                <div className={[shared.modalContainer, animations.fadeIn].join(' ')}>
                    <div style={{padding: '32px', height: '100%', display: 'grid', gap: '32px'}}>
                        <Profile person={props.person.person} member={props.person.member}/>
                        {/*<ProfileOverview*/}
                        {/*    locale={props.locale}*/}
                        {/*    person={props.person} unit={props.unit} member={props.member}*/}
                        {/*    commissionedRole={props.commissionedRole}*/}
                        {/*    effectiveRole={props.effectiveRole} linkage={props.linkage} senior={props.senior}*/}
                        {/*/>*/}
                    </div>
                    <div className={shared.modalFooter}>
                        <Button
                            width={'fit-content'}
                            border={'#ecedf2 .7px solid'}
                            variant={'rounded'}
                            content={props.close}
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
                            content={props.edit}
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

            <button onClick={() => setModal(true)}
                    style={{border: 'none', outline: 'none', boxShadow: 'none', backgroundColor: 'transparent'}}>
                <div key={props.person.person.id} className={shared.rowContainer} style={{gap: '16px'}}>
                    <ProfilePersona variant={'circular'} elevation={false} image={props.person.person.image}
                                    base64={false} size={'45px'} absoluteContent={null}/>
                    {props.person.person.name}
                    <div style={{
                        marginLeft: 'auto',
                        color: '#555555',
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'center'
                    }}>
                        {props.person.member !== null ? <ExtensionRounded/> : null}
                        {props.person.member !== null ? props.member : null}
                    </div>
                </div>
            </button>
        </>
    )
}

Person.propTypes = {
    person: PropTypes.shape({
        member: PropTypes.object,
        person: PropTypes.object
    }),
    member: PropTypes.string,
    locale: PropTypes.string
}
