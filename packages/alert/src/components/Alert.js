import PropTypes from 'prop-types'
import styles from './styles/Alert.module.css'
import {CloseRounded} from '@material-ui/icons'
import React, {useEffect, useRef, useState} from 'react'
import {Modal} from '@material-ui/core'

export default function Alert(props) {
  const counter = useRef(10)
  const [alertColor, setAlertColor] = useState(undefined)
  // const [modal, setModal] = useState(false)
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
      <div className={[styles.alertContainer, styles.fadeIn].join(' ')}
           style={alertColor}>
        <div className={styles.alertContent}>

          <button className={styles.buttonContainer} style={{
            color: alertColor ? alertColor.color : '#262626',
            background: alertColor ? alertColor.background : 'white'
          }}>
            {
              props.message
            }
          </button>

          <button className={styles.buttonContainer} style={{
            color: alertColor ? alertColor.color : '#262626',
            background: alertColor ? alertColor.background : 'white'
          }}>
            <CloseRounded />
          </button>

        </div>
      </div>
    </Modal>
  )
}

Alert.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'alert', 'success']),
  handleClose: PropTypes.func,
  render: PropTypes.bool
}
