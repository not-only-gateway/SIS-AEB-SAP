import PropTypes from "prop-types";
import dynamic from "next/dynamic";

export default function getSapPages(props) {
    return [
        {
            basePath: 'work_plan',
            // content: dynamic(() => import( "./pages/WorkPlan"))
        },
        {
            basePath: 'ted',
            // content: dynamic(() => import("./pages/Ted"))
        },
        {
            basePath: 'project',
            // content: dynamic(() => import("./pages/Project"))
        },
        {
            basePath: 'associative',
            // content: dynamic(() => import("./pages/Associative"))
        },
        {
            basePath: 'operation_phase',
            // content: dynamic(() => import("./pages/OperationPhase"))
            // content: <OperationPhase routerQuery={props.query} redirect={props.redirect}/>
        },
        {
            basePath: 'index',
            asIndex: true,
            content: dynamic(() => import("./pages/Index"))
        },
    ]
}

getSapPages.propTypes = {
    redirect: PropTypes.func,
    query: PropTypes.object
}