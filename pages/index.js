import Layout from "../components/layout/Layout";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import styles from '../styles/index/Index.module.css'
import Persona from "../components/Persona";
import {createMuiTheme, IconButton, InputBase, Modal, Paper, ThemeProvider} from "@material-ui/core";
import {searchFieldStyle} from "../styles/bar/BarMaterialStyles";
import {SearchRounded} from "@material-ui/icons";
import axios from "axios";
import Host from "../config/Host";
import {Skeleton} from "@material-ui/lab";
import PersonProfile from "../components/profile/PersonProfile";
import PropTypes from 'prop-types'
import Cookies from "universal-cookie/lib";

const id = parseInt((new Cookies()).get('id'))

export default function Index() {

    const router = useRouter()
    const {locale} = router
    const [people, setPeople] = useState([])
    const [loading, setLoading] = useState(false)
    const [canEdit, setCanEdit] = useState(false)

    useEffect(() => {
        setCanEdit(localStorage.getItem('profile') !== null && (JSON.parse(localStorage.getItem('profile')).is_administrator === true))
        fetchData().catch(error => console.log(error))
    }, [])

    const fetchData = async () => {
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
                                <IconButton aria-label="search">
                                    <SearchRounded style={{color: props.dark ? 'white' : null}}/>
                                </IconButton>
                                <InputBase
                                    style={{width: '93%', color: (props.dark ? 'white' : null)}}
                                    placeholder={'Search'}
                                />
                            </Paper>
                        </div>
                    </div>
                    <div className={styles.personas_container}>
                        {people.length > 0 && !loading ?
                            people.map(person =>
                                <Persona
                                    pic={person.pic}
                                    name={person.name}
                                    admin={person.is_administrator}
                                    email={person.corporate_email}
                                    ownProfile={id === person.id}
                                    canEdit={canEdit}
                                    phone={person.extension}
                                    id={person.id}
                                    dark={props.dark}
                                    birth={person.birth}
                                />
                            )
                            :
                            <Skeleton variant="rect" style={{
                                borderRadius: '8px',
                                width: '58vw',
                                height: '11vh',
                                backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                            }}/>}
                    </div>
                </ThemeProvider>
            }
        </Layout>
    )
}