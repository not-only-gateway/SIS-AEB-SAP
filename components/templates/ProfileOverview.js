import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import styles from '../../styles/Extensions.module.css'
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

export default function ProfileOverview(props) {
    return (
        <>
            <div className={styles.overviewRowContainer}>
                <div className={styles.overviewLineContainer}>
                    <EmailRounded style={getIconStyle({dark: false})}/>
                    <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                        {props.member.corporate_email}
                    </h5>
                </div>

                {props.member.entity !== undefined ?
                    <div className={styles.overviewLineContainer}>
                        {props.member.home_office ?
                            <HomeRounded style={getIconStyle({dark: false})}/>
                            :
                            <LocationOnRounded style={getIconStyle({dark: false})}/>
                        }

                        <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                            {props.member.home_office ?
                                'Home Office'
                                :
                                props.member.entity
                            }
                        </h5>
                    </div>
                    :
                    null
                }

                <div className={styles.overviewLineContainer}>
                    <PhoneRounded style={getIconStyle({dark: false})}/>
                    <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                        {props.member.extension}
                    </h5>
                </div>
                {!props.member.home_office ?
                    null
                    :
                    <div className={styles.overviewLineContainer}>

                        <PhoneForwardedRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginBottom: '16px', marginTop: '16px'}}>
                            {props.member.alternative_phone}
                        </h5>
                    </div>
                }
            </div>

            <div className={styles.overviewRowContainer}>
                {/*<label className={styles.overviewRowLabel}>{locale.placement}</label>*/}
                <div className={styles.overviewLineContainer}>
                    <ViewQuiltRoundedIcon style={getIconStyle({dark: false})}/>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit !== null ? props.unit.value : 'none'}</h5>
                </div>

                {props.effectiveRole !== undefined && props.effectiveRole !== null ?
                    <div className={styles.overviewLineContainer}>
                        <WorkRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginTop: '16px', marginBottom: '16px'}}>{props.effectiveRole.value}</h5>
                    </div>
                    :
                    null
                }
                {props.commissionedRole !== undefined && props.commissionedRole !== null ?
                    <div className={styles.overviewLineContainer}>
                        <WorkRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginTop: '16px', marginBottom: '16px'}}>{props.commissionedRole.value}</h5>
                    </div>
                    :
                    null
                }
                {props.linkage !== null && props.linkage !== undefined ?
                    <div className={styles.overviewLineContainer}>
                        <LinkRounded style={getIconStyle({dark: false})}/>
                        <h5 style={{marginTop: '16px', marginBottom: '16px'}}>{props.linkage.value}</h5>
                    </div>
                    :
                    null
                }
            </div>


        </>
    )
}

ProfileOverview.propTypes = {
    person: PropTypes.object,
    member: PropTypes.object,
    unit: PropTypes.object,
    commissionedRole: PropTypes.object,
    effectiveRole: PropTypes.object,
    senior: PropTypes.object,
    linkage: PropTypes.object,
    locale: PropTypes.string,
}