import HomePage from "../../components/apps/sap/pages/Home";
import {useRouter} from "next/router";

export default function index(){
    const router = useRouter()
    return (
        <HomePage redirect={(url, asUrl, params) => router.push(url, asUrl, params)}/>
    )
}