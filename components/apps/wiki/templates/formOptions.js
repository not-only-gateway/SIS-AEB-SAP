import {AssignmentRounded, HistoryRounded} from "@material-ui/icons";
import React, {useMemo} from "react";
import PropTypes from "prop-types";

export default function formOptions(props) {
    return useMemo(() => {
        return [
            {
                label: 'Histórico de mudanças',
                icon: <HistoryRounded/>,
                onClick: () => {
                    props.asHistory()
                    props.setOpen(true)
                },
                disabled: true //props.create
            },
            {
                label: 'Rascunhos',
                icon: <AssignmentRounded/>,
                onClick: () => {
                    props.asDraft()
                    props.setOpen(true)
                },
            }
        ]
    }, [props])
}

formOptions.propTypes = {
    asDraft: PropTypes.func,
    setOpen: PropTypes.func,
    asHistory: PropTypes.func,
    create: PropTypes.bool
}