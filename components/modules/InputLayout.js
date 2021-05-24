import PropTypes from 'prop-types'
import React, {useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@material-ui/core";

export default function InputLayout(props) {
    const [focused, setFocused] = useState(false)
    switch (props.inputType) {
        case 0: {
            return (
                <div key={props.key} style={{width: props.size}}>
                    <FormControl component="fieldset" style={{width: '100%'}}>
                        <TextField
                            onFocus={() => setFocused(true)}
                            onBlur={() => setFocused(false)}
                            disabled={props.disabled}
                                   value={props.initialValue}
                                   label={props.inputName}
                                   variant={"outlined"}
                                   style={{
                                       width: '100%',
                                       background: focused ? '#f5f6f8' : 'transparent'
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
                        <InputLabel id={props.key + '-inputs'}>{props.inputName}</InputLabel>
                        <Select
                            labelId={props.key + '-inputs'}
                            label={props.inputName}
                            id={props.key + '-inputs'}
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