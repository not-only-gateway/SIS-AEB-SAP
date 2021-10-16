import PropTypes from "prop-types";
import styles from './styles/Carousel.module.css'
import React, {useEffect, useState} from 'react'
import Card from "./components/Card";
import CardGroup from "./components/CardGroup";
import Panel from "./components/Panel";
import Switcher from "../../misc/switcher/Switcher";

export default function Carousel(props) {
    const [currentOnRender, setCurrentOnRender] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            if (currentOnRender < (props.data.length - 1))
                setCurrentOnRender(currentOnRender + 1)
            else
                setCurrentOnRender(0)
        }, 10000)
        console.log(currentOnRender)
        return () => {
            clearInterval(interval)
        }
    }, [currentOnRender])
    return (
        <div className={styles.wrapper}>
            <Switcher openChild={currentOnRender}>
                {props.data.map((panel, i) => (
                    <React.Fragment key={i + '-panel'}>
                        <Panel data={panel}/>
                    </React.Fragment>
                ))}
            </Switcher>
            <CardGroup>
                {props.data.map((card, index) => (
                    <React.Fragment key={'card-' + index}>
                        <Card data={card} currentOnRender={currentOnRender === index} onClick={() => setCurrentOnRender(index)}/>
                    </React.Fragment>
                ))}
            </CardGroup>
        </div>
    )
}

Carousel.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        image: PropTypes.string,
        title: PropTypes.string,
        details: PropTypes.string,
        onClick: PropTypes.func
    }))
}