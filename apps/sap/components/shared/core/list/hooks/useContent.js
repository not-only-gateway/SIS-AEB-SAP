import React, {useMemo} from "react";
import Loader from "../modules/Loader";
import EmptyListIndicator from "../modules/EmptyListIndicator";
import ListContent from "../modules/ListContent";
import PropTypes from 'prop-types'
import ListPropsTemplate from "../../shared/ListPropsTemplate";
import ListLabels from "../modules/ListLabels";

export default function useContent(props) {
    const sortedData = useMemo(() => {
        let newData = props.data[props.currentPage] !== undefined ? [...props.data[props.currentPage]] : []
        props.sorts.forEach(e => {
            switch (e.type) {
                case 'descending': {
                    const compare = (a, b) => {
                        let fA
                        let fB

                        if (e.variant === 'object') {
                            fA = a[e.field][e.subfield].toString().toUpperCase()
                            fB = b[e.field][e.subfield].toString().toUpperCase()
                        } else {
                            fA = e.variant === 'string' ? a[e.field].toString().toUpperCase() : a[e.field]
                            fB = e.variant === 'string' ? b[e.field].toString().toUpperCase() : b[e.field]
                        }
                        if (fA < fB)
                            return 1;
                        if (fA > fB)
                            return -1;
                        return 0;
                    }

                    newData.sort(compare);
                    break
                }
                case 'ascending': {

                    const compare = (a, b) => {
                        let fA
                        let fB

                        if (e.variant === 'object') {
                            fA = a[e.field][e.subfield].toString().toUpperCase()
                            fB = b[e.field][e.subfield].toString().toUpperCase()
                        } else {
                            fA = e.variant === 'string' ? a[e.field].toString().toUpperCase() : a[e.field]
                            fB = e.variant === 'string' ? b[e.field].toString().toUpperCase() : b[e.field]
                        }
                        if (fA < fB)
                            return -1;
                        if (fA > fB)
                            return 1;
                        return 0;
                    }

                    newData.sort(compare);
                    break
                }
                default:
                    break
            }
        })
        return newData
    }, [props.sorts, props.data])

    const content = useMemo(() => {
        let c

        if (props.loading)
            c = [...new Array(3)].map(() => <Loader/>)
        else {
            if (props.data.length === 0 || props.data[0] === undefined || props.data[0].length === 0)
                c = <EmptyListIndicator/>
            else
                c = sortedData.map((entity, index) => <ListContent
                    index={index} entity={entity}
                    setEntity={() => props.setEntity(entity)}
                    checked={props.selected.includes(props.data[props.currentPage].indexOf(entity))}
                    handleCheck={checked => {
                        if (!checked)
                            props.setSelected([...props.selected, ...[props.data[props.currentPage].indexOf(entity)]])
                        else {
                            let i
                            let newSelected = [...props.selected]
                            newSelected.find((e, iS) => {
                                if (e === props.data[props.currentPage].indexOf(entity))
                                    i = iS
                            })
                            newSelected.splice(i, 1)
                            props.setSelected(newSelected)
                        }
                    }}
                    fields={props.fields} noSelect={props.noSelect}
                    clickEvent={props.clickEvent}
                    isLast={props.data[props.currentPage].indexOf(entity) === (props.data[props.currentPage].length - 1)}
                />)
        }

        return c
    }, [props.currentPage, props.loading, props.selected, sortedData])

    const labels = useMemo(() => {
        return props.labels.map((e, i) => <ListLabels sorts={props.sorts} setSorts={props.setSorts} data={props.data}
                                                      index={i} label={e}
                                                      fields={props.fields}/>)
    }, [props.sorts])

    return {content, labels}
}

useContent.propTypes = {
    ...ListPropsTemplate,
    data: PropTypes.array,
    currentPage: PropTypes.number,
    loading: PropTypes.bool,
    selected: PropTypes.array,
    setSelected: PropTypes.func,
    sorts: PropTypes.array
}