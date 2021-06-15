import PropTypes from 'prop-types'
import styles from '../../../styles/component/Component.module.css'
import {CloseRounded} from "@material-ui/icons";
import animations from '../../../styles/shared/Animations.module.css'
import React, {useEffect, useRef, useState} from "react";
import {Button} from "sis-aeb-inputs";
import {Modal} from "@material-ui/core";

export default function Alert(props) {
    const counter = useRef(10)
    const [alertColor, setAlertColor] = useState(undefined)
    const [modal, setModal] = useState(false)
    useEffect(() => {
        if (props.render) {
            setAlertColor(getColor(props.type))
            setInterval(() => {
                if (counter.current >= 1) {
                    counter.current = counter.current - 1
                } else {
                    props.handleClose()

                }
            }, 1000)
            counter.current = 10
        }
    }, [props.render])

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

        <Modal open={props.render} onClose={() => props.handleClose()}>
            <div className={[styles.alertContainer, animations.fadeIn].join(' ')}
                 style={alertColor}>
                <div className={styles.alertContent}>
                    <Button
                        // handleClick={() => setModal(true)}
                        fontColor={alertColor ? alertColor.color : '#262626'}
                        border={'none'}
                        padding={''}
                        justification={'flex-start'}
                        backgroundColor={alertColor ? alertColor.background : 'white'}
                        disabled={false}
                        content={props.message}
                        width={'100%'}
                    />
                    <Button
                        handleClick={() => props.handleClose()}
                        fontColor={alertColor ? alertColor.color : '#262626'}
                        border={'none'}
                        padding={'none'}
                        backgroundColor={alertColor ? alertColor.background : 'white'}
                        disabled={false}
                        content={<CloseRounded/>}
                        width={'10%'}
                    />
                </div>
            </div>
        </Modal>
    )
}

Alert.propTypes = {
    message: PropTypes.string,
    type: PropTypes.oneOf(['error', 'alert', 'success']),
    handleClose: PropTypes.func,
    render: PropTypes.bool,
}