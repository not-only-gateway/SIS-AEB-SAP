import PropTypes from 'prop-types'
import styles from '../../styles/Header.module.css'
import React, {useState} from "react";
import Filter from "./Filter";
import ToolTip from "../../../misc/tooltip/ToolTip";
import {
    AddRounded,
    CalendarTodayRounded,
    CategoryRounded,
    CloseRounded,
    FilterListRounded, PlusOneRounded, SettingsRounded, TableChartRounded,
    TextFieldsRounded, ViewColumnRounded
} from "@material-ui/icons";
import Dropdown from "./Dropdown";
import useHeader from "../../hook/useHeader";

export default function ListHeader(props) {
    const {getType, parseDate, open, setOpen, selectedField, setSelectedField, getField, getHiddenField} = useHeader(props.dispatch, props.actions)

    return (
        <>
            <div className={styles.header}>
                {props.title}
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>

                    <button
                        className={[styles.filter, styles.secondaryButton].join(' ')}
                        onClick={() => props.setOpenSettings(true)}
                    >
                        Configurações
                        <SettingsRounded style={{fontSize: '1.3rem'}}/>
                    </button>
                    <Dropdown
                        buttonClassname={[styles.filter, styles.secondaryButton].join(' ')}
                        disabled={false} label={(
                        <div className={styles.dropdownLabel}>
                            Filtros
                            <FilterListRounded style={{fontSize: '1.3rem'}}/>
                        </div>
                    )}
                        buttons={props.keys.map(e => getField(e))}
                    />
                    <button style={{display: props.createOption ? undefined : 'none'}} onClick={() => props.onCreate()}
                            className={styles.filter}>
                        <AddRounded/>
                    </button>
                </div>
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
    dispatch: PropTypes.func,
    actions: PropTypes.object,

    title: PropTypes.any,
    setFilters: PropTypes.func,
    filters: PropTypes.array,

    cleanState: PropTypes.func,
    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date', 'bool']),
        getColor: PropTypes.func,
        subfieldKey: PropTypes.string,

        maskStart: PropTypes.any,
        maskEnd: PropTypes.any,
        additionalWidth: PropTypes.string
    })).isRequired,

    setOpenSettings: PropTypes.func,

    createOption: PropTypes.bool,
    onCreate: PropTypes.func
}
