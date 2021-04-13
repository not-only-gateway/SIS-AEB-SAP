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
            border: (props.border === undefined || props.border === null) ? (open ? '#39adf6 2px solid' : (!props.dark ? '#e2e2e2 1px solid' : null)) : props.border,
            transition: '.3s',
            boxShadow: open ? (!props.dark ? 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px' : 'initial') : null,
            height: "fit-content",
            backgroundColor: props.dark ? '#3b424c' : null

        }} key={'accordion - ' + props.key}>
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

AccordionLayout.propTypes={
    dark: PropTypes.bool,
    summary: PropTypes.element,
    content: PropTypes.element,
    closedSize: PropTypes.number,
    openSize: PropTypes.number,
    border: PropTypes.any,
    disabled: PropTypes.bool,
    key: PropTypes.number
}