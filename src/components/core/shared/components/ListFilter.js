import styles from "../../list/styles/Header.module.css";
import Filter from "../../list/components/list/Filter";
import ToolTip from "../../misc/tooltip/ToolTip";
import {CloseRounded} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";
import keyTemplate from "../../list/templates/keyTemplate";

export default function ListFilter(props) {
    return (

        <div className={styles.activeFiltersContainer}
             style={{display: props.filters.length === 0 ? 'none' : undefined}}>
            <Filter
                open={props.open} handleClose={() => props.setOpen(false)}
                setFilters={props.setFilters} filters={props.filters}
                selectedField={props.selectedField}
                setSelectedField={props.setSelectedField} keys={props.keys}
                applyFilter={() => {
                    props.setOpen(false)
                    props.cleanState()
                    props.setFilters(prevState => {
                        return [
                            ...prevState,
                            props.selectedField
                        ]
                    })
                    props.setSelectedField(null)
                }}
            />

            {props.filters.map((e, i) => (
                <div className={[styles.filter, styles.filterWrapper].join(' ')}>
                    <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                        {e.label}
                    </div>
                    <div className={styles.overflow} style={{fontSize: '.7rem'}}>
                        {props.getType(e)}
                    </div>
                    <div className={styles.overflow} style={{fontSize: '.75rem', fontWeight: 'bold'}}>
                        {e.type === 'date' ? props.parseDate(e.value) : e.value}
                    </div>
                    <ToolTip>
                        <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                            {e.label}:
                        </div>
                        <div className={styles.overflow} style={{fontWeight: 'normal', fontSize: '.7rem'}}>
                            {props.getType(e)}
                        </div>

                        <div className={styles.overflow} style={{fontSize: '.75rem'}}>
                            {e.type === 'date' ? props.parseDate(e.value) : e.value}
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
    )
}

ListFilter.propTypes = {
    keys: PropTypes.arrayOf(keyTemplate).isRequired,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    cleanState: PropTypes.func,
    filters: PropTypes.array,
    setFilters: PropTypes.func,
    getType: PropTypes.func,
    parseDate: PropTypes.func,
    selectedField: PropTypes.object,
    setSelectedField: PropTypes.func,

}