import React, {useEffect, useState} from "react";

import Graph from "../modules/Graph";
import shared from '../../styles/shared/Shared.module.css'
import styles from '../../styles/SettingsActivity.module.css'

import PropTypes from "prop-types";
import ActivityOverviewPT from "../../packages/locales/activity/ActivityOverviewPT";

export default function ActivityOverview(props) {
    const [activeSessions, setActiveSessions] = useState([])
    const lang = ActivityOverviewPT

    return (
        <div className={styles.overviewContainer}>
            <div style={{gridRow: 1, width: '100%'}}>
                <Graph values={[]}/>
            </div>
            <div className={styles.overviewListContainer}>
                {activeSessions.length > 0 ?
                    activeSessions.map(session => (
                        <div className={shared.rowContainer}>
                            {session.ip}
                        </div>
                    ))
                    :
                    <div style={{width: '100%'}}>
                        <h5
                            style={{textAlign: 'center', color: '#555555'}}>{lang.nothingFound}</h5>
                    </div>
                }
            </div>
        </div>
    )

}
