import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import submitCommissionedRole from "../../../utils/submit/SubmitCommissionedRole";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import Alert from "../../layout/Alert";

export default function CommissionedRoleForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })

    useEffect(() => {
        setLang(getComponentLanguage({component: 'commissioned', locale: props.locale}))
    }, [])

    function disabled() {
        return (
            props.data.denomination === null || !props.data.denomination ||
            props.data.hierarchy_level === null || !props.data.hierarchy_level ||
            props.data.role_level === null || !props.data.role_level ||
            props.data.fcpe === null || !props.data.fcpe ||
            props.data.das === null || !props.data.das ||
            props.data.role_class === null || !props.data.role_class || !changed
        )
    }


    if (lang !== null)
        return (
            <div className={mainStyles.displayWarp}
                 style={{justifyContent: 'center', width: '100%', position: 'relative'}}>
                <Alert
                    type={status.type} render={status.type !== undefined} duration={5000}
                    handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
                />
                <InputLayout inputName={lang.denomination} dark={false} handleChange={props.handleChange}
                             name={'denomination'}
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.data.denomination} setChanged={setChanged}/>
                <InputLayout inputName={lang.level} dark={false} handleChange={props.handleChange}
                             name={'role_level'}
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.data.role_level} setChanged={setChanged}/>

                <InputLayout inputName={lang.roleClass} dark={false} handleChange={props.handleChange}
                             name={'role_class'}
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.data.role_class} setChanged={setChanged}/>
                <InputLayout inputName={lang.hierarchyLevel} dark={false} handleChange={props.handleChange}
                             name={'hierarchy_level'}
                             inputType={0} size={'calc(25% - 12px)'} required={true}
                             initialValue={props.data.hierarchy_level} setChanged={setChanged}/>


                <InputLayout inputName={'DAS'} dark={false} handleChange={props.handleChange}
                             name={'das'} selectFields={lang.options}
                             inputType={1} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.data.das} setChanged={setChanged}/>

                <InputLayout inputName={'FCPE'} dark={false} handleChange={props.handleChange}
                             name={'fcpe'} selectFields={lang.options}
                             inputType={1} size={'calc(50% - 8px)'} required={true}
                             initialValue={props.data.fcpe} setChanged={setChanged}/>


                <Button style={{
                    width: '100%', marginTop: '50px',
                    backgroundColor: disabled() ? null : '#39adf6',

                }} variant={'contained'} color={'primary'}
                        disabled={disabled()}
                        onClick={() => props.handleSubmit({
                            pk: props.data.id,
                            data: props.data,
                            create: props.create,
                            setStatus: setStatus
                        }).then(res => {
                            setChanged(!res)
                        })}>{lang.save}</Button>
            </div>

        )
    else
        return <></>
}

CommissionedRoleForm.propTypes = {
    handleSubmit: PropTypes.func,
    handleChange: PropTypes.func,
    create: PropTypes.bool,
    data: PropTypes.object,
    locale: PropTypes.string
}