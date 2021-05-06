import Accordion from "../../layout/Accordion";
import mainStyles from "../../../styles/shared/Main.module.css";
import AccessProfileForm from "../../templates/forms/AccessProfileForm";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import fetchAccessProfile from "../../../utils/fetch/FetchAccessProfile";
import {Button, Modal} from "@material-ui/core";
import animations from '../../../styles/shared/Animations.module.css'
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import submitAccessProfile from "../../../utils/submit/SubmitAccessProfile";
import {AddRounded} from "@material-ui/icons";
import {getIconStyle} from "../../../styles/shared/MainStyles";

import LinkageForm from "../../templates/forms/LinkageForm";
import submitLinkage from "../../../utils/submit/SubmitLinkage";

export default function Linkage(props) {
    const [linkage, setLinkage] = useState({})
    const [modal, setModal] = useState(false)
    const [accepted, setAccepted] = useState(false)
    useEffect(() => {
        if (props.linkage !== undefined || props.linkage === linkage)
            setLinkage(props.linkage)

        if (accepted) {
            props.fetch()
            setAccepted(false)
            setModal(false)
        }
    }, [accepted])

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                   className={animations.fadeIn}>
                <div style={{
                    backgroundColor: 'white',
                    width: '75%',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    height: 'auto',
                    padding: '16px',

                }} key={props.create ? 'create-linkage' : props.linkage.id}>
                    <LinkageForm handleSubmit={submitLinkage}
                                 handleChange={event => handleObjectChange({
                                     event: event,
                                     setData: setLinkage
                                 })} create={props.create}
                                 setAccepted={setAccepted}
                                 data={linkage} locale={props.locale}/>
                </div>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}
            <Button className={animations.slideUpAnimation} style={{
                animationDelay: props.index * 200 + 'ms', width: '100%',
                display: 'flex',
                justifyContent: 'flex-start',
                border: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                borderRadius: '8px',
                minHeight: '70px',
                color: '#262626',
                textTransform: 'none',
                opacity: 0
            }} onClick={() => setModal(true)}>
                <AddRounded style={{
                    ...{
                        color: 'black',
                        display: !props.create ? 'none' : 'initial'
                    }, ...getIconStyle({dark: false})
                }}/>
                <p className={mainStyles.secondaryParagraph}>
                    {props.create ? 'Create' : props.linkage.denomination}
                </p>
            </Button>
        </>
    )
}

Linkage.propTypes = {
    linkage: PropTypes.object,
    locale: PropTypes.object,
    create: PropTypes.bool,
    index: PropTypes.number,
    fetch: PropTypes.func
}