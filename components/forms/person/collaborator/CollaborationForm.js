import styles from "../../../../styles/form/Form.module.css";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import React from "react";
import axios from "axios";
import Host from "../../../../config/Host";

export default class CollaborationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={

        }
    }
    componentDidMount() {

        this.fetchData().catch(error => console.log(error))
    }
    async fetchData(){
        try {
            await axios({
                method: 'get',
                url: Host() + 'collaborator',
                headers: {'authorization': cookies.get('jwt')},
                params: {
                    id: this.props.collaborationID
                }
            }).then(res => {
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    async saveChanges(){

        try {
            await axios({
                method: this.props.collaborationID === null ? 'post' : 'put',
                // url: Host() + 'co'+path,
                // headers: {'authorization': cookies.get('jwt')},
                data: {

                }
            }).then(() => {

            }).catch(error => {
                console.log(error)
            })
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
                <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                    <InputLabel id="unity-select">Unity</InputLabel>
                    <Select
                        labelId="unity-select"
                        id="unity-select"
                        value={false}
                        // onChange={handleChange}
                        label="Unity"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                    <InputLabel id="senior-select">Senior</InputLabel>
                    <Select
                        labelId="senior-select"
                        id="senior-select"
                        value={false}
                        // onChange={handleChange}
                        label="Senior"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                    <InputLabel id="role-select">role</InputLabel>
                    <Select
                        labelId="role-select"
                        id="role-select"
                        value={false}
                        // onChange={handleChange}
                        label="role"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around"
                          style={{width: '49%',  marginBottom: '2vh'}}>
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
                          style={{width: '49%', marginBottom: '2vh'}}>
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
                    <InputLabel id="role-select">Active on role</InputLabel>
                    <Select
                        labelId="role-select"
                        id="role-select"
                        value={false}
                        // onChange={handleChange}
                        label="Role"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                    <InputLabel id="substitute-select">Substitute</InputLabel>
                    <Select
                        labelId="substitute-select"
                        id="substitute-select"
                        value={false}
                        // onChange={handleChange}
                        label='Substitute'
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                    <InputLabel id="active-select">Active on role</InputLabel>
                    <Select
                        labelId="active-select"
                        id="active-select"
                        value={false}
                        // onChange={handleChange}
                        label="Active on role"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>


                <TextField disabled={this.props.disabled} label={'Legal Document'} value={this.props.name}
                           variant={"outlined"}
                           style={this.props.smallContainer}/>
                <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                    <InputLabel id="level-select">Level</InputLabel>
                    <Select
                        labelId="level-select"
                        id="level-select"
                        value={false}
                        // onChange={handleChange}
                        label="Level"
                    >
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                    </Select>
                </FormControl>
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
                <Button style={{width: '100%'}}>Save changes</Button>
            </div>
        )
    }
}