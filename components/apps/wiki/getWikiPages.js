import PropTypes from "prop-types";
import dynamic from "next/dynamic";

export default function getWikiPages(props) {
    return [
        {
            basePath: 'index',
            asIndex: true,
            content: dynamic(() => import("./pages/Index"))
        },  {
            basePath: 'wiki',

            content: dynamic(() => import("./pages/Wiki"))
        },
    ]
}

getWikiPages.propTypes = {
    redirect: PropTypes.func,
    query: PropTypes.object
}