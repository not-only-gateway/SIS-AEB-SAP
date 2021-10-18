import React, {useState} from 'react'
import styles from './styles/Selector.module.css'
import SelectorsPT from './locales/SelectorsPT'
import SelectorModal from "./modules/SelectorModal";
import {LaunchRounded} from "@material-ui/icons";
import PropTypes from "prop-types";
import shared from '../shared/Input.module.css'
import Row from "./modules/Row";
import Modal from "../../misc/modal/Modal";

export default function Selector(props) {
    const [open, setOpen] = useState(false)
    const [openCreate, setOpenCreate] = useState(false)
    const lang = SelectorsPT

    return (
        <>

            <SelectorModal
                {...props} open={props.open === true ? props.open : open}
                onCreate={() => setOpenCreate(true)}
                setOpen={props.handleClose ? props.handleClose : setOpen}/>
            <div
                style={{
                    width: props.width,
                    display: 'grid',
                    gap: '4px'
                }}
            >
                <div
                    className={shared.labelContainer}
                    style={{
                        visibility: props.value !== null && props.value !== undefined ? 'visible' : 'hidden',
                        opacity: props.value !== null && props.value !== undefined ? '1' : '0',
                        transition: 'visibility 0.2s ease,opacity 0.2s ease',
                        textTransform: 'capitalize',
                        color: props.disabled ? '#666666' : undefined
                    }}
                >
                    {props.title}
                </div>


                <button
                    disabled={props.disabled}
                    style={{
                        textTransform: props.value === null || !props.value ? 'capitalize' : undefined
                    }}
                    className={styles.button}
                    onClick={() => setOpen(true)}
                >

                    {props.value !== null && props.value !== undefined ?
                        <Row disabled={true} data={props.value} keys={props.keys}/>
                        :
                        props.placeholder
                    }
                    <LaunchRounded style={{fontSize: '1.2rem', display: props.disabled ? 'none' : undefined}}/>
                </button>
                <div className={shared.alertLabel}
                     style={{
                         color: props.value === null || props.value === undefined ? '#ff5555' : '#262626',
                         visibility: props.required ? 'visible' : 'hidden',
                     }}>{lang.required}</div>
            </div>
            <Modal
                open={openCreate}
                handleClose={() => setOpenCreate(false)}
                animationStyle={'fade'}
                blurIntensity={.1}
                wrapperClassName={styles.createModal}
            >
                {typeof props.children === 'function' ? props.children(() => {
                    setOpenCreate(false)
                    props.hook.clean()
                }) : undefined}
            </Modal>
        </>
    )
}

Selector.propTypes = {
    children: PropTypes.func,

    hook: PropTypes.object.isRequired,

    title: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    value: PropTypes.object,
    handleChange: PropTypes.func,
    disabled: PropTypes.bool,
    width: PropTypes.string,
    createOption: PropTypes.bool,

    keys: PropTypes.arrayOf(PropTypes.shape({
        key: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.oneOf(['string', 'number', 'object', 'date']),
        maskStart: PropTypes.any,
        maskEnd: PropTypes.any,
        additionalWidth: PropTypes.string
    })).isRequired,

    open: PropTypes.bool,
    handleClose: PropTypes.func
}

