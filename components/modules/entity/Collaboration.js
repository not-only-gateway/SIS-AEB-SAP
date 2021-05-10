import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import {Button, Divider, Modal} from "@material-ui/core";
import CollaborationSummary from "../../elements/CollaborationSummary";
import mainStyles from '../../../styles/shared/Main.module.css'
import {getIconStyle} from "../../../styles/shared/MainStyles";
import CollaborationForm from "../../templates/forms/CollaborationForm";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import fetchCollaboration from "../../../utils/fetch/FetchCollaboration";
import fetchUnits from "../../../utils/fetch/FetchUnits";
import fetchCommissionedRoles from "../../../utils/fetch/FetchCommissionedRoles";
import fetchEffectiveRoles from "../../../utils/fetch/FetchEffectiveRoles";
import fetchAccessProfiles from "../../../utils/fetch/FetchAccessProfiles";
import fetchLinkages from "../../../utils/fetch/FetchLinkages";
import mapToSelect from "../../../utils/shared/MapToSelect";
import fetchSeniors from "../../../utils/fetch/FetchSeniors";
import submitCollaboration from "../../../utils/submit/SubmitCollaboration";
import fetchCanBeMain from "../../../utils/fetch/FetchCanBeMain";
import animations from '../../../styles/shared/Animations.module.css'

export default function Collaboration(props) {

    const [dependencies, setDependencies] = useState({
        units: [],
        effectiveRoles: [],
        commissionedRoles: [],
        accessProfiles: [],
        linkages: [],
        seniors: [],
    })
    const [modal, setModal] = useState(false)
    const [collaboration, setCollaboration] = useState({})
    const [canBeMain, setCanBeMain] = useState(false)
    const [loading, setLoading] = useState(true)
    const [accepted, setAccepted] = useState(false)

    useEffect(() => {
        if (!collaboration.unit && !props.create) {

            if (props.collaborationID)
                fetchCollaboration({
                    setCollaboration: setCollaboration,
                    setLoading: setLoading,
                    collaborationID: props.collaborationID
                }).then(res => {
                    if (res !== null)
                        setCollaboration(res)
                })
            setLoading(false)
        }
        if (modal) {
            setLoading(true)
            fetchCanBeMain(props.memberID).then(res => {

                setCanBeMain(res)
            })
            fetchUnits().then(res => handleObjectChange({
                event: {name: 'units', value: mapToSelect({data: res, option: 0})},
                setData: setDependencies
            }))
            fetchLinkages().then(res => handleObjectChange({
                event: {name: 'linkages', value: mapToSelect({data: res, option: 5})},
                setData: setDependencies
            }))
            fetchCommissionedRoles().then(res => handleObjectChange({
                event: {name: 'commissionedRoles', value: mapToSelect({data: res, option: 2})},
                setData: setDependencies
            }))
            fetchEffectiveRoles().then(res => handleObjectChange({
                event: {name: 'effectiveRoles', value: mapToSelect({data: res, option: 1})},
                setData: setDependencies
            }))
            fetchAccessProfiles().then(res => handleObjectChange({
                event: {name: 'accessProfiles', value: mapToSelect({data: res, option: 4})},
                setData: setDependencies
            }))
            if (collaboration.unit)
                fetchSeniors().then(res => handleObjectChange({
                    event: {name: 'seniors', value: mapToSelect({data: res, option: 3})},
                    setData: setDependencies
                }))

            setLoading(false)
        } else {
            setDependencies({
                units: [],
                effectiveRoles: [],
                commissionedRoles: [],
                accessProfiles: [],
                linkages: [],
                seniors: [],
            })
            setLoading(false)
        }
        if(accepted) {
            setModal(false)
            setAccepted(false)
            props.fetch()

        }
    }, [collaboration.unit, modal,accepted])

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                   className={animations.fadeIn}>
                <div style={{
                    backgroundColor: 'white',
                    width: '75%',
                    height: 'auto',
                    padding: '32px',
                    borderRadius: '8px'
                }}>
                    <CollaborationForm
                        collaboration={collaboration}
                        handleChange={event => handleObjectChange({event: event, setData: setCollaboration})}
                        submitChanges={submitCollaboration}
                        collaborationID={props.collaborationID}
                        units={dependencies.units}
                        seniors={dependencies.seniors}
                        effectiveRoles={dependencies.effectiveRoles}
                        commissionedRoles={dependencies.commissionedRoles}
                        linkages={dependencies.linkages}
                        accessProfiles={dependencies.accessProfiles}
                        memberID={props.memberID}
                        canBeMain={canBeMain}
                        setAccepted={setAccepted}
                    />
                </div>
            </Modal>
        )
    }

    if (!loading)
        return (
            <div style={{width: '100%'}}>
                {renderModal()}
                <Button onClick={() => setModal(true)} style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    border: 'hsla(210, 11%, 78%, 0.5)  .7px solid',
                    borderRadius: '8px',
                    minHeight: '70px',
                    color: '#262626',
                    textTransform: 'none'
                }} key={'collaboration-' + props.key}>
                    <>
                        {props.create ?
                            <div className={mainStyles.displayInlineStart} style={{width: 'fit-content'}}>
                                <AddRounded style={getIconStyle({dark: false})}/>
                                <Divider orientation={'horizontal'} style={{
                                    width: '10px',
                                    marginRight: '10px',

                                    color: '#262626'
                                }}/>
                                <p>New Collaboration</p>
                            </div>
                            :
                            <CollaborationSummary
                                commissionedRole={collaboration.commissioned_role ? collaboration.commissioned_role.value : null}
                                substitute={collaboration.is_substitute}
                                activeRole={collaboration.is_active_on_role}
                                mainCollaboration={collaboration.main_collaboration}
                                effectiveRole={collaboration.effective_role ? collaboration.effective_role.value : null}
                                additionalRoleInfo={collaboration.additional_info !== undefined ? collaboration.additional_info : null}
                                unit={collaboration.unit ? collaboration.unit.value : null}/>
                        }
                    </>
                </Button>
            </div>

        )
    else
        return null
}

Collaboration.propTypes = {
    canEdit: PropTypes.bool,
    locale: PropTypes.string,
    create: PropTypes.bool,
    index: PropTypes.number,
    memberID: PropTypes.any,
    collaborationID: PropTypes.number,
    key: PropTypes.any,
    fetch: PropTypes.func
}
