import PropTypes from 'prop-types'
import {Skeleton} from "@material-ui/lab";
import React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function InputLayout(props) {

    switch (props.inputType) {
        case 0:  // TEXT FIELD
            return (
                <div key={props.key + props.inputName} style={{width: props.size + '%', marginBottom: props.margin === false ? null : '2vh'}}>
                    <TextField disabled={props.disabled} label={props.inputName} value={props.initialValue}
                               variant={"outlined"}
                               style={{backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38'), width: '100%'}}
                               onChange={event => {
                                   props.handleChange(event.target.value)
                                   props.setChanged(true)
                               }}
                               required={props.required}
                               error={props.required === true && (props.initialValue === null || props.initialValue.length === 0)}
                    />
                </div>
            )
        case 1: // SELECT
            return (
                <div key={props.key + props.inputName} style={{width: props.size + '%', marginBottom: props.margin === false  ? null : '2vh'}}>
                    <FormControl variant="outlined" disabled={props.disabled}
                                 style={{backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38'), width: '100%'}} required={props.required}
                                 error={props.required === true && (props.initialValue === null || props.initialValue.length === 0)}>
                        <InputLabel id={props.inputName.replace(' ', '')}>{props.inputName}</InputLabel>
                        <Select

                            labelId={props.inputName.replace(' ', '')}
                            id={props.inputName.replace(' ', '')}
                            value={props.initialValue}
                            disabled={props.disabled}
                            onChange={event => {
                                props.handleChange(event.target.value)
                                props.setChanged(true)
                            }}
                            label={props.inputName}

                        >
                            {props.selectFields.map(field => (
                                <MenuItem value={field.key}>{field.value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )
        case 2: // DATE SELECT
            return (
                <div key={props.key + props.inputName} style={{width: props.size + '%', marginBottom: props.margin === false  ? null : '2vh'}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around"
                              style={{width: '100%'}}>
                            <KeyboardDatePicker
                                style={{
                                    width: '100%',
                                    margin: 'auto',
                                    backgroundColor: (!props.dark ? '#f7f8fa' : '#272e38'),
                                }}
                                required={props.required}
                                inputVariant="outlined"
                                margin="normal"
                                id={props.inputName.replace(' ', '')}
                                disabled={props.disabled}
                                label={props.inputName}
                                format="dd/MM/yyyy"
                                value={props.initialValue}
                                onChange={event => {
                                    props.handleChange(event)
                                    props.setChanged(true)
                                }}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
            )
        case 3: // HOUR SELECT
            return (
                <div key={props.key + props.inputName} style={{width: props.size + '%', marginBottom: props.margin === false  ? null : '2vh'}}>
                    <form noValidate style={{backgroundColor: !props.dark ? '#f7f8fa' : '#272e38', width: '100%'}}>
                        <TextField
                            required={props.required}
                            variant={'outlined'}
                            style={{width: '100%'}}
                            id={props.inputName.replace(' ', '')}
                            label={props.inputName}
                            type="time"
                            disabled={props.disabled}
                            value={props.initialValue}
                            onChange={event => {
                                props.handleChange(event.target.value)
                                props.setChanged(true)
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </form>
                </div>
            )
        default:
            return (
                <Skeleton variant='rect' style={{
                    borderRadius: '8px',
                    marginBottom: '2vh',
                    width: '45vw',
                    height: '6vh',
                    backgroundColor: props.dark ? '#3b424c' : '#f4f8fb'
                }}/>
            )
    }
}

InputLayout.propTypes = {
    dark: PropTypes.bool,
    handleChange: PropTypes.func,
    inputType: PropTypes.number,
    disabled: PropTypes.bool,
    size: PropTypes.number,
    required: PropTypes.bool,
    selectFields: PropTypes.object,
    initialValue: PropTypes.any,
    inputName: PropTypes.string,
    key: PropTypes.number,
    margin: PropTypes.bool,
    setChanged: PropTypes.func
}