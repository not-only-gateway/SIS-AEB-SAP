import React from "react";
import PropTypes from 'prop-types'
import {AddRounded} from "@material-ui/icons";
import styles from "../styles/List.module.css";


export default function ListContent(props) {
    const renderField = (field) => {
        let res = null
        switch (field.type) {
            case 'string': {
                res = (field.maskStart ? field.maskStart : '') + props.entity[field.name] + (field.maskEnd ? field.maskEnd : '')
                break
            }
            case 'number': {

                let parts = props.entity[field.name].toString().split(".")
                parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".")


                res = (field.maskStart ? field.maskStart : '') + (parts.join(".")) + (field.maskEnd ? field.maskEnd : '')
                break
            }
            case 'bool': {
                res = (field.maskStart ? field.maskStart : '') + (props.entity[field.name] ? 'Sim' : 'Não') + (field.maskEnd ? field.maskEnd : '')
                break
            }
            case 'date': {
                res = (field.maskStart ? field.maskStart : '') + (new Date(props.entity[field.name]).toLocaleDateString()) + (field.maskEnd ? field.maskEnd : '')
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
                borderBottom: props.isLast || props.dataLength === 0 ? '#ecedf2 1px solid' : 'transparent 1px solid'
            }}
        >

            {props.create ?
                <div className={styles.row} style={{display: 'flex', justifyContent: 'center', gap: '4px'}}>
                    <AddRounded style={{
                        color: '#555555'
                    }}/>
                </div>
                :
                <div className={styles.row} id={('*-' + props.index) + '-row'}>
                    {props.fields.map((field, i) => (
                        <>
                            {i > 0 ? <div className={styles.divider}/> : null}

                            <div className={styles.overflow} style={{
                                width: (100 / props.fields.length) + '%',
                                color: typeof field.getColor === 'function' ? field.getColor(props.entity[field.name]) : undefined,
                                textTransform: field.capitalize ? 'capitalize' : undefined
                            }} id={('*-' + props.index) + '-field'}>
                                {renderField(field)}
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
        type: PropTypes.oneOf(['bool', 'string', 'number', 'date']),
        maskStart: PropTypes.string,
        label: PropTypes.string,
        getColor: PropTypes.func,
        maskEnd: PropTypes.string,
        capitalize: PropTypes.string
    })),
}
