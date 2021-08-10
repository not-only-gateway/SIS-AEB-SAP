import PropTypes from 'prop-types'
import styles from '../styles/Tab.module.css'
import React, {useRef, useState} from "react";
import {ArrowBackRounded} from "@material-ui/icons";

export default function Horizontal(props) {
    const ref = useRef()
    const contentRef = useRef()
    const [canRender, setCanRender] = useState({
        left: undefined,
        right: undefined
    })
    return (
        <div className={styles.container} ref={contentRef}>
            <div
                className={styles.tabsContainer} ref={ref}
                onMouseEnter={() => {
                    if (((ref.current.scrollWidth > contentRef.current.offsetWidth && ref.current.scrollLeft < ref.current.offsetWidth) || (ref.current.scrollWidth > contentRef.current.offsetWidth && ref.current.scrollLeft > 0)) && (canRender.left === undefined || canRender.right === undefined))
                        setCanRender({
                            right: ref.current.scrollWidth > contentRef.current.offsetWidth && ref.current.scrollLeft < ref.current.offsetWidth,
                            left: ref.current.scrollWidth > contentRef.current.offsetWidth && ref.current.scrollLeft > 0
                        })
                }}
            >
                {canRender.left || canRender.left === false ?
                    <button className={styles.scrollButton}
                            style={{
                                left: '0',
                                borderRadius: canRender.left ? '5px 0 0 0' : undefined,
                                borderRight: canRender.left ? '#0095ff 2px solid' : 'transparent 2px solid'
                            }}
                            disabled={!canRender.left}
                            onClick={() => {
                                const newScroll = ref.current.scrollLeft - (ref.current.scrollWidth - ref.current.offsetWidth) * 0.25
                                setCanRender({
                                    left: (newScroll) > 0,
                                    right: true
                                })
                                ref.current.scroll(newScroll, 0)
                            }}>
                        <ArrowBackRounded/>
                    </button>
                    :
                    null
                }
                {props.buttons.map((button) => (button !== null ?
                        <button
                            key={button.key + ' - ' + button.value}
                            onClick={() => props.setOpenTab(button.key)}
                            disabled={button.disabled}
                            className={styles.tabButtonContainer}
                            style={{
                                borderBottom: props.openTab === button.key ? '#0095ff 2px solid' : 'transparent 2px solid'
                            }}
                        >
                            {button.value}
                        </button>
                        :
                        null
                    )
                )}
                {canRender.right || canRender.right === false ?
                    <button className={styles.scrollButton}
                            style={{
                                right: '-1px',
                                borderRadius: canRender.right ? '0 5px 0 0' : undefined,
                                borderLeft: canRender.right ? '#0095ff 2px solid' : 'transparent 2px solid'
                            }} disabled={!canRender.right}
                            onClick={() => {
                                const newScroll = ref.current.scrollLeft + (ref.current.scrollWidth - ref.current.offsetWidth) * 0.25
                                setCanRender({
                                    left: true,
                                    right: !((ref.current.scrollWidth - ref.current.offsetWidth) <= newScroll)
                                })
                                ref.current.scroll(newScroll, 0)
                            }}>
                        <ArrowBackRounded style={{transform: 'rotate(180deg)'}}/>
                    </button>
                    :
                    null
                }

            </div>

            {props.buttons.map((button) => (button !== null && props.openTab === button.key ?
                    <div className={styles.contentContainer}>
                        {button.content}
                    </div>
                    :
                    null
                )
            )}

        </div>
    )
}

Horizontal.proptypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number,
            value: PropTypes.any,
            content: PropTypes.any
        })
    ),
    setOpenTab: PropTypes.func,
    openTab: PropTypes.number,
}
