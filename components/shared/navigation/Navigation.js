import React, {useEffect, useState} from 'react'
import {Button} from '@material-ui/core';
import Cookies from 'universal-cookie/lib';
import {ExitToAppRounded, ExtensionRounded, SettingsRounded, SupervisorAccountRounded} from '@material-ui/icons';
import styles from '../../../styles/components/navigation/Bar.module.css'
import {
    buttonStyle,
    iconStyle,
    logoStyle,
    secondaryButtonStyle
} from '../../../styles/components/navigation/BarMaterialStyles';
import en from '../../../locales/navigation/NavigationEN';
import es from '../../../locales/navigation/NavigationES';
import pt from '../../../locales/navigation/NavigationPT';
import Link from 'next/link'
import {getLogo} from '../../../utils/shared/Theme';
import SimpleProfileCardLayout from '../layout/SimpleProfileCardLayout';
import PropTypes from 'prop-types'
import {readAccessProfile, readProfile} from "../../../utils/shared/IndexedDB";


const cookies = new Cookies()

export default function Navigation(props) {

    const [lang, setLang] = useState(en)
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {
        setLanguage(props.locale)
        if (profile === null)
            readProfile().then(res => setProfile(res))
        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))

    }, [props.locale])

    function setLanguage(locale) {
        switch (locale) {
            case 'en': {
                setLang(en)
                break
            }
            case 'es': {
                setLang(es)
                break
            }
            case 'pt': {
                setLang(pt)
                break
            }
            default: {
                break
            }
        }
    }

    return (
        <div className={styles.nav_bar_container}>
            <div style={{gridRow: 1, alignItems: 'flex-start'}}>
                <img style={logoStyle} src={getLogo(props.dark)} alt={'aeb'}/>
            </div>

            <div style={{gridRow: 2, display: 'grid', justifyContent: 'flex-start', alignContent: 'center'}}>
                {accessProfile !== null && accessProfile.canViewActivityLog ?
                    <div className={styles.button_container}
                         style={{backgroundColor: props.path === '/management' ? (props.dark ? '#303741' : 'white') : null}}>
                        <Link href={{pathname: '/management', locale: props.locale}}>
                            <Button
                                style={{...buttonStyle, ...{color: props.path === '/management' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                                <SupervisorAccountRounded
                                    style={{...iconStyle, ...{color: props.path === '/management' ? '#39adf6' : (!props.dark ? '#777777' : '#ededed')}}}/>
                                {lang.management}
                            </Button>
                        </Link>
                    </div> : null}

                <div className={styles.button_container}
                     style={{backgroundColor: props.path === '/' ? (props.dark ? '#303741' : 'white') : null}}>

                    <Link href={{pathname: '/', locale: props.locale}}>
                        <Button
                            style={{...buttonStyle, ...{color: props.path === '/' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                            <ExtensionRounded
                                style={{...iconStyle, ...{color: props.path === '/' ? '#39adf6' : (!props.dark ? '#777777' : '#ededed')}}}/>
                            {lang.extensions}
                        </Button>
                    </Link>
                </div>
                <div className={styles.button_container}
                     style={{backgroundColor: props.path === '/settings' ? (props.dark ? '#303741' : 'white') : null}}>
                    <Link href={{pathname: '/settings', locale: props.locale}}>
                        <Button
                            style={{...buttonStyle, ...{color: props.path === '/settings' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                            <SettingsRounded
                                style={{...iconStyle, ...{color: props.path === '/settings' ? '#39adf6' : (!props.dark ? '#777777' : '#ededed')}}}/>
                            {lang.settings}
                        </Button>
                    </Link>
                </div>


                {cookies.get('jwt') !== undefined ?
                    <>
                        <div className={styles.button_container}>
                            <Link href={{pathname: '/signin', locale: props.locale}}>
                                <Button style={{...buttonStyle, ...{color: props.dark ? 'white' : '#111111'}}}>
                                    <ExitToAppRounded
                                        style={{...iconStyle, ...{color: !props.dark ? '#777777' : '#ededed'}}}/> {lang.signout}
                                </Button>
                            </Link>
                        </div>

                    </>
                    :
                    null
                }
            </div>
            <div className={styles.bar_profile_container} style={{gridRow: 3}}>
                {profile === null ?
                    <>
                        <Link href={{pathname: '/signin', locale: props.locale}}>
                            <Button style={{
                                color: (props.dark ? 'white' : 'black'),
                                marginRight: '10px',
                                textTransform: 'none'
                            }}>{lang.signin}</Button>
                        </Link>
                    </>
                    :
                    (
                        <Link href={{pathname: '/person', locale: props.locale, query: {id: profile.id}}}>
                            <a>
                                <SimpleProfileCardLayout name={profile.name} pic={profile.pic} dark={props.dark}/>
                            </a>
                        </Link>
                    )
                }
                <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                    <Button
                        style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : 'black'}}}>{lang.help}</Button>
                    <Button
                        style={{...secondaryButtonStyle, ...{color: props.dark ? 'white' : 'black'}}}>{lang.about}</Button>
                </div>
            </div>
        </div>
    )
}

Navigation.propTypes = {
    locale: PropTypes.string,
    dark: PropTypes.bool,
    path: PropTypes.string,
}