import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import {AccessTimeRounded, AssignmentIndRounded} from "@material-ui/icons";
import React from "react";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";
import {getIconStyle} from "../../styles/shared/MainStyles";
import {Divider} from "@material-ui/core";

export default function CollaborationSummary(props) {
    return (
        <div className={mainStyles.displayInlineStart} style={{width: "fit-content", gap: '16px'}}>
            {props.effectiveRole !== null ?
                <>
                    <div className={mainStyles.displayInlineStart}>
                        <h5 style={{marginTop: 'auto', marginBottom: 'auto'}}>Effective Role:</h5>
                        <h5 style={{marginLeft: '10px', marginTop: 'auto', marginBottom: 'auto', color: '#555555'}}>{props.effectiveRole}</h5>
                    </div>
                    <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/>
                </>
                :
                null
            }
            { props.commissionedRole !== null ?
                <>
                    <div className={mainStyles.displayInlineStart}>
                        <h5 style={{marginTop: 'auto', marginBottom: 'auto'}}>Commissioned Role:</h5>
                        <h5 style={{marginLeft: '10px', marginTop: 'auto', marginBottom: 'auto', color: '#555555'}}>{props.commissionedRole}</h5>
                    </div>
                    <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/>
                </>
                :
                null
            }
            {props.additionalRoleInfo !== null ?
                <>
                    <div className={mainStyles.displayInlineStart}>
                        <h5 style={{marginTop: 'auto', marginBottom: 'auto'}}>Additional Role Information:</h5>
                        <h5 style={{marginLeft: '10px', marginTop: 'auto', marginBottom: 'auto', color: '#555555'}}>{props.commissionedRole}</h5>
                    </div>
                    <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/>
                </>
                :
                null
            }
            <div className={mainStyles.displayInlineStart}>
                <h5 style={{marginTop: 'auto', marginBottom: 'auto'}}>Unit:</h5>
                <h5 style={{marginLeft: '10px', marginTop: 'auto', marginBottom: 'auto', color: '#555555'}}>{props.unit}</h5>
            </div>
            <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/>
            <div>
                <div style={{
                    width: "fit-content",
                    padding: '5px 10px 5px 10px',
                    borderRadius: '5px',
                    color: props.activeRole ? '#4ad862' : '#f54269',
                    fontWeight: 550,
                    height: 'fit-content',
                    textTransform: 'uppercase'
                }}>
                    {props.activeRole ? 'Active' : 'Inactive'}
                </div>
            </div>
            {props.substitute ?
                <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/> : null}

            {props.substitute ?
                <div className={mainStyles.displayInlineStart}>
                    <AccessTimeRounded style={getIconStyle({dark: false})}/>
                    <p>Substitute</p>
                </div>
                : null}


        </div>
    )
}

CollaborationSummary.propTypes = {
    effectiveRole: PropTypes.string,
    commissionedRole: PropTypes.string,
    additionalRoleInfo: PropTypes.string,
    unit: PropTypes.string,
    activeRole: PropTypes.bool,

    substitute: PropTypes.bool
}
