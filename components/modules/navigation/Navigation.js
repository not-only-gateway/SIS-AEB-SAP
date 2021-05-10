import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie/lib';
import {
    AddRounded,
    ExitToApp,
    ExitToAppRounded,
    ExtensionRounded,
    MenuOpenRounded,
    SettingsRounded,
    ViewQuiltRounded
} from '@material-ui/icons';
import styles from '../../../styles/shared/Bar.module.css'
import PropTypes from 'prop-types'
import {readAccessProfile, readProfile} from "../../../utils/shared/IndexedDB";
import mainStyles from '../../../styles/shared/Main.module.css'

import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import NavigationProfile from "../../elements/navigation/NavigationProfile";
import animations from '../../../styles/shared/Animations.module.css'
import NavigationButton from "../../layout/NavigationButton";
import NavigationDropDownButton from "../../layout/NavigationDropDownButton";
import NavigationEN from "../../../packages/component locales/navigation/NavigationEN";
import {Button} from "@material-ui/core";


export default function Navigation(props) {

    const [lang, setLang] = useState(NavigationEN)
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'navigation'}))
        if (profile === null)
            readProfile().then(res => setProfile(res))
        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))

    }, [props.locale])


    return (

        <div className={[styles.navigationContainer, animations.slideInLeftAnimation].join(' ')}
             style={{
                 width: props.reduced ? '75px' : '250px',
                 transition: '250ms ease-in-out',
                 backgroundColor: '#222228',
                 boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
             }}>

            <div
                style={{
                    height: '66.666%',
                    width: '100%',
                    display: 'grid',
                    alignContent: 'flex-start',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    justifyItems: 'center',
                    gap: '4px'
                }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: props.reduced ? 'center' : 'space-between',
                    justifyItems: 'center',
                    alignItems: 'center',
                    height: '65px',
                    marginBottom: '32px'
                }}>
                    {props.reduced ? null :
                        <img className={animations.fadeIn}
                             style={{width: '50%', marginLeft: '16px'}}
                             src={'/dark.png'} alt={'logo'}/>
                    }

                    <Button onClick={() => props.setReduced(!props.reduced)}
                            style={{width: '55px', height: '55px', borderRadius: '8px', padding: 'unset'}}>
                        <MenuOpenRounded style={{
                            color: '#f2f2f2',
                            transform: props.reduced ? 'rotate(180deg)' : null,
                        }}/>
                    </Button>
                </div>
                <h5 style={{
                    marginRight: 'auto',
                    transform: 'translateX(20px)',
                    display: props.reduced ? 'none' : 'unset',
                    marginBottom: '16px',
                    color: '#a6a6a9'
                }}>
                    Navigation
                </h5>
                <NavigationButton
                    dark={props.dark} linkPath={'/'}
                    highlight={props.path === '/'} locale={props.locale}
                    label={lang.extensions} reduced={props.reduced}
                    icon={
                        <ExtensionRounded/>
                    }
                />
                <NavigationButton
                    dark={props.dark} linkPath={'/units'}
                    highlight={props.path === '/units'} locale={props.locale}
                    label={lang.units} reduced={props.reduced}
                    icon={<ViewQuiltRounded/>}
                />
                <NavigationButton
                    dark={props.dark} linkPath={'/settings'}
                    highlight={props.path === '/settings'} locale={props.locale}
                    label={lang.settings} reduced={props.reduced}
                    icon={
                        <SettingsRounded/>
                    }
                />

                {accessProfile !== null && (accessProfile.canManageStructure) ?
                    <NavigationDropDownButton
                        locale={props.locale}
                        label={lang.more}
                        reduced={props.reduced}
                        setReduced={props.setReduced}
                        key={'more-options'}
                        options={[
                            {
                                label: lang.createPerson,
                                path: '/create',
                                highlight: props.path === '/create'
                            },
                            accessProfile.canCreateAccessProfile ?
                                {
                                    label: lang.management,
                                    path: '/management',
                                    highlight: props.path === '/management'
                                }
                                :
                                null
                        ]}
                        icon={
                            <AddRounded/>
                        }
                    />
                    :
                    null

                }
                {profile !== null && (new Cookies()).get('jwt') !== undefined ?
                    <NavigationButton
                    dark={props.dark} linkPath={'/authenticate'}
                    highlight={false} locale={props.locale}
                    label={lang.signout} reduced={props.reduced}
                    icon={
                    <ExitToApp style={{transform: 'rotate(180deg)'}}/>
                }
                    />
                    : null
                }
            </div>

            <div className={mainStyles.displayInlineCenter}
                 style={{height: '33.333%', alignItems: 'flex-end', paddingBottom: '4px'}}>
                {(profile !== null && (new Cookies()).get('jwt') !== undefined) ?
                    <NavigationProfile dark={props.dark} profile={profile} reduced={props.reduced}
                                       setReduced={props.setReduced}
                                       locale={{profile: lang.profile, signout: lang.signout, signin: lang.signin}}/>
                    :
                    <NavigationButton
                        noMargin={true}
                        dark={props.dark} linkPath={'/authenticate'}
                        highlight={false} locale={props.locale}
                        label={lang.signin} reduced={props.reduced}
                        icon={<ExitToAppRounded style={{transform: 'rotate(180deg)'}}/>}
                    />
                }
            </div>
        </div>
    )
}

Navigation.propTypes = {
    locale: PropTypes.string,
    dark: PropTypes.bool,
    path: PropTypes.string,
    reduced: PropTypes.bool,
    setReduced: PropTypes.func,
    query: PropTypes.object
}
