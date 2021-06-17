import PropTypes from 'prop-types'
import React from 'react'
import styles from './styles/Header.module.css'
import Head from 'next/head'

export default function HeaderLayout(props) {
  return (
    <div style={{
      position: 'sticky',
      top: 0,
      background: 'white',
      transition: '300ms ease-in-out',
      zIndex: '50'
    }}>
      <Head>
        <title>{props.pageTitle}</title>
        <link rel='icon' href={'/LOGO.png'} type='image/x-icon' />
      </Head>

      <div className={styles.HeaderLayout} style={{
        width: props.width
      }}>

        <div className={styles.firstRowContainer}>
          <div className={styles.titleContainer}
               style={{ width: typeof (props.title) === 'string' ? 'initial' : '100%' }}>

            {typeof (props.title) === 'string' ?
              <h2 style={{
                marginBottom: 'unset',
                marginTop: 'unset'
              }}>
                {props.title}

              </h2>
              :
              <div style={{ width: '100%' }}>
                {props.title}
              </div>
            }
            {props.information !== undefined ?
              <h5 style={{ color: '#555555', marginBottom: '8px' }}>
                {props.information}
              </h5>
              :
              null
            }
          </div>
          {props.searchComponent !== undefined ?
            props.searchComponent
            : null
          }
        </div>

        {props.activeFiltersComponent !== undefined ?

          props.activeFiltersComponent

          : null}
        {props.tabs !== undefined ?
          props.tabs

          :
          null
        }
      </div>

    </div>
  )
}
HeaderLayout.propTypes = {
  title: PropTypes.any,
  searchComponent: PropTypes.object,
  tabs: PropTypes.object,
  pageTitle: PropTypes.string,
  information: PropTypes.string,
  activeFiltersComponent: PropTypes.object,
  width: PropTypes.string
}
