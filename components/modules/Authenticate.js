import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import {Button, FormControl, InputLabel, Modal, OutlinedInput} from "@material-ui/core";
import InputLayout from "./InputLayout";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import getComponentLanguage from "../../utils/shared/GetComponentLanguage";
import shared from '../../styles/shared/Shared.module.css'
import animations from '../../styles/shared/Animations.module.css'
import Alert from "../layout/Alert";
import {CloseRounded} from "@material-ui/icons";
import styles from '../../styles/component/Component.module.css'
import TextField from "./inputs/TextField";
import handleObjectChange from "../../utils/shared/HandleObjectChange";

const cookies = new Cookies()
export default function Authenticate(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lang, setLang] = useState(null)
    const [attempts, setAttempts] = useState(0)
    const [valid, setValid] = useState(false)
    const [error, setError] = useState({
        error: null,
        message: null
    })
    useEffect(() => {
        if ((new Cookies()).get('authorization_token') !== undefined)
            setValid(true)
        setLang(getComponentLanguage({locale: props.locale, component: 'authenticate'}))
    }, [])

    function handleChange(event) {
        if (event.name === 'email')
            setEmail(event.value)
        else
            setPassword(event.value)
    }

    async function submit() {
        await axios({
            method: 'put',
            url: Host() + 'authentication',
            headers: {authorization: cookies.get('jwt')},
            data: {
                corporate_email: email,
                password: password,
            }
        }).then(res => {

            cookies.remove('authorization_token', {path: '/'})

            cookies.set('authorization_token', res.data.token, {path: '/', expires: new Date(res.data.exp)})

            setValid(true)
            props.handleClose(true)
        }).catch(error => {
            setError({
                error: true,
                message: error.message
            })
            setAttempts(attempts + 1)
        })
    }


    if (lang !== null)
        return (

            <Modal
                open={props.render} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                className={animations.fadeIn}
            >
                <>
                    <Alert
                        type={'error'}
                        message={error.message}
                        render={error.error}
                        handleClose={() => setError({error: false, message: ''})}
                    />
                    <div className={styles.authenticateModalContainer}>

                        <div style={{
                            display: 'grid',
                            justifyItems: 'center',
                            height: 'fit-content',
                            gap: '10px',
                            marginTop: '32px'
                        }}>
                            <img src={'./LOGOBIG.png'} style={{width: '50%'}}/>
                            <div style={{
                                display: 'grid',
                                justifyItems: 'center',
                                gap: '5px',

                            }}>
                                <span style={{fontSize: '1.5rem'}}>{lang.signin}</span>
                                <span className={mainStyles.tertiaryParagraph}
                                      style={getTertiaryColor({dark: false})}>{lang.authenticate}</span>
                            </div>
                        </div>
                        <div style={{
                            display: 'grid',
                            height: 'fit-content',
                            gap: '10px',
                            width: '100%',
                            justifyItems: 'center',
                            paddingLeft: '24px',
                            paddingRight: '24px'
                        }}>
                            <TextField
                                placeholder={lang.email} label={lang.email}
                                handleChange={event => handleChange(
                                    {
                                        name: 'email',
                                        value: event.target.value
                                    })} locale={props.locale} value={email}
                                width={'100%'}
                                maxLength={undefined}/>

                            <TextField
                                placeholder={lang.password} label={lang.password}
                                handleChange={event => handleChange(
                                    {
                                        name: 'password',
                                        value: event.target.value
                                    })} locale={props.locale} value={password}
                                width={'100%'} passwordMask={true}
                                maxLength={undefined}/>
                        </div>
                        <div className={mainStyles.displayInlineEnd} style={{
                            width: '100%',
                            backgroundColor: '#f4f5fa',
                            height: '60px',
                            borderRadius: '0 0 8px 8px',
                            padding: '24px',
                            gap: '10px'
                        }}>
                            <Button onClick={() => props.forceClose()} style={{
                                backgroundColor: 'white',
                                textTransform: 'none',
                                borderRadius: '8px',
                                boxShadow:  'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px'
                            }}>
                                {lang.cancel}
                            </Button>
                            <Button onClick={submit} disabled={email.length < 12 || password < 8}
                                    style={{
                                        textTransform: 'none',
                                        backgroundColor: email.length < 12 || password < 8 ? 'rgba(0,0,0,0.07)' : '#0095ff',
                                        color: email.length < 12 || password < 8 ? '#777777' : 'white',
                                        borderRadius: '8px',

                                    }}>
                                {lang.authenticate}
                            </Button>
                        </div>

                    </div>
                </>
            </Modal>

        )
    else {
        return <></>
    }
}

Authenticate.propTypes = {
    locale: PropTypes.string,
    render: PropTypes.bool,
    handleClose: PropTypes.func,
    forceClose: PropTypes.func
}