import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
// import animations from '../styles/Animations.module.css'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const [isInRender, setIsInRender] = useState(false)
    const [style, setStyle] = useState('')

    useEffect(() => {
        const element = document.getElementById('modal-frame')

        if (isInRender && !props.open) {
            setStyle(styles.fadeOutAnimation)
        } else if (!isInRender && props.open) {
            setIsInRender(true)
            setStyle(styles.fadeIn)
        }

        if (element !== null) {
            element.addEventListener('animationend', () => {
                if (!props.open && isInRender) {
                    setIsInRender(false)
                    setStyle(styles.fadeIn)
                }
                element.removeEventListener('animationend', null)
            });
        }


        if (element !== null && props.open)
            element.addEventListener('mousedown', event => {
                if (!event.target.contains(event.relatedTarget))
                    props.handleClose(false)
            })
    })

    if (isInRender)
        return (
            <div id={'modal-frame'}
                 className={style}
                 style={{
                     ...props.styles,
                     ...{
                         overflow: 'hidden',
                         width: '100%',
                         position: 'fixed',
                         background: 'rgba(0, 0, 0, .4)',
                         height: '100%',
                         zIndex: 300,
                         bottom: 0,

                     }
                 }}>
                <div className={styles.modalContainer} id={'modal-content'}>
                    {props.children}
                </div>
            </div>
        )
    else
        return <></>
}
Modal.propTypes = {
    styles: PropTypes.object,
    children: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func
}