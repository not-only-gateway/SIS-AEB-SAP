import styles from '../styles/SelectorModal.module.css'
import {ClearAllRounded, CloseRounded} from "@material-ui/icons";
import React, {useCallback, useEffect, useRef, useState} from "react";
import SelectorsPT from "../locales/SelectorsPT";
import Modal from "../../../misc/modal/Modal";
import PropTypes from "prop-types";
import Row from "./Row";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";

export default function SelectorModal(props) {
    const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)

    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}
            animationStyle={'slide-right'}
            blurIntensity={0}
            wrapperClassName={styles.wrapper}
        >
            {/*<div className={styles.headerWrapper}>*/}
                <div className={styles.header}>
                    {props.title}
                    <button onClick={() => props.handleChange(null)} className={[styles.row, styles.asButton].join(' ')} disabled={!props.value}>
                        <ClearAllRounded/>
                    </button>
                </div>

                <Row
                    emptyIndicator={true}
                    data={props.value}
                    keys={props.keys}
                    onDrop={index => {
                        if (!isNaN(index))
                            props.handleChange(props.hook.data[index].data)
                    }}
                />

            <div className={styles.divider}/>
            {/*</div>*/}
            <div className={styles.rows}>
                {props.hook.data.map((e, i) => (
                    <React.Fragment key={e.id + '-selector-modal-row-' + i}>
                        <Row
                            disabled={false} emptyIndicator={false}
                            onClick={() => props.handleChange(e.data)}
                            keys={props.keys}
                            reference={i === (props.hook.data.length - 1) ? lastElementRef : undefined}
                            data={e.data} index={i}
                            identificationKey={props.identificationKey}
                        />
                    </React.Fragment>
                ))}
            </div>
        </Modal>
    )


}
SelectorModal.propTypes = {
    data: PropTypes.array,
    keys: PropTypes.array,

    open: PropTypes.bool,
    setOpen: PropTypes.func,

    value: PropTypes.object,
    handleChange: PropTypes.func,

    title: PropTypes.string,
    hook: PropTypes.object,
    identificationKey: PropTypes.string
}
