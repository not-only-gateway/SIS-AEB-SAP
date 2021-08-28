import React, {useEffect, useRef, useState} from "react";
import Fetch from "./methods/Fetch";
import ListContent from "./modules/ListContent";
import ListsPT from "./locales/ListsPT";
import Loader from "./modules/Loader";
import styles from './styles/List.module.css'
import SearchBar from "./modules/SearchBar";
import ContextMenu from "./modules/ContextMenu";
import {ArrowBackRounded, ArrowForwardRounded, FolderOutlined, FolderRounded, ListRounded} from "@material-ui/icons";
import ListPropsTemplate from "../shared/ListPropsTemplate";
import pStyles from './styles/Footer.module.css'
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
    const [hasMore, setHasMore] = useState(undefined)

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
        }).then(() => setLoading(false))
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

        if (props.triggerRefresh || data.length === 0)
            refresh()
    }, [props.triggerRefresh])

    const labels = (
        <div className={styles.labelsContainer}>
            <Checkbox
                noSelect={props.noSelect}
                checked={data.length > 0 && selected.length === (data.length * fetchSize - data[data.length - 1].length)}
                handleCheck={checked => {
                    let length = data.length * fetchSize - data[data.length - 1].length
                    if (!checked && length > 0 && !isNaN(length)) {


                        let newA = new Array(length)
                        for (let i = 0; i < length; i++)
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
    )
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
                    selected={selected} createOption={props.createOption}
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
                                })
                            }}/>
                    }

                </div>


            </div>
            {loading ?
                <div className={styles.contentWrapper}>
                    {labels}
                    <Loader/>
                    <Loader/>
                    <Loader/>
                </div>
                :
                (data[0] !== undefined && data[0].length > 0 ?
                        <div className={styles.contentWrapper}>
                            {labels}
                            <Content
                                data={data} setData={setData} setSelected={setSelected} sorts={sorts}
                                selected={selected} noSelect={props.noSelect} pageData={data[currentPage]}

                                fields={props.fields} clickEvent={props.clickEvent} setEntity={props.setEntity}
                            />
                        </div>
                        :
                        <div className={styles.contentWrapper}>
                            {labels}
                            <EmptyListIndicator/>
                        </div>

                )}

            <Footer
                setCurrentPage={setCurrentPage} data={data} currentPage={currentPage} setData={setData}
                fetchSize={fetchSize} fetchToken={props.fetchToken} maxID={maxID} setMaxID={setMaxID}
                fetchUrl={props.fetchUrl} searchInput={searchInput} setHasMore={setHasMore} hasMore={hasMore}
            />
        </div>
    )
}
List.propTypes = ListPropsTemplate