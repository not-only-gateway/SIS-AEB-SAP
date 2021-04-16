import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {useState} from "react";
import styles from '../../../styles/shared/Layout.module.css'
import {getBorder} from "../../../styles/shared/MainStyles";
import mainStyles from '../../../styles/shared/Main.module.css'

export default function TabLayout(props) {
    const [open, setOpen] = useState(1)

    function renderTabContent(tab) {
        return (
            <div className={mainStyles.displayInlineCenter}>
                {tab.buttonKey === open ? tab.value : null}
            </div>
        )
    }

    return (
        <div className={mainStyles.normalBorder} style={{...{
                width: props.width + 'vw',
                height: 'fit-content',
            }, ...getBorder({dark: props.dark})}}>
            <div className={styles.tab_buttons_container} style={{width: props.width + 'vw'}}>

                {props.buttons.map((button, index) => (
                    <>
                        <Button disabled={button.disabled} style={{
                            borderRadius: '0px',
                            borderTopLeftRadius: index === 0 ? '8px' : null,
                            borderTopRightRadius: props.buttons.length === index+1 ? '8px' : null,
                            width: (100 / props.buttons.length) + '%',
                            borderRight: props.buttons.length === index? 'none' : (props.dark ? '' : '#e2e2e2 1px solid'),
                            backgroundColor: open === button.key ? '#39adf6' : null,
                            color: open === button.key ? 'white' : null,
                            textTransform: 'capitalize'
                        }} onClick={() => setOpen(button.key)}>{button.value}</Button>

                    </>
                ))}
            </div>
            <Divider orientation={"horizontal"}/>
            {props.tabs.map(tab => (
                renderTabContent(tab)
            ))}
        </div>
    )
}
TabLayout.proptypes =
{
    buttons: PropTypes.object,
    tabs:PropTypes.object,
    dark:PropTypes.bool,
    height:PropTypes.number,
    width:PropTypes.number,
}