import PropTypes from 'prop-types'
import styles from '../../../styles/component/Component.module.css'

export default function HorizontalTabs(props) {
    return (
        <div
            className={styles.tabsContainer}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <div key={button.key + ' - ' + button.value} style={{width: '100%'}}>
                                <button
                                    onClick={() => props.setOpenTab(button.key)}
                                    disabled={button.disabled}
                                    className={styles.tabButtonContainer}
                                    style={{
                                        backgroundColor: props.openTab === button.key ? '#0095ff' : 'white',
                                        color: props.openTab === button.key ? 'white' : undefined,
                                    }}
                                >
                                    {button.value}
                                </button>
                            </div>
                        )
                    else
                        return null
                }
            )}
        </div>
    )
}

HorizontalTabs.proptypes = {
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.number,
            value: PropTypes.any
        })
    ),
    setOpenTab: PropTypes.func,
    openTab: PropTypes.number,
    noMargin: PropTypes.bool,
    extended: PropTypes.bool,
    variant: PropTypes.oneOf([
        'default',
        'secondary'
    ]),
    noBackground: PropTypes.bool
}