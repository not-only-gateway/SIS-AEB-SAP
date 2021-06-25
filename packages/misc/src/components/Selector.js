import React, {useState} from 'react'
import PropTypes from 'prop-types'
import styles from './styles/Selector.module.css'
import SelectorsPT from './locales/SelectorsPT'
import SelectorModal from "./templates/SelectorModal";

export default function Selector(props) {
    const [modal, setModal] = useState(false)

    const lang = SelectorsPT

    return (
        <React.Fragment key={props.selectorKey+'-container'}>
            <SelectorModal {...props} modal={modal} setModal={setModal} />

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
                           transition: 'visibility 0.2s ease,opacity 0.2s ease'
                       }}>{props.label}</label>

                <div className={styles.dropDownContainer}>
                    <button
                        id={'select-' + props.label}
                        disabled={props.disabled}

                        style={{
                            height: '56px', borderRadius: '5px',
                            cursor: props.disabled ? 'unset' : 'pointer'
                        }}
                        className={styles.selectContainer}
                        onClick={() => setModal(true)}
                    >

                        {props.selected !== null && props.selected !== undefined ? props.renderEntity(props.selected) : props.label}
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
    width: PropTypes.string,
    renderEntity: PropTypes.func,
    elementRootID: PropTypes.string,
    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string,
  selectorKey: PropTypes.any,
    handleChange: PropTypes.func,
    selected: PropTypes.any,
    label: PropTypes.string,

    required: PropTypes.bool,
    setChanged: PropTypes.func,
    disabled: PropTypes.bool,
}

