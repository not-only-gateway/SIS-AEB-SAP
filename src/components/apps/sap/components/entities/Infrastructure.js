import PropTypes from 'prop-types'
import {Tabs} from "sis-aeb-core";
import React, {useState} from "react";
import InfrastructurePT from "../../locales/InfrastructurePT";
import InfrastructureForm from "../forms/InfrastructureForm";
import ComponentsList from "../lists/ComponentsList";

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