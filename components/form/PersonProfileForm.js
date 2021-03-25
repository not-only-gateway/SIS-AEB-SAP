import styles from "../../styles/form/Form.module.css";
import {
    Avatar,
    Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ThemeProvider
} from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import React, {useEffect, useState} from "react";
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import Cookies from "universal-cookie/lib";
import axios from "axios";
import Host from "../../config/Host";

const cookies = new Cookies()

export default function PersonProfileForm(props) {
    const [profile, setProfile] = useState(null)

    const fetchData = async () => {
        try {
            await axios({
                method: 'get',
                url: Host() + 'person',
                headers: {'authorization': cookies.get('jwt')},
                params: {
                    id: props.id
                }
            }).then(res => {
                setProfile(res.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData().catch(error => console.log(error))
    }, [])

    return (
        <div className={styles.forms_container}>
            {/*<ThemeProvider theme={}*/}
            <div className={styles.field_set_container}
                 style={{borderBottom: (props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Personal</p>
                </legend>
                <div className={styles.form_row}>
                    <Button>
                        <Avatar src={profile?.pic} style={{width: '125px', height: '125px'}}/>
                    </Button>
                    <TextField label={'Name'} value={profile?.name} variant={"outlined"}
                               style={{width: '80%', backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38')}} required/>
                </div>
                <div className={styles.form_row}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                style={{
                                    width: '100%',
                                    backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38')
                                }}
                                inputVariant="outlined"
                                margin="normal"
                                id="birth-picker"
                                disabled={props.disabled}
                                label="Birth"
                                format="dd/MM/yyyy"
                                value={profile === null ? (new Date()).toLocaleDateString() : (new Date(profile.birth)).toLocaleDateString()}
                                // onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div className={styles.form_row}>
                    <FormControl variant="outlined" disabled={props.disabled} style={props.selectFieldContainer}>
                        <InputLabel id="education-select">Education</InputLabel>
                        <Select
                            labelId="education-select"
                            id="education-select"
                            value={profile?.education}
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
                    <FormControl variant="outlined" disabled={props.disabled} style={props.selectFieldContainer}>
                        <InputLabel id="gender-select">Gender</InputLabel>
                        <Select
                            labelId="gender-select"
                            id="gender-select"
                            value={profile?.gender}
                            label="Gender"
                        >
                            <MenuItem value={'m'}>Male</MenuItem>
                            <MenuItem value={'f'}>Female</MenuItem>
                            <MenuItem value={'n'}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" disabled={props.disabled} style={props.selectFieldContainer}>
                        <InputLabel id="marital-select">Marital status</InputLabel>
                        <Select
                            labelId="marital-select"
                            id="marital-select"
                            value={profile?.marital_status}
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
                    <TextField disabled={props.disabled} label={'CPF'} value={profile?.cpf} variant={"outlined"}
                               style={props.smallFieldContainer} required/>
                    <TextField disabled={props.disabled} label={'RG'} value={profile?.rg} variant={"outlined"}
                               style={props.smallFieldContainer} required/>
                    <TextField disabled={props.disabled} label={'Voter Registration'}
                               value={profile?.voter_registration} variant={"outlined"}
                               style={props.smallFieldContainer}/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={props.disabled} label={'Work Card'} value={profile?.work_card}
                               variant={"outlined"} style={props.mediumFieldContainer}/>
                    <TextField disabled={props.disabled} label={'pis / pasep'} value={profile?.pis} variant={"outlined"}
                               style={props.mediumFieldContainer}/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={props.disabled} label={'Corp Email'} value={profile?.corporate_email}
                               variant={"outlined"} style={props.smallFieldContainer} required/>
                    <TextField disabled={props.disabled} label={'Extension'} value={profile?.extension}
                               variant={"outlined"} style={props.smallFieldContainer} required/>
                    <TextField disabled={props.disabled} label={'Registration'} value={profile?.registration}
                               variant={"outlined"} style={props.smallFieldContainer}/>
                </div>
            </div>

            <div className={styles.field_set_container}
                 style={{borderBottom: (props.dark ? '#262d37 3px solid' : '#f4f8fb 3px solid')}}>
                <legend>
                    <p style={{fontSize: '1.2rem', fontWeight: 450}}>Contact</p>
                </legend>

                <div className={styles.form_row}>
                    <TextField disabled={props.disabled} label={'Email'} value={profile?.contact_email}
                               variant={"outlined"} style={props.mediumFieldContainer} required/>
                    <TextField disabled={props.disabled} label={'Alt Email'} value={profile?.contact_email_alt}
                               variant={"outlined"} style={props.mediumFieldContainer}/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={props.disabled} label={'Phone'} value={profile?.contact_phone}
                               variant={"outlined"} style={props.mediumFieldContainer} required/>
                    <TextField disabled={props.disabled} label={'Alt Phone'} value={profile?.contact_phone_alt}
                               variant={"outlined"} style={props.mediumFieldContainer}/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={props.disabled} label={'Address'} value={profile?.address} variant={"outlined"}
                               style={props.mediumFieldContainer} required/>
                    <TextField disabled={props.disabled} label={'CEP'} value={profile?.cep} variant={"outlined"}
                               style={props.mediumFieldContainer} required/>
                </div>
                <div className={styles.form_row}>
                    <TextField disabled={props.disabled} label={'Address Complement'}
                               value={profile?.address_complement} variant={"outlined"}
                               style={{width: '100%', backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38')}}/>
                </div>
            </div>
        </div>
    )

}


