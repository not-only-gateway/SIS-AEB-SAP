import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../shared/layout/InputLayout";
import fetchComponentData from "../../utils/person/FetchData";
import saveComponentChanges from "../../utils/person/SaveChanges";
import getTitle from "../../utils/person/GetTitle";
import mainStyles from '../../styles/shared/Main.module.css'
import getComponentLanguage from "../../utils/shared/GetLanguage";
import {getIconStyle, getSecondaryBackground, getTertiaryColor} from "../../styles/shared/MainStyles";
import CakeRoundedIcon from "@material-ui/icons/CakeRounded";
import {CalendarTodayRounded, EmailRounded, PhoneRounded, WorkRounded} from "@material-ui/icons";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";


export default function OverviewComponent(props) {
    const birth = new Date(props.profile.birth)
    return (
        <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.baseWidth].join(' ')}>

            <div className={mainStyles.displayInlineSpaced}>
                <CakeRoundedIcon style={getIconStyle({dark: props.dark})}/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{birth.toDateString().substr(3, birth.toDateString().length - 7)}</p>
            </div>
            <div className={mainStyles.displayInlineSpaced}>
                <EmailRounded style={{...getIconStyle({dark: props.dark})}}/>
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
                <ViewQuiltRoundedIcon style={getIconStyle({dark: props.dark})}/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.unit.acronym}</p>
            </div>
            {props.role !== undefined ?
                <div className={mainStyles.displayInlineSpaced}>
                    <WorkRounded style={getIconStyle({dark: props.dark})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.role.denomination}</p>
                </div>
                :
                null
            }

            <div className={mainStyles.displayInlineSpaced}>
                <CalendarTodayRounded style={getIconStyle({dark: props.dark})}/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{new Date(props.collaboration.admission_date).toLocaleDateString()}</p>
            </div>
        </div>
    )
}

OverviewComponent.propTypes = {
    profile: PropTypes.object,
    unit: PropTypes.object,
    role: PropTypes.object,
    collaboration: PropTypes.object,
    dark: PropTypes.bool,
}