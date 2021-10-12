import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import styles from '../../styles/Dropdown.module.css'

export default function Dropdown(props) {
    const [open, setOpen] = useState(false)
    const ref = useRef()
    const handleMouseDown = (e) => {
        if (!document.elementsFromPoint(e.clientX, e.clientY).includes(ref.current))
            setOpen(false)
    }
    useEffect(() => {
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])
    return (
        <div className={styles.wrapper}>
            <button onClick={() => setOpen(true)} disabled={props.disabled} className={props.buttonClassname}>
                {props.label}
            </button>
            <div style={{
                visibility: open ? 'visible' : 'hidden',
                opacity: open ? '1' : '0',
                top: props.align === 'top' ? '0px' : undefined,
                transform: props.align === 'top' ? 'translateY(-100%)' : undefined
            }} className={styles.buttons} ref={ref}>
                {props.buttons.map((b, i) => (
                    <button key={'dropdown-' + i} disabled={b.disabled} onClick={() => {
                        b.onClick(props.onClickProps)
                        setOpen(false)
                    }} className={styles.button}>
                            {b.icon}
                        <div className={styles.buttonLabel} >
                            {b.label}
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}

Dropdown.propTypes = {
    onClickProps: PropTypes.any,
    buttonClassname: PropTypes.string,
    label: PropTypes.any,
    disabled: PropTypes.bool,
    buttons: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.any,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),

    align: PropTypes.oneOf(['top', 'bottom'])
}
