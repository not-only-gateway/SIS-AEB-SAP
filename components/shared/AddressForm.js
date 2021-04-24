import {Button, createMuiTheme, ThemeProvider} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../layout/InputLayout";
import PropTypes from 'prop-types'
import fetchComponentData from "../../utils/person/FetchData";
import saveComponentChanges from "../../utils/person/SaveChanges";
import mainStyles from "../../styles/shared/Main.module.css";
import {getSecondaryBackground} from "../../styles/shared/MainStyles";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function AddressForm(props) {

    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const [address, setAddress] = useState({
        zipCode: '',
        address: '',
        complement: '',
        street: '',
        state: '',
        stateInitials: '',
        neighborhood: '',
        city: ''
    })

    function disabled() {
        return (
            address.zipCode.length === 0 ||
            address.address.length === 0 ||
            address.city.length === 0 ||
            address.state.length === 0 ||
            address.stateInitials.length === 0 ||
            changed === false
        )
    }

    async function handleChange(props) {
        console.log(props.value.length)
        switch (true){
            case props.name === 'zipCode' && address.zipCode.length === 7 : {
                await fetchCep()
                break
            }
            case props.name === 'zipCode' && props.value.length <= 7: {
                setAddress(prevState => ({
                    ...prevState,
                    [props.name]: props.value
                }))
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
    async function fetchCep(){
        await axios({
            method: 'get',
            url: 'http://viacep.com.br/ws/'+address.zipCode+'/json/',
        }).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        fetchComponentData({path: 'address/' + props.id, params: {}}).then(res => {
            if (res !== null) {
                handleChange({name: 'zipCode', value: res.zip_code})
                handleChange({name: 'address', value: res.address})
                handleChange({name: 'complement', value: res.complement})
                handleChange({name: 'street', value: res.street})
                handleChange({name: 'state', value: res.state})
                handleChange({name: 'stateInitials', value: res.state_initials})
                handleChange({name: 'neighborhood', value: res.neighborhood})
                handleChange({name: 'city', value: res.city})
            }
            setLoading(false)
        })
    }, [])

    async function saveChanges() {
        await saveComponentChanges(
            {
                path: 'address/' + props.id,
                params: {
                    zip_code: address.zipCode,
                    address: address.address,
                    complement: address.complement,
                    street: address.street,
                    state: address.state,
                    state_initials: address.stateInitials,
                    neighborhood: address.neighborhood,
                    city: address.city,
                }, method: 'put'
            }
        ).then(res => {
            if (res)
                setChanged(false)
        })

    }


    if (!loading)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center'}}>

                <InputLayout inputName={'Zip Code'} dark={props.dark} handleChange={handleChange} inputType={0}
                             name={'zipCode'}
                             disabled={!props.editable} size={98} required={true} initialValue={address.zipCode}
                             key={"4-3"} setChanged={setChanged}/>
                <InputLayout inputName={'Address'} dark={props.dark} handleChange={handleChange} inputType={0}
                             name={'address'}
                             disabled={!props.editable || address.zipCode.length < 8} size={48.5} required={true} initialValue={address.address}
                             key={"4-1"} setChanged={setChanged}/>
                <InputLayout inputName={'Complement'} dark={props.dark} handleChange={handleChange} inputType={0}
                             name={'complement'}
                             disabled={!props.editable || address.zipCode.length < 8} size={48.5} required={false} initialValue={address.complement}
                             key={"4-2"} setChanged={setChanged}/>


                <InputLayout inputName={'City'} dark={props.dark} handleChange={handleChange} inputType={0}
                             disabled={!props.editable || address.zipCode.length < 8} size={32} required={true} initialValue={address.city}
                             name={'city'}
                             key={"4-6"} setChanged={setChanged}/>
                <InputLayout inputName={'State'} dark={props.dark} handleChange={handleChange} inputType={0}
                             disabled={!props.editable || address.zipCode.length < 8} size={32} required={true} initialValue={address.state}
                             name={'state'}
                             key={"4-7"} setChanged={setChanged}/>
                <InputLayout inputName={'State Initials'} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'stateInitials'}
                             disabled={!props.editable || address.zipCode.length < 8} size={32} required={true}
                             initialValue={address.stateInitials}
                             key={"4-8"} setChanged={setChanged}/>

                <InputLayout inputName={'Street'} dark={props.dark} handleChange={handleChange} inputType={0}
                             name={'street'}
                             disabled={!props.editable || address.zipCode.length < 8} size={48.5} required={false} initialValue={address.street}
                             key={"4-4"} setChanged={setChanged}/>
                <InputLayout inputName={'Neighborhood'} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'neighborhood'}
                             disabled={!props.editable || address.zipCode.length < 8} size={48.5} required={false}
                             initialValue={address.neighborhood}
                             key={"4-5"} setChanged={setChanged}/>

                <Button style={{
                    width: '98%', transform: 'translateY(50px)',
                    backgroundColor: disabled() ? null : '#39adf6',
                    color: disabled() ? null : 'white'
                }} variant={'contained'}
                        disabled={disabled()}
                        onClick={() => saveChanges()}>Save</Button>
            </div>
        )
    else
        return null
}

AddressForm.propTypes = {
    id: PropTypes.number,
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool
}