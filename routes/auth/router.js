const router = express.Router()

const login = require('./plugins/login')
const registration = require('./plugins/registration')
const check = require('./plugins/check')

router
    .post('/login', login)
    .post('/registration', registration)
    .post('/check', check)

module.exports = router

