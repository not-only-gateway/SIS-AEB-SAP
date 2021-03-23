import styles from "../../styles/form/Form.module.css";
import {
    Button,
    createMuiTheme,
    FormControl, Grid,
    InputBase,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    TextField
} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import DateFnsUtils from '@date-io/date-fns';
import React from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Cookies from "universal-cookie/lib";

export default class PersonFormFields extends React.Component{

    constructor(props){
        super(props)
        this.state={
            theme: createMuiTheme({
                palette: {
                    type: (new Cookies()).get('theme') === '0' ? "dark" : "light"
                }
            }),
            disabled: (new Cookies()).get('adm_token') !== undefined
        }
    }

    componentDidMount() {

    }

    render() {
        switch (this.props.page){
            case 0: {
                return(
                    <div className={styles.page_container}>
                        <fieldset className={styles.field_set} style={{ width: '49%', border : (this.props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                            <legend>
                                <p style={{fontSize: '1.15rem', fontWeight: 440}}>Personal</p>
                            </legend>
                            <ThemeProvider theme={this.state.theme}>
                                <div className={styles.form_row}>
                                    <TextField disabled={this.state.disabled} label={'Name'} value={this.props.name} variant={"outlined"} style={{width: '100%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                </div>
                                <div className={styles.form_row}>
                                    <FormControl variant="outlined" disabled={this.state.disabled}  style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}>
                                        <InputLabel id="education-select">Education</InputLabel>
                                        <Select
                                            labelId="education-select"
                                            id="education-select"
                                            value={null}
                                            // onChange={handleChange}
                                            label="Education"
                                        >
                                            <MenuItem value={null}>None</MenuItem>
                                            <MenuItem value={'FUND'}>Fundamental</MenuItem>
                                            <MenuItem value={'MED'}>Medium</MenuItem>
                                            <MenuItem value={'GRAD'}>Graduated</MenuItem>
                                            <MenuItem value={'POS-GRAD'}>Pos graduated</MenuItem>
                                            <MenuItem value={'MASTER'}>Master's degree</MenuItem>
                                            <MenuItem value={'DOCTOR'}>Doctorate degree</MenuItem>

                                        </Select>
                                    </FormControl>
                                    <FormControl variant="outlined" disabled={this.state.disabled}  style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}>
                                        <InputLabel id="marital-select">Marital status</InputLabel>
                                        <Select
                                            labelId="marital-select"
                                            id="marital-select"
                                            value={'SINGLE'}
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
                                <div className={styles.form_row}>
                                    <FormControl variant="outlined" disabled={this.state.disabled}  style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}>
                                        <InputLabel id="gender-select">Gender</InputLabel>
                                        <Select
                                            labelId="gender-select"
                                            id="gender-select"
                                            value={'m'}
                                            label="Gender"
                                        >
                                            <MenuItem value={'m'}>Male</MenuItem>
                                            <MenuItem value={'f'}>Female</MenuItem>
                                            <MenuItem value={'n'}>Other</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container justify="space-around" >
                                            <KeyboardDatePicker
                                                style={{ backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38'), margin: 'auto'}}
                                                inputVariant="outlined"
                                                margin="normal"
                                                id="birth-picker"
                                                disabled={this.state.disabled}
                                                label="Birth"
                                                format="dd/MM/yyyy"
                                                value={new Date('2014-08-18T21:11:54')}
                                                // onChange={handleDateChange}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField disabled={this.state.disabled} label={'CPF'} value={this.props.name} variant={"outlined"} style={{width: '10.33333vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField disabled={this.state.disabled} label={'RG'} value={this.props.name} variant={"outlined"} style={{width: '10.33333vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField disabled={this.state.disabled} label={'Voter Registration'} value={this.props.name} variant={"outlined"} style={{width: '10.33333vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField disabled={this.state.disabled} label={'Work Card'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                    <TextField disabled={this.state.disabled} label={'pis / pasep'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                            </ThemeProvider>
                        </fieldset>
                        <fieldset className={styles.field_set} style={{width: '49%', border : (this.props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                            <legend>
                                <p style={{fontSize: '1.15rem', fontWeight: 440}}>Contact</p>
                            </legend>
                            <ThemeProvider theme={this.state.theme}>
                                <div className={styles.form_row}>
                                    <TextField disabled={this.state.disabled} label={'Email'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField disabled={this.state.disabled} label={'Alt Email'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField disabled={this.state.disabled} label={'Phone'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField disabled={this.state.disabled} label={'Alt Phone'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField disabled={this.state.disabled} label={'Address'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                    <TextField disabled={this.state.disabled} label={'CEP'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                </div>
                                <div className={styles.form_row}>
                                    <TextField disabled={this.state.disabled} label={'Address Complement'} value={this.props.name} variant={"outlined"} style={{width: '32vw', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}}/>
                                </div>
                            </ThemeProvider>
                        </fieldset>
                    </div>
                )
            }
            case 1: {
                return(
                    <fieldset className={styles.field_set} style={{ width: '100%', height: '100%', padding: '2vw', border : (this.props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                        <legend>Corporate</legend>
                        <ThemeProvider theme={this.state.theme}>
                            <div className={styles.form_row}>
                                <TextField disabled={this.state.disabled} label={'Corp Email'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                                <TextField disabled={this.state.disabled} label={'Extension'} value={this.props.name} variant={"outlined"} style={{width: '49%', backgroundColor: (!this.props.dark ? '#f7f8fa': '#272e38')}} required/>
                            </div>
                            <div className={styles.form_row}>
                                <TextField disabled={this.state.disabled} label={'Registration'} value={this.props.name} variant={"outlined"} style={{width: '10.3vw'}}/>
                                <TextField disabled={this.state.disabled} label={'Official Publication'} value={this.props.name} variant={"outlined"} style={{width: '10.3vw'}}/>
                                <TextField disabled={this.state.disabled} label={'Admission Date'} value={this.props.name} variant={"outlined"} style={{width: '10.3vw'}} required/>
                            </div>
                            <div className={styles.form_row}>
                                <TextField disabled={this.state.disabled} label={'Unity'} value={this.props.name} variant={"outlined"} style={{width: '49%'}} />
                                <TextField disabled={this.state.disabled} label={'Superior'} value={this.props.name} variant={"outlined"} style={{width: '49%'}}/>
                            </div>
                            <div className={styles.form_row}>
                                <TextField disabled={this.state.disabled} label={'Role'} value={this.props.name} variant={"outlined"} style={{width: '49%'}}/>
                                <TextField disabled={this.state.disabled} label={'Substitute'} value={this.props.name} variant={"outlined"} style={{width: '23.4%'}}/>
                                <TextField disabled={this.state.disabled} label={'Active on role'} value={this.props.name} variant={"outlined"} style={{width: '23.4%'}}/>
                            </div>

                            <div className={styles.form_row}>
                                <TextField disabled={this.state.disabled} label={'Legal Document'} value={this.props.name} variant={"outlined"} style={{width: '49%'}}/>
                                <TextField disabled={this.state.disabled} label={'level'} value={this.props.name} variant={"outlined"} style={{width: '23.4%'}}/>
                                <TextField disabled={this.state.disabled} label={'Linkage'} value={this.props.name} variant={"outlined"} style={{width: '23.4%'}}/>
                            </div>
                        </ThemeProvider>
                    </fieldset>
                )
            }
            default: {
                return null
            }
        }
    }
}