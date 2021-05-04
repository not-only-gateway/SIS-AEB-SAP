import PropTypes from 'prop-types'
import React from "react";
import styles from "../../../styles/activity/Activity.module.css";
import mainStyles from "../../../styles/shared/Main.module.css";
import {getPrimaryColor, getTertiaryColor} from "../../../styles/shared/MainStyles";
import {Divider} from "@material-ui/core";
import Accordion from "../../layout/Accordion";
import getMethodColor from "../../../utils/activity/GetMethodColor";

export default function ActivityList(props) {


    return (
        <div style={{
            display: 'grid',
            marginTop: '8px',
            gap: '8px',
        }}>
            {(props.data).map((data, index) =>
                <div key={data.activity.id}>
                    <Accordion
                        elevation={false}
                        content={
                            <div className={styles.informationContainer} key={'activity - ' + data.activity.id}  >
                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: false})}>ID</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.activity.id}</p>
                                </div>
                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: false})}>Full path</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.activity.path}</p>
                                </div>

                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark: false})}>Package</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <div className={mainStyles.normalBorder}>
                            <pre className={mainStyles.primaryParagraph}
                                 style={getTertiaryColor({dark: false})}>{JSON.stringify(JSON.parse(data.activity.data_package), null, 2)}</pre>
                                    </div>
                                </div>

                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark: false})}>{props.lang.platform}</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.access_log.platform}</p>
                                </div>
                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark: false})}>{props.lang.created}</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{new Date(data.activity.time_of_creation).toString()}</p>
                                </div>
                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark: false})}>{props.lang.method}</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.activity.request_method}</p>
                                </div>

                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: false})}>URL</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark:false})}>{data.activity.path}</p>
                                </div>
                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark:false})}>{props.lang.ip}</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.access_log.ip_address}</p>
                                </div>
                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark: false})}>{props.lang.browser}</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.access_log.browser_version}</p>
                                </div>

                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark: false})}>{props.lang.engine}</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.access_log.browser_engine}</p>
                                </div>
                                <div className={styles.info_row}>
                                    <p className={mainStyles.primaryParagraph}
                                       style={getPrimaryColor({dark: false})}>{props.lang.userAgent}</p>
                                    <Divider orientation={'horizontal'}
                                             style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                                    <p className={mainStyles.tertiaryParagraph}
                                       style={getTertiaryColor({dark: false})}>{data.access_log.browser_user_agent}</p>
                                </div>
                            </div>
                        }
                        summary={
                            <div className={[mainStyles.rowContainer, mainStyles.maxWidth].join(' ')} style={{width: '75%'}}>
                                <div
                                    className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                    style={getTertiaryColor({dark: false})}>
                                    {data.activity.id}
                                </div>
                                <div className={[mainStyles.secondaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                     style={{color: getMethodColor(data.activity.request_method.toUpperCase()), fontWeight: '550'}}>
                                    {data.activity.request_method.toUpperCase()}
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {data.activity.path.indexOf('?') > -1 ? data.activity.path.substr(0, data.activity.path.indexOf('?')) : data.activity.path}
                                </div>
                                <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                     style={getTertiaryColor({dark: false})}>
                                    {(new Date(data.activity.time_of_creation)).toDateString()}
                                </div>
                            </div>
                        }
                        closedSize={100}
                        openSize={100}
                        dark={false}
                        asRow={true}
                        animationDelay={props.pagesFetched <= 1 ? index * 100 : 0}
                    />
                </div>
            )}
        </div>
    )
}
ActivityList.propTypes = {
    data: PropTypes.array,
    sorterMethod: PropTypes.string,
    pagesFetched: PropTypes.number,
    lang: PropTypes.object,
}