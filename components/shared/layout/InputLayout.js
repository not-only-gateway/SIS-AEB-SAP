import PropTypes from 'prop-types'
import React from "react";
import {FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import shared from '../../../styles/shared/Shared.module.css'
import {getSecondaryBackground} from "../../../styles/shared/MainStyles";

export default function InputLayout(props) {

    switch (props.inputType) {
        case 0: {
            return (
                <div key={props.key} className={shared.pop_up_animation}
                     style={{width: props.size + '%'}}
                >
                    <TextField disabled={props.disabled} label={props.inputName} value={props.initialValue}
                               variant={"outlined"}
                               style={{...{
                                   width: '100%',
                                   borderRadius: '8px'
                               }, ...getSecondaryBackground({dark: props.dark})}}
                               onChange={event => {
                                   props.handleChange(event.target.value)
                                   if (props.setChanged !== undefined)
                                       props.setChanged(true)
                               }}
                               required={props.required}
                               error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}
                    />
                </div>
            )
        }

        case 1: {
            return (
                <div key={props.key} className={shared.pop_up_animation}
                     style={{width: props.size + '%'}}>
                    <FormControl variant="outlined" disabled={props.disabled}
                                 style={{...{
                                     width: '100%',
                                     borderRadius: '8px'
                                 },...getSecondaryBackground({dark: props.dark})}} required={props.required}
                                 error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}>
                        <InputLabel id={props.inputName.replace(' ', '')}>{props.inputName}</InputLabel>
                        <Select

                            labelId={props.inputName.replace(' ', '')}
                            id={props.inputName.replace(' ', '')}
                            value={props.initialValue}
                            disabled={props.disabled}
                            onChange={event => {
                                props.handleChange(event.target.value)
                                if (props.setChanged !== undefined)
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
        }

        case 2: {

            return (
                <div key={props.key}
                     style={{width: props.size + '%'}}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around"
                              style={{width: '100%'}}>
                            <KeyboardDatePicker
                                style={{...{
                                    width: '100%',
                                    margin: 'auto',
                                    borderRadius: '8px'
                                }, ...getSecondaryBackground({dark: props.dark})}}
                                required={props.required}
                                inputVariant="outlined"
                                margin="normal"
                                id={props.inputName.replace(' ', '')}
                                disabled={props.disabled}
                                label={props.inputName}
                                error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}
                                format="dd/MM/yyyy"
                                value={props.initialValue}
                                onChange={event => {
                                    props.handleChange(event)
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
                <div key={props.key}
                     style={{width: props.size + '%'}}>
                    <form noValidate style={{...{
                            width: '100%',
                            borderRadius: '8px'
                        },...getSecondaryBackground({dark: props.dark})}}>
                        <TextField
                            required={props.required}
                            variant={'outlined'}
                            style={{width: '100%'}}
                            id={props.inputName.replace(' ', '')}
                            label={props.inputName}
                            type="time"
                            disabled={props.disabled}
                            error={props.required === true && (props.initialValue === null || props.initialValue === undefined || props.initialValue.length === 0)}
                            value={props.initialValue}
                            onChange={event => {
                                props.handleChange(event.target.value)
                                if (props.setChanged !== undefined)
                                    props.setChanged(true)
                            }}
                            inputProps={{
                                step: 300, // 5 min
                            }}
                        />
                    </form>
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
    size: PropTypes.number,
    required: PropTypes.bool,
    selectFields: PropTypes.object,
    initialValue: PropTypes.any,
    inputName: PropTypes.string,
    key: PropTypes.number,
    margin: PropTypes.bool,
    setChanged: PropTypes.func
}