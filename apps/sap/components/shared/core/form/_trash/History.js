import PropTypes from 'prop-types'
import React, {useState} from "react";
import {ArrowBackRounded} from "@material-ui/icons";
import Overview from "./Overview";
import List from "../../list/List";
import styles from "../styles/Form.module.css";
import SharedPT from "../locales/SharedPT";

export default function History(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [openModal, setOpenModal] = useState(false)
    const lang = SharedPT

    function renderVersion(version, index) {
        let versionDate = version.creation_date
        let timeBetweenChanges = Math.round(((new Date()).getTime() - versionDate) / 3600000)
        const days = Math.round(timeBetweenChanges / 24)
        const hours = timeBetweenChanges - 24
        return (
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                    <div>
                        {timeBetweenChanges < 24 ? timeBetweenChanges : days}
                    </div>
                    {timeBetweenChanges < 24 ? lang.hours : days > 1 ? lang.days + (hours > 0 ? (' & '+ hours + ' '+ (hours > 1 ?lang.hours : lang.hour)) : ''): lang.day + (hours > 0 ? (' & '+ hours + ' '+(hours > 1 ?lang.hours : lang.hour)) : '')}
                    <div style={{
                        borderRight: '#e0e0e0 1px solid',
                        width: '1px',
                        height: '20px',
                        display: version.changes === 0 ? 'none' : undefined
                    }}/>
                    {lang.changes}
                    <div>
                        {version.changes}
                    </div>


                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div style={{width: 'fit-content'}}>
                        {version.creator === null ? 'SYSTEM' : version.creator.person.name}
                    </div>
                    <div style={{
                        borderRight: '#e0e0e0 1px solid',
                        width: '1px',
                        height: '20px',
                        display: version.creator === null ? 'none' : undefined
                    }}/>
                    <div>
                        {version.creator === null ? null : version.creator.collaborator.corporate_email}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <div className={styles.headerContainer} style={{marginTop: '32px'}}>
                <button className={styles.returnButton} onClick={() => props.handleClose()}>
                    <ArrowBackRounded/>
                </button>
                <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                    <div>
                        {lang.history}
                    </div>
                    <div style={{fontSize: '.9rem', color: '#555555'}}>
                        ( {props.label} )
                    </div>
                </div>
            </div>
            <Overview entity={currentEntity !== null ? currentEntity.data : null} fields={props.fields} rootElementID={props.rootElementID}
                      open={openModal} applyHistoryButton={true} applyHistory={() => props.setVersion(currentEntity)}
                      handleClose={() => {
                          setOpenModal(false)
                          setCurrentEntity(null)
                      }}/>

            <List
                fetchSize={props.fetchSize}
                fetchToken={props.fetchToken}
                fetchUrl={props.fetchUrl}
                clickEvent={() => setOpenModal(true)}

                scrollableElement={props.scrollableElement}
                searchInput={''}
                setAppliedSearch={() => null}
                fetchParams={{
                    entity_key: props.entityKey,
                    entity_id: props.entityID
                }}
                renderElement={(element, index) => {
                    if (element !== undefined && element !== null)
                        return renderVersion(element, index)
                }}
                setEntity={entity => setCurrentEntity(entity)}
                applySearch={false}
                listKey={props.entityKey + '-list'}
                createOption={false}/>
        </>
    )

}

History.propTypes = {
    fetchSize: PropTypes.number,
    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string,
    scrollableElement: PropTypes.string,
    entityKey: PropTypes.string,
    rootElementID: PropTypes.any,
    handleClose: PropTypes.func,
    fields: PropTypes.arrayOf(
        PropTypes.shape({
            field: PropTypes.string,
            label: PropTypes.string,
            type: PropTypes.oneOf(['bool', 'image', 'string', 'object', 'date']),
            renderObjectField: PropTypes.func
        })
    ),

    entityID: PropTypes.number
}

