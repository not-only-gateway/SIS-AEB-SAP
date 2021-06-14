// import InfiniteScroll from "react-infinite-scroll-component";
//
// export default function Activities(props){
//     return(
//         <>
//             {data.length > 0 ?
//                 <InfiniteScroll
//                     dataLength={data.length}
//                     next={() => fetch(0)}
//                     hasMore={lastFetchedSize === 20 && data[data.length - 1].access_log.id > 1}
//                     inverse={false}
//                     scrollableTarget="scrollableDiv"
//                     loader={
//                         <Skeleton
//                             variant={'rect'}
//                             width={'100%'}
//                             style={{borderRadius: '8px'}}
//                             height={'7vh'}
//                         />
//                     }
//                     endMessage={
//                         <div
//                             style={{
//                                 marginBottom: '15px'
//                             }}
//                         >
//                             <p className={mainStyles.secondaryParagraph}
//                                style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.end}</p>
//                         </div>
//                     }
//                 >
//                     <div style={{
//                         display: 'grid',
//                         marginTop: '8px',
//                         gap: '8px',
//                     }}>
//                         {(data).map(content =>
//                             <div key={content.activity.id}>
//                                 <ActivityTemplate data={content} pagesFetched={pagesFetched}
//                                                   lang={lang}/>
//                             </div>
//                         )}
//                     </div>
//                 </InfiniteScroll>
//                 null
//                 :
//
//                 <div className={mainStyles.displayInlineCenter}
//                 style={{
//                 marginBottom: '15px',
//                 width: '50vw'
//             }}>
//                 <p className={mainStyles.secondaryParagraph}
//                 style={{...{textAlign: 'center'}, ...getTertiaryColor({dark: dark})}}>{lang.nothingFound}</p>
//                 </div>}
//         </>
//     )
// }
