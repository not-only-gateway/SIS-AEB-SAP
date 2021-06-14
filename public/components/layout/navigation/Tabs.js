import PropTypes from 'prop-types'
import styles from '../../../styles/component/Component.module.css'
import NavigationButton from "../NavigationButton";

export default function Tabs(props) {
    return (
        <div className={styles.verticalTabsContainer}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <div key={button.key + ' - ' + button.value}>
                                <NavigationButton
                                    asButton={true}
                                    handleClick={() => props.setOpenTab(button.key)}
                                    highlight={props.openTab === button.key}
                                    label={button.value}
                                    width={'100%'}
                                    lightTheme={true}
                                />
                                {/*<Button*/}
                                {/*    content={button.value} handleClick={() => props.setOpenTab(button.key)}*/}
                                {/*    elevation={props.openTab === button.key} disabled={button.disabled} padding={'8px 32px 8px 32px'}*/}
                                {/*    variant={'default'} width={'100%'} hoverHighlight={props.openTab !== button.key}*/}
                                {/*    colorVariant={props.variant === 'secondary' ? 'secondary' : undefined}*/}
                                {/*    border={'unset'} boxShadow={'unset'}*/}
                                {/*    backgroundColor={props.openTab === button.key ? (props.variant === 'secondary' ? '#ff4940' : '#0095ff') : 'white'}*/}
                                {/*    fontColor={props.openTab === button.key ? 'white' : '#262626'} paddingType={'long'}*/}
                                {/*/>*/}
                            </div>
                        )
                    else
                        return null
                }
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
    noMargin: PropTypes.bool,
    extended: PropTypes.bool,
    variant: PropTypes.oneOf([
        'default',
        'secondary'
    ]),
    noBackground: PropTypes.bool
}