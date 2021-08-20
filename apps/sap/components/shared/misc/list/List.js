import PropTypes from 'prop-types'
import React, {useEffect, useRef, useState} from "react";
import Fetch from "./methods/Fetch";
import ListContent from "./modules/ListContent";
import ListsPT from "./locales/ListsPT";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./modules/Loader";
import styles from './styles/List.module.css'
import SearchBar from "./modules/SearchBar";
import ContextMenu from "./modules/ContextMenu";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
import {AddRounded, ArrowBackRounded, ArrowForwardRounded} from "@material-ui/icons";
import ListPropsTemplate from "./ListPropsTemplate";
import pStyles from './styles/PageChanger.module.css'

export default function List(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const lang = ListsPT
    const [mounted, setMounted] = useState(false)
    const [mountingPoint, setMountingPoint] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [maxHeight, setMaxHeight] = useState(undefined)
    const ref = useRef()
    const refresh = () => {
        setLoading(true)
        setData([])
        setMaxID(null)

        if (typeof props.setRefreshed === 'function')
            props.setRefreshed(true)

        Fetch({
            setData: setData,
            data: [],
            maxID: null,
            searchInput: null,
            setMaxID: setMaxID,
            fetchToken: props.fetchToken,
            fetchUrl: props.fetchUrl,
            params: props.fetchParams,
            searchFieldName: props.searchFieldName
        }).then(() => setLoading(false))
    }

    useEffect(() => {
        if (!mounted) {
            setMaxHeight(document.documentElement.offsetHeight - ref.current.getBoundingClientRect().y - 16)
            const newElement = document.createElement('div')
            if (mountingPoint === undefined) {
                setMountingPoint(newElement)
                document.body.appendChild(newElement)
            }
            setMounted(true)
        }

        if (props.triggerRefresh || data.length === 0)
            refresh()
    }, [props.triggerRefresh])


    return (
        <div className={styles.container} ref={ref} style={{
            boxShadow: props.noShadow ? 'none' : undefined, height: maxHeight + 'px'
        }}>
            {
                props.options !== undefined && mountingPoint !== undefined ?
                    <ContextMenu mountingPoint={mountingPoint} data={data} options={props.options}/>
                    :
                    null
            }
            <div className={styles.header}>
                <div className={styles.headerContainer}>
                    <div className={styles.titleContainer}>
                        {props.title}
                        <button onClick={() => refresh()} className={styles.refreshButton}>
                            <RefreshRoundedIcon/>
                        </button>
                    </div>
                    {props.createOption ?
                        <button onClick={() => {
                            props.setEntity(null)
                            props.clickEvent()
                        }} className={styles.createButton}>
                            <AddRounded/>
                            Inserir
                        </button>
                        :
                        null
                    }
                </div>
                {props.noSearchBar || props.searchFieldName === undefined ? null :
                    <SearchBar fullWidth={props.title === undefined} searchInput={searchInput}
                               setSearchInput={setSearchInput} applySearch={() => {
                        Fetch({
                            setData: setData,
                            data: [],
                            maxID: null,
                            searchInput: searchInput.length === 0 ? null : searchInput,
                            setMaxID: setMaxID,
                            fetchToken: props.fetchToken,
                            fetchUrl: props.fetchUrl,
                            params: props.fetchParams,
                            searchFieldName: props.searchFieldName
                        })
                    }}/>
                }
                <div className={styles.labelsContainer}>
                    {props.labels.map(l => (
                        <div className={styles.label} style={{width: (100 / props.labels.length) + '%'}}>
                            {l}
                        </div>
                    ))}
                </div>

            </div>

            {loading ?
                <div style={{
                    display: 'grid',
                    alignContent: 'flex-start',
                    overflowY: 'auto',
                    height: '100%',
                    maxWidth: '100%'
                }}>
                    <Loader/>
                    <Loader/>
                    <Loader/>
                </div>
                :
                (data !== undefined && Array.isArray(data) && data.length > 0 && data[0] !== undefined && data[0].length > 0 ?
                        <div style={{
                            display: 'grid',
                            alignContent: 'flex-start',
                            overflowY: 'auto',
                            height: '100%',
                            maxWidth: '100%'
                        }}>

                            {data[currentPage].map((entity, index) =>
                                <React.Fragment key={index + props.listKey}>
                                    <ListContent
                                        index={index} onlyCreate={props.onlyCreate}
                                        create={false} lang={lang} entity={entity}
                                        setEntity={() => props.setEntity(entity)}
                                        fields={props.fields}
                                        clickEvent={props.clickEvent} isLast={index === (data.length - 1)}
                                    />
                                </React.Fragment>
                            )}
                        </div>
                        :
                        <div style={{
                            display: 'grid',
                            overflowY: 'auto',
                            height: '100%',
                            maxWidth: '100%',
                            userSelect: 'none'
                        }}>

                            <h5
                                style={{textAlign: 'center', color: '#555555'}}>{lang.nothingFound}</h5>
                        </div>
                )}
            <div className={pStyles.container}>
                <div className={pStyles.currentPageLabel}>
                    {data?.length} - {lang.pagesLoaded}
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px', height: '100%'}}>
                    <div className={pStyles.currentPageLabel}>
                        {lang.currentPage}
                    </div>
                    <div className={pStyles.currentPageContainer}>
                        {currentPage}
                    </div>
                    <button className={pStyles.button} onClick={() => {
                        setCurrentPage(currentPage - 1)
                    }}
                            disabled={currentPage === 0}>
                        <ArrowBackRounded/>
                    </button>


                    <button
                        className={pStyles.button}
                        onClick={() => {
                            if (currentPage === (data.length - 1))
                                Fetch({
                                    setData: setData,
                                    data: data,
                                    maxID: maxID,
                                    searchInput: searchInput.length === 0 ? null : searchInput,
                                    setMaxID: setMaxID,
                                    fetchToken: props.fetchToken,
                                    fetchUrl: props.fetchUrl,
                                    setCurrentPage: setCurrentPage
                                })
                            else
                                setCurrentPage(currentPage + 1)
                        }}
                        disabled={data[0] !== undefined && currentPage === (data?.length - 1) && ((data[data?.length - 1].length < props.fetchSize && props.fetchSize) || data[data?.length - 1].length < 15)}>
                        <ArrowForwardRounded/>
                    </button>
                </div>
            </div>
        </div>
    )
}
List.propTypes = ListPropsTemplate