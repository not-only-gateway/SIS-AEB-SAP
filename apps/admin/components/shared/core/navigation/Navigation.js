import React, {useState} from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'
import NavigationProfile from './templates/NavigationProfile'
import NavigationPT from './locales/NavigationPT'
import NavigationApps from './templates/NavigationApps'
import {MenuRounded} from "@material-ui/icons";
import NavigationTabs from "./templates/NavigationTabs";
import Loading from "./modules/Loading";


export default function Navigation(props) {
    const lang = NavigationPT
    const [modal, setModal] = useState(false)

    return (
        <div className={styles.wrapper}>

            <div className={styles.header}>
                <Loading loading={props.loading}/>
                <div className={styles.logoContainer} style={{color: '#666666', fontWeight: "bold", fontFamily: 'Roboto'}}>

                   <div style={{width: '50px', display: 'flex', justifyContent: 'center'}}>
                       <button style={{display: props.buttons.length > 0 ? undefined : 'none'}}
                               className={styles.appsButtonContainer} onClick={() => setModal(!modal)}>
                           <MenuRounded/>
                       </button>
                   </div>
                    <img
                        style={{height: '35px'}}
                        src={props.logo} alt={'logo'}/>

                    {props.appName}
                </div>
                <div className={styles.logoContainer} style={{justifyContent: 'flex-end', gap: '8px'}}>
                    <NavigationApps lang={lang} buttons={props.apps}
                                    centered={props.profile !== null && props.profile !== undefined}/>

                    {props.profile !== null && props.profile !== undefined ?
                        <NavigationProfile
                            buttons={props.profileButtons}
                            profile={props.profile} reduced={props.reduced}
                            setReduced={props.setReduced}
                            lang={lang}/>
                        :
                        null
                    }
                </div>

            </div>

            <div className={styles.contentWrapper}>
                {props.buttons.length > 0 ?
                    <NavigationTabs open={modal} setOpen={setModal} buttons={props.buttons}
                                    path={props.path}
                                    logo={props.logo}/>
                    :
                    null
                }
                <div className={styles.children} style={{width: modal  ?'calc(100% - 270px)' :'calc(100% - 60px)'}}>
                {props.children}
                </div>
            </div>

        </div>
    )

}

Navigation.propTypes = {
    children: PropTypes.element,
    path: PropTypes.string,
    appName: PropTypes.string,
    logo: PropTypes.any,
    profile: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        image: PropTypes.string
    }),
    loading: PropTypes.bool,
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
