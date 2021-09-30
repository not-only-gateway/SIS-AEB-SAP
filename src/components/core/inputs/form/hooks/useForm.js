import React, {useEffect, useMemo, useRef, useState} from "react";

export default function useForm({noAutoHeight, initialData, dependencies}) {
    const ref = useRef()
    const [data, setData] = useState(!initialData ? {} : initialData)
    const [changed, setChanged] = useState(false)
    const handleChange = ({event, key}) => {
        let newData = {...data}
        newData[key] = event
        setData(newData)

        setChanged(true)
    }

    const disabled = useMemo(() => {
        let response = dependencies === undefined || !changed
        let i
        if (dependencies !== undefined && changed)
            for (i = 0; i < dependencies.length; i++)
                if (dependencies[i] !== undefined && dependencies[i] !== null)
                    response = (
                        response ||
                        data[dependencies[i].name] === null ||
                        data[dependencies[i].name] === undefined ||
                        (dependencies[i].type === 'string' ?
                            data[dependencies[i].name].length === 0
                            :
                            false)
                    )

        return response
    }, [data, dependencies])


    useEffect(() => {
        if (!noAutoHeight) {
            const newHeight = document.documentElement.offsetHeight - ref.current.getBoundingClientRect().y - 16
            if (ref.current.offsetHeight > newHeight)
                ref.current.style.maxHeight = newHeight + 'px'
        }
    }, [])

    return {
        ref, disabled,
        data, handleChange
    }
}
