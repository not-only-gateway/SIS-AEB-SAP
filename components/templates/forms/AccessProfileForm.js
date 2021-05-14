import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Alert from "../../layout/Alert";

export default function AccessProfileForm(props) {
    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
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

            props.data.can_manage_membership === undefined ||

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
                     height: 'auto',
                     position: "relative"
                 }}>
                <Alert
                    type={status.type} render={status.type !== undefined} duration={5000}
                    handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
                />
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
                    <InputLayout inputName={lang.manage} dark={false} handleChange={props.handleChange}
                                 name={'can_manage_membership'}
                                 inputType={1} size={'calc(25% - 12px)'} required={true}
                                 selectFields={lang.options}
                                 initialValue={props.data.can_manage_membership} key={'membership-1'}
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



                <Button style={{
                    width: '100%',

                    backgroundColor: disabled() ? '#f0ecec' : '#0095ff',
                    color: disabled() ? '#777777' : 'white',
                    fontWeight: 550,
                    position: 'sticky',
                    bottom: 0,
                    zIndex: 5,
                }} disabled={disabled()} variant={'contained'} onClick={() => {
                    props.handleSubmit({pk: props.data.id, data: props.data, create: props.create, setStatus: setStatus}).then(res => {
                        setChanged(!res)
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
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    data: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool
}