import React, {useEffect, useState} from 'react'
import {Button} from '@material-ui/core';
import Cookies from 'universal-cookie/lib';
import {ExitToAppRounded, GroupRounded, HistoryRounded, SettingsRounded} from '@material-ui/icons';
import styles from '../../../styles/bar/Bar.module.css'
import {buttonStyle, iconStyle, logoStyle, secondaryButtonStyle} from '../../../styles/bar/BarMaterialStyles';
import en from '../../../locales/navigation/NavigationEN';
import es from '../../../locales/navigation/NavigationES';
import pt from '../../../locales/navigation/NavigationPT';
import Link from 'next/link'
import {getLogo} from '../../../utils/Theme';
import SimpleProfileCard from '../SimpleProfileCard';
import PropTypes from 'prop-types'

const cookies = new Cookies()

export default function Navigation(props) {

    const [lang, setLang] = useState(en)
    const [profile, setProfile] = useState(null)

    useEffect(() => {
        setLanguage(props.locale)
        if (profile === null) {
            const localProfile = localStorage.getItem('profile') !== null ? JSON.parse(localStorage.getItem('profile')) : null
            if (localProfile !== null)
                setProfile(localProfile)

        }
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
                <div className={styles.button_container}
                     style={{backgroundColor: props.path === '/' ? (props.dark ? '#303741' : 'white') : null}}>
                    <Link href={{pathname: '/', locale: props.locale}}>
                        <Button style={{...buttonStyle,...{color: props.path === '/' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                            <GroupRounded
                                style={
                                    {
                                        ...iconStyle,
                                        ...{
                                            color: props.path === '/' ? '#39adf6' : (!props.dark ? '#777777' : '#ededed')
                                        }
                                    }
                                }/> {lang.extensions}
                        </Button>
                    </Link>
                </div>
                <div className={styles.button_container}
                     style={{backgroundColor: props.path === '/settings' ? (props.dark ? '#303741' : 'white') : null}}>
                    <Link href={{pathname: '/settings', locale: props.locale}}>
                        <Button
                            style={{...buttonStyle, ...{color: props.path === '/settings' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>
                            <SettingsRounded
                                style={
                                    {
                                        ...iconStyle,
                                        ...{
                                            color: props.path === '/settings' ? '#39adf6' : (!props.dark ? '#777777' : '#ededed')
                                        }
                                    }
                                }/> {lang.settings}
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

                        <div className={styles.button_container} style={{backgroundColor: props.path === '/activity' ? (props.dark ? '#303741' : 'white') : null}}>
                            <Link href={{pathname: '/activity', locale: props.locale}} >
                                <Button
                                    style={{...buttonStyle, ...{color: props.path === '/activity' ? '#39adf6' : (props.dark ? 'white' : '#111111')}}}>

                                    <HistoryRounded
                                        style={
                                            {
                                                ...iconStyle,
                                                ...{
                                                    color: props.path === '/activity' ? '#39adf6' : (!props.dark ? '#777777' : '#ededed')
                                                }
                                            }
                                        }/> {lang.activity}
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
                                <SimpleProfileCard name={profile.name} pic={profile.pic} dark={props.dark}/>
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