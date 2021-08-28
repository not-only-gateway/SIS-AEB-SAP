import PropTypes from 'prop-types'
import Tabs from "../../shared/core/tabs/Tabs";

import React, {useState} from "react";
import InfrastructurePT from "../../../packages/locales/InfrastructurePT";
import InfrastructureForm from "./InfrastructureForm";
import ComponentsList from "./ComponentsList";

export default function Infrastructure(props) {
    const lang = InfrastructurePT
    const [openTab, setOpenTab] = useState(0)
    return (
        props.create ?
            <InfrastructureForm {...props}/>
            :
            <Tabs
                type={'vertical'}
                buttons={[
                    {
                        key: 0,
                        value: lang.details,
                        content: (
                            <div style={{width: '100%'}}>
                                <InfrastructureForm {...props}/>
                            </div>
                        )
                    }, {
                        key: 1,
                        value: lang.components,
                        content: <div style={{width: '100%'}}>
                            <ComponentsList infrastructure={props.data}/>
                        </div>
                    }
                ]}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />
    )
}
Infrastructure.propTypes = {

    data: PropTypes.object,
    handleChange: PropTypes.func,
    returnToMain: PropTypes.func,
    create: PropTypes.bool
}
