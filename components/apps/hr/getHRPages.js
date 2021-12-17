import dynamic from "next/dynamic";

export default function getHRPages(props) {
    return [

        {
            basePath: 'index',
            asIndex: true,
            content: dynamic(() => import("./pages/Index"))
        },
        {
            basePath: 'vacancy',
            content: dynamic(() => import("./pages/Vacancy"))
        }
    ]
}