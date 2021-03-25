import Layout from "../components/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import shared from "../styles/Shared.module.css";
import styles from '../styles/Index.module.css'
import PersonaComponent from "../components/PersonaComponent";
import Head from "next/head";
import {Button, createMuiTheme, IconButton, InputBase, Paper, ThemeProvider} from "@material-ui/core";
import {searchFieldStyle} from "../styles/bar/BarMaterialStyles";
import {SearchRounded} from "@material-ui/icons";
import axios from "axios";
import Host from "../config/Host";
import {Skeleton} from "@material-ui/lab";
import Cookies from "universal-cookie/lib";

export default function Index() {
    const router = useRouter()
    const {locale} = router
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(false)
    const [dark, setDark] = useState(false)
    useEffect(() => {
        setDark((new Cookies()).get('theme') === '0')
        fetchData().catch(error => console.log(error))
    }, [])

    const fetchData = async() => {
        setLoading(true)
        try {
            await axios({
                method: 'get',
                url: Host() + 'people'
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
        <ThemeProvider theme={createMuiTheme({
            palette: {
                type: dark ? "dark" : "light"
            }
        })}>
            <Head>
                <title>Ramais</title>
            </Head>
            <Layout>
                {() =>
                    <div className={shared.content_container}
                         style={{backgroundColor: dark ? '#303741' : 'white'}}>
                        <div className={shared.header_container}
                             style={{backgroundColor: dark ? '#303741' : 'white'}}>

                            <div style={{margin: 'auto', width: '58vw'}}>
                                <p style={{fontSize: '1.7rem', fontWeight: '550', textAlign: 'left'}}>Ramais</p>
                                <p style={{fontSize: '.9rem', textAlign: 'left'}}>Info about Ramais</p>
                            </div>
                            <div className={styles.paper_container}>
                                <Paper component="form" style={{
                                    ...searchFieldStyle, ...{
                                        backgroundColor: dark ? '#272e38' : '#f4f8fb',
                                        boxShadow: 'rgba(0, 0, 0, 0.05) 0 1px 2px 0'
                                    }
                                }}>
                                    <IconButton aria-label="search">
                                        <SearchRounded style={{color: dark ? 'white' : null}}/>
                                    </IconButton>
                                    <InputBase
                                        style={{width: '93%', color: (dark ? 'white' : null)}}
                                        placeholder={'Search'}
                                    />
                                </Paper>
                            </div>
                        </div>
                        <div className={shared.unity_collaborators_container}>
                            {people.length > 0 && !loading ? people.map(person =>
                                <PersonaComponent
                                    pic={person.pic}
                                    name={person.name}
                                    admin={person.is_administrator}
                                    email={person.corporate_email}
                                    phone={person.extension}
                                    id={person.id}
                                    dark={dark}
                                    birth={person.birth}
                                />
                            ):<Skeleton variant="rect" style={{borderRadius: '8px', width: '58vw', height: '11vh', backgroundColor: dark ? '#3b424c' : '#f4f8fb'}}/>}
                        </div>

                    </div>
                }

            </Layout>
        </ThemeProvider>
    )
}