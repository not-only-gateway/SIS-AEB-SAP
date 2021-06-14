import React, {useEffect, useState} from 'react'
import {ExitToAppRounded, ExtensionRounded, TuneRounded, ViewQuiltRounded} from '@material-ui/icons';
import styles from '../../styles/Navigation.module.css'
import PropTypes from 'prop-types'

import getComponentLanguage from "../../utils/shared/GetComponentLanguage";
import animations from '../../styles/shared/Animations.module.css'
import NavigationButton from "./NavigationButton";


export default function Navigation(props) {

    const [lang, setLang] = useState(null)


    useEffect(() => {

        setLang(getComponentLanguage({locale: props.locale, component: 'navigation'}))

    }, [props.locale])

    if (lang !== null)
        return (
            <div className={styles.navigationContainer}>

                <div className={styles.logoContainer}>

                    <img className={animations.fadeIn}
                         style={{height: '75%', marginLeft: '16px'}}
                         src={'/dark.png'} alt={'logo'}/>

                </div>
                <div className={styles.mainButtonsContainer}>
                    <NavigationButton
                        linkPath={'/'}
                        highlight={props.path === '/'} locale={props.locale}
                        label={lang.extensions}
                        icon={
                            <ExtensionRounded/>
                        }
                    />
                    <NavigationButton
                        linkPath={'/units'}
                        highlight={props.path === '/units'} locale={props.locale}
                        label={lang.units}
                        icon={<ViewQuiltRounded/>}
                    />


                    <NavigationButton
                        linkPath={'/settings'}
                        highlight={props.path === '/settings'} locale={props.locale}
                        label={ lang.settings}

                        icon={
                            <TuneRounded/>
                        }
                    />


                </div>

                <div className={styles.redirectButtonContainer}>
                    <NavigationButton
                        asButton={true}
                        handleClick={() => window.open('https://google.com', '_blank')}
                        labelFirst={true}
                        locale={props.locale}
                        label={lang.admin}

                        icon={
                            <ExitToAppRounded/>
                        }
                    />
                </div>

            </div>
        )
    else
        return null
}

Navigation.propTypes = {
    locale: PropTypes.string,
    path: PropTypes.string,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func,
    query: PropTypes.object,
}
