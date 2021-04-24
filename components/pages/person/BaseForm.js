import {Avatar, Button, createMuiTheme, ThemeProvider} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../../layout/InputLayout";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetLanguage";
import {DeleteForeverRounded} from "@material-ui/icons";
import {getIconStyle, getSecondaryBackground} from "../../../styles/shared/MainStyles";
import AvatarLayout from "../index/AvatarLayout";
import fetchActivityData from "../../../utils/activity/FetchData";
import SelectorLayout from "./Selector";
import mapToSelect from "../../../utils/person/MapToSelect";
import CountryOptions from "../../../utils/person/CountryOptions";
import StateOptions from "../../../utils/person/StateSelector";
import ImageHost from "../../../utils/shared/ImageHost";

export default function BaseForm(props) {


    const [changed, setChanged] = useState(false)
    const [image, setImage] = useState({
        file: null,
        imageSrc: ImageHost() + props.profile.image,
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

        if (image.file !== null)
            formData.append('image', image.file[0])
        else if (image.removed)
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
        await axios({
            method: props.create === true ? 'post' : 'put',
            url: props.create ? Host() + 'person' : Host() + 'person/' + props.id,
            headers: {'authorization': (new Cookies()).get('jwt'), 'content-type': 'multipart/form-data'},
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
                    console.log(res.data)
                    props.redirect(res.data)
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
            props.profile.birth === null ||
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

        if (event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0])
            reader.onload = () => {
                setImage({
                    imageSrc: reader.result,
                    file: event.target.files
                })
            }
            setChanged(true)
        }
    }


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp} style={{justifyContent: 'center'}}>

                <div style={{width: '23.6%', border: '#e2e2e2 1px solid', borderRadius: '8px'}}
                     className={mainStyles.displayInlineSpaced}>
                    <Avatar
                        src={image.imageSrc}
                        variant={'rounded'}
                        style={{width: '100px', height: '100px'}}/>

                    <div style={{transform: 'translateX(5px)', height: '100px'}}
                         className={mainStyles.displayColumnSpaced}>
                        <input id='profile-image-input' type={'file'} accept={'image/*'} onChange={getFile}/>
                        <Button variant={"contained"} style={{
                            backgroundColor: props.profile.image !== undefined || image.file !== null ? '#f54269' : 'initial',
                            color: props.profile.image !== undefined || image.file !== null ? 'white' : 'initial',
                            width: 'fit-content'
                        }}
                                onClick={() => setImage({file: null, imageSrc: null, removed: true})}
                                disabled={props.profile.image === undefined || props.profile.image === null}>
                            Remove
                        </Button>
                    </div>
                </div>
                <InputLayout inputName={lang.name} dark={props.dark} handleChange={props.handleChange} inputType={0}
                             disabled={!props.editable} size={23.6} required={true}
                             initialValue={props.profile.name} name={'name'}
                             key={"1-1"} setChanged={setChanged} margin={false}/>


                <InputLayout inputName={lang.corporateEmail} dark={props.dark}
                             handleChange={props.handleChange} name={'corporate_email'}
                             inputType={0} disabled={!props.editable} size={23.6} required={true}
                             initialValue={props.profile.corporate_email} key={"1-12"} setChanged={setChanged}/>
                <InputLayout inputName={lang.extension} dark={props.dark} handleChange={props.handleChange} numeric={true} maxLength={4}
                             inputType={0} disabled={!props.editable} size={23.6} required={true} name={'extension'}
                             initialValue={props.profile.extension} key={"1-13"} setChanged={setChanged}/>
                <InputLayout inputName={lang.registration} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} disabled={!props.editable} size={48.3} required={false}
                             name={'registration'}
                             initialValue={props.profile.registration} key={"1-14"} setChanged={setChanged}/>


                <InputLayout inputName={lang.birth} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'birth'}
                             disabled={!props.editable} size={48.3} required={true} initialValue={props.profile.birth}
                             key={"1-7"} setChanged={setChanged}/>

                <InputLayout inputName={lang.disabledPerson} dark={props.dark}
                             handleChange={props.handleChange}
                             inputType={1} name={'disabled_person'}
                             disabled={!props.editable} size={23.6} required={true}
                             initialValue={props.profile.disabled_person}
                             selectFields={lang.choice}
                             key={"1-8"} setChanged={setChanged}/>

                <InputLayout inputName={lang.gender} dark={props.dark} handleChange={props.handleChange}
                             inputType={1} name={'gender'}
                             disabled={!props.editable} size={23.6} required={true}
                             initialValue={props.profile.gender}
                             selectFields={lang.genderChoice}
                             key={"1-10"} setChanged={setChanged}/>

                <InputLayout inputName={lang.education} dark={props.dark}
                             handleChange={props.handleChange}
                             inputType={1} name={'education'}
                             disabled={!props.editable} size={23.6} required={true}
                             initialValue={props.profile.education}
                             selectFields={lang.educationChoice}
                             key={"1-9"} setChanged={setChanged}/>
                <InputLayout inputName={lang.marital} dark={props.dark} handleChange={props.handleChange}
                             inputType={1} name={'marital_status'}
                             disabled={!props.editable} size={23.6} required={true}
                             initialValue={props.profile.marital_status}
                             selectFields={lang.maritalChoice}
                             key={"1-11"} setChanged={setChanged}/>

                <InputLayout inputName={lang.father} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'father_name'}
                             disabled={!props.editable} size={48.3} required={false}
                             initialValue={props.profile.father_name}
                             key={"1-3"} setChanged={setChanged}/>
                <InputLayout inputName={lang.mother} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'mother_name'}
                             disabled={!props.editable} size={48.3} required={false}
                             initialValue={props.profile.mother_name}
                             key={"1-4"} setChanged={setChanged}/>


                <SelectorLayout required={true}
                                selected={{key: props.profile.birth_place, value: props.profile.birth_place}}
                                handleChange={handleBirthPlaceChange}
                                label={lang.birthPlace} key={'1-5-'} setChanged={setChanged}
                                data={StateOptions} width={48.3}/>
                <SelectorLayout required={true}
                                selected={{key: props.profile.nationality, value: props.profile.nationality}}
                                handleChange={handleNationalityChange} setChanged={setChanged}
                                label={lang.nationality} key={'1-6-'}
                                data={CountryOptions} width={48.3}/>

                {!props.editable ? null :
                    <Button style={{
                        width: '98%', marginTop: '50px',
                        backgroundColor: disabled() ? null : '#0095ff',
                        color: disabled() ? null : 'white'
                    }} disabled={disabled()} variant={'contained'} onClick={() => saveChanges()}>
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
    setID: PropTypes.func,
    redirect: PropTypes.func,
    profile: PropTypes.object,
    handleChange: PropTypes.func
}
