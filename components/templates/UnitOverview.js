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
import styles from '../../styles/Unit.module.css'


export default function UnitOverview(props) {
    return (
        <div className={mainStyles.displayWarp} style={{
            width: '100%',
        }}>

            <div style={{
                backgroundColor: 'white',
                padding: '16px 32px 16px 32px ',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                width: 'calc(33.333% - 10.666px)'
            }}>
                <div className={mainStyles.displayInlineStart} style={{width: '100%'}}>
                    <h5 style={{
                        marginRight: '8px',
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.name}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.name}</h5>
                </div>
                <div className={mainStyles.displayInlineStart} style={{width: '100%'}}>
                    <h5 style={{
                        marginRight: '8px',
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.acronym}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.acronym}</h5>
                </div>
                {props.unit.is_decentralized ?
                <div className={mainStyles.displayInlineStart} style={{width: '100%'}}>
                    <h5 style={{
                        marginRight: '8px',
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.type}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.decentralized}</h5>
                </div>
                    :
                    null
                }
                {props.unit.parent_unit !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <h5 style={{
                            marginRight: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.lang.parentUnit}:</h5>
                        <h5 style={{
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.unit.parent_unit.value}</h5>
                    </div>
                    :
                    null
                }

                <div className={mainStyles.displayInlineStart} style={{width: '100%'}}>
                    <h5 style={{
                        marginRight: '8px',
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.parentEntity}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.parent_entity.value}</h5>
                </div>

                {props.unit.address !== null ?
                    <div className={mainStyles.displayInlineStart} style={{width: '100%'}}>
                        <h5 style={{
                            marginRight: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.lang.address}:</h5>
                        <h5 style={{
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.unit.address}</h5>
                    </div>
                    :
                    null
                }
            </div>

            <div style={{
                backgroundColor: 'white',
                padding: '16px 32px 16px 32px ',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                width: 'calc(33.333% - 10.666px)'
            }}>
                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <h5 style={{marginRight: '8px', marginTop: '16px', marginBottom: '16px'}}>{props.lang.sphere}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.sphere}</h5>
                </div>
                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <h5 style={{marginRight: '8px', marginTop: '16px', marginBottom: '16px'}}>{props.lang.power}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.power}</h5>
                </div>
                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <h5 style={{
                        marginRight: '8px',
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.legalNature}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.legal_nature}</h5>
                </div>
                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <h5 style={{
                        marginRight: '8px',
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.changeType}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.change_type}</h5>
                </div>
                <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                    <h5 style={{
                        marginRight: '8px',
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.lang.category}:</h5>
                    <h5 style={{
                        marginTop: '16px',
                        marginBottom: '16px'
                    }}>{props.unit.category}</h5>

                </div>

            </div>

            <div style={{
                backgroundColor: 'white',
                padding: '16px 32px 16px 32px ',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                width: 'calc(33.333% - 10.666px)'
            }}>
                {props.unit.standardization !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <h5 style={{
                            marginRight: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.lang.standardization}:</h5>
                        <h5 style={{
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.unit.standardization}</h5>
                    </div>
                    :
                    null
                }

                {props.unit.competence  !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <h5 style={{
                            marginRight: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.lang.competence }:</h5>
                        <h5 style={{
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.unit.competence }</h5>
                    </div>
                    :
                    null
                }

                {props.unit.finality  !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <h5 style={{
                            marginRight: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.lang.finality }:</h5>
                        <h5 style={{
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.unit.finality }</h5>
                    </div>
                    :
                    null
                }


                {props.unit.mission  !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <h5 style={{
                            marginRight: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.lang.mission }:</h5>
                        <h5 style={{
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.unit.mission }</h5>
                    </div>
                    :
                    null
                }


                {props.unit.strategic_objective  !== null ?
                    <div style={{width: '100%'}} className={mainStyles.displayInlineStart}>
                        <h5 style={{
                            marginRight: '8px',
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.lang.strategicObjective}:</h5>
                        <h5 style={{
                            marginTop: '16px',
                            marginBottom: '16px'
                        }}>{props.unit.strategic_objective }</h5>
                    </div>
                    :
                    null
                }

            </div>
        </div>
    )
}

UnitOverview.propTypes = {
    unit: PropTypes.object,
    lang: PropTypes.object,
}