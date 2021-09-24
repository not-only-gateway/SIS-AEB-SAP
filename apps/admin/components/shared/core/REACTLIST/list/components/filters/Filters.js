import PropTypes from 'prop-types'
import Modal from "../../../../modal/Modal";
import styles from '../../styles/Filters.module.css'
import {useCallback, useMemo, useState} from "react";
import DateField from "../../../../date/DateField";
import TextField from "../../../../text/TextField";
import {normalizeRouteRegex} from "next/dist/lib/load-custom-routes";
import {CheckRounded} from "@material-ui/icons";
import Form from "../../../../form/Form";
import useFilters from "../../hook/useFilters";

export default function Filters(props) {
    const {getField, filters, setFilters, applied, changed, setApplied, setChanged, onInput, setOnInput} = useFilters()

    return (
        <Modal open={props.open} handleClose={() => {
            props.handleClose()
            setOnInput(undefined)
        }} blurIntensity={onInput ? .1 : 0}
               animationStyle={'fade'} wrapperClassName={styles.container}
               componentStyle={{boxShadow: !onInput ? undefined : 'none'}}
        >

            <div className={styles.header}>
                Filtros

            </div>

            {onInput ?
                <div style={{display: 'grid', alignContent: 'space-between', height: 'calc(100% - 32px)'}}>
                    {getField(props.keys.find(e => e.key === onInput))}
                    <div style={{display: 'flex', gap: '4px'}}>
                        <button
                            className={[styles.baseButton, styles.cancelButton].join(' ')}
                            onClick={() => {
                                setOnInput(undefined)
                                if (filters[onInput] !== undefined)
                                    setFilters(prevState => {
                                        return {...prevState, [onInput]: undefined}
                                    })
                            }}>
                            Cancelar
                        </button>
                        <button
                            className={styles.baseButton}
                            disabled={!changed}
                            onClick={() => {
                                props.clean()
                                let newFilters = [...props.filters]
                                const element = props.keys.find(e => e.key === filters.key)
                                newFilters.push({
                                    ...filters,
                                    type: element.type,
                                    label: element.label
                                })
                                setOnInput(undefined)
                                props.setFilters(newFilters)

                                setFilters({})
                                setApplied(!applied)
                                setChanged(false)
                            }}>
                            <CheckRounded/>
                            Aplicar
                        </button>
                    </div>
                </div>
                :
                <div className={styles.fields} >
                    {props.keys.map(e => (

                        <button
                            className={styles.fieldContainer}
                            onClick={() => setOnInput(e.key)}
                        >
                            {e.label}
                        </button>
                    ))}
                </div>
            }
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