import React from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import {getIconStyle, getTertiaryColor} from "../../styles/shared/MainStyles";
import CakeRoundedIcon from "@material-ui/icons/CakeRounded";
import {CalendarTodayRounded, EmailRounded, PhoneRounded, WorkRounded} from "@material-ui/icons";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";
import styles from '../../styles/person/Form.module.css'
import animations from '../../styles/shared/Animations.module.css'

export default function OverviewComponent(props) {
    const birth = new Date(props.profile.birth)
    return (
        <div className={mainStyles.displayWarp} style={{width: '100%'}}>
            <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                 style={{animationDelay: '100ms', animationDirection: 'forwards'}}>
                <CakeRoundedIcon style={getIconStyle({dark: false})}/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{birth.toDateString().substr(3, birth.toDateString().length - 7)}</p>
            </div>
            <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                 style={{animationDelay: '200ms'}}>
                <EmailRounded style={getIconStyle({dark: false})}/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.profile.corporate_email}</p>
            </div>
            <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                 style={{animationDelay: '300ms'}}>
                <PhoneRounded style={getIconStyle({dark: false})}/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.profile.extension}</p>
            </div>

            <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                 style={{animationDelay: '400ms'}}>
                <ViewQuiltRoundedIcon style={getIconStyle({dark: false})}/>
                <p className={mainStyles.tertiaryParagraph} style={{
                    ...getTertiaryColor({dark: props.dark}), ...{
                        textAlign: "right"
                    }
                }}>{props.unit !== null ? props.unit.acronym : 'none'}</p>
            </div>
            {props.effectiveRole !== undefined && props.effectiveRole !== null?
                <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                     style={{animationDelay: '500ms'}}>
                    <WorkRounded style={getIconStyle({dark: false})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.effectiveRole.denomination}</p>
                </div>
                :
                null
            }
            {props.commissionedRole !== undefined && props.commissionedRole !== null?
                <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                     style={{animationDelay: '500ms'}}>
                    <WorkRounded style={getIconStyle({dark: false})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.commissionedRole.denomination}</p>
                </div>
                :
                null
            }
            {props.collaboration !== null ?
                <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                     style={{animationDelay: '600ms'}}>
                    <CalendarTodayRounded style={getIconStyle({dark: false})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{new Date(props.collaboration.admission_date).toLocaleDateString()}</p>
                </div>
                : null
            }
            {props.linkage !== null && props.linkage !== undefined?
                <div className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                     style={{animationDelay: '600ms'}}>
                    <CalendarTodayRounded style={getIconStyle({dark: false})}/>
                    <p className={mainStyles.tertiaryParagraph} style={{
                        ...getTertiaryColor({dark: props.dark}), ...{
                            textAlign: "right"
                        }
                    }}>{props.linkage.denomination}</p>
                </div>
                : null
            }
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
    linkage: PropTypes.object
}