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

export default function List(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const lang = ListsPT

    const [mountingPoint, setMountingPoint] = useState(undefined)

    useEffect(() => {
        const newElement = document.createElement('div')
        if (mountingPoint === undefined) {
            setMountingPoint(newElement)
            document.body.appendChild(newElement)
        }

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
        return () => {
            try {
                if (newElement !== undefined)
                    document.body.removeChild(newElement)
            }
            catch(e){
                console.log(e)
            }
        }
    }, [])


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
            {props.options !== undefined && mountingPoint !== undefined ?
                <ContextMenu mountingPoint={mountingPoint} data={data} options={props.options}/> : null}
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
                                               setEntity={() => props.setEntity(null)} dataLength={data.length}
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
    fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.oneOf(['bool', 'string', 'number','date']),
        maskStart: PropTypes.string,
        label: PropTypes.string
    })),
    noShadow: PropTypes.bool,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.string,
        icon: PropTypes.object,
        onClick: PropTypes.func,
        disabled: PropTypes.bool
    })),
}
