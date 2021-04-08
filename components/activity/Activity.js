import AccordionLayout from "../shared/AccordionLayout";
import styles from "../../styles/Activity.module.css";
import {Divider} from "@material-ui/core";
import React from "react";
import PropTypes from 'prop-types'

export default function ActivityComponent(props) {
    return (
        <AccordionLayout
            content={
                <div className={styles.info_container} key={'activity - ' + props.activity.id}>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.platform}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.access_log.platform}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.date}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{new Date(props.activity.time_of_creation).toLocaleString()}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.method}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.getColor(props.activity.method)
                        }}>{props.activity.method}</p>
                    </div>

                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>URL</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.path}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.ip}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.access_log.ip_address}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.browser}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.access_log.browser_version}</p>
                    </div>

                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.engine}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.access_log.browser_engine}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.userAgent}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.access_log.browser_user_agent}</p>
                    </div>


                </div>
            }
            summary={
                <div style={{display: 'flex'}}>
                    <p style={{
                        fontWeight: 500,
                        color: props.getColor(props.activity.method) !== null ? props.getColor(props.activity.method) : null
                    }}>{props.activity.method}</p>
                    <p style={{
                        marginRight: '10px',
                        marginLeft: '10px'
                    }}>{props.activity.path.indexOf('?') > -1 ? props.activity.path.substr(0, props.activity.path.indexOf('?')) : props.activity.path}</p>
                    <Divider orientation={'horizontal'}/>
                    <p>{(new Date(props.activity.time_of_creation)).toDateString()}</p>
                </div>
            }
            closedSize={22}
            openSize={45}
            border={props.getColor(props.activity.method) !== null ? props.getColor(props.activity.method) + ' 2px solid' : null}
        />
    )
}

ActivityComponent.propTypes={
    dark: PropTypes.bool,
    getColor: PropTypes.func,
    lang: PropTypes.object,
    activity: PropTypes.object
}
