import PropTypes from 'prop-types'
import {useMemo} from "react";
import Switcher from "../../misc/switcher/Switcher";

export default function DynamicRoutes(props) {
    const contentIndex = useMemo(() => {
        if (props.ready && props.path !== undefined)
            return props.routes.findIndex(route => props.path === route.basePath)
        else
            return props.routes.findIndex(route => route.asIndex)
    }, [props.ready, props.path, props.routes])

    const Content = useMemo(() => {
        if (contentIndex >= 0)
            return props.routes[contentIndex].content
        else
            return null
    }, [contentIndex])

    return (
        <Switcher openChild={Content === null ? 0 : 1}>
            <div/>
            {Content !== null ? <Content {...props.componentProps}/> : <div/>}
        </Switcher>
    )

}

DynamicRoutes.propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({
        basePath: PropTypes.string,
        content: PropTypes.object,
        asIndex: PropTypes.bool,
    })),
    ready: PropTypes.bool,
    path: PropTypes.string,
    componentProps: PropTypes.object

}