import React, {useState} from "react";
import PropTypes from "prop-types";
import mainStyles from '../../../styles/shared/Main.module.css'
import {AddRounded, CloseRounded} from "@material-ui/icons";
import {Button, FormControl, FormLabel, Modal} from "@material-ui/core";
import styles from '../../../styles/component/Component.module.css'
import {getIconStyle} from "../../../styles/shared/MainStyles";
import ProfilePersona from "../../elements/ProfilePersona";
import ImageHost from "../../../utils/shared/ImageHost";
import shared from "../../../styles/shared/Shared.module.css";

export default function ImageSelector(props) {
    const [modal, setModal] = useState(false)

    function renderModal() {
        return (
            <Modal open={modal} onClose={() => setModal(false)}
                   style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div className={styles.modalContainer}
                     style={{backgroundColor: 'white', minHeight: '50%', position: 'relative'}}>
                    <div className={shared.closeButtonModalContainer}>
                        <Button onClick={() => setModal(false)}>
                            <CloseRounded/>
                        </Button>
                    </div>
                    <div className={styles.modalContentContainer}
                         style={{
                             borderBottom: '#e2e2e2 1px solid',
                         }}>
                        <h3 style={{marginTop: 0}}>{props.label}</h3>
                        <div className={mainStyles.rowContainer} style={{gap: '16px'}}>

                            {props.initialImage !== undefined && props.initialImage !== null ?
                                <Button
                                    component="span"
                                    variant="contained"
                                    style={{
                                        textTransform: 'none',
                                        width: '100%',
                                        backgroundColor: '#f54269',
                                        color: 'white'
                                    }}
                                    onClick={() => {
                                        props.setChanged(true)
                                        props.setImage(null)
                                    }}
                                >
                                    Remove
                                </Button>
                                :
                                <>
                                    <input id="upload-image" type="file" style={{display: 'none'}}
                                           onChange={event => {
                                               props.setImage(event)
                                               props.setChanged(true)
                                           }}/>
                                    <label htmlFor="upload-image" style={{width: '100%'}}>
                                        <Button
                                            component="span"
                                            variant="contained"
                                            style={{
                                                textTransform: 'none',
                                                width: '100%',
                                                backgroundColor: '#0095ff',
                                                color: 'white'
                                            }}
                                        >
                                            Upload
                                        </Button>

                                    </label>
                                </>
                            }
                        </div>
                    </div>

                    <div style={{
                        gridRow: 2,
                        overflow: 'hidden',
                        backgroundColor: '#eeeef1',
                        borderRadius: '8px',
                        padding: '16px',
                        display: props.initialImage !== null && props.initialImage !== undefined ? 'flex' : 'none',
                        placeContent: 'center'
                    }}>
                        <img src={props.base64 ? props.initialImage : ImageHost() + props.initialImage}
                             style={{
                                 minWidth: '75%',
                                 maxWidth: '100%',
                                 borderRadius: '8px',
                                 maxHeight: '100%',
                                 objectFit: 'contain',
                                 boxShadow: 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
                                 border: '#0095ff 2px solid'
                             }} alt={props.label}/>
                    </div>
                </div>
            </Modal>
        )
    }

    return (
        <>
            {renderModal()}
            <FormControl key={props.key} required={props.required} style={{
                width: props.width,
                marginTop: 'auto',
                minHeight: '56px'

            }}>

                <Button onClick={() => setModal(true)} style={{
                    textTransform: 'none',
                    backgroundColor: 'transparent',
                    border: '#d0d0d0 1px solid',
                    minHeight: '56px',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }} variant={'contained'} disableElevation={true}>
                    <FormLabel>Image</FormLabel>
                    {props.initialImage === undefined || props.initialImage === null ?
                        <AddRounded style={getIconStyle({dark: false})}/>
                        :
                        <ProfilePersona variant={'rounded'} size={props.size} base64={props.base64}
                                        image={props.initialImage} key={props.label + 'image-avatar'} elevation={true}
                                        dark={false} cakeDay={false}/>
                    }
                </Button>
            </FormControl>
        </>
    )
}

ImageSelector.propTypes = {
    setImage: PropTypes.func,
    initialImage: PropTypes.any,
    size: PropTypes.string,
    label: PropTypes.string,
    base64: PropTypes.bool,
    setChanged: PropTypes.func,
    width: PropTypes.string
}