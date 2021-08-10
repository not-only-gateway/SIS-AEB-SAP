import {AddRounded, FileCopyRounded, ZoomInRounded, ZoomOutRounded} from "@material-ui/icons";
import {v4 as uuid4} from "uuid";

export default [
    {
        label: 'Zoom out',
        icon: <ZoomOutRounded/>,
        onClick: (props) => props.setScale(props.scale - .25),
        getDisabled: (props) => props.scale === .5
    },
    {
        label: 'Zoom in',
        icon: <ZoomInRounded/>,
        onClick: (props) => props.setScale(props.scale + .25),
        getDisabled: (props) => props.scale === 2
    },
    {
        label: 'Adicionar novo módulo',
        icon: <AddRounded/>,
        onClick: (props) => null

    },
    {
        label: 'Colar',
        icon: <FileCopyRounded/>,
        onClick: (props, event) => {
            let newNode = {...props.copiedNode}

            newNode.id = uuid4().toString()
            newNode.placement = {
                x: event.clientX - props.root.offsetLeft + props.root.scrollLeft - newNode.dimensions.width/2,
                y: event.clientY - props.root.offsetTop + props.root.scrollTop - newNode.dimensions.height/2
            }
            let newNodes = [...props.data.nodes]

            newNodes.push(newNode)

            props.setData({
                ...props.data,
                nodes: newNodes
            })
            props.setCopiedNode(null)
        },
        getDisabled: (props) => props.copiedNode === null
    },
]