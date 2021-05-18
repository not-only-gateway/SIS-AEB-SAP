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
        <div
            className={styles.profileContainer}
            key={props.person.id}>
                <PersonPersona size={'150px'} key={props.person.id} dark={false}
                               cakeDay={false}
                               absoluteContent={
                                   <Button
                                       content={
                                           <div style={{
                                               height: 'auto',
                                               width: 'auto',
                                               background: (new Cookies()).get('authorization_token') !== undefined && !props.notAuthenticate ? '#0095ff' : '#f54269',
                                               color: 'white',
                                               display: 'flex',
                                               placeContent: 'center',
                                               borderRadius: '50%',
                                               padding: '8px'
                                           }}>
                                               {props.editMode ? <VisibilityRounded/> :
                                                   (new Cookies()).get('authorization_token') !== undefined &&
                                                   !props.notAuthenticate ? <EditRounded/> : <LockOpenRounded/>}
                                           </div>
                                       }
                                       padding={'0'}
                                       border={'none'}
                                       width={'auto'}
                                       handleClick={() => props.setEditMode(!props.editMode)}/>
                               }
                               image={props.person.image} elevation={false} variant={'rounded'}/>

                <div style={{
                    display: 'grid',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    justifyItems: 'center'
                }}>
                    <div style={{
                        fontSize: '1.7rem',
                        fontWeight: 570,
                    }}>
                        {props.person.name}
                    </div>

                    <h4 style={{fontSize: '.9rem', color: '#555555', marginTop: '8px'}}>
                        {props.member.corporate_email}
                    </h4>
                </div>
        </div>

    )
}

Profile.proptypes = {
    person: PropTypes.object,
    member: PropTypes.object,
    setEditMode: PropTypes.func,
    editMode: PropTypes.bool,
    editable: PropTypes.bool,
    inactiveLocale: PropTypes.string,
    lang: PropTypes.object,
    notAuthenticate: PropTypes.bool,
    accessProfile: PropTypes.object,
    openTab: PropTypes.any,
    setOpenTab: PropTypes.func
}
