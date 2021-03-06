import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import styles from './styles/Authenticate.module.css'
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import {Button, TextField} from "mfc-core";
import submitAuthentication from "../../utils/SubmitAuthentication";
import Cookies from "universal-cookie/lib";

export default function Authenticator(props) {

    const [asManager, setAsManager] = useState(false)

    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        const cookies = new Cookies()
        if (props.open) {
            cookies.remove('jwt')
            cookies.remove('asManager')
            sessionStorage.removeItem('isManager')
            sessionStorage.removeItem('profile')
        }
    }, [props.open])

    return (
        <div className={styles.wrapper}>
            <div style={{
                color: 'var(--mfc-color-secondary)',
            }} className={styles.header}>
                <img src={'/light.png'} style={{width: '135px'}} alt={'logo'}/>
                Bem vindo
            </div>
            <div style={{display: 'grid', gap: '4px', width: '100%'}}>
                <div style={{display: 'flex', width: '100%', gap: '4px', justifyContent: 'center'}}>
                    <Button variant={"minimal"} onClick={() => setAsManager(false)} highlight={!asManager}>
                        Autenticação AEB
                    </Button>
                    <Button variant={"minimal"} onClick={() => setAsManager(true)} highlight={asManager}>
                        Gerente
                    </Button>
                </div>

                <TextField
                    placeholder={asManager ? 'Email gerente' : 'Email corporativo'}
                    label={asManager ? 'Email gerente' : 'Email corporativo'}
                    handleChange={event => setEmail(event.target.value)}
                    value={email}
                    width={'100%'} maskEnd={asManager ? null : '@aeb.gov.br'}
                    maxLength={undefined}/>

                <TextField
                    placeholder={'Senha'} label={'Senha'}
                    handleChange={event => setPassword(event.target.value)}
                    value={password}
                    width={'100%'}
                    type={visible ? undefined : 'password'}
                    maskEnd={(
                        <button className={styles.button} style={{color: 'var(--mfc-color-primary)'}}
                                onClick={() => setVisible(!visible)}>
                            {visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                        </button>
                    )}
                    maxLength={undefined}/>
                <Button disabled={email.length === 0 || password.length < 8} variant={"filled"} onClick={() => {
                    submitAuthentication({
                        email: email,
                        password: password,
                        asManager: asManager
                    }).then(res => {
                        if (res) {
                            (new Cookies()).set('jwt', res.token)
                            if (asManager)
                                props.setManager({
                                    email: email,
                                    name: 'Gerente',
                                    image: null
                                })
                            else {
                                const profile = {
                                    name: res.user?.name,
                                    email: res.user?.user_email,
                                    image: res.user?.pic,
                                    about: res.user?.about
                                }
                                props.setProfile(profile)
                                sessionStorage.setItem('profile', JSON.stringify(profile))
                            }
                            props.redirect()
                        }
                    })
                }}>
                    Entrar
                </Button>
            </div>

        </div>
    )
}

Authenticator.propTypes = {
    redirect: PropTypes.func,
    setManager: PropTypes.func,
    setProfile: PropTypes.func
}