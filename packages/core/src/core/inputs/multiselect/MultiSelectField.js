import styles from '../shared/Dropdown.module.css'
import shared from '../shared/Input.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import {ArrowDropDownRounded} from '@material-ui/icons'
import LocalePT from '../shared/LocalePT'
import SelectBox from "../shared/SelectBox";
import ToolTip from "../../misc/tooltip/ToolTip";
import Checkbox from "../checkbox/Checkbox";


export default function MultiSelectField(props) {
    const [open, setOpen] = useState(false)
    const lang = LocalePT
    const ref = useRef()
    const [selected, setSelected] = useState([])

    useEffect(() => {
        if (typeof props.value === 'string' && selected.length === 0 && props.value.length > 0)
            setSelected(props.value.split('-*/'))
        else if(props.asArray)
            setSelected(props.value ? props.value : [])
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
                onClick={() => {
                    setOpen(!open)
                }}
            >
                <ArrowDropDownRounded
                    style={{transform: !open ? 'unset' : 'rotate(180deg)', transition: '150ms linear'}}/>
                {props.value ?
                    <div className={styles.valueContainer}>
                        {props.asArray ? props.value.length : (props.value.split('-*/').length - 1)} - {lang.values}
                    </div>
                    : props.label}
            </button>

            <SelectBox open={open} setOpen={setOpen} reference={ref.current}>
                <div className={styles.dropDownChoicesContainer}>
                    {props.choices.map((choice, index) => (
                        <span style={{overflow: "hidden"}} className={styles.multiSelectRow} key={'multi-choice-'+index}>
                             <Checkbox
                                 type={'checkbox'}
                                 handleCheck={() => {
                                     let newSelected = [...selected]
                                     if (selected.includes(choice.key)) {
                                         newSelected.splice(newSelected.indexOf(choice.key), 1)
                                         setSelected(newSelected)
                                     } else {
                                         newSelected.push(choice.key)
                                         setSelected(newSelected)
                                     }

                                     if(!props.asArray) {
                                         let newData = ''
                                         newSelected.forEach(e => {
                                             if (e.length > 0)
                                                 newData = newData + '-*/' + e
                                         })
                                         props.handleChange(newData)
                                     }
                                     else
                                         props.handleChange(newSelected)

                                     setOpen(false)
                                 }} className={styles.multiSelectRowCheckbox}
                                 checked={selected.includes(choice.key)}
                                 label={
                                     <div
                                         style={{color: choice.color ? choice.color : undefined}}
                                         className={styles.multiSelectRowContent}
                                     >
                                         {choice.value}
                                     </div>
                                 }
                             />

                            <ToolTip content={choice.value}/>
                        </span>
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

MultiSelectField.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.any,
        value: PropTypes.any,
        color: PropTypes.string
    })),
    handleChange: PropTypes.func,
    value: PropTypes.any,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    asArray: PropTypes.bool
}
