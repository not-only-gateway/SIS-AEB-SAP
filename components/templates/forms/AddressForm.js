import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../../modules/InputLayout";
import PropTypes from 'prop-types'
import axios from "axios";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";

export default function AddressForm(props) {

    const [changed, setChanged] = useState(false)
    const [validZipCode, setValidZipCode] = useState(false)
    const [lang, setLang] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'address'}))
    }, [])

    function disabled() {
        return (
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
        setLoading(true)
        await axios({
            method: 'get',
            url: 'http://viacep.com.br/ws/' + cep + '/json/',
        }).then(res => {
            if (!res.data.error) {
                console.log(res.data)
                props.handleChange({name: 'neighborhood', value: res.data.bairro},)
                props.handleChange({name: 'state_initials', value: res.data.uf})
                props.handleChange({name: 'state', value: res.data.uf})
                props.handleChange({name: 'address', value: res.data.logradouro})
                props.handleChange({name: 'address_complement', value: res.data.complemento})
                props.handleChange({name: 'city', value: res.data.localidade})
                setValidZipCode(true)
            }
            setLoading(false)
        }).catch(error => {
            console.log(error)
            setValidZipCode(false)
            setLoading(false)
        })
    }


    if (lang !== null && !loading)
        return (
            <div style={{
                display: 'inline-flex',
                flexFlow: 'row wrap',
                gap: '32px',
                justifyContent: 'center',
                width: '75%',
            }}>

                <InputLayout inputName={lang.zipCode} dark={props.dark}
                             handleChange={event => {
                                 if (event.value.length === 8) {
                                     props.handleChange(event)
                                     fetchCep(event.value).catch(error => console.log(error))
                                 } else if (event.value.length < 8 || event.value.length < props.address.zip_code.length) {
                                     setValidZipCode(false)
                                     props.handleChange(event)
                                 }
                             }
                             } inputType={0}
                             name={'zip_code'} maxLength={8} numeric={true}
                             disabled={!props.editable} size={'100%'} required={true}
                             initialValue={props.address.zip_code}
                             key={"4-3"} setChanged={setChanged}/>

                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.address}
                </h4>
                <InputLayout inputName={lang.address} dark={props.dark}
                             handleChange={props.handleChange} inputType={0}
                             name={'address'}
                             disabled={!props.editable || !validZipCode}
                             size={'calc(50% - 16px)'} required={true} initialValue={props.address.address}
                             key={"4-1"} setChanged={setChanged}
                />
                <InputLayout inputName={lang.complement} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             name={'address_complement'}
                             disabled={!props.editable || !validZipCode}
                             size={'calc(50% - 16px)'} required={false} initialValue={props.address.address_complement}
                             key={"4-2"} setChanged={setChanged}/>

                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.location}
                </h4>

                <InputLayout inputName={lang.city} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             disabled={!props.editable || !validZipCode}
                             size={'calc(33.333% - 21.35px'} required={true} initialValue={props.address.city}
                             name={'city'}
                             key={"4-6"} setChanged={setChanged}/>
                <InputLayout inputName={lang.state} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             disabled={!props.editable || !validZipCode}
                             size={'calc(33.333% - 21.35px'} required={true} initialValue={props.address.state}
                             name={'state'}
                             key={"4-7"} setChanged={setChanged}/>
                <InputLayout inputName={lang.stateInitials} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'state_initials'} maxLength={2} uppercase={true}
                             disabled={!props.editable || !validZipCode}
                             size={'calc(33.333% - 21.35px'} required={true}
                             initialValue={props.address.state_initials}
                             key={"4-8"} setChanged={setChanged}/>
                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.neighborhood}
                </h4>
                <InputLayout inputName={lang.neighborhood} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'neighborhood'}
                             disabled={!props.editable || !validZipCode}
                             size={'calc(50% - 16px)'} required={false}
                             initialValue={props.address.neighborhood}
                             key={"4-5"} setChanged={setChanged}/>
                <InputLayout inputName={lang.street} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             name={'street'}
                             disabled={!props.editable || !validZipCode}
                             size={'calc(50% - 16px)'} required={false} initialValue={props.address.street}
                             key={"4-4"} setChanged={setChanged}/>



                {!props.editable ? null :
                    <Button style={{
                        width: '100%',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: disabled() ? '#777777' : 'white',
                        fontWeight: 550,

                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        props.handleSubmit({personID: props.id, data: props.address}).then(res => {
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res)
                        })
                    }}>
                        {props.create ? lang.create : lang.save}
                    </Button>
                }
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
    editable: PropTypes.bool,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}