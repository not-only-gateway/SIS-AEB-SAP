import React, {useEffect, useState} from 'react'
import {Avatar, Divider} from '@material-ui/core';
import Cookies from 'universal-cookie/lib';
import {
    AccountTreeRounded,
    ArrowForwardRounded,
    ExitToAppRounded,
    ExtensionRounded, MenuOpenRounded,
    SettingsRounded,
    SupervisorAccountRounded
} from '@material-ui/icons';
import styles from '../../styles/shared/Bar.module.css'
import en from '../../locales/navigation/NavigationEN';
import {getLogo} from '../../utils/shared/Theme';
import PropTypes from 'prop-types'
import {readAccessProfile, readProfile} from "../../utils/shared/IndexedDB";
import mainStyles from '../../styles/shared/Main.module.css'
import {
    getBorder,
    getBoxShadow,
    getIconStyle,
    getSecondaryBackground,
    getSecondaryColor,
    getTertiaryColor
} from "../../styles/shared/MainStyles";
import NavigationButtonLayout from "./NavigationButtonLayout";
import getComponentLanguage from "../../utils/shared/GetLanguage";
import ImageHost from "../../utils/shared/ImageHost";

const cookies = new Cookies()

export default function Navigation(props) {

    const [lang, setLang] = useState(en)
    const [profile, setProfile] = useState(null)
    const [accessProfile, setAccessProfile] = useState(null)
    // const [props.reduced, setprops.Reduced] = useState(true)

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'navigation'}))
        if (profile === null)
            readProfile().then(res => setProfile(res))
        if (accessProfile === null)
            readAccessProfile().then(res => setAccessProfile(res))

    }, [props.locale])


    return (

        <div className={[styles.navigationContent, styles.navigationContainer].join(' ')}
             style={{
                 ...{
                     width: props.reduced ? 'fit-content' : '15%',
                     transition: '.3s',
                     borderRadius: '0px 8px 8px 0px',
	             padding: props.reduced ? '0px 5px 0px 5px ' : null
                 },
                 ...getSecondaryBackground({dark: props.dark}),
                 // ...getBoxShadow({dark: props.dark}),
                 ...getBorder({dark: props.dark})
             }}>
            <div className={mainStyles.displayInlineSpaced} style={{width: props.reduced ? 'fit-content' : '87%', justifyItems: 'center'}}>
                {props.reduced ? null :
                    <img style={{height: '75px'}} src={getLogo(props.dark)} alt={'aeb'}/>
                }
                <NavigationButtonLayout
                    dark={props.dark} linkPath={null}
                    highlight={false} locale={props.locale}
                    reduced={props.reduced}
                    setToggle={props.setReduced}
                    initialValue={props.reduced}
                    icon={<MenuOpenRounded style={{
                        ...getIconStyle({dark: props.dark, highlight: !props.reduced}), ...{
                            transition: '.3s',
                            transform: props.reduced ? 'rotate(180deg)' : null,
                            margin: 'auto'
                        }
                    }}/>}
                />
            </div>
            <div style={{display: 'grid', justifyContent: 'flex-start', alignContent: 'center'}}>
                {accessProfile !== null && accessProfile.canViewActivityLog ?
                    <NavigationButtonLayout
                        dark={props.dark} linkPath={'/menu'}
                        highlight={props.path === '/menu'} locale={props.locale}
                        label={lang.menu} reduced={props.reduced}
                        icon={<SupervisorAccountRounded
                            style={{...getIconStyle({dark: props.dark, highlight: props.path === '/menu'}), ... props.reduced ? {margin:  'auto' } : null}}/>}
                    />
                    : null}
                <Divider orientation={'horizontal'} style={{width: '100%'}}/>
                <NavigationButtonLayout
                    dark={props.dark} linkPath={'/'}
                    highlight={props.path === '/'} locale={props.locale}
                    label={lang.extensions} reduced={props.reduced}
                    icon={<ExtensionRounded
                        style={{...getIconStyle({dark: props.dark, highlight: props.path === '/'}), ... props.reduced ? {margin:  'auto' } : null}}/>}
                />

                <NavigationButtonLayout
                    dark={props.dark} linkPath={'/structure'}
                    highlight={props.path === '/structure'} locale={props.locale}
                    label={lang.structure} reduced={props.reduced}
                    icon={<AccountTreeRounded
				style={{...getIconStyle({dark: props.dark, highlight: props.path === '/structure'}), ... props.reduced ? {margin:  'auto' } : null}}/>}
                />
                <Divider orientation={'horizontal'} style={{width: '100%'}}/>
                <NavigationButtonLayout
                    dark={props.dark} linkPath={'/settings'}
                    highlight={props.path === '/settings'} locale={props.locale}
                    label={lang.settings} reduced={props.reduced}
                    icon={<SettingsRounded
                        style={{...getIconStyle({dark: props.dark, highlight: props.path === '/settings'}), ... props.reduced ? {margin:  'auto' } : null}}/>}
                />

                {cookies.get('jwt') !== undefined ?
                    <NavigationButtonLayout
                        dark={props.dark} linkPath={'/signin'}
                        highlight={false} locale={props.locale}
                        label={profile === null ? lang.signin : lang.signout} reduced={props.reduced}
                        icon={<ExitToAppRounded
                            style={{...{transform: profile === null ? null : 'rotate(180deg)', margin: props.reduced ? 'auto' : null}, ...getIconStyle({dark: props.dark})}}/>}
                    />
                    :
                    null
                }
            </div>
            <div style={{transform: 'translateY(130%)'}}>
                {profile === null ?
                    null
                    :
                    <NavigationButtonLayout
                        dark={props.dark} linkPath={'/person'}
                        highlight={true} locale={props.locale}
                        label={
                            <>
                                <div className={[mainStyles.overflowEllipsis, mainStyles.secondaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                     style={getSecondaryColor({dark: props.dark})}>
                                    {profile.name}
                                </div>
                                <div className={[mainStyles.overflowEllipsis, mainStyles.tertiaryParagraph, mainStyles.displayInlineStart].join(' ')}
                                     style={getTertiaryColor({dark: props.dark})}>
                                    {profile.corporateEmail}
                                </div>
                            </>
                        } reduced={props.reduced} linkQuery={{id: profile.id}}
                        icon={
                            <Avatar src={ImageHost() + profile.pic} style={{
                                ...{
                                    width: '50px',
                                    height: '50px',
                                    marginLeft: props.reduced ? null : '7px',
                                    marginRight: props.reduced ? null : '10px'
                                }, ...getBoxShadow({dark: props.dark})
                            }}/>
                        }
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
