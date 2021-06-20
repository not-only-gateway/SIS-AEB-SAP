import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";
import Fetch from "./templates/Fetch";
import ListContent from "./templates/ListContent";
import ListsPT from "./locales/ListsPT";

export default function List(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const lang = ListsPT

    useEffect(() => {

        Fetch({
            setData: setData,
            data: data,
            maxID: maxID,
            searchInput: props.searchInput,
            setMaxID: setMaxID,
            fetchToken: props.fetchToken,
            fetchUrl: props.fetchUrl
        })
    }, [])


    return (
        <div style={{
            display: 'grid',
            marginTop: '10px',
            width: '100%',
            gap: '16px'
        }}>
            {props.createOption ? <ListContent create={true} lang={lang} setEntity={() => props.setEntity(null)} clickEvent={() => props.clickEvent(true)} entity={null}/> : null}

            {(data).map((entity, index) =>
                <ListContent
                    create={false} lang={lang} entity={entity} index={index} setEntity={() => props.setEntity(entity)}
                    secondaryLabel={props.secondaryLabel} primaryLabel={props.primaryLabel} clickEvent={() => props.clickEvent(true)}
                />
            )}
        </div>
    )
}
List.propTypes = {
    primaryLabel: PropTypes.string,
    secondaryLabel: PropTypes.string,

    setEntity: PropTypes.any,
    createOption: PropTypes.bool,
    clickEvent: PropTypes.func,

    fetchUrl: PropTypes.string,
    fetchToken: PropTypes.string
}
