const parseToPublicURL = (url)=>{
    const SERVER_ENV = JSON.parse(process.env["SERVER"]);
    return url.replace(
        /^uploads/,
        `${SERVER_ENV.address}:${SERVER_ENV.port}`
      )

}

module.exports=parseToPublicURL