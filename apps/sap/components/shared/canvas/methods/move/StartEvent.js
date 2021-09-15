import PropTypes from "prop-types";

export default function StartEvent(props){
    let i
    // props.root
    // let x= props.element.getBoundingClientRect().left + props.element.offsetLeft
    // let y = props.element.getBoundingClientRect().top - props.element.offsetTop
    //
    // props.element.style.position = 'fixed'
    // props.element.style.top = y
    // props.element.style.left = x

    props.element.animate([
        {

            boxShadow: '0 0 0 0 rgba(0, 149, 255, .4)',

        },
        {
            boxShadow: '0 0 0 10px rgba(0, 149, 255, 0)',
        },
        {

            boxShadow: '0 0 0 0 rgba(0, 149, 255, 0)',
        }
    ], {duration: 1500, iterations: 1})

    props.element.style.cursor = 'move'
    props.element.style.transform = 'scale(1.2)'
    props.setLimitTopOffset(undefined)
    props.setLimitBottomOffset(undefined)
    props.setLimitTop(undefined)
    props.setLimitBottom(undefined)


    for (i = 0; i < props.parents.length; i++) {
        const parent = document.getElementById(props.parents[i] + '-node')
        if (parent !== null && (props.limitTopOffset === undefined || parent.offsetTop > props.limitTopOffset)) {
            props.setLimitTopOffset(parent.offsetTop)
        }

        if (parent !== null) {
            const parentOffset = (parent.getBoundingClientRect().top + parent.offsetHeight / 2)
            if (props.limitTop === undefined || parentOffset > props.limitTop)
                props.setLimitTop(parentOffset)
        }

    }

    for (i = 0; i < props.children.length; i++) {
        const child = document.getElementById(props.children[i] + '-node')


        if (child !== null && (child.offsetTop < props.limitBottomOffset || props.limitBottomOffset === undefined))
            props.setLimitBottomOffset(child.offsetTop)

        if (child !== null) {
            const childOffset = (child.getBoundingClientRect().top + child.offsetHeight)
            if (childOffset < props.limitBottom || props.limitBottom === undefined)
                props.setLimitBottom(childOffset)

        }

    }
    if (props.limitBottom !== undefined) {
        props.bottomElement.style.top = (props.limitBottom) + 'px'
        props.bottomElement.style.borderTop = '#ff5555 2px dashed'
    }
    if (props.limitTop !== undefined) {
        props.topElement.style.top = (props.limitTop) + 'px'
        props.topElement.style.borderTop = '#ff5555 2px dashed'

    }

    props.setHolding()
}
StartEvent.propTypes= {
    setLimitBottom: PropTypes.func,
    setLimitBottomOffset: PropTypes.func,
    setLimitTop: PropTypes.func,
    setLimitTopOffset: PropTypes.func,


    topElement: PropTypes.object,
    bottomElement: PropTypes.object,

    element: PropTypes.object,
    refreshLinks: PropTypes.func,
    limitBottomOffset: PropTypes.number,
    limitTopOffset: PropTypes.number,
    limitBottom: PropTypes.number,
    limitTop: PropTypes.number,
    setHolding: PropTypes.func,

    parents: PropTypes.arrayOf(
        PropTypes.number
    ),
    children: PropTypes.arrayOf(
        PropTypes.number
    ),
}