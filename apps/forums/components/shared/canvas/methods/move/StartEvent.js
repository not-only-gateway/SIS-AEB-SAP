import PropTypes from "prop-types";

export default function StartEvent(props) {
    let i
    if (props.color !== undefined && props.color !== null)
        props.element.animate([
            {
                boxShadow: '0 0 0 0 ' + props.color,
            },
            {
                boxShadow: '0 0 0 7px ' + props.color,
            },
            {
                boxShadow: '0 0 0 0 ' + props.color,
            }
        ], {duration: 500, iterations: 1})
    else
        props.element.animate([
            {

                boxShadow: '0 0 0 0 #0095ff',

            },
            {
                boxShadow: '0 0 0 7px #0095ff',
            },
            {

                boxShadow: '0 0 0 0 #0095ff',
            }
        ], {duration: 500, iterations: 1})
    props.element.style.cursor = 'move'
    props.element.style.transform = 'scale(1.2)'

    if (props.color !== undefined && props.color !== null) {
        props.element.style.boxShadow = '0 0 10px .1px ' + props.color;
    } else
        props.element.style.boxShadow = '0 0 10px .1px #0095ff';

    props.setLimitTopOffset(undefined)
    props.setLimitBottomOffset(undefined)

    for (i = 0; i < props.parents.length; i++) {
        const parent = document.getElementById(props.getLinkParent(props.parents[i]) + '-node')
        if (parent !== null)
            props.setLimitTopOffset(parent.offsetTop)
    }
    for (i = 0; i < props.children.length; i++) {
        const child = document.getElementById(props.getLinkChild(props.children[i]) + '-node')
        if (child !== null)
            props.setLimitBottomOffset(child.offsetTop)
    }

    props.setHolding()
}
StartEvent.propTypes = {

    setLimitBottomOffset: PropTypes.func,

    setLimitTopOffset: PropTypes.func,

    color: PropTypes.string,

    element: PropTypes.object,
    refreshLinks: PropTypes.func,
    limitBottomOffset: PropTypes.number,
    limitTopOffset: PropTypes.number,
    limitBottom: PropTypes.number,
    limitTop: PropTypes.number,
    setHolding: PropTypes.func,

    parents: PropTypes.arrayOf(
        PropTypes.object
    ),


    children: PropTypes.arrayOf(
        PropTypes.object
    ),

    getLinkParent: PropTypes.func,
    getLinkChild: PropTypes.func,
}