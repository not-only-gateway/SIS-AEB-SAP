import {Avatar, Button, IconButton, InputBase, Paper} from "@material-ui/core";
import {SearchRounded} from "@material-ui/icons";
import Cookies from "universal-cookie/lib";
import styles from '../../styles/bar/Bar.module.css'
import {useEffect, useState} from "react";
import {getLogo} from "../../config/Theme";
import {logoStyle, searchFieldStyle, secondaryButtonStyle} from "../../styles/bar/BarMaterialStyles";
import en from "../../locales/bar/en";
import React from 'react'
import es from "../../locales/bar/es";
import pt from "../../locales/bar/pt";
import Link from 'next/link'

const cookies = new Cookies()

export default class SearchBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            lang: en,
            searchValue: null,
            profile: null
        }
    }
    componentDidMount() {
        this.setLanguage(this.props.locale)
        this.setState({
            profile: (localStorage.getItem('profile') !== null ? JSON.parse(localStorage.getItem('profile')) : null)
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

    render(){
        return (
            <div className={styles.top_bar_container} style={{color: this.props.dark ? 'white' : '#111111'}}>



            </div>
        )
    }
}