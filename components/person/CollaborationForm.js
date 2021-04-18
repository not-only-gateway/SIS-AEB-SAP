import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../shared/layout/InputLayout";
import PropTypes from "prop-types";
import saveComponentChanges from "../../utils/person/SaveChanges";
import fetchComponentData from "../../utils/person/FetchData";
import mapToSelect from "../../utils/person/MapToSelect";
import mainStyles from '../../styles/shared/Main.module.css'

export default function CollaborationForm(props) {

    const [unitID, setUnitID] = useState(null)
    const [units, setUnits] = useState([])
    const [effectiveRoles, setEffectiveRoles] = useState([])
    const [commissionedRoles, setCommissionedRoles] = useState([])
    const [effectiveRoleID, setEffectiveRoleID] = useState(null)
    const [commissionedRoleID, setCommissionedRoleID] = useState(null)
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
    const [accessProfiles, setAccessProfiles] = useState([])
    const [accessProfileID, setAccessProfileID] = useState(null)

    function disabled() {
        return (
            unitID === null ||
            (publicationDate !== undefined && publicationDate.length === 0) ||
            (admissionDate !== undefined && admissionDate.length === 0) ||
            legalDocument.length === 0 ||
            substitute === null ||
            activeRole === null ||
            changed === false || accessProfileID === null
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
                            setEffectiveRoleID(res.effective_role !== null ? res.effective_role.id : null)
                            setCommissionedRoleID(res.commissioned_role !== null ? res.commissioned_role.id : null)
                            setUnitID(res.unit.id)
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
                            setAccessProfileID(res.access_profile.id)

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
                effective_role: effectiveRoleID,
                commissioned_role: commissionedRoleID,
                unit: unitID,
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
                access_level_profile: accessProfileID
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

    async function setUnit(id) {
        setUnitID(id)
        fetchComponentData({path: 'seniors/' + id + '/' + props.userID, params: {}}).then(res => {
            if (res !== null)
                setSeniors(res)
        })
    }
    function canLoad(){
        return (props.collaborationID !== undefined && props.collaborationID !== null && unitID !== null && activeRole !== null && substitute !== null && accessProfileID !== null) || (props.collaborationID === undefined && units.length > 0)
    }
    if (canLoad())
        return (
            <div
                className={[mainStyles.normalBorder, mainStyles.displayWarp, mainStyles.mediumWidth, mainStyles.displayInlineCenter].join(' ')}>
                <InputLayout inputName={'Unit'} dark={props.dark} handleChange={setUnit} inputType={1}
                             disabled={!props.editable} size={30} required={true} initialValue={unitID}
                             selectFields={mapToSelect({option: 0, units: units})} key={'2-1'} setChanged={setChanged}/>


                <InputLayout inputName={'Active Role'} dark={props.dark} handleChange={setActiveRole} inputType={1}
                             disabled={!props.editable} size={30} required={true}
                             initialValue={activeRole}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-2'}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Main Collaboration'} dark={props.dark} handleChange={setMainCollaboration}
                             inputType={1}
                             disabled={!props.editable ||
                             (!canBeMain && !mainCollaboration && (props.collaborationID === undefined || props.collaborationID === null)) ||
                             (!canBeMain && (props.collaborationID === undefined || props.collaborationID === null))
                             } size={30} required={true}
                             initialValue={mainCollaboration}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-3'}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Effective Role' || commissionedRoles.length === 0} dark={props.dark}
                             handleChange={setEffectiveRoleID}
                             inputType={1}
                             disabled={!props.editable} size={46} required={false}
                             initialValue={effectiveRoleID}
                             selectFields={mapToSelect({option: 1, effectiveRoles: effectiveRoles})} key={'2-4'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Commissioned Role'} dark={props.dark} handleChange={setCommissionedRoleID}
                             inputType={1}
                             disabled={!props.editable || commissionedRoles.length === 0} size={46} required={false}
                             initialValue={commissionedRoleID}
                             selectFields={mapToSelect({option: 2, commissionedRoles: commissionedRoles})} key={'2-5'}
                             setChanged={setChanged}/>
                <InputLayout inputName={'Substitute'} dark={props.dark} handleChange={setSubstitute} inputType={1}
                             disabled={!props.editable} size={30} required={true} initialValue={substitute}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-6'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Senior'} dark={props.dark} handleChange={setSeniorID} inputType={1}
                             disabled={!props.editable || seniors.length === 0} size={30} required={false}
                             initialValue={seniorID}
                             selectFields={mapToSelect({option: 3, seniors: seniors})} key={'2-7'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Admission'} dark={props.dark} handleChange={setAdmissionDate} inputType={2}
                             disabled={!props.editable} size={30} required={true} initialValue={admissionDate}
                             key={'2-8'} setChanged={setChanged}/>

                <InputLayout inputName={'Official Publication'} dark={props.dark} handleChange={setPublicationDate}
                             inputType={2}
                             disabled={!props.editable} size={30} required={true} initialValue={publicationDate}
                             key={'2-9'} setChanged={setChanged}/>

                <InputLayout inputName={'Contract Expiration'} dark={props.dark} handleChange={setContractExp}
                             inputType={2}
                             disabled={!props.editable} size={30} required={false} initialValue={contractExp}
                             key={'2-10'} setChanged={setChanged}/>
                <InputLayout inputName={'Legal Document'} dark={props.dark} handleChange={setLegalDocument}
                             inputType={0}
                             disabled={!props.editable} size={30} required={true} initialValue={legalDocument}
                             key={'2-11'} setChanged={setChanged}/>

                <InputLayout inputName={'Work shift start'} dark={props.dark} handleChange={setWorkStart}
                             inputType={3}
                             disabled={!props.editable} size={46} required={false} initialValue={workStart}
                             key={'2-12'} setChanged={setChanged}/>

                <InputLayout inputName={'Work shift end'} dark={props.dark} handleChange={setWorkEnd}
                             inputType={3}
                             disabled={!props.editable} size={46} required={false} initialValue={workEnd}
                             key={'2-13'} setChanged={setChanged}/>
                <InputLayout inputName={'Access Profile'} dark={props.dark} handleChange={setAccessProfileID}
                             inputType={1} selectFields={mapToSelect({option: 4, accessProfiles: accessProfiles})}
                             disabled={!props.editable} size={46} required={true} initialValue={accessProfileID}
                             key={'2-15'} setChanged={setChanged}/>
                <InputLayout inputName={'Additional information'} dark={props.dark} handleChange={setAdditionalInfo}
                             inputType={0}
                             disabled={!props.editable} size={46} required={false} initialValue={additionalInfo}
                             key={'2-15'} setChanged={setChanged}/>


                <Button style={{
                    width: props.collaborationID !== undefined && props.collaborationID !== null ? '46%' : '94%',
                    marginBottom: '.8vw',
                    backgroundColor: disabled() ? null : '#39adf6',
                    color: disabled() ? null : 'white'
                }} variant={'contained'} disableElevation
                        disabled={disabled()}
                        onClick={() => saveChanges()}>Save</Button>
                {props.collaborationID !== undefined && props.collaborationID !== null ?
                    <Button style={{
                        width: '46%', marginBottom: '.8vw',
                        backgroundColor: '#f54269',
                        color: 'white'
                    }} variant={'contained'} onClick={() => deleteCollaboration()} disableElevation>Delete</Button>
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
    fetchData: PropTypes.func
}