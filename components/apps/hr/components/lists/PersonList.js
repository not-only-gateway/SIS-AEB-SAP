import PropTypes from 'prop-types'
import React, {useState} from "react";
import styles from '../../styles/Shared.module.css'
import {List, Modal, useQuery} from 'mfc-core'
import getQuery from "../../queries/getQuery";
import {personKeys} from "../../keys/keys";
import {Avatar} from "@material-ui/core";

export default function PersonList(props) {
    const [currentEntity, setCurrentEntity] = useState(null)
    const [open, setOpen] = useState(false)
    const hook = useQuery(getQuery('collaborator'))
    const isToday = (date) => {
        const today = new Date()
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
    }
    return (
        <>

            <Modal
                open={open}
                handleClose={() => {
                    setOpen(false)
                    setCurrentEntity(null)
                }} className={styles.modal} animationStyle={"slide-right"}>
                <>
                    {currentEntity ?
                        <>
                            <Avatar style={{width: '170px', height: '170px'}}/>
                            <h2 className={styles.header}>
                                {currentEntity.name}
                            </h2>


                            <div className={styles.list}>
                                Email
                                <div className={styles.field}>
                                    {currentEntity.email}
                                </div>
                            </div>
                            <div className={styles.list}>
                                Ramal
                                <div className={styles.field}>
                                    {currentEntity.extension ? currentEntity.extension : 'Em branco.'}
                                </div>

                            </div>
                            <div className={styles.list}>
                                Matrícula
                                <div className={styles.field}>
                                    {currentEntity.registration ? currentEntity.registration : 'Em branco.'}
                                </div>

                            </div>
                            <div className={styles.list}>
                                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                                    Nascimento
                                    {isToday(new Date(currentEntity.birth)) ? <span className="material-icons-round" style={{fontSize: '1rem', color: '#ff5555'}}>cake</span> : null}
                                </div>


                                <div className={styles.field}>
                                    {new Date(currentEntity.birth).toLocaleDateString()}
                                </div>
                            </div>

                        </>
                        :
                        null
                    }
                </>
            </Modal>
            <List

                hook={hook}
                keys={personKeys}
                onRowClick={e => {
                    setOpen(true)
                    setCurrentEntity(e)
                }}
                title={'Ramais'}

            />
        </>
    )
}
PersonList.propTypes = {
    workPlan: PropTypes.object
}