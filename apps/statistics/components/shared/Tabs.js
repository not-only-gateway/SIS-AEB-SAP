import PropTypes from 'prop-types'
import styles from '../../styles/Tabs.module.css'
import {useState} from "react";
import animations from '../../styles/Animations.module.css'
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
                        className={[styles.tabButtonContainer, animations.slideUpAnimation].join(' ')}
                        style={{
                            borderLeft: props.openTab === button.key ? '#0095ff 3px solid' : 'transparent 3px solid',
                            color: props.openTab === button.key ? '#0095ff' : undefined,

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