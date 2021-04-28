import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../styles/shared/Main.module.css'
import {AddRounded, VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import {
    Avatar,
    Button,
    Divider,
    FormControl,
    FormLabel, IconButton,
    InputAdornment,
    InputLabel,
    Modal,
    OutlinedInput
} from "@material-ui/core";
import styles from '../../styles/person/Form.module.css'
import InputLayout from "./InputLayout";
import {getIconStyle, getTertiaryColor} from "../../styles/shared/MainStyles";
import ProfilePersona from "../elements/profile/ProfilePersona";
import ImageHost from "../../utils/shared/ImageHost";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import signOut from "../../utils/authentication/SignOut";
import ClearStorage from "../../utils/authentication/ClearStorage";
import {getLanguage} from "../../utils/shared/PageLanguage";
import getComponentLanguage from "../../utils/shared/GetComponentLanguage";
import shared from '../../styles/shared/Shared.module.css'

const cookies = new Cookies()
export default function Authenticate(props) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [lang, setLang] = useState(null)
    const [attempts, setAttempts] = useState(0)
    const [error, setError] = useState({
        error: null,
        errorMessage: null
    })
    useEffect(() => {
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

            props.setValid(true)
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
            <Modal open={!props.valid} onClose={props.redirect}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className={shared.signInContainer}>
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
                    <Button variant={'contained'} onClick={submit} disabled={email.length < 12 || password < 8}
                            style={{
                                textTransform: 'none',
                                backgroundColor: email.length < 12 || password < 8 ? null : '#0095ff',
                                color: email.length < 12 || password < 8 ? null : 'white'
                            }}>{lang.authenticate}</Button>
                </div>
            </Modal>
        )
    else {
        return <></>
    }
}

Authenticate.propTypes = {
    setValid: PropTypes.func,
    valid: PropTypes.bool,
    redirect: PropTypes.func,
    locale: PropTypes.string
}