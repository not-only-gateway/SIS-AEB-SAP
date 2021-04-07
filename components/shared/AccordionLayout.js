import PropTypes from 'prop-types'
import {Button, Divider} from "@material-ui/core";
import {ArrowDownwardRounded, ArrowUpwardRounded} from "@material-ui/icons";
import React, {useState} from "react";

export default function AccordionLayout(props) {
    const [open, setOpen] = useState(false)
    return (
        <div style={{
            width: open ? props.openSize + 'vw' : props.closedSize + 'vw',
            borderRadius: '8px',
            border: props.border === undefined || props.border === null? (!props.dark ? '#e2e2e2 1px solid' : null) : props.border,
            transition: '.2s',
            boxShadow: open ? (!props.dark ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'initial') : null
        }}>
            <Button onClick={() => setOpen(!open)} disabled={props.disabled} style={{textTransform: 'none', display: 'flex', width: '100%', justifyContent: 'space-between'}}>
                {props.summary}
                {open ? <ArrowUpwardRounded/> : <ArrowDownwardRounded/>}
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
    disabled: PropTypes.bool
}