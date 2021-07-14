import PropTypes from 'prop-types'
import React from "react";
import Cookies from "universal-cookie/lib";
import Canvas from "../shared/canvas/Canvas";
import DataModel from "../shared/canvas/DataModel";


export default function Pops(props) {

    return (
        <div style={{display: 'grid',}}>
            <Canvas
                options={{
                    move: (new Cookies()).get('jwt') !== undefined,
                    edit: (new Cookies()).get('jwt') !== undefined,
                    show: true
                }}
                onSave={data => {
                    null
                }}
                data={DataModel}
            />
        </div>
    )
}
Pops.propTypes = {
    subjectID: PropTypes.any,
    data: PropTypes.object,
    handleChange: PropTypes.func
}