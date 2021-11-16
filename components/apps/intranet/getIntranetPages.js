import dynamic from "next/dynamic";

export default function getIntranetPages(props) {
    return [
        {
            basePath: 'index',
            asIndex: true,
            content: dynamic(() => import("./pages/Index"))
        },
        {
            basePath: 'commission',
            content: dynamic(() => import("./pages/Index"))
        },
        {
            basePath: 'events',
            content: dynamic(() => import("./pages/Index"))
        },
        {
            basePath: 'institutional',
            content: dynamic(() => import("./pages/Index"))
        },
        {
            basePath: 'structure',
            content: dynamic(() => import("./pages/Index"))
        }
    ]
}