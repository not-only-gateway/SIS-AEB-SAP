import React, {useState} from "react";
import {List} from "sis-aeb-misc";
import Cookies from "universal-cookie/lib";
import Host from "../../utils/shared/Host";
import PropTypes from "prop-types";
import styles from '../../styles/Index.module.css'
import {AvatarGroup} from "@material-ui/lab";
import {Avatar} from "@material-ui/core";
import PersonAvatar from "../shared/PersonAvatar";

export default function SubjectList(props) {

    const [currentEntity, setCurrentEntity] = useState({})
    const [open, setOpen] = useState(false)

    return (
        <>
            {!open ? null : null
                // <BaseForm
                //     returnToMain={() => {
                //         setOpen(false)
                //     }}
                //     redirect={props.redirect}
                //     handleChange={event => handleObjectChange({
                //         event: event,
                //         setData: setCurrentEntity
                //     })}
                //     create={open && (currentEntity === null || currentEntity.id === undefined)}
                //     data={currentEntity}/>

            }
            <div style={{display: open ? 'none' : undefined}}>
                <List
                    listKey={'pop-list'} scrollableElement={'scrollableDiv'}
                    clickEvent={() => null} createOption={(new Cookies()).get('jwt') !== undefined}
                    fetchToken={(new Cookies()).get('jwt')} fetchUrl={Host() + 'list/subject'}
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
                                    gap: '8px',
                                    maxWidth: '50%'
                                }}>
                                    <div>
                                        {element.title}
                                    </div>
                                    <div style={{
                                        borderRight: '#e0e0e0 1px solid',
                                        width: '1px',
                                        height: '20px'
                                    }}/>
                                    <div className={styles.overflowEllipsis} style={{maxWidth: '75%'}}>
                                        {element.description}
                                    </div>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    maxWidth: '50%'
                                }}>
                                    <AvatarGroup>
                                        {element.collaborators !== undefined ? element.collaborators.map(collaborator =>
                                            <PersonAvatar image={collaborator.image} variant={'circular'}
                                                          elevation={'false'}>
                                                {collaborator.name}
                                            </PersonAvatar>
                                        ) : null}
                                    </AvatarGroup>
                                </div>
                            </div>
                        )
                    }} applySearch={props.notSearched} setAppliedSearch={props.setNotSearched}
                    searchInput={props.searchInput}
                    setEntity={entity => {
                        if(entity !== null)
                            props.redirect(entity.id)
                        else
                        setCurrentEntity(entity)
                    }}/>
            </div>
        </>
    )
}
SubjectList.propTypes = {
    notSearched: PropTypes.bool,
    setNotSearched: PropTypes.func,

    redirect: PropTypes.func,
    searchInput: PropTypes.string
}