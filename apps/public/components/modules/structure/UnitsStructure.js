import Canvas from "../../layout/Canvas";
import React, {useEffect, useState} from "react";
import fetchTopUnits from "../../../utils/fetch/FetchTopUnits";

export default function UnitsStructure() {
    const [topUnits, setTopUnits] = useState([])
    useEffect(() => {
        fetchTopUnits().then(res => {
            setTopUnits(res)
        })
    }, [])
    return (
        <Canvas type={'unit'} subjects={topUnits}/>
    )
}
