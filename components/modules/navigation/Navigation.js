import React, {useEffect, useState} from 'react'
import Cookies from 'universal-cookie/lib';
import {
    AccountTreeRounded,
    AddRounded,
    ExitToAppRounded,
    ExtensionRounded,
    MenuOpenRounded,
    SettingsRounded, ViewQuiltRounded
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
                 width: props.reduced ? '75px' : '260px',
                 transition: '250ms ease-in-out',
                 backgroundColor: 'white',
                 boxShadow: 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px'
             }}>

            <div
                style={{
                    height: '33.333%',
                    width: '100%',

                    display: 'flex',
                    alignItems: 'flex-start',


                }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: props.reduced ? 'center' : 'space-between',
                    justifyItems: 'center',
                    alignItems: 'center',
                    height: '65px'
                }}>
                    {props.reduced ? null :
                        <img className={animations.fadeIn}
                             style={{width: '50%', marginLeft: '16px'}}
                             src={'/newnew.png'} alt={'logo'}/>
                    }

                    <Button onClick={() => props.setReduced(!props.reduced)}>
                        <MenuOpenRounded style={{
                            color: '#555555',
                            transform: props.reduced ? 'rotate(180deg)' : null,
                        }}/>
                    </Button>
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
                            <AddRounded/>
                        }
                    />
                    :
                    null

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
                        dark={props.dark} linkPath={'/signin'}
                        highlight={false} locale={props.locale}
                        label={lang.signin} reduced={props.reduced}
                        icon={<ExitToAppRounded/>}
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
