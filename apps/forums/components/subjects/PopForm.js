import React, {useState} from "react";
import PropTypes from "prop-types";

import {ImageField, TextField} from "sis-aeb-inputs";
import {Alert, Modal, EntityLayout} from "sis-aeb-misc";
import PopFormPT from "../../packages/locales/PopFormPT";
import submitPop from "../../utils/submit/SubmitPop";
import styles from "../../styles/Pop.module.css";
import {CloseRounded} from "@material-ui/icons";

export default function PopForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = PopFormPT
    const [status, setStatus] = useState({
        error: undefined,
        message: undefined
    })


    return (
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
                                })}
                            forms={[{
                                title: lang.basic,
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
                                            required={false} width={'calc(50% - 16px)'}/>
                                    </>
                                )
                            },
                                {
                                    title: lang.bodyImage,
                                    child: (
                                        <>
                                            <ImageField
                                                disabled={false} setChanged={setChanged}
                                                initialImage={props.data !== null && props.data !== undefined ? (props.data.image !== null ? props.data.image : null) : null}
                                                size={'100px'}
                                                setImage={event => props.handleChange({
                                                    name: 'image',
                                                    value: event !== null ? event.target.files[0] : null
                                                })} label={lang.image}

                                                required={false} width={'100%'}
                                            />
                                            <TextField
                                                placeholder={lang.body} label={lang.body} handleChange={event => {
                                                setChanged(true)
                                                props.handleChange({name: 'body', value: event.target.value})
                                            }}
                                                value={props.data === null ? null : props.data.body}
                                                required={false} width={'100%'}/>

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
    )

}

PopForm.propTypes = {
    subjectID: PropTypes.number,
    open: PropTypes.bool,
    id: PropTypes.number,
    data: PropTypes.object,
    handleChange: PropTypes.func,
    handleClose: PropTypes.func,
    fetchPops: PropTypes.func,
}