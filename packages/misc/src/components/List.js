import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Fetch from "./templates/Fetch";
import ListContent from "./templates/ListContent";
import ListsPT from "./locales/ListsPT";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "./Loader";

export default function List(props) {
  const [data, setData] = useState([])
  const [maxID, setMaxID] = useState(null)
  const [lastFetchedSize, setLastFetchedSize] = useState(null)

  const lang = ListsPT

  useEffect(() => {
    if(props.notSearched) {
      setData([])
      setMaxID(null)
      setLastFetchedSize(null)
    }

    Fetch({
      setLastFetchedSize: setLastFetchedSize,
      setData: setData,
      data: data,
      maxID: maxID,
      searchInput: props.searchInput,
      setMaxID: setMaxID,
      fetchToken: props.fetchToken,
      fetchUrl: props.fetchUrl
    })

    props.setNotSearched(false)
  }, [props.notSearched])


  return (
    <div style={{
      display: 'grid',
      marginTop: '10px',
      width: '100%',
      gap: '16px'
    }}>
      {props.createOption ? <ListContent create={true} lang={lang} setEntity={() => props.setEntity(null)}
                                         clickEvent={() => props.clickEvent(true)} entity={null}/> : null}


      <InfiniteScroll
        dataLength={data.length}
        next={() => Fetch({
          setLastFetchedSize: setLastFetchedSize,
          setData: setData,
          data: data,
          maxID: maxID,
          searchInput: props.searchInput,
          setMaxID: setMaxID,
          fetchToken: props.fetchToken,
          fetchUrl: props.fetchUrl
        })}
        hasMore={lastFetchedSize === 15}
        inverse={false}
        scrollableTarget={props.scrollableElement}
        loader={<Loader/>}
        style={{
          overflow: 'visible'
        }}
        endMessage={
          <div style={{width: '100%'}}>
            <h5
              style={{textAlign: 'center', color: '#555555'}}>{lang.end}</h5>
          </div>
        }
      >
        {(data).map((entity, index) =>
          <ListContent
            create={false} lang={lang} entity={entity} index={index} setEntity={() => props.setEntity(entity)}
            secondaryLabel={props.secondaryLabel} primaryLabel={props.primaryLabel} renderElement={props.renderElement}
            clickEvent={() => props.clickEvent(true)}
          />
        )}

      </InfiniteScroll>
    </div>
  )
}
List.propTypes = {
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,

  setEntity: PropTypes.any,
  createOption: PropTypes.bool,
  clickEvent: PropTypes.func,
  searchInput: PropTypes.string,
  notSearched: PropTypes.bool,
  setNotSearched: PropTypes.func,

  fetchUrl: PropTypes.string,
  fetchToken: PropTypes.string,

  scrollableElement: PropTypes.string,
  renderElement: PropTypes.func
}
