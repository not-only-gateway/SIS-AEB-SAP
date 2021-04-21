import styles from '../../styles/index/Index.module.css'
import {Avatar, Button, Divider} from "@material-ui/core";
import React, {useState} from 'react'
import {
    AddRounded,
    CalendarTodayRounded,
    EmailRounded,
    PhoneRounded,
    WarningRounded,
    WorkRounded
} from "@material-ui/icons";
import Link from 'next/link'
import PropTypes from 'prop-types'
import {
    getBorder,
    getBoxShadow,
    getIconStyle, getSecondaryBackground, getPrimaryColor,
    getTertiaryBackground,
    getTertiaryColor
} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'
import AvatarLayout from "../shared/AvatarLayout";
import ImageHost from "../../utils/shared/ImageHost";
import shared from "../../styles/shared/Shared.module.css";
import ViewQuiltRoundedIcon from '@material-ui/icons/ViewQuiltRounded';
import CakeRoundedIcon from '@material-ui/icons/CakeRounded';

export default function ProfileComponent(props) {

    return (
        <div
            className={[mainStyles.displayInlineSpaced].join(' ')}
            key={props.profile.id}
            style={{
                    height: '11vh',
                    position: 'sticky',
                    top: '0',
                    width: '100%',
                    padding: '0px 0px 4vh 0px',
                    borderBottom: '#e5e6e8 1px solid'
            }}>

            <div className={mainStyles.displayInlineSpaced} style={{justifyContent: 'center', justifyItems: 'center'}}>
                <Avatar src={ImageHost() + props.profile.image}
                        style={{height: '100px', width: '100px', margin: 'auto'}}/>


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
