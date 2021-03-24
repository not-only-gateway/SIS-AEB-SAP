import React from 'react'
import { Avatar, Button } from "@material-ui/core";
import Cookies from "universal-cookie/lib";
import {
    ExitToAppRounded,
    GroupRounded,
    HistoryRounded,
    LockRounded,
    NoEncryptionRounded,
    RadioButtonCheckedRounded,
    SearchRounded,
    SettingsRounded,
    SupervisorAccountRounded
} from "@material-ui/icons";
import styles from '../../styles/bar/Bar.module.css'
import sharedStyles from '../../styles/Shared.module.css'
import {
    buttonStyle,
    iconStyle,
    logoStyle,
    secondaryButtonStyle
} from "../../styles/bar/BarMaterialStyles";
import en from "../../locales/bar/en";
import es from "../../locales/bar/es";
import pt from "../../locales/bar/pt";
import Link from 'next/link'
import {getLogo} from "../../config/Theme";

const cookies = new Cookies()

export default class NavBarComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            lang: en,
            profile: null,
            isAdmin: false
        }
    }

    componentDidMount() {
        this.setLanguage(this.props.locale)
        this.setState({
            isAdmin: localStorage.getItem('profile') !== null && JSON.parse(localStorage.getItem('profile')).is_administrator,
            profile: localStorage.getItem('profile')
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.locale !== this.props.locale)
            this.setLanguage(this.props.locale)
    }

    setLanguage = (value) => {
        switch (value){
            case 'en': {
                this.setState({
                    lang: en
                })
                break
            }
            case 'es': {
                this.setState({
                    lang: es
                })
                break
            }
            case 'pt': {
                this.setState({
                    lang: pt
                })
                break
            }
            default:{
                this.setState({
                    lang: en
                })
                break
            }
        }
    }

    render() {

        return (
            <div className={styles.nav_bar_container}>
                <div style={{gridRow: 1, alignItems: 'flex-start'}}>
                    <img style={logoStyle} src={getLogo(this.props.dark)} alt={"aeb"}/>
                </div>


                <div style={{gridRow: 2, display: 'grid', justifyContent: 'flex-start', alignContent: 'center'}}>
                    <div className={styles.button_container} style={{backgroundColor: this.props.path === '/' ? (this.props.dark ? '#303741' : 'white'): null}}>
                        <Link href={{ pathname: "/", locale: this.props.locale}}>
                            <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}} >
                                <GroupRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.extensions}
                            </Button>
                        </Link>
                    </div>
                    <div className={styles.button_container} style={{backgroundColor: this.props.path === '/settings' ? (this.props.dark ? '#303741' : 'white'): null}}>
                        <Link href={{ pathname: "/settings", locale: this.props.locale}}>
                            <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}}>
                                <SettingsRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.settings}
                            </Button>
                        </Link>
                    </div>

                    {cookies.get('jwt') !== undefined ?
                        <>
                            <div className={styles.button_container}>
                                <Link href={{ pathname: "/signin", locale: this.props.locale}}>
                                    <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}}>
                                        <ExitToAppRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.signout}
                                    </Button>
                                </Link>
                            </div>
                            <div className={styles.button_container} style={{borderRight: this.props.path === '/activity' ? '#39adf6 3px solid': null}}>
                                <Link href={{ pathname: "/activity", locale: this.props.locale}}>
                                    <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}}>
                                        <HistoryRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.activity}
                                    </Button>
                                </Link>
                            </div>
                        </>
                        :
                        null
                    }
                    {cookies.get('adm_token') === undefined?

                            <div className={styles.button_container}>
                                {this.state.isAdmin ?
                                    <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}}>
                                        <LockRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.supervisorRevalidate}
                                        {/*should render modal here  */}
                                    </Button>
                                    :
                                    null
                                }
                            </div>

                        :
                        <div className={styles.button_container}>
                            <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}} onClick={() => cookies.remove('adm_token')}>
                                <LockRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.supervisorExit}
                            </Button>
                        </div>
                    }
                </div>
                <div className={styles.bar_profile_container} style={{gridRow: 3}}>
                    { this.state.profile === null ?
                        <>
                            <Link href={{ pathname: "/signin", locale: this.props.locale}}>
                                <Button style={{color: (this.props.dark ? 'white' :  'black'), marginRight: '10px', textTransform: 'none'}}>{this.state.lang.signin}</Button>
                            </Link>

                        </>
                        :
                        (
                            <div>
                                <p style={{
                                    marginRight: '1vw',
                                    fontSize: '16px',
                                    lineBreak: 'auto',
                                    textAlign: 'right',
                                    textTransform: 'capitalize'
                                }}>{this.state.profile.name}</p>
                                <Avatar
                                    style={{height: '45px', marginRight: '1%', width: '45px'}}
                                    src={this.state.profile.pic}
                                    alt={this.state.profile.name}
                                />
                            </div>
                        )
                    }
                    <div style={{ display: 'flex', justifyContent:'space-evenly'}}>
                        <Button style={{...secondaryButtonStyle, ...{color: this.props.dark ? 'white' : 'black'}}}>{this.state.lang.help}</Button>
                        <Button style={{...secondaryButtonStyle, ...{color: this.props.dark ? 'white' : 'black'}}}>{this.state.lang.about}</Button>
                    </div>
                </div>
            </div>
        )
    }
}
