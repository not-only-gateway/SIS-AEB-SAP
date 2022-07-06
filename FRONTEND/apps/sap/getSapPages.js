import PropTypes from "prop-types";
import dynamic from "next/dynamic";

export default function getSapPages(props) {
    return [
        {
            basePath: 'wp',
            content: dynamic(() => import( "./pages/WorkPlan"))
        },
        {
            basePath: 'ted',
            content: dynamic(() => import("./pages/Ted"))
        },
        {
            basePath: 'project',
            content: dynamic(() => import("./pages/Project"))
        },
        {
            basePath: 'associative',
            content: dynamic(() => import("./pages/Associative"))
        },
        {
            basePath: 'operation',
            content: dynamic(() => import("./pages/OperationPhase"))
        },
        {
            basePath: 'index',
            asIndex: true,
            content: dynamic(() => import("./pages/Index"))
        },  {
            basePath: 'infrastructure',

            content: dynamic(() => import("./pages/Infrastructure"))
        },
        {
            basePath: 'dashboard',

            content: dynamic(() => import("./pages/Dashboard"))
        },
    ]
}

getSapPages.propTypes = {
    redirect: PropTypes.func,
    query: PropTypes.object
}