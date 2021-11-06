import React, {useContext} from "react";
import ProfileContext from "./ProfileContext";
import VerticalTabs from "../../core/navigation/tabs/VerticalTabs";
import styles from './styles/Profile.module.css'
import {Avatar} from "@material-ui/core";
import Information from "./components/Information";
import Privileges from "./components/Privileges";
import DraftList from "./components/lists/DraftList";
import Tab from "../../core/navigation/tabs/Tab";
import InfrastructureForm from "../sap/components/forms/InfrastructureForm";
import InfrastructureComponentsList from "../sap/components/lists/InfrastructureComponentsList";

export default function Profile() {
    const profile = useContext(ProfileContext)

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