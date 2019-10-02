const   express     =   require('express')
const   bodyParser  =   require('body-parser')
const   db          =   require('./db/index')()


//Config sets
const config = require('config')
const serverConfig = config.get('Customer.ServerConfig')

// Set up express APP
const app = express()

//APP USE
app.use(bodyParser.json())
app.use('/api', require('./routes/api'))

//Lesten Requests
app.listen(serverConfig.port || '3377', serverConfig.host || 'localhost', () => {
    console.log(`Server has been started in ${serverConfig.host}:${serverConfig.port}`);
})