import PropTypes from 'prop-types'

export default function Move(props) {
    let moving = false
    let nodeRef = document.getElementById(props.node.id + '-node')
    let changed = []
    let changedNodes = []
    if (nodeRef !== null) {
        nodeRef.style.transition = 'box-shadow 250ms ease';
        moving = true
        nodeRef.style.border = props.node.color + ' 2px solid'
        nodeRef.style.cursor = 'move'
        nodeRef.style.boxShadow = '0 0 2px 1px ' + props.node.color;
        nodeRef.style.zIndex = '4'
        document.addEventListener('mousemove', event => {

            if (moving) {
                move(event)
                hoverOnNode(event)
                hoverOnGroup(event)
                handleOverflow(event.clientX, event.clientY)
            }
        })
        document.addEventListener("mouseup", event => {
            if (moving) {
                handleGroup(event)
                handleGroupCreation(event)
                changedNodes.map(id => {
                    const element = document.getElementById(id)
                    if (element !== null) {
                        element.style.opacity = '1'
                    }
                })
                changedNodes = []
                moving = false
                nodeRef.style.zIndex = '5'
                nodeRef.style.border ='transparent 2px solid'
                nodeRef.style.opacity = '1';
                nodeRef.style.boxShadow = '0px 4px 30px rgb(22 33 74 / 5%)'
                nodeRef.style.cursor = 'pointer'
                move(event)

            }
        }, false);
    }


    function handleGroupCreation(event) {
        const asHeader = event.target.closest('.Node_headerCircle__1yS6F')
        const asNode = event.target.closest('.Node_entityContainer__3-Msx')

        if (asHeader !== null || asNode !== null) {
            let nodeID = asHeader !== null ? asHeader.parentNode.id : asNode.id
            nodeID = nodeID.replace('-node', '')
            let nodeParent
            let nodeParentIndex
            let nodeChild
            let nodeChildIndex

            console.log('Node found => ' + (nodeID))
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
            if (nodeParent !== undefined && nodeChild !== undefined && nodeChild.id !== nodeParent.id) {
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
                    console.log((link.parent === nodeID && link.child === props.node.id))
                    console.log((link.child === nodeID && link.parent === props.node.id))
                    if ((link.parent === nodeID && link.child === props.node.id) || (link.child === nodeID && link.parent === props.node.id))
                        linkIndex = i

                })

                let newLinks = [...props.data.links]

                if (linkIndex !== undefined)
                    newLinks = newLinks.splice(linkIndex, 1)

                newNodes.splice(nodeParentIndex, 1)
                newNodes.splice((nodeChildIndex - 1), 1)

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

    function hoverOnNode(event) {
        const asHeader = event.target.closest('.Node_headerCircle__1yS6F')
        const asNode = event.target.closest('.Node_entityContainer__3-Msx')

        if (asHeader !== null || asNode !== null) {
            let nodeFound = asNode !== null ? asNode : asHeader.parentNode
            if (nodeFound.id !== (props.node.id + '-node')) {
                changedNodes = [...changedNodes, ...[nodeFound.id]]
                nodeFound.style.opacity = '.5'
            }

        } else {
            changedNodes.map(id => {
                const element = document.getElementById(id)
                if (element !== null) {
                    element.style.opacity = '1'
                }
            })
            changedNodes = []
        }
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

    function hoverOnGroup(event) {
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
    }

    function move(event) {
        // hoverOnGroup(event)
        let placementX = (event.clientX - props.root.offsetLeft + props.overflowRef.scrollLeft - nodeRef.offsetWidth * 0.5)
        let placementY = (event.clientY - props.root.offsetTop + props.overflowRef.scrollTop - nodeRef.offsetHeight * 0.5)
        nodeRef.style.top = placementY + 'px'
        nodeRef.style.left = placementX + 'px'
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
