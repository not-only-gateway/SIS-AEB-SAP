import PropTypes from "prop-types";
import Selector from "../../../core/inputs/selector/Selector";

import {useMemo, useState} from "react";
import useQuery from "../../../core/visualization/hooks/useQuery";
import Cookies from "universal-cookie/lib";
import Host from "../utils/shared/Host";
import useDataWithDraft from "../../../core/inputs/form/useDataWithDraft";

export default function FormOptions(props) {
    const [option, setOption] = useState('draft')

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

    const formHook = useDataWithDraft({
        initialData:data ,
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


    return (
        <>
            <div style={{display: 'none'}}>
                <Selector
                    hook={hook}
                    keys={props.keys}
                    open={open}
                    andleClose={() => setOpen(false)}
                    handleChange={entry => setData(entry)}
                />
            </div>
            {props.children({
                formHook,
                setOpen,
                asDraft: () => setOption('draft'),
                asHistory: () => setOption('registry')
            })}
        </>
    )
}

FormOptions.propTypes = {
    initialData: PropTypes.any,
    keys: PropTypes.arrayOf(PropTypes.object).isRequired,
    children: PropTypes.node.isRequired,
    endpoint: PropTypes.string,
}