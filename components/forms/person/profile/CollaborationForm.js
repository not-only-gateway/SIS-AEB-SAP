import styles from "../../../../styles/form/Form.module.css";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React from "react";

export default class CollaborationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            unities: [],
            roles: [],
            linkages: [],
            seniors: [],
            seniorID: null,
            publicationDate: null,
            admissionDate: null,
            legalDocument: null,
            activeRole: null,
            unityID: null,
            roleID: null,
            linkageID: null,
            substitute: null,
            origin: null,
            roleLevel: null,
            changed: false,
            exists: false,
            workStart: null,
            workEnd: null,
            contractExp: null,
            additionalInfo: null,
            loading: true,
            canBeActive: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleRoleChange = this.handleRoleChange.bind(this)
    }


    handleRoleChange(event) {
        this.setState({
                roleID: event.roleID,
                roleLevel: event.roleLevel
            }, () =>
                this.props.fetchData('seniors', {}).then(res => {
                    if (res !== null)
                        this.setState({
                            seniors: res
                        })
                    else
                        this.setState({
                            seniors: []
                        })
                })
        )
        if (!this.state.changed)
            this.setState({
                changed: true
            })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
        if (!this.state.changed)
            this.setState({
                changed: true
            })
    }

    handleDateChange(name, event) {
        this.setState({
            [name]: event.getTime()
        })
        if (!this.state.changed)
            this.setState({
                changed: true
            })
    }

    componentDidMount() {
        if (this.props.collaborationID !== null) {
            this.props.fetchData('collaborator', {collaboration_id: this.props.collaborationID}).then(res => {
                if (res !== null)
                    this.setState({
                        seniorID: res.senior !== null ? res.senior.id : null,
                        roleID: res.role.id,
                        roleLevel: res.role.level,
                        linkageID: res.linkage.id,
                        unityID: res.unity.id,
                        substitute: res.is_substitute,
                        admissionDate: res.admission_date,
                        publicationDate: res.official_publication_date,
                        legalDocument: res.legal_document,
                        origin: res.origin,
                        activeRole: res.is_active_on_role,
                        exists: true,
                        workStart: res.work_shift_start,
                        workEnd: res.work_shift_end,
                        contractExp: res.contract_expiration,
                        additionalInfo: res.additional_information
                    }, () => {
                        this.setState({loading: false})
                        if(res.is_active_on_role === false)
                            this.props.fetchData('collaborator/active/role', {id: this.props.userID}).then(res => this.setState({canBeActive: res.can_be_active}))
                        else
                            this.setState({canBeActive: true})
                    })
            })
        }
        else{
            this.setState({loading: false})
            this.props.fetchData('collaborator/active/role', {id: this.props.userID}).then(res => this.setState({canBeActive: res.can_be_active}))
        }

        this.props.fetchData('role', {}).then(res =>
            this.setState({
                roles: res
            })
        )
        this.props.fetchData('linkage', {}).then(res =>
            this.setState({
                linkages: res
            })
        )
        this.props.fetchData('unities', {}).then(res =>
            this.setState({
                unities: res
            })
        )

    }

    async saveChanges() {
        await this.props.saveChanges(
            'collaborator',
            {
                id: this.props.userID,
                collaboration_id: this.props.collaborationID,
                senior_id: this.state.seniorID,
                role_id: this.state.roleID,
                linkage_id: this.state.linkageID,
                unity_id: this.state.unityID,
                is_substitute: this.state.substitute,
                official_publication_date: this.state.publicationDate,
                admission_date: this.state.admissionDate,
                legal_document: this.state.legalDocument,
                origin: this.state.origin,
                is_active_on_role: this.state.activeRole !== null ? this.state.activeRole : false,
                work_shift_start: this.state.workStart,
                work_shift_end: this.state.workEnd,
                contract_expiration: this.state.contractExp,
                additional_information: this.state.additionalInfo,
            },
            this.props.collaborationID === null ? 'post' : 'put'
        ).then(res => {
            if(res && this.state.collaborationID === null)
                this.props.setModal(false)
            else if (res)
                this.setState({changed: false})
            else
                console.log(res)
        })
    }

    render() {
        if (!this.state.loading)
            return (
                <div className={styles.form_component_container}
                     style={{width: '45vw', margin: 'auto', height: '49vh'}}>

                    <legend style={{width: '100%'}}>
                        <p style={{
                            fontSize: '1.2rem',
                            fontWeight: 450,
                            color: this.props.dark ? 'white' : 'black'
                        }}>Collaboration</p>
                    </legend>

                    <FormControl variant="outlined" disabled={this.props.disabled}
                                 style={{...this.props.selectStyle, ...{width: '49%'}}}>
                        <InputLabel id="unity-select">Unity</InputLabel>
                        <Select
                            labelId="unity-select"
                            id="unity-select"
                            value={this.state.unityID}
                            name={'unityID'}
                            onChange={this.handleChange}
                            label="Unity"
                        >
                            {this.state.unities.map(unity => (
                                <MenuItem value={unity.id}>{unity.acronym}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" disabled={this.props.disabled || this.state.seniors.length === 0}
                                 style={{...this.props.selectStyle, ...{width: '49%'}}}>
                        <InputLabel id="senior-select">Senior</InputLabel>
                        <Select

                            labelId="senior-select"
                            id="senior-select"
                            value={this.state.seniorID}
                            disabled={this.state.seniorID === null}
                            name={'seniorID'}
                            onChange={this.handleChange}
                            label="Senior"
                        >
                            {this.state.seniors.map(senior => (
                                <MenuItem value={senior.id}>{senior.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" disabled={this.props.disabled || this.state.unityID === null}
                                 style={{...this.props.selectStyle, ...{width: '32%'}}}>
                        <InputLabel id="role-select">Role</InputLabel>
                        <Select
                            labelId="role-select"
                            id="role-select"
                            value={this.state.roleID !== null ? JSON.stringify({
                                roleID: this.state.roleID,
                                roleLevel: this.state.roleLevel
                            }) : null}
                            // name={'roleID'}
                            onChange={event => this.handleRoleChange(JSON.parse(event.target.value))}
                            label="role"
                        >
                            {this.state.roles.map(role => (
                                <MenuItem value={JSON.stringify({
                                    roleID: role.id,
                                    roleLevel: role.level
                                })}>{role.denomination}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined" disabled={this.props.disabled || this.state.unityID === null || !this.state.canBeActive}
                                 style={{...this.props.selectStyle, ...{width: '32%'}}}>
                        <InputLabel id="active-role-select">Active on role</InputLabel>
                        <Select
                            labelId="active-role-select"
                            id="active-role-select"
                            value={this.state.activeRole}
                            name={'activeRole'}
                            onChange={this.handleChange}
                            label="Active Role"
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl variant="outlined"
                                 disabled={this.props.disabled || this.state.unityID === null || this.state.roleID === null}
                                 style={{...this.props.selectStyle, ...{width: '32%'}}}>
                        <InputLabel id="substitute-select">Substitute</InputLabel>
                        <Select
                            labelId="substitute-select"
                            id="substitute-select"
                            value={this.state.substitute}
                            name={'substitute'}
                            onChange={this.handleChange}
                            label='Substitute'
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around"
                              style={{width: '32%', marginBottom: '2vh'}}>
                            <KeyboardDatePicker
                                style={{
                                    width: '100%',
                                    margin: 'auto',
                                    backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38'),
                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="admission-picker"
                                disabled={this.props.disabled || this.state.unityID === null}
                                label="Admission Date"
                                format="dd/MM/yyyy"
                                value={this.state.admissionDate !== null ? new Date(this.state.admissionDate).toLocaleDateString() : null}
                                name={'admissionDate'}
                                onChange={event => this.handleDateChange('admissionDate', event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around"
                              style={{width: '32%', marginBottom: '2vh'}}>
                            <KeyboardDatePicker
                                style={{
                                    width: '100%',
                                    margin: 'auto',
                                    backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38'),

                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="publication-picker"
                                disabled={this.props.disabled || this.state.unityID === null}
                                label="Official Publication"
                                format="dd/MM/yyyy"
                                value={this.state.publicationDate !== null ? new Date(this.state.publicationDate).toLocaleDateString() : null}
                                onChange={event => this.handleDateChange('publicationDate', event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around"
                              style={{width: '32%', marginBottom: '2vh'}}>
                            <KeyboardDatePicker
                                style={{
                                    width: '100%',
                                    margin: 'auto',
                                    backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38'),
                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="contract-picker"
                                disabled={this.props.disabled || this.state.unityID === null}
                                label="Contract Expiration"
                                format="dd/MM/yyyy"
                                value={this.state.contractExp !== null ? new Date(this.state.contractExp).toLocaleDateString() : null}
                                onChange={event => this.handleDateChange('contractExp', event)}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <FormControl variant="outlined"
                                 disabled={this.props.disabled || this.state.unityID === null || this.state.roleID === null}
                                 style={{...this.props.selectStyle, ...{width: '49%'}}}>
                        <InputLabel id="link-select">Linkage</InputLabel>
                        <Select
                            labelId="link-select"
                            id="link-select"
                            value={this.state.linkageID}
                            name={'linkageID'}
                            onChange={this.handleChange}
                            label="Linkage"
                        >
                            {this.state.linkages.map(link => (
                                <MenuItem value={link.id}>{link.description}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField disabled={this.props.disabled || this.state.unityID === null} label={'Legal Document'}
                               value={this.state.legalDocument}
                               variant={"outlined"}
                               name={'legalDocument'}
                               onChange={this.handleChange}
                               style={this.props.mediumContainer}/>

                    <form noValidate style={this.props.mediumContainer}>
                        <TextField
                            variant={'outlined'}
                            style={{width: '100%'}}
                            id="time"
                            label="Work shift start"
                            type="time"
                            disabled={this.props.disabled}
                            value={this.state.workStart !== null ? this.state.workStart : '06:00'}
                            name={'workStart'}
                            onChange={this.handleChange}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </form>
                    <form noValidate style={this.props.mediumContainer}>
                        <TextField
                            variant={'outlined'}
                            style={{width: '100%'}}
                            id="time"
                            label="Work shift end"
                            type="time"
                            disabled={this.props.disabled}
                            value={this.state.workEnd !== null ? this.state.workEnd : '18:00'}
                            name={'workEnd'}
                            onChange={this.handleChange}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </form>
                    <TextField disabled={this.props.disabled || this.state.unityID === null}
                               label={'Additional information'}
                               value={this.state.additionalInfo}
                               variant={"outlined"}
                               name={'additionalInfo'}
                               onChange={this.handleChange}
                               style={{...this.props.mediumContainer, ...{width: '100%'}}}/>

                    <Button style={{width: '100%'}} onClick={() => this.saveChanges()} disabled={!this.state.changed}>Save
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
                            color: this.props.dark ? 'white' : 'black'
                        }}>Collaboration</p>
                    </legend>
                </div>
            )
    }
}
