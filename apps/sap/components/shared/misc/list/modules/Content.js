import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import ListContent from "./ListContent";

export default function Content(props) {
    const [sortedData, setSortedData] = useState([])

    useEffect(() => {
        let newData = props.pageData
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
        setSortedData(props.pageData)
    }, [props.pageData, props.sorts])

    return (
        <div style={{
            display: 'grid',
            alignContent: 'flex-start',
            overflowY: 'auto',
            height: '100%',
            maxWidth: '100%'
        }}>
            {sortedData.map((entity, index) =>
                <React.Fragment key={index + '-list'}>
                    <ListContent
                        index={index} entity={entity}
                        setEntity={() => props.setEntity(entity)}
                        checked={props.selected.includes(index)} handleCheck={checked => {
                        if (!checked)
                            props.setSelected([...props.selected, ...[index]])
                        else {
                            let i
                            let newSelected = [...props.selected]
                            newSelected.find((e, iS) => {
                                if (e === index)
                                    i = iS
                            })
                            newSelected.splice(i, 1)
                            props.setSelected(newSelected)
                        }

                    }}
                        fields={props.fields} noSelect={props.noSelect}
                        clickEvent={props.clickEvent} isLast={index === (props.data.length - 1)}
                    />
                </React.Fragment>
            )}
        </div>
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