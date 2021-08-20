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
    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedDay, setSelectedDay] = useState()
    const [year, setYear] = useState()

    const [mounted, setMounted] = useState(false)

    const handleMouseDown = (event) => {
        const closest = event.target.closest('.' + dStyles.calendar)

        if (closest === null && open)
            setOpen(false)

    }
    const getDays = (month) => {
        let res = []
        let days = Dates[month - 1].days;
        for (let i = 0; i < days; i++) {
            res.push(
                <div
                    className={dStyles.dayContainer}
                    style={{
                        background: selectedDay === (i + 1) ? '#E8F0FE' : undefined,
                        color: selectedDay === (i + 1) ? '#0095ff' : undefined
                    }}
                    onClick={() => {
                        const date = new Date()
                        setOpen(false)
                        setSelectedMonth(month)
                        setSelectedDay(i + 1)
                        setYear(year === undefined ? date.getFullYear() : year)
                        props.handleChange(`${year === undefined ? date.getFullYear() : year}-${month}-${i + 1}`)
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
                let value = new Date(props.value).toLocaleDateString()
                value = value.split('/')
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
                        placeholder={'DD'}
                        type="text" pattern="\d*" maxLength="2"
                        value={selectedDay < 10 ? `${selectedDay}` : selectedDay}
                        style={{width: '40px'}}
                        onChange={event => {
                            if ((event.target.value <= 31 && event.target.value >= 1) && event.target.value.length <= 2 || (selectedDay !== undefined && event.target.value.length < selectedDay.length)) {
                                setSelectedDay(event.target.value.length === 0 ? undefined : event.target.value)
                                props.handleChange(
                                    `${year}-${selectedMonth}-${event.target.value}`
                                )
                            }
                        }}
                    />
                    <div className={dStyles.divider}/>
                    <input
                        disabled={props.disabled}
                        className={dStyles.inputContainer}
                        placeholder={'MM'}
                        value={selectedMonth < 10 ? `${selectedMonth}` : (selectedMonth)}
                        type="number"
                        max={12}
                        min={1}
                        style={{width: '40px'}}
                        onChange={event => {
                            if ((event.target.value <= 12 && event.target.value >= 1) && event.target.value.length <= 2 || (selectedMonth !== undefined && event.target.value.length < selectedMonth.length)) {
                                setSelectedMonth(event.target.value.length === 0 ? undefined : event.target.value)
                                props.handleChange(
                                    `${year}-${event.target.value}-${selectedDay}`
                                )
                            }
                        }}
                    />
                    <div className={dStyles.divider}/>
                    <input
                        disabled={props.disabled}
                        className={dStyles.inputContainer}
                        placeholder={'AAAA'}
                        value={year}
                        type="number"
                        style={{width: '60px'}}
                        onChange={event => {
                            if ((event.target.value <= 5000 && event.target.value >= 0) && event.target.value.length <= 4 || (year !== undefined && event.target.value.length < year.length)) {
                                setYear(event.target.value.length === 0 ? undefined : event.target.value)
                                props.handleChange(
                                    `${event.target.value}-${selectedMonth + 1}-${selectedDay}`
                                )
                            }
                        }}
                    />
                </div>
                <button className={dStyles.buttonContainer} onClick={() => {
                    setOpen(true)
                }}>
                    <CalendarTodayRounded style={{fontSize: '1.2rem'}}/>
                </button>
                <div className={dStyles.calendar} style={{display: open ? undefined : 'none'}}>

                    <div
                        className={dStyles.monthContainer}
                    >
                        <button className={dStyles.buttonContainer} style={{width: 'fit-content'}} onClick={() => {
                            if ((selectedMonth !== undefined && selectedMonth === 1) || (!selectedMonth && new Date().getMonth() === 1)) {
                                setSelectedMonth(12)
                                setYear(year === undefined ? (new Date().getFullYear() - 1) : (year - 1))
                            } else
                                setSelectedMonth(selectedMonth === undefined ? (new Date().getMonth() - 1) : (selectedMonth - 1))


                        }}>
                            <ArrowBackRounded/>
                        </button>
                        {selectedMonth === undefined || selectedMonth > 12 || selectedMonth < 1 ? Dates[new Date().getMonth() - 1].month : Dates[selectedMonth - 1].month} - {year === undefined ? new Date().getFullYear() : year}
                        <button className={dStyles.buttonContainer} style={{width: 'fit-content'}} onClick={() => {
                            if ((selectedMonth !== undefined && selectedMonth === 12) || (!selectedMonth && new Date().getMonth() === 12)) {
                                setSelectedMonth(1)
                                setYear(year === undefined ? (new Date().getFullYear() + 1) : (year + 1))
                            } else
                                setSelectedMonth(selectedMonth === undefined ? (new Date().getMonth() + 1) : (selectedMonth + 1))
                        }}>
                            <ArrowForwardRounded/>
                        </button>
                    </div>

                    <div className={dStyles.daysContainer}>
                        {getDays(selectedMonth === undefined ? new Date().getMonth() : selectedMonth).map(e => e)}
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
