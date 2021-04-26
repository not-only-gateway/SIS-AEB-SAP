import AccordionLayout from "../../layout/AccordionLayout";
import styles from "../../../styles/activity/Activity.module.css";
import {Divider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import getMethodColor from "../../../utils/activity/GetMethodColor";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getPrimaryColor, getTertiaryColor} from "../../../styles/shared/MainStyles";

export default function ActivityComponent(props) {
    const [color, setColor] = useState(null)
    console.log('pages -> ' + props.pagesFetched)
    useEffect(() => {
        setColor(getMethodColor(props.activity.request_method))
    }, [props.activity.request_method])

    return (
        <AccordionLayout
            content={
                <div className={styles.informationContainer} key={'activity - ' + props.activity.id} >
                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: props.dark})}>ID</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.activity.id}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: props.dark})}>Full path</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.activity.path}</p>
                    </div>

                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>Package</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <div className={mainStyles.normalBorder}>
                            <pre className={mainStyles.primaryParagraph}
                                 style={getTertiaryColor({dark: props.dark})}>{JSON.stringify(JSON.parse(props.activity.data_package), null, 2)}</pre>
                        </div>
                    </div>

                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>{props.lang.platform}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.accessLog.platform}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>{props.lang.created}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{new Date(props.activity.time_of_creation).toString()}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>{props.lang.method}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.activity.request_method}</p>
                    </div>

                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: props.dark})}>URL</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.activity.path}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>{props.lang.ip}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.accessLog.ip_address}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>{props.lang.browser}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.accessLog.browser_version}</p>
                    </div>

                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>{props.lang.engine}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.accessLog.browser_engine}</p>
                    </div>
                    <div className={styles.info_row}>
                        <p className={mainStyles.primaryParagraph}
                           style={getPrimaryColor({dark: props.dark})}>{props.lang.userAgent}</p>
                        <Divider orientation={'horizontal'}
                                 style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                        <p className={mainStyles.tertiaryParagraph}
                           style={getTertiaryColor({dark: props.dark})}>{props.accessLog.browser_user_agent}</p>
                    </div>
                </div>
            }
            summary={
                <div className={mainStyles.rowContainer}>
                    <div
                        className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                        style={getTertiaryColor({dark: props.dark})}>
                        {props.activity.id}
                    </div>
                    <div className={[mainStyles.secondaryParagraph, mainStyles.displayInlineStart].join(' ')}
                        style={{color: color}}>
                        {props.activity.request_method}
                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                         style={getTertiaryColor({dark: props.dark})}>
                        {props.activity.path.indexOf('?') > -1 ? props.activity.path.substr(0, props.activity.path.indexOf('?')) : props.activity.path}
                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                         style={getTertiaryColor({dark: props.dark})}>
                        {(new Date(props.activity.time_of_creation)).toDateString()}
                    </div>
                </div>
            }
            // key={props.activity.id}
            closedSize={55}
            openSize={55}
            dark={props.dark}
            asRow={true}
            animationDelay={props.pagesFetched <= 1 ? props.index * 100 : 0}
        />
    )
}

ActivityComponent.propTypes = {
    dark: PropTypes.bool,
    lang: PropTypes.object,
    activity: PropTypes.object,
    accessLog: PropTypes.object,
    index: PropTypes.number,
    pagesFetched: PropTypes.number
}
