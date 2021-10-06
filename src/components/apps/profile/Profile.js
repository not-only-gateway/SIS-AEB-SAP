import {useContext} from "react";
import ProfileContext from "../../ProfileContext";
import Tabs from "../../core/misc/tabs/Tabs";
import styles from './styles/Profile.module.css'
import Privileges from "./components/Privileges";
import Drafts from "./components/Drafts";
import Information from "./components/Information";
import {Avatar} from "@material-ui/core";
export default function Profile(){
    const profile = useContext(ProfileContext)

    return(
        <>
            <Tabs buttons={[
                {
                    label: 'Dados',
                    children: <Information/>
                },
                {
                    label: 'Privilégios',
                    children: <Privileges/>
                },
                {
                    label: 'Rascunhos',
                    children: <Drafts/>
                },
            ]}>
                <div className={styles.header}>
                    <Avatar style={{height: '100%'}} src={profile.image}/>
                    <div className={styles.headerLabels}>
                        {profile.name}
                        <div>
                            {profile.email}
                        </div>
                    </div>
                </div>
            </Tabs>
        </>
    )
}