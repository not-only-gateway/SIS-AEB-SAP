import React, {useCallback, useState} from "react";
import TextField from "../../inputs/text/TextField";
import DateField from "../../inputs/date/DateField";
import styles from '../styles/Header.module.css'
import Checkbox from "../../inputs/checkbox/Checkbox";
import Selector from "../../inputs/selector/Selector";
import useQuery from "../../shared/hooks/useQuery";

export default function useFilter(filter, setFilter) {
    const [onInput, setOnInput] = useState(undefined)
    const [changed, setChanged] = useState(false)
    let hook =  useQuery(filter?.query ? filter.query : {})

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

        const baseProps = {
            type: filter.type,
            key: filter.key,
            label: filter.label
        }
        const dateNumber = (val) => (
            <div className={styles.fieldWrapper}>
                {val}

                <div className={styles.selectWrapper}>
                    <Checkbox
                        checked={filter.greater_than}
                        handleCheck={() => {
                            setFilter(prevState => {
                                return {...baseProps, ...{value: prevState.value, greater_than: true}}
                            })
                        }}/>
                    Maior que.
                </div>
                <div className={styles.selectWrapper}>
                    <Checkbox
                        checked={filter.less_than}
                        handleCheck={() => {
                            setFilter(prevState => {
                                return {...baseProps, ...{value: prevState.value, less_than: true}}
                            })
                        }}
                    />

                    Menor que.
                </div>
                <div className={styles.selectWrapper}>
                    <Checkbox
                        checked={filter.equal_to}
                        handleCheck={() => {
                            setFilter(prevState => {
                                return {...baseProps, ...{value: prevState.value, equal_to: true}}
                            })
                        }}
                    />
                    Iqual a
                </div>
            </div>
        )
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
                                checked={filter.equal_to}
                                handleCheck={() => {
                                    setFilter(prevState => {
                                        return {...baseProps, ...{value: prevState.value, equal_to: true}}
                                    })
                                }}/>
                            É igual a.
                        </div>
                        <div className={styles.selectWrapper}>
                            <Checkbox
                                checked={filter.different_from}
                                handleCheck={() => {
                                    setFilter(prevState => {
                                        return {...baseProps, ...{value: prevState.value, different_from: true}}
                                    })
                                }}
                            />
                            Não é.
                        </div>
                        <div className={styles.selectWrapper}>
                            <Checkbox
                                checked={filter.contains}
                                handleCheck={() => {
                                    setFilter(prevState => {
                                        return {...baseProps, ...{value: prevState.value, contains: true}}
                                    })
                                }}
                            />
                            Contém.
                        </div>
                    </div>
                )
                break
            }
            case 'number': {
                field = dateNumber((
                    <TextField
                        label={filter.label} width={'100%'} disabled={false} required={false}
                        handleChange={value => handleChange(value.target.value)}
                        type={'number'} placeholder={filter.label}
                        value={filter.value}
                    />
                ))
                break
            }
            case 'object': {
                field = (
                    <Selector
                        keys={[{key: filter.key, label: filter.label, type: filter.subType}]}
                        hook={hook}
                        handleChange={entity => handleChange(entity)}
                        value={filter.value}
                        title={filter.label}
                        required={false}
                        placeholder={filter.label}
                        width={'100%'}/>
                )
                break
            }
            case 'date': {
                field = dateNumber((
                    <DateField
                        label={filter.label} width={'100%'} disabled={false} required={false}
                        handleChange={value => handleChange(value)}
                        value={filter.value}
                    />
                ))
                break
            }
            default :
                break

        }
        return field
    }, [filter, hook])

    return {getField, changed, setChanged, onInput, setOnInput}
}
