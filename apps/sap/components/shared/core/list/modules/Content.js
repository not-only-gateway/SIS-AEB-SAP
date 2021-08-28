import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import ListContent from "./ListContent";
import styles from '../styles/List.module.css'

export default function Content(props) {
    const [sortedData, setSortedData] = useState([])

    useEffect(() => {
        console.log('REFRESHING')
        let newData = [...props.pageData]
        props.sorts.forEach(e => {
            switch (e.type) {
                case 'descending': {
                    const compare = (a, b) => {
                        let fA = e.variant === 'string' ? a[e.field].toString().toUpperCase() : a[e.field]
                        let fB = e.variant === 'string' ? b[e.field].toString().toUpperCase() : b[e.field]
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
                        let fA = e.variant === 'string' ? a[e.field].toString().toUpperCase() : a[e.field]
                        let fB = e.variant === 'string' ? b[e.field].toString().toUpperCase() : b[e.field]
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
        setSortedData(newData)
    }, [props.pageData, props.sorts])

    return (
        sortedData.map((entity, index) =>
            <React.Fragment key={index + '-list-' + props.pageData.indexOf(entity)}>
                <ListContent
                    index={index} entity={entity}
                    setEntity={() => props.setEntity(entity)}
                    checked={props.selected.includes(props.pageData.indexOf(entity))}
                    handleCheck={checked => {
                        if (!checked)
                            props.setSelected([...props.selected, ...[props.pageData.indexOf(entity)]])
                        else {
                            let i
                            let newSelected = [...props.selected]
                            newSelected.find((e, iS) => {
                                if (e === props.pageData.indexOf(entity))
                                    i = iS
                            })
                            newSelected.splice(i, 1)
                            props.setSelected(newSelected)
                        }
                    }}
                    fields={props.fields} noSelect={props.noSelect}
                    clickEvent={props.clickEvent} isLast={props.pageData.indexOf(entity) === (sortedData.length - 1)}
                />
            </React.Fragment>
        )
    )
}

Content.propTypes = {
    noSelect: PropTypes.bool,
    clickEvent: PropTypes.func,
    fields: PropTypes.array,
    data: PropTypes.array,
    setSelected: PropTypes.func,
    selected: PropTypes.array,
    setEntity: PropTypes.func,
    pageData: PropTypes.array,
    sorts: PropTypes.arrayOf(PropTypes.shape({
        field: PropTypes.string,
        type: PropTypes.oneOf(['descending', 'ascending'])
    }))
}