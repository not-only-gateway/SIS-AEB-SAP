import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../../modules/InputLayout";
import PropTypes from "prop-types";
import Selector from "../../modules/selector/Selector";
import getComponentLanguage from "../../../utils/shared/GetComponentLanguage";


export default function CollaborationForm(props) {

    const [lang, setLang] = useState(null)
    const [changed, setChanged] = useState(false)

    useEffect(() => {
        if (lang === null)
            setLang(getComponentLanguage({locale: props.locale, component: 'collaborationForm'}))
    }, [])

    function disabled() {

        return (
            props.collaboration.unit === null ||
            props.collaboration.official_publication_date === null ||
            props.collaboration.admission_date === null ||
            props.collaboration.legal_document === null ||
            props.collaboration.is_substitute === null ||
            props.collaboration.is_active_on_role === null ||
            props.collaboration.linkage === null ||
            props.collaboration.access_level_profile === null ||
            !props.collaboration.unit ||
            !props.collaboration.official_publication_date ||
            !props.collaboration.admission_date ||
            !props.collaboration.legal_document ||
            props.collaboration.is_substitute === undefined ||
            props.collaboration.is_active_on_role === undefined ||
            !props.collaboration.linkage ||
            !props.collaboration.access_level_profile ||
            !changed

        )
    }

    if (lang !== null)
        return (
            <div
                style={{
                    display: 'inline-flex',
                    flexFlow: 'row wrap',
                    gap: '32px',
                    justifyContent: 'center',
                    width: '100%',
                }}>
                <h4 style={{width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>
                    {lang.placement}
                </h4>
                <InputLayout inputName={lang.main} dark={props.dark} handleChange={props.handleChange}
                             inputType={1} name={'main_collaboration'}
                             disabled={!props.canBeMain}
                             size={'calc(33.333% - 21.35px)'} required={true}
                             initialValue={props.collaboration.main_collaboration}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'collaboration-field-9'}
                             setChanged={setChanged}/>
                <Selector required={true} selected={props.collaboration.unit}
                          handleChange={event => props.handleChange({name: 'unit', value: event})} label={lang.unit}
                          data={props.units} width={'calc(33.333% - 21.35px)'}
                          key={'collaboration-field-1'} setChanged={setChanged}
                />
                <Selector required={true} selected={props.collaboration.linkage}
                          handleChange={event => props.handleChange({name: 'linkage', value: event})}
                          setChanged={setChanged}
                          label={lang.linkage} key={'collaboration-field-5'}
                          data={props.linkages} disabled={!props.collaboration.unit}
                          width={'calc(33.333% - 21.35px)'}/>

                <Selector required={false} selected={props.collaboration.senior_member}
                          handleChange={event => props.handleChange({name: 'senior_member', value: event})}
                          setChanged={setChanged} disabled={props.seniors.length === 0}
                          label={lang.senior} key={'collaboration-field-7'}
                          data={props.seniors} width={'calc(50% - 16px)'}/>

                <Selector required={true} selected={props.collaboration.access_level_profile}
                          handleChange={event => props.handleChange({name: 'access_level_profile', value: event})}
                          setChanged={setChanged} disabled={!props.collaboration.unit}
                          label={lang.access} key={'collaboration-field-6'}
                          data={props.accessProfiles} width={'calc(50% - 16px)'}/>


                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.role}
                </h4>
                <InputLayout inputName={lang.active} dark={props.dark} handleChange={props.handleChange} inputType={1}
                             disabled={!props.collaboration.unit} size={'calc(33.333% - 21.35px)'} required={true}
                             initialValue={props.collaboration.is_active_on_role} name={'is_active_on_role'}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'collaboration-field-8'}
                             setChanged={setChanged}/>
                <Selector required={false} selected={props.collaboration.effective_role}
                          handleChange={event => props.handleChange({name: 'effective_role', value: event})}
                          setChanged={setChanged} disabled={!props.collaboration.unit}
                          label={lang.effective} key={'collaboration-field-2'}
                          data={props.effectiveRoles} width={'calc(33.333% - 21.35px)'}/>

                <Selector required={false} selected={props.collaboration.commissioned_role}
                          handleChange={event => props.handleChange({name: 'commissioned_role', value: event})}
                          setChanged={setChanged} disabled={!props.collaboration.unit}
                          label={lang.commissioned} key={'collaboration-field-3'}
                          data={props.commissionedRoles}
                          width={'calc(33.333% - 21.35px)'}/>

                <InputLayout inputName={lang.substitute} dark={props.dark} handleChange={props.handleChange}
                             inputType={1}
                             disabled={!props.collaboration.unit} size={'calc(50% - 16px)'} required={true}
                             initialValue={props.collaboration.is_substitute}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'collaboration-field-10'} name={'is_substitute'}
                             setChanged={setChanged}/>
                <InputLayout inputName={lang.additional} dark={props.dark}
                             handleChange={props.handleChange}
                             inputType={0} name={'additional_information'}
                             disabled={!props.collaboration.unit} size={'calc(50% - 16px)'} required={false}
                             initialValue={props.collaboration.additional_information}
                             key={'collaboration-field-4'}
                             setChanged={setChanged}/>

                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.contract}
                </h4>
                <InputLayout inputName={lang.admission} dark={props.dark} handleChange={props.handleChange}
                             inputType={2}
                             disabled={!props.collaboration.unit} size={'calc(25% - 24px)'} required={true}
                             initialValue={props.collaboration.admission_date}
                             key={'collaboration-field-12'} name={'admission_date'}
                             setChanged={setChanged}/>

                <InputLayout inputName={lang.publication} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'official_publication_date'}
                             disabled={!props.collaboration.unit} size={'calc(25% - 24px)'} required={true}
                             initialValue={props.collaboration.official_publication_date}
                             key={'collaboration-field-13'}
                             setChanged={setChanged}/>

                <InputLayout inputName={lang.exp} dark={props.dark} handleChange={props.handleChange}
                             inputType={2} name={'contract_expiration'}
                             disabled={!props.collaboration.unit} size={'calc(25% - 24px)'} required={false}
                             initialValue={props.collaboration.contract_expiration}
                             key={'collaboration-field-14'}
                             setChanged={setChanged}/>

                <InputLayout inputName={lang.legalDocument} dark={props.dark} handleChange={props.handleChange}
                             inputType={0} name={'legal_document'}
                             disabled={!props.collaboration.unit} size={'calc(25% - 24px)'} required={true}
                             initialValue={props.collaboration.legal_document}
                             key={'collaboration-field-11'}
                             setChanged={setChanged}/>
                <h4 style={{width: '100%', marginBottom: 'auto'}}>
                    {lang.workShift}
                </h4>
                <InputLayout inputName={lang.start} dark={props.dark} handleChange={props.handleChange}
                             inputType={3} name={'work_shift_start'}
                             disabled={!props.collaboration.unit} size={'calc(50% - 16px)'} required={false}
                             initialValue={props.collaboration.work_shift_start}
                             key={'collaboration-field-15'}
                             setChanged={setChanged}/>

                <InputLayout inputName={lang.end} dark={props.dark} handleChange={props.handleChange}
                             inputType={3} name={'work_shift_end'}
                             disabled={!props.collaboration.unit} size={'calc(50% - 16px)'} required={false}
                             initialValue={props.collaboration.work_shift_end}
                             key={'collaboration-field-16'}
                             setChanged={setChanged}/>


                <Button
                    style={{
                        width: '100%',
                        backgroundColor: disabled() ? 'rgba(0,0,0,0.07)' : '#0095ff',
                        color: disabled() ? '#777777' : 'white',
                        fontWeight: 550,

                    }} variant={'contained'}
                    disabled={disabled()}
                    onClick={() => props.submitChanges({
                        data: props.collaboration,
                        create: props.collaboration.id === undefined,
                        memberID: props.memberID,
                        collaborationID: props.collaborationID
                    }).then(res => {
                        setChanged(!res)
                        props.setAccepted(res)
                    })}>{props.collaborationID !== undefined && props.collaborationID !== null ? lang.save : lang.create}</Button>
            </div>
        )
    else
        return null
}
CollaborationForm.propTypes = {
    memberID: PropTypes.any,
    collaboration: PropTypes.object,
    handleChange: PropTypes.func,
    submitChanges: PropTypes.func,
    units: PropTypes.array,
    seniors: PropTypes.array,
    effectiveRoles: PropTypes.array,
    commissionedRoles: PropTypes.array,
    linkages: PropTypes.array,
    canBeMain: PropTypes.bool,
    collaborationID: PropTypes.any,
    setAccepted: PropTypes.func,
    locale: PropTypes.string
}
