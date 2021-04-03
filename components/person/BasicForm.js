import styles from '../../styles/form/Form.module.css';
import {Avatar, Button} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import {Skeleton} from '@material-ui/lab';
import PropTypes from 'prop-types'
import InputLayout from "../shared/InputLayout";

export default function BasicForm(props) {

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
    const [admin, setAdmin] = useState(null)


    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    async function fetchData() {
        await props.fetchData('person', {id: props.id}).then(res => {
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
                setAdmin(res.is_administrator)
            }
        })
        setLoading(false)
    }

    async function saveChanges() {
        props.saveChanges(
            'person',
            {
                id: props.id,
                pic: pic,
                name: name,
                birth: birth,
                birth_place: birthPlace,
                education: education,
                gender: gender,
                marital_status: marital,
                extension: extension,
                registration: registration,
                corporate_email: corporateEmail,
                father_name: father,
                mother_name: mother,
                disabled_person: disabledPerson,
                nationality: nationality,
                is_administrator: admin
            },
            'put'
        ).then(res => res ? setChanged(false) : console.log(res))
    }

    if (!loading)
        return (
            <fieldset className={styles.form_component_container}
                      style={{border: (props.dark ? 'none' : '#e2e2e2 1px solid'), backgroundColor: props.dark ? '#3b424c' : null}}>
                <legend style={{paddingRight: '10px', paddingLeft: '10px'}}>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>{props.lang.personal}</p>
                </legend>
                <div className={styles.form_row}>
                    <Button disabled={true}>
                        <Avatar src={pic} style={{width: '125px', height: '125px'}}/>
                    </Button>
                    <InputLayout inputName={props.lang.name} dark={props.dark} handleChange={setName} inputType={0}
                                 disabled={props.disabled} size={50} required={true} initialValue={name}
                                 key={"1-1"} margin={false} setChanged={setChanged}/>
                    <InputLayout inputName={props.lang.admin} dark={props.dark} handleChange={setAdmin} inputType={1}
                                 disabled={props.disabled} size={30} required={true} initialValue={admin}
                                 selectFields={props.lang.choice}
                                 key={"1-2"} margin={false} setChanged={setChanged}/>

                </div>

                <InputLayout inputName={props.lang.father} dark={props.dark} handleChange={setFather} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={father}
                             key={"1-3"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.mother} dark={props.dark} handleChange={setMother} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={mother}
                             key={"1-4"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.birthPlace} dark={props.dark} handleChange={setBirthPlace} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={birthPlace}
                             key={"1-5"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.nationality} dark={props.dark} handleChange={setNationality} inputType={0}
                             disabled={props.disabled} size={49} required={true} initialValue={nationality}
                             key={"1-6"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.birth} dark={props.dark} handleChange={setBirth} inputType={2}
                             disabled={props.disabled} size={49} required={true} initialValue={birth}
                             key={"1-7"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.disabledPerson} dark={props.dark} handleChange={setDisabledPerson}
                             inputType={1}
                             disabled={props.disabled} size={49} required={true} initialValue={disabledPerson}
                             selectFields={props.lang.choice}
                             key={"1-8"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.education} dark={props.dark} handleChange={setEducation} inputType={1}
                             disabled={props.disabled} size={32} required={true} initialValue={education}
                             selectFields={props.lang.educationChoice}
                             key={"1-9"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.gender} dark={props.dark} handleChange={setGender} inputType={1}
                             disabled={props.disabled} size={32} required={true} initialValue={gender}
                             selectFields={props.lang.genderChoice}
                             key={"1-10"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.marital} dark={props.dark} handleChange={setMarital} inputType={1}
                             disabled={props.disabled} size={32} required={true} initialValue={marital}
                             selectFields={props.lang.maritalChoice}
                             key={"1-11"} setChanged={setChanged}/>

                <InputLayout inputName={props.lang.corporateEmail} dark={props.dark} handleChange={setCorporateEmail}
                             inputType={0} disabled={props.disabled} size={32} required={true}
                             initialValue={corporateEmail} key={"1-12"} setChanged={setChanged}/>
                <InputLayout inputName={props.lang.extension} dark={props.dark} handleChange={setExtension}
                             inputType={0} disabled={props.disabled} size={32} required={true}
                             initialValue={extension} key={"1-13"} setChanged={setChanged}/>
                <InputLayout inputName={props.lang.registration} dark={props.dark} handleChange={setRegistration}
                             inputType={0} disabled={props.disabled} size={32} required={false}
                             initialValue={registration} key={"1-14"} setChanged={setChanged}/>


                <Button style={{width: '100%'}}
                        disabled={
                            (name === null || name.length === 0) ||
                            admin === null ||
                            (father === null || father.length === 0) ||
                            (mother === null || mother.length === 0)  ||
                            (nationality === null || nationality.length === 0) ||
                            (birthPlace === null || birthPlace.length === 0)  ||
                            (birth === null || birth.length === 0)  ||
                            disabledPerson === null ||
                            education === null ||
                            gender === null ||
                            marital === null ||
                            (corporateEmail === null || corporateEmail.length === 0)  ||
                            (extension === null || extension.length === 0)  ||
                            changed === false
                        }
                        onClick={() => saveChanges()}>Save</Button>
            </fieldset>
        )
    else
        return (
            <div className={styles.form_component_container}
                 style={{borderBottom: (props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>{props.lang.personal}</p>
                </legend>
                <div className={styles.form_row}>
                    <Skeleton variant='circle' style={{
                        width: '125px',
                        height: '125px',
                        backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                    }}/>
                    <Skeleton variant='rect' style={{
                        borderRadius: '8px',
                        width: '82%',
                        height: '6vh',
                        backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                    }}/>
                </div>
                <Skeleton variant='rect' style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
                <Skeleton variant='rect' style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
            </div>
        )

}

BasicForm.propTypes = {
    lang: PropTypes.object,
    id: PropTypes.string,
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    saveChanges: PropTypes.func,
    fetchData: PropTypes.func,
}