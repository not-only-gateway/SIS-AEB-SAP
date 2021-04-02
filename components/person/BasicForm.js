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
            <>
                <fieldset className={styles.form_component_container}
                     style={{border: (props.dark ? '#262d37 2px solid' : '#e2e2e2 2px solid')}}>
                    <legend style={{paddingRight: '10px', paddingLeft: '10px'}}>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Personal</p>
                    </legend>
                    <div className={styles.form_row}>
                        <Button disabled={true}>
                            <Avatar src={pic} style={{width: '125px', height: '125px'}}/>
                        </Button>
                        <InputLayout inputName={'Name'} dark={props.dark} handleChange={setName} inputType={0}
                                     disabled={props.disabled} size={50} required={true} initialValue={name}
                                     key={props.id} margin={false} setChanged={setChanged}/>
                        <InputLayout inputName={'Admin'} dark={props.dark} handleChange={setAdmin} inputType={1}
                                     disabled={props.disabled} size={30} required={true} initialValue={admin}
                                     selectFields={[{key: true, value: 'Yes'}, {key: false, value: 'No'}]}
                                     key={props.id} margin={false} setChanged={setChanged}/>

                    </div>

                    <InputLayout inputName={'Father Name'} dark={props.dark} handleChange={setFather} inputType={0}
                                 disabled={props.disabled} size={49} required={true} initialValue={father}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Mother Name'} dark={props.dark} handleChange={setMother} inputType={0}
                                 disabled={props.disabled} size={49} required={true} initialValue={mother}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Birth Place'} dark={props.dark} handleChange={setBirthPlace} inputType={0}
                                 disabled={props.disabled} size={49} required={true} initialValue={birthPlace}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Nationality'} dark={props.dark} handleChange={setNationality} inputType={0}
                                 disabled={props.disabled} size={49} required={true} initialValue={nationality}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Birth'} dark={props.dark} handleChange={setBirth} inputType={2}
                                 disabled={props.disabled} size={49} required={true} initialValue={birth}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Disabled Person'} dark={props.dark} handleChange={setDisabledPerson}
                                 inputType={1}
                                 disabled={props.disabled} size={49} required={true} initialValue={disabledPerson}
                                 selectFields={[{key: true, value: 'Yes'}, {key: false, value: 'No'}]}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Education'} dark={props.dark} handleChange={setEducation} inputType={1}
                                 disabled={props.disabled} size={32} required={true} initialValue={education}
                                 selectFields={[
                                     {key: 0, value: 'Fundamental'},
                                     {key: 1, value: 'Medio'},
                                     {key: 2, value: 'Medio completo'},
                                     {key: 3, value: 'Superior'},
                                     {key: 4, value: 'superior completo'},
                                     {key: 5, value: 'Mestrado'},
                                     {key: 6, value: 'Doutorado'}
                                 ]}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Gender'} dark={props.dark} handleChange={setGender} inputType={1}
                                 disabled={props.disabled} size={32} required={true} initialValue={gender}
                                 selectFields={[
                                     {key: 'm', value: 'Male'},
                                     {key: 'f', value: 'Female'},
                                     {key: 'n', value: 'Other'},
                                 ]}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'marital status'} dark={props.dark} handleChange={setMarital} inputType={1}
                                 disabled={props.disabled} size={32} required={true} initialValue={marital}
                                 selectFields={[
                                     {key: 'SINGLE', value: 'Single'},
                                     {key: 'DIVORCED', value: 'Divorced'},
                                     {key: 'MARRIED', value: 'Married'},
                                     {key: 'WIDOWED', value: 'Widowed'},
                                 ]}
                                 key={props.id} setChanged={setChanged}/>

                    <InputLayout inputName={'Corporate Email'} dark={props.dark} handleChange={setCorporateEmail}
                                 inputType={0} disabled={props.disabled} size={32} required={true}
                                 initialValue={corporateEmail} key={props.id} setChanged={setChanged}/>
                    <InputLayout inputName={'Extension'} dark={props.dark} handleChange={setExtension}
                                 inputType={0} disabled={props.disabled} size={32} required={true}
                                 initialValue={extension} key={props.id} setChanged={setChanged}/>
                    <InputLayout inputName={'Registration'} dark={props.dark} handleChange={setRegistration}
                                 inputType={0} disabled={props.disabled} size={32} required={false}
                                 initialValue={registration} key={props.id} setChanged={setChanged}/>


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
            </>
        )
    else
        return (
            <div className={styles.form_component_container}
                 style={{borderBottom: (props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Personal</p>
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
    id: PropTypes.number,
    dark: PropTypes.bool,
    mediumContainer: PropTypes.object,
    smallContainer: PropTypes.object,
    selectStyle: PropTypes.object,
    disabled: PropTypes.bool,
    saveChanges: PropTypes.func,
    fetchData: PropTypes.func,
}