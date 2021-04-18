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
            ...{
                borderLeft: (props.border === undefined || props.border === null) ? 'black 2px solid': props.border,
                borderRight:'#f5f6f8 2px solid',
                borderTop:  '#f5f6f8 2px solid',
                borderBottom: '#f5f6f8 2px solid',
            },
            ...props.dark && open ? getBoxShadow({dark: props.dark}) : null
        }} className={shared.accordion_container} key={props.key}>
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