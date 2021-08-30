import styles from '../../core/shared/styles/Dropdown.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import {ArrowDropDownRounded} from '@material-ui/icons'
import LocalePT from '../packages/LocalePT'
import SelectBox from "../../core/shared/SelectBox";
import ToolTip from "../tooltip/ToolTip";


export default function MultiSelectField(props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(undefined)
    const lang = LocalePT
    const ref = useRef()
    const [selected, setSelected] = useState([])

    useEffect(() => {
        if (props.value !== undefined && props.value !== null && selected.length === 0)
            setSelected(props.value.split('-*/'))
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
                position: 'relative'
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
                    boxShadow: props.disabled ? 'none' : undefined,
                    overflow: "hidden"
                }}
                className={styles.selectContainer}
                onClick={() => {
                    setOpen(!open)
                }}
            >
                <ArrowDropDownRounded
                    style={{transform: !open ? 'unset' : 'rotate(180deg)', transition: '150ms linear'}}/>
                {props.value ?
                    <div className={styles.valueContainer}>
                        {props.value.split('-*/').length - 1} - {lang.values}
                    </div>
                    : props.label}
            </button>

            <SelectBox open={open} setOpen={setOpen} reference={ref.current}>
                <div className={styles.dropDownChoicesContainer}>
                    {props.choices.map((choice, index) => (
                        <span style={{overflow: "hidden"}} className={styles.multiSelectRow}>
                             <input
                                 type={'checkbox'}

                                 onChange={event => {
                                     if (selected.includes(choice.key)) {
                                         let newSelected = [...selected]
                                         newSelected.splice(newSelected.indexOf(choice.key), 1)

                                         setSelected(newSelected)

                                         let newData = ''
                                         newSelected.forEach(e => {
                                             if(e.length > 0)
                                                 newData = newData + '-*/' + e
                                         })
                                         props.handleChange(newData)
                                     } else {
                                         let newSelected = [...selected]
                                         newSelected.push(choice.key)
                                         setSelected(newSelected)

                                         let newData = ''
                                         newSelected.forEach(e => {
                                             if(e.length > 0)
                                                 newData = newData + '-*/' + e
                                         })
                                         props.handleChange(newData)
                                     }
                                     setOpen(false)
                                 }} className={styles.multiSelectRowCheckbox}
                                 checked={selected.includes(choice.key)}
                             />
                            <div
                                key={index + '-choice-button'}
                                className={styles.multiSelectRowContent}
                            >
                                {choice.value}
                            </div>

                            <ToolTip content={choice.value}/>
                        </span>
                    ))}
                </div>
            </SelectBox>
            <div className={styles.alertLabel}
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

MultiSelectField.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.shape({key: PropTypes.any, value: PropTypes.any})),
    handleChange: PropTypes.func,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool
}
