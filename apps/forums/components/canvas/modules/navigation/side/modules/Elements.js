import {useState} from "react";
import styles from "../styles/Shapes.module.css";
import {ExpandLessRounded} from "@material-ui/icons";
import PropTypes from "prop-types";

export default function Elements(props) {
    const [open, setOpen] = useState(false)
    return (
        <div className={[styles.elementsContainer, open ? styles.elementsOpen : ''].join(' ')}>
            <div className={styles.optionsDivider} onClick={() => setOpen(!open)}>

                {props.label}
                <ExpandLessRounded style={{
                    transform: !open ? `rotate(180deg)` : undefined,
                    fontSize: '1.3rem',
                    color: '#777777',
                    transition: '150ms linear'
                }}/>

            </div>
            <div style={{display: !open ? 'none' : undefined, transition: '150ms linear'}}>
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