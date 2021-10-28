import PropTypes from "prop-types";
import dynamic from "next/dynamic";

export default function getForms(props) {
    return [
        {
            basePath: 'action',
            content: dynamic(() => import( "./components/forms/ActionForm"))
        }
    ]
}

getForms.propTypes = {
    redirect: PropTypes.func,
    query: PropTypes.object
}