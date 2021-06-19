import React, {useState} from 'react';
import styles from './styles/Navigation.module.css'
import PropTypes from 'prop-types'

import NavigationProfile from './templates/NavigationProfile'
import NavigationButton from './templates/NavigationButton'
import NavigationPT from './locales/NavigationPT'
import NavigationApps from './templates/NavigationApps'


export default function Navigation(props) {
    const lang = NavigationPT

    return (
        <div className={[styles.navigationContainer, props.loading ? styles.loading : ''].join(' ')}>
            <div className={styles.logoContainer} style={{color: '#555555', fontWeight: 575}}>

                <img
                    style={{height: '50px'}}
                    src={props.logo} alt={'logo'}/>
                {props.appName}


            </div>
            <div className={styles.logoContainer} style={{justifyContent: 'space-between', paddingLeft: '10%', paddingRight: '10%'}}>

                {props.buttons.map((button, index) => (
                    <NavigationButton
                        buttonKey={index}
                        linkPath={button.link}
                        linkQuery={button.linkProps}
                        highlight={props.path === button.link}
                        icon={
                            button.icon
                        }
                        label={button.label}
                    />
                    // </React.fragment>
                ))}
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
