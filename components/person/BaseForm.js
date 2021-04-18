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
import getComponentLanguage from "../../utils/shared/GetLanguage";
import {DeleteForeverRounded} from "@material-ui/icons";
import ImageHost from "../../utils/shared/ImageHost";
import {getIconStyle, getPrimaryBackground} from "../../styles/shared/MainStyles";
import AvatarLayout from "../shared/AvatarLayout";

export default function BaseForm(props) {


    const [changed, setChanged] = useState(false)
    const [image, setImage] = useState(null)
    const [lang, setLang] = useState(null)

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'base'}))
    }, [])


    function capitalizeFirstLetter(string) {
        if (string !== null && string[0] !== undefined)
            return string.replace(/^./, string[0].toUpperCase());
    }

    async function saveChanges() {
        let formData = new FormData()
        if (props.profile.image !== null && image.image !== undefined)
            formData.append('image', image.image[0])

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
                setImage(reader.result)
                props.handleChange({name: 'image', value: event.target.files})
            }
            setChanged(true)
        }
    }

    function moreFields() {
        return (
            <div
                className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth, mainStyles.displayInlineCenter].join(' ')}
                style={{marginBottom: '2vh'}}>
                <InputLayout inputName={lang.father} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'father_name'}
                             disabled={!props.editable} size={props.create ? 32 : 30} required={false}
                             initialValue={props.profile.father_name}
                             key={"1-3"} setChanged={setChanged}/>
                <InputLayout inputName={lang.mother} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'mother_name'}
                             disabled={!props.editable} size={props.create ? 32 : 30} required={false}
                             initialValue={props.profile.mother_name}
                             key={"1-4"} setChanged={setChanged}/>
                <InputLayout inputName={lang.birthPlace} dark={props.dark}
                             handleChange={props.handleChange} inputType={0}
                             disabled={!props.editable} size={props.create ? 32 : 30} required={true}
                             initialValue={props.profile.birth_place} name={'birth_place'}
                             key={"1-5"} setChanged={setChanged}/>
                <InputLayout inputName={lang.education} dark={props.dark}
                             handleChange={props.handleChange}
                             inputType={1} name={'education'}
                             disabled={!props.editable} size={props.create ? 49 : 46} required={true}
                             initialValue={props.profile.education}
                             selectFields={lang.educationChoice}
                             key={"1-9"} setChanged={setChanged}/>
                <InputLayout inputName={lang.marital} dark={props.dark} handleChange={props.handleChange}
                             inputType={1} name={'marital_status'}
                             disabled={!props.editable} size={props.create ? 49 : 46} required={true}
                             initialValue={props.profile.marital_status}
                             selectFields={lang.maritalChoice}
                             key={"1-11"} setChanged={setChanged}/>
            </div>
        )
    }

    if (lang !== null)
        return (
            <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.baseWidth].join(' ')}
                 style={{
                     ...getPrimaryBackground({dark: props.dark}), ...{
                         transform: 'translateY(3vh)',
                         justifyContent: 'center'
                     }
                 }}>
                <div
                    className={[mainStyles.displayInlineSpaced, mainStyles.mediumWidth, mainStyles.normalBorder].join(' ')}
                    style={{marginTop: '2vh'}}>
                    {!props.editable || image !== null ? null :
                        <input id='profile-image-input' type={'file'} accept={'image/*'} onChange={getFile}
                               style={{display: 'none'}}/>}
                    <label htmlFor={'profile-image-input'}>
                        <Button disabled={!props.editable || props.profile.image !== null} component={'span'}
                                style={{padding: '0', width: '50%'}}>
                            <AvatarLayout dark={props.dark} cakeDay={false} key={props.id}
                                          image={props.profile.image !== null ? props.profile.image : image}/>
                        </Button>
                    </label>
                    {!props.editable ? null : image !== null ?
                        <Button onClick={() => props.handleChange({name: 'image', value: null})}><DeleteForeverRounded
                            style={getIconStyle({dark: props.dark})}/></Button> : null}
                    <InputLayout inputName={lang.name} dark={props.dark} handleChange={props.handleChange} inputType={0}
                                 disabled={!props.editable} size={79} required={true}
                                 initialValue={props.profile.name} name={'name'}
                                 key={"1-1"} setChanged={setChanged} margin={false}/>
                </div>
                <div className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth].join(' ')}
                     style={{...{marginBottom: props.editable ? null : '2vh'}}}>

                    <InputLayout inputName={lang.corporateEmail} dark={props.dark}
                                 handleChange={props.handleChange} name={'corporate_email'}
                                 inputType={0} disabled={!props.editable} size={66} required={true}
                                 initialValue={props.profile.corporate_email} key={"1-12"} setChanged={setChanged}/>
                    <InputLayout inputName={lang.extension} dark={props.dark} handleChange={props.handleChange}
                                 inputType={0} disabled={!props.editable} size={32} required={true} name={'extension'}
                                 initialValue={props.profile.extension} key={"1-13"} setChanged={setChanged}/>
                    <InputLayout inputName={lang.registration} dark={props.dark} handleChange={props.handleChange}
                                 inputType={0} disabled={!props.editable} size={32} required={false}
                                 name={'registration'}
                                 initialValue={props.profile.registration} key={"1-14"} setChanged={setChanged}/>
                    <InputLayout inputName={lang.nationality} dark={props.dark} handleChange={props.handleChange}
                                 inputType={0} name={'nationality'}
                                 disabled={!props.editable} size={32} required={true}
                                 initialValue={props.profile.nationality}
                                 key={"1-6"} setChanged={setChanged}/>

                    <InputLayout inputName={lang.birth} dark={props.dark} handleChange={props.handleChange}
                                 inputType={2} name={'birth'}
                                 disabled={!props.editable} size={32} required={true} initialValue={props.profile.birth}
                                 key={"1-7"} setChanged={setChanged}/>

                    <InputLayout inputName={lang.disabledPerson} dark={props.dark}
                                 handleChange={props.handleChange}
                                 inputType={1} name={'disabled_person'}
                                 disabled={!props.editable} size={49} required={true}
                                 initialValue={props.profile.disabled_person}
                                 selectFields={lang.choice}
                                 key={"1-8"} setChanged={setChanged}/>

                    <InputLayout inputName={lang.gender} dark={props.dark} handleChange={props.handleChange}
                                 inputType={1} name={'gender'}
                                 disabled={!props.editable} size={49} required={true}
                                 initialValue={props.profile.gender}
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
                                closedSize={43}
                                openSize={43}
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
    redirect: PropTypes.func,
    profile: PropTypes.object,
    handleChange: PropTypes.func
}