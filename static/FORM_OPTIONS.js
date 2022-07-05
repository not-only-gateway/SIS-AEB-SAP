import {AssignmentRounded, HistoryRounded} from "@material-ui/icons";
import React from "react";

export default function FORM_OPTIONS({asDraft, setOpen, asHistory}) {
    return [
        {
            label: 'Histórico de mudanças',
            icon: <HistoryRounded/>,
            onClick: () => {
                asHistory()
                setOpen(true)
            },
            disabled: true
        },
        {
            label: 'Rascunhos',
            icon: <AssignmentRounded/>,
            onClick: () => {
                asDraft()
                setOpen(true)
            },
        }
    ]
}