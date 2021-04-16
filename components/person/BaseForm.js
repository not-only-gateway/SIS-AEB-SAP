import {Avatar, Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../shared/layout/InputLayout";
import AccordionLayout from "../shared/layout/AccordionLayout";
import fetchComponentData from "../../utils/person/FetchData";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import getTitle from "../../utils/person/GetTitle";
import mainStyles from '../../styles/shared/Main.module.css'
import getComponentLanguage from "../../utils/person/GetLanguage";
import {DeleteForeverRounded} from "@material-ui/icons";
import ImageHost from "../../utils/shared/ImageHost";
import {getIconStyle} from "../../styles/shared/MainStyles";

export default function BaseForm(props) {

    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const [name, setName] = useState(null)
    const [birth, setBirth] = useState(null)
    const [education, setEducation] = useState(null)
    const [gender, setGender] = useState(null)
    const [marital, setMarital] = useState(null)
    const [extension, setExtension] = useState(null)
    const [registration, setRegistration] = useState(null)
    const [corporateEmail, setCorporateEmail] = useState(null)
    const [mother, setMother] = useState(null)
    const [father, setFather] = useState(null)
    const [disabledPerson, setDisabledPerson] = useState(null)
    const [birthPlace, setBirthPlace] = useState(null)
    const [pic, setPic] = useState(null)
    const [nationality, setNationality] = useState(null)
    const [lang, setLang] = useState(null)

    useEffect(() => {
        if (!props.create)
            fetchComponentData(
                {path: 'person/' + props.id, params: {}}
            ).then(res => {
                if (res !== null) {
                    setName(res.name)
                    setBirth(res.birth)

                    setGender(res.gender)

                    setExtension(res.extension)
                    setRegistration(res.registration)
                    setCorporateEmail(res.corporate_email)

                    setDisabledPerson(res.disabled_person)

                    if(props.editable){
                        setEducation(res.education)
                        setMarital(res.marital_status)
                        setFather(res.father_name)
                        setMother(res.mother_name)
                        setBirthPlace(res.birth_place)
                    }

                    if (res.image !== null)
                        setPic({imageData: ImageHost()+res.image})
                    setNationality(res.nationality)
                }
                setLoading(false)
            })
        else
            setLoading(false)

        setLang(getComponentLanguage({locale: props.locale, component: 'base'}))
    }, [])


    function capitalizeFirstLetter(string) {
        if (string !== null && string[0] !== undefined)
            return string.replace(/^./, string[0].toUpperCase());
    }

    async function saveChanges() {
        let formData = new FormData()
        if(pic !== null && pic.image !== undefined)
            formData.append('image', pic.image[0])

        formData.append('name', name.toString())
        formData.append('birth', (typeof birth === 'object' ? birth.getTime() : birth))
        formData.append('birth_place', birthPlace?.toUpperCase())
        formData.append('education', education.toString())
        formData.append('gender', gender.toString())
        formData.append('marital_status', marital.toString())
        formData.append('registration', registration.toString())
        formData.append('extension', extension.toString())
        formData.append('corporate_email', corporateEmail?.toLocaleLowerCase())
        formData.append('father_name', capitalizeFirstLetter(father))
        formData.append('mother_name', capitalizeFirstLetter(mother))
        formData.append('disabled_person', disabledPerson.toString())
        formData.append('nationality', nationality?.toUpperCase())
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
                        corporate_email: corporateEmail.toLocaleLowerCase()
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
            name === null ||
            nationality === null ||
            birthPlace === null ||
            birth === null ||
            disabledPerson === null ||
            education === null ||
            gender === null ||
            marital === null ||
            corporateEmail === null ||
            extension === null ||
            changed === false
        )
    }

    function getFile(event) {
        let reader = new FileReader()

        if(event.target.files.length > 0) {
            reader.readAsDataURL(event.target.files[0])
            reader.onload= () => {
                setPic({
                    image: event.target.files,
                    imageData: reader.result
                })
            }

            setChanged(true)
        }
    }

    function moreFields() {
        return (
            <div
                className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth, mainStyles.displayInlineCenter].join(' ')}
                style={{marginBottom: '2vh'}}>
                <InputLayout inputName={lang.father} dark={props.dark} handleChange={setFather}
                             inputType={0}
                             disabled={!props.editable} size={props.create ? 32: 30} required={false} initialValue={father}
                             key={"1-3"} setChanged={setChanged}/>
                <InputLayout inputName={lang.mother} dark={props.dark} handleChange={setMother}
                             inputType={0}
                             disabled={!props.editable} size={props.create ? 32: 30} required={false} initialValue={mother}
                             key={"1-4"} setChanged={setChanged}/>
                <InputLayout inputName={lang.birthPlace} dark={props.dark}
                             handleChange={setBirthPlace} inputType={0}
                             disabled={!props.editable} size={props.create ? 32: 30} required={true}
                             initialValue={birthPlace}
                             key={"1-5"} setChanged={setChanged}/>
                <InputLayout inputName={lang.education} dark={props.dark}
                             handleChange={setEducation}
                             inputType={1}
                             disabled={!props.editable} size={props.create ? 49: 46} required={true}
                             initialValue={education}
                             selectFields={lang.educationChoice}
                             key={"1-9"} setChanged={setChanged}/>
                <InputLayout inputName={lang.marital} dark={props.dark} handleChange={setMarital}
                             inputType={1}
                             disabled={!props.editable} size={props.create ? 49: 46} required={true} initialValue={marital}
                             selectFields={lang.maritalChoice}
                             key={"1-11"} setChanged={setChanged}/>
            </div>
        )
    }

    if (!loading && lang !== null)
        return (
            <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth].join(' ')}
                 style={{marginTop: props.create ? '2vh' : null}}>
                {!props.create ? getTitle({
                    pageTitle: lang.title,
                    pageInfo: lang.info,
                    dark: props.dark
                }) : null}
                <div className={[mainStyles.displayInlineSpaced, mainStyles.mediumWidth].join(' ')}>
                    {!props.editable || pic !== null ? null :
                        <input id='profile-image-input' type={'file'} accept={'image/*'} onChange={getFile}
                               style={{display: 'none'}}/>}
                    <label htmlFor={'profile-image-input'}>
                        <Button disabled={!props.editable || pic !== null} component={'span'}>
                            <Avatar src={pic !== null ? pic.imageData : null} style={{width: '120px', height: '120px'}}/>
                        </Button>
                    </label>
                    {!props.editable ? null : pic !== null ?
                        <Button onClick={() => setPic(null)}><DeleteForeverRounded style={getIconStyle({dark: props.dark})}/></Button> : null}
                    <InputLayout inputName={lang.name} dark={props.dark} handleChange={setName} inputType={0}
                                 disabled={!props.editable} size={pic !== null ? 70 : 79} required={true}
                                 initialValue={name}
                                 key={"1-1"} setChanged={setChanged} margin={false}/>
                </div>
                <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth].join(' ')}
                     style={{marginBottom: props.editable ? null : '2vh'}}>

                    <InputLayout inputName={lang.corporateEmail} dark={props.dark}
                                 handleChange={setCorporateEmail}
                                 inputType={0} disabled={!props.editable} size={66} required={true}
                                 initialValue={corporateEmail} key={"1-12"} setChanged={setChanged}/>
                    <InputLayout inputName={lang.extension} dark={props.dark} handleChange={setExtension}
                                 inputType={0} disabled={!props.editable} size={32} required={true}
                                 initialValue={extension} key={"1-13"} setChanged={setChanged}/>
                    <InputLayout inputName={lang.registration} dark={props.dark} handleChange={setRegistration}
                                 inputType={0} disabled={!props.editable} size={32} required={false}
                                 initialValue={registration} key={"1-14"} setChanged={setChanged}/>
                    <InputLayout inputName={lang.nationality} dark={props.dark} handleChange={setNationality}
                                 inputType={0}
                                 disabled={!props.editable} size={32} required={true} initialValue={nationality}
                                 key={"1-6"} setChanged={setChanged}/>

                    <InputLayout inputName={lang.birth} dark={props.dark} handleChange={setBirth} inputType={2}
                                 disabled={!props.editable} size={32} required={true} initialValue={birth}
                                 key={"1-7"} setChanged={setChanged}/>

                    <InputLayout inputName={lang.disabledPerson} dark={props.dark}
                                 handleChange={setDisabledPerson}
                                 inputType={1}
                                 disabled={!props.editable} size={49} required={true} initialValue={disabledPerson}
                                 selectFields={lang.choice}
                                 key={"1-8"} setChanged={setChanged}/>

                    <InputLayout inputName={lang.gender} dark={props.dark} handleChange={setGender} inputType={1}
                                 disabled={!props.editable} size={49} required={true} initialValue={gender}
                                 selectFields={lang.genderChoice}
                                 key={"1-10"} setChanged={setChanged}/>
                    {props.create === false ?
                        <div>
                            <AccordionLayout
                                content={
                                    moreFields()
                                }
                                summary={

                                    <p>{lang.more}</p>
                                }
                                disabled={!props.visible}
                                closedSize={40}
                                openSize={40}
                                border={null}
                                dark={props.dark}
                                background={'#484c55'}
                            />
                        </div> :
                        moreFields()
                    }
                </div>

                {!props.editable ? null :
                    <Button style={{
                        width: '43vw', margin: 'auto auto .8vw',
                        backgroundColor: disabled() ? null : '#39adf6',
                        color: disabled() ? null : 'white'
                    }} variant={'contained'} disableElevation
                            disabled={disabled()}
                            onClick={() => saveChanges()}>{props.create ? lang.create : lang.save}</Button>
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
    redirect: PropTypes.func
}