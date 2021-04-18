import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {useState} from "react";
import styles from '../../../styles/shared/Layout.module.css'
import {getBorder, getPrimaryBackground, getPrimaryColor, getTertiaryColor} from "../../../styles/shared/MainStyles";
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
        <div style={{...{
                width: props.width + 'vw',
                height: 'fit-content',
                minHeight: props.height + 'vh'
            }
        }}>
            <div className={mainStyles.displayInlineStart} style={{width: props.width + 'vw'}}>

                {props.buttons.map((button, index) => (
                    <>
                        <Button disabled={button.disabled} style={{...{
                            borderRadius: '0px',
                            borderBottom: open === button.key ? 'black 2px solid' : 'transparent 2px solid',
                            width: 'fit-content',
                            transition: '.3s',
                            marginRight: '2vw',
                            textTransform: 'capitalize'
                        },...open === button.key ? getPrimaryColor({dark: props.dark}) :  getTertiaryColor({dark: props.dark})}} onClick={() => setOpen(button.key)}>{button.value}</Button>

                    </>
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
    tabs:PropTypes.object,
    dark:PropTypes.bool,
    height:PropTypes.number,
    width:PropTypes.number,
}