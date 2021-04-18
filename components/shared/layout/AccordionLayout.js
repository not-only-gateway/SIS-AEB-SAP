import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {ArrowDownwardRounded} from "@material-ui/icons";
import React, {useState} from "react";
import shared from '../../../styles/shared/Shared.module.css'
import {
    getBorder, getBoxShadow,
    getPrimaryBackground,
    getSecondaryBackground,
    getTertiaryBackground
} from "../../../styles/shared/MainStyles";

export default function AccordionLayout(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{
            ...{
                width: open ? (props.openSize !== null ? props.openSize + 'vw' : 'fit-content') : props.closedSize + 'vw',
                minWidth: props.openSize === null ? '45vw' : props.closedSize,
                transition: '.3s'
            },
            ...(props.border === undefined || props.border === null) ?  getBorder({dark: props.dark}) : {borderLeft: props.border},
            ...props.dark ? (open ? getBoxShadow({dark: props.dark}) : null) : (open ? {boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'} : null)
        }} className={shared.accordion_container} key={'accordion-' + props.key}>
            <Button onClick={() => setOpen(!open)} disabled={props.disabled}
                    style={{
                        textTransform: 'none',
                        display: 'flex',
                        width: '100%',
                        justifyContent: 'space-between',
                        color: props.dark ? 'white' : 'black',
                        border: 'none',
                    }}>
                {props.summary}
                <ArrowDownwardRounded style={{transform: open ? 'rotate(180deg)' : null, transition: '300ms'}}/>
            </Button>
            {open ?
                <>
                    <Divider orientation={'horizontal'}/>
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
    background: PropTypes.any
}