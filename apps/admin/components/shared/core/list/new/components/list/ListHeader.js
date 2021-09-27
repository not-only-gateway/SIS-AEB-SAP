import PropTypes from 'prop-types'
import styles from '../../styles/Header.module.css'
import React, {useState} from "react";
import Filter from "./Filter";
import ToolTip from "../../../../misc/tooltip/ToolTip";
import {CloseRounded, FilterListRounded} from "@material-ui/icons";
import Dropdown from "./Dropdown";

export default function ListHeader(props){
    const [open, setOpen] = useState(false)
    const [selectedField, setSelectedField] = useState(null)


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
                            label: e.label,
                            onClick: () => {
                                const selected = props.keys.find(key => key.key === e.key)
                                setSelectedField({
                                    ...{
                                        key: e.key,
                                        value: '',
                                        type: selected.type,
                                        label: selected.label
                                    },
                                    ...selected.type === 'string' ? {contains: true} : {}
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

                {props.filters.map(e => (
                    <div className={[styles.filter, styles.filterWrapper].join(' ')}>
                        <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                            {e.label}:
                        </div>
                        <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.75rem'}}>
                            {e.type === 'date' ? new Date(e.value).toDateString() : e.value}
                        </div>
                        <ToolTip>
                            <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                                {e.label}:
                            </div>
                            <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.75rem'}}>
                                {e.type === 'date' ? new Date(e.value).toDateString() : e.value}
                            </div>
                        </ToolTip>
                        <button className={[styles.filter, styles.removeButton].join(' ')}>
                            <CloseRounded style={{fontSize: '1.1rem'}}/>
                        </button>
                    </div>
                ))
                }

            </div>
        </>
    )
}

ListHeader.propTypes={
    title: PropTypes.any,
    setFilters: PropTypes.func,
    filters: PropTypes.array,
    cleanState: PropTypes.func,
    keys: PropTypes.array
}