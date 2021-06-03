import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import TextField from "../../modules/inputs/TextField";
import Button from "../../modules/inputs/Button";
import shared from "../../../styles/shared/Shared.module.css";
import Alert from "../../layout/Alert";

export default function AddressForm(props) {

    const [changed, setChanged] = useState(false)
    const [validZipCode, setValidZipCode] = useState(false)
    const [lang, setLang] = useState(null)
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })
    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'address'}))
    }, [])

    function disabled() {
        return (
            props.address === null ||
            props.address.zip_code === null ||
            props.address.address === null ||
            props.address.city === null ||
            props.address.state === null ||
            props.address.state_initials === null ||

            !props.address.zip_code ||
            !props.address.address ||
            !props.address.city ||
            !props.address.state ||
            !props.address.state_initials ||
            !validZipCode ||
            !changed
        )
    }


    async function fetchCep(cep) {
        await axios({
            method: 'get',
            url: 'http://viacep.com.br/ws/' + cep + '/json/',
        }).then(res => {
            if (!res.data.erro) {
                console.log(res.data)
                props.handleChange({name: 'neighborhood', value: res.data.bairro},)
                props.handleChange({name: 'state_initials', value: res.data.uf})
                props.handleChange({name: 'state', value: res.data.uf})
                props.handleChange({name: 'address', value: res.data.logradouro})
                props.handleChange({name: 'address_complement', value: res.data.complemento})
                props.handleChange({name: 'city', value: res.data.localidade})
                setValidZipCode(true)
            }
            else
                setStatus({
                    error: true,
                    message: lang.invalid
                })
        }).catch(error => {
            console.log(error)
            setValidZipCode(false)
            setStatus({
                error: true,
                message: error.message
            })
        })
    }


    if (lang !== null)
        return (
            <div style={{
                display: 'grid',
                gap: '32px',
                width: '100%',
            }}>
                <Alert
                    type={'error'} message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}/>

                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.address}</h4></legend>

                    <TextField
                        dark={true}
                        placeholder={lang.zipCode} label={lang.zipCode} handleChange={event => {
                        if (event.target.value.length === 8) {
                            props.handleChange({name: 'zip_code', value: event.target.value})
                            fetchCep(event.target.value).catch(error => console.log(error))
                        } else if (props.address === null || (event.target.value.length < 8 || (props.address.zip_code !== null && event.target.value.length < props.address.zip_code.length))) {
                            setChanged(true)
                            props.handleChange({name: 'zip_code', value: event.target.value})
                        }
                    }} locale={props.locale} value={props.address === null ? null : props.address.zip_code}
                        required={true}
                        width={'calc(33.333% - 21.35px)'} maxLength={8}/>


                    <TextField
                        dark={true}
                        disabled={!validZipCode}
                        placeholder={lang.address} label={lang.address} handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'address', value: event.target.value})
                    }} locale={props.locale} value={props.address === null ? null : props.address.address}
                        required={true}
                        width={'calc(33.333% - 21.35px)'}/>


                    <TextField
                        dark={true}
                        disabled={!validZipCode}
                        placeholder={lang.complement} label={lang.complement} handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'address_complement', value: event.target.value})
                    }} locale={props.locale} value={props.address === null ? null : props.address.address_complement}
                        required={false} width={'calc(33.333% - 21.35px)'}/>

                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.location}</h4></legend>


                    <TextField
                        dark={true}
                        disabled={!validZipCode}
                        placeholder={lang.state}
                        label={lang.state}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'state', value: event.target.value})
                        }} locale={props.locale} value={props.address === null ? null : props.address.state}
                        required={true} width={'calc(33.333% - 21.35px)'}/>

                    <TextField
                        dark={true}
                        disabled={!validZipCode}
                        placeholder={lang.city}
                        label={lang.city}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'city', value: event.target.value})
                        }} locale={props.locale} value={props.address === null ? null : props.address.city}
                        required={true}
                        width={'calc(33.333% - 21.35px)'}/>
                    <TextField
                        dark={true}
                        disabled={!validZipCode}
                        placeholder={lang.stateInitials}
                        label={lang.stateInitials}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'state_initials', value: event.target.value})
                        }} locale={props.locale} value={props.address === null ? null : props.address.state_initials}
                        required={true} width={'calc(33.333% - 21.35px)'} maxLength={2}/>

                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.neighborhood}</h4></legend>

                    <TextField
                        dark={true}
                        disabled={!validZipCode}
                        placeholder={lang.neighborhood}
                        label={lang.neighborhood}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'neighborhood', value: event.target.value})
                        }} locale={props.locale} value={props.address === null ? null : props.address.neighborhood}
                        required={false} width={'calc(50% - 16px)'} maxLength={2}/>
                    <TextField
                        dark={true}
                        disabled={!validZipCode}
                        placeholder={lang.street}
                        label={lang.street}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'street', value: event.target.value})
                        }} locale={props.locale} value={props.address === null ? null : props.address.street}
                        required={false} width={'calc(50% - 16px)'} maxLength={2}/>
                </fieldset>
                <div className={shared.formSubmitContainer}>
                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'white'} backgroundColor={'#0095ff'}
                            handleClick={() => {
                                setChanged(false)
                                props.handleSubmit({subjectID: props.id, data: props.address, setStatus: setStatus}).then(res => {
                                    setChanged(!res)
                                    if (props.setAccepted !== undefined)
                                        props.setAccepted(res)
                                })
                            }}
                            disabled={disabled()} variant={'rounded'}
                            content={
                                props.create ? lang.create : lang.save
                            } justification={'center'} hoverHighlight={false}
                    />
                </div>
            </div>
        )
    else
        return null
}

AddressForm.propTypes = {
    id: PropTypes.number,
    address: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}