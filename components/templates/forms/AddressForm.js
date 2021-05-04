import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../../modules/InputLayout";
import PropTypes from 'prop-types'
import fetchComponentData from "../../../utils/person/FetchData";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from "../../../styles/shared/Main.module.css";
import axios from "axios";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";

export default function AddressForm(props) {

    const [changed, setChanged] = useState(false)
    const [validZipCode, setValidZipCode] = useState(false)
    const [lang, setLang] = useState(null)

    function disabled() {
        return (
            address.zip_code.length === 0 ||
            address.address.length === 0 ||
            address.city.length === 0 ||
            address.state.length === 0 ||
            address.state_initials.length === 0 ||
            changed === false
        )
    }

    async function handleChange(props) {
        switch (true) {
            case props.name === 'zipCode' && props.value.length === 8 && changed: {
                setAddress(prevState => ({
                    ...prevState,
                    [props.name]: props.value
                }))
                await fetchCep(props.value)
                break
            }
            default: {
                setAddress(prevState => ({
                    ...prevState,
                    [props.name]: props.value
                }))
                break
            }

        }
    }

    async function fetchCep(cep) {
        await axios({
            method: 'get',
            url: 'http://viacep.com.br/ws/' + cep + '/json/',
        }).then(res => {
            handleChange({name: 'neighborhood', value: res.data.bairro})
            handleChange({name: 'state_initials', value: res.data.uf})
            handleChange({name: 'state', value: res.data.localidade})
            handleChange({name: 'address', value: res.data.logradouro})
            handleChange({name: 'complement', value: res.data.complemento})
            setValidZipCode(true)
        }).catch(error => {
            console.log(error)
            setValidZipCode(false)
        })
    }

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'address'}))
    }, [])

    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center'}}>

                <InputLayout inputName={'Zip Code'} dark={props.dark} handleChange={handleChange} inputType={0}
                             name={'zip_code'} maxLength={8} numeric={true}
                             disabled={!props.editable} size={'100%'} required={true}
                             initialValue={props.address.zip_code}
                             key={"4-3"} setChanged={setChanged}/>
                <InputLayout inputName={'Address'} dark={props.dark}
                             handleChange={event => {
                                 if (props.name === 'zipCode' && props.value.length === 8 && changed) {
                                     props.handleChange(event)
                                     fetchCep(props.value).catch(error => console.log(error))
                                 }
                             }} inputType={0}
                             name={'address'}
                             disabled={!props.editable || props.address.zip_code.length < 8 || !validZipCode}
                             size={'calc(50% - 8px)'} required={true} initialValue={props.address.address}
                             key={"4-1"} setChanged={setChanged}
                />
                <InputLayout inputName={'Complement'} dark={props.dark} handleChange={handleChange} inputType={0}
                             name={'address_complement'}
                             disabled={!props.editable || props.address.zip_code.length < 8 || !validZipCode}
                             size={'calc(50% - 8px)'} required={false} initialValue={props.address.address_complement}
                             key={"4-2"} setChanged={setChanged}/>


                <InputLayout inputName={'City'} dark={props.dark} handleChange={handleChange} inputType={0}
                             disabled={!props.editable || props.address.zip_code.length < 8 || !validZipCode}
                             size={'calc(33.333% - 10.666px'} required={true} initialValue={props.address.city}
                             name={'city'}
                             key={"4-6"} setChanged={setChanged}/>
                <InputLayout inputName={'State'} dark={props.dark} handleChange={handleChange} inputType={0}
                             disabled={!props.editable || props.address.zip_code.length < 8 || !validZipCode}
                             size={'calc(33.333% - 10.666px'} required={true} initialValue={props.address.state}
                             name={'state'}
                             key={"4-7"} setChanged={setChanged}/>
                <InputLayout inputName={'State Initials'} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'state_initials'} maxLength={2} uppercase={true}
                             disabled={!props.editable || props.address.zip_code.length < 8 || !validZipCode}
                             size={'calc(33.333% - 10.666px'} required={true}
                             initialValue={props.address.state_initials}
                             key={"4-8"} setChanged={setChanged}/>

                <InputLayout inputName={'Street'} dark={props.dark} handleChange={handleChange} inputType={0}
                             name={'street'}
                             disabled={!props.editable || props.address.zip_code.length < 8 || !validZipCode}
                             size={'calc(50% - 8px)'} required={false} initialValue={address.street}
                             key={"4-4"} setChanged={setChanged}/>
                <InputLayout inputName={'Neighborhood'} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'neighborhood'}
                             disabled={!props.editable || props.address.zip_code.length < 8 || !validZipCode}
                             size={'calc(50% - 8px)'} required={false}
                             initialValue={props.address.neighborhood}
                             key={"4-5"} setChanged={setChanged}/>


                {!props.editable ? null :
                    <Button style={{
                        width: '100%', marginTop: '50px',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: '#777777',
                        fontWeight: 550,

                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        props.handleSubmit({address: props.address, personID: props.id}).then(res => {
                            setChanged(!res)
                            if (props.setAccepted !== undefined)
                                props.setAccepted(res.status)
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