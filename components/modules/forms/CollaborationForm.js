import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../InputLayout";
import PropTypes from "prop-types";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import fetchComponentData from "../../../utils/person/FetchData";
import mapToSelect from "../../../utils/person/MapToSelect";
import mainStyles from '../../../styles/shared/Main.module.css'
import Selector from "../Selector";

export default function CollaborationForm(props) {

    const [units, setUnits] = useState([])
    const [selectedUnit, setSelectedUnit] = useState(null)

    const [effectiveRoles, setEffectiveRoles] = useState([])
    const [selectedEffectiveRole, setSelectedEffectiveRole] = useState(null)

    const [commissionedRoles, setCommissionedRoles] = useState([])
    const [selectedCommissionedRole, setSelectedCommissionedRole] = useState(null)

    const [accessProfiles, setAccessProfiles] = useState([])
    const [selectedAccessProfile, setSelectedAccessProfile] = useState(null)

    const [linkages, setLinkages] = useState([])
    const [selectedLinkage, setSelectedLinkage] = useState(null)

    const [seniors, setSeniors] = useState([])
    const [selectedSenior, setSelectedSenior] = useState(null)

    const [changed, setChanged] = useState(false)

    const [collaboration, setCollaboration] = useState({
        publicationDate: undefined,
        admissionDate: undefined,
        legalDocument: undefined,
        activeRole: undefined,
        substitute: undefined,
        origin: undefined,
        workStart: undefined,
        workEnd: undefined,
        contractExp: undefined,
        additionalInfo: undefined,
        mainCollaboration: undefined,
        canBeMain: undefined
    })

    function handleChange(props) {
        setCollaboration(prevState => ({
            ...prevState,
            [props.name]: props.value
        }))
    }

    function disabled() {

        return (
            selectedUnit === null ||
            collaboration.publicationDate === undefined ||
            collaboration.admissionDate === undefined ||
            (collaboration.legalDocument === undefined || collaboration.legalDocument.length === 0) ||
            collaboration.substitute === null ||
            collaboration.activeRole === null ||
            setSelectedLinkage === null ||
            changed === false ||
            selectedAccessProfile === null
        )
    }

    useEffect(() => {
            if (props.collaborationID !== null && props.collaborationID !== undefined) {
                fetchComponentData({
                    path: 'collaboration/' + props.collaborationID,
                    params: {}
                }).then(res => {
                        if (res !== null) {
                            setSelectedSenior(res.senior !== null ? {key: res.senior.id, value: res.senior.name} : undefined)
                            setSelectedEffectiveRole(res.effective_role !== null ? {
                                key: res.effective_role.id,
                                value: res.effective_role.denomination
                            } : null)
                            setSelectedCommissionedRole(res.commissioned_role !== null ? res.commissioned_role.id : null)
                            setSelectedUnit({key: res.unit.id, value: res.unit.acronym})
                            setSelectedAccessProfile({key: res.access_profile.id, value: res.access_profile.denomination})
                            setSelectedLinkage({key: res.linkage.id, value: res.linkage.denomination})
                            handleChange({name: 'substitute', value: res.collaboration.is_substitute})
                            handleChange({name: 'admissionDate', value: res.collaboration.admission_date})
                            handleChange({name: 'publicationDate', value: res.collaboration.official_publication_date})
                            handleChange({name: 'legalDocument', value: res.collaboration.legal_document})
                            handleChange({name: 'origin', value: res.collaboration.origin})
                            handleChange({name: 'activeRole', value: res.collaboration.is_active_on_role})
                            handleChange({name: 'workStart', value: res.collaboration.work_shift_start})
                            handleChange({name: 'workEnd', value: res.collaboration.work_shift_end})
                            handleChange({name: 'contractExp', value: res.collaboration.contract_expiration})
                            handleChange({name: 'additionalInfo', value: res.collaboration.additional_information})
                            handleChange({name: 'mainCollaboration', value: res.collaboration.main_collaboration})

                            fetchComponentData({path: 'seniors/' + res.unit.id + '/' + props.userID, params: {}}).then(res => {
                                if (res !== null)
                                    setSeniors(res)
                            })
                        }

                    }
                )
            }

            fetchComponentData({
                path: 'main/collaboration/' + props.userID,
                params: {}
            }).then(res => {
                    if (res !== null) {
                        handleChange({name: 'canBeMain', value: false})
                        if (props.collaborationID === undefined || props.collaborationID === null)
                            handleChange({name: 'mainCollaboration', value: false})
                    } else {
                        handleChange({name: 'canBeMain', value: true})
                        if (props.collaborationID === undefined || props.collaborationID === null)
                            handleChange({name: 'mainCollaboration', value: undefined})
                    }
                }
            )
            fetchComponentData({path: 'roles/effective', params: {}}).then(res => {
                setEffectiveRoles(res)
            })

            fetchComponentData({path: 'roles/commissioned', params: {}}).then(res => {
                if (res !== null)
                    setCommissionedRoles(res)
            })

            fetchComponentData({path: 'units', params: {}}).then(res => {
                if (res !== null) {
                    setUnits(res)
                }
            })
            fetchComponentData({path: 'access_profiles', params: {}}).then(res => {
                if (res !== null)
                    setAccessProfiles(res)
            })
            fetchComponentData({path: 'linkage', params: {}}).then(res => {
                if (res !== null)
                    setLinkages(res)
            })
        },
        []
    )

    async function saveChanges() {
        await saveComponentChanges({
            path: props.collaborationID !== null && props.collaborationID !== undefined ? 'collaboration/' + props.collaborationID : 'collaboration',
            params: {
                person: props.userID,
                senior: selectedSenior !== null && selectedSenior !== undefined ? selectedSenior.key : null,
                effective_role: selectedEffectiveRole !== null && selectedEffectiveRole !== undefined ? selectedEffectiveRole.key : null,
                commissioned_role: selectedCommissionedRole !== null && selectedCommissionedRole !== undefined ? selectedCommissionedRole.key : null,
                unit: selectedUnit !== null && selectedUnit !== undefined ? selectedUnit.key : null,
                is_substitute: collaboration.substitute,
                official_publication_date: typeof (collaboration.publicationDate) === "number" ? collaboration.publicationDate : collaboration.publicationDate.getTime(),
                admission_date: typeof (collaboration.admissionDate) === "number" ? collaboration.admissionDate : collaboration.admissionDate.getTime(),
                legal_document: collaboration.legalDocument,
                origin: collaboration.origin,
                is_active_on_role: collaboration.activeRole !== null ? collaboration.activeRole : false,
                work_shift_start: collaboration.workStart,
                work_shift_end: collaboration.workEnd,
                contract_expiration: collaboration.contractExp !== undefined && collaboration.contractExp !== null ? (typeof (collaboration.contractExp) === "number" ? collaboration.contractExp : collaboration.contractExp.getTime()) : null,
                additional_information: collaboration.additionalInfo,
                main_collaboration: collaboration.canBeMain ? collaboration.mainCollaboration : false,
                access_level_profile: selectedAccessProfile !== null && selectedAccessProfile !== undefined ? selectedAccessProfile.key : null,
                linkage: selectedLinkage !== null ? selectedLinkage.key : null
            },
            method: props.collaborationID !== null && props.collaborationID !== undefined ? 'put' : 'post'
        }).then(res => {
            if (res && props.collaborationID !== null && props.collaborationID !== undefined)
                setChanged(false)
            else
                props.fetchData()

        })
    }

    async function deleteCollaboration() {
        await saveComponentChanges({
            path: 'collaboration/' + props.collaborationID,
            params: {},
            method: 'delete'
        }).then(() => {
            props.fetchData()
        })
    }

    async function setUnit(data) {
        if (data !== undefined) {
            setSelectedUnit({key: data.key, value: data.value})
            fetchComponentData({path: 'seniors/' + data.key + '/' + props.userID, params: {}}).then(res => {
                if (res !== null)
                    setSeniors(res)
            })
        } else {
            setSelectedUnit(undefined)
            setSeniors([])
        }
    }

    function canLoad() {
        return (
            props.collaborationID !== undefined &&
            props.collaborationID !== null &&
            units.length > 0 &&
            accessProfiles.length > 0 &&
            collaboration.mainCollaboration !== undefined &&
            collaboration.activeRole !== undefined &&
            collaboration.substitute !== undefined &&
            selectedAccessProfile !== null &&
            selectedUnit !== null
        ) || (props.collaborationID === undefined && units.length > 0)
    }

    if (canLoad())
        return (
            <div
                className={[mainStyles.displayWarp, mainStyles.displayInlineCenter].join(' ')}
                style={{marginTop: '10px'}}>
                <Selector required={true} selected={selectedUnit} handleChange={setUnit} label={'Unit'}
                          data={mapToSelect({option: 0, units: units})} width={'calc(25% - 12px)'}
                          key={'2-1-' + props.index} setChanged={setChanged}
                />

                <Selector required={false} selected={selectedEffectiveRole}
                          handleChange={setSelectedEffectiveRole} setChanged={setChanged}
                          label={'Effective Role'} key={'2-4-' + props.index}
                          data={mapToSelect({option: 1, effectiveRoles: effectiveRoles})} width={'calc(25% - 12px)'}/>

                <Selector required={false} selected={selectedCommissionedRole}
                          handleChange={setSelectedEffectiveRole} setChanged={setChanged}
                          label={'Commissioned Role'} key={'2-5-' + props.index}
                          data={mapToSelect({option: 2, commissionedRoles: commissionedRoles})}
                          width={'calc(25% - 12px)'}/>
                <div style={{marginTop: 'auto', width: 'calc(25% - 12px)'}}>
                    <InputLayout inputName={'Additional Role information'} dark={props.dark} handleChange={handleChange}
                                 inputType={0} name={'additionalInfo'}
                                 disabled={!props.editable} size={'100%'} required={false}
                                 initialValue={collaboration.additionalInfo}
                                 key={'2-15-' + props.index}
                                 setChanged={setChanged}/>
                </div>

                <Selector required={true} selected={selectedLinkage}
                          handleChange={setSelectedLinkage} setChanged={setChanged}
                          label={'Linkage'} key={'linkage-' + props.index}
                          data={mapToSelect({option: 5, linkages: linkages})}
                          width={'calc(25% - 12px)'}/>

                <Selector required={true} selected={selectedAccessProfile}
                          handleChange={setSelectedAccessProfile} setChanged={setChanged}
                          label={'Access Profile'} key={'2-14-' + props.index}
                          data={mapToSelect({option: 4, accessProfiles: accessProfiles})} width={'calc(25% - 12px)'}/>

                <Selector required={true} selected={selectedSenior}
                          handleChange={setSelectedSenior} setChanged={setChanged}
                          label={'Senior'} key={'2-7-' + props.index}
                          data={mapToSelect({option: 3, seniors: seniors})} width={'calc(50% - 8px)'}/>


                <InputLayout inputName={'Active Role'} dark={props.dark} handleChange={handleChange} inputType={1}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={collaboration.activeRole} name={'activeRole'}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'2-2-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Main Collaboration'} dark={props.dark} handleChange={handleChange}
                             inputType={1} name={'mainCollaboration'}
                             disabled={(!props.editable || !collaboration.canBeMain) && (collaboration.mainCollaboration === undefined || collaboration.mainCollaboration === null || !collaboration.mainCollaboration)}
                             size={'calc(25% - 12px)'} required={true}
                             initialValue={collaboration.mainCollaboration}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'2-3-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Substitute'} dark={props.dark} handleChange={handleChange} inputType={1}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={collaboration.substitute}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'2-6-' + props.index} name={'substitute'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Legal Document'} dark={props.dark} handleChange={handleChange}
                             inputType={0} name={'legalDocument'}
                             disabled={!props.editable} size={'calc(25% - 12px)'} required={true}
                             initialValue={collaboration.legalDocument}
                             key={'2-11-' + props.index}
                             setChanged={setChanged}/>


                <InputLayout inputName={'Admission'} dark={props.dark} handleChange={handleChange} inputType={2}
                             disabled={!props.editable} size={'calc(33.333% - 10.666px'} required={true}
                             initialValue={collaboration.admissionDate}
                             key={'2-8-' + props.index} name={'admissionDate'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Official Publication'} dark={props.dark} handleChange={handleChange}
                             inputType={2} name={'publicationDate'}
                             disabled={!props.editable} size={'calc(33.333% - 10.666px'} required={true}
                             initialValue={collaboration.publicationDate}
                             key={'2-9-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Contract Expiration'} dark={props.dark} handleChange={handleChange}
                             inputType={2} name={'contractExp'}
                             disabled={!props.editable} size={'calc(33.333% - 10.666px'} required={false}
                             initialValue={collaboration.contractExp}
                             key={'2-10-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Work shift start'} dark={props.dark} handleChange={handleChange}
                             inputType={3} name={'workStart'}
                             disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                             initialValue={collaboration.workStart}
                             key={'2-12-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Work shift end'} dark={props.dark} handleChange={handleChange}
                             inputType={3} name={'workEnd'}
                             disabled={!props.editable} size={'calc(50% - 8px)'} required={false}
                             initialValue={collaboration.workEnd}
                             key={'2-13-' + props.index}
                             setChanged={setChanged}/>


                <Button style={{
                    width: props.collaborationID !== undefined && props.collaborationID !== null ? 'calc(50% - 8px)' : '100%',
                    backgroundColor: disabled() ? null : '#0095ff',
                    color: disabled() ? null : 'white'
                }} variant={'contained'}
                        disabled={disabled()}
                        onClick={() => saveChanges()}>Save</Button>
                {props.collaborationID !== undefined && props.collaborationID !== null ?
                    <Button style={{
                        width: 'calc(50% - 8px)',
                        backgroundColor: '#f54269',
                        color: 'white'
                    }} variant={'contained'} onClick={() => deleteCollaboration()}>Delete</Button>
                    :
                    null
                }
            </div>
        )
    else
        return <>Loading</>

}
CollaborationForm.propTypes = {
    collaborationID: PropTypes.any,
    userID: PropTypes.string,
    dark: PropTypes.bool,
    visible: PropTypes.bool,
    editable: PropTypes.bool,
    fetchData: PropTypes.func,
    index: PropTypes.number
}