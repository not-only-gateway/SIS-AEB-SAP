import PropTypes from 'prop-types'

export default function adjustLine(props) {
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
    from: PropTypes.object,
    to: PropTypes.object,
    line: PropTypes.object,
    lineObjective: PropTypes.object
}
