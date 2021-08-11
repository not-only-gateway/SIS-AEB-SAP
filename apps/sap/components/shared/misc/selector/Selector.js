import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './styles/Selector.module.css'
import SelectorsPT from './locales/SelectorsPT'
import SelectorModal from "./SelectorModal";
import {LaunchRounded} from "@material-ui/icons";

export default function Selector(props) {
    const [modal, setModal] = useState(false)
    const renderField = () => {
        let res = null
        const field = props.fields[0]
        if (props.selected !== undefined && props.selected !== null)
            switch (field.type) {
                case 'string': {
                    res = (field.maskStart ? field.maskStart : '') + props.selected[field.name]
                    break
                }
                case 'number': {
                    const value = props.selected[field.name].toString()

                    res = (field.maskStart ? field.maskStart : '') + value.substring(0, value.length - 3) + '.' + value.substring(value.length - 3, value.length)
                    break
                }
                case 'bool': {
                    res = (field.maskStart ? field.maskStart : '') + JSON.stringify(props.selected[field.name])
                    break
                }

                default:
                    break
            }
        return res
    }

    const lang = SelectorsPT

    return (
        <React.Fragment key={props.selectorKey + '-container'}>
            <SelectorModal {...props} modal={modal} setModal={setModal} renderEntity={renderField}/>

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

                        {props.selected !== null && props.selected !== undefined ? renderField(props.fields[0]) : props.label}
                        <LaunchRounded style={{fontSize: '1.2rem'}}/>
                    </button>

                </div>

                <label htmlFor={'select-' + props.label} className={styles.alertLabel}
                       style={{
                           color: props.selected === null || props.selected === undefined ? '#ff5555' : '#262626',
                           visibility: props.required ? 'visible' : 'hidden',
                       }}>{lang.required}</label>

            </div>
        </React.Fragment>
    )
}

Selector.propTypes = {
    searchFieldName: PropTypes.string,
    width: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({

        name: PropTypes.string,
        type: PropTypes.oneOf(['bool', 'string', 'text']),
        maskStart: PropTypes.string,
        label: PropTypes.string
    })),
    elementRootID: PropTypes.string,
    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string,
    selectorKey: PropTypes.any,
    handleChange: PropTypes.func,
    selected: PropTypes.any,
    label: PropTypes.string,

    getEntityKey: PropTypes.func,

    required: PropTypes.bool,
    setChanged: PropTypes.func,
    disabled: PropTypes.bool,
}

