import {Button} from "@material-ui/core";
import React from 'react'
import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import PersonPersona from "../elements/ProfilePersona";

export default function Profile(props) {
    return (
        <div
            className={mainStyles.displayInlineSpaced}
            key={props.person.id} style={{width: '100%', marginTop: '10px'}}>

            <div className={mainStyles.displayInlineSpaced}>
                <PersonPersona size={'130px'} key={props.person.id} dark={false}
                                cakeDay={false}
                                image={props.person.image} variant={'rounded'}/>

                <div style={{marginLeft: '32px', height: 'auto'}}>
                    <h2>
                        {props.person.name}
                    </h2>
                    <p style={{fontSize: '.9rem',color: '#555555'}}>
                        {props.member.corporate_email}
                    </p>
                </div>
            </div>

            {props.editable ?
                <Button style={{
                    backgroundColor: '#0095ff',
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
    person: PropTypes.object,
    member: PropTypes.object,
    setEditMode: PropTypes.func,
    editMode: PropTypes.bool,
    editable: PropTypes.bool,
    inactiveLocale: PropTypes.string
}
