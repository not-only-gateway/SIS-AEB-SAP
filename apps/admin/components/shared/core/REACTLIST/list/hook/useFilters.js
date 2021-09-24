import {useCallback, useMemo, useState} from "react";
import TextField from "../../../text/TextField";
import DateField from "../../../date/DateField";
import Checkbox from "../components/table/Checkbox";

export default function useFilters() {
    const [onInput, setOnInput] = useState(undefined)
    const [applied, setApplied] = useState(false)
    const [changed, setChanged] = useState(false)
    const [filters, setFilters] = useState({})

    const handleChange = (value, key) => {
        const newValue = {...filters}
        newValue[key] = value
        setChanged(true)
        setApplied(false)
        setFilters(newValue)
    }
    const getField = useCallback((key) => {
        let field
        switch (key.type) {
            case 'string': {
                field = (
                    <div>
                        <TextField
                            label={key.label} width={'100%'} disabled={false}
                            handleChange={value => handleChange(value.target.value, key.key)}
                            value={filters[key.key]}
                            placeholder={key.label}
                        />

                        <div style={{display: 'flex', gap: '4px', width: '50%', justifyContent: 'space-between'}}>
                            <div>
                                É igual a
                            </div>
                            <Checkbox checked={false}/>
                        </div>
                        <div style={{display: 'flex', gap: '4px', width: '50%', justifyContent: 'space-between'}}>
                            <div>
                                Não é
                            </div>
                            <Checkbox checked={false}/>
                        </div>
                        <div style={{display: 'flex', gap: '4px', width: '50%', justifyContent: 'space-between'}}>
                            <div>
                                Contém
                            </div>
                            <Checkbox checked={false}/>
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