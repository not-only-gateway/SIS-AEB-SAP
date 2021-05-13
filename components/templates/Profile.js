import {Button} from "@material-ui/core";
import React from 'react'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import PersonPersona from "../elements/ProfilePersona";
import Cookies from "universal-cookie/lib";

export default function Profile(props) {
    return (
        <div
            className={mainStyles.displayInlineSpaced}
            key={props.person.id} style={{width: '100%'}}>

            <div className={mainStyles.displayInlineSpaced}>
                {props.editMode ? null :
                    <PersonPersona size={'150px'} key={props.person.id} dark={false}
                                   cakeDay={false}
                                   image={props.person.image} variant={'rounded'}/>
                }
                <div className={!props.editMode ? mainStyles.displayColumnSpaced : mainStyles.displayInlineStart}
                     style={{
                         marginLeft: !props.editMode ? '16px' : 'unset',
                         height: !props.editMode ? '150px' : 'auto',
                         transition: '300ms ease-in-out'
                     }}>
                    <div style={{
                        display: 'grid',
                        alignContent: 'flex-start',
                        alignItems: 'flex-start',
                        marginRight: props.editMode ? '16px' : 'unset'
                    }}>
                        <div style={{
                            fontSize: '1.7rem',
                            fontWeight: 570,

                        }}>
                            {props.person.name}
                        </div>
                        {props.editMode ? null :
                            <h4 style={{fontSize: '.9rem', color: '#555555', marginTop: '8px'}}>
                                {props.member.corporate_email}
                            </h4>
                        }
                    </div>
                    <Button style={{
                        backgroundColor: (new Cookies()).get('authorization_token') !== undefined && !props.notAuthenticate ? '#0095ff' : '#f54269',
                        color: 'white',
                        textTransform: 'none',
                        display: props.editable ? 'initial' : 'none',
                        marginTop: 'auto'
                    }} onClick={() => props.setEditMode(!props.editMode)}>
                        {props.editMode ? props.lang.visualize :
                            (new Cookies()).get('authorization_token') !== undefined && !props.notAuthenticate ? props.lang.edit : props.lang.authenticate}
                    </Button>

                </div>


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
    notAuthenticate: PropTypes.bool
}
