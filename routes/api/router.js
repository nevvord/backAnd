const router = express()

const getUser = require('./user/getUser')

router
  .get('/getuser/:id', getUser)

module.exports = router
