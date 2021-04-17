import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {ArrowDownwardRounded} from "@material-ui/icons";
import React, {useState} from "react";
import shared from '../../../styles/shared/Shared.module.css'
import {
    getBorder,
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
                // border: (props.border === undefined || props.border === null) ? (open ? '#39adf6 2px solid' : (!props.dark ? '#e2e2e2 1px solid' : null)) : props.border,
                // boxShadow: open ? (!props.dark ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'initial') : props.dark ? 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' : null,
                transition: '.3s'
            },
            ...getPrimaryBackground({dark: props.dark}),
            ...getBorder({dark: props.dark})
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