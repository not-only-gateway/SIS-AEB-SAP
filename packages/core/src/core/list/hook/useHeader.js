import React, {useState} from "react";
import {AddRounded, CalendarTodayRounded, CategoryRounded, LinkRounded, TextFieldsRounded} from "@material-ui/icons";
import ToolTip from "../../misc/tooltip/ToolTip";

export default function useHeader(dispatch, actions){
    const [open, setOpen] = useState(false)
    const [selectedField, setSelectedField] = useState(null)

    const getHiddenField = (e) => {
        return {
            icon: <AddRounded/>,
            label: e.label,
            onClick: () => {
                dispatch({type: actions.UPDATE_VISIBILITY, payload: {key: e.key}})
            }
        }
    }

    const getField = (e) => {
        return {
            icon: getIcon(e.type),
            label: (
                <div style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', maxWidth: '100%'}}>
                    {e.label}
                    <ToolTip content={e.label}/>
                </div>
                    ),
            onClick: () => {
                setSelectedField({
                    ...{
                        key: e.key,
                        value: undefined,
                        type: e.type,
                        label: e.label
                    },
                    ...e.type === 'string' ? {contains: true} : {greater_than: true}
                })
                setOpen(true)
            }
        }
    }
    const getIcon = (type) => {
        let icon
        switch (type) {
            case 'date': {
                icon = <CalendarTodayRounded style={{fontSize: '1.2rem'}}/>
                break
            }

            case 'string': {
                icon = <TextFieldsRounded style={{fontSize: '1.2rem'}}/>
                break
            }
            case 'object': {
                icon = <LinkRounded style={{fontSize: '1.2rem'}}/>
                break
            }
            default: {
                icon = <CategoryRounded style={{fontSize: '1.2rem'}}/>
                break
            }
        }

        return icon
    }
    const getType = (object) => {
        let label
        if (object.greater_than)
            label = 'maior que'
        if (object.less_than)
            label = 'menor que'
        if (object.equal_to)
            label = 'igual a'
        if (object.contains)
            label = 'contém'
        if (object.different_from)
            label = 'diferente de'
        return label
    }
    const parseDate = (val) => {
        const date = new Date(val)
        return `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`
    }

    return { getType, parseDate, open, setOpen, selectedField, setSelectedField, getField, getHiddenField}
}