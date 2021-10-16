import React, {useEffect, useRef, useState} from 'react'
import Head from "next/head";

import PropTypes from 'prop-types'
import styles from '../styles/Shared.module.css'
import PersonList from "../components/PersonList";
import Carousel from "../../../core/navigation/carousel/Carousel";
import Feed from "../../../core/feed/Feed";
import FeedCard from "../../../core/feed/FeedCard";

export default function Index(props) {
    const [offset, setOffset] = useState(0)
    const ref = useRef()
    useEffect(() => {
        setOffset(ref.current.offsetTop)
    }, [])
    const data = [
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech'
        },
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech Gaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - TechGaming - Tech'
        },
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech'
        },
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech'
        },
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech'
        },
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech'
        },
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech'
        },
        {
            image: 'https://i.redd.it/ar20z4aiejc51.jpg',
            onClick: () => console.log('CAFE'),
            title: 'Halo infinite',
            details: 'Gaming - Tech'
        },
    ]
    return (
        <div style={{padding: '0 32px', overflowY: 'auto', height: 'calc(100% - ' + offset + 'px)'}} ref={ref}>
            <Head>
                <title>Ramais</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Carousel data={data}/>

            <Feed data={data} title={'Noticias recentes'} onCardClick={(entry) => null} keys={{
                image: 'image',
                title: 'title',
                description: 'details'
            }}/>
        </div>
    )
}
Index.propTypes = {
    redirect: PropTypes.func
}