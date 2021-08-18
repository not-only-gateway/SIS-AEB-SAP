import styles from './styles/Input.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import LocalePT from './locales/LocalePT'
import dStyles from './styles/DateField.module.css'
import {CalendarTodayRounded} from "@material-ui/icons";
import Dates from "./packages/Dates";

export default function DateField(props) {
    const lang = LocalePT
    const [parsedDate, setParsedDate] = useState()
    const [open, setOpen] = useState()

    const handleMouseDown = (event) => {
        const closest = event.target.closest('.' + dStyles.calendar)

        if (closest === null && open)
            setOpen(false)

    }
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        // if (props.value !== undefined && props.value !== null) {
        //     const value = new Date(props.value)
        //     let dd = String(value.getDate()).padStart(2, '0');
        //     let mm = String(value.getMonth() + 1).padStart(2, '0')
        //     let yyyy = value.getFullYear();
        //     setParsedDate(yyyy + '-' + mm + '-' + dd)
        // }
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [open])
    return (
        <div className={dStyles.container} style={{
            width: props.width,
            alignItems: props.value ? 'unset' : 'flex-start',

        }}>
            <div className={styles.labelContainer}>{props.label}</div>

            <div className={dStyles.fieldsContainer}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px', width: 'fit-content'}}>
                    <input
                        disabled={props.disabled}
                        className={dStyles.inputContainer}
                        placeholder={'dd'}
                        value={33}
                        type={'number'}
                        onChange={props.handleChange}
                        maxLength={props.maxLength}
                    />
                    <div className={dStyles.divider}/>
                    <input
                        disabled={props.disabled}
                        className={dStyles.inputContainer}
                        placeholder={'mm'}
                        value={34}

                        type={'number'}
                        onChange={props.handleChange}
                        maxLength={props.maxLength}
                    />
                    <div className={dStyles.divider}/>
                    <input
                        disabled={props.disabled}
                        className={dStyles.inputContainer}
                        placeholder={'yyyy'}
                        value={undefined}
                        type={'number'}
                        style={{width: '40px'}}
                        onChange={props.handleChange}
                        maxLength={props.maxLength}
                    />
                </div>
                <button className={dStyles.buttonContainer} onClick={() => {
                    setOpen(true)
                }}>
                    <CalendarTodayRounded style={{fontSize: '1.2rem'}}/>
                </button>
                <div className={dStyles.calendar} style={{display: open ? undefined : 'none'}}>
                    <div className={dStyles.monthsContainer}>
                        {
                            Dates.map(month => (
                                <div className={dStyles.monthContainer} onClick={() => {

                                }}>
                                    {month.month}
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>


            <div className={styles.alertLabel}
                   style={{
                       color: (props.value === null || !props.value) ? '#ff5555' : '#262626',
                       visibility: props.required ? 'visible' : 'hidden'
                   }}>{lang.required}</div>

        </div>
    )
}

DateField.propTypes = {
    width: PropTypes.string,
    label: PropTypes.string,
    handleChange: PropTypes.func,
    value: PropTypes.string,
    required: PropTypes.bool,
    locale: PropTypes.string,
    disabled: PropTypes.bool,
    dark: PropTypes.bool
}
