import React from "react";
import PropTypes from 'prop-types'
import {AddRounded} from "@material-ui/icons";
import styles from "../styles/List.module.css";


export default function ListContent(props) {
    const renderField = (field) => {
        let res = null
        switch (field.type) {
            case 'string': {
                res = (field.maskStart ? field.maskStart : '') + props.entity[field.name]
                break
            }
            case 'number': {
                const value = props.entity[field.name].toString()

                res = (field.maskStart ? field.maskStart : '') + value.substring(0, value.length - 3) + '.' + value.substring(value.length - 3, value.length)
                break
            }
            case 'bool': {
                res = (field.maskStart ? field.maskStart : '') + JSON.stringify(props.entity[field.name])
                break
            }
            case 'date': {
                res = (field.maskStart ? field.maskStart : '') + (new Date(props.entity[field.name]).toLocaleDateString())
                break
            }
            default:
                break
        }
        return res
    }
    return (
        <button
            disabled={!props.create && props.onlyCreate} id={('*-' + props.index)}
            className={[styles.rowContainer, styles.fadeIn].join(' ')}
            onClick={event => {
                props.setEntity()
                props.clickEvent(event, props.create)
            }}
            style={{
                animationDuration: '250ms',
                borderBottom: props.isLast || props.dataLength === 0 ? '#ecedf2 1px solid' : undefined
            }}
        >
            <AddRounded style={{
                color: '#555555',
                display: !props.create ? 'none' : undefined
            }}/>

            {
                props.create ?
                    (props.createOptionLabel !== undefined ? props.createOptionLabel : props.lang.create)
                    :
                    <div className={styles.row}>
                        {props.fields.map((field, i) => (
                            <>
                                {i > 0 ? <div className={styles.divider}/> : null}

                                <div className={styles.overflow}>
                                    {renderField(field)}
                                    <div className={styles.label}>
                                        {field.label}
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
            }
        </button>

    )


}

ListContent.propTypes = {
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
        type: PropTypes.oneOf(['bool', 'string', 'number','date']),
        maskStart: PropTypes.string,
        label: PropTypes.string
    })),
}
