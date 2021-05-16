import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";

export default function HorizontalTabs(props) {
    // const [open, setOpen] = useState(null)


    return (
        <div key={'tab-component'}
             style={{
                 display: 'flex',
                 gap: '8px',
                 justifyContent: 'center',
                 width: 'fit-content',
                 backgroundColor: '#f4f5fa',
                 marginTop: props.noMargin ? 0 : '16px',
                 transition: '300ms ease-in-out',
                 borderRadius: '8px',
                 padding: '4px',
                 border : '#ecedf2 .7px solid'
             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <Button disabled={button.disabled} key={button.key} style={{
                                borderRadius: '8px',
                                backgroundColor: props.openTab === button.key ? 'white' : 'unset',
                                border : props.openTab === button.key ? '#ecedf2 .7px solid' : 'transparent .7px solid',
                                transition: '300ms ease-in-out',
                                height: 'auto',
                                textTransform: 'capitalize',
                                padding: '5px 32px 5px 32px',
                                color: '#262626'
                            }}
                                    onClick={() => props.setOpenTab(button.key)}>
                                {button.value}
                            </Button>
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