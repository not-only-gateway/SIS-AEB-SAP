import PropTypes from 'prop-types'
import React from "react";
import {FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export default function InputLayout(props) {

    switch (props.inputType) {
        case 0: {
            return (
                <div key={props.key} style={{width: props.size}}>
                    <FormControl component="fieldset" style={{width: '100%'}}>
                        <TextField disabled={props.disabled} value={props.initialValue} label={props.inputName}
                                   variant={"outlined"}
                                   style={{
                                       width: '100%',
                                   }}
                                   type={props.numeric ? 'number' : 'text'}
                                   onChange={event => {
                                       let data = event.target.value
                                       if (props.uppercase)
                                           data = event.target.value

                                       if (props.maxLength !== undefined) {
                                           const value = (data).slice(0, props.maxLength)
                                           props.handleChange({name: props.name, value: value})
                                       } else
                                           props.handleChange({name: props.name, value: data})

                                       if (props.setChanged !== undefined)
                                           props.setChanged(true)
                                   }}
                                   required={props.required}
                                   error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}
                        />
                    </FormControl>
                </div>
            )
        }

        case 1: {
            return (
                <div key={props.key} style={{width: props.size}}>
                    <FormControl variant="outlined" disabled={props.disabled}
                                 style={{width: '100%'}} required={props.required}
                                 error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}>
                        <InputLabel id={props.inputName.replace(' ', '')}>{props.inputName}</InputLabel>
                        <Select
                            labelId={props.inputName.replace(' ', '')}
                            label={props.inputName}
                            id={props.inputName.replace(' ', '')}
                            value={props.initialValue}
                            disabled={props.disabled}
                            onChange={event => {
                                props.handleChange({name: props.name, value: event.target.value})
                                if (props.setChanged !== undefined)
                                    props.setChanged(true)
                            }}

                        >
                            {props.selectFields.map(field => (
                                <MenuItem value={field.key}>{field.value}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
            )
        }

        case 2: {
            return (


                <div key={props.key}
                     style={{width: props.size}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around"
                              style={{width: '100%'}}>
                            <KeyboardDatePicker
                                style={{
                                    width: '100%',
                                    margin: 'auto',
                                    borderRadius: '8px'
                                }}
                                required={props.required}
                                inputVariant="outlined"
                                margin="normal"
                                id={props.inputName.replace(' ', '')}
                                disabled={props.disabled}
                                label={props.inputName}
                                error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}
                                format="dd/MM/yyyy"
                                value={props.initialValue !== undefined ? props.initialValue : null}
                                onChange={event => {
                                    props.handleChange({name: props.name, value: event})
                                    if (props.setChanged !== undefined)
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
        }
        case 3: {
            return (
                <div key={props.key} style={{width: props.size}}>
                    <FormControl component="fieldset" style={{width: '100%'}}>
                        <TextField
                            required={props.required}
                            label={props.inputName}
                            variant={'outlined'}
                            style={{width: '100%'}}
                            id={props.inputName.replace(' ', '')}
                            placeholder={props.inputName}
                            type="time"
                            disabled={props.disabled}
                            error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}
                            value={props.initialValue}
                            onChange={event => {
                                props.handleChange({name: props.name, value: event.target.value})
                                if (props.setChanged !== undefined)
                                    props.setChanged(true)
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </FormControl>
                </div>
            )
        }

        default:
            return null
    }
}

InputLayout.propTypes = {
    dark: PropTypes.bool,
    handleChange: PropTypes.func,
    inputType: PropTypes.number,
    disabled: PropTypes.bool,
    size: PropTypes.string,
    required: PropTypes.bool,
    selectFields: PropTypes.array,
    initialValue: PropTypes.any,
    inputName: PropTypes.string,
    key: PropTypes.any,
    margin: PropTypes.bool,
    name: PropTypes.string,
    setChanged: PropTypes.func,
    type: PropTypes.string,
    maxLength: PropTypes.number,
    numeric: PropTypes.bool,
    uppercase: PropTypes.bool,
}