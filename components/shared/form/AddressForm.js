import styles from "../../../styles/components/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {Skeleton} from "@material-ui/lab";
import InputLayout from "../layout/InputLayout";


export default function AddressForm(props) {

    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const [zipCode, setZipCode] = useState('')
    const [address, setAddress] = useState('')
    const [complement, setComplement] = useState(null)
    const [street, setStreet] = useState(null)
    const [state, setState] = useState('')
    const [stateInitials, setStateInitials] = useState('')
    const [neighborhood, setNeighborhood] = useState(null)
    const [city, setCity] = useState('')

    function disabled() {
        return (
            zipCode.length === 0 ||
            address.length === 0 ||
            city.length === 0 ||
            state.length === 0 ||
            stateInitials.length === 0 ||
            changed === false
        )
    }

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    async function fetchData() {
        await props.fetchData('person/address', {id: props.id}).then(res => {
            if (res !== null) {
                setZipCode(res.zip_code)
                setAddress(res.address)
                setComplement(res.complement)
                setStreet(res.street)
                setState(res.state)
                setStateInitials(res.state_initials)
                setNeighborhood(res.neighborhood)
                setCity(res.city)
            }
            setLoading(false)
        })
    }

    async function saveChanges() {
        await props.saveChanges(
            'person/address',
            {
                id: props.id,
                zip_code: zipCode,
                address: address,
                complement: complement,
                street: street,
                state: state,
                state_initials: stateInitials,
                neighborhood: neighborhood,
                city: city,
            }, 'put'
        ).then(res => {
            if (res)
                setChanged(false)
        })

    }


    if (!loading)
        return (
            <div className={styles.form_component_container}>
                {props.getTitle({
                    pageName: null,
                    pageTitle: 'Basic',
                    pageInfo: 'Basic form'
                })}
                <InputLayout inputName={'Address'} dark={props.dark} handleChange={setAddress} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={address}
                             key={"4-1"} setChanged={setChanged}/>
                <InputLayout inputName={'Complement'} dark={props.dark} handleChange={setComplement} inputType={0}
                             disabled={props.disabled} size={49} required={false} initialValue={complement}
                             key={"4-2"} setChanged={setChanged}/>

                <InputLayout inputName={'Zip Code'} dark={props.dark} handleChange={setZipCode} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={zipCode}
                             key={"4-3"} setChanged={setChanged}/>
                <InputLayout inputName={'Street'} dark={props.dark} handleChange={setStreet} inputType={0}
                             disabled={props.disabled} size={32} required={false} initialValue={street}
                             key={"4-4"} setChanged={setChanged}/>
                <InputLayout inputName={'Neighborhood'} dark={props.dark} handleChange={setNeighborhood} inputType={0}
                             disabled={props.disabled} size={32} required={false} initialValue={neighborhood}
                             key={"4-5"} setChanged={setChanged}/>

                <InputLayout inputName={'City'} dark={props.dark} handleChange={setCity} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={city}
                             key={"4-6"} setChanged={setChanged}/>
                <InputLayout inputName={'State'} dark={props.dark} handleChange={setState} inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={state}
                             key={"4-7"} setChanged={setChanged}/>
                <InputLayout inputName={'State Initials'} dark={props.dark} handleChange={setStateInitials}
                             inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={stateInitials}
                             key={"4-8"} setChanged={setChanged}/>


                {props.disabled ? null :
                    <Button style={{
                        width: '43vw', margin: '2vh auto',
                        backgroundColor: disabled() ? null : '#39adf6',
                        color: disabled() ? null : 'white'
                    }} variant={'contained'} disableElevation
                            disabled={disabled()}
                            onClick={() => saveChanges()}>Save</Button>
                }
            </div>
        )
    else
        return null
}

