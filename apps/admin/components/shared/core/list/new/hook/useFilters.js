import {useCallback, useMemo, useState} from "react";
import TextField from "../../../inputs/text/TextField";
import DateField from "../../../inputs/date/DateField";

import styles from '../styles/ActiveFilters.module.css'
import Checkbox from "../../../shared/Checkbox";

export default function useFilters() {
    const [onInput, setOnInput] = useState(undefined)
    const [applied, setApplied] = useState(false)
    const [changed, setChanged] = useState(false)
    const [filters, setFilters] = useState({})

    const handleChange = (value, key) => {
        const newValue = {...filters}
        newValue.key = key
        newValue.value = value
        setChanged(true)
        setApplied(false)
        setFilters(newValue)
    }
    const getField = useCallback((key) => {
        let field
        switch (key.type) {
            case 'string': {
                field = (
                    <div className={styles.fieldWrapper}>
                        <TextField
                            label={key.label} width={'100%'} disabled={false}
                            handleChange={value => handleChange(value.target.value, key.key)}
                            value={filters.value}
                            placeholder={key.label}
                        />

                        <div className={styles.selectWrapper}>
                            <Checkbox
                                checked={filters.different_from === false}
                                handleCheck={() => {
                                    setFilters(prevState => {
                                        return {...prevState, different_from: false, contains: undefined}
                                    })
                                }}/>
                            <div>
                                É igual a.
                            </div>

                        </div>
                        <div className={styles.selectWrapper}>
                            <Checkbox
                                checked={filters.different_from}
                                handleCheck={() => {
                                    setFilters(prevState => {
                                        return {...prevState, different_from: true, contains: undefined}
                                    })
                                }}
                            />
                            <div>
                                Não é.
                            </div>

                        </div>
                        <div className={styles.selectWrapper}>
                            <Checkbox
                                checked={filters.contains}
                                handleCheck={() => {
                                    setFilters(prevState => {
                                        return {...prevState, contains: true, different_from: undefined}
                                    })
                                }}
                            />
                            <div>
                                Contém.
                            </div>
                        </div>
                    </div>
                )
                break
            }
            case 'number': {
                field = (
                    <TextField
                        label={key.label} width={'100%'} disabled={false} required={false}
                        handleChange={value => handleChange(value.target.value, key.key)}
                        type={'number'} placeholder={key.label}
                        value={filters[key.key]}
                    />
                )
                break
            }
            case 'object': {
                // field = (
                //     <DateField
                //         label={key.label} width={'100%'} disabled={false} required={false}
                //         handleChange={e => null}
                //         value={props.filters.find(e => {
                //             if (e.key === key.key)
                //                 return e.value
                //             else return undefined
                //         })}
                //     />
                // )
                break
            }
            case 'date': {
                field = (
                    <DateField
                        label={key.label} width={'100%'} disabled={false} required={false}
                        handleChange={value => handleChange(value, key.key)}
                        value={filters[key.key]}
                    />
                )
                break
            }
            default :
                break

        }
        return field
    }, [filters])

    return {getField, applied, changed, filters, setFilters, setApplied, setChanged, onInput, setOnInput}
}