import PropTypes from 'prop-types'
import styles from './styles/Tab.module.css'
import React, {useState} from "react";
import animations from './styles/Animations.module.css'

export default function Tabs(props) {
  const [extended, setExtended] = useState(false)
  return (
    <div
      className={styles.tabsContainer}>
      {props.buttons.map((button) => (button !== null ?
          <button
            key={button.key + ' - ' + button.value}
            onClick={() => props.setOpenTab(button.key)}
            disabled={button.disabled}
            className={[styles.tabButtonContainer, animations.fadeIn].join(' ')}
            style={{
              border: props.openTab === button.key ? '#ecedf2 1px solid' : 'transparent 1px solid',
              color: props.openTab === button.key ? '#0095ff' : undefined,
              backgroundColor: props.openTab === button.key ? '#E8F0FE' : undefined
            }}
          >
            {button.value}
          </button>
          :
          null
        )
      )}
    </div>
  )
}

Tabs.proptypes = {
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      value: PropTypes.any
    })
  ),
  setOpenTab: PropTypes.func,
  openTab: PropTypes.number,
}
