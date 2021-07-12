import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import {AddRounded, EditRounded, SaveRounded} from "@material-ui/icons";
import ForumRequests from "../../utils/fetch/ForumRequests";
import subjectStyles from '../../styles/subject/Subject.module.css'
import styles from '../../styles/subject/Pop.module.css'
import SubjectPT from "../../packages/locales/SubjectPT";
import PopOverview from "./PopOverview";
import {AvatarGroup} from "@material-ui/lab";
import PersonAvatar from "../shared/PersonAvatar";
import PopForm from "./PopForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import Cookies from "universal-cookie/lib";
import submitSubjectLayout from "../../utils/submit/SubmitSubjectLayout";
import {Alert} from "sis-aeb-misc";
import Canvas from "../shared/canvas/modules/canvas/Canvas";
import deletePop from "../../utils/submit/DeletePop";
import SubjectEditModal from "./SubjectEditModal";
import LinkForm from "./LinkForm";
import Frame from "../shared/canvas/Frame";
import HandleChange from "../shared/canvas/methods/HandleChange";
import submitPop from "../../utils/submit/SubmitPop";
import axios from "axios";
import Host from "../../utils/shared/Host";


export default function Pops(props) {
    const [pops, setPops] = useState([])
    const changed = useRef(false)
    const popsRef = useRef([])
    const [currentEntity, setCurrentEntity] = useState(null)

    const [openForm, setOpenForm] = useState(false)
    const [openSubjectForm, setOpenSubjectForm] = useState(false)
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState({type: undefined, message: undefined})
    const [linkEntity, setLinkEntity] = useState({
        child: null,
        parent: null
    })
    const updatePops = () => {
        changed.current = false
        submitSubjectLayout({
            setStatus: () => null,
            data: popsRef.current,
            subject: props.subjectID
        })


    }
    useEffect(() => {
        ForumRequests.listPops(props.subjectID).then(res => {
            setPops(res)
            popsRef.current = res
        })
    }, [])

    return (
        <div style={{display: 'grid',}}>
            <Alert
                type={status.type} render={status.type !== undefined} rootElementID={'root'}
                handleClose={() => setStatus({type: undefined, message: undefined})} message={status.message}
            />
            <PopOverview
                data={currentEntity}
                handleClose={() => {
                    setCurrentEntity(null)
                    setShow(false)
                }}
                open={show}/>

            <LinkForm
                parent={linkEntity.parent} child={linkEntity.child}
                handleClose={status => {
                    setLinkEntity({
                        child: null,
                        parent: null
                    })

                    if (status) {
                        popsRef.current = []
                        setPops([])
                        ForumRequests.listPops(props.subjectID).then(res => {
                            setPops(res)
                            popsRef.current = res
                        })
                    }
                }}/>
            <PopForm
                handleClose={() => {
                    setCurrentEntity(null)
                    setOpenForm(false)
                }}
                handleChange={event => handleObjectChange({
                    event: event,
                    setData: setCurrentEntity
                })}
                id={currentEntity !== null && currentEntity !== undefined ? currentEntity.id : null}
                data={currentEntity} subjectID={props.subjectID}
                fetchPops={() => {
                    setPops([])
                    popsRef.current = []
                    ForumRequests.listPops(props.subjectID).then(res => {
                        setPops(res)
                        popsRef.current = res
                    })
                }}
                open={openForm}
            />

            <SubjectEditModal handleChange={props.handleChange} data={props.data} id={props.subjectID}
                              handleClose={() => setOpenSubjectForm(false)} open={openSubjectForm}/>

            <Frame
                handleChange={event => {
                    if (!changed.current)
                        changed.current = true
                    HandleChange({
                        event: event, entities: pops, setState: newValue => {
                            popsRef.current = newValue
                        }
                    })
                }}
                updateEntity={entity => {
                    submitPop({
                        subjectID: props.subjectID,
                        pk: entity.id,
                        data: entity,
                        setStatus: setStatus,
                        create: false
                    }).then(res => {
                        if (res) {
                            popsRef.current = []
                            setPops([])
                            ForumRequests.listPops(props.subjectID).then(res => {
                                setPops(res)
                                popsRef.current = res
                            })
                        }

                    })
                }} scrollableDivID={'scrollableDiv'}
                handleCreate={() => setOpenForm(true)}
                show={entity => {
                    setCurrentEntity(entity)
                    setShow(true)
                }}
                edit={entity => {
                    setCurrentEntity(entity)
                    setOpenForm(true)
                }}
                options={{
                    move: (new Cookies()).get('jwt') !== undefined,
                    edit: (new Cookies()).get('jwt') !== undefined,
                    show: true
                }}
                triggerLink={(child, parent) => {
                    setLinkEntity({
                        child: child,
                        parent: parent
                    })
                }}
                handleDelete={entity => {
                    deletePop({
                        id: entity.id,
                        setStatus: setStatus
                    }).then(res => {
                        if (res)
                            ForumRequests.listPops(props.subjectID).then(res => setPops(res))
                    })
                }}
                entities={pops}
                triggerUpdate={() => {
                    if (changed.current)
                        updatePops()
                }}
                style={{
                    width: '100vw'
                }}
                subject={props.data}
            />
        </div>
    )
}
Pops.propTypes = {
    subjectID: PropTypes.any,
    data: PropTypes.object,
    handleChange: PropTypes.func
}