import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {AddRounded} from "@material-ui/icons";
import {Divider, Modal} from "@material-ui/core";

import mainStyles from '../../styles/shared/Main.module.css'
import CollaborationForm from "../person/forms/CollaborationForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import mapToSelect from "../../utils/shared/MapToSelect";
import submitCollaboration from "../../utils/submit/SubmitCollaboration";
import animations from '../../styles/shared/Animations.module.css'
import shared from "../../styles/shared/Shared.module.css";

export default function Collaboration(props) {

    const [dependencies, setDependencies] = useState({
        units: [],
        effectiveRoles: [],
        commissionedRoles: [],
        accessProfiles: [],
        linkages: [],
        seniors: [],
    })
    const [maxID, setMaxID] = useState({
        unitsMaxID: null
    })
    const [lastFetchedSize, setLastFetchedSize] = useState({
        unitsFetchedSize: 0
    })
    const [modal, setModal] = useState(false)
    const [collaboration, setCollaboration] = useState({})
    const [loading, setLoading] = useState(true)
    const [accepted, setAccepted] = useState(false)
    const [focused, setFocused] = useState(false)

    useEffect(() => {
        if (!collaboration.unit && !props.create) {

            if (props.collaborationID)
                fetchCollaboration({
                    setCollaboration: setCollaboration,
                    setLoading: setLoading,
                    collaborationID: props.collaborationID
                }).then(res => {
                    console.log('THIS IS COLLAB')
                    console.log(res)
                    if (res !== null)
                        setCollaboration(res)
                })
            setLoading(false)
        }
        if (modal) {
            setLoading(true)
            fetchUnits({
                setData: res => handleObjectChange({
                    event: {name: 'units', value: mapToSelect({data: res, option: 0})},
                    setData: setDependencies
                }),
                data: dependencies.units,
                maxID: null,
                searchInput: null,
                setMaxID: res => handleObjectChange({
                    event: {name: 'unitsMaxID', value: res},
                    setData: setMaxID
                }),
                setLastFetchedSize: res => handleObjectChange({
                    event: {name: 'unitsFetchedSize', value: res},
                    setData: setLastFetchedSize
                })
            })

            fetchLinkages().then(res => handleObjectChange({
                event: {name: 'linkages', value: mapToSelect({data: res, option: 1})},
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
                event: {name: 'accessProfiles', value: mapToSelect({data: res, option: 1})},
                setData: setDependencies
            }))
            if (collaboration.unit)
                fetchSeniors({
                    unitID: collaboration.unit.id ? collaboration.unit.id : collaboration.unit.key,
                    memberID: props.memberID
                }).then(res => {
                    console.log(res)
                    handleObjectChange({
                        event: {name: 'seniors', value: mapToSelect({data: res, option: 3})},
                        setData: setDependencies
                    })
                })

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
        if (accepted) {
            setModal(false)
            setAccepted(false)
            props.fetch()

        }
    }, [collaboration.unit, modal, accepted])

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                   className={animations.fadeIn}>
                <div style={{
                    backgroundColor: 'white',
                    width: '75%',
                    maxHeight: '700px',
                    paddingTop: '16px',
                    borderRadius: '8px',
                    position: "relative",

                    overflowY: 'auto'
                }}>
                    <CollaborationForm
                        handleClose={() => setModal(false)}
                        locale={props.locale}
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
                        setAccepted={setAccepted}
                    />
                </div>
            </Modal>
        )
    }

    function getLang(locale) {
        let response = 'New Collaboration'
        if (locale === 'pt')
            response = 'Nova colaboração'

        return response
    }

    if (!loading)
        return (
            <div key={props.collaborationID + '-' + props.memberID} style={{width: '100%'}}>
                {renderModal()}

                <button onClick={() => setModal(true)}
                        onMouseDown={() => setFocused(true)}
                        onMouseUp={() => setFocused(false)}
                        onMouseLeave={() => {
                            setFocused(false)
                        }}

                        className={[shared.rowContainer, animations.popInAnimation].join(' ')}
                        style={{boxShadow: focused ? '0 0 1px 1px #ecedf2' : undefined}}
                >
                    <>
                        {props.create ?
                            <div className={mainStyles.displayInlineStart} style={{width: 'fit-content'}}>
                                <AddRounded style={{marginRight: '10px', color: '#555555'}}/>
                                <Divider orientation={'horizontal'} style={{
                                    width: '10px',
                                    marginRight: '10px',

                                }}/>
                                <p>{getLang(props.locale)}</p>
                            </div>
                            :
                            <h5 style={{marginBottom: 'auto', marginTop: 'auto'}}>
                                {collaboration.tag}
                            </h5>
                        }
                    </>
                </button>

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
