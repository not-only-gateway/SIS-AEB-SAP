import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Fetch from "./methods/Fetch";
import ListContent from "./modules/ListContent";
import ListsPT from "./locales/ListsPT";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./modules/Loader";
import styles from './styles/List.module.css'
import SearchBar from "./modules/SearchBar";
import ContextMenu from "./modules/ContextMenu";
import RefreshRoundedIcon from '@material-ui/icons/RefreshRounded';
export default function List(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const lang = ListsPT
    const [mounted, setMounted] = useState(false)
    const [mountingPoint, setMountingPoint] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const refresh = () => {
        setLoading(true)
        setData([])
        setMaxID(null)
        setLastFetchedSize(null)
        if (typeof props.setRefreshed === 'function')
            props.setRefreshed(true)

        Fetch({
            setLastFetchedSize: setLastFetchedSize,
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
            const newElement = document.createElement('div')
            if (mountingPoint === undefined) {
                setMountingPoint(newElement)
                document.body.appendChild(newElement)
            }
            setMounted(true)
        }

        if(props.triggerRefresh || data.length === 0)
            refresh()
    }, [props.triggerRefresh])


    return (
        <div style={{
            display: 'grid',
            width: '100%',
            overflowX: 'hidden',

            background: 'white',
            padding: '0 32px 8px 32px',
            borderRadius: '5px',
            boxShadow: props.noShadow ? 'none' : 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
        }}>
            {
                props.options !== undefined && mountingPoint !== undefined ?
                    <ContextMenu mountingPoint={mountingPoint} data={data} options={props.options}/>
                    :
                    null
            }
            <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>
                    {props.title}
                    <button onClick={() => refresh()} className={styles.refreshButton}>
                        <RefreshRoundedIcon/>
                    </button>
                </div>
                {props.noSearchBar || props.searchFieldName === undefined ? null :
                    <SearchBar fullWidth={props.title === undefined} searchInput={searchInput}
                               setSearchInput={setSearchInput} applySearch={() => {
                        Fetch({
                            setLastFetchedSize: setLastFetchedSize,
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
            </div>
            <div className={styles.labelsContainer}>
                {props.labels.map(l => (
                    <div className={styles.label} style={{width: (100 / props.labels.length) + '%'}}>
                        {l}
                    </div>
                ))}
            </div>
            {props.createOption ?
                <ListContent
                    create={true} createOptionLabel={props.createOptionLabel} lang={lang}
                    setEntity={() => props.setEntity(null)} dataLength={data.length}
                    clickEvent={props.clickEvent} entity={null}
                />
                :
                null}
            {loading ?
                <Loader/>
                :
                (data !== undefined && Array.isArray(data) && data.length > 0 ?
                    <InfiniteScroll
                        dataLength={data.length}
                        next={() => Fetch({
                            setLastFetchedSize: setLastFetchedSize,
                            setData: setData,
                            data: data,
                            maxID: maxID,
                            searchInput: searchInput.length === 0 ? null : searchInput,
                            setMaxID: setMaxID,
                            fetchToken: props.fetchToken,
                            fetchUrl: props.fetchUrl
                        })}
                        hasMore={props.fetchSize !== undefined && props.fetchSize !== null ? lastFetchedSize === props.fetchSize : lastFetchedSize === 15}
                        inverse={false}
                        scrollableTarget={props.scrollableElement}
                        loader={<Loader/>}
                        endMessage={
                            <div style={{width: '100%', userSelect: 'none'}}>
                                <h5
                                    style={{textAlign: 'center', color: '#555555'}}>{lang.end}</h5>
                            </div>
                        }
                    >
                        <div style={{display: 'grid', overflow: 'hidden', height: 'auto', maxWidth: '100%'}}>
                            {data.map((entity, index) =>
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

                    </InfiniteScroll>
                    :
                    <div style={{width: '100%', userSelect: 'none'}}>
                        <h5
                            style={{textAlign: 'center', color: '#555555'}}>{lang.nothingFound}</h5>
                    </div>)
            }

        </div>
    )
}
List.propTypes = {
    createOptionLabel: PropTypes.string,
    title: PropTypes.string,
    searchFieldName: PropTypes.string,
    noSearchBar: PropTypes.bool,

    onlyCreate: PropTypes.bool,
    listKey: PropTypes.any,
    fetchSize: PropTypes.number,
    setEntity: PropTypes.any,
    createOption: PropTypes.bool,
    clickEvent: PropTypes.func,

    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string,
    fetchParams: PropTypes.object,

    scrollableElement: PropTypes.string,
    fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['bool', 'string', 'number', 'date']),
        maskStart: PropTypes.string,
        maskEnd: PropTypes.string,
        getColor: PropTypes.func,
        capitalize: PropTypes.string
    })),
    labels: PropTypes.arrayOf(PropTypes.any),
    noShadow: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),


    triggerRefresh: PropTypes.bool,
    setRefreshed: PropTypes.func
}
