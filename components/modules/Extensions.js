import InfiniteScroll from "react-infinite-scroll-component";
import {Skeleton} from "@material-ui/lab";
import mainStyles from "../../styles/shared/Main.module.css";
import {getTertiaryColor} from "../../styles/shared/MainStyles";
import Extension from "../templates/list/Extension";
import React, {useState} from "react";
import PropTypes from 'prop-types'

export default function Extensions(props) {
    if (props.data.length > 0)
        return (
            <div style={{width: '100%'}}>
                <InfiniteScroll
                    dataLength={props.data.length}
                    next={() => props.fetchData(0)}
                    hasMore={props.lastFetchedSize === 15}
                    inverse={false}
                    scrollableTarget="scrollableDiv"
                    loader={<Skeleton variant={'rect'} width={'100%'} style={{borderRadius: '8px'}}
                                      height={'7vh'}/>}
                    endMessage={
                        <div style={{
                            width: '100%'
                        }}>
                            <p className={mainStyles.secondaryParagraph}
                               style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: false})}}>{props.end}</p>
                        </div>
                    }
                >
                    <div style={{display: 'grid', gap: '8px'}}>
                        {props.data.map((member, index) =>
                            <Extension
                                data={member}
                                index={index}
                                redirect={id => {
                                    props.redirect(id)
                                }}
                                inactiveLocale={props.inactive}/>
                        )}
                    </div>
                </InfiniteScroll>
            </div>
        )
    else
        return (
            <div className={mainStyles.displayInlineCenter} style={{
                ...{marginBottom: '15px', width: '100%'}
            }}>
                <p className={mainStyles.secondaryParagraph}
                   style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: false})}}>{props.nothingFound}</p>
            </div>
        )
}

Extensions.propTypes = {
    data: PropTypes.array,
    nothingFound: PropTypes.string,
    inactive: PropTypes.string,
    redirect: PropTypes.func,
    fetchData: PropTypes.func,
    lastFetchedSize: PropTypes.number,
    end: PropTypes.string
}
