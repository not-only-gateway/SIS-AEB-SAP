import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './styles/Selector.module.css'
import SelectorsPT from './locales/SelectorsPT'
import SelectorModal from "./modules/SelectorModal";
import {LaunchRounded} from "@material-ui/icons";
import ListPropsTemplate from "../shared/ListPropsTemplate";
import SelectorPropsTemplate from "./templates/SelectorPropsTemplate";
import RenderListField from "../shared/RenderListField";

export default function Selector(props) {
    const [modal, setModal] = useState(false)

    const lang = SelectorsPT

    return (
        <>
            <SelectorModal {...props} modal={modal} setModal={setModal}/>

            <div
                key={props.label + '-selector'}
                style={{
                    width: props.width,
                    height: '100px',
                    display: 'grid',
                    alignItems: props.value ? 'unset' : 'flex-start',
                    gap: '4px',
                }}
            >
                <label htmlFor={'select-' + props.label} className={styles.labelContainer}
                       style={{
                           visibility: props.selected !== null && props.selected !== undefined ? 'visible' : 'hidden',
                           opacity: props.selected !== null && props.selected !== undefined ? '1' : '0',
                           transition: 'visibility 0.2s ease,opacity 0.2s ease',
                           textTransform: 'capitalize'
                       }}>{props.label}</label>

                <div className={styles.dropDownContainer}>
                    <button
                        id={'select-' + props.label}
                        disabled={props.disabled}

                        style={{
                            height: '56px', borderRadius: '5px',
                            cursor: props.disabled ? 'unset' : 'pointer',
                            textTransform: props.selected === null || !props.selected ? 'capitalize' : undefined,
                            boxShadow: props.disabled ? 'none' : undefined,
                            border: props.disabled ? '#e0e0e0 1px solid' : undefined,
                            background: props.disabled ? 'white' : undefined

                        }}
                        className={styles.selectContainer}

                        onClick={() => setModal(true)}
                    >

                        {props.selected !== null && props.selected !== undefined ?
                            props.fields.map((field, i) => (
                                <React.Fragment key={i + '-field-selector'}>
                                    {i > 0 ? <div className={styles.divider}/> : null}

                                    <div className={styles.overflow} style={{
                                        width: (100 / props.fields.length) + '%',
                                        color: typeof field.getColor === 'function' ? field.getColor(props.entity[field.name]) : undefined,
                                        textTransform: field.capitalize ? 'capitalize' : undefined,
                                        textAlign: 'center'
                                    }}>

                                        {RenderListField(field, props.selected)}
                                        <div style={{fontWeight: 'bold', fontSize: '.7rem', textTransform: 'capitalize'}}>
                                            {props.labels[i]}
                                        </div>
                                    </div>
                                </React.Fragment>
                            )) : props.label}
                        <LaunchRounded style={{fontSize: '1.2rem'}}/>
                    </button>

                </div>

                <label htmlFor={'select-' + props.label} className={styles.alertLabel}
                       style={{
                           color: props.selected === null || props.selected === undefined ? '#ff5555' : '#262626',
                           visibility: props.required ? 'visible' : 'hidden',
                       }}>{lang.required}</label>

            </div>
        </>
    )
}

Selector.propTypes = SelectorPropsTemplate

