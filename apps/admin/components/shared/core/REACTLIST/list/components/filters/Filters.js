import PropTypes from 'prop-types'
import Modal from "../../../../modal/Modal";
import styles from '../../styles/Filters.module.css'
import {useCallback, useMemo, useState} from "react";
import DateField from "../../../../date/DateField";
import TextField from "../../../../text/TextField";
import {normalizeRouteRegex} from "next/dist/lib/load-custom-routes";
import {CheckRounded} from "@material-ui/icons";
import Form from "../../../../form/Form";

export default function Filters(props) {
    const [applied, setApplied] = useState(false)
    const [changed, setChanged] = useState(false)
    const [filters, setFilters] = useState({})
    const forms = useMemo(() => {
        let dateFields = []
        let textFields = []
        props.keys.forEach(e => {
            if (e.type === 'date')
                dateFields.push(e)
            else
                textFields.push(e)
        })
        return [...dateFields, ...textFields]
    }, [props.keys])
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
                    <TextField
                        label={key.label} width={'calc(50% - 16px)'} disabled={false}
                        handleChange={value => handleChange(value.target.value, key.key)}
                        value={filters[key.key]}
                        placeholder={key.label}
                    />
                )
                break
            }
            case 'number': {
                field = (
                    <TextField
                        label={key.label} width={'calc(50% - 16px)'} disabled={false} required={false}
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

    return (
        <Modal open={props.open} handleClose={props.handleClose} blurIntensity={.1}
               animationStyle={'slide-right'} wrapperClassName={styles.container}
        >
            <div className={styles.header}>
                Filtros
                <button
                    className={styles.applyButton}
                    disabled={!changed}
                    onClick={() => {
                        props.clean()
                        let newFilters = []
                        Object.keys(filters).forEach((e) => {
                            const element = props.keys.find(i => i.key === e)
                            if (element.type !== 'string' || (element.type === 'string' && filters[e].length > 0))
                                newFilters.push({
                                    key: e,
                                    value: filters[e],
                                    type: element.type,
                                    label: element.label
                                })
                        })

                        props.setFilters(newFilters)
                        setApplied(!applied)
                        setChanged(false)
                    }}>
                    <CheckRounded/>
                    Aplicar
                </button>
            </div>
            <div className={styles.fields}>
                <Form noHeader={true} forms={[
                    {child: forms.map(e => getField(e))}
                ]}/>
            </div>
        </Modal>
    )
}

Filters.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,

    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date']),
        maskStart: PropTypes.any,
        maskEnd: PropTypes.any
    })).isRequired,
    actions: PropTypes.object,
    filters: PropTypes.array
}