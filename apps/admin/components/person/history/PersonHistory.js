import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import styles from '../../../styles/Person.module.css'
import shared from '../../../styles/Shared.module.css'
import PersonOverview from "../overview/PersonOverview";
import {List, Modal, Overview} from "sis-aeb-misc";
import {ArrowBackRounded, CloseRounded} from "@material-ui/icons";
import Host from "../../../utils/shared/Host";
import axios from "axios";
import Cookies from "universal-cookie/lib";

export default function PersonHistory(props) {
    const [entityID, setEntityID] = useState(null)
    const [modal, setModal] = useState({
        open: false,
        data: null
    })
    useEffect(() => {
        axios({
            method: 'get',
            url: Host() + 'key/' + props.entityType,
            headers: {'authorization': (new Cookies()).get('jwt')}
        }).then(res => setEntityID(res.data)).catch(error => console.log(error))
    }, [])

    function renderModal() {
        if (modal.data !== null)
            return (
                <Modal open={modal.open} handleClose={() => setModal({
                    open: false,
                    data: null
                })} rootElementID={'root'}
                >
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
                                gap: '16px',
                                height: '100%',
                                overflow: 'auto',
                                alignContent: 'flex-start'
                            }}>
                                <Overview entity={modal.data} fields={props.overviewFields}/>
                            </div>
                            <button className={styles.closeButton} onClick={() => setModal(false)}>
                                <CloseRounded/>
                            </button>
                        </div>

                    </div>

                </Modal>
            )
        else return null

    }

    function renderVersion(version, index) {


        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div>
                        {(new Date(version.creation_date)).toTimeString().substr(0, 8)}
                    </div>
                    <div>{(new Date(version.creation_date)).toDateString()}</div>
                    <div style={{
                        borderRight: '#e0e0e0 1px solid',
                        width: '1px',
                        height: '20px',
                        display: version.changes === 0 ? 'none' : undefined
                    }}/>
                    <div style={{width: 'fit-content'}}>
                        {version.creator === null ? 'SYSTEM' : version.creator.person.name}
                    </div>

                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div>
                        {version.creator === null ? null : version.creator.collaborator.corporate_email}
                    </div>
                    <div style={{
                        borderRight: '#e0e0e0 1px solid',
                        width: '1px',
                        height: '20px',
                        display: version.changes === 0 ? 'none' : undefined
                    }}/>
                    <div>
                        {version.changes}
                    </div>
                </div>
            </div>
        )
    }

    if (entityID !== undefined && entityID !== null)
        return (
            <>
                <div className={styles.labelContainer}>
                    <button className={styles.returnButtonContainer} onClick={() => props.returnToMain()}>
                        <ArrowBackRounded/>
                    </button>
                    {'Voltar'}
                </div>
                {renderModal()}

                <List
                    fetchSize={11}
                    fetchToken={(new Cookies()).get('jwt')}
                    fetchUrl={Host() + 'list/object/' + props.id}
                    clickEvent={() => null}
                    fetchParams={{
                        entityType: 'person'
                    }}
                    scrollableElement={'scrollableDiv'}
                    searchInput={''}
                    setAppliedSearch={() => null}
                    renderElement={(element, index) => {
                        if (element !== undefined && element !== null)
                            return renderVersion(element, index)
                    }}
                    setEntity={entity => setModal({
                        data: entity,
                        open: true
                    })}
                    applySearch={false}
                    listKey={props.id + '-entity-history-' + entityID}
                    createOption={false}/>
            </>
        )
    else return null
}

PersonHistory.propTypes = {
    id: PropTypes.number,
    entityType: PropTypes.string,
    overviewFields: PropTypes.object,
    returnToMain: PropTypes.func
}

