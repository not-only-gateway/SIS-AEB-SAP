import {Modal} from "sis-aeb-misc";
import PropTypes from 'prop-types'
import styles from "../../styles/subject/PopOverview.module.css";

import React, {useEffect, useState} from "react";
import ForumRequests from "../../utils/fetch/ForumRequests";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import PopFormPT from "../../packages/locales/PopFormPT";
import {CloseRounded} from "@material-ui/icons";
import {TextArea} from "sis-aeb-inputs";

export default function PopOverview(props) {
    const lang = PopFormPT

    const [entity, setEntity] = useState(null)
    useEffect(() => {
        if (props.open && props.data !== null && props.data !== undefined) {
            setEntity(props.data)
            ForumRequests.fetchContent(props.data.id).then(res => {
                if (res !== null) {
                    handleObjectChange({
                        event: {name: 'body', value: res.body},
                        setData: setEntity
                    })
                    handleObjectChange({
                        event: {name: 'image', value: res.image},
                        setData: setEntity
                    })
                    handleObjectChange({
                        event: {name: 'description', value: res.description},
                        setData: setEntity
                    })
                }
                console.log(res)
            })
        }
    }, [props])

    return (
        <Modal open={props.open} handleClose={() => props.handleClose()} rootElementID={'root'}>
            <div className={styles.modalContainer}>
                <div className={styles.modalContent}>
                    <button className={styles.closeButton} onClick={() => props.handleClose()}>
                        <CloseRounded/>
                    </button>

                    {entity !== null && entity !== undefined ?
                        <>
                            <div className={styles.titleContainer}>
                                <div style={{fontSize: '1.2rem'}}>
                                    {entity.title}
                                </div>
                                <div style={{fontSize: '.85rem', color: '#333333'}}>
                                    {entity.description}
                                </div>
                            </div>
                            <div className={styles.bodyContainer}>
                                <div style={{
                                    maxHeight: '65%',
                                    overflow: 'hidden',
                                    borderRadius: '8px',
                                    border: '#e0e0e0 1px solid',
                                    display: entity.image === undefined || entity.image === null ? 'none' : undefined
                                }}>
                                    <img style={{width: '100%'}} src={entity.image}/>
                                </div>

                                <TextArea
                                    width={'100%'} disabled={true} maxHeight={'100%'}
                                    required={false} value={entity.body}/>

                            </div>
                            <div className={styles.footerContainer}>
                                <div style={{fontSize: '1.05rem', display: 'grid', gap: '8px'}}>
                                    Criado em:
                                    <div style={{fontSize: '.9rem', color: '#555555'}}>
                                        - {(new Date(entity.creation_date)).toDateString()}
                                    </div>
                                </div>
                                <div style={{fontSize: '1.05rem', display: 'grid', gap: '8px'}}>
                                    Atualizado em:
                                    <div style={{fontSize: '.9rem', color: '#555555'}}>
                                        - {entity.last_update !== null ? (new Date(entity.last_update)).toDateString() : 'Não atualizado'}
                                    </div>
                                </div>
                            </div>
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </Modal>

    )
}
PopOverview.propTypes = {
    handleClose: PropTypes.func,
    data: PropTypes.object,
    open: PropTypes.bool
}