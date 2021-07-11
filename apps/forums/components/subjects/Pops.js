import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
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


export default function Pops(props) {
    const [pops, setPops] = useState([])
    const lang = SubjectPT
    const [currentEntity, setCurrentEntity] = useState(null)
    const [update, setUpdate] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [openSubjectForm, setOpenSubjectForm] = useState(false)
    const [show, setShow] = useState(false)
    const [status, setStatus] = useState({type: undefined, message: undefined})
    const [linkEntity, setLinkEntity] = useState({
        child: null,
        parent: null
    })

    useEffect(() => {
        if (update === false) {
            setPops([])
            ForumRequests.listPops(props.subjectID).then(res => setPops(res))
        }

    }, [update])

    return (
        <div  style={{display: 'grid', }}>
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
                handleClose={success => {
                    setLinkEntity({
                        child: null,
                        parent: null
                    })
                    if (success)
                        setUpdate(true)
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
                    ForumRequests.listPops(props.subjectID).then(res => setPops(res))
                }}
                open={openForm}
            />

            <SubjectEditModal handleChange={props.handleChange} data={props.data} id={props.subjectID}
                              handleClose={() => setOpenSubjectForm(false)} open={openSubjectForm}/>

            {/*<div className={subjectStyles.infoHeader}>*/}
            {/*    <div style={{display: 'grid', gap: '8px'}}>*/}
            {/*        <div style={{*/}
            {/*            fontSize: '1.6rem',*/}
            {/*            color: '#333333',*/}
            {/*            display: 'flex',*/}
            {/*            alignItems: 'center',*/}
            {/*            gap: '8px'*/}
            {/*        }}>*/}
            {/*            {props.data.title}*/}
            {/*            <button style={{display: (new Cookies()).get('jwt') === undefined ? 'none' : undefined}}*/}
            {/*                    className={subjectStyles.buttonContainer} onClick={() => setOpenSubjectForm(true)}>*/}
            {/*                <EditRounded style={{color: '#555555'}}/>*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*        <div style={{*/}
            {/*            fontSize: '.9rem',*/}
            {/*            color: '#555555'*/}
            {/*        }}>*/}
            {/*            {props.data.description}*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*        <div style={{*/}
            {/*            display: 'flex',*/}
            {/*            alignItems: 'center',*/}
            {/*            gap: '8px'*/}
            {/*        }}>*/}
            {/*            <AvatarGroup>*/}
            {/*                {props.data.collaborators !== undefined ? props.data.collaborators.map(collaborator =>*/}
            {/*                    <PersonAvatar image={collaborator.image} variant={'circular'}*/}
            {/*                                  elevation={'false'}>*/}
            {/*                        {collaborator.name}*/}
            {/*                    </PersonAvatar>*/}
            {/*                ) : null}*/}
            {/*            </AvatarGroup>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}

            <Frame
                canvas={{
                    handleTriggerUpdate: () => setUpdate(true),
                    handleCreate: () => setOpenForm(true),
                    show: entity => {
                        setCurrentEntity(entity)
                        setShow(true)
                    },
                    edit: entity => {
                        setCurrentEntity(entity)
                        setOpenForm(true)
                    },
                    options: {
                        move: (new Cookies()).get('jwt') !== undefined,
                        edit: (new Cookies()).get('jwt') !== undefined,
                        show: true
                    },
                    triggerLink: (child, parent) => {
                        setLinkEntity({
                            child: child,
                            parent: parent
                        })
                    },
                    handleDelete: entity => {
                        deletePop({
                            id: entity.id,
                            setStatus: setStatus
                        }).then(res => {
                            if (res)
                                ForumRequests.listPops(props.subjectID).then(res => setPops(res))
                        })

                    },
                    entities: pops,
                    triggerUpdate: update,
                    updateEntity: (entity) => {
                        submitSubjectLayout({
                            data: entity,
                            create: false,
                            subjectID: props.subjectID,
                            setStatus: setStatus
                        })

                    },
                    endUpdate: () => setUpdate(false)
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