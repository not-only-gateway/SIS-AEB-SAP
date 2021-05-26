import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import axios from "axios";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import TextField from "../../modules/inputs/TextField";
import Button from "../../modules/inputs/Button";
import shared from "../../../styles/shared/Shared.module.css";
import Alert from "../../layout/Alert";
import DropDownField from "../../modules/inputs/DropDownField";

export default function UnitForm(props) {

    const [changed, setChanged] = useState(false)
    const [lang, setLang] = useState(null)

    const [status, setStatus] = useState({
        error: false,
        message: undefined
    })

    useEffect(() => {
        setLang(getComponentLanguage({locale: props.locale, component: 'unitForm'}))
    }, [])

    function disabled() {
        return (
            props.data === null ||
            props.data.zip_code === null ||
            props.data.data === null ||
            props.data.city === null ||
            props.data.state === null ||
            props.data.state_initials === null ||

            !props.data.zip_code ||
            !props.data.data ||
            !props.data.city ||
            !props.data.state ||
            !props.data.state_initials ||
            !changed
        )
    }

    if (lang !== null)
        return (
            <div style={{
                display: 'grid',
                gap: '32px',
                width: '100%',
            }}>
                <Alert
                    type={'error'} message={status.message}
                    handleClose={() => setStatus({
                        error: false,
                        message: undefined
                    })} render={status.error}/>

                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.basic}</h4></legend>

                    <TextField
                        dark={true}
                        placeholder={lang.acronym} label={lang.acronym}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'acronym', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.acronym}
                        required={true}
                        width={'calc(33.333% - 21.35px)'}/>

                    <TextField
                        dark={true}
                        placeholder={lang.denomination} label={lang.denomination}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'name', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.name}
                        required={true}
                        width={'calc(33.333% - 21.35px)'}/>

                    <DropDownField
                        dark={true}
                        placeholder={lang.decentralized}
                        label={lang.decentralized}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'is_decentralized', value: event})
                        }} locale={props.locale} value={props.data.is_decentralized}
                        required={true}
                        width={'calc(33.333% - 21.35px)'} choices={lang.choice}/>

                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.information}</h4></legend>


                    <TextField
                        dark={true}
                        placeholder={lang.sphere}
                        label={lang.sphere}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'sphere', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.sphere}
                        required={true} width={'calc(33.333% - 21.35px)'}/>

                    <TextField
                        dark={true}
                        placeholder={lang.power}
                        label={lang.power}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'power', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.power}
                        required={true}
                        width={'calc(33.333% - 21.35px)'}/>
                    <TextField
                        dark={true}
                        placeholder={lang.legalNature}
                        label={lang.legalNature}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'legal_nature', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.legal_nature}
                        required={true} width={'calc(33.333% - 21.35px)'}/>
                    <TextField
                        dark={true}
                        placeholder={lang.changeType}
                        label={lang.changeType}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'change_type', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.change_type}
                        required={true} width={'calc(50% - 16px)'}/>
                    <TextField
                        dark={true}
                        placeholder={lang.category}
                        label={lang.category}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'category', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.category}
                        required={true} width={'calc(50% - 16px)'}/>


                </fieldset>
                <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                    <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.additionalInformation}</h4></legend>
                    <TextField
                        dark={true}
                        placeholder={lang.competence}
                        label={lang.competence}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'competence', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.competence}
                        required={false} width={'calc(33.333% - 21.35px)'}/>
                    <TextField
                        dark={true}
                        placeholder={lang.finality}
                        label={lang.finality}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'finality', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.finality}
                        required={false} width={'calc(33.333% - 21.35px)'}/>

                    <TextField
                        dark={true}
                        placeholder={lang.mission}
                        label={lang.mission}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'mission', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.mission}
                        required={false} width={'calc(33.333% - 21.35px)'}/>


                    <TextField
                        dark={true}
                        placeholder={lang.strategicObjective}
                        label={lang.strategicObjective}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'strategic_objective', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.strategic_objective}
                        required={false} width={'calc(50% - 16px)'}/>

                    <TextField
                        dark={true}
                        placeholder={lang.standardization}
                        label={lang.standardization}
                        handleChange={event => {
                            setChanged(true)
                            props.handleChange({name: 'standardization', value: event.target.value})
                        }} locale={props.locale} value={props.data === null ? null : props.data.standardization}
                        required={false} width={'calc(50% - 16px)'}/>

                </fieldset>

                <div className={shared.formSubmitContainer}>
                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'white'} backgroundColor={'#0095ff'}
                            handleClick={() => {
                                setChanged(false)
                                props.handleSubmit({
                                    subjectID: props.id,
                                    data: props.data,
                                    setStatus: setStatus
                                }).then(res => {
                                    setChanged(!res)
                                    if (props.setAccepted !== undefined)
                                        props.setAccepted(res)
                                })
                            }}
                            disabled={disabled()} variant={'rounded'}
                            content={
                                props.create ? lang.create : lang.save
                            } justification={'center'} hoverHighlight={false}
                    />
                </div>
            </div>
        )
    else
        return null
}

UnitForm.propTypes = {
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleSubmit: PropTypes.func,
    locale: PropTypes.string,
    setAccepted: PropTypes.func,
    create: PropTypes.bool,
}
