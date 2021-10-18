import Cell from "./Cell";
import PropTypes from 'prop-types'
import styles from '../../styles/Table.module.css'
import HeaderCell from "./HeaderCell";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import React, {useContext, useMemo, useRef} from 'react'
import keyTemplate from "../../templates/keyTemplate";
import {ArrowDropDownRounded, SettingsRounded} from "@material-ui/icons";
import Dropdown from "../list/Dropdown";
import ThemeContext from "../../../theme/ThemeContext";


export default function TableLayout(props) {
    const lastElementRef = useInfiniteScroll(props.setCurrentPage, props.currentPage, props.loading, props.hasMore)
    const listRef = useRef()
    const keys = useMemo(() => {
        return props.keys.filter(e => e.visible)
    }, [props.keys])
    const theme = useContext(ThemeContext)

    return (
        <table className={styles.table} ref={listRef} style={{maxHeight: props.maxHeight}}>
            <thead>
            <tr className={styles.headerRow}>
                {keys.map((e, i) => (
                    <React.Fragment key={i + '-header'}>
                        <HeaderCell
                            tableRef={listRef.current} type={e.type}
                            sorts={props.sorts} columnKey={e.key}
                            setSorts={props.setSorts} clean={props.clean}
                            additionalWidth={e.additionalWidth !== undefined ? e.additionalWidth : '0px'}
                            index={i} hasOptions={props.controlButtons !== undefined && props.controlButtons.length > 0}
                            quantity={props.keys.length}
                            value={e.label}/>
                    </React.Fragment>

                ))}
                {props.controlButtons !== undefined && props.controlButtons.length > 0 ?
                    <td
                        className={styles.cell}
                        style={{
                            height: '30px',
                            border: 'none',
                            width: `30px`
                        }}>
                        <div style={{display: 'flex', placeContent: 'center'}}>
                            <SettingsRounded style={{fontSize: '1.1rem', color: theme.themes.color3}}/>
                        </div>
                    </td> : null}
            </tr>
            </thead>

            <tbody>

            {props.data.map((e, i) => (
                <tr
                    key={'row-' + e.id}
                    className={styles.row} style={{cursor: props.onlyVisualization ? 'default' : undefined}}
                    onMouseDown={(event) => {

                        if (!props.onlyVisualization && !document.elementsFromPoint(event.clientX, event.clientY).includes(document.getElementById(('options-' + e.id))) && !event.target.className.includes('Dropdown')) {
                            event.currentTarget.style.background = theme.themes.background3
                            event.currentTarget.style.opacity = '.8'
                        }
                    }}
                    onMouseEnter={(event) => {
                        if (props.onlyVisualization) {
                            event.currentTarget.style.background = 'transparent'
                            event.currentTarget.style.opacity = '1'
                        }
                    }}
                    // onMouseUp={(event) => {
                    //     event.currentTarget.style.background = 'transparent'
                    //     event.currentTarget.style.opacity = '1'
                    // }}
                    // onMouseOut={(event) => {
                    //     event.currentTarget.style.background = 'transparent'
                    //     event.currentTarget.style.opacity = '1'
                    // }}
                    ref={i === (props.data.length - 1) ? lastElementRef : undefined}
                >
                    {keys.map((value, ic) => (
                        <React.Fragment key={i + '-row-cell-' + ic}>
                            <Cell
                                additionalWidth={value.additionalWidth !== undefined ? value.additionalWidth : '0px'}
                                entry={e.data} field={value} quantity={props.keys.length}
                                onClick={() => {
                                    if (!props.onlyVisualization)
                                        props.onRowClick(e.data)
                                }}
                                hasOptions={props.controlButtons !== undefined && props.controlButtons.length > 0}
                            />
                        </React.Fragment>
                    ))}
                    {props.controlButtons !== undefined && props.controlButtons.length > 0 ?
                        <td className={styles.cell} style={{width: '30px'}} id={'options-' + e.id}>
                            <Dropdown
                                label={<ArrowDropDownRounded style={{color: theme.themes.color3}}/>}
                                buttons={props.controlButtons}
                                align={i === (props.data.length - 1) ? 'top' : undefined}
                                onClickProps={e.data} buttonClassname={styles.optionsButton}/>
                        </td>
                        :
                        null
                    }
                </tr>
            ))}
            </tbody>
        </table>
    )
}

TableLayout.propTypes = {
    data: PropTypes.array,
    keys: PropTypes.arrayOf(keyTemplate).isRequired,

    controlButtons: PropTypes.arrayOf(PropTypes.shape({
        icon: PropTypes.element,
        label: PropTypes.any,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
    onRowClick: PropTypes.func,
    currentPage: PropTypes.number,
    setCurrentPage: PropTypes.func,
    loading: PropTypes.bool,
    hasMore: PropTypes.bool,
    sorts: PropTypes.array,
    setSorts: PropTypes.func,
    clean: PropTypes.func,
    onlyVisualization: PropTypes.bool
}
