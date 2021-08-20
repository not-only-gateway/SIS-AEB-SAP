import styles from './styles/Dropdown.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import {ArrowDropDownRounded} from '@material-ui/icons'
import LocalePT from '../packages/LocalePT'
import SelectBox from "../shared/SelectBox";


export default function DropDownField(props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(undefined)
    const lang = LocalePT
    const ref = useRef()
    useEffect(() => {
        const filtered = props.choices.filter(element => {
            if (element.key === props.value)
                return element
        })
        if (filtered.length > 0)
            setValue(filtered[0].value)
    }, [props.value])
    return (
        <div
            style={{
                width: props.width,
                alignItems: props.value ? 'unset' : 'flex-start',
            }}
            ref={ref}
            className={styles.wrapper}
        >
            <div className={styles.labelContainer}
                 style={{
                     visibility: (props.value !== undefined && props.value !== null) ? 'visible' : 'hidden',
                     opacity: (props.value !== undefined && props.value !== null) ? '1' : '0',
                 }}>{props.label}
            </div>

            <button
                disabled={props.disabled}

                style={{
                    background: props.disabled ? 'white' : undefined,
                    border: props.disabled ? '#ecedf2 1px solid' : undefined,
                    boxShadow: props.disabled ? 'none' : undefined
                }}
                className={styles.selectContainer}
                onClick={() => setOpen(!open)}
            >
                <ArrowDropDownRounded style={{transform: !open ? 'unset' : 'rotate(180deg)'}}/>
                {value ? value : props.placeholder}

            </button>
            <SelectBox open={open} setOpen={setOpen} reference={ref.current}>
                <div
                    className={styles.dropDownContainer}
                >
                    <div className={styles.dropDownChoicesContainer}>
                        { props.choices.map((choice, index) => (
                            <button key={index + '-choice-button'}
                                    style={{
                                        color: choice.key === props.value ? 'white' : undefined,
                                        background: choice.key === props.value ? '#0095ff' : 'transparent'
                                    }}
                                    onClick={() => {
                                        props.handleChange(choice.key)
                                        setOpen(false)
                                    }}
                                    className={styles.buttonContainer}>
                                {choice.value}
                            </button>
                        ))}
                    </div>
                </div>
            </SelectBox>
            <div className={styles.alertLabel}
                 style={{
                     color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
                     visibility: props.required && !open ? 'visible' : 'hidden',
                 }}
            >
                {lang.required}
            </div>

        </div>
    )
}

DropDownField.propTypes = {
    width: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.shape({key: PropTypes.any, value: PropTypes.any})),
    handleChange: PropTypes.func,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool
}
