import React, {useEffect, useRef, useState} from 'react'
import Head from "next/head";

import PropTypes from 'prop-types'
import Carousel from "../../../core/navigation/carousel/Carousel";
import Feed from "../../../core/visualization/feed/Feed";

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
            details: 'cafe'
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
        <div style={{padding: '0 32px', overflowY: 'auto', height: 'calc(100% - ' + offset + 'px)', maxWidth: '100%'}} ref={ref}>
            <Head>
                <title>Ramais</title>
                <link rel='icon' href={'/LOGO.png'} type='image/x-icon'/>
            </Head>
            <Carousel data={data}/>

           <div style={{display: 'flex', width: '100%'}}>
               <Feed data={data} title={'Noticias recentes'} width={'85%'} onCardClick={(entry) => null} keys={{
                   image: 'image',
                   title: 'title',
                   description: 'details'
               }}/>
               <Feed data={data} title={'Noticias recentes'} width={'15%'} onCardClick={(entry) => null} keys={{
                   image: 'image',
                   title: 'title',
                   description: 'details'
               }}/>
           </div>
        </div>
    )
}
Index.propTypes = {
    redirect: PropTypes.func
}