import Index from "./pages/Index";
// import OperationPhase from "./pages/OperationPhase";
// import Associative from "./pages/Associative";
// import Project from "./pages/Project";
// import Ted from "./pages/Ted";
// import WorkPlan from "./pages/WorkPlan";
import PropTypes from "prop-types";

export default function getSapPages(props) {
    return [
        {
            basePath: 'work_plan',
            content: 'wp'
            // content: <WorkPlan routerQuery={props.query} redirect={props.redirect}/>
        },
        {
            basePath: 'ted',
            content: 'ted'
            // content: <Ted routerQuery={props.query} redirect={props.redirect}/>
        },
        {
            basePath: 'project',
            content: 'project'
            // content: <Project routerQuery={props.query} redirect={props.redirect}/>
        },
        {
            basePath: 'associative',
            content: 'ass'
            // content: <Associative redirect={props.redirect}/>
        },
        {
            basePath: 'operation_phase',
            content: 'op'
            // content: <OperationPhase routerQuery={props.query} redirect={props.redirect}/>
        },
        {
            basePath: 'index',
            asIndex: true,
            content: <Index redirect={props.redirect}/>
        },
    ]
}

getSapPages.propTypes = {
    redirect: PropTypes.func,
    query: PropTypes.object
}