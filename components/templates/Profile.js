import {Button} from "@material-ui/core";
import React from 'react'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import ProfilePersona from "../elements/ProfilePersona";

export default function Profile(props) {
    return (
        <div
            className={mainStyles.displayInlineSpaced}
            key={props.profile.id} style={{width: '100%', marginTop: '10px'}}>

            <div className={mainStyles.displayInlineSpaced}>
                <ProfilePersona size={'140px'} key={props.profile.id} dark={false}
                                cakeDay={false}
                                image={props.profile.image} variant={'rounded'}/>

                <div style={{marginLeft: '10px', height: 'auto'}}>
                    <p style={{
                        fontSize: '1.5rem',
                        'fontWeight': 540
                    }}>
                        {props.profile.name}
                    </p>
                    <p className={mainStyles.tertiaryParagraph} style={{color: '#777777'}}>
                        {props.profile.corporate_email}
                    </p>
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
