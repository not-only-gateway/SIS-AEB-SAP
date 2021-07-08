import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Head from "next/head";
import {
    AddRounded,
    EditRounded,
    Forum,
    PeopleRounded,
    PrintRounded,
    SaveRounded,
    VisibilityRounded
} from "@material-ui/icons";
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
import Canvas from "../shared/canvas/Canvas";
import deletePop from "../../utils/submit/DeletePop";
import SubjectEditModal from "./SubjectEditModal";


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
        if(update === false)
            ForumRequests.listPops(props.subjectID).then(res => setPops(res))
    }, [update])

    return (
        <>
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

            {/*<PopLinkForm*/}
            {/*    handleClose={() => {*/}
            {/*        setCurrentEntity(null)*/}
            {/*        setOpenForm(false)*/}
            {/*    }}*/}
            {/*    handleChange={event => handleObjectChange({*/}
            {/*        event: event,*/}
            {/*        setData: setLinkEntity*/}
            {/*    })}*/}
            {/*    id={currentEntity !== null && currentEntity !== undefined ? currentEntity.id : null}*/}
            {/*    data={currentEntity} subjectID={props.subjectID}*/}
            {/*    fetchPops={() => {*/}
            {/*        setUpdate(true)*/}
            {/*    }}*/}
            {/*    open={openForm}*/}
            {/*/>*/}
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
                fetchPops={() => ForumRequests.listPops(props.subjectID).then(res => setPops(res))}
                open={openForm}
            />

            <SubjectEditModal handleChange={props.handleChange} data={props.data} id={props.subjectID}
                              handleClose={() => setOpenSubjectForm(false)} open={openSubjectForm}/>
            <div className={subjectStyles.infoHeader}>
                <div style={{display: 'grid', gap: '8px'}}>
                    <div style={{
                        fontSize: '1.6rem',
                        color: '#333333',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        {props.data.title}
                        <button style={{display: (new Cookies()).get('jwt') === undefined ? 'none' : undefined}}
                                className={subjectStyles.buttonContainer} onClick={() => setOpenSubjectForm(true)}>
                            <EditRounded style={{color: '#555555'}}/>
                        </button>
                    </div>
                    <div style={{
                        fontSize: '.9rem',
                        color: '#555555'
                    }}>
                        {props.data.description}
                    </div>
                </div>
                <div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <AvatarGroup>
                            {props.data.collaborators !== undefined ? props.data.collaborators.map(collaborator =>
                                <PersonAvatar image={collaborator.image} variant={'circular'}
                                              elevation={'false'}>
                                    {collaborator.name}
                                </PersonAvatar>
                            ) : null}
                        </AvatarGroup>

                    </div>
                    <div className={subjectStyles.buttons}>
                        <button className={subjectStyles.buttonContainer}
                                style={{display: (new Cookies()).get('jwt') === undefined ? 'none' : undefined}}
                                onClick={() => setOpenForm(true)}
                        >
                            <AddRounded style={{color: '#555555'}}/>
                            {lang.create}
                        </button>
                        <button style={{display: (new Cookies()).get('jwt') === undefined ? 'none' : undefined}}
                                className={subjectStyles.buttonContainer} onClick={() => setUpdate(true)}>
                            <SaveRounded style={{color: '#555555'}}/>
                            {lang.updatePop}
                        </button>

                    </div>
                </div>
            </div>

            <Canvas
                rootElementID={'scrollableDiv'}
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
                renderNode={entity => {
                    if (entity !== undefined) {
                        return (
                            <div className={styles.popContainer}>
                                <div style={{
                                    margin: 'auto', overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    color: entity.highlight_color !== null && entity.highlight_color !== undefined ? entity.highlight_color : 'black',
                                    fontSize: '1.1rem',
                                    fontWeight: 585
                                }}>
                                    {entity.title}
                                </div>
                            </div>
                        )
                    } else
                        return null
                }} handleDelete={entity => {
                deletePop({
                    id: entity.id,
                    setStatus: setStatus
                }).then(res => {
                    if (res)
                        ForumRequests.listPops(props.subjectID).then(res => setPops(res))
                })

            }}
                getEntityKey={entity => {
                    if (entity !== undefined)
                        return entity.id
                    else
                        return '-1'
                }}
                entities={pops}
                getNodeColor={entity => entity.highlight_color}
                triggerUpdate={update}
                updateEntity={(entity) => {

                    submitSubjectLayout({
                        data: entity,
                        create: false,
                        subjectID: props.subjectID,
                        setStatus: setStatus
                    })

                }} endUpdate={() => setUpdate(false)} getChildrenKeys={entity => entity.children}
                level={0} getParentKeys={entity => entity.parents}
            />
        </>
    )
}
Pops.propTypes ={
    subjectID: PropTypes.any,
    data: PropTypes.object,
    handleChange: PropTypes.func
}