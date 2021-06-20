import React, {useEffect, useState} from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'

import NavigationProfile from './templates/NavigationProfile'
import NavigationButton from './templates/NavigationButton'
import NavigationPT from './locales/NavigationPT'
import NavigationApps from './templates/NavigationApps'
import {MenuRounded} from "@material-ui/icons";
import NavigationTabs from "./templates/NavigationTabs";


export default function Navigation(props) {
    const lang = NavigationPT
    const [modal, setModal] = useState(false)



    return (
        <>
            <div className={[styles.navigationContainer, props.loading ? styles.loading : ''].join(' ')}>
                <div className={styles.logoContainer} style={{color: '#555555', fontWeight: 600, fontSize: '.95rem'}}>
                    <NavigationTabs open={modal} setOpen={setModal} buttons={props.buttons}/>
                    <button className={styles.buttonContainer} onClick={() => setModal(true)}>
                        <MenuRounded/>
                    </button>
                    <img
                        style={{height: '37px'}}
                        src={props.logo} alt={'logo'}/>
                    {props.appName}


                </div>

                <div className={styles.logoContainer} style={{justifyContent: 'flex-end', gap: '8px'}}>
                    <NavigationApps lang={lang} buttons={props.apps}
                                    centered={props.profile !== null && props.profile !== undefined}/>

                    {props.profile !== null && props.profile !== undefined ?
                        <NavigationProfile
                            buttons={props.profileButtons}
                            profile={{
                                id: props.profile.id,
                                image: props.profile.image,
                                corporate_email: props.profile.corporate_email,
                                name: props.profile.name
                            }} reduced={props.reduced}
                            setReduced={props.setReduced} accessProfile={props.accessProfile}
                            lang={lang}/>
                        :
                        null
                    }
                </div>

            </div>
        </>
    )

}

Navigation.propTypes = {
    path: PropTypes.string,
    appName: PropTypes.string,
    logo: PropTypes.any,
    profile: PropTypes.object,
    accessProfile: PropTypes.object,
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string,
            linkProps: PropTypes.any
        })
    ),
    apps: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string
        })
    ),
    profileButtons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string,
            linkProps: PropTypes.any
        })
    )
}
