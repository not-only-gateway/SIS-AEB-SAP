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
            <div className={mainStyles.displayInlineCenter} style={{transform: 'translateY(2vh)', backgroundColor: 'white', borderRadius: '8px', padding: '20px'}}
                 key={tab.buttonKey + '-content'}>
                {tab.value}
            </div>
        )
    }

    return (
        <div style={{
            width: props.width + 'vw',
            marginTop: '2vh'
        }}>
            <div className={mainStyles.displayInlineStart}
                 style={{
                     width: props.width + 'vw',
                 }}>

                {props.buttons.map((button) => {
                        if (button !== null)
                            return (
                                <Button disabled={button.disabled} key={button.key} style={{
                                    ...{
                                        borderRadius: open === button.key ? '8px 8px 0px   0px ' : null,
                                        borderBottom: open === button.key ? '#0095ff 3px solid' : 'transparent 3px solid',
                                        backgroundColor:  open === button.key ? 'white' : null,
                                            width: 'fit-content',
                                        boxShadow: open === button.key ? 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset' : null,
                                        transition: '.2s',
                                        height: '50px',
                                        marginRight: '2vw',
                                        textTransform: 'capitalize'
                                    },
                                    ...open === button.key ? {color: (props.dark ? '#1ea1f1 2px solid' : '#46b2f3 2px solid')} : getPrimaryColor({dark: props.dark})
                                }} onClick={() => setOpen(button.key)}>
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
TabLayout.proptypes= {
    buttons: PropTypes.object,
    tabs: PropTypes.object,
    dark: PropTypes.bool,
    height: PropTypes.number,
    width: PropTypes.number,
}