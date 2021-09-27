import shared from '../shared/Input.module.css'
import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from 'react'
import LocalePT from '../shared/LocalePT'
import dStyles from './styles/DateField.module.css'
import {ArrowBackIosRounded, CalendarTodayRounded} from "@material-ui/icons";
import Dates from "./misc/Dates";
import SelectBox from "../shared/SelectBox";

export default function DateField(props) {
    const lang = LocalePT
    const [open, setOpen] = useState()
    const [selectedMonth, setSelectedMonth] = useState()
    const [selectedDay, setSelectedDay] = useState()
    const [year, setYear] = useState()
    const ref = useRef()
    const [mounted, setMounted] = useState(false)

    const getDays = (month) => {
        let res = []
        if (Dates[month - 1] !== undefined) {
            let days = Dates[month - 1].days;
            for (let i = 0; i < days; i++) {
                res.push(
                    <div
                        className={dStyles.dayContainer}
                        style={{
                            background: selectedDay === (i + 1) ? '#0095ff' : undefined,
                            color: selectedDay === (i + 1) ? 'white' : undefined
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
        }
        return res
    }
    useEffect(() => {

        if (!mounted && props.value !== undefined && props.value !== null) {
            setMounted(true)

            let value = new Date(props.value)

            setSelectedDay(parseInt(value.getDate()) + 1)
            setSelectedMonth(parseInt(value.getMonth() + 1))
            setYear(parseInt(value.getFullYear()))
        }


    }, [open, props.value])
    return (
        <div className={dStyles.container} style={{
            width: props.width,
            alignItems: props.value ? 'unset' : 'flex-start',

        }} ref={ref}>
            <div className={shared.labelContainer}>{props.label}</div>

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
                                    `${event.target.value}-${selectedMonth}-${selectedDay}`
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

                <SelectBox open={open} setOpen={setOpen} reference={ref.current}>
                    <div className={dStyles.calendar}>
                        <div className={dStyles.monthContainer}>
                            <button className={dStyles.buttonContainer} style={{width: 'fit-content', margin: 'unset'}}
                                    onClick={() => {
                                        if ((selectedMonth !== undefined && selectedMonth === 1) || (!selectedMonth && new Date().getMonth() === 1)) {
                                            setSelectedMonth(12)
                                            setYear(year === undefined ? (new Date().getFullYear() - 1) : (year - 1))
                                        } else
                                            setSelectedMonth(selectedMonth === undefined ? (new Date().getMonth() - 1) : (selectedMonth - 1))


                                    }}>
                                <ArrowBackIosRounded style={{fontSize: '1.2rem'}}/>
                            </button>
                            {(selectedMonth === undefined || selectedMonth > 12 || selectedMonth < 1) || Dates[selectedMonth - 1] === undefined ? Dates[new Date().getMonth() - 1].month : Dates[selectedMonth - 1].month} - {year === undefined ? new Date().getFullYear() : year}
                            <button className={dStyles.buttonContainer} style={{width: 'fit-content', margin: 'unset'}}
                                    onClick={() => {
                                        if ((selectedMonth !== undefined && selectedMonth === 12) || (!selectedMonth && new Date().getMonth() === 12)) {
                                            setSelectedMonth(1)
                                            setYear(year === undefined ? (new Date().getFullYear() + 1) : (year + 1))
                                        } else
                                            setSelectedMonth(selectedMonth === undefined ? (new Date().getMonth() + 1) : (selectedMonth + 1))
                                    }}>
                                <ArrowBackIosRounded style={{fontSize: '1.2rem', transform: 'rotate(180deg'}}/>
                            </button>
                        </div>

                        <div className={dStyles.daysContainer}>
                            {getDays(selectedMonth === undefined ? new Date().getMonth() : selectedMonth).map(e => e)}
                        </div>
                    </div>

                </SelectBox>


            </div>
            <div className={shared.alertLabel}
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
    disabled: PropTypes.bool
}
