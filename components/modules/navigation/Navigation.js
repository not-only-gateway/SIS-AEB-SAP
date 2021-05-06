import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie/lib';
import {
    AccountTreeRounded,
    AddRounded,
    ExitToAppRounded,
    ExtensionRounded,
    MenuOpenRounded,
    SettingsRounded
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
                 width: props.reduced ? '75px' : '260px',
                 transition: '250ms ease-in-out',
                 backgroundColor: 'black',
                 color: 'white',
                 boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px'
             }}>

            <div className={props.reduced ? mainStyles.displayInlineCenter : mainStyles.displayInlineSpaced} style={{height: '33.333%',alignItems: 'flex-start', paddingTop: '4px'}}>
                <div>
                    {props.reduced ? null :
                        <img className={animations.fadeIn}
                             style={{color: 'white', width: '100px', transform: 'translateX(-20px)'}}
                             src={'/SIMPLE.png'} alt={'logo'}/>
                    }
                </div>
                <div style={{width: '65px',transform: props.reduced ? null : 'translateX(-5px)', maxHeight: '65px'}} className={mainStyles.displayInlineCenter}>
                    <NavigationButton
                        dark={props.dark} linkPath={null}
                        highlight={false} locale={props.locale}
                        reduced={props.reduced}
                        setToggle={props.setReduced}
                        initialValue={props.reduced}
                        icon={<MenuOpenRounded style={{
                            ...{
                                transition: '150ms ease-in-out',
                                transform: props.reduced ? 'rotate(180deg)' : null,
                                color: 'white',
                            }
                        }}/>}
                    />
                </div>
            </div>

            <div style={{
                display: 'grid',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
                justifyContent: 'center',
                height: '33.333%'
            }}>

                <NavigationButton
                    dark={props.dark} linkPath={'/'}
                    highlight={props.path === '/'} locale={props.locale}
                    label={lang.extensions} reduced={props.reduced}
                    icon={
                        <ExtensionRounded
                            style={{
                                ...{color: props.path === '/' ? '#0095ff' : 'white'},
                                ...props.reduced ? {margin: 'auto'} : null
                            }}/>
                    }
                />
                <NavigationButton
                    dark={props.dark} linkPath={'/structure'}
                    highlight={props.path === '/structure'} locale={props.locale}
                    label={lang.structure} reduced={props.reduced}
                    icon={<AccountTreeRounded
                        style={{
                            ...{color: props.path === '/structure' ? '#0095ff' : 'white'},
                            ...props.reduced ? {margin: 'auto'} : null
                        }}/>}
                />
                <NavigationButton
                    dark={props.dark} linkPath={'/settings'}
                    highlight={props.path === '/settings'} locale={props.locale}
                    label={lang.settings} reduced={props.reduced}
                    icon={<SettingsRounded
                        style={{
                            ...{color: props.path === '/settings' ? '#0095ff' : 'white'},
                            ...props.reduced ? {margin: 'auto'} : null
                        }}/>}
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
                                path: '/create'
                            },
                            accessProfile.canCreateAccessProfile ?
                                {
                                    label: lang.management,
                                    path: '/management',
                                }
                                :
                                null
                        ]}
                        icon={
                            <AddRounded
                                style={{
                                    ...{color: 'white'},
                                    ...props.reduced ? {margin: 'auto'} : null
                                }}/>
                        }
                    />
                    :
                    null

                }
            </div>
            <div className={mainStyles.displayInlineCenter} style={{height: '33.333%', alignItems: 'flex-end', paddingBottom: '4px'}}>
                {(profile !== null && (new Cookies()).get('jwt') !== undefined) ?
                <NavigationProfile dark={props.dark} profile={profile} reduced={props.reduced} setReduced={props.setReduced}
                                   locale={{profile: lang.profile, signout: lang.signout, signin: lang.signin}}/>
                    :
                    <NavigationButton
                        noMargin={true}
                        dark={props.dark} linkPath={'/signin'}
                        highlight={false} locale={props.locale}
                        label={lang.signout} reduced={props.reduced}
                        icon={<ExitToAppRounded
                            style={{
                                ...{color: 'white', transform: 'rotate(180deg)'},
                                ...props.reduced ? {margin: 'auto'} : null
                            }}/>}
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
    setReduced: PropTypes.func
}
