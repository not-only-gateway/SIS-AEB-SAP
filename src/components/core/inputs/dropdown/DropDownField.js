import styles from '../shared/Dropdown.module.css'
import PropTypes from 'prop-types'
import React, {useMemo, useRef, useState} from 'react'
import {ArrowDropDownRounded} from '@material-ui/icons'
import LocalePT from '../shared/LocalePT'
import SelectBox from "../shared/SelectBox";
import ToolTip from "../../misc/tooltip/ToolTip";

import shared from '../shared/Input.module.css'

export default function DropDownField(props) {
    const [open, setOpen] = useState(false)

    const lang = LocalePT
    const ref = useRef()
    const selected = useMemo(() => {

        return props.choices.find(e => e.key === props.value)
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
            <div className={shared.labelContainer}
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
                    boxShadow: props.disabled ? 'none' : undefined,
                    overflow: "hidden"
                }}
                className={styles.selectContainer}
                onClick={() => setOpen(!open)}
            >
                <ArrowDropDownRounded
                    style={{transform: !open ? 'unset' : 'rotate(180deg)', transition: '150ms linear'}}/>
                {selected ?
                    <div className={styles.valueContainer} style={{color: selected.color}}>
                        {selected.value}
                    </div>
                    : props.label}

            </button>
            <SelectBox open={open} setOpen={setOpen} reference={ref.current}>

                <div className={styles.dropDownChoicesContainer}>
                    {props.choices.map((choice, index) => (

                        <button
                            key={index + '-choice-button'}

                            style={{
                                color: choice.key === props.value ? 'white' : choice.color ? choice.color : undefined,
                                background: choice.key === props.value ? '#0095ff' : undefined
                            }}

                            onClick={() => {
                                props.handleChange(choice.key)
                                setOpen(false)
                            }}
                            className={styles.dropDownButton}
                        >
                            {choice.value}
                            <ToolTip content={choice.value}/>
                        </button>


                    ))}
                </div>
            </SelectBox>
            <div className={shared.alertLabel}
                 style={{
                     color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
                     visibility: props.required ? 'visible' : 'hidden',
                 }}
            >
                {lang.required}
            </div>

        </div>
    )
}

DropDownField.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any.isRequired,
        value: PropTypes.any.isRequired,
        color: PropTypes.string
    })).isRequired,
    handleChange: PropTypes.func,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool
}
