import React from "react";
import PropTypes from 'prop-types'
import shared from '../../styles/shared/Shared.module.css'
import PersonAvatar from "../elements/PersonAvatar";
import {ExtensionRounded} from "@material-ui/icons";
import Link from 'next/link'

export default function Person(props) {

    return (
        <>
            <Link href={'/person?id=' + props.person.person.id}>
                <button style={{
                    border: 'none',
                    outline: 'none',
                    boxShadow: 'none',
                    backgroundColor: 'transparent',
                    width: '100%',
                    padding: 0
                }}>
                    <div key={props.person.person.id} className={shared.rowContainer} style={{gap: '16px'}}>
                        <PersonAvatar variant={'circular'} elevation={false} image={props.person.person.image}
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
            </Link>
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
