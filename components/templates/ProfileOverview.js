import React from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import {getIconStyle} from "../../styles/shared/MainStyles";
import {
    CalendarTodayRounded,
    EmailRounded,
    HomeRounded,
    LinkRounded,
    LocationOnRounded,
    PhoneForwardedRounded,
    PhoneRounded,
    WorkRounded
} from "@material-ui/icons";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";

export default function OverviewComponent(props) {
    const birth = new Date(props.person.birth)
    return (
        <div className={mainStyles.displayWarp} style={{
            width: '100%',
        }}>

            <div style={{
                backgroundColor: 'white',
                padding: '16px 32px 16px 32px ',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                width: 'calc(50% - 8px)'
            }}>
                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <EmailRounded style={getIconStyle({dark: false})}/>
                    <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                        {props.member.corporate_email}
                    </h5>
                </div>

                {props.member.entity !== undefined ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        {props.member.home_office ?
                            <HomeRounded style={getIconStyle({dark: false})}/>
                            :
                            <LocationOnRounded style={getIconStyle({dark: false})}/>
                        }

                        <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                            {props.member.home_office ?
                                'Home Office'
                                :
                                props.member.entity.acronym
                            }
                        </h5>
                    </div>
                    :
                    null
                }
                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <PhoneRounded style={getIconStyle({dark: false})}/>
                    <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                        {props.member.extension}
                    </h5>
                </div>
                {!props.member.home_office ?
                    null
                    :
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>

                        <PhoneForwardedRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                            {props.member.alternative_phone}
                        </h5>
                    </div>
                }
            </div>

            <div style={{
                backgroundColor: 'white',
                padding: '16px 32px 16px 32px ',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                width: 'calc(50% - 8px)'
            }}>

                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <ViewQuiltRoundedIcon style={getIconStyle({dark: false})}/>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit !== null ? props.unit.acronym : 'none'}</h5>
                </div>
                {props.effectiveRole !== undefined && props.effectiveRole !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <WorkRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginTop: '16px', marginBottom: '16px'}}>{props.effectiveRole.denomination}</h5>
                    </div>
                    :
                    null
                }
                {props.commissionedRole !== undefined && props.commissionedRole !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <WorkRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginTop: '16px', marginBottom: '16px'}}>{props.commissionedRole.denomination}</h5>
                    </div>
                    :
                    null
                }
                {props.linkage !== null && props.linkage !== undefined ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <LinkRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginTop: '16px', marginBottom: '16px'}}>{props.linkage.denomination}</h5>
                    </div>
                    :
                    null
                }
            </div>
            {/*<div*/}
            {/*    className={[styles.overviewContainer, animations.popInAnimation].join(' ')}*/}
            {/*    style={{animationDirection: 'forwards'}}>*/}
            {/*    <CakeRoundedIcon style={getIconStyle({dark: false})}/>*/}
            {/*    <p className={mainStyles.tertiaryParagraph} style={{*/}
            {/*        ...getTertiaryColor({dark: props.dark}), ...{*/}
            {/*            textAlign: "right"*/}
            {/*        }*/}
            {/*    }}>{birth.toDateString().substr(3, birth.toDateString().length - 7)}</p>*/}
            {/*</div>*/}


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