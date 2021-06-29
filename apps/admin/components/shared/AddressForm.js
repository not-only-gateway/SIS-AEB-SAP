import React, {useState} from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import {FormLayout, TextField} from "sis-aeb-inputs"
import {Alert} from "sis-aeb-misc";
import AddressPT from "../../packages/locales/others/AddressPT";
import submitAddress from "../../utils/submit/SubmitAddress";

export default function AddressForm(props) {

    const [changed, setChanged] = useState(false)
    const [validZipCode, setValidZipCode] = useState(false)
    const lang = AddressPT
    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })


    async function fetchCep(cep) {
        await axios({
            method: 'get',
            url: 'http://viacep.com.br/ws/' + cep + '/json/',
        }).then(res => {
            if (!res.data.erro) {
                console.log(res.data)
                props.handleChange({name: 'neighborhood', value: res.data.bairro})
                props.handleChange({name: 'state_initials', value: res.data.uf})
                props.handleChange({name: 'state', value: res.data.uf})
                props.handleChange({name: 'address', value: res.data.logradouro})
                props.handleChange({name: 'address_complement', value: res.data.complemento})
                props.handleChange({name: 'city', value: res.data.localidade})
                props.handleChange({name: 'valid_zip_code', value: true})
                setValidZipCode(true)
            } else
                setStatus({
                    error: true,
                    message: lang.invalid
                })
        }).catch(error => {
            setValidZipCode(false)
            setStatus({
                error: true,
                message: error.message
            })
        })
    }

    return (
        <>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />

            <FormLayout
                create={props.create}
                formLabel={lang.title}
                dependencies={{
                    fields: [
                        {name: 'zip_code', type: 'string'},
                        {name: 'address', type: 'string'},
                        {name: 'city', type: 'string'},
                        {name: 'state', type: 'string'},
                        {name: 'state_initials', type: 'string'},
                        {name: 'valid_zip_code', type: 'bool'},
                    ],
                    changed: changed,
                    entity: props.data
                }} returnButton={true} handleSubmit={() =>
                submitAddress({
                    pk: props.id,
                    data: props.data,
                    setStatus: setStatus,
                    type: props.type
                }).then(res => {
                    setChanged(!res)
                })}
                handleClose={() => props.returnToMain()}
                forms={[{
                    title: lang.address,
                    child: (
                        <>
                            <TextField
                                dark={true}
                                placeholder={lang.zipCode} label={lang.zipCode} handleChange={event => {
                                if (event.target.value.length === 8) {
                                    props.handleChange({name: 'zip_code', value: event.target.value})
                                    fetchCep(event.target.value).catch(error => console.log(error))
                                } else if (props.data === null || (event.target.value.length < 8 || (props.data.zip_code !== null && event.target.value.length < props.data.zip_code.length))) {
                                    setChanged(true)
                                    props.handleChange({name: 'zip_code', value: event.target.value})
                                }
                            }} locale={props.locale} value={props.data === null ? null : props.data.zip_code}
                                required={true}
                                width={'calc(33.333% - 21.35px)'} maxLength={8}/>


                            <TextField
                                dark={true}
                                disabled={!validZipCode}
                                placeholder={lang.address} label={lang.address} handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'address', value: event.target.value})
                            }} locale={props.locale} value={props.data === null ? null : props.data.address}
                                required={true}
                                width={'calc(33.333% - 21.35px)'}/>


                            <TextField
                                dark={true}
                                disabled={!validZipCode}
                                placeholder={lang.complement} label={lang.complement} handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'address_complement', value: event.target.value})
                            }} locale={props.locale} value={props.data === null ? null : props.data.address_complement}
                                required={false} width={'calc(33.333% - 21.35px)'}/>
                        </>
                    )
                },
                    {
                        title: lang.location,
                        child: (
                            <>

                                <TextField
                                    dark={true}
                                    disabled={!validZipCode}
                                    placeholder={lang.state}
                                    label={lang.state}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'state', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.state}
                                    required={true} width={'calc(33.333% - 21.35px)'}/>

                                <TextField
                                    dark={true}
                                    disabled={!validZipCode}
                                    placeholder={lang.city}
                                    label={lang.city}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'city', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.city}
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
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.state_initials}
                                    required={true} width={'calc(33.333% - 21.35px)'} maxLength={2}/>

                            </>
                        )
                    },
                    {
                        title: lang.neighborhood,
                        child: (
                            <>
                                <TextField
                                    dark={true}
                                    disabled={!validZipCode}
                                    placeholder={lang.neighborhood}
                                    label={lang.neighborhood}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'neighborhood', value: event.target.value})
                                    }} locale={props.locale}
                                    value={props.data === null ? null : props.data.neighborhood}
                                    required={false} width={'calc(50% - 16px)'}/>
                                <TextField
                                    dark={true}
                                    disabled={!validZipCode}
                                    placeholder={lang.street}
                                    label={lang.street}
                                    handleChange={event => {
                                        setChanged(true)
                                        props.handleChange({name: 'street', value: event.target.value})
                                    }} locale={props.locale} value={props.data === null ? null : props.data.street}
                                    required={false} width={'calc(50% - 16px)'}/>
                            </>
                        )
                    },
                ]}/>
        </>
    )

}

AddressForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,

    type: PropTypes.oneOf(['person', 'unit'])
}