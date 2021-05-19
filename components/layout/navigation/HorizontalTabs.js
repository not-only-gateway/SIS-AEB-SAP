import PropTypes from 'prop-types'
import Button from "../../modules/inputs/Button";

export default function HorizontalTabs(props) {
    return (
        <div key={'tab-component'}
             style={{
                 display: 'flex',
                 gap: '8px',
                 justifyContent: 'center',
                 width: 'fit-content',

                 marginTop: props.noMargin ? 0 : '16px',
                 transition: '300ms ease-in-out',
                 borderRadius: '32px',
                 backgroundColor: '#f4f5fa',
                 padding: '3px',
                 border: '#ecedf2 .7px solid'
             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (

                            <Button
                                content={button.value} handleClick={() => props.setOpenTab(button.key)}
                                elevation={props.openTab === button.key} disabled={false} padding={'8px 32px 8px 32px'}
                                variant={'rounded'} width={'auto'} hoverHighlight={props.openTab !== button.key}
                                border={props.openTab === button.key ? '#eeeef1 1px solid' : 'transparent 1px solid'}
                                backgroundColor={props.openTab === button.key ? 'white' : 'transparent'}
                                fontColor={'#262626'} paddingType={'long'}
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
    buttons: PropTypes.object,
    setOpenTab: PropTypes.func,
    openTab: PropTypes.object,
    noMargin: PropTypes.bool
}