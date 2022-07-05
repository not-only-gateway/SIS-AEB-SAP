import React, {useContext, useState} from "react";
import ProfileContext from "./ProfileContext";

import styles from './styles/Profile.module.css'
import {Avatar} from "@material-ui/core";
import DraftList from "./components/lists/DraftList";

export default function Profile() {
    const profile = useContext(ProfileContext)
    const [open, setOpen] = useState(0)
    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <Avatar style={{height: '85px', width: '85px'}} src={profile.image}/>
                <div className={styles.headerLabels}>
                    {profile.name}
                    <div className={styles.secondaryLabel}>
                        {profile.email}
                    </div>
                </div>
            </div>
            <div className={styles.pageContent}>

                <DraftList/>
            </div>
        </div>
    )
}