import PropTypes from 'prop-types'
import {Button} from "@material-ui/core";
import {useEffect, useState} from "react";
import {getPrimaryColor} from "../../styles/shared/MainStyles";
import mainStyles from '../../styles/shared/Main.module.css'

export default function TabLayout(props) {
    const [open, setOpen] = useState(null)

    useEffect(() => {
        setOpen(getAvailableFirstPage(props.buttons))
    }, [props.buttons])

    function getAvailableFirstPage(array) {
        let response = null
        let i;
        for (i = 0; i <= array.length; i++) {
            console.log(array[i])
            if (array[i] !== null) {
                response = i
                break
            }
        }
        return response
    }


    function renderTabContent(tab) {
        return (
            <div className={mainStyles.displayInlineCenter} style={{
                transform: 'translateY(10px)',
                backgroundColor: 'white',
                borderRadius: '8px',
                padding: '20px',
                position: "absolute",
                zIndex: 0
            }}
                 key={tab.buttonKey + '-content'}>
                {tab.value}
            </div>
        )
    }

    return (
        <div style={{
            width: props.width + 'vw',
            marginTop: '2vh',
        }}>
            <div
                style={{
                    width: props.width + 'vw',
                    display: 'flex',
                    gap: '10px',

                }}>

                {props.buttons.map((button) => {
                        if (button !== null)
                            return (
                                <Button disabled={button.disabled} key={button.key} style={{
                                    borderRadius: open === button.key ? '5px 5px 0 0' : null,
                                    borderBottom: open === button.key ? '#0095ff 2px solid' : 'transparent 2px solid',
                                    backgroundColor: open === button.key ? 'white' : 'transparent',
                                    transition: '.2s',
                                    height: 'auto',
                                    width: '100%',

                                    textTransform: 'capitalize'

                                }} variant={"contained"} disableElevation={open !== button.key}
                                        onClick={() => setOpen(button.key)}>
                                    {button.value}
                                </Button>
                            )
                        else
                            return null
                    }
                )}
            </div>
            {props.tabs.map(tab => {
                if (tab !== null && tab.buttonKey === open)
                    return (
                        renderTabContent(tab)
                    )
                else
                    return null
            })}
        </div>
    )
}
TabLayout.proptypes = {
    buttons: PropTypes.object,
    tabs: PropTypes.object,
    dark: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
}