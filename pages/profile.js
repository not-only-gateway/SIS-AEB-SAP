import React, {useEffect, useState} from 'react'
import Cookies from "universal-cookie/lib";
import {Avatar, Button, createMuiTheme, IconButton, InputBase, Paper, ThemeProvider} from "@material-ui/core";
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
    const [page, setPage] = useState(0)
    const [profile, setProfile] = useState({})
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
                <title>{profile.name}</title>
            </Head>
            <Layout>
                {props => (
                    <div className={styles.container}>
                        <div className={styles.title_container}>
                            <Avatar src={profile.pic} style={{width: '125px', height: '125px'}}/>
                            {/*<Avatar src={props.pic} alt={state.profile.name}/>*/}
                            {/*<p>{state.profile.name}</p>*/}
                            <p style={{color: (props.dark? 'white': 'black'), fontSize: '1.2rem', fontWeight: 440}}>{profile.name}</p>
                        </div>
                        <div style={{width: '85%'}}>
                            <>
                                {page === 0 ?
                                    null
                                    :
                                    <Button style={{color: (props.dark? 'white': 'black'), float: 'left'}} onClick={() => setPage(page-1)} >Prev</Button>
                                }
                                {page === 1 ?
                                    null
                                    :
                                    <Button style={{color: (props.dark? 'white': 'black'), float: 'right'}} onClick={() => setPage(page+1)}>Next</Button>
                                }
                            </>
                        </div>
                        <div className={styles.form_rows_container}>
                            <PersonFormFields page={page} handleChange={handleChange} dark={props.dark}/>
                        </div>

                        <div className={styles.from_buttons_container}>
                            <div className={styles.form_row}>
                                <Button disabled={!changed}>Save</Button>
                                <Button disabled={!changed}>Discard</Button>
                            </div>
                        </div>

                    </div>
                )
                }

            </Layout>
        </>

    )
}