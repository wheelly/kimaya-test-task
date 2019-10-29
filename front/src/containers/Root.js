if (process.env.NODE_ENV === 'production') {
    module.exports = require('./Root.prod_') /* TODO - synchronize it with Root.dev.js */
} else {
    module.exports = require('./Root.dev')
}
