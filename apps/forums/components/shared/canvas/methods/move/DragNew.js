import PropTypes from 'prop-types'
import ReactDOM from "react-dom";
import Placement from "../../modules/node/misc/Placement";
import {v4 as uuid4} from "uuid";

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
            case props.type.includes('rect') ||  props.type.includes('parallelogram') ||  props.type.includes('trapezoid'): {
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
    const element = props.element.cloneNode(true)
    try {
        props.contextMenuRef.removeChild(props.contextMenuRef.firstChild)
    } catch (error) {
    }

    props.contextMenuRef.appendChild(element)
    props.contextMenuRef.style.zIndex = '999'
    console.log(props.contextMenuRef.firstChild.firstChild)
    props.contextMenuRef.style.top = (props.event.clientY - (props.root.offsetTop + dimensions.height/2 + 20)) + 'px'
    props.contextMenuRef.style.left = (props.event.clientX - (props.root.offsetLeft + dimensions.width/2)) + 'px'
    props.contextMenuRef.firstChild.firstChild.setAttribute('width', dimensions.width)
    props.contextMenuRef.firstChild.firstChild.setAttribute('height', dimensions.height)

    let lastPlacement = {
        x: props.event.clientX,
        y: props.event.clientY
    }

    document.addEventListener('mousemove', event => {
        if (moving)
            move(event, false)
    })
    document.addEventListener("mouseup", event => {
        if (moving) {
            const elements =  document.elementsFromPoint(event.clientX, event.clientY)
            try {
                props.contextMenuRef.removeChild(props.contextMenuRef.firstChild)
            } catch (error) {
            }

            if (elements.length >= 4 &&  typeof elements[4].className === 'object' && elements[4].className.animVal === 'Frame_canvasBackground__3fnpp' && props.root !== undefined) {

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
                props.contextMenuRef.style.zIndex = 'unset'
            }
            else
                props.contextMenuRef.style.zIndex = 'unset'

            document.removeEventListener('mousemove', () => null)
            moving = false
        }
    }, false);

    function move(event) {
        let newPlacement = {
            x: lastPlacement.x - event.clientX,
            y: lastPlacement.y - event.clientY
        }

        lastPlacement = {
            x: event.clientX,
            y: event.clientY
        }

        let placementX = props.contextMenuRef.offsetLeft - newPlacement.x / props.scale
        let placementY = props.contextMenuRef.offsetTop - newPlacement.y / props.scale

        props.contextMenuRef.style.top = placementY + 'px'
        props.contextMenuRef.style.left = placementX + 'px'

    }


    return () => {
        document.removeEventListener('mouseup', () => null)
        document.removeEventListener('mousemove', () => null)
    }
}

DragNew.propTypes = {
    element: PropTypes.object,
    scale: PropTypes.number,
    root: PropTypes.object,
    event: PropTypes.object,
    contextMenuRef: PropTypes.object,
    type: PropTypes.string,
    setData: PropTypes.func,
    data: PropTypes.object
}
