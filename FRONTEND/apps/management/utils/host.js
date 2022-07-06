import SERVER_CONFIG from "../../../SERVER_CONFIG.json";

export default function Host(prefix){
        return `${SERVER_CONFIG.BACKEND_HOST}/${prefix}/`
}
