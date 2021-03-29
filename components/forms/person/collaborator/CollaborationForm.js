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
            activeRole: true,
            unityID: null,
            roleID: null,
            linkageID: null,
            substitute: false,
            origin: null
        }
    }

    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
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

    }

    handleChangeUnity(event) {
        this.setState({unityID: event.target.value})
        this.fetchSeniors().catch(error => console.log(error))
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
                        onChange={this.handleChangeUnity}
                        label="Unity"
                    >
                        {this.state.unities.map(unity => (
                            <MenuItem value={unity.id}>{unity.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled}
                             style={{...this.props.selectStyle, ...{width: '49%'}}}>
                    <InputLabel id="senior-select">Senior</InputLabel>
                    <Select
                        labelId="senior-select"
                        id="senior-select"
                        value={this.state.seniorID}
                        disabled={this.state.seniorID === null}
                        // onChange={handleChange}
                        label="Senior"
                    >
                        {this.state.seniors.map(senior => (
                            <MenuItem value={senior.id}>{senior.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled}
                             style={{...this.props.selectStyle, ...{width: '49%'}}}>
                    <InputLabel id="role-select">Role</InputLabel>
                    <Select
                        labelId="role-select"
                        id="role-select"
                        value={this.state.roleID}
                        // onChange={handleChange}
                        label="role"
                    >
                        {this.state.roles.map(role => (
                            <MenuItem value={role.id}>{role.description} - {role.level}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled}
                             style={{...this.props.selectStyle, ...{width: '49%'}}}>
                    <InputLabel id="active-role-select">Active on role</InputLabel>
                    <Select
                        labelId="active-role-select"
                        id="active-role-select"
                        value={this.state.activeRole}
                        // onChange={handleChange}
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
                            disabled={this.props.disabled}
                            label="Admission Date"
                            format="dd/MM/yyyy"
                            value={new Date('2014-08-18T21:11:54')}
                            // onChange={handleDateChange}
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
                            disabled={this.props.disabled}
                            label="Official Publication"
                            format="dd/MM/yyyy"
                            value={new Date('2014-08-18T21:11:54')}
                            // onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </Grid>
                </MuiPickersUtilsProvider>
                <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                    <InputLabel id="link-select">Linkage</InputLabel>
                    <Select
                        labelId="link-select"
                        id="link-select"
                        value={false}
                        // onChange={handleChange}
                        label="Linkage"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled} style={{...this.props.selectStyle, ...{width: '49%'}}}>
                    <InputLabel id="substitute-select">Substitute</InputLabel>
                    <Select
                        labelId="substitute-select"
                        id="substitute-select"
                        value={this.state.substitute}
                        // onChange={handleChange}
                        label='Substitute'
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <TextField disabled={this.props.disabled} label={'Legal Document'} value={this.props.name}
                           variant={"outlined"}
                           style={this.props.mediumContainer}/>

                <Button style={{width: '100%'}}>Save changes</Button>
            </div>
        )
    }
}