import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import mainStyles from "../../../styles/shared/Main.module.css";
import shared from "../../../styles/shared/Shared.module.css";
import Link from 'next/link'
import fetchUnits from "../../../utils/fetch/FetchUnits";

export default function UnitList(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(0)
    useEffect(() => {
        fetchUnits({
            setData: setData,
            data: data,
            maxID: null,
            searchInput: props.searchInput,
            setMaxID: setMaxID,
            setLastFetchedSize: setLastFetchedSize
        })
    }, [props.searchInput])

    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',
            gap: '16px'
        }}>
            {data.length > 0 ?
                <InfiniteScroll
                    dataLength={data.length}
                    next={() => fetchUnits({
                        setData: setData,
                        data: data,
                        maxID: maxID,
                        searchInput: props.searchInput,
                        setMaxID: setMaxID,
                        setLastFetchedSize: setLastFetchedSize
                    })}
                    hasMore={lastFetchedSize === 15}
                    inverse={false}
                    scrollableTarget="scrollableDiv"
                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                      height={'56px'}/>}
                    style={{
                        overflow: 'visible'
                    }}
                    endMessage={
                        <div>
                            <h5
                                style={{textAlign: 'center', color: '#555555'}}>{props.end}</h5>
                        </div>
                    }
                >
                    <div style={{
                        display: 'grid',
                        marginTop: '10px',
                        width: '100%',
                        gap: '8px'
                    }}>
                        {data.map(unit => (
                            <Link href={'/unit?id=' + unit.id}>
                                <button
                                    style={{
                                        border: 'none',
                                        outline: 'none',
                                        boxShadow: 'none',
                                        backgroundColor: 'transparent'
                                    }}>
                                    <div key={unit.id} className={shared.rowContainer} style={{gap: '16px'}}>
                                        {unit.name}
                                    </div>
                                </button>
                            </Link>
                        ))}
                    </div>
                </InfiniteScroll>
                :
                <div>
                    <h5 className={mainStyles.secondaryParagraph}
                        style={{textAlign: 'center', color: '#555555'}}>{props.nothingFound}</h5>
                </div>
            }
        </div>
    )
}
UnitList.propTypes = {
    end: PropTypes.string,
    nothingFound: PropTypes.string,
    locale: PropTypes.string,
    searchInput: PropTypes.string,
    member: PropTypes.string
}