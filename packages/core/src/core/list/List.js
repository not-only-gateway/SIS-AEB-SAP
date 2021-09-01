import React, {useEffect, useRef, useState} from "react";
import Fetch from "./methods/Fetch";
import Loader from "./modules/Loader";
import styles from './styles/List.module.css'
import SearchBar from "./modules/SearchBar";
import ContextMenu from "./modules/ContextMenu";
import ListPropsTemplate from "../shared/ListPropsTemplate";
import ListHeader from "./modules/Header";
import ListLabels from "./modules/ListLabels";
import Checkbox from "./modules/Checkbox";
import ControlHeader from "./modules/ControlHeader";
import Content from "./modules/Content";
import Footer from "./modules/Footer";
import EmptyListIndicator from "./modules/EmptyListIndicator";

export default function List(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [searchInput, setSearchInput] = useState('')
    const [currentPage, setCurrentPage] = useState(0)
    const [mounted, setMounted] = useState(false)
    const [mountingPoint, setMountingPoint] = useState(undefined)
    const [loading, setLoading] = useState(true)
    const [maxHeight, setMaxHeight] = useState(undefined)
    const ref = useRef()
    const [selected, setSelected] = useState([])
    const [sorts, setSorts] = useState([])
    const [fetchSize, setFetchSize] = useState(15)
    const [size, setSize] = useState(0)
    const [hasMore, setHasMore] = useState(undefined)
    const getLength = () => {
        let l = 0
        for (let i = 0; i < data.length; i++)
            l = l + data[i].length
        setSize(l)

    }
    const refresh = () => {
        setSelected([])
        setLoading(true)
        setData([])
        setMaxID(null)

        if (typeof props.setRefreshed === 'function')
            props.setRefreshed(true)

        Fetch({
            setHasMore: setHasMore,
            fetchSize: fetchSize,
            setData: setData,
            data: [],
            maxID: null,
            searchInput: null,
            setMaxID: setMaxID,
            fetchToken: props.fetchToken,
            fetchUrl: props.fetchUrl,
            params: props.fetchParams,
            searchFieldName: props.searchFieldName
        }).then(() => {
            setLoading(false)
            getLength()
        })
    }

    useEffect(() => {
        if (!mounted) {
            let newSorts = []
            props.fields.forEach(e => {
                newSorts.push({
                    field: e.name,
                    type: undefined,
                    variant: e.type
                })
            })

            setSorts(newSorts)

            if (!props.asModal) {
                setMaxHeight(document.documentElement.offsetHeight - ref.current.getBoundingClientRect().y - 16)
            } else {

                setMaxHeight(ref.current?.parentNode.getBoundingClientRect().height - ref.current?.offsetTop)
            }


            const newElement = document.createElement('div')
            if (mountingPoint === undefined) {
                setMountingPoint(newElement)
                document.body.appendChild(newElement)
            }
            setMounted(true)
        }

        if (Array.isArray(data) && (props.triggerRefresh || data.length === 0))
            refresh()


    }, [props.triggerRefresh])

    return (
        <div
            className={styles.container} ref={ref}
            style={{height: maxHeight + 'px'}}
        >

            <ContextMenu mountingPoint={mountingPoint} data={data} options={props.options}/>
            <div className={styles.header}>
                <ListHeader
                    title={props.title}
                />
                <ControlHeader
                    controlOptions={props.controlOptions} disabled={selected.length === 0} data={data}
                    selected={selected} createOption={props.createOption} listTitle={props.title}
                    refresh={refresh} setEntity={props.setEntity} clickEvent={props.clickEvent}
                />
                <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                    {props.noSearchBar || props.searchFieldName === undefined ? null :
                        <SearchBar
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            applySearch={() => {
                                Fetch({
                                    setData: setData,
                                    data: [],
                                    setHasMore: setHasMore,
                                    fetchSize: props.fetchSize,
                                    maxID: null,
                                    searchInput: searchInput.length === 0 ? null : searchInput,
                                    setMaxID: setMaxID,
                                    fetchToken: props.fetchToken,
                                    fetchUrl: props.fetchUrl,
                                    params: props.fetchParams,
                                    searchFieldName: props.searchFieldName
                                }).then(() => getLength())
                            }}/>
                    }

                </div>


            </div>
            <div className={styles.contentWrapper}>
                <div className={styles.labelsContainer}>
                    <Checkbox
                        noSelect={props.noSelect}
                        checked={size === selected.length && size > 0}
                        handleCheck={checked => {
                            getLength()
                            if (!isNaN(size) && !checked && size > 0) {
                                let newA = new Array(size)
                                for (let i = 0; i < size; i++)
                                    newA[i] = i

                                setSelected(newA)
                            } else
                                setSelected([])
                        }}
                    />
                    {props.labels.map((l, i) => (
                        <React.Fragment key={'list-labels-' + i + '-' + l}>
                            <ListLabels sorts={sorts} setSorts={setSorts} data={data} index={i} label={l}
                                        fields={props.fields}/>
                        </React.Fragment>
                    ))}
                </div>
                {loading ?
                    <>
                        <Loader/>
                        <Loader/>
                        <Loader/>
                    </>
                    :
                    (data[0] !== undefined && data[0].length > 0 ?
                            <Content
                                data={data} setData={setData} setSelected={setSelected} sorts={sorts}
                                selected={selected} noSelect={props.noSelect} pageData={data[currentPage]}

                                fields={props.fields} clickEvent={props.clickEvent} setEntity={props.setEntity}
                            />
                            :
                            <EmptyListIndicator/>


                    )}
            </div>
            <Footer
                setCurrentPage={setCurrentPage} data={data} currentPage={currentPage} setData={setData}
                fetchSize={fetchSize} fetchToken={props.fetchToken} maxID={maxID} setMaxID={setMaxID}
                setSize={() => getLength()}
                fetchUrl={props.fetchUrl} searchInput={searchInput} setHasMore={setHasMore} hasMore={hasMore}
            />
        </div>
    )
}
List.propTypes = ListPropsTemplate