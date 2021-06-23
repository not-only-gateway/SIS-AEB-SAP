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

    if (props.applySearch && props.searchInput !== undefined && props.searchInput !== null) {
      setData([])

      Fetch({
        setLastFetchedSize: setLastFetchedSize,
        setData: setData,
        data: [],
        maxID: null,
        searchInput: props.searchInput,
        setMaxID: setMaxID,
        fetchToken: props.fetchToken,
        fetchUrl: props.fetchUrl
      })
      props.setAppliedSearch(false)
    } else if (props.searchInput === null || props.searchInput === undefined || props.searchInput.length === 0)
      Fetch({
        setLastFetchedSize: setLastFetchedSize,
        setData: setData,
        data: data,
        maxID: maxID,
        searchInput: null,
        setMaxID: setMaxID,
        fetchToken: props.fetchToken,
        fetchUrl: props.fetchUrl
      })
  }, [props.applySearch])


  return (
    <div style={{
      display: 'grid',
      marginTop: '10px',
      width: '100%',
      gap: '8px'
    }}>
      {props.createOption ? <ListContent create={true} lang={lang} setEntity={() => props.setEntity(null)}
                                         clickEvent={() => props.clickEvent(true)} entity={null}/> : null}

      {data.length > 0 ?
        <InfiniteScroll
          dataLength={data.length}
          next={() => Fetch({
            setLastFetchedSize: setLastFetchedSize,
            setData: setData,
            data: data,
            maxID: maxID,
            searchInput: props.searchInput.length === 0 ? null : props.searchInput,
            setMaxID: setMaxID,
            fetchToken: props.fetchToken,
            fetchUrl: props.fetchUrl
          })}
          hasMore={lastFetchedSize === 15}
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
                <ListContent
                  create={false} lang={lang} entity={entity}
                  setEntity={() => props.setEntity(entity)}
                  secondaryLabel={props.secondaryLabel} primaryLabel={props.primaryLabel}
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
  listKey: PropTypes.any,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,

  setEntity: PropTypes.any,
  createOption: PropTypes.bool,
  clickEvent: PropTypes.func,
  searchInput: PropTypes.string,
  applySearch: PropTypes.bool,
  setAppliedSearch: PropTypes.func,

  fetchUrl: PropTypes.string,
  fetchToken: PropTypes.string,

  scrollableElement: PropTypes.string,
  renderElement: PropTypes.func
}
