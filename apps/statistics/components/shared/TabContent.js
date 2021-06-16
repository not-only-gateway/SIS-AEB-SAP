import PropTypes from 'prop-types'
import React from "react";
import animations from "../../styles/Animations.module.css";

export default function TabContent(props) {

    function getAnimation(render) {
        let response

        if (!render)
            response = animations.fadeOutAnimation
        else
            response = animations.fadeIn
        return response
    }

    return (
        <>
            {props.tabs.map(tab => (
                <div key={tab.buttonKey + '-' + tab.value}
                     className={getAnimation(tab.buttonKey === props.openTab)}>
                    {tab.value}
                </div>
            ))}
        </>
    )
}

TabContent.propTypes = {
    tabs: PropTypes.arrayOf(
        PropTypes.shape({
            buttonKey: PropTypes.number,
            value: PropTypes.any
        })
    ),
    openTab: PropTypes.any,
    noContainer: PropTypes.bool
}