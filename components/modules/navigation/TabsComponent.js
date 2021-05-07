import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import mainStyles from '../../../styles/shared/Main.module.css'

export default function TabsComponent(props) {
    // const [open, setOpen] = useState(null)


    return (

        <div key={'tab-component'}
             className={mainStyles.displayInlineStart} style={{gap: '20px', width: '100%'}}>

            {props.buttons.map((button) => {
                    if (button !== null)
                        return (
                            <Button disabled={button.disabled} key={button.key} style={{
                                borderRadius: props.openTab === button.key ? '5px 5px 0 0' : null,
                                borderBottom: props.openTab === button.key ? '#0095ff 2px solid' : 'transparent 2px solid',
                                transition: '.2s',
                                height: 'auto',
                                textTransform: 'capitalize',
                                color:button.disabled ? null :'black'

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
TabsComponent.proptypes = {
    buttons: PropTypes.object,
    setOpenTab: PropTypes.func,
    openTab: PropTypes.object
}