import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {useState} from "react";
import styles from '../../../styles/components/tabs/TabLayout.module.css'

export default function TabLayout(props) {
    const [open, setOpen] = useState(1)

    function renderTabContent(tab) {
        return (
            <div>
                {tab.buttonKey === open ? tab.value : null}
            </div>
        )
    }

    return (
        <div style={{
            border: props.highLight === false ? null : (!props.dark ? '#e2e2e2 1px solid' : null),
            backgroundColor: props.highLight === false ? null : (props.dark ? '#3b424c' : null),
            width: props.width + 'vw',
            height: 'fit-content',
            borderRadius: '8px'
        }}>
            <div className={styles.buttons_container} style={{width: props.width + 'vw'}}>

                {props.buttons.map((button, index) => (
                    <>
                        <Button disabled={button.disabled} style={{
                            borderRadius: '0px',
                            borderTopLeftRadius: index === 0 ? '8px' : null,
                            borderTopRightRadius: props.buttons.length === index+1 ? '8px' : null,
                            width: (100 / props.buttons.length) + '%',
                            borderRight: props.buttons.length === index? 'none' : (props.dark ? '' : '#e2e2e2 1px solid'),
                            backgroundColor: open === button.key ? '#39adf6' : null,
                            color: open === button.key ? 'white' : 'initial',
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
    highLight: PropTypes.bool
}