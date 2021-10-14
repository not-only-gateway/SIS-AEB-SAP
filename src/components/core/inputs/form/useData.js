import {useEffect, useState} from "react";
import PropTypes from "prop-types";

export default function useData(initialData) {
    const [changed, setChanged] = useState(false)
    const [data, setData] = useState(!initialData ? {} : initialData)
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
        if (typeof initialData === 'object')
            setData(initialData)
    }, [initialData])


    return {
        data, handleChange,
        setChanged, clearState, changed
    }
}
