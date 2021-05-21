import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/Person.module.css'
import PersonPersona from "../elements/ProfilePersona";

export default function Profile(props) {
    return (
        <div className={styles.profileContainer} style={{top: props.padding? '0' :    '32px', paddingTop: props.padding ? '16px' : 0}}>
            <PersonPersona
                size={'120px'}
                dark={false}
                cakeDay={false}
                image={props.person.image} elevation={false} variant={'circular'}/>

            <div style={{
                display: 'grid',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                justifyItems: 'flex-start'
            }}>
                <h3 style={{marginTop: '0', marginBottom: '0'}}>
                    {props.person.name}
                </h3>

                <h5 style={{marginTop: '8px'}}>
                    {props.member.corporate_email}
                </h5>
            </div>
        </div>

    )
}

Profile.proptypes = {
    person: PropTypes.object,
    member: PropTypes.object,
    padding: PropTypes.bool
}
