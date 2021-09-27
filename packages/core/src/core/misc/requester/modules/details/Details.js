import PropTypes from 'prop-types'
import styles from "../../styles/Details.module.css";
import React, {useEffect} from "react";
import ReactDOM from "react-dom";
import AlertPT from "../../locales/LocalesPT";
import {CloseRounded} from "@material-ui/icons";

export default function Details(props) {
    const lang = AlertPT

    useEffect(() => {
        const newElement = document.createElement('div')
        document.body.appendChild(newElement)
        if (props.open && props.data !== undefined)
            ReactDOM.render(
                (
                    <div className={styles.modalContainer}>
                        <div className={styles.wrapper}>
                            <button
                                onClick={() => {
                                    props.setOpen(false)
                                }}
                                className={styles.closeButton}
                            >
                                <CloseRounded/>
                            </button>
                            <div className={styles.header}>
                                {props.data.httpStatusCode >= 300 ? lang.error : lang.success} - {props.data.httpStatusCode}
                                <div className={styles.subHeader}>
                                    {props.data.url}
                                </div>
                            </div>
                            <div style={{width: '100%', display: 'grid', }}>
                                <div style={{display: 'flex', gap: '16px', alignItems: 'center', position: 'relative'}}>
                                    {lang.details}
                                    <button className={styles.copyButton} onClick={event => {
                                        navigator.clipboard.writeText(props.data.details);
                                        event.target.innerText = 'Copiado'
                                        event.target.style.background = 'white'
                                        event.target.style.color = '#555555'
                                        event.target.style.border = '#ecedf2 1px solid'
                                        console.log(event.target)
                                        setTimeout(() => {
                                            console.log('On timeout')
                                            event.target.innerText = 'Copiar'
                                            event.target.style.background = '#0095ff'
                                            event.target.style.color = 'white'
                                            event.target.style.border = 'transparent 1px solid'
                                        }, 5000)
                                    }}>
                                        Copiar
                                    </button>
                                </div>
                                <pre className={styles.body} style={{ overflow: 'auto'}}>
                                {JSON.stringify((JSON.parse(props.data.details)), null, 4)}
                            </pre>
                            </div>
                            <div style={{paddingBottom: '16px'}}>
                                {lang.params}

                                <div className={styles.footer}>
                                    <div>
                                        {lang.method} {props.data.method}
                                    </div>
                                    <div style={{width: '100%', overflow: 'hidden'}}>
                                        {lang.setPackage}
                                        <pre className={styles.body} style={{background: 'white',  overflow: 'auto'}}>
                                        {JSON.stringify(props.data.package, null, 4)}
                                    </pre>
                                    </div>
                                    <div>
                                        {lang.url} {props.data.url}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                newElement
            )

        return () => {
            try {
                ReactDOM.unmountComponentAtNode(newElement)
            } catch (e) {
                document.body.removeChild(newElement)
            }
        }
    }, [props.open])
    return null
}
Details.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.bool,

    data: PropTypes.shape({
        message: PropTypes.string,
        details: PropTypes.string,
        httpStatusCode: PropTypes.number,
        package: PropTypes.any,
        method: PropTypes.string,
        url: PropTypes.string
    })
}