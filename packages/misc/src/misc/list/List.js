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
            gap: '8px'
        }}>
            <div className={styles.headerContainer}>
                <div className={styles.titleContainer}>{props.title}</div>
                {props.noSearchBar || props.searchFieldName === undefined ? null :
                    <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} applySearch={() => {
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
            {props.createOption ? <ListContent create={true} lang={lang} setEntity={() => props.setEntity(null)}
                                               clickEvent={() => props.clickEvent(true)} entity={null}/> : null}

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
                    <div style={{display: 'grid', gap: '8px', overflow: 'hidden', height: 'auto'}}>
                        {data.map((entity, index) =>
                            <React.Fragment key={index + props.listKey}>
                                <ListContent index={index} onlyCreate={props.onlyCreate}
                                             create={false} lang={lang} entity={entity}
                                             setEntity={() => props.setEntity(entity)}
                                             renderElement={props.renderElement}
                                             clickEvent={() => props.clickEvent(true)}
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