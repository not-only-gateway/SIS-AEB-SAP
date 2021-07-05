import styles from './styles/Selector.module.css'
import {CloseRounded, RemoveRounded} from "@material-ui/icons";
import React, {useState} from "react";
import SelectorsPT from "./locales/SelectorsPT";
import Modal from "../modal/Modal";
import List from "../list/List";
import PropTypes from "prop-types";
import SelectorSearch from "./SelectorSearch";


export default function SelectorModal(props) {

    const [search, setSearch] = useState('')
    const [applySearch, setApplySearch] = useState(false)

    const lang = SelectorsPT

    return (
        <Modal open={props.modal} handleClose={() => props.setModal(false)} rootElementID={props.elementRootID}
               modalKey={props.label + '-selector-modal-' + props.selectorKey}
               componentStyle={{display: 'grid', placeItems: 'center'}}>
            <div style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className={styles.modalContainer} id={'selector-modal'}>
                    <div style={{marginBottom: '24px'}}>
                        <h3 style={{marginTop: 0, marginBottom: '8px'}}>{props.label}</h3>
                        <label className={styles.alertLabel}
                               style={{
                                   color: props.selected === null || props.selected === undefined ? '#ff5555' : '#262626',
                                   visibility: props.required ? 'visible' : 'hidden',
                               }}>{lang.required}</label>
                    </div>

                    <SelectorSearch searchInput={search} applySearch={() => setApplySearch(true)}
                                    clearSearch={() => setSearch('')} setSearchInput={setSearch}/>

                    <div style={{display: 'grid', gap: '8px'}}>
                        <div className={styles.selectedEntityContainer}
                             style={{display: props.selected === undefined || props.selected === null ? 'none' : undefined}}>
                            {props.renderEntity(props.selected)}
                            <button className={styles.removeButton}
                                    style={{display: props.required ? 'none' : undefined}}
                                    onClick={() => {
                                        if (props.setChanged)
                                            props.setChanged(true)
                                        props.handleChange(undefined)
                                    }}>
                                <RemoveRounded/>
                            </button>

                        </div>
                        <List
                            applySearch={applySearch}
                            renderElement={entity => props.getEntityKey(entity) !==  props.getEntityKey(props.selected) ? props.renderEntity(entity) : null}
                            searchInput={search}
                            clickEvent={() => null}
                            createOption={false} listKey={props.selectorKey + '-selector-list'}
                            fetchToken={props.fetchToken} fetchUrl={props.fetchUrl} scrollableElement={'selector-modal'}
                            setAppliedSearch={() => setApplySearch(false)}
                            setEntity={entity => {
                                props.handleChange(entity)
                                if (props.setChanged)
                                    props.setChanged(true)
                                props.setModal(false)
                            }}
                        />
                    </div>
                    <button
                        onClick={() => props.setModal(false)}
                        className={styles.closeButton}
                    >
                        <CloseRounded/>
                    </button>

                </div>
            </div>
        </Modal>
    )


}
SelectorModal.propTypes = {
    renderEntity: PropTypes.func,
    elementRootID: PropTypes.string,
    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string,
    selectorKey: PropTypes.string,
    handleChange: PropTypes.func,
    selected: PropTypes.any,
    label: PropTypes.string,
    getEntityKey: PropTypes.func,
    required: PropTypes.bool,
    setChanged: PropTypes.func,
    modal: PropTypes.bool,
    setModal: PropTypes.func
}
