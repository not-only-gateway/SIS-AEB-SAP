import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import NodeTemplate from "../../templates/NodeTemplate";
import {
    ArrowDownward,
    ArrowDownwardRounded,
    ArrowDropDownRounded,
    CloseRounded,
    DragIndicatorRounded
} from "@material-ui/icons";
import styles from '../../styles/NodeMenu.module.css'
import LinkTemplate from "../../templates/LinkTemplate";

export default function NodeMenu(props) {
    const [links, setLinks] = useState({
        top: [],
        bottom: [],
        left: [],
        right: []
    })

    useEffect(() => {
        setLinks({
            top: props.links.filter(el => {
                if (el.parent.indicator === 'top')
                    return el
                else
                    return null
            }),
            bottom: props.links.filter(el => {
                if (el.parent.indicator === 'bottom')
                    return el
                else
                    return null
            }),
            left: props.links.filter(el => {
                if (el.parent.indicator === 'left')
                    return el
                else
                    return null
            }),
            right: props.links.filter(el => {
                if (el.parent.indicator === 'right')
                    return el
                else
                    return null
            })
        })
    }, [props.links])
    return (
        <div style={{
            opacity: (props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id)) ? '1' : '0',
            border: (props.node.color + ' 2px dashed'),
            borderRadius: props.node.shape === 'circle' ? '50%' : '5px',
            width: props.nodeRef !== undefined ? (props.nodeRef.offsetWidth + 20) + 'px' : 'unset',
            height: props.nodeRef !== undefined ? (props.nodeRef.offsetHeight + 20) + 'px' : 'unset'
        }} className={styles.selectedHighlight} id={`${props.node.id}-selected`}>

            <button id={`${props.node.id}-left`} className={styles.indicator}
                    disabled={!(props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id))}
                    onClick={() => {
                        if (links.left.length > 0)
                            props.handleLinkDelete(links.left[0])
                        else
                            props.handleLink(props.node.id, 'left')
                    }}
                    style={{
                        top: 'calc(50% - 15px)',
                        left: '-34px',
                        opacity: (props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id)) ? '1' : '0',
                        background: links.left.length > 0 ? '#ff5555' : undefined,
                        color: links.left.length > 0 ? 'white' : undefined,
                    }}>
                {links.left.length > 0 ? <CloseRounded/> :
                    <ArrowDropDownRounded style={{fontSize: '2rem', transform: 'rotate(90deg)'}}/>}
            </button>
            <button id={`${props.node.id}-right`} className={styles.indicator}
                    disabled={!(props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id))}
                    onClick={() => {
                        if (links.right.length > 0)
                            props.handleLinkDelete(links.right[0])
                        else
                            props.handleLink(props.node.id, 'right')
                    }}
                    style={{
                        top: 'calc(50% - 15px)',
                        right: '-34px',
                        opacity: (props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id)) ? '1' : '0',
                        background: links.right.length > 0 ? '#ff5555' : undefined,
                        color: links.right.length > 0 ? 'white' : undefined,
                    }}>
                {links.right.length > 0 ? <CloseRounded/> :
                    <ArrowDropDownRounded style={{fontSize: '2rem', transform: 'rotate(-90deg)'}}/>}
            </button>
            <button id={`${props.node.id}-bottom`} className={styles.indicator}
                    disabled={!(props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id))}
                    onClick={() => {
                        if (links.bottom.length > 0)
                            props.handleLinkDelete(links.bottom[0])
                        else
                            props.handleLink(props.node.id, 'bottom')
                    }}
                    style={{
                        bottom: '-34px',
                        right: 'calc(50% - 15px)',
                        opacity: (props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id)) ? '1' : '0',
                        background: links.bottom.length > 0 ? '#ff5555' : undefined,
                        color: links.bottom.length > 0 ? 'white' : undefined,
                    }}>
                {links.bottom.length > 0 ? <CloseRounded/> : <ArrowDropDownRounded style={{fontSize: '2rem'}}/>}
            </button>
            <button id={`${props.node.id}-top`} className={styles.indicator}
                    disabled={!(props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id))}
                    onClick={() => {
                        if (links.top.length > 0)
                            props.handleLinkDelete(links.top[0])
                        else
                            props.handleLink(props.node.id, 'top')
                    }}
                    style={{
                        top: '-34px',
                        right: 'calc(50% - 15px)',
                        opacity: (props.selected === props.node.id || (props.toBeLinked !== null && props.toBeLinked?.id !== props.node.id)) ? '1' : '0',
                        background: links.top.length > 0 ? '#ff5555' : undefined,
                        color: links.top.length > 0 ? 'white' : undefined,
                    }}>
                {links.top.length > 0 ? <CloseRounded/> :
                    <ArrowDropDownRounded style={{fontSize: '2rem', transform: 'rotate(180deg)'}}/>}

            </button>
        </div>
    )
}
NodeMenu.propTypes = {
    selected: PropTypes.string,

    nodeRef: PropTypes.object,
    handleLinkDelete: PropTypes.func,
    node: NodeTemplate,
    handleLink: PropTypes.func,
    links: PropTypes.arrayOf(LinkTemplate)
}