import PropTypes from 'prop-types'
import {Divider} from "@material-ui/core";
import mainStyles from '../../../styles/shared/Main.module.css'

export default function Stepper(props) {

    function getColor(status) {
        switch (status) {
            case true: {
                return '#47d764'
            }
            case false: {
                return '#f54269'
            }
            case null: {
                return '#ffc021'
            }
            default: {
                return '#0095ff'
            }
        }
    }

    return (

        <div key={'stepper-component'}
             className={mainStyles.displayInlineCenter} style={{
            gap: '10px',
            width: '100%',
            backgroundColor: '#f4f5fa',
            padding: '8px',
            borderRadius: '8px',
            marginTop: '16px',
            position: 'relative',
            border: '#ecedf2 .7px solid',
        }}>

            {props.buttons.map((button, index) => {
                    if (button !== null)
                        return (
                            <>
                                <div style={{display: 'grid', justifyItems: 'center'}}>
                                    <div key={button.key} className={mainStyles.displayInlineCenter} style={{
                                        backgroundColor: getColor(button.status),
                                        transition: '.2s',
                                        height: '35px',
                                        width: '35px',
                                        textTransform: 'capitalize',
                                        color: 'white',
                                        borderRadius: '50%',
                                        fontSize: '1.1rem',
                                        fontWeight: 550,
                                        cursor: button.disabled ? null : 'pointer',
                                        opacity: props.openTab === button.key ? 1 : .5,
                                        boxShadow: props.openTab === button.key ? 'rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0,0,0,0.06) 0 2px 4px -1px' : null
                                    }}
                                         onClick={() => {
                                             if (!button.disabled)
                                                 props.setOpenTab(button.key)
                                         }}>
                                        {index + 1}
                                    </div>
                                    <span style={{
                                        opacity: props.openTab === button.key ? 1 : .5,
                                        fontSize: '.8rem',
                                        marginTop: '5px'
                                    }}>
                                        {button.value} {button.required ? ' *' : null}
                                    </span>
                                </div>
                                {index < props.buttons.length - 1 && props.buttons[index + 1] !== null ?
                                    <Divider style={{
                                        width: '50px',
                                        backgroundColor: props.buttons.status ? '#0095ff' : undefined
                                    }} orientation={"horizontal"}/>
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