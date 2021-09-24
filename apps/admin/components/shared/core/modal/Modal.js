import PropTypes from "prop-types";
import React, {useEffect, useMemo, useRef, useState} from "react";
import ReactDOM from 'react-dom'
import styles from "./styles/Modal.module.css";

export default function Modal(props) {
    const contentRef = useRef()
    const element = useRef()
    const lastOpenState = useRef(props.open)
    const [mounted, setMounted] = useState(false)
    const animation = useMemo(() => {
        let anim = {
            enter: styles.fadeIn,
            exit: styles.fadeOutAnimation,
        }
        switch (props.animationStyle) {
            case 'slide-left': {
                anim = {
                    enter: styles.slideLeftEnter,
                    exit: styles.slideLeftExit,
                }
                break
            }

            case 'slide-right': {
                anim = {
                    enter: styles.slideRightEnter,
                    exit: styles.slideRightExit,
                }
                break
            }
            default:
                break

        }
        return anim
    }, [props.animationStyle])
    useEffect(() => {
            if (!mounted) {
                const newElement = document.createElement('div')
                document.body.appendChild(newElement)
                element.current = newElement

                setMounted(true)
            }
            if (props.open) {
                element.current.style.position = 'fixed'
                element.current.style.zIndex = 999
                let className
                if (lastOpenState.current !== props.open) {
                    element.current.style.opacity = 0
                    element.current.classList.add(styles.fadeIn)
                    className = animation.enter
                }
                ReactDOM.render(
                    <div
                        style={{
                            overflow: 'hidden',
                            width: '100vw',
                            position: 'fixed',
                            background: `rgba(0, 0, 0, ${props.blurIntensity !== undefined ? props.blurIntensity : .4})`,
                            height: '100vh',
                            zIndex: 300,
                            transition: '150ms linear',
                            bottom: 0,
                        }}

                        onMouseDown={e => {
                            if (!document.elementsFromPoint(e.clientX, e.clientY).includes(contentRef.current) && props.open)
                                props.handleClose()
                        }}
                    >
                        <div className={[className, props.wrapperClassName].join(' ') } style={props.componentStyle} ref={contentRef}>
                            {props.children}
                        </div>

                    </div>,
                    element.current
                )


                lastOpenState.current = true
            } else if (contentRef.current) {
                element.current.classList.add(styles.fadeOutAnimation)
                contentRef.current.classList.add(animation.exit)

                contentRef.current.addEventListener('animationend', () => {
                    ReactDOM.unmountComponentAtNode(element.current);
                    lastOpenState.current = false
                    setMounted(false)
                }, {once: true})
            }

        }
    )

    return null
}

Modal.propTypes = {
    animationStyle: PropTypes.oneOf(['slide-left', 'slide-right', 'fade']),

    blurIntensity: PropTypes.number,
    componentStyle: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    children: PropTypes.node
}
