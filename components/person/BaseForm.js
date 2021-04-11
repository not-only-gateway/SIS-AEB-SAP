import styles from '../../styles/components/form/Form.module.css';
import {Avatar, Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import InputLayout from "../shared/layout/InputLayout";
import AccordionLayout from "../shared/layout/AccordionLayout";
import fetchComponentData from "../../utils/person/FetchData";
import saveComponentChanges from "../../utils/person/SaveChanges";

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

    useEffect(() => {
        fetchComponentData(
            {path: 'person/' + props.id, params: {}}
        ).then(res => {
            if (res !== null) {
                setName(res.name)
                setBirth(res.birth)
                setEducation(res.education)
                setGender(res.gender)
                setMarital(res.marital_status)
                setExtension(res.extension)
                setRegistration(res.registration)
                setCorporateEmail(res.corporate_email)
                setFather(res.father_name)
                setMother(res.mother_name)
                setDisabledPerson(res.disabled_person)
                setBirthPlace(res.birth_place)
                setPic(res.pic)
                setNationality(res.nationality)
            }
        })
        setLoading(false)
    }, [])


    function capitalizeFirstLetter(string) {
        if (string !== null)
            return string.replace(/^./, string[0].toUpperCase());
    }

    async function saveChanges() {
        await saveComponentChanges({
            path: 'person/' + props.id,
            params: {
                id: props.id,
                pic: pic,
                name: capitalizeFirstLetter(name),
                birth: birth,
                birth_place: birthPlace?.toUpperCase(),
                education: education,
                gender: gender,
                marital_status: marital,
                extension: extension,
                registration: registration,
                corporate_email: corporateEmail?.toLocaleLowerCase(),
                father_name: capitalizeFirstLetter(father),
                mother_name: capitalizeFirstLetter(mother),
                disabled_person: disabledPerson,
                nationality: nationality?.toUpperCase(),
            },
            method: 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }

    function disabled() {
        return (
            name === null ||
            father === null ||
            mother === null ||
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

    if (!loading)
        return (
            <div className={styles.form_component_container}>
                {props.getTitle({
                    pageName: null,
                    pageTitle: 'Basic',
                    pageInfo: 'Basic form'
                })}
                <div className={styles.form_row}>
                    <Button disabled={!props.editable}>
                        <Avatar src={pic} style={{width: '100px', height: '100px'}}/>
                    </Button>
                    <InputLayout inputName={props.lang.name} dark={props.dark} handleChange={setName} inputType={0}
                                 disabled={!props.editable} size={85} required={true} initialValue={name}
                                 key={"1-1"} setChanged={setChanged} margin={false}/>
                </div>
                <div className={styles.form_component_container} style={{width: '45vw'}}>

                    <InputLayout inputName={props.lang.corporateEmail} dark={props.dark}
                                 handleChange={setCorporateEmail}
                                 inputType={0} disabled={!props.editable} size={66} required={true}
                                 initialValue={corporateEmail} key={"1-12"} setChanged={setChanged}/>
                    <InputLayout inputName={props.lang.extension} dark={props.dark} handleChange={setExtension}
                                 inputType={0} disabled={!props.editable} size={32} required={true}
                                 initialValue={extension} key={"1-13"} setChanged={setChanged}/>
                    <InputLayout inputName={props.lang.registration} dark={props.dark} handleChange={setRegistration}
                                 inputType={0} disabled={!props.editable} size={32} required={false}
                                 initialValue={registration} key={"1-14"} setChanged={setChanged}/>
                    <InputLayout inputName={props.lang.nationality} dark={props.dark} handleChange={setNationality}
                                 inputType={0}
                                 disabled={!props.editable} size={32} required={true} initialValue={nationality}
                                 key={"1-6"} setChanged={setChanged}/>

                    <InputLayout inputName={props.lang.birth} dark={props.dark} handleChange={setBirth} inputType={2}
                                 disabled={!props.editable} size={32} required={true} initialValue={birth}
                                 key={"1-7"} setChanged={setChanged}/>

                    <InputLayout inputName={props.lang.disabledPerson} dark={props.dark}
                                 handleChange={setDisabledPerson}
                                 inputType={1}
                                 disabled={!props.editable} size={49} required={true} initialValue={disabledPerson}
                                 selectFields={props.lang.choice}
                                 key={"1-8"} setChanged={setChanged}/>

                    <InputLayout inputName={props.lang.gender} dark={props.dark} handleChange={setGender} inputType={1}
                                 disabled={!props.editable} size={49} required={true} initialValue={gender}
                                 selectFields={props.lang.genderChoice}
                                 key={"1-10"} setChanged={setChanged}/>
                </div>
                <div style={{margin: 'auto'}}>
                    <AccordionLayout
                        content={
                            <div className={styles.form_component_container} style={{width: '38vw'}}>
                                <InputLayout inputName={props.lang.father} dark={props.dark} handleChange={setFather}
                                             inputType={0}
                                             disabled={!props.editable} size={32} required={true} initialValue={father}
                                             key={"1-3"} setChanged={setChanged}/>
                                <InputLayout inputName={props.lang.mother} dark={props.dark} handleChange={setMother}
                                             inputType={0}
                                             disabled={!props.editable} size={32} required={true} initialValue={mother}
                                             key={"1-4"} setChanged={setChanged}/>
                                <InputLayout inputName={props.lang.birthPlace} dark={props.dark}
                                             handleChange={setBirthPlace} inputType={0}
                                             disabled={!props.editable} size={32} required={true}
                                             initialValue={birthPlace}
                                             key={"1-5"} setChanged={setChanged}/>
                                <InputLayout inputName={props.lang.education} dark={props.dark}
                                             handleChange={setEducation}
                                             inputType={1}
                                             disabled={!props.editable} size={49} required={true}
                                             initialValue={education}
                                             selectFields={props.lang.educationChoice}
                                             key={"1-9"} setChanged={setChanged}/>
                                <InputLayout inputName={props.lang.marital} dark={props.dark} handleChange={setMarital}
                                             inputType={1}
                                             disabled={!props.editable} size={49} required={true} initialValue={marital}
                                             selectFields={props.lang.maritalChoice}
                                             key={"1-11"} setChanged={setChanged}/>

                            </div>
                        }
                        summary={

                            <p>More</p>
                        }
                        disabled={!props.visible}
                        closedSize={40}
                        openSize={40}
                        border={null}
                    />
                </div>

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

BaseForm.propTypes = {
    lang: PropTypes.object,
    id: PropTypes.string,
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    getTitle: PropTypes.func
}