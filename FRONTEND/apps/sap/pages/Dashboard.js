import shared from '../styles/Shared.module.css'

export default function Dashboard() {
    return (
        <div className={shared.pageContent}>
            <iframe
                className={shared.iframe}
                src="https://app.powerbi.com/view?r=eyJrIjoiMzIxMmMyOWQtNDRjMy00NWZjLTgyODItMzc5YWQwNjg3YjVhIiwidCI6IjU4Yjc0YTc1LTAwM2ItNDViZi04ZjQzLTgxMzNmNjE2NTBlMCJ9"
                frameBorder="0" allowFullScreen="true"/>
        </div>
    )
}
