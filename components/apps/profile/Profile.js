import React, {useContext, useState} from "react";
import ProfileContext from "./ProfileContext";
import VerticalTabs from "../../core/navigation/tabs/VerticalTabs";
import styles from './styles/Profile.module.css'
import {Avatar} from "@material-ui/core";
import Information from "./components/Information";
import Privileges from "./components/Privileges";
import DraftList from "./components/lists/DraftList";
import Tab from "../../core/navigation/tabs/Tab";

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
                <VerticalTabs
                    open={open}
                    setOpen={setOpen}
                    className={styles.wrapper}
                    styles={{display: 'flex', justifyContent: 'stretch', alignContent: 'unset'}}
                >
                    <Tab label={'Dados'} className={styles.tabWrapper}>
                        <Information/>
                    </Tab>
                    <Tab label={'Privilégios'} className={styles.tabWrapper}>
                        <Privileges/>
                    </Tab>
                    <Tab label={'Rascunhos'} className={styles.tabWrapper}>
                        <DraftList/>
                    </Tab>

                </VerticalTabs>
            </div>
        </div>
    )
}