import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import animations from '../styles/Animations.module.css'

export default function AnimationFrame(props) {
    const [isInRender, setIsInRender] = useState(false)
    const ref = useRef()
    useEffect(() => {
        if (isInRender && !props.render) {
            ref.current.classList.remove(animations.fadeIn)
            ref.current.classList.add(animations.fadeOutAnimation)

            ref.current.addEventListener('animationend', () => {
                setIsInRender(false)
            }, {once: true});

        } else if (!isInRender && props.render) {
            setIsInRender(true)
            ref.current.classList.remove(animations.fadeOutAnimation)
            ref.current.classList.add(animations.fadeIn)
        }
    }, [props.render])

    return (
        <div
            ref={ref}
            style={{display: isInRender ? undefined : 'none'}}
        >
            {props.children}
        </div>
    )
}

AnimationFrame.propTypes = {

    render: PropTypes.bool,
    children: PropTypes.node
}
