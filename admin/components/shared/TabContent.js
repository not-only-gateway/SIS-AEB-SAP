import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import AnimationFrame from "./AnimationFrame";
import animations from "../../styles/shared/Animations.module.css";

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