import styles from './styles.module.css'
import React from "react";
import ThemeContext from "./ThemeContext";
import PropTypes from "prop-types";

export default function ThemeProvider(props) {
    return (
        <ThemeContext.Provider value={{
            dark: props.onDark,
            styles: styles
        }}>
            {props.children}
        </ThemeContext.Provider>
    )
}
ThemeProvider.propTypes={
    onDark: PropTypes.bool,
    children: PropTypes.node
}
