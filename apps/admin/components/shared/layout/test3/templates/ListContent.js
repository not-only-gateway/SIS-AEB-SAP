import React from "react";
import PropTypes from 'prop-types'
import {AddRounded} from "@material-ui/icons";
import styles from "../styles/List.module.css";


export default function ListContent(props) {
    return (
        <button
            className={[styles.rowContainer, styles.fadeIn].join(' ')}
            onClick={() => {
                props.setEntity()
                props.clickEvent()
            }}
            key={props.index + '-list'}
        >
            <AddRounded style={{
                color: 'black',
                display: !props.create ? 'none' : undefined
            }}/>

            {props.create ? props.lang.create :

                <div style={{display: 'flex', gap: '16px'}}>
                    <h5 style={{
                        color: '#555555',
                        marginBottom: 0,
                        marginTop: 0
                    }}>{props.entity[props.primaryLabel]}</h5>
                    {props.secondaryLabel !== undefined && props.secondaryLabel !== null ?
                        <h5 style={{
                            color: '#555555',
                            marginBottom: 0,
                            marginTop: 0
                        }}>{props.entity[props.secondaryLabel]}</h5>
                        :
                        null}
                </div>
            }
        </button>

    )
}

ListContent.propTypes = {
    entity: PropTypes.any,
    create: PropTypes.bool,
    lang: PropTypes.object,
    clickEvent: PropTypes.func,

    primaryLabel: PropTypes.string,
    secondaryLabel: PropTypes.string,
    index: PropTypes.number,
}