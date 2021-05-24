import React, {useState} from "react";
import PropTypes from 'prop-types'

import animations from '../../styles/shared/Animations.module.css'
import {Modal} from "@material-ui/core";
import Profile from "../templates/Profile";
import shared from '../../styles/shared/Shared.module.css'
import ProfilePersona from "../elements/ProfilePersona";
import {ExtensionRounded} from "@material-ui/icons";
import Button from "../modules/inputs/Button";
import Link from 'next/link'

export default function Person(props) {

    const [modal, setModal] = useState(false)

    function getLang() {
        let response = null
        if (props.locale === 'en')
            response = {
                close: 'Close',
                edit: 'Edit'
            }
        else
            response = {
                close: 'Fechar',
                edit: 'Editar'
            }
        return response
    }

    function renderModal() {
        return (
            <Modal style={{display: "flex", justifyContent: 'center', alignItems: 'center'}}
                   onClose={() => setModal(false)} open={modal}>
                <div className={[shared.modalContainer, animations.fadeIn].join(' ')}>
                    <div style={{padding: '32px', height: '100%', display: 'grid', gap: '32px'}}>
                        <Profile person={props.person.person} member={props.person.member}/>
                    </div>
                    <div className={shared.modalFooter}>
                        <Button
                            width={'fit-content'}
                            border={'#ecedf2 .7px solid'}
                            variant={'rounded'}
                            content={getLang().close}
                            handleClick={() => setModal(false)}
                            backgroundColor={'white'}
                            hoverHighlight={true}
                            colorVariant={'secondary'}
                            elevation={true}
                            fontColor={'#262626'}
                            padding={'8px 32px 8px 32px'}
                        />
                        <Link href={'/person?id=' + props.person.person.id}>
                            <button style={{
                                backgroundColor: '#0095ff',
                                padding: '8px 32px 8px 32px',
                                color: 'white',
                                borderRadius: '32px',
                                border: 'none',
                                outline: 'none',
                                cursor: 'pointer'
                            }}>
                                {getLang().edit}
                            </button>
                        </Link>
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
