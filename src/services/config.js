const USERS_API_URL="https://agile-stream-82857.herokuapp.com/api/user";
const STATS_API_URL="https://agile-stream-82857.herokuapp.com/api/statistics";
const teacherConfig={
    API_URL: "https://agile-stream-82857.herokuapp.com/api/admin/enseignants",
    USERS_API_URL,
    STATS_API_URL
}
const managerConfig={
    API_URL: "https://agile-stream-82857.herokuapp.com/api/admin",
    USERS_API_URL,
    STATS_API_URL

}



export {teacherConfig,managerConfig}