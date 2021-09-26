import React, {useEffect, useMemo, useRef, useState} from "react";
import Row from "../templates/Row";

export default function useForm(noAutoHeight, fieldsToRender, data, dependencies) {

    const ref = useRef()

    const [openOptions, setOpenOptions] = useState(false)
    const disabled = useMemo(() => {
        let response = dependencies === undefined || data === null || data === undefined || !dependencies.changed
        let i
        if (dependencies !== undefined && data !== null && data !== undefined && dependencies.changed)
            for (i = 0; i < dependencies.fields.length; i++)
                if (dependencies.fields[i] !== undefined && dependencies.fields[i] !== null)
                    response = (
                        response ||
                        data[dependencies.fields[i].name] === null ||
                        data[dependencies.fields[i].name] === undefined ||
                        (dependencies.fields[i].type === 'string' ?
                            data[dependencies.fields[i].name].length === 0
                            :
                            false)
                    )

        return response
    }, [data, dependencies])
    const fields = useMemo(() => {
        return fieldsToRender.map((e, i) => <React.Fragment key={e.title + '-' + i}>
            <Row children={e.child} title={e.title} />
        </React.Fragment>)
    }, [fieldsToRender])

    const handleMouseDown = (e) => {

        const target = e.target.className
        if (target !== 'EntityLayout_optionsContainer__1uQvl' && target !== 'EntityLayout_buttonContainer__NhngH' && target !== 'Form-module_buttonContainer__DCckt' && typeof target !== 'object')
            setOpenOptions(false)

    }
    useEffect(() => {
        if (!noAutoHeight) {
            const newHeight = document.documentElement.offsetHeight - ref.current.getBoundingClientRect().y - 16
            if (ref.current.offsetHeight > newHeight)
                ref.current.style.maxHeight = newHeight + 'px'
        }
        document.addEventListener('mousedown', handleMouseDown)
        return () => {
            document.removeEventListener('mousedown', handleMouseDown)
        }
    }, [])

    return {
        ref,disabled,
        openOptions, setOpenOptions,
        fields
    }
}
