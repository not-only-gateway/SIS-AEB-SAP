import React, {useState} from "react";
import animations from "../../styles/shared/Animations.module.css";
import mainStyles from "../../styles/shared/Main.module.css";
import PropTypes from "prop-types";
import {ClearRounded, DeleteForeverRounded, RemoveCircleRounded} from "@material-ui/icons";
import {Button, IconButton} from "@material-ui/core";
import {getIconStyle} from "../../styles/shared/MainStyles";

export default function ActiveFilter(props) {
    return (
        <div
            key={props.filter.key + '-filter-' + props.index}
            className={[animations.popInAnimation, mainStyles.overflowEllipsis].join(' ')}
            style={{
                backgroundColor: 'white',
                width: 'fit-content',
                animationDelay: props.index * 10 + 'ms',
                borderRadius: '8px',
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                height: '37px',
                fontSize: '.8rem',
                textTransform: 'uppercase',
                fontWeight: '550',
                transition: '300ms ease-in-out',
                padding: props.changed ? '0 8px 0 8px' : '0 0px 0 8px',
                display: 'flex',
                alignItems: 'center'
            }}

        >
            <p style={{
                display: null,
                color: '#262626'
            }}>
                {props.filter.value}
            </p>
            <IconButton disabled={props.filter.disabled}
                        style={{marginLeft: '5px', padding: '8px', display: props.changed ? 'none' : 'initial'}}
                        onClick={() => {
                            if (props.filter.type !== 'text')
                                props.handleChange({name: props.filter.key, value: undefined})
                            else
                                props.handleChange({name: props.filter.key, value: ''})

                            props.setChanged(true)

                        }}>
                <ClearRounded style={{fontSize: '1.3rem', color: '#777777'}}/>
            </IconButton>
        </div>
    )
}
ActiveFilter.propTypes = {
    filter: PropTypes.object,
    index: PropTypes.number,
    handleChange: PropTypes.func,
    setChanged: PropTypes.func,
    changed: PropTypes.bool
}