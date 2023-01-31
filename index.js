const app = require('./app')
const config = require('./utils/config')

const logger = require('./utils/logger')

app.listen(config.PORT,() => {
    logger.info(`app listening in ${config.PORT}`)
   
})

