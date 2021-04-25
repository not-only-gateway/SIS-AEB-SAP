import React from "react";
import PropTypes from "prop-types";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getIconStyle, getTertiaryColor} from "../../../styles/shared/MainStyles";
import CakeRoundedIcon from "@material-ui/icons/CakeRounded";
import {CalendarTodayRounded, EmailRounded, PhoneRounded, WorkRounded} from "@material-ui/icons";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";
import styles from '../../../styles/person/Form.module.css'

export default function OverviewComponent(props) {
    const birth = new Date(props.profile.birth)
    return (
        <div className={mainStyles.displayWarp} style={{justifyContent: 'flex-start', width: '98%'}}>
            <div className={styles.overviewContainer}>
                <CakeRoundedIcon/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{birth.toDateString().substr(3, birth.toDateString().length - 7)}</p>
            </div>
            <div className={styles.overviewContainer}>
                <EmailRounded />
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.profile.corporate_email}</p>
            </div>
            <div className={styles.overviewContainer}>
                <PhoneRounded/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.profile.extension}</p>
            </div>

            <div className={styles.overviewContainer}>
                <ViewQuiltRoundedIcon/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.unit !== null ? props.unit.acronym : 'none'}</p>
            </div>
            {props.role !== undefined ?
                <div className={styles.overviewContainer}>
                    <WorkRounded/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.role.denomination}</p>
                </div>
                :
                null
            }

            <div className={styles.overviewContainer}>
                <CalendarTodayRounded/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.collaboration !== null ? new Date(props.collaboration.admission_date).toLocaleDateString() : 'None'}</p>
            </div>
        </div>
    )
}

OverviewComponent.propTypes = {
    profile: PropTypes.object,
    unit: PropTypes.object,
    effectiveRole: PropTypes.object,
    commissionedRole: PropTypes.object,
    senior: PropTypes.object,
    collaboration: PropTypes.object,
    dark: PropTypes.bool,
}