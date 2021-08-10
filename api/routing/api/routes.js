const auth = require('../../api/auth/router')
const users = require('../../api/users/router')
const logs = require('../../api/logs/router')

module.exports = [auth, users, logs]
