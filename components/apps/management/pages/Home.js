import {useRouter} from "next/router";
import shared from '../styles/Shared.module.css'

export default function Home() {
    const router = useRouter()
    return (
        <div className={shared.pageContent}>

            <iframe
                src={"https://app.powerbi.com/view?r=eyJrIjoiZmJiMjQ4NmEtYmRiMy00MGJmLTllMGEtMzc1NDkzYmI0YTY1IiwidCI6IjU4Yjc0YTc1LTAwM2ItNDViZi04ZjQzLTgxMzNmNjE2NTBlMCJ9"}
                className={shared.iframe}
                frameBorder={"0"} allowFullScreen={"true"}/>
        </div>
    )
}