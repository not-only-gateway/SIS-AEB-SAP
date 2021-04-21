import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {ArrowDownwardRounded} from "@material-ui/icons";
import React, {useState} from "react";
import shared from '../../../styles/shared/Shared.module.css'
import {
    getBorder, getBoxShadow,
    getSecondaryBackground,
    getPrimaryBackground,
    getTertiaryBackground
} from "../../../styles/shared/MainStyles";
import animations from '../../../styles/shared/Animations.module.css'

export default function AccordionLayout(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{
            ...{
                width: open ? (props.openSize !== null ? props.openSize + 'vw' : 'fit-content') : props.closedSize + 'vw',
                border: open || props.asRow ? null : !props.dark ? '#e5e6e8 1px solid' : 'initial',
                borderRadius: open ? '0 8px 8px 0' : props.asRow ? null : '8px',
                height: 'fit-content',
                opacity: '0',
                padding: props.asButton === true ? 0 : null,
                animationDelay: props.animationDelay !== undefined ?  props.animationDelay + 'ms' : null
            },
            ...open || props.asRow ? {
                borderRight: props.asRow ? null : '#e5e6e8 1px solid',
                borderTop: props.asRow ? null : '#e5e6e8 1px solid',
                borderBottom: '#e5e6e8 1px solid'
            } : null,
            ...props.dark && open ? getBoxShadow({dark: props.dark}) : null,
            ...open ? getBorder({dark: props.dark, highlight: true}) : null
        }} className={animations.slideUpAnimation} key={props.key}>
            <Button onClick={props.asButton !== true ? () => setOpen(!open) : null} disabled={props.disabled}
                    style={{
                        padding: props.asRow ? '0' : null,
                        textTransform: 'none',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        color: props.dark ? 'white' : 'black',
                        borderRadius: open ? '0 8px 8px 0' : null

                    }}>
                {props.summary}
                {props.disabled ? null :
                    <ArrowDownwardRounded style={{
                        transform: open ? 'rotate(180deg)' : props.asButton ? 'rotate(-90deg)' : null,
                        transition: '300ms'
                    }}/>
                }
            </Button>
            {open ?

                <div style={{ transition: '2s ease-in-out'}}>
                    {props.content}
                </div>
                :
                null
            }
        </div>
    )
}

AccordionLayout.propTypes = {
    dark: PropTypes.bool,
    summary: PropTypes.element,
    content: PropTypes.element,
    closedSize: PropTypes.number,
    openSize: PropTypes.number,
    asRow: PropTypes.any,
    disabled: PropTypes.bool,
    key: PropTypes.number,
    background: PropTypes.string,
    asButton: PropTypes.bool,
    animationDelay: PropTypes.number
}
