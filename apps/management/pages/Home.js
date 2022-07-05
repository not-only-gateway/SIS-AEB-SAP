import shared from '../styles/Shared.module.css'

export default function Home() {
    return (
        <div className={shared.pageContent}>

            <iframe
                src={"https://app.powerbi.com/view?r=eyJrIjoiMzE5ZDg3ZTMtYzA0Ny00NGVjLTgzNmMtYTY5Zjg1ZDMwNTQzIiwidCI6IjU4Yjc0YTc1LTAwM2ItNDViZi04ZjQzLTgxMzNmNjE2NTBlMCJ9"}
                className={shared.iframe}
                frameBorder={"0"} allowFullScreen={"true"}/>
        </div>
    )
}