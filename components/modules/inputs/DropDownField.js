import styles from '../../../styles/Input.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import {ArrowDropDownRounded} from "@material-ui/icons";
import Button from "./Button";

export default function DropDownField(props) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(undefined)

    function getLang(locale) {
        let response = 'This field is required.'

        if (locale === 'pt')
            response = 'Este campo é obrigatório.'

        return response
    }

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
                height: '100px',
                display: 'grid',
                alignItems: props.value ? 'unset' : 'flex-start',
                gap: '4px',
            }}
        >
            <label htmlFor={'dropdown-'+props.label} className={styles.labelContainer}
                   style={{
                       visibility: (props.value !== undefined && props.value !== null) ? 'visible' : 'hidden',
                       opacity: (props.value !== undefined && props.value !== null) ? '1' : '0',
                       transition: 'visibility 0.2s ease,opacity 0.2s ease'
                   }}>{props.label}</label>

            <div className={styles.dropDownContainer} onBlur={event => {
                if(!event.currentTarget.contains(event.relatedTarget))
                    setOpen(false)
            }} >
                <button
                    id={'dropdown-'+props.label}
                    disabled={props.disabled}

                    style={{
                        height: '56px', borderRadius: '5px',
                    }}
                    className={[styles.selectContainer, props.disabled ? {} : styles.hovered].join(' ')}
                    onClick={() => setOpen(!open)}
                >

                    {value ? value : props.placeholder}
                    <ArrowDropDownRounded style={{transform: open ? 'unset' : 'rotate(180deg)'}}/>
                </button>
                <div className={styles.dropDownChoicesContainer} style={{display: open ? 'initial' : 'none'}}>
                    {open ? props.choices.map((choice, index) => (
                        <Button key={index + '-choice-button'} width={'100%'} paddingType={"default"}
                                justification={'flex-start'}
                                handleClick={() => {
                                    props.handleChange(choice.key)
                                    setOpen(false)
                                }} content={choice.value}

                                backgroundColor={choice.key === props.value ? '#0095ff' : 'transparent'}
                                fontColor={choice.key === props.value ? 'white' : '#262626'}
                                border={'transparent 1px solid'} elevation={false} hoverHighlight={choice.key !== props.value}/>
                    )) : null}
                </div>
            </div>

            <label htmlFor={'dropdown-'+props.label} className={styles.alertLabel}
                   style={{
                       color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
                       visibility: props.required && !open ? 'visible' : 'hidden',
                   }}>{getLang(props.locale)}</label>

        </div>
    )
}

DropDownField.propTypes = {
    width: PropTypes.string,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    choices: PropTypes.array,
    handleChange: PropTypes.func,
    value: PropTypes.string,
    required: PropTypes.bool,
    locale: PropTypes.string,
    disabled: PropTypes.bool
}