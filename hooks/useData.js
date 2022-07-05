import React, {useEffect, useState} from "react";

export default function useData(initialData) {
    const [changed, setChanged] = useState(false)
    const [data, setData] = useState(initialData === undefined || initialData === null ? {} : initialData)
    const handleChange = ({event, key}) => {
        let newData = {...data}
        newData[key] = event
        setData(newData)

        setChanged(true)
    }

    const clearState = () => {
        setData({})
        setChanged(false)
    }
    useEffect(() => {
        if (initialData !== undefined && initialData !== null)
            setData(initialData)
    }, [initialData])


    return {
        data, handleChange,
        setChanged, clearState, changed
    }
}
