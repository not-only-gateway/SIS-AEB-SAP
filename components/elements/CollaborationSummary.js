import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import {AccessTimeRounded, AssignmentIndRounded, MultilineChartRounded, StarRounded} from "@material-ui/icons";
import React from "react";
import ViewQuiltRoundedIcon from "@material-ui/icons/ViewQuiltRounded";
import {getIconStyle} from "../../styles/shared/MainStyles";
import {Divider} from "@material-ui/core";

export default function CollaborationSummary(props) {
    return (
        <div className={mainStyles.displayInlineStart} style={{width: "fit-content", gap: '16px'}}>
            <div className={mainStyles.displayInlineStart}>
                <AssignmentIndRounded style={getIconStyle({dark: false})}/>
                <p className={mainStyles.secondaryParagraph}>{props.effectiveRole !== null ? props.effectiveRole : (props.commissionedRole !== null ? props.commissionedRole : props.additionalRoleInfo)}</p>
            </div>
            <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/>
            <div className={mainStyles.displayInlineStart}>
                <ViewQuiltRoundedIcon style={getIconStyle({dark: false})}/>
                <p className={mainStyles.secondaryParagraph}>{props.unit}</p>
            </div>
            <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/>
            <div>
                <div style={{
                    width: "fit-content",
                    padding: '5px 10px 5px 10px',
                    borderRadius: '5px',
                    backgroundColor: props.activeRole ? '#4ad862' : '#f54269',
                    color: 'white',
                    height: 'fit-content'
                }}>
                    {props.activeRole ? 'Active' : 'Inactive'}
                </div>
            </div>
            {props.mainCollaboration ? <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/> : null}
            {props.mainCollaboration ? 'Main' : null}
            {props.substitute ? <Divider orientation={"horizontal"} style={{color: 'hsla(210, 11%, 78%, 0.5)', width: '10px'}}/> : null}

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
    mainCollaboration: PropTypes.bool,
    substitute: PropTypes.bool
}
