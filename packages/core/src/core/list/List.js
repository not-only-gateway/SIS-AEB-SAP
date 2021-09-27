import PropTypes from 'prop-types'
import TableLayout from "./components/table/TableLayout";
import styles from './styles/List.module.css'
import ListHeader from "./components/list/ListHeader";
import React, {useEffect, useRef, useState} from "react";
import EmptyListIndicator from "../shared/components/EmptyListIndicator";


export default function List(props) {
    const listRef = useRef()
    const wrapperRef = useRef()
    const [maxHeight, setMaxHeight] = useState()

    useEffect(() => {
        setMaxHeight((document.documentElement.offsetHeight - wrapperRef.current.getBoundingClientRect().top - 16) + 'px')
    }, [])


    return (
        <div className={styles.container}>
            <ListHeader
                title={props.title}
                setFilters={props.hook.setFilters}
                filters={props.hook.filters}
                cleanState={props.hook.clean}
                keys={props.keys}
            />
            <div className={styles.tableWrapper} ref={wrapperRef}
                 style={{height: props.hook.data.length === 0 ? maxHeight : undefined, maxHeight: maxHeight}}>
                {props.hook.data.length === 0 ?
                    <EmptyListIndicator/>
                    :
                    null}

                <TableLayout
                    data={props.hook.data} keys={props.keys} controlButtons={props.controlButtons} maxHeight={maxHeight}
                    setCurrentPage={props.hook.setCurrentPage} currentPage={props.hook.currentPage} refresh={props.hook.refresh}
                    onRowClick={props.onRowClick} listRef={listRef} hasMore={props.hook.hasMore} loading={props.hook.loading}
                />
            </div>
        </div>
    )
}

List.propTypes = {
    hook: PropTypes.func.isRequired,
    onRowClick: PropTypes.func,
    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date']),
        maskStart: PropTypes.any,
        maskEnd: PropTypes.any,
        additionalWidth: PropTypes.string
    })).isRequired,
    controlButtons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.element,
        label: PropTypes.any,
        onClick: PropTypes.func
    })),
    title: PropTypes.any
}
