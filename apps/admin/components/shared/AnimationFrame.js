import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import animations from '../../styles/shared/Animations.module.css'

export default function AnimationFrame(props) {
    const [animationClass, setAnimationClass] = useState(undefined)
    // const [render, setRender] = useState(true)
    useEffect(() => {
        // if (props.render)
        //     setRender(true)
        // const element = document.querySelector('div')
        switch (props.type) {
            case 'fade': {
                if (!props.render)
                    setAnimationClass(animations.fadeOutAnimation)
                else
                    setAnimationClass(animations.fadeIn)
                break
            }
            case 'slide_up': {
                if (!props.render)
                    setAnimationClass(animations.slideDownAnimation)
                else
                    setAnimationClass(animations.slideUpAnimation)
                break
            }
            case 'slide_down': {
                if (!props.render)
                    setAnimationClass(animations.slideUpAnimation)
                else
                    setAnimationClass(animations.slideDownAnimation)
                break
            }
            default:
                break
        }
        // if (element !== null && !props.render && (animationClass === animations.fadeOutAnimation)) {
        //     element.addEventListener('animationend', null)
        //     element.removeEventListener('animationend', () => {
        //         setRender(false)
        //     })
        // }
        // else
        //     setRender(true)
    }, [props.render])

        return (
            <div className={animationClass}
                 key={props.elementKey}>
                {props.children}
            </div>
        )

}

AnimationFrame.propTypes = {
    type: PropTypes.oneOf([
        'fade',
        'slide_up',
        'slide_down'
    ]),
    render: PropTypes.bool,
    children: PropTypes.object,
    elementKey: PropTypes.any,
}