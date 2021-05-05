import PropTypes, {func} from 'prop-types'
import React, {useState} from "react";
import styles from "../../../styles/activity/Activity.module.css";
import mainStyles from "../../../styles/shared/Main.module.css";
import {getPrimaryColor, getTertiaryColor} from "../../../styles/shared/MainStyles";
import {Button, Divider, Modal} from "@material-ui/core";
import Accordion from "../../layout/Accordion";
import getMethodColor from "../../../utils/activity/GetMethodColor";
import animations from '../../../styles/shared/Animations.module.css'
export default function ActivityTemplate(props) {
    const [modal, setModal] = useState(false)

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)} className={animations.fadeIn}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{
                    backgroundColor: 'white',
                    width: '75%',
                    height: 'auto',
                    padding: '16px',
                    borderRadius: '8px'
                }}>
                    <div className={styles.informationContainer} key={'activity - ' + props.data.activity.id}>
                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: false})}>ID</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.id}</p>
                        </div>
                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: false})}>Full
                                path</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.path}</p>
                        </div>

                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>Package</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <div className={mainStyles.normalBorder}>
                            <pre className={mainStyles.primaryParagraph}
                                 style={getTertiaryColor({dark: false})}>{JSON.stringify(JSON.parse(props.data.activity.data_package), null, 2)}</pre>
                            </div>
                        </div>

                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>{props.lang.platform}</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.platform}</p>
                        </div>
                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>{props.lang.created}</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{new Date(props.data.activity.time_of_creation).toString()}</p>
                        </div>
                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>{props.lang.method}</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.request_method}</p>
                        </div>

                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph} style={getPrimaryColor({dark: false})}>URL</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.path}</p>
                        </div>
                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>{props.lang.ip}</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.ip_address}</p>
                        </div>
                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>{props.lang.browser}</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.browser_version}</p>
                        </div>

                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>{props.lang.engine}</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.browser_engine}</p>
                        </div>
                        <div className={styles.info_row}>
                            <p className={mainStyles.primaryParagraph}
                               style={getPrimaryColor({dark: false})}>{props.lang.userAgent}</p>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.browser_user_agent}</p>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <div>
            {renderModal()}
            <Button onClick={() => setModal(true)} style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                border: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                borderRadius: '8px',
                minHeight: '70px',
                color: '#262626',
                textTransform: 'none'
            }}>
                <div className={[mainStyles.rowContainer, mainStyles.maxWidth].join(' ')} style={{width: '75%'}}>
                    <div
                        className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                        style={getTertiaryColor({dark: false})}>
                        {props.data.activity.id}
                    </div>
                    <div className={[mainStyles.secondaryParagraph, mainStyles.displayInlineStart].join(' ')}
                         style={{
                             color: getMethodColor(props.data.activity.request_method.toUpperCase()),
                             fontWeight: '550'
                         }}>
                        {props.data.activity.request_method.toUpperCase()}
                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                         style={getTertiaryColor({dark: false})}>
                        {props.data.activity.path.indexOf('?') > -1 ? props.data.activity.path.substr(0, props.data.activity.path.indexOf('?')) : props.data.activity.path}
                    </div>
                    <div className={[mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                         style={getTertiaryColor({dark: false})}>
                        {(new Date(props.data.activity.time_of_creation)).toDateString()}
                    </div>
                </div>
            </Button>
        </div>
    )
}
ActivityTemplate.propTypes = {
    data: PropTypes.array,
    sorterMethod: PropTypes.string,
    pagesFetched: PropTypes.number,
    lang: PropTypes.object,
}