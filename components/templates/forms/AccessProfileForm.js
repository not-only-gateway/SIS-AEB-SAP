import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";

export default function AccessProfileForm(props) {
    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
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

    }, [])


    function disabled() {
        return (
            props.data.denomination === undefined ||

            props.data.can_create_person === undefined ||
            props.data.can_update_person === undefined ||
            props.data.can_delete_person === undefined ||

            props.data.can_create_membership === undefined ||
            props.data.can_update_membership === undefined ||

            props.data.can_create_role === undefined ||
            props.data.can_update_role === undefined ||
            props.data.can_delete_role === undefined ||

            props.data.can_create_access_profile === undefined ||
            props.data.can_update_access_profile === undefined ||
            props.data.can_delete_access_profile === undefined ||


            props.data.can_create_collaboration === undefined ||
            props.data.can_update_collaboration === undefined ||
            props.data.can_delete_collaboration === undefined ||

            props.data.can_update_location === undefined ||
            props.data.can_view_location === undefined ||

            props.data.can_update_documents === undefined ||
            props.data.can_view_documents === undefined ||

            props.data.can_update_contact === undefined ||
            props.data.can_view_contact === undefined ||

            props.data.can_manage_structure === undefined ||
            !changed
        )
    }


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp}
                 style={{
                     justifyContent: 'center',
                     width: '100%',
                     position: 'relative',
                     height: '700px',
                     overflowY: 'auto',
                 }}>
                <div style={{marginTop: props.create ? null : '20px', width: '98%'}}>
                    <InputLayout inputName={lang.denomination} dark={false} handleChange={props.handleChange}
                                 name={'denomination'}
                                 inputType={0} size={'100%'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.denomination} key={"0-0-" + props.id}
                                 setChanged={setChanged}/>
                </div>
                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.person}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={props.handleChange}
                                 name={'can_create_person'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_create_person} key={'person_1'}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_person'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_person} key={'person-2'}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={props.handleChange}
                                 name={'can_delete_person'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_delete_person} key={'person-3'}
                                 setChanged={setChanged}/>
                </fieldset>
                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.membership}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={props.handleChange}
                                 name={'can_create_membership'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_create_membership} key={'membership-1'}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_membership'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_membership} key={'membership-2'}
                                 setChanged={setChanged}/>

                </fieldset>
                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.role}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={props.handleChange}
                                 name={'can_create_role'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_create_role} key={"1-4-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_role'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_role} key={"1-5-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={props.handleChange}
                                 name={'can_delete_role'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_delete_role} key={"1-6-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.profile}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={props.handleChange}
                                 name={'can_create_access_profile'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_create_access_profile} key={"1-7-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_access_profile'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_access_profile} key={"1-8-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={props.handleChange}
                                 name={'can_delete_access_profile'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_delete_access_profile} key={"1-9-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.structure}</p>
                    </legend>
                    <InputLayout inputName={lang.manage} dark={false} handleChange={props.handleChange}
                                 name={'can_manage_structure'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_manage_structure} key={"2-3-" + props.id}
                                 setChanged={setChanged}/>

                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.collaboration}</p>
                    </legend>
                    <InputLayout inputName={lang.create} dark={false} handleChange={props.handleChange}
                                 name={'can_create_collaboration'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_create_collaboration} key={"2-6-" + props.id}
                                 setChanged={setChanged}/>

                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_collaboration'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_collaboration} key={"2-7-" + props.id}
                                 setChanged={setChanged}/>


                    <InputLayout inputName={lang.delete} dark={false} handleChange={props.handleChange}
                                 name={'can_delete_collaboration'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_delete_collaboration} key={"2-8-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.location}</p>
                    </legend>
                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_location'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_location} key={"2-9-" + props.id}
                                 setChanged={setChanged}/>
                    <InputLayout inputName={lang.view} dark={false} handleChange={props.handleChange}
                                 name={'can_view_location'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_view_location} key={"3-1-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.documents}</p>
                    </legend>
                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_documents'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_documents} key={"3-2-" + props.id}
                                 setChanged={setChanged}/>
                    <InputLayout inputName={lang.view} dark={false} handleChange={props.handleChange}
                                 name={'can_view_documents'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_view_documents} key={"3-3-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>

                <fieldset style={fieldSetStyle}>
                    <legend>
                        <p style={{paddingLeft: '10px', paddingRight: '10px'}}>{lang.contacts}</p>
                    </legend>
                    <InputLayout inputName={lang.update} dark={false} handleChange={props.handleChange}
                                 name={'can_update_contact'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_update_contact} key={"3-4-" + props.id}
                                 setChanged={setChanged}/>
                    <InputLayout inputName={lang.view} dark={false} handleChange={props.handleChange}
                                 name={'can_view_contact'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_view_contact} key={"3-5-" + props.id}
                                 setChanged={setChanged}/>
                </fieldset>


                <Button style={{
                    width: '100%',

                    backgroundColor: disabled() ? '#f0ecec' : '#0095ff',
                    color: disabled() ? '#777777' : 'white',
                    fontWeight: 550,
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 5,
                }} disabled={disabled()} variant={'contained'} onClick={() => {
                    props.handleSubmit({pk: props.data.id, data: props.data, create: props.create}).then(res => {
                        setChanged(!res)
                        props.setAccepted(res)
                    })
                }}>
                    {props.create ? lang.create : lang.save}
                </Button>
            </div>

        )
    else
        return <></>
}

AccessProfileForm.propTypes = {
    setAccepted: PropTypes.func,
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    data: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool
}