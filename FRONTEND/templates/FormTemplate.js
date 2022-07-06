import PropTypes from "prop-types";


import {useEffect, useMemo, useState} from "react";

import Cookies from "universal-cookie/lib";

import {Selector, useQuery} from 'mfc-core'
import useDataWithDraft from "../hooks/useDataWithDraft";
import draftKeys from "../apps/sap/templates/draftKeys";
import useData from "../hooks/useData";
import ParseHost from "../parseHost";

export default function FormTemplate(props) {
    const [option, setOption] = useState('list_draft')

    const url = useMemo(() => {
        return ParseHost().replace('api', option) + props.endpoint
    }, [props.endpoint, option])

    const hook = useQuery({
        url: url,
        headers: {'authorization': (new Cookies()).get('jwt')},
        parsePackage: p => p
    })
    const [open, setOpen] = useState(false)
    const [data, setData] = useState(props.initialData)
    const [draftID, setDraftID] = useState()

    const formHook = props.noDraft ? useData(data) : useDataWithDraft({
        initialData: data,
        draftUrl: ParseHost(props.service).replace('api', 'draft') + props.endpoint,
        draftHeaders: {'authorization': (new Cookies()).get('jwt')},
        interval: 5000,
        parsePackage: pack => {
            return {
                ...pack,
                identifier: draftID
            }
        },
        draftMethod: draftID ? 'put' : 'post',
        onSuccess: (res) => {
            setDraftID(res.data.id)
        }
    })

    useEffect(() => {
        setData(props.initialData)
    }, [props.initialData])

    return (
        <>
            <div style={{display: 'none'}}>
                <Selector
                    hook={hook}
                    keys={option === 'list_draft' ? draftKeys : props.keys}
                    title={option === 'list_draft' ? 'Rascunhos' : 'Histórico'}
                    open={open}
                    handleClose={() => setOpen(false)}
                    handleChange={entry => {
                        if(entry){
                            let data = {...entry?.data}
                            let newData = {}
                            Object.keys(data).forEach(k => {
                                if(typeof data[k] !== 'object')
                                    newData[k] = data[k]
                            })
                            if(props.initialData){
                                Object.keys(props.initialData).forEach(k => {
                                    if(Object.keys(newData).indexOf(k) === -1)
                                        newData[k] = props.initialData[k]
                                })
                            }
                            setData(newData)
                        }

                    }}
                />
            </div>
            {props.children({
                formHook,
                setOpen,
                asDraft: () => setOption('list_draft'),
                asHistory: () => setOption('entry_history')
            })}
        </>
    )
}

FormTemplate.propTypes = {
    initialData: PropTypes.any,
    keys: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.func.isRequired,
    endpoint: PropTypes.string,
    service: PropTypes.string,
    noDraft: PropTypes.bool
}