import React from "react";
import PropTypes from "prop-types";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getIconStyle, getTertiaryColor} from "../../../styles/shared/MainStyles";
import CakeRoundedIcon from "@material-ui/icons/CakeRounded";
import {CalendarTodayRounded, EmailRounded, PhoneRounded, WorkRounded} from "@material-ui/icons";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";


export default function OverviewComponent(props) {
    const birth = new Date(props.profile.birth)
    return (
        <div style={{width: '100%', display: 'grid', justifyItems:'flex-start', paddingLeft:'1vw'}}>
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