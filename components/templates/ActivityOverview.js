import React, {useEffect, useState} from "react";
import styles from '../../styles/Activity.module.css'
import Graph from "../modules/Graph";
import shared from '../../styles/shared/Shared.module.css'


export default function ActivityOverview() {
    const [activeSessions, setActiveSessions] = useState([])

    useEffect(() => {

    }, [])

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
