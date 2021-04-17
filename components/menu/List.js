import PropTypes from 'prop-types'
import React, {useState} from "react";
import axios from "axios";
import Host from "../../utils/shared/Host";
import Cookies from "universal-cookie/lib";
import {Skeleton} from "@material-ui/lab";
import mainStyles from "../../styles/shared/Main.module.css";
import {getBorder, getBoxShadow, getTertiaryBackground, getTertiaryColor} from "../../styles/shared/MainStyles";
import InfiniteScroll from "react-infinite-scroll-component";

export default function ListComponent(props) {

    const [searchValue, setSearchValue] = useState('')
    const [maxID, setMaxID] = useState(null)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState([])
    const [lastFetchedSize, setLastFetchedSize] = useState(null)


    async function fetchData(type) {
        setLoading(true)

        await axios({
            method: 'get',
            url: Host() + props.option,
            headers: (new Cookies()).get('jwt') !== undefined ? {'authorization': (new Cookies()).get('jwt')} : null,
            params: {
                max_id: maxID,
                input: searchValue
            }
        }).then(res => {
            switch (type) {
                case 0: {
                    setData([...data, ...res.data])
                    if (res.data.length > 0)
                        setMaxID(res.data[res.data.length - 1].id)
                    setLastFetchedSize(res.data.length)
                    break
                }
                case 1: {
                    console.log(type)
                    setData(res.data)
                    if (res.data.length > 0)
                        setMaxID(res.data[res.data.length - 1].id)
                    setLastFetchedSize(res.data.length)
                    break
                }
                default:
                    break
            }
        }).catch(error => {
            console.log(error)
        })

        setLoading(false)
    }

    return (
        <>
            <InfiniteScroll
                dataLength={data.length}
                next={() => fetchData(0)}
                hasMore={lastFetchedSize === 20}
                inverse={false}
                scrollableTarget="scrollableDiv"
                loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                  height={'7vh'}/>}
                endMessage={
                    <div
                        className={[mainStyles.mediumMargin, mainStyles.normalBorder, mainStyles.smallPaddingVertical, mainStyles.baseWidth].join(' ')}
                        style={{...getTertiaryBackground({dark: props.dark}), ...getBorder({dark: props.dark}), ...getBoxShadow({dark: props.dark})}}>
                        <p className={mainStyles.secondaryParagraph}
                           style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: props.dark})}}>end</p>
                    </div>
                }
            >
                <div>
                    {data.map(subject =>
                        <div>{subject.id}</div>
                    )
                    }
                </div>
            </InfiniteScroll>
            cafe
        </>
    )
}
ListComponent.propTypes = {
    dark: PropTypes.bool,
    option: PropTypes.number
}