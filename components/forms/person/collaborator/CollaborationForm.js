import styles from "../../../../styles/form/Form.module.css";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React from "react";
import axios from "axios";
import Host from "../../../../config/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

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
            changed: false,
            roleLevel: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.handleRoleChange = this.handleRoleChange.bind(this)
    }

    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
    }
    handleRoleChange(event){
        this.setState({
            roleID: event.roleID,
            roleLevel: event.roleLevel
        }, () => this.fetchSeniors(event.roleLevel).catch(error => console.log(error)))
        if(!this.state.changed)
            this.setState({
                changed: true
            })

    }
    handleChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
        if(!this.state.changed)
            this.setState({
                changed: true
            })
    }
    handleDateChange(name,event) {
        this.setState({
            [name]: event.getTime()
        })
        if(!this.state.changed)
            this.setState({
                changed: true
            })
    }


    async fetchData() {
        try {
            if (!this.props.create)
                await axios({
                    method: 'get',
                    url: Host() + 'collaborator',
                    headers: {'authorization': cookies.get('jwt')},
                    params: {
                        id: this.props.id
                    }
                }).then(res => {
                    this.setState({
                        seniorID: res.data.senior !== null ? res.data.senior.id : null,
                        roleID: res.data.role.id,
                        linkageID: res.data.linkage.id,
                        unityID: res.data.unity.id,
                        substitute: res.data.is_substitute,
                        admissionDate: res.data.admission_date,
                        publicationDate: res.data.official_publication_date,
                        legalDocument: res.data.legal_document,
                        origin: res.data.origin,
                        activeRole: res.data.is_active_on_role
                    })
                }).catch(error => {
                    console.log(error)
                })

            await axios({
                method: 'get',
                url: Host() + 'role',
                headers: {'authorization': cookies.get('jwt')},
            }).then(res => {
                this.setState({
                    roles: res.data
                })
            }).catch(error => {
                console.log(error)
            })
            await axios({
                method: 'get',
                url: Host() + 'linkage',
                headers: {'authorization': cookies.get('jwt')},
            }).then(res => {
                this.setState({
                    linkages: res.data
                })
            }).catch(error => {
                console.log(error)
            })
            await axios({
                method: 'get',
                url: Host() + 'unities',
                headers: {'authorization': cookies.get('jwt')},
            }).then(res => {
                this.setState({
                    unities: res.data
                })
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async fetchSeniors() {
        try{
            await axios({
                method: 'get',
                url: Host() + 'seniors',
                headers: {'authorization': cookies.get('jwt')},
                params: {
                    level: this.state.roleLevel,
                    unity_id: this.state.unityID
                }
            }).then(res => {
                this.setState({
                    seniors: res.data
                })
            }).catch(error => {
                console.log(error)
            })
        }catch (error){
            console.log(error)
        }
    }


    async saveChanges() {
        try {

            // if (this.props.id !== null)
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className={styles.form_component_container} style={{width: '45vw', margin: 'auto', height: '100%'}}>
                <legend style={{width: '100%'}}>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Collaboration</p>
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
                             style={{...this.props.selectStyle, ...{width: '49%'}}}>
                    <InputLabel id="role-select">Role</InputLabel>
                    <Select
                        labelId="role-select"
                        id="role-select"
                        value={this.state.roleID !== null ? JSON.stringify({roleID: this.state.roleID, roleLevel: this.state.roleLevel}) : null}
                        // name={'roleID'}
                        onChange={event => this.handleRoleChange(JSON.parse(event.target.value))}
                        label="role"
                    >
                        {this.state.roles.map(role => (
                            <MenuItem value={JSON.stringify({roleID: role.id, roleLevel: role.level})}>{role.denomination} - {role.is_effective ? 'Effective' : 'Not Effective'}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled || this.state.unityID === null}
                             style={{...this.props.selectStyle, ...{width: '49%'}}}>
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
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around"
                          style={{width: '100%', marginBottom: '2vh'}}>
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
                          style={{width: '66%', marginBottom: '2vh'}}>
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
                <FormControl variant="outlined" disabled={this.props.disabled || this.state.unityID === null || this.state.roleID === null} style={this.props.selectStyle}>
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
                <FormControl variant="outlined" disabled={this.props.disabled || this.state.unityID === null || this.state.roleID === null} style={{...this.props.selectStyle, ...{width: '49%'}}}>
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
                <TextField disabled={this.props.disabled || this.state.unityID === null} label={'Legal Document'} value={this.state.legalDocument}
                           variant={"outlined"}
                           name={'legalDocument'}
                           onChange={this.handleChange}
                           style={this.props.mediumContainer}/>

                <Button style={{width: '100%'}}>Save changes</Button>
            </div>
        )
    }
}