import React, {useContext, useState} from "react";
import PropTypes from 'prop-types'
import styles from '../styles/Authenticate.module.css'
import ThemeContext from "./core/misc/theme/ThemeContext";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import TextField from "./core/inputs/text/TextField";
import submitAuthentication from "../utils/SubmitAuthentication";
import Tabs from "./core/navigation/tabs/Tabs";
import Button from "./core/inputs/button/Button";
import Cookies from "universal-cookie/lib";

export default function Authenticator(props) {
    const theme = useContext(ThemeContext)
    const [asManager, setAsManager] = useState(false)

    const [visible, setVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    return (
        <div className={styles.wrapper}>
            <div style={{
                color: theme.themes.color2,
            }} className={styles.header}>
                <img src={'/light.png'} style={{width: '135px'}} alt={'logo'}/>
                Bem vindo
            </div>
            <div style={{display: 'grid', gap: '4px', width: '100%'}}>
                <Tabs
                    noChildHighlight={true}
                    buttons={[
                        {
                            label: 'Autenticação AEB',
                            onClick: () => setAsManager(false)
                        },
                        {
                            label: 'Gerente',
                            onClick: () => setAsManager(true)
                        }
                    ]}/>

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
                        <button className={styles.button} style={{color: theme.themes.color1}}
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