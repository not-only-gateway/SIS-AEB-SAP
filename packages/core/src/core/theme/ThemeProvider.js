import styles from './styles.module.css'
import React from "react";
import ThemeContext from "./ThemeContext";
import PropTypes from "prop-types";

export default function ThemeProvider(props) {
    return (
        <ThemeContext.Provider value={{
            dark: props.onDark,
            styles: styles,
            themes: {
                backgroundBase: !props.onDark ? '#f9fafb' : '#1e2121',
                background1:!props.onDark ?  'white' : '#292c2b',
                background2:!props.onDark ?  ' #f4f5fa' : '#191C1C',
                background3: !props.onDark ? '#E8F0FE' : '#1f2123',

                border0: !props.onDark ? '#ecedf2' : '#1e2121',
                border1:!props.onDark ?  '#e0e0e0' : '#707070',

                color0:!props.onDark ?  '#333333' : 'white',
                color1:!props.onDark ?  '#555555' : '#f4f5fa',
                color2:!props.onDark ?  '#666666' : '#f0f0f0',
                color3: !props.onDark ? '#777777' : '#e0e0e0',
                color4:!props.onDark ?  '#999999' : '#dedede',

                boxShadow1: !props.onDark ? '#e0e0e0' : '#111111'
            }
        }}>
            <div className={props.onDark ? styles.dark : styles.light}>
                {props.children}
            </div>
        </ThemeContext.Provider>
    )
}
ThemeProvider.propTypes={
    onDark: PropTypes.bool,
    children: PropTypes.node
}
