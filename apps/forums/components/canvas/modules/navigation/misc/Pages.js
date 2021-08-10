import PropTypes from 'prop-types'
import styles from "../styles/Footer.module.css";
import {AddRounded, ListRounded} from "@material-ui/icons";
import PageField from "./PageField";
import React from 'react'
export default function Pages(props) {

    return (
        <div className={styles.pagesContainer}>
            <button
                className={styles.newPageButton}
                style={{borderRight: '#ecedf2 1px solid'}}
            >
                <ListRounded style={{fontSize: '1.7rem'}}/>
            </button>
            {props.data.pages.map((page, index) => (
                <React.Fragment key={'page-'+index}>
                    <PageField page={page} contextMenuRef={props.contextMenuRef}/>
                </React.Fragment>
            ))}
            <button
                className={styles.newPageButton}
                style={{display: props.data.pages.length < 5 ? undefined : 'none'}}
                onClick={() => {
                    let newPages = [...props.data.pages]
                    newPages.push({
                        title: 'Página ' + (props.data.pages.length + 1),
                        nodes: [],
                        links: [],
                        default: false
                    })
                    props.setData({
                        ...props.data,
                        pages: newPages
                    })
                }}>
                <AddRounded style={{fontSize: '1.5rem'}}/>
            </button>
        </div>
    )
}

Pages.propTypes = {
    data: PropTypes.object,
    setData: PropTypes.func,
    contextMenuRef: PropTypes.object
}