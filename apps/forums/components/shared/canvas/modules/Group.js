import styles from "../styles/Frame.module.css";
import React, {useRef} from "react";
import PropTypes from 'prop-types'
import {AddRounded} from "@material-ui/icons";

export default function Group(props) {

    const ref = useRef()

    return (
        <div
            className={styles.group}
            key={'group-' + props.index}
            id={'group-' + props.index}
            ref={ref}
            onMouseDown={event => {
                if (typeof event === 'object' && event.button === 0 && !props.inGroup) {
                    props.move({
                        id: ('group-' + props.index)
                    })
                }
            }}
            style={{
                position: 'absolute',
                left: props.group.placement.x + 'px',
                top: props.group.placement.y + 'px',
                width: 'auto'
            }}>
            {props.children}

            <div className={styles.placeHolderNode}>
                <AddRounded/>
            </div>


        </div>
    )
}
Group.propTypes = {
    group: PropTypes.object,
    index: PropTypes.number,
    onDrag: PropTypes.bool,
    move: PropTypes.func
}