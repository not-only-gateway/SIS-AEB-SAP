import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import mainStyles from '../../../styles/shared/Main.module.css'

export default function HorizontalTabs(props) {
    // const [open, setOpen] = useState(null)


    return (
        <div key={'tab-component'}
             style={{
                 display: 'flex',
                 gap: '20px',
                 width: '100%',
                 backgroundColor: 'white',
                 padding: '8px',
                 borderRadius: '8px',
                 marginTop: '16px',
                 boxShadow:'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',

             }}>
            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <Button disabled={button.disabled} key={button.key} style={{
                                borderRadius: '32px',
                                backgroundColor: props.openTab === button.key ? '#0095ff' : 'unset',
                                transition: '300ms ease-in-out',
                                height: 'auto',
                                textTransform: 'capitalize',
                                paddingRight: '32px',
                                paddingLeft: '32px',
                                color: props.openTab === button.key ? 'white' : 'black',
                                boxShadow: props.openTab === button.key ?'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : 'unset'
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
    openTab: PropTypes.object
}