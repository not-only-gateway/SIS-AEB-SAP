import dynamic from "next/dynamic";

export default function getWikiForms() {
    return [

        {
            basePath: 'wiki_card',
            content: dynamic(() => import( "./components/forms/WikiCardForm"))
        }
    ]
}
