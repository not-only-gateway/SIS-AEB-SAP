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

export default function AccordionLayout(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{
            ...{
                width: open ? (props.openSize !== null ? props.openSize + 'vw' : 'fit-content') : props.closedSize + 'vw',
                minWidth: props.openSize === null ? '45vw' : props.closedSize,
                border: open ? null : !props.dark ? '#e5e6e8 1px solid' : 'initial',
                borderRadius: open ? '0 8px 8px 0' : '8px'
            },
            ...open ? {
                borderRight: '#e5e6e8 1px solid',
                borderTop: '#e5e6e8 1px solid',
                borderBottom: '#e5e6e8 1px solid'
            }: null,
            ...props.dark && open ? getBoxShadow({dark: props.dark}) : null,
            ...open ? getBorder({dark: props.dark, highlight: true}) : null
        }} className={shared.accordion_container} key={props.key}>
            <Button onClick={() => setOpen(!open)} disabled={props.disabled}
                    style={{
                        textTransform: 'none',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        color: props.dark ? 'white' : 'black',
                        borderRadius: open ? '0 8px 8px 0' : null
                    }}>
                {props.summary}
                {props.disabled ? null :
                    <ArrowDownwardRounded style={{transform: open ? 'rotate(180deg)' : null, transition: '300ms'}}/>
                }
            </Button>
            {open ?
                <>
                    <div style={{marginTop: '2vh'}}>
                        {props.content}
                    </div>
                </>
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
    border: PropTypes.any,
    disabled: PropTypes.bool,
    key: PropTypes.number,
    background: PropTypes.string
}
