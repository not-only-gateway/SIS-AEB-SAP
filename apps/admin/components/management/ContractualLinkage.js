import mainStyles from "../../styles/shared/Main.module.css";
import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {Modal} from "@material-ui/core";
import animations from '../../styles/shared/Animations.module.css'
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import {AddRounded} from "@material-ui/icons";
import {getIconStyle} from "../../styles/shared/MainStyles";

import CommissionedLinkageForm from "./forms/LinkageForm";
import submitLinkage from "../../utils/submit/SubmitLinkage";
import shared from "../../styles/shared/Shared.module.css";

export default function ContractualLinkage(props) {
    const [linkage, setLinkage] = useState({})
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (props.linkage !== undefined || props.linkage === linkage)
            setLinkage(props.linkage)
    }, [])

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                   className={animations.fadeIn}>
                <div className={shared.modalContainer}>
                    <CommissionedLinkageForm
                        closeModal={() => setModal(false)}
                        handleSubmit={submitLinkage}
                        handleChange={event => handleObjectChange({
                            event: event,
                            setData: setLinkage
                        })} create={props.create}

                        data={linkage}/>
                </div>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}
            <button
                className={[shared.rowContainer, animations.fadeIn].join(' ')}
                onClick={() => setModal(true)}
                key={props.create ? 'create-linkage' : props.linkage.id}
            >
                <AddRounded style={{
                    ...{
                        color: 'black',
                        display: !props.create ? 'none' : 'initial'
                    }, ...getIconStyle({dark: false})
                }}/>

                <p className={mainStyles.secondaryParagraph}>
                    {props.create ? props.lang.create :
                        <div className={mainStyles.displayInlineStart}>
                            <div style={{display: 'flex', gap: '16px'}}>
                                <h5 style={{
                                    color: '#555555',
                                    marginBottom: 0,
                                    marginTop: 0
                                }}>{props.linkage.denomination}</h5>

                                <h5 style={{
                                    color: '#555555',
                                    marginBottom: 0,
                                    marginTop: 0
                                }}>{props.linkage.description}</h5>
                            </div>
                        </div>
                    }
                </p>
            </button>
        </>
    )
}

ContractualLinkage.propTypes = {
    linkage: PropTypes.object,
    create: PropTypes.bool,
    lang: PropTypes.object
}