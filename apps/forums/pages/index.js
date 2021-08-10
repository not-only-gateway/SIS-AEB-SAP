import React from 'react'
import Canvas from "../components/canvas/Canvas";
import Cookies from "universal-cookie/lib";
import 'typeface-roboto'

export default function index(props) {

    return (


            <Canvas
                options={{
                    move: (new Cookies()).get('jwt') !== undefined,
                    edit: (new Cookies()).get('jwt') !== undefined,
                    show: true
                }}
                onSave={data => {
                    null
                }}
            />
    )
}
