import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Fetch from "./Fetch";
import ListContent from "./ListContent";
import ListsPT from "./locales/ListsPT";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";
import styles from './styles/List.module.css'
import SearchBar from "./SearchBar";

export default function List(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const lang = ListsPT

    useEffect(() => {
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
        })
    }, [])


    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',

            background: 'white',
            padding: '0 16px 16px 16px',
            borderRadius: '5px'
        }}>
            <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>{props.title}</div>
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
            {props.createOption ? <ListContent create={true} createOptionLabel={props.createOptionLabel} lang={lang}
                                               setEntity={() => props.setEntity(null)}
                                               clickEvent={props.clickEvent} entity={null}/> : null}

            {data !== undefined && Array.isArray(data) && data.length > 0 ?
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
                        <div style={{width: '100%'}}>
                            <h5
                                style={{textAlign: 'center', color: '#555555'}}>{lang.end}</h5>
                        </div>
                    }
                >
                    <div style={{display: 'grid', overflow: 'hidden', height: 'auto'}}>
                        {data.map((entity, index) =>
                            <React.Fragment key={index + props.listKey}>
                                <ListContent
                                    index={index} onlyCreate={props.onlyCreate}
                                    create={false} lang={lang} entity={entity}
                                    setEntity={() => props.setEntity(entity)}
                                    renderElement={props.renderElement}
                                    clickEvent={props.clickEvent} isLast={index === (data.length - 1)}
                                />
                            </React.Fragment>
                        )}
                    </div>

                </InfiniteScroll>
                :
                <div style={{width: '100%'}}>
                    <h5
                        style={{textAlign: 'center', color: '#555555'}}>{lang.nothingFound}</h5>
                </div>
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
    renderElement: PropTypes.func
}
