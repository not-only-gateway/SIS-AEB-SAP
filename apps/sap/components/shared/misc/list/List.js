import React, {useEffect, useRef, useState} from "react";
import Fetch from "./methods/Fetch";
import ListContent from "./modules/ListContent";
import ListsPT from "./locales/ListsPT";
import Loader from "./modules/Loader";
import styles from './styles/List.module.css'
import SearchBar from "./modules/SearchBar";
import ContextMenu from "./modules/ContextMenu";
import {ArrowBackRounded, ArrowForwardRounded} from "@material-ui/icons";
import ListPropsTemplate from "../shared/ListPropsTemplate";
import pStyles from './styles/PageChanger.module.css'
import ListHeader from "./modules/Header";
import ListLabels from "./modules/ListLabels";
import Checkbox from "./modules/Checkbox";
import ControlHeader from "./modules/ControlHeader";
import Content from "./modules/Content";

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
    const [selected, setSelected] = useState([])
    const [sorts, setSorts] = useState([])
    const refresh = () => {
        setSelected([])
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
            let newSorts= []
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


    return (
        <div
            className={styles.container} ref={ref}
            style={{height: maxHeight + 'px'}}
        >
            {
                props.options !== undefined && mountingPoint !== undefined ?
                    <ContextMenu mountingPoint={mountingPoint} data={data} options={props.options}/>
                    :
                    null
            }
            <div className={styles.header}>
                <ListHeader
                    createOption={props.createOption} clickEvent={props.clickEvent}
                    setEntity={props.setEntity} title={props.title} refresh={refresh}
                />
                <div style={{display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px'}}>
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
                    <ControlHeader controlOptions={props.controlOptions} disabled={selected.length === 0} data={data}
                                   selected={selected}/>
                </div>

                <div className={styles.labelsContainer}>
                    <Checkbox
                        noSelect={props.noSelect}
                        checked={data.length > 0 && selected.length === (data.length * (props.fetchSize !== undefined ? props.fetchSize : 15) - data[data.length - 1].length)}
                        handleCheck={checked => {
                            if (!checked) {
                                let length = data.length * (props.fetchSize !== undefined ? props.fetchSize : 15) - data[data.length - 1].length

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
                            <ListLabels sorts={sorts} setSorts={setSorts} data={data} index={i} label={l} fields={props.fields}/>
                        </React.Fragment>
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
                (data[0] !== undefined && data[0].length > 0 ?
                        <Content
                            data={data} setData={setData} setSelected={setSelected} sorts={sorts}
                            selected={selected} noSelect={props.noSelect} pageData={data[currentPage]}
                            fields={props.fields} clickEvent={props.clickEvent} setEntity={props.setEntity}
                        />
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