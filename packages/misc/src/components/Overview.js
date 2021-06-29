import PropTypes, {object, string} from 'prop-types'
import styles from "../../../../apps/admin/styles/Person.module.css";
import OverviewPT from "./locales/OverviewPT";
import {Avatar} from "@material-ui/core";
import React from 'react'

export default function Overview(props) {
    const lang = OverviewPT

    function getField(field) {
        let response = lang.unset
        if (props.entity[field.field] !== null && props.entity[field.field] !== undefined && (field.type === 'string' ? props.entity[field.field].length > 0 : true))
            switch (field.type) {
                case 'string': {
                    response = props.entity[field.field]
                    break
                }
                case 'bool': {
                    response = lang.getBool(props.entity[field.field])
                    break
                }
                case 'image': {
                    response = <Avatar src={props.entity[field.field]}/>
                    break
                }
                case 'object': {
                    response = field.renderObjectField(props.entity[field.field])
                    break
                }
                case 'date': {
                    response = (new Date(props.entity[field.field])).toLocaleDateString()
                    break
                }
                default:
                    break
            }
        return response
    }

    if (props.entity !== null && props.entity !== undefined && typeof props.entity === 'object')
        return (
            <>
                {props.fields.map(field => (
                    <div className={styles.overviewRow}>
                        <p style={{fontWeight: 600, fontSize: '.9rem'}}>{field.label}</p>
                        <p style={{fontSize: '.9rem'}}>
                            {getField(field)}
                        </p>
                    </div>
                ))}
            </>
        )
    else return null
}
Overview.propTypes = {
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string,
            label: PropTypes.string,
            type: PropTypes.oneOf(['bool', 'image', 'string', 'object', 'date']),
            renderObjectField: PropTypes.func
        })
    ),
    entity: PropTypes.object
}
