import styles from "../../styles/form/Form.module.css";
import {Button} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import InputLayout from "../shared/InputLayout";

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
        setRoleID(event.roleID)
        setRoleLevel(event.roleLevel)
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
                            if (res.is_active_on_role === false)
                                props.fetchData('collaborator/active/role', {id: props.userID}).then(res => setCanBeActive(res.can_be_active))
                            else
                                setCanBeActive(true)
                        }
                    }
                )
            } else {
                setLoading(false)
                props.fetchData('collaborator/active/role', {id: props.userID}).then(res => setCanBeActive(res.can_be_active))
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
                official_publication_date: publicationDate.getTime(),
                admission_date: admissionDate.getTime(),
                legal_document: legalDocument,
                origin: origin,
                is_active_on_role: activeRole !== null ? activeRole : false,
                work_shift_start: workStart,
                work_shift_end: workEnd,
                contract_expiration: contractExp.getTime(),
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

    if (!loading)
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
                <InputLayout/>
                {/*<FormControl variant="outlined" disabled={props.disabled}*/}
                {/*             style={{...props.selectStyle, ...{width: '49%'}}}>*/}
                {/*    <InputLabel id="unity-select">Unity</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="unity-select"*/}
                {/*        id="unity-select"*/}
                {/*        value={unityID}*/}
                {/*        onChange={event => handleChange(event.target.value, 'unityID')}*/}
                {/*        label="Unity"*/}
                {/*    >*/}
                {/*        {unities.map(unity => (*/}
                {/*            <MenuItem value={unity.id}>{unity.acronym}</MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

                {/*<FormControl variant="outlined" disabled={props.disabled || seniors.length === 0}*/}
                {/*             style={{...props.selectStyle, ...{width: '49%'}}}>*/}
                {/*    <InputLabel id="senior-select">Senior</InputLabel>*/}
                {/*    <Select*/}

                {/*        labelId="senior-select"*/}
                {/*        id="senior-select"*/}
                {/*        value={seniorID}*/}
                {/*        disabled={seniorID === null}*/}
                {/*        onChange={event => handleChange(event.target.value, 'seniorID')}*/}
                {/*        label="Senior"*/}
                {/*    >*/}
                {/*        {seniors.map(senior => (*/}
                {/*            <MenuItem value={senior.id}>{senior.name}</MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

                {/*<FormControl variant="outlined" disabled={props.disabled || unityID === null}*/}
                {/*             style={{...props.selectStyle, ...{width: '32%'}}}>*/}
                {/*    <InputLabel id="role-select">Role</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="role-select"*/}
                {/*        id="role-select"*/}
                {/*        value={roleID !== null ? JSON.stringify({*/}
                {/*            roleID: roleID,*/}
                {/*            roleLevel: roleLevel*/}
                {/*        }) : null}*/}


                {/*        onChange={event => handleRoleChange(JSON.parse(event.target.value))}*/}
                {/*        label="role"*/}
                {/*    >*/}
                {/*        {roles.map(role => (*/}
                {/*            <MenuItem value={JSON.stringify({*/}
                {/*                roleID: role.id,*/}
                {/*                roleLevel: role.level*/}
                {/*            })}>{role.denomination}</MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

                {/*<FormControl variant="outlined" disabled={props.disabled || unityID === null || !canBeActive}*/}
                {/*             style={{...props.selectStyle, ...{width: '32%'}}}>*/}
                {/*    <InputLabel id="active-role-select">Active on role</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="active-role-select"*/}
                {/*        id="active-role-select"*/}
                {/*        value={activeRole}*/}
                {/*        onChange={event => handleChange(event.target.value, 'activeRole')}*/}
                {/*        label="Active Role"*/}
                {/*    >*/}
                {/*        <MenuItem value={true}>Yes</MenuItem>*/}
                {/*        <MenuItem value={false}>No</MenuItem>*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

                {/*<FormControl variant="outlined"*/}
                {/*             disabled={props.disabled || unityID === null || roleID === null}*/}
                {/*             style={{...props.selectStyle, ...{width: '32%'}}}>*/}
                {/*    <InputLabel id="substitute-select">Substitute</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="substitute-select"*/}
                {/*        id="substitute-select"*/}
                {/*        value={substitute}*/}
                {/*        name={'substitute'}*/}
                {/*        onChange={event => handleChange(event.target.value, 'substitute')}*/}
                {/*        label='Substitute'*/}
                {/*    >*/}
                {/*        <MenuItem value={true}>Yes</MenuItem>*/}
                {/*        <MenuItem value={false}>No</MenuItem>*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}

                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                {/*    <Grid container justify="space-around"*/}
                {/*          style={{width: '32%', marginBottom: '2vh'}}>*/}
                {/*        <KeyboardDatePicker*/}
                {/*            style={{*/}
                {/*                width: '100%',*/}
                {/*                margin: 'auto',*/}
                {/*                backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38'),*/}
                {/*            }}*/}
                {/*            inputVariant="outlined"*/}
                {/*            margin="normal"*/}
                {/*            id="admission-picker"*/}
                {/*            disabled={props.disabled || unityID === null}*/}
                {/*            label="Admission Date"*/}
                {/*            format="dd/MM/yyyy"*/}
                {/*            value={admissionDate }*/}
                {/*            name={'admissionDate'}*/}
                {/*            onChange={event => handleChange(event, 'admissionDate')}*/}
                {/*            KeyboardButtonProps={{*/}
                {/*                'aria-label': 'change date',*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </Grid>*/}
                {/*</MuiPickersUtilsProvider>*/}
                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                {/*    <Grid container justify="space-around"*/}
                {/*          style={{width: '32%', marginBottom: '2vh'}}>*/}
                {/*        <KeyboardDatePicker*/}
                {/*            style={{*/}
                {/*                width: '100%',*/}
                {/*                margin: 'auto',*/}
                {/*                backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38'),*/}

                {/*            }}*/}
                {/*            inputVariant="outlined"*/}
                {/*            margin="normal"*/}
                {/*            id="publication-picker"*/}
                {/*            disabled={props.disabled || unityID === null}*/}
                {/*            label="Official Publication"*/}
                {/*            format="dd/MM/yyyy"*/}
                {/*            value={publicationDate}*/}
                {/*            onChange={event => handleChange(event, 'publicationDate')}*/}
                {/*            KeyboardButtonProps={{*/}
                {/*                'aria-label': 'change date',*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </Grid>*/}
                {/*</MuiPickersUtilsProvider>*/}
                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                {/*    <Grid container justify="space-around"*/}
                {/*          style={{width: '32%', marginBottom: '2vh'}}>*/}
                {/*        <KeyboardDatePicker*/}
                {/*            style={{*/}
                {/*                width: '100%',*/}
                {/*                margin: 'auto',*/}
                {/*                backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38'),*/}
                {/*            }}*/}
                {/*            inputVariant="outlined"*/}
                {/*            margin="normal"*/}
                {/*            id="contract-picker"*/}
                {/*            disabled={props.disabled || unityID === null}*/}
                {/*            label="Contract Expiration"*/}
                {/*            format="dd/MM/yyyy"*/}
                {/*            value={contractExp }*/}
                {/*            onChange={event => handleChange(event, 'contractExp')}*/}
                {/*            KeyboardButtonProps={{*/}
                {/*                'aria-label': 'change date',*/}
                {/*            }}*/}
                {/*        />*/}
                {/*    </Grid>*/}
                {/*</MuiPickersUtilsProvider>*/}
                {/*<FormControl variant="outlined"*/}
                {/*             disabled={props.disabled || unityID === null || roleID === null}*/}
                {/*             style={{...props.selectStyle, ...{width: '49%'}}}>*/}
                {/*    <InputLabel id="link-select">Linkage</InputLabel>*/}
                {/*    <Select*/}
                {/*        labelId="link-select"*/}
                {/*        id="link-select"*/}
                {/*        value={linkageID}*/}
                {/*        name={'linkageID'}*/}
                {/*        onChange={event => handleChange(event.target.value, 'linkageID')}*/}
                {/*        label="Linkage"*/}
                {/*    >*/}
                {/*        {linkages.map(link => (*/}
                {/*            <MenuItem value={link.id}>{link.description}</MenuItem>*/}
                {/*        ))}*/}
                {/*    </Select>*/}
                {/*</FormControl>*/}
                {/*<TextField disabled={props.disabled || unityID === null} label={'Legal Document'}*/}
                {/*           value={legalDocument}*/}
                {/*           variant={"outlined"}*/}
                {/*           onChange={event => handleChange(event.target.value, 'legalDocument')}*/}
                {/*           style={props.mediumContainer}/>*/}

                {/*<form noValidate style={props.mediumContainer}>*/}
                {/*    <TextField*/}
                {/*        variant={'outlined'}*/}
                {/*        style={{width: '100%'}}*/}
                {/*        id="time"*/}
                {/*        label="Work shift start"*/}
                {/*        type="time"*/}
                {/*        disabled={props.disabled}*/}
                {/*        value={workStart}*/}
                {/*        onChange={event => handleChange(event.target.value, 'workStart')}*/}
                {/*        inputProps={{*/}
                {/*            step: 300, // 5 min*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</form>*/}
                {/*<form noValidate style={props.mediumContainer}>*/}
                {/*    <TextField*/}
                {/*        variant={'outlined'}*/}
                {/*        style={{width: '100%'}}*/}
                {/*        id="time"*/}
                {/*        label="Work shift end"*/}
                {/*        type="time"*/}
                {/*        disabled={props.disabled}*/}
                {/*        value={workEnd}*/}
                {/*        onChange={event => handleChange(event.target.value, 'workEnd')}*/}
                {/*        inputProps={{*/}
                {/*            step: 300, // 5 min*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</form>*/}
                {/*<TextField disabled={props.disabled || unityID === null}*/}
                {/*           label={'Additional information'}*/}
                {/*           value={additionalInfo}*/}
                {/*           variant={"outlined"}*/}
                {/*           onChange={event => handleChange(event.target.value, 'additionalInfo')}*/}
                {/*           style={{...props.mediumContainer, ...{width: '100%'}}}/>*/}

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
