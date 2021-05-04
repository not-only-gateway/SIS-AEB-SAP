import PropTypes from 'prop-types'
import {Divider} from "@material-ui/core";
import mainStyles from '../../../styles/shared/Main.module.css'

export default function Stepper(props) {

    function getColor(status) {
        switch (status) {
            case 'accepted': {
                return '#47d764'
            }
            case 'error': {
                return '#f54269'
            }
            case 'alert': {
                return '#ffc021'
            }
            default: {
                return '#0095ff'
            }
        }
    }

    return (

        <div key={'stepper-component'}
             className={mainStyles.displayInlineStart} style={{gap: '10px'}}>

            {props.buttons.map((button, index) => {
                    if (button !== null)
                        return (
                            <>
                                <div key={button.key} className={mainStyles.displayInlineCenter} style={{
                                    backgroundColor:  getColor(props.openTab === button.key ? null : button.status),
                                    transition: '.2s',
                                    height: '40px',
                                    width: '40px',
                                    textTransform: 'capitalize',
                                    color: 'white',
                                    borderRadius: '50%',
                                    fontSize: '1.1rem',
                                    fontWeight: 550,
                                    cursor: button.disabled ? null : 'pointer',
                                    opacity: props.openTab === button.key ? 1 : .5,
                                    boxShadow: props.openTab === button.key ? 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px' : null
                                }}
                                     onClick={() => {
                                         if (!button.disabled)
                                             props.setOpenTab(button.key)
                                     }}>
                                    {index + 1}
                                </div>
                                {index < props.buttons.length -1 ?
                                    <Divider style={{width: '50px'}} orientation={"horizontal"}/>
                                :
                                null}
                            </>
                        )
                    else
                        return null
                }
            )}
        </div>
    )
}
Stepper.proptypes = {
    buttons: PropTypes.object,
    setOpenTab: PropTypes.func,
    openTab: PropTypes.object
}