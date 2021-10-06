import dynamic from "next/dynamic";

export default function getManagementPages(props) {
    return [
        {
            basePath: 'services',
            content: dynamic(() => import("./pages/Services"))
        },
        {
            basePath: 'service',
            content: dynamic(() => import("./pages/Service"))
        },
        {
            basePath: 'permissions',
            content: dynamic(() => import("./pages/Permissions"))
        },
        {
            basePath: 'logs',
            content: dynamic(() => import("./pages/Logs"))
        },
        {
            basePath: 'endpoint',
            content: dynamic(() => import("./pages/Endpoint"))
        },
        {
            basePath: 'index',
            asIndex: true,
            content: dynamic(() => import("./pages/Home"))
        },
    ]
}