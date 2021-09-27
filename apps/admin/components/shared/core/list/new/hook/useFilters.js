import {useCallback, useState} from "react";
import TextField from "../../../inputs/text/TextField";
import DateField from "../../../inputs/date/DateField";

import styles from '../styles/Header.module.css'
import Checkbox from "../../../shared/components/Checkbox";

export default function useFilter(filter, setFilter) {
    const [onInput, setOnInput] = useState(undefined)
    const [changed, setChanged] = useState(false)

    const handleChange = (value) => {
        setFilter(prevState => {
            return {
                ...prevState,
                value: value
            }
        })
        setChanged(true)
    }
    const getField = useCallback(() => {
        let field
        switch (filter.type) {
            case 'string': {
                field = (
                    <div className={styles.fieldWrapper}>
                        <TextField
                            label={filter.label} width={'100%'} disabled={false}
                            handleChange={value => handleChange(value.target.value)}
                            value={filter.value}
                            placeholder={filter.label}
                        />

                        <div className={styles.selectWrapper}>
                            <Checkbox
                                checked={filter.different_from === false}
                                handleCheck={() => {
                                    setFilter(prevState => {
                                        return {...prevState, different_from: false, contains: undefined}
                                    })
                                }}/>
                            <div>
                                É igual a.
                            </div>

                        </div>
                        <div className={styles.selectWrapper}>
                            <Checkbox
                                checked={filter.different_from}
                                handleCheck={() => {
                                    setFilter(prevState => {
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
                                checked={filter.contains}
                                handleCheck={() => {
                                    setFilter(prevState => {
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
                        label={filter.label} width={'100%'} disabled={false} required={false}
                        handleChange={value => handleChange(value.target.value)}
                        type={'number'} placeholder={filter.label}
                        value={filter.value}
                    />
                )
                break
            }
            case 'object': {
                // field = (
                //     <DateField
                //         label={key.label} width={'100%'} disabled={false} required={false}
                //         handleChange={e => null}
                //         value={props.filter.find(e => {
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
                        label={filter.label} width={'100%'} disabled={false} required={false}
                        handleChange={value => handleChange(value)}
                        value={filter.value}
                    />
                )
                break
            }
            default :
                break

        }
        return field
    }, [filter])

    return {getField,  changed, setChanged, onInput, setOnInput}
}