import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from "../../../styles/Activity.module.css";
import mainStyles from "../../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../../styles/shared/MainStyles";
import {Button, Divider, Modal} from "@material-ui/core";
import getMethodColor from "../../../utils/activity/GetMethodColor";
import animations from '../../../styles/shared/Animations.module.css'

export default function ActivityTemplate(props) {
    const [modal, setModal] = useState(false)

    const downloadFile = async () => {
        const data = props.data.activity.data_package; // I am assuming that "this.state.myData"
                                     // is an object and I wrote it to file as
                                     // json
        const fileName = "file";
        const json = JSON.stringify(data);
        const blob = new Blob([json],{type:'application/json'});
        const href = await URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = fileName + ".json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)} className={animations.fadeIn}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{
                    backgroundColor: 'white',
                    width: '75%',
                    height: '75%',
                    padding: '16px',
                    borderRadius: '8px',
                    overflow: "auto"
                }}>
                    <div className={styles.informationContainer} key={'activity - ' + props.data.activity.id}>
                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>ID</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.id}</p>
                        </div>
                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>Full
                                path</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.path}</p>
                        </div>

                        <div className={styles.info_row} style={{overflow: 'hidden'}}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>Package</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>


                                <Button onClick={() => downloadFile()}>Download</Button>

                        </div>

                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>{props.lang.platform}</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.platform}</p>
                        </div>
                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>{props.lang.created}</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{new Date(props.data.activity.time_of_creation).toString()}</p>
                        </div>
                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>{props.lang.method}</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.request_method}</p>
                        </div>

                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>URL</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.activity.path}</p>
                        </div>
                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>{props.lang.ip}</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.ip_address}</p>
                        </div>
                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>{props.lang.browser}</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.browser_version}</p>
                        </div>

                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>{props.lang.engine}</h4>
                            <Divider orientation={'horizontal'}
                                     style={{width: '2vw', marginLeft: '10px', marginRight: '10px'}}/>
                            <p className={mainStyles.tertiaryParagraph}
                               style={getTertiaryColor({dark: false})}>{props.data.access_log.browser_engine}</p>
                        </div>
                        <div className={styles.info_row}>
                            <h4 style={{marginBottom: '16px', marginTop: '16px'}}>{props.lang.userAgent}</h4>
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