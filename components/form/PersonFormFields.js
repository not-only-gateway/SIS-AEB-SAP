import styles from "../../styles/form/Form.module.css";
import {
    Avatar,
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
import {mediumFieldContainer} from "../../styles/form/FormMaterialStyles";

export default function PersonFormFields(props){
    const theme = createMuiTheme({
        palette: {
            type: (new Cookies()).get('theme') === '0' ? "dark" : "light"
        }
    })

    const disabled = (new Cookies()).get('adm_token') !== undefined

    const smallFieldContainer={width: '32%', backgroundColor: (!props.dark ? '#f7f8fa': '#272e38')}

    const mediumFieldContainer={width: '22vw', backgroundColor: (!props.dark ? '#f7f8fa': '#272e38')}

    const selectFieldContainer={
        width: '32%',
        backgroundColor: (!props.dark ? '#f7f8fa': '#272e38'),
    }

    return(
        <div className={styles.forms_container}>
            <ThemeProvider theme={theme}>

            <div className={styles.field_set_container} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Personal</p>
                </legend>
                <div className={styles.form_row}>
                    <Button>
                        <Avatar src={props.pic} style={{width: '125px', height: '125px'}}/>
                    </Button>
                    <TextField label={'Name'} value={props.name} variant={"outlined"} style={{width: '80%', backgroundColor: (!props.dark ? '#f7f8fa': '#272e38')}} required/>
                </div>
                    <div className={styles.form_row}>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid container justify="space-around" >
                                <KeyboardDatePicker
                                    style={{width: '100%',
                                        backgroundColor: (!props.dark ? '#f7f8fa': '#272e38')}}
                                    inputVariant="outlined"
                                    margin="normal"
                                    id="birth-picker"
                                    disabled={disabled}
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
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                        <TextField disabled={disabled} label={'CPF'} value={props.name} variant={"outlined"} style={smallFieldContainer} required/>
                        <TextField disabled={disabled} label={'RG'} value={props.name} variant={"outlined"} style={smallFieldContainer} required/>
                        <TextField disabled={disabled} label={'Voter Registration'} value={props.name} variant={"outlined"} style={smallFieldContainer}/>
                    </div>
                    <div className={styles.form_row}>
                        <TextField disabled={disabled} label={'Work Card'} value={props.name} variant={"outlined"} style={mediumFieldContainer}/>
                        <TextField disabled={disabled} label={'pis / pasep'} value={props.name} variant={"outlined"} style={mediumFieldContainer}/>
                    </div>
                    <div className={styles.form_row}>
                        <TextField disabled={disabled} label={'Corp Email'} value={props.name} variant={"outlined"} style={smallFieldContainer} required/>
                        <TextField disabled={disabled} label={'Extension'} value={props.name} variant={"outlined"} style={smallFieldContainer} required/>
                        <TextField disabled={disabled} label={'Registration'} value={props.name} variant={"outlined"} style={smallFieldContainer}/>
                    </div>
            </div>

             <div className={styles.field_set_container} style={{ borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Contact</p>
                </legend>

                <div className={styles.form_row}>
                    <TextField disabled={disabled} label={'Email'} value={props.name} variant={"outlined"} style={mediumFieldContainer} required/>
                    <TextField disabled={disabled} label={'Alt Email'} value={props.name} variant={"outlined"} style={mediumFieldContainer}/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={disabled} label={'Phone'} value={props.name} variant={"outlined"} style={mediumFieldContainer} required/>
                    <TextField disabled={disabled} label={'Alt Phone'} value={props.name} variant={"outlined"} style={mediumFieldContainer}/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={disabled} label={'Address'} value={props.name} variant={"outlined"} style={mediumFieldContainer} required/>
                    <TextField disabled={disabled} label={'CEP'} value={props.name} variant={"outlined"} style={mediumFieldContainer} required/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={disabled} label={'Address Complement'} value={props.name} variant={"outlined"} style={{width: '100%', backgroundColor: (!props.dark ? '#f7f8fa': '#272e38')}}/>
                </div>
            </div>

            <div className={styles.field_set_container} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Corporate</p>
                </legend>

                <div className={styles.form_row}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around" >
                            <KeyboardDatePicker
                                style={{
                                    width: '98%',
                                    backgroundColor: (!props.dark ? '#f7f8fa': '#272e38'),
                                    marginRight: 'auto'

                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="admission-picker"
                                disabled={disabled}
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
                        <Grid container justify="space-around" >
                            <KeyboardDatePicker
                                style={{
                                    width: '98%',
                                    backgroundColor: (!props.dark ? '#f7f8fa': '#272e38'),
                                    marginLeft: 'auto'

                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="publication-picker"
                                disabled={disabled}
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
                </div>

                    <div className={styles.form_row}>
                        <TextField disabled={disabled} label={'Unity'} value={props.name} variant={"outlined"} style={mediumFieldContainer} />
                        <TextField disabled={disabled} label={'Superior'} value={props.name} variant={"outlined"} style={mediumFieldContainer}/>
                    </div>
                    <div className={styles.form_row}>
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                    </div>

                    <div className={styles.form_row}>
                        <TextField disabled={disabled} label={'Legal Document'} value={props.name} variant={"outlined"} style={{width: '32%', backgroundColor: (!props.dark ? '#f7f8fa': '#272e38')}}/>
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                        <FormControl variant="outlined" disabled={disabled}  style={selectFieldContainer}>
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
                    </div>
            </div>
            </ThemeProvider>
        </div>
    )

}