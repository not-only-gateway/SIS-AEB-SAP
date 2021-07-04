import PropTypes from 'prop-types'

export default function adjustLine(props) {

    var fT = props.from.offsetTop + props.from.offsetHeight / 2;
    var tT = props.to.offsetTop + props.to.offsetHeight / 2;
    var fL = props.from.offsetLeft + props.from.offsetWidth / 2;
    var tL = props.to.offsetLeft + props.to.offsetWidth / 2;

    var CA = Math.abs(tT - fT);
    var CO = Math.abs(tL - fL);
    var H = Math.sqrt(CA * CA + CO * CO);
    var ANG = 180 / Math.PI * Math.acos(CA / H);

    if (tT > fT) {
        var top = (tT - fT) / 2 + fT;
    } else {
        var top = (fT - tT) / 2 + tT;
    }
    if (tL > fL) {
        var left = (tL - fL) / 2 + fL;
    } else {
        var left = (fL - tL) / 2 + tL;
    }

    if ((fT < tT && fL < tL) || (tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)) {
        ANG *= -1;
    }
    top -= H / 2;

    props.line.style["-webkit-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-moz-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-ms-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-o-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style["-transform"] = 'rotate(' + ANG + 'deg)';
    props.line.style.top = top + 'px';
    props.line.style.left = left + 'px';
    props.line.style.height = H + 'px';

    let sourceWidth = props.from.offsetWidth
    let sourceHeight = props.from.offsetHeight
    let objectiveWidth = props.to.offsetWidth
    let objectiveHeight = props.to.offsetHeight


    props.lineSource.style.bottom = ((sourceHeight + sourceWidth)/3) + 'px'
    // else
    //     props.lineSource.style.bottom =(sourceWidth / 2 ) + 'px'

    // if(props.line.getBoundingClientRect().left < props.from.getBoundingClientRect().left)
    props.lineObjective.style.top = ((sourceHeight + sourceWidth)/3) + 'px'
    // else
    //     props.lineObjective.style.top =(objectiveWidth / 2 ) + 'px'

}

adjustLine.propTypes = {
    from: PropTypes.object,
    to: PropTypes.object,
    line: PropTypes.object,
    lineSource: PropTypes.object,
    lineObjective: PropTypes.object
}