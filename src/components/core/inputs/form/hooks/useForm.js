import React, {useEffect, useMemo, useRef} from "react";

export default function useForm({noAutoHeight, data, changed, dependencies}) {
    const ref = useRef()

    const disabled = useMemo(() => {
        let response = dependencies === undefined || !changed
        let i
        if (dependencies !== undefined && changed)
            for (i = 0; i < dependencies.length; i++)
                if (dependencies[i] !== undefined && dependencies[i] !== null)
                    response = (
                        response ||
                        data[dependencies[i].key] === null ||
                        data[dependencies[i].key] === undefined ||
                        (dependencies[i].type === 'string' || dependencies[i].type === 'array' ?
                            data[dependencies[i].key].length === 0
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
        ref, disabled
    }
}
