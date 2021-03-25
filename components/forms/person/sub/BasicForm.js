import styles from "../../../../styles/form/Form.module.css";
import {Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import React from "react";
import axios from "axios";
import Host from "../../../../config/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default class BasicForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: null
        }
    }

    componentDidMount() {
        this.fetchData().catch(error => console.log(error))
    }

    async fetchData() {
        try {
            await axios({
                method: 'get',
                url: Host() + 'person',
                headers: {'authorization': cookies.get('jwt')},
                params: {
                    id: this.props.id
                }
            }).then(res => {
                this.setState({profile: res.data})
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <>
                <div className={styles.field_set_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Personal</p>
                    </legend>
                    <div className={styles.form_row}>
                        <Button>
                            <Avatar src={this.state.profile?.pic} style={{width: '125px', height: '125px'}}/>
                        </Button>
                        <TextField label={'Name'} value={this.state.profile?.name} variant={"outlined"}
                                   style={{width: '80%', backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38')}}
                                   required/>
                    </div>
                    <div className={styles.form_row}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around">
                                <KeyboardDatePicker
                                    style={{
                                        width: '100%',
                                        backgroundColor: (!this.props.dark ? '#f7f8fa' : '#272e38')
                                    }}
                                    inputVariant="outlined"
                                    margin="normal"
                                    id="birth-picker"
                                    disabled={this.props.disabled}
                                    label="Birth"
                                    format="dd/MM/yyyy"
                                    value={this.state.profile === null ? (new Date()).toLocaleDateString() : (new Date(this.state.profile.birth)).toLocaleDateString()}
                                    // onChange={handleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                    </div>
                    <div className={styles.form_row}>
                        <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                            <InputLabel id="education-select">Education</InputLabel>
                            <Select
                                labelId="education-select"
                                id="education-select"
                                value={this.state.profile?.education}
                                // onChange={handleChange}
                                label="Education"
                            >
                                <MenuItem value={null}>None</MenuItem>
                                <MenuItem value={'FUNDAMENTAL'}>Fundamental</MenuItem>
                                <MenuItem value={'MEDIO'}>Medium</MenuItem>
                                <MenuItem value={'MEDIO_COMPLETO'}>MediumCompleto</MenuItem>
                                <MenuItem value={'SUPERIOR'}>Graduated</MenuItem>
                                <MenuItem value={'POS-GRAD'}>Pos graduated</MenuItem>
                                <MenuItem value={'MASTER'}>Master's degree</MenuItem>
                                <MenuItem value={'DOCTOR'}>Doctorate degree</MenuItem>

                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                            <InputLabel id="gender-select">Gender</InputLabel>
                            <Select
                                labelId="gender-select"
                                id="gender-select"
                                value={this.state.profile?.gender}
                                label="Gender"
                            >
                                <MenuItem value={'m'}>Male</MenuItem>
                                <MenuItem value={'f'}>Female</MenuItem>
                                <MenuItem value={'n'}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl variant="outlined" disabled={this.props.disabled} style={this.props.selectStyle}>
                            <InputLabel id="marital-select">Marital status</InputLabel>
                            <Select
                                labelId="marital-select"
                                id="marital-select"
                                value={this.state.profile?.marital_status}
                                // onChange={handleChange}
                                label="Marital status"
                            >
                                <MenuItem value={'SINGLE'}>Single</MenuItem>
                                <MenuItem value={'DIVORCED'}>Divorced</MenuItem>
                                <MenuItem value={'MARRIED'}>Married</MenuItem>
                                <MenuItem value={'WIDOWED'}>Widowed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={styles.field_set_container}
                     style={{borderBottom: (this.props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                    <legend>
                        <p style={{fontSize: '1.2rem', fontWeight: 450}}>Corporate basic information</p>
                    </legend>
                    <div className={styles.form_row}>
                        <TextField disabled={this.props.disabled} label={'Corp Email'}
                                   value={this.state.profile?.corporate_email}
                                   variant={"outlined"} style={this.props.smallContainer} required/>
                        <TextField disabled={this.props.disabled} label={'Extension'}
                                   value={this.state.profile?.extension}
                                   variant={"outlined"} style={this.props.smallContainer} required/>
                        <TextField disabled={this.props.disabled} label={'Registration'}
                                   value={this.state.profile?.registration}
                                   variant={"outlined"} style={this.props.smallContainer}/>
                    </div>
                </div>
            </>
        )
    }
}