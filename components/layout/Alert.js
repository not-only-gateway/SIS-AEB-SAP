import PropTypes from 'prop-types'
import styles from '../../styles/component/Component.module.css'
import {CloseRounded, RemoveRounded} from "@material-ui/icons";
import {Button} from "@material-ui/core";
import animations from '../../styles/shared/Animations.module.css'
import {useEffect, useRef, useState} from "react";

export default function Alert(props) {
    const [counter, setCounter] = useState(undefined)
    const [alertColor, setAlertColor] = useState(undefined)
    useEffect(() => {
        if(counter === undefined && props.render) {
            setCounter(props.duration)
            setAlertColor(getColor(props.type))
        }
        else {
            if (counter > 0 && props.render)
                setCounter(counter - 1)
            else {
                props.handleClose()
                setCounter(undefined)
            }
        }
    }, [counter, props.render])

    function getColor(type) {
        let response = 'unset'
        switch (type) {
            case 'error':
                response = {
                    background: '#ff5555',
                    color: 'white'
                }
                break
            case 'alert':
                response = {
                    background: '#FFFF57',
                    color: '#555555'
                }
                break
            case 'success':
                response = {
                    background: '#ABFF57',
                    color: '#555555'
                }
                break
            default:
                break
        }

        return response
    }

    return (
        <div className={[styles.alertContainer, animations.fadeIn].join(' ')}
             style={{...alertColor, ...{display: props.render ? 'initial' : 'none'}}}
             onBlur={() => props.handleClose()}>
            <div className={styles.alertContent}>
                <p style={{margin: 0}}>{props.message}</p>
                <Button onClick={() => props.handleClose()} style={{...alertColor,...{
                    height: '100%',
                    width: '10%',
                    position: 'absolute',
                    right: 0,
                    borderRadius: '8px'
                }}}>
                    <CloseRounded style={{padding: 0}}/>
                </Button>
            </div>

        </div>
    )
}

Alert.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'alert', 'success']),
    handleClose: PropTypes.func,
    render: PropTypes.bool,
    duration: PropTypes.number
}