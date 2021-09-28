import PropTypes from 'prop-types'
import styles from '../../styles/Header.module.css'
import React, {useState} from "react";
import Filter from "./Filter";
import ToolTip from "../../../misc/tooltip/ToolTip";
import {
    CalendarTodayRounded,
    CategoryRounded,
    CloseRounded,
    FilterListRounded,
    TextFieldsRounded
} from "@material-ui/icons";
import Dropdown from "./Dropdown";

export default function ListHeader(props) {
    const [open, setOpen] = useState(false)
    const [selectedField, setSelectedField] = useState(null)

    const getIcon = (type) => {
        let icon
        switch (type) {
            case 'date': {
                icon = <CalendarTodayRounded style={{fontSize: '1.2rem'}}/>
                break
            }

            case 'string': {
                icon = <TextFieldsRounded style={{fontSize: '1.2rem'}}/>
                break
            }

            default: {
                icon = <CategoryRounded style={{fontSize: '1.2rem'}}/>
                break
            }
        }

        return icon
    }
    const getType = (object) => {
        let label
        if (object.greater_than)
            label = 'maior que'
        if (object.less_than)
            label = 'menor que'
        if (object.equal_to)
            label = 'igual a'
        if (object.contains)
            label = 'contém'
        if (object.different_from)
            label = 'diferente de'
        return label
    }
    const parseDate = (val) => {
        const date = new Date(val)
        return `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }
    return (
        <>
            <div className={styles.header}>
                {props.title}
                <Dropdown
                    buttonClassname={styles.filter}
                    disabled={false} label={(
                    <div className={styles.dropdownLabel}>
                        Filtros
                        <FilterListRounded/>
                    </div>
                )}
                    buttons={props.keys.map(e => {
                        return {
                            icon: getIcon(e.type),
                            label: e.label,
                            onClick: () => {
                                const selected = props.keys.find(key => key.key === e.key)
                                setSelectedField({
                                    ...{
                                        key: e.key,
                                        value: undefined,
                                        type: selected.type,
                                        label: selected.label
                                    },
                                    ...selected.type === 'string' ? {contains: true} : {greater_than: true}
                                })
                                setOpen(true)
                            }
                        }
                    })}
                />
            </div>

            <div className={styles.activeFiltersContainer}>
                <Filter
                    open={open} handleClose={() => setOpen(false)}
                    setFilters={props.setFilters} filters={props.filters}
                    cleanState={props.cleanState} selectedField={selectedField}
                    setSelectedField={setSelectedField} keys={props.keys}
                    applyFilter={() => {
                        setOpen(false)
                        props.cleanState()
                        props.setFilters(prevState => {
                            return [
                                ...prevState,
                                selectedField
                            ]
                        })
                        setSelectedField(null)
                    }}
                />

                {props.filters.map((e, i) => (
                    <div className={[styles.filter, styles.filterWrapper].join(' ')}>
                        <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                            {e.label}
                        </div>
                        <div className={styles.overflow} style={{fontSize: '.7rem'}}>
                            {getType(e)}
                        </div>
                        <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                            {e.type === 'date' ? parseDate(e.value) : e.value}
                        </div>
                        <ToolTip>
                            <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                                {e.label}:
                            </div>
                            <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.7rem'}}>
                                {getType(e)}
                            </div>

                            <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                                {e.type === 'date' ? parseDate(e.value) : e.value}
                            </div>
                        </ToolTip>
                        <button className={[styles.filter, styles.removeButton].join(' ')} onClick={() => {
                            props.cleanState()
                            let newFilters = [...props.filters]
                            newFilters.splice(i, 1)
                            props.setFilters(newFilters)
                        }}>
                            <CloseRounded style={{fontSize: '1.1rem'}}/>
                        </button>
                    </div>
                ))
                }

            </div>
        </>
    )
}

ListHeader.propTypes = {
    title: PropTypes.any,
    setFilters: PropTypes.func,
    filters: PropTypes.array,

    cleanState: PropTypes.func,
    keys: PropTypes.array
}
