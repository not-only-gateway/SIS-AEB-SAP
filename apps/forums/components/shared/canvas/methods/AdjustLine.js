import PropTypes from 'prop-types'

export default function adjustLine(props) {
    // let parentOffsetLeft = props.to.offsetLeft
    // let childOffsetLeft = props.from.offsetLeft
    // let childOffsetTop = props.from.offsetTop
    // let parentOffsetTop = props.to.offsetTop
    //
    // let parentRadius = props.to.offsetHeight / 2
    // let childRadius = props.from.offsetHeight / 2
    //
    //
    // if (parentOffsetLeft < childOffsetLeft) {
    //     console.log('a1')
    //     props.line.firstElementChild.style.left = (props.parentConnections.right.getBoundingClientRect().left) + 'px'
    //     props.line.firstElementChild.style.borderRadius = '0 8px 0 0'
    //     props.line.firstElementChild.style.borderRight = 'red 2px solid'
    //     props.line.firstElementChild.style.borderLeft = 'none'
    //     props.line.firstElementChild.style.borderTop = 'red 2px solid'
    //     props.line.firstElementChild.style.borderBottom = 'none'
    //     props.line.firstElementChild.style.width = (props.childConnections.left.getBoundingClientRect().left - props.parentConnections.right.getBoundingClientRect().left) / 2 + 'px'
    //
    // } else if (parentOffsetLeft > childOffsetLeft) {
    //     console.log('a2')
    //     props.line.firstElementChild.style.left = (props.parentConnections.left.getBoundingClientRect().left - parentRadius*2) + 'px'
    //     props.line.firstElementChild.style.borderRadius = '8px 0  0 0'
    //     props.line.firstElementChild.style.borderLeft = 'red 2px solid'
    //     props.line.firstElementChild.style.borderRight = 'none'
    //     props.line.firstElementChild.style.width = (props.parentConnections.left.getBoundingClientRect().left - (props.childConnections.left.getBoundingClientRect().left- parentRadius*2)) / 2 + 'px'
    //     props.line.firstElementChild.style.borderTop = 'red 2px solid'
    //
    //     props.line.firstElementChild.style.borderBottom = 'none'
    // } else if (parentOffsetLeft === childOffsetLeft) {
    //     console.log('a3')
    //     props.line.firstElementChild.style.borderRadius = '0'
    //     props.line.firstElementChild.style.border = 'none'
    //     props.line.firstElementChild.style.background = 'red'
    //     props.line.firstElementChild.style.width = '2px'
    // }
    //
    // if (childOffsetTop < parentOffsetTop) {
    //     console.log(1)
    //     props.line.firstElementChild.style.display = 'none'
    //     props.line.lastChild.style.display = 'none'
    // } else if (childOffsetTop > parentOffsetTop && (parentOffsetTop - childOffsetTop) > childRadius) {
    //     console.log(2)
    //     props.line.firstElementChild.style.top = (props.parentConnections.bottom.getBoundingClientRect().top - props.rootOffset - parentRadius) + 'px'
    //     props.line.firstElementChild.style.height = ((childOffsetTop - childRadius) - (parentOffsetTop)) + 'px'
    // } else if (childOffsetTop > parentOffsetTop && (parentOffsetTop - childOffsetTop) < childRadius) {
    //     console.log(3)
    //     props.line.firstElementChild.style.top = (props.parentConnections.left.getBoundingClientRect().top - props.rootOffset - parentRadius) + 'px'
    //     props.line.firstElementChild.style.height = ((props.childConnections.left.getBoundingClientRect().top - props.rootOffset - childRadius) - (props.parentConnections.left.getBoundingClientRect().top - props.rootOffset - parentRadius)) + 'px'
    // } else if (childOffsetTop === parentOffsetTop) {
    //     console.log(4)
    //     props.line.firstElementChild.style.top = (props.parentConnections.left.getBoundingClientRect().top - 1 - props.rootOffset - parentRadius) + 'px'
    //     props.line.firstElementChild.style.height = '2px'
    // }

    var fT = props.from.offsetTop + props.from.offsetHeight / 2;
    var objectiveTop = props.to.offsetTop + props.to.offsetHeight / 2;
    var fL = props.from.offsetLeft + props.from.offsetWidth / 2;
    var tL = props.to.offsetLeft + props.to.offsetWidth / 2;

    var CA = Math.abs(objectiveTop - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);

    if (objectiveTop > fT) {
        var top = (objectiveTop - fT) / 2 + fT;
    } else {
        var top = (fT - objectiveTop) / 2 + objectiveTop;
    }
    if (tL > fL) {
        var left = (tL - fL) / 2 + fL;
    } else {
        var left = (fL - tL) / 2 + tL;
    }

    if ((fT < objectiveTop && fL < tL) || (objectiveTop < fT && tL < fL) || (fT > objectiveTop && fL > tL) || (objectiveTop > fT && tL > fL)) {
        ANG *= -1;
    }
    top -= H / 2;

    let radius = props.to.offsetWidth / 2
    props.lineObjective.style.top = (radius - 10) + 'px'


    props.line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style.top = top + 'px';
    props.line.style.left = left + 'px';
    props.line.style.height = (H) + 'px';

}

adjustLine.propTypes = {
    // rootOffset: PropTypes.number,
    // childConnections: PropTypes.shape({
    //     top: PropTypes.object,
    //     left: PropTypes.object,
    //     right: PropTypes.object,
    // }),
    // parentConnections: PropTypes.shape({
    //     left: PropTypes.object,
    //     right: PropTypes.object,
    //     bottom: PropTypes.object,
    // }),
    from: PropTypes.object,
    to: PropTypes.object,
    line: PropTypes.object,
    lineObjective: PropTypes.object
}