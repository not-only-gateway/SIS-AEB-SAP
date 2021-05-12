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

const cookies = new Cookies()
export default function Authenticate(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lang, setLang] = useState(null)
    const [attempts, setAttempts] = useState(0)
    const [valid, setValid] = useState(false)
    const [error, setError] = useState({
        error: null,
        errorMessage: null
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
                error: error.response.status,
                errorMessage: error.response.data
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
                <div className={shared.signInContainer} >

                    <div style={{
                        display: 'grid',
                        justifyItems: 'center',
                        height: 'fit-content',
                        gap: '10px',
                    }}>
                        <img src={'./newnew.png'} style={{width: '50%'}}/>
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
                    <InputLayout inputName={lang.email} dark={false}
                                 handleChange={handleChange} name={'email'}
                                 inputType={0} disabled={false} size={'100%'} required={false}
                                 initialValue={email} key={"1-1"} setChanged={undefined}/>
                    <div style={{width: '100%'}}>

                        <FormControl variant="outlined" style={{width: '100%'}}>
                            <InputLabel htmlFor="password">{lang.password}</InputLabel>
                            <OutlinedInput

                                id="password"
                                type={'password'}
                                value={password}
                                onChange={event => handleChange({name: 'password', value: event.target.value})}
                                labelWidth={70}
                            />
                        </FormControl>

                    </div>
                    <div className={mainStyles.displayInlineSpaced} style={{width: '100%'}}>
                        <Button variant={'contained'} onClick={submit} disabled={email.length < 12 || password < 8}
                                style={{
                                    textTransform: 'none',
                                    backgroundColor: email.length < 12 || password < 8 ? 'rgba(0,0,0,0.07)' : '#0095ff',
                                    color: email.length < 12 || password < 8 ? '#777777' : 'white',
                                    width: '35%'
                                }}>
                            {lang.authenticate}
                        </Button>
                        <Button variant={'contained'} onClick={() => props.handleClose(valid)}
                                style={{
                                    textTransform: 'none',
                                    backgroundColor: '#f54269',
                                    color: 'white',
                                    width: '35%'
                                }}>
                            {lang.cancel}
                        </Button>
                    </div>

                </div>
            </Modal>
        )
    else {
        return <></>
    }
}

Authenticate.propTypes = {
    locale: PropTypes.string,
    render: PropTypes.bool,
    handleClose: PropTypes.func
}