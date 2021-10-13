import dynamic from "next/dynamic";

export default function getProfilePages(props) {
    return [
        {
            basePath: 'index',
            asIndex: true,
            content: dynamic(() => import("./pages/Profile"))
        }
    ]
}