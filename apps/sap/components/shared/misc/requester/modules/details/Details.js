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
        if(props.open && props.data !== undefined)
            ReactDOM.render(
                (
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
                        <div>
                            {lang.details}
                            <div className={styles.body}>
                                {props.data.details}
                            </div>
                        </div>
                        <div>
                            {lang.params}

                            <div className={styles.footer}>
                                <div>
                                    {lang.method} {props.data.method}
                                </div>
                                <div>
                                    {lang.setPackage} {JSON.stringify(props.data.package)}
                                </div>
                                <div>
                                    {lang.url} {props.data.url}
                                </div>
                            </div>
                        </div>
                    </div>
                ),
                newElement
            )

        return () => {
            try{
                ReactDOM.unmountComponentAtNode(newElement)
            }catch (e){
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