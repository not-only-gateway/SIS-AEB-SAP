import PropTypes from 'prop-types'
import Button from "../../modules/inputs/Button";

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
                 padding: '3px',
                 border:  props.noBackground ? 'unset' : '#ecedf2 .7px solid'
             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (

                            <Button
                                content={button.value} handleClick={() => props.setOpenTab(button.key)}
                                elevation={props.openTab === button.key} disabled={button.disabled} padding={'8px 32px 8px 32px'}
                                variant={'rounded'} width={'auto'} hoverHighlight={props.openTab !== button.key}
                                colorVariant={props.variant === 'secondary' ? 'secondary' : undefined}
                                border={'unset'} boxShadow={'unset'}
                                backgroundColor={props.openTab === button.key ? (props.variant === 'secondary' ? '#ff4940' : '#0095ff') : 'transparent'}
                                fontColor={props.openTab === button.key ? 'white' : '#262626'} paddingType={'long'}
                            />
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