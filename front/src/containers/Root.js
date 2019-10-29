if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod') /* TODO - synchronize it with Root.dev.js */
} else {
    module.exports = require('./Root.dev')
}
