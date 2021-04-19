import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {useState} from "react";
import styles from '../../../styles/shared/Layout.module.css'
import {getBorder, getSecondaryBackground, getPrimaryColor, getTertiaryColor} from "../../../styles/shared/MainStyles";
import mainStyles from '../../../styles/shared/Main.module.css'

export default function TabLayout(props) {
    const [open, setOpen] = useState(1)

    function renderTabContent(tab) {
        return (
            <div className={mainStyles.displayInlineCenter} key={tab.buttonKey + '-content'}>
                {tab.buttonKey === open ? tab.value : null}
            </div>
        )
    }

    return (
        <div style={{
            ...{
                width: props.width + 'vw',
            }
        }}>
            <div className={mainStyles.displayInlineStart} style={{width: props.width + 'vw'}}>

                {props.buttons.map((button) => (
                    <Button disabled={button.disabled} key={button.key} style={{
                        ...{
                            borderRadius: '0px',
                            borderBottom: open === button.key ? (props.dark ? '#1ea1f1 2px solid' : '#46b2f3 2px solid') : 'transparent 2px solid',
                            width: 'fit-content',
                            transition: '.2s',
                            marginRight: '2vw',
                            textTransform: 'initial'
                        },
                        ...open === button.key ? {color: (props.dark ? '#1ea1f1 2px solid' : '#46b2f3 2px solid')} : getPrimaryColor({dark: props.dark})
                    }} onClick={() => setOpen(button.key)}>
                        {button.value}
                    </Button>
                ))}
            </div>
            {props.tabs.map(tab => (
                renderTabContent(tab)
            ))}
        </div>
    )
}
TabLayout.proptypes =
    {
        buttons: PropTypes.object,
        tabs: PropTypes.object,
        dark: PropTypes.bool,
        height: PropTypes.number,
        width: PropTypes.number,
    }