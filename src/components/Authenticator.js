import {FormRow} from "sis-aeb-core";

import React, {useContext, useEffect, useState} from "react";

import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'
import submitAuthentication from "../utils/SubmitAuthentication";
import styles from '../styles/Authenticate.module.css'
import useCookies from "./core/shared/hooks/useCookies";
import Form from "./core/inputs/form/Form";
import ThemeContext from "./core/theme/ThemeContext";

import {VisibilityOff, VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import TextField from "./core/inputs/text/TextField";

export default function Authenticator(props) {
    const cookies = useCookies()
    const theme = useContext(ThemeContext)
    useEffect(() => {
        cookies.remove('jwt')
        sessionStorage.removeItem('profile')
        sessionStorage.removeItem('accessProfile')
    }, [])
    const [visible, setVisible] = useState(false)
    return (
        <div className={styles.inputContainer}>
            <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                fontFamily: 'Roboto',
                fontWeight: '600',
                color: theme.themes.color2,
                fontSize: '.9rem'
            }}>
                <img src={'/light.png'} style={{width: '135px'}} alt={'logo'}/>
                Bem vindo
            </div>
            <Form
                dependencies={[{name: 'email', type: 'string'}, {name: 'password', type: 'string'}]}
                noHeader={true}
                submitLabel={'Entrar'}
                handleSubmit={(data) => {
                    submitAuthentication({
                        email: data.email,
                        password: data.password,
                    }).then(res => {
                            if (res)
                                props.redirect()
                        }
                    )
                }}>
                {(data, handleChange) => (
                    <FormRow>
                        <TextField
                            placeholder={'Email'} label={'Email'}
                            handleChange={event => handleChange({event: event.target.value, key: 'corporate_email'})}
                            value={data.corporate_email}
                            width={'100%'}
                            maxLength={undefined}/>

                        <TextField
                            placeholder={'Senha'} label={'Senha'}
                            handleChange={event => handleChange({event: event.target.value, key: 'password'})}
                            value={data.password}
                            width={'100%'}
                            type={visible ? undefined : 'password'}
                            maskEnd={(
                                <button className={styles.button} style={{color: theme.themes.color1}} onClick={() => setVisible(!visible)}>
                                    {visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                </button>
                            )}
                            maxLength={undefined}/>
                    </FormRow>
                )}
            </Form>

        </div>
    )
}

Authenticator.propTypes = {
    redirect: PropTypes.func
}