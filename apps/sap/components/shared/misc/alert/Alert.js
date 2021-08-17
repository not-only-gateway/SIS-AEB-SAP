import PropTypes from 'prop-types'
import styles from './styles/Alert.module.css'
import {CheckCircleRounded, CloseRounded, ErrorRounded, ReportProblemRounded} from '@material-ui/icons'
import React, {useEffect, useRef, useState} from 'react'
import ReactDOM from "react-dom";
import AlertPT from "./locales/AlertPT";

export default function Alert(props) {
    const lang = AlertPT
    let mounted = false
    const mountingPoint = useRef()


    const element = () => {

        const elements = getColor(props.type)
        return (
            <div className={[styles.alertContainer, styles.slideUp, styles.alertContent].join(' ')}
                 style={
                     elements.style
                 }>

                <div className={styles.alertContentContainer}>
                    {elements.icon}
                    <div>
                        {elements.message}
                    </div>
                    {elements.messageCode !== undefined ?
                        <div style={{fontSize: '.8rem'}}>
                            ({elements.messageCode})
                        </div>
                        :
                        null
                    }
                </div>

                <button className={styles.buttonContainer} onClick={() => props.handleClose()}>
                    <CloseRounded style={{fontSize: '1.15rem', color: elements.style.color}}/>
                </button>

            </div>

        )
    }

    function getColor(type) {
        let response = {
            style: {},
            icon: undefined,
            message: undefined,
            messageCode: undefined
        }
        switch (type) {
            case 'error':
                response = {
                    style: {
                        background: '#ff5555',
                        color: 'white'
                    },
                    icon: (
                        <div style={{
                            color: 'white',
                            background: '#FF2626',
                            width: '40px',
                            height: '40px',
                            padding: '8px',
                            borderRadius: '8px'
                        }} className={styles.alertContentContainer}>
                            <ReportProblemRounded/>
                        </div>
                    ),
                    message: lang.error,
                    messageCode: props.statusCode

                }
                break
            case 'alert':
                response = {
                    style: {
                        background: '#FFFF3E',
                        color: '#555555'
                    },
                    icon: (
                        <div style={{
                            color: 'white',
                            background: '#F4F400',
                            width: '40px',
                            height: '40px',
                            padding: '8px',
                            borderRadius: '8px'
                        }} className={styles.alertContentContainer}>
                            <ErrorRounded/>
                        </div>
                    ),
                    message: props.message,
                    messageCode: props.statusCode
                }
                break
            case 'success':
                response = {
                    style: {
                        background: '#00F400',
                        color: '#555555'
                    },
                    icon: (
                        <div style={{
                            color: 'white',
                            background: '#00C300',
                            width: '40px',
                            height: '40px',
                            padding: '8px',
                            borderRadius: '8px'
                        }} className={styles.alertContentContainer}>
                            <CheckCircleRounded/>
                        </div>
                    ),
                    message: props.statusCode === 201 ? lang.created : lang.success,
                    messageCode: props.statusCode
                }

                break
            default:
                break
        }

        return response
    }

    useEffect(() => {
        if (!mounted) {
            const newElement = document.createElement('div')
            mountingPoint.current = newElement
            document.body.appendChild(newElement)
            mounted = true
        }
        if (props.render && props.type !== undefined) {
            setTimeout(() => props.handleClose(), 7000)
            ReactDOM.render(
                element(),
                mountingPoint.current
            )
        } else if (!props.render)
            ReactDOM.unmountComponentAtNode(mountingPoint.current);

        return () => {
            ReactDOM.unmountComponentAtNode(mountingPoint.current);
        }
    }, [props.type, props.render])


    return null
}

Alert.propTypes = {
    rootElementID: PropTypes.string,
    statusCode: PropTypes.any,
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'alert', 'success']),
    handleClose: PropTypes.func,
    render: PropTypes.bool,
}
