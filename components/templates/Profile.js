import React from 'react'
import PropTypes from 'prop-types'
import styles from '../../styles/Person.module.css'
import PersonPersona from "../elements/ProfilePersona";
import Cookies from "universal-cookie/lib";
import HorizontalTabs from "../layout/navigation/HorizontalTabs";
import VerticalTabs from "../layout/navigation/VerticalTabs";
import Button from "../modules/inputs/Button";
import {EditRounded, LockOpenRounded, VisibilityRounded} from "@material-ui/icons";

export default function Profile(props) {
    return (
        <div className={styles.profileContainer}>
            <PersonPersona
                size={'150px'}
                dark={false}
                cakeDay={false}
                image={props.person.image} elevation={false} variant={'rounded'}/>

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
}
