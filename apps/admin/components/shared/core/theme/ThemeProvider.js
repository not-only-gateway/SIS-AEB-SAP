import styles from './styles.module.css'
import React from "react";
import ThemeContext from "./ThemeContext";

export default function ThemeProvider({children, onDark}) {
    return (
        <ThemeContext.Provider value={{
            dark: onDark,
            styles: styles
        }}>
            {children}
        </ThemeContext.Provider>
    )
}

