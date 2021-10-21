import PropTypes from 'prop-types'
import {useCallback, useEffect, useState} from "react";

export default function useDataWithDraft(props) {
    const [changed, setChanged] = useState(false)
    const [changedDraft, setChangedDraft] = useState(false)
    const [data, setData] = useState({})
    const handleChange = ({event, key}) => {
        let newData = {...data}
        newData[key] = event
        setData(newData)
        console.log('ON CHANGE')
        setChangedDraft(true)
        setChanged(true)
    }
    const saveDraft = useCallback(() => {
        if(changedDraft) {
            setChangedDraft(false)
            console.log('called', data, changedDraft)
        }
    }, [data, changedDraft])
    const clearState = () => {
        setData({})
        setChanged(false)
    }
    setInterval(saveDraft, props.interval)


    useEffect(() => {
        console.log('ON EFFECT CHANGE')
        if (props.initialData !== undefined && props.initialData !== null)
            setData(props.initialData)
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