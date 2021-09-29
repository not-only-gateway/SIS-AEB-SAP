import HomePage from "../../components/apps/sap/pages/HomePage";
import {useRouter} from "next/router";

export default function home(){
    const router = useRouter()
    return (
        <HomePage redirect={(url, asUrl, params) => router.push(url, asUrl, params)}/>
    )
}