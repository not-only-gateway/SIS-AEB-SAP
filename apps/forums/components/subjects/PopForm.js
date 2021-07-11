import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {EntityLayout, Modal} from "sis-aeb-misc";
import PopFormPT from "../../packages/locales/PopFormPT";
import submitPop from "../../utils/submit/SubmitPop";
import styles from "../../styles/subject/Pop.module.css";
import {CloseRounded} from "@material-ui/icons";
import ForumRequests from "../../utils/fetch/ForumRequests";
import TextField from "../shared/inputs/TextField";
import ImageField from "../shared/inputs/ImageField";
import TextArea from "../shared/inputs/TextArea";
import ColorField from "../shared/inputs/ColorField";

export default function PopForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = PopFormPT
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })
    useEffect(() => {
        if (props.open && props.data !== null && props.data !== undefined && props.id !== undefined) {
            ForumRequests.fetchContent(props.id).then(res => {
                if (res !== null) {
                    props.handleChange({name: 'body', value: res.body})
                    props.handleChange({name: 'description', value: res.description})
                    props.handleChange({name: 'image', value: res.image})
                }
            })
        }
    }, [props.open])

    return (
        <>

            <Modal handleClose={() => props.handleClose()}
                   open={props.open}
                   rootElementID={'root'}>
                <div style={{
                    height: '100vh',
                    width: '100vw',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>

                    <div className={styles.modalContainer}>
                        <div style={{
                            display: 'grid',
                            height: '100%',
                            overflow: 'auto',
                            alignContent: 'flex-start'
                        }}>
                            <EntityLayout
                                entityID={props.id} onlyEdit={true}
                                rootElementID={'root'} entity={props.data}
                                create={props.data === null || props.data === undefined || props.data.id === undefined}
                                label={lang.header}

                                dependencies={{
                                    fields: [
                                        {name: 'title', type: 'string'},
                                        {name: 'description', type: 'string'},
                                    ],
                                    changed: changed
                                }} returnButton={false}
                                handleSubmit={() =>
                                    submitPop({
                                        subjectID: props.subjectID,
                                        pk: props.data !== null && props.data !== undefined ? props.data.id : undefined,
                                        data: props.data,
                                        setStatus: setStatus,
                                        create: props.data === null || props.data === undefined || props.data.id === undefined
                                    }).then(res => {
                                        if (res.status) {
                                            props.handleClose()
                                            props.fetchPops()
                                        }
                                        setChanged(!res.status)
                                    })
                                }
                                forms={[{
                                    child: (
                                        <>
                                            <TextField

                                                placeholder={lang.title} label={lang.title}
                                                handleChange={event => {
                                                    setChanged(true)
                                                    props.handleChange({name: 'title', value: event.target.value})
                                                }}
                                                value={props.data === null ? null : props.data.title}
                                                required={true} width={'calc(50% - 16px)'}/>

                                            <TextField
                                                placeholder={lang.description} label={lang.description}
                                                handleChange={event => {
                                                    setChanged(true)
                                                    props.handleChange({name: 'description', value: event.target.value})
                                                }}
                                                value={props.data === null ? null : props.data.description}
                                                required={true} width={'calc(50% - 16px)'}/>


                                            <ImageField
                                                disabled={false} setChanged={setChanged}
                                                initialImage={props.data !== null && props.data !== undefined ? (props.data.image !== null ? props.data.image : null) : null}
                                                size={'100px'}
                                                setImage={event => props.handleChange({
                                                    name: 'image',
                                                    value: event !== null ? event.target.files[0] : null
                                                })}
                                                label={lang.image}
                                                required={false} width={'100%'}
                                            />

                                            <TextArea
                                                handleChange={event => {
                                                    setChanged(true)
                                                    props.handleChange({name: 'body', value: event})
                                                }} label={lang.body} width={'100%'} disabled={false} maxHeight={'200px'}
                                                required={false} value={props.data === null ? null : props.data.body}/>
                                            <ColorField
                                                required={false} width={'100%'}
                                                        value={props.data === null ? null : props.data.highlight_color}
                                                        handleChange={event => {
                                                            setChanged(true)
                                                            props.handleChange({name: 'highlight_color', value: event})
                                                        }} label={lang.highlight}/>
                                        </>
                                    )
                                }

                                ]}/>
                        </div>
                        <button className={styles.closeButton} onClick={() => props.handleClose()}>
                            <CloseRounded/>
                        </button>
                    </div>
                </div>

            </Modal>
        </>
    )

}

PopForm.propTypes = {
    subjectID: PropTypes.any,
    open: PropTypes.bool,
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    fetchPops: PropTypes.func,
}