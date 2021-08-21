import React from "react";
import PropTypes from 'prop-types'
import {AddRounded} from "@material-ui/icons";
import styles from "../styles/List.module.css";
import RenderListField from "../../shared/RenderListField";


export default function ListContent(props) {

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
                borderBottom:  '#ecedf2 1px solid'
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
                        <React.Fragment key={i + '-field-' + props.entity.id}>
                            {i > 0 ? <div className={styles.divider}/> : null}

                            <div className={styles.overflow} style={{
                                width: (100 / props.fields.length) + '%',
                                color: typeof field.getColor === 'function' ? field.getColor(props.entity[field.name]) : undefined,
                                textTransform: field.capitalize ? 'capitalize' : undefined
                            }} id={('*-' + props.index) + '-field'}>
                                {RenderListField(field, props.entity)}
                            </div>
                        </React.Fragment>
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
