import PropTypes from 'prop-types'

export default function MoveGroup(props) {
    let moving = false
    let groupRef = document.getElementById(props.id)
    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }
    if (groupRef !== null) {
        moving = true

        let i
        for (i = 0; i< groupRef.childNodes.length; i++){
            groupRef.childNodes[i].style.opacity = '.5'
            if(i === (groupRef.childNodes.length-1))
                groupRef.childNodes[i].style.display = 'none'
        }

        document.addEventListener('mousemove', event => {
            if (moving)
                move(event, false)
        })
        document.addEventListener("mouseup", event => {
            if (moving) {

                let i
                for (i = 0; i< groupRef.childNodes.length; i++){
                    groupRef.childNodes[i].style.opacity = '1'
                    if(i === (groupRef.childNodes.length-1))
                        groupRef.childNodes[i].style.display = 'flex'
                }
                moving = false
                groupRef.style.opacity = '1';
                move(event, true)

            }
        }, false);
    }

    function move(event, save) {
        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = groupRef.offsetLeft - newPlacement.x;
        let placementY = groupRef.offsetTop - newPlacement.y;

        groupRef.style.top = placementY + 'px'
        groupRef.style.left = placementX + 'px'

        if(save){
            if (placementX < 0)
                groupRef.style.left = '20px'

            if (placementY < 0)
                groupRef.style.top = '20px'
        }

    }

}

MoveGroup.propTypes = {
    id: PropTypes.any,

    event: PropTypes.object,
    root: PropTypes.object,
    canvasRef: PropTypes.object,

    setState: PropTypes.func
}
