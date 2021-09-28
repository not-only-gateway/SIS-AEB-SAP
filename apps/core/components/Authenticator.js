
import {Form, FormRow, TextField} from "sis-aeb-core";

import {Button} from "@material-ui/core";

import React, {useEffect, useState} from "react";

import Cookies from "universal-cookie/lib";
import PropTypes from 'prop-types'
import submitAuthentication from "../utils/SubmitAuthentication";
import styles from '../styles/Authenticate.module.css'
export default function Authenticator(props) {
    useEffect(() => {

        (new Cookies()).remove('jwt')
        sessionStorage.removeItem('profile')
        sessionStorage.removeItem('accessProfile')
    }, [])

    return (
        <div className={styles.inputContainer}>
            <img src={'/light.png'} style={{width: '50%'}} alt={'logo'}/>
            <h4 style={{fontWeight: 575}}>
                Bem vindo
            </h4>
            <Form dependencies={[{name: 'email', type: 'string'}, {name: 'password', type: 'string'}]} handleSubmit={(data) => {
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
                            value={data.email}
                            width={'100%'}
                            maxLength={undefined}/>

                        <TextField
                            placeholder={'Senha'} label={'Senha'}
                            handleChange={event => handleChange({event: event.target.value, key: 'password'})}
                            value={data.password}
                            width={'100%'} passwordMask={true}
                            type={'password'}
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