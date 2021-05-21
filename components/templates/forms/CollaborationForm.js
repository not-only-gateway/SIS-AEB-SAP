import React, {useEffect, useState} from "react";
import InputLayout from "../../modules/InputLayout";
import PropTypes from "prop-types";
import Selector from "../../modules/inputs/Selector";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";
import Alert from "../../layout/Alert";
import HorizontalTabs from "../../layout/navigation/HorizontalTabs";
import TabContent from "../TabContent";
import styles from '../../../styles/component/Component.module.css'
import shared from "../../../styles/shared/Shared.module.css";
import Button from "../../modules/inputs/Button";
import DropDownField from "../../modules/inputs/DropDownField";
import TextField from "../../modules/inputs/TextField";
import DateField from "../../modules/inputs/DateField";

export default function CollaborationForm(props) {

    const [lang, setLang] = useState(null)
    const [changed, setChanged] = useState(false)
    const [status, setStatus] = useState({
        type: undefined,
        message: undefined
    })
    const [openTab, setOpenTab] = useState(0)

    useEffect(() => {
        if (lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'collaborationForm'}))
    }, [])

    function disabled() {

        return (
            props.collaboration.tag === null ||
            !props.collaboration.tag ||
            props.collaboration.unit === null ||
            props.collaboration.official_publication_date === null ||
            props.collaboration.admission_date === null ||
            props.collaboration.legal_document === null ||
            props.collaboration.substitute === null ||
            props.collaboration.active_collaboration === null ||
            props.collaboration.linkage === null ||
            props.collaboration.access_profile === null ||
            !props.collaboration.unit ||
            !props.collaboration.official_publication_date ||
            !props.collaboration.admission_date ||
            !props.collaboration.legal_document ||
            props.collaboration.substitute === undefined ||
            props.collaboration.active_collaboration === undefined ||
            !props.collaboration.linkage ||
            !props.collaboration.access_profile ||
            !changed

        )
    }

    if (lang !== null)
        return (
            <div className={styles.collaborationContainer}>
                <Alert
                    type={status.type} render={status.type !== undefined}
                    handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
                />

                <div style={{
                    padding: '32px',
                    border: 'none',
                    display: "grid",
                    gap: '32px'
                }}>
                    <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                        <TextField
                            dark={true}
                            placeholder={lang.tag} label={lang.tag}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({
                                    name: 'tag',
                                    value: event.target.value
                                })
                            }} locale={props.locale} value={props.collaboration.tag}
                            required={true} disabled={false}
                            width={'100%'}/>
                    </fieldset>
                    <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                        <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.placement}</h4></legend>
                        <Selector
                            dark={true}
                            required={true}
                            locale={props.locale}
                            selected={
                                props.collaboration.unit !== undefined && props.collaboration.unit !== null ? {
                                    key: props.collaboration.unit && props.collaboration.unit.id ? props.collaboration.unit.id : props.collaboration.unit.key,
                                    value: props.collaboration.unit && props.collaboration.unit.acronym ? props.collaboration.unit.acronym : props.collaboration.unit.value
                                } : undefined
                            }
                            handleChange={event => props.handleChange({
                                name: 'unit',
                                value: event
                            })}
                            label={lang.unit}
                            data={props.units} width={'calc(50% - 16px)'}
                            key={'collaboration-field-1'} setChanged={setChanged}
                        />

                        <Selector
                            dark={true}
                            required={true}
                            locale={props.locale}
                            selected={props.collaboration.linkage !== undefined && props.collaboration.linkage !== null ? {
                                key: props.collaboration.linkage && props.collaboration.linkage.id ? props.collaboration.linkage.id : props.collaboration.linkage.key,
                                value: props.collaboration.linkage && props.collaboration.linkage.denomination ? props.collaboration.linkage.denomination : props.collaboration.linkage.value
                            } : null}
                            handleChange={event => props.handleChange({
                                name: 'linkage',
                                value: event
                            })}
                            setChanged={setChanged}
                            label={lang.linkage} key={'collaboration-field-5'}
                            data={props.linkages} disabled={!props.collaboration.unit}
                            width={'calc(50% - 16px)'}/>

                        <Selector
                            required={false}
                            dark={true}
                            locale={props.locale}
                            selected={props.collaboration.senior_member !== undefined && props.collaboration.senior_member !== null ? {
                                key: props.collaboration.senior_member && props.collaboration.senior_member.id,
                                value: props.collaboration.senior_member && props.collaboration.senior_member.name,
                            } : undefined}
                            handleChange={event => props.handleChange({
                                name: 'senior_member',
                                value: event !== undefined && event !== null ? {
                                    id: event.key,
                                    name: event.value
                                } : event
                            })}
                            setChanged={setChanged} disabled={props.seniors.length === 0}
                            label={lang.senior} key={'collaboration-field-7'}
                            data={props.seniors} width={'calc(50% - 16px)'}/>
                        <Selector
                            dark={true}
                            required={true}
                            locale={props.locale}
                            selected={props.collaboration.access_profile !== undefined && props.collaboration.access_profile !== null ? {
                                key: props.collaboration.access_profile && props.collaboration.access_profile.id ? props.collaboration.access_profile.id : props.collaboration.access_profile.key,
                                value: props.collaboration.access_profile && props.collaboration.access_profile.denomination ? props.collaboration.access_profile.denomination : props.collaboration.access_profile.value
                            } : undefined}
                            handleChange={event => props.handleChange({
                                name: 'access_profile',
                                value: event
                            })}
                            setChanged={setChanged} disabled={!props.collaboration.unit}
                            label={lang.access} key={'collaboration-field-6'}
                            data={props.accessProfiles} width={'calc(50% - 16px)'}/>

                    </fieldset>

                    <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                        <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.role}</h4></legend>


                        <DropDownField
                            dark={true}
                            placeholder={lang.active}
                            label={lang.active}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'active_collaboration', value: event})
                            }}
                            disabled={!props.collaboration.unit}
                            locale={props.locale}
                            value={props.collaboration.active_collaboration} required={true}
                            width={'calc(33.333% - 21.35px)'}
                            choices={lang.choices}/>

                        <Selector
                            dark={true}
                            locale={props.locale}
                            required={false}
                            selected={props.collaboration.effective_role}
                            handleChange={event => props.handleChange({
                                name: 'effective_role',
                                value: event
                            })}
                            setChanged={setChanged} disabled={!props.collaboration.unit}
                            label={lang.effective} key={'collaboration-field-2'}
                            data={props.effectiveRoles} width={'calc(33.333% - 21.35px)'}/>

                        <Selector
                            dark={true}
                            locale={props.locale}
                            required={false} selected={props.collaboration.commissioned_role}
                            handleChange={event => props.handleChange({
                                name: 'commissioned_role',
                                value: event
                            })}
                            setChanged={setChanged} disabled={!props.collaboration.unit}
                            label={lang.commissioned} key={'collaboration-field-3'}
                            data={props.commissionedRoles}
                            width={'calc(33.333% - 21.35px)'}/>


                        <DropDownField
                            dark={true}
                            placeholder={lang.substitute}
                            label={lang.substitute}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'substitute', value: event})
                            }}
                            disabled={!props.collaboration.unit}
                            locale={props.locale}
                            value={props.collaboration.substitute} required={true}
                            width={'calc(50% - 16px)'}
                            choices={lang.choices}/>

                        <TextField
                            dark={true}
                            placeholder={lang.additional} label={lang.additional}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({
                                    name: 'additional_role_information',
                                    value: event.target.value
                                })
                            }} locale={props.locale} value={props.collaboration.additional_role_information}
                            required={false} disabled={!props.collaboration.unit}
                            width={'calc(50% - 16px)'}/>

                    </fieldset>
                    <fieldset className={[shared.fieldsetContainer, shared.formContainer].join(' ')}>
                        <legend><h4 style={{width: '100%', marginBottom: '16px'}}>{lang.contract}</h4></legend>

                        <DateField
                            dark={true}
                            placeholder={lang.admission} label={lang.admission}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'admission_date', value: event.target.value})
                            }} locale={props.locale}
                            value={
                                typeof (props.collaboration.admission_date) === 'number' ?
                                    new Date(props.collaboration.admission_date).toLocaleDateString().replaceAll('/', '-'
                                    ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                    :
                                    props.collaboration.admission_date
                            }
                            required={true} width={'calc(33.333% - 21.35px)'}/>

                        <DateField
                            dark={true}
                            placeholder={lang.publication} label={lang.publication}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'official_publication_date', value: event.target.value})
                            }} locale={props.locale}
                            value={
                                typeof (props.collaboration.official_publication_date) === 'number' ?
                                    new Date(props.collaboration.official_publication_date).toLocaleDateString().replaceAll('/', '-'
                                    ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                    :
                                    props.collaboration.official_publication_date
                            }
                            required={true} width={'calc(33.333% - 21.35px)'}/>

                        <DateField
                            dark={true}
                            placeholder={lang.exp} label={lang.exp}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({name: 'contract_expiration', value: event.target.value})

                            }} locale={props.locale}
                            value={
                                typeof (props.collaboration.contract_expiration) === 'number' ?
                                    new Date(props.collaboration.contract_expiration).toLocaleDateString().replaceAll('/', '-'
                                    ).replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1")
                                    :
                                    props.collaboration.contract_expiration
                            }
                            required={false} width={'calc(33.333% - 21.35px)'}/>


                        <TextField
                            dark={true}
                            placeholder={lang.legalDocument} label={lang.legalDocument}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({
                                    name: 'legal_document',
                                    value: event.target.value
                                })
                            }} locale={props.locale} value={props.collaboration.legal_document}
                            required={true} disabled={!props.collaboration.unit}
                            width={'calc(33.333% - 21.35px)'}/>


                        <TextField
                            dark={true}
                            placeholder={lang.start} label={lang.start}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({
                                    name: 'work_shift_start',
                                    value: event.target.value
                                })
                            }} locale={props.locale} value={props.collaboration.work_shift_start}
                            required={false} disabled={!props.collaboration.unit}
                            width={'calc(33.333% - 21.35px)'} type={'time'}/>
                        <TextField
                            dark={true}
                            placeholder={lang.end} label={lang.end}
                            handleChange={event => {
                                setChanged(true)
                                props.handleChange({
                                    name: 'work_shift_end',
                                    value: event.target.value
                                })
                            }} locale={props.locale} value={props.collaboration.work_shift_end}
                            required={false} disabled={!props.collaboration.unit} type={'time'}
                            width={'calc(33.333% - 21.35px)'}/>

                    </fieldset>


                </div>
                <div className={shared.modalFooter}
                     style={{position: 'sticky', bottom: 0, width: '100%', zIndex: '15'}}>

                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'#262626'} backgroundColor={'white'}
                            handleClick={() => {
                                props.handleClose()
                            }}

                            colorVariant={'secondary'}
                            variant={'rounded'}
                            content={
                                lang.close
                            } justification={'center'} hoverHighlight={true}
                    />

                    <Button width={'100%'} elevation={true} border={'none'} padding={'8px 32px 8px 32px'}
                            fontColor={'white'} backgroundColor={'#0095ff'}
                            handleClick={() => {
                                props.submitChanges({
                                    data: props.collaboration,
                                    create: props.collaboration.id === undefined,
                                    memberID: props.memberID,
                                    collaborationID: props.collaborationID,
                                    setStatus: setStatus
                                }).then(res => {
                                    setChanged(!res)
                                    if (props.collaborationID === undefined || props.collaborationID === null)
                                        props.setAccepted(res)
                                })
                            }}
                            disabled={disabled()} variant={'rounded'}
                            content={
                                props.collaborationID !== undefined && props.collaborationID !== null ? lang.save : lang.create
                            } justification={'center'} hoverHighlight={false}
                    />
                </div>
            </div>
        )
    else
        return null

}
CollaborationForm.propTypes = {
    handleClose: PropTypes.func,
    memberID: PropTypes.any,
    collaboration: PropTypes.object,
    handleChange: PropTypes.func,
    submitChanges: PropTypes.func,
    units: PropTypes.array,
    seniors: PropTypes.array,
    effectiveRoles: PropTypes.array,
    commissionedRoles: PropTypes.array,
    linkages: PropTypes.array,
    collaborationID: PropTypes.any,
    setAccepted: PropTypes.func,
    locale: PropTypes.string
}
