import PropTypes from 'prop-types'
import Button from "../../modules/inputs/Button";
import styles from '../../../styles/component/Component.module.css'

export default function HorizontalTabs(props) {
    return (
        <div key={'tab-component'}
             style={{
                 marginTop: props.noMargin ? 0 : '16px',
                 display: 'flex',
                 gap: '8px',
                 justifyContent: 'center',
                 width: props.extended ? '100%' : 'fit-content',
                 transition: '300ms ease-in-out',
                 borderRadius: '32px',
                 backgroundColor: props.noBackground ? 'unset' : '#f4f5fa',

             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <div key={button.key + ' - ' + button.value}>
                                <button
                                    onClick={() => props.setOpenTab(button.key)}
                                    // elevation={props.openTab === button.key}
                                    disabled={button.disabled}
                                    // padding={'8px 32px 8px 32px'}
                                    // variant={'rounded'} width={'auto'} hoverHighlight={props.openTab !== button.key}
                                    // border={''} boxShadow={'unset'}
                                    // backgroundColor={props.openTab === button.key ? (props.variant === 'secondary' ? '#ff4940' : '#0095ff') : 'transparent'}
                                    // fontColor={props.openTab === button.key ? 'white' : '#262626'} paddingType={'long'}
                                    className={styles.tabsContainer}
                                    style={{
                                        backgroundColor: props.openTab === button.key ? '#0095ff' : undefined,
                                        color: props.openTab === button.key ? 'white' : undefined
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