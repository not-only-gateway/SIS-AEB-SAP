import styles from './styles/Input.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import LocalePT from './locales/LocalePT'
import dStyles from './styles/DateField.module.css'
import {ArrowBackRounded, ArrowForwardRounded, CalendarTodayRounded} from "@material-ui/icons";
import Dates from "./packages/Dates";

export default function DateField(props) {
    const lang = LocalePT
    const [open, setOpen] = useState()
    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
    const [selectedDay, setSelectedDay] = useState(new Date().getDay())
    const [year, setYear] = useState(new Date().getFullYear())
    const [mounted, setMounted] = useState(false)

    const handleMouseDown = (event) => {
        const closest = event.target.closest('.' + dStyles.calendar)

        if (closest === null && open)
            setOpen(false)

    }
    const getDays = () => {
        let res = []
        let days = Dates[selectedMonth - 1].days;
        for (let i = 0; i < days; i++) {
            res.push(
                <div
                    className={dStyles.dayContainer}
                    style={{
                        background: selectedDay === (i + 1) ? '#E8F0FE' : undefined,
                        color: selectedDay === (i + 1) ? '#0095ff' : undefined
                    }}
                    onClick={() => {
                        setOpen(false)
                        setSelectedDay(i + 1)
                        props.handleChange(`${i + 1}-${selectedMonth}-${year}`)
                    }}
                >
                    {i + 1}
                </div>
            )
        }
        return res
    }
    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            if (props.value !== undefined && props.value !== null) {
                let value = props.value.split('-')
                setSelectedDay(parseInt(value[0]))
                setSelectedMonth(parseInt(value[1]))
                setYear(parseInt(value[2]))
            }
        }

        document.addEventListener('mousedown', handleMouseDown)

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
                        value={selectedDay < 10 ? `0${selectedDay}` : selectedDay}
                        type={'number'}
                        onChange={event => {
                            setSelectedDay(event.target.value)
                            props.handleChange(`${event.target.value}-${selectedMonth}-${year}`)
                        }}
                        maxLength={props.maxLength}
                    />
                    <div className={dStyles.divider}/>
                    <input
                        disabled={props.disabled}
                        className={dStyles.inputContainer}
                        placeholder={'mm'}
                        value={selectedMonth < 10 ? `0${selectedMonth}` : (selectedMonth)}

                        type={'number'}
                        onChange={event => {
                            setSelectedMonth(event.target.value)
                            props.handleChange(`${selectedDay}-${event.target.value}-${year}`)
                        }}
                        maxLength={props.maxLength}
                    />
                    <div className={dStyles.divider}/>
                    <input
                        disabled={props.disabled}
                        className={dStyles.inputContainer}
                        placeholder={'yyyy'}
                        value={year}
                        type={'number'}
                        style={{width: '40px'}}
                        onChange={event => {
                            setYear(event.target.value)
                            props.handleChange(`${selectedDay}-${selectedMonth + 1}-${event.target.value}`)
                        }}
                        maxLength={props.maxLength}
                    />
                </div>
                <button className={dStyles.buttonContainer} onClick={() => {
                    setOpen(true)
                }}>
                    <CalendarTodayRounded style={{fontSize: '1.2rem'}}/>
                </button>
                <div className={dStyles.calendar} style={{display: open ? undefined : 'none'}}>
                    {Dates[selectedMonth - 1] !== undefined ?
                        <div
                            className={dStyles.monthContainer}
                        >
                            <button className={dStyles.buttonContainer} style={{width: 'fit-content'}} onClick={() => {
                                if (selectedMonth === 1) {
                                    setSelectedMonth(12)
                                    setYear(year - 1)
                                } else
                                    setSelectedMonth(selectedMonth - 1)
                            }}>
                                <ArrowBackRounded/>
                            </button>
                            {Dates[selectedMonth - 1].month} - {year}
                            <button className={dStyles.buttonContainer} style={{width: 'fit-content'}} onClick={() => {
                                if (selectedMonth === 12) {
                                    setSelectedMonth(1)
                                    setYear(year + 1)
                                } else
                                    setSelectedMonth(selectedMonth + 1)
                            }}>
                                <ArrowForwardRounded/>
                            </button>
                        </div>
                        :
                        null
                    }
                    <div className={dStyles.daysContainer}>
                        {Dates[selectedMonth - 1] !== undefined ? getDays(setSelectedMonth).map(e => e) : null}
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
