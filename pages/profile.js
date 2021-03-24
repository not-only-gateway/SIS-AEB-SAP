import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {
    Avatar,
    Button,
    createMuiTheme,
    IconButton,
    InputBase,
    Paper, Popover,
    TextField,
    ThemeProvider
} from "@material-ui/core";
import styles from '../styles/form/Form.module.css'
import axios from "axios";
import Host from "../config/Host";
import {searchFieldStyle} from "../styles/bar/BarMaterialStyles";
import {InfoRounded, SearchRounded} from "@material-ui/icons";
import {inputStyle} from "../styles/auth/AuthMaterialStyles";
import {paperStyle} from "../styles/form/FormMaterialStyles";
import PersonFormFields from "../components/form/PersonFormFields";
import Head from "next/head";
import Layout from "../components/layout/Layout";
import shared from "../styles/Shared.module.css";
import Persona from "../components/layout/PersonaLayout";
import {useRouter} from "next/router";

const cookies = new Cookies()

export default function profile(){
    const [changed, setChanged] = useState(false)

    const [profile, setProfile] = useState(null)
    const router = useRouter()
    const {id} = router.query

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    const fetchData = async() => {
        try {
            await axios({
                method: 'get',
                url: Host + 'person',
                headers:{'authorization': cookies.get('jwt')},
                params: {
                    id: id
                }
            }).then(res => {
                setProfile(res.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        profile[event.target.name] = event.target.value

        if(!changed)
            setChanged(true)
    }

    return(
        <>
            <Head>
                <title>{profile?.name}</title>
            </Head>
            <Layout>
                {props => (
                    <div style={{height: '100%', overflowX: 'hidden',overflowY: 'auto'}}>
                        <div style={{margin: 'auto', width: '45vw'}}>
                            <p style={{fontSize:'1.7rem', fontWeight:'550', textAlign: 'left'}}> Profile</p>
                            <p style={{fontSize:'.9rem',textAlign: 'left'}}>Info about profile</p>
                        </div>
                        <div className={styles.container} >
                            <PersonFormFields handleChange={handleChange} dark={props.dark}/>
                            <div className={styles.from_buttons_container}>
                                <div className={styles.form_row}>
                                    <Button disabled={!changed}>Save</Button>
                                    <Button disabled={!changed}>Discard</Button>
                                </div>
                            </div>
                        </div>
                    </div>

                )
                }
            </Layout>
        </>

    )
}