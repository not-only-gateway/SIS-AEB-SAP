import {Avatar, Button} from "@material-ui/core";
import React from 'react'
import PropTypes from 'prop-types'
import {getPrimaryColor} from "../../../styles/shared/MainStyles";
import mainStyles from '../../../styles/shared/Main.module.css'
import ImageHost from "../../../utils/shared/ImageHost";
import ProfilePersona from "./ProfilePersona";

export default function Profile(props) {
    const currentDate = new Date()
    return (
        <div
            className={mainStyles.displayInlineSpaced}
            key={props.profile.id} style={{width: '100%'}}>

            <div className={mainStyles.displayInlineSpaced}>
                <ProfilePersona size={'200px'} key={props.profile.id} dark={false}
                                cakeDay={((new Date(props.profile.birth)).getDay() === currentDate.getDay() && (new Date(props.profile.birth)).getMonth() === currentDate.getMonth())}
                                image={props.profile.image} variant={'rounded'}/>

                <div style={{transform: 'translateX(20px)',}}>
                    <h4
                        style={{...getPrimaryColor({dark: props.dark}), ...{textAlign: 'left'}}}>{props.profile.name}</h4>
                    <p className={mainStyles.secondaryParagraph}
                       style={{...getPrimaryColor({dark: props.dark}), ...{textAlign: 'left'}}}>{props.profile.corporate_email}</p>
                </div>
            </div>

            {props.editable ?
                <Button style={{
                    width: '15%',
                    backgroundColor: 'black',
                    color: 'white',
                    textTransform: 'none'
                }} onClick={() => props.setEditMode(!props.editMode)} variant={'contained'}>
                    {props.editMode ? 'Visualize' : 'Edit'}
                </Button>
                :
                null
            }

        </div>

    )
}

Profile.proptypes = {
    dark: PropTypes.bool,
    profile: PropTypes.object,

    inactiveLocale: PropTypes.string,
    lastActivity: PropTypes.number,
    editable: PropTypes.bool,
    setEditMode: PropTypes.func,
    editMode: PropTypes.bool
}
