const router = require('express').Router()
const uploadRoute=require('./fileUpload')

router.use('/upload', uploadRoute)

module.exports = router