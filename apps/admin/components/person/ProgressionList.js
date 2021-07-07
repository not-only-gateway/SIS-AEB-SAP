import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import ProgressionForm from "./ProgressionForm";
import ProgressionPT from "../../packages/locales/person/ProgressionPT";
import styles from "../../styles/Person.module.css";

import {ArrowBackRounded} from "@material-ui/icons";

export default function ProgressionList(props) {

    const [currentEntity, setCurrentEntity] = useState({})
    const [open, setOpen] = useState(false)
    const lang = ProgressionPT
    return (
        <>
            {!open ? null :
                <ProgressionForm
                    linkageID={props.linkageID} data={currentEntity}
                    create={currentEntity === null || currentEntity.id === undefined}
                    handleChange={event => handleObjectChange({
                        event: event,
                        setData: setCurrentEntity
                    })}
                    returnToMain={() => {
                        setOpen(false)
                        setCurrentEntity(null)
                    }}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <div style={{borderBottom: '#e0e0e0 1px solid', marginBottom: '32px'}}>
                    <button className={styles.returnButtonContainer} onClick={() => props.returnToMain()}>
                        <ArrowBackRounded/>
                        {lang.return}
                    </button>
                </div>
                <List
                    listKey={'progression'} scrollableElement={'scrollableDiv'}
                    clickEvent={() => setOpen(true)} createOption={true}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/progression/' + props.linkageID}
                    renderElement={element => {
                        return (
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                width: '100%'
                            }}>

                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px'
                                    }}>
                                        <div>
                                            {lang.level}
                                        </div>
                                        {element.role_level}
                                    </div>
                                    <div style={{
                                        borderRight: '#e0e0e0 1px solid',
                                        width: '1px',
                                        height: '20px'
                                    }}/>
                                    <div style={{
                                        display: 'flex',
                                        gap: '8px'
                                    }}>
                                        <div>
                                            {lang.class}
                                        </div>
                                        {element.role_class}
                                    </div>
                                    <div style={{
                                        borderRight: '#e0e0e0 1px solid',
                                        width: '1px',
                                        height: '20px'
                                    }}/>
                                    <div>

                                        {element.legal_document}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    {new Date(element.date).toLocaleDateString()}
                                </div>
                            </div>
                        )
                    }} applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                    searchInput={props.searchInput}
                    setEntity={entity => setCurrentEntity(entity)}/>
            </div>
        </>
    )
}
ProgressionList.propTypes = {
    returnToMain: PropTypes.func,
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,
    linkageID: PropTypes.number,
    searchInput: PropTypes.string
}