import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/Person.module.css'
import {Avatar} from "@material-ui/core";
import PersonAvatar from "../shared/PersonAvatar";

export default function Profile(props) {
    return (
        <div className={styles.profileContainer}>
            <PersonAvatar image={props.person.image} size={'80px'}
                          variant={'circle'}/>

            <div style={{
                display: 'grid',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                justifyItems: 'flex-start'
            }}>
                <h3 style={{marginTop: '0', marginBottom: '0'}}>
                    {props.person.name}
                </h3>
                {props.member !== null ?
                    <h5 style={{marginTop: '8px'}}>
                        {props.member.corporate_email}
                    </h5>
                    :
                    null
                }
            </div>
        </div>

    )
}

Profile.proptypes = {
    person: PropTypes.object,
    member: PropTypes.object
}
