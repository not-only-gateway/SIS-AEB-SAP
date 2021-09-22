import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import animations from '../styles/Animations.module.css'

export default function AnimationFrame(props) {
    const [animationClass, setAnimationClass] = useState(undefined)
    const [isInRender, setIsInRender] = useState(false)

    useEffect(() => {
        if (isInRender && !props.render) {
            setAnimationClass(animations.fadeOutAnimation)
            const elementFound = document.querySelector('#content-' + props.elementKey + '\\:frame')
            if (elementFound !== null && animationClass === animations.fadeOutAnimation) {
                elementFound.addEventListener('animationend', () => {
                    setIsInRender(false)
                }, {once: true});
            }
        } else if (!isInRender && props.render) {
            setIsInRender(true)
            setAnimationClass(animations.fadeIn)
        }

    })

    if (isInRender)
        return (
            <div className={animationClass} id={'content-' + props.elementKey + ':frame'}
                 key={props.elementKey}>
                {props.children}
            </div>
        )
    else
        return null
}

AnimationFrame.propTypes = {

    render: PropTypes.bool,
    children: PropTypes.node,
    elementKey: PropTypes.any,
}
