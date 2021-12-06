import React, {useContext, useEffect, useState} from 'react'
import Head from "next/head";
import PropTypes from 'prop-types'
import Accordion from "../../../fabric/navigation/accordion/Accordion";
import Fabric from "../../../fabric/misc/theme/Fabric";
import AccordionSummary from "../../../fabric/navigation/accordion/AccordionSummary";
import Masonry from "../../../fabric/visualization/masonry/Masonry";
import MasonryCard from "../../../fabric/visualization/masonry/MasonryCard";
import {ThemeContext} from "mfc-core";
import fetchEntry from "../utils/fetchData";
import DataRow from "../../../fabric/visualization/row/DataRow";
// import WikiList from "../components/lists/WikiList";

export default function Index(props) {
    const [wikis, setWikis] = useState([])

    useEffect(() => {
        fetchEntry({
            suffix: 'wiki'
        })

    }, [])

    const th = useContext(ThemeContext)
    return (
        <>
            <Head>
                <title>Início</title>
                <link rel='icon' href={'/light-small.png'} type='image/x-icon'/>
            </Head>
            {/*<WikiList/>*/}

            <Fabric theme={th.dark ? 'dark' : 'light'}
                    styles={{padding: '16px 10%', width: '100%', maxHeight: '100%', overflowY: 'auto'}}>
                <DataRow object={{
                    teste: 'Teste',
                    cafe: 1,
                    data: '02/12/2001'
                }} keys={[
                    {label: 'TESTE', key: 'teste', type: 'string'},
                    {label: 'Cafe', key: 'cafe', type: 'number'},
                    {label: 'Data', key: 'data', type: 'date'}
                ]} selfContained={true}/>
                <DataRow object={{
                    teste: 'Teste',
                    cafe: 1,
                    data: '02/12/2001'
                }}
                         keys={[
                             {label: 'TESTE', key: 'teste', type: 'string'},
                             {label: 'Cafe', key: 'cafe', type: 'number'},
                             {label: 'Data', key: 'data', type: 'date'}
                         ]} selfContained={false}/>
                <Accordion>
                    <AccordionSummary>
                        TESTE
                    </AccordionSummary>

                    <Masonry>
                        <MasonryCard
                            onClick={() => null}
                            title={'Teste'}
                            category={'Cafe'}
                            description={'Lorem ipsum dolor sit amet, consectetur'}
                            image={'https://picsum.photos/' +  Math.ceil(Math.random()) + '/' +  Math.ceil(Math.random())}
                        />
                        <MasonryCard
                            onClick={() => null}
                            title={'Teste'}
                            category={'Cafe'}
                            description={'Lorem ipsum dolor sit amet, consectetur'}
                            image={'https://picsum.photos/' +  Math.ceil(Math.random())+ '/' +  Math.ceil(Math.random())}
                        />
                        <MasonryCard
                            onClick={() => null}
                            title={'Teste'}
                            category={'Cafe'}
                            description={'Lorem ipsum dolor sit amet, consectetur'}
                            image={'https://picsum.photos/' +  Math.ceil(Math.random()) + '/' +  Math.ceil(Math.random())}
                        />
                        <MasonryCard
                            onClick={() => null}
                            title={'Teste'}
                            category={'Cafe'}
                            description={'Lorem ipsum dolor sit amet, consectetur'}
                            image={'https://picsum.photos/' +  Math.ceil(Math.random()) + '/' +  Math.ceil(Math.random())}
                        />
                    </Masonry>
                </Accordion>
            </Fabric>
        </>
    )
}
Index.propTypes = {
    redirect: PropTypes.func
}