import PropTypes from 'prop-types'
import {useCallback, useEffect, useState} from "react";

export default function useDataWithDraft(props) {
    const [changed, setChanged] = useState(false)
    const [data, setData] = useState(props.initialData === undefined || props.initialData === null? {} : props.initialData)
    const handleChange = ({event, key}) => {
        let newData = {...data}
        newData[key] = event
        setData(newData)

        setChanged(true)
    }
    const saveDraft = useCallback(() => {
        console.log('called', data)
    }, [data, changed])
    const clearState = () => {
        setData({})
        setChanged(false)
    }
    const interval = setInterval(saveDraft, props.interval)


    useEffect(() => {
        if (props.initialData === undefined || props.initialData === null)
            setData(props.initialData)
        else if (data === undefined || data === null)
            setData({})
        return () => {
            if (interval)
                clearInterval(interval)
        }
    }, [props.initialData])


    return {
        data, handleChange,
        setChanged, clearState, changed
    }
}
useDataWithDraft.propTypes = {
    initialData: PropTypes.object,
    draftUrl: PropTypes.string,
    draftHeaders: PropTypes.object,
    interval: PropTypes.number
}