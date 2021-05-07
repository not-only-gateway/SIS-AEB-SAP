import React from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import {getIconStyle, getTertiaryColor} from "../../styles/shared/MainStyles";
import CakeRoundedIcon from "@material-ui/icons/CakeRounded";
import {CalendarTodayRounded, EmailRounded, PhoneRounded, WorkRounded} from "@material-ui/icons";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";
import styles from '../../styles/person/Form.module.css'
import animations from '../../styles/shared/Animations.module.css'
import Profile from "./Profile";
import VerticalTabs from "../layout/navigation/VerticalTabs";

export default function OverviewComponent(props) {
    const birth = new Date(props.person.birth)

    return (
        <div className={mainStyles.displayWarp} style={{width: '100%'}}>
            <VerticalTabs
                buttons={[
                    {
                        disabled: false,
                        key: 0,
                        value: 'Personal'
                    },
                    {
                        disabled: false,
                        key: 1,
                        value: 'Membership'
                    },
                    {
                        disabled: false,
                        key: 2,
                        value: 'Collaboration'
                    },
                ]}

                tabs={[
                    {
                        key: 0,
                        content: (
                            <div style={{padding: '32px', height: 'fit-content', display: 'grid', gap: '50px'}}>

                                <div
                                    className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                    style={{animationDirection: 'forwards'}}>
                                    <CakeRoundedIcon style={getIconStyle({dark: false})}/>
                                    <p className={mainStyles.tertiaryParagraph} style={{
                                        ...getTertiaryColor({dark: props.dark}), ...{
                                            textAlign: "right"
                                        }
                                    }}>{birth.toDateString().substr(3, birth.toDateString().length - 7)}</p>
                                </div>
                            </div>
                        )
                    },
                    {
                        key: 1,
                        content:(
                            <div style={{padding: '32px', height: 'fit-content', display: 'grid', gap: '50px'}}>

                                <div
                                    className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                >
                                    <EmailRounded style={getIconStyle({dark: false})}/>
                                    <p className={mainStyles.tertiaryParagraph} style={{
                                        ...getTertiaryColor({dark: props.dark}), ...{
                                            textAlign: "right"
                                        }
                                    }}>{props.member.corporate_email}</p>
                                </div>

                                <div
                                    className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                >
                                    <PhoneRounded style={getIconStyle({dark: false})}/>
                                    <p className={mainStyles.tertiaryParagraph} style={{
                                        ...getTertiaryColor({dark: props.dark}), ...{
                                            textAlign: "right"
                                        }
                                    }}>{props.member.extension}</p>
                                </div>

                            </div>
                        )
                    },
                    {
                        key: 2,
                        content: (
                            <div style={{padding: '32px', height: 'fit-content', display: 'grid', gap: '50px'}} >

                            <div
                                    className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                >
                                    <ViewQuiltRoundedIcon style={getIconStyle({dark: false})}/>
                                    <p className={mainStyles.tertiaryParagraph} style={{
                                        ...getTertiaryColor({dark: props.dark}), ...{
                                            textAlign: "right"
                                        }
                                    }}>{props.unit !== null ? props.unit.acronym : 'none'}</p>
                                </div>
                                {props.effectiveRole !== undefined && props.effectiveRole !== null ?
                                    <div
                                        className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                    >
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
                                {props.commissionedRole !== undefined && props.commissionedRole !== null ?
                                    <div
                                        className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                    >
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
                                    <div
                                        className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                    >
                                        <CalendarTodayRounded style={getIconStyle({dark: false})}/>
                                        <p className={mainStyles.tertiaryParagraph} style={{
                                            ...getTertiaryColor({dark: props.dark}), ...{
                                                textAlign: "right"
                                            }
                                        }}>{new Date(props.collaboration.admission_date).toLocaleDateString()}</p>
                                    </div>
                                    : null
                                }
                                {props.linkage !== null && props.linkage !== undefined ?
                                    <div
                                        className={[styles.overviewContainer, animations.popInAnimation].join(' ')}
                                    >
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
                    },
                ]}
            />


        </div>
    )
}

OverviewComponent.propTypes = {
    person: PropTypes.object,
    member: PropTypes.object,
    collaboration: PropTypes.object,
    unit: PropTypes.object,
    commissionedRole: PropTypes.object,
    effectiveRole: PropTypes.object,
    senior: PropTypes.object,
    linkage: PropTypes.object
}