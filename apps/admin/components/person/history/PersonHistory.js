import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import RecordRequests from "../../../utils/fetch/RecordRequests";
import styles from '../../../styles/Person.module.css'
import shared from '../../../styles/Shared.module.css'
import PersonOverview from "../overview/PersonOverview";
import {Modal} from "sis-aeb-misc";
import {CloseRounded} from "@material-ui/icons";

export default function PersonHistory(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [modal, setModal] = useState({
        open: false,
        data: null
    })
    useEffect(() => {
        RecordRequests({
            data: data,
            setData: setData,
            entityType: 'person',
            maxID: maxID,
            setMaxID: setMaxID,
            id: props.id
        })
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
        const previous = index > 0 ? data[index - 1] : null

        return (
            <React.Fragment key={'person-history-content-' + version.creation_date}>
                {previous === null || (version.creation_date - previous.creation_date) > 86400000 ?
                    <fieldset className={styles.historyFieldSetContainer}>
                        <legend>{(new Date(version.creation_date)).toDateString()}</legend>
                    </fieldset>
                    : null
                }

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

    return (
        <>
            {renderModal()}

            <div className={styles.historyContainer}>
                {data.map((version, index) => (
                        <React.Fragment key={'person-history-' + version.creation_date}>
                            {renderVersion(version, index)}
                        </React.Fragment>
                    )
                )}
            </div>
        </>
    )
}

PersonHistory.propTypes =
    {
        id: PropTypes.number
    }

