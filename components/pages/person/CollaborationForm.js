import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../../layout/InputLayout";
import PropTypes from "prop-types";
import saveComponentChanges from "../../../utils/person/SaveChanges";
import fetchComponentData from "../../../utils/person/FetchData";
import mapToSelect from "../../../utils/person/MapToSelect";
import mainStyles from '../../../styles/shared/Main.module.css'
import SelectorLayout from "./Selector";

export default function CollaborationForm(props) {

    const [selectedUnit, setSelectedUnit] = useState(null)
    const [units, setUnits] = useState([])
    const [effectiveRoles, setEffectiveRoles] = useState([])
    const [commissionedRoles, setCommissionedRoles] = useState([])
    const [accessProfiles, setAccessProfiles] = useState([])

    const [selectedEffectiveRole, setSelectedEffectiveRole] = useState(null)
    const [selectedCommissionedRole, setSelectedCommissionedRole] = useState(null)
    const [seniorID, setSeniorID] = useState(null)
    const [seniors, setSeniors] = useState([])
    const [publicationDate, setPublicationDate] = useState('')
    const [admissionDate, setAdmissionDate] = useState('')
    const [legalDocument, setLegalDocument] = useState('')
    const [activeRole, setActiveRole] = useState(null)
    const [substitute, setSubstitute] = useState(null)
    const [origin, setOrigin] = useState(null)
    const [changed, setChanged] = useState(false)
    const [workStart, setWorkStart] = useState(null)
    const [workEnd, setWorkEnd] = useState(null)
    const [contractExp, setContractExp] = useState(null)
    const [additionalInfo, setAdditionalInfo] = useState(null)
    const [mainCollaboration, setMainCollaboration] = useState(false)
    const [canBeMain, setCanBeMain] = useState(true)

    const [selectedAccessProfile, setSelectedAccessProfile] = useState(null)

    function disabled() {
        return (
            selectedUnit === null ||
            (publicationDate !== undefined && publicationDate.length === 0) ||
            (admissionDate !== undefined && admissionDate.length === 0) ||
            legalDocument.length === 0 ||
            substitute === null ||
            activeRole === null ||
            changed === false || selectedAccessProfile === null
        )
    }

    useEffect(() => {
            if (props.collaborationID !== null && props.collaborationID !== undefined) {
                fetchComponentData({
                    path: 'collaboration/' + props.collaborationID,
                    params: {}
                }).then(res => {
                        if (res !== null) {
                            setSeniorID(res.senior !== null ? res.senior.id : null)
                            setSelectedEffectiveRole(res.effective_role !== null ? {
                                key: res.effective_role.id,
                                value: res.effective_role.denomination
                            } : null)
                            setSelectedCommissionedRole(res.commissioned_role !== null ? res.commissioned_role.id : null)
                            setSelectedUnit({key: res.unit.id, value: res.unit.acronym})
                            setSubstitute(res.collaboration.is_substitute)
                            setAdmissionDate(res.collaboration.admission_date)
                            setPublicationDate(res.collaboration.official_publication_date)
                            setLegalDocument(res.collaboration.legal_document)
                            setOrigin(res.collaboration.origin)
                            setActiveRole(res.collaboration.is_active_on_role)
                            setWorkStart(res.collaboration.work_shift_start)
                            setWorkEnd(res.collaboration.work_shift_end)
                            setContractExp(res.collaboration.contract_expiration)
                            setAdditionalInfo(res.collaboration.additional_information)
                            setMainCollaboration(res.collaboration.main_collaboration)
                            setSelectedAccessProfile({key: res.access_profile.id, value: res.access_profile.denomination})

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
                        setCanBeMain(false)
                        setMainCollaboration(false)
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
                console.log(res)

            })
            fetchComponentData({path: 'access_profiles', params: {}}).then(res => {
                if (res !== null)
                    setAccessProfiles(res)
            })
        },
        []
    )

    async function saveChanges() {
        await saveComponentChanges({
            path: props.collaborationID !== null && props.collaborationID !== undefined ? 'collaboration/' + props.collaborationID : 'collaboration',
            params: {
                person: props.userID,
                senior: seniorID,
                effective_role: selectedEffectiveRole,
                commissioned_role: selectedCommissionedRole,
                unit: selectedUnit.key,
                is_substitute: substitute,
                official_publication_date: typeof (publicationDate) === "number" ? publicationDate : publicationDate.getTime(),
                admission_date: typeof (admissionDate) === "number" ? admissionDate : admissionDate.getTime(),
                legal_document: legalDocument,
                origin: origin,
                is_active_on_role: activeRole !== null ? activeRole : false,
                work_shift_start: workStart,
                work_shift_end: workEnd,
                contract_expiration: contractExp !== null && contractExp !== undefined && contractExp.length > 0 ? typeof (contractExp) === "number" ? contractExp : contractExp.getTime() : null,
                additional_information: additionalInfo,
                main_collaboration: canBeMain ? mainCollaboration : false,
                access_level_profile: selectedAccessProfile
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
        console.log(data)
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
        return (props.collaborationID !== undefined && props.collaborationID !== null && units.length > 0 && accessProfiles.length > 0) || (props.collaborationID === undefined && units.length > 0)
    }

    if (canLoad())
        return (
            <div
                className={[mainStyles.displayWarp, mainStyles.displayInlineCenter].join(' ')}>
                <SelectorLayout required={true} selected={selectedUnit} handleChange={setUnit} label={'Unit'}
                                data={mapToSelect({option: 0, units: units})} width={23.6}
                                key={'2-1-' + props.index} setChanged={setChanged}
                />

                <SelectorLayout required={false} selected={selectedEffectiveRole}
                                handleChange={setSelectedEffectiveRole} setChanged={setChanged}
                                label={'Effective Role'} key={'2-4-' + props.index}
                                data={mapToSelect({option: 1, effectiveRoles: effectiveRoles})} width={23.6}/>

                <SelectorLayout required={false} selected={selectedCommissionedRole}
                                handleChange={setSelectedEffectiveRole} setChanged={setChanged}
                                label={'Commissioned Role'} key={'2-5-' + props.index}
                                data={mapToSelect({option: 2, commissionedRoles: commissionedRoles})} width={23.6}/>
                <SelectorLayout required={true} selected={selectedAccessProfile}
                                handleChange={setSelectedAccessProfile} setChanged={setChanged}
                                label={'Access Profile'} key={'2-14-' + props.index}
                                data={mapToSelect({option: 4, accessProfiles: accessProfiles})} width={23.6}/>

                <InputLayout inputName={'Additional information'} dark={props.dark} handleChange={setAdditionalInfo}
                             inputType={0}
                             disabled={!props.editable} size={32} required={false} initialValue={additionalInfo}
                             key={'2-15-' + props.index}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Active Role'} dark={props.dark} handleChange={setActiveRole} inputType={1}
                             disabled={!props.editable} size={32} required={true}
                             initialValue={activeRole}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'2-2-' + props.index}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Main Collaboration'} dark={props.dark} handleChange={setMainCollaboration}
                             inputType={1}
                             disabled={!props.editable ||
                             (!canBeMain && !mainCollaboration && (props.collaborationID === undefined || props.collaborationID === null)) ||
                             (!canBeMain && (props.collaborationID === undefined || props.collaborationID === null))
                             } size={32} required={true}
                             initialValue={mainCollaboration}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'2-3-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Substitute'} dark={props.dark} handleChange={setSubstitute} inputType={1}
                             disabled={!props.editable} size={32} required={true} initialValue={substitute}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]}
                             key={'2-6-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Senior'} dark={props.dark} handleChange={setSeniorID} inputType={1}
                             disabled={!props.editable || seniors.length === 0} size={32} required={false}
                             initialValue={seniorID}
                             selectFields={mapToSelect({option: 3, seniors: seniors})}
                             key={'2-7-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Admission'} dark={props.dark} handleChange={setAdmissionDate} inputType={2}
                             disabled={!props.editable} size={32} required={true} initialValue={admissionDate}
                             key={'2-8-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Official Publication'} dark={props.dark} handleChange={setPublicationDate}
                             inputType={2}
                             disabled={!props.editable} size={32} required={true} initialValue={publicationDate}
                             key={'2-9-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Contract Expiration'} dark={props.dark} handleChange={setContractExp}
                             inputType={2}
                             disabled={!props.editable} size={32} required={false} initialValue={contractExp}
                             key={'2-10-' + props.index}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Legal Document'} dark={props.dark} handleChange={setLegalDocument}
                             inputType={0}
                             disabled={!props.editable} size={32} required={true} initialValue={legalDocument}
                             key={'2-11-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Work shift start'} dark={props.dark} handleChange={setWorkStart}
                             inputType={3}
                             disabled={!props.editable} size={48.5} required={false} initialValue={workStart}
                             key={'2-12-' + props.index}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Work shift end'} dark={props.dark} handleChange={setWorkEnd}
                             inputType={3}
                             disabled={!props.editable} size={48.5} required={false} initialValue={workEnd}
                             key={'2-13-' + props.index}
                             setChanged={setChanged}/>





                <Button style={{
                    width: props.collaborationID !== undefined && props.collaborationID !== null ? '48.5%' : '94%',
                    marginBottom: '.8vw',
                    backgroundColor: disabled() ? null : '#0095ff',
                    color: disabled() ? null : 'white'
                }} variant={'contained'}
                        disabled={disabled()}
                        onClick={() => saveChanges()}>Save</Button>
                {props.collaborationID !== undefined && props.collaborationID !== null ?
                    <Button style={{
                        width: '48.5%', marginBottom: '.8vw',
                        backgroundColor: '#f54269',
                        color: 'white'
                    }} variant={'contained'} onClick={() => deleteCollaboration()}>Delete</Button>
                    :
                    null
                }
            </div>
        )
    else
        return null

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
