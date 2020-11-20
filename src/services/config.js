const USERS_API_URL="http://localhost:5000/api/user";
const STATS_API_URL="http://localhost:5000/api/statistics";
const teacherConfig={
    API_URL: "http://localhost:5000/api/admin/enseignants",
    USERS_API_URL,
    STATS_API_URL
}
const managerConfig={
    API_URL: "http://localhost:5000/api/admin",
    USERS_API_URL,
    STATS_API_URL

}



export {teacherConfig,managerConfig}