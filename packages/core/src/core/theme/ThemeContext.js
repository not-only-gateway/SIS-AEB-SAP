import styles from './styles.module.css'
import React from "react"

export default React.createContext({
        dark: false,
        styles: styles,
        themes: {
            backgroundBase: '#f9fafb',
            background1: 'white',
            background2: ' #f4f5fa',
            background3: '#E8F0FE',

            border0: '#ecedf2',
            border1: '#e0e0e0',

            color0: '#333333',
            color1: '#555555',
            color2: '#666666',
            color3: '#777777',
            color4: '#999999',

            boxShadow1: '#e0e0e0'
        }
    }
)
