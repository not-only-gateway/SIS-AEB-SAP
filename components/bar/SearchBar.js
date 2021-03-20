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
                <div style={{gridColumn: 1, display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                    <img style={logoStyle} src={getLogo(this.props.dark)} alt={"aeb"}/>
                </div>
                <div style={{gridColumn: 2, display: 'flex', justifyContent:'space-evenly'}}>
                    <Button style={{...secondaryButtonStyle, ...{color: this.props.dark ? 'white' : 'black'}}}>{this.state.lang.help}</Button>
                    <Button style={{...secondaryButtonStyle, ...{color: this.props.dark ? 'white' : 'black'}}}>{this.state.lang.about}</Button>
                </div>
                <div style={{gridColumn: 3}}>
                    <Paper component="form" style={{...searchFieldStyle, ...{backgroundColor: this.props.dark ? '#272e38' : '#f7f8fa'}}}>
                        <IconButton aria-label="search" disabled={this.state.searchValue === null || this.state.searchValue === ''}>
                            <SearchRounded style={{color: this.props.dark ? 'white' : null}}/>
                        </IconButton>
                        <InputBase
                            style={{width: '90%', color: this.props.dark ? 'white' : null}}
                            placeholder={this.state.lang.search}
                            onChange={event => this.setState(event.target.value)}
                            onKeyDown={key => (key.key === "Enter"? this.setState({redirect: true}): console.log("."))}
                        />
                    </Paper>
                </div>
                <div className={styles.bar_profile_container} style={{gridColumn: 4}}>
                    { this.state.profile === null ?
                        <Link href={{ pathname: "/signin", locale: this.props.locale}}>
                            <Button style={{color: (this.props.dark ? 'white' :  'black'), marginRight: '10px', textTransform: 'none'}}>{this.state.lang.signin}</Button>
                        </Link>
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
                </div>
            </div>
        )
    }
}