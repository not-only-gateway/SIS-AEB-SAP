import PropTypes from 'prop-types'
import React from "react";
import Vertical from "./templates/Vertical";
import Horizontal from "./templates/Horizontal";

export default function Tabs(props) {
    return (
        props.type === 'vertical' ?
            <Vertical {...props}/>
            :
            <Horizontal {...props}/>
    )
}

Tabs.proptypes = {
    type: PropTypes.oneOf(['vertical', 'horizontal']),
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number,
            value: PropTypes.any,
            content: PropTypes.any
        })
    ),
    styles: PropTypes.object,
    setOpenTab: PropTypes.func,
    openTab: PropTypes.number}
