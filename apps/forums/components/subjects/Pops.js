import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Head from "next/head";
import {AddRounded, EditRounded, Forum, PeopleRounded, SaveRounded, VisibilityRounded} from "@material-ui/icons";
import ForumRequests from "../../utils/fetch/ForumRequests";
import subjectStyles from '../../styles/Subject.module.css'
import styles from '../../styles/Pop.module.css'
import SubjectPT from "../../packages/locales/SubjectPT";
import Chart from "../shared/components/Chart";
import PopOverview from "./PopOverview";
import Canvas from "../shared/canvas/Canvas";
import SubmitPop from "../../utils/submit/SubmitPop";
import {AvatarGroup} from "@material-ui/lab";
import PersonAvatar from "../shared/PersonAvatar";
import PopForm from "./PopForm";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import SubjectForm from "./SubjectForm";
import Cookies from "universal-cookie/lib";


export default function Pops(props) {
    const [pops, setPops] = useState([])
    const lang = SubjectPT
    const [currentEntity, setCurrentEntity] = useState(null)
    const [update, setUpdate] = useState(false)
    const [openForm, setOpenForm] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        ForumRequests.listPops(props.subjectID).then(res => setPops(res))
    }, [])

    return (
        <>

                <PopOverview
                    data={currentEntity}
                    handleClose={() => {
                        setCurrentEntity(null)
                        setShow(false)
                    }}
                    open={show}/>


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
                    open={openForm}/>


            <div className={subjectStyles.infoHeader}>
                <div style={{display: 'grid', gap: '8px'}}>
                    <div style={{
                        fontSize: '1.6rem',
                        color: '#333333',
                        textTransform: 'capitalize'
                    }}>
                        {props.data.title}
                    </div>
                    <div style={{
                        fontSize: '.9rem',
                        color: '#555555',
                        textTransform: 'capitalize'
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
                                className={subjectStyles.buttonContainer}>
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

                renderNode={entity => {
                    if (entity !== undefined) {
                        return (
                            <div className={styles.popContainer}>
                                <div style={{
                                    margin: 'auto', overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                }}>
                                    {entity.id}
                                </div>
                            </div>
                        )
                    } else
                        return null
                }}
                getEntityKey={entity => {
                    if (entity !== undefined)
                        return entity.id
                    else
                        return '-1'
                }}
                entities={pops}
                triggerUpdate={update}
                updateEntity={(entity) => {
                    setUpdate(false)
                    SubmitPop({
                        pk: entity.id,
                        data: entity,
                        create: false,
                        subjectID: props.subjectID,
                        setStatus: () => null
                    })
                }} getChildrenKeys={entity => entity.children}
                level={0} getParentKeys={entity => entity.parents}
            />
        </>
    )
}
Pops.propTypes = {
    subjectID: PropTypes.any,
    data: PropTypes.object
}