const BASE_URL=process.env.REACT_APP_API_URL || "localhost:5000/api"
const USERS_API_URL=BASE_URL+"/user";
const STATS_API_URL=BASE_URL"/statistics";
const teacherConfig={
    API_URL: BASE_URL+"/admin/enseignants",
    USERS_API_URL,
    STATS_API_URL
}
const managerConfig={
    API_URL: BASE_URL+"/admin",
    USERS_API_URL,
    STATS_API_URL

}



export {teacherConfig,managerConfig}
