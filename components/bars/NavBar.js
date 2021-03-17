import React from 'react'
import {Button} from "@material-ui/core";
import Cookies from "universal-cookie/lib";
import {
    ExitToAppRounded, GroupRounded,
    SettingsRounded
} from "@material-ui/icons";
import styles from '../../styles/bar/Bar.module.css'
import sharedStyles from '../../styles/Shared.module.css'
import {buttonStyle, iconStyle} from "../../styles/bar/BarMaterialStyles";
import en from "../../locales/bar/en";
import es from "../../locales/bar/es";
import pt from "../../locales/bar/pt";
import Link from 'next/link'

const cookies = new Cookies()

export default class NavBarComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            lang: en
        }
    }
    componentDidMount() {
        this.setLanguage(this.props.locale)
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
            <div className={styles.left_bar_container}>
                    <div  className={sharedStyles.button_container} style={{borderRight: this.props.path === '/' ? '#39adf6 3px solid': null}}>
                        <Link href={{ pathname: "/", locale: this.props.locale}}>
                            <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}} >
                                <GroupRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.extensions}
                            </Button>
                        </Link>
                    </div>
                    <div  className={sharedStyles.button_container} style={{borderRight: this.props.path === '/settings' ? '#39adf6 3px solid': null}}>
                        <Link href={{ pathname: "/settings", locale: this.props.locale}}>
                            <Button style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}}>
                                <SettingsRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/> {this.state.lang.settings}
                            </Button>
                        </Link>
                    </div>
                    <div className={sharedStyles.button_container}>
                        <Link href={{ pathname: "/signin", locale: this.props.locale}}>
                            <Button  style={{...buttonStyle, ...{color: this.props.dark ? 'white' : '#111111'}}}>
                                <ExitToAppRounded style={{...iconStyle, ...{color: !this.props.dark ? '#777777' : '#ededed'}}}/>{this.state.lang.signout}
                            </Button>
                        </Link>
                    </div>
            </div>
        )
    }
}
