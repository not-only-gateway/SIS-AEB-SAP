import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../InputLayout";
import fetchComponentData from "../../../utils/person/FetchData";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import axios from "axios";
import Host from "../../../utils/shared/Host";
import Cookies from "universal-cookie/lib";

export default function AccessProfileForm(props) {

    const [loading, setLoading] = useState(true)
    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [profile, setProfile] = useState({})
    const fieldSetStyle = {
        borderLeft: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        width: '100%',
        display: 'flex',
        flexWarp: 'warp',
        gap: '16px',
        justifyContent: 'flex-end'
    }
    useEffect(() => {
        setLang(getComponentLanguage({component: 'access', locale: props.locale}))
        if (!props.create)
            axios({
                method: 'get',
                url: Host() + 'access/' + props.id,
                headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
            }).then(res => {
                setProfile(res.data)
                setLoading(false)
            }).catch(error => {
                console.log(error)
            })
        else
            setLoading(false)
    }, [])

    function handleChange(props) {

        setProfile(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function disabled() {
        return (
            false
        )
    }

    async function saveChanges() {

        await saveComponentChanges({
            path: 'management/' + props.id,
            params: {
                person: props.id,
                personal_email: contact.email.toLowerCase(),
                personal_email_alt: contact.emailAlt.length > 0 ? contact.emailAlt?.toLowerCase() : null,
                personal_phone: contact.phone.replace(' ', ''),
                personal_phone_alt: contact.phoneAlt.length > 0 ? contact.phoneAlt?.toLowerCase() : null
            },
            method: 'put'
        }).then(res => res ? setChanged(false) : console.log(res))
    }

    if (lang !== null && !loading)
        return (
            <div className={mainStyles.displayWarp}
                 style={{justifyContent: 'center', width: '100%', maxHeight: props.create ? null : '600px', overflowY: props.create ? null :'auto'}}>
                <div style={{marginTop:props.create ? null : '20px', width: '100%'}}>
                    <InputLayout inputName={lang.denomination} dark={false} handleChange={handleChange}
                                 name={'denomination'}
                                 inputType={0} size={'100%'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.denomination} key={"0-0-" + props.id} setChanged={setChanged}/>
                </div>
                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.person}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={handleChange}
                                 name={'can_create_person'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_create_person} key={"1-1-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_person'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_person} key={"1-2-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={handleChange}
                                 name={'candelete_person'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_delete_person} key={"1-3-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.role}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={handleChange}
                                 name={'can_create_role'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_create_role} key={"1-4-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_role'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_role} key={"1-5-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={handleChange}
                                 name={'can_delete_role'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_delete_role} key={"1-6-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.profile}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={handleChange}
                                 name={'can_create_access_profile'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_create_access_profile} key={"1-7-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_access_profile'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_access_profile} key={"1-8-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={handleChange}
                                 name={'can_delete_access_profile'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_delete_access_profile} key={"1-9-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.unit}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={handleChange}
                                 name={'can_create_unit'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_create_unit} key={"2-3-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_unit'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_unit} key={"2-4-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={handleChange}
                                 name={'can_delete_unit'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_delete_unit} key={"2-5-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.collaboration}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={handleChange}
                                 name={'can_create_collaboration'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_create_collaboration} key={"2-6-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_collaboration'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_collaboration} key={"2-7-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={handleChange}
                                 name={'can_delete_collaboration'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_delete_collaboration} key={"2-8-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.location}</p>
                    </legend>
                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_location'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_location} key={"2-9-" + props.id}
                                 setChanged={setChanged}/>
                    <InputLayout inputName={lang.view} dark={false} handleChange={handleChange}
                                 name={'can_view_location'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_view_location} key={"3-1-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.documents}</p>
                    </legend>
                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_documents'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_documents} key={"3-2-" + props.id}
                                 setChanged={setChanged}/>
                    <InputLayout inputName={lang.view} dark={false} handleChange={handleChange}
                                 name={'can_view_documents'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_view_documents} key={"3-3-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.contacts}</p>
                    </legend>
                    <InputLayout inputName={lang.update} dark={false} handleChange={handleChange}
                                 name={'can_update_contact'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_update_contact} key={"3-4-" + props.id}
                                 setChanged={setChanged}/>
                    <InputLayout inputName={lang.view} dark={false} handleChange={handleChange}
                                 name={'can_view_contact'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_view_contact} key={"3-5-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.activity}</p>
                    </legend>
                    <InputLayout inputName={lang.view} dark={false} handleChange={handleChange}
                                 name={'can_view_activity_log'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_view_activity_log} key={"2-1-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.access}</p>
                    </legend>
                    <InputLayout inputName={lang.view} dark={false} handleChange={handleChange}
                                 name={'can_view_access_log'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={profile.can_view_access_log} key={"2-2-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <Button style={{
                    width: '100%', marginTop: '50px',
                    backgroundColor: disabled() ? null : '#39adf6',
                    marginBottom: '50px'

                }} variant={'contained'} color={'primary'}
                        disabled={disabled()}
                        onClick={() => saveChanges()}>{lang.save}</Button>
            </div>

        )
    else
        return <></>
}

AccessProfileForm.propTypes = {
    id: PropTypes.number,
    create: PropTypes.bool,
    locale: PropTypes.string
}