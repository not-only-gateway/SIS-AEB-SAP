import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import InputLayout from "../../modules/InputLayout";
import mainStyles from '../../../styles/shared/Main.module.css'
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Alert from "../../layout/Alert";
import TextField from "../../modules/inputs/TextField";
import shared from "../../../styles/shared/Shared.module.css";
import Button from "../../modules/inputs/Button";
import DropDownField from "../../modules/inputs/DropDownField";

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
                 style={{justifyContent: 'center', width: '100%', position: 'relative', overflow: 'auto'}}>
                <Alert
                    type={status.type} render={status.type !== undefined}
                    handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
                />
                <div style={{padding: '16px'}}>
                    <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                        {/*<legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.personal}</h4></legend>*/}

                        <TextField
                            dark={true}
                            placeholder={lang.denomination} label={lang.denomination}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'denomination', value: event.target.value})
                            }}
                            locale={props.locale} value={props.data.denomination} required={true}
                            width={'100%'}
                        />

                    </fieldset>
                    <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                        <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.additional}</h4></legend>
                        <TextField
                            dark={true}
                            placeholder={lang.level} label={lang.level}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'role_level', value: event.target.value})
                            }}
                            locale={props.locale} value={props.data.role_level} required={true}
                            width={'calc(33.333%  - 21.35px)'}
                        />
                        <TextField
                            dark={true}
                            placeholder={lang.roleClass} label={lang.roleClass}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'role_class', value: event.target.value})
                            }}
                            locale={props.locale} value={props.data.role_class} required={true}
                            width={'calc(33.333%  - 21.35px)'}
                        />
                        <TextField
                            dark={true}
                            placeholder={lang.hierarchyLevel} label={lang.hierarchyLevel}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'hierarchy_level', value: event.target.value})
                            }}
                            locale={props.locale} value={props.data.hierarchy_level} required={true}
                            width={'calc(33.333%  - 21.35px)'}
                        />
                    </fieldset>
                    <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                        <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.appointment}</h4></legend>
                        <DropDownField
                            dark={true}
                            placeholder={'DAS'}
                            label={'DAS'}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'das', value: event})
                            }}
                            locale={props.locale}
                            value={props.data.das} required={true}
                            width={'calc(50% - 16px)'}
                            choices={lang.options}/>

                        <DropDownField
                            dark={true}
                            placeholder={'FCPE'}
                            label={'FCPE'}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'fcpe', value: event})
                            }}
                            locale={props.locale}
                            value={props.data.fcpe} required={true}
                            width={'calc(50% - 16px)'}
                            choices={lang.options}/>
                    </fieldset>

                </div>
                <div className={shared.modalFooter} style={{width: '100%', padding: '24px 16px 24px 16px'}}>
                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'#262626'} backgroundColor={'white'}
                            handleClick={() => {
                                props.closeModal()
                            }}
                            variant={'rounded'}
                            colorVariant={'secondary'}
                            content={
                                lang.close
                            } justification={'center'}  hoverHighlight={true}
                    />
                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'white'} backgroundColor={'#0095ff'}
                            handleClick={() => {

                                props.handleSubmit({
                                    pk: props.data.id,
                                    data: props.data,
                                    create: props.create,
                                    setStatus: setStatus
                                }).then(res => {
                                    setChanged(!res)
                                })
                            }}
                            disabled={disabled()} variant={'rounded'}
                            content={
                                lang.save
                            } justification={'center'} hoverHighlight={false}
                    />
                </div>
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
    locale: PropTypes.string,
    closeModal: PropTypes.func
}