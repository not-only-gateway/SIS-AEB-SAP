import React, {useState} from 'react'
import styles from './styles/Selector.module.css'
import SelectorsPT from './locales/SelectorsPT'
import SelectorModal from "./modules/SelectorModal";
import {LaunchRounded} from "@material-ui/icons";
import RenderListField from "../shared/RenderListField";
import ListPropsTemplate from "../shared/ListPropsTemplate";
import PropTypes from "prop-types";
import shared from '../../core/shared/styles/Input.module.css'

export default function Selector(props) {
    const [modal, setModal] = useState(false)

    const lang = SelectorsPT

    return (
        <>
            <SelectorModal {...props} modal={modal} setModal={setModal}/>

            <div
                style={{
                    width: props.width,
                    // overflow: 'hidden',
                    height: 'fit-content',
                    display: 'grid',
                    alignItems: props.value ? 'unset' : 'flex-start',
                    gap: '4px',
                }}
            >
                <div className={shared.labelContainer}
                     style={{
                         visibility: props.selected !== null && props.selected !== undefined ? 'visible' : 'hidden',
                         opacity: props.selected !== null && props.selected !== undefined ? '1' : '0',
                         transition: 'visibility 0.2s ease,opacity 0.2s ease',
                         textTransform: 'capitalize',
                         color: props.disabled ? '#666666' : undefined
                     }}>{props.label}</div>

                <div className={styles.dropDownContainer} style={{maxWidth: '100%',}}>
                    <button
                        id={'select-' + props.label}
                        disabled={props.disabled}

                        style={{
                            height: '56px', borderRadius: '5px',
                            cursor: props.disabled ? 'unset' : 'pointer',
                            textTransform: props.selected === null || !props.selected ? 'capitalize' : undefined,
                            boxShadow: props.disabled ? 'none' : undefined,
                            border: props.disabled ? '#e0e0e0 1px solid' : undefined,
                            background: props.disabled ? 'white' : undefined,
                            maxWidth: '100%', overflow: 'hidden'
                        }}
                        className={styles.selectContainer}

                        onClick={() => setModal(true)}
                    >

                        {props.selected !== null && props.selected !== undefined ?
                            props.fields.map((field, i) => (
                                <React.Fragment key={i + '-field-selector'}>
                                    {i > 0 ? <div className={styles.divider}/> : null}

                                    <div style={{
                                        maxWidth: `calc(${(100 / props.fields.length) + '%'} - 20px)`,
                                        width: '100%',
                                        color: props.disabled ? '#999999' : undefined,
                                        textTransform: field.capitalize ? 'capitalize' : undefined,
                                        textAlign: 'center'
                                    }}>
                                        <div className={styles.overflow} style={{maxWidth: '100%'}}>
                                            {RenderListField(field, props.selected)}
                                        </div>

                                        <div style={{
                                            fontWeight: 'bold',
                                            fontSize: '.7rem',
                                            textTransform: 'capitalize'
                                        }}>
                                            {props.labels[i]}
                                        </div>
                                    </div>
                                </React.Fragment>
                            )) : props.label}


                        <LaunchRounded style={{fontSize: '1.2rem', display: props.disabled ? 'none' : undefined}}/>
                    </button>

                </div>

                <div className={shared.alertLabel}
                       style={{
                           color: props.selected === null || props.selected === undefined ? '#ff5555' : '#262626',
                           visibility: props.required ? 'visible' : 'hidden',
                       }}>{lang.required}</div>

            </div>
        </>
    )
}

Selector.propTypes = {
    ...ListPropsTemplate,
    ...{

        width: PropTypes.string,
        handleChange: PropTypes.func,
        selected: PropTypes.any,
        label: PropTypes.string,
        getEntityKey: PropTypes.func,
        labels: PropTypes.array,
        required: PropTypes.bool,
        disabled: PropTypes.bool,
        createOption: PropTypes.bool,
        children: PropTypes.node,

        returnToList: PropTypes.bool,
        setReturnToList: PropTypes.func
    }
}

