const bodyParser = require('body-parser')
const logger     = require('morgan')

function entry (app) {
  const server = app

  /**
   * It sets the principal configurations of the server
   *
   * @param {object} config
   */
  const create = (config) => {
    const { port, host, env } = config
    server.set('port', port)
    server.set('host', host)
    server.set('env', env)
    server.set('view engine', 'ejs')
    // To receive URL parameters
    server.use(bodyParser.urlencoded({ extended: false }))
    server.use(logger('dev'))

    const routes = require('./routes')
    server.use(routes)
  }

  /**
   * It is the entry point of the application
   * which takes care about start the server
   */
  const start = () => {
    const port = server.get('port')
    const host = server.get('host')

    server.listen(port, () => {
      console.log(`Server is listenning in ${host} on port: ${port}`)
    })
  }

  return { create, start }
}

module.exports = entry
