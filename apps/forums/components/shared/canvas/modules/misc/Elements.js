import {useState} from "react";
import styles from "../../styles/Shapes.module.css";
import {ArrowBackIos} from "@material-ui/icons";
import PropTypes from "prop-types";

export default function Elements(props) {
    const [open, setOpen] = useState(false)
    return (
        <>
            <div className={styles.optionsDivider} onClick={() => setOpen(!open)}>
                <ArrowBackIos style={{
                    transform: `rotate(${open ? '' : '-'}90deg)`,
                    fontSize: '1.1rem',
                    color: '#777777',
                    transition: '150ms linear'
                }}/>
                {props.label}
                <div className={styles.divider}/>
            </div>
            <div style={{height: open ? 'auto' : '0px', overflow: 'hidden', opacity: open ? '1' : '0', transition: '150ms linear'}}>
                {props.children}
            </div>
        </>
    )
}
Elements.propTypes = {
    onDragStart: PropTypes.func,
    setData: PropTypes.func,
    data: PropTypes.object,
    label: PropTypes.string
}