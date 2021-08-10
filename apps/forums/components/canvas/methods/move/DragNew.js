import PropTypes from 'prop-types'
import {v4 as uuid4} from "uuid";
import ReactDOM from 'react-dom'
export default function DragNew(props) {
    let moving = true

    const getDimensions = () => {
        let res = {}
        switch (true) {
            case props.type.includes('circle'): {
                res = {
                    width: 80,
                    height: 80
                }
                break
            }
            case props.type.includes('ellipse') : {
                res = {
                    width: 120,
                    height: 80
                }
                break
            }
            case props.type.includes('rect') || props.type.includes('parallelogram') || props.type.includes('trapezoid'): {
                res = {
                    width: 150,
                    height: 80
                }
                break
            }
            case props.type.includes('square') || props.type.includes('triangle'): {
                res = {
                    width: 80,
                    height: 80
                }
                break
            }
            default:
                break
        }
        return res
    }
    const dimensions = getDimensions()
    const element = props.element.firstChild.cloneNode(true)

    const newWrapper = document.createElement('div')
    document.body.appendChild(newWrapper)

    newWrapper.appendChild(element)
    newWrapper.style.position = 'fixed'
    newWrapper.style.zIndex = '999'
    newWrapper.style.top = (props.event.clientY - dimensions.height / 2) + 'px'
    newWrapper.style.left = (props.event.clientX - dimensions.width / 2) + 'px'
    newWrapper.firstChild.setAttribute('width', dimensions.width)
    newWrapper.firstChild.setAttribute('height', dimensions.height)
    newWrapper.firstChild.setAttribute('stroke-dasharray', '5,5')
    newWrapper.firstChild.setAttribute('fill', 'transparent')

    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }

    document.addEventListener('mousemove', function movingNew(event) {
        if (moving)
            move(event, false)
        else
            event.currentTarget.removeEventListener('mousemove', movingNew);
    })
    document.addEventListener("mouseup", event => {

        if (moving) {
            const elements = document.elementsFromPoint(event.clientX, event.clientY)
            document.body.removeChild(newWrapper)
            if (elements.length >= 2 && typeof elements[3].className === 'object' && elements[3].className.animVal.includes('Canvas_canvasBackground') && props.root !== undefined) {

                event.target.style.background = "";
                const rootBounding = {
                    x: props.root.getBoundingClientRect().left,
                    y: props.root.getBoundingClientRect().top
                }

                props.setData(({
                    ...props.data,
                    nodes: [...props.data.nodes, ...[{
                        id: uuid4().toString(),
                        title: '',
                        description: null,
                        placement: {
                            x: (event.clientX - rootBounding.x + props.root.scrollLeft - 40),
                            y: (event.clientY - rootBounding.y + props.root.scrollTop - 40)
                        },
                        shape: props.type,
                        creationDate: (new Date()).getTime(),
                        links: [],
                        dimensions: dimensions,
                        styling: {
                            border: 0,
                            color: '#0095ff',
                            borderWidth: 2,
                            skew: props.type === 'parallelogram' ? -25 : 0
                        }
                    }]]
                }))
            }

            moving = false
        }

    }, {once: true})

    function move(event) {
        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = newWrapper.offsetLeft - newPlacement.x / props.scale
        let placementY = newWrapper.offsetTop - newPlacement.y / props.scale

        newWrapper.style.top = placementY + 'px'
        newWrapper.style.left = placementX + 'px'

    }


}

DragNew.propTypes = {
    element: PropTypes.object,
    scale: PropTypes.number,
    root: PropTypes.object,
    event: PropTypes.object,
    type: PropTypes.string,
    setData: PropTypes.func,
    data: PropTypes.object
}
