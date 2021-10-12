import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import styles from './styles/Vertical.module.css'
import Switcher from "../../misc/switcher/Switcher";
import {ArrowDropDownRounded} from "@material-ui/icons";
import Row from "./components/row";

export default function VerticalTabs(props) {
    const [open, setOpen] = useState(0)
    const ref = useRef()

    return (
        <div className={styles.wrapper} ref={ref} >
            <div className={styles.header}>
                {props.children}
                <div className={styles.tabs}>
                    {props.classes.map((e, i) => (
                        <React.Fragment key={i + '-class'}>
                            <Row setOpen={setOpen} open={open} data={e} index={i}/>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <Switcher openChild={open}>
                {props.classes.map((e, i) => e.buttons.map((b, bI) => (i + bI) === open ? b.children : null))}
            </Switcher>
        </div>
    )
}

VerticalTabs.proptypes = {
    classes: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        buttons: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                children: PropTypes.node,
                onClick: PropTypes.func
            })
        ),
    })),
    children: PropTypes.node
}
