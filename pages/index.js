import Layout from "../components/shared/Layout";
import React, {useEffect, useMemo, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/index/Index.module.css'
import Persona from "../components/index/Persona";
import {createMuiTheme, IconButton, InputBase, Modal, Paper, ThemeProvider} from "@material-ui/core";
import {searchFieldStyle} from "../styles/bar/BarMaterialStyles";
import {SearchRounded} from "@material-ui/icons";
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
    // useEffect(() => {
    //     const currentLocale = (new Cookies()).get('lang')
    //
    //     if(currentLocale !== undefined && currentLocale !== router.locale){
    //         router.push('/settings', '/settings', {locale: currentLocale}).catch(r => console.log(r))
    //         setLang(getLanguage(router.locale, router.pathname))
    //     }
    //     else
    //         setLang(getLanguage(router.locale, router.pathname))
    // }, [router.locale])

    useEffect(() => {
        setCanEdit(localStorage.getItem('profile') !== null && JSON.parse(localStorage.getItem('profile')).admin)

        fetchData().catch(error => console.log(error))
    }, [])

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
                        <props.getTitle pageName={'Ramais'} pageTitle={'Ramais'} pageInfo={'INFORMATION'}/>
                        <div className={styles.paper_container}>
                            <Paper component="form" style={{
                                ...searchFieldStyle, ...{
                                    backgroundColor: props.dark ? '#272e38' : '#f4f8fb',
                                    boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0'
                                }
                            }}>
                                <IconButton aria-label="search" onClick={() => fetchSearch()} disabled={search === null || search.length === 0}>
                                    <SearchRounded style={{color: props.dark ? 'white' : null}}/>
                                </IconButton>
                                <InputBase
                                    style={{width: '93%', color: (props.dark ? 'white' : null)}}
                                    placeholder={'Search'}
                                    onChange={event => setSearch(event.target.value)}
                                />
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
}