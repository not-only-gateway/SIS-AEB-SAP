import PropTypes from 'prop-types'
import {useEffect, useState} from "react";
import RecordRequests from "../../../utils/fetch/RecordRequests";
import styles from '../../../styles/Person.module.css'
import shared from '../../../styles/shared/Shared.module.css'
import React from 'react'
import {Modal} from "@material-ui/core";
import PersonOverview from "../overview/PersonOverview";
import Button from "../../shared/inputs/Button";

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
        console.log(modal.data)
        if (modal.data !== null)

            return (
                <Modal open={modal.open} onClose={() => setModal({
                    open: false,
                    data: null
                })} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <div className={shared.modalContainer}>
                        <div className={shared.modalContent}>
                            <PersonOverview data={modal.data}/>
                        </div>
                        <div className={shared.modalFooter}>
                            <Button width={'fit-content'} variant={'rounded'} padding={'8px 32px'} content={'Fechar'}
                                    handleClick={() => setModal({
                                        open: false,
                                        data: null
                                    })} backgroundColor={'white'} fontColor={'black'}
                                    border={'none'}/>
                        </div>
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

