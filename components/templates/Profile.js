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

            <div style={{
                display: 'grid',
                gap: '16px',
                justifyItems: 'center'
            }}>
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
                                       width={'auto'}
                                       handleClick={() => props.setEditMode(!props.editMode)}/>
                               }
                               image={props.person.image} variant={'rounded'}/>

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
            {props.editMode ?
                <VerticalTabs
                    buttons={[
                        props.accessProfile !== null ? {
                            disabled: false,
                            key: 0,
                            value: props.lang.personal
                        } : null,
                        props.accessProfile !== null ? {
                            disabled: !props.accessProfile.canManageMembership,
                            key: 1,
                            value: props.lang.corporate
                        } : null,

                    ]} openTab={props.openTab} setOpenTab={props.setOpenTab}/> : null}


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
