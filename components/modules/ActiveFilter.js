import React, {useState} from "react";
import animations from "../../styles/shared/Animations.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import PropTypes from "prop-types";
import {DeleteForeverRounded} from "@material-ui/icons";

export default function ActiveFilter(props) {
    const [hovered, setHovered] = useState(false)
    return (
        <div
            key={props.filter.key + '-filter-' + props.index}
            className={[animations.popInAnimation, mainStyles.overflowEllipsis, mainStyles.displayInlineCenter].join(' ')}
            style={{
                backgroundColor: hovered ? '#f54269' : 'white',
                width: 'calc(12.5% - 16px)',
                animationDelay: props.index * 10 + 'ms',
                borderRadius: '5px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                height: '37px',
                cursor: props.filter.disabled ? null : 'pointer',
                fontSize: '.8rem',
                textTransform: 'uppercase',
                fontWeight: '550',
                transition: '300ms ease-in-out'
            }}
            onMouseLeave={() => setHovered(false)}
            onMouseEnter={() => setHovered(true)}
            onClick={() => {
                if (!props.filter.disabled) {
                    console.log(props)
                    if (props.filter.type !== 'text')
                        props.handleChange({name: props.filter.key, value: undefined})
                    else
                        props.handleChange({name: props.filter.key, value: ''})

                    props.setChanged(true)
                }
            }}>
            <DeleteForeverRounded style={{color: 'white',  display:!hovered ? 'none' : null, opacity: 0,animationDelay: '50ms'}} className={animations.popInAnimation}/>
            <p style={{margin: 0, display: hovered ? 'none' : null, opacity: 0, animationDelay: '50ms'}} className={animations.popInAnimation}>
                {props.filter.value}
            </p>
        </div>
    )
}
ActiveFilter.propTypes={
    filter: PropTypes.object,
    index: PropTypes.number,
    handleChange: PropTypes.func,
    setChanged: PropTypes.func
}