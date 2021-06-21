import PropTypes from 'prop-types'
import styles from './styles/Alert.module.css'
import {CloseRounded} from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import Modal from './Modal'

export default function Alert(props) {

    const [alertColor, setAlertColor] = useState(undefined)
    useEffect(() => {
        setAlertColor(getColor(props.type))
    }, [])

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
                    background: '#57FF57',
                    color: '#555555'
                }
                break
            default:
                break
        }

        return response
    }

    return (
        <Modal open={props.render} handleClose={() => props.handleClose()} children={

            <div className={[styles.alertContainer, styles.fadeIn, styles.alertContent].join(' ')}
                 style={alertColor}>


                <button className={styles.buttonContainer} style={{
                    color: alertColor ? alertColor.color : '#262626',
                    background: alertColor ? alertColor.background : 'white'
                }}>
                    {
                        props.message
                    }
                </button>

                <button className={styles.buttonContainer} onClick={() => props.handleClose()} style={{
                    color: alertColor ? alertColor.color : '#262626',
                    background: alertColor ? alertColor.background : 'white',
                    justifyContent: 'flex-end'
                }}>
                    <CloseRounded/>
                </button>

            </div>
        } styles={{display: 'grid', justifyContent: 'center', alignContent: 'flex-end'}}/>
    )
}

Alert.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'alert', 'success']),
    handleClose: PropTypes.func,
    render: PropTypes.bool
}
