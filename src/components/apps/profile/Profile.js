import {useContext} from "react";
import ProfileContext from "./ProfileContext";
import VerticalTabs from "../../core/navigation/tabs/VerticalTabs";
import styles from './styles/Profile.module.css'
import {Avatar} from "@material-ui/core";
import Information from "./components/Information";
import Privileges from "./components/Privileges";
import Drafts from "./components/Drafts";
export default function Profile(){
    const profile = useContext(ProfileContext)

    return(
        <>
            <div className={styles.header}>
                <Avatar style={{height: '85px', width: '85px'}} src={profile.image}/>
                <div className={styles.headerLabels}>
                    {profile.name}
                    <div className={styles.secondaryLabel}>
                        {profile.email}
                    </div>
                </div>
            </div>
            <VerticalTabs classes={[
                {
                    label:'Dados',
                    buttons: [
                        {
                            label: 'Dados',
                            children: <Information/>
                        },
                        {
                            label: 'Privilégios',
                            children: <Privileges/>
                        },

                    ]
                },
                {
                    label: 'Outros',
                    buttons: [{
                        label: 'Rascunhos',
                        children: <Drafts/>
                    }]
                }
            ]}/>

        </>
    )
}