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
    getIconStyle, getPrimaryBackground, getPrimaryColor,
    getTertiaryBackground,
    getTertiaryColor
} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'
import AvatarLayout from "../shared/AvatarLayout";
import ImageHost from "../../utils/shared/ImageHost";
import shared from "../../styles/shared/Shared.module.css";

export default function ProfileComponent(props) {

    return (
        <div
            className={[mainStyles.displayColumnSpaced].join(' ')}
            key={props.profile.id}
            style={{
                ...getPrimaryBackground({dark: props.dark}),
                ...{
                    borderRadius: '8px',
                    height: '45vh',
                    position: 'sticky',
                    top: '0',
                    width: '14vw',
                    padding: '.5vw'
                }
            }}>

            <div className={mainStyles.displayColumnSpaced} style={{justifyContent: 'center', justifyItems: 'center'}}>
                <Avatar src={ImageHost() + props.profile.image}
                        style={{height: '100px', width: '100px', margin: 'auto'}}/>


                <div style={{transform: 'translateY(2%) translateX(2%)',}}>
                    <p className={mainStyles.primaryParagraph}
                       style={{...getPrimaryColor({dark: props.dark}), ...{textAlign: 'center'}}}>{props.profile.name}</p>
                </div>
            </div>
            <div style={{overflow: 'hidden'}}>

                <div className={mainStyles.displayInlineSpaced}>
                    <EmailRounded style={getIconStyle({dark: props.dark})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.profile.corporate_email}</p>
                </div>
                <div className={mainStyles.displayInlineSpaced}>
                    <PhoneRounded style={getIconStyle({dark: props.dark})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.profile.extension}</p>
                </div>
                <div className={mainStyles.displayInlineSpaced}>
                    <WorkRounded style={getIconStyle({dark: props.dark})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.unit.acronym}</p>
                </div>
                <div className={mainStyles.displayInlineSpaced}>
                    <CalendarTodayRounded style={getIconStyle({dark: props.dark})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{new Date(props.collaboration.admission_date).toLocaleDateString()}</p>
                </div>
            </div>
            {props.editable ?
                <Button style={{
                    ...getPrimaryBackground({dark: props.dark}),
                    ...getTertiaryColor({dark: props.dark}),
                    ...{
                        borderRadius: '8px',
                        width: '90%',
                        margin: '10px auto 10px',
                        backgroundColor: 'black',
                        color: 'white'
                    }
                }} className={mainStyles.secondaryParagraph} onClick={() => props.setEditMode(!props.editMode)}>
                    {props.editMode ? 'Visualize' : 'Edit'}
                </Button>
                :
                null}

        </div>

    )
}

ProfileComponent.proptypes = {
    dark: PropTypes.bool,
    profile: PropTypes.object,
    collaboration: PropTypes.object,
    inactiveLocale: PropTypes.string,
    lastActivity: PropTypes.number,
    editable: PropTypes.bool,
    setEditMode: PropTypes.func,
    editMode: PropTypes.bool
}