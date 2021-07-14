import PropTypes from 'prop-types'

export default function Move(props) {
    let moving = false
    let nodeRef = document.getElementById(props.node.id + '-node')
    let changed = []
    if (nodeRef !== null) {

        nodeRef.style.transition = 'box-shadow 150ms ease';
        moving = true
        nodeRef.style.cursor = 'move'
        if (props.color !== undefined && props.color !== null) {
            nodeRef.style.boxShadow = '0 0 10px 2px ' + props.color;
        } else
            nodeRef.style.boxShadow = '0 0 10px 2px #0095ff';


        document.addEventListener('mousemove', event => {

            if (moving) {

                move(event, false)
                handleOverflow(event.clientX, event.clientY)
            }
        })
        document.addEventListener("mouseup", event => {
            console.log(event.target.className)
            if (moving) {
                handleGroup(event)
                handleGroupCreation(event)
                moving = false
                nodeRef.style.zIndex = '5'
                nodeRef.style.opacity = '1';
                nodeRef.style.boxShadow = 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'
                nodeRef.style.cursor = 'pointer'
                move(event, true)

            }
        }, false);
    }


    function handleGroupCreation(event) {
        const asHeader = event.target.closest('.Node_headerCircle__1yS6F')
        const asNode = event.target.closest('.Node_entityContainer__3-Msx')

        if (asHeader !== null || asNode !== null ) {
            let nodeID = asHeader !== null ? asHeader.parentNode.id : asNode.id
            nodeID = parseInt(nodeID.replace('-node', ''))
            let nodeParent
            let nodeParentIndex
            let nodeChild
            let nodeChildIndex


            props.nodes.map((el, i) => {
                if (el.id === nodeID) {
                    nodeParent = el
                    nodeParentIndex = i
                }

                if (el.id === props.node.id) {
                    nodeChild = el
                    nodeChildIndex = i
                }
            })
            if(nodeParent !== undefined && nodeChild !== undefined && nodeChild.id !== nodeParent.id){
                let newGroup = {
                    nodes: [nodeChild, nodeParent],
                    placement: {
                        x: (event.clientX - props.root.offsetLeft + props.overflowRef.scrollLeft),
                        y: (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop)
                    }
                }
                let newGroups = [...props.groups, ...[newGroup]]
                let newNodes = [...props.nodes]
                let linkIndex

                props.data.links.map((link, i) => {
                    if((link.parent === nodeID && link.child === props.node.id) || (link.child === nodeID && link.parent === props.node.id))
                        linkIndex = i

                })
                let newLinks = [...props.data.links]
                if(linkIndex !== undefined)
                    newLinks.splice(linkIndex, 1)

                newNodes.splice(nodeParentIndex, 1)
                newNodes.splice(nodeChildIndex, 1)

                props.setState(({
                    ...props.data,
                    nodes: newNodes,
                    groups: newGroups,
                    links: newLinks
                }))
            }
        }

        changed.map(id => {
            const element = document.getElementById('group-' + id)
            let i
            for (i = 0; i < element.childNodes.length; i++) {
                if (i < (element.childNodes.length - 1))
                    element.childNodes[i].style.opacity = '1'

                else {
                    element.childNodes[i].style.border = '#e0e0e0 2px solid'
                    element.childNodes[i].style.color = '#777777'
                    element.childNodes[i].style.background = 'white'
                }
            }
        })
    }

    function handleGroup(event) {
        const closest = event.target.closest('.Frame_group__3mVSW')
        if (closest !== null) {
            let index = closest.id
            index = index.replace('group-', '')
            let group = props.groups[parseInt(index)]

            if (group !== undefined) {
                group = {...group}
                const newNodes = [...props.nodes]
                newNodes.splice(props.nodes.indexOf(props.node), 1)
                group.nodes = [...group.nodes, ...[props.node]]
                const newGroups = [...props.groups]
                newGroups[parseInt(closest.id.charAt(6))] = group

                props.setState(({
                    ...props.data,
                    nodes: newNodes,
                    groups: newGroups
                }))

            }
        }

        changed.map(id => {
            const element = document.getElementById('group-' + id)
            let i
            for (i = 0; i < element.childNodes.length; i++) {
                if (i < (element.childNodes.length - 1))
                    element.childNodes[i].style.opacity = '1'

                else {
                    element.childNodes[i].style.border = '#e0e0e0 2px solid'
                    element.childNodes[i].style.color = '#777777'
                    element.childNodes[i].style.background = 'white'
                }
            }
        })
    }

    function move(event, save) {
        const closest = event.target.closest('.Frame_group__3mVSW')
        if (closest !== null) {
            if (changed.indexOf(closest.id.charAt(6)) === -1) {
                changed = [...changed, ...[closest.id.charAt(6)]]
                let i
                for (i = 0; i < closest.childNodes.length; i++) {
                    if (i < (closest.childNodes.length - 1))
                        closest.childNodes[i].style.opacity = '.5'
                    else {
                        closest.childNodes[i].style.border = '#0095ff 2px solid'
                        closest.childNodes[i].style.color = '#0095ff'
                        closest.childNodes[i].style.background = 'white'
                    }
                }
            }

        } else {
            changed.map(id => {
                const element = document.getElementById('group-' + id)
                let i
                for (i = 0; i < element.childNodes.length; i++) {
                    if (i < (element.childNodes.length - 1))
                        element.childNodes[i].style.opacity = '1'

                    else {
                        element.childNodes[i].style.border = '#e0e0e0 2px solid'
                        element.childNodes[i].style.color = '#777777'
                        element.childNodes[i].style.background = 'white'
                    }
                }
            })
            changed = []
        }
        let placementX = (event.clientX - props.root.offsetLeft + props.overflowRef.scrollLeft - nodeRef.offsetWidth * 0.5)
        let placementY = (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop - nodeRef.offsetHeight * 0.5)

        nodeRef.style.top = placementY + 'px'

        nodeRef.style.left = placementX + 'px'
        //
        // if (save) {
        //     props.handleChange({
        //         x: placementX,
        //         y: placementY,
        //         id: props.node.id
        //     })
        // }
    }

    function handleOverflow(x, y) {
        switch (true) {
            case (y < props.root.offsetTop): {
                const newHeight = props.root.offsetHeight + nodeRef.offsetHeight
                const newOffset = ((props.root.offsetHeight + nodeRef.offsetHeight) / props.root.offsetHeight - 1) * 100
                props.root.style.height = newHeight + 'px'
                let children = props.canvasRef.childNodes
                let i

                let adjustedHeight = newHeight
                for (i = 0; i < children.length; i++) {
                    if (children[i].id !== nodeRef.id) {
                        if ((children[i].offsetTop + newOffset) > newHeight) {
                            adjustedHeight = ((children[i].offsetTop + newOffset) - newHeight) + newHeight
                            const adjustedOffset = ((children[i].offsetTop + newOffset) - newHeight)
                            children[i].style.top = (children[i].offsetTop - children[i].offsetHeight * 2 - adjustedOffset) + 'px'
                        } else
                            children[i].style.top = (children[i].offsetTop + newOffset) + 'px'
                    }
                }

                break
            }

            case((y + 1) >= (props.root.offsetHeight + props.root.offsetTop)): {
                console.log('OVERFLOWING BOTTOM')
                break
            }
            case (x < props.root.offsetLeft): {
                console.log('OVERFLOWING X LEFT')
                const newOffset = ((props.root.offsetWidth + nodeRef.offsetWidth) / props.root.offsetWidth - 1) * 100
                props.root.style.width = (props.root.offsetWidth + nodeRef.offsetWidth) + 'px'
                let children = props.canvasRef.childNodes
                let i
                for (i = 0; i < children.length; i++) {
                    children[i].style.left = (children[i].offsetLeft + newOffset) + 'px'
                }
                break
            }

            case((x + 1) >= (props.root.offsetWidth + props.root.offsetLeft)): {
                console.log('OVERFLOWING X RIGHT')
                break
            }
            default:
                break
        }

    }

}

Move.propTypes = {
    node: PropTypes.object,
    data: PropTypes.object,
    nodes: PropTypes.array,
    groups: PropTypes.array,

    overflowRef: PropTypes.object,
    root: PropTypes.object,
    canvasRef: PropTypes.object,

    setState: PropTypes.func
}
