import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {useState} from "react";
import styles from '../../../styles/TabLayout.module.css'

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
                        <Button style={{
                            borderRadius: '0px',
                            width: (100 / props.buttons.length) + '%',
                            borderRight: props.buttons.length === index + 1 ? null : (props.dark ? '' : '#e2e2e2 1px solid')
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