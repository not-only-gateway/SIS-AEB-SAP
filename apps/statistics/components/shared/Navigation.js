import React from 'react'
import Cookies from 'universal-cookie/lib';
import {AppsRounded, ExitToApp, HomeRounded, MenuOpenRounded, PersonAddRounded, TuneRounded} from '@material-ui/icons';
import styles from '../../styles/Navigation.module.css'
import PropTypes from 'prop-types'
// import mainStyles from '../../styles/shared/Main.module.css'
import NavigationProfile from "./NavigationProfile";
// import animations from '../../styles/shared/Animations.module.css'
import NavigationButton from "./NavigationButton";
import NavigationPT from "../../packages/locales/others/NavigationPT";
import NavigationApps from "./NavigationApps";


export default function Navigation(props) {

    const lang = NavigationPT

    return (
        <div className={[styles.navigationContainer, props.loading ? styles.loading : ''].join(' ')}>
            <div className={styles.container}>

                <img
                    style={{height: '50px'}}
                    src={'/dark.png'} alt={'logo'}/>
                {lang.statistics}
            </div>


            <div className={styles.container} style={{justifyContent: "flex-end", gap: '16px'}}>
                <div style={{width: 'fit-content', height: '100%'}}>
                    <NavigationButton
                        linkPath={'/'}
                        highlight={props.path === '/'}
                        reduced={props.reduced}
                        icon={
                            <HomeRounded/>
                        }
                    />
                </div>
                <NavigationApps lang={lang}/>
                <NavigationProfile
                    profile={{
                        id: 1,
                        image: null,
                        name: 'fsafdddddddddddddddddddddddddsssssssssssssssssssss'
                    }}
                    accessProfile={props.accessProfile}
                    lang={lang}/>
                {/*{(props.profile !== null && (new Cookies()).get('jwt') !== undefined) ?*/}
                {/*    <NavigationProfile dark={props.dark} profile={{*/}
                {/*        id: props.profile.id,*/}
                {/*        image: props.profile.image,*/}
                {/*        corporate_email: props.profile.corporate_email,*/}
                {/*        name: props.profile.name*/}
                {/*    }} reduced={props.reduced}*/}
                {/*                       setReduced={props.setReduced} accessProfile={props.accessProfile}*/}
                {/*                       locale={{*/}
                {/*                           profile: lang.profile,*/}
                {/*                           signout: lang.signout,*/}
                {/*                           signin: lang.signin*/}
                {/*                       }}/>*/}
                {/*    :*/}
                {/*    null*/}
                {/*}*/}
            </div>

        </div>
    )

}

Navigation.propTypes = {
    path: PropTypes.string,
    query: PropTypes.object,
    profile: PropTypes.object,
    accessProfile: PropTypes.object,
    lang: PropTypes.object
}
