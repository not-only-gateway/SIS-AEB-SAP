import PropTypes from 'prop-types'
import {useCallback, useEffect, useState} from "react";
import Requester from "../../misc/requester/Requester";

export default function useDataWithDraft(props) {
    const [changed, setChanged] = useState(false)
    const [changedDraft, setChangedDraft] = useState(false)
    const [data, setData] = useState({})
    const handleChange = ({event, key}) => {
        let newData = {...data}
        newData[key] = event
        setData(newData)
        console.log('Setting draft')
        setChangedDraft(true)
        setChanged(true)
    }
    const saveDraft = useCallback(async () => {
        console.log('On draft', changedDraft)
        await Requester({
            headers: props.draftHeaders,
            package: props.parsePackage(data),
            url: props.draftUrl,
            method: props.draftMethod
        }).then(res => {
            props.onSuccess(res)
            setChangedDraft(false)
        }).catch(e =>    setChangedDraft(false))
    }, [data, changedDraft])
    const clearState = () => {
        setData({})
        setChanged(false)
    }

    let interval = undefined
    useEffect(() => {

        if (!interval)
            interval = changedDraft ? setInterval(saveDraft, props.interval) : undefined
        return () => {
            if (interval)
                clearInterval(interval)
        }
    }, [changedDraft, data])
    useEffect(() => {

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
    draftUrl: PropTypes.string.isRequired,
    draftHeaders: PropTypes.object,
    interval: PropTypes.number.isRequired,
    draftMethod:PropTypes.string,
    parsePackage: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired
}