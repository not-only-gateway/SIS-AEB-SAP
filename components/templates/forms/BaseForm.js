import {Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../modules/InputLayout";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import CountryOptions from "../../../packages/options/CountryOptions";
import StateOptions from "../../../packages/options/StateSelector";
import ImageSelector from "../../modules/inputs/ImageField";
import Selector from "../../modules/inputs/Selector";
import getImage from "../../../utils/shared/GetImage";
import TextField from "../../modules/inputs/TextField";
import DateField from "../../modules/inputs/DateField";
import DropDownField from "../../modules/inputs/DropDownField";
import Alert from "../../layout/Alert";

export default function BaseForm(props) {


    const [changed, setChanged] = useState(false)
    const [image, setImage] = useState({
        file: null,
        imageSrc: props.person.image,
        removed: false
    })
    const [lang, setLang] = useState(null)
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    useEffect(() => {

        setLang(getComponentLanguage({locale: props.locale, component: 'base'}))
    }, [])


    function handleNationalityChange(event) {

        props.handleChange({name: 'nationality', value: event !== undefined ? event.value : null})
    }

    function handleBirthPlaceChange(event) {
        props.handleChange({name: 'birth_place', value: event !== undefined ? event.value : null})
    }


    function disabled() {
        return (
            props.person.name === null ||
            props.person.nationality === null ||
            props.person.birth_place === null ||
            props.person.birth === null ||
            props.person.disabled_person === null ||
            props.person.education === null ||
            props.person.gender === null ||
            props.person.marital_status === null ||
            !props.person.name ||
            !props.person.nationality ||
            !props.person.birth_place ||
            !props.person.birth ||
            props.person.disabled_person === undefined ||
            !props.person.education ||
            !props.person.gender ||
            !props.person.marital_status ||
            changed === false
        )
    }


    if (lang !== null)
        return (
            <div
                style={{
                    display: 'inline-flex',
                    flexFlow: 'row wrap',
                    gap: '32px',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                <Alert
                    type={'error'} message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}/>

                <h4 style={{width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>
                    {lang.personal}
                </h4>
                <ImageSelector
                    initialImage={props.person.image !== null ? props.person.image : null}
                    size={'100px'}
                    setImage={event => props.handleChange({
                        name: 'image',
                        value: event !== null ? event.target.files[0] : null
                    })} label={lang.personImage}
                    width={'calc(25% - 24px)'} setChanged={setChanged}/>

                <TextField placeholder={lang.name} label={lang.name} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'name', value: event.target.value})
                }} locale={props.locale} value={props.person.name} required={true} width={'calc(75% - 12px)'}
                           maxLength={undefined}/>

                <DateField
                    placeholder={lang.birth} label={lang.birth}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'birth', value: event.target.value})
                    }} locale={props.locale}
                    value={
                        typeof (props.person.birth) === 'number' ?
                            new Date(props.person.birth).toLocaleDateString().replace('/', '-')
                            :
                            props.person.birth
                    }
                    required={true} width={'calc(50% - 16px)'}/>


                <DropDownField
                    placeholder={lang.disabledPerson}
                    label={lang.disabledPerson}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'disabled_person', value: event})
                    }} locale={props.locale} value={props.person.disabled_person} required={true}
                    width={'calc(50% - 16px)'} choices={lang.choice}/>

                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.life}
                </h4>


                {/*<InputLayout inputName={lang.gender} dark={props.dark} handleChange={props.handleChange}*/}
                {/*             inputType={1} name={'gender'}*/}
                {/*             disabled={!props.editable} size={'calc(33.333% - 21.35px)'} required={true}*/}
                {/*             initialValue={props.person.gender}*/}
                {/*             selectFields={lang.genderChoice}*/}
                {/*             key={"1-10"} setChanged={setChanged}/>*/}
                <DropDownField
                    placeholder={lang.gender}
                    label={lang.gender}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'gender', value: event})
                    }} locale={props.locale} value={props.person.gender} required={true}
                    width={'calc(33.333% - 21.35px)'} choices={lang.genderChoice}/>

                <DropDownField
                    placeholder={lang.education}
                    label={lang.education}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'education', value: event})
                    }} locale={props.locale} value={props.person.education} required={true}
                    width={'calc(33.333% - 21.35px)'} choices={lang.educationChoice}/>

                <DropDownField
                    placeholder={lang.marital}
                    label={lang.marital}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'marital_status', value: event})
                    }}
                    locale={props.locale}
                    value={props.person.marital_status} required={true}
                    width={'calc(33.333% - 21.35px)'}
                    choices={lang.maritalChoice}/>
                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.parents}
                </h4>
                <TextField placeholder={lang.father} label={lang.father} handleChange={event => {
                    setChanged(true)
                    props.handleChange({name: 'father_name', value: event.target.value})
                }} locale={props.locale} value={props.person.father_name} required={false} width={'calc(50% - 16px)'}/>

                <TextField
                    placeholder={lang.mother}
                    label={lang.mother}
                    handleChange={event => {
                        setChanged(true)
                        props.handleChange({name: 'mother_name', value: event.target.value})
                    }}
                    locale={props.locale}
                    value={props.person.mother_name}
                    required={false}
                    width={'calc(50% - 16px)'}/>


                <Selector required={true}
                          selected={{key: props.person.birth_place, value: props.person.birth_place}}
                          handleChange={handleBirthPlaceChange}
                          label={lang.birthPlace} key={'1-5-'} setChanged={setChanged}
                          data={StateOptions} width={'calc(50% - 16px)'}/>
                <Selector required={true}
                          selected={{key: props.person.nationality, value: props.person.nationality}}
                          handleChange={handleNationalityChange} setChanged={setChanged}
                          label={lang.nationality} key={'1-6-'}
                          data={CountryOptions} width={'calc(50% - 16px)'}/>

                {!props.editable ? null :
                    <Button style={{
                        width: '100%',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: disabled() ? '#777777' : 'white',
                        fontWeight: 550,

                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        props.handleSubmit({
                            person: props.person,
                            image: image,
                            personID: props.id,
                            create: props.create,
                            setStatus: setStatus
                        }).then(res => {

                            setChanged(!res.status)
                            if (props.setAccepted !== undefined) {
                                props.setAccepted(res.status)
                                props.setID(res.id)

                            }

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

BaseForm.propTypes = {
    id: PropTypes.number,
    person: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    editable: PropTypes.bool,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
    setID: PropTypes.func
}
