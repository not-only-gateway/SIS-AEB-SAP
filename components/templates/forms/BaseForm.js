import {Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../modules/InputLayout";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import CountryOptions from "../../../packages/options/CountryOptions";
import StateOptions from "../../../packages/options/StateSelector";
import ImageSelector from "../../modules/selector/ImageSelector";
import Selector from "../../modules/selector/Selector";

export default function BaseForm(props) {


    const [changed, setChanged] = useState(false)
    const [image, setImage] = useState({
        file: null,
        imageSrc: props.profile.image,
        removed: false
    })
    const [lang, setLang] = useState(null)

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'base'}))
    }, [])


    function capitalizeFirstLetter(string) {
        if (string !== null && string[0] !== undefined)
            return string.replace(/^./, string[0].toUpperCase());
    }

    function handleNationalityChange(event) {

        props.handleChange({name: 'nationality', value: event !== undefined ? event.value : null})
    }

    function handleBirthPlaceChange(event) {
        props.handleChange({name: 'birth_place', value: event !== undefined ? event.value : null})
    }

    async function saveChanges() {
        let formData = new FormData()

        if (image.file !== null) {
            formData.append('image', image.file[0])
        } else if (image.removed)
            formData.append('removed_image', 'true')
        formData.append('name', props.profile.name.toString())
        formData.append('birth', (typeof props.profile.birth !== 'number' ? new Date(props.profile.birth).getTime() : props.profile.birth))
        formData.append('birth_place', props.profile.birth_place?.toUpperCase())
        formData.append('education', props.profile.education.toString())
        formData.append('gender', props.profile.gender.toString())
        formData.append('marital_status', props.profile.marital_status.toString())
        formData.append('registration', props.profile.registration.toString())
        formData.append('extension', props.profile.extension.toString())
        formData.append('corporate_email', props.profile.corporate_email?.toLocaleLowerCase())
        formData.append('father_name', capitalizeFirstLetter(props.profile.father_name))
        formData.append('mother_name', capitalizeFirstLetter(props.profile.mother_name))
        formData.append('disabled_person', props.profile.disabled_person.toString())
        formData.append('nationality', props.profile.nationality?.toUpperCase())

        formData.append('authorization_token', (new Cookies()).get('authorization_token'))

        await axios({
            method: props.create === true ? 'post' : 'put',
            url: props.create ? Host() + 'person' : Host() + 'person/' + props.id,
            headers: {'authorization': (new Cookies()).get('jwt'), 'content-type': 'multipart/forms-data'},
            data: formData
        }).then(async function () {
            if (!props.create)
                setChanged(false)
            else {
                await axios({
                    method: "get",
                    url: Host() + 'corporate_email/person',
                    headers: {'authorization': (new Cookies()).get('jwt')},
                    params: {
                        corporate_email: props.profile.corporate_email.toLocaleLowerCase()
                    }
                }).then(res => {
                    props.setNext(true)
                }).catch(error => {
                    console.log(error)
                })
            }
        }).catch(error => {
            console.log(error)
        })

    }

    function disabled() {
        return (
            props.profile.name === null ||
            props.profile.nationality === null ||
            props.profile.birth_place === null ||
            props.profile.birth === undefined ||
            props.profile.disabled_person === null ||
            props.profile.education === null ||
            props.profile.gender === null ||
            props.profile.marital_status === null ||
            props.profile.corporate_email === null ||
            props.profile.extension === null ||
            changed === false
        )
    }

    function getFile(event) {
        let reader = new FileReader()

        if (event !== null && event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setImage({
                    imageSrc: reader.result,
                    file: event.target.files
                })
            }
            setChanged(true)
        } else {
            setImage({file: null, imageSrc: null, removed: true})
            props.handleChange({name: 'image', value: null})
        }

    }


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center'}}>
                <ImageSelector initialImage={props.profile.image === null ? image.imageSrc : props.profile.image}
                               size={'100px'} setImage={getFile} label={'Profile Image'}
                               base64={props.profile.image === null} setChanged={setChanged}/>
                <InputLayout inputName={lang.name} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.profile.name} name={'name'}
                             key={"1-1"} setChanged={setChanged} margin={false}/>

                <InputLayout inputName={lang.birth} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'birth'}
                             disabled={!props.editable} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.profile.birth}
                             key={"1-7"} setChanged={setChanged}/>

                <InputLayout inputName={lang.disabledPerson} dark={props.dark}
                             handleChange={props.handleChange}
                             inputType={1} name={'disabled_person'}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.profile.disabled_person}
                             selectFields={lang.choice}
                             key={"1-8"} setChanged={setChanged}/>

                <InputLayout inputName={lang.gender} dark={props.dark} handleChange={props.handleChange}
                             inputType={1} name={'gender'}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.profile.gender}
                             selectFields={lang.genderChoice}
                             key={"1-10"} setChanged={setChanged}/>

                <InputLayout inputName={lang.education} dark={props.dark}
                             handleChange={props.handleChange}
                             inputType={1} name={'education'}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.profile.education}
                             selectFields={lang.educationChoice}
                             key={"1-9"} setChanged={setChanged}/>
                <InputLayout inputName={lang.marital} dark={props.dark} handleChange={props.handleChange}
                             inputType={1} name={'marital_status'}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.profile.marital_status}
                             selectFields={lang.maritalChoice}
                             key={"1-11"} setChanged={setChanged}/>

                <InputLayout inputName={lang.father} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'father_name'}
                             disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                             initialValue={props.profile.father_name}
                             key={"1-3"} setChanged={setChanged}/>
                <InputLayout inputName={lang.mother} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'mother_name'}
                             disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                             initialValue={props.profile.mother_name}
                             key={"1-4"} setChanged={setChanged}/>


                <Selector required={true}
                          selected={{key: props.profile.birth_place, value: props.profile.birth_place}}
                          handleChange={handleBirthPlaceChange}
                          label={lang.birthPlace} key={'1-5-'} setChanged={setChanged}
                          data={StateOptions} width={'calc(50% - 8px)'}/>
                <Selector required={true}
                          selected={{key: props.profile.nationality, value: props.profile.nationality}}
                          handleChange={handleNationalityChange} setChanged={setChanged}
                          label={lang.nationality} key={'1-6-'}
                          data={CountryOptions} width={'calc(50% - 8px)'}/>

                {!props.editable ? null :
                    <Button style={{
                        width: '100%', marginTop: '50px',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: 'white'
                    }} disabled={disabled()} variant={'contained'} onClick={() => {
                        saveChanges()
                        if (props.setNext !== undefined)
                            props.setNext()
                    }
                    }>
                        {props.create ? lang.create : lang.save}
                    </Button>
                }
            </div>
        )
    else
        return null

}

BaseForm.propTypes = {
    id: PropTypes.string,
    dark: PropTypes.bool,
    create: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    getTitle: PropTypes.func,
    locale: PropTypes.string,
    profile: PropTypes.object,
    handleChange: PropTypes.func,
    setNext: PropTypes.func
}
