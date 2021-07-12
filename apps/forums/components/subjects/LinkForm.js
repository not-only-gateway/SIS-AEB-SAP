import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";

import {EntityLayout, Modal} from "sis-aeb-misc";
import PopFormPT from "../../packages/locales/PopFormPT";
import styles from "../../styles/subject/Pop.module.css";
import {CloseRounded} from "@material-ui/icons";
import handleObjectChange from "../../utils/shared/HandleObjectChange";
import {DropDownField} from "sis-aeb-inputs";
import submitPopLink from "../../utils/submit/SubmitPopLink";
import {TextField} from "../../../../packages/inputs";

export default function LinkForm(props) {

    const [changed, setChanged] = useState(false)
    const lang = PopFormPT

    const [child, setChild] = useState(null)
    const [link, setLink] = useState({
        id: null,
        type: null,
        description: null
    })
    useEffect(() => {
        if (props.child !== null && props.parent !== null && child === null) {
            setChild(props.child)
            setLink({
                id: props.parent.id,
                type: null,
                description: null
            })
        }
    }, [props.child, props.parent])

    return (
        <>

            <Modal handleClose={() => {
                setChild(null)
                setLink({
                    id: null,
                    type: null,
                    description: null
                })
                props.handleClose(false)
            }}
                   open={props.child !== undefined && props.child !== null && props.parent !== undefined && props.parent !== null}
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
                                entityID={link.id} onlyEdit={true}
                                rootElementID={'root'} entity={link}
                                create={true}
                                label={lang.linkHeader}
                                dependencies={{
                                    fields: [
                                        {name: 'type', type: 'bool'},
                                        {name: 'description', type: 'string'},
                                    ],
                                    changed: changed
                                }} returnButton={false}
                                handleSubmit={() =>
                                    submitPopLink({
                                        child: child,
                                        link: link,
                                        parent: props.parent
                                    }).then(res => {
                                        if (res) {

                                            setChild(null)
                                            setLink({
                                                id: null,
                                                type: null,
                                                description: null
                                            })

                                            props.handleClose(true)
                                        }
                                        setChanged(!res)
                                    })}
                                forms={[{
                                    child: (
                                        <>
                                            <TextField
                                                placeholder={lang.description} label={lang.description}
                                                handleChange={event => {
                                                    setChanged(true)

                                                    handleObjectChange({event: {
                                                            name: 'description',
                                                            value: event.target.value
                                                        }, setData: setLink})
                                                }}
                                                value={link.description}
                                                required={true} width={'calc(50% - 16px)'}/>

                                            <DropDownField
                                                placeholder={lang.type} label={lang.type}
                                                handleChange={event => {
                                                    setChanged(true)

                                                    handleObjectChange({event: {
                                                            name: 'type',
                                                            value: event
                                                        }, setData: setLink})

                                                }} choices={lang.choices}
                                                value={link.type}
                                                required={true} width={'calc(50% - 16px)'}/>
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
        </>
    )

}

LinkForm.propTypes = {
    parent: PropTypes.object,
    child: PropTypes.object,
    handleClose: PropTypes.func
}