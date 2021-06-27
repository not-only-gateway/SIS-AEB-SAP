import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import styles from '../../../styles/Person.module.css'
import shared from '../../../styles/Shared.module.css'
import PersonOverview from "../overview/PersonOverview";
import {List, Modal} from "sis-aeb-misc";
import {CloseRounded} from "@material-ui/icons";
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
        }).then(res => setEntityID(res.data)).catch(error => console.log(error))
    }, [])
    function renderModal() {
        if (modal.data !== null)
            return (
                <Modal open={modal.open} handleClose={() => setModal({
                    open: false,
                    data: null
                })} rootElementID={'root'}
                       componentStyle={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className={styles.modalContainer}>
                        <PersonOverview data={modal.data}/>

                        <button className={styles.closeButton} onClick={() => setModal(false)}>
                            <CloseRounded/>
                        </button>
                    </div>
                </Modal>
            )
        else return null

    }

    function renderVersion(version, index) {
        // const previous = index > 0 ? data[index - 1] : null

        return (
            <React.Fragment key={'history-content-' + version.creation_date}>
                {/*{previous === null || (version.creation_date - previous.creation_date) > 86400000 ?*/}
                    <fieldset className={styles.historyFieldSetContainer}>
                        <legend>{(new Date(version.creation_date)).toDateString()}</legend>
                    </fieldset>
                    {/*: null*/}
                {/*}*/}

                <button className={shared.rowContainer} onClick={() => setModal({
                    open: true,
                    data: version.data
                })} style={{justifyContent: 'space-between'}}>

                    <div style={{width: 'fit-content'}}>
                        {version.creator === null ? 'SYSTEM' : version.creator.person.name}
                    </div>

                    {(new Date(version.creation_date)).toTimeString()}

                </button>
            </React.Fragment>
        )
    }

    if(entityID !== undefined && entityID !== null)
    return (
        <>
            {renderModal()}

            <List
                fetchToken={(new Cookies()).get('jwt')}
                fetchUrl={Host() + 'list/object/' + props.id}
                clickEvent={() => null}
                fetchParams={{
                    entityType: 'person'
                }}
                scrollableElement={'scrollableElement'}
                searchInput={''}
                setAppliedSearch={() => null}
                renderElement={(element, index) => {
                    if(element !== undefined && element !== null)
                        return renderVersion(element, index)
                }}
                setEntity={entity => setModal({
                    data: entity,
                    open: true
                })}
                applySearch={false}
                listKey={props.id+'-entity-history-'+entityID}
                createOption={false}/>
        </>
    )
    else return null
}

PersonHistory.propTypes = {
    id: PropTypes.number,
    entityType: PropTypes.string,
}

