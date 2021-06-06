import PropTypes from 'prop-types'
import mainStyles from '../../styles/shared/Main.module.css'
import React from "react";

export default function TabContent(props) {
    return (
        <>
            {props.tabs.map(tab => (
                <div style={{
                    display: tab !== null && tab.buttonKey === props.openTab ? undefined : 'none',
                    width: '100%',
                    position: 'relative'
                }}>
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