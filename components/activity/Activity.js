import AccordionLayout from "../shared/layout/AccordionLayout";
import styles from "../../styles/pages/activity/Activity.module.css";
import {Divider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import getMethodColor from "../../utils/activity/GetMethodColor";

export default function ActivityComponent(props) {
    const [color, setColor] = useState(null)

    useEffect(() => {
        setColor(getMethodColor(props.activity.request_method))

    }, [props.activity.request_method])

    return (
        <AccordionLayout
            content={
                <div className={styles.info_container} key={'activity - ' + props.activity.id}>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>ID</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.id}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>Full path</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.activity.path}</p>
                    </div>

                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>Package</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <div style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555',
                            borderRadius: '8px',
                            border: props.dark ? 'none' : '#e2e2e2 1px solid'
                        }}>
                            <pre >{JSON.stringify(JSON.parse(props.activity.data_package), null, 2)}</pre>
                        </div>
                    </div>

                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.platform}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.accessLog.platform}</p>
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
                            color: color
                        }}>{props.activity.request_method}</p>
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
                        }}>{props.accessLog.ip_address}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.browser}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.accessLog.browser_version}</p>
                    </div>

                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.engine}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.accessLog.browser_engine}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p style={{fontWeight: 450}}>{props.lang.userAgent}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p style={{
                            fontSize: '.9rem',
                            fontWeight: 420,
                            color: props.dark ? 'white' : '#555555'
                        }}>{props.accessLog.browser_user_agent}</p>
                    </div>


                </div>
            }
            summary={
                <div style={{display: 'flex'}}>
                    <p style={{
                        fontWeight: 500,
                        color: color
                    }}>{props.activity.request_method}</p>
                    <p style={{
                        marginRight: '10px',
                        marginLeft: '10px'
                    }}>{props.activity.path.indexOf('?') > -1 ? props.activity.path.substr(0, props.activity.path.indexOf('?')) : props.activity.path}</p>
                    <Divider orientation={'horizontal'}/>
                    <p>{(new Date(props.activity.time_of_creation)).toDateString()}</p>
                </div>
            }
            key={props.activity.id}
            closedSize={22}
            openSize={45}
            dark={props.dark}
            border={color !== null ? color + ' 2px solid' : null}
        />
    )
}

ActivityComponent.propTypes = {
    dark: PropTypes.bool,
    lang: PropTypes.object,
    activity: PropTypes.object,
    accessLog: PropTypes.object
}
