import styles from "../../styles/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../shared/InputLayout";
import PropTypes from "prop-types";
import ContactForm from "./ContactForm";

export default function CollaborationForm(props) {

    const [unities, setUnities] = useState([])
    const [roles, setRoles] = useState([])
    const [linkages, setLinkages] = useState([])
    const [seniorID, setSeniorID] = useState(null)
    const [seniors, setSeniors] = useState([])
    const [publicationDate, setPublicationDate] = useState(null)
    const [admissionDate, setAdmissionDate] = useState(null)
    const [legalDocument, setLegalDocument] = useState(null)
    const [activeRole, setActiveRole] = useState(null)
    const [unityID, setUnityID] = useState(null)
    const [roleID, setRoleID] = useState(null)
    const [linkageID, setLinkageID] = useState(null)
    const [substitute, setSubstitute] = useState(null)
    const [origin, setOrigin] = useState(null)
    const [roleLevel, setRoleLevel] = useState(null)
    const [changed, setChanged] = useState(false)
    const [exists, setExists] = useState(false)
    const [workStart, setWorkStart] = useState(null)
    const [workEnd, setWorkEnd] = useState(null)
    const [contractExp, setContractExp] = useState(null)
    const [additionalInfo, setAdditionalInfo] = useState(null)
    const [loading, setLoading] = useState(true)
    const [canBeActive, setCanBeActive] = useState(false)

    function handleRoleChange(event) {
        const roleData = JSON.parse(event)
        setRoleID(roleData.roleID)
        setRoleLevel(roleData.roleLevel)
        props.fetchData('seniors', {}).then(res => {
            if (res !== null)
                setSeniors(res)
            else
                setSeniors([])
        })
    }

    useEffect(() => {
            if (props.collaborationID !== null) {
                props.fetchData('collaborator', {collaboration_id: props.collaborationID}).then(res => {
                        if (res !== null) {
                            setSeniorID(res.senior !== null ? res.senior.id : null)
                            setRoleID(res.role.id)
                            setRoleLevel(res.role.level)
                            setLinkageID(res.linkage.id)
                            setUnityID(res.unity.id)
                            setSubstitute(res.is_substitute)
                            setAdmissionDate(res.admission_date)
                            setPublicationDate(res.official_publication_date)
                            setLegalDocument(res.legal_document)
                            setOrigin(res.origin)
                            setActiveRole(res.is_active_on_role)
                            setExists(true)
                            setWorkStart(res.work_shift_start)
                            setWorkEnd(res.work_shift_end)
                            setContractExp(res.contract_expiration)
                            setAdditionalInfo(res.additional_information)
                            setLoading(false)
                            // if (res.is_active_on_role === false)
                            //     props.fetchData('collaborator/active/role', {id: props.userID}).then(res => setCanBeActive(res.can_be_active))
                            // else
                                setCanBeActive(true)

                        }
                    }
                )
            } else {
                setLoading(false)
                // props.fetchData('collaborator/active/role', {id: props.userID}).then(res => setCanBeActive(res.can_be_active))
            }

            props.fetchData('role', {}).then(res =>
                setRoles(res)
            )
            props.fetchData('linkage', {}).then(res =>
                setLinkages(res)
            )
            props.fetchData('unities', {}).then(res =>
                setUnities(res)
            )

        },
        []
    )

    async function saveChanges() {
        await props.saveChanges(
            'collaborator',
            {
                id: props.userID,
                collaboration_id: props.collaborationID,
                senior_id: seniorID,
                role_id: roleID,
                linkage_id: linkageID,
                unity_id: unityID,
                is_substitute: substitute,
                official_publication_date:  typeof(publicationDate) !== "number" ? publicationDate.getTime() : publicationDate,
                admission_date: typeof(admissionDate) !== "number" ? admissionDate.getTime() : admissionDate,
                legal_document: legalDocument,
                origin: origin,
                is_active_on_role: activeRole !== null ? activeRole : false,
                work_shift_start: workStart,
                work_shift_end: workEnd,
                contract_expiration: typeof(contractExp) !== "number" ? contractExp.getTime() : contractExp,
                additional_information: additionalInfo,
            },
            props.collaborationID === null ? 'post' : 'put'
        ).then(res => {
            if (res && props.collaborationID === null)
                props.setModal(false)
            else if (res)
                setChanged(false)
            else
                console.log(res)
        })
    }

    function mapToSelect(option) {
        let response = []
        switch (option) {
            case 0: {
                unities.map(unity => {
                    response.push({
                        key: unity.id,
                        value: unity.acronym + ' - ' + unity.name
                    })
                })
                break
            } // UNITY
            case 1: {
                roles.map(role => {
                    response.push({
                        key: JSON.stringify({
                            roleID: role.id,
                            roleLevel: role.level
                        }),
                        value: role.denomination
                    })
                })
                break
            } // ROLE
            case 2: {
                linkages.map(link => {
                    response.push({
                        key: link.id,
                        value: link.description
                    })
                })
                break
            } // LINKAGE
            case 3: {
                seniors.map(senior => {
                    response.push({
                        key: senior.id,
                        value: senior.name
                    })
                })
                break
            } // SENIORS

            default: {
                break
            }
        }
        return response
    }

    if (!loading)
        return (
            <div className={styles.form_component_container}
                 style={{margin: 'auto',width: '40vw', height: '45vh'}}>
                <InputLayout inputName={'Unity'} dark={props.dark} handleChange={setUnityID} inputType={1}
                             disabled={props.disabled} size={32} required={true} initialValue={unityID}
                             selectFields={mapToSelect(0)} key={'2-1'} setChanged={setChanged}/>

                <InputLayout inputName={'Role'} dark={props.dark} handleChange={handleRoleChange} inputType={1}
                             disabled={props.disabled} size={32} required={true}
                             initialValue={JSON.stringify({roleID: roleID, roleLevel: roleLevel})}
                             selectFields={mapToSelect(1)} key={'2-2'} setChanged={setChanged}/>

                <InputLayout inputName={'Linkage'} dark={props.dark} handleChange={setLinkageID} inputType={1}
                             disabled={props.disabled} size={32} required={true} initialValue={linkageID}
                             selectFields={mapToSelect(2)} key={'2-3'} setChanged={setChanged}/>

                <InputLayout inputName={'Active Role'} dark={props.dark} handleChange={setActiveRole} inputType={1}
                             disabled={props.disabled || !canBeActive} size={32} required={canBeActive}
                             initialValue={activeRole}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-4'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Substitute'} dark={props.dark} handleChange={setSubstitute} inputType={1}
                             disabled={props.disabled} size={32} required={true} initialValue={substitute}
                             selectFields={[{key: false, value: 'No'}, {key: true, value: 'Yes'}]} key={'2-5'}
                             setChanged={setChanged}/>

                <InputLayout inputName={'Senior'} dark={props.dark} handleChange={setSeniorID} inputType={1}
                             disabled={props.disabled || seniors.length === 0} size={32} required={false}
                             initialValue={seniorID}
                             selectFields={mapToSelect(3)} key={'2-6'} setChanged={setChanged}/>

                <InputLayout inputName={'Admission'} dark={props.dark} handleChange={setAdmissionDate} inputType={2}
                             disabled={props.disabled} size={32} required={true} initialValue={admissionDate}
                             key={'2-7'} setChanged={setChanged}/>

                <InputLayout inputName={'Official Publication'} dark={props.dark} handleChange={setPublicationDate}
                             inputType={2}
                             disabled={props.disabled} size={32} required={true} initialValue={publicationDate}
                             key={'2-8'} setChanged={setChanged}/>

                <InputLayout inputName={'Contract Expiration'} dark={props.dark} handleChange={setContractExp}
                             inputType={2}
                             disabled={props.disabled} size={32} required={false} initialValue={contractExp}
                             key={'2-9'} setChanged={setChanged}/>
                <InputLayout inputName={'Legal Document'} dark={props.dark} handleChange={setLegalDocument}
                             inputType={0}
                             disabled={props.disabled} size={32} required={true} initialValue={legalDocument}
                             key={'2-10'} setChanged={setChanged}/>

                <InputLayout inputName={'Work shift start'} dark={props.dark} handleChange={setWorkStart}
                             inputType={3}
                             disabled={props.disabled} size={32} required={false} initialValue={workStart}
                             key={'2-11'} setChanged={setChanged}/>

                <InputLayout inputName={'Work shift end'} dark={props.dark} handleChange={setWorkEnd}
                             inputType={3}
                             disabled={props.disabled} size={32} required={false} initialValue={workEnd}
                             key={'2-12'} setChanged={setChanged}/>
                <InputLayout inputName={'Additional information'} dark={props.dark} handleChange={setAdditionalInfo}
                             inputType={0}
                             disabled={props.disabled} size={100} required={false} initialValue={additionalInfo}
                             key={'2-13'} setChanged={setChanged}/>

                <Button style={{width: '100%'}} onClick={() => saveChanges()} disabled={!changed}>Save
                    changes</Button>
            </div>
        )
    else
        return (
            <div className={styles.form_component_container}
                 style={{width: '45vw', margin: 'auto', height: '49vh'}}>
                <legend style={{width: '100%'}}>
                    <p style={{
                        fontSize: '1.2rem',
                        fontWeight: 450,
                        color: props.dark ? 'white' : 'black'
                    }}>Collaboration</p>
                </legend>
            </div>
        )

}
CollaborationForm.propTypes = {
    collaborationID: PropTypes.any,
    userID: PropTypes.string,
    dark: PropTypes.bool,
    disabled: PropTypes.bool,
    saveChanges: PropTypes.func,
    fetchData: PropTypes.func,
}