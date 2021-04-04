import Layout from "../components/shared/Layout";
import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/index/Index.module.css'
import Persona from "../components/index/Persona";
import {
    createMuiTheme,
    Divider,
    IconButton,
    InputBase,
    Menu,
    MenuItem,
    Modal,
    Paper,
    ThemeProvider
} from "@material-ui/core";
import {searchFieldStyle} from "../styles/bar/BarMaterialStyles";
import {HomeRounded, MenuRounded, SearchRounded} from "@material-ui/icons";
import axios from "axios";
import Host from "../utils/Host";
import {Skeleton} from "@material-ui/lab";
import PersonProfile from "../components/index/PersonProfile";
import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";
import {getLanguage} from "../utils/Language";

const id = parseInt((new Cookies()).get('id'))

export default function Index() {
    const router = useRouter()
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(true)
    const [canEdit, setCanEdit] = useState(false)
    const [search, setSearch] = useState(null)
    const [lang, setLang] = useState(null)
    const [anchorEl, setAnchorEl] = React.useState(null);


    useEffect(() => {
        if(people.length === 0){
            setCanEdit(localStorage.getItem('profile') !== null && JSON.parse(localStorage.getItem('profile')).admin)
            fetchData().catch(error => console.log(error))
        }

        if((new Cookies()).get('lang') !== undefined && (new Cookies()).get('lang') !== router.locale){
            router.push('/', '/', {locale: (new Cookies()).get('lang')}).catch(r => console.log(r))
            setLang(getLanguage(router.locale, router.pathname))
        }
        else
            setLang(getLanguage(router.locale, router.pathname))
    }, [router.locale])
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    async function fetchData(){
        try {
            await axios({
                method: 'get',
                url: Host() + 'collaborators'
            }).then(res => {
                setPeople(res.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    async function fetchSearch(){
        setLoading(true)
        try {
            await axios({
                method: 'get',
                url: Host() + 'collaborators',
                params: {
                    input: search
                }
            }).then(res => {
                setPeople(res.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        setLoading(false)
    }

    if(lang !== null)
        return (
            <Layout>
                {props =>
                    <ThemeProvider theme={createMuiTheme({
                        palette: {
                            type: props.dark ? "dark" : "light"
                        }
                    })}>

                        <div className={styles.header_container}
                             style={{backgroundColor: props.dark ? '#303741' : 'white'}}>
                            <props.getTitle pageName={lang.extensions} pageTitle={lang.extensions} pageInfo={lang.information}/>
                            <div className={styles.paper_container}>
                                <Paper component="form" style={{
                                    ...searchFieldStyle, ...{
                                        backgroundColor: props.dark ? '#272e38' : '#f4f8fb',
                                        boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0'
                                    }
                                }}>
                                    <IconButton aria-controls="filter-menu" aria-haspopup="true" onClick={handleClick}>
                                        <MenuRounded style={{color: props.dark ? 'white' : null}}/>
                                    </IconButton>
                                    <Menu  id="simple-menu"   anchorEl={anchorEl}
                                           keepMounted
                                           open={Boolean(anchorEl)}
                                           onClose={handleClose}>
                                        <MenuItem onClick={handleClose} >{lang.activeCollaborators}</MenuItem>
                                        <MenuItem onClick={handleClose}>{lang.unities}</MenuItem>
                                        {canEdit ? <MenuItem onClick={handleClose}>{lang.collaborators}</MenuItem> : null}
                                    </Menu>
                                    <InputBase
                                        style={{width: '85%', color: (props.dark ? 'white' : null), marginLeft: '10px'}}
                                        placeholder={lang.search}
                                        onChange={event => setSearch(event.target.value)}
                                    />
                                    <IconButton aria-label={lang.search} onClick={() => fetchSearch()} disabled={search === null || search.length === 0}>
                                        <SearchRounded style={{color: props.dark ? 'white' : null}}/>
                                    </IconButton>
                                    <Divider orientation={'vertical'} style={{height: '70%'}}/>
                                    <IconButton aria-label={lang.search} onClick={() => fetchData()}>
                                        <HomeRounded style={{color: props.dark ? 'white' : null}}/>
                                    </IconButton>
                                </Paper>
                            </div>
                        </div>
                        <div className={styles.personas_container}>
                            {!loading ?
                                people.map(person =>

                                    <Persona
                                        person={person}
                                        canEdit={canEdit}
                                        dark={props.dark}
                                    />

                                )
                                :
                                <Skeleton variant="rect" style={{
                                    borderRadius: '8px',
                                    width: '45vw',
                                    height: '11vh',
                                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                                }}/>}
                        </div>
                    </ThemeProvider>
                }
            </Layout>
        )
    else
        return (<div>

        </div>)
}