import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import animations from '../styles/Animations.module.css'
import styles from "../styles/Navigation.module.css";
import NavigationButton from "./NavigationButton";

export default function NavigationTabs(props) {
    const [isInRender, setIsInRender] = useState(false)
    const [style, setStyle] = useState('')

    useEffect(() => {
        const subElement = document.querySelector('#navigation-content')

        if (isInRender && !props.open) {
            setStyle(animations.slideLeft)
        } else if (!isInRender && props.open) {
            setIsInRender(true)
            setStyle(animations.slideRight)
        }

        if (subElement !== null)
            subElement.addEventListener('animationend', () => {
                if (style === animations.slideLeft && !props.open && isInRender) {
                    setIsInRender(false)
                    setStyle(animations.slideRight)
                }

            });



        const element = document.getElementById('navigation-tabs')

        if (element !== null && props.open)
            element.addEventListener('mousedown', event => {
                if (!subElement.contains(event.target))
                    props.setOpen(false)
            })
    })


    return (
        <div id={'navigation-tabs'}
             style={{
                 width: '100vw',
                 position: 'fixed',
                 height: '100vh',
                 display: isInRender ? undefined : 'none',
                 zIndex: 100,
                 bottom: 0,
                 left: 0,

             }}>
            <div className={[styles.modalContainer, style].join(' ')} id={'navigation-content'}>
                {props.buttons.map((button, index) => button !== null ? (
                    <NavigationButton
                        buttonKey={index}
                        linkPath={button.link}
                        linkQuery={button.linkProps}
                        highlight={props.path === button.link}
                        icon={
                            button.icon
                        }
                        label={button.label}
                    />
                    // </React.fragment>
                ) : null)}
            </div>
        </div>
    )

}

NavigationTabs.propTypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            icon: PropTypes.any,
            link: PropTypes.string,
            linkProps: PropTypes.any
        })
    ),
    path: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func
}