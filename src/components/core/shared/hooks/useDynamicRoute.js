import PropTypes from 'prop-types'
import {useMemo} from "react";


export default function useDynamicRoute(props) {
    const contentIndex = useMemo(() => {
        if (props.ready && props.path !== undefined)
            return props.routes.findIndex(route => props.path === route.basePath)
        else
            return props.routes.findIndex(route => route.asIndex)
    }, [props.ready, props.path, props.routes])


    return useMemo(() => {
        console.log(contentIndex)
        if (contentIndex >= 0)
            return props.routes[contentIndex].content
        else
            return null
    }, [contentIndex])

}

useDynamicRoute.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        basePath: PropTypes.string,
        content: PropTypes.object,
        asIndex: PropTypes.bool,
    })),
    handleImport: PropTypes.func,
    ready: PropTypes.bool,
    path: PropTypes.string
}