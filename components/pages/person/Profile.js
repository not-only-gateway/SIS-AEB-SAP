import {Avatar, Button} from "@material-ui/core";
import React from 'react'
import PropTypes from 'prop-types'
import {getPrimaryColor} from "../../../styles/shared/MainStyles";
import mainStyles from '../../../styles/shared/Main.module.css'
import ImageHost from "../../../utils/shared/ImageHost";

export default function ProfileComponent(props) {

    return (
        <div
            className={[mainStyles.displayInlineSpaced].join(' ')}
            key={props.profile.id}
            style={{
                height: 'auto',
                padding: ' 10px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
            }}>

            <div className={mainStyles.displayInlineSpaced} style={{justifyContent: 'center', justifyItems: 'center'}}>
                <Avatar src={ImageHost() + props.profile.image} color={'light'}
                        style={{
                            height: '100px',
                            width: '100px',
                            margin: 'auto',
                            boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px'
                        }}/>


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

ProfileComponent.proptypes = {
    dark: PropTypes.bool,
    profile: PropTypes.object,

    inactiveLocale: PropTypes.string,
    lastActivity: PropTypes.number,
    editable: PropTypes.bool,
    setEditMode: PropTypes.func,
    editMode: PropTypes.bool
}
