import React, {useRef} from "react";
import PropTypes from 'prop-types'
import styles from "../styles/List.module.css";
import RenderListField from "../../shared/RenderListField";
import Checkbox from "./Checkbox";


export default function ListContent(props) {
    const ref = useRef()
    return (
        <div
            id={('*-' + props.index + '-wrapper')}
            className={[styles.rowContainer, styles.fadeIn].join(' ')}
            ref={ref}
            style={{
                animationDelay: (props.index * 50) + 'ms',
                borderBottom: props.isLast ? 'none' : '#ecedf2 1px solid'
            }}
        >
            <Checkbox handleCheck={props.handleCheck} checked={props.checked} noSelect={props.noSelect}/>
            <button
                onMouseEnter={() => {
                    ref.current.style.background = '#f4f5fa'
                }}
                onMouseLeave={() => {
                    if(ref.current.style.background !== 'rgb(232, 240, 254)')
                        ref.current.style.background = ''
                }}
                onMouseDown={() => {
                    ref.current.style.background = '#E8F0FE'
                }}
                className={styles.row} id={('*-' + props.index) + '-row'}
                onClick={event => {
                    props.setEntity()
                    props.clickEvent(event, props.create)
                }}
                disabled={!props.create && props.onlyCreate}>
                {props.fields.map((field, i) => (
                    <React.Fragment key={i + '-field-' + props.index}>
                        <div className={styles.overflow} style={{
                            width: ((100 / props.fields.length) + (field.extraSize !== undefined ? field.extraSize : 0)) + '%',
                            color: typeof field.getColor === 'function' ? field.getColor(props.entity[field.name]) : undefined,
                            textTransform: field.capitalize ? 'capitalize' : undefined
                        }} id={('*-' + props.index) + '-field'}>
                            {RenderListField(field, props.entity)}
                        </div>
                    </React.Fragment>
                ))}
            </button>
        </div>
    )
}

ListContent.propTypes = {
    handleCheck: PropTypes.func,
    checked: PropTypes.bool,

    isLast: PropTypes.bool,
    createOptionLabel: PropTypes.string,
    onlyCreate: PropTypes.bool,
    index: PropTypes.number,
    entity: PropTypes.any,
    create: PropTypes.bool,
    lang: PropTypes.object,
    clickEvent: PropTypes.func,
    fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['bool', 'string', 'number', 'date', 'object']),
        subfield: PropTypes.string,
        fallback: PropTypes.string,
        maskStart: PropTypes.string,
        maskEnd: PropTypes.string,
        getColor: PropTypes.func,
        capitalize: PropTypes.bool,
        extraSize: PropTypes.number
    })),
}
