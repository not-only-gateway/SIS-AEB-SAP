import {useContext} from "react";
import ProfileContext from "../../ProfileContext";

export default function Profile(){
    const profile = useContext(ProfileContext)

    return(
        <>
            {/*<Tabs buttons={[*/}
            {/*    {*/}
            {/*        label: 'Dados',*/}
            {/*        children: <Information/>*/}
            {/*    },*/}
            {/*    {*/}
            {/*        label: 'Privilégios',*/}
            {/*        children: <Privileges/>*/}
            {/*    },*/}
            {/*    {*/}
            {/*        label: 'Rascunhos',*/}
            {/*        children: <Drafts/>*/}
            {/*    },*/}
            {/*]}>*/}
            {/*    <div className={styles.header}>*/}
            {/*        <Avatar style={{height: '100%'}} src={profile.image}/>*/}
            {/*        <div className={styles.headerLabels}>*/}
            {/*            {profile.name}*/}
            {/*            <div>*/}
            {/*                {profile.email}*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</Tabs>*/}
        </>
    )
}