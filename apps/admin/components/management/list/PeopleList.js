import PropTypes from 'prop-types'
import React, {useEffect, useState} from "react";

import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import mainStyles from "../../../styles/shared/Main.module.css";
import Person from "../Person";
import OrganizationalRequests from "../../../utils/fetch/OrganizationalRequests";
import BaseForm from "../../person/forms/BaseForm";
import handleObjectChange from "../../../utils/shared/HandleObjectChange";
import PersonSubmitRequests from "../../../utils/submit/PersonSubmitRequests";
import shared from '../../../styles/shared/Shared.module.css'

export default function PeopleList(props) {
    const [data, setData] = useState([])
    const [maxID, setMaxID] = useState(null)
    const [lastFetchedSize, setLastFetchedSize] = useState(0)
    useEffect(() => {
        // OrganizationalRequests.fe({
        //     setData: setData,
        //     data: data,
        //     maxID: null,
        //     searchInput: props.searchInput,
        //     setMaxID: setMaxID,
        //     setLastFetchedSize: setLastFetchedSize
        // })
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
                    next={() => fetchPeople({
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
                        <div >
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
                        <div className={shared.rowContainer}>
                            {/*<BaseForm*/}
                            {/*    id={undefined}*/}
                            {/*    setID={setID}*/}
                            {/*    person={person}*/}
                            {/*    handleChange={event => handleObjectChange({*/}
                            {/*        event: event,*/}
                            {/*        setData: setPerson*/}
                            {/*    })}*/}
                            {/*    handleSubmit={PersonSubmitRequests.submitPerson}*/}
                            {/*    editable={accessProfile.can_update_person}*/}
                            {/*    locale={router.locale}*/}
                            {/*    create={true}*/}
                            {/*    setAccepted={event => {*/}
                            {/*        console.log(event)*/}

                            {/*        handleObjectChange({*/}
                            {/*            event: {name: 'base', value: event.status},*/}
                            {/*            setData: setStatus*/}
                            {/*        })*/}
                            {/*        if (event.status) {*/}
                            {/*            setID(event.id)*/}
                            {/*            setStep(step + 1)*/}
                            {/*            setOpenTab(openTab + 1)*/}
                            {/*        }*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </div>
                        {data.map(person => (
                            <div key={person.id + ' - ' + person.name} style={{width: '100%'}}>
                                <Person person={person} member={props.member} redirect={props.redirect}
                                        locale={props.locale}/>
                            </div>
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
PeopleList.propTypes = {
    end: PropTypes.string,
    nothingFound: PropTypes.string,
    locale: PropTypes.string,
    searchInput: PropTypes.string,
    member: PropTypes.string
}