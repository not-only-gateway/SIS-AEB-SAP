import PropTypes from 'prop-types'
import styles from './styles/Alert.module.css'
import {CloseRounded, ReportProblemRounded, ErrorRounded, CheckCircleRounded} from '@material-ui/icons'
import React, {useEffect, useState} from 'react'
import Modal from './Modal'
import ReactDOM from "react-dom";
import AlertPT from "./locales/AlertPT";

export default function Alert(props) {

  const [elements, setElements] = useState({
    style: {},
    icon: undefined,
    message: undefined,
    messageCode: undefined
  })
  const lang = AlertPT
  useEffect(() => {
    const root = document.getElementById(props.rootElementID)
    if (props.render) {
      if (root !== null && !props.render)
        ReactDOM.unmountComponentAtNode(root)
      setTimeout(() => props.handleClose(), 7000)
      setElements(getColor(props.type))
    } else if (root !== null && !props.render)
      ReactDOM.unmountComponentAtNode(root);
  }, [props.type, props.render])

  function getColor(type) {
    let response = undefined
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

  const element = (
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
  if (typeof window !== 'undefined' && process.browser && props.render) {
    const root = document.getElementById(props.rootElementID)
    if (root !== null) {
      ReactDOM.render(
        element,
        root
      );
    }
  }
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
