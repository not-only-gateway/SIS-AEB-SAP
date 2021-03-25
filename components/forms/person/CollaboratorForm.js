import styles from "../../../styles/form/Form.module.css";
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
import React, {useEffect, useState} from "react";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import Host from "../../../config/Host";
import Cookies from "universal-cookie/lib";

const cookies = new Cookies()

export default function CollaboratorForm(props){

    const [unities, setUnities] = useState(null)

    const fetchData = async() => {
        try {
            await axios({
                method: 'get',
                url: Host + 'collaborator',
                headers:{'authorization': cookies.get('jwt')},
                params: {
                    id: props.id
                }
            }).then(res => {
                setUnities(res.data)
            }).catch(error => {
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const renderModal = () => {
        // <div className={styles.field_set_container} style={{borderBottom : (props.dark ? '#262d37 3px solid':'#f4f8fb 3px solid')}}>
        //     <legend>
        //         <p style={{fontSize: '1.2rem', fontWeight: 450}}>Corporate</p>
        //     </legend>
        //
        //     <div className={styles.form_row}>
        //         <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //             <Grid container justify="space-around" >
        //                 <KeyboardDatePicker
        //                     style={{
        //                         width: '98%',
        //                         backgroundColor: (!props.dark ? '#f7f8fa': '#272e38'),
        //                         marginRight: 'auto'
        //
        //                     }}
        //                     inputVariant="outlined"
        //                     margin="normal"
        //                     id="admission-picker"
        //                     disabled={props.disabled}
        //                     label="Admission Date"
        //                     format="dd/MM/yyyy"
        //                     value={new Date('2014-08-18T21:11:54')}
        //                     // onChange={handleDateChange}
        //                     KeyboardButtonProps={{
        //                         'aria-label': 'change date',
        //                     }}
        //                 />
        //             </Grid>
        //         </MuiPickersUtilsProvider>
        //         <MuiPickersUtilsProvider utils={DateFnsUtils}>
        //             <Grid container justify="space-around" >
        //                 <KeyboardDatePicker
        //                     style={{
        //                         width: '98%',
        //                         backgroundColor: (!props.dark ? '#f7f8fa': '#272e38'),
        //                         marginLeft: 'auto'
        //
        //                     }}
        //                     inputVariant="outlined"
        //                     margin="normal"
        //                     id="publication-picker"
        //                     disabled={props.disabled}
        //                     label="Official Publication"
        //                     format="dd/MM/yyyy"
        //                     value={new Date('2014-08-18T21:11:54')}
        //                     // onChange={handleDateChange}
        //                     KeyboardButtonProps={{
        //                         'aria-label': 'change date',
        //                     }}
        //                 />
        //             </Grid>
        //         </MuiPickersUtilsProvider>
        //     </div>
        //
        //     <div className={styles.form_row}>
        //         <TextField disabled={props.disabled} label={'Unity'} value={props.name} variant={"outlined"} style={props.mediumFieldContainer} />
        //         <TextField disabled={props.disabled} label={'Superior'} value={props.name} variant={"outlined"} style={props.mediumFieldContainer}/>
        //     </div>
        //     <div className={styles.form_row}>
        //         <FormControl variant="outlined" disabled={props.disabled}  style={props.selectFieldContainer}>
        //             <InputLabel id="role-select">Active on role</InputLabel>
        //             <Select
        //                 labelId="role-select"
        //                 id="role-select"
        //                 value={false}
        //                 // onChange={handleChange}
        //                 label="Role"
        //             >
        //                 <MenuItem value={true}>Yes</MenuItem>
        //                 <MenuItem value={false}>No</MenuItem>
        //             </Select>
        //         </FormControl>
        //         <FormControl variant="outlined" disabled={props.disabled}  style={props.selectFieldContainer}>
        //             <InputLabel id="substitute-select">Substitute</InputLabel>
        //             <Select
        //                 labelId="substitute-select"
        //                 id="substitute-select"
        //                 value={false}
        //                 // onChange={handleChange}
        //                 label='Substitute'
        //             >
        //                 <MenuItem value={true}>Yes</MenuItem>
        //                 <MenuItem value={false}>No</MenuItem>
        //             </Select>
        //         </FormControl>
        //         <FormControl variant="outlined" disabled={props.disabled}  style={props.selectFieldContainer}>
        //             <InputLabel id="active-select">Active on role</InputLabel>
        //             <Select
        //                 labelId="active-select"
        //                 id="active-select"
        //                 value={false}
        //                 // onChange={handleChange}
        //                 label="Active on role"
        //             >
        //                 <MenuItem value={true}>Yes</MenuItem>
        //                 <MenuItem value={false}>No</MenuItem>
        //             </Select>
        //         </FormControl>
        //     </div>
        //
        //     <div className={styles.form_row}>
        //         <TextField disabled={props.disabled} label={'Legal Document'} value={props.name} variant={"outlined"} style={{width: '32%', backgroundColor: (!props.dark ? '#f7f8fa': '#272e38')}}/>
        //         <FormControl variant="outlined" disabled={props.disabled}  style={props.selectFieldContainer}>
        //             <InputLabel id="level-select">Level</InputLabel>
        //             <Select
        //                 labelId="level-select"
        //                 id="level-select"
        //                 value={false}
        //                 // onChange={handleChange}
        //                 label="Level"
        //             >
        //                 <MenuItem value={true}>Yes</MenuItem>
        //                 <MenuItem value={false}>No</MenuItem>
        //             </Select>
        //         </FormControl>
        //         <FormControl variant="outlined" disabled={props.disabled}  style={props.selectFieldContainer}>
        //             <InputLabel id="link-select">Linkage</InputLabel>
        //             <Select
        //                 labelId="link-select"
        //                 id="link-select"
        //                 value={false}
        //                 // onChange={handleChange}
        //                 label="Linkage"
        //             >
        //                 <MenuItem value={true}>Yes</MenuItem>
        //                 <MenuItem value={false}>No</MenuItem>
        //             </Select>
        //         </FormControl>
        //     </div>
        // </div>
    }
    const renderCollaborator = () => {
        return (null)
    }

    return(
        null
    )
}
