import {useState} from "react";
import styles from "../../styles/Shapes.module.css";
import {ArrowBackIos, ArrowDropDown} from "@material-ui/icons";
import PropTypes from "prop-types";

export default function Elements(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{ borderRadius: '0 5px 5px 0 ', display: 'grid', gap: '16px', borderLeft: open? '#0095ff 2px solid' : '#e0e0e0 2px solid', transition: '150ms linear'}}>
            <div className={styles.optionsDivider} onClick={() => setOpen(!open)}>

                {props.label}
                <ArrowDropDown style={{
                    transform: open ? `rotate(180deg)`  : undefined,
                    fontSize: '1.1rem',
                    color: '#777777',
                    transition: '150ms linear'
                }}/>

            </div>
            <div style={{display: !open ? 'none' : undefined,transition: '150ms linear'}}>
                {props.children}
            </div>
        </div>
    )
}
Elements.propTypes = {
    onDragStart: PropTypes.func,
    setData: PropTypes.func,
    data: PropTypes.object,
    label: PropTypes.string
}