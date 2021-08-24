import Link from 'next/link'
import PropTypes from 'prop-types'
import styles from '../styles/Navigation.module.css'
import React from 'react'

export default function NavigationButton(props) {
  const content = (
    <button
      id={'content-' + props.buttonKey + ':button'}
      className={styles.buttonContainer} disabled={props.disabled}
      style={{

        display: props.extended ? undefined : 'grid',
        gap: props.extended ? undefined : '2px',
        justifyContent: props.extended ? 'space-between' : 'center',
        justifyItems: props.extended ? undefined : 'center',
        backgroundColor: props.highlight ? '#E8F0FE' : undefined,
        color: props.highlight ? '#0095ff' : undefined,
        padding: props.extended ? '8px 16px' : undefined
      }}>


      {props.icon}

      <div className={styles.buttonLabel}
           style={{
             fontSize: props.extended ? undefined : '.65rem',
             textAlign: props.extended ? undefined : 'center',
           }}>{props.label}</div>

    </button>

  )
  return (
    props.disabled ?
      content
      :
      <Link href={{
        pathname: props.linkPath,
        query: props.linkQuery !== undefined ? props.linkQuery : null
      }}>
        {content}
      </Link>
  )
}

NavigationButton.propTypes = {
  extended: PropTypes.bool,
  highlight: PropTypes.bool,
  linkPath: PropTypes.string,
  linkQuery: PropTypes.object,
  icon: PropTypes.element,
  label: PropTypes.any,
  buttonKey: PropTypes.any,
  initialValue: PropTypes.bool,
}
