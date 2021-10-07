import styles from '../styles/SelectorModal.module.css'
import {ClearAllRounded, FilterListRounded, FilterRounded} from "@material-ui/icons";
import React, {useState} from "react";
import Modal from "../../../misc/modal/Modal";
import PropTypes from "prop-types";
import Row from "./Row";
import useInfiniteScroll from "../../../shared/hooks/useInfiniteScroll";
import EmptyListIndicator from "../../../shared/components/EmptyListIndicator";
import ToolTip from "../../../misc/tooltip/ToolTip";
import Switcher from "../../../misc/switcher/Switcher";

export default function SelectorModal(props) {
    const lastElementRef = useInfiniteScroll(props.hook.setCurrentPage, props.hook.currentPage, props.hook.loading, props.hook.hasMore)
    const [openFilters, setOpenFilters] = useState(false)
    return (
        <Modal
            open={props.open}
            handleClose={() => props.setOpen(false)}
            animationStyle={'slide-right'}
            blurIntensity={0}
            wrapperClassName={styles.wrapper}
        >
            <div className={styles.header}>
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    {props.title}
                    <button onClick={() => setOpenFilters(!openFilters)}  className={[styles.row, styles.asButton, openFilters ? styles.positiveButton : ''].join(' ')}>
                        <FilterListRounded/>
                        <ToolTip content={'Filtros'}/>
                    </button>
                </div>
                <button onClick={() => props.handleChange(null)} className={[styles.row, styles.asButton, styles.negativeButton].join(' ')}
                        disabled={!props.value}>
                    <ClearAllRounded/>
                    <ToolTip content={'Limpar'}/>
                </button>
            </div>

            <Row
                emptyIndicator={true}
                data={props.value}
                keys={props.keys}
                onDrop={index => {
                    if (!isNaN(index)) {
                        props.handleChange(props.hook.data[index].data)
                        props.setOpen(false)
                    }
                }}
            />

            <div className={styles.divider}/>

            <Switcher openChild={openFilters ? 1 : 0}>
                <div className={styles.rows}>
                    {props.hook.data.length === 0 ? <EmptyListIndicator/> : props.hook.data.map((e, i) => (
                        <React.Fragment key={e.id + '-selector-modal-row-' + i}>
                            <Row
                                disabled={false} emptyIndicator={false}
                                onClick={() => {
                                    props.handleChange(e.data)
                                    props.setOpen(false)
                                }}
                                keys={props.keys}
                                reference={i === (props.hook.data.length - 1) ? lastElementRef : undefined}
                                data={e.data} index={i}
                                identificationKey={props.identificationKey}
                            />
                        </React.Fragment>
                    ))}
                </div>
                <div className={styles.filters}>
                    {/*{props.keys.map(() => getFilter())}*/}
                </div>
            </Switcher>

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
