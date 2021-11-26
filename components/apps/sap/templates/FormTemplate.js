import PropTypes from "prop-types";
import Selector from "../../../core/inputs/selector/Selector";

import {useEffect, useMemo, useState} from "react";
import useQuery from "../../../core/visualization/hooks/useQuery";
import Cookies from "universal-cookie/lib";
import Host from "../utils/host";
import useDataWithDraft from "../../../core/inputs/form/useDataWithDraft";
import draftKeys from "./draftKeys";
import useData from "../../../core/inputs/form/useData";

export default function FormTemplate(props) {
    const [option, setOption] = useState('list_draft')

    const url = useMemo(() => {
        return Host().replace('api', option) + props.endpoint
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
        draftUrl: Host().replace('api', 'draft') + props.endpoint,
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
    noDraft: PropTypes.bool
}