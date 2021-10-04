import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from './styles/Switcher.module.css'

export default function Switcher(props) {
    const ref = useRef()
    const [currentChild, setCurrentChild] = useState(props.openChild)

    const handleEnter = () => {
        ref.current.classList.add(styles.exitA)
        ref.current.addEventListener('animationend', function switcher(e) {
            setCurrentChild(props.openChild)
            ref.current.classList.remove(styles.exitA)
            ref.current.classList.add(styles.enterA)

            e.currentTarget.removeEventListener('animationend', switcher)
        })
    }
    useEffect(() => {
        if (props.openChild !== currentChild && props.openChild <= React.Children.toArray(props.children).length)
            handleEnter()

    }, [props.openChild])

    return (

        <div ref={ref} style={{height: '100%', width: '100%'}}>
            {React.Children.toArray(props.children).map((c, i) => i !== currentChild ? null : (
                <div key={i + '-child'} id={i + '-child'} style={{height: '100%', width: '100%'}}>
                    {c}
                </div>
            ))}
        </div>
    )
}

Switcher.propTypes = {
    children: PropTypes.node,
    openChild: PropTypes.number
}