import React, {useContext, useEffect, useState} from "react";
import PropTypes from 'prop-types'
import styles from '../styles/Authenticate.module.css'
import useCookies from "./core/shared/hooks/useCookies";
import Form from "./core/inputs/form/Form";
import ThemeContext from "./core/theme/ThemeContext";
import {VisibilityOffRounded, VisibilityRounded} from "@material-ui/icons";
import TextField from "./core/inputs/text/TextField";
import FormRow from "./core/inputs/form/FormRow";
import submitAuthentication from "../utils/SubmitAuthentication";
import Tabs from "./core/misc/tabs/Tabs";

export default function Authenticator(props) {
    const cookies = useCookies()
    const theme = useContext(ThemeContext)
    const [asManager, setAsManager] = useState(false)
    useEffect(() => {
        cookies.remove('jwt')
        sessionStorage.removeItem('profile')
        sessionStorage.removeItem('accessProfile')
    }, [])

    const [visible, setVisible] = useState(false)
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
                <Form
                    dependencies={[{name: 'email', type: 'string'}, {name: 'password', type: 'string'}]}
                    submitLabel={'Entrar'}
                    noPadding={true} noBorder={true} noHeader={true} noAutoHeight={true}
                    handleSubmit={(data) => {
                        submitAuthentication({
                            email: data.email,
                            password: data.password,

                            asManager: asManager
                        }).then(res => {
                                if (res) {
                                    if(asManager)
                                        props.setManager({
                                            email: data.email,
                                            name: 'Gerente',
                                            image: null
                                        })
                                    props.redirect()
                                }
                            })
                    }}>
                    {(data, handleChange) => (
                        <FormRow>
                            <TextField
                                placeholder={asManager ? 'Email gerente' : 'Email corporativo'}
                                label={asManager ? 'Email gerente' : 'Email corporativo'}
                                handleChange={event => handleChange({
                                    event: event.target.value,
                                    key: 'email'
                                })}
                                value={data.email}
                                width={'100%'} maskEnd={asManager ? null : '@aeb.gov.br'}
                                maxLength={undefined}/>

                            <TextField
                                placeholder={'Senha'} label={'Senha'}
                                handleChange={event => handleChange({event: event.target.value, key: 'password'})}
                                value={data.password}
                                width={'100%'}
                                type={visible ? undefined : 'password'}
                                maskEnd={(
                                    <button className={styles.button} style={{color: theme.themes.color1}}
                                            onClick={() => setVisible(!visible)}>
                                        {visible ? <VisibilityRounded/> : <VisibilityOffRounded/>}
                                    </button>
                                )}
                                maxLength={undefined}/>
                        </FormRow>
                    )}
                </Form>
            </div>

        </div>
    )
}

Authenticator.propTypes = {
    redirect: PropTypes.func,
    setManager: PropTypes.func
}