import ProjectForm from "../index/ProjectForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import React, {useState} from "react";
import Tabs from "../shared/misc/tabs/Tabs";

import ProjectPT from "../../packages/locales/ProjectPT";
import PropTypes from 'prop-types'
import TedPT from "../../packages/locales/TedPT";
import TedForm from "../index/TedForm";
import AddendumList from "./AddendumList";
export default function Ted(props){
    const lang = TedPT
    const [openTab, setOpenTab] = useState(0)
    return(
        <div>

            <Tabs
                buttons={[
                    {
                        key: 0,
                        value: lang.ted,
                        content: (
                            <TedForm
                                returnToMain={() => {
                                    null
                                }}
                                handleChange={event => handleObjectChange({
                                    event: event,
                                    setData: props.setTed
                                })} id={props.ted.id}
                                create={false}
                                data={props.ted}/>
                        )
                    },

                    {
                        key: 1,
                        value: lang.addendum,
                        content: <AddendumList ted={props.ted}/>
                    }
                ]} type={'vertical'}
                setOpenTab={setOpenTab}
                openTab={openTab}
            />

        </div>
    )
}
Ted.propTypes={
    ted: PropTypes.object,
    setTed: PropTypes.func
}
