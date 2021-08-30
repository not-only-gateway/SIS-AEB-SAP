import PropTypes from 'prop-types'
import pStyles from "../styles/Footer.module.css";
import {ArrowBackRounded, ArrowForwardRounded} from "@material-ui/icons";
import Fetch from "../methods/Fetch";
import React from "react";
import ListsPT from "../locales/ListsPT";

export default function Footer(props) {
    const lang = ListsPT

    return (
        <div className={pStyles.container}>
            <div className={pStyles.currentPageLabel}>
                {props.data?.length} - {lang.pagesLoaded}
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px', height: '100%'}}>
                <div className={pStyles.currentPageLabel}>
                    {lang.currentPage}
                </div>
                <div className={pStyles.currentPageContainer}>
                    {props.currentPage}
                </div>
                <button className={pStyles.button} onClick={() => {
                    props.setCurrentPage(props.currentPage - 1)
                }}
                        disabled={props.currentPage === 0}>
                    <ArrowBackRounded/>
                </button>


                <button
                    className={pStyles.button}
                    onClick={() => {
                        if (props.currentPage === (props.data.length - 1))
                            Fetch({
                                setHasMore: props.setHasMore,
                                setData: props.setData,
                                data: props.data,
                                maxID: props.maxID,
                                searchInput: props.searchInput.length === 0 ? null : props.searchInput,
                                setMaxID: props.setMaxID,
                                fetchToken: props.fetchToken,
                                fetchUrl: props.fetchUrl,
                                fetchSize: props.fetchSize,
                                setCurrentPage: props.setCurrentPage
                            }).then(() => props.setSize())
                        else
                            props.setCurrentPage(props.currentPage + 1)
                    }}
                    disabled={props.hasMore !== undefined && !props.hasMore && (props.data[0] === undefined || (props.data[0] !== undefined && props.currentPage === (props.data?.length - 1) && (props.data[props.data?.length - 1].length < props.fetchSize)))}>
                    <ArrowForwardRounded/>
                </button>
            </div>
        </div>
    )
}
Footer.propTypes = {
    data: PropTypes.array,
    setData: PropTypes.func,
    maxID: PropTypes.number,
    setMaxID: PropTypes.func,
    fetchToken: PropTypes.string,
    fetchSize: PropTypes.number,
    fetchUrl: PropTypes.string,
    setCurrentPage: PropTypes.func,
    currentPage: PropTypes.number,
    searchInput: PropTypes.string,
    setHasMore: PropTypes.func,
    hasMore: PropTypes.bool,
    setSize: PropTypes.func
}