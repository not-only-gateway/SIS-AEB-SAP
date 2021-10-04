import PropTypes from 'prop-types'
import {useMemo} from "react";

export default function useDynamicRoute(props) {
    const contentIndex = useMemo(() => {
        console.log(props)
        if (props.ready && props.path !== undefined)
            return props.routes.findIndex(route => props.path === route.basePath)
        else
            return props.routes.findIndex(route => route.asIndex)
    }, [props.ready, props.path, props.routes])

    return props.routes[contentIndex] ? props.routes[contentIndex].content : ''
}

useDynamicRoute.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        basePath: PropTypes.string,
        content: PropTypes.any,
        asIndex: PropTypes.bool
    })),
    ready: PropTypes.bool,
    path: PropTypes.string
}